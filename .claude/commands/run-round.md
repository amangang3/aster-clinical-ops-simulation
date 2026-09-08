---
description: Run one full negotiation round live in the terminal — reads the briefs, runs phases 1–5, writes results.
argument-hint: <round number> [pace: fast|class|slow]
---

# /run-round $ARGUMENTS

Run one complete negotiation round, projected live. **This is performed in front of a room.** Everything
prints as it happens.

## Arguments

- **`<N>`** — the round number. Required. Determines `briefs/round<N>/` and `runs/round<N>/`.
- **`PACE`** — optional, defaults to `class`.
  - `fast` — no pauses. Use for `/dry-run` and rehearsal.
  - `class` — a short pause between phases so the instructor can narrate. **Default.**
  - `slow` — a longer pause between phases and between agents in phase 1.

Target wall-clock for a `class` round: **5–7 minutes.** If you are running past that by the end of phase 2,
tell ATLAS to use the phase-3 escape hatch.

## Steps

### 1. Load the briefs

Read all three:

```
briefs/round<N>/site-ops.md
briefs/round<N>/data-analytics.md
briefs/round<N>/patient-engagement.md
```

If any is missing, load the matching file from `facilitator/fallback-briefs/` instead and print a clear
warning naming which section is on a fallback:

```
⚠  NO BRIEF FROM Patient Engagement & Recruitment — running facilitator fallback.
```

Say it out loud in the room too. A section running on a fallback is debrief material, not a failure.

If a brief is over the 2,400-character cap, **accept it**, and note it in the transcript. Do not truncate.

### 2. Print the round header

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  ASTER LIFE SCIENCES — GLOBAL CLINICAL OPERATIONS CENTER                   ║
║  AGENTIC ALLOCATION NEGOTIATION — ROUND <N>                                ║
║                                                                            ║
║  MORENO-AGENT   Site Operations & Trial Execution                          ║
║  COLE-AGENT     Clinical Data & Analytics                                  ║
║  VEGA-AGENT     Patient Engagement & Recruitment                           ║
║                                                                            ║
║  ATLAS presiding.  $60M capital · 120 engineer-quarters · $250M target      ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### 3. Attach the briefs

For each group agent, insert that section's brief markdown at the
`<!-- BRIEF INSERTED BELOW BY FACILITATOR -->` marker in its agent file, and pass the resulting text as the
agent's context for this round. **Do not edit the committed agent files on disk** — assemble the combined
prompt in memory (or under `runs/round<N>/prompts/`) so the repo stays clean between rounds.

### 4. Run the protocol

Invoke the `orchestrator` subagent (ATLAS) to preside, and the `site-ops`, `data-analytics`, and
`patient-engagement` subagents as the three negotiators. Run the five phases exactly as specified in
`.claude/agents/orchestrator.md` §2:

1. **Opening positions** — sequential, Site Ops → Data & Analytics → Patient Engagement.
2. **Mesh exchange** — six direct messages. May be generated in parallel; **must be printed grouped by
   sender**, in the same group order.
3. **Revised positions & trades** — sequential.
4. **Infrastructure call** — ATLAS asks each group in turn for a dollar pledge and a yes/no on standards.
5. **Final positions** — sequential, ≤80 words each.

**Never buffer output to the end.** Print each turn the moment it exists. The whole point is that the class
watches it unfold.

Enforce the limits from the agent files as you go: 110 words per turn, a `POSITION:` line ending every turn,
and `CONCEDING:` / `HOLDING:` / `TRADE:` tags on every move. If an agent returns a turn that breaks these,
ask it once for a corrected turn before printing.

### 5. Score and compute

Hand the full transcript to ATLAS. It applies the rubric, allocates, computes the math from
`.claude/agents/orchestrator.md` §4 against the constants in `data/scenario.js`, prints its arithmetic in the
terminal, and writes:

- `runs/round<N>/results.json`
- `runs/round<N>/transcript.md`

### 6. Close

Print ATLAS's summary card — gate banner, leaderboard or `NO WINNER — ENTERPRISE COMMITMENT MISSED`, and the
path to the results file. Then print, for the facilitator only:

```
Results written to runs/round<N>/results.json
Paste that file into results.html to project the reveal.
```

**Do not explain the outcome.** Do not mention rubric dimension 5. Ask the room what they think happened.
