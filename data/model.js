/* Aster Coordination Simulation — the model.
   Loaded with a <script> tag rather than fetched as JSON so the site runs from file://.

   The exercise is deliberately number-free: it is about matching the right deal to each
   division and realising the shared upside, not about budgets. The only figure kept anywhere
   is the run-rate ambition, used once on the landing to set the stakes. */

window.ASTER = {
  meta: {
    org: "Aster Life Sciences",
    unit: "Global Clinical Operations Center",
    setting: "Mid-2026",
    disclaimer: "A fictional teaching simulation. Aster Life Sciences and all people, numbers and events in it are invented.",
    // The room plays the case protagonist. Named here so no page invents a different role.
    you:     { name: "Alexiel Rao", title: "Chief Information Officer" },
    council: "Clinical Operations Leadership Council"
  },

  // The one framing figure kept, used only on the landing to set the stakes.
  ambition: "$250M a year",

  /* Each division has one block; one or more moves answer it. The block→move map is derived
     (FMT.needs), never hand-listed, so it cannot drift: a division commits once every move
     whose `answers` matches its block has landed. Data & Analytics is the one division whose
     block takes two moves — PRICE and STATUS — so it needs both to say yes. */
  groups: [
    { id: "site-ops",           name: "Site Operations & Trial Execution",  short: "Site Operations",
      lead: "Senior Director Luis Moreno",  accent: "amber",  block: "absorption" },

    { id: "data-analytics",     name: "Clinical Data & Analytics",          short: "Data & Analytics",
      lead: "Senior Director Evan Cole",    accent: "cyan",   block: "advantage" },

    { id: "patient-engagement", name: "Patient Engagement & Recruitment",   short: "Patient Engagement",
      lead: "Senior Director Clara Vega",   accent: "violet", block: "assurance" }
  ],

  moves: [
    { id: "sequence",   label: "SEQUENCE",       answers: "absorption",
      blurb: "Commit the number, negotiate the clock, and incremental improvements stage by stage." },
    { id: "price",      label: "PRICE",          answers: "advantage",
      blurb: "Pay for the head start. Credit what they have already built, guarantee them demand." },
    { id: "status",     label: "STATUS",         answers: "advantage",
      blurb: "Protect the lead. Name them owner of the shared layer, and the rules the others run by." },
    { id: "trust",      label: "TRUST-BUILDING", answers: "assurance",
      blurb: "Build belief that the organisation can deliver. Roadshows, visible internal wins, outside proof." }
  ]
};

/* The computation — one pure function, no side effects, no numbers.
   The shared layer is realised only when every division has committed. */
window.compute = function compute(state) {
  const A = window.ASTER;
  const committed = A.groups.filter(g => state.committed[g.id]).map(g => g.id);
  return {
    committed: committed,
    count: committed.length,
    total: A.groups.length,
    funded: committed.length === A.groups.length
  };
};

/* Shared helpers. */
window.ASTER_FMT = {
  group: id => window.ASTER.groups.find(g => g.id === id),
  move:  id => window.ASTER.moves.find(m => m.id === id),
  // The moves a division needs before it commits: every move that answers its block.
  // One for two of the divisions; two (PRICE and STATUS) for Data & Analytics.
  needs: id => {
    const b = window.ASTER_FMT.group(id).block;
    return window.ASTER.moves.filter(m => m.answers === b).map(m => m.id);
  },

  // Substitutes {tokens} in a copy string. Only a handful of non-numeric tokens exist now;
  // an unknown token is left alone on purpose, so a typo shows on screen rather than as a gap.
  fill: function (text) {
    var A = window.ASTER;
    var f = {
      you:       A.meta.you.name,
      you_title: A.meta.you.title,
      unit:      A.meta.unit,
      council:   A.meta.council,
      ambition:  A.ambition
    };
    return String(text).replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(f, key) ? f[key] : whole;
    });
  },

  // Division pages no longer carry their own figures, so fillFor is just fill.
  fillFor: function (text) { return window.ASTER_FMT.fill(text); }
};
