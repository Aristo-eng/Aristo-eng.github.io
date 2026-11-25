/**
 * Visual effects: animated neural-network background with drifting ML math,
 * scroll progress, card spotlight + tilt, count-up figures, typed terminal.
 * Respects prefers-reduced-motion and pauses when the tab is hidden.
 */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ------------------------------------------------------------------ */
  /* Neural network background                                          */
  /* ------------------------------------------------------------------ */

  var canvas = document.getElementById("bg-canvas");
  var ctx = canvas && canvas.getContext("2d");

  var GLYPHS = [
    "∇θ L(θ)",
    "σ(Wx + b)",
    "∂L/∂w",
    "softmax(QKᵀ/√d)",
    "argmin_θ Σ ℓ(f(xᵢ), yᵢ)",
    "p(y | x)",
    "λ‖w‖²",
    "max(0, x)",
    "𝔼[X]",
    "∫ p(x) dx",
    "θ ← θ − η∇L",
    "KL(p ‖ q)",
    "h_t = tanh(Wh_{t−1} + Ux_t)",
    "Σ",
    "∂",
    "∇",
    "μ ± σ",
    "Var(X)",
    "R²",
    "y = Xβ + ε",
  ];

  var W = 0, H = 0, DPR = 1;
  var nodes = [], edges = [], layers = [], pulses = [], glyphs = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var scrollY = 0;
  var running = true;
  var last = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function build() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Layered network (an MLP drawn across the viewport)
    var small = W < 700;
    var nLayers = small ? 4 : 7;
    var sizes = [];
    for (var l = 0; l < nLayers; l++) {
      var mid = 1 - Math.abs(l - (nLayers - 1) / 2) / ((nLayers - 1) / 2);
      sizes.push(Math.round((small ? 4 : 5) + mid * (small ? 3 : 5)));
    }
    nodes = []; edges = []; layers = []; pulses = [];
    var padX = W * 0.06, padY = H * 0.12;
    for (l = 0; l < nLayers; l++) {
      var x = padX + (W - 2 * padX) * (l / (nLayers - 1));
      var ids = [];
      for (var i = 0; i < sizes[l]; i++) {
        var y = padY + (H - 2 * padY) * ((i + 0.5) / sizes[l]);
        var n = {
          bx: x + rand(-18, 18),
          by: y + rand(-14, 14),
          x: 0, y: 0,
          phase: rand(0, Math.PI * 2),
          amp: rand(4, 10),
          glow: 0,
          layer: l,
          out: [],
        };
        ids.push(nodes.length);
        nodes.push(n);
      }
      layers.push(ids);
    }
    // Sparse-ish connections between adjacent layers
    for (l = 0; l < nLayers - 1; l++) {
      layers[l].forEach(function (a) {
        layers[l + 1].forEach(function (b) {
          if (Math.random() < 0.55) {
            var e = { a: a, b: b, w: rand(0.15, 1) };
            nodes[a].out.push(edges.length);
            edges.push(e);
          }
        });
      });
    }

    // Floating math
    glyphs = [];
    var count = small ? 8 : 16;
    for (var g = 0; g < count; g++) glyphs.push(newGlyph(true));
  }

  function newGlyph(anywhere) {
    return {
      text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      x: rand(0, W),
      y: anywhere ? rand(0, H) : H + 40,
      vy: rand(4, 11),
      size: rand(12, 20),
      alpha: rand(0.07, 0.16),
      drift: rand(-3, 3),
    };
  }

  function firePulse(fromNode, strength) {
    var n = nodes[fromNode];
    if (!n || !n.out.length) return;
    var e = n.out[Math.floor(Math.random() * n.out.length)];
    pulses.push({ e: e, t: 0, speed: rand(0.6, 1.1), s: strength || 1 });
  }

  function spawnForward() {
    // Start a "forward pass" from a random input node
    var first = layers[0];
    firePulse(first[Math.floor(Math.random() * first.length)], 1);
  }

  function step(dt, time) {
    nodes.forEach(function (n) {
      n.x = n.bx + Math.sin(time * 0.0004 + n.phase) * n.amp;
      n.y = n.by + Math.cos(time * 0.0005 + n.phase) * n.amp;
      // Mouse: gentle repulsion and glow
      if (mouse.active) {
        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          var f = (1 - d / 160);
          n.x += (dx / (d || 1)) * f * 18;
          n.y += (dy / (d || 1)) * f * 18;
          n.glow = Math.max(n.glow, f);
        }
      }
      n.glow *= Math.pow(0.04, dt); // decay
    });

    // Pulses travel along edges; on arrival they light the node and propagate
    for (var i = pulses.length - 1; i >= 0; i--) {
      var p = pulses[i];
      p.t += dt * p.speed;
      if (p.t >= 1) {
        var target = edges[p.e].b;
        nodes[target].glow = Math.min(1, nodes[target].glow + 0.8 * p.s);
        pulses.splice(i, 1);
        if (Math.random() < 0.85) firePulse(target, p.s * 0.95);
        if (Math.random() < 0.25) firePulse(target, p.s * 0.8);
      }
    }
    if (pulses.length < 26 && Math.random() < dt * 2.2) spawnForward();
    if (pulses.length > 120) pulses.splice(0, pulses.length - 120);

    glyphs.forEach(function (g, idx) {
      g.y -= g.vy * dt;
      g.x += g.drift * dt;
      if (g.y < -40) glyphs[idx] = newGlyph(false);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Math glyphs (behind the network)
    ctx.textAlign = "center";
    glyphs.forEach(function (g) {
      ctx.font = "italic " + g.size + "px 'JetBrains Mono', ui-monospace, monospace";
      ctx.fillStyle = "rgba(170, 180, 255," + g.alpha + ")";
      ctx.fillText(g.text, g.x, g.y);
    });

    // Edges
    ctx.lineWidth = 1;
    edges.forEach(function (e) {
      var a = nodes[e.a], b = nodes[e.b];
      var glow = Math.max(a.glow, b.glow);
      ctx.strokeStyle = "rgba(120, 140, 255," + (0.05 + e.w * 0.05 + glow * 0.25) + ")";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Pulses
    pulses.forEach(function (p) {
      var e = edges[p.e];
      var a = nodes[e.a], b = nodes[e.b];
      var x = a.x + (b.x - a.x) * p.t;
      var y = a.y + (b.y - a.y) * p.t;
      var tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.12);
      var ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.12);
      var grad = ctx.createLinearGradient(tx, ty, x, y);
      grad.addColorStop(0, "rgba(34, 211, 238, 0)");
      grad.addColorStop(1, "rgba(34, 211, 238, 0.9)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(186, 245, 255, 0.95)";
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Nodes
    nodes.forEach(function (n) {
      var r = 2.6 + n.glow * 3.2;
      if (n.glow > 0.05) {
        var halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22 * (0.4 + n.glow));
        halo.addColorStop(0, "rgba(139, 92, 246," + 0.45 * n.glow + ")");
        halo.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 22 * (0.4 + n.glow), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = n.glow > 0.05
        ? "rgba(" + Math.round(160 + 60 * n.glow) + ", 200, 255, 0.95)"
        : "rgba(150, 160, 230, 0.55)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop(time) {
    if (!running) return;
    var dt = Math.min(0.05, (time - (last || time)) / 1000);
    last = time;
    step(dt, time);
    draw();
    requestAnimationFrame(loop);
  }

  if (canvas && ctx) {
    build();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { build(); if (reduce) { step(0, 0); draw(); } }, 150);
    });
    window.addEventListener("scroll", function () { scrollY = window.scrollY; }, { passive: true });

    if (reduce) {
      step(0, 0);
      draw();
    } else {
      window.addEventListener("pointermove", function (ev) {
        mouse.x = ev.clientX; mouse.y = ev.clientY; mouse.active = true;
      }, { passive: true });
      document.addEventListener("pointerleave", function () { mouse.active = false; });
      // Click anywhere on empty background: fire a burst from the nearest node
      window.addEventListener("pointerdown", function (ev) {
        if (ev.target.closest("a, button, .card, .project-card, .panel-inner, .highlight")) return;
        var best = -1, bd = Infinity;
        nodes.forEach(function (n, i) {
          var d = (n.x - ev.clientX) * (n.x - ev.clientX) + (n.y - ev.clientY) * (n.y - ev.clientY);
          if (d < bd) { bd = d; best = i; }
        });
        if (best >= 0) {
          nodes[best].glow = 1;
          for (var k = 0; k < 4; k++) firePulse(best, 1);
        }
      });
      document.addEventListener("visibilitychange", function () {
        running = !document.hidden;
        if (running) { last = 0; requestAnimationFrame(loop); }
      });
      requestAnimationFrame(loop);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Scroll progress                                                     */
  /* ------------------------------------------------------------------ */

  var bar = document.getElementById("scroll-progress");
  if (bar) {
    var updateBar = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  /* ------------------------------------------------------------------ */
  /* Card spotlight + tilt                                               */
  /* ------------------------------------------------------------------ */

  if (finePointer) {
    document.querySelectorAll(".card, .project-card, .highlight").forEach(function (el) {
      el.addEventListener("pointermove", function (ev) {
        var r = el.getBoundingClientRect();
        var x = ev.clientX - r.left, y = ev.clientY - r.top;
        el.style.setProperty("--mx", x + "px");
        el.style.setProperty("--my", y + "px");
        if (!reduce && el.classList.contains("project-card")) {
          var rx = ((y / r.height) - 0.5) * -5;
          var ry = ((x / r.width) - 0.5) * 6;
          el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-3px)";
        }
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Count-up highlight figures                                          */
  /* ------------------------------------------------------------------ */

  var figs = document.querySelectorAll(".highlight-value");
  if (figs.length && "IntersectionObserver" in window && !reduce) {
    figs.forEach(function (el) {
      var raw = el.textContent;
      var m = raw.match(/^([\d.]+)(.*)$/);
      if (!m) return;
      el.dataset.target = m[1];
      el.dataset.suffix = m[2];
      el.textContent = "0" + m[2];
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseFloat(el.dataset.target);
        var decimals = (el.dataset.target.split(".")[1] || "").length;
        var start = performance.now(), dur = 1400;
        (function tick(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * eased).toFixed(decimals) + el.dataset.suffix;
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });
    figs.forEach(function (el) { if (el.dataset.target) io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Typed terminal                                                      */
  /* ------------------------------------------------------------------ */

  var code = document.getElementById("hero-code");
  if (code && !reduce) {
    var cursor = code.querySelector(".cursor");
    var cursorHome = cursor && cursor.parentNode;
    var lines = Array.prototype.filter.call(code.children, function (d) { return d !== cursorHome; });
    var texts = lines.map(function (d) { return d.textContent; });
    lines.forEach(function (d) { d.textContent = ""; d.style.minHeight = "1.7em"; });
    var li = 0, ci = 0;
    (function type() {
      if (li >= lines.length) {
        if (cursor && cursorHome) cursorHome.appendChild(cursor);
        return;
      }
      var full = texts[li];
      ci = Math.min(full.length, ci + (li === 0 ? 1 : 3)); // command types slowly, output streams
      lines[li].textContent = full.slice(0, ci);
      if (cursor) lines[li].appendChild(cursor);
      if (ci >= full.length) {
        li++; ci = 0;
        setTimeout(type, li === 1 ? 450 : 140);
      } else {
        setTimeout(type, li === 0 ? 55 : 18);
      }
    })();
  }
})();
