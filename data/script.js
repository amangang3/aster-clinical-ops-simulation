/* Every word of copy in the simulation. Nothing here is generated, templated or randomised.
   Kept out of the HTML so that no figure is ever typed into a page.

   {tokens} are substituted at runtime from data/model.js. Division pages get four more
   tokens of their own: {local}, {cross}, {capital} and {pledge}.

   Two rules for anything written in here:
   - In the Aster copy: "division", never group/unit/team, and "shared trial-data layer",
     never system/platform. The debrief framework is the exception — it is written to
     travel beyond this case, so it says "shared asset" on purpose.
   - Never state a ratio or a share that the constants in data/model.js do not produce.
     $95M pool + $20M cross is middling, not smallest; check before writing "most" or "least". */

window.ASTER_SCRIPT = {

  /* ---- The three divisions ---- */
  groups: {
    "site-ops": {
      descriptor: "The biggest division. It needs the layer to reach {cross} it cannot reach on its own.",
      role: "Runs the network of sites and hospitals that carry out the trials. It is the biggest of the three divisions.",
      measured: "Enrolment against plan, how long a site takes to activate, and cost per patient enrolled.",
      position: [
        "Site Operations has the biggest value pool in the Center at {local}. Six of the nine highest-value workflows run through it, but each of those six starts or finishes in another division.",
        "Those workflows are where the {cross} of cross-boundary value comes from. Site Operations cannot get any of it without the shared layer, and it has no data engineering team to build one.",
        "Q3 and Q4 are its enrolment peak, and they are the two quarters when it can least afford to change how anything works. A new technology leader arrives in two quarters and will inherit whatever gets agreed now."
      ],
      work_out: "Site Operations has not argued with the size of the target. Work out what would have to change about the shape of it.",
      objection: "We are not against this. We cannot take a step change in Q3 and Q4 — that is our enrolment peak — and my successor arrives in two quarters. Ask me for a number I can still be holding when they get here.",
      responses: {
        price:      "More capital does not create absorption capacity. You would be handing us money to spend in the two quarters we have the least room to change anything.",
        underwrite: "We are not worried about being left exposed. We are worried about the calendar. A guarantee does not move our enrolment peak.",
        sequence:   "Back-loaded, staged into gates my successor can own? Then yes. We will carry the full number."
      }
    },

    "data-analytics": {
      descriptor: "The only division that can build the layer, and the one that gets least back for what it puts in.",
      role: "Collects, validates and analyses the trial data. It is the only division with the engineering depth to build the shared layer.",
      measured: "Data quality, how fast it can answer a question from the trial teams, and delivery against its own five-year platform plan.",
      position: [
        "Data & Analytics has a {local} value pool. Only {cross} of its value sits on a boundary, the smallest cross-boundary stake of the three divisions, so it has the least riding on the layer and is the only division that can build it.",
        "It has already funded platform work of its own. The plan is written, the team is hired, and it is further along than the other two divisions.",
        "Building the shared layer means building it for everyone. That slows its own roadmap and hands over work it has already paid for."
      ],
      work_out: "Data & Analytics is being asked to do the most and gets the least back for it. Work out what would make that a deal rather than a favour.",
      objection: "We already funded this. It is in our five-year plan, it is staffed, and we are ahead. What you are describing is us slowing down to carry two divisions who have not started.",
      responses: {
        sequence:   "Time is not our constraint. We are the ones who are ready. Giving us longer just wastes the head start we paid for.",
        underwrite: "We are not asking you to protect us from risk. We are asking why we should hand over an advantage we bought.",
        price:      "Credit what we have already built, make us supplier of record, guarantee the demand? Then this is a business rather than a tax. We will build it."
      }
    },

    "patient-engagement": {
      descriptor: "The smallest division, and the one whose own numbers move most when the layer is built.",
      role: "Finds patients, enrols them, and keeps them in the trial. It is the smallest of the three divisions.",
      measured: "Enrolment yield per campaign, patient retention, and cost per enrolled patient.",
      position: [
        "Patient Engagement is the smallest division, with a {local} value pool. Waiting on the layer is another {cross} of cross-boundary value — half its own pool again, the highest ratio in the room.",
        "That makes it the best return per dollar in the room. It needs {capital} of platform capital, the least of the three, and it is being asked for the smallest pledge at {pledge}.",
        "The last time the centre set a standard, this division rebuilt integrations that were already working, lost two enrolment campaigns, and paid for it out of its own budget. Nobody reimbursed it."
      ],
      work_out: "Patient Engagement has the most to gain and the least standing to ask for anything. Work out what it needs to hear before it pledges.",
      objection: "The last time the centre set a standard we rebuilt integrations that already worked, lost two enrolment campaigns, and nobody paid for it. The economics here are good. That has never been the issue.",
      responses: {
        sequence:   "More time does not help. We would spend it waiting to be told the rules changed again.",
        price:      "We do not need a better price. We need to know that this time the bill does not land on us.",
        underwrite: "Migration covered up front, access guaranteed in writing, before we pledge? Then we are in — and we will be the cheapest yes you get."
      }
    }
  },

  /* ---- Lines the board itself uses ---- */
  system: {
    gate_funded:  "The shared trial-data layer is funded. Every division now runs at full rate, and cross-boundary work pays out.",
    gate_short:   "{pledged} pledged of {required}. The layer does not get built.",
    nobody_moved: "No division pledged. On its own numbers, none of them was wrong to hold back."
  },

  /* ---- The flow between the pages ---- */
  nav: {
    steps: [
      { href: "index.html",        n: "1", label: "The situation" },
      { href: "instructions.html", n: "2", label: "How it works" },
      { href: "divisions.html",    n: "3", label: "The divisions" },
      { href: "sim.html",          n: "4", label: "The exercise" },
      { href: "debrief.html",      n: "5", label: "The debrief" }
    ],
    guide: "Facilitator guide",
    guide_href: "facilitate.html",
    guide_note: "For whoever is running the session. It gives away the answers."
  },

  /* ---- Landing page ---- */
  landing: {
    title: "The Coordination Problem",
    subtitle: "Three divisions, one shared trial-data layer, and nobody who can order it built.",
    paragraphs: [
      "Aster Life Sciences runs its clinical operations through three divisions. Each has its own budget, its own plan and its own targets, and each is measured on its own results.",
      "All three want the same thing: a shared trial-data layer that lets their AI agents work across division boundaries instead of stopping at them. It costs {infra} and it is all or nothing. Each division has been asked for a share, and the three shares only cover the bill together.",
      "The CIO can make the case but cannot commit the money. Only the person who owns a budget can put a number into a plan, so the three divisions have to agree between themselves. So far they have not."
    ],
    figures: [
      { label: "The ambition",            note: "what the CIO wants the three divisions to reach" },
      { label: "Shared trial-data layer", note: "cost to build it, all or nothing" },
      { label: "Platform capital",        note: "what the three divisions need for their own plans" },
      { label: "Cross-boundary value",    note: "value that only exists once the layer is built" }
    ],
    do_line: "You will read the three divisions, work out what each one needs before it will pledge, and pay for it. Three deals are on offer. Only one of them works on each division.",
    do_link: "How the session works",
    begin: "BEGIN",
    secondary: "Debrief"
  },

  /* ---- Instructions, for the people in the room ---- */
  instructions: {
    title: "How the session works",
    standfirst: "About ten minutes on one screen. This page explains the numbers, what you are being asked to do, and the rules.",

    situation: {
      heading: "What is being decided",
      body: [
        "The shared trial-data layer costs {infra}. Each division has been asked to pledge part of its own platform capital towards it.",
        "The three pledges add up to exactly {infra}. Every division is needed. No two of them can fund it without the third, and there is no partial version of the layer."
      ]
    },

    numbers: {
      heading: "How the numbers work",
      caption: "Three rules produce every figure on the board. It is worth reading these before the exercise, because the first one surprises people.",
      rows: [
        ["Without the layer, everything runs at {unfunded}",
         "AI agents can only work inside the division that owns the data, so they never finish a workflow that crosses a boundary. Every division realises {unfunded} of its value pool. This is why the board opens at {baseline} rather than the sum of the three pools."],
        ["With the layer, pools pay out in full",
         "Agents work across boundaries. Each division realises its whole pool, and the {cross} of cross-boundary value appears on top of it."],
        ["Pledging costs capability",
         "A pledge is real money out of a division's own platform budget. It gives up some of its own capability to make it, so a division that pledges is worth slightly less on its own terms than one that does not."]
      ],
      note: "That third rule is what makes this hard. A division that pledges pays immediately and gets nothing back unless the other two pledge as well."
    },

    job: {
      heading: "What you are asked to do",
      body: [
        "Each division has said why it is holding back. None of them is arguing about whether the layer is worth building, and none of them disputes the numbers. All three agree the layer should exist.",
        "Work out what each division actually needs, then offer the deal that gives it to them. Name the division and the deal, and it gets applied on screen."
      ]
    },

    moves: {
      heading: "The three deals",
      caption: "One of these works on each division. On the other two it costs the same and changes nothing.",
      note: "There is no partial credit. A deal that misses is money gone."
    },

    rules: {
      heading: "The rules",
      items: [
        "Each deal can be offered to each division once.",
        "The money is spent when you offer it, before anyone knows whether it worked.",
        "A division that pledges stays in for the rest of the round.",
        "Nothing can be taken back.",
        "The layer only gets built if all three divisions pledge."
      ]
    },

    watch: {
      heading: "What to watch",
      body: [
        "Watch the enterprise value as divisions pledge. It does not move the way most people expect, and why it does is the whole point of the exercise.",
        "If you have been assigned a division, watch its number as well as the total."
      ]
    },

    ready: "READ THE DIVISIONS"
  },

  /* ---- The divisions hub ---- */
  divisions: {
    title: "The three divisions",
    standfirst: "Read all three before the exercise starts. Each page covers what the division does, what it is measured on, what the layer is worth to it, and what it has said about pledging.",
    cta: "Read the full brief",
    labels: {
      role: "What it does",
      measured: "Measured on",
      position: "Where it stands",
      numbers: "Its numbers",
      said: "What it has said",
      work_out: "What to work out",
      ask: "What it is being asked for"
    },
    ask_line: "Pledge {pledge} of its {capital} platform capital towards the {infra} layer.",
    figures: [
      { key: "local_pool",   label: "Value pool",           note: "what it earns inside its own boundary, at full rate" },
      { key: "cross_value",  label: "Cross-boundary value", note: "on top of the pool, and only once the layer is built" },
      { key: "capital_need", label: "Platform capital",     note: "what its own plan needs" },
      { key: "pledge",       label: "Pledge asked",         note: "its share of the layer" }
    ],
    next: "Next division",
    back: "All three divisions"
  },

  /* ---- Presenter note on the board, toggled with N ---- */
  notes: {
    heading: "Presenter note",
    hint: "N hides this. It shows on the projector as well, so use it in rehearsal or on a second screen.",
    beats: {
      opening: {
        title: "Nothing spent yet",
        body: "Read the three objections out, or ask three people to read them. Then ask what each division needs before it will pledge. Do not name the blocks."
      },
      probing: {
        title: "Money spent, nothing moved",
        body: "The spend has gone up and nothing else has. Say that once, then read the objection again and ask what it is actually asking for."
      },
      first: {
        title: "One division has pledged",
        body: "Say what the deal answered and how little it cost. Then send the room back to the other two objections."
      },
      pivot: {
        title: "Two pledged, and the number has dropped",
        body: "Stop and point at the enterprise figure. Two divisions did the right thing, paid out of their own budgets, and the enterprise is worse off than when nobody had moved. Let the room notice it before you explain it."
      },
      funded: {
        title: "The layer is funded",
        body: "Wait for the animation to finish. Then: nothing about these three divisions changed. The third pledge took the total past {infra}, so every division now runs at full rate and the cross-boundary value appears."
      },
      closed: {
        title: "Round closed",
        body: "Read the ledger out, wasted spend included. Then ask which of these three divisions people recognise from their own company."
      }
    }
  },

  /* ---- Debrief ---- */
  debrief: {
    title: "Debrief",
    collaborate: {
      heading: "Forces incentivising collaboration",
      caption: "Why any division comes to the table.",
      rows: [
        ["Dependency", "Value you cannot realise without an asset another division owns. The more of your value sits on a boundary, the more you need the deal — and if you are the one who owns that asset, your upside is their commitment, not your own roadmap."],
        ["Threshold",  "The shared asset is lumpy. It exists only above a funding line no single division can reach on its own, so it gets built jointly or it does not get built."],
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
      caption: "Each block has one move that answers it. That one-to-one mapping is the mechanic."
    },
    diagnosis: {
      heading: "The applied diagnosis",
      rows: {
        "site-ops":           { pull: "Dependent", pull_note: "six of its nine top workflows cross a boundary, and it cannot build the layer they need" },
        "data-analytics":     { pull: "Supplier",  pull_note: "the only division that can build the layer, the smallest cross-boundary stake, and the worst return on its own pledge" },
        "patient-engagement": { pull: "Dependent", pull_note: "best return per dollar in the room, and the layer is worth half its pool again" }
      }
    },
    outcomes: {
      heading: "Every reachable outcome",
      caption: "Eight states, and only one of them builds the layer. Look at the middle six: every partial coalition ends up below {baseline}, which is what the room produces when nobody pledges at all."
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
      body: "There is a fourth kind of objection the mechanic deliberately ignores: a concern that is entirely real to one division and cannot be priced by anyone else. A regulatory exposure only they carry. A commitment already made to someone outside the room. No deal fixes those, because there is nothing to trade. Name them early and take them off the table, or they will contaminate every negotiation that follows."
    }
  },

  /* ---- Scoreboard ---- */
  scoreboard: {
    title: "The round",
    ledger_heading: "The deal ledger",
    ledger_empty: "No deals were offered.",
    bought_nothing: "bought nothing",
    table_heading: "Where the value landed",
    back: "BACK TO THE BOARD",
    debrief: "Debrief"
  },

  /* ---- Facilitator guide ---- */
  facilitate: {
    title: "Facilitator guide",
    standfirst: "How to run the exercise cold: where each page fits, what to do and say at each beat, the answer key, and the questions the room tends to ask.",
    warning: "This page gives away the answers. Do not put it on the projector.",

    flow: {
      heading: "Where each page fits",
      caption: "Five pieces, in the order you use them.",
      items: [
        { label: "1 · The situation", href: "index.html",
          body: "Put it up while the room settles. Four figures carry the set-up: {ambition} of ambition, an {infra} layer, {capital} of platform capital across the three divisions, and {cross} of value that only exists once the layer is built." },
        { label: "2 · How it works", href: "instructions.html",
          body: "Written for the room, not for you. Send it round beforehand, or spend a minute on it at the start. It explains the {unfunded} multiplier, which is the one thing people need before the board makes sense, and it does not name any of the blocks." },
        { label: "3 · The divisions", href: "divisions.html",
          body: "A page per division: what it does, what it is measured on, its four numbers, and what it has said. This is the material the room diagnoses from, so it is worth reading before the exercise, not during it." },
        { label: "4 · The exercise", href: "sim.html",
          body: "The session itself. One screen, driven from the keyboard so you can keep facing the room. Nothing is stored and nothing is random, so the same choices always produce the same numbers." },
        { label: "5 · The debrief", href: "debrief.html",
          body: "Afterwards. The two framework tables, the three moves, the applied diagnosis, all eight outcomes with your round marked, and five questions to open the discussion." }
      ],
      deck: { label: "The deck", body: "framework-deck.pptx holds four slides. Slide 1 sets up the case and slide 2 explains the exercise. Slides 3 and 4 are the framework, and they are the ones to use after the debrief." }
    },

    beats: {
      heading: "Beat by beat",
      caption: "Eight to twelve minutes. The timings are a shape, not a script. The two pauses are the parts worth protecting.",
      rows: [
        ["0:00 · Set up",
         "Open the exercise. Three divisions, three objections, nothing else on screen.",
         "Read the objections out, or have three people read them. Say that each division is right about its own situation, and that none of them is arguing about the size of the prize."],
        ["1:30 · First diagnosis",
         "Take the first suggestion from the room and apply it, whatever it is.",
         "Ask what each division needs before it will pledge. Most rooms reach for money first, because money is what executives are used to offering. It works on one of the three."],
        ["3:00 · Let it be wrong",
         "Apply the wrong deals without commenting. The spend climbs and nothing else changes.",
         "Point at the spend once. That money is gone whether or not the deal landed. Then read the objection again and ask what it was asking for."],
        ["5:00 · The first pledge",
         "Apply a deal that fits. The badge flips and the block appears.",
         "Say what the deal answered and what it cost. Then send the room back to the other two objections with that in mind."],
        ["6:30 · The number falls",
         "Stop as soon as the second division pledges. Point at the enterprise figure.",
         "Two divisions did the right thing, paid their pledge, and the enterprise went backwards. The worst pair, {worstpair}, lands at {worst} against {baseline} for nobody pledging. Let that sit."],
        ["8:00 · The gate",
         "Apply the third deal and stay quiet for about fifteen seconds.",
         "The pledges reach {infra}, every division goes from {unfunded} to full rate, and the enterprise lands at {ceiling}, which is {ahead} past the ambition. Let the animation finish before you say anything."],
        ["9:00 · Close the round",
         "Press C. The board freezes and the ledger appears.",
         "Read the ledger out, wasted spend included. A clean round costs {dealcost} and returns {gain}, which is {ret}. Anything misdiagnosed cost full price and bought nothing."],
        ["10:00 · Hand off",
         "Go to the debrief, or to slides 3 and 4 of the deck.",
         "Ask the transfer question before you show the framework: which of these three is your division, and which block are you actually arguing?"]
      ]
    },

    key: {
      heading: "The answer key",
      caption: "One deal answers each block. The other two cost full price and buy nothing. If the room stalls, H puts the block labels on screen and turns the exercise into matching.",
      tell_heading: "The tell",
      tells: {
        "site-ops":           "“We are not against this,” followed by two dates. The objection is about the calendar, and the division is managing a handover, not defending a position.",
        "data-analytics":     "“We already funded this.” The objection is about ownership of something already bought, so anything that sounds like levelling down makes it worse.",
        "patient-engagement": "“Nobody paid for it.” The objection is about what happened last time, which is why a better price answers a question nobody asked."
      }
    },

    moments: {
      heading: "The two moments that carry the session",
      items: [
        { title: "The number falling",
          body: "The instinct is to explain it away in the same breath, and that kills the lesson. Two divisions did what was asked, spent real capital out of their own plans, and made the enterprise worse. Neither made a mistake. This is what a pilot looks like from the centre: money spent, capability given up, threshold still not crossed. Give the room time to get there." },
        { title: "The gate reveal",
          body: "It runs for about a second and a half and it is the only purely visual part of the session. Talking over it costs you the moment. Watch the room, not the screen, then make one point: nothing about the three divisions changed, only the last pledge did." }
      ]
    },

    trouble: {
      heading: "If it goes sideways",
      rows: [
        ["The room stalls on the diagnosis",
         "Press H. The block labels appear and the exercise becomes matching instead of diagnosis. A weaker lesson, but a better use of the minutes you have left."],
        ["Someone says the CIO should just mandate it",
         "Take it seriously, because it is the case question. Ask what a mandate is worth when the budget owner agrees in the meeting and then under-resources it for four quarters, and what you would have to believe about your own authority for a mandate to be the right call."],
        ["Someone says the multiplier is arbitrary",
         "Agree. The size of the number is invented. The shape is not: value that sits on a boundary only appears above a threshold no single division can reach alone."],
        ["Someone asks why the divisions do not just talk to each other",
         "They have, and they agree. Everyone thinks the layer should exist. That is the premise, and it changes nothing, which is the uncomfortable part."],
        ["The room gets all three right first time",
         "It happens, and it is usually luck. Press R, run it again with a deliberate mistake on one division, and let them watch the spend climb for nothing."],
        ["You have four minutes, not twelve",
         "Skip the misdiagnosis. Apply the three correct deals in order, stop after the second, and spend what is left on the falling number."]
      ]
    },

    pushback: {
      heading: "What the room tends to ask",
      items: [
        { q: "Isn't this a prisoner's dilemma?",
          a: "Not quite. Nobody defects to get ahead. Each division is choosing what is genuinely best for its own budget, and two of the three are right that the deal as first offered is bad for them. The trap is the threshold: no division can reach it alone, and whoever moves first has paid for a layer that does not exist yet." },
        { q: "Why is partial coordination worse than none?",
          a: "A division that pledges spends real capital out of its own plan and gets nothing back until the layer exists. {worstpair} pledging together produces {worst}, against {baseline} if nobody moves. The money is gone, the threshold is not crossed, and everything still runs at {unfunded}." },
        { q: "Wouldn't the centre just fund the layer itself?",
          a: "Sometimes it can, and then the exercise is about the next shared asset instead of this one. Funding is rarely the hard part. The hard part is who changes how they work once it exists, and that is a commitment rather than a cheque." },
        { q: "The smallest division has the best economics. Why not just tell it what to do?",
          a: "Because it has the best return per dollar in the room and the least standing to ask for anything, and it has been burned before. That combination is why its objection is about trust rather than money. It is the cheapest yes available and the easiest one to lose." },
        { q: "What if two divisions have the same block?",
          a: "That is the normal case. The diagnosis still works, the deals just collapse into two. The blocks land one per division here because the case was written that way." },
        { q: "Where does the technology come into this?",
          a: "It does not. The constraint was never the model, the data or the capital. It was whether a budget owner would commit to something they do not control." }
      ]
    },

    keys: { heading: "Facilitator keys", caption: "Keyboard only. None of this is on screen during the exercise unless you ask for it." },

    close: {
      heading: "Before you stand up",
      body: "Run it once on your own with the room's worst instincts: offer money to everybody, then fix it. Ten minutes of that teaches you the timing of the two pauses, which are the only parts that really go wrong. Press R and the board is clean again. Nothing is stored, nothing carries over, and the same choices always produce the same numbers."
    }
  },

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3", "Select division"],
      ["Q W E", "Apply Sequence / Price / Underwrite to the selected division"],
      ["H",     "Show the block labels, for when the room stalls"],
      ["N",     "Presenter note for the current beat"],
      ["C",     "Close the round"],
      ["R",     "Reset"],
      ["?",     "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
