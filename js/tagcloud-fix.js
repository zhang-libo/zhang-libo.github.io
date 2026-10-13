// tagcloud-fix.js — strip inline color/background from #tag_cloud anchors
// jquery.tagcloud.js writes random `color: ...; background-color: ...` to
// each anchor's inline style, which beats our CSS `!important` rules.
// We watch the cloud for mutations and clear the inline values so the
// stylesheet-defined colors (in ui-enhance.css) win.
(function () {
  'use strict';
  var cloud = document.getElementById('tag_cloud');
  if (!cloud) return;

  function fix() {
    var anchors = cloud.querySelectorAll('a');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].style.color = '';
      anchors[i].style.backgroundColor = '';
    }
  }

  fix();
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(fix).observe(cloud, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    });
  }
})();
