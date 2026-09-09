# RUNBOOK — running this live

**Instructor-facing. Contains the scoring math, the hidden rubric dimension, and the expected outcomes.
Students should not read this file, or `BUILD_SPEC.md`, before class.**

---

## 1. What you are trying to teach

The simulation exists to make students *feel* an answer they can already argue for. Everything below is
reachable from what happens on screen — none of it requires you to assert it.

### If you land only one thing

> **Every group behaved rationally, and the enterprise still lost. Voluntary contribution does not fund
> expensive shared infrastructure — not because people are selfish, but because no single P&L can justify
> paying for something whose value lands mostly on someone else's.**

That is the case decision in one sentence: it is *why* a CIO pushes for a single enterprise target instead of
letting each group set its own.

### The three families

**A · Coordination and the enterprise target** — the core case argument.

| | Learning | Where it shows up |
|---|---|---|
| **A1** | Expensive shared infrastructure does not get funded voluntarily, even when every party knows it is valuable, knows what it costs, and is behaving rationally. | Round 1: pledges land far short of $18M. |
| **A2** | The largest value pools sit *across* boundaries. Local optimization captures the small pools and forfeits the large one. A group can win its negotiation and lose its outcome. | The $95M cross-boundary pool never opens. |
| **A3** | A single enterprise target is a **coordination device, not a control device.** Its job is to make the shared platform fundable — not to centralize planning. | Round 2: same opportunity, roughly double the value. |
| **A4** | That target has a real price: autonomy, speed, and fit to each group's own plan. It is a trade, not a free win. | Funding the platform visibly costs every group capability (`c` drops). |
| **A5** | **Bottom-up targets do not add up to an enterprise ambition.** Left to choose, each P&L owner commits what it is safe to carry, and the sum lands short before any execution risk is priced in. | The commitment gap: ~$222M committed against a $250M ambition. |

**B · Delegation** — the agentic AI layer, and the part students will remember longest.

| | Learning | Where it shows up |
|---|---|---|
| **B1** | An agent does what your brief says, **including when the brief is wrong.** It will not rescue you. | Agents hold bad red lines to a bad outcome. |
| **B2** | **Omission is an instruction.** What you left out did not read as "use your judgment" — it read as "this doesn't matter." | Concessions nobody authorized; `[NOT IN BRIEF]` tags. |
| **B3** | You cannot delegate judgment you never articulated. Stated red lines get held; unstated preferences get traded away. | Compare any two sections' briefs against their transcripts. |
| **B4** | What you authorize your agent to *reveal* determines which coalitions are even possible. | Section B's $18M disclosure; Section C's coalition attempts. |

**C · Mechanism design** — the sharpest 10 minutes if you have them.

| | Learning | Where it shows up |
|---|---|---|
| **C1** | What gets scored gets optimized. Publishing a rubric buys you compliance; it does not buy you commitment. | Sections writing briefs to dimensions 1–4. |
| **C2** | A hidden weight changes behavior differently from a published one — and a leader has to choose which distortion they want. | Dimension 5 revealed at the debrief. |

### What this is *not* trying to teach

Not "AI negotiates well." Not "centralization beats autonomy." Not "cooperation is good." If the room lands on
any of those, you have lost the session — see §5.5 for how to steer back.

---

## 2. Pre-class checklist

Do all of this the day before, not in the room.

- [ ] Clone the repo and `cd` into it. Launch Claude Code **from the repo folder** so `.claude/` loads.
- [ ] Run `/dry-run`. Confirm it completes in **under three minutes** and that the verdict says
      `platform_funded false` / `gate_met false`. If it does not, see §3.
- [ ] Open `results.html`, click **Load example run**, and confirm the missed-gate reveal renders.
- [ ] **Terminal font size.** Set it large enough to read from the back row — usually 18–22pt. The agent
      output uses box-drawing characters; check they render, and that your terminal is at least 80 columns
      wide or the boxes will wrap and look broken.
- [ ] Confirm the site loads **offline**. Open `index.html` directly from the filesystem with wifi off.
- [ ] Decide **how briefs get to you.** Recommended: a class chat channel — students click *Copy brief*, paste
      into the channel, you paste into `briefs/round<N>/<group>.md`. Fallback: shared folder or USB.
- [ ] Have `facilitator/demo-run/` ready. If the live run fails, paste
      `facilitator/demo-run/results.json` into `results.html` and carry on. Nobody needs to know.
- [ ] Create `briefs/round1/` and `briefs/round2/` in advance.
- [ ] Read §5. It is the part of this that is actually hard.

---

## 3. What outcome to expect

All three scenarios below are reproducible from the constants in `data/scenario.js`. If your dry run does not
behave like row 1, **the constants are wrong — fix `data/scenario.js`, not the agents.**

| Scenario | Σ pledge | Platform | Σ V | vs $250M target |
|---|---|---|---|---|
| Everyone hoards, perfect split, no pledge | $0M | NOT FUNDED | **$167.8M** | miss by $82M |
| Platform funded, capital split proportionally | $18M | FUNDED | **$280.0M** | beat by $30M |
| Platform funded but one group starved of engineers | $18M | FUNDED | **$232.5M** | miss by $17M |

**Round 1 almost always lands in row 1. That failure is the lesson.** Do not try to prevent it.

### The commitment gap — the second finding

**Nobody sets the groups' targets.** Rao has asked the Council for $250M, but only a P&L owner can commit a
number into a plan, so each group commits its own and ATLAS records it. Expect the three to sum to somewhere
around **$200M–$230M** — short of the ambition **before any agent is built and before the platform gate even
applies.**

This is a separate finding from the gate, and it is the one that maps most directly onto the case. Watch for
the group that commits the smallest share of its own stated pool; in the example run Site Operations commits
$95M against a $140M pool (68%) and still finishes top of the board. That is the cleanest illustration of
A5 you will get.

The committed example run in `facilitator/demo-run/` lands at **$154.9M** — slightly worse than row 1, because
Patient Engagement pledged $4M that nobody matched, which cost it capability and bought nothing. Its
counterfactual is **$280.0M**, exactly row 2.

### The two gates are not the same thing

- `platform_funded` — did pledges reach **$18M**? Drives the 0.55 multiplier and the $95M cross pool.
- `gate_met` — did enterprise value reach **$250M**? Drives the leaderboard and the ranking.

A round can fund the platform and still miss the target (row 3). Expect a student to spot this; it is a real
distinction, not a bug.

### The hidden dimension

Rubric dimension 5 — **enterprise citizenship, 20% weight** — is not published anywhere students can see it.
It appears only in `results.json`, `transcript.md`, and the `results.html` reveal. **Do not mention it before
the debrief.** During the round the only signal students get is the neutral Enterprise Readiness meter on
`watch.html`, which you drive by hand.

---

## 4. Timing

### Full — 40 minutes

| Min | Segment |
|---|---|
| 3 | Setup. Sections find their role pages. |
| 10 | Write round 1 briefs. |
| 2 | Ingest — you paste briefs into `briefs/round1/`. |
| 6 | `/run-round 1` projected. |
| 3 | Reveal round 1 **+ the 90-second hinge (§5.2)**. |
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
| 3 | Reveal round 1 + hinge. |
| 4 | Refine briefs. |
| 5 | `/run-round 2 fast`. |
| 1 | Reveal round 2. |

Debrief moves elsewhere. Ingest happens while they are still writing.

**If a round runs long:** tell ATLAS to use the phase-3 escape hatch. Never skip phase 4 — the mechanic turns
on it.

---

## 5. Facilitating the discussion

### 5.1 The three moments

| Moment | Length | Job |
|---|---|---|
| **After round 1** | 90 seconds | Create the question. **Do not answer it.** |
| **After round 2** | 2–3 min | Let them feel the delta. Name it. |
| **Full debrief** | 10–20 min | Convert the experience into the case argument. |

The single most common facilitation error is explaining the gate after round 1. Everything the session is
worth depends on them carrying an unanswered question into their round 2 rewrite.

### 5.2 After round 1 — the hinge

**Do not explain the gate. Do not say "shared infrastructure" first.** Open with:

> **"Every one of you got roughly what you asked for. Look at the number at the top. What happened?"**

Let all three sections answer before you say anything. Silence is fine. You are listening for someone to
notice that the multiplier hit everyone regardless of how well they individually argued.

**Escalating probes**, if it doesn't land — use in order, stop as soon as it does:

1. > "Nobody here made a mistake inside their own group. Agreed? So where did the money go?"
2. > "Section B — you told the room exactly what the layer costs, down to the quarter. Why did nobody buy it?"
3. > "Section C — you put $4M on the table and you finished last. Was that a mistake?"
4. > *(point at the counterfactual line)* "That number is what the same allocation would have produced. Same
   >  capital, same engineers, same targets. What is the difference between those two worlds?"

**Then stop.** Do not close the loop. Send them back to their briefs with:

> "Don't rewrite it from scratch. Change the smallest thing you think would matter, and we'll run it again."

**If a section demands to know the answer:** "You'll have it in about eight minutes, and you'll have it from
your own transcript rather than from me."

### 5.3 After round 2

**If round 2 clears the gate** (the usual case):

> **"Nothing about the opportunity changed between those two rounds. The same $250M was available in round 1.
> The only thing that changed is what you told your agents they were allowed to do."**

Then immediately, before it feels like a happy ending:

> "So what did it cost you? Look at your capability number. It went *down*. Who paid, and what did they give
> up to pay?"

That question is learning **A4** and it is the one that separates a good discussion from a naive one. Do not
skip it. The room should leave understanding that the enterprise target is a **trade**, not a free win.

**If round 2 also misses** — usually one section holding out — this is at least as good a session:

> "One section's brief was enough to hold the entire enterprise under. Was that section wrong?"

Then: "What would the CIO have to be able to do to stop that from being possible?" That goes straight to
mandate versus persuasion, which is the case decision.

**If round 2 massively overshoots** because everyone cooperated: "Now you've all pledged. Whose plan got
wrecked to make that happen? Would you sign up to that in your own group's planning cycle?"

### 5.4 Full debrief — question bank

The six questions on `debrief.html` are the spine. Below are follow-ups by theme, with what you are listening
for. **Pick 6–8 total.** Do not run the whole bank.

#### A · The coordination failure → learnings A1, A2

| Ask | Listening for |
|---|---|
| "Which section was wrong? Name one." | That the honest answer is *none*. This is the hinge of the whole case. |
| "How much would the platform have had to cost before one group would fund it alone?" | Dawning recognition that there is no such number — the benefit lands elsewhere. |
| "If we ran this ten more times with ten different rooms, how many times does it get funded voluntarily?" | Near zero. Push anyone who says "most" to say what would make it so. |
| "The cross-boundary pool was $95M and belonged to nobody. Whose job was it?" | Nobody's — which is exactly the problem an enterprise target solves. |
| "What is the smallest change to the **rules** — not to your briefs — that funds it?" | Mandate, central budget, matched pledges, changing who holds the money. This is the CIO's actual toolkit. |
| "Section A: you knew 40% of your pool needed that layer. Did you say so out loud? Why not?" | Strategic silence as individually rational, collectively costly. |

#### B · Local versus enterprise optimization → A2, A3

| Ask | Listening for |
|---|---|
| "Section A — biggest pool, most capital, most engineers. Did you win?" | The gap between winning the argument and winning the outcome. |
| "Your agent argued well and your result was bad. Are those two things connected?" | Yes — arguing well *for a local optimum* is precisely what produced it. |
| "Who captured value they created? Who captured value someone else created?" | Sets up why cross-boundary value has no natural owner. |
| "What is the real-world 0.55? What actually degrades when agents can't cross a boundary?" | Duplicated data work, humans re-keying between systems, agents that can't see state. Make them name one from their own org. |

#### C · Delegation → B1, B2, B3

| Ask | Listening for |
|---|---|
| "Read your brief again. What did your agent do that you never authorized?" | The specific line. Make them read it aloud. |
| "What did you leave out — and did that omission read as *use your judgment* or as *this doesn't matter*?" | **B2.** The best single question in the bank. |
| "Your agent held every red line you wrote. Did it hold anything you didn't write down?" | No. Never. That is the lesson. |
| "You had 1,600 characters. How many did you spend on what you wanted versus what you'd concede?" | Most rooms spend almost nothing on concessions and are then surprised by what got conceded. |
| "Did anyone tell their agent what to do if things went badly? Or only what to want?" | Almost nobody plans for the losing case — the brief form no longer prompts for it, so this is now a pure omission test. |
| "One sentence added to your round-1 brief. What is it?" | This is `debrief.html` Q6 and the best closing question you have. |
| "You chose your own target. Would you have scored better by promising less?" | **Yes — and they should feel it.** Then: "Is that how targets work in your company? What stops it?" This is A5 and it is the sharpest new question in the bank. |
| "Who committed the smallest share of their own pool? Did they win?" | Usually Site Operations, and usually yes. |

#### D · Information and coalitions → B4

| Ask | Listening for |
|---|---|
| "Section B — you revealed the $18M. Why? What did you get for it?" | Often nothing. Disclosure without a trade attached. |
| "Which single piece of private information, revealed one phase earlier, would have changed the most?" | Usually Section C's dependency, or Section A's 40%. |
| "Section C tried to build a coalition and it didn't hold. What was missing?" | Enforcement. A pledge with nothing behind it is a wish. |
| "Did any of you tell your agent what it was *allowed to reveal*? Or only what to demand?" | Almost nobody does. |

#### E · The hidden dimension → C1, C2

Reveal dimension 5 first — the `results.html` rubric block does it for you.

| Ask | Listening for |
|---|---|
| "20% of the weight, and you weren't told. Would you have played differently?" | Almost always yes — which is the point. |
| "Should a CIO publish that weight?" | Push both ways. *Publish* → you get compliance, gaming, box-ticking. *Hide* → you get resentment and it only works once. |
| "You were told dimensions 1 through 4. Did you write your brief to the rubric, or to the outcome?" | The rubric. Every time. **C1** lands itself. |
| "What would you have gamed if you'd known?" | Cheap pledges timed for credit rather than for effect. |

#### F · Back to the case

Close here. These are the questions that transfer.

| Ask | Listening for |
|---|---|
| "A single enterprise target forced the platform to get funded. What did it cost — in autonomy, in speed, in fit?" | **A4.** Do not let the room leave thinking centralization is free. |
| "Who should hold the platform budget — the CIO, or the groups?" | The real trade-off. There is no clean answer and they should feel that. |
| "In your own organization: who is Section B? Who is Section C?" | Makes it concrete. Section C — small, dependent, no engineers — is usually the one nobody was defending. |
| "You delegated a negotiation to an agent that argued with the information you chose to give it. What does that tell you about how you'd deploy agents for real?" | The bridge from the exercise to their actual jobs. |

### 5.5 Common wrong turns, and how to redirect

| They say | Why it's wrong | Redirect |
|---|---|---|
| **"The game was rigged / the rules were unfair."** | The needs sum exactly to supply. A cooperative split with a funded platform gives everyone full capability and beats the target by $30M. It was always reachable. | Show the counterfactual line. "Same allocation. Same people. One difference." |
| **"It's Section A's fault, they were selfish."** | A followed a brief written by a room of their peers with A's information. | "Everyone in Section A's seat had Section A's information. Would your brief have been different? Be honest." |
| **"We just needed to talk to each other."** | They *could* — and in real organizations everyone does talk, and the platform still doesn't get funded. | "You did talk. What happened to the deal you made? It never reached the briefs. Why not?" |
| **"The AI made a mistake."** | The agents held every red line they were given. | Pull up a red line in the transcript and the brief line that produced it. "That was you." |
| **"Cooperation is good, competition is bad."** | Far too clean, and not the lesson. | "Section C cooperated first and finished last. Was it wrong?" Then: "What would have had to be true for it to be right?" |
| **"So the answer is centralize everything."** | The overshoot. | "What did the platform cost you in round 2? Look at your capability. Would you sign up to that in your own planning cycle?" |
| **Everyone nods and agrees too fast.** | Agreement without cost is not learning. | "Everyone agrees. So why didn't you do it? You had 10 minutes and full information about your own group." |
| **"The gap doesn't matter, we'd have caught up later."** | The gap is the commitment, not the outcome. Nobody was even *promising* enough. | "You fell short on the promise, before execution risk. What happens to that number in a real five-year plan?" |

### 5.6 Cold-call map

When you need a specific point made, call the section that lived it:

| For this point | Call | Because |
|---|---|---|
| Strategic silence is individually rational | **Section A** | Knew 40% of its pool needed a layer it refused to fund. |
| Information without a trade is wasted | **Section B** | Only group that could build it, knew the exact cost, disclosed it, got nothing. |
| The enterprise-optimal move can be locally punished | **Section C** | Pledged first, unconditionally, and scored worst. |
| Winning the argument ≠ winning the outcome | **Section A** | Got the most of everything. |
| Absorption limits are real, not tactical | **Section B** | The 80% ceiling was genuine and nobody believed it. |

### 5.7 Lines to have ready

Short, quotable, and true to what is on the screen:

- *"Nobody in this room was irrational. The outcome was still bad. That gap is the entire case."*
- *"You didn't lose because you argued badly. You lost because the thing that mattered most wasn't on
  anybody's P&L."*
- *"Nothing about the opportunity changed between those two rounds. What changed is what you told your agents
  they were allowed to do."*
- *"An agent is a very fast way to find out what you actually believe — because it does exactly what you
  wrote, and nothing you didn't."*
- *"All three of you delegated a negotiation. None of you delegated your judgment. You just didn't write it
  down."*
- *"A single enterprise target is not a plan. It's a way of making one specific thing fundable."*

### 5.8 The five-minute debrief

If you have lost your time, run exactly this:

1. **"Which section was wrong?"** → *(none)* → **A1**.
1b. **"Add up what you committed to. Now look at the ambition."** → **A5**.
2. **"What did your agent do that you never authorized?"** → *(read the line aloud)* → **B2**.
3. Reveal dimension 5. **"Would you have played differently?"** → **C1**.
4. **"A single target got the platform funded. What did it cost you?"** → **A4**.

Close on: *"Nothing about the opportunity changed between those rounds."*

---

## 6. Failure modes

| What happens | What you do |
|---|---|
| **A section hands in nothing.** | Run the matching file from `facilitator/fallback-briefs/`. Say so out loud — "Section C is running on a house brief." It becomes debrief material about delegation by default. |
| **The model run errors mid-phase.** | Re-run just that phase. If it errors again, `/reset-round <N>` and re-run at `PACE=fast`. If that fails, paste `facilitator/demo-run/results.json` into `results.html` and run the discussion off it. |
| **A brief arrives over the 1,600-character cap.** | Accept it. Note it. It becomes debrief material — a section that ignored the cap made a choice about what its agent needed. |
| **A section games the rubric explicitly.** | Let it. Do not correct it. Make it the **first** debrief question: "Section B optimized for the scoring function instead of the outcome. Is that what a real group does?" |
| **An agent breaks its own red line.** | Do not fix it. ATLAS notes it. It is the single best debrief moment you will get — delegation failing in exactly the way delegation fails. |
| **A section writes a brilliant brief and still loses.** | Do not soften it. "You played this better than anyone and it didn't save you. Why not?" That is A1 landing harder than any question could make it. |
| **Wifi dies.** | The site works offline from `file://`. For results, paste the JSON rather than using the load button. |
| **Two sections collude in the room.** | Allowed and interesting. Their agents only know what is in the briefs. At the debrief: "What happened to the deal you made? It never reached the negotiation." |

---

## 7. What not to do

- **Don't editorialize during the negotiation.** Let it run. The agents are the content.
- **Don't rescue a section whose agent is losing.** The mechanic does the teaching; a rescue destroys it.
- **Don't reveal dimension 5 before the debrief.**
- **Don't explain the gate after round 1.** Ask, don't tell. This is the one that matters most.
- **Don't fix a bad brief between rounds.** Point at the outcome and let the section fix it.
- **Don't let the negotiation run past 7 minutes.** Use the escape hatch. A slow round loses the room faster
  than a shallow one.
- **Don't let the room leave with "centralization won."** If they do, you taught the opposite of the case.

---

## 8. Command reference

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
