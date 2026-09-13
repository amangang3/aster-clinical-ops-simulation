/* Every word of copy in the simulation. Nothing here is generated, templated or randomized.
   Kept out of the HTML so that no sentence is ever typed into a page.

   {tokens} are substituted at runtime from data/model.js. Only a handful exist, and none is a
   budget figure: {you}, {you_title}, {unit}, {council}, {ambition}.

   Two rules for anything written in here:
   - In the Aster copy: "division", never group/unit/team, and "shared trial-data layer",
     never system/platform. (The portable framework wording lives in framework-deck.pptx.)
   - The exercise is number-free. Do not reintroduce budgets, shares, pools or percentages —
     it is about matching the right deal to each division and realizing the shared upside. */

window.ASTER_SCRIPT = {

  /* ---- The three divisions ----
     Each has a `commit` line, shown the moment it agrees, and a `responses` map for every move
     that does NOT commit it: the moves it does not need (refused), plus — for Data & Analytics,
     which needs two — the "helps, but not yet" line for whichever of the pair lands first.
     The two partial lines are written to read in either order. ---- */
  groups: {
    "site-ops": {
      descriptor: "The biggest division. It runs the site and hospital network. Most of its highest-value work starts or finishes in another division, and the layer would let an agent follow that work all the way through.",
      worry: "Cannot change how it works through its Q3 and Q4 enrollment peak, and hands over to a new leader two quarters from now.",
      role: "Runs the network of sites and hospitals that carry out the trials. It is the biggest of the three divisions.",
      measured: "Enrollment against plan, how long a site takes to activate, and cost per patient enrolled.",
      position: [
        "Site Operations has a calendar problem. Q3 and Q4 are its enrollment peak, the two quarters when it can least afford to change how anything works. A new technology leader arrives in two quarters and inherits whatever gets agreed now. The money has not come up.",
        "It sits downstream. Most of its highest-value work starts or finishes in another division, so it depends on the other two by position. It is the largest division in the Center and still the most dependent.",
        "None of that crossing work runs without the shared layer. The layer is what lets an agent carry a piece of work out of Site Operations, through another division, and back. Site Operations also cannot test what it does not own. When an agent picks up work in another division and hands it back, the failure sits on the other side of the line, and so does the fix."
      ],
      work_out: "Site Operations has not argued about money. Work out what else has to change before it will say yes.",
      objection: "We are not against this, and we are not arguing about money. Q3 and Q4 are our enrollment peak. We cannot change how we work in the two busiest quarters of our year. I also hand over to my successor in two quarters. Ask me for something that will still be running when they arrive.",
      responses: {
        price:  "Money is not the problem. A better funding deal still lands in the two quarters where we have the least room to change anything.",
        status: "A title does not move our enrollment peak. We have standing. What we do not have is a quarter in the next year where we can afford to change how we work.",
        trust:  "Roadshows and success stories do not move our enrollment peak. We already believe it will work. Show us the quarter where we can absorb the change and we will talk."
      },
      commit: "So we start after the peak and roll it out in stages, with the handover falling between two of them, so my successor walks into something already running? Then yes. We are in."
    },

    "data-analytics": {
      descriptor: "The division that went furthest, earliest. It already works the way the layer would make everyone work, so the layer is worth less to it than to anyone else. It would rather the other two stayed where they are.",
      worry: "Is already ahead, and does not want to pay the same share as the other two for a build that brings them up to its level.",
      role: "Collects, validates and analyzes the trial data. It went furthest, earliest, on a data capability of its own.",
      measured: "Data quality, how fast it can answer a question from the trial teams, and delivery against its own five-year data plan.",
      position: [
        "Data & Analytics went first because it was the furthest along technically when the work started. It funded the capability it runs on today through central engineering, and it is ahead of both the others. Everything the other two still need, it has already paid for once, its own way. It is now asked to fund the new build at the same share as divisions that will gain far more from it, and that build brings them up to where it already is.",
        "Less of its value depends on work that spans divisions, so of the three it needs the shared layer least.",
        "So it pays the most for the least. It levels a field it currently leads, having already paid once for the capability it runs on. Going first is also why it depends on the layer least: the others would be moving onto its way of working. Left to its own plan, it keeps the lead to itself."
      ],
      work_out: "Data & Analytics is being asked to fund a build that levels a field it paid to lead. Work out what makes sharing that lead worth more to it than keeping it.",
      objection: "We are the ones who are ahead. We funded this, we hired the team, and we are further along than either of them. What you are asking is that we contribute our own funds to build, for the other two divisions, a capability we already have. Why would we fund that?",
      responses: {
        sequence: "Time is not our problem. We are the ones who are ready. More time only lets the others close the gap while we wait.",
        trust:    "We already work this way. We do not need convincing. Selling it to the skeptics is someone else’s job.",
        price:    "Not paying twice for what we have already funded is fair, and it helps. It still levels the field. If all three of us end up running on the same layer, what keeps us out in front?",
        status:   "Being named the owner helps. The other two would come onto our standard and run by the rules we set. We are still funding the same share as them for a build that brings them up to us. What happens to what we have already paid for?"
      },
      commit: "So what we have already funded counts against our share, and we own the layer the other two run on, to our standard. Then we stay out in front, and sharing the lead is worth more to us than keeping it. We are in."
    },

    "patient-engagement": {
      descriptor: "The smallest division, and the one with the most to gain from the shared layer.",
      worry: "Does not believe the organization can deliver something this big, having watched central initiatives stall before.",
      role: "Finds patients, enrolls them, and keeps them in the trial. It is the smallest of the three divisions.",
      measured: "Enrollment yield per campaign, patient retention, and cost per enrolled patient.",
      position: [
        "Patient Engagement has the most to gain and the least faith that it will arrive. It has watched the center promise big internal initiatives before and seen them stall. That history is what is stopping it.",
        "It is the smallest division, and proportionally the shared layer is worth more to it than to either of the others. Most of what it could do depends on data another division holds.",
        "It is asked for the least of the three and stands to gain the most. What it lacks is any confidence that the layer will actually arrive."
      ],
      work_out: "Patient Engagement has the most to gain and the least standing to ask for anything. Work out what it needs to hear before it will commit.",
      objection: "We have watched the center promise big things before and stall. The money is fine and the numbers are good. We do not believe this organization can pull something like this off. Show us it can.",
      responses: {
        sequence: "Timing is not what is stopping us. We are the easiest division in the building to schedule. Start it whenever you like, early or late. Nothing about our answer changes.",
        price:    "A better funding deal does not make the thing more likely to get built. We are not holding out for money.",
        status:   "We are not looking for a title or a seat at the table. That is not what is missing here."
      },
      commit: "So you will show it working: roadshows, the early wins where we can see them, the outside companies who have already done it, until we believe this organization can deliver? Then we are in, and we will be the easiest yes you get."
    }
  },

  /* ---- Lines the board itself uses ---- */
  system: {
    opening:     "Read the three objections. Work out what each division needs before it will commit.",
    partial:     "Committed. The shared layer still needs all three, and until the last one nothing runs across the divisions.",
    gate_funded: "All three have committed. The shared trial-data layer is built, work now runs across the divisions, and the upside is realized.",
    closed_note: "Round closed. Press Backspace to reset."
  },

  /* ---- The flow between the pages ---- */
  nav: {
    steps: [
      { href: "index.html",        n: "1", label: "The situation" },
      { href: "instructions.html", n: "2", label: "How it works" },
      { href: "sim.html",          n: "3", label: "The exercise" }
    ],
    guide: "Facilitator guide",
    guide_href: "facilitate.html",
    guide_note: "For whoever is running the session. It gives away the answers."
  },

  /* ---- Landing page ---- */
  landing: {
    title: "The Cross-Division Collaboration Problem",
    subtitle: "Three divisions, one shared trial-data layer, and nobody convinced they should fund it.",
    /* The situation, in reading order. Each label becomes the heading of its own
       section on the page, so the room knows what it is reading before it reads it. */
    story: [
      { label: "Where things stand",
        body: "Aster Life Sciences runs its clinical operations through three divisions, each with its own plan and its own targets. All three agree on one shared trial-data layer, so their AI agents can work across the divisions instead of stopping at the edge of each one. The upside they are leaving on the table is worth about {ambition}." },
      { label: "Why nobody has said yes",
        body: "Every division has still said no, each for a different and fair reason. One cannot take the disruption right now. One is already ahead and does not want to pay additional funds to help the others catch up. One does not believe the organization can deliver it." },
      { label: "What you can do about it",
        body: "You are {you}, {you_title}. You own no division and cannot commit anyone’s plan, so you cannot order any of this. Your job is to work out what each division needs in order to say yes, and then offer it. There are four deals you can offer: {deals}." }
    ],
    cards_heading: "The three divisions",
    cards_caption: "Read all three before the exercise starts. Each brief covers what the division does, what it is measured on, where it stands, and what it has said about committing.",
    do_heading: "What you will do",
    do_line: [
      "Everyone in the room plays the same person: {you}, {you_title}. You are not one of the three divisions and you are not arguing a division’s corner. As {you_title}, none of them reports to you, and the only thing you can put on the table is a deal.",
      "You will read all three briefs, work out what each division needs before it will commit, and offer it. Matching the right deal, sometimes the right two, to each division is the whole exercise. The shared layer gets built and the upside gets realized only when all three commit."
    ],
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
        "You sit on the {council} and can put a proposal on its agenda and argue for it. You own no budget, and any commitment that enters a five-year plan has to be made by the division that will carry it. The three people you are about to read own those plans. You do not, and you cannot set a target for any of them.",
        "What you control is the center: the shared platform, the central engineering group that will build the layer, and the influence that comes with them. That is what you spend to win each division over. The deals you can offer are things like crediting what a division has already funded, or winning over the ones who doubt it will deliver. “Order them to do it” is not available to you."
      ]
    },

    situation: {
      heading: "What is being decided",
      body: [
        "Aster wants to build one shared trial-data layer: a single place where all three divisions keep their trial data, so AI agents can follow a piece of work through the whole Center instead of stopping at the edge of one division.",
        "It is all or nothing, and it needs all three divisions. Aster’s central engineering group builds it once all three fund their share and move how they work onto the layer. Two out of three is not enough, and until the third commits nothing runs across them."
      ],
      note: "The only open question is whether all three divisions will commit. All three agree the layer should exist. All three have still said no."
    },

    blocks: {
      heading: "What each division is worried about",
      caption: "Each is holding back for a different, human reason, and that reason is what you have to answer. Two things shape how badly each one needs this: where it sits in the flow of work, and how early it started. The division where the handoffs land needs it most. The division that started first needs it least, because it already works the way it would have to work anyway.",
      note: "Read the three division briefs next; this is only the headline of each. Working out which deal answers which worry is the exercise."
    },

    job: {
      heading: "What you are asked to do",
      body: [
        "Your job is to work out what each division needs in order to say yes, and then offer it.",
        "You have four deals. Two of the divisions need one deal each. One needs two before it will move, and a single deal only gets it halfway."
      ]
    },

    moves: {
      heading: "The four deals",
      caption: "A deal changes the terms a division is offered. Offer the wrong one and it changes nothing: the division says no, and the effort is spent for nothing.",
      note: "There is no partial credit and no refund. A deal offered to a division it does not suit changes nothing, and nothing can be taken back."
    },

    rules: {
      heading: "The rules",
      items: [
        "You offer a division a deal. If it is not what that division needed, it says no and nothing moves.",
        "A deal that helps without being enough leaves the division where it was. It still has not committed.",
        "When a deal answers a division, it commits, and stays in for the rest of the round.",
        "Each deal can be offered to each division once, and nothing can be taken back.",
        "The shared layer gets built, and the upside realized, only if all three divisions commit."
      ]
    },

    watch: {
      heading: "What to watch",
      body: [
        "Watch the shared upside at the top of the board. It stays locked as divisions commit one by one, and only unlocks when the third one does. Working out why is the point of the exercise.",
        "Two divisions committing realizes nothing. The board is working exactly as designed."
      ]
    },

    ready: "OPEN THE EXERCISE"
  },

  /* ---- Labels the board and scoreboard use ---- */
  board: {
    upside_heading: "Cross-division upside",
    count_heading:  "Divisions committed",
    offered_heading:"Deals offered",
    locked:   "Locked",
    realized: "Realized",
    locked_sub:   "Nothing runs across the divisions until all three commit.",
    partial_sub:  "Still locked. One or two committing changes nothing, because work that spans divisions cannot run until the third commits.",
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
      what: "They commit the same way, later, and in stages. Each stage is a chance to negotiate incremental improvements instead of committing to everything up front."
    },
    price: {
      name: "Credit what they have already funded",
      what: "Their earlier investment in central engineering is credited against their share of the new build, so they are not asked to pay twice for a capability they already funded."
    },
    status: {
      name: "Name them the owner",
      what: "Make them the owner of the shared layer, so the other two run on their standard and on the rules they set: how far an agent can go on its own, when it has to stop and ask, what good enough looks like. They keep their lead instead of dissolving it into a shared asset."
    },
    trust: {
      name: "Build the belief",
      what: "Run roadshows, celebrate the internal wins as they land, and point to the outside companies who have already done it, until the doubt that this organization can deliver gives way to belief."
    }
  },

  /* ---- The divisions hub ---- */
  /* There is no longer a divisions hub page — the three briefs are reached from the
     situation page, which is step 1 of the flow. What is left here is the copy the
     three division pages themselves use. */
  divisions: {
    cta: "Read the full brief",
    labels: {
      role: "What it does",
      measured: "Measured on",
      position: "Where it stands",
      said: "What it has said",
      work_out: "What to work out",
      ask: "What it is being asked for"
    },
    ask_line: "Fund its share of the central engineering build of the shared trial-data layer, and change how it works to run on it. Its own plan, its own budget, in service of something that only pays once all three commit.",
    next: "Next division",
    back: "Back to the three divisions"
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
        body: "Stop and point at the upside. Still locked. Two divisions did the right thing and nothing runs across them yet. Let the room notice it before you explain it."
      },
      funded: {
        title: "The upside is realized",
        body: "Wait for the reveal to finish. Then: nothing about these three divisions changed. The third commitment built the layer, and the work that spans them can finally run."
      },
      closed: {
        title: "Round closed",
        body: "Read the ledger out, the deals that changed nothing included. Then ask which of these three divisions people recognize from their own company."
      }
    }
  },

  /* ---- Scoreboard ---- */
  scoreboard: {
    verdict_all:          "All three committed. The shared layer is built, and the cross-division upside is realized.",
    verdict_partial:      "Not all three committed, so the layer was never built and nothing runs across the divisions.",
    verdict_partial_note: "The divisions that did commit realized nothing for it. Partial coordination buys nothing. The upside is all or nothing.",
    verdict_none:         "No division committed. On its own numbers, none of them was wrong to hold back.",
    table_heading:  "Where each division landed",
    ledger_heading: "The deal ledger",
    ledger_empty:   "No deals were offered.",
    changed_nothing:"changed nothing",
    back: "BACK TO THE BOARD"
  },

  /* ---- Facilitator guide ----
     This runs as an in-class small-group exercise: faculty gives a short intro, the room
     splits into threes, and each group works the simulation on its own laptop. ---- */
  facilitate: {
    title: "Facilitator guide",
    standfirst: "How to run this in class: the intro to give, and how to put the room into groups of three to work the exercise.",

    intro: {
      heading: "The intro to give the class",
      lead: "Read or paraphrase this to the whole room before you split it up. Two minutes, no slides needed.",
      body: [
        "For the next twenty minutes you are {you}, {you_title} of Aster Life Sciences’ {unit}. Aster runs its clinical work through three divisions, each with its own plan and its own targets. All three agree there should be one shared trial-data layer: a single home for their trial data, so their AI agents can work across the divisions instead of stopping at the edge of each one. Agreeing it should exist is not the same as getting it built. Aster’s central engineering group will build it, and each division has been asked to fund its share of that build and to move how it works onto the layer. Each has said no. You own no division and cannot commit anyone’s plan for them. Your job is to work out what each one needs in order to say yes, and offer it.",
        "Get into groups of three, one laptop between you. Read the three division briefs together, talk through what is actually stopping each division, and decide as a group what to offer it. Get all three to commit and the layer gets built. Watch what happens when only one or two of them do."
      ]
    },

    /* The slide the faculty presents before splitting the room. The PNG is the slide
       itself, shown as-is so the guide-reader sees what the class will see. */
    schematic: {
      heading: "The slide that sets it up",
      caption: "This is the slide to show the whole room while you give the intro above, before you split it into groups of three.",
      alt: "Slide titled “Exercise: Getting the Shared Trial-Data Layer Built.” Three division boxes sit side by side: Site Operations & Trial Execution, Clinical Data & Analytics, and Patient Engagement & Recruitment. Each has its own plan, its own budget and its own targets, and each has its own agents, because today an agent’s reach ends at the edge of its own division’s data. A “commit?” arrow drops from each division to a dashed box below, the shared trial-data layer: one home for trial data, with common data, common tooling and shared evaluation, so agents can work across the three divisions instead of stopping at the edge of one. Underneath it, in red: “Agreed by all three. Committed to by none.” A panel to the right, “What makes this hard,” explains that Rao, as CIO, owns no division and can only work out what each one needs in order to say yes.",
      src: "assets/exercise-schematic.png"
    },

    run: {
      heading: "How to run it",
      caption: "About twenty minutes: a two-minute intro, ten to fifteen in groups, and a short reconvene.",
      steps: [
        "Give the intro above to the whole room.",
        "Have the room get into groups of three, with the exercise site open on one laptop per group.",
        "Each group reads the three division briefs, then works the exercise together: pick a division, offer it a deal, and see how it responds. The goal is to get all three to commit so the layer gets built.",
        "Give them ten to fifteen minutes and circulate. If a group stalls, send it back to the brief for whichever division it is stuck on. What that division is holding out for is in what it says, and the brief is the only place it is written down.",
        "Bring the room back together and ask what it took to get all three in, and what happened when only one or two committed."
      ]
    },

    to_sim: "OPEN THE EXERCISE",
    to_index: "The situation",

    flow: {
      heading: "What each group works through",
      caption: "Every group has this on one laptop and moves through it in order. The pages name none of the blocks, because the diagnosis is the exercise.",
      items: [
        { label: "1 · The situation", href: "index.html",
          body: "The scenario, who the room is playing, and the three division briefs: a page each on what a division does, where it stands and what it has said. This is where each group starts and the material it diagnoses from. Each brief opens in a new tab, so a group can keep all three open beside the situation page and move between them while it works." },
        { label: "2 · How it works", href: "instructions.html",
          body: "The rules of the exercise and, in one line each, what every division is worried about. Groups should read this before they touch the board." },
        { label: "3 · The exercise", href: "sim.html",
          body: "The board itself. The group clicks a deal onto a division; if it fits, the division commits. All three commit and the shared upside flips from locked to realized. Closing the round shows what worked and what changed nothing." }
      ]
    }
  },

  /* ---- Keyboard overlay ---- */
  keys: {
    heading: "Facilitator keys",
    rows: [
      ["1 2 3",   "Select division"],
      ["Q W E R", "Apply Sequence / Funding / Status / Trust-building to the selected division"],
      ["N",       "Presenter note for the current beat"],
      ["C",       "Close the round"],
      ["⌫",       "Reset"],
      ["?",       "This list"]
    ],
    dismiss: "Any key to dismiss"
  }
};
