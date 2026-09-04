/* ============================================================
   问道苍梧 · 离线缓存 Service Worker
   首次打开网页后自动缓存全部游戏文件：
   —— 之后断网/电脑关机也能照常游玩（纯单机）
   —— 配合「添加到主屏幕」可当 App 使用
   注意：Service Worker 仅在 http(s) 下生效（本地 file:// 无效）
   ============================================================ */
'use strict';
var CACHE = 'wdcw-v5';
var CORE = [
  './', './index.html', './sw.js', './css/style.css',
  './js/engine.js', './js/save.js', './js/audio.js', './js/map.js', './js/combat.js', './js/ui.js', './js/main.js',
  './data/items.js', './data/danfang.js', './data/skills.js', './data/beasts.js', './data/characters.js',
  './data/avatars.js', './data/map.js', './data/vol1.js', './data/vol2x.js', './data/lore.js', './data/endings.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return caches.match('./index.html'); });
    })
  );
});
