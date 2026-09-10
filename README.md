# Aster Coordination Simulation

A fictional teaching simulation about coordination between divisions of a single company.

Aster Life Sciences runs its Global Clinical Operations Center as three operating groups, each with its own
P&L. There is a shared trial-data layer that all three need and none of them can justify alone. Everyone
agrees the opportunity is real. Nobody agrees who commits. The exercise is to work out what each division
actually needs in order to say yes — and to watch what the enterprise number does while you get it wrong.

**Aster Life Sciences and every person, number, division and event in this repository are invented.** Nothing
here describes, is based on, or is disguised from any real organisation.

## Running it

Open `index.html`. That is the whole install.

No build step, no package manager, no server, no accounts, and no network access of any kind —
clone the repository and open the file, or serve it from GitHub Pages. It works offline, and it is meant to:
it runs from a lectern on room wifi you should not trust.

The class-facing pages are one path, and every page links to the next: **1 the situation → 2 how it works
→ 3 the divisions → 4 the exercise → 5 the debrief**. The facilitator guide hangs off that path from every
page.

- `index.html` — the situation, the four figures, and the three divisions
- `instructions.html` — written for the room: what is being decided, how the numbers work, the three
  deals, and the rules. Send it round beforehand or spend a minute on it at the start. It names no blocks.
- `divisions.html` — the three divisions side by side, each linking to its own page
- `site-ops.html`, `data-analytics.html`, `patient-engagement.html` — one brief per division: what it
  does, what it is measured on, its four numbers, where it stands, and what it has said. This is the
  material the room diagnoses from
- `sim.html` — the exercise itself
- `debrief.html` — the framework, all eight outcomes, and discussion questions
- `facilitate.html` — the facilitator guide: what to do and say at each beat, the answer key, and the
  questions the room tends to ask. It has the answers on it, so do not project it.
- `framework-deck.pptx` — four slides: the set-up, the exercise, the framework, and the framework applied

## What it teaches

1. Agentic value sits on the boundaries between divisions, so the binding constraint is not technology or
   capital — it is whether P&L owners will commit to something they do not control.
2. The case for collaborating is never the problem. Every division agrees the shared asset should exist. What
   blocks each one is different, specific, and rarely about the size of the prize.
3. Partial coordination is worse than none. The model is built to prove this rather than assert it.

Three divisions defend their own plans for three different reasons — a timing problem, a property problem, and
a trust problem. Each has exactly one move that answers it: **Sequence**, **Price**, **Underwrite**. Reaching
for the wrong one costs its full price and buys nothing.

## Every reachable outcome

The three pledges sum to exactly the build cost of the shared layer, so every division is pivotal and no
coalition of two can fund it. That produces eight states and only one of them builds anything.

| Committed | Pledged | Layer | Enterprise value | Vs $250M ambition |
|---|---|---|---|---|
| Nobody | $0M | not funded | **$167.75M** | short $82.25M |
| Patient Engagement | $4M | not funded | **$154.92M** | short $95.08M |
| Data & Analytics | $6M | not funded | **$153.50M** | short $96.50M |
| Site Operations | $8M | not funded | **$144.06M** | short $105.94M |
| Data & Analytics + Patient Engagement | $10M | not funded | **$140.67M** | short $109.33M |
| Site Operations + Patient Engagement | $12M | not funded | **$131.22M** | short $118.78M |
| Site Operations + Data & Analytics | $14M | not funded | **$129.81M** | short $120.19M |
| **All three** | **$18M** | **FUNDED** | **$278.25M** | **ahead $28.25M** |

Read the middle six rows. Every partial coalition is worse than nobody trying, and it gets worse the more
divisions join. Two divisions do the right thing, pay their pledge, and the number falls. That is not a bug in
the model; it is the third teaching point made mechanical.

## Facilitator keys

Keyboard only, and never shown on screen during the exercise.

| Key | Action |
|---|---|
| `1` `2` `3` | Select division |
| `Q` `W` `E` | Apply Sequence / Price / Underwrite to the selected division |
| `H` | Toggle the block labels — the hint, for when the room stalls |
| `N` | Toggle the presenter note for whatever beat the board is on |
| `C` | Close the round |
| `R` | Reset |
| `?` | Overlay listing these keys |

## Run of show

Eight to twelve minutes at the lectern. `facilitate.html` is the long version of everything below, including
what to say at each beat and what to do when it goes sideways.

1. Open `sim.html`. Read the three objections aloud, or have three people read them.
2. Ask the room: *what does each of them actually need?* Take suggestions. Apply them.
3. Let the room misdiagnose. The first instinct is almost always **Price** on everybody — money is the move
   executives reach for — and it lands on exactly one of the three.
4. When two divisions have committed, stop and point at the enterprise figure. It has gone **down**. Sit in that.
5. Close the third. Let the gate reveal play without talking over it.
6. `C` to close the round. Read the wasted spend aloud.
7. Move to `debrief.html`, or straight to slides 3 and 4 of `framework-deck.pptx`.

If the room stalls, `H` reveals the block labels and turns the exercise from diagnosis into matching. That is a
worse lesson but a better use of the remaining minutes.

## Structure

Every constant lives in `data/model.js` and every line of copy in `data/script.js`. No figure is typed into any
page; all of them are computed at runtime from those two files. `test.html` is unlinked and enumerates all
eight states against the expected table — open it after changing any constant.

```
index.html          1 · the situation
instructions.html   2 · how the session works, for the room
divisions.html      3 · the three divisions
site-ops.html       3 · one brief per division, all three from the same shell
data-analytics.html
patient-engagement.html
sim.html            4 · the exercise
debrief.html        5 · the framework and the outcomes
facilitate.html     the facilitator guide
test.html           model check, not linked from anywhere
assets/style.css    all styling
assets/sim.js       state machine, rendering, animation
assets/division.js  renders whichever division a page declares in data-group
assets/nav.js       the flow between the pages
data/model.js       constants and the one compute() function
data/script.js      all copy and dialogue
framework-deck.pptx the slides this sits between
BUILD_SPEC.md       the full specification this was built from
```

Every size is relative and the root scale is fluid, so the exercise fills one screen at 1280×720, 1366×768,
1920×1080 or 4K without clipping, and stacks into a scrolling page on anything too small to hold it.

Everything is deterministic. Identical inputs always produce identical output, there is no randomness
anywhere, and nothing is carried between runs. `prefers-reduced-motion: reduce` is respected and reaches an
identical final state with no transitions.

## Licence

MIT. See `LICENSE`.
