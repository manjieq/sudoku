---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["style.css","script.js"]
---

## Scope

The whole game surface: `index.html`, `style.css`, `script.js`, plus the
self-hosted `fonts/`. Visitor mode **Experience** — the player is inside the
artifact, so the plate leads from the first viewport. Operate's discipline
still binds inside the 81 cells: state legibility is never traded for
expression.

## Audience and task

Anyone who lands on a public demo page — a first-time visitor who arrived to
look, and a player who stays to solve. Desktop and mobile both carry weight.
The task is scanning a rank, file and 3×3 box for the figure that fits.

## Direction contract

**THESIS:** The board is not a card on a page — it is one large printed
reference plate, and every control is chart apparatus printed onto it. It
refuses the centred white card with a button row above and a number pad below.

**OWN-WORLD:** Flat process ink on cool chart stock `#E4E9E1`, ink black
`#14171A`. Four family plates rotated across the nine boxes so no two touching
boxes share one: viridian `#00794F`, manganese `#6A2EA0`, chromate `#AB7F00`,
cerulean `#12617F`. Crimson `#9E0F18` is reserved absolutely for repeats;
`#17357F` is the player's entry ink; gold `#E8B10C` is masthead and active
apparatus only. Box fields are **screened, not flat-filled**: a 12% flat tint
under a two-pass offset halftone at 6px pitch, which lands near 26% apparent
density while still reading as printed ink. Density is split across channels
on purpose — flat ink carries givenness, screen frequency carries the box
under the mark, ruled lines carry the marked rank and file — so no two states
compete on the same lightness axis. The legend is built the way the fields are
built — state-key swatches and box-family chips carry the same flat tint and
the same screen, and only the *live* chip drops the screen for full-strength
ink, alongside the index tabs and the masthead. Type is one variable Archivo,
self-hosted, worked hard across its width axis: `wdth 125` for titling down to
`wdth 66` for the data layer. Paper tooth, hairline keylines, deliberate plate
misregistration, registration crosses and an ink bar at the trim.

**STORY:** The visitor sees a printed scientific plate, understands instantly
that it is a table to be filled, and starts entering figures without being
told how.

**FIRST VIEWPORT:** Full-bleed plate on one governing left axis. Black
masthead band across the top: title in expanded gothic caps, edition line,
series printed as a tab strip, elapsed time as a printed counter. Beneath it
the 81 cells at wall scale, nine screened box fields, lettered index tabs A–I
across the top and 1–9 down the left. State key, digit census and operations
in the right column. NOTES band typeset along the foot, trim furniture below
it. No floating toolbar anywhere.

**Signature interaction:** marking a cell drives full-strength ink into
exactly its index tabs and its box key, rules the marked rank and file across
the plate, and screens the marked box denser — chart apparatus, never a wash
of colour. Empty cells carry a printed coordinate wherever it can be set
legibly. Completion lands an overprint SOLVED stamp. Motion grammar: ink
arriving on paper — blur-to-sharp, no fades, no slides.

**FORM:** The laboratory wall chart. Candidate 5 of 7 on the ordered grounded
list; assigned by the roll. Seed key `9f027386`.

Raises carried in: SUBSTRATE (printed object, not flat fill) from the Greiman
challenger; EMPTY IS AUTHORED from Chaekgeori; STATE PRINTS ITSELF from the
phosphor terminal; ONE AXIS from Versailles.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, DESIGN.md, and every shipping raster carrying
its provenance.

## Decisions taken during the build

- **Palette hues and tint level changed from the first draft of this
  contract.** The original four inks were re-hued for contrast (the detector
  flagged the family-chip and pencil-mark inks) and because slate was doing
  grey's job rather than being a fourth hue. The field density was raised from
  the drafted ≤12% flat because Experience mode calls for colour that commits
  at page scale, and nine fields at 12% flat did not read as fields. It is now
  delivered as 12% flat plus a halftone screen rather than as a heavier flat
  fill, which keeps the printed character the thesis depends on.
- **Archivo is self-hosted, not pulled from a CDN.** The width axis is the
  entire type hierarchy, and no fallback in the stack has one, so a CDN
  unreachable offline would collapse expanded titling and condensed data into
  one system face. Verified working from `file://`.
- **The coordinate is mixed toward ink, not toward transparency.** Screening
  the fields raised their mid-tone under the smallest type on the plate; a
  coordinate tinted by opacity fell to 2.5:1. It is now `45%` family ink mixed
  into `--ink`, measured at 5.9:1 or better across all four plates.
- **Candidates are shown only when pencilled**, not automatically. Auto-listing
  every candidate would solve the scan for the player, contradicting the task
  PRODUCT.md defines.

## Constraints

No build step; the page must still open from `file://` with the font intact.
Puzzle generation is synchronous backtracking that can block — the interface
shows an honest press state rather than pretending the pause is not there.

## Unresolved

None open.
