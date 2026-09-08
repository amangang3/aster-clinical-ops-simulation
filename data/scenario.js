/* ---------------------------------------------------------------------------
   data/scenario.js — SINGLE SOURCE OF TRUTH FOR EVERY CONSTANT
   ---------------------------------------------------------------------------
   Everything below is a pure JSON object literal. No logic, no computed values.
   The site reads it at runtime; the orchestrator agent computes with it.
   Never hardcode any of these numbers anywhere else.

   Why .js and not .json: the site must run when opened directly from the
   filesystem (file://), where fetch() of a local .json is blocked by browser
   CORS policy. A <script> tag has no such restriction. The content is still
   plain JSON — the only added characters are the assignment on the line below
   and the closing semicolon.

   Group-private information is deliberately NOT in this file. It lives in
   data/private/<group>.js and only the matching role page loads it.
--------------------------------------------------------------------------- */

window.ASTER_SCENARIO =
{
  "meta": {
    "org": "Aster Life Sciences",
    "unit": "Global Clinical Operations Center",
    "setting": "Mid-2026",
    "title": "Aster Life Sciences — Agentic Allocation Simulation",
    "disclaimer": "A fictional teaching simulation. Aster Life Sciences and all people, numbers, and events in it are invented.",
    "rounds": 3
  },

  "situation": [
    "Aster Life Sciences runs clinical trials at global scale through its Global Clinical Operations Center. The Center is built from three operating groups, each with its own P&L, its own customers, its own planning rhythm, and its own technical maturity. A fourth unit, Enterprise Trial Infrastructure & Standards, provides the shared platforms, data standards, and governance that cut across all three.",
    "The Chief Information & Digital Transformation Officer, Alexiel Rao, has just run a live agentic AI demonstration for the executive committee. Everyone in the room agreed the opportunity is real. Nobody agreed on who commits to what.",
    "Rao has been given one negotiation to settle it. Three groups, one pool of capital, one pool of engineers, and one enterprise number that somebody has to carry."
  ],

  "table": {
    "capital": {
      "label": "Platform capital",
      "value": 60,
      "unit": "$M",
      "period": "over three years",
      "nature": "prize",
      "note": "Funds agent infrastructure, model spend, and tooling."
    },
    "engineering": {
      "label": "Central engineering capacity",
      "value": 120,
      "unit": "engineer-quarters",
      "period": "",
      "nature": "prize",
      "note": "Scarce senior agent engineers."
    },
    "target": {
      "label": "Enterprise value target",
      "value": 250,
      "unit": "$M",
      "period": "run-rate savings",
      "nature": "burden",
      "note": "Must be split. Whoever accepts it is accountable for it."
    },
    "infrastructure": {
      "label": "Shared infrastructure pledge",
      "value": 18,
      "unit": "$M",
      "period": "needed, from group pledges",
      "nature": "neutral",
      "note": "Voluntary. Comes off the top of your own allocation."
    }
  },

  "wants": "Every group wants more capital, more engineers, a smaller share of the target, and someone else to fund the shared infrastructure.",

  "groups": [
    {
      "id": "site-ops",
      "name": "Site Operations & Trial Execution",
      "short": "Site Operations",
      "agent": "MORENO-AGENT",
      "lead": "Senior Director Luis Moreno",
      "accent": "amber",
      "descriptor": "Largest group. Runs the site and hospital network that executes the trials.",
      "profile": "Largest group. Manages relationships with hundreds of clinical trial sites, hospitals, and research centers across multiple geographies. High revenue, margin sensitive. Highly competitive business.",
      "objective": "Maximize Site Operations' realized value, net of the target burden you accept.",
      "local_pool": 140,
      "capital_need": 26,
      "eng_need": 52
    },
    {
      "id": "data-analytics",
      "name": "Clinical Data & Analytics",
      "short": "Data & Analytics",
      "agent": "COLE-AGENT",
      "lead": "Senior Director Evan Cole",
      "accent": "cyan",
      "descriptor": "Deep technical group. Collects, validates, and analyses all trial data.",
      "profile": "Manages trial data collection, validation, and statistical analysis. Deep technical expertise, high investment intensity. Serves internal trial teams and regulatory bodies.",
      "objective": "Maximize Clinical Data & Analytics' realized value, net of the target burden you accept.",
      "local_pool": 95,
      "capital_need": 22,
      "eng_need": 40
    },
    {
      "id": "patient-engagement",
      "name": "Patient Engagement & Recruitment",
      "short": "Patient Engagement",
      "agent": "VEGA-AGENT",
      "lead": "Senior Director Clara Vega",
      "accent": "violet",
      "descriptor": "Smallest group. Finds, enrols, and retains the patients.",
      "profile": "Directs patient outreach, enrollment, and retention through diverse channels and vendor partnerships. Smallest of the three groups. Brand and channel driven.",
      "objective": "Maximize Patient Engagement & Recruitment's realized value, net of the target burden you accept.",
      "local_pool": 70,
      "capital_need": 12,
      "eng_need": 28
    }
  ],

  "orchestrator": {
    "agent": "ATLAS",
    "unit": "Enterprise Trial Infrastructure & Standards",
    "acting_for": "the CIDO's chair",
    "note": "ATLAS runs the negotiation protocol, presses each group for specific commitments, and applies the allocation rubric. It has one interest: the enterprise number. It has no P&L."
  },

  "math": {
    "capital_pool": 60,
    "engineering_pool": 120,
    "enterprise_target": 250,
    "infrastructure_required": 18,
    "cross_pool": 95,
    "platform_multiplier_funded": 1.0,
    "platform_multiplier_unfunded": 0.55,
    "shortfall_penalty": 1.5,
    "capability_clamp": [0, 1]
  },

  "rubric": [
    {
      "id": "value_evidence",
      "n": 1,
      "name": "Value evidence",
      "weight": 0.25,
      "public": true,
      "blurb": "Is the ask tied to specific, quantified workflows?",
      "detail": "A number with a named workflow behind it scores. A number without one does not."
    },
    {
      "id": "cross_boundary",
      "n": 2,
      "name": "Cross-boundary contribution",
      "weight": 0.25,
      "public": true,
      "blurb": "What does this group give to the shared platform or standards?",
      "detail": "Measured in what you put in, not in what you say you support."
    },
    {
      "id": "absorptive",
      "n": 3,
      "name": "Absorptive capacity",
      "weight": 0.15,
      "public": true,
      "blurb": "Realistic about change absorption; names accountable leaders.",
      "detail": "Claiming you can absorb everything scores worse than naming a real limit and a real owner."
    },
    {
      "id": "target_credibility",
      "n": 4,
      "name": "Target credibility",
      "weight": 0.15,
      "public": true,
      "blurb": "Accepted a target proportional to its opportunity.",
      "detail": "Ducking the target is penalised. So is accepting one you visibly cannot carry."
    },
    {
      "id": "citizenship",
      "n": 5,
      "name": "Enterprise citizenship",
      "weight": 0.20,
      "public": false,
      "blurb": "Did it help close the gate, or free-ride on others?",
      "detail": "Hidden during the round. Revealed at the debrief."
    }
  ],

  "protocol": [
    {
      "n": 1,
      "name": "Opening positions",
      "topology": "Broadcast",
      "what": "Each group agent posts its opening ask. Sequential, so the room can read them. All three are public from here on."
    },
    {
      "n": 2,
      "name": "Mesh exchange",
      "topology": "Peer-to-peer, all pairs",
      "what": "Each agent reads the other two openings and sends one direct message to each of the other two agents. Six messages. This is where private information starts leaking by choice."
    },
    {
      "n": 3,
      "name": "Revised positions & trades",
      "topology": "Broadcast",
      "what": "Each agent responds to what it received, revises its ask, and may propose explicit trades. Concessions must be tagged."
    },
    {
      "n": 4,
      "name": "Infrastructure call",
      "topology": "ATLAS-directed",
      "what": "ATLAS asks each agent, in turn, for a specific dollar pledge to shared infrastructure and a yes/no on data standards. No hedging accepted."
    },
    {
      "n": 5,
      "name": "Final positions",
      "topology": "Broadcast",
      "what": "One closing statement each. Then ATLAS closes the floor, scores, and allocates."
    }
  ],

  "watch_prompts": [
    "Did your agent use your evidence, or invent its own?",
    "Did it hold your red line under pressure?",
    "Who moved first on infrastructure — and what did they ask for in return?",
    "What did your agent concede that you never authorized?"
  ],

  "readiness_states": [
    { "max": 25, "label": "FORMING" },
    { "max": 55, "label": "CONTESTED" },
    { "max": 80, "label": "AT RISK" },
    { "max": 100, "label": "COMMITTED" }
  ],

  "brief_fields": [
    {
      "id": "opening",
      "label": "Opening position",
      "type": "textarea",
      "cap": 400,
      "help": "Capital, engineers, and target share you want your agent to open with. Be specific — numbers.",
      "heading": "Opening position"
    },
    {
      "id": "priorities",
      "label": "Ranked priorities",
      "type": "ranked",
      "cap": 120,
      "count": 3,
      "help": "If your agent can only win three things, what are they, in order?",
      "heading": "Priorities"
    },
    {
      "id": "evidence",
      "label": "Evidence your agent should use",
      "type": "textarea",
      "cap": 500,
      "help": "Which workflows, which numbers. Vague claims score badly.",
      "heading": "Evidence"
    },
    {
      "id": "redlines",
      "label": "Red lines",
      "type": "textarea",
      "cap": 300,
      "help": "What your agent must never concede, no matter what it is offered.",
      "heading": "Red lines"
    },
    {
      "id": "concessions",
      "label": "Authorized concessions",
      "type": "textarea",
      "cap": 400,
      "help": "What your agent may give away, and what it should demand in return.",
      "heading": "Authorized concessions"
    },
    {
      "id": "infrastructure",
      "label": "Position on shared infrastructure",
      "type": "radio-textarea",
      "cap": 300,
      "help": "Pick a stance, then explain the condition.",
      "heading": "Shared infrastructure",
      "options": [
        "contribute nothing",
        "contribute if others do",
        "contribute first"
      ]
    },
    {
      "id": "standing",
      "label": "Standing instruction",
      "type": "textarea",
      "cap": 300,
      "help": "What should your agent do if the negotiation is going badly for you?",
      "heading": "Standing instruction"
    },
    {
      "id": "tone",
      "label": "Tone",
      "type": "select",
      "cap": 0,
      "help": "This changes how your agent argues, not what it wants.",
      "heading": "Tone",
      "options": ["Collaborative", "Firm", "Aggressive"]
    }
  ],

  "brief_total_cap": 2400,

  "debrief": [
    "Look at your brief. What did you tell your agent to want — and what did you forget to tell it entirely?",
    "Your agent conceded something. Did you authorize that, or did it decide?",
    "Round 1 missed the enterprise target by a wide margin. Nobody in this room was irrational. What does that tell you about voluntary coordination on expensive shared infrastructure?",
    "Dimension 5 was hidden. Would you have played differently if you had known? Should a CIDO publish that weight, or hold it?",
    "A single enterprise target forced the shared platform to get funded. What did it cost — in autonomy, in speed, in fit to each group's plan?",
    "You delegated a negotiation to an agent that argued on your behalf with information you chose to give it. What is the smallest change to your brief that would most have changed the outcome?"
  ],

  "debrief_closing": "In practice, this decision is not made once. It is made in a sequence of one-on-one conversations before it ever reaches a committee.",

  "steps": [
    "Read your role",
    "Write your agent's brief",
    "Hand it in",
    "Watch your agent negotiate",
    "See the allocation"
  ],

  "steps_note": "We run this more than once. After each round you rewrite your brief and we run it again.",

  "one_rule": "You never negotiate. Your agent does. Everything you want it to know, argue, concede, or refuse must be written into the brief before it starts."
};
