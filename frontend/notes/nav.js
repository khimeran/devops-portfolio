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

  // ---- плавающие кнопки: «к началу темы» и «в самый верх» ----
  const stack = document.getElementById('fabStack');
  const fabTop = document.getElementById('fabTop');
  const fabSection = document.getElementById('fabSection');
  const headings = [...document.querySelectorAll('.content section h2')];

  content.addEventListener('scroll', () => {
    stack.classList.toggle('hidden', content.scrollTop < 350);
  });
  stack.classList.add('hidden');

  fabTop.addEventListener('click', () => content.scrollTo({ top: 0 }));

  fabSection.addEventListener('click', () => {
    // ближайший заголовок темы НАД текущей позицией
    const pos = content.scrollTop - 10;
    let target = null;
    for (const h of headings) {
      if (h.offsetTop < pos) target = h; else break;
    }
    content.scrollTo({ top: target ? target.offsetTop - 12 : 0 });
  });
})();
