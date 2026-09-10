# BUILD SPEC — Aster Coordination Simulation

**This file is the complete and only source of truth for this repository.** Everything needed to build the
simulation is written out below: the fictional world, every constant, the exact model, the full script, and the
page-by-page UI spec. Do not look for other source documents; there are none.

> **Rewritten 2026-09-10.** This replaces an earlier design in which three Claude subagents negotiated live in a
> terminal while students wrote briefs for them. That design is gone. It is recoverable from git history if
> anyone wants it, but nothing in this repo should reference it.
>
> What changed and why: the teaching payload is now a **framework**, and the simulation exists to demonstrate
> that framework rather than to stage a negotiation. That makes it deterministic, offline, instant, and
> repeatable. No model calls, no API keys, no live agents, no student devices, no per-round reset ritual.

---

## 0. HARD CONSTRAINTS — read first

Violating any of these is a build failure.

- **This repo is public.** Never name a real company, executive, university, course, or instructor anywhere —
  not in code, comments, commit messages, page copy, or the README. The world is entirely fictional and named
  **Aster Life Sciences**. Every person, number, group, and event is invented. If you are unsure whether a
  detail traces back to something real, cut it.
- **Repository and deployment naming.** Name the repo and the Pages URL after the fiction only, e.g.
  `aster-coordination-simulation`. Do not encode an industry, a client, a course code, or a date.
- **No real-company framing.** Never describe this as "based on" or "disguised from" a real organization. It is
  a fictional teaching simulation and the landing page says so.
- **No backend, no build step, no package manager.** Plain HTML, CSS, and vanilla JS served by GitHub Pages
  from the repo root. No npm, no bundler, no framework, no server. It must work when someone clones the repo
  and opens `index.html` from the filesystem.
- **No network calls of any kind.** No CDN fonts, no external scripts, no analytics, no model APIs. Everything
  inlined or local. The room's wifi is not to be trusted and nothing here needs it.
- **Deterministic.** Identical inputs always produce identical outputs. No randomness anywhere, including in
  animation ordering. A facilitator who runs this twice must see the same thing twice.
- **One source of truth for numbers.** Every constant lives in `data/model.js` as a pure JSON object literal
  assigned to `window.ASTER`. It is a `.js` file rather than `.json` because the site must run from `file://`,
  where `fetch()` of a local JSON file is blocked by CORS and a `<script>` tag is not. Never hardcode a number
  twice. Every displayed figure is computed from these constants at runtime — no figure is ever typed into HTML.
- **Projector legibility is a functional requirement.** This is driven from a lectern and read from the back of
  a room. Minimum body size 18px, minimum headline size 44px, and the three headline figures must be legible at
  a glance from ~15 metres. Test at 1920×1080.

---

## 1. WHAT THIS TEACHES

The class has already discussed a case in which a CIO must decide whether to push for a single enterprise-wide
agentic AI target or let each division set its own. The class has then been shown a framework (§2). This
simulation makes the framework land by letting the room try to use it and watch what happens.

Three teaching points, in priority order.

**1. Agentic value sits on the boundaries between divisions, so the binding constraint is not technology or
capital — it is whether P&L owners will commit to something they do not control.**

**2. The case for collaborating is never the problem.** Every division agrees the shared asset should exist.
What blocks each one is different, specific, and rarely about the size of the prize. Reaching for the wrong
move is expensive and buys nothing.

**3. Partial coordination is worse than none.** This is the counterintuitive one and the model is built to
prove it rather than assert it (§3.4).

A fourth point emerges from the mechanic and should be left for the facilitator to name rather than written on
screen: the smallest, most dependent group has the best economics in the room and the least standing to demand
anything.

---

## 2. THE FRAMEWORK

This is the intellectual content the simulation demonstrates. It is shown on `debrief.html` and referenced in
the copy elsewhere. Do not paraphrase these definitions — they are used verbatim in class.

### 2.1 Forces incentivising collaboration — why any division comes to the table

| Factor | Description |
|---|---|
| **Dependency** | Value you cannot realise without an asset another division owns. The more of your value sits on a boundary, the more you need the deal — and if you are the one who owns that asset, your upside is their commitment, not your own roadmap. |
| **Threshold** | The shared asset is lumpy. It exists only above a funding line that no single division can justify on its own numbers, so it gets built jointly or it does not get built. |
| **Duplication** | Left alone, divisions quietly build the same capability twice. Nobody can see it from inside their own plan, and the waste only surfaces once both have been funded. |

### 2.2 Forces incentivising individualism — why it defends its own plan instead

| Factor | Description |
|---|---|
| **Absorption** | *"We cannot take this much change this fast."* A timing problem, not a size problem — so commit the number and negotiate the clock. |
| **Advantage** | *"We already paid for this. Why would we level down?"* A property problem — so pay for what they give up: credit the head start, guarantee them demand. |
| **Assurance** | *"Last time the centre moved, we ate the cost."* A trust problem — so guarantee the downside: caps, kill criteria, migration costs covered. |

### 2.3 The three moves

Each individualism factor has exactly one move that answers it. This one-to-one mapping is the mechanic.

| Move | Answers | What it is |
|---|---|---|
| **SEQUENCE** | Absorption | Commit the number, negotiate the clock, not the size. |
| **PRICE** | Advantage | Pay for what they give up — credit the head start, guarantee them demand. |
| **UNDERWRITE** | Assurance | Guarantee the downside — caps, kill criteria, migration costs covered. |

### 2.4 The applied diagnosis

| Division | Pull | Block | Move |
|---|---|---|---|
| Site Operations | **Dependent** — 40% of its value needs a layer it cannot build; six of nine top workflows cross its boundary | **Absorption** (timing) | **Sequence** |
| Clinical Data & Analytics | **Supplier** — the only group that can build the layer; its own pool is hardest to grow | **Advantage** (property) | **Price** |
| Patient Engagement | **Dependent** — best return per dollar in the room, nearly all of it gone without shared data | **Assurance** (trust) | **Underwrite** |

---

## 3. THE MODEL

Implement exactly. Every number in §3.1 goes in `data/model.js`; nothing here is approximate.

### 3.1 Constants

```js
window.ASTER = {
  meta: {
    org: "Aster Life Sciences",
    unit: "Global Clinical Operations Center",
    setting: "Mid-2026",
    disclaimer: "A fictional teaching simulation. Aster Life Sciences and all people, numbers and events in it are invented."
  },

  ambition: 250,                 // $M run-rate — the CIO's ask, not a mandate
  infrastructure_required: 18,   // $M — build cost of the shared trial-data layer
  multiplier_funded: 1.00,
  multiplier_unfunded: 0.55,     // agents confined inside one boundary

  groups: [
    { id: "site-ops",           name: "Site Operations & Trial Execution",  short: "Site Operations",
      lead: "Senior Director Luis Moreno",  accent: "amber",
      local_pool: 140, cross_value: 40, capital_need: 26, pledge: 8,
      pull: "dependent", block: "absorption", move: "sequence" },

    { id: "data-analytics",     name: "Clinical Data & Analytics",          short: "Data & Analytics",
      lead: "Senior Director Evan Cole",    accent: "cyan",
      local_pool: 95,  cross_value: 20, capital_need: 22, pledge: 6,
      pull: "supplier",  block: "advantage",  move: "price" },

    { id: "patient-engagement", name: "Patient Engagement & Recruitment",   short: "Patient Engagement",
      lead: "Senior Director Clara Vega",   accent: "violet",
      local_pool: 70,  cross_value: 35, capital_need: 12, pledge: 4,
      pull: "dependent", block: "assurance", move: "underwrite" }
  ],

  moves: [
    { id: "sequence",   label: "SEQUENCE",   cost: 6,  answers: "absorption",
      blurb: "Commit the number, negotiate the clock." },
    { id: "price",      label: "PRICE",      cost: 12, answers: "advantage",
      blurb: "Pay for what they give up. Credit the head start, guarantee demand." },
    { id: "underwrite", label: "UNDERWRITE", cost: 9,  answers: "assurance",
      blurb: "Guarantee the downside. Caps, kill criteria, migration costs covered." }
  ]
};
```

Note the two deliberate identities, both load-bearing:

- `8 + 6 + 4 = 18` — the pledges sum to **exactly** the build cost, so every group is pivotal. There is no
  coalition of two that funds the layer.
- `26 + 22 + 12 = 60` — capital needs sum to the $60M platform pool referenced in the case, so a group that
  pledges is visibly giving up capability it would otherwise have had.

### 3.2 State

The entire application state is three booleans and a spend tally.

```js
state = {
  committed: { "site-ops": false, "data-analytics": false, "patient-engagement": false },
  applied:   [],     // ordered list of { group_id, move_id, correct } — append only within a round
  spent:     0       // $M, sum of cost of every move applied, right or wrong
}
```

### 3.3 The computation — one pure function, no side effects

```js
function compute(state) {
  const A = window.ASTER;
  const pledged = A.groups
    .filter(g => state.committed[g.id])
    .reduce((s, g) => s + g.pledge, 0);

  const funded = pledged >= A.infrastructure_required;
  const mult   = funded ? A.multiplier_funded : A.multiplier_unfunded;

  const per = A.groups.map(g => {
    // Committing costs real capital, which costs real local capability.
    const c = state.committed[g.id]
      ? (g.capital_need - g.pledge) / g.capital_need
      : 1.0;
    const local = g.local_pool * c * mult;
    const cross = funded ? g.cross_value * c : 0;
    return { id: g.id, capability: c, local, cross, value: local + cross };
  });

  const enterprise = per.reduce((s, p) => s + p.value, 0);

  return {
    pledged, funded, mult, per, enterprise,
    gap:   A.ambition - enterprise,       // positive = short of the ambition
    spent: state.spent,
    wasted: state.applied.filter(a => !a.correct)
                         .reduce((s, a) => s + A.moves.find(m => m.id === a.move_id).cost, 0)
  };
}
```

A move is `correct` when `move.answers === group.block`. Nothing else in the system decides this.

### 3.4 Every reachable outcome — verify against this table

There are exactly eight states. Build a test that reproduces this table to two decimal places; if it does not
match, the constants are wrong and must be fixed rather than the display rounded.

| Committed | Pledged | Layer | Enterprise value | vs $250M |
|---|---|---|---|---|
| none | $0M | not funded | **$167.75M** | short $82.25M |
| Data & Analytics only | $6M | not funded | **$153.50M** | short $96.50M |
| Patient Engagement only | $4M | not funded | **$154.92M** | short $95.08M |
| Site Operations only | $8M | not funded | **$144.06M** | short $105.94M |
| D&A + Patient Engagement | $10M | not funded | **$140.67M** | short $109.33M |
| Site Ops + Patient Engagement | $12M | not funded | **$131.22M** | short $118.78M |
| Site Ops + D&A | $14M | not funded | **$129.81M** | short $120.19M |
| **all three** | **$18M** | **FUNDED** | **$278.25M** | **beat by $28.25M** |

**Read the middle six rows.** Every partial coalition is worse than nobody trying, and it gets worse the more
groups join. Two divisions do the right thing, pay their pledge, and the room watches the number fall by $38M.
This is the most important property of the model and it is not a bug to be smoothed out — it is the third
teaching point made mechanical. Do not add partial credit for partial funding.

Per-group values in the all-committed state, for the results readout:

| Division | Capability | Local | Cross-boundary | Total |
|---|---|---|---|---|
| Site Operations | 0.692 | $96.92M | $27.69M | **$124.62M** |
| Data & Analytics | 0.727 | $69.09M | $14.55M | **$83.64M** |
| Patient Engagement | 0.667 | $46.67M | $23.33M | **$70.00M** |

### 3.5 The deal economics

Correct diagnosis on all three costs `6 + 12 + 9 = $27M` and moves the enterprise from $167.75M to $278.25M,
a gain of **$110.50M** — a return of **4.09×**. Every misdiagnosed move costs its full price and returns
nothing. Both figures are displayed at the close (§4.5).

---

## 4. THE SITE

### 4.1 Repo layout

```
index.html          landing — context, the table, one button into the simulation
sim.html            the simulation itself — this is the whole exercise
debrief.html        the framework, the eight outcomes, the discussion questions
assets/style.css    all styling, one file
assets/sim.js       state machine, animation, rendering
data/model.js       constants + compute() — the only place numbers live
data/script.js      every line of dialogue (§5)
test.html           model check — enumerates §3.4, linked from nowhere
framework-deck.pptx the four framework slides the simulation sits between (§6)
README.md           §7
BUILD_SPEC.md       this file
.nojekyll
.gitignore          editor and OS cruft only — this build produces no run artefacts
LICENSE
```

**Nothing else belongs in the repo.** The retired live-negotiation build — `.claude/`, `briefs/`, `runs/`,
`facilitator/`, `role.html`, `brief.html`, `watch.html`, `results.html`, `data/private/`, `data/scenario.js`,
`assets/app.js` — was deleted in its own commit before this build started, so no dead reference survives. It
is recoverable from git history and must not come back.

The deck carries the same constants as `data/model.js` and is written against this mechanic, not an earlier
one. Slides 3 and 4 are §2.1–§2.4 verbatim. If a constant changes here, the deck changes with it.

### 4.2 Design direction

Dark, calm, high contrast, no decoration. It is projected in a lit room next to a slide deck it must not clash
with.

- Background `#0E1526`, card surface `#1A2337`, hairline `#27334B`
- Text `#FFFFFF`, muted `#9AA7BD`, dim `#6E7C94`
- Group accents: Site Operations `#E8A33D`, Data & Analytics `#4FC3D9`, Patient Engagement `#A78BFA`
- Collaboration / committed `#3FD9A0` · individualism / defending `#F0685F`
- System sans throughout; one serif face for quoted dialogue only
- Rounded 6px corners, 0.75px hairline borders, no gradients, no shadows, no accent stripes
- Motion: 200–400ms ease-out. Number count-ups 800ms. The gate reveal (§4.4) is the only moment allowed to
  take longer, at 1600ms.

Respect `prefers-reduced-motion: reduce` by skipping all transitions and setting final values immediately. The
outcome must be identical either way.

### 4.3 `index.html` — landing

One screen, no scrolling at 1080p.

- Title, and the disclaimer from `meta.disclaimer` in small dim text
- The situation in three short paragraphs: three operating groups each with its own P&L; the CIO has run a
  demo and everyone agrees the opportunity is real; nobody agrees who commits. The CIO can argue for a number
  and cannot set one, because only a P&L owner commits a number into a plan.
- Four figures rendered from constants: `$250M` ambition · `$18M` shared trial-data layer · `$60M` platform
  capital (sum of `capital_need`) · `$95M` cross-boundary value (sum of `cross_value`)
- The three groups as cards: short name, lead, `local_pool`, and one line of descriptor
- One primary button, **BEGIN**, to `sim.html`
- A quiet secondary link to `debrief.html`, styled so nobody clicks it by accident mid-class

### 4.4 `sim.html` — the simulation

This is the whole exercise. One screen, no scrolling, driven from a lectern.

**Header band.** Three figures, always visible, updating live:

| Figure | Source | Note |
|---|---|---|
| **ENTERPRISE VALUE** | `enterprise` | Largest element on screen. Counts up or down on change. |
| **VS AMBITION** | `gap` | Shown as `SHORT $82.25M` in coral or `AHEAD $28.25M` in mint. |
| **SPENT ON DEALS** | `spent` | Neutral until the close, where wasted spend is broken out. |

Below them, a thin **shared trial-data layer** meter filling toward `$18M`, labelled with the running pledge
total and `NOT FUNDED` / `FUNDED`.

**The board.** Three rows, one per group. Each row carries:

- Accent dot, short name, lead name
- **State badge** — `DEFENDING` in coral, or `COMMITTED` in mint
- **The objection**, in the group's own words, in the serif face (§5). This is visible from the start.
- **The block label is hidden.** It is revealed only when that group's correct move is applied, or by the
  facilitator hint (below). The room's job is to diagnose from the objection.
- A value bar scaled against `local_pool + cross_value`, showing local and cross-boundary as two segments
- Three move buttons: `SEQUENCE $6M`, `PRICE $12M`, `UNDERWRITE $9M`

**Applying a move.** Click, or the keyboard shortcut. Sequence:

1. Button depresses and locks. `spent` increments immediately — *the money is gone before you know if it
   worked.* This ordering is deliberate; do not defer it until after the outcome is known.
2. The group's response line types in beneath the objection, 18ms per character.
3. **Wrong move:** the row shakes horizontally once, 6px, 180ms. The response is the group's rejection line.
   The button stays locked and greys out — a move once spent on a group cannot be spent again. State unchanged.
4. **Right move:** the row flashes mint, the state badge flips `DEFENDING → COMMITTED`, the block label
   appears with a tick, the pledge meter increments, and every number on screen recomputes.

A group that has committed has its remaining move buttons disabled. Moves already spent on a group stay
visibly spent. There is no undo. `R` resets the whole round.

**The gate reveal.** When the third group commits and `pledged` reaches 18, this is the moment the session is
built around. Hold it for 1600ms and sequence it:

1. Everything else on screen dims to 40% for 300ms
2. The layer meter completes and the label flips to `SHARED TRIAL-DATA LAYER — FUNDED`
3. The multiplier reads out `0.55 → 1.00` as a ticking transition
4. All three value bars grow, with the cross-boundary segment appearing for the first time
5. `ENTERPRISE VALUE` counts from its previous value to `$278.25M` over 1200ms
6. `VS AMBITION` flips from coral `SHORT` to mint `AHEAD $28.25M`

Nothing in this sequence is conditional or random. It plays identically every time it is reached.

**Close the round.** A `CLOSE THE ROUND` button, always available, freezes the board and reveals the scoreboard
(§4.5). Reachable from any state, including all-defending — a round where the room never diagnoses anything is
a complete and instructive outcome, not an error.

**Facilitator controls.** Keyboard only, never shown on screen:

| Key | Action |
|---|---|
| `1` `2` `3` | Select group row |
| `Q` `W` `E` | Apply Sequence / Price / Underwrite to the selected row |
| `H` | Toggle block labels visible — the hint, for when the room stalls |
| `C` | Close the round |
| `R` | Reset |
| `?` | Overlay listing these keys |

### 4.5 The scoreboard

Replaces the board on close. Everything computed, nothing typed.

- **Enterprise value** and **gap vs ambition**
- **Per-group table:** division, final state, capability, local value, cross-boundary value, total
- **The deal ledger:** every move applied in order, its cost, and whether it landed. Wrong moves listed in
  coral with `— bought nothing`.
- **Two figures side by side:** `SPENT $XM` and `OF WHICH WASTED $YM`
- If all three committed: `$27M of deals unlocked $110.50M. A return of 4.09×.` — computed, not hardcoded.
- If fewer than three: the counterfactual line — `All three committed would have produced $278.25M. You reached
  $X. The layer was never built.`
- **The invariant, stated plainly:** if one or two groups committed, show
  `Partial coordination cost more than doing nothing. Doing nothing produced $167.75M.`
- A `BACK TO THE BOARD` button and a link to `debrief.html`

### 4.6 `debrief.html`

Reference material, read after the exercise. Scrolling is fine here.

1. The two framework tables from §2.1 and §2.2, rendered exactly as written
2. The three moves from §2.3
3. The applied diagnosis from §2.4
4. **All eight outcomes** from §3.4 as a table, with the current session's outcome highlighted if the page was
   reached from a closed round (pass state in the URL hash; do not use storage)
5. Discussion questions:
   - Which move did the room reach for first, and what did that assume about the block?
   - Two divisions did the right thing and the number went down. What does that tell you about pilots?
   - Patient Engagement has the best return per dollar in the room and the least standing to demand anything.
     Where is that division in your company?
   - The layer cost $18M against $110M of value. Why does that deal not happen on its own?
   - What would have to be true for a mandate to be the right answer here rather than a lazy one?
6. A closing note naming the fourth kind of block deliberately kept out of the model: concerns entirely real to
   one division and unpriceable by everyone else. No move fixes those. Name them and take them off the table
   early, or they contaminate everything after.

---

## 5. THE SCRIPT

Every line lives in `data/script.js` as `window.ASTER_SCRIPT`, keyed by group id. Nothing is generated,
templated, or randomised. Voice: senior, specific, not hostile. Each division is right about its own situation.

### Site Operations — Luis Moreno · block: absorption · move: sequence

- **Objection (visible from the start):**
  *"We are not against this. We cannot take a step change in Q3 and Q4 — that is our enrolment peak — and my
  successor arrives in two quarters. Ask me for a number I can still be holding when they get here."*
- **On PRICE (wrong):** *"More capital does not create absorption capacity. You would be handing us money to
  spend in the two quarters we have the least room to change anything."*
- **On UNDERWRITE (wrong):** *"We are not worried about being left exposed. We are worried about the calendar.
  A guarantee does not move our enrolment peak."*
- **On SEQUENCE (right):** *"Back-loaded, staged into gates my successor can own? Then yes. We will carry the
  full number."*

### Clinical Data & Analytics — Evan Cole · block: advantage · move: price

- **Objection:** *"We already funded this. It is in our five-year plan, it is staffed, and we are ahead. What
  you are describing is us slowing down to carry two groups who have not started."*
- **On SEQUENCE (wrong):** *"Time is not our constraint. We are the ones who are ready. Giving us longer just
  wastes the head start we paid for."*
- **On UNDERWRITE (wrong):** *"We are not asking you to protect us from risk. We are asking why we should hand
  over an advantage we bought."*
- **On PRICE (right):** *"Credit what we have already built, make us supplier of record, guarantee the demand?
  Then this is a business rather than a tax. We will build it."*

### Patient Engagement — Clara Vega · block: assurance · move: underwrite

- **Objection:** *"The last time the centre set a standard we rebuilt integrations that already worked, lost
  two enrolment campaigns, and nobody paid for it. The economics here are good. That has never been the issue."*
- **On SEQUENCE (wrong):** *"More time does not help. We would spend it waiting to be told the rules changed
  again."*
- **On PRICE (wrong):** *"We do not need a better price. We need to know that this time the bill does not land
  on us."*
- **On UNDERWRITE (right):** *"Migration covered up front, access guaranteed in writing, before we pledge?
  Then we are in — and we will be the cheapest yes you get."*

### System lines

- Gate reveal: `SHARED TRIAL-DATA LAYER — FUNDED. Cross-boundary workflows now realise in full.`
- Gate still short: `$Xm pledged of $18M. The layer does not get built.`
- Close with nobody committed: `Nobody moved. Nobody was wrong to.`

---

## 6. HOW IT RUNS IN CLASS

Eight to twelve minutes at the lectern. Write this into the README so a facilitator can run it cold.

1. Open `sim.html`. Read the three objections aloud, or have three students read them.
2. Ask the room: *what does each of them actually need?* Take suggestions. Apply them.
3. Let the room misdiagnose. The first instinct is almost always PRICE on everybody — money is the move
   executives reach for — and it lands on exactly one of the three.
4. When two groups have committed, stop and point at the enterprise figure. It has gone **down**. Sit in that.
5. Close the third. Let the gate reveal play without talking over it.
6. `C` to close the round. Read the wasted spend aloud.
7. Move to `debrief.html`, or straight to the framework slides.

If the room stalls, `H` reveals the block labels and turns the exercise from diagnosis into matching. That is a
worse lesson but a better use of the remaining minutes.

---

## 7. `README.md`

Short and public-safe. Must contain: what this is (a fictional teaching simulation about coordination between
divisions); that it is entirely invented; how to run it (open `index.html`, no install, no build, works
offline); the eight-outcome table from §3.4; the facilitator keys from §4.4; and the run-of-show from §6. No
course name, no institution, no instructor, no dates.

---

## 8. BUILD ORDER

1. Delete every file listed for removal in §4.1. Commit that alone.
2. `data/model.js` — constants and `compute()`.
3. A throwaway test that enumerates all eight states and prints the table in §3.4. Do not proceed until it
   matches to two decimal places. Delete it, or keep it as `test.html`; do not ship it linked from anywhere.
4. `assets/style.css` — tokens and layout.
5. `sim.html` + `assets/sim.js` — board, state machine, move application, scoreboard. Build it working and
   ugly first, with no animation at all, and confirm every one of the eight states is reachable by clicking.
6. Add animation. Gate reveal last.
7. `data/script.js` and wire the dialogue in.
8. `index.html`, then `debrief.html`.
9. `README.md`.

---

## 9. VERIFICATION BEFORE SHIPPING

- [ ] All eight states in §3.4 reproduce to two decimal places
- [ ] Every partial coalition displays a value below $167.75M
- [ ] No number appears in any `.html` file — all figures render from `data/model.js`
- [ ] `grep -ri` for the removed design finds no reference to agents, briefs, rounds-with-agents, ATLAS, or
      Claude anywhere in the repo
- [ ] No real organization, person, institution, or course appears anywhere, including in git history added
      by this rewrite
- [ ] Opening `index.html` from `file://` with wifi off works completely, including fonts
- [ ] No network request is made by any page — verify with the browser network tab, filter cleared
- [ ] Every facilitator key in §4.4 works, and `?` lists them
- [ ] `R` from any state returns to a clean all-defending board with `spent` at zero
- [ ] `CLOSE THE ROUND` works from all-defending, from partial, and from all-committed
- [ ] Legible at 1920×1080 from the back of a room; headline figures readable at a glance
- [ ] `prefers-reduced-motion: reduce` reaches identical final state with no transitions
- [ ] Runs identically twice in a row — no randomness, no time-dependence, no storage carried between runs
