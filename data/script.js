/* Every word of copy in the simulation. Nothing here is generated, templated or randomised.
   Kept out of the HTML so that no sentence is ever typed into a page.

   {tokens} are substituted at runtime from data/model.js. Only a handful exist, and none is a
   budget figure: {you}, {you_title}, {unit}, {council}, {ambition}.

   Two rules for anything written in here:
   - In the Aster copy: "division", never group/unit/team, and "shared trial-data layer",
     never system/platform. (The portable framework wording lives in framework-deck.pptx.)
   - The exercise is number-free. Do not reintroduce budgets, shares, pools or percentages —
     it is about matching the right deal to each division and realising the shared upside. */

window.ASTER_SCRIPT = {

  /* ---- The three divisions ----
     Each has a `commit` line, shown the moment it agrees, and a `responses` map for every move
     that does NOT commit it: the moves it does not need (refused), plus — for Data & Analytics,
     which needs two — the "helps, but not yet" line for whichever of the pair lands first.
     The two partial lines are written to read in either order. ---- */
  groups: {
    "site-ops": {
      descriptor: "The biggest division. It runs the site and hospital network, and it sits where work from the other two lands.",
      worry: "Cannot change how it works during its Q3–Q4 enrolment peak, with a leadership handover only two quarters away.",
      role: "Runs the network of sites and hospitals that carry out the trials. It is the biggest of the three divisions.",
      measured: "Enrolment against plan, how long a site takes to activate, and cost per patient enrolled.",
      position: [
        "Site Operations is not fighting the money. Its problem is the calendar. Q3 and Q4 are its enrolment peak, the two quarters when it can least afford to change how anything works — and a new technology leader arrives in two quarters, who will inherit whatever gets agreed now.",
        "It is where the handoffs land. Most of its highest-value work either starts or finishes in another division, so it is dependent by position, not short of scale — it is downstream.",
        "None of that crossing work can run without the shared layer, and Site Operations has no data engineering team of its own to build one. It also cannot test what it does not own: when an agent picks up work in another division and hands it back, the part that failed is not on its side of the line, and neither is the fix."
      ],
      work_out: "Site Operations has not argued about the amount. Work out what else it needs changed before it will say yes.",
      objection: "We are not against this, and we are not arguing about the money. Q3 and Q4 are our enrolment peak. We cannot change how we work in the two busiest quarters of our year. On top of that, I hand over to my successor in two quarters. Ask me for something that will still be running when they arrive.",
      responses: {
        price:  "Money is not the problem. You would be giving us more to spend in the two quarters when we have the least room to change anything.",
        status: "A title does not move our enrolment peak. We are not short of standing — we are short of a quarter in which we can change anything.",
        trust:  "Roadshows and success stories do not move our enrolment peak. We are short of a quarter we can change, not short of belief."
      },
      commit: "So we start after the peak, in stages my successor can pick up? Then yes. We are in."
    },

    "data-analytics": {
      descriptor: "The only division that can build the layer — and the one already out in front, with a lead it would rather keep than share.",
      worry: "Is already ahead, and does not want to build the other two up to its level and lose the lead it paid for.",
      role: "Collects, validates and analyses the trial data. It is the only division with the engineering depth to build the shared layer.",
      measured: "Data quality, how fast it can answer a question from the trial teams, and delivery against its own five-year platform plan.",
      position: [
        "Data & Analytics is already ahead — not because it had the most to gain, but because it was the furthest along technically when the work started, so it went first. It has funded its own platform, hired the team, and is further along than either of the others. Everything the other two would have to build, it has already built once, its own way. Its worry is not the money — it is that building one shared layer for everyone hands the other two the capability it spent years building, and closes the gap it is counting on.",
        "It is the only division that can build the layer, and the one with the least riding on it: less of its value depends on work that spans divisions, so it needs the shared layer less than either of the others.",
        "So it is being asked to do the most, level a field it currently leads, and get the least back for it. Going first is also why it depends on the layer least: the others would be moving onto its way of working, not the other way round. Left to its own plan, it would rather keep the lead than share it."
      ],
      work_out: "Data & Analytics is being asked to give up a lead it built and paid for. Work out what would make sharing that lead worth more to it than keeping it.",
      objection: "We are the ones who are ahead. We funded this, we hired the team, and we are further along than either of them. What you are asking is that we build the same capability for two divisions who are behind us, and hand them the head start we paid for. Why would we help them catch up?",
      responses: {
        sequence: "Time is not our problem — we are the ones who are ready. More time just lets the others close the gap while we wait.",
        trust:    "We do not need convincing that it works — we built it. Selling it to the sceptics is someone else’s job, not ours.",
        price:    "Paying us for what we built helps — it stops this being a straight giveaway. But money alone still levels the field. If all three run on the same layer, what keeps us the division out in front?",
        status:   "Being named the owner helps — the others would build on our platform, to our rules, rather than around us. But setting the rules without paying for what we already built still asks us to hand years of work over for free. What do we get for the work itself?"
      },
      commit: "So you pay us for the head start we built, and you make us the owner the other two run on — they work to our standard, not to a committee’s — we stay out in front, and we get paid for it. Then it is worth more to share the lead than to keep it. We will build it."
    },

    "patient-engagement": {
      descriptor: "The smallest division, and the one with the most to gain from the shared layer.",
      worry: "Does not believe the internal organisation can actually deliver something this big, having watched central initiatives stall before.",
      role: "Finds patients, enrols them, and keeps them in the trial. It is the smallest of the three divisions.",
      measured: "Enrolment yield per campaign, patient retention, and cost per enrolled patient.",
      position: [
        "Patient Engagement has the most to gain, and the least faith that it will actually arrive. It has watched the centre promise big internal initiatives before and seen them stall. That, not the numbers, is what is stopping it.",
        "It is the smallest division, but proportionally the shared layer is worth more to it than to either of the others — most of what it could do depends on data another division holds.",
        "It is being asked for the least of the three, and it stands to gain the most. The economics are not the problem. The belief is."
      ],
      work_out: "Patient Engagement has the most to gain and the least standing to ask for anything. Work out what it needs to hear before it will commit.",
      objection: "We have watched the centre promise big things before, and stall. It is not the money, and it is not the numbers — those are good. We just do not believe this organisation can actually pull something like this off. Show us it can.",
      responses: {
        sequence: "More time does not change whether we believe it will work. We would just spend it waiting to see if it does.",
        price:    "A better price does not make the thing more likely to get built. We are not holding out for money.",
        status:   "We are not looking for a title or a seat at the table. We need to believe this organisation can actually deliver first."
      },
      commit: "So you will show it working — roadshows, the early wins where we can see them, the outside companies who have already done it — until we believe this organisation can deliver? Then we are in, and we will be the easiest yes you get."
    }
  },

  /* ---- Lines the board itself uses ---- */
  system: {
    opening:     "Read the three objections. Work out what each division needs before it will commit.",
    partial:     "Committed — but the shared layer needs all three. Until the last one, nothing runs across the divisions.",
    gate_funded: "All three have committed. The shared trial-data layer is built, and work now runs across the divisions — the upside is realised.",
    closed_note: "Round closed — press Backspace to reset."
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
      "Aster Life Sciences runs its clinical operations through three divisions, each with its own plan and its own targets. All three agree they should build one shared trial-data layer, so their AI agents can work across the divisions instead of stopping at the edge of each one. The upside they are leaving on the table is worth about {ambition}.",
      "Every division has still said no — each for a different, fair reason. One cannot take the disruption right now. One is already ahead and does not want to help the others catch up. One does not believe the organisation can actually deliver it. None of them is arguing about the money.",
      "You are {you}, {you_title}. You cannot order any of this — you own no division and cannot commit anyone’s plan. What you can do is work out what each one needs to say yes, and give it to them. There are four deals you can offer."
    ],
    do_line: "You will read the three divisions, work out what each needs before it will commit, and offer it. There are four deals — matching the right one, sometimes the right two, to each division is the whole exercise. Only when all three commit does the shared layer get built and the upside get realised.",
    do_link: "How the session works",
    begin: "BEGIN"
  },

  /* ---- Instructions, for the people in the room ----
     Number-free. It explains who the room is playing and that the layer needs all three, and
     it names none of the blocks — the diagnosis is the exercise. ---- */
  instructions: {
    title: "How the session works",
    standfirst: "Ten minutes on one screen. Read this first: who you are, what each division is worried about, and what you are being asked to do.",

    you: {
      heading: "Who you are in this exercise",
      body: [
        "You are the case protagonist: {you}, {you_title} of the {unit}. Everyone in the room plays the same person.",
        "You sit on the {council} and can put a proposal on its agenda and argue for it. But you own no budget, and any commitment that enters a five-year plan has to be made by the division that will carry it. The three people you are about to read own those plans. You do not, and you cannot set a target for any of them.",
        "What you do control is the centre: the platform, the engineering group, and the influence that comes with them. That is what you spend to win each division over. So the deals you can offer are things like crediting work a division has already paid for, or winning over the ones who do not yet believe it will deliver — never “order them to do it”, because that is not available to you."
      ]
    },

    situation: {
      heading: "What is being decided",
      body: [
        "Aster wants to build one shared trial-data layer: a single place where all three divisions keep their trial data, so AI agents can follow a piece of work through the whole Center instead of stopping at the edge of one division.",
        "It is all or nothing, and it needs all three divisions. No single division can build it alone, two out of three is not enough, and until the third commits nothing runs across them."
      ],
      note: "The only open question is whether all three divisions will commit. All three agree the layer should exist. All three have still said no."
    },

    blocks: {
      heading: "What each division is worried about",
      caption: "Not one of them is arguing about the money. Each is holding back for a different, human reason — and that reason is what you have to answer. Two things shape how badly each one needs this: where it sits in the flow of work, and how early it started. The division that sits where the handoffs land needs it most. The division that started first needs it least — it is already working the way it would have to work anyway.",
      note: "Read the three division briefs next; this is only the headline of each. Working out which deal answers which worry is the exercise."
    },

    job: {
      heading: "What you are asked to do",
      body: [
        "Your job is to work out what each division needs in order to say yes, and then offer it.",
        "You have four deals. Two of the divisions need one deal each. One needs two before it will move: a single deal helps, but does not close it."
      ]
    },

    moves: {
      heading: "The four deals",
      caption: "A deal changes the terms a division is offered. Offer the wrong one and it changes nothing — the division says no, and the effort is spent for nothing.",
      note: "There is no partial credit and no refund. A deal offered to a division it does not suit changes nothing, and nothing can be taken back."
    },

    rules: {
      heading: "The rules",
      items: [
        "You offer a division a deal. If it is not what that division needed, it says no and nothing moves.",
        "A deal that helps but is not enough leaves the division where it was — it still has not committed.",
        "When a deal answers a division, it commits, and stays in for the rest of the round.",
        "Each deal can be offered to each division once, and nothing can be taken back.",
        "The shared layer is built — and the upside is realised — only if all three divisions commit."
      ]
    },

    watch: {
      heading: "What to watch",
      body: [
        "Watch the shared upside at the top of the board. It stays locked as divisions commit one by one, and only unlocks when the third one does. Working out why is the point of the exercise.",
        "Two divisions committing realises nothing. That is not a glitch — it is the point."
      ]
    },

    ready: "READ THE DIVISIONS"
  },

  /* ---- Labels the board and scoreboard use ---- */
  board: {
    upside_heading: "Cross-division upside",
    count_heading:  "Divisions committed",
    offered_heading:"Deals offered",
    locked:   "Locked",
    realized: "Realised",
    locked_sub:   "Nothing runs across the divisions until all three commit.",
    partial_sub:  "Still locked. One or two committing changes nothing — work that spans divisions cannot run until the third commits.",
    realized_sub: "The shared layer is built. Work now runs across all three divisions.",
    meter:     "The shared trial-data layer needs all three divisions",
    built:     "Built",
    not_built: "Not built",
    committed: "Committed",
    defending: "Defending",
    offered_wasted: "{n} changed nothing"
  },

  /* ---- The four deals in plain words. What each deal IS, never which division it suits:
     that is what the room is there to work out. ---- */
  deals: {
    sequence: {
      name: "Change the timing",
      what: "They commit the same way, but later, and in stages rather than all at once — and each stage is a chance to negotiate incremental improvements instead of committing to everything up front."
    },
    price: {
      name: "Pay for the head start",
      what: "Credit the work they have already paid for and guarantee them the demand, so sharing the layer earns them something instead of just levelling the field."
    },
    status: {
      name: "Name them the owner",
      what: "Make them the owner of the shared layer, so the other two build on their platform and on the rules they set for it — how far an agent can go on its own, when it has to stop and ask, what good enough looks like. They keep their lead instead of dissolving it into a shared asset."
    },
    trust: {
      name: "Build the belief",
      what: "Run roadshows, celebrate the internal wins as they land, and point to the outside companies who have already done it — so the doubt that this organisation can deliver gives way to belief."
    }
  },

  /* ---- The divisions hub ---- */
  divisions: {
    title: "The three divisions",
    standfirst: "Read all three before the exercise starts. Each page covers what the division does, what it is measured on, where it stands, and what it has said about committing.",
    cta: "Read the full brief",
    labels: {
      role: "What it does",
      measured: "Measured on",
      position: "Where it stands",
      said: "What it has said",
      work_out: "What to work out",
      ask: "What it is being asked for"
    },
    ask_line: "Commit its share to building the shared trial-data layer — its own plan, its own budget, in service of something that only pays once all three commit.",
    next: "Next division",
    back: "All three divisions"
  },

  /* ---- Presenter note on the board, toggled with N ---- */
  notes: {
    heading: "Presenter note",
    hint: "N hides this. It shows on the projector as well, so use it in rehearsal or on a second screen.",
    beats: {
      opening: {
        title: "Nothing offered yet",
        body: "Read the three objections out, or ask three people to read them. Then ask what each division needs before it will commit. Do not name the blocks."
      },
      probing: {
        title: "Deals offered, nothing moved",
        body: "A deal has been offered and nothing has committed. Say that once, then read the objection again and ask what it is actually asking for."
      },
      first: {
        title: "One division has committed",
        body: "Say what the deal answered. Then send the room back to the other two objections."
      },
      pivot: {
        title: "Two committed, and nothing has moved",
        body: "Stop and point at the upside — still locked. Two divisions did the right thing and nothing runs across them yet. Let the room notice it before you explain it."
      },
      funded: {
        title: "The upside is realised",
        body: "Wait for the reveal to finish. Then: nothing about these three divisions changed. The third commitment built the layer, and the work that spans them can finally run."
      },
      closed: {
        title: "Round closed",
        body: "Read the ledger out, the deals that changed nothing included. Then ask which of these three divisions people recognise from their own company."
      }
    }
  },

  /* ---- Scoreboard ---- */
  scoreboard: {
    verdict_all:          "All three committed. The shared layer is built, and the cross-division upside is realised.",
    verdict_partial:      "Not all three committed, so the layer was never built and nothing runs across the divisions.",
    verdict_partial_note: "The divisions that did commit realised nothing for it. Partial coordination buys nothing — the upside is all or nothing.",
    verdict_none:         "No division committed. On its own numbers, none of them was wrong to hold back.",
    table_heading:  "Where each division landed",
    ledger_heading: "The deal ledger",
    ledger_empty:   "No deals were offered.",
    changed_nothing:"changed nothing",
    back: "BACK TO THE BOARD"
  },

  /* ---- Facilitator guide ----
     This runs as an in-class small-group exercise: faculty gives an intro, the room splits
     into threes, and each group works the simulation on its own laptop, then reconvenes. ---- */
  facilitate: {
    title: "Facilitator guide",
    standfirst: "How to run this in class: the intro to give, how to put the room into groups of three, and what to draw out when they come back together.",
    warning: "This page has the answers on it. It is for you, not the groups — do not send it round with the exercise.",

    intro: {
      heading: "The intro to give the class",
      lead: "Read or paraphrase this to the whole room before you split it into groups. Two minutes, no slides needed.",
      body: [
        "For the next twenty minutes you are all the same person: {you}, {you_title} of Aster Life Sciences’ Global Clinical Operations Center. Aster runs its clinical work through three divisions, each with its own plan and its own targets. All three agree they should build one shared trial-data layer, so their AI agents can work across the divisions instead of stopping at the edge of each one. The upside on the table is worth about {ambition}.",
        "Every division has still said no — each for a different, human reason, and none of them about the money. Your job is to work out what each one needs in order to say yes, and offer it. But you cannot order anyone: you own no division and cannot commit anyone’s plan. All you can do is offer deals, and there are four of them.",
        "In your group, read the three divisions, then open the exercise and try to get all three to commit. Watch what it takes — and watch what happens when only one or two of them do."
      ]
    },

    run: {
      heading: "How to run it",
      caption: "About twenty minutes: a two-minute intro, ten to fifteen in groups, and the rest reconvened.",
      steps: [
        "Give the intro above to the whole room.",
        "Split the room into groups of three, one laptop per group, opened to the exercise site.",
        "Each group reads the three division briefs, then works the exercise: pick a division, offer it a deal, and see how it responds. The goal is to get all three to commit so the shared upside is realised.",
        "Give them ten to fifteen minutes and circulate. If a group stalls, tell them to press H — the board will name what is blocking each division and turn the exercise into matching.",
        "Reconvene. Walk the answer key, draw out the two moments below, and open the discussion."
      ]
    },

    flow: {
      heading: "What each group works through",
      caption: "Every group has this on one laptop and moves through it in order. The pages name none of the blocks — the diagnosis is the exercise.",
      items: [
        { label: "1 · The situation", href: "index.html",
          body: "The scenario and the three divisions. Where each group starts." },
        { label: "2 · How it works", href: "instructions.html",
          body: "The rules of the exercise and, in one line each, what every division is worried about. Groups should read this before they touch the board." },
        { label: "3 · The divisions", href: "divisions.html",
          body: "A page per division — what it does, where it stands, and what it has said. This is the material each group diagnoses from." },
        { label: "4 · The exercise", href: "sim.html",
          body: "The board itself. The group clicks a deal onto a division; if it fits, the division commits. All three commit and the shared upside flips from locked to realised. Closing the round shows what worked and what changed nothing." }
      ]
    },

    key: {
      heading: "The answer key",
      caption: "One deal answers each block — except the division out in front, which needs two, PRICE and STATUS, and does not commit until both are in. Every other deal changes nothing. Keep this to yourself; the board’s H key gives groups the block labels if they stall.",
      tell_heading: "The tell",
      tells: {
        "site-ops":           "“We are not against this,” followed by two dates. The objection is about the calendar, and the division is managing a handover, not defending a position.",
        "data-analytics":     "“Why would we help them catch up?” The division is ahead and means to stay there, so the answer has to let it keep the lead — pay for the head start (PRICE) and make it the owner the others run on (STATUS). One without the other only half-answers it.",
        "patient-engagement": "“We do not believe it will work.” The objection is faith in the organisation, not money — which is why a better price answers a question nobody asked. What moves them is seeing it delivered: internal wins they can point to, and outside proof."
      }
    },

    moments: {
      heading: "What to draw out in the debrief",
      items: [
        { title: "The upside staying locked",
          body: "Ask the groups what happened when two divisions committed and the third had not. The upside stayed locked and nothing ran across them — two divisions did what was asked, spent real effort and political capital, and realised nothing. Neither made a mistake. That is what a pilot looks like from the centre: effort spent, capability given up, and still nothing realised. This is the point of the exercise; give it room." },
        { title: "The reveal, and reaching for money",
          body: "Most groups reach for money first, on everyone — it is what executives are used to offering, and it commits nobody. Then the upside flips from locked to realised only on the third commitment. Make one point: nothing about the three divisions changed at the end, only the last commitment did. The constraint was never money; it was the agreements." }
      ]
    },

    trouble: {
      heading: "If a group gets stuck",
      rows: [
        ["A group cannot diagnose a division",
         "Tell them to press H. The board labels what is blocking each division and the exercise becomes matching. A weaker lesson, but it keeps them moving."],
        ["A group offers money to everyone",
         "Let it ride. It commits nobody, and they will feel the effort spent for nothing. That is the intended first mistake, and it is worth naming in the debrief."],
        ["A group gets all three first try",
         "Ask them to reset — Backspace — and get one division deliberately wrong, so they can see the upside stay locked and feel why partial coordination buys nothing."],
        ["You are short on time",
         "Have groups skip the briefs, open the exercise, and use the hint (H). They lose the diagnosis but still see the all-or-nothing."]
      ]
    },

    pushback: {
      heading: "Questions to reconvene on",
      items: [
        { q: "Isn't this a prisoner's dilemma?",
          a: "Not quite. Nobody defects to get ahead. Each division is choosing what is genuinely best for its own plan, and two of the three are right that the deal as first offered is bad for them. The trap is the all-or-nothing: no division can build the layer alone, and whoever moves first has committed to something that does not exist yet." },
        { q: "Why is partial coordination worse than none?",
          a: "A division that commits spends real effort and political capital and gets nothing back until the layer exists. Two committing realises nothing: the work that crosses between them still cannot run. The effort is spent, the layer is not built, and everything still stops at the edge of each division." },
        { q: "Wouldn't the centre just fund the layer itself?",
          a: "Sometimes it can, and then the exercise is about the next shared asset instead of this one. Money is rarely the hard part. The hard part is who changes how they work once it exists, and that is a commitment rather than a cheque." },
        { q: "The smallest division has the most to gain. Why not just tell it what to do?",
          a: "Because it has the most to gain proportionally and the least standing to ask for anything, and it does not yet believe the organisation can deliver. That combination is why its objection is about belief rather than money. It is the easiest yes available and the easiest one to lose." },
        { q: "Where does the technology come into this?",
          a: "It does not. The constraint was never the model, the data or the capital. It was whether a division would commit to something they do not control." }
      ]
    },

    keys: {
      heading: "Driving the board",
      caption: "Groups just click the deals — no keyboard needed. The keys below are optional, for driving it yourself from the front. The one worth telling groups about is H, the hint.",
      note: "1 2 3 select a division · Q W E R offer Sequence / Price / Status / Trust-building · H shows the block labels · C closes the round · Backspace resets."
    },

    handoff: {
      heading: "Where this sits in the session",
      body: "The room has already argued the case question: one enterprise-wide target held across all three divisions, or each division setting its own inside its own plan with the centre offering support. This exercise comes after that argument and before the practitioner conversation that follows it. Its job is not to settle the question — it is to let each group feel what division-led adoption costs when the shared layer does not get built, and what informal influence costs when you have no authority to compel anyone. Send the room into the practitioner conversation with the pilot trap fresh, not with a conclusion."
    },

    close: {
      heading: "Before class",
      body: "Run it once yourself with the room's worst instinct: offer money to everyone, then fix it. That is the mistake most groups make, and seeing it once tells you what to listen for as you circulate. Press Backspace to reset; nothing is stored, nothing carries over, and the same choices always produce the same outcome."
    }
  },

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3",   "Select division"],
      ["Q W E R", "Apply Sequence / Price / Status / Trust-building to the selected division"],
      ["H",       "Show the block labels, for when the room stalls"],
      ["N",       "Presenter note for the current beat"],
      ["C",       "Close the round"],
      ["⌫",       "Reset"],
      ["?",       "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
