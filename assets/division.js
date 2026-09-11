/* One page per division. The page itself is a shell: which group it belongs to comes
   from data-group on the body, and everything else comes from data/model.js and
   data/script.js, so no figure and no sentence is typed into the HTML. */

(function () {
  "use strict";

  var A = window.ASTER, S = window.ASTER_SCRIPT, FMT = window.ASTER_FMT;
  var D = S.divisions;
  var el = function (id) { return document.getElementById(id); };

  var id = document.body.dataset.group;
  var g = FMT.group(id);
  var copy = S.groups[id];
  var fill = function (text) { return FMT.fill(text); };

  document.title = A.meta.org + " — " + g.short;
  document.body.classList.add("accent-" + g.accent);

  // textContent would drop the accent dot the heading already carries.
  el("name").appendChild(document.createTextNode(g.name));
  el("lead").textContent = g.lead;
  el("role").textContent = fill(copy.role);

  el("position-heading").textContent = D.labels.position;
  copy.position.forEach(function (para) {
    var p = document.createElement("p");
    p.textContent = fill(para);
    el("position").appendChild(p);
  });

  el("said-heading").textContent = D.labels.said;
  el("said").textContent = "“" + copy.objection + "”";
  el("said-lead").textContent = g.lead;

  el("measured-heading").textContent = D.labels.measured;
  el("measured").textContent = fill(copy.measured);

  el("ask-heading").textContent = D.labels.ask;
  el("ask").textContent = fill(D.ask_line);

  el("work-heading").textContent = D.labels.work_out;
  el("work").textContent = fill(copy.work_out);

  /* The three pages are a loop, so a reader can walk all of them and end at the hub. */
  var order = A.groups.map(function (x) { return x.id; });
  var nextId = order[(order.indexOf(id) + 1) % order.length];
  var next = FMT.group(nextId);
  var nextLink = el("next");
  nextLink.href = nextId + ".html";
  nextLink.textContent = D.next + ": " + next.short;
  el("back").textContent = D.back;
})();
