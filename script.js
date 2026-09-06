// Sudoku game logic: puzzle generation (via full-board fill + unique-solution
// digging), board rendering, input handling, conflict highlighting and a timer.
// No external libraries — everything below is plain DOM + vanilla JS.

const SIZE = 9;
const BOX = 3;

const CLUES_BY_DIFFICULTY = {
  easy: 40,
  medium: 32,
  hard: 26,
};

let solution = emptyBoard(); // fully solved 9x9 grid
let givenMask = emptyBoard(); // 1 where the cell is a pre-filled clue
let board = emptyBoard(); // current state of the board (user + given values)

let timerId = null;
let secondsElapsed = 0;
let gameWon = false;

const boardEl = document.getElementById("board");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");
const difficultyEl = document.getElementById("difficulty");
const newGameBtn = document.getElementById("new-game");
const resetBtn = document.getElementById("reset");
const checkBtn = document.getElementById("check");

const cellInputs = []; // flat list of the 81 <input> elements, row-major

init();

function init() {
  buildBoardDom();
  newGameBtn.addEventListener("click", () => startNewGame(difficultyEl.value));
  resetBtn.addEventListener("click", resetToGiven);
  checkBtn.addEventListener("click", checkBoard);
  difficultyEl.addEventListener("change", () => startNewGame(difficultyEl.value));

  startNewGame(difficultyEl.value);
}

// ---- DOM setup -------------------------------------------------------

function buildBoardDom() {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "numeric";
      input.maxLength = 1;
      input.className = "cell";
      input.dataset.row = row;
      input.dataset.col = col;
      input.setAttribute("role", "gridcell");
      input.addEventListener("input", onCellInput);
      input.addEventListener("keydown", onCellKeydown);
      input.addEventListener("focus", () => highlightPeers(row, col));
      boardEl.appendChild(input);
      cellInputs.push(input);
    }
  }
}

function cellAt(row, col) {
  return cellInputs[row * SIZE + col];
}

// ---- Game lifecycle ----------------------------------------------------

function startNewGame(difficulty) {
  setMessage("Generating puzzle…");
  // Let the "Generating…" message paint before the (occasionally slow) solve.
  setTimeout(() => {
    const generated = generatePuzzle(difficulty);
    solution = generated.solution;
    givenMask = generated.puzzle.map((r) => r.map((v) => (v !== 0 ? 1 : 0)));
    board = generated.puzzle.map((r) => r.slice());
    gameWon = false;
    renderBoard();
    resetTimer();
    startTimer();
    setMessage("");
  }, 0);
}

function resetToGiven() {
  if (gameWon) return;
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      board[row][col] = givenMask[row][col] ? solution[row][col] : 0;
    }
  }
  renderBoard();
  setMessage("Board reset.");
}

function renderBoard() {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const input = cellAt(row, col);
      const value = board[row][col];
      input.value = value === 0 ? "" : String(value);
      input.readOnly = !!givenMask[row][col];
      input.classList.toggle("given", !!givenMask[row][col]);
      input.classList.remove("conflict");
    }
  }
  refreshConflicts();
}

// ---- Input handling ------------------------------------------------------

function onCellInput(event) {
  const input = event.target;
  const row = Number(input.dataset.row);
  const col = Number(input.dataset.col);

  const digit = input.value.replace(/[^1-9]/g, "").slice(-1);
  input.value = digit;
  board[row][col] = digit ? Number(digit) : 0;

  refreshConflicts();
  highlightPeers(row, col);
  maybeCheckWin();
}

function onCellKeydown(event) {
  const row = Number(event.target.dataset.row);
  const col = Number(event.target.dataset.col);

  switch (event.key) {
    case "ArrowUp":
      moveFocus(row - 1, col);
      event.preventDefault();
      break;
    case "ArrowDown":
      moveFocus(row + 1, col);
      event.preventDefault();
      break;
    case "ArrowLeft":
      moveFocus(row, col - 1);
      event.preventDefault();
      break;
    case "ArrowRight":
      moveFocus(row, col + 1);
      event.preventDefault();
      break;
    case "Backspace":
    case "Delete":
      if (!event.target.readOnly) {
        event.target.value = "";
        board[row][col] = 0;
        refreshConflicts();
        maybeCheckWin();
      }
      break;
  }
}

function moveFocus(row, col) {
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
  cellAt(row, col).focus();
}

function highlightPeers(row, col) {
  cellInputs.forEach((input) => input.classList.remove("peer"));
  for (let i = 0; i < SIZE; i++) {
    cellAt(row, i).classList.add("peer");
    cellAt(i, col).classList.add("peer");
  }
  const boxRow = Math.floor(row / BOX) * BOX;
  const boxCol = Math.floor(col / BOX) * BOX;
  for (let r = 0; r < BOX; r++) {
    for (let c = 0; c < BOX; c++) {
      cellAt(boxRow + r, boxCol + c).classList.add("peer");
    }
  }
  cellAt(row, col).classList.add("peer");
}

// ---- Validation -----------------------------------------------------------

// Marks any filled cell that duplicates another value in its row, column or
// box. This checks the live board, not just against the solution, so players
// see conflicts as soon as they appear.
function refreshConflicts() {
  const conflicts = findConflictCells(board);
  cellInputs.forEach((input) => input.classList.remove("conflict"));
  conflicts.forEach(([row, col]) => cellAt(row, col).classList.add("conflict"));
}

function findConflictCells(grid) {
  const bad = new Set();

  const markDuplicates = (cells) => {
    const seen = new Map();
    for (const [row, col] of cells) {
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
      const cells = [];
      for (let r = 0; r < BOX; r++) {
        for (let c = 0; c < BOX; c++) cells.push([boxRow + r, boxCol + c]);
      }
      markDuplicates(cells);
    }
  }

  return Array.from(bad).map((key) => key.split(",").map(Number));
}

function checkBoard() {
  if (isBoardFull(board)) {
    if (boardsEqual(board, solution)) {
      declareWin();
    } else {
      setMessage("Not quite — some cells are wrong.", "error");
    }
  } else {
    const conflicts = findConflictCells(board);
    setMessage(
      conflicts.length ? "There are conflicts on the board." : "Looks good so far — keep going.",
      conflicts.length ? "error" : ""
    );
  }
}

function maybeCheckWin() {
  if (isBoardFull(board) && findConflictCells(board).length === 0 && boardsEqual(board, solution)) {
    declareWin();
  }
}

function declareWin() {
  gameWon = true;
  stopTimer();
  setMessage(`Solved in ${formatTime(secondsElapsed)}! 🎉`, "win");
}

function isBoardFull(grid) {
  return grid.every((row) => row.every((v) => v !== 0));
}

function boardsEqual(a, b) {
  return a.every((row, r) => row.every((v, c) => v === b[r][c]));
}

function setMessage(text, kind) {
  messageEl.textContent = text;
  messageEl.classList.remove("win", "error");
  if (kind) messageEl.classList.add(kind);
}

// ---- Timer ------------------------------------------------------------

function startTimer() {
  timerId = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = formatTime(secondsElapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  stopTimer();
  secondsElapsed = 0;
  timerEl.textContent = formatTime(0);
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ---- Puzzle generation ------------------------------------------------

function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
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

// Fills an empty grid into a complete, valid, randomized solution using
// backtracking (numbers are tried in shuffled order so each call produces a
// different solved board).
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

// Counts solutions to `grid` up to `limit` (stops early once reached) — used
// to confirm a dug-out puzzle still has exactly one solution.
function countSolutions(grid, limit) {
  const working = grid.map((row) => row.slice());
  let count = 0;

  function solve() {
    if (count >= limit) return;
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (working[row][col] !== 0) continue;
        for (let num = 1; num <= 9; num++) {
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

// Builds a puzzle by starting from a full solved grid and removing cells one
// at a time, only keeping a removal if the puzzle still has a unique
// solution — this guarantees every generated puzzle is solvable and fair.
function generatePuzzle(difficulty) {
  const solved = emptyBoard();
  fillBoard(solved);

  const puzzle = solved.map((row) => row.slice());
  const targetClues = CLUES_BY_DIFFICULTY[difficulty] ?? CLUES_BY_DIFFICULTY.medium;

  const positions = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) positions.push([row, col]);
  }
  shuffle(positions);

  let clues = SIZE * SIZE;
  for (const [row, col] of positions) {
    if (clues <= targetClues) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    if (countSolutions(puzzle, 2) === 1) {
      clues--;
    } else {
      puzzle[row][col] = backup;
    }
  }

  return { puzzle, solution: solved };
}
