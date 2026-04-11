(function () {
  "use strict";

  var site = window.SITE;
  if (!site) return;

  function setMeta() {
    if (site.meta) {
      if (site.meta.title) document.title = site.meta.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && site.meta.description) desc.setAttribute("content", site.meta.description);
    }
  }

  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function renderNav() {
    var nav = document.getElementById("site-nav");
    if (!nav || !site.nav) return;
    clear(nav);
    site.nav.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      nav.appendChild(a);
    });
  }

  function renderHeroTitle() {
    var el = document.getElementById("hero-title");
    if (!el || !site.hero || !site.hero.titleParts) return;
    clear(el);
    site.hero.titleParts.forEach(function (part) {
      var node = part.emphasis ? document.createElement("em") : document.createElement("span");
      node.textContent = part.text;
      el.appendChild(node);
    });
  }

  function renderHeroCode() {
    var el = document.getElementById("hero-code");
    if (!el || !site.hero || !site.hero.codeLines) return;
    clear(el);
    site.hero.codeLines.forEach(function (line, i) {
      var div = document.createElement("div");
      if (line.className) div.className = line.className;
      div.textContent = line.text;
      el.appendChild(div);
    });
  }

  function renderHero() {
    var h = site.hero;
    if (!h) return;
    var eyebrow = document.getElementById("hero-eyebrow");
    if (eyebrow) eyebrow.textContent = h.eyebrow || "";
    var lead = document.getElementById("hero-lead");
    if (lead) lead.textContent = h.lead || "";
    renderHeroTitle();
    renderHeroCode();

    var actions = document.getElementById("hero-actions");
    if (actions) {
      clear(actions);
      if (h.primaryCta) {
        var a = document.createElement("a");
        a.className = "btn btn-primary";
        a.href = h.primaryCta.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = h.primaryCta.label;
        actions.appendChild(a);
      }
      if (h.secondaryCta) {
        var b = document.createElement("a");
        b.className = "btn btn-ghost";
        b.href = h.secondaryCta.href;
        b.textContent = h.secondaryCta.label;
        actions.appendChild(b);
      }
    }
  }

  function renderAbout() {
    var a = site.about;
    if (!a) return;
    var title = document.getElementById("about-title");
    if (title) title.textContent = a.title || "About";
    var intro = document.getElementById("about-intro");
    if (intro) intro.textContent = a.intro || "";
    var skills = document.getElementById("skill-pills");
    if (skills && a.skills) {
      clear(skills);
      a.skills.forEach(function (s) {
        var span = document.createElement("span");
        span.className = "pill";
        span.textContent = s;
        skills.appendChild(span);
      });
    }
  }

  function renderExpertise() {
    var e = site.expertise;
    if (!e) return;
    var intro = document.getElementById("expertise-intro");
    if (intro) intro.textContent = e.intro || "";
    var grid = document.getElementById("expertise-cards");
    if (!grid || !e.columns) return;
    clear(grid);
    e.columns.forEach(function (col) {
      var art = document.createElement("article");
      art.className = "card" + (col.accent ? " card-accent" : "");
      var h3 = document.createElement("h3");
      h3.className = "card-title";
      h3.textContent = col.title;
      art.appendChild(h3);
      var ul = document.createElement("ul");
      ul.className = "card-list";
      (col.items || []).forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      art.appendChild(ul);
      grid.appendChild(art);
    });
  }

  function renderProjects() {
    var p = site.projects;
    if (!p) return;
    var t = document.getElementById("projects-title");
    if (t) t.textContent = p.title || "Projects";
    var intro = document.getElementById("projects-intro");
    if (intro) intro.textContent = p.intro || "";
    var grid = document.getElementById("project-grid");
    if (!grid || !p.items) return;
    clear(grid);
    p.items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "project-card";
      var h3 = document.createElement("h3");
      h3.className = "project-title";
      h3.textContent = item.title;
      card.appendChild(h3);
      var desc = document.createElement("p");
      desc.className = "project-desc";
      desc.textContent = item.description;
      card.appendChild(desc);
      if (item.tags && item.tags.length) {
        var tags = document.createElement("div");
        tags.className = "project-tags";
        item.tags.forEach(function (tag) {
          var s = document.createElement("span");
          s.className = "tag";
          s.textContent = tag;
          tags.appendChild(s);
        });
        card.appendChild(tags);
      }
      if (item.link && item.linkLabel) {
        var link = document.createElement("a");
        link.className = "project-link";
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.linkLabel + " →";
        card.appendChild(link);
      }
      grid.appendChild(card);
    });
  }

  function renderContact() {
    var c = site.contact;
    if (!c) return;
    var title = document.getElementById("contact-title");
    if (title) title.textContent = c.title || "Contact";
    var lead = document.getElementById("contact-lead");
    if (lead) lead.textContent = c.lead || "";
    var btn = document.getElementById("contact-btn");
    if (btn && c.button) {
      btn.href = c.button.href;
      btn.textContent = c.button.label;
    }
  }

  function renderFooter() {
    var f = site.footer;
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    var line = document.getElementById("footer-line");
    if (line && f && f.line) line.textContent = f.line;
  }

  function renderBrand() {
    var logo = document.getElementById("logo-text");
    if (logo && site.brand && site.brand.shortName) {
      clear(logo);
      logo.appendChild(document.createTextNode(site.brand.shortName));
      var dot = document.createElement("span");
      dot.className = "logo-dot";
      dot.textContent = ".";
      logo.appendChild(dot);
    }
  }

  setMeta();
  renderBrand();
  renderNav();
  renderHero();
  renderAbout();
  renderExpertise();
  renderProjects();
  renderContact();
  renderFooter();
})();
