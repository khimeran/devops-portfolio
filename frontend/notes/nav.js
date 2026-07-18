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
  const stack = document.getElementById('fabStack');
  const fabSection = document.getElementById('fabSection');
  const fabHome = document.getElementById('fabHome');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  content.addEventListener('scroll', () => {
    stack.classList.toggle('hidden', content.scrollTop < 350);
  });
  stack.classList.add('hidden');

  // призрак иконки: летит по дуге и возвращается на жёрдочку
  function makeGhost(btn) {
    const icon = btn.querySelector('.fab-icon');
    const r = icon.getBoundingClientRect();
    const ghost = icon.cloneNode(true);
    Object.assign(ghost.style, {
      position: 'fixed', left: r.left + 'px', top: r.top + 'px',
      margin: 0, zIndex: 99, pointerEvents: 'none', fontSize: '1.35rem'
    });
    document.body.appendChild(ghost);
    icon.style.visibility = 'hidden';
    return { icon, ghost, rect: r };
  }

  function flyAndReturn(btn) {
    if (reduceMotion) return;
    const { icon, ghost, rect } = makeGhost(btn);
    const cr = content.getBoundingClientRect();
    const tx = (cr.left + 70) - rect.left;   // цель: левый верх контента,
    const ty = (cr.top + 45) - rect.top;     // где начинается раздел
    const anim = ghost.animate([
      { transform: 'translate(0,0) rotate(0deg)', offset: 0 },
      { transform: `translate(${tx * 0.22}px, ${ty * 0.65}px) rotate(-24deg)`, offset: 0.18 },
      { transform: `translate(${tx * 0.62}px, ${ty * 1.18}px) rotate(10deg)`,  offset: 0.38 },
      { transform: `translate(${tx}px, ${ty}px) rotate(-8deg)`,               offset: 0.52 },
      { transform: `translate(${tx}px, ${ty}px) scaleX(-1) rotate(0deg)`,     offset: 0.60 },
      { transform: `translate(${tx * 0.45}px, ${ty * 0.45 - 70}px) scaleX(-1) rotate(14deg)`, offset: 0.80 },
      { transform: 'translate(0,0) scaleX(-1) rotate(0deg)', offset: 0.95 },
      { transform: 'translate(0,0) scaleX(1) rotate(0deg)',  offset: 1 }
    ], { duration: 2000, easing: 'ease-in-out' });
    anim.onfinish = () => {
      ghost.remove();
      icon.style.visibility = '';
      btn.classList.add('landed');
      setTimeout(() => btn.classList.remove('landed'), 500);
    };
  }

  // 🐦 птичка: в начало ТЕКУЩЕГО раздела
  fabSection.addEventListener('click', () => {
    content.scrollTo({ top: 0 });
    flyAndReturn(fabSection);
  });

  // ✈️ самолётик: в самое-самое начало — первая страница конспектов
  const FIRST = NOTES_MANIFEST[0].id;
  fabHome.addEventListener('click', () => {
    if (PAGE === FIRST) {           // уже в начале — ведём себя как птичка
      content.scrollTo({ top: 0 });
      flyAndReturn(fabHome);
      return;
    }
    if (reduceMotion) { location.href = FIRST + '.html'; return; }
    const { ghost } = makeGhost(fabHome);
    const anim = ghost.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: 'translate(-16vw, -6vh) rotate(-16deg)', opacity: 1, offset: 0.35 },
      { transform: 'translate(-55vw, -45vh) rotate(-28deg) scale(0.8)', opacity: 0.9, offset: 0.75 },
      { transform: 'translate(-88vw, -88vh) rotate(-34deg) scale(0.45)', opacity: 0 }
    ], { duration: 800, easing: 'cubic-bezier(0.4, 0, 1, 1)' });
    anim.onfinish = () => { location.href = FIRST + '.html'; };
  });
})();
