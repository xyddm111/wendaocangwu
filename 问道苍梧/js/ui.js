/* ============================================================
   问道苍梧 · UI 层（界面渲染、面板、打字机、像素头像）
   ============================================================ */
(function (g) {
'use strict';
var E = g.GameEngine, GD = g.GameData, SAVE = g.GameSave, AUDIO = g.GameAudio;

var STAT_LABELS = { xiwei:'修为', wuxing:'悟性', xinjing:'心境', shengwang:'声望', zhengxie:'正邪', lingshi:'灵石', meili:'魅力', atkBonus:'攻击', defBonus:'防御', hpBonus:'气血', spdBonus:'身法' };
var TEMPER_LABELS = { xiayi:'侠义', gongli:'功利', henla:'狠辣' };
var ITEM_TYPE_NAMES = { dan:'丹药', fabao:'法宝', cailiao:'材料', qiwu:'奇物', gift:'赠礼' };
var TYPE_ORDER = ['dan','fabao','cailiao','qiwu','gift'];

/* ================= 幕映射（故事幕制：多个场景归入一大幕，转场卡只在大幕之间出现） ================= */
var CHAPTER_MAP = {
  /* 卷一 出身 */
  'v1p_01':'卷一 · 出身 · 寒门启程', 'v1p_02':'卷一 · 出身 · 寒门启程', 'v1p_03':'卷一 · 出身 · 寒门启程', 'v1p_04':'卷一 · 出身 · 寒门启程',
  'v1d_01':'卷一 · 出身 · 雪夜遗孤', 'v1d_02':'卷一 · 出身 · 雪夜遗孤', 'v1d_03':'卷一 · 出身 · 雪夜遗孤', 'v1d_04':'卷一 · 出身 · 雪夜遗孤',
  'v1m_01':'卷一 · 出身 · 商贾之路', 'v1m_02':'卷一 · 出身 · 商贾之路', 'v1m_03':'卷一 · 出身 · 商贾之路', 'v1m_04':'卷一 · 出身 · 商贾之路',
  /* 卷一 主流程 */
  'v1n_01':'卷一 · 第一幕 · 退婚之夜', 'v1n_01a':'卷一 · 第一幕 · 退婚之夜', 'v1n_02':'卷一 · 第一幕 · 退婚之夜',
  'v1n_03':'卷一 · 第二幕 · 青州古道', 'v1n_03b':'卷一 · 第二幕 · 青州古道', 'v1n_03c':'卷一 · 第二幕 · 青州古道', 'v1n_03d':'卷一 · 第二幕 · 青州古道', 'v1n_03e':'卷一 · 第二幕 · 青州古道',
  'v1n_04':'卷一 · 第三幕 · 青云会武', 'v1n_04b':'卷一 · 第三幕 · 青云会武',
  'v1n_05':'卷一 · 第四幕 · 择师立道', 'v1n_05a':'卷一 · 第四幕 · 择师立道', 'v1n_07':'卷一 · 第四幕 · 择师立道', 'v1n_07b':'卷一 · 第四幕 · 择师立道', 'v1n_07c':'卷一 · 第四幕 · 择师立道',
  'v1n_08':'卷一 · 第五幕 · 内门立足', 'v1n_08a':'卷一 · 第五幕 · 内门立足', 'v1n_08b':'卷一 · 第五幕 · 内门立足', 'v1n_08c':'卷一 · 第五幕 · 内门立足', 'v1n_08d':'卷一 · 第五幕 · 内门立足', 'v1n_08e':'卷一 · 第五幕 · 内门立足',
  'v1n_09':'卷一 · 第五幕 · 内门立足', 'v1n_09b':'卷一 · 第五幕 · 内门立足', 'v1n_09c':'卷一 · 第五幕 · 内门立足', 'v1n_09d':'卷一 · 第五幕 · 内门立足', 'v1n_09e':'卷一 · 第五幕 · 内门立足',
  'v1n_10':'卷一 · 第六幕 · 坊市风云', 'v1n_10a':'卷一 · 第六幕 · 坊市风云', 'v1n_10b':'卷一 · 第六幕 · 坊市风云', 'v1n_10c':'卷一 · 第六幕 · 坊市风云', 'v1n_10d':'卷一 · 第六幕 · 坊市风云', 'v1n_10e':'卷一 · 第六幕 · 坊市风云',
  'v1n_11':'卷一 · 第七幕 · 宗门日常', 'v1n_11b':'卷一 · 第七幕 · 宗门日常', 'v1n_11c':'卷一 · 第七幕 · 宗门日常', 'v1n_11d':'卷一 · 第七幕 · 宗门日常',
  'v1n_12':'卷一 · 第七幕 · 宗门日常', 'v1n_12a':'卷一 · 第七幕 · 宗门日常', 'v1n_12b':'卷一 · 第七幕 · 宗门日常', 'v1n_12c':'卷一 · 第七幕 · 宗门日常',
  'v1n_13':'卷一 · 第八幕 · 青云秘境', 'v1n_13b':'卷一 · 第八幕 · 青云秘境', 'v1n_14':'卷一 · 第八幕 · 青云秘境', 'v1n_14b':'卷一 · 第八幕 · 青云秘境',
  'v1n_15':'卷一 · 第八幕 · 青云秘境', 'v1n_15b':'卷一 · 第八幕 · 青云秘境', 'v1n_15c':'卷一 · 第八幕 · 青云秘境', 'v1n_15d':'卷一 · 第八幕 · 青云秘境',
  'v1n_16':'卷一 · 第八幕 · 青云秘境', 'v1n_16b':'卷一 · 第八幕 · 青云秘境', 'v1n_16c':'卷一 · 第八幕 · 青云秘境', 'v1n_16d':'卷一 · 第八幕 · 青云秘境',
  'v1n_17':'卷一 · 第八幕 · 青云秘境', 'v1n_17l':'卷一 · 第八幕 · 青云秘境', 'v1n_17b':'卷一 · 第八幕 · 青云秘境',
  'v1n_18':'卷一 · 第九幕 · 心魔筑基', 'v1n_19':'卷一 · 第九幕 · 心魔筑基', 'v1n_19b':'卷一 · 第九幕 · 心魔筑基', 'v1n_19c':'卷一 · 第九幕 · 心魔筑基',
  'v1n_20':'卷一 · 第十幕 · 风云初定', 'v1e_stay':'卷一 · 第十幕 · 风云初定', 'v1e_travel':'卷一 · 第十幕 · 风云初定', 'v1e_secret':'卷一 · 第十幕 · 风云初定',
  /* 卷二 主流程 */
  'v2_01':'卷二 · 第一幕 · 半年之后', 'v2_01b':'卷二 · 第一幕 · 半年之后', 'v2_01c':'卷二 · 第一幕 · 半年之后',
  'v2_02':'卷二 · 第二幕 · 宗门大比', 'v2_02b':'卷二 · 第二幕 · 宗门大比', 'v2_02c':'卷二 · 第二幕 · 宗门大比',
  'v2_03':'卷二 · 第二幕 · 宗门大比', 'v2_03b':'卷二 · 第二幕 · 宗门大比', 'v2_03c':'卷二 · 第二幕 · 宗门大比', 'v2_03d':'卷二 · 第二幕 · 宗门大比',
  'v2_04':'卷二 · 第三幕 · 月下之约', 'v2_04b':'卷二 · 第三幕 · 月下之约',
  'v2_05':'卷二 · 第四幕 · 正魔初动', 'v2_05b':'卷二 · 第四幕 · 正魔初动', 'v2_06':'卷二 · 第四幕 · 正魔初动', 'v2_06b':'卷二 · 第四幕 · 正魔初动', 'v2_06c':'卷二 · 第四幕 · 正魔初动',
  'v2_07':'卷二 · 第五幕 · 青州风云', 'v2_07b':'卷二 · 第五幕 · 青州风云', 'v2_07c':'卷二 · 第五幕 · 青州风云',
  'v2_08':'卷二 · 第六幕 · 东荒之行', 'v2_08b':'卷二 · 第六幕 · 东荒之行', 'v2_08c':'卷二 · 第六幕 · 东荒之行', 'v2_08d':'卷二 · 第六幕 · 东荒之行', 'v2_08e':'卷二 · 第六幕 · 东荒之行', 'v2_08f':'卷二 · 第六幕 · 东荒之行',
  'v2_09':'卷二 · 第七幕 · 身世之影', 'v2_09c':'卷二 · 第七幕 · 身世之影', 'v2_09d':'卷二 · 第七幕 · 身世之影', 'v2_09e':'卷二 · 第七幕 · 身世之影',
  'v2_10':'卷二 · 第八幕 · 决赛劫场', 'v2_10b':'卷二 · 第八幕 · 决赛劫场', 'v2_10c':'卷二 · 第八幕 · 决赛劫场', 'v2_10d':'卷二 · 第八幕 · 决赛劫场', 'v2_11':'卷二 · 第八幕 · 决赛劫场',
  'v2_11b':'卷二 · 第九幕 · 逃亡金丹', 'v2_11c':'卷二 · 第九幕 · 逃亡金丹', 'v2_11d':'卷二 · 第九幕 · 逃亡金丹', 'v2_12':'卷二 · 第九幕 · 逃亡金丹',
  'v2_13':'卷二 · 第十幕 · 情定', 'v2_13b':'卷二 · 第十幕 · 情定', 'v2_13c':'卷二 · 第十幕 · 情定', 'v2_13d':'卷二 · 第十幕 · 情定',
  'v2_14':'卷二 · 第十一幕 · 风云落幕', 'v2e_restore':'卷二 · 第十一幕 · 风云落幕', 'v2e_lead':'卷二 · 第十一幕 · 风云落幕', 'v2e_chase':'卷二 · 第十一幕 · 风云落幕',
  'v3_teaser':'卷三 · 预告'
};
function chapterOf(resolve) {
  var id = resolve.scene && resolve.scene.id;
  if (id && CHAPTER_MAP[id]) return CHAPTER_MAP[id];
  return resolve.chapter || '';
}

var UI = {
  typing: false, typeTimer: null, typeDone: false,
  currentPanel: null, giftTarget: null, combatShown: false
};

/* ================= 界面切换 ================= */
function $(id) { return document.getElementById(id); }
function show(id) { var el = $(id); if (el) el.classList.remove('hidden'); }
function hide(id) { var el = $(id); if (el) el.classList.add('hidden'); }
function screen(name) { ['screen-start','screen-create','screen-game'].forEach(function (s) { hide(s); }); show('screen-' + name); }

/* ================= 像素头像（32×32 增强版） =================
   参数：palette 配色 / avatar { hair:0-5发型, eyes:0-5眼型, robe:0-2服饰, acc:0-3饰品, mouth:0-2嘴型, expr:表情 }
   表情 expr：normal / happy / sad / angry / cold / sly / shy
   可叠加 data/avatars.js 的精细化覆盖（GD.avatars[charId]） */
function drawPixelAvatar(canvas, char, exprOverride) {
  if (!char) return;
  var pal = char.palette || { skin:'#f0c8a0', hair:'#5b3a29', robe:'#7ec8a3', accent:'#e6c86a' };
  var ov = (GD.avatars && GD.avatars[char.id]) || {};
  var base = char.avatar || {};
  function pick(k, d) { return ov[k] !== undefined ? ov[k] : (base[k] !== undefined ? base[k] : d); }
  var av = {
    hair: pick('hair', 0), eyes: pick('eyes', 0), robe: pick('robe', 0),
    acc: pick('acc', 0), mouth: pick('mouth', 0), expr: exprOverride || pick('expr', 'normal'),
    species: pick('species', '')
  };
  var N = 32, px = canvas.width / N;
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0e131b'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  function put(x, y, c) { if (c && x >= 0 && y >= 0 && x < N && y < N) { ctx.fillStyle = c; ctx.fillRect(x * px, y * px, px + 0.5, px + 0.5); } }
  function rect(x0, y0, x1, y1, c) { for (var x = x0; x <= x1; x++) for (var y = y0; y <= y1; y++) put(x, y, c); }
  function col(c) { return Array.isArray(c) ? c : [c]; }
  var hair = col(pal.hair), skin = col(pal.skin), robe = col(pal.robe), acc = col(pal.accent);
  var pupil = acc[0], line = '#c96a5a', blushC = '#e8a0a0', white = '#ece4d8';
  var shade = function (c, amt) { return c; }; // 简化：同色系不同深浅用数组第二色

  /* ---------- 灵兽特例：九尾灵狐（白九） ---------- */
  if (char.id === 'bai_jiu' || av.species === 'fox') {
    // 尖耳（外白内粉）
    rect(9, 2, 12, 7, hair[0]); rect(19, 2, 22, 7, hair[0]);
    put(10, 3, '#e8a0b8'); put(11, 4, '#e8a0b8'); put(12, 5, '#e8a0b8');
    put(21, 3, '#e8a0b8'); put(20, 4, '#e8a0b8'); put(19, 5, '#e8a0b8');
    // 头
    rect(9, 8, 22, 16, hair[0]); rect(10, 17, 21, 18, hair[0]);
    // 腮
    put(9, 14, hair[0]); put(22, 14, hair[0]);
    // 眼（琥珀）
    rect(12, 13, 13, 13, pupil); rect(19, 13, 20, 13, pupil);
    // 鼻
    put(15, 15, '#e88aa0'); put(16, 15, '#e88aa0');
    // 嘴
    put(14, 16, hair[0]); put(17, 16, hair[0]); put(15, 17, '#e88aa0'); put(16, 17, '#e88aa0');
    // 身（白绒 + 项圈）
    rect(10, 19, 21, 29, hair[0]);
    rect(13, 21, 18, 24, '#f6e6c8');
    rect(12, 25, 19, 25, pupil);
    // 尾尖金（一角）
    put(23, 8, acc[0]); put(24, 9, acc[0]); put(23, 9, acc[0]);
    return;
  }

  /* ---------- 发型（hair 0-5） ---------- */
  if (av.hair === 0) { // 齐刘海短发
    rect(9, 3, 22, 9, hair[0]); rect(10, 10, 21, 10, hair[0]);
  } else if (av.hair === 1) { // 长直发披肩
    rect(9, 3, 22, 9, hair[0]); rect(9, 10, 10, 21, hair[0]); rect(21, 10, 22, 21, hair[0]);
  } else if (av.hair === 2) { // 高马尾
    rect(9, 3, 22, 9, hair[0]); rect(22, 4, 25, 16, hair[0]); rect(23, 17, 24, 18, hair[0]);
  } else if (av.hair === 3) { // 双丸子髻
    rect(9, 3, 22, 8, hair[0]); rect(10, 1, 13, 3, hair[0]); rect(18, 1, 21, 3, hair[0]);
  } else if (av.hair === 4) { // 盘发髻
    rect(9, 3, 22, 8, hair[0]); rect(13, 0, 18, 3, hair[0]);
  } else { // 碎刘海短发
    rect(9, 3, 22, 8, hair[0]);
    for (var bx = 10; bx <= 21; bx++) if ((bx + av.eyes) % 3 !== 0) put(bx, 9, hair[0]);
    put(10, 10, hair[0]); put(14, 10, hair[0]); put(18, 10, hair[0]);
  }

  /* ---------- 脸 ---------- */
  rect(10, 10, 21, 21, skin[0]);
  put(10, 11, skin[0]); put(21, 11, skin[0]);
  // 脖子
  rect(14, 22, 17, 22, skin[0]);

  /* ---------- 表情：眉 / 眼 / 嘴 ---------- */
  var ex = { normal:{ brow:'flat', eye:null, mouth:null, blush:false },
             happy: { brow:'up',   eye:'squint', mouth:'open', blush:true },
             sad:   { brow:'sad',  eye:'half',   mouth:'frown', blush:false },
             angry: { brow:'angry',eye:'fierce', mouth:'line',  blush:false },
             cold:  { brow:'flat', eye:'half',   mouth:'line',  blush:false },
             sly:   { brow:'sly',  eye:'sly',    mouth:'smirk', blush:false },
             shy:   { brow:'up',   eye:'look',   mouth:'line',  blush:true } }[av.expr] || { brow:'flat', eye:null, mouth:null, blush:false };
  // 眉（y=13）
  function brow(kind) {
    if (kind === 'up') { put(11, 12, hair[1] || hair[0]); put(12, 13, hair[1] || hair[0]); put(13, 13, hair[1] || hair[0]); put(18, 13, hair[1] || hair[0]); put(19, 13, hair[1] || hair[0]); put(20, 12, hair[1] || hair[0]); }
    else if (kind === 'sad') { put(11, 12, hair[1] || hair[0]); put(12, 12, hair[1] || hair[0]); put(13, 13, hair[1] || hair[0]); put(18, 13, hair[1] || hair[0]); put(19, 12, hair[1] || hair[0]); put(20, 12, hair[1] || hair[0]); }
    else if (kind === 'angry') { put(11, 12, hair[1] || hair[0]); put(12, 13, hair[1] || hair[0]); put(13, 14, hair[1] || hair[0]); put(18, 14, hair[1] || hair[0]); put(19, 13, hair[1] || hair[0]); put(20, 12, hair[1] || hair[0]); }
    else if (kind === 'sly') { put(11, 13, hair[1] || hair[0]); put(12, 13, hair[1] || hair[0]); put(13, 13, hair[1] || hair[0]); put(18, 12, hair[1] || hair[0]); put(19, 12, hair[1] || hair[0]); put(20, 12, hair[1] || hair[0]); }
    else { put(11, 13, hair[1] || hair[0]); put(12, 13, hair[1] || hair[0]); put(13, 13, hair[1] || hair[0]); put(18, 13, hair[1] || hair[0]); put(19, 13, hair[1] || hair[0]); put(20, 13, hair[1] || hair[0]); }
  }
  // 眼（y=15..16）
  function eye(kind, style) {
    if (kind === 'squint') { rect(11, 15, 14, 15, pupil); rect(17, 15, 20, 15, pupil); return; }
    if (kind === 'half') { rect(11, 15, 12, 15, pupil); rect(19, 15, 20, 15, pupil); put(11, 14, shade(pupil, 1)); put(12, 14, shade(pupil, 1)); put(19, 14, shade(pupil, 1)); put(20, 14, shade(pupil, 1)); return; }
    if (kind === 'fierce') { put(11, 15, pupil); put(12, 15, pupil); put(13, 14, pupil); put(20, 15, pupil); put(19, 15, pupil); put(18, 14, pupil); return; }
    if (kind === 'sly') { rect(11, 15, 12, 16, pupil); rect(19, 15, 20, 15, pupil); return; }
    if (kind === 'look') { put(11, 15, white); put(12, 15, white); put(19, 15, white); put(20, 15, white); put(11, 16, pupil); put(19, 16, pupil); return; }
    // 基础眼型
    if (style === 0) { rect(11, 15, 12, 16, pupil); rect(19, 15, 20, 16, pupil); }
    else if (style === 1) { rect(11, 15, 13, 15, pupil); rect(18, 15, 20, 15, pupil); put(12, 16, pupil); put(19, 16, pupil); }
    else if (style === 2) { rect(11, 15, 12, 15, pupil); rect(19, 15, 20, 15, pupil); put(11, 14, shade(pupil, 1)); put(12, 14, shade(pupil, 1)); put(19, 14, shade(pupil, 1)); put(20, 14, shade(pupil, 1)); }
    else if (style === 3) { rect(11, 15, 14, 15, pupil); rect(17, 15, 20, 15, pupil); }
    else if (style === 4) { put(11, 15, pupil); put(12, 15, pupil); put(13, 14, pupil); put(20, 15, pupil); put(19, 15, pupil); put(18, 14, pupil); }
    else { rect(10, 15, 13, 16, white); rect(18, 15, 21, 16, white); put(12, 15, pupil); put(19, 15, pupil); }
  }
  // 嘴（y=19..20）
  function mouth(kind, style) {
    if (kind === 'smile' || (kind === null && style === 0)) { put(12, 18, line); put(19, 18, line); rect(13, 19, 18, 19, line); }
    else if (kind === 'open') { rect(13, 19, 18, 19, line); rect(14, 20, 17, 20, line); }
    else if (kind === 'frown') { put(12, 20, line); put(19, 20, line); rect(13, 19, 18, 19, line); }
    else if (kind === 'smirk') { rect(13, 19, 17, 19, line); put(18, 18, line); put(12, 19, line); }
    else if (kind === 'line' || (kind === null && style === 1)) { rect(13, 19, 18, 19, line); }
    else { rect(13, 19, 18, 19, line); }
  }
  brow(ex.brow);
  eye(ex.eye, av.eyes);
  mouth(ex.mouth, av.mouth);
  // 腮红
  if (ex.blush) { put(9, 18, blushC); put(10, 18, blushC); put(21, 18, blushC); put(22, 18, blushC); }

  /* ---------- 服饰（robe 0-2） ---------- */
  if (av.robe === 0) { // 交领道袍
    rect(10, 23, 21, 29, robe[0]);
    put(13, 23, robe[1] || robe[0]); put(12, 24, robe[1] || robe[0]); put(11, 25, robe[1] || robe[0]); put(10, 26, robe[1] || robe[0]);
    put(18, 23, robe[1] || robe[0]); put(19, 24, robe[1] || robe[0]); put(20, 25, robe[1] || robe[0]); put(21, 26, robe[1] || robe[0]);
    rect(12, 27, 19, 27, acc[0]); put(15, 24, acc[0]); put(16, 25, acc[0]);
  } else if (av.robe === 1) { // 高领劲装
    rect(10, 23, 21, 29, robe[0]);
    rect(13, 23, 18, 24, robe[1] || robe[0]);
    rect(11, 26, 20, 26, acc[0]);
    put(9, 24, robe[1] || robe[0]); put(9, 25, robe[1] || robe[0]); put(22, 24, robe[1] || robe[0]); put(22, 25, robe[1] || robe[0]);
  } else { // 襦裙
    rect(10, 23, 21, 26, robe[0]);
    rect(12, 27, 19, 29, skin[1] || '#e8d8c8');
    rect(14, 24, 17, 25, acc[0]);
  }

  /* ---------- 饰品（acc 0-3） ---------- */
  if (av.acc === 1) { rect(18, 1, 19, 5, acc[0]); put(18, 6, acc[0]); }               // 发簪
  else if (av.acc === 2) { put(15, 10, acc[0]); put(16, 10, acc[0]); put(15, 11, acc[0]); } // 额饰/花钿
  else if (av.acc === 3) { put(9, 17, acc[0]); put(9, 18, acc[0]); put(22, 17, acc[0]); put(22, 18, acc[0]); } // 耳坠
}
function avatarDataURL(char, expr) {
  var c = document.createElement('canvas');
  c.width = 160; c.height = 160;
  drawPixelAvatar(c, char, expr);
  return c.toDataURL();
}
var avatarCache = {};
function avatarImg(charId, size, expr) {
  var char = E.charDef(charId);
  if (!char) return '';
  var key = charId + '|' + (expr || '');
  if (!avatarCache[key]) avatarCache[key] = avatarDataURL(char, expr);
  return '<img class="avatar" style="width:' + (size || 52) + 'px;height:' + (size || 52) + 'px" src="' + avatarCache[key] + '" alt="' + char.name + '">';
}
function findCharByName(name) {
  for (var id in GD.characters) { if (GD.characters[id].name === name) return GD.characters[id]; }
  return null;
}
/* 对话说话人头像：段落以 @名字|表情@ 开头时，插入头像名牌并跳过该标记段 */
function attachSpeaker(pEl, segs) {
  if (!segs || !segs.length || segs[0].cls !== 'spk') return;
  var sp = segs[0].t.split('|'), name = sp[0], expr = sp[1] || '';
  var c = findCharByName(name);
  if (!c) return;
  var chip = document.createElement('span');
  chip.className = 'speaker-chip';
  chip.innerHTML = avatarImg(c.id, 40, expr) + '<b>' + c.name + '</b>';
  pEl.appendChild(chip);
  segs.splice(0, 1);
}

/* ================= 小标记文本解析 ================= */
function parseSegs(text) {
  // **粗** *红* ~暗~ @说话人@ #梧老#
  var segs = [], re = /(\*\*[^*]+\*\*|\*[^*]+\*|~[^~]+~|@[^@]+@|#[^#]+#)/g;
  var last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push({ t: text.slice(last, m.index), cls: '' });
    var tok = m[0];
    if (tok[0] === '*' && tok[1] === '*') segs.push({ t: tok.slice(2, -2), cls: 'b' });
    else if (tok[0] === '*') segs.push({ t: tok.slice(1, -1), cls: 'em' });
    else if (tok[0] === '~') segs.push({ t: tok.slice(1, -1), cls: 'dim' });
    else if (tok[0] === '@') segs.push({ t: tok.slice(1, -1), cls: 'spk' });
    else if (tok[0] === '#') segs.push({ t: tok.slice(1, -1), cls: 'spk-wulao' });
    last = m.index + tok.length;
  }
  if (last < text.length) segs.push({ t: text.slice(last), cls: '' });
  return segs;
}

/* ================= 打字机 ================= */
function speedMs() {
  var sp = E.state.settings.textSpeed;
  return sp === 'slow' ? 30 : sp === 'fast' ? 2 : 12;
}
function startTyping(container, paragraphs) {
  stopTyping();
  container.innerHTML = '';
  UI.typing = true; UI.typeDone = false;
  var paras = paragraphs.slice();
  var pi = 0, si = 0, ci = 0;
  var pEl = null, segEl = null, segs = null;
  var caret = $('typing-caret');
  if (caret) caret.classList.remove('hidden');

  function nextChar() {
    if (!UI.typing) return;
    if (pi >= paras.length) { finish(); return; }
    if (!pEl) {
      pEl = document.createElement('p');
      pEl.style.minHeight = '1.6em';
      container.appendChild(pEl);
      segs = parseSegs(paras[pi]);
      attachSpeaker(pEl, segs);
      si = 0;
    }
    if (si >= segs.length) { pi++; pEl = null; schedule(); return; }
    var seg = segs[si];
    if (!segEl) {
      segEl = document.createElement(seg.cls ? 'span' : 'span');
      if (seg.cls) segEl.className = seg.cls;
      pEl.appendChild(segEl);
      ci = 0;
    }
    if (ci < seg.t.length) {
      segEl.textContent += seg.t[ci];
      ci++;
      if (ci % 2 === 0) AUDIO.play('type');
      schedule(1);
    } else { si++; segEl = null; schedule(); }
  }
  function schedule(n) { UI.typeTimer = setTimeout(nextChar, n || speedMs()); }
  function finish() {
    UI.typing = false; UI.typeDone = true;
    if (caret) caret.classList.add('hidden');
    UI.onTypeDone && UI.onTypeDone();
  }
  schedule(2);
}
function stopTyping() { UI.typing = false; if (UI.typeTimer) { clearTimeout(UI.typeTimer); UI.typeTimer = null; } }
function completeTyping() {
  if (!UI.typing) return;
  var c = $('scene-text');
  // 直接全文渲染
  stopTyping();
  var paras = c.__paras || [];
  c.innerHTML = '';
  paras.forEach(function (p) {
    var el = document.createElement('p');
    var psegs = parseSegs(p);
    attachSpeaker(el, psegs);
    psegs.forEach(function (seg) {
      var sp = document.createElement('span');
      if (seg.cls) sp.className = seg.cls;
      sp.textContent = seg.t;
      el.appendChild(sp);
    });
    c.appendChild(el);
  });
  UI.typeDone = true;
  var caret = $('typing-caret'); if (caret) caret.classList.add('hidden');
  UI.onTypeDone && UI.onTypeDone();
}

/* ================= 通知 ================= */
function toast(msg, cls) {
  var box = $('toasts');
  var el = document.createElement('div');
  el.className = 'toast' + (cls ? ' ' + cls : '');
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(function () { el.remove(); }, 3200);
}
function notesToasts(notes) {
  if (!notes) return;
  notes.forEach(function (n) {
    if (n.type === 'item') { var it = E.itemDef(n.k); if (it) toast((n.v > 0 ? '获得 ' : '失去 ') + it.name + (n.v > 1 ? ' ×' + n.v : '')); AUDIO.play('item'); }
    else if (n.type === 'rel') { var c = E.charDef(n.k); if (c) toast(c.name + ' 好感 ' + (n.v > 0 ? '+' : '') + n.v); }
    else if (n.type === 'stat') { if (STAT_LABELS[n.k]) toast(STAT_LABELS[n.k] + (n.v > 0 ? ' +' : ' ') + n.v); }
    else if (n.type === 'map') { var loc = (GD.map.locations || []).filter(function (l) { return l.id === n.k; })[0]; if (loc) { toast('迷雾散开：「' + loc.name + '」已解锁'); AUDIO.play('fog'); } }
    else if (n.type === 'skill') { var sk = E.skillDef(n.k); if (sk) toast('习得功法：' + sk.name); }
    else if (n.type === 'temper') { toast(TEMPER_LABELS[n.k] + ' 倾向 ' + (n.v > 0 ? '+' : '') + n.v); }
    else if (n.type === 'beast') { var b = E.beastDef(n.k); if (b) toast('图鉴点亮：' + b.name); }
  });
}

/* ================= 选项效果预览 ================= */
function describeEffects(fx) {
  if (!fx) return '';
  var parts = [];
  if (fx.stats) for (var k in fx.stats) { var v = fx.stats[k]; if (v) parts.push(STAT_LABELS[k] + (v > 0 ? '+' : '') + v); }
  if (fx.temper) for (var t in fx.temper) { var tv = fx.temper[t]; if (tv) parts.push(TEMPER_LABELS[t] + (tv > 0 ? '+' : '') + tv); }
  if (fx.rel) for (var r in fx.rel) { var c = E.charDef(r); if (c) parts.push(c.name + (fx.rel[r] > 0 ? '+' : '') + fx.rel[r]); }
  if (fx.items && fx.items.add) for (var i in fx.items.add) { var it = E.itemDef(i); if (it) parts.push('获' + it.name + '×' + fx.items.add[i]); }
  if (fx.items && fx.items.remove) for (var i2 in fx.items.remove) { var it2 = E.itemDef(i2); if (it2) parts.push('失' + it2.name); }
  return parts.join(' · ');
}

/* ================= 主渲染 ================= */
UI.render = function (resolve, notes) {
  if (!resolve || resolve.error) { toast('剧情异常：' + (resolve && resolve.error || '未知')); return; }
  E.resolve = resolve;
  var s = E.state;
  stopTyping();
  // 场景信息
  $('scene-title').textContent = resolve.title || '';
  $('scene-chapter').textContent = chapterOf(resolve);
  $('scene-location').textContent = locName(resolve.location) || '';
  // 正文
  var paras = (resolve.text || '').split(/\n\n+/);
  var textEl = $('scene-text');
  textEl.__paras = paras;
  applyFontSize();
  startTyping(textEl, paras);
  // 选项
  var box = $('choices');
  box.innerHTML = '';
  var showFx = s.settings.showEffects;
  (resolve.choices || []).forEach(function (c, idx) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.animationDelay = (idx * 70) + 'ms';
    var html = c.text;
    if (c.danger && s.settings.dangerHints) html += ' <span class="cb-hint">此路凶险</span>';
    if (showFx) { var fx = describeEffects(c.effects); if (fx) html += ' <span class="cb-effect">[' + fx + ']</span>'; }
    btn.innerHTML = html;
    btn.addEventListener('click', function () { AUDIO.play('click'); onChoice(idx); });
    box.appendChild(btn);
  });
  // 结局标记
  if (resolve.ending) renderEndingCard(resolve.ending);
  // 章节转场卡（仅在幕切换时浮现一次，同一幕内的多场景不再反复弹出）
  var ch = chapterOf(resolve);
  if (ch && ch !== UI.lastChapter) {
    UI.lastChapter = ch;
    var card = document.createElement('div');
    card.className = 'chapter-card';
    card.innerHTML = '<span>' + ch + '</span><b>' + (resolve.title || '') + '</b>';
    var sa = $('story-area');
    if (sa) sa.appendChild(card);
    setTimeout(function () { if (card.parentNode) card.parentNode.removeChild(card); }, 2500);
  }
  // 战斗
  if (resolve.combat && !UI.combatShown) {
    setTimeout(function () { g.GameCombat.start(resolve); }, 600);
  }
  // 底栏
  updateStatusBar();
  notesToasts(notes);
  SAVE.autosave(s);
};

function onChoice(idx) {
  var r = E.choose(idx);
  if (!r) return;
  notesToasts(r.notes);
  if (r.mapreturn) { openPanel('map'); return; }
  if (r.ending) { UI.renderEnding(r.ending); return; }
  if (r.resolve) { UI.render(r.resolve); }
}
UI.onTypeDone = function () { /* 打字结束后无需额外动作 */ };

function locName(locId) {
  var l = (GD.map.locations || []).filter(function (x) { return x.id === locId; })[0];
  return l ? l.name : '';
}

function updateStatusBar() {
  var s = E.state;
  $('sb-realm').textContent = '境界：' + E.realmName(s);
  $('sb-lingshi').textContent = '灵石：' + s.stats.lingshi;
  var dt = E.dominantTemper(s);
  $('sb-temper').textContent = '性格：' + dt.labels[dt.axis] + ' ' + dt.val;
  $('sb-loc').textContent = '📍 ' + locName(s.map.current);
}

/* ================= 结局 ================= */
function renderEndingCard(kind) {
  var card = document.createElement('div');
  card.className = 'ending-card';
  var data = g.GameData.endings && g.GameData.endings[kind] || {};
  var body = typeof data.render === 'function' ? data.render(E.state) : (data.title || kind);
  card.innerHTML = '<h3>『' + (data.title || '结局') + '』</h3><p>' + body + '</p>';
  var wrap = $('scene-text');
  wrap.appendChild(card);
  AUDIO.play('end');
  SAVE.saveState(E.state, 'auto');
  // 固定按钮：返回主菜单
  var btn = document.createElement('button');
  btn.className = 'btn btn-big';
  btn.textContent = '已自动存档 · 返回主菜单';
  btn.style.marginTop = '16px';
  btn.addEventListener('click', function () { screen('start'); AUDIO.play('click'); });
  wrap.appendChild(btn);
}
UI.renderEnding = function (kind) { renderEndingCard(kind); };

/* ================= 面板 ================= */
function openPanel(name) {
  closePanel();
  if (name === 'map') { renderMapPanel(); }
  else if (name === 'status') renderStatus();
  else if (name === 'inventory') renderInventory();
  else if (name === 'relations') renderRelations();
  else if (name === 'bestiary') renderBestiary();
  else if (name === 'skills') renderSkills();
  else if (name === 'save') renderSave();
  else if (name === 'settings') renderSettings();
  var p = $('panel-' + name);
  p.classList.remove('hidden');
  show('panel-backdrop');
  UI.currentPanel = name;
  document.querySelectorAll('.tb-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.panel === name); });
  AUDIO.play('click');
}
function closePanel() {
  if (UI.currentPanel) { var p = $('panel-' + UI.currentPanel); if (p) p.classList.add('hidden'); }
  hide('panel-backdrop');
  UI.currentPanel = null;
  document.querySelectorAll('.tb-btn').forEach(function (b) { b.classList.remove('active'); });
}
UI.closePanel = closePanel;

function panelShell(title) {
  return '<h3>' + title + ' <button class="p-close" data-close><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></h3>';
}

/* —— 状态 —— */
function renderStatus() {
  var s = E.state, p = $('panel-status');
  var prog = E.realmProgress(s);
  var dt = E.dominantTemper(s);
  var cb = E.combatStats(s);
  var html = panelShell('状态') +
    '<div class="char-card">' + avatarImg('player', 88) +
    '<div class="cc-info"><b>' + s.profile.name + '</b><div class="cc-title">' + (E.ORIGINS[s.profile.origin].name) + ' · ' + E.realmName(s) + '</div>' +
    '<div class="cc-root">' + ({ lei:'雷灵根(变异)', jin:'金灵根', mu:'木灵根', shui:'水灵根', huo:'火灵根', tu:'土灵根', bing:'冰灵根(变异)', feng:'风灵根(变异)', an:'暗灵根(变异)' }[s.profile.spiritRoot] || s.profile.spiritRoot) + ' · ' + ({ fan:'凡体', ling:'灵体', dao:'道体', mo:'魔体' }[s.profile.physique] || s.profile.physique) + '</div>' +
    '<div class="bar gold" style="width:100%"><i style="width:' + prog.pct + '%"></i></div>' +
    '<div style="font-size:12px;color:#8f8a7c">修为 ' + prog.have + '/' + prog.need + '（' + prog.pct + '%）</div></div></div>' +
    '<div class="stat-grid">' +
    statCell('悟性', s.stats.wuxing) + statCell('心境', s.stats.xinjing, s.stats.xinjing >= 70 ? 'jade' : s.stats.xinjing <= 25 ? 'gold' : '') +
    statCell('声望', s.stats.shengwang) + statCell('魅力', s.stats.meili) +
    statCell('正邪', s.stats.zhengxie, s.stats.zhengxie >= 50 ? 'jade' : s.stats.zhengxie <= -50 ? 'gold' : '') +
    statCell('灵石', s.stats.lingshi, 'gold') +
    statCell('攻击', cb.atk) + statCell('防御', cb.def) +
    statCell('气血', cb.hp) + statCell('身法', cb.spd) +
    '</div>' +
    '<h3 style="margin-top:14px">装备</h3>' +
    '<div class="equip-line">武器：' + (s.equip.weapon ? (E.itemDef(s.equip.weapon) || { name: s.equip.weapon }).name : '无') +
    ' · 防具：' + (s.equip.armor ? (E.itemDef(s.equip.armor) || { name: s.equip.armor }).name : '无') +
    ' · 饰品：' + (s.equip.accessory ? (E.itemDef(s.equip.accessory) || { name: s.equip.accessory }).name : '无') + '</div>' +
    '<h3 style="margin-top:14px">性格倾向</h3>' +
    ['xiayi','gongli','henla'].map(function (ax) {
      return '<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:13px;color:#8f8a7c"><span>' + TEMPER_LABELS[ax] + '</span><span>' + s.temper[ax] + '</span></div><div class="bar"><i style="width:' + clampPct(s.temper[ax]) + '%"></i></div></div>';
    }).join('') +
    '<div style="font-size:12px;color:#8f8a7c">主导性格：<b style="color:#e6c86a">' + dt.labels[dt.axis] + '</b>（影响后续剧情走向）</div>' +
    (prog.pct >= 100 ? '<button class="btn btn-big" id="btn-break">尝试突破 → ' + nextRealmName() + '</button>' : '');
  p.innerHTML = html;
  var b = p.querySelector('#btn-break');
  if (b) b.addEventListener('click', doBreakthrough);
  bindClose(p);
}
function statCell(name, val, cls) { return '<div class="stat-cell"><div class="s-name">' + name + '</div><div class="s-val ' + (cls || '') + '">' + val + '</div></div>'; }
function clampPct(v) { return Math.max(3, Math.min(100, (v + 5) * 12)); }
function nextRealmName() { return E.REALMS[Math.min(E.state.stats.realmIdx + 1, E.REALMS.length - 1)]; }
function doBreakthrough() {
  var r = E.tryBreakthrough(E.state);
  if (r.ok) {
    AUDIO.play('break');
    toast('突破成功！踏入 ' + E.realmName(E.state) + (r.crit ? '（天道眷顾，根基圆满）' : ''));
    var flash = document.createElement('div');
    flash.className = 'break-flash';
    document.body.appendChild(flash);
    setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 950);
    var hpGain = r.big ? 30 : 10;
    E.applyEffects(E.state, { stats: { hpBonus: hpGain, xinjing: 5 } });
    renderStatus(); updateStatusBar(); SAVE.autosave(E.state);
  } else if (r.failed) {
    AUDIO.play('lose');
    toast('突破失败！修为折损，心境受损……');
    renderStatus(); updateStatusBar(); SAVE.autosave(E.state);
  } else {
    toast(r.msg || '无法突破');
  }
}

/* —— 背包 —— */
function renderInventory() {
  var s = E.state, p = $('panel-inventory');
  var html = panelShell('背包');
  var groups = {};
  TYPE_ORDER.forEach(function (t) { groups[t] = []; });
  for (var id in s.items) {
    var it = E.itemDef(id);
    if (!it) continue;
    (groups[it.type] = groups[it.type] || []).push(id);
  }
  var any = false;
  TYPE_ORDER.forEach(function (t) {
    if (!groups[t].length) return;
    any = true;
    html += '<div class="inv-group"><h4>' + ITEM_TYPE_NAMES[t] + '</h4><div class="inv-grid">';
    groups[t].forEach(function (id) {
      var it = E.itemDef(id);
      html += '<div class="inv-item" data-item="' + id + '"><div class="ii-name">' + it.name + '</div><div class="ii-count">×' + s.items[id] + '</div><div class="ii-tier tier-' + (it.tier || 1) + '">' + (it.tierName || ('第' + (it.tier || 1) + (t === 'dan' ? '品' : '阶'))) + '</div></div>';
    });
    html += '</div></div>';
  });
  if (!any) html += '<p style="color:#8f8a7c">行囊空空……</p>';
  if (s.skills.indexOf('danjing') >= 0) html += '<button class="btn btn-big" id="btn-lian">⚗ 炼制丹药</button>';
  p.innerHTML = html;
  p.querySelectorAll('.inv-item').forEach(function (el) {
    el.addEventListener('click', function () { itemModal(el.dataset.item); });
  });
  var lb = p.querySelector('#btn-lian');
  if (lb) lb.addEventListener('click', alchemyModal);
  bindClose(p);
}

function itemModal(id) {
  var s = E.state, it = E.itemDef(id);
  if (!it) return;
  var html = '<h3>' + it.name + (s.items[id] > 1 ? ' ×' + s.items[id] : '') + '</h3>' +
    '<p>' + (it.desc || '') + '</p>' +
    '<p class="m-dim">品阶：' + (it.tierName || '') + ' · 类型：' + (ITEM_TYPE_NAMES[it.type] || it.type) + '</p>';
  var lore = GD.lore && GD.lore.items && GD.lore.items[id];
  if (lore) html += '<p class="m-dim" style="margin-top:8px;border-top:1px solid rgba(217,210,192,.12);padding-top:8px">📜 ' + lore + '</p>';
  var btns = '<div class="m-btns">';
  if (it.usable) btns += '<button class="btn" data-act="use">使用</button>';
  if (it.type === 'fabao' && it.slot) {
    var equipped = s.equip[it.slot] === id;
    btns += '<button class="btn" data-act="equip">' + (equipped ? '卸下' : '装备') + '</button>';
  }
  btns += '<button class="btn" data-act="gift">赠予他人</button><button class="btn" data-act="close">关闭</button></div>';
  html += btns;
  openModal(html);
  $('modal-body').querySelectorAll('[data-act]').forEach(function (b) {
    b.addEventListener('click', function () {
      var act = b.dataset.act;
      if (act === 'close') { closeModal(); return; }
      if (act === 'use') {
        if (it.usable) {
          var notes = E.applyEffects(s, it.usable.effects);
          if (it.usable.consume !== false) { s.items[id]--; if (s.items[id] <= 0) delete s.items[id]; }
          notesToasts(notes); AUDIO.play('item');
          closeModal(); renderInventory(); updateStatusBar(); SAVE.autosave(s);
        }
      } else if (act === 'equip') {
        if (s.equip[it.slot] === id) s.equip[it.slot] = null;
        else s.equip[it.slot] = id;
        AUDIO.play('click'); closeModal(); renderInventory(); toast(it.name + (s.equip[it.slot] === id ? ' 已装备' : ' 已卸下')); SAVE.autosave(s);
      } else if (act === 'gift') { closeModal(); giftPick(id); }
    });
  });
}

function giftPick(itemId) {
  var html = '<h3>将物品赠予谁？</h3><p class="m-dim">' + (E.itemDef(itemId) ? E.itemDef(itemId).name : '') + '</p><div class="m-btns">';
  var chars = Object.keys(E.state.rel);
  if (!chars.length) { html += '<p style="color:#8f8a7c">还没有认识的人。</p>'; }
  chars.forEach(function (cid) {
    var c = E.charDef(cid);
    if (c) html += '<button class="btn" data-cid="' + cid + '">' + c.name + '</button>';
  });
  html += '<button class="btn" data-cid="">取消</button></div>';
  openModal(html);
  $('modal-body').querySelectorAll('[data-cid]').forEach(function (b) {
    b.addEventListener('click', function () {
      var cid = b.dataset.cid;
      closeModal();
      if (!cid) return;
      var s = E.state;
      if (s.items[itemId] <= 0) return;
      var c = E.charDef(cid);
      var liked = c && c.likes && c.likes.indexOf(itemId) >= 0;
      var gain = liked ? 12 : 3;
      E.applyEffects(s, { rel: (function () { var o = {}; o[cid] = gain; return o; })(), items: { remove: (function () { var o = {}; o[itemId] = 1; return o; })() } });
      if (liked) toast(c.name + ' 很喜欢这份礼物！好感 +' + gain); else toast(c.name + ' 收下了礼物（好感 +' + gain + '）');
      AUDIO.play('gift');
      renderInventory(); renderRelations(); SAVE.autosave(s);
    });
  });
}

/* —— 炼丹 —— */
function alchemyModal() {
  var s = E.state;
  var html = '<h3>⚗ 炼制丹药</h3>';
  var dangs = GD.danfang || {};
  var any = false;
  for (var key in dangs) {
    var df = dangs[key];
    if (df.lock && !s.flags[df.lock]) continue;
    if (df.skill && s.skills.indexOf(df.skill) < 0) continue;
    any = true;
    var can = df.mats.every(function (m) { return s.items[m.id] >= m.n; });
    html += '<div style="border:1px solid rgba(217,210,192,.12);border-radius:8px;padding:8px 10px;margin-bottom:8px">' +
      '<b style="color:#e6c86a">' + df.name + '</b> <span style="font-size:12px;color:#8f8a7c">成功率 ' + Math.round(df.rate * 100) + '%（' + df.rateDesc + '）</span><br>' +
      '<span style="font-size:13px;color:#8f8a7c">' + df.mats.map(function (m) { var it = E.itemDef(m.id); return (it ? it.name : m.id) + '×' + m.n + (s.items[m.id] >= m.n ? '' : '（缺）'); }).join('、') + '</span>' +
      (can ? '<button class="mini-btn" style="float:right" data-lian="' + key + '">炼制</button>' : '') + '</div>';
  }
  if (!any) html += '<p style="color:#8f8a7c">暂无可用丹方。学习丹道后可炼制。</p>';
  html += '<div class="m-btns"><button class="btn" data-close="1">关闭</button></div>';
  openModal(html);
  $('modal-body').querySelectorAll('[data-lian]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.dataset.lian, df = dangs[key];
      var s2 = E.state;
      var can = df.mats.every(function (m) { return s2.items[m.id] >= m.n; });
      if (!can) { toast('材料不足'); return; }
      df.mats.forEach(function (m) { s2.items[m.id] -= m.n; if (s2.items[m.id] <= 0) delete s2.items[m.id]; });
      var roll = Math.random();
      if (roll < df.rate) {
        var jp = roll < df.rate * 0.12;
        var out = jp ? df.outJp || df.out : df.out;
        E.applyEffects(s2, { items: { add: (function () { var o = {}; o[out] = 1; return o; })() } });
        AUDIO.play('break');
        toast((jp ? '🌟 炼制出极品！' : '炼制成功！') + '获得 ' + (E.itemDef(out) ? E.itemDef(out).name : out));
      } else {
        AUDIO.play('lose');
        toast('炼制失败……材料化为灰烬');
      }
      alchemyModal(); SAVE.autosave(s2);
    });
  });
  $('modal-body').querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
}

/* —— 关系 —— */
function renderRelations() {
  var s = E.state, p = $('panel-relations');
  var ids = Object.keys(s.rel).filter(function (id) { return E.charDef(id); });
  var html = panelShell('关系');
  if (!ids.length) { html += '<p style="color:#8f8a7c">尚未结识任何人。去剧情里遇见他们吧。</p>'; }
  ids.sort(function (a, b) { return s.rel[b] - s.rel[a]; });
  ids.forEach(function (id) {
    var c = E.charDef(id), st = E.relStatus(s, id);
    var likes = (c.likes || []).map(function (l) { var it = E.itemDef(l); return it ? it.name : l; }).join('、') || '无';
    var dis = (c.dislikes && c.dislikes.length) ? ' · 厌恶：' + c.dislikes.join('、') : '';
    var pers = c.personality ? '<div class="rc-likes">性格：' + c.personality + '</div>' : '';
    var sec = (c.secret && st.v >= 60) ? '<div class="rc-secret">🤫 ' + c.secret + '</div>' : '';
    html += '<div class="rel-card">' + avatarImg(id, 52) +
      '<div style="flex:1;min-width:0"><div><span class="rc-name">' + c.name + '</span><span class="rc-status">' + st.label + '</span></div>' +
      '<div class="rc-rel">好感 ' + st.v + (c.secret ? '<span style="color:var(--ink-faint)"> · 秘密 ' + (st.v >= 60 ? '已解锁' : '（好感 60 解锁）') + '</span>' : '') + '</div>' +
      '<div class="rc-likes">喜好：' + likes + dis + '</div>' + pers + sec + '</div>' +
      '<button class="mini-btn rc-gift" data-gift="' + id + '">送礼</button></div>';
  });
  p.innerHTML = html;
  p.querySelectorAll('[data-gift]').forEach(function (b) {
    b.addEventListener('click', function () { giftFor(b.dataset.gift); });
  });
  bindClose(p);
}
function giftFor(cid) {
  var s = E.state;
  var gifts = Object.keys(s.items).filter(function (id) { return s.items[id] > 0; });
  if (!gifts.length) { toast('背包里没有可赠送的物品'); return; }
  var html = '<h3>选择礼物</h3><div class="inv-grid" style="grid-template-columns:repeat(auto-fill,minmax(120px,1fr))">';
  gifts.forEach(function (id) {
    var it = E.itemDef(id);
    if (!it) return;
    html += '<div class="inv-item" data-gid="' + id + '"><div class="ii-name">' + it.name + '</div><div class="ii-count">×' + s.items[id] + '</div></div>';
  });
  html += '</div><div class="m-btns"><button class="btn" data-close="1">取消</button></div>';
  openModal(html);
  $('modal-body').querySelectorAll('[data-gid]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.dataset.gid;
      closeModal();
      var c = E.charDef(cid);
      var liked = c && c.likes && c.likes.indexOf(id) >= 0;
      E.applyEffects(s, { items: { remove: (function () { var o = {}; o[id] = 1; return o; })() }, rel: (function () { var o = {}; o[cid] = liked ? 12 : 3; return o; })() });
      toast(c.name + (liked ? ' 眼睛一亮，很喜欢这份礼！（+12）' : ' 收下了礼物。（+3）'));
      AUDIO.play('gift');
      renderRelations(); renderInventory(); SAVE.autosave(s);
    });
  });
  $('modal-body').querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
}

/* —— 地图 —— */
function renderMapPanel() {
  var p = $('panel-map');
  p.innerHTML = panelShell('地图 · 苍梧界') + '<div id="map-box"></div>';
  bindClose(p);
  g.GameMap.render(p.querySelector('#map-box'), E.state);
}

/* —— 图鉴 —— */
function renderBestiary() {
  var s = E.state, p = $('panel-bestiary');
  var beastTotal = Object.keys(GD.beasts || {}).length;
  var beastLit = (s.seenBeasts || []).length;
  var danTotal = 0, danLit = 0;
  for (var id in GD.items) { if (GD.items[id].type === 'dan') { danTotal++; if (s.seenDanyao.indexOf(id) >= 0) danLit++; } }
  var locTotal = (GD.map.locations || []).length;
  var locLit = (s.map.unlocked || []).length;
  var charTotal = Object.keys(GD.characters || {}).length;
  var charLit = Object.keys(s.rel || {}).filter(function (i) { return E.charDef(i); }).length;
  var pct = Math.round((beastLit + danLit + locLit + charLit) / Math.max(1, beastTotal + danTotal + locTotal + charTotal) * 100);
  var html = panelShell('图鉴') +
    '<div class="best-prog">图鉴收集 <b style="color:#e6c86a">' + pct + '%</b>' +
    '<div class="bar gold" style="margin-top:4px"><i style="width:' + pct + '%"></i></div>' +
    '<div style="font-size:12px;color:#8f8a7c;margin-top:4px">妖兽 ' + beastLit + '/' + beastTotal + ' · 丹药 ' + danLit + '/' + danTotal + ' · 地点 ' + locLit + '/' + locTotal + ' · 人物 ' + charLit + '/' + charTotal + '</div></div>' +
    '<div class="best-tabs">' +
    ['beasts','danyao','locs','chars'].map(function (t, i) { return '<button class="best-tab' + (i === 0 ? ' sel' : '') + '" data-tab="' + t + '">' + ({ beasts:'妖兽', danyao:'丹药', locs:'地点', chars:'人物' }[t]) + '</button>'; }).join('') +
    '</div><div id="best-body"></div>';
  p.innerHTML = html;
  p.querySelectorAll('.best-tab').forEach(function (b) {
    b.addEventListener('click', function () {
      p.querySelectorAll('.best-tab').forEach(function (x) { x.classList.remove('sel'); });
      b.classList.add('sel');
      renderBestBody(b.dataset.tab);
    });
  });
  renderBestBody('beasts');
  bindClose(p);
}
function renderBestBody(tab) {
  var s = E.state, body = $('best-body');
  var html = '<div class="best-grid">';
  if (tab === 'beasts') {
    Object.keys(GD.beasts || {}).forEach(function (bid) {
      var b = GD.beasts[bid];
      var lit = s.seenBeasts.indexOf(b.id) >= 0;
      var bl = (GD.lore && GD.lore.beasts && GD.lore.beasts[b.id]) || '';
      html += '<div class="best-card' + (lit ? ' lit' : '') + '" title="' + (lit ? bl : '未遭遇') + '">' + (lit ? '<b>' + b.name + '</b><br><span>' + b.tier + '</span>' + (bl ? '<div style="font-size:11px;color:#8f8a7c;margin-top:4px">' + bl.slice(0, 40) + '…</div>' : '') : '<b>？？？</b><div class="bk">未遭遇</div>') + '</div>';
    });
  } else if (tab === 'danyao') {
    for (var id in GD.items) {
      var it = GD.items[id];
      if (it.type !== 'dan') continue;
      var lit = s.seenDanyao.indexOf(id) >= 0;
      html += '<div class="best-card' + (lit ? ' lit' : '') + '">' + (lit ? '<b>' + it.name + '</b><br><span>' + (it.tierName || '') + '</span>' : '<b>？？？</b><div class="bk">未获得</div>') + '</div>';
    }
  } else if (tab === 'locs') {
    (GD.map.locations || []).forEach(function (l) {
      var lit = s.map.unlocked.indexOf(l.id) >= 0;
      html += '<div class="best-card' + (lit ? ' lit' : '') + '">' + (lit ? '<b>' + l.name + '</b><br><span>' + l.type + '</span>' : '<b>？？？</b><div class="bk">迷雾未散</div>') + '</div>';
    });
  } else {
    var known = Object.keys(s.rel).filter(function (id) { return E.charDef(id); });
    known.forEach(function (id) {
      var c = E.charDef(id);
      var st = (s.rel[id] || 0);
      var sec = (c.secret && st >= 60) ? '<div style="font-size:11px;color:var(--jade);margin-top:4px;line-height:1.6">🤫 ' + c.secret + '</div>' : '';
      html += '<div class="best-card lit"><b>' + c.name + '</b><br><span>' + c.title + '</span>' +
        (c.personality ? '<div style="font-size:11px;color:var(--ink-faint);margin-top:3px">' + c.personality + '</div>' : '') + sec + '</div>';
    });
  }
  html += '</div>';
  body.innerHTML = html;
}

/* —— 功法 —— */
function renderSkills() {
  var s = E.state, p = $('panel-skills');
  var html = panelShell('功法');
  if (!s.skills.length) html += '<p style="color:#8f8a7c">尚未习得任何功法。</p>';
  s.skills.forEach(function (id) {
    var sk = E.skillDef(id);
    if (!sk) return;
    html += '<div class="skill-card"><b>' + sk.name + '</b><span class="sk-tier">' + sk.tier + '</span>' +
      '<div class="sk-desc">' + sk.desc + '</div>' +
      (sk.combat ? '<div class="sk-desc" style="color:#7ec8a3">战斗：攻+' + (sk.combat.atk || 0) + ' 防+' + (sk.combat.def || 0) + ' 血+' + (sk.combat.hp || 0) + '</div>' : '') + '</div>';
  });
  p.innerHTML = html;
  bindClose(p);
}

/* —— 存档 —— */
function renderSave() {
  var s = E.state, p = $('panel-save');
  var html = panelShell('存档');
  SAVE.listSlots().forEach(function (slot) {
    html += '<div class="slot-card"><b>' + slot.name + '</b><div class="sl-meta">' +
      (slot.meta ? (slot.meta.name + ' · ' + (slot.meta.sceneTitle || '') + ' · ' + (slot.meta.realm || '') + '<br>' + fmtTime(slot.meta.playSeconds) + ' · ' + new Date(slot.meta.updatedAt).toLocaleString('zh-CN')) : '空') +
      '</div><button class="mini-btn" data-save="' + slot.slot + '">保存</button>' +
      (slot.exists ? '<button class="mini-btn" data-load="' + slot.slot + '">读取</button><button class="mini-btn" data-del="' + slot.slot + '">删除</button>' : '') + '</div>';
  });
  html += '<h3>跨设备续玩</h3>' +
    '<p class="m-dim">在 A 设备点「生成存档码」→ 复制 → 在 B 设备「导入存档码」粘贴，即可无缝续玩。</p>' +
    '<button class="btn btn-big" id="btn-export">生成存档码</button>' +
    '<textarea class="export-box" id="export-code" readonly placeholder="存档码将显示在这里"></textarea>' +
    '<button class="btn" id="btn-copy-code" style="margin-top:8px;width:100%">📋 复制存档码</button>' +
    '<button class="btn btn-big" id="btn-import" style="margin-top:8px">从存档码导入</button>' +
    '<textarea class="export-box" id="import-code" placeholder="粘贴存档码"></textarea>';
  p.innerHTML = html;
  bindClose(p);
  p.querySelectorAll('[data-save]').forEach(function (b) { b.addEventListener('click', function () { if (SAVE.saveState(s, b.dataset.save)) { toast('已保存到 ' + SAVE.SLOT_NAMES[b.dataset.save]); } renderSave(); }); });
  p.querySelectorAll('[data-load]').forEach(function (b) { b.addEventListener('click', function () { loadIntoGame(SAVE.loadState(b.dataset.save)); }); });
  p.querySelectorAll('[data-del]').forEach(function (b) { b.addEventListener('click', function () { SAVE.deleteSlot(b.dataset.del); renderSave(); }); });
  var eb = p.querySelector('#btn-export');
  if (eb) eb.addEventListener('click', function () {
    var code = SAVE.exportCode(s);
    $('export-code').value = code;
    toast('存档码已生成，可复制带走');
    AUDIO.play('click');
  });
  var cb = p.querySelector('#btn-copy-code');
  if (cb) cb.addEventListener('click', function () {
    var ta = $('export-code');
    if (!ta || !ta.value) { toast('请先点「生成存档码」'); return; }
    function fallback() { ta.focus(); ta.select(); try { document.execCommand('copy'); toast('已复制！'); } catch (e) { toast('请长按选择后复制'); } }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(function () { toast('存档码已复制 📋'); }, fallback);
    } else fallback();
    AUDIO.play('click');
  });
  var ib = p.querySelector('#btn-import');
  if (ib) ib.addEventListener('click', function () {
    var r = SAVE.importCode($('import-code').value.trim());
    if (r.ok) { toast('导入成功！'); loadIntoGame(r.state); }
    else toast(r.msg);
  });
}
function fmtTime(sec) {
  if (!sec) return '0 分钟';
  var m = Math.floor(sec / 60);
  if (m < 60) return m + ' 分钟';
  return Math.floor(m / 60) + ' 小时 ' + (m % 60) + ' 分';
}

/* —— 设置 —— */
function renderSettings() {
  var s = E.state, p = $('panel-settings');
  function row(label, key, type) {
    return '<div class="set-row"><label>' + label + '</label>' + (type === 'toggle' ?
      '<div class="toggle' + (s.settings[key] ? ' on' : '') + '" data-toggle="' + key + '"><i></i></div>' :
      '<select class="mini-btn" data-sel="' + key + '">' + (key === 'textSpeed' ?
        '<option value="slow"' + (s.settings[key] === 'slow' ? ' selected' : '') + '>慢</option><option value="mid"' + (s.settings[key] === 'mid' ? ' selected' : '') + '>中</option><option value="fast"' + (s.settings[key] === 'fast' ? ' selected' : '') + '>快</option>' :
        '<option value="small"' + (s.settings[key] === 'small' ? ' selected' : '') + '>小</option><option value="mid"' + (s.settings[key] !== 'small' && s.settings[key] !== 'large' ? ' selected' : '') + '>中</option><option value="large"' + (s.settings[key] === 'large' ? ' selected' : '') + '>大</option>') + '</select>') + '</div>';
  }
  var html = panelShell('设置') +
    row('音效', 'soundOn', 'toggle') +
    row('打字速度', 'textSpeed', 'select') +
    row('正文字号', 'fontSize', 'select') +
    row('危险选项标记', 'dangerHints', 'toggle') +
    row('选项数值预览', 'showEffects', 'toggle') +
    '<div class="set-row"><label>当前进度</label><span style="color:#8f8a7c">' + E.realmName(s) + ' · 游玩 ' + fmtTime(s.playSeconds) + '</span></div>';
  p.innerHTML = html;
  bindClose(p);
  p.querySelectorAll('[data-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.toggle;
      s.settings[k] = !s.settings[k];
      renderSettings(); SAVE.autosave(s); AUDIO.play('click');
    });
  });
  p.querySelectorAll('[data-sel]').forEach(function (b) {
    b.addEventListener('change', function () { s.settings[b.dataset.sel] = b.value; if (b.dataset.sel === 'fontSize') applyFontSize(); SAVE.autosave(s); AUDIO.play('click'); });
  });
}
function applyFontSize() {
  var el = $('scene-text');
  if (!el || !E.state) return;
  var m = { small: 16, mid: 17, large: 19 }[E.state.settings.fontSize] || 17;
  el.style.fontSize = m + 'px';
}

function bindClose(p) {
  var c = p.querySelector('[data-close]');
  if (c) c.addEventListener('click', closePanel);
}

/* ================= 战斗渲染 ================= */
UI.renderCombat = function (cb) {
  var panel = $('combat-panel');
  panel.classList.remove('hidden');
  UI.combatShown = true;
  $('cb-title').textContent = '⚔ 战斗 · 第 ' + cb.round + ' 回合';
  var enemy = cb.enemy;
  var ePct = Math.max(0, Math.round(cb.eHp / enemy.hp * 100));
  var pPct = Math.max(0, Math.round(cb.pHp / cb.ps.hp * 100));
  var eChar = findCharByName(enemy.name);
  $('cb-enemy').innerHTML = '<div style="display:flex;align-items:center;gap:8px">' + (eChar ? avatarImg(eChar.id, 44, 'angry') : '') +
    '<div><b>' + enemy.name + '</b> <span style="color:#8f8a7c">' + enemy.tier + ' · 攻' + enemy.atk + ' 防' + enemy.def + '</span>' +
    '<div class="hp-bar"><i style="width:' + ePct + '%"></i></div><div style="font-size:12px;color:#8f8a7c">气血 ' + Math.max(0, cb.eHp) + '/' + enemy.hp + '</div></div></div>';
  $('cb-player').innerHTML = '<div style="display:flex;align-items:center;gap:8px">' + avatarImg('player', 44) +
    '<div><b>' + E.state.profile.name + '</b> <span style="color:#8f8a7c">' + E.realmName(E.state) + ' · 攻' + cb.ps.atk + ' 防' + cb.ps.def + '</span>' +
    '<div class="hp-bar"><i style="width:' + pPct + '%"></i></div><div style="font-size:12px;color:#8f8a7c">气血 ' + Math.max(0, cb.pHp) + '/' + cb.ps.hp + '</div></div></div>';
  var log = $('cb-log');
  log.innerHTML = cb.log.map(function (l) { return '<div>' + l + '</div>'; }).join('');
  log.scrollTop = log.scrollHeight;
  var optBox = $('cb-options');
  optBox.innerHTML = '';
  if (!cb.ended) {
    g.GameCombat.options().forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'cb-opt';
      b.innerHTML = o.label + ' <span style="color:#8f8a7c;font-size:12px">' + o.desc + '</span>';
      b.addEventListener('click', function () { AUDIO.play('click'); g.GameCombat.act(o.kind); });
      optBox.appendChild(b);
    });
  } else {
    optBox.innerHTML = '<div style="text-align:center;color:#8f8a7c;padding:8px">战斗结束……</div>';
  }
};
UI.closeCombat = function () {
  $('combat-panel').classList.add('hidden');
  UI.combatShown = false;
};

/* ================= 弹层 ================= */
function openModal(html) {
  $('modal-body').innerHTML = html;
  show('modal');
}
function closeModal() { hide('modal'); }
$('modal') && document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'modal') closeModal();
});

/* ================= 创建角色界面 ================= */
var create = { origin: 'noble', root: 'lei', physique: 'fan', temper: { xiayi: 2, gongli: 2, henla: 2 } };

function renderCreate() {
  var oc = $('origin-cards');
  oc.innerHTML = '';
  Object.keys(E.ORIGINS).forEach(function (key) {
    var o = E.ORIGINS[key];
    var el = document.createElement('div');
    el.className = 'origin-card' + (create.origin === key ? ' sel' : '') + (o.locked ? ' locked' : '');
    el.innerHTML = '<div><span class="oc-name">' + o.name + '</span><span class="oc-tag">' + o.tag + '</span>' + (o.locked ? '<span class="oc-lock">🔒 开发中</span>' : '') + '</div><div class="oc-desc">' + o.desc + '</div>';
    el.addEventListener('click', function () { if (o.locked) { toast('该出身剧本开发中，敬请期待'); return; } create.origin = key; renderCreate(); AUDIO.play('click'); });
    oc.appendChild(el);
  });
  // 灵根
  var ro = $('root-options');
  ro.innerHTML = '';
  Object.keys(E.SPIRIT_ROOTS).forEach(function (k) {
    var locked = k === 'an';
    var el = document.createElement('button');
    el.className = 'chip' + (create.root === k ? ' sel' : '') + (locked ? ' locked' : '');
    el.textContent = E.SPIRIT_ROOTS[k] + (locked ? '（隐藏）' : '');
    el.addEventListener('click', function () { if (locked) { toast('暗灵根为隐藏选项，需特殊条件'); return; } create.root = k; renderCreate(); AUDIO.play('click'); });
    ro.appendChild(el);
  });
  // 体质
  var bo = $('body-options');
  bo.innerHTML = '';
  Object.keys(E.PHYSIQUES).forEach(function (k) {
    var el = document.createElement('button');
    el.className = 'chip' + (create.physique === k ? ' sel' : '');
    el.textContent = E.PHYSIQUES[k];
    el.addEventListener('click', function () { create.physique = k; renderCreate(); AUDIO.play('click'); });
    bo.appendChild(el);
  });
  // 性格
  var tr = $('temper-row');
  tr.innerHTML = '';
  ['xiayi','gongli','henla'].forEach(function (ax) {
    var cell = document.createElement('div');
    cell.className = 'temper-cell';
    cell.innerHTML = '<span class="t-axis">' + TEMPER_LABELS[ax] + '</span><b id="tv-' + ax + '">' + create.temper[ax] + '</b>' +
      '<button class="mini-btn" data-tp="' + ax + '" data-d="1">+</button> <button class="mini-btn" data-tp="' + ax + '" data-d="-1">−</button>';
    tr.appendChild(cell);
  });
  updateTemperLeft();
  tr.querySelectorAll('[data-tp]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ax = b.dataset.tp, d = +b.dataset.d;
      var sum = create.temper.xiayi + create.temper.gongli + create.temper.henla;
      if (d > 0 && sum >= 6) { toast('点数已分配完毕（共 6 点）'); return; }
      if (d < 0 && create.temper[ax] <= 0) return;
      create.temper[ax] += d;
      renderCreate(); AUDIO.play('click');
    });
  });
}
function updateTemperLeft() {
  var sum = create.temper.xiayi + create.temper.gongli + create.temper.henla;
  $('temper-left').textContent = 6 - sum;
}
UI.renderCreate = renderCreate;

function startNewGame() {
  screen('create');
  renderCreate();
}
function beginGame() {
  var name = ($('inp-name').value || '沈青玄').trim() || '沈青玄';
  var profile = { name: name, origin: create.origin, spiritRoot: create.root, physique: create.physique, temper: { xiayi: create.temper.xiayi, gongli: create.temper.gongli, henla: create.temper.henla } };
  var resolve = E.newGame(profile);
  screen('game');
  UI.render(resolve);
  AUDIO.play('break');
}
function loadIntoGame(state) {
  if (!state) { toast('存档不存在或已损坏'); return; }
  E.state = state;
  var resolve = E.enterScene(state.scene);
  screen('game');
  UI.render(resolve);
  AUDIO.play('click');
}
UI.loadIntoGame = loadIntoGame;

/* ================= 初始化 ================= */
UI.init = function () {
  // 开始界面
  $('btn-new').addEventListener('click', function () { AUDIO.play('click'); startNewGame(); });
  $('btn-continue').addEventListener('click', function () {
    AUDIO.play('click');
    if (SAVE.hasAuto()) loadIntoGame(SAVE.loadState('auto'));
    else toast('暂无自动存档');
  });
  $('btn-load').addEventListener('click', function () {
    AUDIO.play('click');
    if (!E.state) E.state = E.newState({ name: '沈青玄', origin: 'noble', spiritRoot: 'lei', physique: 'fan', temper: { xiayi: 2, gongli: 2, henla: 2 } });
    renderSave();
    var p = $('panel-save');
    p.classList.remove('hidden'); show('panel-backdrop');
    UI.currentPanel = 'save';
  });
  $('btn-import').addEventListener('click', function () {
    AUDIO.play('click');
    openModal('<h3>导入存档码</h3><textarea class="export-box" id="imp-code" placeholder="粘贴 WDCW2. 开头的存档码"></textarea><div class="m-btns"><button class="btn" id="imp-go">导入</button><button class="btn" data-close="1">取消</button></div>');
    $('imp-go').addEventListener('click', function () {
      var r = SAVE.importCode($('imp-code').value.trim());
      if (r.ok) { toast('导入成功！'); closeModal(); loadIntoGame(r.state); }
      else toast(r.msg);
    });
    $('modal-body').querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
  });
  // 创建
  $('btn-start').addEventListener('click', beginGame);
  $('btn-root-rand').addEventListener('click', function () {
    var keys = Object.keys(E.SPIRIT_ROOTS).filter(function (k) { return k !== 'an'; });
    create.root = keys[Math.floor(Math.random() * keys.length)];
    renderCreate(); AUDIO.play('click');
  });
  $('btn-body-rand').addEventListener('click', function () {
    var keys = Object.keys(E.PHYSIQUES);
    create.physique = keys[Math.floor(Math.random() * keys.length)];
    renderCreate(); AUDIO.play('click');
  });
  // 顶栏
  document.querySelectorAll('.tb-btn').forEach(function (b) {
    b.addEventListener('click', function () { openPanel(b.dataset.panel); });
  });
  $('panel-backdrop').addEventListener('click', closePanel);
  // 战斗收起
  $('cb-close').addEventListener('click', function () { $('combat-panel').classList.add('hidden'); });
  // 点击正文加速打字
  $('scene-text').addEventListener('click', completeTyping);
  // 计时
  setInterval(function () { if (E.state && document.body.dataset.screen !== 'start') { E.state.playSeconds = (E.state.playSeconds || 0) + 1; } }, 1000);
  // 提示
  $('start-hint').textContent = SAVE.hasAuto() ? '检测到自动存档，可点击「继续上次」' : '';
  AUDIO.unlock();
};
g.GameUI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
