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

> **Simplified 2026-09-11 — the exercise is now number-free (this note supersedes the numeric sections below).**
> Feedback was that the information density overwhelmed the room, so all budget figures were removed. The model
> (`data/model.js`) is now a plain boolean: each division is committed or not, and the shared layer is *realized*
> only when all three commit. There are no pools, pledges, capital, multipliers, move costs, enterprise value or
> outcome table. The only figure kept anywhere is the run-rate ambition, shown once on the landing.
>
> As a result, **§3 (the numeric model), §3.4 (the outcome table), and every dollar figure in §2 and §4 are
> superseded** — treat `data/model.js`, `data/script.js` and `assets/sim.js` as the source of truth for the live
> build. What remains accurate here: the three blocks and the four moves (§2.1–§2.3, with UNDERWRITE now
> TRUST-BUILDING), the block→move diagnosis (§2.4), the page flow and copy discipline (§4), and the division
> dialogue in §6. The debrief page was also removed; its framework content lives in `framework-deck.pptx`.

> **Refined 2026-09-12 — central engineering, FUNDING, and the display name.** Three things below are now
> settled and every section here reads to them:
>
> - **No division builds the layer.** Aster has a **central engineering group**, reporting into the Global
>   Clinical Operations Center, and it builds the shared trial-data layer. Each division is asked for its
>   **share of the funding** for that build, plus a change in how it works so it runs on the layer. Data &
>   Analytics is not the builder. It is the division that went furthest, earliest, and its objection is about
>   **paying twice**.
> - **The `price` move is labeled FUNDING.** The **id stays `price`**. `data/model.js`, `data/script.js`
>   (`deals.price`), `state.moveSpent` and the `W` binding all key off it, and the block→move map is derived
>   from it. Only the label a human reads is FUNDING, and the concession it names is **credit rather than
>   cash**: what a division has already funded through central engineering counts against its share of the new
>   build. The id and the label differ on purpose. Do not "helpfully" rename the id to match.
> - **Display name.** The exercise is presented to the room as **The Cross-Division Collaboration Problem**
>   (`landing.title`, and the `<title>` of `index.html` and `sim.html`). *Aster Coordination Simulation* is the
>   internal name of the repository and stays in file headers and these docs; the two are not the same string
>   and should not be conflated.
>
> §6's dialogue transcription predates this refinement as well as the number-free pass; `data/script.js` is the
> original and wins wherever the two disagree.

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
  a room. The three headline figures must be legible at a glance from about 50 feet.
- **Every size is relative; the root scale is fluid.** No layout may assume 1920×1080. Sizes are set in `rem`
  and the root size is a `clamp()` on the viewport, so the same design fits a 1280×720 projector, a 1366×768
  laptop and a 4K panel at identical proportions. At 1920×1080 the projected scale resolves to 18px, which is
  where the body-text floor and the 104px hero figure come from. Two scales only: documents follow width, the
  two full-screen pages follow whichever of width or height is tighter. Nothing may clip: where a layout
  genuinely cannot fit, it stacks and the page scrolls.

---

## 1. WHAT THIS TEACHES

The class has already discussed a case in which the protagonist must decide whether to push for a single
enterprise-wide agentic AI target held across all three divisions, or let each division set its own inside its
own plan while the center supplies platform capability and technical support. The class has then been shown a
framework (§2). This simulation makes the framework land by letting the room try to use it and watch what
happens.

**The room plays the case protagonist**, and every page says so: `meta.you` in `data/model.js` names him, and
`instructions.html` opens with who he is (§4.3a). He sits on the Leadership Council and can argue for a
proposal, owns no P&L, and cannot set a target for any function — any number entering a five-year plan has to
be committed by the P&L owner who will carry it. What the protagonist does control is the center: the shared
platform, the **central engineering group that builds the trial-data layer**, and the budget behind both.
**That is the money a deal spends.** It is also why no division is ever asked to build the layer, only to fund
its share of the build and move onto it. Without this, the exercise
contradicts the case: the protagonist cannot commit money, yet the room spends it.

**Where this sits.** After the class has argued the case question, and before the practitioner conversation
that follows. Its job is not to settle the question. It is to let the room feel what division-led adoption
costs when the shared layer does not get built (the pilot trap, §1.1), and what influence costs when you
cannot compel anyone. Both are what the practitioner is asked about, so the exercise must not hand the room a
conclusion — the copy argues neither side, and §4.7's trouble table gives the facilitator both.

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

### 1.1 Why this is an agentic problem and not the shared-services problem

**The mechanic on its own does not earn its place in an agentic course, and the copy has to close that gap.**
Substitute a shared data warehouse, a common CRM or a single ERP instance for the trial-data layer and nothing
in §2, §3 or §3.4 changes — not the multiplier, not the threshold, not the three blocks, not the result that
partial coordination is worse than none. Those are the economics of shared services, and a good student will
say so. Three things are specific to agents, the facilitator names them at the close (§4.7), and they are what the session
is actually for:

1. **Agents remove partial credit.** Software that covers half the data returns a worse answer, which is still
   worth having. An agent that can reach half a workflow does not complete it. Coverage scaled the value of a
   system; with agents it gates it. This is what makes `multiplier_unfunded` a property of automation rather
   than a modeling convenience — the facilitator concedes the *size* of the number and never the shape.
2. **Agents act; they do not report.** A shared data layer is a read. An agent that reschedules a site visit or
   contacts a patient takes an action inside a division that answers for the consequences. That is an objection
   none of the four moves can answer, and in a real agent program it is usually the one that stops the work.
   It stays out of the mechanic on purpose and is named by the facilitator in discussion (§4.7).
3. **The constraint has swapped ends.** Agent capability arrives in weeks; these agreements take quarters. For
   most of the history of enterprise technology the build was the bottleneck and the business waited for it.
   That reversal is what turns teaching point 1 from a platitude into a finding.

The line that carries all three: **agents turn the org chart into the systems architecture**, because an
agent's reach is set by permission and accountability rather than by integration effort.

The counterintuitive result in §3.4 has a name in this world and the facilitator uses it: **the pilot trap.** Two
divisions fund their own agent pilots, both hit their own success criteria, neither can finish a crossing
workflow, and the enterprise ends up behind where it started.

---

## 2. THE FRAMEWORK

This is the intellectual content the simulation demonstrates. It is carried by the framework deck (§6) and referenced in
the copy elsewhere. Do not paraphrase these definitions — they are used verbatim in class.

### 2.1 Forces incentivizing collaboration — why any division comes to the table

| Factor | Description |
|---|---|
| **Dependency** | Value you cannot realize without an asset another division owns. The more of your value sits on a boundary, the more you need the deal — and if you are the one who owns that asset, your upside is their commitment, not your own roadmap. |
| **Threshold** | The shared asset is lumpy. It exists only above a funding line that no single division can justify on its own numbers, so it gets built jointly or it does not get built. |
| **Duplication** | Left alone, divisions quietly build the same capability twice. Nobody can see it from inside their own plan, and the waste only surfaces once both have been funded. |

### 2.2 Forces incentivizing individualism — why it defends its own plan instead

| Factor | Description |
|---|---|
| **Absorption** | *"We cannot take this much change this fast."* A timing problem, not a size problem — so commit the number and negotiate the clock. |
| **Advantage** | *"We are ahead. Why would we contribute our own funds to build, for the other two, a capability we already have?"* A head-start problem. The division is out in front, has already funded the capability it runs on, and does not want the others leveling up to it at its expense. So let it keep the lead while it shares: credit what it has already funded against its share of the build, **and** make it the owner the others run on. |
| **Assurance** | *"We do not believe this organization can actually deliver."* A belief problem — so build the belief: roadshows, visible internal wins, outside proof points. |

### 2.3 The four moves

Each individualism factor is answered by one move — **except Advantage, which takes two** (FUNDING *and* STATUS). A
division commits only once every move that answers its block has landed, so the division out in front does not
say yes to either lever alone. Everything else is a one-to-one mapping. This is the mechanic.

| Move | Answers | What it is |
|---|---|---|
| **SEQUENCE** | Absorption | Commit the number, negotiate the clock and incremental improvements stage by stage, not the size. |
| **FUNDING** (id `price`) | Advantage | Credit what they have already funded — their earlier spend through central engineering counts against their share of the new build, so they are not asked to pay twice. |
| **STATUS** | Advantage | Protect the lead — name them owner of the shared layer, so the others build on their platform *and the rules they set for it* (autonomy levels, escalation thresholds, what "good enough" means). The authority lever, not a title. |
| **TRUST-BUILDING** | Assurance | Build belief that the organization can deliver — roadshows, visible internal wins, outside proof points. |

### 2.4 The applied diagnosis

| Division | Pull | Block | Move(s) |
|---|---|---|---|
| Site Operations | **Dependent** — 40% of its value needs a layer it cannot build; six of nine top workflows cross its boundary | **Absorption** (timing) | **Sequence** |
| Clinical Data & Analytics | **Supplier** — went furthest earliest and already funded the capability it runs on; least riding on a layer that brings the other two up to it | **Advantage** (head start) | **Funding + Status** |
| Patient Engagement | **Dependent** — best return per dollar in the room, nearly all of it gone without shared data | **Assurance** (belief) | **Trust-building** |

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

  // No `move` field: the moves a division needs are derived from its block (every move whose
  // `answers` matches), so the block→move map cannot drift. Advantage yields two; the rest one.
  groups: [
    { id: "site-ops",           name: "Site Operations & Trial Execution",  short: "Site Operations",
      lead: "Senior Director Luis Moreno",  accent: "amber",
      local_pool: 140, cross_value: 40, capital_need: 26, pledge: 8,
      pull: "dependent", block: "absorption" },

    { id: "data-analytics",     name: "Clinical Data & Analytics",          short: "Data & Analytics",
      lead: "Senior Director Evan Cole",    accent: "cyan",
      local_pool: 95,  cross_value: 20, capital_need: 22, pledge: 6,
      pull: "supplier",  block: "advantage" },

    { id: "patient-engagement", name: "Patient Engagement & Recruitment",   short: "Patient Engagement",
      lead: "Senior Director Clara Vega",   accent: "violet",
      local_pool: 70,  cross_value: 35, capital_need: 12, pledge: 4,
      pull: "dependent", block: "assurance" }
  ],

  // PRICE was split into PRICE ($11M) + STATUS ($1M), so the four move costs still sum to $27M
  // and the outcome economics are unchanged. STATUS is cheap on purpose: a governance title
  // costs the center almost nothing, and the point lands that the near-free lever is what
  // actually closes the deal the $11M one only half-answered. Both answer "advantage".
  moves: [
    { id: "sequence",   label: "SEQUENCE",   cost: 6,  answers: "absorption",
      blurb: "Commit the number, negotiate the clock, and incremental improvements stage by stage." },
    { id: "price",      label: "PRICE",      cost: 11, answers: "advantage",
      blurb: "Pay for the head start. Credit what they have already built, guarantee them demand." },
    { id: "status",     label: "STATUS",     cost: 1,  answers: "advantage",
      blurb: "Protect the lead. Name them owner of the shared layer, so the others build on their platform and the rules they set for it." },
    { id: "trust",      label: "TRUST-BUILDING", cost: 9, answers: "assurance",
      blurb: "Build belief that the organization can deliver. Roadshows, visible internal wins, and outside proof points." }
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

A move is `correct` for a division when it is one of that division's needed moves — `FMT.needs(id)`, the moves
whose `answers` matches the block (one move, or two for Data & Analytics). A correct move that lands *lands*
but does not commit the division until **every** needed move has landed; the first of Data & Analytics' pair is
a real concession that still does not close the deal. Nothing else in the system decides this.

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
index.html          1 · the situation — context, who the room plays, and the three briefs
instructions.html   2 · how the session works, written for the room (§4.3a)
site-ops.html       one brief per division (§4.3b) — three shells, one renderer
data-analytics.html
patient-engagement.html
sim.html            3 · the simulation itself — this is the whole exercise
facilitate.html     the facilitator guide (§4.7) — the answer key lives here, never project it
assets/style.css    all styling, one file
assets/sim.js       state machine, animation, rendering
assets/division.js  renders whichever division a page names in its body data-group
assets/nav.js       the flow between pages, rendered on every page
data/model.js       constants + compute() — the only place numbers live
data/script.js      every line of dialogue (§5)
test.html           model check — enumerates §3.4, linked from nowhere
framework-deck.pptx the two framework slides used to close the session (§6)
README.md           §7
BUILD_SPEC.md       this file
.nojekyll
.gitignore          editor and OS cruft only — this build produces no run artifacts
LICENSE
```

**Nothing else belongs in the repo.** The retired live-negotiation build — `.claude/`, `briefs/`, `runs/`,
`facilitator/`, `role.html`, `brief.html`, `watch.html`, `results.html`, `data/private/`, `data/scenario.js`,
`assets/app.js` — was deleted in its own commit before this build started, so no dead reference survives. It
is recoverable from git history and must not come back.

The per-division brief that `role.html` used to carry *is* back, as §4.3b, because the room needs something to
diagnose from. It is not the old page: there are no private files, no per-role secrets and no separate
facilitator copy. Each division page is a shell that names its division and reads every figure and every
sentence from `data/model.js` and `data/script.js`, like every other page here.

The deck carries the same constants as `data/model.js` and is written against this mechanic, not an earlier
one. The two slides are §2.1–§2.4: the forces, then the generalized blocker→move playbook (all four moves). If a constant changes here, the deck changes with it.

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

### 4.3 `index.html` — the situation

A document, like the rest of the flow: it uses the shared `.doc` layout and scrolls. It is not pinned to one
screen — that pinning clipped the page whenever the content grew, and took the nav and the BEGIN button with
it. Only `sim.html` is a one-screen page.

This is step 1 of three, and it carries the briefs. There is no separate divisions hub.

- Title and standfirst, then the situation in three headed sections, read top to bottom: where things stand,
  why nobody has said yes, what you can do about it
- **What you will do** — restates who the room is playing before it names the task, because the one thing
  people get wrong is assuming they are playing a division. Everyone is the CIO; nobody owns a division;
  the only thing on the table is a deal
- The three divisions as cards: short name, lead, one line of descriptor, and a **Read the full brief**
  button in the division's accent. Each opens that division's brief (§4.3b) in a **new tab**
  (`target="_blank"`, `rel="noopener"`), so a group can keep all three open beside this page
- One primary button, **BEGIN**, to `instructions.html` — the situation hands off to the next step in the
  flow, not to the board, so nobody arrives at the exercise without having been told the rules
- The disclaimer from `meta.disclaimer` as fine print at the foot
- No figures. The exercise is number-free apart from the run-rate ambition, which appears once in the copy

### 4.3a `instructions.html` — how the session works

The page the room reads, and the answer to "where are the instructions?". It scrolls. It is written for
participants, not for the facilitator, and it **names no blocks and gives nothing away**: it explains the
situation and the rules, never the diagnosis.

**Plain words are the requirement, not a preference.** No "boundary", no "realize", no "multiplier", no
"platform capital", no "pledge" where "pay its share" will do. A reader who has never seen the case has to
follow it cold. Where a figure could be doubted, the page shows the arithmetic instead of asserting it.

In order:

- **Who you are in this exercise**, first, because nothing after it makes sense otherwise: the protagonist by
  name and title from `meta.you`, that everyone in the room plays the same person, what he cannot do (set a
  target, commit another P&L's money) and what he can (spend the center's platform and engineering budget,
  which is what a deal costs).
- **What is being decided**, in prose only: the layer costs `infrastructure_required` and is all or nothing;
  each division pays a fixed share (the three named inline via `{shares}`) that sums to exactly the build cost.
  No separate shares table — the earlier one duplicated the shares that already appear in the your-budget/theirs
  table below, and the page reads lighter without it. Then the line that answers what people actually ask.
- **What each division is worried about**, placed before any of the arithmetic — one line per division, in its
  own accent, from the `worry` field in the copy. This centers the exercise on the three human challenges (a
  calendar, a lead worth protecting, a broken trust) rather than opening on a wall of numbers. It still names no
  block and no move; working out which deal answers which worry is the exercise.
- **Where the numbers on the board come from**, condensed to two rows: each division has a *potential upside*
  (the reader-facing rename of "value pool"); without the layer it runs at `multiplier_unfunded` of it because
  half a workflow is worth nothing, which is why the board opens below the sum of the upsides; build it and the
  cap comes off, `cross_value` becomes reachable, and the total reaches the ceiling — but only if all three pay.
  No worked arithmetic block: the goal here is fewer numbers, not more.
- **What the room is asked to do**: work out what each division needs, then offer the deal that gives it —
  spending the center's budget, not theirs. Four deals; two divisions need one each, one needs two.
- **The four deals**: for each one, its framework label, what it is in plain words, and its cost from `moves`,
  under a header that says whose money that is. The plain name is what makes the labels usable cold; it never
  says which division a deal suits.
- **Your budget, and theirs**, as its own table, because confusing them is the easiest mistake on the page and
  the amounts invite it — `SEQUENCE` costs $6M and Data & Analytics' share is also $6M. *Their budget — the
  share* is the division's own money going into the layer, and is fixed. *Your budget — the deal cost* is the
  center's money, spent to get the agreement; it never enters the layer and never enters the enterprise total,
  which `compute()` confirms — `spent` is returned alongside `enterprise`, never subtracted from it.
- **The rules, and what a deal does** — one merged list, not a separate "what happens when you offer a deal"
  table (that table overlapped the rules and made the page heavier than it needed to be). It covers: the cost
  leaves the moment you offer, before anyone knows if it worked; a miss draws a refusal and moves nothing; a
  deal that answers has the division agree, the funding bar rise, and its own number dip; a *helps-but-not-
  enough* deal leaves the division where it was; one offer of each deal per division, agreement is permanent,
  nothing can be taken back; all
  three needed before the layer gets built
- **What to watch**: the enterprise figure, because it does not move the way people expect

### 4.3b The division pages — one brief per division

Three pages, one per division, built from a single shell plus `assets/division.js`. The body carries
`data-group="<id>"`; everything else is read from the model and the copy file, so the three pages cannot drift
apart and no figure is typed into any of them. The three briefs are reached from `index.html`, which carries the
four figures each, linking into the briefs, and the briefs loop to one another so the room can walk all three
and come back.

Each brief carries, in order: the division's full name with its accent dot, its lead, one line on what it
does; its four figures (`local_pool`, `cross_value`, `capital_need`, `pledge`); where it stands, in three
paragraphs; what it has said, as the `objection` verbatim in the serif face, attributed to its lead; what it
is measured on; what it is being asked to pledge; and one closing line telling the reader what to work out.

Like §4.3a these pages **name no blocks**. They carry the evidence the diagnosis is made from — the calendar,
the head start, the unreimbursed bill — and never the label for it. The nav marks these pages as step 3 via
`data-current` on the nav host, since they belong to that step without being its URL.

### 4.4 `sim.html` — the simulation

This is the whole exercise. One screen, no scrolling, driven from a lectern.

**Header band.** Three figures, always visible, updating live:

| Figure | Source | Note |
|---|---|---|
| **ENTERPRISE VALUE** | `enterprise` | Largest element on screen. Counts up or down on change. |
| **VS AMBITION** | `gap` | Shown as `SHORT $82.25M` in coral or `AHEAD $28.25M` in mint. |
| **SPENT ON DEALS** | `spent` | Neutral until the close, where wasted spend is broken out. |

Below them, a thin **shared trial-data layer** meter filling toward `$18M`, labeled with the running pledge
total and `NOT FUNDED` / `FUNDED`.

**The board.** Three rows, one per group. Each row carries:

- Accent dot, short name, lead name
- **State badge** — `DEFENDING` in coral, or `COMMITTED` in mint
- **The objection**, in the group's own words, in the serif face (§5). This is visible from the start.
- **The block label is hidden.** It is revealed only when that group's correct move is applied. There is no
  key that reveals it early — the room's job is to diagnose from the objection.
- A value bar scaled against `local_pool + cross_value`, as two segments. Its legend words come from the copy
  file and say what the two kinds of value are in plain terms — "Its own work" and "Work spanning divisions",
  never "local" and "cross-boundary". The same two words head the scoreboard columns.
- Four move buttons, each three lines: the framework label, what the deal is in plain words from `deals` in
  the copy file, then the cost from `moves` — `SEQUENCE / Change the timing / $6M`. The label alone means
  nothing to a room seeing it for the first time, and the plain line is what makes it usable cold. The hover
  title carries the full description; nothing on the button says which division a deal suits.
- The funding meter's label comes from the copy file too, and counts in plain words: *"Shared trial-data layer
  — $8M committed of the $18M it costs"*.

**Applying a move.** Click, or the keyboard shortcut. Sequence:

1. Button depresses and locks. `spent` increments immediately — *the money is gone before you know if it
   worked.* This ordering is deliberate; do not defer it until after the outcome is known.
2. The group's response line types in beneath the objection, 18ms per character.
3. **Wrong move:** the row shakes horizontally once, 6px, 180ms. The response is the group's rejection line.
   The button stays locked and grays out — a move once spent on a group cannot be spent again. State unchanged.
4. **Correct but not enough** (only the first of Data & Analytics' FUNDING/STATUS pair): the button turns mint
   and the partial line types in amber (`response--partial`). The concession is real and the money is spent,
   but the division does not commit — the badge stays `DEFENDING` and no numbers move. The other needed move
   and the two wrong moves remain live.
5. **Right move** (the single needed move, or the second of the pair): the row flashes mint, the state badge
   flips `DEFENDING → COMMITTED`, the block label appears with a tick, the pledge meter increments, and every
   number on screen recomputes.

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
| `Q` `W` `E` `R` | Apply Sequence / Funding / Status / Trust-building to the selected row |
| `N` | Toggle the presenter note (§4.7) |
| `C` | Close the round |
| `Backspace` | Reset (moved off `R`, which now applies Trust-building) |
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
- A `BACK TO THE BOARD` button. This is the terminal screen; the session moves to the deck from here.

### 4.6 `debrief.html` — REMOVED

The debrief page was cut. Its framework content now lives in the two-slide `framework-deck.pptx` (§6): slide 1
is the two force tables (§2.1–§2.2), slide 2 the generalized blocker→move playbook (§2.3, all four moves). The
material that had no home on the slides — the eight-outcome table, the pilot trap, the "why agentic" three
lines, the discussion questions, and the fourth-block closing note — is now the facilitator's to deliver from
`facilitate.html` (§4.7): the beat script names the pilot trap and the three agentic points at the close, and
the pushback table carries the rest. The exercise ends at its own scoreboard (§4.5); there is no sixth page.

### 4.7 The flow, and `facilitate.html`

**The flow.** The class-facing pages are one numbered path — *1 the situation · 2 how it works · 3 the
divisions · 4 the exercise* — rendered by `assets/nav.js` from `nav` in `data/script.js`, with
the current page marked. Five labels are as many as fit on one line, so the steps carry no descriptions; the
guide has room for those and gives them. It
sits at the top of the documents and quietly in the exercise's footer, where it must not compete with the
board. The facilitator guide hangs off that flow as an unnumbered aside on every page: it is never part of the
class path, because it carries the answer key.

**`facilitate.html`** is the guide a facilitator reads before standing up, and the only page written for them
rather than for the room. It scrolls, it is never projected, and it says so on itself. It carries, in order:
where each page and each deck slide fits; a beat-by-beat table of what to do and what to say across the eight
to twelve minutes; the answer key, rendered from the model rather than typed, with the tell that gives each
block away; the two moments that carry the session — the number falling and the gate reveal — and the
instruction to stay quiet through both; what to do when it goes sideways; the six things the room pushes back
with, answered; the facilitator keys, from the same list the `?` overlay uses; and a closing note to rehearse
it once alone. Every figure in it is substituted from the model at runtime (§3.1).

**The presenter note** (`N`) is the same material reduced to the one beat the board is currently on — opening,
probing, first commitment, the pivot at two committed, funded, closed. The beat is derived from state, never
stored, so it cannot disagree with the board. It is off by default and docks above the footer rather than
floating over the board, because a panel over the rows would cover the move buttons of the division it is
talking about. It shows on the projector like everything else, and the copy says so.

---

## 5. THE SCRIPT

Every line lives in `data/script.js` as `window.ASTER_SCRIPT`, keyed by group id. Nothing is generated,
templated, or randomized. Voice: senior, specific, not hostile. Each division is right about its own situation.

**`data/script.js` is the original; what follows is a transcription of it.** If the two disagree, the copy file
wins and this section is stale — regenerate it from the copy file rather than editing it here. Plain words are
a requirement of the dialogue too: a division says "money is not the problem", never "absorption capacity".

### Site Operations & Trial Execution — Luis Moreno · block: absorption · needs: sequence

- **Objection (visible from the start):** *“We are not against this, and we are not arguing about the money. Q3 and
  Q4 are our enrollment peak. We cannot change how we work in the two busiest quarters of our year. On top of that, I
  hand over to my successor in two quarters. Ask me for something that will still be running when they arrive.”*
- **On SEQUENCE (right):** *“So we start after the peak, in stages my successor can pick up? Then yes. We will pay
  the full share.”*
- **On FUNDING (wrong):** *“Money is not the problem. You would be giving us more to spend in the two quarters when we
  have the least room to change anything.”*
- **On TRUST-BUILDING (wrong):** *“Roadshows and success stories do not move our enrollment peak. We are short of a
  quarter we can change, not short of belief.”*

### Clinical Data & Analytics — Evan Cole · block: advantage · needs: price + status  *(labeled FUNDING + STATUS on the board)*

- **Objection (visible from the start):** *“We have already paid for this. It is in our five-year plan, the team is
  hired, and we are further along than either of them. What you are asking is that we slow down and build it for two
  divisions who have not started.”*
- **On SEQUENCE (wrong):** *“Time is not our problem. We are the ones who are ready. Giving us longer just wastes
  the head start we paid for.”*
- **On FUNDING (right):** *“So you pay us for what we have already built, the other two buy their data services from
  us, and you guarantee they actually will? Then it is a business, not a tax. We will build it.”*
- **On TRUST-BUILDING (wrong):** *“We do not need convincing that it works — we built it. Selling it to the skeptics
  is someone else’s job, not ours.”*

### Patient Engagement & Recruitment — Clara Vega · block: assurance (belief) · needs: trust

- **Objection (visible from the start):** *“We have watched the center promise big things before, and stall. It is
  not the money, and it is not the numbers — those are good. We just do not believe this organization can actually
  pull something like this off. Show us it can.”*
- **On SEQUENCE (wrong):** *“More time does not change whether we believe it will work. We would just spend it
  waiting to see if it does.”*
- **On FUNDING (wrong):** *“A better price does not make the thing more likely to get built. We are not holding out for
  money.”*
- **On TRUST-BUILDING (right):** *“So you will show it working — roadshows, the early wins where we can see them, the
  outside companies who have already done it — until we believe this organization can deliver? Then we are in, and we
  will be the cheapest yes you get.”*

### System lines

- Gate reveal: `The shared trial-data layer is funded. Every division now runs at full rate, and work that spans
  divisions starts paying.`
- Gate still short: `$Xm pledged of $18M. The layer does not get built.`
- Close with nobody committed: `No division pledged. On its own numbers, none of them was wrong to hold back.`

---

## 6. HOW IT RUNS IN CLASS

Eight to twelve minutes at the lectern. Write this into the README so a facilitator can run it cold.

1. Open `sim.html`. Read the three objections aloud, or have three students read them.
2. Ask the room: *what does each of them actually need?* Take suggestions. Apply them.
3. Let the room misdiagnose. The first instinct is almost always FUNDING on everybody — money is the move
   executives reach for — and it lands on exactly one of the three.
4. When two groups have committed, stop and point at the enterprise figure. It has gone **down**. Sit in that.
5. Close the third. Let the gate reveal play without talking over it.
6. `C` to close the round. Read the wasted spend aloud.
7. Close on the two framework slides.

If a group stalls, send it back to the brief for the division it is stuck on. What that division is holding
out for is in what it says, and the brief is the only place it is written down.

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
8. `index.html`, then `facilitate.html`.
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
- [ ] Every page reaches every other page: the flow renders on all of them, marks the current page — including
      the three division briefs, which mark step 3 — and the guide is reachable from each of them
- [ ] `instructions.html` and the three division briefs name no block and no move mapping anywhere on them
- [ ] Nothing a participant reads uses "boundary", "realize", "multiplier", "platform capital" or "pledge"
      where plain words would do — including the board's legend, the meter and the deal buttons
- [ ] No page asserts a figure a participant could check and find wrong: the instructions show the share
      arithmetic and say why all three paying lands short of the pools plus the cross-boundary value
- [ ] The instructions distinguish the two pots of money, and say what offering a deal does before it is
      offered — both were missing, and both were what the room asked about first
- [ ] Every page that says "you" means the protagonist named in `meta.you`, and no page implies he can compel
      a division or spend a division's budget
- [ ] Nothing in the copy argues for or against the enterprise mandate — that is the class's debate, and the
      exercise is evidence in it rather than a verdict on it
- [ ] `N` shows the right beat for the board's state, and never covers a move button
- [ ] The exercise fits one screen with no scrollbar and no clipped row at 1280×720, 1366×768, 1920×1080 and
      2560×1440 — including the worst case, all three committed with the presenter note showing
- [ ] `R` from any state returns to a clean all-defending board with `spent` at zero
- [ ] `CLOSE THE ROUND` works from all-defending, from partial, and from all-committed
- [ ] Legible at 1920×1080 from the back of a room; headline figures readable at a glance
- [ ] `prefers-reduced-motion: reduce` reaches identical final state with no transitions
- [ ] Runs identically twice in a row — no randomness, no time-dependence, no storage carried between runs
