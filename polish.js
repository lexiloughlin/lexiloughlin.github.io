// Shared polish layer: scroll progress, staggered reveals, card tilt + spotlight, count-up numbers, animated illustrations.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // scroll progress bar
  const bar = document.createElement('div'); bar.className = 'pl-progress'; document.body.appendChild(bar);
  const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // stagger reveals that sit side by side
  document.querySelectorAll('.grid, .gcards, .indie, .repos, .wlist, .skills, .edu, .loves, .facts, .stats').forEach(g => {
    [...g.children].forEach((el, i) => el.style.setProperty('--d', (Math.min(i, 8) * 0.07) + 's'));
  });

  // tilt + spotlight on cards
  const cards = document.querySelectorAll('.card, .feature, .gcard, .icard, .repo, .wcard, .post, .skillset, .fit, .journey');
  cards.forEach(c => c.classList.add('pl-spot'));
  if (fine && !reduce) {
    const bind = el => {
      el.classList.add('pl-tilt');
      const max = el.classList.contains('feature') || el.classList.contains('fit') ? 2 : 5;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-3px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    };
    cards.forEach(bind);
    document.querySelectorAll('.ch-art').forEach(a => {
      const inner = a.firstElementChild; if (!inner) return;
      a.addEventListener('pointermove', e => {
        const r = a.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 10}deg) scale(1.02)`;
      });
      a.addEventListener('pointerleave', () => { inner.style.transform = ''; });
    });
  } else {
    cards.forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));
  }

  // count-up numbers
  const counters = document.querySelectorAll('.band b, .stat .n, .ghstats b, .ibanner .big');
  const run = el => {
    if (el.dataset.done) return; el.dataset.done = 1;
    const m = el.textContent.match(/^([^\d]*)([\d.,]+)(.*)$/); if (!m || reduce) return;
    const target = parseFloat(m[2].replace(/,/g, '')), dec = (m[2].split('.')[1] || '').length, t0 = performance.now(), dur = 1200;
    const tick = t => { const k = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - k, 3)); el.textContent = m[1] + v.toFixed(dec) + m[3]; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    counters.forEach(c => { if (!/–/.test(c.textContent)) io.observe(c); });
  }

  // animate illustration details
  document.querySelectorAll('.art').forEach(svg => {
    svg.querySelectorAll('path[stroke-dasharray]').forEach(p => p.classList.add('pl-flow'));
    svg.querySelectorAll('circle[fill="var(--rose)"]').forEach(c => c.classList.add('pl-pulse'));
    svg.querySelectorAll('g[transform] > rect[rx="20"], g[transform] > rect[rx="23"]').forEach((r, i) => r.parentNode.classList.add('pl-float', ['a', 'b', 'c'][i % 3]));
    svg.querySelectorAll('text').forEach((t, i) => { if (/[♪♫]/.test(t.textContent)) t.classList.add('pl-float', ['a', 'b', 'c'][i % 3]); });
  });
})();
