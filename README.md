# Sudoku

A single-player Sudoku that runs entirely in the browser, set as a printed
laboratory reference plate rather than as a card on a page.

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
so only the latin one is fetched). That matters more than it sounds: the width
axis *is* this design's type hierarchy — expanded for titling, condensed for
the data layer — and no fallback in the stack has a width axis, so a CDN that
was unreachable would silently collapse both registers into one system face.
Verified working from `file://`.

## Features

- Puzzle generator that produces a full solved board via randomized
  backtracking, then removes clues one at a time while checking that the
  puzzle still has a **unique solution** — so every plate is solvable without
  guessing. The dig runs in slices and reports its progress, so the page never
  freezes while a plate is being set.
- Three series: Open (40 clues), Standard (32), Severe (26).
- Live conflict marking — a figure that repeats in its rank, file or box is
  set in crimson and double-ruled beneath, so the state never rests on colour
  alone.
- Marking a cell rules its rank and file across the plate in ink, frames its
  3×3 box in gold, and drives full-strength ink into the matching index tabs
  and box key — so the three groups you scan never compete with the tint that
  tells you which figures were set at press.
- **Pencilled candidates:** a 3×3 sub-grid of candidate figures inside any
  empty cell. Toggle Pencil in Operations, or hold shift with a figure.
- **Digit census:** how many placements of each figure remain, doubling as the
  touch keypad on phones.
- **Undo** (Ctrl/⌘ Z) for every mark, entered or pencilled.
- Elapsed timer, automatic win detection, and an overprint stamp on solve.
- Your plate, marks and elapsed time are saved in `localStorage`, so a refresh
  or a closed tab picks up where you left off.
- Verify plate / Strip to clues / Set a new plate.

## Controls

| Action | Input |
| --- | --- |
| Set a figure | `1`–`9`, or press a figure in the Digit census |
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
├── style.css    # the plate: tokens, layout, states, motion
├── script.js    # puzzle generation, rendering, game logic, persistence
├── fonts/       # self-hosted Archivo variable (woff2)
└── README.md
```

`PRODUCT.md` and `.impeccable/` hold design context for the visual system and
are not part of the running game.
