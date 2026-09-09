/* =========================================================================
   assets/app.js — shared runtime for every page.
   Scenario access, group routing, storage, brief formatting, results math,
   and small render helpers. No dependencies. No network calls.
   ========================================================================= */

(function () {
  "use strict";

  /* ---------- scenario access ------------------------------------------ */

  var S = window.ASTER_SCENARIO;
  if (!S) {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.innerHTML =
        '<div style="padding:40px;font:16px system-ui;color:#eee;background:#0c0f14;min-height:100vh">' +
        "<h1>Scenario data did not load</h1><p>Expected <code>data/scenario.js</code> to be included " +
        "before <code>assets/app.js</code>. Check the script tags in this page.</p></div>";
    });
    return;
  }

  var ACCENT_CLASS = { amber: "a-amber", cyan: "a-cyan", violet: "a-violet", slate: "a-slate" };
  var ACCENT_HEX = {
    amber: "#f5a524", cyan: "#22c8d8", violet: "#a685f5", slate: "#94a7c4"
  };

  /* ---------- tiny helpers --------------------------------------------- */

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") n.className = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
      });
    }
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* Round numbers for display without lying about precision. */
  function money(v, dp) {
    var d = dp === undefined ? 1 : dp;
    return (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }
  function money0(v) { return String(Math.round(v)); }

  /* ---------- groups ---------------------------------------------------- */

  function groups() { return S.groups; }

  function groupById(id) {
    for (var i = 0; i < S.groups.length; i++) if (S.groups[i].id === id) return S.groups[i];
    return null;
  }

  /* Reads ?g=, validates against the scenario. Returns null if absent/unknown. */
  function currentGroup() {
    return groupById(param("g") || "");
  }

  function applyAccent(node, accent) {
    if (!node) return;
    Object.keys(ACCENT_CLASS).forEach(function (k) { node.classList.remove(ACCENT_CLASS[k]); });
    node.classList.add(ACCENT_CLASS[accent] || "a-slate");
  }

  /* ---------- storage --------------------------------------------------- */

  var ROUND_KEY = "aster.round";

  function store(key, val) {
    try {
      if (val === undefined) {
        var raw = window.localStorage.getItem(key);
        return raw === null ? null : JSON.parse(raw);
      }
      window.localStorage.setItem(key, JSON.stringify(val));
      return val;
    } catch (e) {
      return val === undefined ? null : val;   // private mode / blocked storage
    }
  }

  function removeStore(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  function getRound() {
    var r = parseInt(param("round") || "", 10);
    if (r >= 1 && r <= S.meta.rounds) return r;
    var s = parseInt(store(ROUND_KEY), 10);
    return (s >= 1 && s <= S.meta.rounds) ? s : 1;
  }

  function setRound(r) {
    r = Math.max(1, Math.min(S.meta.rounds, parseInt(r, 10) || 1));
    store(ROUND_KEY, r);
    return r;
  }

  function briefKey(groupId, round) { return "aster.brief." + groupId + "." + round; }

  function isFacilitator() { return param("fac") === "1"; }

  /* ---------- chrome (header / footer) ---------------------------------- */

  var NAV = [
    { href: "index.html", label: "Overview" },
    { href: "watch.html", label: "Watch" },
    { href: "results.html", label: "Results" },
    { href: "debrief.html", label: "Debrief" }
  ];

  function pageName() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function mountChrome() {
    var head = qs("[data-chrome=head]");
    if (head) {
      var here = pageName();
      head.appendChild(
        el("div", { class: "wrap" }, [
          el("a", { class: "brand", href: "index.html" }, [
            "ASTER ", el("span", { text: "· Agentic Allocation Simulation" })
          ]),
          el("nav", { class: "nav" }, NAV.map(function (n) {
            var a = el("a", { href: n.href, text: n.label });
            if (n.href === here) a.setAttribute("aria-current", "page");
            return a;
          }))
        ])
      );
    }
    var foot = qs("[data-chrome=foot]");
    if (foot) {
      foot.appendChild(el("div", { class: "wrap" }, [
        el("div", { text: S.meta.disclaimer })
      ]));
    }
  }

  /* ---------- shared renderers ------------------------------------------ */

  /* The four-row "what's on the table" table, used on index and role pages. */
  function renderTable(mount) {
    if (!mount) return;
    var t = S.table;
    var rows = ["capital", "engineering", "target", "infrastructure"].map(function (k) {
      var r = t[k];
      var TAG = {
        prize:    { cls: "prize",   txt: "Prize" },
        burden:   { cls: "burden",  txt: "Burden" },
        ambition: { cls: "burden",  txt: "Ambition" },
        neutral:  { cls: "neutral", txt: "Neither" }
      };
      var tag = TAG[r.nature] || TAG.neutral;
      var tagClass = tag.cls, tagText = tag.txt;
      return el("tr", null, [
        el("td", null, [el("b", { text: r.label }), el("div", { class: "small muted", text: r.note })]),
        el("td", { class: "n" }, [
          el("div", { class: "mono", text: (r.unit === "$M" ? "$" + r.value + "M" : r.value + " " + r.unit) }),
          r.period ? el("div", { class: "tiny muted", text: r.period }) : null
        ]),
        el("td", null, [el("span", { class: "tag " + tagClass, text: tagText })])
      ]);
    });

    mount.appendChild(el("div", { class: "table-scroll" }, [
      el("table", null, [
        el("thead", null, [el("tr", null, [
          el("th", { text: "Item" }), el("th", { class: "n", text: "Total" }), el("th", { text: "Nature" })
        ])]),
        el("tbody", null, rows)
      ])
    ]));
    mount.appendChild(el("p", { class: "muted small", text: S.wants, style: "margin-top:14px" }));
  }

  /* Rubric — renders ONLY dimensions flagged public unless told otherwise. */
  function renderRubric(mount, opts) {
    if (!mount) return;
    var showHidden = !!(opts && opts.includeHidden);
    S.rubric.forEach(function (d) {
      if (!d.public && !showHidden) return;             // dimension 5 gate
      mount.appendChild(el("div", { class: "rubric-row" }, [
        el("div", { class: "i", text: String(d.n) }),
        el("div", null, [
          el("div", { class: "nm", text: d.name }),
          el("div", { class: "bl", text: d.blurb }),
          el("div", { class: "dt", text: d.detail })
        ]),
        el("div", { class: "w", text: Math.round(d.weight * 100) + "%" })
      ]));
    });
  }

  function renderRounds(mount, round) {
    if (!mount) return;
    mount.innerHTML = "";
    for (var i = 1; i <= S.meta.rounds; i++) {
      mount.appendChild(el("div", {
        class: "round-pip", "data-on": i === round ? "1" : "0", text: "ROUND " + i
      }));
    }
  }

  function toast(msg, isErr) {
    var t = qs(".toast") || document.body.appendChild(el("div", { class: "toast" }));
    t.textContent = msg;
    t.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.className = "toast" + (isErr ? " err" : ""); }, 2600);
  }

  /* ---------- brief formatting (contract with the agent files) ---------- */

  /* Character count that the cap is enforced against: the content the student
     wrote, not the markdown scaffolding around it. */
  function briefLength(data) {
    var n = 0;
    S.brief_fields.forEach(function (f) {
      if (f.type === "select") return;                       // tone is a choice, not prose
      if (f.type === "ranked") {
        (data.priorities || []).forEach(function (p) { n += (p || "").length; });
      } else if (f.type === "radio-textarea") {
        n += ((data[f.id] && data[f.id].text) || "").length;  // stance is a choice
      } else {
        n += (data[f.id] || "").length;
      }
    });
    return n;
  }

  function briefToMarkdown(group, round, data) {
    var L = [];
    L.push("# BRIEF — " + group.name);
    L.push("Round: " + round);
    L.push("Tone: " + (data.tone || "Collaborative"));
    L.push("");
    L.push("## Opening position");
    L.push((data.opening || "").trim());
    L.push("");
    L.push("## Priorities");
    var pr = data.priorities || ["", "", ""];
    for (var i = 0; i < 3; i++) L.push((i + 1) + ". " + (pr[i] || "").trim());
    L.push("");
    L.push("## Evidence");
    L.push((data.evidence || "").trim());
    L.push("");
    L.push("## Red lines");
    L.push((data.redlines || "").trim());
    L.push("");
    L.push("## Authorized concessions");
    L.push((data.concessions || "").trim());
    L.push("");
    L.push("## Shared infrastructure");
    L.push("Stance: " + ((data.infrastructure && data.infrastructure.stance) || "contribute if others do"));
    L.push(((data.infrastructure && data.infrastructure.text) || "").trim());
    L.push("");
    L.push("## Standing instruction");
    L.push((data.standing || "").trim());
    L.push("");
    return L.join("\n");
  }

  /* ---------- results math (mirrors §3 of the build spec) --------------- */

  var M = S.math;

  function capability(effectiveCapital, capitalNeed, eng, engNeed) {
    var c = Math.min(effectiveCapital / capitalNeed, eng / engNeed);
    return Math.max(M.capability_clamp[0], Math.min(M.capability_clamp[1], c));
  }

  /* Counterfactual: hold capital / engineering / target allocations fixed,
     but fund the shared platform out of that same capital, pledging in
     proportion to each group's capital share. Cross-boundary pool unlocks and
     is split using the run's contribution shares where they exist, evenly
     otherwise (a missed-gate run records no shares). */
  function counterfactual(results) {
    var gs = results.groups || [];
    if (!gs.length) return null;

    var totalCapital = gs.reduce(function (a, g) { return a + (g.capital || 0); }, 0);
    if (totalCapital <= 0) return null;

    var shareSum = gs.reduce(function (a, g) { return a + (g.cross_pool_share || 0); }, 0);

    var total = 0;
    gs.forEach(function (g) {
      var def = groupById(g.id);
      if (!def) return;
      var pledge = M.infrastructure_required * (g.capital / totalCapital);
      var c = capability(g.capital - pledge, def.capital_need, g.engineering, def.eng_need);
      var share = shareSum > 0 ? (g.cross_pool_share / shareSum) : (1 / gs.length);
      total += def.local_pool * c * M.platform_multiplier_funded + share * M.cross_pool * c;
    });
    return total;
  }

  /* ---------- results validation ---------------------------------------- */

  var REQUIRED_TOTALS = [
    "platform_funded", "platform_multiplier", "cross_pool_unlocked",
    "enterprise_value", "enterprise_target", "gate_met"
  ];

  /* Derived if the orchestrator omitted them, so older runs still render. */
  function normalizeTotals(r) {
    var t = r.totals, gs = r.groups || [];
    if (t.target_ambition === undefined) t.target_ambition = t.enterprise_target;
    if (t.target_committed === undefined) {
      t.target_committed = gs.reduce(function (a, g) { return a + (g.target || 0); }, 0);
    }
    if (t.commitment_gap === undefined) {
      t.commitment_gap = t.target_ambition - t.target_committed;
    }
    return r;
  }
  var REQUIRED_GROUP = [
    "id", "name", "agent", "capital", "engineering", "target", "pledge",
    "capability", "local_pool", "value_realized", "group_score", "rubric", "rationale"
  ];

  function validateResults(r) {
    var errs = [];
    if (!r || typeof r !== "object") return ["Top level is not a JSON object."];
    if (typeof r.round !== "number") errs.push("Missing numeric `round`.");
    if (!r.totals || typeof r.totals !== "object") errs.push("Missing `totals` object.");
    else REQUIRED_TOTALS.forEach(function (k) {
      if (r.totals[k] === undefined) errs.push("Missing `totals." + k + "`.");
    });

    if (!Array.isArray(r.groups) || r.groups.length === 0) errs.push("Missing or empty `groups` array.");
    else r.groups.forEach(function (g, i) {
      REQUIRED_GROUP.forEach(function (k) {
        if (g[k] === undefined) errs.push("Group " + i + " (" + (g.id || "?") + ") missing `" + k + "`.");
      });
      if (g.id && !groupById(g.id)) errs.push("Group " + i + " has unknown id `" + g.id + "`.");
      if (g.rubric) {
        S.rubric.forEach(function (d) {
          if (g.rubric[d.id] === undefined) errs.push("Group `" + g.id + "` missing rubric." + d.id + ".");
        });
      }
    });

    if (r.ranking !== null && r.ranking !== undefined && !Array.isArray(r.ranking)) {
      errs.push("`ranking` must be null or an array of group ids.");
    }
    if (!errs.length) normalizeTotals(r);
    return errs;
  }

  /* ---------- export ----------------------------------------------------- */

  window.Aster = {
    S: S, M: M,
    qs: qs, qsa: qsa, el: el, esc: esc, param: param,
    money: money, money0: money0,
    groups: groups, groupById: groupById, currentGroup: currentGroup,
    applyAccent: applyAccent, ACCENT_HEX: ACCENT_HEX,
    store: store, removeStore: removeStore,
    getRound: getRound, setRound: setRound, briefKey: briefKey,
    isFacilitator: isFacilitator,
    mountChrome: mountChrome,
    renderTable: renderTable, renderRubric: renderRubric, renderRounds: renderRounds,
    toast: toast,
    briefLength: briefLength, briefToMarkdown: briefToMarkdown,
    capability: capability, counterfactual: counterfactual, normalizeTotals: normalizeTotals,
    validateResults: validateResults
  };

  document.addEventListener("DOMContentLoaded", mountChrome);
})();
