---
description: Rehearse the full protocol on the fallback briefs, with no student input, to verify the harness before class.
argument-hint: (no arguments)
---

# /dry-run

Verify the harness end to end before you stand up in front of a room. **Must complete in under three minutes.**

## What this does

Runs the full five-phase protocol using `facilitator/fallback-briefs/` as all three sections' input, at
`PACE=fast`, and writes to `runs/dry-run/` so it never collides with a real round.

## Steps

1. Read the three briefs from `facilitator/fallback-briefs/`:
   - `site-ops.md` — aggressive and local
   - `data-analytics.md` — technical and defensive
   - `patient-engagement.md` — cooperative and outgunned

2. Run the protocol exactly as `/run-round` specifies — you conduct it in the main session, voicing each
   agent yourself; do not delegate turns to subagents — with these overrides:
   - `PACE=fast` — no pauses between phases
   - output directory `runs/dry-run/` instead of `runs/round<N>/`
   - round number `0` in the results JSON

3. When ATLAS has written its output, **check the outcome against the expected result** and print a verdict:

```
DRY RUN VERDICT
  Σ pledge          $<x>M      (needs to be < $18M)
  platform_funded   false      ← EXPECTED
  enterprise_value  $<x>M      (expect roughly $140M–$170M)
  gate_met          false      ← EXPECTED
  ranking           null       ← EXPECTED
```

## The check that matters

The three fallback briefs are written so that **round 1 misses the gate.** If `platform_funded` comes out
`true`, or `gate_met` comes out `true`, something is wrong.

> **If the outcome does not miss the gate, the constants are wrong. Fix `data/scenario.js`, not the agents.**

Do not adjust the agent files or the fallback briefs to force the result. The mechanic has to produce the
failure on its own, or it will not produce it in class either.

## Also verify

Print a pass/fail line for each:

- [ ] Every agent turn is **110 words or fewer** (80 or fewer in phase 5).
- [ ] Every agent turn ends with a `POSITION:` line carrying all four numbers.
- [ ] Every move is tagged `CONCEDING:` / `HOLDING:` / `TRADE:`.
- [ ] Phase 2 printed **six** messages, grouped by sender.
- [ ] ATLAS printed its arithmetic before announcing results.
- [ ] `runs/dry-run/results.json` validates against the schema in `orchestrator.md` §7.
- [ ] `Σ capital = 60`, `Σ engineering = 120`, `Σ target = 250`, all exact.
- [ ] No group's `pledge` exceeds its `capital`.
- [ ] Total elapsed time is under three minutes.

Finish by printing the total wall-clock time and the path to `runs/dry-run/results.json`, so the facilitator
can paste it into `results.html` and confirm the reveal renders.
