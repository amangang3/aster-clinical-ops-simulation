/* Every word of copy in the simulation. Nothing here is generated, templated or randomised.
   Kept out of the HTML so that no figure is ever typed into a page.

   {tokens} are substituted at runtime from data/model.js. Division pages get four more
   tokens of their own: {local}, {cross}, {capital} and {pledge}.

   Two rules for anything written in here:
   - In the Aster copy: "division", never group/unit/team, and "shared trial-data layer",
     never system/platform. (The portable framework wording lives in framework-deck.pptx,
     not here.)
   - Never state a ratio or a share that the constants in data/model.js do not produce.
     $95M pool + $20M cross is middling, not smallest; check before writing "most" or "least". */

window.ASTER_SCRIPT = {

  /* ---- The three divisions ----
     Each has a `commit` line, shown the moment it agrees to pay, and a `responses` map for
     every move that does NOT commit it: the moves it does not need (refused), plus — for
     Data & Analytics, which needs two — the "helps, but not yet" line for whichever of the
     pair lands first. The two partial lines are written to read in either order. ---- */
  groups: {
    "site-ops": {
      descriptor: "The biggest division. It needs the layer to reach {cross} it cannot reach on its own.",
      worry: "Cannot change how it works during its Q3–Q4 enrolment peak, with a leadership handover only two quarters away.",
      role: "Runs the network of sites and hospitals that carry out the trials. It is the biggest of the three divisions.",
      measured: "Enrolment against plan, how long a site takes to activate, and cost per patient enrolled.",
      position: [
        "Site Operations is not fighting the money. Its problem is the calendar. Q3 and Q4 are its enrolment peak, the two quarters when it can least afford to change how anything works — and a new technology leader arrives in two quarters, who will inherit whatever gets agreed now.",
        "It is also the biggest division, with {local} of potential upside a year. Six of the nine highest-value workflows run through it, and every one of those six either starts or finishes in another division — Site Operations is where the handoffs land, which is what makes it dependent. It is not short of scale; it is downstream.",
        "Those six workflows are where its {cross} of extra upside sits. Site Operations cannot earn any of it without the shared layer, and it has no data engineering team of its own to build one. It also cannot test what it does not own: when an agent picks up work in another division and hands it back, the part that failed is not on Site Operations' side of the line, and neither is the fix."
      ],
      work_out: "Site Operations has not argued about the amount. Work out what else it needs changed before it will say yes.",
      objection: "We are not against this, and we are not arguing about the money. Q3 and Q4 are our enrolment peak. We cannot change how we work in the two busiest quarters of our year. On top of that, I hand over to my successor in two quarters. Ask me for something that will still be running when they arrive.",
      responses: {
        price:      "Money is not the problem. You would be giving us more to spend in the two quarters when we have the least room to change anything.",
        status:     "A title does not move our enrolment peak. We are not short of standing — we are short of a quarter in which we can change anything.",
        underwrite: "We are not worried about being left exposed. We are worried about the calendar. A guarantee does not move our enrolment peak."
      },
      commit: "So we start after the peak, in stages my successor can pick up? Then yes. We will pay the full share."
    },

    "data-analytics": {
      descriptor: "The only division that can build the layer — and the one already out in front, with a lead it would rather keep than share.",
      worry: "Is already ahead, and does not want to build the other two up to its level and lose the lead it paid for.",
      role: "Collects, validates and analyses the trial data. It is the only division with the engineering depth to build the shared layer.",
      measured: "Data quality, how fast it can answer a question from the trial teams, and delivery against its own five-year platform plan.",
      position: [
        "Data & Analytics is already ahead — not because it had the most to gain, but because it was the furthest along technically when the work started, so it went first. It has funded its own platform, hired the team, and is further along than either of the others. Everything the other two would have to build, it has already built once, its own way. Its worry is not the money — it is that building one shared layer for everyone hands the other two the capability it spent years building, and closes the gap it is counting on.",
        "It is the only division that can build the layer, and the one with the least riding on it: of its {local} of potential upside, only {cross} depends on work that spans divisions — the smallest such stake of the three.",
        "So it is being asked to do the most, level a field it currently leads, and get the least back for it. Going first is also why it depends on the layer least: the others would be moving onto its way of working, not the other way round. Left to its own plan, it would rather keep the lead than share it."
      ],
      work_out: "Data & Analytics is being asked to give up a lead it built and paid for. Work out what would make sharing that lead worth more to it than keeping it.",
      objection: "We are the ones who are ahead. We funded this, we hired the team, and we are further along than either of them. What you are asking is that we build the same capability for two divisions who are behind us, and hand them the head start we paid for. Why would we help them catch up?",
      responses: {
        sequence:   "Time is not our problem — we are the ones who are ready. More time just lets the others close the gap while we wait.",
        underwrite: "We are not exposed to anything; we are ahead. Protecting our downside answers a question we did not ask. Our worry is losing the lead, not carrying a risk.",
        price:      "Paying us for what we built helps — it stops this being a straight giveaway. But money alone still levels the field. If all three run on the same layer, what keeps us the division out in front?",
        status:     "Being named the owner helps — the others would build on our platform, to our rules, rather than around us. But setting the rules without paying for what we already built still asks us to hand years of work over for free. What do we get for the work itself?"
      },
      commit: "So you pay us for the head start we built, and you make us the owner the other two run on — they work to our standard, not to a committee's — we stay out in front, and we get paid for it. Then it is worth more to share the lead than to keep it. We will build it."
    },

    "patient-engagement": {
      descriptor: "The smallest division, and the one whose own numbers move most when the layer is built.",
      worry: "Was burned the last time the centre set a standard, and does not trust that the bill will not land on it again.",
      role: "Finds patients, enrols them, and keeps them in the trial. It is the smallest of the three divisions.",
      measured: "Enrolment yield per campaign, patient retention, and cost per enrolled patient.",
      position: [
        "Patient Engagement has the most to gain and has been burned before. The last time head office set a standard, it rebuilt systems that were working fine, lost two enrolment campaigns, and paid for all of it out of its own budget. Nobody paid it back. That, not the numbers, is what is stopping it.",
        "It is the smallest division, with {local} of potential upside. The layer would add another {cross} from work that spans divisions — half its own upside again, and the best deal of the three for the money.",
        "Its own plans need {capital}, the least of the three, and it is being asked for the smallest share at {pledge}. The economics are not the problem. The memory is."
      ],
      work_out: "Patient Engagement has the most to gain and the least standing to ask for anything. Work out what it needs to hear before it will pay.",
      objection: "The last time head office set a standard, we rebuilt systems that were working fine, lost two enrolment campaigns, and paid for all of it ourselves. The numbers here are good. They were good last time too. That is not what is stopping us.",
      responses: {
        sequence:   "More time does not help. We would spend it waiting to be told the rules had changed again.",
        price:      "We do not need a better price. We need to know that this time the bill does not land on us.",
        status:     "We are not looking for a title or a seat at the table. We are looking for a promise that the cost does not land on us again."
      },
      commit: "So the cost of moving our systems is covered up front, and our access is guaranteed in writing, before we pay anything? Then we are in, and we will be the cheapest yes you get."
    }
  },

  /* ---- Lines the board itself uses ---- */
  system: {
    gate_funded:  "The shared trial-data layer is funded. Every division now runs at full rate, and work that spans divisions starts paying.",
    gate_short:   "{pledged} pledged of {required}. The layer does not get built.",
    nobody_moved: "No division pledged. On its own numbers, none of them was wrong to hold back."
  },

  /* ---- The flow between the pages ---- */
  nav: {
    steps: [
      { href: "index.html",        n: "1", label: "The situation" },
      { href: "instructions.html", n: "2", label: "How it works" },
      { href: "divisions.html",    n: "3", label: "The divisions" },
      { href: "sim.html",          n: "4", label: "The exercise" }
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
      "Aster Life Sciences runs its clinical operations through three divisions, each with its own budget, its own plan and its own targets. All three agree they should build one shared trial-data layer, so their AI agents can work across the divisions instead of stopping at the edge of each one.",
      "Every division has still said no — each for a different, fair reason. One cannot take the disruption right now. One is already ahead and does not want to help the others catch up. One was burned last time and does not trust it will be different. None of them is arguing about the money.",
      "You are {you}, {you_title}. You can make the case, but you cannot commit the money — only a division that owns a budget can put a number in its plan. So you have to work out what each one actually needs, and give it to them out of the one budget you do control: the centre’s."
    ],
    figures: [
      { label: "The ambition",            note: "what you are arguing the three divisions should be worth each year" },
      { label: "Shared trial-data layer", note: "cost to build it — all or nothing" },
      { label: "Their own tech budgets",  note: "what the three had set aside for their own plans" },
      { label: "Work spanning divisions", note: "worth nothing today, and only pays once the layer exists" }
    ],
    do_line: "You are {you}, and you cannot order any of this. You will read the three divisions, work out what each one needs before it will pay its share, and spend the centre\u2019s own budget to give it to them. There are four deals to offer, and matching the right one \u2014 sometimes the right two \u2014 to each division is the whole exercise.",
    do_link: "How the session works",
    begin: "BEGIN"
  },

  /* ---- Instructions, for the people in the room ----
     Written to be read cold by someone who has never seen the case. Plain words only:
     no "boundary", no "realise", no "multiplier". It explains what a deal IS and never
     which division it fits — the diagnosis is the exercise. ---- */
  instructions: {
    title: "How the session works",
    standfirst: "Ten minutes on one screen. Read this first: who you are, what each division is worried about, and what you are being asked to do.",

    you: {
      heading: "Who you are in this exercise",
      body: [
        "You are the case protagonist: {you}, {you_title} of the {unit}. Everyone in the room plays the same person.",
        "You sit on the {council} and can put a proposal on its agenda and argue for it. But you own no budget, and any number that enters a five-year plan has to be committed by the division that will carry it. The three people you are about to read own those plans. You do not, and you cannot set a target for any of them.",
        "What you do control is the centre: the platform, the engineering group, and the budget that pays for both. That budget \u2014 yours, not theirs \u2014 is what you spend to win each division over. So the deals you can offer are things like covering someone's migration cost or crediting work they have already paid for. None of them is \u201corder them to do it\u201d, because that is not available to you."
      ]
    },

    situation: {
      heading: "What is being decided",
      body: [
        "Aster wants to build one shared trial-data layer: a single place where all three divisions keep their trial data, so AI agents can follow a piece of work through the whole Center instead of stopping at the edge of one division.",
        "It costs {infra}, and it is all or nothing — there is no half version and no pilot. Each division has been asked to pay a fixed share out of its own technology budget: {shares}. The three add up to exactly {infra}, and no two of them are enough on their own."
      ],
      note: "The only open question is whether all three divisions will pay their share. All three agree the layer should exist. All three have still said no."
    },

    blocks: {
      heading: "What each division is worried about",
      caption: "Not one of them is arguing about the money or the numbers. Each is holding back for a different, human reason — and that reason is what you have to answer. Two things shape how badly each one needs this: where it sits in the flow of work, and how early it started. The division that sits where the handoffs land needs it most. The division that started first needs it least — it is already working the way it would have to work anyway.",
      note: "Read the three division briefs next; this is only the headline of each. Working out which deal answers which worry is the exercise."
    },

    numbers: {
      heading: "Where the numbers on the board come from",
      caption: "Two rules explain everything you will see. You do not need the arithmetic — just these.",
      rows: [
        ["Each division has a potential upside",
         "What its AI agents could add each year, if they could reach every piece of data they needed. The three come to {pools} between them."],
        ["Without the layer, most of it is out of reach",
         "An agent can only use data its own division owns, so any work that crosses into another division stops halfway — and half a workflow is worth nothing. Each division runs at just {unfunded} of its upside, which is why the board opens at {baseline}, not {pools}."],
        ["The layer unlocks the rest — but only if all three pay",
         "Build it and every division earns at full rate, and {cross} of work that spans divisions starts paying for the first time, taking the total to {ceiling}. Two divisions paying builds nothing at all."]
      ],
      note: "So a division that pays its share is worse off straight away, and gets nothing back unless the other two pay too. That is the whole trap."
    },

    job: {
      heading: "What you are asked to do",
      body: [
        "Your job is to work out what each division needs in order to say yes, and then offer it — spending your own budget, not theirs.",
        "You have four deals. Two of the divisions need one deal each. One division needs two before it will move: a single deal helps, but does not close it."
      ]
    },

    moves: {
      heading: "The four deals",
      caption: "A deal changes the terms a division is offered. It never changes the amount that division pays.",
      money_heading: "Your budget, and theirs",
      money: [
        ["Their budget — the share", "Each division pays a fixed share of the {infra} layer out of its own technology budget: {shares}. You are not negotiating these amounts — you are trying to get them agreed."],
        ["Your budget — the deal cost", "What it costs you to win each agreement, out of the centre\u2019s own platform and engineering budget. It does not go into the layer and does not change the total. It is simply money you spend, and the board shows it as spend."]
      ],
      note: "There is no partial credit and no refund. A deal offered to a division it does not suit costs you the same and changes nothing."
    },

    rules: {
      heading: "The rules, and what a deal does",
      items: [
        "You offer a division a deal. The cost leaves your budget the moment you offer it, before anyone knows whether it worked.",
        "If it is not what that division needed, it says no and nothing on the board moves. Your money is gone.",
        "If it answers the division, it agrees to pay its share: the funding bar rises and its own number dips slightly, because it has just spent part of its budget.",
        "A deal that helps but is not enough leaves the division where it was — it still has not paid.",
        "Each deal can be offered to each division once, agreement is permanent, and nothing can be taken back.",
        "The layer only gets built if all three divisions agree."
      ]
    },

    watch: {
      heading: "What to watch",
      body: [
        "Watch the enterprise value at the top of the board as divisions agree, one by one. It does not move the way most people expect, and working out why is the point of the exercise.",
        "If you have been given a division to play, watch its own number as well as the total."
      ]
    },

    ready: "READ THE DIVISIONS"
  },

  /* ---- Labels the board and the scoreboard put on the two kinds of value ---- */
  board: {
    own:   "Its own work",
    span:  "Work spanning divisions",
    total: "Total",
    meter: "Shared trial-data layer — {paid} committed of the {needed} it costs",
    funded:     "Funded",
    not_funded: "Not funded"
  },

  /* ---- The four deals in plain words. What each deal IS, never which division it
     suits: that is what the room is there to work out. ---- */
  deals: {
    sequence: {
      name: "Change the timing",
      what: "They pay the same share, but later, and in stages rather than all at once. The amount does not change — only when it lands."
    },
    price: {
      name: "Pay for the head start",
      what: "Credit the work they have already paid for and guarantee them the demand, so sharing the layer earns them money instead of just levelling the field."
    },
    status: {
      name: "Name them the owner",
      what: "Make them the owner of the shared layer, so the other two build on their platform and on the rules they set for it — how far an agent can go on its own, when it has to stop and ask, what good enough looks like. They keep their lead instead of dissolving it into a shared asset."
    },
    underwrite: {
      name: "Cover their losses",
      what: "A cap on what they can lose, agreed conditions for pulling out, and the cost of moving their systems paid up front."
    }
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
    ask_line: "Pay {pledge} towards the {infra} layer, out of the {capital} it had set aside for its own plans.",
    figures: [
      { key: "local_pool",   label: "Value pool",             note: "what its agents could add each year, at full rate" },
      { key: "cross_value",  label: "Work spanning divisions", note: "extra value, and only once the layer is built" },
      { key: "capital_need", label: "Its own tech budget",    note: "what its own plans need" },
      { key: "pledge",       label: "Share of the layer",     note: "what it is being asked to pay" }
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
        body: "Wait for the animation to finish. Then: nothing about these three divisions changed. The third share took the total to {infra}, so every division now runs at full rate and the work that spans them starts paying."
      },
      closed: {
        title: "Round closed",
        body: "Read the ledger out, wasted spend included. Then ask which of these three divisions people recognise from their own company."
      }
    }
  },

  /* ---- Scoreboard ---- */
  scoreboard: {
    title: "The round",
    ledger_heading: "The deal ledger",
    ledger_empty: "No deals were offered.",
    bought_nothing: "bought nothing",
    table_heading: "Where the value landed",
    back: "BACK TO THE BOARD"
  },

  /* ---- Facilitator guide ---- */
  facilitate: {
    title: "Facilitator guide",
    standfirst: "How to run the exercise cold: where each page fits, what to do and say at each beat, the answer key, and the questions the room tends to ask.",
    warning: "This page gives away the answers. Do not put it on the projector.",

    flow: {
      heading: "Where each page fits",
      caption: "Four pieces, in the order you use them, then the deck to close.",
      items: [
        { label: "1 · The situation", href: "index.html",
          body: "Put it up while the room settles. It leads with the three divisions and what stops each one; the set-up figures sit under it, quietly." },
        { label: "2 · How it works", href: "instructions.html",
          body: "Written for the room, not for you. Send it round beforehand, or spend a minute on it at the start. It explains the {unfunded} multiplier, which is the one thing people need before the board makes sense, and it does not name any of the blocks." },
        { label: "3 · The divisions", href: "divisions.html",
          body: "A page per division: what it does, what it is measured on, its four numbers, and what it has said. This is the material the room diagnoses from, so it is worth reading before the exercise, not during it." },
        { label: "4 · The exercise", href: "sim.html",
          body: "The session itself. One screen, driven from the keyboard so you can keep facing the room. When you close the round, the scoreboard shows the outcome, the ledger and the wasted spend. Nothing is stored and nothing is random, so the same choices always produce the same numbers." }
      ],
      deck: { label: "The deck, to close", body: "framework-deck.pptx is two slides: the framework (the forces for and against a shared asset), then the framework applied — blocker to move, all four. Project them once the round is closed. This is where the framework gets named; the class-facing pages never do." }
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
         "Ask what each division needs before it will pledge. Most rooms reach for money first, because money is what executives are used to offering. It commits nobody on its own now — it is only half of what the division out in front needs, and it is wrong for the other two."],
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
         "Close on the two-slide framework deck.",
         "Ask the transfer question before you show the framework: which of these three is your division, and which block are you actually arguing? If anyone asks why this is an agentic problem rather than the shared-services problem their company had in 1998, that is the right question — answer it live in three lines: agents remove partial credit (half a workflow is worth nothing), agents act rather than report (someone is accountable when it acts wrongly), and capability now arrives faster than the agreements to use it."]
      ]
    },

    key: {
      heading: "The answer key",
      caption: "One deal answers each block — except the division out in front, which needs two, PRICE and STATUS, and does not commit until both are in. Every other deal costs full price and buys nothing. If the room stalls, H puts the block labels on screen and turns the exercise into matching.",
      tell_heading: "The tell",
      tells: {
        "site-ops":           "“We are not against this,” followed by two dates. The objection is about the calendar, and the division is managing a handover, not defending a position.",
        "data-analytics":     "“Why would we help them catch up?” The division is ahead and means to stay there, so the answer has to let it keep the lead — pay for the head start (PRICE) and make it the owner the others run on (STATUS). One without the other only half-answers it.",
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
        ["Someone says the centre should just mandate it",
         "This is the case question, so do not close it down — and do not let the exercise be read as an argument against it either. Both halves are live. For it: no division could reach the funding line alone, the upside that matters cuts across all three divisions, and voluntary adoption produced the pilot trap on screen. Against it: nobody here can mandate anything, a P&L owner can agree in the room and under-resource it for four quarters, and two of the three were right that the deal as first offered was bad for them. The exercise shows what the negotiation costs. It does not settle whether you should have had to run it."],
        ["Someone says the multiplier is arbitrary",
         "Agree about the size — {unfunded} is invented. Do not concede the shape. Software that covers half your data gives you half an answer, and half an answer is still worth having. An agent that can reach half a workflow does not finish it, so a crossing workflow is worth nothing at all until the layer exists. The cap is a property of automation, not a convenience of the model."],
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

    handoff: {
      heading: "Where this sits in the session",
      body: "The room has already argued the case question: one enterprise-wide target held across all three divisions, or each division setting its own inside its own plan with the centre offering support. This exercise comes after that argument and before the practitioner conversation that follows it. Its job is not to settle the question — it is to make the room feel what the second option costs when the shared layer does not get built, and what informal influence costs when you have no authority to compel anyone. Both of those are what the practitioner will be asked about. Send the room into that conversation with the pilot trap and the price of three negotiations fresh, not with a conclusion."
    },

    close: {
      heading: "Before you stand up",
      body: "Run it once on your own with the room's worst instincts: offer money to everybody, then fix it. Ten minutes of that teaches you the timing of the two pauses, which are the only parts that really go wrong. Press R and the board is clean again. Nothing is stored, nothing carries over, and the same choices always produce the same numbers."
    }
  },

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3",   "Select division"],
      ["Q W E R", "Apply Sequence / Price / Status / Underwrite to the selected division"],
      ["H",       "Show the block labels, for when the room stalls"],
      ["N",       "Presenter note for the current beat"],
      ["C",       "Close the round"],
      ["⌫",       "Reset"],
      ["?",       "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
