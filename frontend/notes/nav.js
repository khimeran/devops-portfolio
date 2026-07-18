// Общий сайдбар, поиск, подсветка и плавающие кнопки для страниц конспектов.
(function () {
  const PAGE = (location.pathname.split('/').pop() || '').replace(/\.html$/, '') || NOTES_MANIFEST[0].id;
  const nav = document.getElementById('nav');
  const content = document.querySelector('.content');

  // ---- сайдбар из манифеста ----
  const groups = [];
  NOTES_MANIFEST.forEach(sec => {
    const group = document.createElement('div');
    group.className = 'nav-group';

    const head = document.createElement('a');
    head.className = 'nav-head' + (sec.id === 'devops-tips' ? ' devops' : '');
    head.href = sec.id === PAGE ? '#' : sec.id + '.html';
    head.innerHTML = `<span>${sec.short}</span><span class="caret">▶</span>`;

    const sub = document.createElement('div');
    sub.className = 'nav-sub';
    const subLinks = [];
    sec.subs.forEach(s => {
      const a = document.createElement('a');
      a.href = (sec.id === PAGE ? '' : sec.id + '.html') + '#' + s.id;
      a.textContent = s.title;
      sub.appendChild(a);
      subLinks.push(a);
    });

    head.addEventListener('click', e => {
      if (sec.id === PAGE) {
        e.preventDefault();
        content.scrollTo({ top: 0 });
      }
      openGroup(group);
    });

    group.appendChild(head);
    group.appendChild(sub);
    nav.appendChild(group);
    groups.push({ group, head, sub, subLinks, sectionId: sec.id });
  });

  function openGroup(group) {
    groups.forEach(g => g.group.classList.toggle('open', g.group === group));
  }

  // текущая страница: группа открыта и подсвечена
  const current = groups.find(g => g.sectionId === PAGE) || groups[0];
  current.group.classList.add('open');
  current.head.classList.add('active');

  // ---- подсветка активного подраздела (h2) при скролле ----
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      current.subLinks.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '0px 0px -80% 0px', threshold: 0 });
  document.querySelectorAll('.content section h2').forEach(h => headingObserver.observe(h));

  // ---- поиск по всем разделам (ищет и по чужим страницам) ----
  const filter = document.getElementById('nav-filter');
  filter.addEventListener('input', () => {
    const q = filter.value.trim().toLowerCase();
    if (!q) {
      groups.forEach(g => {
        g.group.classList.remove('hidden');
        g.subLinks.forEach(a => a.classList.remove('hidden'));
        g.group.classList.toggle('open', g === current);
      });
      return;
    }
    groups.forEach(g => {
      const headMatch = g.head.textContent.toLowerCase().includes(q);
      let any = headMatch;
      g.subLinks.forEach(a => {
        const m = a.textContent.toLowerCase().includes(q);
        a.classList.toggle('hidden', !(m || headMatch));
        if (m) any = true;
      });
      g.group.classList.toggle('hidden', !any);
      g.group.classList.toggle('open', any);
    });
  });

  // ---- плавающие кнопки: птичка (начало раздела) и самолётик (в самое начало) ----

  // ===== движок полёта: гладкая кривая Безье, нос по касательной =====
  function cubicAt(p0, c1, c2, p3, t) {
    const u = 1 - t;
    return {
      x: u*u*u*p0.x + 3*u*u*t*c1.x + 3*u*t*t*c2.x + t*t*t*p3.x,
      y: u*u*u*p0.y + 3*u*u*t*c1.y + 3*u*t*t*c2.y + t*t*t*p3.y,
      dx: 3*u*u*(c1.x-p0.x) + 6*u*t*(c2.x-c1.x) + 3*t*t*(p3.x-c2.x),
      dy: 3*u*u*(c1.y-p0.y) + 6*u*t*(c2.y-c1.y) + 3*t*t*(p3.y-c2.y)
    };
  }
  const easeIO = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  const normDeg = a => ((a + 540) % 360) - 180;   // в диапазон [-180, 180]
  const clampDeg = (a, m) => Math.max(-m, Math.min(m, a));

  function puffSmoke(x, y) {
    const p = document.createElement('div');
    p.className = 'smoke-puff';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }

  // один отрезок полёта; facing: 'left' | 'right' | 'plane'
  // спрайты: птица в шрифтах смотрит ВЛЕВО, самолёт — вправо-вверх (~45°)
  function flyLeg(ghost, leg, opts) {
    return new Promise(resolve => {
      const t0 = performance.now();
      let lastPuff = 0;
      function frame(now) {
        let t = Math.min(1, (now - t0) / opts.duration);
        const e = (opts.easing || easeIO)(t);
        const p = cubicAt(leg.p0, leg.c1, leg.c2, leg.p3, e);
        const heading = Math.atan2(p.dy, p.dx) * 180 / Math.PI;
        let tf;
        if (opts.facing === 'left') {          // нос влево, лёгкий тангаж по касательной
          tf = `rotate(${clampDeg(normDeg(heading - 180), 35)}deg)`;
        } else if (opts.facing === 'right') {  // разворот зеркалом, тангаж в зеркале
          tf = `scaleX(-1) rotate(${-clampDeg(normDeg(heading), 35)}deg)`;
        } else {                               // самолёт: зеркалим (нос был на 45°) → нос ~135°
          tf = `scaleX(-1) rotate(${-clampDeg(normDeg(heading - 135), 50)}deg)`;
        }
        ghost.style.transform = `translate(${p.x}px, ${p.y}px) ${tf}`;
        if (opts.fade) ghost.style.opacity = String(Math.max(0, 1 - Math.max(0, t - 0.6) / 0.4));
        if (opts.smoke && now - lastPuff > 70) {
          lastPuff = now;
          const r = ghost.getBoundingClientRect();
          puffSmoke(r.left + r.width / 2 - p.dx * 0.02, r.top + r.height / 2 - p.dy * 0.02);
        }
        if (t < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function makeGhost(btn) {
    const icon = btn.querySelector('.fab-icon');
    const r = icon.getBoundingClientRect();
    const ghost = icon.cloneNode(true);
    Object.assign(ghost.style, {
      position: 'fixed', left: r.left + 'px', top: r.top + 'px',
      margin: 0, zIndex: 99, pointerEvents: 'none', fontSize: '1.35rem',
      willChange: 'transform'
    });
    document.body.appendChild(ghost);
    icon.style.visibility = 'hidden';
    return { icon, ghost, rect: r };
  }

  // птица: плавный вылет к цели (вверх-влево), разворот, плавное возвращение
  async function birdFlight(btn, target) {
    const { icon, ghost, rect } = makeGhost(btn);
    const T = { x: target.x - rect.left, y: target.y - rect.top };
    // туда: взлёт с горки и пологое планирование к цели
    await flyLeg(ghost, {
      p0: { x: 0, y: 0 },
      c1: { x: T.x * 0.12, y: -90 },
      c2: { x: T.x * 0.55, y: T.y * 1.12 },
      p3: T
    }, { duration: 1150, facing: 'left' });
    await new Promise(r => setTimeout(r, 130));   // присела, оглянулась
    // обратно: набор высоты и плавная посадка на кнопку
    await flyLeg(ghost, {
      p0: T,
      c1: { x: T.x * 0.55, y: T.y * 0.35 - 70 },
      c2: { x: T.x * 0.12, y: -80 },
      p3: { x: 0, y: 0 }
    }, { duration: 1050, facing: 'right' });
    ghost.remove();
    icon.style.visibility = '';
    btn.classList.add('landed');
    setTimeout(() => btn.classList.remove('landed'), 500);
  }

  const stack = document.getElementById('fabStack');
  const fabSection = document.getElementById('fabSection');
  const fabHome = document.getElementById('fabHome');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let flying = false;

  content.addEventListener('scroll', () => {
    stack.classList.toggle('hidden', content.scrollTop < 350);
  });
  stack.classList.add('hidden');

  // 🐦 птичка: в начало ТЕКУЩЕГО раздела
  fabSection.addEventListener('click', async () => {
    content.scrollTo({ top: 0 });
    if (reduceMotion || flying) return;
    flying = true;
    const cr = content.getBoundingClientRect();
    await birdFlight(fabSection, { x: cr.left + 80, y: cr.top + 55 });
    flying = false;
  });

  // ✈️ самолётик: в самое-самое начало — первая страница конспектов
  const FIRST = NOTES_MANIFEST[0].id;
  fabHome.addEventListener('click', async () => {
    if (PAGE === FIRST) {
      content.scrollTo({ top: 0 });
      if (!reduceMotion && !flying) {
        flying = true;
        const cr = content.getBoundingClientRect();
        await birdFlight(fabHome, { x: cr.left + 80, y: cr.top + 55 });
        flying = false;
      }
      return;
    }
    if (reduceMotion || flying) { location.href = FIRST + '.html'; return; }
    flying = true;
    const { ghost } = makeGhost(fabHome);
    const W = window.innerWidth, H = window.innerHeight;
    // разгон влево по прямой, затем плавный набор высоты — и за горизонт
    await flyLeg(ghost, {
      p0: { x: 0, y: 0 },
      c1: { x: -W * 0.28, y: -H * 0.02 },
      c2: { x: -W * 0.55, y: -H * 0.38 },
      p3: { x: -W * 0.95, y: -H * 0.9 }
    }, { duration: 1000, facing: 'plane', smoke: true, fade: true,
         easing: t => t * t * (3 - 2 * t) });
    location.href = FIRST + '.html';
  });
})();
