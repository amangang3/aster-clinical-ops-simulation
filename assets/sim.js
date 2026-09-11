/* Aster Coordination Simulation — state machine, rendering, animation.
   Deterministic: identical inputs always produce identical output, including animation order.

   Number-free by design. The board is about matching the right deal to each division and
   realising the shared upside once all three commit — not about budgets. */

(function () {
  "use strict";

  var A   = window.ASTER;
  var S   = window.ASTER_SCRIPT;
  var FMT = window.ASTER_FMT;

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TYPE_MS  = 18;    // per character
  var SHAKE_MS = 180;
  var FLASH_MS = 700;
  var REVEAL_MS = 900;

  var el = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------------
     State — a committed flag per division, an ordered move log, and
     a per-division record of which deals have been offered.
     --------------------------------------------------------------- */

  var state, selected, closed, busy, hinted, gateShown, notesOn = false;
  var epoch = 0;    // bumped by reset and close, to cancel anything still in flight

  function freshState() {
    var committed = {}, spentMoves = {};
    A.groups.forEach(function (g) {
      committed[g.id] = false;
      spentMoves[g.id] = {};
    });
    return { committed: committed, applied: [], moveSpent: spentMoves };
  }

  function now() { return window.compute(state); }
  function committedIds() { return now().committed; }

  /* ---------------------------------------------------------------
     Animation helpers
     --------------------------------------------------------------- */

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
      var moves = document.createElement("div");
      moves.className = "moves";
      meta.appendChild(moves);

      A.moves.forEach(function (m) {
        var b = document.createElement("button");
        b.className = "move";
        b.dataset.move = m.id;
        b.title = S.deals[m.id].what;
        b.appendChild(document.createTextNode(m.label));
        // The framework label says nothing to a room seeing it cold, so the button also
        // carries what the deal actually is, in plain words.
        var plain = document.createElement("span");
        plain.className = "move__plain";
        plain.textContent = S.deals[m.id].name;
        b.appendChild(plain);
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

  function renderBand() {
    var r = now();
    el("upside-heading").textContent = S.board.upside_heading;
    el("count-heading").textContent = S.board.count_heading;
    el("offered-heading").textContent = S.board.offered_heading;

    var up = el("f-upside");
    up.textContent = r.funded ? S.board.realized : S.board.locked;
    up.className = "band__value " + (r.funded ? "mint" : "coral");

    var sub = el("f-upside-sub");
    if (r.funded)               sub.textContent = S.board.realized_sub;
    else if (r.count > 0)       sub.textContent = S.board.partial_sub;
    else                        sub.textContent = S.board.locked_sub;

    el("f-count").textContent = r.count + " of " + r.total;

    el("f-offered").textContent = state.applied.length;
    var wasted = state.applied.filter(function (a) { return !a.correct; }).length;
    el("f-offered-sub").textContent = (closed && wasted > 0)
      ? S.board.offered_wasted.replace("{n}", wasted)
      : "";
  }

  function renderMeter(animate) {
    var r = now();
    var meter = el("meter");
    meter.classList.toggle("is-funded", r.funded);
    el("meter-label").textContent = S.board.meter;
    el("meter-status").textContent = r.funded ? S.board.built : S.board.not_built;
    var pct = (r.count / r.total) * 100;
    if (!animate) el("meter-fill").style.transition = "none";
    el("meter-fill").style.width = pct + "%";
    if (!animate) { void el("meter-fill").offsetWidth; el("meter-fill").style.transition = ""; }
  }

  function renderNote() {
    var r = now();
    if (closed) { el("sim-note").textContent = S.system.closed_note; return; }
    if (r.funded)       el("sim-note").textContent = S.system.gate_funded;
    else if (r.count)   el("sim-note").textContent = S.system.partial;
    else                el("sim-note").textContent = S.system.opening;
  }

  function renderRows() {
    A.groups.forEach(function (g) {
      var row = rowOf(g.id);
      var committed = state.committed[g.id];
      row.classList.toggle("is-committed", committed);
      row.querySelector(".badge--state").textContent = committed ? S.board.committed : S.board.defending;

      var blockBadge = row.querySelector(".badge--block");
      blockBadge.textContent = (committed ? "✓ " : "") + g.block.toUpperCase();
      blockBadge.hidden = !(committed || hinted);

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
      // A deal once offered to a division cannot be offered again, and a committed division is done.
      b.disabled = closed || busy || committed || !!mark;
    });
  }

  /* ---------------------------------------------------------------
     Presenter note — off by default, toggled with N. Derived from the
     board, so it can never disagree with what is on screen.
     --------------------------------------------------------------- */

  function beatId() {
    if (closed) return "closed";
    var r = now();
    if (r.funded) return "funded";
    if (r.count === 2) return "pivot";
    if (r.count === 1) return "first";
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
    renderBand();
    renderMeter(animate);
    renderRows();
    renderNote();
    renderNotes();
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

    var copy = S.groups[gid];
    var needs = FMT.needs(gid);              // one move, or two for Data & Analytics
    var correct = needs.indexOf(mid) !== -1; // a move this division actually needs
    var token = epoch;

    busy = true;

    // The button locks the moment the deal is offered.
    state.moveSpent[gid][mid] = correct ? "landed" : "spent";
    state.applied.push({ group_id: gid, move_id: mid, correct: correct });
    renderBand();
    A.groups.forEach(function (x) { renderMoves(x.id); });

    var row = rowOf(gid);
    var resp = row.querySelector(".response");

    if (!correct) {
      // Wrong deal: one shake, the rejection line, nothing else changes.
      if (!REDUCED) {
        row.classList.add("is-shaking");
        window.setTimeout(function () { row.classList.remove("is-shaking"); }, SHAKE_MS);
      }
      typeInto(resp, "“" + copy.responses[mid] + "”", "response--wrong", token).then(function () {
        if (token !== epoch) return;
        busy = false;
        A.groups.forEach(function (x) { renderMoves(x.id); });
      });
      return;
    }

    // A needed deal landed. It only commits the division once every needed deal has —
    // so the first of Data & Analytics' PRICE/STATUS pair is a real concession that still
    // does not close it.
    var complete = needs.every(function (n) { return state.moveSpent[gid][n] === "landed"; });

    if (!complete) {
      typeInto(resp, "“" + copy.responses[mid] + "”", "response--partial", token).then(function () {
        if (token !== epoch) return;
        busy = false;
        A.groups.forEach(function (x) { renderMoves(x.id); });
      });
      return;
    }

    // Every needed deal is in: the division commits.
    state.committed[gid] = true;
    var opensGate = now().funded && !gateShown;

    typeInto(resp, "“" + copy.commit + "”", "response--right", token).then(function () {
      if (token !== epoch) return;
      row.classList.add("is-flashing");
      window.setTimeout(function () { row.classList.remove("is-flashing"); }, FLASH_MS);
      renderRows();
      renderMeter(true);
      renderNote();
      renderNotes();
      if (opensGate) return gateReveal(token);
      renderBand();
      busy = false;
      A.groups.forEach(function (x) { renderMoves(x.id); });
    });
  }

  /* ---------------------------------------------------------------
     The gate reveal — the moment the session is built around. The shared
     upside flips from locked to realised. No numbers; plays the same every time.
     --------------------------------------------------------------- */

  function gateReveal(token) {
    gateShown = true;
    var sim = el("sim");

    if (REDUCED) {
      renderAll(false);
      busy = false;
      A.groups.forEach(function (x) { renderMoves(x.id); });
      return Promise.resolve();
    }

    sim.classList.add("is-dimmed");
    return wait(320)
      .then(function () {
        if (token !== epoch) throw 0;
        renderMeter(true);   // meter completes, status flips to Built
        renderNote();
        return wait(420);
      })
      .then(function () {
        if (token !== epoch) throw 0;
        sim.classList.remove("is-dimmed");
        // The upside badge flips to REALIZED with a one-shot pulse.
        renderBand();
        var up = el("f-upside");
        up.classList.add("is-revealing");
        window.setTimeout(function () { up.classList.remove("is-revealing"); }, REVEAL_MS);
        return wait(REVEAL_MS);
      })
      .then(function () {
        if (token !== epoch) return;
        busy = false;
        A.groups.forEach(function (x) { renderMoves(x.id); });
      })
      .catch(function () { /* superseded by a reset */ });
  }

  /* ---------------------------------------------------------------
     Closing the round — reachable from any state, including all-defending
     --------------------------------------------------------------- */

  function closeRound() {
    if (closed) return;
    closed = true;
    busy = false;
    epoch++;                       // cancel any typing still in flight
    el("sim").classList.remove("is-dimmed");
    renderAll(false);
    buildScoreboard();
    el("scoreboard").hidden = false;
  }

  function buildScoreboard() {
    var r = now();
    var all = r.funded;

    /* Headline cells — qualitative, no figures */
    el("score-head").innerHTML = "";
    var wasted = state.applied.filter(function (a) { return !a.correct; }).length;
    [
      ["Cross-division upside", all ? S.board.realized : S.board.locked, all ? "mint" : "coral"],
      ["Divisions committed", r.count + " of " + r.total, ""],
      ["Deals that changed nothing", String(wasted), wasted > 0 ? "coral" : ""]
    ].forEach(function (c) {
      var d = document.createElement("div");
      d.className = "band__cell";
      d.innerHTML = '<div class="micro"></div><div class="band__value ' + c[2] + '"></div>';
      d.querySelector(".micro").textContent = c[0];
      d.querySelector(".band__value").textContent = c[1];
      el("score-head").appendChild(d);
    });

    /* Verdict */
    var v = el("score-verdict");
    v.innerHTML = "";
    var lines = [];
    if (all) {
      lines.push({ html: S.scoreboard.verdict_all });
    } else if (r.count > 0) {
      lines.push({ html: S.scoreboard.verdict_partial });
      lines.push({ invariant: true, html: S.scoreboard.verdict_partial_note });
    } else {
      lines.push({ html: S.scoreboard.verdict_none });
    }
    lines.forEach(function (l) {
      var d = document.createElement("div");
      d.className = "score__verdict" + (l.invariant ? " score__invariant" : "");
      d.innerHTML = FMT.fill(l.html);
      v.appendChild(d);
    });

    /* Per-division table — state and the deal(s) it needed */
    el("score-table-heading").textContent = S.scoreboard.table_heading;
    var t = el("score-table");
    t.innerHTML =
      "<thead><tr><th>Division</th><th>State</th><th>What it needed</th></tr></thead><tbody></tbody>";
    var tb = t.querySelector("tbody");
    A.groups.forEach(function (g) {
      var c = state.committed[g.id];
      var tr = document.createElement("tr");
      tr.innerHTML = "<td></td><td class='" + (c ? "mint" : "coral") + "'></td><td></td>";
      tr.children[0].textContent = g.short;
      tr.children[1].textContent = c ? S.board.committed : S.board.defending;
      tr.children[2].textContent = FMT.needs(g.id).map(function (id) { return FMT.move(id).label; }).join(" + ");
      tb.appendChild(tr);
    });

    /* Deal ledger — every deal offered, in order, without costs */
    el("score-ledger-heading").textContent = S.scoreboard.ledger_heading;
    var ul = el("score-ledger");
    ul.innerHTML = "";
    if (state.applied.length === 0) {
      var li0 = document.createElement("li");
      li0.innerHTML = '<span class="idx"></span><span></span>';
      li0.children[1].textContent = S.scoreboard.ledger_empty;
      ul.appendChild(li0);
    }
    state.applied.forEach(function (a, i) {
      var g = FMT.group(a.group_id), m = FMT.move(a.move_id);
      var li = document.createElement("li");
      li.className = a.correct ? "right" : "wrong";
      li.innerHTML = '<span class="idx"></span><span></span>';
      li.children[0].textContent = (i + 1) + ".";
      li.children[1].innerHTML = "<b></b> on <span></span>";
      li.children[1].querySelector("b").textContent = m.label;
      li.children[1].querySelector("span").textContent = g.short;
      if (!a.correct) {
        var note = document.createElement("span");
        note.className = "outcome";
        note.textContent = " — " + S.scoreboard.changed_nothing;
        li.children[1].appendChild(note);
      }
      ul.appendChild(li);
    });

    el("score-back").textContent = S.scoreboard.back;
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
    el("f-upside").classList.remove("is-revealing");
    renderAll(false);
    select(0);
  }

  /* ---------------------------------------------------------------
     Facilitator keys — never shown on screen
     --------------------------------------------------------------- */

  // Left-to-right across the four deal buttons on each row. Reset is on Backspace,
  // since R now applies TRUST-BUILDING.
  var MOVE_KEYS = { q: "sequence", w: "price", e: "status", r: "trust" };

  function onKey(ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var k = ev.key;
    var overlay = el("keys");

    if (!overlay.hidden) { overlay.hidden = true; ev.preventDefault(); return; }
    if (k === "?") { overlay.hidden = false; ev.preventDefault(); return; }
    if (k === "Backspace") { reset(); ev.preventDefault(); return; }

    var lower = k.toLowerCase();

    if (k === "1" || k === "2" || k === "3") { select(parseInt(k, 10) - 1); ev.preventDefault(); return; }
    if (MOVE_KEYS[lower]) {
      applyMove(A.groups[selected].id, MOVE_KEYS[lower]);
      ev.preventDefault(); return;
    }
    if (lower === "h") { hinted = !hinted; renderRows(); ev.preventDefault(); return; }
    if (lower === "n") { notesOn = !notesOn; renderNotes(); ev.preventDefault(); return; }
    if (lower === "c") { closeRound(); ev.preventDefault(); return; }
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
