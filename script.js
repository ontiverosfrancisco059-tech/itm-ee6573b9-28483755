(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Header: sombra al hacer scroll ---------- */
  var header = $('#site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = $('#nav-toggle');
  var nav = $('#nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Animación de aparición al hacer scroll ---------- */
  var revealTargets = $$('.section-head > *, .menu-card, .review-card, .schedule-item, .text-block > *, .visual-card');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          setTimeout(function () { entry.target.classList.add('visible'); }, 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Resaltado del enlace de sección activo ---------- */
  var sections = $$('main section[id]');
  var navLinks = $$('.nav a');
  var activeObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.style.color = l.getAttribute('href') === '#' + entry.target.id ? 'var(--amarillo)' : '';
            });
          }
        });
      }, { threshold: 0.4 })
    : null;
  if (activeObserver) sections.forEach(function (s) { activeObserver.observe(s); });

  /* ---------- Año en el pie de página ---------- */
  var copy = $('.footer-copy');
  if (copy) copy.textContent = copy.textContent.replace('2026', String(new Date().getFullYear()));

  /* ---------- WhatsApp: construir enlaces al pulsar ---------- */
  $$('[data-wa-message]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var msg = btn.getAttribute('data-wa-message');
      if (msg) {
        btn.href = 'https://wa.me/529811332914?text=' + encodeURIComponent(msg);
      }
    });
  });
})();