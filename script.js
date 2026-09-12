// Plate IX — sudoku as a printed reference chart.
//
// The scheduling core is unchanged in spirit from the first build: a full
// board is filled by randomized backtracking, then clues are dug out one at a
// time and each removal is kept only if the plate still admits exactly one
// solution. What is new here is that the dig runs in slices so the page never
// freezes while a plate is being set, and that every piece of state the
// player needs is typeset into the sheet rather than parked in a toolbar.
//
// No libraries. No build step. The page runs from file://.

const SIZE = 9;
const BOX = 3;
const FILES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const CLUES_BY_DIFFICULTY = {
  easy: 40,
  medium: 32,
  hard: 26,
};

// Four plate inks rotated across the nine boxes so no two touching boxes
// share a family. Box structure is still carried by rule weight as well, so
// the colour never has to do that job on its own.
const FAMILY = [1, 2, 3, 4, 1, 2, 3, 4, 1];
const FAMILY_NAME = { 1: "viridian", 2: "manganese", 3: "chromate", 4: "cerulean" };

const STORE_KEY = "plate-ix.v1";

let solution = emptyBoard();
let givenMask = emptyBoard();
let board = emptyBoard();
let notes = emptyNotes();

let difficulty = "medium";
let plateNo = 9;
let marked = { row: 0, col: 0 };
let pencilMode = false;
let undoStack = [];

let timerId = null;
let secondsElapsed = 0;
let gameWon = false;
let setting = false;

const el = (id) => document.getElementById(id);

const boardEl = el("board");
const indexColEl = el("index-col");
const indexRowEl = el("index-row");
const censusEl = el("census");
const familyKeyEl = el("family-key");
const timerEl = el("timer");
const plateNoEl = el("plate-no");
const clueCountEl = el("clue-count");
const messageEl = el("message");
const conflictCountEl = el("conflict-count");
const filledCountEl = el("filled-count");
const pressEl = el("press");
const pressFillEl = el("press-fill");
const pressPctEl = el("press-pct");
const stampEl = el("stamp");
const stampMetaEl = el("stamp-meta");
const plateFrameEl = document.querySelector(".plate-frame");
const trimPlateEl = el("trim-plate");
const notesToggleEl = el("notes-toggle");
const undoBtn = el("undo");

const cells = []; // 81 buttons, row-major
const tallies = []; // index 1-9

init();

function init() {
  buildIndexRails();
  buildPlateDom();
  buildCensus();
  buildFamilyKey();
  wireControls();

  const restored = restore();
  if (restored) {
    renderAll();
    if (!gameWon) startTimer();
    say("Plate restored from your last sitting.");
  } else {
    setNewPlate(difficulty);
  }
}

// ---- DOM setup ---------------------------------------------------------

function buildIndexRails() {
  for (let i = 0; i < SIZE; i++) {
    const colTick = document.createElement("div");
    colTick.className = "tick";
    colTick.textContent = FILES[i];
    indexColEl.appendChild(colTick);

    const rowTick = document.createElement("div");
    rowTick.className = "tick";
    rowTick.textContent = String(i + 1);
    indexRowEl.appendChild(rowTick);
  }
}

function buildPlateDom() {
  for (let row = 0; row < SIZE; row++) {
    const rowEl = document.createElement("div");
    rowEl.className = "plate-row";
    rowEl.setAttribute("role", "row");

    for (let col = 0; col < SIZE; col++) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      cell.setAttribute("role", "gridcell");
      cell.tabIndex = -1;
      cell.style.setProperty("--fam", `var(--fam-${FAMILY[boxIndex(row, col)]})`);

      const coord = document.createElement("span");
      coord.className = "coord";
      coord.textContent = `${FILES[col]}${row + 1}`;
      cell.appendChild(coord);

      const pencil = document.createElement("span");
      pencil.className = "pencil";
      for (let n = 1; n <= 9; n++) pencil.appendChild(document.createElement("b"));
      cell.appendChild(pencil);

      const figure = document.createElement("span");
      figure.className = "figure";
      cell.appendChild(figure);

      cell.addEventListener("click", () => mark(row, col));
      cell.addEventListener("focus", () => mark(row, col, { focus: false }));

      rowEl.appendChild(cell);
      cells.push(cell);
    }
    boardEl.appendChild(rowEl);
  }

  boardEl.addEventListener("keydown", onBoardKeydown);
}

function buildCensus() {
  for (let n = 1; n <= 9; n++) {
    const tally = document.createElement("button");
    tally.type = "button";
    tally.className = "tally";
    tally.dataset.digit = String(n);

    const fig = document.createElement("span");
    fig.className = "tally-fig";
    fig.textContent = String(n);

    const left = document.createElement("span");
    left.className = "tally-left";

    tally.append(fig, left);
    tally.addEventListener("click", () => {
      place(n);
      cellAt(marked.row, marked.col).focus();
    });

    censusEl.appendChild(tally);
    tallies[n] = tally;
  }
}

function buildFamilyKey() {
  for (let b = 0; b < 9; b++) {
    const chip = document.createElement("li");
    chip.className = "family-chip";
    chip.style.setProperty("--fam", `var(--fam-${FAMILY[b]})`);
    chip.textContent = String(b + 1);
    chip.title = `Box ${b + 1} — ${FAMILY_NAME[FAMILY[b]]} plate`;
    familyKeyEl.appendChild(chip);
  }
}

function wireControls() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (setting) return;
      setNewPlate(tab.dataset.difficulty);
    });
  });

  el("new-game").addEventListener("click", () => {
    if (!setting) setNewPlate(difficulty);
  });
  el("reset").addEventListener("click", stripToClues);
  el("check").addEventListener("click", verifyPlate);
  undoBtn.addEventListener("click", undo);

  notesToggleEl.addEventListener("click", () => {
    pencilMode = !pencilMode;
    notesToggleEl.setAttribute("aria-pressed", String(pencilMode));
    notesToggleEl.querySelector(".op-state").textContent = pencilMode ? "On" : "Off";
    say(
      pencilMode
        ? "Pencil on. Figures now go down as candidates; hold shift to set one outright."
        : "Pencil off. Figures go down as entries."
    );
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undo();
    }
  });
}

function cellAt(row, col) {
  return cells[row * SIZE + col];
}

function boxIndex(row, col) {
  return Math.floor(row / BOX) * BOX + Math.floor(col / BOX);
}

// ---- Plate lifecycle ---------------------------------------------------

async function setNewPlate(level) {
  difficulty = level in CLUES_BY_DIFFICULTY ? level : "medium";
  syncTabs();

  setting = true;
  gameWon = false;
  stampEl.hidden = true;
  pressEl.hidden = false;
  setProgress(0);
  say("Setting a new plate. Each clue is pulled only if the plate still proves out to one solution.");

  const generated = await generatePuzzle(difficulty, setProgress);

  solution = generated.solution;
  givenMask = generated.puzzle.map((r) => r.map((v) => (v !== 0 ? 1 : 0)));
  board = generated.puzzle.map((r) => r.slice());
  notes = emptyNotes();
  undoStack = [];
  plateNo += 1;
  marked = firstOpenCell();

  pressEl.hidden = true;
  setting = false;

  renderAll({ sweep: true });
  resetTimer();
  startTimer();
  say("Plate set and proved. One solution, no guessing required.");
  save();
}

function stripToClues() {
  if (setting) return;
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      board[row][col] = givenMask[row][col] ? solution[row][col] : 0;
      notes[row][col].clear();
    }
  }
  undoStack = [];
  gameWon = false;
  stampEl.hidden = true;
  if (!timerId) startTimer();
  renderAll();
  say("Stripped back to the clues set at press.");
  save();
}

function firstOpenCell() {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (!givenMask[row][col]) return { row, col };
    }
  }
  return { row: 0, col: 0 };
}

// ---- Rendering ---------------------------------------------------------

function renderAll(options = {}) {
  const sweep = options.sweep === true;

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const cell = cellAt(row, col);
      const value = board[row][col];
      const given = !!givenMask[row][col];

      cell.querySelector(".figure").textContent = value === 0 ? "" : String(value);
      cell.classList.toggle("given", given);
      cell.disabled = false;

      const pencilEl = cell.querySelector(".pencil");
      const marks = notes[row][col];
      const showMarks = value === 0 && marks.size > 0;
      pencilEl.hidden = !showMarks;
      for (let n = 1; n <= 9; n++) {
        pencilEl.children[n - 1].textContent = showMarks && marks.has(n) ? String(n) : "";
      }

      cell.querySelector(".coord").hidden = value !== 0 || showMarks;

      if (sweep && value !== 0) {
        // Staggered in script, not by animation-delay: the figure stays
        // visible at rest, so nothing can be hidden by animation timing.
        const step = (row * SIZE + col) * 7;
        setTimeout(() => replayInk(cell), step);
      }

      cell.setAttribute(
        "aria-label",
        `${FILES[col]}${row + 1}, ${describeCell(row, col, value, given, marks)}`
      );
    }
  }

  refreshConflicts();
  refreshMarked();
  refreshCensus();
  refreshTally();
  clueCountEl.textContent = String(givenMask.flat().filter(Boolean).length);
  plateNoEl.textContent = roman(plateNo);
  trimPlateEl.textContent = roman(plateNo);
  undoBtn.disabled = undoStack.length === 0;
}

function describeCell(row, col, value, given, marks) {
  if (value !== 0) return given ? `${value}, set at press` : `${value}, entered`;
  if (marks && marks.size) return `empty, pencilled ${[...marks].sort().join(" ")}`;
  return "empty";
}

function replayInk(cell) {
  cell.classList.remove("is-set");
  void cell.offsetWidth;
  cell.classList.add("is-set");
}

function refreshMarked() {
  const { row, col } = marked;
  const box = boxIndex(row, col);

  cells.forEach((cell) => cell.classList.remove("marked"));

  // Rank and file are ruled in ink across the plate; the box is framed in
  // gold, the one ink reserved for active apparatus. Every group lives on
  // the rule channel, so none of them competes with the fill that carries
  // whether a figure was set at press or entered by hand.
  plateFrameEl.style.setProperty("--mark-row", String(row));
  plateFrameEl.style.setProperty("--mark-col", String(col));
  plateFrameEl.style.setProperty("--mark-box-row", String(Math.floor(row / BOX)));
  plateFrameEl.style.setProperty("--mark-box-col", String(Math.floor(col / BOX)));

  const cell = cellAt(row, col);
  cell.classList.add("marked");

  cells.forEach((c) => (c.tabIndex = -1));
  cell.tabIndex = 0;

  // The signature: full-strength ink lands in exactly the two index tabs
  // and the one family chip the marked cell answers to.
  [...indexColEl.children].forEach((t, i) => t.classList.toggle("is-live", i === col));
  [...indexRowEl.children].forEach((t, i) => t.classList.toggle("is-live", i === row));
  [...familyKeyEl.children].forEach((c, i) => c.classList.toggle("is-live", i === box));
}

function refreshCensus() {
  for (let n = 1; n <= 9; n++) {
    const placed = board.flat().filter((v) => v === n).length;
    const left = 9 - placed;
    tallies[n].querySelector(".tally-left").textContent = left === 0 ? "complete" : `${left} left`;
    tallies[n].classList.toggle("spent", left === 0);
    tallies[n].setAttribute("aria-label", `Set figure ${n}. ${left} remaining.`);
  }
}

function refreshTally() {
  const filled = board.flat().filter((v) => v !== 0).length;
  filledCountEl.textContent = `${filled} of 81 cells set`;
}

// ---- Marking and entry -------------------------------------------------

function mark(row, col, options = {}) {
  marked = { row, col };
  refreshMarked();
  if (options.focus !== false) cellAt(row, col).focus();
}

function place(digit) {
  const { row, col } = marked;
  if (setting || gameWon || givenMask[row][col]) return;

  pushUndo(row, col);

  if (pencilMode) {
    if (board[row][col] !== 0) board[row][col] = 0;
    const marks = notes[row][col];
    if (marks.has(digit)) marks.delete(digit);
    else marks.add(digit);
  } else {
    board[row][col] = board[row][col] === digit ? 0 : digit;
    notes[row][col].clear();
  }

  renderCell(row, col, { ink: !pencilMode && board[row][col] !== 0 });
  afterChange();
}

function clearCell() {
  const { row, col } = marked;
  if (setting || gameWon || givenMask[row][col]) return;
  if (board[row][col] === 0 && notes[row][col].size === 0) return;

  pushUndo(row, col);
  board[row][col] = 0;
  notes[row][col].clear();
  renderCell(row, col);
  afterChange();
}

function renderCell(row, col, options = {}) {
  const cell = cellAt(row, col);
  const value = board[row][col];
  const marks = notes[row][col];
  const showMarks = value === 0 && marks.size > 0;

  cell.querySelector(".figure").textContent = value === 0 ? "" : String(value);
  const pencilEl = cell.querySelector(".pencil");
  pencilEl.hidden = !showMarks;
  for (let n = 1; n <= 9; n++) {
    pencilEl.children[n - 1].textContent = showMarks && marks.has(n) ? String(n) : "";
  }
  cell.querySelector(".coord").hidden = value !== 0 || showMarks;
  cell.setAttribute(
    "aria-label",
    `${FILES[col]}${row + 1}, ${describeCell(row, col, value, false, marks)}`
  );

  if (options.ink) replayInk(cell);
}

function afterChange() {
  refreshConflicts();
  refreshCensus();
  refreshTally();
  undoBtn.disabled = undoStack.length === 0;
  save();
  maybeDeclareWin();
}

function pushUndo(row, col) {
  undoStack.push({ row, col, value: board[row][col], marks: [...notes[row][col]] });
  if (undoStack.length > 200) undoStack.shift();
}

function undo() {
  const last = undoStack.pop();
  if (!last) return;
  board[last.row][last.col] = last.value;
  notes[last.row][last.col] = new Set(last.marks);
  marked = { row: last.row, col: last.col };
  renderCell(last.row, last.col);
  refreshMarked();
  refreshConflicts();
  refreshCensus();
  refreshTally();
  undoBtn.disabled = undoStack.length === 0;
  cellAt(last.row, last.col).focus();
  say("Last mark lifted.");
  save();
}

// ---- Keyboard ----------------------------------------------------------

function onBoardKeydown(event) {
  const { row, col } = marked;
  const key = event.key;

  if (/^[1-9]$/.test(key)) {
    event.preventDefault();
    const digit = Number(key);
    if (event.shiftKey) {
      const wasPencil = pencilMode;
      pencilMode = !wasPencil;
      place(digit);
      pencilMode = wasPencil;
    } else {
      place(digit);
    }
    return;
  }

  switch (key) {
    case "Backspace":
    case "Delete":
    case "0":
      event.preventDefault();
      clearCell();
      break;
    case "ArrowUp":
      event.preventDefault();
      moveMark(row - 1, col);
      break;
    case "ArrowDown":
      event.preventDefault();
      moveMark(row + 1, col);
      break;
    case "ArrowLeft":
      event.preventDefault();
      moveMark(row, col - 1);
      break;
    case "ArrowRight":
      event.preventDefault();
      moveMark(row, col + 1);
      break;
    case "Home":
      event.preventDefault();
      moveMark(row, 0);
      break;
    case "End":
      event.preventDefault();
      moveMark(row, SIZE - 1);
      break;
  }
}

function moveMark(row, col) {
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
  mark(row, col);
}

// ---- Validation --------------------------------------------------------

// Marks any filled cell that repeats a figure in its rank, file or box. This
// reads the live plate rather than the solution, so a repeat shows the moment
// it is made.
function refreshConflicts() {
  const conflicts = findConflictCells(board);
  const keys = new Set(conflicts.map(([r, c]) => `${r},${c}`));
  cells.forEach((cell) => {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);
    cell.classList.toggle("conflict", keys.has(`${r},${c}`));
  });

  conflictCountEl.textContent =
    conflicts.length === 0
      ? "No repeats"
      : `${conflicts.length} cell${conflicts.length === 1 ? "" : "s"} repeating`;
}

function findConflictCells(grid) {
  const bad = new Set();

  const markDuplicates = (group) => {
    const seen = new Map();
    for (const [row, col] of group) {
      const value = grid[row][col];
      if (!value) continue;
      if (seen.has(value)) {
        bad.add(`${row},${col}`);
        bad.add(seen.get(value));
      } else {
        seen.set(value, `${row},${col}`);
      }
    }
  };

  for (let row = 0; row < SIZE; row++) {
    markDuplicates(Array.from({ length: SIZE }, (_, col) => [row, col]));
  }
  for (let col = 0; col < SIZE; col++) {
    markDuplicates(Array.from({ length: SIZE }, (_, row) => [row, col]));
  }
  for (let boxRow = 0; boxRow < SIZE; boxRow += BOX) {
    for (let boxCol = 0; boxCol < SIZE; boxCol += BOX) {
      const group = [];
      for (let r = 0; r < BOX; r++) {
        for (let c = 0; c < BOX; c++) group.push([boxRow + r, boxCol + c]);
      }
      markDuplicates(group);
    }
  }

  return Array.from(bad).map((key) => key.split(",").map(Number));
}

function verifyPlate() {
  if (setting) return;
  if (isBoardFull(board)) {
    if (boardsEqual(board, solution)) {
      declareWin();
    } else {
      say("Plate is full but does not prove out. Some figures are in the wrong cells.", "fault");
    }
    return;
  }

  const conflicts = findConflictCells(board);
  if (conflicts.length) {
    say(`${conflicts.length} cells repeat a figure in their rank, file or box.`, "fault");
  } else {
    const left = 81 - board.flat().filter((v) => v !== 0).length;
    say(`Clean so far. ${left} cells still open.`, "clear");
  }
}

function maybeDeclareWin() {
  if (isBoardFull(board) && findConflictCells(board).length === 0 && boardsEqual(board, solution)) {
    declareWin();
  }
}

function declareWin() {
  if (gameWon) return;
  gameWon = true;
  stopTimer();
  stampMetaEl.textContent = `Plate ${roman(plateNo)} · ${difficultyName()} · ${formatTime(secondsElapsed)}`;
  stampEl.hidden = false;
  replayStamp();
  say(`Plate ${roman(plateNo)} proved out in ${formatTime(secondsElapsed)}.`, "clear");
  save();
}

function replayStamp() {
  stampEl.style.animation = "none";
  void stampEl.offsetWidth;
  stampEl.style.animation = "";
}

function difficultyName() {
  return { easy: "Open", medium: "Standard", hard: "Severe" }[difficulty];
}

function isBoardFull(grid) {
  return grid.every((row) => row.every((v) => v !== 0));
}

function boardsEqual(a, b) {
  return a.every((row, r) => row.every((v, c) => v === b[r][c]));
}

function say(text, kind) {
  messageEl.textContent = text;
  messageEl.classList.remove("is-fault", "is-clear");
  if (kind === "fault") messageEl.classList.add("is-fault");
  if (kind === "clear") messageEl.classList.add("is-clear");
}

function syncTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.setAttribute("aria-pressed", String(tab.dataset.difficulty === difficulty));
  });
}

function setProgress(fraction) {
  const pct = Math.round(fraction * 100);
  pressFillEl.style.transform = `scaleX(${fraction})`;
  pressPctEl.textContent = String(pct);
}

// ---- Timer -------------------------------------------------------------

function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = formatTime(secondsElapsed);
    if (secondsElapsed % 10 === 0) save();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  secondsElapsed = 0;
  timerEl.textContent = formatTime(0);
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function roman(n) {
  const table = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let left = n;
  for (const [value, numeral] of table) {
    while (left >= value) {
      out += numeral;
      left -= value;
    }
  }
  return out || "0";
}

// ---- Persistence -------------------------------------------------------

function save() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        difficulty,
        plateNo,
        solution,
        givenMask,
        board,
        notes: notes.map((row) => row.map((set) => [...set])),
        secondsElapsed,
        gameWon,
      })
    );
  } catch (error) {
    /* Private browsing or a file:// origin with storage denied — play on. */
  }
}

function restore() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORE_KEY);
  } catch (error) {
    return false;
  }
  if (!raw) return false;

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data.board) || data.board.length !== SIZE) return false;

    solution = data.solution;
    givenMask = data.givenMask;
    board = data.board;
    notes = data.notes.map((row) => row.map((list) => new Set(list)));
    difficulty = data.difficulty in CLUES_BY_DIFFICULTY ? data.difficulty : "medium";
    plateNo = Number(data.plateNo) || 9;
    secondsElapsed = Number(data.secondsElapsed) || 0;
    gameWon = !!data.gameWon;
    marked = firstOpenCell();

    syncTabs();
    timerEl.textContent = formatTime(secondsElapsed);
    if (gameWon) {
      stampMetaEl.textContent = `Plate ${roman(plateNo)} · ${difficultyName()} · ${formatTime(secondsElapsed)}`;
      stampEl.hidden = false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

// ---- Plate generation --------------------------------------------------

function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function emptyNotes() {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => new Set()));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isPlacementValid(grid, row, col, num) {
  for (let i = 0; i < SIZE; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / BOX) * BOX;
  const boxCol = Math.floor(col / BOX) * BOX;
  for (let r = 0; r < BOX; r++) {
    for (let c = 0; c < BOX; c++) {
      if (grid[boxRow + r][boxCol + c] === num) return false;
    }
  }
  return true;
}

// Fills an empty grid into a complete, valid, randomized solution by
// backtracking; figures are tried in shuffled order so every call lands on a
// different solved board.
function fillBoard(grid) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] !== 0) continue;
      const candidates = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (const num of candidates) {
        if (isPlacementValid(grid, row, col, num)) {
          grid[row][col] = num;
          if (fillBoard(grid)) return true;
          grid[row][col] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

// Counts solutions up to `limit`, stopping early — used to confirm a dug-out
// plate still admits exactly one.
function countSolutions(grid, limit) {
  const working = grid.map((row) => row.slice());
  let count = 0;

  function solve() {
    if (count >= limit) return;
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (working[row][col] !== 0) continue;
        for (let num = 1; num <= SIZE; num++) {
          if (isPlacementValid(working, row, col, num)) {
            working[row][col] = num;
            solve();
            working[row][col] = 0;
            if (count >= limit) return;
          }
        }
        return;
      }
    }
    count++;
  }

  solve();
  return count;
}

// Digs clues out of a solved grid, keeping a removal only when the plate
// still has exactly one solution. The dig yields to the browser every few
// positions so the press readout keeps painting and the page never locks up.
async function generatePuzzle(level, onProgress) {
  const solved = emptyBoard();
  fillBoard(solved);

  const puzzle = solved.map((row) => row.slice());
  const targetClues = CLUES_BY_DIFFICULTY[level] ?? CLUES_BY_DIFFICULTY.medium;

  const positions = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) positions.push([row, col]);
  }
  shuffle(positions);

  let clues = SIZE * SIZE;
  const toRemove = clues - targetClues;

  for (let i = 0; i < positions.length; i++) {
    if (clues <= targetClues) break;

    const [row, col] = positions[i];
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    if (countSolutions(puzzle, 2) === 1) {
      clues--;
    } else {
      puzzle[row][col] = backup;
    }

    if (i % 3 === 0) {
      onProgress(Math.min(1, (SIZE * SIZE - clues) / toRemove));
      await yieldToBrowser();
    }
  }

  onProgress(1);
  await yieldToBrowser();
  return { puzzle, solution: solved };
}

// A plain macrotask yield. rAF is throttled in headless and background tabs,
// and the dig must keep moving there too.
function yieldToBrowser() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
