/* The flow between the pages: situation → exercise → debrief, with the facilitator
   guide to one side. Rendered from data/script.js so the wording lives in one place.

   Any page that wants it carries <nav id="nav"></nav>; add data-variant="compact"
   to get the quiet single-line version the exercise uses in its footer. */

(function () {
  "use strict";

  var host = document.getElementById("nav");
  if (!host) return;

  var N = window.ASTER_SCRIPT.nav;
  var compact = host.dataset.variant === "compact";
  var here = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  host.className = "nav" + (compact ? " nav--compact" : "");

  var steps = document.createElement("div");
  steps.className = "nav__steps";

  N.steps.forEach(function (s) {
    var current = s.href.toLowerCase() === here;
    var node = document.createElement(current ? "span" : "a");
    node.className = "nav__step" + (current ? " is-current" : "");
    if (!current) node.href = s.href;

    var n = document.createElement("b");
    n.className = "nav__n";
    n.textContent = s.n;
    node.appendChild(n);

    var label = document.createElement("span");
    label.className = "nav__label";
    label.textContent = s.label;
    node.appendChild(label);

    if (!compact) {
      var note = document.createElement("span");
      note.className = "nav__note";
      note.textContent = s.note;
      node.appendChild(note);
    }

    steps.appendChild(node);
  });

  host.appendChild(steps);

  // The guide is deliberately not a numbered step: it is never part of the class flow.
  var guideHere = N.guide_href.toLowerCase() === here;
  var guide = document.createElement(guideHere ? "span" : "a");
  guide.className = "nav__guide" + (guideHere ? " is-current" : "");
  if (!guideHere) guide.href = N.guide_href;
  guide.textContent = N.guide;
  if (!compact) guide.title = N.guide_note;
  host.appendChild(guide);
})();
