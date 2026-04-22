// ─── Art slider ─────────────────────────────────
(function slider() {
  const slide = document.querySelector('.art__slide');
  const dots  = document.querySelectorAll('.art__dots button');
  if (!slide || !dots.length) return;

  const imgs = slide.querySelectorAll('img');
  let i = 0;
  let timer;

  function set(n) {
    i = (n + imgs.length) % imgs.length;
    imgs.forEach((el, k) => el.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === i);
      d.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
  }
  function tick() { set(i + 1); }
  function restart() { clearInterval(timer); timer = setInterval(tick, 4500); }

  dots.forEach((d, k) => d.addEventListener('click', () => { set(k); restart(); }));
  restart();
})();

// ─── Nav link active-state on scroll ────────────
(function spy() {
  const links = document.querySelectorAll('.nav__link');
  const map = {};
  links.forEach(l => {
    const id = l.getAttribute('href');
    if (id && id.startsWith('#') && id.length > 1) {
      const el = document.querySelector(id);
      if (el) map[id] = { link: l, el };
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const hash = '#' + e.target.id;
        links.forEach(l => l.classList.remove('nav__link--active'));
        if (map[hash]) map[hash].link.classList.add('nav__link--active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.values(map).forEach(({ el }) => io.observe(el));
})();
