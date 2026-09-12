# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain HTML + CSS + vanilla JavaScript, no build step, no dependencies — the
incumbent choice, and the user has confirmed a build step and network
dependencies (webfonts, CDN libraries) are permitted if the design earns them.
The choice made was to stay buildless, so the game keeps opening from `file://`
and deploys to any static host.

**Fonts are self-hosted, and the user has confirmed this is to stay.** The
Archivo variable font lives in `fonts/` as two `woff2` subsets (176KB total,
gated by `unicode-range`). This is deliberate, not incidental: the font's width
axis carries the entire type hierarchy, and no fallback in the stack has a
width axis, so a font fetched over the network would silently collapse two
distinct registers into one system face for any offline or `file://` reader.
The page therefore makes no network request of any kind. Do not trade this back
for a CDN link to save repository size.

## Users

Anyone who lands on the page — this is a public demo / portfolio piece, not a
private toy. Two real scenes: a first-time visitor who arrived to look, and a
player who stays to actually solve a grid. Desktop and mobile both have to be
genuinely good; the first impression carries weight because the page is
something the author would show people.

## Product Purpose

A complete, single-player Sudoku that runs entirely in the browser with no
account, no backend and no network round-trip. Success is a visitor who
understands the board instantly, plays without instruction, and finishes a
puzzle.

## Positioning

Every puzzle is generated in the browser at play time — a randomized
backtracking fill, then clues removed one at a time while re-proving the grid
still has exactly one solution. Nothing is served from a puzzle bank, so no two
sessions repeat, and every puzzle is provably fair. That generator, running
client-side, is the mechanism a neighbouring "sudoku app" page could not
truthfully copy.

## Operating Context

Opened as a static page (`file://`, GitHub Pages, or any static host). The
player works one cell at a time across a 9×9 grid, scanning rows, columns and
3×3 boxes for a digit that fits. Input is keyboard (digits 1–9, Backspace and
Delete, arrow keys) on desktop and touch on mobile. A session is a handful of
minutes to well over an hour, and the elapsed timer runs the whole way.

## Capabilities and Constraints

Confirmed and shipping today: unique-solution puzzle generation at three
difficulties (easy 40 clues, medium 32, hard 26); live conflict highlighting of
duplicate digits in a row, column or box; peer highlighting for the focused
cell; keyboard entry and arrow navigation; an elapsed timer; automatic win
detection; and New Game / Reset / Check actions.

The user has authorized new game features alongside the visual work, not only a
reskin. Generation is synchronous backtracking on the main thread and can
briefly block on hard difficulties — any new interface must survive that pause
rather than pretend it does not happen.

No accounts, no backend, no analytics, no puzzle server.

## Evidence on Hand

None beyond the working game itself. There are no users, testimonials, download
counts, ratings, or press to cite, and none may be invented. The demonstration
is the game running.

## Product Principles

1. The board is the product. Anything that competes with the 81 cells for
   attention is wrong.
2. Fairness is provable, not claimed — every puzzle is verified to have exactly
   one solution before it is offered.
3. State must be readable at a glance: given vs. entered, conflicted vs. clean,
   focused vs. peer. A player mid-scan should never have to decode the styling.
4. It runs anywhere, offline, forever. No dependency may be load-bearing for
   playability.

## Accessibility & Inclusion

Full keyboard play is a requirement, not a convenience — digits, Backspace and
Delete, and arrow-key navigation across the grid. Board state is announced via
a live region. Conflict and win states must not rely on color alone.
