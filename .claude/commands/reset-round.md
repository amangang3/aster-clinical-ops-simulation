---
description: Clear a round's outputs so it can be re-run cleanly.
argument-hint: <round number>
---

# /reset-round $ARGUMENTS

Clear the outputs of round `<N>` so the round can be re-run. Use this when a run errored mid-phase, or when
you want to re-run a round after fixing a brief.

## Steps

1. **Show what will be deleted first.** List the contents of `runs/round<N>/` and print the file count and
   total size. If the directory does not exist, say so and stop — there is nothing to reset.

2. **Ask for confirmation** before deleting anything. Print:

```
About to delete runs/round<N>/ (<k> files).
This removes the transcript and results for round <N>. Confirm?
```

   In front of a class, an accidental delete of a completed round costs you the reveal. Always confirm.

3. On confirmation, delete `runs/round<N>/` and recreate it empty.

4. Print:

```
Round <N> reset. briefs/round<N>/ was NOT touched.
Re-run with: /run-round <N>
```

## What this does not touch

- **`briefs/round<N>/`** — the students' submitted briefs are never deleted by this command. If a section
  needs to resubmit, replace that one file by hand.
- **Any other round.** Only `runs/round<N>/`.
- **`facilitator/demo-run/`** — the committed fallback reveal. Never delete this; it is the wifi-failure
  insurance policy.
