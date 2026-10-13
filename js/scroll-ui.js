// scroll-ui.js — reading progress bar + back-to-top button
(function () {
  'use strict';

  // ---- Reading progress bar ----
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  let ticking = false;
  function updateProgress() {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();

  // ---- Back to top button ----
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'back-to-top';
  back.setAttribute('aria-label', '回到顶部');
  back.title = '回到顶部';
  back.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 4l-8 8h5v8h6v-8h5z"/></svg>';
  document.body.appendChild(back);

  back.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let backTicking = false;
  function updateBack() {
    const y = window.scrollY || window.pageYOffset;
    back.classList.toggle('visible', y > 500);
    backTicking = false;
  }
  window.addEventListener('scroll', function () {
    if (!backTicking) {
      window.requestAnimationFrame(updateBack);
      backTicking = true;
    }
  }, { passive: true });
  updateBack();
})();
