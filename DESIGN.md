---
name: Plate IX
description: A sudoku set as a printed laboratory reference chart — flat process ink on cool chart stock.
colors:
  stock: "#e4e9e1"
  stock-deep: "#d5dcd2"
  stock-edge: "#c3ccc0"
  ink: "#14171a"
  ink-2: "#4a5450"
  ink-3: "#5f6a65"
  band-2: "color-mix(in srgb, #e4e9e1 78%, #14171a)"
  band-3: "color-mix(in srgb, #e4e9e1 55%, #14171a)"
  paper: "#ffffff"
  entry: "#17357f"
  conflict: "#9e0f18"
  conflict-bright: "#b4121c"
  gold: "#e8b10c"
  fam-1: "#00794f"
  fam-2: "#6a2ea0"
  fam-3: "#ab7f00"
  fam-4: "#12617f"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 6.4vw, 4.6rem)"
    lineHeight: 0.8
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125, 'wght' 900"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.1rem, 3vw, 1.9rem)"
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 108, 'wght' 800"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 2vw, 1.65rem)"
    lineHeight: 1
    fontVariation: "'wdth' 108, 'wght' 700"
  figure:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 4.4vmin, 2.5rem)"
    lineHeight: 1
    fontVariation: "'wdth' 100, 'wght' 600"
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(0.82rem, 1.15vw, 0.95rem)"
    lineHeight: 1.4
    fontVariation: "'wdth' 92, 'wght' 500"
  note:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8rem"
    lineHeight: 1.35
    fontVariation: "'wdth' 86, 'wght' 400"
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.7rem"
    letterSpacing: "0.18em"
    fontVariation: "'wdth' 72, 'wght' 600"
  data:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.7rem"
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 66, 'wght' 600"
rounded:
  none: "0"
spacing:
  hair: "3px"
  xs: "0.3rem"
  sm: "0.45rem"
  md: "0.9rem"
  gutter: "clamp(1.25rem, 2.6vw, 2.5rem)"
  margin: "clamp(1rem, 3vw, 2.5rem)"
components:
  cell:
    backgroundColor: "{colors.fam-1}"
    textColor: "{colors.entry}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "0"
  cell-given:
    textColor: "{colors.ink}"
  cell-conflict:
    textColor: "{colors.conflict}"
  cell-marked:
    backgroundColor: "{colors.stock}"
  op:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.55rem"
  op-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  op-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    padding: "0.3rem 0.7rem"
  op-primary-hover:
    backgroundColor: "{colors.entry}"
    textColor: "{colors.stock}"
  op-switch-on:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  tally:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.entry}"
    rounded: "{rounded.none}"
    padding: "0.28rem 0.3rem 0.22rem"
  tally-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.gold}"
  tab:
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1.05rem 0.6rem"
  tab-active:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    padding: "0.5rem 1.05rem 0.95rem"
  family-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "1.5rem"
  family-chip-live:
    backgroundColor: "{colors.fam-1}"
    textColor: "{colors.stock}"
---

# Design System: Plate IX

## Overview

**Creative North Star: "The Laboratory Wall Chart"**

This is not an interface laid over a page; it is a single printed sheet. The
board is the sheet, and every control on it — the series tab strip, the digit
census, the state key, the operations list, the notes band, the ink bar at the
trim — is apparatus printed onto that same sheet at the same press. There is no
card, no panel floating over a background, and no toolbar anywhere. The sheet
runs full-bleed to a 1120px trim with hairline edges, and the black masthead
band and the notes band cross it edge to edge, the way a printed masthead
crosses paper.

The material is flat process ink on cool chart stock (`#e4e9e1`). Everything
that looks like depth here is a printing artifact rather than a lighting model:
paper tooth from a fixed-position `feTurbulence` overlay multiplied at 16%
opacity, two deliberate plate misregistrations (the gold masthead rule runs 2px
right and 3px low; the viridian frame under the plate seats 3px off), and four
registration crosses inset at the sheet's corners. Colour commits at page scale
but never washes: the nine box fields are a flat family tint under a two-pass
offset halftone screen, so they read as screened ink at reading distance and as
dots up close.

The discipline that governs everything inside the 81 cells is channel
separation. Givenness is carried by flat ink density and expanded weight;
repeats are carried by crimson *and* a printed proofreader's double rule under
the figure; the marked rank and file are carried by ruled black sightlines; the
marked box is carried by a gold frame. No two states are allowed to compete on
the same lightness axis, so a player mid-scan never has to decode the styling.

**Key Characteristics:**
- Flat process ink on chart stock; zero drop shadows, zero gradients as decoration
- Four family plate inks rotated across nine boxes so no two touching boxes share one
- Screened fields: flat tint plus a two-pass offset halftone at 3px pitch
- One variable face worked hard across its width axis (`wdth 125` down to `wdth 66`)
- Every corner square; every border a ruled hairline, rule or heavy rule
- All apparatus printed into the sheet — no floating toolbar, no modal chrome

## Colors

A cool chart-stock ground carrying black key ink, four saturated plate inks, and
three reserved working inks that each own exactly one meaning.

### Primary
- **Ink Black** (`{colors.ink}`): the key plate. Masthead band, all rules and
  heavy rules, sightlines, given figures, the marked cell's inset ring, the
  press progress bar, hover fills on operations and tallies.
- **Chart Stock** (`{colors.stock}`): the sheet itself and every surface printed
  on it — the plate ground, tallies, operation rows. Also the reversed text
  colour on any black fill.

### Secondary — the four plate inks
- **Viridian** (`{colors.fam-1}`): box family 1; also the misregistered frame
  under the plate and the "clear" state of the notes line.
- **Manganese** (`{colors.fam-2}`): box family 2.
- **Chromate** (`{colors.fam-3}`): box family 3.
- **Cerulean** (`{colors.fam-4}`): box family 4; the ink the static state-key
  swatches are printed in.

### Tertiary — the working inks
- **Entry Blue** (`{colors.entry}`): the hand. Every figure the player enters,
  the census figures, and the primary operation's hover fill. Never used for
  structure.
- **Crimson** (`{colors.conflict}`): reserved absolutely for repeats — the
  conflicted figure, its printed underrule, and the fault state of the notes
  line. **Bright Crimson** (`{colors.conflict-bright}`) appears only on the
  SOLVED overprint.
- **Gold** (`{colors.gold}`): masthead accent and live apparatus only — the
  misregistered masthead rule, the elapsed counter, live index tabs, the marked
  box frame, the focus ring inside the marked cell, the pencil switch when on,
  and `::selection`.

### Neutral
- **Stock Deep** (`{colors.stock-deep}`): the surround outside the sheet's trim
  and the scrollbar track.
- **Stock Edge** (`{colors.stock-edge}`): the sheet's 1px left and right trim.
- **Ink 2** (`{colors.ink-2}`): secondary printed prose — key notes, legend
  text, press percentage, the marked cell's coordinate.
- **Ink 3** (`{colors.ink-3}`): the data layer — index ticks, trim caption, ink
  bar labels, notes meta, keyboard hints, disabled operations, scrollbar thumb.
- **Band Prose** (`{colors.band-2}`): stock mixed back toward the ink band for
  secondary prose reversed out of the black masthead — the standfirst.
- **Band Label** (`{colors.band-3}`): the quieter step of the same mix, for the
  small letterspaced caps on the band — datum terms and the series label.
- **Print Paper** (`{colors.paper}`): pure white, and the only pure white in the
  system. It exists solely inside `@media print`: when the sheet is printed onto
  real paper, the paper is the stock, so the screen's chart tone is dropped
  rather than re-printed over itself.

### Named Rules
**The Reserved Ink Rule.** Crimson means a repeat and nothing else. Entry blue
means a figure the player set and nothing else. Gold means live apparatus and
nothing else. If a new surface needs a third meaning, it takes a family plate
ink or it takes black — it does not borrow a reserved ink.

**The Four Plates Rule.** Box colour comes from exactly four inks rotated across
the nine boxes (`[1,2,3,4,1,2,3,4,1]`) so no two touching boxes share one. A
fifth family ink is not a colour decision, it is a break in the press run.

**The Reversed Band Rule.** Anything set on the black masthead band is a mix of
stock back toward the ink, never an opacity and never a grey: `{colors.band-2}`
for prose, `{colors.band-3}` for labels, full stock for the loudest register.
Two named steps cover every reversed value on the band; a third means a new
register, not a nudge.

**The Derived Tint Rule.** A cell never names its own colour. It inherits one
`--fam` custom property and derives its whole ladder from it by `color-mix`
against the stock: 17% at rest, 24% on hover, 28% when given. Add a state by
adding a step to the ladder, never by writing a new hex.

## Typography

**Display / Body / Label Font:** Archivo Variable (fallback: Helvetica Neue,
Helvetica, Arial, sans-serif) — self-hosted as two `unicode-range`-gated woff2
subsets in `fonts/`.

**Character:** One family, two extreme registers. Expanded gothic caps for
titling and counters; hard-condensed caps for the data layer. The type reads as
a printer's specimen of a single face pushed to both ends of its width axis, not
as a pairing.

### Hierarchy

The width axis, not size, is the hierarchy. Every role below is one face at a
different width.

- **Display** (`wdth 125`, `wght 900`, clamp 2.4–4.6rem, line-height 0.8,
  -0.035em, uppercase): the chart title in the masthead. Once per sheet.
- **Headline** (`wdth 108`, `wght 800`, clamp 1.1–1.9rem, 0.16em, uppercase):
  the press line during plate generation. The SOLVED overprint runs wider still
  (`wdth 118`, `wght 900`).
- **Title** (`wdth 108`, `wght 700`, clamp 1.15–1.65rem): masthead counters
  (plate number, clue count, elapsed) and census figures.
- **Figure** (`wdth 100`, `wght 600`, clamp 1.15–2.5rem): a figure entered by
  hand. **Given figures are set wider and heavier** (`wdth 112`, `wght 800`) in
  black — the press set them, so they are machine-set, not handwritten.
- **Body** (`wdth 92`, `wght 500`, clamp 0.82–0.95rem, max 72ch): the notes
  line. The masthead standfirst is slightly narrower (`wdth 88`, `wght 400`, max
  54ch); key notes and legend text narrower again (`wdth 86`, `wght 400`, max
  34ch).
- **Label** (`wdth 72–76`, `wght 600–700`, 0.7–0.74rem, 0.18–0.2em, uppercase):
  every section head and field label — datum terms, key headings, notes label,
  index ticks, press percentage.
- **Data** (`wdth 66–74`, `wght 600–700`, 0.48–0.72rem): the smallest printed
  layer — ink bar labels, cell coordinates, pencilled candidates, keyboard
  hints, tally remainders.

### Ramp exceptions (intentional, not drift)

Eight sizes in the build sit off the ramp above, and they sit there on purpose:
`0.75rem` on the skip link, `0.74rem` on key-block heads, `0.5rem` on the
pencil swatch, and the fluid endpoints of the cell coordinate, the pencil grid,
the stamp word, the stamp meta and the census figure. Each is a legibility
decision tuned against a shipped, reviewed rendering at a specific size — the
smallest type on the plate sitting over a screened field, or a clamp endpoint
that has to stay whole at both ends of its range. Snapping them to the nearest
ramp step would trade a verified rendering for a tidier table. They are a
closed list of named call sites, not a licence: **new** surfaces take a ramp
role, and an addition to this list has to be argued from a rendering the same
way these were.

### Named Rules
**The Width-Is-Hierarchy Rule.** Rank is expressed by `font-variation-settings`
width before it is expressed by size. Titling never goes below `wdth 108`; the
data layer never goes above `wdth 92`. Two things at the same size are still
separable because they are at different widths.

**The Self-Hosted Face Rule.** Archivo ships from `fonts/` and stays there. No
CDN link, ever: no fallback in the stack has a width axis, so a font fetched over
a network that is not there collapses the entire hierarchy into one flat system
face. The page makes no network request of any kind.

**The Figures-Are-Tabular Rule.** `font-variant-numeric: tabular-nums
lining-nums` is set on the body and inherits everywhere. Counters, timers and
81 figures must not shift width as their digits change.
`font-synthesis-weight: none` is set for the same reason: the real axis or
nothing.

## Layout

The root element and the body both carry the deep stock ground, so overscroll
and any area beyond the sheet stay on the ground rather than flashing the
browser's white. The sheet is a flex column capped at 1120px, centred in that
deeper stock surround, with a 1px trim on each side and a minimum height of the viewport. It
runs: masthead band, plate body, notes band, trim furniture — in that order,
top to bottom, with the registration crosses inset over all of it.

The masthead and the notes band are **full-bleed across the sheet**: they carry
their own generous internal inset (`clamp(1rem, 3vw, 2.5rem)` horizontally) and
deliberately do not respect an outer container pad. This is an accepted
deviation from generic container-padding expectations — a printed masthead that
stopped short of the trim would be the defect.

The plate body is a two-column grid: the plate on the left in a
`minmax(0, 1fr)` track, a fixed key column on the right at
`minmax(228px, 17.5rem)`, gutter `{spacing.gutter}`. The plate itself sits in
its own nested grid whose first row and first column are the index rails
(`clamp(1.3rem, 2.4vw, 2.1rem)`), so the A–I and 1–9 tabs align exactly with the
cell edges rather than being positioned by eye. The plate is capped by
`max(17rem, min(100%, calc(100vh - 19.5rem)))` so it stays whole in the first
viewport instead of pushing the notes band off screen, and holds
`aspect-ratio: 1`.

Rhythm is tight and printed: 3px between census tallies and ink chips, 2px
between family chips, `{spacing.sm}` inside key blocks, `{spacing.md}` between
them. Everything else is a `clamp()` against viewport width, so density scales
continuously rather than stepping.

**Breakpoints.** At 960px the body collapses to one column and the key column
becomes two columns with the census widening to nine tallies at a 3rem minimum
touch height. At 860px the cell coordinate is dropped (it would clamp to ~6.7px;
an unreadable coordinate is worse than none, and the cell's own ruling still
carries the empty state). At 640px the masthead stacks, the key column goes
single-column, the notes band stacks, and the ink bar keeps its colour patches
but drops its labels rather than wrapping.

### Named Rules
**The One Axis Rule.** Masthead, plate body, notes band and trim all start on
the same left margin (`clamp(1rem, 3vw, 2.5rem)`). Nothing is centred on the
sheet except the sheet itself.

**The No-Toolbar Rule.** State is typeset into the plate. There is no floating
bar, no sticky header, no bottom number pad — a control that cannot be printed
into the sheet does not belong on it.

## Elevation & Depth

**This system has no shadows in the lighting sense.** Nothing floats, nothing
hovers above the page, and no element casts light. The only `box-shadow`
declarations in the build are `inset` rings used as printed keylines (the marked
cell's 3px black ring and its 6px gold focus ring inside it) and a solid,
zero-blur offset used to print the second stroke of the proofreader's double
underrule on a repeat. There are no blurred, offset, or coloured drop shadows,
and none may be added.

Depth is entirely a printing story, built from four devices:

- **Paper tooth** — a fixed `feTurbulence` noise tile, desaturated,
  `mix-blend-mode: multiply` at 0.16 opacity across the viewport. It is the only
  thing standing between the stock and a flat digital fill.
- **Screened fields** — a flat family tint under a two-pass offset halftone
  (3px pitch, 0.5px dots, second pass offset by half the pitch), so the board's
  colour has physical frequency rather than opacity.
- **Misregistration** — the gold masthead rule offset 2px right and 3px low; the
  viridian frame seated 3px off the plate's black keyline. Two occurrences, both
  authored, both fixed.
- **Rule weight** — three border weights carry structure where a shadow would
  elsewhere: hairline (1px black at 26%), rule (2px black), heavy (3px black).

### Named Rules
**The Press-Not-Light Rule.** Depth comes from ink on paper: tooth, screen,
misregistration, rule weight. It never comes from a light source. If a new
surface needs separation, it takes a heavier rule or a denser screen — not a
shadow.

## Shapes

Every corner in this system is square. `border-radius` appears nowhere in the
build and is not available: the radius scale has exactly one step, `0`. The form
language is ruled rectangles — bands, blocks, chips, patches, frames — abutted
edge to edge or separated by a 2–3px gap.

Borders are the primary form device and come in exactly three weights: the
**hairline** (1px solid black at 26% opacity) for the quiet keylines around
cells, swatches, tallies and operation rows; the **rule** (2px solid black) for
box boundaries inside the plate, key-block heads and the press bar; and the
**heavy rule** (3px solid black) for the plate frame and the top of the notes
band. Cell borders are applied on the right and bottom only, with the last row
and column zeroed, so the grid never doubles a line.

Recurring silhouettes: the **band** (full-bleed horizontal strip: masthead,
notes, trim), the **chip** (a small labelled rectangle of ink: family chips,
ink bar patches, keyboard hints, the op-switch state pill), and the **frame**
(a ruled rectangle marking a region: plate frame, sightlines, marked-box gold
frame).

## Components

### Operations (buttons)
Printed list rows, not buttons in the UI sense — left-aligned uppercase labels
in `wdth 84 / wght 700`, hairline rule between rows, keyboard hint set right in
a hairline-bordered chip.
- **Shape:** square (0), no fill at rest, hairline top rule only.
- **Default:** stock ground, black label.
- **Hover:** the row inverts to a solid black fill with stock text, `150ms`
  ease; the keyboard chip inverts with it.
- **Primary:** solid black at rest with stock text, inset padding widened to
  0.7rem; hovers to **entry blue** — the only place a fill changes hue.
- **Switch (Pencil):** carries an `aria-pressed` state chip; when on, the whole
  row fills gold with black text and the chip inverts to black-on-gold.
- **Disabled:** ink-3 label, no hover response at all.

### Census Tally (chip / numeric control)
The digit census: nine square hairline chips, each an entry-blue figure over a
condensed remainder count.
- **Default:** stock ground, hairline border, entry-blue figure
  (`wdth 108 / wght 700`), ink-3 remainder.
- **Hover:** inverts to black ground with a **gold** figure and a muted gold
  remainder — the same gold-on-black vocabulary as a live index tab.
- **Spent (zero remaining):** the figure drops from `wght 700` to `wght 400` at
  the same width, the ground takes a 7% black wash, the cursor goes default.
  Exhaustion is shown by weight loss, not by fading the colour out.

### Series Tabs (navigation)
A tab strip printed into the black masthead band, aligned to its bottom edge.
- **Default:** a 16%-stock wash on black, 72%-stock label, two lines (name over
  clue count).
- **Hover:** the wash lifts to 26% and the label goes full stock.
- **Active (`aria-pressed="true"`):** the tab fills with stock and black text
  and grows 0.35rem taller with a -0.2rem bottom margin, so it physically seats
  into the sheet below the band. There is no underline; the tab becomes part of
  the paper.

### State Key (legend)
Four rows, each a 1.7rem square swatch built **exactly the way the board is
built** — same cerulean flat tint, same 3px halftone screen — carrying a figure
in the state being described (given, entered, conflicted, pencilled). The legend
is never a diagram of the board; it is a cutting of it.

### Family Key (chips)
Nine numbered chips, one per box, each screened in its own plate ink at the
chip tint step. The chip for the box containing the marked cell **drops the
screen and prints at full ink** with reversed stock text — the only chip on the
sheet ever allowed to go solid.

### The Plate (signature component)
The 81 cells, and the reason the rest of the sheet exists.
- **Cell at rest:** family tint at 17% under the halftone screen, entry-blue
  figure, hairline right/bottom borders, and a printed coordinate (file letter +
  rank number) set in the top-left corner in 45% family ink mixed into black —
  measured at 5.9:1 or better on all four plates. An empty cell is never blank;
  it still shows its own ruling.
- **Hover:** tint steps to 24%. Suppressed entirely under `(hover: none)`.
- **Given:** tint steps to 28%, the figure goes black at `wdth 112 / wght 800`,
  the coordinate is removed, the cursor goes default.
- **Conflict:** the figure goes crimson **and** takes a printed proofreader's
  double underrule (a 0.09em bar with a solid zero-blur second stroke below it).
  Never colour alone.
- **Marked:** the cell clears to plain stock with the screen removed and takes
  a 3px inset black ring, lifting it above its neighbours in z-order. Its focus
  ring is a second 6px gold inset inside the black one; the cell's default
  outline is suppressed in favour of it.
- **Pencilled candidates:** a 3×3 sub-grid inset in the cell, set in condensed
  `wdth 74 / wght 700` at 42% family ink mixed into black. Shown only when the
  player pencils them.

### The Signature Interaction
Marking a cell drives ink into the apparatus rather than washing the board:
- the cell's two index tabs fill **black with gold figures** (`.tick.is-live`);
- the cell's family chip drops its screen and prints solid;
- a ruled **rank** sightline (2px black top and bottom) spans the full plate
  width at the marked row, and a ruled **file** sightline spans its height at
  the marked column, both positioned from `--mark-row` / `--mark-col` custom
  properties set on the plate frame;
- a **gold 3px frame** marks the box, positioned from `--mark-box-row` /
  `--mark-box-col`.

Four channels, four different visual devices, no two on the same lightness
axis. The plate is never tinted as a whole.

### Press State
Generation is real work and says so. A 92%-opaque stock veil over the plate
carrying an uppercase press line (`wdth 108 / wght 800`, 0.16em), a 2px-ruled
progress bar whose fill is a black `scaleX` transform transitioning at
`120ms linear`, and a condensed percentage line. It covers the plate only — the
masthead, key column and notes band stay live.

### The Overprint
On completion, a SOLVED stamp lands over the plate: bright crimson, rotated
-6.5deg, `mix-blend-mode: multiply`, inside a 6px double border, with a solid
crimson meta band beneath it. It is an overprint on the plate, not a dialog:
`pointer-events: none`, nothing to dismiss.

### Named Rules
**The Two Moments Rule.** The build authors exactly two animations, both
blur-to-sharp, both ending at the element's already-visible default state:
`ink` (170ms — a figure lands large, wet and blurred, then bites) and `strike`
(300ms — the stamp hits). Everything else that moves is a 150ms `cubic-bezier(0.16, 1, 0.3, 1)`
colour transition. No fades in, no slides, no entrance animations.
`prefers-reduced-motion: reduce` kills every animation and transition on the
page with `!important`.

**The Browser-Surface Rule.** The chrome the browser owns is printed too:
`::selection` is gold on black ink, `:focus-visible` is a 2px black outline at
2px offset, and the scrollbar is themed end to end (11px, ink-3 thumb with a
3px stock-deep border, ink-2 on hover, stock-deep track). Leaving a default blue
selection or a default scrollbar on this sheet breaks the material.

## Do's and Don'ts

### Do:
- **Do** derive every box colour from the single `--fam` custom property and the
  tint ladder (17% / 24% / 28%), never by writing a new hex into a rule.
- **Do** carry rank with the width axis first — titling at `wdth 108`+, data at
  `wdth 92` or below, and the display line at `wdth 125`.
- **Do** give every state its own channel: flat ink for givenness, ruled lines
  for rank and file, a gold frame for the box, crimson plus a printed rule for a
  repeat.
- **Do** build legend swatches out of the same tint and the same halftone screen
  as the live board, so the key is a cutting of the plate rather than a drawing
  of it.
- **Do** keep the masthead, notes band and trim full-bleed to the sheet's edges
  with their own internal inset.
- **Do** reverse text out of the black band through the two named band mixes
  rather than by lowering opacity or reaching for a grey.
- **Do** keep the root element on the deep stock ground, not just the body, so
  overscroll never exposes browser white.
- **Do** theme the browser's own surfaces — selection, focus ring, scrollbar —
  in ink and stock.
- **Do** state a state in text as well as colour (`aria-pressed`, the notes
  line, the tally remainder); colour never carries a meaning alone.

### Don't:
- **Don't** add a drop shadow, a blur, a glow, or a gradient used as lighting.
  Depth here is tooth, screen, misregistration and rule weight.
- **Don't** use pure white anywhere on screen. `{colors.paper}` exists only in
  the print stylesheet, where the paper itself is the stock.
- **Don't** round a corner. The radius scale has one step and it is `0`.
- **Don't** load the type face over a network. Self-hosted `woff2` in `fonts/`
  is the system, because the width axis has no fallback.
- **Don't** spend a reserved ink on decoration: crimson is repeats, entry blue
  is the player's hand, gold is live apparatus and the masthead.
- **Don't** introduce a fifth box family ink or break the four-ink rotation.
- **Don't** wash the plate, dim non-peer cells, or tint the whole board to show
  focus — the apparatus takes the ink, not the field.
- **Don't** float a toolbar, sticky bar, modal, or number pad over the sheet. A
  control that cannot be printed into the sheet does not belong on it.
- **Don't** add an entrance animation, a fade-in, or a slide. Two authored
  moments exist; both start from the element's visible default.
