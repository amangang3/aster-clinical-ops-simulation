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

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3", "Select division"],
      ["Q W E", "Apply Sequence / Price / Underwrite to the selected division"],
      ["H",     "Toggle the block labels — the hint, for when the room stalls"],
      ["C",     "Close the round"],
      ["R",     "Reset"],
      ["?",     "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
