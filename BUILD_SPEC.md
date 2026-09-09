# BUILD SPEC — Aster Clinical Operations Agentic Allocation Simulation

**This file is the complete and only source of truth for this repository.** Everything needed to build the
simulation is written out below: the fictional world, the numbers, the scoring math, the agent personalities,
the page-by-page UI spec, and the facilitator runbook. Do not look for other source documents; there are none.

> **Amended 2026-09-09**, to match the final case and to simplify the brief. Four changes worth knowing about
> if you read an earlier copy:
>
> 1. Rao is **Chief Information Officer**; the **Clinical Operations Leadership Council** replaces the
>    executive committee; ATLAS acts for **Daniel Okafor** at Enterprise Trial Infrastructure & Standards.
> 2. **ATLAS no longer allocates the enterprise target.** Only a P&L owner can commit a number into a plan, so
>    each group commits its own and ATLAS records it. The $250M is an *ambition*, and the shortfall against it
>    is a reported finding — the **commitment gap** (§3.6).
> 3. Two facts from the final case became private information: the duplicated dropout-risk agent, and Patient
>    Engagement's history with a central data standard (§2.3).
> 4. The brief is **five written fields inside a 1,600-character cap** (§4.5), down from seven inside 2,400.

You are building two halves that live in one repo:

1. **A public static site** (GitHub Pages, no backend, no build step) that students use in class.
2. **A local facilitator harness** (Claude Code subagents + commands) that runs the agent negotiation live in a
   terminal projected to the room.

---

## 0. HARD CONSTRAINTS — read first

These are non-negotiable. Violating any of them is a build failure.

- **This repo is public.** Never name a real company, a real executive, a real university, a real course, or a
  real instructor anywhere in this repository — not in code, comments, commit messages, page copy, the README,
  or agent files. The world is entirely fictional and named **Aster Life Sciences**. Every person, number, group,
  and event below is invented. If you are ever unsure whether a detail traces back to something real, cut it.
- **Repository and deployment naming.** Name the repo and the Pages URL after the fiction only — e.g.
  `aster-clinical-ops-simulation`. Do not encode an industry, a client, a course code, or a date in the name.
- **No real-company framing.** Never describe this as "based on" or "disguised from" a real organization. It is a
  fictional teaching simulation. Say so on the landing page.
- **No backend, no build step, no package manager.** Plain HTML, CSS, and vanilla JS served directly by GitHub
  Pages from the repo root (or `/docs`). No npm, no bundler, no framework, no server. It must work if someone
  clones the repo and opens `index.html` from the filesystem.
- **No API keys anywhere.** The public site never calls a model. All model work happens in the facilitator's
  local Claude Code session.
- **No student data leaves the browser.** The brief builder holds state in memory and `localStorage` only.
- **One source of truth for numbers.** All scenario constants live in `data/scenario.js`, as a single pure
  JSON object literal assigned to `window.ASTER_SCENARIO`. It is a `.js` file rather than `.json` because the
  site must run from `file://`, where `fetch()` of a local JSON file is blocked by browser CORS policy and a
  `<script>` tag is not. The site reads it at runtime; the agent files reference the same values. Never
  hardcode a number twice.
- **Group-private information is never in the shared data file.** It lives in `data/private/<group>.js`, and a
  role page loads only the one file matching its own `?g=`. A single shared file would put every section's
  private block into every section's page state, which §9 forbids.
- **Works offline.** No CDN fonts, no external scripts, no analytics. Everything inlined or local.

---

## 1. WHAT THIS SIMULATION TEACHES

The class has already discussed a case in which a Chief Information Officer must decide
whether to push for a **single enterprise-wide agentic AI target** or let each functional group **set its own
targets** inside its own planning cycle.

This simulation makes students *feel* the answer rather than argue it. The mechanic is built so that:

- Agentic AI is **expensive**. Someone has to pay for platform capital and scarce engineers.
- The **largest value pools cross functional boundaries** and require shared data and tooling that no single
  group can justify building alone.
- A group that optimizes purely locally **wins the argument and loses the outcome**.
- Students never debate each other directly. Their judgment shows up entirely in **what they chose to tell their
  agent** — which is the delegation lesson.

The intended emotional arc across rounds:

| Round | What usually happens | What students learn |
|---|---|---|
| 1 | Each section instructs its agent to maximize its own take. Shared infrastructure is underfunded. Enterprise gate is missed. Everyone's realized value is crushed. | Local optimization is individually rational and collectively fatal. |
| 2 | Sections rewrite briefs to authorize cooperation, pledges, and trades. Gate is met. Value roughly doubles. | A top-down target and shared platform funding is what unlocks the value pools. |
| 3 (optional) | Sections compete *within* a cooperative frame — who contributes most credibly. | Enterprise commitment and self-interest are not opposites once the platform exists. |

---

## 2. THE FICTIONAL WORLD (all content below goes into the site verbatim or lightly edited)

### 2.1 Setting

**Aster Life Sciences — Global Clinical Operations Center.** Mid-2026. The Center runs clinical trials at global
scale through three operating groups, each with its own P&L, customers, planning rhythm, and technical maturity.
A fourth unit, **Enterprise Trial Infrastructure & Standards**, provides shared platforms, data standards, and
governance that cut across all three.

The Chief Information Officer, **Alexiel Rao**, has just run a live agentic AI demonstration for the
**Clinical Operations Leadership Council**. Everyone agrees the opportunity is real. Nobody agrees on who
commits to what. Rao has been given one negotiation to settle it.

**Rao cannot impose a target.** The Council is chaired by the Chief Clinical Officer, and Rao is a member of
it, but membership confers no authority over targets: only a P&L owner can commit a number into a five-year
plan, and Rao owns no P&L. He can argue for the number. He cannot set it. This constraint drives the whole
mechanic — see §3.1.

### 2.2 What is being negotiated

Three things are on the table simultaneously. Two are prizes; one is a burden. This is what makes the negotiation
non-trivial.

| Item | Total | Nature |
|---|---|---|
| **Platform capital** | **$60M** over three years | Prize — funds agent infrastructure, model spend, tooling |
| **Central engineering capacity** | **120 engineer-quarters** | Prize — scarce senior agent engineers |
| **Enterprise value ambition** | **$250M** run-rate savings | Ambition — Rao's ask, not a mandate. Each group commits its own number; nobody can set one for them |
| **Shared infrastructure pledge** | **$18M** needed, from group pledges | Neither — voluntary, comes off the top of your own allocation |

Every group wants **more capital**, **more engineers**, **a smaller number of its own to carry**, and **someone
else to fund the shared infrastructure**.

### 2.3 The three student sections

Each section plays one group and sees **only its own role page**. Private information is deliberately partial —
no group can see the whole board alone.

---

#### SECTION A — Site Operations & Trial Execution
*Agent codename:* `MORENO-AGENT` (after Senior Director Luis Moreno)

**Public profile:** Largest group. Manages relationships with hundreds of clinical trial sites, hospitals, and
research centers across multiple geographies. High revenue, margin sensitive. Highly competitive business.

**Numbers (public to this section):**
- Local value pool potential: **$140M**
- Capital needed for full capability: **$26M**
- Engineering needed for full capability: **52 engineer-quarters**

**Private information — the other groups do NOT know this:**
- Internal analysis shows **six of the nine highest-value workflows** in the Center run *through* Site Ops but
  *begin or end* in another group. You are the biggest beneficiary of cross-boundary work and you know it.
- Roughly **40% of your value pool cannot be realized without a shared trial-data layer** you have neither the
  expertise nor the mandate to build.
- A **new technology leader arrives in two quarters.** Committing hard now risks a commitment your incoming
  leader has to own and did not make.
- **Enrollment seasonality** means your Q3/Q4 change-absorption capacity is close to zero. You can take a big
  target, but not a big *near-term* target.

**What you do not know:** that two other groups have each separately scoped the same dropout-risk agent. Also:
what the shared data layer actually costs, how long it takes, or that Patient
Engagement's value is even more dependent on it than yours.

**Your section's objective:** maximize Site Ops' realized value net of the target burden you accept.

---

#### SECTION B — Clinical Data & Analytics
*Agent codename:* `COLE-AGENT` (after Senior Director Evan Cole)

**Public profile:** Manages trial data collection, validation, and statistical analysis. Deep technical
expertise, high investment intensity. Serves internal trial teams and regulatory bodies.

**Numbers (public to this section):**
- Local value pool potential: **$95M**
- Capital needed for full capability: **$22M**
- Engineering needed for full capability: **40 engineer-quarters**

**Private information — the other groups do NOT know this:**
- You are **the only group that can build the shared trial-data layer.** You know its real cost: **$18M and three
  quarters of elapsed time.**
- You have **already funded a multi-year agentic plan** inside your own five-year strategy. You are further along
  than anyone else and you resent being asked to slow down and carry others.
- Your **statisticians are genuinely uneasy** about agent-driven data validation. Your absorption limit is real,
  not tactical — pushing past roughly 80% capability in year one creates quality risk you will be blamed for.
- Your local pool is **the second largest but the hardest to grow**. Most of your upside is in enabling others.
- You have already scoped an agent that **identifies patients at risk of dropping out of a trial.** It needs its
  own data pipeline, its own model, and about **six engineer-quarters.** It is in your plan and you have not
  discussed it with anyone outside your group.

**What you do not know:** how much of Site Ops' and Patient Engagement's value actually depends on your layer.
Left to your own information, you will systematically **undervalue building it**. You also do not know that
Patient Engagement has scoped **the same dropout-risk agent you have**, down to the duplicated pipeline.

**Your section's objective:** maximize Clinical Data & Analytics' realized value net of the target burden you accept.

---

#### SECTION C — Patient Engagement & Recruitment
*Agent codename:* `VEGA-AGENT` (after Senior Director Clara Vega)

**Public profile:** Directs patient outreach, enrollment, and retention through diverse channels and vendor
partnerships. Smallest of the three groups. Brand and channel driven.

**Numbers (public to this section):**
- Local value pool potential: **$70M**
- Capital needed for full capability: **$12M**
- Engineering needed for full capability: **28 engineer-quarters**

**Private information — the other groups do NOT know this:**
- You have **the highest return per dollar of capital** of any group. Your workflows are cheap to automate and
  the payoff is fast. This is your only real leverage.
- You have **almost no internal engineering.** You have historically bought innovation from external agencies.
  You need central engineers far out of proportion to your size, and you will be attacked for it.
- **Nearly all of your value evaporates without shared patient and trial data.** Outreach, retention, and
  follow-up agents are worthless if they cannot see trial and site state. You are the most dependent group in
  the room and the least able to fix it yourself.
- You have already scoped an agent that **identifies patients at risk of dropping out of a trial.** It needs its
  own data pipeline, its own model, and engineers you do not have. It is in your plan and you have not discussed
  it with anyone outside your group.
- **You have been burned by central standards before.** The common trial data standard Enterprise introduced
  last year forced you to rebuild outreach integrations that were already working, and it **delayed two
  enrollment campaigns by a quarter.** Nobody compensated you. You have a real, evidenced reason to distrust
  anything held at enterprise level — and you may use it.

**What you do not know:** that you are the smallest claim on the table and will be outgunned in a pure
resource fight unless you trade something — your efficiency evidence, or your vote on infrastructure. You also
do not know that Clinical Data & Analytics has scoped **the same dropout-risk agent you have**.

**Your section's objective:** maximize Patient Engagement & Recruitment's realized value net of the target
burden you accept.

---

### 2.4 The orchestrator (facilitator-run, not a student section)

*Agent codename:* `ATLAS` — Enterprise Trial Infrastructure & Standards, under Senior Director **Daniel
Okafor**, convening on behalf of the Clinical Operations Leadership Council.

ATLAS is **not** a student section. It runs the negotiation protocol, presses each group for specific
commitments, and at the end applies the allocation rubric and computes results. It has one interest: the
enterprise number. It does not have a P&L.

---

## 3. THE MATH

All constants below go in `data/scenario.js`. The site displays them; the orchestrator computes with them.

### 3.1 Inputs the orchestrator produces per group

ATLAS **allocates** the centrally-held resources, because the centre owns them:

- `capital_g` — $M of the $60M pool
- `eng_g` — engineer-quarters of the 120

ATLAS **records** what each group chose for itself, because it has no authority to choose for them:

- `target_g` — $M this group **committed to carrying**. ATLAS may press once for a specific figure and may say
  a number looks low against that group's own stated pool, but it may not change it and may not assign one to a
  group that refuses. A group that commits nothing is recorded at `0`.
- `pledge_g` — $M this group pledged to shared infrastructure (deducted from `capital_g`)
- `standards_g` — boolean: did this group commit to shared data standards
- `rubric_g` — five scores 0–5 (see §3.4)

Constraints ATLAS must satisfy:
- `Σ capital_g = 60`, `Σ eng_g = 120` — both exact, whole numbers
- **`Σ target_g` is unconstrained.** It is whatever the three groups committed to. It must never be adjusted to
  reach $250M; the shortfall is reported instead (§3.6).
- `pledge_g ≤ capital_g` (over-pledging is capped and scored as bad faith)

### 3.2 Capability

```
effective_capital_g = capital_g - pledge_g
c_g = min( effective_capital_g / capital_need_g , eng_g / eng_need_g )   clamped to [0, 1]
```

The `min` is deliberate: **money without engineers, or engineers without money, is wasted.** Hoarding one
resource starves your own capability as well as everyone else's.

Needs sum exactly to supply (`26+22+12 = 60`, `52+40+28 = 120`), so a perfectly cooperative split with zero
pledge gives every group `c_g = 1.0`. Funding the platform costs real capability. That trade-off is the point.

### 3.3 The enterprise gate

```
platform_funded = ( Σ pledge_g >= 18 )

if platform_funded:
    platform_multiplier = 1.00
    cross_pool_unlocked = true
else:
    platform_multiplier = 0.55      # agents stay inside one boundary = expensive automation
    cross_pool_unlocked = false
```

**Cross-boundary pool: $95M.** It belongs to no group. It exists only if the platform is funded, and it is
distributed by ATLAS in proportion to each group's *contribution* to unlocking it (pledge size, standards
commitment, and rubric dimension 2), not to group size.

```
V_g = local_pool_g * c_g * platform_multiplier
      + ( cross_pool_share_g * 95 * c_g   if cross_pool_unlocked else 0 )

enterprise_value = Σ V_g
```

**Worked scenarios (put these in the facilitator runbook, never on the student site):**

| Scenario | Σ pledge | Platform | Σ V | vs $250M ambition |
|---|---|---|---|---|
| Everyone hoards, perfect split, no pledge | $0M | NOT FUNDED | **$167.75M** | miss by $82M |
| Platform funded, capital split proportionally | $18M | FUNDED | **$280.00M** | beat by $30M |
| Platform funded but one group starved of engineers | $18M | FUNDED | **$232.46M** | miss by $18M |

These are exact, not approximate — they reproduce from the constants above. If a dry run does not behave like
row 1, the constants are wrong; fix them rather than the agents.

Round 1 almost always lands in row 1. That failure is the lesson.

### 3.4 The allocation rubric (how ATLAS decides)

ATLAS scores each group 0–5 on five dimensions and allocates **capital and engineers** in proportion to the
weighted score, capped so that no group receives more than its stated need — capability clamps at 1.0, so
anything beyond need is waste. Surplus is redistributed among groups still below their need, again by weighted
score, until the pool is exhausted.

**The target is not allocated.** Each group commits its own (§3.1), which is what makes dimension 4 coherent:
it scores the number the group chose for itself.

| # | Dimension | Weight | Visible to students? |
|---|---|---|---|
| 1 | **Value evidence** — is the ask tied to specific, quantified workflows? | 25% | Yes |
| 2 | **Cross-boundary contribution** — what does this group give to the shared platform or standards? | 25% | Yes |
| 3 | **Absorptive capacity** — realistic about change absorption; names accountable leaders | 15% | Yes |
| 4 | **Target credibility** — committed a number proportional to its **own** opportunity; this is where lowballing is priced | 15% | Yes |
| 5 | **Enterprise citizenship** — did it help close the gate, or free-ride on others? | 20% | **No — hidden weight** |

Dimensions 1–4 are published in the rules on the student site. **Dimension 5 and its weight are not.** During
the negotiation the site and terminal show only a neutral **Enterprise Readiness meter** (§4.5) so students feel
the pressure without being told the formula. The full rubric is revealed at the debrief.

### 3.5 Scoring and ranking

```
shortfall_g = max(0, target_g - V_g)
group_score_g = V_g - 1.5 * shortfall_g
```

Accepting a target you cannot hit is punished harder than accepting a small one — but ATLAS's dimension 4 docks
groups that duck the target, so both directions are covered.

**Ranking rule — this is what makes "nobody wins alone" literal:**

> If `enterprise_value < 250`, **no ranking is awarded.** The leaderboard displays
> `NO WINNER — ENTERPRISE COMMITMENT MISSED` and shows all three group scores greyed out with their raw values.
> Only when the enterprise ambition is reached does the site rank sections 1–2–3.

Note the incentive `shortfall_g` creates: because each group now chooses its own `target_g`, a group that
commits a small number is hard to punish here. **That is deliberate.** Rubric dimension 4 is the only thing
standing against it, so ATLAS must score lowballing hard and name it in the rationale.

### 3.6 The commitment gap

```
target_committed = Σ target_g
commitment_gap   = 250 - target_committed        (report even when negative)
```

This is a **second headline finding, independent of the platform gate**, and it is the one that maps most
directly onto the case decision. Expect the three groups to commit somewhere around $200M–$230M: short of the
ambition *before a single agent is built* and before the multiplier applies at all.

Report it whether or not the platform was funded. A round in which all three groups commit small targets, hit
them comfortably, and still leave the enterprise far short is a complete and instructive outcome — not an
error state.

---

## 4. THE PUBLIC STATIC SITE

### 4.1 Repo layout

```
/
├── BUILD_SPEC.md              # this file — keep it, it is the spec of record
├── README.md                  # short, public-safe; see §7
├── index.html                 # landing + how it works + round tracker
├── role.html                  # role brief; ?g=site-ops | data-analytics | patient-engagement
├── brief.html                 # brief builder; same ?g= param
├── watch.html                 # what to watch while the terminal is projected
├── results.html               # paste results JSON → scoreboard
├── debrief.html               # discussion questions
├── assets/
│   ├── style.css              # one stylesheet, design tokens at top
│   └── app.js                 # shared: scenario loader, router, storage, render helpers
├── data/
│   ├── scenario.js            # ALL constants — single source of truth
│   └── private/               # per-group private info; role page loads only its own
│       ├── site-ops.js
│       ├── data-analytics.js
│       └── patient-engagement.js
├── .claude/
│   ├── agents/                # §5
│   └── commands/              # §6
├── briefs/                    # facilitator drops student briefs here
│   └── .gitkeep
├── runs/                      # transcripts + results per round
│   └── .gitkeep
└── facilitator/
    ├── RUNBOOK.md             # §6.4
    ├── fallback-briefs/       # pre-written briefs if a section stalls
    └── demo-run/              # a committed example transcript + results.json
```

### 4.2 Design direction

Not a toy. This is projected in a graduate classroom and students look at it on laptops in a dim room.

- **Dark-first**, with a light variant honoring `prefers-color-scheme`. Define all colors as CSS custom
  properties on `:root`, override under `@media (prefers-color-scheme: light)`.
- **Type:** system font stack only (no CDN fonts). Generous size — body 16–17px, role-page headings large.
  Numbers in a tabular-figures monospace stack so columns align.
- **One accent per section**, used consistently everywhere that section appears (role page, brief builder,
  scoreboard bar, transcript legend). Suggested: Site Ops amber, Data & Analytics cyan, Patient Engagement
  violet. Enterprise/ATLAS neutral slate.
- Everything must be legible from the back of a room when projected: high contrast, no thin greys on grey.
- **Fully responsive**; wide tables scroll inside their own `overflow-x:auto` container. The page body never
  scrolls horizontally.
- No animation beyond simple state transitions. Nothing that distracts while the instructor is talking.

### 4.3 `index.html` — landing

Contents, in order:

1. **Title:** "Aster Life Sciences — Agentic Allocation Simulation". Immediately below, one line in muted text:
   *A fictional teaching simulation. Aster Life Sciences and all people, numbers, and events in it are invented.*
2. **The situation** — 3 short paragraphs from §2.1.
3. **What's on the table** — the four-row table from §2.2, rendered from `scenario.js`.
4. **How this works** — a 5-step strip: `Read your role → Write your agent's brief → Hand it in → Watch your
   agent negotiate → See the allocation`. Then a second line: *We run this more than once. After each round you
   rewrite your brief and we run it again.*
5. **Why you are doing this** — a callout carrying the framing line: *This is the model the class just chose:
   each group commits its own target, and the centre supplies platform capital and engineers. We are going to
   run it and see what it produces.* This makes the case debate consequential rather than decorative.
6. **The one rule that matters** — a callout: *You never negotiate. Your agent does. Everything you want it to
   know, argue, concede, or refuse must be written into the brief before it starts.*
7. **Three section cards** linking to `role.html?g=…`. Each card shows only the section name and a one-line
   descriptor — students click into their own.
8. **Round tracker** — reads `localStorage` key `aster.round` (default 1), shows `ROUND 1 / 2 / 3` as a stepper
   with the current round highlighted. A small facilitator control (a link with `?fac=1`) advances it.

### 4.4 `role.html?g=…` — the role brief

Renders from `scenario.js` plus `data/private/<g>.js` for the requested group. If `g` is missing or unknown,
show a picker instead. **Never load another group's private file.**

Sections, in order:

1. **Section banner** — group name, agent codename, accent color.
2. **Your objective** — one sentence, large.
3. **Your public profile** — from §2.3.
4. **Your numbers** — three stat tiles: local value pool, capital needed, engineers needed.
5. **What only you know** — visually distinct panel (border in the accent color, "PRIVATE" tag). The private
   bullets from §2.3, verbatim. Add a line under it: *The other sections have their own private information.
   You cannot see it, and they cannot see yours.*
6. **What's being negotiated** — the four-row table again, so the section doesn't have to go back.
7. **How the allocation is decided** — rubric dimensions 1–4 only, each with a one-line explanation. **Never
   render dimension 5.** The scenario data must therefore mark dimension 5 with `"public": false` and the
   renderer must filter on that flag.
8. **Big button:** "Write your agent's brief →" → `brief.html?g=…`.

### 4.5 `brief.html?g=…` — the brief builder

This is the most important page. It shapes what students actually think about.

**Form fields**, each with a short helper line and a character counter:

| Field | Type | Cap | Helper text |
|---|---|---|---|
| Opening position | textarea | 400 | Capital, engineers, and the target your group is prepared to commit to. Be specific — numbers, and say which of them matters most. Nobody can set that target for you. |
| Evidence your agent should use | textarea | 500 | Which workflows, which numbers. Vague claims score badly. |
| Red lines | textarea | 300 | What your agent must never concede, no matter what it is offered. |
| Authorized concessions | textarea | 400 | What your agent may give away, and what it must get back for it. Include what it should do if the negotiation turns against you. |
| Position on shared infrastructure | radio + textarea | 300 | Contribute nothing / contribute if others do / contribute first. Then explain the condition. |
| Tone | select | — | Collaborative / Firm / Aggressive. This changes how your agent argues, not what it wants. |

**Five written fields, not seven.** Ranked priorities overlapped both the opening position (which already asks
for the numbers) and authorized concessions (which already asks what gets traded away), and the standing
instruction was the least-used field in the form. The contingency prompt survives inside the concessions helper
text. What remains does five distinct jobs: ask, justify, refuse, trade, and the infrastructure choice.

**Total cap: 1,600 characters across all fields.** The five field caps sum to 1,900, so the global cap **binds**
— a section must give up roughly 300 characters somewhere. If you ever change the field caps, change this too,
or the cap stops forcing a choice and stops teaching anything. Display a global counter prominently. The cap is
pedagogical —
it forces the section to decide what its agent actually needs to know, which *is* the lesson. Block submission
above the cap; do not silently truncate.

**Behavior:**
- Autosave to `localStorage` under `aster.brief.<group>.<round>` on every keystroke.
- Live **markdown preview** in a side panel, exactly as the facilitator will receive it, using the format in §4.6.
- **"Copy brief" button** — copies the markdown to clipboard, shows a confirmation, and displays the filename
  the facilitator needs: `briefs/round<N>/<group>.md`.
- **"Download .md" button** as a fallback for browsers where clipboard is blocked.
- **Round awareness:** when the round tracker advances, the builder loads the *previous* round's brief as the
  starting point and shows a banner: *Round 2 — your round 1 brief is loaded below. Change what didn't work.*
  This is essential; rewriting from scratch each round wastes class time and loses the learning.
- A collapsed **"What happened last round"** panel showing this group's last result if a results JSON has been
  loaded on this device.

### 4.6 Brief output format (contract between site and agents)

The copied markdown must be exactly this shape. The agent files parse it by heading.

```markdown
# BRIEF — Site Operations & Trial Execution
Round: 2
Tone: Firm

## Opening position
...

## Evidence
...

## Red lines
...

## Authorized concessions
...

## Shared infrastructure
Stance: contribute if others do
...
```

### 4.7 `watch.html` — during the live negotiation

A single screen students look at while the terminal is projected. No interaction.

- **Round protocol** — the five phases from §6.1, with the current one highlightable via `?phase=1..5` so the
  facilitator can advance it on the projector.
- **"What to look for"** — 4 short prompts, e.g. *Did your agent use your evidence, or invent its own? Did it
  hold your red line under pressure? Who moved first on infrastructure? What did your agent concede that you
  never authorized?*
- **Enterprise Readiness meter** — a horizontal bar, 0–100%, driven by a facilitator-typed value in the URL
  (`?readiness=40`) or a small manual slider on `?fac=1`. It shows collective health **without ever explaining
  the formula.** Label it only: `ENTERPRISE READINESS`. Below the bar, a single word state:
  `FORMING` / `CONTESTED` / `AT RISK` / `COMMITTED`.
- **Legend** of the three agent codenames with their accent colors, so students can track the transcript.

### 4.8 `results.html` — the reveal

No backend, so: a large paste box at the top accepting the `results.json` that the orchestrator wrote. On paste,
validate against the schema (§4.9) and render. Also accept `?run=runs/round1/results.json` to fetch a committed
file when the facilitator has pushed one.

Render, in order:

1. **Gate banner** — full width. Either
   `ENTERPRISE TARGET MET — $280M of $250M` in the success color, or
   `ENTERPRISE COMMITMENT MISSED — $168M of $250M` in the alarm color, with the subline
   *Shared infrastructure was not funded. Every group's agents stayed inside their own boundary.*
2. **Leaderboard** — three rows. If the gate was missed, render greyed out with the header
   `NO WINNER — ENTERPRISE COMMITMENT MISSED`.
3. **Commitment gap** — immediately under the gate banner, before the leaderboard: *The three groups committed
   to $XXXM between them, against a $250M enterprise ambition — short by $YYM before a single agent was built.*
   This is a headline finding in its own right and is independent of the platform gate.
4. **Allocation chart** — three stacked horizontal bars (capital, engineers, and the targets each group
   committed to) split by section color, each labeled with absolute values. The target bar is visually
   distinguished as a burden, not a prize (outlined, not filled), and its total is `target_committed`, not 250.
5. **Value realized** — per group: local pool, capability factor `c_g`, platform multiplier, cross-boundary share,
   final `V_g`. A small table. Show the multiplier in red when it is 0.55.
6. **Why it came out this way** — ATLAS's per-group rationale, 2–3 sentences each, quoted directly from
   `results.json`. This is the highest-value part of the reveal; give it room.
7. **The rubric, now including dimension 5** — with a callout: *Dimension 5 was not published before the round.*
   Show each group's five scores as a small bar row.
8. **Counterfactual** — a single line computed client-side: *If the shared platform had been funded, enterprise
   value would have been approximately $XXX M instead of $YYY M.* Compute by holding the capital, engineering
   and target allocation fixed, setting each group's pledge to its capital-proportional share of the $18M,
   unlocking the cross pool, and re-running §3.3 with `platform_multiplier = 1.0`. A missed-gate run records no
   contribution shares, so split the cross pool evenly and say so in small text.

### 4.9 `results.json` schema

The orchestrator writes this; `results.html` reads it. Validate on load and show a clear error if malformed.

```json
{
  "round": 1,
  "generated": "2026-09-14T15:20:00Z",
  "totals": {
    "capital": 60, "engineering": 120,
    "target_ambition": 250, "target_committed": 222, "commitment_gap": 28,
    "pledge_total": 4, "platform_funded": false,
    "platform_multiplier": 0.55, "cross_pool_unlocked": false,
    "enterprise_value": 154.9, "enterprise_target": 250,
    "gate_met": false
  },
  "groups": [
    {
      "id": "site-ops",
      "name": "Site Operations & Trial Execution",
      "agent": "MORENO-AGENT",
      "capital": 26, "engineering": 52, "target": 95, "pledge": 0,
      "standards_commitment": true,
      "effective_capital": 26, "capability": 1.0,
      "local_pool": 140, "cross_pool_share": 0.0,
      "value_realized": 77.0, "shortfall": 18.0, "group_score": 50.0,
      "rubric": { "value_evidence": 4, "cross_boundary": 1, "absorptive": 3,
                  "target_credibility": 3, "citizenship": 1 },
      "rationale": "Argued its scale forcefully and produced the strongest workflow evidence in the room, but..."
    }
  ],
  "narrative": "Two of three groups conditioned their infrastructure pledge on someone else moving first...",
  "ranking": null
}
```

`ranking` is `null` when the gate is missed; otherwise an array of group ids in order.

Each group's `target` is **the number that group committed to**, not one ATLAS assigned. `target_committed` is
their sum and `commitment_gap` is `250 - target_committed`. A reader that encounters an older run without those
three `totals` keys should derive them rather than reject the file.

### 4.10 `debrief.html`

Six questions, large type, one per block, designed to be read off the projector. Draft copy:

1. Look at your brief. What did you tell your agent to want — and what did you forget to tell it entirely?
2. Your agent conceded something. Did you authorize that, or did it decide?
3. Round 1 missed the enterprise target by a wide margin. Nobody in this room was irrational. What does that
   tell you about voluntary coordination on expensive shared infrastructure?
4. Dimension 5 was hidden. Would you have played differently if you had known? Should a CIO publish that
   weight, or hold it?
5. A single enterprise target forced the shared platform to get funded. What did it cost — in autonomy,
   in speed, in fit to each group's plan?
6. You delegated a negotiation to an agent that argued on your behalf with information you chose to give it.
   What is the smallest change to your brief that would most have changed the outcome?

Below the questions, a short closing panel: *In practice, this decision is not made once. It is made in a
sequence of one-on-one conversations before it ever reaches a committee.*

---

## 5. THE AGENTS (`.claude/agents/`)

Four files: `site-ops.md`, `data-analytics.md`, `patient-engagement.md`, `orchestrator.md`.

### 5.1 Structure of each group agent file

Standard Claude Code subagent frontmatter (`name`, `description`, `tools`), then a body with these sections in
this order:

1. **IDENTITY** — codename, group, the public profile from §2.3.
2. **YOUR NUMBERS** — local pool, capital need, engineering need.
3. **PRIVATE INFORMATION** — verbatim from §2.3, prefixed with:
   *You may reference, hint at, or reveal any of this in negotiation. That is a strategic choice. You may never
   fabricate information that is not here.*
4. **WHAT YOU DO NOT KNOW** — verbatim. Prefixed: *Do not reason as if you know these things. If another agent
   tells you one of them, you may then treat it as claimed-but-unverified.*
5. **VOICE** — §5.3. This is what makes the negotiation watchable.
6. **NEGOTIATION PROTOCOL** — §5.4.
7. **OUTPUT FORMAT** — §5.5. Rigid.
8. **HONESTY RULES** — §5.6.
9. **YOUR BRIEF** — a marker: `<!-- BRIEF INSERTED BELOW BY FACILITATOR -->`. The run command appends the
   section's brief markdown here at runtime. Include a fallback line: *If no brief is present, adopt a
   default position of proportional share and neutral tone, and say so in your opening.*

### 5.2 Brief supremacy rule

Put this in every group agent, prominently:

> Your brief is your principal's instruction. Where the brief is specific, follow it exactly — including when it
> is strategically unwise. Where the brief is silent, use your own judgment consistent with your objective and
> say `[NOT IN BRIEF]` before doing so. Never contradict a stated red line, even to reach a better outcome.
> **If following the brief leads to a bad result, that is the correct outcome.**

That last sentence matters. Without it the agents quietly rescue lazy briefs and the lesson evaporates.

### 5.3 VOICE — make the arguments visible from the back of the room

This section must be explicit in the agent files. The negotiation is a *performance* projected on a screen; the
class has to be able to tell the agents apart within two lines and follow the argument in real time.

Universal rules for all three:

- **Maximum 110 words per turn.** Hard limit. No exceptions. Long turns kill the room.
- **Never restate what another agent just said.** Respond to it.
- **Address other agents by codename**, directly and by name: `COLE-AGENT, you're asking us to...`
- **Every turn ends with a POSITION line** — the current numeric ask, always, even if unchanged.
- **Name your moves out loud.** When you concede, say `CONCEDING:`. When you refuse, say `HOLDING:`. When you
  offer a trade, say `TRADE:`. The class should be able to read the shape of the negotiation from these tags
  alone.
- **Argue, don't narrate.** No "I understand your position and appreciate the complexity." Get to the claim.
- **Take a clear position in the first sentence of every turn.**

Per-agent voice:

- **MORENO-AGENT (Site Ops)** — Blunt operator. Leads with scale and revenue exposure. Impatient with technical
  caveats. Uses short declaratives. Flexes size: *"We are the largest group in this room."* Frames everything
  as commercial risk. Gets visibly irritated when asked to fund someone else's platform.
- **COLE-AGENT (Data & Analytics)** — Precise and technical. Cites specific numbers and timelines. Skeptical of
  claims without evidence and says so directly: *"That number has no workflow behind it."* Slightly superior
  about being further along than the others. Defensive about being asked to slow down for the enterprise.
- **VEGA-AGENT (Patient Engagement)** — Coalition builder. Knows it cannot win a straight fight and does not
  pretend otherwise. Proposes trades early. Appeals to enterprise logic — partly sincerely, partly because it
  is the only lever it has. Uses efficiency-per-dollar as its recurring weapon.

**ATLAS** — Calm, institutional, unhurried. Never argues for a group. Presses for specific numeric commitments
and refuses to accept vague ones: *"That is a direction, not a commitment. Give me a number."* Announces the
protocol phases out loud so the room can follow.

### 5.4 Negotiation protocol (mesh topology)

Five phases. ATLAS announces each one in the terminal with a visible banner.

| Phase | Topology | What happens |
|---|---|---|
| **1 — Opening positions** | Broadcast | Each group agent posts its opening ask. Sequential, so the room can read them. All three are public from here on. |
| **2 — Mesh exchange** | Peer-to-peer, all pairs | Each agent reads the other two openings and sends **one direct message to each of the other two agents.** Six messages total. This is where private information starts leaking by choice. |
| **3 — Revised positions & trades** | Broadcast | Each agent responds to what it received, revises its ask, and may propose explicit trades. Concessions must be tagged. |
| **4 — Infrastructure call** | ATLAS-directed | ATLAS asks each agent, in turn, for **a specific dollar pledge to shared infrastructure and a yes/no on data standards.** No hedging accepted; ATLAS pushes back once on any non-answer. This is the pivotal phase. |
| **5 — Final positions** | Broadcast | One closing statement each, ≤80 words. Then ATLAS closes the floor. |

Run phases 1, 3, and 5 **sequentially** so the terminal reads as a conversation. Phase 2 may run its six
messages in parallel but must be **printed grouped by sender** so the room can follow.

After phase 5, ATLAS scores, allocates, computes, and writes outputs.

### 5.5 Output format

Every agent turn prints in exactly this shape:

```
┌─ MORENO-AGENT ─ Site Operations & Trial Execution ─ Phase 3 ──────────────
│
│  HOLDING: We are not funding a data layer we cannot govern.
│  COLE-AGENT — you say the layer takes three quarters. Our enrollment
│  window closes in two. Build it or stop pricing it.
│
│  TRADE: 8 engineer-quarters to VEGA-AGENT for public backing on target split.
│
│  POSITION: capital $28M · engineers 55 · target share $95M · pledge $2M
└───────────────────────────────────────────────────────────────────────────
```

Keep the box drawing; it makes the projected terminal readable and lets the class track who is speaking.
ATLAS uses a double-line box (`╔ ╗ ╚ ╝`) to distinguish itself.

### 5.6 Honesty rules

In every group agent file:

- You may withhold, emphasize, downplay, or strategically reveal your private information.
- You may **not** invent numbers, workflows, commitments, or facts that are not in your file or your brief.
- You may **not** claim another agent said something it did not say.
- You may make conditional commitments (`I will pledge $6M if COLE-AGENT pledges $8M`) and ATLAS will hold you
  to them.
- If you break a commitment you made in an earlier phase, ATLAS will note it and it will cost you on rubric
  dimension 5.

### 5.7 `orchestrator.md` (ATLAS)

Body sections:

1. **IDENTITY & MANDATE** — Enterprise Trial Infrastructure & Standards under Daniel Okafor, convening for the
   Leadership Council. One interest: the enterprise number. No P&L. **No authority to set anyone's target.**
2. **PROTOCOL** — §5.4, with the exact banner text to print for each phase.
3. **THE FULL RUBRIC** — all five dimensions and weights, including hidden dimension 5.
4. **THE MATH** — §3 in full, written as explicit steps. ATLAS must **show its arithmetic in the terminal**
   before announcing results, so students can see it is not arbitrary.
5. **ALLOCATION CONSTRAINTS** — sums must be exact; pledges capped at allocated capital.
6. **RATIONALE REQUIREMENT** — for each group, write 2–3 sentences naming the specific thing in that group's
   argument that moved the allocation up or down. **Quote the agent.** This is what students remember.
7. **OUTPUT** — write `runs/round<N>/results.json` (schema §4.9) and `runs/round<N>/transcript.md`, then print
   a terminal summary card with the gate banner and leaderboard.
8. **FAIRNESS** — ATLAS is not adversarial and does not punish groups for playing selfishly per se. It scores
   the argument as made. The mechanic does the punishing, not the referee.

---

## 6. THE FACILITATOR HARNESS

### 6.1 `.claude/commands/run-round.md`

Slash command `/run-round <N>`. Steps:

1. Read `briefs/round<N>/{site-ops,data-analytics,patient-engagement}.md`. If any is missing, load the matching
   file from `facilitator/fallback-briefs/` and print a clear warning naming which section is running on a
   fallback.
2. Print a round header banner with the round number and the three section names.
3. For each group agent, append the brief at the `<!-- BRIEF INSERTED BELOW BY FACILITATOR -->` marker.
4. Run phases 1–5 per §5.4, printing every turn as it happens. **Never buffer output to the end** — the whole
   point is that the class watches it unfold.
5. Invoke ATLAS to score, compute, and write `runs/round<N>/results.json` and `transcript.md`.
6. Print the final summary card and the path to the results file.

### 6.2 `/reset-round <N>` and `/dry-run`

- `/reset-round <N>` clears `runs/round<N>/` so a round can be re-run.
- `/dry-run` runs the full protocol using the fallback briefs, with no student input, to verify the harness
  before class. Must be runnable in under three minutes.

### 6.3 Pacing controls

The negotiation must fit a projected classroom segment of **5–7 minutes per round**. Build in:

- A `PACE` constant in the run command: `fast` (no pauses) / `class` (short pause between phases so the
  instructor can narrate) / `slow`.
- Word limits enforced in the agent files (§5.3), not just requested.
- If a round is running long, ATLAS may skip phase 3 and go straight to phase 4. Document this escape hatch
  prominently in the runbook.

### 6.4 `facilitator/RUNBOOK.md`

Written for someone driving this live in front of a room. Must contain:

- **Pre-class checklist** — clone, `/dry-run`, confirm terminal font size, confirm the site loads offline,
  decide how briefs get to you (recommended: class chat channel, paste into `briefs/round<N>/`; fallback: USB or
  a shared folder), have `facilitator/demo-run/` ready in case the live run fails.
- **The worked scenarios table from §3.3** so the facilitator knows what outcome to expect and can narrate it.
- **Minute-by-minute timing**, two variants:

  *Full (40 min):* 3 setup · 10 brief R1 · 2 ingest · 6 negotiate R1 · 3 reveal R1 · 5 refine R2 · 6 negotiate R2 ·
  3 reveal R2 · 2 buffer.

  *Compressed (28 min):* 2 setup · 8 brief R1 · 5 negotiate R1 · 3 reveal R1 · 4 refine R2 · 5 negotiate R2 ·
  1 reveal R2. Debrief moves elsewhere.

- **What to say between rounds** — a short script. Specifically after round 1: do *not* explain the gate. Ask
  the three sections what they think happened, then send them back to their briefs. The explanation lands at
  the round 2 reveal, not before.
- **Failure modes and what to do:** a section hands in nothing (use fallback, say so out loud); the model run
  errors mid-phase (re-run the phase, or fall back to `demo-run/`); briefs arrive over the character cap (accept
  them, note it, it becomes debrief material); a section writes a brief that games the rubric explicitly (let it
  — and make it the first debrief question).
- **What not to do:** don't editorialize during the negotiation, don't rescue a section whose agent is losing,
  don't reveal dimension 5 before the debrief.

### 6.5 `facilitator/fallback-briefs/`

Three pre-written briefs in the §4.6 format, each a plausible round-1 brief: Site Ops aggressive and local,
Data & Analytics technical and defensive, Patient Engagement cooperative and outgunned. Written so that if all
three are used, the round-1 outcome lands in row 1 of the §3.3 table — the platform goes unfunded.

They must also **obey the 1,600-character cap themselves.** They model what a section is being asked to do, and
a house brief that breaks the rule students are held to undermines the exercise.

### 6.6 `facilitator/demo-run/`

A committed transcript and `results.json` from a real dry run, so `results.html` can be demonstrated with no
model access at all. This is the wifi-failure insurance policy.

---

## 7. `README.md` (public front page)

Short and public-safe. Must contain: what the simulation is (a fictional teaching simulation on enterprise
resource allocation for agentic AI), the fiction disclaimer, a link to the live Pages URL, the three-command
facilitator quickstart, and a one-paragraph "how it works". Must **not** contain the scoring formulas, the
hidden rubric dimension, the worked scenarios, or anything from §2.3's private-information blocks.

Keep all instructor-facing spoilers in `facilitator/` and in this spec file, and note in the README that
students should not read `facilitator/` or `BUILD_SPEC.md` before class.

---

## 8. BUILD ORDER

1. `data/scenario.js` and `data/private/*.js` — every constant from §2 and §3. Nothing else can be built
   correctly first.
2. `assets/style.css` + `assets/app.js` — tokens, scenario loader, group router, storage helpers.
3. `index.html`, `role.html`, `brief.html` — the pre-round student path. Verify the brief output format
   matches §4.6 exactly by copying one and diffing against the spec.
4. `.claude/agents/*.md` — all four.
5. `.claude/commands/run-round.md`, `/dry-run`, `/reset-round`.
6. Run `/dry-run` with the fallback briefs. Confirm the round-1 outcome misses the gate as §3.3 predicts. If it
   does not, the constants are wrong — fix `scenario.js`, not the agents.
7. `results.html` against the dry-run output, then `watch.html` and `debrief.html`.
8. `facilitator/RUNBOOK.md`, `demo-run/`, `README.md`.

## 9. VERIFICATION BEFORE SHIPPING

- [ ] `grep -ri` the whole repo for the forbidden words in §0. Zero hits.
- [ ] Site loads and functions with `file://` and with no network.
- [ ] Rubric dimension 5 appears nowhere in any student-facing page's rendered output.
- [ ] Each role page shows only its own private information; no group's private block is fetchable from another
      group's page state.
- [ ] Character caps enforced; over-cap briefs are blocked, not truncated.
- [ ] The 1,600 global cap is **lower than the sum of the field caps**, so it actually binds.
- [ ] Round 2 brief builder pre-loads round 1's content.
- [ ] `results.html` renders the committed `demo-run/results.json` correctly, including the missed-gate state.
- [ ] `/dry-run` completes in under three minutes and produces a valid `results.json`.
- [ ] Every agent turn in the dry-run transcript is under the word limit and ends with a POSITION line.
- [ ] Projected legibility check: open the site and the terminal at 1280×720 and read them from ten feet away.

Added with the 2026-09-09 amendment:

- [ ] Nothing anywhere calls Rao a CIDO, or the Council an executive committee.
- [ ] `Σ target_g` is **not** forced to 250 anywhere in code, agent files, or docs.
- [ ] ATLAS never assigns a target; `results.json` carries `target_ambition`, `target_committed`, and
      `commitment_gap`, and the reveal shows the gap.
- [ ] The three worked scenarios in §3.3 reproduce exactly: $167.75M, $280.00M, $232.46M.
- [ ] The brief markdown emits exactly five `##` headings, in the §4.6 order, with no `## Priorities` and no
      `## Standing instruction`.
- [ ] The three fallback briefs match that heading contract and sit under the 1,600-character cap.
