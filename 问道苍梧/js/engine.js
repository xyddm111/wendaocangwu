/* ============================================================
   问道苍梧 · 核心引擎（纯逻辑，不依赖 DOM，可在 Node 中测试）
   ============================================================ */
(function (g) {
'use strict';
var GD = g.GameData || (g.GameData = {});

/* ---------- 常量 ---------- */
var REALMS = ["炼气一层","炼气二层","炼气三层","炼气四层","炼气五层","炼气六层","炼气七层","炼气八层","炼气九层",
  "筑基初期","筑基中期","筑基后期","金丹初期","金丹中期","金丹后期","元婴初期","元婴中期","元婴后期",
  "化神初期","化神中期","化神后期","渡劫期","大乘期","飞升境"];
var REALM_BONUS = REALMS.map(function (_, i) {
  return { atk: 3 + i * 2, def: 2 + Math.floor(i * 1.5), hp: 50 + i * 25, spd: 5 + i };
});
var XIWEI_NEED = [100,150,200,260,330,410,500,620,800,   /* 炼气各层 */
  1500,2200,3200,4500,6000,8000,11000,15000,20000,26000,34000,45000,60000,80000,100000]; /* 大境界 */

var ORIGINS = {
  noble:    { name:'世家嫡子', tag:'退婚流', desc:'临江城沈家嫡子。三年前灵根被废沦为笑柄，今日成人礼上，未婚妻慕容家登门退婚。', startLoc:'loc_shenjia', startScene:'v1n_01', lingshi:120, gift:{}, locked:false },
  poor:     { name:'寒门散修', tag:'逆袭流', desc:'出身贫寒的散修少年，揣着一筐干粮和一枚传家旧玉，独闯青云山求仙问道。', startLoc:'loc_linjiang', startScene:'v1p_01', lingshi:10, gift:{chuanjia_jiuyu:1}, locked:false },
  demon:    { name:'魔道遗孤', tag:'身世流', desc:'养父临终前将一面碎裂古镜托付于你，让你隐姓埋名活下去。正魔两道，都在找你。', startLoc:'loc_linjiang', startScene:'v1d_01', lingshi:30, gift:{ranxue_xinjian:1}, locked:false },
  merchant: { name:'商贾之子', tag:'打脸流', desc:'临江首富万家独子。用灵石砸开仙门，让修真者知道什么叫"有钱"也是实力。', startLoc:'loc_linjiang', startScene:'v1m_01', lingshi:500, gift:{lingshi_bao:1}, locked:false }
};

var SPIRIT_ROOTS = {
  jin:'金灵根', mu:'木灵根', shui:'水灵根', huo:'火灵根', tu:'土灵根',
  lei:'雷灵根(变异)', bing:'冰灵根(变异)', feng:'风灵根(变异)', an:'暗灵根(变异)'
};
var PHYSIQUES = {
  fan:'凡体', ling:'灵体', dao:'道体', mo:'魔体'
};
var PHYSIQUE_BONUS = {
  fan:{ desc:'平平无奇，稳扎稳打。' },
  ling:{ desc:'亲近灵气，修为获取 +10%。', xiweiMul:1.1 },
  dao:{ desc:'道心通明，悟性 +2，心境上限更高。', wuxing:2, xinjingMax:100 },
  mo:{ desc:'魔气亲和，正邪值 -10，狠辣路线加成。', zhengxie:-10, henla:1 }
};
var ROOT_BONUS = {
  jin:{ atk:1 }, mu:{ hp:15 }, shui:{ xinjing:5 }, huo:{ atk:2 }, tu:{ def:2 },
  lei:{ atk:3, spd:2, desc:'狂暴迅捷' }, bing:{ def:2, hp:10 }, feng:{ spd:4 }, an:{ atk:1, henlaHint:true }
};

var REL_THRESHOLDS = [
  { min:80, label:'生死之交' }, { min:60, label:'挚友' }, { min:30, label:'知己' },
  { min:10, label:'相识' }, { min:-9, label:'冷淡' }, { min:-30, label:'厌恶' }, { min:-999, label:'仇敌' }
];

/* ---------- 状态 ---------- */
function newState(profile) {
  var o = ORIGINS[profile.origin] || ORIGINS.noble;
  var ph = PHYSIQUE_BONUS[profile.physique] || {};
  var rt = ROOT_BONUS[profile.spiritRoot] || {};
  var items = {}; items.cangwu_jing = 1;
  for (var k in o.gift) items[k] = (items[k] || 0) + o.gift[k];
  var s = {
    version: 2,
    profile: profile,
    stats: {
      realmIdx: 0, xiwei: 0,
      wuxing: 5 + (ph.wuxing || 0) + (rt.wuxing || 0),
      xinjing: Math.min(50 + (rt.xinjing || 0) + (ph.xinjingMax ? 5 : 0), 100),
      shengwang: 0,
      zhengxie: (ph.zhengxie || 0),
      lingshi: o.lingshi, meili: 5,
      atkBonus: (rt.atk || 0), defBonus: (rt.def || 0), hpBonus: (rt.hp || 0), spdBonus: (rt.spd || 0)
    },
    temper: { xiayi: profile.temper.xiayi || 0, gongli: profile.temper.gongli || 0, henla: profile.temper.henla || 0 },
    physiqueBonus: ph,
    items: items,
    equip: { weapon: null, armor: null, accessory: null },
    skills: [], rel: {}, relStatus: {},
    flags: { origin: profile.origin, wulao_met: false },
    map: { unlocked: [o.startLoc], current: o.startLoc, visited: [o.startLoc] },
    log: [], scene: o.startScene, endingsSeen: [],
    seenBeasts: [], seenDanyao: [], seenLocations: [o.startLoc],
    settings: { soundOn: true, textSpeed: 'mid', dangerHints: true, showEffects: false },
    playSeconds: 0
  };
  return s;
}

/* ---------- 工具 ---------- */
function getScene(id) { return GD.scenes[id]; }
function hasItem(s, id, n) { return (s.items[id] || 0) >= (n || 1); }
function hasFlag(s, f) { return !!s.flags[f]; }
function itemDef(id) { return GD.items[id]; }
function beastDef(id) { return GD.beasts[id]; }
function charDef(id) { return GD.characters[id]; }
function skillDef(id) { return GD.skills[id]; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function condPass(s, cond) {
  if (!cond) return true;
  if (typeof cond === 'function') { try { return !!cond(s); } catch (e) { return false; } }
  if (typeof cond === 'string') return !!s.flags[cond];
  if (Array.isArray(cond)) return cond.every(function (c) { return condPass(s, c); });
  if (cond.flag) return !!s.flags[cond.flag] === (cond.val !== false);
  if (cond.item) return hasItem(s, cond.item, cond.n);
  if (cond.rel) return (s.rel[cond.rel] || 0) >= (cond.n || 1);
  if (cond.stat) return (s.stats[cond.stat] || 0) >= (cond.n || 1);
  if (cond.any) return cond.any.some(function (c) { return condPass(s, c); });
  return true;
}

function interp(s, text) {
  if (!text) return text;
  return String(text)
    .replace(/\{name\}/g, s.profile.name)
    .replace(/\{originName\}/g, (ORIGINS[s.profile.origin] || {}).name || '')
    .replace(/\{realm\}/g, realmName(s))
    .replace(/\{lingshi\}/g, s.stats.lingshi);
}

function realmName(s) { return REALMS[clamp(s.stats.realmIdx, 0, REALMS.length - 1)]; }
function realmProgress(s) {
  var idx = s.stats.realmIdx;
  var need = XIWEI_NEED[Math.min(idx, XIWEI_NEED.length - 1)];
  var have = s.stats.xiwei;
  return { have: have, need: need, pct: clamp(Math.round(have / need * 100), 0, 100) };
}

function gainXiwei(s, n) {
  var mul = 1;
  if (s.equip.accessory && itemDef(s.equip.accessory) && itemDef(s.equip.accessory).xiweiMul) mul *= itemDef(s.equip.accessory).xiweiMul;
  if (s.physiqueBonus && s.physiqueBonus.xiweiMul) mul *= s.physiqueBonus.xiweiMul;
  if (s.skills.indexOf('cangwu_yinqi') >= 0) mul *= 1.2;
  var v = Math.round(n * mul);
  s.stats.xiwei += v;
  return v;
}

function relStatus(s, id) {
  var v = s.rel[id] || 0;
  for (var i = 0; i < REL_THRESHOLDS.length; i++) {
    if (v >= REL_THRESHOLDS[i].min) return { label: REL_THRESHOLDS[i].label, v: v };
  }
  return { label: '仇敌', v: v };
}

function dominantTemper(s) {
  var t = s.temper, best = 'xiayi', bestV = t.xiayi;
  if (t.gongli > bestV) { best = 'gongli'; bestV = t.gongli; }
  if (t.henla > bestV) { best = 'henla'; bestV = t.henla; }
  return { axis: best, val: bestV, labels: { xiayi: '侠义', gongli: '功利', henla: '狠辣' } };
}

/* ---------- 效果结算 ---------- */
function applyEffects(s, fx) {
  var notes = [];
  if (!fx) return notes;
  if (fx.stats) for (var k in fx.stats) {
    var nk = fx.stats[k];
    if (k === 'xiwei' && nk > 0) { gainXiwei(s, nk); }
    else s.stats[k] = (s.stats[k] || 0) + nk;
    notes.push({ type: 'stat', k: k, v: nk });
  }
  if (fx.temper) for (var t in fx.temper) { s.temper[t] = (s.temper[t] || 0) + fx.temper[t]; notes.push({ type: 'temper', k: t, v: fx.temper[t] }); }
  if (fx.rel) for (var c in fx.rel) {
    s.rel[c] = (s.rel[c] || 0) + fx.rel[c];
    s.relStatus[c] = relStatus(s, c).label;
    notes.push({ type: 'rel', k: c, v: fx.rel[c] });
  }
  if (fx.items) {
    if (fx.items.add) for (var i in fx.items.add) {
      s.items[i] = (s.items[i] || 0) + fx.items.add[i];
      if (itemDef(i) && itemDef(i).type === 'dan') markSeen(s.seenDanyao, i);
      notes.push({ type: 'item', k: i, v: fx.items.add[i] });
    }
    if (fx.items.remove) for (var r in fx.items.remove) {
      s.items[r] = (s.items[r] || 0) - fx.items.remove[r];
      if (s.items[r] <= 0) delete s.items[r];
      notes.push({ type: 'item', k: r, v: -fx.items.remove[r] });
    }
  }
  if (fx.flags) for (var f in fx.flags) s.flags[f] = fx.flags[f];
  if (fx.equip) for (var e in fx.equip) { s.equip[e] = fx.equip[e]; notes.push({ type: 'equip', k: e, v: fx.equip[e] }); }
  if (fx.map) {
    if (fx.map.unlock) fx.map.unlock.forEach(function (l) {
      if (s.map.unlocked.indexOf(l) < 0) { s.map.unlocked.push(l); markSeen(s.seenLocations, l); notes.push({ type: 'map', k: l }); }
    });
    if (fx.map.current) {
      s.map.current = fx.map.current;
      if (s.map.visited.indexOf(fx.map.current) < 0) s.map.visited.push(fx.map.current);
      markSeen(s.seenLocations, fx.map.current);
    }
  }
  if (fx.skills) {
    if (fx.skills.add) fx.skills.add.forEach(function (sk) { if (s.skills.indexOf(sk) < 0) s.skills.push(sk); notes.push({ type: 'skill', k: sk }); });
  }
  if (fx.setRealm !== undefined) { s.stats.realmIdx = clamp(fx.setRealm, 0, REALMS.length - 1); s.stats.xiwei = 0; notes.push({ type: 'stat', k: '境界', v: '突破' }); }
  if (fx.beasts) fx.beasts.forEach(function (b) { markSeen(s.seenBeasts, b); notes.push({ type: 'beast', k: b }); });
  if (fx.goto) s._pendingGoto = fx.goto;
  s.stats.xinjing = clamp(s.stats.xinjing, 0, 100);
  s.stats.zhengxie = clamp(s.stats.zhengxie, -100, 100);
  s.stats.realmIdx = clamp(s.stats.realmIdx, 0, REALMS.length - 1);
  return notes;
}

function markSeen(arr, id) { if (arr.indexOf(id) < 0) arr.push(id); }

/* ---------- 战斗数值 ---------- */
function combatStats(s) {
  var rb = REALM_BONUS[clamp(s.stats.realmIdx, 0, REALM_BONUS.length - 1)];
  var atk = rb.atk + (s.stats.atkBonus || 0), def = rb.def + (s.stats.defBonus || 0);
  var hp = rb.hp + (s.stats.hpBonus || 0), spd = rb.spd + (s.stats.spdBonus || 0);
  ['weapon', 'armor', 'accessory'].forEach(function (sl) {
    var eid = s.equip[sl];
    if (eid && itemDef(eid) && itemDef(eid).equip) {
      var eq = itemDef(eid).equip;
      atk += eq.atk || 0; def += eq.def || 0; hp += eq.hp || 0; spd += eq.spd || 0;
    }
  });
  s.skills.forEach(function (sk) {
    var d = skillDef(sk); if (!d || !d.combat) return;
    atk += d.combat.atk || 0; def += d.combat.def || 0; hp += d.combat.hp || 0; spd += d.combat.spd || 0;
  });
  return { atk: Math.max(1, atk), def: Math.max(0, def), hp: Math.max(10, hp), spd: Math.max(1, spd) };
}

/* ---------- 场景流转 ---------- */
function enterScene(id) {
  var sc = getScene(id);
  if (!sc) return { error: '场景不存在: ' + id, sceneId: id };
  var s = engine.state;
  s.scene = id;
  s.log.push({ scene: id, t: Date.now() });
  if (sc.location) {
    s.map.current = sc.location;
    markSeen(s.seenLocations, sc.location);
    // 探索即解锁：到过的地点在地图上永久点亮（迷雾随剧情散开，支线才可达）
    if (s.map.unlocked.indexOf(sc.location) < 0) s.map.unlocked.push(sc.location);
  }
  var text = sc.text || '';
  if (sc.onEnter) {
    if (typeof sc.onEnter === 'function') {
      var r = sc.onEnter(s);
      if (r && r.text) text += '\n\n' + r.text;
    } else {
      if (sc.onEnter.append) text += '\n\n' + sc.onEnter.append;
      if (sc.onEnter.effects) applyEffects(s, sc.onEnter.effects);
      if (sc.onEnter.flags) for (var f in sc.onEnter.flags) s.flags[f] = sc.onEnter.flags[f];
    }
  }
  // 变体文本：根据此前选择/积累，追加不同的剧情版本（选择真正影响剧情的关键机制）
  if (sc.textVariants) for (var vi = 0; vi < sc.textVariants.length; vi++) {
    var v = sc.textVariants[vi];
    if (condPass(s, v.cond)) text += '\n\n' + interp(s, v.text);
  }
  text = interp(s, text);
  var choices = (sc.choices || []).filter(function (c) { return condPass(s, c.cond); }).map(function (c) {
    return {
      text: interp(s, c.text), hint: c.hint, effects: c.effects, goto: c.goto,
      ending: c.ending, kind: c.kind, consume: c.consume, danger: c.danger
    };
  });
  var out = {
    scene: sc, title: sc.title, chapter: sc.chapter, location: sc.location, text: text,
    choices: choices, combat: sc.combat || null, ending: sc.ending || null,
    npc: sc.npc || null
  };
  engine.resolve = out;
  return out;
}

function choose(idx) {
  var r = engine.resolve;
  if (!r || !r.choices[idx]) return null;
  var c = r.choices[idx];
  var notes = applyEffects(engine.state, c.effects);
  if (c.kind === 'mapreturn') return { notes: notes, resolve: r, mapreturn: true, choice: c };
  if (c.goto) { var nr = enterScene(c.goto); engine.resolve = nr; return { notes: notes, resolve: nr, choice: c }; }
  if (c.ending) { recordEnding(c.ending); return { notes: notes, resolve: r, ending: c.ending, choice: c }; }
  return { notes: notes, resolve: r, choice: c };
}

function recordEnding(kind) {
  var s = engine.state;
  if (s.endingsSeen.indexOf(kind) < 0) s.endingsSeen.push(kind);
  s.flags['ending_' + kind] = true;
}

/* ---------- 突破 ---------- */
function tryBreakthrough(s) {
  var idx = s.stats.realmIdx;
  if (idx >= REALMS.length - 1) return { ok: false, msg: '已至巅峰' };
  if (s.stats.xiwei < XIWEI_NEED[idx]) return { ok: false, msg: '修为不足' };
  var isBig = idx === 8 || idx === 11 || idx === 14 || idx === 17 || idx === 20;
  var chance = 0.75;
  if (s.flags.pozhan_jp) chance += 0.3;
  else if (s.flags.pozhang || hasItem(s, 'pozhan_dan')) chance += 0.15;
  if (s.stats.xinjing >= 70) chance += 0.1;
  else if (s.stats.xinjing <= 25) chance -= 0.2;
  if (chance >= 1) { s.stats.realmIdx++; s.stats.xiwei = 0; return { ok: true, big: isBig, crit: true }; }
  if (Math.random() < chance) {
    s.stats.realmIdx++; s.stats.xiwei = 0;
    return { ok: true, big: isBig };
  }
  s.stats.xiwei = Math.floor(s.stats.xiwei * 0.5);
  s.stats.xinjing = clamp(s.stats.xinjing - 10, 0, 100);
  return { ok: false, big: isBig, failed: true };
}

/* ---------- 引擎门面 ---------- */
var engine = {
  REALMS: REALMS, ORIGINS: ORIGINS, SPIRIT_ROOTS: SPIRIT_ROOTS, PHYSIQUES: PHYSIQUES,
  newState: newState, enterScene: enterScene, choose: choose, condPass: condPass,
  applyEffects: applyEffects, gainXiwei: gainXiwei, relStatus: relStatus,
  dominantTemper: dominantTemper, combatStats: combatStats, realmName: realmName,
  realmProgress: realmProgress, tryBreakthrough: tryBreakthrough, recordEnding: recordEnding,
  getScene: getScene, itemDef: itemDef, beastDef: beastDef, charDef: charDef, skillDef: skillDef,
  hasItem: hasItem, hasFlag: hasFlag, interp: interp,
  state: null, resolve: null
};
engine.newGame = function (profile) {
  engine.state = newState(profile);
  engine.resolve = enterScene(engine.state.scene);
  return engine.resolve;
};
g.GameEngine = engine;
g.GameData = GD;

/* Node 测试入口 */
if (typeof module !== 'undefined' && module.exports) module.exports = { engine: engine, GD: GD };
})(typeof window !== 'undefined' ? window : globalThis);
