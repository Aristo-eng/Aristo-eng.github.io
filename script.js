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
    site.hero.codeLines.forEach(function (line) {
      var div = document.createElement("div");
      if (line.className) div.className = line.className;
      div.textContent = line.text;
      el.appendChild(div);
    });
    var cursorLine = document.createElement("div");
    var cursor = document.createElement("span");
    cursor.className = "cursor";
    cursorLine.appendChild(cursor);
    el.appendChild(cursorLine);
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
    var termLabel = document.getElementById("terminal-label");
    if (termLabel && h.terminalLabel) termLabel.textContent = h.terminalLabel;
  }

  function renderAbout() {
    var a = site.about;
    if (!a) return;
    var title = document.getElementById("about-title");
    if (title) title.textContent = a.title || "About";
    var intro = document.getElementById("about-intro");
    if (intro) intro.textContent = a.intro || "";
    var hl = document.getElementById("about-highlights");
    if (hl && a.highlights) {
      clear(hl);
      a.highlights.forEach(function (h) {
        var box = document.createElement("div");
        box.className = "highlight";
        var v = document.createElement("span");
        v.className = "highlight-value";
        v.textContent = h.value;
        var l = document.createElement("span");
        l.className = "highlight-label";
        l.textContent = h.label;
        box.appendChild(v);
        box.appendChild(l);
        hl.appendChild(box);
      });
    }
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
    var avatar = document.getElementById("hero-avatar");
    if (avatar && site.brand && site.brand.avatarInitials) {
      avatar.textContent = site.brand.avatarInitials;
    }
  }

  function renderAvailability() {
    var el = document.getElementById("hero-availability");
    if (!el) return;
    if (site.availability) {
      el.textContent = site.availability;
    } else {
      el.style.display = "none";
    }
  }

  function renderSocialLinks() {
    var el = document.getElementById("social-links");
    if (!el || !site.socials) return;
    clear(el);
    var icons = {
      github: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
      linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      email: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    };
    site.socials.forEach(function (s) {
      var a = document.createElement("a");
      a.className = "social-link";
      a.href = s.href;
      if (s.href.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.setAttribute("aria-label", s.label);
      var iconHtml = icons[s.icon];
      if (iconHtml) {
        var tmp = document.createElement("span");
        tmp.innerHTML = iconHtml;
        a.appendChild(tmp.firstChild);
      }
      var text = document.createElement("span");
      text.textContent = s.label;
      a.appendChild(text);
      el.appendChild(a);
    });
  }

  function initScrollReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    elements.forEach(function (el) { observer.observe(el); });
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll('.nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;
    function onScroll() {
      var scrollY = window.scrollY;
      var current = "";
      sections.forEach(function (section) {
        if (scrollY >= section.offsetTop - 120) current = section.id;
      });
      navLinks.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  setMeta();
  renderBrand();
  renderNav();
  renderHero();
  renderAvailability();
  renderSocialLinks();
  renderAbout();
  renderExpertise();
  renderProjects();
  renderContact();
  renderFooter();
  initMobileNav();
  initScrollReveal();
  initScrollSpy();
})();
