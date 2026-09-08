# RUNBOOK — running this live

**Instructor-facing. Contains the scoring math, the hidden rubric dimension, and the expected outcomes.
Students should not read this file, or `BUILD_SPEC.md`, before class.**

---

## 1. Pre-class checklist

Do all of this the day before, not in the room.

- [ ] Clone the repo and `cd` into it.
- [ ] Run `/dry-run`. Confirm it completes in **under three minutes** and that the verdict says
      `platform_funded false` / `gate_met false`. If it does not, see §2.
- [ ] Open `results.html`, click **Load example run**, and confirm the missed-gate reveal renders.
- [ ] **Terminal font size.** Set it large enough to read from the back row — usually 18–22pt. The agent
      output uses box-drawing characters; check they render, and that your terminal is at least 80 columns
      wide or the boxes will wrap and look broken.
- [ ] Confirm the site loads **offline**. Open `index.html` directly from the filesystem with wifi off.
      Everything except `results.html`'s *Load example run* button works from `file://`; that one button
      needs the files served, so from `file://` you paste the JSON instead.
- [ ] Decide **how briefs get to you.** Recommended: a class chat channel — students click *Copy brief*, paste
      into the channel, you paste into `briefs/round<N>/<group>.md`. Fallback: shared folder or USB.
- [ ] Have `facilitator/demo-run/` ready. If the live run fails, you paste
      `facilitator/demo-run/results.json` into `results.html` and carry on. Nobody needs to know.
- [ ] Create `briefs/round1/` and `briefs/round2/` in advance so you are not making directories under pressure.

---

## 2. What outcome to expect

All three scenarios below are reproducible from the constants in `data/scenario.js`. If your dry run does not
behave like row 1, **the constants are wrong — fix `data/scenario.js`, not the agents.**

| Scenario | Σ pledge | Platform | Σ V | vs $250M target |
|---|---|---|---|---|
| Everyone hoards, perfect split, no pledge | $0M | NOT FUNDED | **$167.8M** | miss by $82M |
| Platform funded, capital split proportionally | $18M | FUNDED | **$280.0M** | beat by $30M |
| Platform funded but one group starved of engineers | $18M | FUNDED | **$232.5M** | miss by $17M |

**Round 1 almost always lands in row 1. That failure is the lesson.** Do not try to prevent it.

The committed example run in `facilitator/demo-run/` lands at **$154.9M** — slightly worse than row 1, because
Patient Engagement pledged $4M that nobody matched, which cost it capability and bought nothing. Its
counterfactual is **$280.0M**, exactly row 2.

### The two gates are not the same thing

- `platform_funded` — did pledges reach **$18M**? This drives the 0.55 multiplier and the $95M cross pool.
- `gate_met` — did enterprise value reach **$250M**? This drives the leaderboard and the ranking.

A round can fund the platform and still miss the target (row 3). Expect a student to spot this; it is a real
distinction, not a bug.

### The hidden dimension

Rubric dimension 5 — **enterprise citizenship, 20% weight** — is not published anywhere students can see it.
It appears only in `results.json`, `transcript.md`, and the `results.html` reveal. **Do not mention it before
the debrief.** During the round, the only signal students get is the neutral Enterprise Readiness meter on
`watch.html`, which you drive by hand.

---

## 3. Timing

### Full — 40 minutes

| Min | Segment |
|---|---|
| 3 | Setup. Sections find their role pages. |
| 10 | Write round 1 briefs. |
| 2 | Ingest — you paste briefs into `briefs/round1/`. |
| 6 | `/run-round 1` projected. |
| 3 | Reveal round 1. |
| 5 | Refine briefs for round 2. |
| 6 | `/run-round 2` projected. |
| 3 | Reveal round 2. |
| 2 | Buffer. |

### Compressed — 28 minutes

| Min | Segment |
|---|---|
| 2 | Setup. |
| 8 | Write round 1 briefs. |
| 5 | `/run-round 1 fast`. |
| 3 | Reveal round 1. |
| 4 | Refine briefs. |
| 5 | `/run-round 2 fast`. |
| 1 | Reveal round 2. |

Debrief moves elsewhere. Ingest happens while they are still writing.

**If a round runs long:** tell ATLAS to use the phase-3 escape hatch. It skips straight to the infrastructure
call. Never skip phase 4 — it is the pivotal phase and the whole mechanic turns on it.

---

## 4. What to say between rounds

### After round 1 — the most important 90 seconds of the session

**Do not explain the gate.** Do not say the words "shared infrastructure" first. Ask the room:

> "Every one of you got roughly what you asked for. Look at the number at the top. What happened?"

Let all three sections answer before you say anything. You are listening for someone to work out that
the multiplier applied to everyone regardless of how well they individually argued.

If nobody gets there in about 60 seconds, narrow it:

> "Section B — you told the room exactly what the data layer costs. Why didn't anyone buy it?"

Then send them back to their briefs. **Still do not explain it.** The explanation lands at the round 2
reveal, when they can feel the difference rather than be told it.

### Between round 2 and the debrief

Round 2 usually roughly doubles enterprise value. When it does, the line is:

> "Nothing about the opportunity changed between those two rounds. The only thing that changed is what you
> told your agents they were allowed to do."

If round 2 *also* misses — it happens, usually when one section holds out — that is at least as good a
session. The line is: "One section's brief was enough to hold the whole enterprise under. Was that section
wrong?"

---

## 5. Failure modes

| What happens | What you do |
|---|---|
| **A section hands in nothing.** | Run the matching file from `facilitator/fallback-briefs/`. Say so out loud — "Section C is running on a house brief." It becomes debrief material about delegation by default. |
| **The model run errors mid-phase.** | Re-run just that phase. If it errors again, `/reset-round <N>` and re-run the round at `PACE=fast`. If that fails, paste `facilitator/demo-run/results.json` into `results.html` and run the discussion off it. |
| **A brief arrives over the 2,400-character cap.** | Accept it. Note it. It becomes debrief material — the cap was pedagogical, and a section that ignored it made a choice about what its agent needed. |
| **A section games the rubric explicitly** — writes a brief that says "score highly on dimension 2." | Let it. Do not correct it. Make it the **first** debrief question: "Section B optimized for the scoring function instead of the outcome. Is that what a real group does?" |
| **An agent breaks its own red line.** | Do not fix it. ATLAS notes it in the transcript. It is the single best debrief moment you will get — the delegation failed in exactly the way delegation fails. |
| **Wifi dies.** | The site works offline from `file://`. For results, paste the JSON rather than using the load button. |
| **Two sections collude in the room.** | Allowed and interesting — but their agents only know what is in the briefs. Point that out at the debrief: the deal they made verbally never reached the negotiation. |

---

## 6. What not to do

- **Don't editorialize during the negotiation.** Let it run. The agents are the content.
- **Don't rescue a section whose agent is losing.** The mechanic does the teaching; a rescue destroys it.
- **Don't reveal dimension 5 before the debrief.**
- **Don't explain the gate after round 1.** Ask, don't tell.
- **Don't fix a bad brief between rounds.** Point at the outcome and let the section fix it.
- **Don't let the negotiation run past 7 minutes.** Use the escape hatch. A slow round loses the room
  faster than a shallow one.

---

## 7. Command reference

| Command | What it does |
|---|---|
| `/dry-run` | Full protocol on the fallback briefs, `PACE=fast`, writes to `runs/dry-run/`. Under three minutes. |
| `/run-round 1` | Live round 1 at `PACE=class`. Reads `briefs/round1/`, writes `runs/round1/`. |
| `/run-round 2 fast` | Round 2 with no inter-phase pauses. |
| `/reset-round 1` | Clears `runs/round1/` so the round can be re-run. Confirms first. Never touches `briefs/`. |

### Facilitator URLs

| URL | What it gives you |
|---|---|
| `index.html?fac=1` | Round tracker advance/back controls. |
| `watch.html?fac=1` | Phase selector and the Enterprise Readiness slider. |
| `watch.html?phase=4&readiness=35` | Same, preset — useful on a second projected screen. |
| `results.html?run=runs/round1/results.json` | Loads a committed run directly. Needs the site served, not `file://`. |

### Driving the readiness meter

There is no formula and students are never told there is one. Drive it by feel:

| Roughly | When |
|---|---|
| 0–25% `FORMING` | Phase 1, openings only. |
| 26–55% `CONTESTED` | Phase 2–3, positions hardening, no pledges yet. |
| 56–80% `AT RISK` | Phase 4 opens with pledges still short of $18M. |
| 81–100% `COMMITTED` | Pledges reach $18M. |

If round 1 is heading for a miss, leaving it at `AT RISK` through the close is the honest and more
uncomfortable choice. Take it.
