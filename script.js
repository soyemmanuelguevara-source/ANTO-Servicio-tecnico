// ANTO Servicio Técnico — interacciones del sitio

document.addEventListener('DOMContentLoaded', () => {

  // Loader
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 400);
  });

  // Nav shrink on scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  ham.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', false);
  }));

  // Scroll reveal
  const revEls = document.querySelectorAll('.rev');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revEls.forEach(el => io.observe(el));

  // Counters
  const counters = document.querySelectorAll('[data-hero-count], [data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.heroCount || el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = prefix + current + suffix;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  };
  const cIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        cIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cIo.observe(el));

  // Contact form -> WhatsApp
  const form = document.getElementById('cForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const tipo = form.tipo.value;
      const mensaje = form.mensaje.value.trim();

      let text = `Hola, soy ${nombre}.\nTeléfono: ${telefono}\nEquipo: ${tipo}`;
      if (mensaje) text += `\nDetalle: ${mensaje}`;

      const url = `https://wa.me/529991289544?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
