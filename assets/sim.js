/* Aster Coordination Simulation — state machine, rendering, animation.
   Deterministic: identical inputs always produce identical output, including animation order. */

(function () {
  "use strict";

  var A     = window.ASTER;
  var S     = window.ASTER_SCRIPT;
  var FMT   = window.ASTER_FMT;
  var money = FMT.money;
  var moneyInt = FMT.moneyInt;

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TYPE_MS       = 18;    // per character
  var COUNT_MS      = 800;
  var GATE_COUNT_MS = 1200;
  var SHAKE_MS      = 180;
  var FLASH_MS      = 700;

  var el = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------------
     State — three booleans, an ordered move log, and a spend tally
     --------------------------------------------------------------- */

  var state, selected, closed, busy, hinted, gateShown, notesOn = false;
  var epoch = 0;    // bumped by reset and close, to cancel anything still in flight
  var shown = {};   // last displayed figures, so count-ups know where to start

  function freshState() {
    var committed = {}, spentMoves = {};
    A.groups.forEach(function (g) {
      committed[g.id] = false;
      spentMoves[g.id] = {};
    });
    return { committed: committed, applied: [], spent: 0, moveSpent: spentMoves };
  }

  function now() { return window.compute(state); }

  /* Baseline and ceiling are properties of the model, not of the round. */
  function withCommitted(ids) {
    var c = {};
    A.groups.forEach(function (g) { c[g.id] = ids.indexOf(g.id) !== -1; });
    return window.compute({ committed: c, applied: [], spent: 0 });
  }
  var BASELINE = withCommitted([]);                                  // nobody moved
  var CEILING  = withCommitted(A.groups.map(function (g) { return g.id; }));

  /* ---------------------------------------------------------------
     Animation helpers
     --------------------------------------------------------------- */

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function countTo(node, key, to, ms, format) {
    var from = typeof shown[key] === "number" ? shown[key] : to;
    shown[key] = to;
    if (REDUCED || ms === 0 || from === to) { node.textContent = format(to); return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / ms);
      node.textContent = format(from + (to - from) * easeOut(t));
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function typeInto(node, text, cls, token) {
    node.className = "response" + (cls ? " " + cls : "");
    if (REDUCED) { node.textContent = text; return Promise.resolve(); }
    node.textContent = "";
    node.classList.add("is-typing");
    return new Promise(function (resolve) {
      var i = 0;
      (function tick() {
        if (token !== epoch) { resolve(); return; }
        node.textContent = text.slice(0, ++i);
        if (i < text.length) { window.setTimeout(tick, TYPE_MS); }
        else { node.classList.remove("is-typing"); resolve(); }
      })();
    });
  }

  function wait(ms) {
    if (REDUCED) return Promise.resolve();
    return new Promise(function (r) { window.setTimeout(r, ms); });
  }

  /* ---------------------------------------------------------------
     Board construction
     --------------------------------------------------------------- */

  function buildBoard() {
    var board = el("board");
    board.textContent = "";
    A.groups.forEach(function (g, i) {
      var copy = S.groups[g.id];
      var row = document.createElement("article");
      row.className = "row accent-" + g.accent;
      row.dataset.group = g.id;

      var id = document.createElement("div");
      id.className = "row__id";
      id.innerHTML =
        '<div class="row__name"><span class="dot"></span></div>' +
        '<div class="row__lead"></div>' +
        '<div class="row__badges">' +
          '<span class="badge badge--state"></span>' +
          '<span class="badge badge--block" hidden></span>' +
        '</div>';
      id.querySelector(".row__name").appendChild(document.createTextNode(g.short));
      id.querySelector(".row__lead").textContent = g.lead;

      var talk = document.createElement("div");
      talk.className = "row__talk";
      var obj = document.createElement("p");
      obj.className = "objection";
      obj.textContent = "“" + copy.objection + "”";
      var resp = document.createElement("p");
      resp.className = "response";
      talk.appendChild(obj);
      talk.appendChild(resp);

      var meta = document.createElement("div");
      meta.className = "row__meta";
      meta.innerHTML =
        '<div class="bar">' +
          '<div class="bar__seg bar__local"></div>' +
          '<div class="bar__seg bar__cross"></div>' +
        '</div>' +
        '<div class="bar__legend">' +
          '<span>Local <b class="v-local tabular"></b></span>' +
          '<span>Cross-boundary <b class="v-cross tabular"></b></span>' +
        '</div>' +
        '<div class="moves"></div>';

      var moves = meta.querySelector(".moves");
      A.moves.forEach(function (m) {
        var b = document.createElement("button");
        b.className = "move";
        b.dataset.move = m.id;
        b.title = m.blurb;
        b.appendChild(document.createTextNode(m.label));
        var s = document.createElement("span");
        s.textContent = moneyInt(m.cost);
        b.appendChild(s);
        b.addEventListener("click", function () { applyMove(g.id, m.id); });
        moves.appendChild(b);
      });

      row.appendChild(id);
      row.appendChild(talk);
      row.appendChild(meta);
      row.addEventListener("click", function () { select(i); });
      board.appendChild(row);
    });
  }

  function rowOf(gid) { return el("board").querySelector('[data-group="' + gid + '"]'); }

  /* ---------------------------------------------------------------
     Rendering
     --------------------------------------------------------------- */

  function renderBand(animate) {
    var r = now();
    countTo(el("f-enterprise"), "enterprise", r.enterprise, animate ? COUNT_MS : 0, money);
    el("f-enterprise-sub").textContent = "Ambition " + moneyInt(A.ambition);

    var gapNode = el("f-gap");
    var ahead = r.gap <= 0;
    gapNode.className = "band__value tabular " + (ahead ? "mint" : "coral");
    countTo(gapNode, "gap", Math.abs(r.gap), animate ? COUNT_MS : 0, function (v) {
      return (ahead ? "Ahead " : "Short ") + money(v);
    });

    countTo(el("f-spent"), "spent", r.spent, animate ? COUNT_MS : 0, moneyInt);
    el("f-spent-sub").textContent = closed && r.wasted > 0
      ? "Of which wasted " + moneyInt(r.wasted)
      : "";

    renderNotes();
  }

  function renderMeter(animate) {
    var r = now();
    var meter = el("meter");
    meter.classList.toggle("is-funded", r.funded);
    el("meter-label").textContent = "Shared trial-data layer — "
      + moneyInt(r.pledged) + " pledged of " + moneyInt(A.infrastructure_required);
    el("meter-status").textContent = r.funded ? "Funded" : "Not funded";
    var pct = Math.min(100, (r.pledged / A.infrastructure_required) * 100);
    if (!animate) el("meter-fill").style.transition = "none";
    el("meter-fill").style.width = pct + "%";
    if (!animate) { void el("meter-fill").offsetWidth; el("meter-fill").style.transition = ""; }
  }

  function renderNote() {
    var r = now();
    if (closed) { el("sim-note").textContent = "Round closed — press R to reset."; return; }
    el("sim-note").textContent = r.funded
      ? S.system.gate_funded
      : S.system.gate_short
          .replace("{pledged}", moneyInt(r.pledged))
          .replace("{required}", moneyInt(A.infrastructure_required));
  }

  /* skipBars holds the value bars at their current widths so the gate reveal,
     and only the gate reveal, gets to grow them. */
  function renderRows(animateBars, skipBars) {
    var r = now();
    A.groups.forEach(function (g) {
      var row = rowOf(g.id);
      var p = r.per.filter(function (x) { return x.id === g.id; })[0];
      var max = g.local_pool + g.cross_value;
      var committed = state.committed[g.id];

      row.classList.toggle("is-committed", committed);
      row.querySelector(".badge--state").textContent = committed ? "Committed" : "Defending";

      var blockBadge = row.querySelector(".badge--block");
      blockBadge.textContent = (committed ? "✓ " : "") + g.block.toUpperCase();
      blockBadge.hidden = !(committed || hinted);

      if (!skipBars) {
        var localSeg = row.querySelector(".bar__local");
        var crossSeg = row.querySelector(".bar__cross");
        if (!animateBars) { localSeg.style.transition = "none"; crossSeg.style.transition = "none"; }
        localSeg.style.width = (p.local / max * 100) + "%";
        crossSeg.style.width = (p.cross / max * 100) + "%";
        if (!animateBars) {
          void localSeg.offsetWidth;
          localSeg.style.transition = ""; crossSeg.style.transition = "";
        }
        row.querySelector(".v-local").textContent = money(p.local);
        row.querySelector(".v-cross").textContent = money(p.cross);
      }

      renderMoves(g.id);
    });
  }

  function renderMoves(gid) {
    var row = rowOf(gid);
    var committed = state.committed[gid];
    A.moves.forEach(function (m) {
      var b = row.querySelector('[data-move="' + m.id + '"]');
      var mark = state.moveSpent[gid][m.id];
      b.classList.toggle("is-spent", mark === "spent");
      b.classList.toggle("is-landed", mark === "landed");
      // A move once spent on a group cannot be spent again, and a committed group is done.
      b.disabled = closed || busy || committed || !!mark;
    });
  }

  /* ---------------------------------------------------------------
     Presenter note — off by default, toggled with N. The beat is derived
     from the board, so it can never disagree with what is on screen.
     --------------------------------------------------------------- */

  function beatId() {
    if (closed) return "closed";
    if (now().funded) return "funded";
    var committed = committedIds().length;
    if (committed === 2) return "pivot";
    if (committed === 1) return "first";
    return state.applied.length ? "probing" : "opening";
  }

  function renderNotes() {
    var panel = el("notes");
    panel.hidden = !notesOn;
    if (!notesOn) return;
    var beat = S.notes.beats[beatId()];
    el("notes-heading").textContent = S.notes.heading;
    el("notes-beat").textContent = beat.title;
    el("notes-body").textContent = FMT.fill(beat.body);
    el("notes-hint").textContent = S.notes.hint;
  }

  function renderAll(animate) {
    renderBand(animate);
    renderMeter(animate);
    renderRows(animate);
    renderNote();
  }

  function select(i) {
    selected = i;
    A.groups.forEach(function (g, j) {
      rowOf(g.id).classList.toggle("is-selected", j === i);
    });
  }

  /* ---------------------------------------------------------------
     Applying a move
     --------------------------------------------------------------- */

  function applyMove(gid, mid) {
    if (busy || closed) return;
    if (state.committed[gid]) return;
    if (state.moveSpent[gid][mid]) return;

    var g = FMT.group(gid);
    var m = FMT.move(mid);
    var correct = m.answers === g.block;   // nothing else in the system decides this
    var token = epoch;

    busy = true;

    // 1. The button locks and the money is gone before anyone knows whether it worked.
    state.spent += m.cost;
    state.moveSpent[gid][mid] = correct ? "landed" : "spent";
    state.applied.push({ group_id: gid, move_id: mid, correct: correct });
    renderBand(true);
    A.groups.forEach(function (x) { renderMoves(x.id); });

    var row = rowOf(gid);
    var resp = row.querySelector(".response");
    var line = S.groups[gid].responses[mid];

    if (!correct) {
      // 3. Wrong move: one shake, the rejection line, and nothing else changes.
      if (!REDUCED) {
        row.classList.add("is-shaking");
        window.setTimeout(function () { row.classList.remove("is-shaking"); }, SHAKE_MS);
      }
      typeInto(resp, "“" + line + "”", "response--wrong", token).then(function () {
        if (token !== epoch) return;
        busy = false;
        A.groups.forEach(function (x) { renderMoves(x.id); });
      });
      return;
    }

    // 4. Right move.
    state.committed[gid] = true;
    var opensGate = now().funded && !gateShown;

    typeInto(resp, "“" + line + "”", "response--right", token).then(function () {
      if (token !== epoch) return;
      row.classList.add("is-flashing");
      window.setTimeout(function () { row.classList.remove("is-flashing"); }, FLASH_MS);
      // The badge flips and the block label appears now; if this is the third commit
      // the meter, the bars and the figures belong to the gate reveal instead.
      renderRows(true, opensGate);
      if (opensGate) return gateReveal(token);
      renderMeter(true);
      renderBand(true);
      renderNote();
      busy = false;
      A.groups.forEach(function (x) { renderMoves(x.id); });
    });
  }

  /* ---------------------------------------------------------------
     The gate reveal — the moment the session is built around.
     Nothing here is conditional or random; it plays identically every time.
     --------------------------------------------------------------- */

  function gateReveal(token) {
    gateShown = true;
    var sim = el("sim");
    var sub = el("f-enterprise-sub");

    if (REDUCED) {
      renderAll(false);
      busy = false;
      A.groups.forEach(function (x) { renderMoves(x.id); });
      return Promise.resolve();
    }

    // 1. Everything else dims to 40%
    sim.classList.add("is-dimmed");

    return wait(300)
      // 2. The meter completes and the label flips
      .then(function () {
        if (token !== epoch) throw 0;
        renderMeter(true);
        renderNote();
      })
      // 3. The multiplier reads out 0.55 -> 1.00
      .then(function () { return wait(300); })
      .then(function () {
        if (token !== epoch) throw 0;
        return tickMultiplier(sub, token);
      })
      // 4. The bars grow, cross-boundary appearing for the first time
      .then(function () {
        if (token !== epoch) throw 0;
        renderRows(true);
        return wait(500);
      })
      // 5. Enterprise value counts up to the funded figure
      .then(function () {
        if (token !== epoch) throw 0;
        sim.classList.remove("is-dimmed");
        sub.textContent = "Ambition " + moneyInt(A.ambition);
        countTo(el("f-enterprise"), "enterprise", CEILING.enterprise, GATE_COUNT_MS, money);
        return wait(GATE_COUNT_MS);
      })
      // 6. Only then does VS AMBITION flip from coral SHORT to mint AHEAD
      .then(function () {
        if (token !== epoch) return;
        renderBand(true);
        busy = false;
        A.groups.forEach(function (x) { renderMoves(x.id); });
      })
      .catch(function () { /* superseded by a reset */ });
  }

  function tickMultiplier(node, token) {
    var from = A.multiplier_unfunded, to = A.multiplier_funded, ms = 500;
    return new Promise(function (resolve) {
      var start = null;
      (function step(ts) {
        if (token !== epoch) { resolve(); return; }
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / ms);
        var v = from + (to - from) * easeOut(t);
        node.textContent = "Multiplier " + from.toFixed(2) + " → " + v.toFixed(2);
        if (t < 1) window.requestAnimationFrame(step); else resolve();
      })(window.performance.now());
    });
  }

  /* ---------------------------------------------------------------
     Closing the round — reachable from any state, including all-defending
     --------------------------------------------------------------- */

  function committedIds() {
    return A.groups.filter(function (g) { return state.committed[g.id]; })
                   .map(function (g) { return g.id; });
  }

  function closeRound() {
    if (closed) return;
    closed = true;
    busy = false;
    epoch++;                       // cancel any typing still in flight
    // Closing mid-gate-reveal abandons the reveal, so undim the board it left behind.
    el("sim").classList.remove("is-dimmed");
    renderAll(false);
    buildScoreboard();
    el("scoreboard").hidden = false;
  }

  function buildScoreboard() {
    var r = now();
    var ids = committedIds();
    var all = ids.length === A.groups.length;

    el("score-head").innerHTML = "";
    [
      ["Enterprise value", money(r.enterprise), ""],
      ["Vs ambition", (r.gap <= 0 ? "Ahead " : "Short ") + money(Math.abs(r.gap)), r.gap <= 0 ? "mint" : "coral"],
      ["Spent on deals", moneyInt(r.spent), ""],
      ["Of which wasted", moneyInt(r.wasted), r.wasted > 0 ? "coral" : ""]
    ].forEach(function (c) {
      var d = document.createElement("div");
      d.className = "band__cell";
      d.innerHTML = '<div class="micro"></div><div class="band__value tabular ' + c[2] + '"></div>';
      d.querySelector(".micro").textContent = c[0];
      d.querySelector(".band__value").textContent = c[1];
      el("score-head").appendChild(d);
    });

    /* Verdict */
    var v = el("score-verdict");
    v.innerHTML = "";
    var lines = [];
    if (all) {
      var landed = state.applied.filter(function (a) { return a.correct; })
        .reduce(function (s, a) { return s + FMT.move(a.move_id).cost; }, 0);
      var gain = r.enterprise - BASELINE.enterprise;
      lines.push({
        html: "<b>" + moneyInt(landed) + "</b> of deals unlocked <b>" + money(gain) +
              "</b>. A return of <b>" + (gain / landed).toFixed(2) + "×</b>."
      });
    } else {
      lines.push({
        html: "All three committed would have produced <b>" + money(CEILING.enterprise) +
              "</b>. You reached " + money(r.enterprise) + ". The layer was never built."
      });
      if (ids.length > 0) {
        lines.push({
          invariant: true,
          html: "Partial coordination cost more than doing nothing. Doing nothing produced <b>" +
                money(BASELINE.enterprise) + "</b>."
        });
      } else {
        lines.push({ html: S.system.nobody_moved });
      }
    }
    lines.forEach(function (l) {
      var d = document.createElement("div");
      d.className = "score__verdict" + (l.invariant ? " score__invariant" : "");
      d.innerHTML = l.html;
      v.appendChild(d);
    });

    /* Per-group table */
    el("score-table-heading").textContent = S.scoreboard.table_heading;
    var t = el("score-table");
    t.innerHTML =
      "<thead><tr><th>Division</th><th>State</th><th class='num'>Capability</th>" +
      "<th class='num'>Local</th><th class='num'>Cross</th><th class='num'>Total</th></tr></thead><tbody></tbody>";
    var tb = t.querySelector("tbody");
    A.groups.forEach(function (g) {
      var p = r.per.filter(function (x) { return x.id === g.id; })[0];
      var c = state.committed[g.id];
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td></td><td class='" + (c ? "mint" : "coral") + "'></td>" +
        "<td class='num'></td><td class='num'></td><td class='num'></td><td class='num'></td>";
      var td = tr.children;
      td[0].textContent = g.short;
      td[1].textContent = c ? "Committed" : "Defending";
      td[2].textContent = p.capability.toFixed(3);
      td[3].textContent = money(p.local);
      td[4].textContent = money(p.cross);
      td[5].textContent = money(p.value);
      tb.appendChild(tr);
    });

    /* Deal ledger */
    el("score-ledger-heading").textContent = S.scoreboard.ledger_heading;
    var ul = el("score-ledger");
    ul.innerHTML = "";
    if (state.applied.length === 0) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="idx"></span><span></span><span></span>';
      li.children[1].textContent = S.scoreboard.ledger_empty;
      ul.appendChild(li);
    }
    state.applied.forEach(function (a, i) {
      var g = FMT.group(a.group_id), m = FMT.move(a.move_id);
      var li = document.createElement("li");
      li.className = a.correct ? "right" : "wrong";
      li.innerHTML = '<span class="idx"></span><span></span><span class="cost tabular"></span>';
      li.children[0].textContent = (i + 1) + ".";
      li.children[1].innerHTML = "<b></b> on <span></span>";
      li.children[1].querySelector("b").textContent = m.label;
      li.children[1].querySelector("span").textContent = g.short;
      if (!a.correct) {
        var note = document.createElement("span");
        note.className = "outcome";
        note.textContent = " — " + S.scoreboard.bought_nothing;
        li.children[1].appendChild(note);
      }
      li.children[2].textContent = moneyInt(m.cost);
      ul.appendChild(li);
    });

    el("score-back").textContent = S.scoreboard.back;
    var link = el("score-debrief");
    link.textContent = S.scoreboard.debrief;
    link.href = "debrief.html#committed=" + (ids.length ? ids.join(",") : "none");
  }

  /* ---------------------------------------------------------------
     Reset
     --------------------------------------------------------------- */

  function reset() {
    epoch++;
    state = freshState();
    selected = 0;
    closed = false;
    busy = false;
    hinted = false;
    gateShown = false;
    shown = {};
    el("sim").classList.remove("is-dimmed");
    el("scoreboard").hidden = true;
    el("keys").hidden = true;
    A.groups.forEach(function (g) {
      var row = rowOf(g.id);
      row.classList.remove("is-flashing", "is-shaking");
      var resp = row.querySelector(".response");
      resp.className = "response";
      resp.textContent = "";
    });
    renderAll(false);
    select(0);
  }

  /* ---------------------------------------------------------------
     Facilitator keys — never shown on screen
     --------------------------------------------------------------- */

  var MOVE_KEYS = { q: "sequence", w: "price", e: "underwrite" };

  function onKey(ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var k = ev.key;
    var overlay = el("keys");

    if (!overlay.hidden) { overlay.hidden = true; ev.preventDefault(); return; }
    if (k === "?") { overlay.hidden = false; ev.preventDefault(); return; }

    var lower = k.toLowerCase();

    if (k === "1" || k === "2" || k === "3") { select(parseInt(k, 10) - 1); ev.preventDefault(); return; }
    if (MOVE_KEYS[lower]) {
      applyMove(A.groups[selected].id, MOVE_KEYS[lower]);
      ev.preventDefault(); return;
    }
    if (lower === "h") { hinted = !hinted; renderRows(false); ev.preventDefault(); return; }
    if (lower === "n") { notesOn = !notesOn; renderNotes(); ev.preventDefault(); return; }
    if (lower === "c") { closeRound(); ev.preventDefault(); return; }
    if (lower === "r") { reset(); ev.preventDefault(); return; }
  }

  function buildKeysOverlay() {
    el("keys-heading").textContent = S.keys.heading;
    el("keys-dismiss").textContent = S.keys.dismiss;
    var host = el("keys-rows");
    host.innerHTML = "";
    S.keys.rows.forEach(function (r) {
      var d = document.createElement("div");
      d.className = "keys__row";
      d.innerHTML = "<kbd></kbd><span></span>";
      d.querySelector("kbd").textContent = r[0];
      d.querySelector("span").textContent = r[1];
      host.appendChild(d);
    });
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */

  document.title = A.meta.org + " — " + S.landing.title;
  buildBoard();
  buildKeysOverlay();
  el("close-round").textContent = "Close the round";
  el("close-round").addEventListener("click", closeRound);
  el("score-back").addEventListener("click", function () { el("scoreboard").hidden = true; });
  document.addEventListener("keydown", onKey);
  reset();
})();
