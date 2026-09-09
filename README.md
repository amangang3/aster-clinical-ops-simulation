# Aster Clinical Operations — Agentic Allocation Simulation

A fictional teaching simulation about enterprise resource allocation for agentic AI.

**Aster Life Sciences is invented.** Every person, group, number, and event in this repository is fictional and
exists only to make the exercise work. Nothing here describes, is drawn from, or is intended to resemble any
real organization.

**▶ Live site: https://amangang3.github.io/aster-clinical-ops-simulation/**

---

## What it is

Three groups inside a fictional clinical operations center have to divide one pool of platform capital, one
pool of scarce engineers, and one enterprise value target that somebody has to accept and be accountable for.
There is also a shared data platform that no single group can justify funding alone — and that most of the
value turns out to depend on.

Students do not negotiate. **They write a brief, and an AI agent negotiates on their behalf.** Everything they
want their agent to argue, concede, or refuse has to be written down before it starts. Then they watch it
happen and find out what they forgot to say.

It runs in about 30–40 minutes, over two or three rounds. After each round students rewrite their brief and
it runs again.

## How it works

Each section opens its own role page, which gives it public numbers and some private information the other
sections cannot see. It writes its agent's brief in the browser — opening position, evidence, red lines,
authorized concessions, and a stance on the shared platform — inside a 1,600-character cap that forces it to
decide what the agent actually needs to know.

The facilitator collects the three briefs and runs the negotiation locally in Claude Code. Four agents take
part: one for each section, plus an orchestrator that runs a five-phase protocol, presses each group for a
specific commitment, applies an allocation rubric, and computes the result. The whole thing is projected so
the class watches its own agents argue. Then the allocation is revealed and everyone finds out what their
brief actually bought them.

## Facilitator quickstart

```bash
git clone https://github.com/amangang3/aster-clinical-ops-simulation.git
cd aster-clinical-ops-simulation
claude          # then, inside Claude Code:
```

| Command | What it does |
|---|---|
| `/dry-run` | Rehearse the whole protocol on the built-in briefs. Under three minutes. Do this before class. |
| `/run-round 1` | Run a live round from the briefs in `briefs/round1/`. |
| `/reset-round 1` | Clear a round's output so it can be re-run. |

Full instructions, timings, and failure modes are in [`facilitator/RUNBOOK.md`](facilitator/RUNBOOK.md).

## Running the site

There is no build step, no package manager, no backend, and no API key. It is plain HTML, CSS, and vanilla JS.

- **Hosted:** GitHub Pages serves it from the repository root.
- **Locally:** open `index.html` directly. It works from `file://` with no network.
- **Locally, served** (only needed if you want `results.html?run=…` to fetch a committed run):
  `python3 -m http.server` then open `http://localhost:8000`.

The public site never calls a model. All model work happens in the facilitator's local Claude Code session.
Nothing students type leaves their browser — briefs are held in memory and `localStorage`, and are handed in
by copy and paste.

## Layout

```
index.html          landing, what's on the table, round tracker
role.html?g=…       role brief — public profile, numbers, private information
brief.html?g=…      the brief builder
watch.html          what to watch while the negotiation is projected
results.html        paste results.json → the reveal
debrief.html        discussion questions
assets/             one stylesheet, one script
data/scenario.js    every constant — single source of truth
data/private/       per-group private information, loaded only by that group's role page
.claude/agents/     the four negotiating agents
.claude/commands/   /run-round, /dry-run, /reset-round
facilitator/        runbook, fallback briefs, and a committed example run
```

## A note to students

Please don't read `facilitator/` or `BUILD_SPEC.md` before class. They contain the scoring formulas, the
expected outcomes, and one thing you are deliberately not told. Reading them first doesn't help you win — the
mechanic isn't the point — but it does spoil the part of the session that's worth being surprised by.

## License

ISC.
