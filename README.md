# Sudoku

A single-player Sudoku that runs entirely in the browser, dressed in the
Weighted Gradebook theme: warm paper, white cards with a hairline rule and a
soft shadow, Georgia headings over a sans UI, and monospace for anything
countable — with that theme's grey-and-green repointed to indigo and amber.

## Stack

Plain **HTML + CSS + vanilla JavaScript** — no framework, no build step, no
dependencies. For a small, self-contained game like this it keeps things easy
to read, easy to run (just open a file), and easy to deploy anywhere that can
serve static files (GitHub Pages, Netlify, a plain web server). The trade-off
is that it doesn't scale well if the project grows a lot of state/UI
complexity later — at that point a framework and a bundler would start paying
for themselves.

There are **no network requests at all**. The **Archivo** variable font is
self-hosted in `fonts/` (two `woff2` subsets, 176KB, gated by `unicode-range`
so only the latin one is fetched). It stands in for the theme's UI sans, which
is Segoe UI on the machine the theme came from and nothing in particular
anywhere else; Georgia carries the headings and the system monospace carries
the numbers, both of which every platform already has. Verified working from
`file://`.

## Features

- Puzzle generator that produces a full solved board via randomized
  backtracking, then removes clues one at a time while checking that the
  puzzle still has a **unique solution** — so every plate is solvable without
  guessing. The dig runs in slices and reports its progress, so the page never
  freezes while a plate is being set.
- Three series: Open (40 clues), Standard (32), Severe (26).
- Live conflict marking — a figure that repeats in its rank, file or box is
  set in crimson and ruled beneath, so the state never rests on colour alone.
- Marking a cell rules its rank and file across the plate in indigo, frames
  its 3×3 box in amber, and fills the matching index tabs and box key — so the
  three groups you scan never compete with the tint that tells you which
  figures were set at press.
- **Pencilled candidates:** a 3×3 sub-grid of candidate figures inside any
  empty cell. Toggle Pencil with `P` or the switch in Operations, or hold shift
  with a figure to pencil just that one.
- **Digit census:** how many placements of each figure remain, doubling as the
  touch keypad on phones.
- **Undo** (Ctrl/⌘ Z) for every mark, entered or pencilled.
- Elapsed timer, automatic win detection, and a Solved card on finishing.
- Light and dark, following the reader's system setting.
- Your plate, marks and elapsed time are saved in `localStorage`, so a refresh
  or a closed tab picks up where you left off.
- Verify plate / Strip to clues / Set a new plate.

## Controls

| Action | Input |
| --- | --- |
| Set a figure | `1`–`9`, or press a figure in the Digit census |
| Toggle Pencil | `P`, or the Pencil switch in Operations |
| Pencil a candidate | `Shift` + `1`–`9`, or turn Pencil on and press `1`–`9` |
| Clear a cell | `Backspace`, `Delete`, or `0` |
| Move around the plate | Arrow keys, `Home`, `End` |
| Undo the last mark | `Ctrl` / `⌘` + `Z` |

## Running it

No build step or install required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static file server, e.g.:

  ```bash
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## Project structure

```
.
├── index.html   # page structure and chart apparatus
├── style.css    # theme tokens (light + dark), layout, states, motion
├── script.js    # puzzle generation, rendering, game logic, persistence
├── fonts/       # self-hosted Archivo variable (woff2)
└── README.md
```

`PRODUCT.md` and `.impeccable/` hold design context for the visual system and
are not part of the running game.
