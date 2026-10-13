// img-lazy.js — native loading="lazy" fallback for browsers without support
(function () {
  'use strict';
  if ('loading' in HTMLImageElement.prototype) return; // native supported, no-op

  const imgs = document.querySelectorAll('article img, .post-content img, .post-preview img');
  if (!imgs.length) return;

  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            const img = e.target;
            if (img.dataset.src) img.src = img.dataset.src;
            io.unobserve(img);
          }
        });
      }, { rootMargin: '200px' })
    : null;

  imgs.forEach(function (img) {
    if (img.complete) return;
    if (io) {
      img.dataset.src = img.src;
      io.observe(img);
    } else {
      // No IntersectionObserver: load all eagerly
      // (best effort for very old browsers)
    }
  });
})();
