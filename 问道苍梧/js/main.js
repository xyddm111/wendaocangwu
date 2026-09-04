/* ============================================================
   问道苍梧 · 启动
   ============================================================ */
(function (g) {
'use strict';
function boot() {
  g.GameUI.init();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
})(typeof window !== 'undefined' ? window : globalThis);
