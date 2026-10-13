// nav-active.js — highlight current page in navbar
(function () {
  'use strict';

  const links = document.querySelectorAll('#huxblog_navbar a[href]');
  if (!links.length) return;

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  links.forEach(function (a) {
    let href = a.getAttribute('href');
    if (!href) return;
    // Skip pure-fragment links
    if (href.startsWith('#')) return;
    // Normalize trailing slash
    href = href.replace(/\/+$/, '') || '/';

    // Match: exact path, or current is homepage and link is home, or current starts with link
    let isCurrent = false;
    if (href === path) {
      isCurrent = true;
    } else if (path.startsWith(href + '/') && href !== '/') {
      isCurrent = true;
    } else if (href === '/' && path === '/') {
      isCurrent = true;
    }

    if (isCurrent) {
      a.classList.add('active');
      const li = a.closest('li');
      if (li) li.classList.add('active');
    }
  });
})();
