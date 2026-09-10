/* Aster Coordination Simulation — the only place numbers live.
   Loaded with a <script> tag rather than fetched as JSON so the site runs from file://. */

window.ASTER = {
  meta: {
    org: "Aster Life Sciences",
    unit: "Global Clinical Operations Center",
    setting: "Mid-2026",
    disclaimer: "A fictional teaching simulation. Aster Life Sciences and all people, numbers and events in it are invented."
  },

  ambition: 250,                 // $M run-rate — the CIO's ask, not a mandate
  infrastructure_required: 18,   // $M — build cost of the shared trial-data layer
  multiplier_funded: 1.00,
  multiplier_unfunded: 0.55,     // agents confined inside one boundary

  groups: [
    { id: "site-ops",           name: "Site Operations & Trial Execution",  short: "Site Operations",
      lead: "Senior Director Luis Moreno",  accent: "amber",
      local_pool: 140, cross_value: 40, capital_need: 26, pledge: 8,
      pull: "dependent", block: "absorption", move: "sequence" },

    { id: "data-analytics",     name: "Clinical Data & Analytics",          short: "Data & Analytics",
      lead: "Senior Director Evan Cole",    accent: "cyan",
      local_pool: 95,  cross_value: 20, capital_need: 22, pledge: 6,
      pull: "supplier",  block: "advantage",  move: "price" },

    { id: "patient-engagement", name: "Patient Engagement & Recruitment",   short: "Patient Engagement",
      lead: "Senior Director Clara Vega",   accent: "violet",
      local_pool: 70,  cross_value: 35, capital_need: 12, pledge: 4,
      pull: "dependent", block: "assurance", move: "underwrite" }
  ],

  moves: [
    { id: "sequence",   label: "SEQUENCE",   cost: 6,  answers: "absorption",
      blurb: "Commit the number, negotiate the clock." },
    { id: "price",      label: "PRICE",      cost: 12, answers: "advantage",
      blurb: "Pay for what they give up. Credit the head start, guarantee demand." },
    { id: "underwrite", label: "UNDERWRITE", cost: 9,  answers: "assurance",
      blurb: "Guarantee the downside. Caps, kill criteria, migration costs covered." }
  ]
};

/* The computation — one pure function, no side effects. */
window.compute = function compute(state) {
  const A = window.ASTER;
  const pledged = A.groups
    .filter(g => state.committed[g.id])
    .reduce((s, g) => s + g.pledge, 0);

  const funded = pledged >= A.infrastructure_required;
  const mult   = funded ? A.multiplier_funded : A.multiplier_unfunded;

  const per = A.groups.map(g => {
    // Committing costs real capital, which costs real local capability.
    const c = state.committed[g.id]
      ? (g.capital_need - g.pledge) / g.capital_need
      : 1.0;
    const local = g.local_pool * c * mult;
    const cross = funded ? g.cross_value * c : 0;
    return { id: g.id, capability: c, local, cross, value: local + cross };
  });

  const enterprise = per.reduce((s, p) => s + p.value, 0);

  return {
    pledged, funded, mult, per, enterprise,
    gap:   A.ambition - enterprise,       // positive = short of the ambition
    spent: state.spent,
    wasted: state.applied.filter(a => !a.correct)
                         .reduce((s, a) => s + A.moves.find(m => m.id === a.move_id).cost, 0)
  };
};

/* Shared helpers so no page formats money its own way. */
window.ASTER_FMT = {
  group:   id => window.ASTER.groups.find(g => g.id === id),
  move:    id => window.ASTER.moves.find(m => m.id === id),
  // $124.62M — two decimals, the precision the outcome table is verified to.
  money:   n => "$" + n.toFixed(2) + "M",
  // $18M — whole-dollar figures that are exact by construction (costs, pledges, pools).
  moneyInt: n => "$" + Math.round(n) + "M",
  sum:     key => window.ASTER.groups.reduce((s, g) => s + g[key], 0),
  /* Every figure any page might want to quote, computed once from the constants above.
     Copy in data/script.js writes {tokens} and never a number; fill() substitutes them. */
  figures: function () {
    var A = window.ASTER, F = window.ASTER_FMT;
    var none = F.outcomes()[0].result;
    var all  = F.outcomes()[F.outcomes().length - 1].result;
    var worst = F.outcomes().filter(function (o) { return o.members.length && !o.result.funded; })
                            .reduce(function (a, b) {
                              return a.result.enterprise <= b.result.enterprise ? a : b;
                            });
    var dealcost = A.moves.reduce(function (s, m) { return s + m.cost; }, 0);
    var gain = all.enterprise - none.enterprise;
    return {
      ambition:  F.moneyInt(A.ambition),
      infra:     F.moneyInt(A.infrastructure_required),
      capital:   F.moneyInt(F.sum("capital_need")),
      cross:     F.moneyInt(F.sum("cross_value")),
      baseline:  F.money(none.enterprise),
      ceiling:   F.money(all.enterprise),
      ahead:     F.money(Math.abs(all.gap)),
      shortfall: F.money(none.gap),
      gain:      F.money(gain),
      dealcost:  F.moneyInt(dealcost),
      ret:       (gain / dealcost).toFixed(2) + "×",
      worst:     F.money(worst.result.enterprise),
      worstpair: worst.members.map(function (id) { return F.group(id).short; }).join(" + "),
      unfunded:  Math.round(A.multiplier_unfunded * 100) + "%"
    };
  },

  // Substitutes {tokens} in a copy string. Unknown tokens are left alone on purpose,
  // so a typo shows up on screen rather than silently rendering as an empty gap.
  fill: function (text) {
    var f = window.ASTER_FMT.figures();
    return String(text).replace(/\{(\w+)\}/g, function (whole, key) {
      return Object.prototype.hasOwnProperty.call(f, key) ? f[key] : whole;
    });
  },

  // The same, plus the four figures that belong to one group, for the division pages.
  fillFor: function (text, group) {
    var F = window.ASTER_FMT;
    return F.fill(String(text)
      .replace(/\{local\}/g,   F.moneyInt(group.local_pool))
      .replace(/\{cross\}/g,   F.moneyInt(group.cross_value))
      .replace(/\{capital\}/g, F.moneyInt(group.capital_need))
      .replace(/\{pledge\}/g,  F.moneyInt(group.pledge)));
  },

  // Enumerates all 8 committed-sets in the order of the outcome table in the spec.
  outcomes: function () {
    const ids = window.ASTER.groups.map(g => g.id);
    const sets = [];
    for (let m = 0; m < 8; m++) sets.push(ids.filter((id, i) => m & (1 << i)));
    return sets
      .map(members => {
        const committed = {};
        ids.forEach(id => committed[id] = members.indexOf(id) !== -1);
        const r = window.compute({ committed, applied: [], spent: 0 });
        return { members, key: members.slice().sort().join("|"), result: r };
      })
      .sort((a, b) => a.members.length - b.members.length || b.result.enterprise - a.result.enterprise);
  }
};
