// theme-toggle.js — initialize theme + render toggle button
(function () {
  'use strict';

  var KEY = 'zhanglibo-theme';
  var html = document.documentElement;

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
  }
  function currentTheme() {
    return html.getAttribute('data-theme') || 'light';
  }
  function setTheme(t) {
    html.setAttribute('data-theme', t);
    setStored(t);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? '切换到浅色模式' : '切换到深色模式');
  }
  function toggle() {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  // Manual override (set by another script in <head> before paint, or default)
  var stored = getStored();
  if (stored === 'light' || stored === 'dark') {
    html.setAttribute('data-theme', stored);
  } else {
    html.setAttribute('data-theme', 'light');
  }

  // Render toggle button once DOM is ready
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', '切换主题');
    btn.innerHTML =
      '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>' +
      '</svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path fill="currentColor" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.42-1.42M4.92 19.08l1.42-1.42m0-11.32L4.92 4.92m14.16 14.16l-1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
    setTheme(currentTheme());
  });
})();
