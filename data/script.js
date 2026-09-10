/* Every word of copy in the simulation. Nothing here is generated, templated or randomised.
   Kept out of the HTML so that no figure is ever typed into a page. */

window.ASTER_SCRIPT = {

  /* ---- The board: three divisions, each right about its own situation ---- */
  groups: {
    "site-ops": {
      descriptor: "Runs the trials. Most of its upside sits on a boundary it does not own.",
      objection: "We are not against this. We cannot take a step change in Q3 and Q4 — that is our enrolment peak — and my successor arrives in two quarters. Ask me for a number I can still be holding when they get here.",
      responses: {
        price:      "More capital does not create absorption capacity. You would be handing us money to spend in the two quarters we have the least room to change anything.",
        underwrite: "We are not worried about being left exposed. We are worried about the calendar. A guarantee does not move our enrolment peak.",
        sequence:   "Back-loaded, staged into gates my successor can own? Then yes. We will carry the full number."
      }
    },
    "data-analytics": {
      descriptor: "The only group that can build the shared layer. Already ahead, and paid to be.",
      objection: "We already funded this. It is in our five-year plan, it is staffed, and we are ahead. What you are describing is us slowing down to carry two groups who have not started.",
      responses: {
        sequence:   "Time is not our constraint. We are the ones who are ready. Giving us longer just wastes the head start we paid for.",
        underwrite: "We are not asking you to protect us from risk. We are asking why we should hand over an advantage we bought.",
        price:      "Credit what we have already built, make us supplier of record, guarantee the demand? Then this is a business rather than a tax. We will build it."
      }
    },
    "patient-engagement": {
      descriptor: "The smallest pool and the best return per dollar. Almost none of it survives without shared data.",
      objection: "The last time the centre set a standard we rebuilt integrations that already worked, lost two enrolment campaigns, and nobody paid for it. The economics here are good. That has never been the issue.",
      responses: {
        sequence:   "More time does not help. We would spend it waiting to be told the rules changed again.",
        price:      "We do not need a better price. We need to know that this time the bill does not land on us.",
        underwrite: "Migration covered up front, access guaranteed in writing, before we pledge? Then we are in — and we will be the cheapest yes you get."
      }
    }
  },

  /* ---- System lines. {pledged} and {required} are filled from the model. ---- */
  system: {
    gate_funded:  "SHARED TRIAL-DATA LAYER — FUNDED. Cross-boundary workflows now realise in full.",
    gate_short:   "{pledged} pledged of {required}. The layer does not get built.",
    nobody_moved: "Nobody moved. Nobody was wrong to."
  },

  /* ---- Landing page ---- */
  landing: {
    title: "The Coordination Problem",
    subtitle: "Three divisions. One shared asset. Nobody who can order it built.",
    paragraphs: [
      "Aster Life Sciences runs its Global Clinical Operations Center as three operating groups, each with its own P&L and its own plan. Each one is measured on its own numbers and staffed against them.",
      "The CIO has run the demo. Everyone in the room agrees the opportunity is real, agrees roughly on its size, and agrees the shared trial-data layer underneath it has to exist. Nobody disagrees about the prize.",
      "What nobody agrees on is who commits. The CIO can argue for a number and cannot set one, because only a P&L owner commits a number into a plan. That is the whole problem, and it is the only thing this simulation is about."
    ],
    figures: [
      { label: "The ambition",            note: "run-rate the CIO is arguing for" },
      { label: "Shared trial-data layer", note: "build cost, indivisible" },
      { label: "Platform capital",        note: "total the three groups need for their own plans" },
      { label: "Cross-boundary value",    note: "value that only exists if the layer is built" }
    ],
    begin: "BEGIN",
    secondary: "Facilitator debrief"
  },

  /* ---- Debrief ---- */
  debrief: {
    title: "Debrief",
    collaborate: {
      heading: "Forces incentivising collaboration",
      caption: "Why any division comes to the table.",
      rows: [
        ["Dependency", "Value you cannot realise without an asset another division owns. The more of your value sits on a boundary, the more you need the deal — and if you are the one who owns that asset, your upside is their commitment, not your own roadmap."],
        ["Threshold",  "The shared asset is lumpy. It exists only above a funding line that no single division can justify on its own numbers, so it gets built jointly or it does not get built."],
        ["Duplication","Left alone, divisions quietly build the same capability twice. Nobody can see it from inside their own plan, and the waste only surfaces once both have been funded."]
      ]
    },
    individualism: {
      heading: "Forces incentivising individualism",
      caption: "Why it defends its own plan instead.",
      rows: [
        ["Absorption", "“We cannot take this much change this fast.”", "A timing problem, not a size problem — so commit the number and negotiate the clock."],
        ["Advantage",  "“We already paid for this. Why would we level down?”", "A property problem — so pay for what they give up: credit the head start, guarantee them demand."],
        ["Assurance",  "“Last time the centre moved, we ate the cost.”", "A trust problem — so guarantee the downside: caps, kill criteria, migration costs covered."]
      ]
    },
    moves: {
      heading: "The three moves",
      caption: "Each individualism factor has exactly one move that answers it. This one-to-one mapping is the mechanic."
    },
    diagnosis: {
      heading: "The applied diagnosis",
      rows: {
        "site-ops":           { pull: "Dependent", pull_note: "40% of its value needs a layer it cannot build; six of nine top workflows cross its boundary" },
        "data-analytics":     { pull: "Supplier",  pull_note: "the only group that can build the layer; its own pool is hardest to grow" },
        "patient-engagement": { pull: "Dependent", pull_note: "best return per dollar in the room, nearly all of it gone without shared data" }
      }
    },
    outcomes: {
      heading: "Every reachable outcome",
      caption: "Eight states, and only one of them builds the layer. Read the middle six: every partial coalition is worse than nobody trying, and it gets worse the more groups join."
    },
    questions: {
      heading: "Discussion",
      items: [
        "Which move did the room reach for first, and what did that assume about the block?",
        "Two divisions did the right thing and the number went down. What does that tell you about pilots?",
        "Patient Engagement has the best return per dollar in the room and the least standing to demand anything. Where is that division in your company?",
        "The layer cost {infra} against {gain} of value. Why does that deal not happen on its own?",
        "What would have to be true for a mandate to be the right answer here rather than a lazy one?"
      ]
    },
    closing: {
      heading: "One kind of block this model leaves out",
      body: "There is a fourth kind of objection, and it is deliberately absent from the mechanic: concerns that are entirely real to one division and unpriceable by everyone else. A regulatory exposure only they carry. A commitment already made to someone outside the room. No move fixes those, because there is nothing to trade. Name them and take them off the table early, or they contaminate every negotiation that follows."
    }
  },

  /* ---- Scoreboard ---- */
  scoreboard: {
    title: "The round",
    ledger_heading: "The deal ledger",
    ledger_empty: "No moves were made.",
    bought_nothing: "bought nothing",
    table_heading: "Where the value landed",
    back: "BACK TO THE BOARD",
    debrief: "Debrief"
  },

  /* ---- The flow between pages. Rendered by assets/nav.js on every page. ---- */
  nav: {
    steps: [
      { href: "index.html",   n: "1", label: "The situation",
        note: "Three divisions, one shared asset, nobody who can order it built" },
      { href: "sim.html",     n: "2", label: "The exercise",
        note: "Eight to twelve minutes at the lectern" },
      { href: "debrief.html", n: "3", label: "The debrief",
        note: "The framework, all eight outcomes, and the discussion" }
    ],
    guide: "Facilitator guide",
    guide_href: "facilitate.html",
    guide_note: "Do not project this one — it has the answer key on it"
  },

  /* ---- Presenter notes, toggled with N. Deterministic: the beat is read off the board. ---- */
  notes: {
    heading: "Presenter note",
    hint: "N hides this. It shows on the projector too — use it in rehearsal, or when you have a second display.",
    beats: {
      opening: {
        title: "Nothing applied yet",
        body: "Read the three objections aloud, or have three people read them. Then ask the only question that matters: what does each of them actually need in order to say yes? Do not name the blocks, and do not let the room re-argue the size of the prize."
      },
      probing: {
        title: "Money is on the table and nothing has moved",
        body: "The spend is climbing and every other number is exactly where it started. Say it once, not twice: that money is gone whether or not the move worked. Then read the objection again, slowly. It says what it needs."
      },
      first: {
        title: "One division has committed",
        body: "Name what just answered it. It was not the size of the prize — it was a timing, property or trust problem, and the deal that fixed it was cheap. Ask the room what the other two are actually saying."
      },
      pivot: {
        title: "Two committed — and the number has fallen",
        body: "Stop. Point at the enterprise figure. Two divisions did exactly the right thing, paid their pledge out of their own capital, and the enterprise is worse off than if nobody had moved. Do not explain it away and do not rescue it. Let the room sit in the silence."
      },
      funded: {
        title: "The layer is funded",
        body: "Say nothing until the animation finishes. Then one sentence: nothing about these three divisions changed. The last pledge cleared {infra}, and the cross-boundary value that was there the whole time switched on."
      },
      closed: {
        title: "Round closed",
        body: "Read the ledger aloud, wasted spend included. Then the transfer question, before anyone opens a laptop: which of these three is your division, and which block are you actually arguing?"
      }
    }
  },

  /* ---- Facilitator guide — facilitate.html ---- */
  facilitate: {
    title: "Facilitator guide",
    standfirst: "Everything needed to run this cold: where each page fits, what to do and say at each beat, the answer key, and the questions the room will push back with.",
    warning: "This page has the answer key on it. Do not project it.",

    flow: {
      heading: "Where each page fits",
      caption: "Four pieces, in the order you use them.",
      items: [
        { label: "1 · The situation", href: "index.html",
          body: "Project it while the room settles. Read the three division cards, not the paragraphs. The four figures — {ambition} ambition, {infra} layer, {capital} of platform capital, {cross} of cross-boundary value — are the entire set-up." },
        { label: "2 · The exercise", href: "sim.html",
          body: "The whole session. One screen that never scrolls, driven from the keyboard so you never break eye contact with the room. Nothing is stored and nothing is random: the same clicks always produce the same numbers." },
        { label: "3 · The debrief", href: "debrief.html",
          body: "After the exercise. The two framework tables, the three moves, the applied diagnosis, all eight outcomes with your round highlighted, and five discussion questions." },
        { label: "The deck", href: null,
          body: "framework-deck.pptx. Slide 1 sets up the case, slide 2 explains the mechanic, slides 3 and 4 are the framework itself. Use 3 and 4 after the debrief, or instead of it if you are short of time." }
      ]
    },

    beats: {
      heading: "Beat by beat",
      caption: "Eight to twelve minutes. The timings are a shape, not a script — the two silences are the only things in here that can actually go wrong.",
      rows: [
        ["0:00 · Set up",
         "Open the exercise. Three divisions, three objections, nothing else on screen.",
         "Read the objections aloud. Say only this: each division is right about its own situation, and not one of them is arguing about the size of the prize."],
        ["1:30 · First diagnosis",
         "Take the first suggestion from the room and apply it. Do not filter it.",
         "Ask what each division actually needs in order to say yes. The first instinct is almost always to pay everybody — money is the move executives reach for — and it lands on exactly one of the three."],
        ["3:00 · Let it be wrong",
         "Apply the wrong moves without comment. The spend climbs; nothing else moves.",
         "Point at the spend once: that money is gone whether or not the move worked. Then ask what the objection actually said, and read it again."],
        ["5:00 · The first commitment",
         "Apply a correct move. The badge flips and the block label appears.",
         "Name the block that was just answered, and how little it cost to answer it. Then ask the room to re-read the other two objections in that light."],
        ["6:30 · The number falls",
         "Stop the moment the second division commits. Point at the enterprise figure.",
         "Two divisions did the right thing, paid their pledge, and the enterprise went backwards — the worst pair, {worstpair}, lands at {worst} against {baseline} for nobody moving at all. Say nothing else."],
        ["8:00 · The gate",
         "Apply the third correct move. Do not talk for the next fifteen seconds.",
         "The pledges clear {infra}, the multiplier goes {unfunded} to 100%, and the enterprise lands at {ceiling} — {ahead} past the ambition. Let the animation finish before you speak."],
        ["9:00 · Close the round",
         "Press C. The board freezes and the ledger appears.",
         "Read the ledger aloud, wasted spend included. Clean diagnosis costs {dealcost} and buys {gain} — a return of {ret}. Every misdiagnosis cost full price and bought nothing."],
        ["10:00 · Hand off",
         "Go to the debrief, or straight to slides 3 and 4 of the deck.",
         "Ask the transfer question before you show anyone the framework: which of these three is your division, and which block are you actually arguing?"]
      ]
    },

    key: {
      heading: "The answer key",
      caption: "One move answers each block; the other two cost full price and buy nothing. Press H during the exercise to put the block labels on screen if the room stalls.",
      tell_heading: "The tell",
      tells: {
        "site-ops":           "“We are not against this” followed by two dates. The objection is a calendar, not a number — and it is a handover being managed, not a position being defended.",
        "data-analytics":     "“We already funded this.” The objection is ownership of something already bought, so anything that reads as levelling down makes it worse.",
        "patient-engagement": "“Nobody paid for it.” The objection is about the last time, not this one — which is why a better price answers a question nobody asked."
      }
    },

    moments: {
      heading: "The two moments that carry the session",
      items: [
        { title: "The number falling",
          body: "The instinct is to explain it away in the same breath, and that is the one thing that kills the lesson. Two divisions did exactly what you asked, spent real capital out of their own plans, and made the enterprise worse. Neither of them was wrong. That is what a pilot looks like from the centre: money spent, capability given up, and no threshold crossed. Let the room get there before you do." },
        { title: "The gate reveal",
          body: "It runs for a second and a half and it is the only purely visual moment in the session. Talking over it costs you the beat. Watch the room, not the screen — then one sentence: nothing about these three divisions changed. Only the last pledge did." }
      ]
    },

    trouble: {
      heading: "If it goes sideways",
      rows: [
        ["The room stalls on the diagnosis",
         "Press H. The block labels appear and the exercise turns from diagnosis into matching. A worse lesson, a better use of the remaining minutes."],
        ["Someone insists the CIO should just mandate it",
         "Take it seriously — it is the case question, not a distraction. Ask what a mandate is worth if the P&L owner nods and then quietly under-resources it for four quarters, and what you would have to believe about your own authority for a mandate to be the right answer rather than the lazy one."],
        ["Someone says the multiplier is arbitrary",
         "It is, and say so. The size of the number is invented; the shape is not. What matters is that value on a boundary only exists above a threshold no single division can clear alone."],
        ["Someone asks why the divisions do not just talk to each other",
         "They have. Everyone in the room agrees the layer should exist — that is the premise, and it changes nothing. Agreement in principle is free, which is exactly why it is always available."],
        ["The room diagnoses all three correctly, first try",
         "Rare, and worth naming as luck rather than skill. Press R and run it again deliberately wrong on one division, so they see the wasted spend they skipped past."],
        ["You have four minutes, not twelve",
         "Skip the misdiagnosis entirely. Apply the three correct moves in order, stop dead after the second, and spend everything you have left on the falling number."]
      ]
    },

    pushback: {
      heading: "What the room will push back with",
      items: [
        { q: "Isn't this just a prisoner's dilemma?",
          a: "No. Nobody here defects for gain. Each division is choosing what is genuinely best for its own P&L, and two of the three are right that the deal as first offered is bad for them. The problem is not bad faith — it is that no single division can clear the threshold alone, and the one that moves first pays for a layer that does not exist yet." },
        { q: "Why is partial coordination worse than none?",
          a: "A division that commits spends real capital out of its own plan and gets nothing back until the layer exists. {worstpair} committing together produces {worst}, against {baseline} for nobody moving. The pledge is gone, the threshold is not crossed, and the cross-boundary value stays switched off." },
        { q: "Would the centre not just fund the layer itself?",
          a: "Sometimes it can, and then this exercise is about the next asset rather than this one. The layer is rarely the hard part. Ask who owns the workflows that cross the boundary once it exists, and who has to change how they work — that commitment is the thing no cheque buys." },
        { q: "The smallest division has the best economics. Should it not simply be told?",
          a: "It has the best return per dollar in the room and the least standing to demand anything. That asymmetry is exactly why its block is trust rather than money, and why the cheapest yes in the room is also the easiest one to lose." },
        { q: "What if two divisions have the same block?",
          a: "They usually do. The diagnostic still works; the deals just collapse into two. The blocks come out one per division here because the case was written that way, not because reality is that tidy." },
        { q: "Where does the technology come into this?",
          a: "It does not, and that is the finding. The binding constraint was never the model, the data or the capital. It was whether a P&L owner would commit to something they do not control." }
      ]
    },

    keys: { heading: "Facilitator keys", caption: "Keyboard only. Nothing in this list is ever shown on screen during the exercise unless you ask for it." },

    close: {
      heading: "Before you stand up",
      body: "Run it once alone with the room's worst instincts — pay everybody, then fix it. You will learn the timing of the two silences, which are the only things in this that can go wrong. Press R and the board is clean again: nothing is stored, nothing carries between runs, and the same clicks always produce the same numbers."
    }
  },

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3", "Select division"],
      ["Q W E", "Apply Sequence / Price / Underwrite to the selected division"],
      ["H",     "Toggle the block labels — the hint, for when the room stalls"],
      ["N",     "Toggle the presenter note — shows on the projector too"],
      ["C",     "Close the round"],
      ["R",     "Reset"],
      ["?",     "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
