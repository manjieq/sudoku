# Sudoku

A simple, single-player Sudoku game that runs entirely in the browser.

## Stack

Plain **HTML + CSS + vanilla JavaScript** — no framework, no build step, no
dependencies. For a small, self-contained game like this it keeps things
easy to read, easy to run (just open a file), and easy to deploy anywhere
that can serve static files (GitHub Pages, Netlify, a plain web server,
etc.). The trade-off is that it doesn't scale well if the project grows a
lot of state/UI complexity later — at that point a framework (e.g. React)
and a bundler would start paying for themselves.

## Features

- Puzzle generator that produces a full solved board via randomized
  backtracking, then removes clues one at a time while checking that the
  puzzle still has a **unique solution** (so every puzzle is solvable and
  fair).
- Three difficulty levels: Easy, Medium, Hard.
- Live conflict highlighting (duplicate values in a row/column/box are
  marked in red as you type).
- Row/column/box highlighting for the focused cell.
- Keyboard support: digits 1-9 to fill, Backspace/Delete to clear, arrow
  keys to move between cells.
- Timer and automatic win detection.
- New Game / Reset (back to the given clues) / Check buttons.

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
├── index.html   # page structure and controls
├── style.css    # layout and theming
├── script.js    # puzzle generation, rendering, game logic
└── README.md
```
