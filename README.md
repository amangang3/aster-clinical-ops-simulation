# Aster Coordination Simulation

A fictional teaching simulation about coordination between divisions of a single company.

Aster Life Sciences runs its Global Clinical Operations Center as three operating groups, each with its own
P&L. There is a shared trial-data layer that all three need and none of them can justify alone. Everyone
agrees the opportunity is real. Nobody agrees who commits. The exercise is to work out what each division
actually needs in order to say yes — and to watch the shared upside stay locked until you get all three.

**Aster Life Sciences and every person, number, division and event in this repository are invented.** Nothing
here describes, is based on, or is disguised from any real organisation.

## Running it

Open `index.html`. That is the whole install.

No build step, no package manager, no server, no accounts, and no network access of any kind —
clone the repository and open the file, or serve it from GitHub Pages. It works offline, and it is meant to:
it runs from a lectern on room wifi you should not trust.

**The room plays the case protagonist** — the Chief Information Officer of Aster's Global Clinical Operations
Center, named in `meta.you` in `data/model.js`. He can argue for a proposal at the Leadership Council, owns no
P&L, and cannot set a target for any division: a number entering a five-year plan has to be committed by the
P&L owner carrying it. What he controls is the centre — the platform, the engineering group, and the budget
behind both — and that is what a deal spends. The three shares the divisions pay are their own money; the deal
costs are his. `instructions.html` opens with this.

The exercise sits after the class has argued the case question and before the practitioner conversation that
follows, so it deliberately argues neither side of the mandate question. It shows what division-led adoption
costs when the shared layer never gets built, and what influence costs without authority.

The class-facing pages are one path, and every page links to the next: **1 the situation → 2 how it works
→ 3 the divisions → 4 the exercise**. The facilitator guide hangs off that path from every page, and the
two-slide framework deck closes the session once the round is done.

- `index.html` — the situation and the three divisions
- `instructions.html` — written for the room: what is being decided, where the numbers come from, the three
  deals, which of the two pots of money each amount comes out of, what offering a deal does, and the rules.
  Send it round beforehand or spend a minute on it at the start. It names no blocks.
- `site-ops.html`, `data-analytics.html`, `patient-engagement.html` — one brief per division: what it
  does, what it is measured on, its four numbers, where it stands, and what it has said. This is the
  material the room diagnoses from
- `sim.html` — the exercise itself, ending in a scoreboard: who committed, the deal ledger, and the deals that changed nothing
- `facilitate.html` — the facilitator guide: what to do and say at each beat, the answer key, and the
  questions the room tends to ask. It has the answers on it, so do not project it.
- `framework-deck.pptx` — two slides for the close: the framework, and the framework applied (blocker → move, all four)

## What it teaches

0. Agents turn the org chart into the systems architecture. An agent's reach is set by permission and
   accountability rather than integration effort, so what an enterprise can automate is bounded by the
   agreements it can strike. Three things make this an agentic problem rather than the shared-services problem
   of the last thirty years: agents remove partial credit (half a workflow is not half the value, it is none),
   agents act inside divisions that answer for the consequences, and capability now arrives faster than the
   agreements needed to use it. The facilitator names all three at the close (see `facilitate.html` and the deck).
1. Agentic value sits on the boundaries between divisions, so the binding constraint is not technology or
   capital — it is whether P&L owners will commit to something they do not control.
2. The case for collaborating is never the problem. Every division agrees the shared asset should exist. What
   blocks each one is different, specific, and rarely about the size of the prize.
3. Partial coordination is worse than none. The model is built to prove this rather than assert it.

Three divisions defend their own plans for three different reasons — a timing problem, a head-start problem,
and a trust problem. There are four levers: **Sequence**, **Price**, **Status**, **Trust-building**. Two of the
divisions are answered by a single lever each (Sequence, Trust-building). The division that is already ahead needs
**both Price and Status** — money alone only half-answers it, because being paid still lets the others catch
up; it commits only once it is also made the owner of the shared layer. Offering the wrong lever changes nothing.

## What realising the upside takes

The shared layer is all or nothing: it is built, and the cross-division upside is realised, only when all three
divisions commit. There is deliberately no scoring and no partial credit. One or two divisions committing
realises nothing — the work that spans divisions still cannot run — so partial coordination is visibly worse
than none: real effort is spent and the upside stays locked. That is the third teaching point, made mechanical
without a single number on screen.

## Facilitator keys

Keyboard only, and never shown on screen during the exercise.

| Key | Action |
|---|---|
| `1` `2` `3` | Select division |
| `Q` `W` `E` `R` | Apply Sequence / Price / Status / Trust-building to the selected division |
| `H` | Toggle the block labels — the hint, for when the room stalls |
| `N` | Toggle the presenter note for whatever beat the board is on |
| `C` | Close the round |
| `⌫` Backspace | Reset |
| `?` | Overlay listing these keys |

## Run of show

Eight to twelve minutes at the lectern. `facilitate.html` is the long version of everything below, including
what to say at each beat and what to do when it goes sideways.

1. Open `sim.html`. Read the three objections aloud, or have three people read them.
2. Ask the room: *what does each of them actually need?* Take suggestions. Apply them.
3. Let the room misdiagnose. The first instinct is almost always **Price** on everybody — money is the move
   executives reach for. It commits nobody: it is wrong for two of the divisions, and only half of what the
   division out in front needs.
4. When two divisions have committed, stop and point at the shared upside. It is **still locked**. Sit in that.
5. Close the third. Let the gate reveal play without talking over it.
6. `C` to close the round. Read the deals that changed nothing aloud.
7. Close on `framework-deck.pptx` — the framework, then the blocker → move playbook.

If the room stalls, `H` reveals the block labels and turns the exercise from diagnosis into matching. That is a
worse lesson but a better use of the remaining minutes.

## Structure

The model lives in `data/model.js` and every line of copy in `data/script.js`. The exercise is deliberately
number-free: the model is a plain boolean — each division is committed or not, and the shared layer is realised
only when all three are — and nothing on any page is a budget figure. The one framing number kept anywhere is
the run-rate ambition, shown once on the landing to set the stakes.

Anything a participant reads is written in plain words: no "boundary", no "realise", no "multiplier". The board
shows a division as *Defending* or *Committed* and the shared upside as *Locked* or *Realised*; the deal buttons
carry a plain line under the framework label. Framework terms belong on `facilitate.html` and the deck, where
there is someone to explain them.

```
index.html          1 · the situation
instructions.html   2 · how the session works, for the room
site-ops.html       one brief per division, reached from the situation page
data-analytics.html
patient-engagement.html
sim.html            3 · the exercise, ending in the scoreboard
facilitate.html     the facilitator guide
assets/style.css    all styling
assets/sim.js       state machine, rendering, animation
assets/division.js  renders whichever division a page declares in data-group
assets/nav.js       the flow between the pages
data/model.js       the divisions, the four moves, and the one compute() function
data/script.js      all copy and dialogue
framework-deck.pptx two framework slides for the close
BUILD_SPEC.md       the full specification this was built from
```

Every size is relative and the root scale is fluid, so the exercise fills one screen at 1280×720, 1366×768,
1920×1080 or 4K without clipping, and stacks into a scrolling page on anything too small to hold it.

Everything is deterministic. Identical inputs always produce identical output, there is no randomness
anywhere, and nothing is carried between runs. `prefers-reduced-motion: reduce` is respected and reaches an
identical final state with no transitions.

## Licence

MIT. See `LICENSE`.
