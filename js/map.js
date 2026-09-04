/* ============================================================
   问道苍梧 · 地图渲染与迷雾
   ============================================================ */
(function (g) {
'use strict';
var GD = g.GameData;
var MAP = GD.map;

function renderMap(container, state, opts) {
  opts = opts || {};
  container.innerHTML = '';
  var box = document.createElement('div');
  box.className = 'map-box-wrap';
  box.style.position = 'relative';
  box.style.width = '100%';

  // 简易世界底图（CSS 渐变分域）
  var bg = document.createElement('div');
  bg.style.cssText = 'position:relative;width:100%;aspect-ratio:4/3;border:1px solid rgba(201,162,39,.28);border-radius:10px;overflow:hidden;background:' +
    'radial-gradient(40% 50% at 50% 45%, rgba(79,209,160,.10), transparent 70%),' +
    'radial-gradient(30% 35% at 70% 68%, rgba(192,57,43,.08), transparent 70%),' +
    'radial-gradient(25% 30% at 20% 75%, rgba(180,60,120,.07), transparent 70%),' +
    'linear-gradient(160deg,#0d141d,#111a26 60%,#0a0f16);';
  box.appendChild(bg);

  // 区域标签
  (MAP.regions || []).forEach(function (r) {
    var el = document.createElement('div');
    el.className = 'region-label';
    el.textContent = r.name;
    el.style.left = r.x + '%'; el.style.top = r.y + '%';
    el.style.transform = 'translate(-50%,-50%)';
    el.style.color = r.color || 'rgba(217,210,192,.16)';
    bg.appendChild(el);
  });

  // 地点
  var fogHoles = [];
  (MAP.locations || []).forEach(function (loc) {
    var unlocked = state.map.unlocked.indexOf(loc.id) >= 0;
    var dot = document.createElement('div');
    dot.className = 'loc-dot' + (unlocked ? '' : ' locked') + (state.map.current === loc.id ? ' current' : '');
    dot.style.left = loc.x + '%'; dot.style.top = loc.y + '%';
    dot.title = unlocked ? loc.name : '？？？';
    var lbl = document.createElement('div');
    lbl.className = 'loc-label-map';
    lbl.textContent = unlocked ? loc.name : '？？？';
    lbl.style.left = loc.x + '%'; lbl.style.top = (loc.y + 1.5) + '%';
    if (unlocked) {
      fogHoles.push('radial-gradient(circle at ' + loc.x + '% ' + loc.y + '%, transparent 26px, rgba(5,7,10,0.93) 52px)');
      dot.addEventListener('click', function () { showLocInfo(bg, loc, state); g.GameAudio.play('click'); });
    }
    bg.appendChild(dot);
    bg.appendChild(lbl);
  });

  // 迷雾层（已解锁处打洞）
  var fog = document.createElement('div');
  fog.id = 'map-fog';
  fog.style.cssText = 'position:absolute;inset:0;z-index:5;pointer-events:none;background:' +
    (fogHoles.length ? fogHoles.join(',') + ', #05070a' : '#05070a') + ';transition:opacity .8s;';
  bg.appendChild(fog);

  box.appendChild(bg);
  container.appendChild(box);
}

function showLocInfo(bg, loc, state) {
  var old = bg.querySelector('.map-loc-info');
  if (old) old.remove();
  var info = document.createElement('div');
  info.className = 'map-loc-info';
  var region = (MAP.regions || []).filter(function (r) { return r.id === loc.region; })[0];
  var html = '<b>' + loc.name + '</b> <span style="color:#8f8a7c">· ' + (region ? region.name : '') + ' · ' + (loc.type || '') + '</span><br><span style="color:#8f8a7c">' + (loc.desc || '') + '</span>';
  var lk = GD.lore && GD.lore.locs && GD.lore.locs[loc.id];
  if (lk) html += '<br><span style="color:#7ec8a3;font-size:12px">📜 ' + lk + '</span>';
  // 支线入口（未完成的显示"前往看看"）
  var sides = loc.sides || (loc.side ? [loc.side] : []);
  sides.forEach(function (sd) {
    if (!state.flags[sd.flag]) {
      html += '<br><button class="mini-btn side-go" data-side="' + sd.scene + '" style="margin-top:6px">前往看看</button>';
    }
  });
  info.innerHTML = html;
  bg.appendChild(info);
  info.querySelectorAll('.side-go').forEach(function (go) {
    go.addEventListener('click', function () {
      var r = g.GameEngine.enterScene(go.dataset.side);
      if (g.GameUI && r) g.GameUI.render(r);
      g.GameAudio.play('click');
    });
  });
  setTimeout(function () { if (info.parentNode) info.remove(); }, 8000);
}

g.GameMap = { render: renderMap };
})(typeof window !== 'undefined' ? window : globalThis);
