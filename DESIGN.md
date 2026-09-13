---
name: Plate IX
description: A sudoku wearing the Weighted Gradebook theme — warm paper, white cards, Georgia headings over a sans UI, indigo and amber in place of grey and green.
colors:
  paper: "#f2eee6"
  surface: "#ffffff"
  surface-alt: "#faf6ee"
  rule: "#dfd8c9"
  rule-strong: "#b9b0a0"
  neutral-bg: "#ede8dc"
  ink: "#262532"
  ink-soft: "#656072"
  accent: "#4a45b0"
  accent-ink: "#f5f4fc"
  accent-bg: "#eceafa"
  highlight: "#b07407"
  highlight-bg: "#f6ecd9"
  flag: "#b23a2c"
  flag-bg: "#f7e6e2"
  good: "#147c8c"
  good-bg: "#e1eff2"
  fam-1: "#3e44a8"
  fam-2: "#8a3a86"
  fam-3: "#a06a00"
  fam-4: "#147c8c"
colorsDark:
  paper: "#17161c"
  surface: "#1f1e27"
  surface-alt: "#26242f"
  rule: "#35323f"
  rule-strong: "#514c60"
  neutral-bg: "#2a2833"
  ink: "#ece8f2"
  ink-soft: "#a09aae"
  accent: "#9a93f0"
  accent-ink: "#14122a"
  accent-bg: "#2a2647"
  highlight: "#e0ae5a"
  highlight-bg: "#372c1b"
  flag: "#e98a76"
  flag-bg: "#3a2420"
  good: "#6fc4d4"
  good-bg: "#1c3036"
  fam-1: "#8a8fe8"
  fam-2: "#d089cc"
  fam-3: "#d9a63e"
  fam-4: "#5fbacb"
typography:
  display:
    fontFamily: "Georgia, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(1.7rem, 3.4vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Georgia, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(1.9rem, 8vmin, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Georgia, Iowan Old Style, Times New Roman, serif"
    fontSize: "1.08rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Archivo, Segoe UI, -apple-system, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 4.4vmin, 2.4rem)"
    fontWeight: 600
    lineHeight: 1
  body:
    fontFamily: "Archivo, Segoe UI, -apple-system, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.5
  note:
    fontFamily: "Archivo, Segoe UI, -apple-system, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.45
  control:
    fontFamily: "Archivo, Segoe UI, -apple-system, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
  label:
    fontFamily: "Archivo, Segoe UI, -apple-system, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  readout:
    fontFamily: "Consolas, SFMono-Regular, Menlo, DejaVu Sans Mono, monospace"
    fontSize: "1.12rem"
    fontWeight: 600
    lineHeight: 1.2
  data:
    fontFamily: "Consolas, SFMono-Regular, Menlo, DejaVu Sans Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
rounded:
  none: "0"
  tick: "5px"
  chip: "6px"
  swatch: "7px"
  control: "8px"
  tile: "10px"
  card: "14px"
  pill: "999px"
spacing:
  hair: "3px"
  xs: "6px"
  sm: "8px"
  cardPadY: "16px"
  cardPadX: "18px"
  stack: "clamp(1.1rem, 2vw, 1.75rem)"
  gutter: "clamp(1rem, 2vw, 1.75rem)"
  margin: "clamp(1rem, 2.4vw, 1.5rem)"
elevation:
  shadow: "0 1px 2px rgba(38,37,50,0.06), 0 8px 24px -12px rgba(38,37,50,0.18)"
  shadowLift: "0 2px 4px rgba(38,37,50,0.08), 0 18px 40px -18px rgba(38,37,50,0.32)"
components:
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.card}"
    padding: "16px 18px 18px"
    shadow: "{elevation.shadow}"
  cell:
    backgroundColor: "color-mix(in srgb, {colors.fam-1} 8%, {colors.surface})"
    textColor: "{colors.accent}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "0"
  cell-given:
    backgroundColor: "color-mix(in srgb, {colors.fam-1} 15%, {colors.surface})"
    textColor: "{colors.ink}"
    fontWeight: 700
  cell-conflict:
    textColor: "{colors.flag}"
  cell-marked:
    backgroundColor: "{colors.surface}"
    shadow: "inset 0 0 0 2px {colors.accent}"
  op:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  op-hover:
    borderColor: "{colors.accent}"
    textColor: "{colors.accent}"
  op-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
  op-switch-on:
    backgroundColor: "{colors.highlight-bg}"
    borderColor: "{colors.highlight}"
    textColor: "{colors.highlight}"
  op-disabled:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.ink-soft}"
  tally:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.accent}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.control}"
    padding: "7px 4px 6px"
  tally-hover:
    backgroundColor: "{colors.accent-bg}"
    borderColor: "{colors.accent}"
  tally-spent:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.ink-soft}"
  tab:
    textColor: "{colors.ink-soft}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "6px 14px 7px"
  tab-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    shadow: "{elevation.shadow}"
  datum:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.tile}"
    padding: "8px 14px 9px"
    shadow: "{elevation.shadow}"
  family-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    height: "1.5rem"
  family-chip-live:
    backgroundColor: "{colors.fam-1}"
    textColor: "{colors.surface}"
  pill:
    backgroundColor: "{colors.good-bg}"
    textColor: "{colors.good}"
    rounded: "{rounded.pill}"
    padding: "0.4em 1.1em 0.45em"
---

# Design System: Plate IX

## Overview

**Creative North Star: "The Gradebook Sheet"**

The theme is borrowed, deliberately and in full, from the Weighted Gradebook
calculator: warm paper as the ground, white cards with a hairline rule and a
soft shadow as every surface, Georgia headings over a sans UI, and monospace
for anything countable. What changed on the way across is the palette — the
gradebook's grey ink and teal-green accent are repointed to **indigo and
amber** — and the subject, which is a 9×9 grid rather than a table of students.

The page is a single centred column of cards on paper, capped at 1120px: a
masthead that is type and three readout tiles, the plate card beside a stack of
key cards, a notes card, and a quiet ink key at the foot. Nothing bleeds to the
edge and nothing is a band; the shell's one job is to hold cards on a ground
and let them breathe.

Material is paper and card, not ink on stock. Depth is a light model again —
two named shadows, used at exactly two strengths — and every corner is
rounded on a scale that runs from a 5px tick to a 999px pill. There is no
texture overlay, no halftone screen, and no misregistration anywhere in the
build; a surface separates from the ground by its rule, its fill and its
shadow.

What survived the retheme untouched is the **channel separation** inside the 81
cells. Givenness is carried by ink colour and weight over a denser wash;
repeats are carried by crimson *and* a printed rule under the figure; the
marked rank and file are carried by hairline indigo sightlines; the marked box
is carried by an amber frame. No two states compete on the same lightness axis,
so a player mid-scan never has to decode the styling.

The system ships **light and dark**, following the reader's system setting,
with a `[data-theme]` override available on the root for both directions.

**Key Characteristics:**
- Warm paper ground; every surface a white card with a hairline rule and a soft shadow
- Georgia for headings, a sans for the UI, monospace for every countable value
- Four family inks rotated across nine boxes so no two touching boxes share one
- Indigo carries the player's hand and every live control; amber carries exactly two states
- One rounding scale from 5px to a full pill; nothing square except the cells
- Two shadow strengths, and inset rings for keylines — no other elevation

## Colors

A warm paper ground carrying near-black ink, one indigo accent, a reserved
amber, and a flag/good pair — plus four family inks for the boxes. Every token
is declared on bare `:root` first and only *redefined* in the dark blocks.

### Primary
- **Accent Indigo** (`{colors.accent}`): the hand and the live control. Every
  figure the player enters, the census figures, the active series tab, the
  primary operation, the marked cell's ring, the live index tabs, the rank and
  file sightlines, hover borders. It is the only hue allowed to mean
  "interactive".
- **Surface** (`{colors.surface}`): every card — the plate frame, the three key
  blocks, the notes card, the readout tiles, the marked cell, keyboard hints.
- **Paper** (`{colors.paper}`): the ground the cards sit on, carried by both the
  root element and the body so overscroll never exposes browser white.

### Secondary — the four family inks
- **Indigo** (`{colors.fam-1}`): box family 1.
- **Plum** (`{colors.fam-2}`): box family 2.
- **Ochre** (`{colors.fam-3}`): box family 3.
- **Cerulean** (`{colors.fam-4}`): box family 4; also the ink the static
  state-key swatches are washed in.

Family inks appear only as a low-percentage wash under the figures and in the
family chips. They never colour text, never colour a control, and never reach
full strength except in a live family chip and the ink key's dots.

### Tertiary — the reserved inks
- **Amber** (`{colors.highlight}`): exactly two jobs, and they are the same job
  seen twice — the frame around the box containing the marked cell, and the
  pencil switch when it is on. Amber means "you are drawing here".
- **Crimson** (`{colors.flag}`): reserved absolutely for repeats — the
  conflicted figure, its printed underrule, the conflict swatch in the state
  key, and the fault state of the notes line.
- **Teal** (`{colors.good}`): success only — the Solved card and its pill, and
  the clear state of the notes line. It is the same value as `{colors.fam-4}`
  in light mode by design: the cleared board and the fourth plate are the same
  ink.

Each reserved ink has a tinted ground for a filled state: `{colors.highlight-bg}`,
`{colors.flag-bg}`, `{colors.good-bg}`, and `{colors.accent-bg}` for the accent.

### Neutral
- **Ink** (`{colors.ink}`): body text, headings, and given figures.
- **Ink Soft** (`{colors.ink-soft}`): the whole secondary layer — standfirst,
  key notes, legend text, labels, index ticks, tally remainders, notes meta,
  keyboard hints, disabled operations, cell coordinates and pencil marks.
- **Rule** (`{colors.rule}`): every hairline — card borders, control borders,
  cell borders.
- **Rule Strong** (`{colors.rule-strong}`): the 3×3 box boundaries inside the
  plate and the scrollbar thumb. It is the only heavier rule in the system.
- **Surface Alt** (`{colors.surface-alt}`): the recessed fill inside a card —
  operations, tallies, the series tab track.
- **Neutral BG** (`{colors.neutral-bg}`): the "spent" ground — an exhausted
  tally, a disabled operation, and the unfilled half of the press meter.

### Named Rules
**The Reserved Ink Rule.** Crimson means a repeat. Amber means the box you are
drawing in. Teal means solved. Indigo means the player's hand and anything live.
A new surface that needs a fifth meaning takes a family ink or takes ink-soft —
it does not borrow a reserved ink.

**The Four Plates Rule.** Box colour comes from exactly four inks rotated across
the nine boxes (`[1,2,3,4,1,2,3,4,1]`) so no two touching boxes share one. A
fifth family ink is a break in the system, not a colour decision.

**The Derived Tint Rule.** A cell never names its own colour. It inherits one
`--fam` custom property and derives its whole ladder from it by `color-mix`
against `--cell-base` (the card surface): **8%** at rest, **13%** on hover,
**15%** when given, **18%** for a family chip. Add a state by adding a step to
the ladder, never by writing a new hex.

**The Both-Schemes Rule.** Every colour is defined on bare `:root` and then
*redefined* — never first defined — inside `@media (prefers-color-scheme: dark)`
(guarded `:root:not([data-theme="light"])`) and `:root[data-theme="dark"]`. A
token that exists only inside a media block is a bug: it leaves one of the three
theme states (light, dark, explicit override) undefined.

**The Dark Wash Rule.** Dark mode is not the light ladder inverted. Its tint
ladder is **8% / 14% / 15% / 22%** against a dark card, and its family inks are
lighter, less saturated values — at the light-mode percentages the washes stop
reading as tint and start reading as blocks of colour competing with the
figures.

## Typography

**Headings:** Georgia (fallback: Iowan Old Style, Times New Roman, serif).
**UI:** Archivo Variable (fallback: Segoe UI, system sans), self-hosted as two
`unicode-range`-gated woff2 subsets in `fonts/`.
**Data:** Consolas (fallback: SF Mono, Menlo, DejaVu Sans Mono, monospace).

**Character:** three registers with three jobs, which is the borrowed theme's
whole typographic idea. A serif names a thing, a sans explains it, and a
monospace counts it. Archivo stands in for the theme's Segoe UI because Segoe
exists on exactly one platform; it is used at ordinary weights, with none of the
width-axis extremes the previous direction ran on.

### Hierarchy
- **Display** (Georgia 600, clamp 1.7–2.3rem, -0.01em): the chart title. Once
  per page.
- **Headline** (Georgia 600, clamp 1.9–3.4rem): the Solved card's word. The
  press line is the same register at clamp 1.05–1.5rem.
- **Title** (Georgia 600, 1.08rem): the head of each key card.
- **Figure** (sans 600, clamp 1.15–2.4rem): a figure entered by hand. **Given
  figures are set at 700 in `{colors.ink}`** — the press set them, so they are
  machine-set, not handwritten.
- **Body** (sans 400, 0.92rem/1.5): the masthead standfirst at 58ch. The notes
  line is 0.88rem at 76ch; key notes and legend text are 0.84rem at 36ch.
- **Control** (sans 500, 0.85rem): operations and series tabs. The primary
  operation goes to 600.
- **Label** (sans 600, 0.68–0.7rem, 0.06em, uppercase): every field label —
  datum terms, the series label, the notes label, index ticks.
- **Readout** (mono 600, 1.12–1.2rem): the three masthead values and the census
  figures.
- **Data** (mono 500–600, 0.7–0.8rem): the small countable layer — tab clue
  counts, tally remainders, notes meta, press percentage, keyboard hints, family
  chips, the Solved pill. Cell coordinates (clamp 0.46–0.56rem) and pencilled
  candidates (clamp 0.46–0.68rem) are the same register at plate scale.

### Named Rules
**The Three Registers Rule.** Serif names, sans explains, mono counts. A value
that changes as the game runs — a timer, a remainder, a percentage, a
coordinate — is monospace, so it cannot re-flow as its digits change. A label
that describes such a value is sans. Nothing else is Georgia except a heading.

**The Self-Hosted Face Rule.** Archivo ships from `fonts/` and stays there. No
CDN link, ever: the page makes no network request of any kind and must run from
`file://` forever. Georgia and the monospace stack are system faces on purpose —
they are the two registers that cannot be shipped.

**The Figures-Are-Tabular Rule.** `font-variant-numeric: tabular-nums
lining-nums` is set on the body and inherits everywhere, so 81 figures and every
counter hold their width.

## Layout

The shell is a flex column capped at 1120px and centred on the paper ground,
with `{spacing.margin}` of side padding and `{spacing.stack}` between sections.
It **flows**: it does not stretch to the viewport, so on a tall screen the notes
card sits directly under the content rather than being pinned to the bottom of
the window.

The masthead is a two-column grid — title and standfirst on the left, the three
readout tiles on the right — with the series switch spanning both below them.
The plate body is a two-column grid: the plate on the left in a
`minmax(0, 1fr)` track, the key column on the right at `minmax(244px, 19rem)`,
gutter `{spacing.gutter}`. The plate sits in its own nested grid whose first row
and first column are the index rails (`clamp(1.3rem, 2.4vw, 1.9rem)`), so the
A–I and 1–9 tabs align exactly to the cell edges rather than by eye. The plate
card is capped by `max(17rem, min(100%, calc(100vh - 21rem)))` so it stays whole
in the first viewport, and holds `aspect-ratio: 1` with `overflow: hidden` so
the cells clip to its radius.

Rhythm inside a card: 6px between census tallies and between operations, 3px
between family chips, 8px between readout tiles, 16/18px of card padding.
Everything at page scale is a `clamp()` against viewport width, so density
scales continuously rather than stepping.

**Breakpoints.** At 960px the body collapses to one column and the key column
becomes two columns, with the census widening to nine tallies at a 3rem minimum
touch height. At 860px the cell coordinate is dropped — it would clamp to ~6.7px,
and an unreadable coordinate is worse than none. At 640px the masthead stacks,
the key column goes single-column, the notes card stacks, and the series tabs
stretch to fill the row.

### Named Rules
**The Card-Not-Band Rule.** Every region is a card inset from the shell's
margin. Nothing bleeds to the edge of the page, and nothing is a full-width
band — that was the previous direction and its removal is the retheme.

**The Flowing Shell Rule.** The shell has no `min-height`, and no section has
`flex: 1`. Cards sit at the top of the page in their natural height; empty space
below them is the ground, not a stretched card.

**The No-Toolbar Rule.** State is typeset into the page. There is no floating
bar, no sticky header, no bottom number pad — the census doubles as the touch
keypad in its own card.

## Elevation & Depth

Two shadows, both from the borrowed theme, both two-layer (a 1–2px contact
shadow plus a wide, heavily negative-spread ambient):

- **`{elevation.shadow}`** — every resting card: the plate frame, key blocks,
  the notes card, readout tiles, and the active series tab.
- **`{elevation.shadowLift}`** — exactly one element, the Solved card, which is
  the only thing in the system that sits above the page rather than on it.

In dark mode both are re-declared in black at higher opacity rather than scaled,
because a shadow tinted with the light scheme's ink disappears on a dark ground.

The only other `box-shadow` in the build is **inset**, used as a printed
keyline: the marked cell's 2px accent ring, and the 5px accent-tinted second
ring that replaces its focus outline.

### Named Rules
**The Two Strengths Rule.** A surface is either resting (`shadow`) or lifted
(`shadowLift`). There is no third elevation, no hover lift, and no shadow on a
control — a control separates by its border, its fill, and its ground.

## Shapes

One rounding scale, used top to bottom: **14px** cards, **10px** tiles and the
series-tab track, **8px** controls (operations, tallies, tabs), **7px** legend
swatches, **6px** family chips, **5px** index ticks and keyboard hints, **999px**
pills (the press meter, the Solved pill, the pencil state chip, ink-key
entries), and **4px** on the marked box frame.

The **cells are the one square thing in the system**, at `border-radius: 0`.
They are a grid of 81 abutting rectangles clipped by the plate card's own 14px
radius, and rounding them individually would dissolve the grid.

Borders come in two weights: the **hairline** (1px `{colors.rule}`) around every
card, control, chip and cell, and the **box boundary** (2px
`{colors.rule-strong}`) on the third and sixth column and row of the plate. Cell
borders are applied on the right and bottom only, with the last row and column
zeroed, so the grid never doubles a line.

Recurring silhouettes: the **card** (white, hairline, radius, shadow), the
**control** (surface-alt fill, hairline, 8px), the **pill** (a labelled value in
a tinted ground), and the **frame** (a ruled rectangle marking a region:
sightlines and the amber box frame).

## Components

### Operations (buttons)
The gradebook's button set: full-width rows in a card, sentence case, hairline
border, 8px radius, 6px apart.
- **Default:** `{colors.surface-alt}` fill, ink label, hairline border.
- **Hover:** border and label go indigo; the fill does not change. Suppressed
  under `(hover: none)`.
- **Primary ("Set a new plate"):** solid indigo with `{colors.accent-ink}` text
  at 600, `filter: brightness(1.08)` on hover — the theme's one brightness
  hover.
- **Switch (Pencil):** carries a keyboard hint chip and an `aria-pressed` state
  pill, paired at the right of the row while the label takes the slack; when on,
  the row takes the amber tinted ground with an amber border and label, the pill
  inverts to solid amber, and the hint chip follows the label into amber.
- **Disabled:** `{colors.neutral-bg}` ground, ink-soft label, transparent
  border, no hover response.

### Census Tally (chip / numeric control)
Nine controls, each a monospace figure over a sans remainder.
- **Default:** surface-alt ground, hairline border, indigo figure, ink-soft
  remainder.
- **Hover:** ground goes `{colors.accent-bg}`, border goes indigo.
- **Spent (zero remaining):** ground goes `{colors.neutral-bg}`, border goes
  transparent, figure drops to 500 and to ink-soft. Exhaustion is shown by
  weight and ground, not by fading out.

### Series Tabs (navigation)
A segmented control: three tabs in a surface-alt track with a hairline border
and a 10px radius, 4px of inset padding.
- **Default:** transparent, ink-soft label over a monospace clue count.
- **Hover:** the tab takes the white card fill and a hairline border.
- **Active (`aria-pressed="true"`):** solid indigo with `{colors.accent-ink}`
  text and the resting card shadow, so the selected tab reads as a card lifted
  out of the track.

### Readout Tiles
Three tiles in the masthead — plate number, clues set, elapsed — each a small
card with an uppercase label over a monospace value. The elapsed value is the
one indigo number, because it is the only one that changes while you play.

### State Key (legend)
Four rows, each a 1.7rem rounded swatch built **the same way the board is
built** — the same cerulean wash at the same tint steps — carrying a figure in
the state being described. The conflict swatch is the exception: it takes the
crimson tinted ground, because a repeat is the one cell state that changes its
ground rather than just its figure.

### Family Key (chips)
Nine numbered chips, one per box, each washed in its own family ink at the chip
tint step. The chip for the box containing the marked cell **prints at full ink**
with reversed surface text — the only chip ever allowed to go solid.

### The Plate (signature component)
The 81 cells, and the reason the rest of the page exists.
- **Cell at rest:** family wash at 8% over the card surface, indigo figure,
  hairline right/bottom borders, and a monospace coordinate (file letter + rank
  number) in the top-left corner at 42% family ink mixed into ink-soft. An empty
  cell is never blank; it still shows its own ruling.
- **Hover:** wash steps to 13%. Suppressed entirely under `(hover: none)`.
- **Given:** wash steps to 15%, the figure goes `{colors.ink}` at 700, the
  coordinate is removed, the cursor goes default.
- **Conflict:** the figure goes crimson **and** takes a printed rule beneath it
  (a 0.08em rounded bar). Never colour alone.
- **Marked:** the cell clears to the card surface and takes a 2px inset indigo
  ring, lifting it above its neighbours in z-order; its coordinate goes indigo.
  Focus adds a second 5px `{colors.accent-bg}` inset ring inside the first, and
  the default outline is suppressed in favour of it.
- **Pencilled candidates:** a 3×3 sub-grid inset in the cell, monospace at 40%
  family ink mixed into ink-soft. Shown only when the player pencils them.

### The Signature Interaction
Marking a cell drives the accent into the apparatus rather than washing the
board:
- the cell's two index tabs fill **solid indigo with reversed text**;
- the cell's family chip prints solid;
- a hairline **rank** sightline (indigo at 55%, top and bottom) spans the plate
  width at the marked row, and a **file** sightline spans its height at the
  marked column, both positioned from `--mark-row` / `--mark-col` custom
  properties set on the plate frame;
- an **amber 2px frame** marks the box, positioned from `--mark-box-row` /
  `--mark-box-col`.

Four channels, four devices, no two on the same lightness axis. The plate is
never tinted as a whole.

### Press State
Generation is real work and says so. A 93%-opaque surface veil over the plate
card carrying a Georgia press line, **the gradebook's weight meter** — an 8px
pill track in `{colors.neutral-bg}` with an indigo fill driven by a `scaleX`
transform at `120ms linear` — and a monospace percentage. It covers the plate
only: the masthead, key column and notes card stay live.

### The Solved Card
On completion, an 86%-opaque surface veil carries a white card with a teal
border and the resting-plus-lift shadow, the word in Georgia, and the gradebook's
grade pill beneath it in `{colors.good-bg}` carrying the clue count and time. It
is an overlay on the plate, not a dialog: `pointer-events: none`, nothing to
dismiss. It replaces the previous direction's rotated overprint stamp, which
belonged to a press and not to a card.

### The Ink Key
The foot of the page: a caption and six pills, each a 9px dot of one ink beside
its name — the four families, crimson, and the key ink. It is the quietest thing
on the page and the only place the family inks appear at full strength outside a
live chip.

### Named Rules
**The Two Moments Rule.** The build authors exactly two animations: `ink`
(170ms `cubic-bezier(0.16, 1, 0.3, 1)` — a figure rises 3px and scales up from
0.9 as it lands, staggered 7ms per cell across a new plate) and `strike` (320ms
— the Solved overlay fades up). Everything else that moves is a 150ms `ease`
colour transition. `prefers-reduced-motion: reduce` kills every animation and
transition on the page with `!important`.

**The Browser-Surface Rule.** The chrome the browser owns is themed too:
`::selection` is ink on `{colors.accent-bg}`, `:focus-visible` is a 2px indigo
outline at 2px offset, and the scrollbar is themed end to end (11px, rounded
rule-strong thumb with a 3px paper border, ink-soft on hover, paper track).
`color-scheme` is set per theme so form controls and overscroll follow.

## Do's and Don'ts

### Do:
- **Do** derive every box colour from the single `--fam` custom property and the
  tint ladder, never by writing a new hex into a rule.
- **Do** define every colour token on bare `:root` first, then redefine it in
  both dark blocks — the media query and the `[data-theme="dark"]` override.
- **Do** set anything countable in the monospace register: timers, remainders,
  percentages, coordinates, clue counts.
- **Do** give every state its own channel: ink weight for givenness, hairline
  sightlines for rank and file, an amber frame for the box, crimson plus a rule
  for a repeat.
- **Do** build legend swatches out of the same wash and the same tint steps as
  the live board, so the key is a cutting of the plate rather than a drawing of
  it.
- **Do** keep every region inside a card, inset from the shell margin.
- **Do** let the shell flow at its natural height.
- **Do** theme the browser's own surfaces — selection, focus ring, scrollbar,
  `color-scheme`.
- **Do** state a state in text as well as colour (`aria-pressed`, the notes
  line, the tally remainder); colour never carries a meaning alone.
- **Do** give a control that has a hotkey a hint chip on its own row, so the key
  is discoverable from the control rather than only from the notes line.

### Don't:
- **Don't** add a third elevation. Resting or lifted, and controls get neither.
- **Don't** round a cell. The 81 cells are the one square silhouette in the
  system; the plate card's radius clips them.
- **Don't** invert the light tint ladder for dark mode — dark runs its own
  percentages and its own lighter family inks.
- **Don't** load the UI face over a network. Self-hosted `woff2` in `fonts/` is
  the system; the page makes no network request of any kind.
- **Don't** spend a reserved ink on decoration: crimson is repeats, amber is the
  marked box and pencil mode, teal is solved, indigo is the hand and the live
  control.
- **Don't** introduce a fifth box family ink or break the four-ink rotation.
- **Don't** wash the plate, dim non-peer cells, or tint the whole board to show
  focus — the apparatus takes the accent, not the field.
- **Don't** reintroduce press furniture: no paper texture, no halftone screen,
  no misregistration, no registration crosses, no full-bleed bands. That is the
  direction this theme replaced.
- **Don't** float a toolbar, sticky bar, modal, or number pad over the page.
- **Don't** add an entrance animation or a slide. Two authored moments exist.
