// code-enhance.js — copy button + language label for code blocks
(function () {
  'use strict';

  const blocks = document.querySelectorAll('pre > code');
  if (!blocks.length) return;

  blocks.forEach(function (code) {
    const pre = code.parentNode;

    // Wrap with a container for positioning
    if (!pre.parentNode.classList.contains('code-block')) {
      const wrap = document.createElement('div');
      wrap.className = 'code-block';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
    }
    const block = pre.parentNode;

    // Detect language from code class, or fall back to "code"
    let lang = '';
    code.classList.forEach(function (cls) {
      const m = cls.match(/^language-(\S+)$/) || cls.match(/^highlight-source-(\S+)$/);
      if (m) lang = m[1];
    });
    // Always render a tag (uniform look); show "code" if unknown
    const tag = document.createElement('span');
    tag.className = 'code-lang';
    tag.textContent = lang || 'code';
    block.appendChild(tag);

    // Copy button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.setAttribute('aria-label', '复制代码');
    btn.textContent = '复制';
    block.appendChild(btn);

    btn.addEventListener('click', function () {
      const text = code.innerText;
      const finish = function (ok) {
        const prev = btn.textContent;
        btn.textContent = ok ? '已复制' : '失败';
        btn.classList.add(ok ? 'copied' : 'failed');
        setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove('copied', 'failed');
        }, 1500);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { finish(true); }, function () { finish(false); });
      } else {
        // Fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); finish(true); }
        catch (e) { finish(false); }
        document.body.removeChild(ta);
      }
    });
  });
})();
