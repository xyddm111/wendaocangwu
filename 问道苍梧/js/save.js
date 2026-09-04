/* ============================================================
   问道苍梧 · 存档系统（localStorage + 导出/导入存档码）
   ============================================================ */
(function (g) {
'use strict';
var PREFIX = 'wdcw_v2_';
var SLOT_KEYS = ['auto', 's0', 's1', 's2'];
var SLOT_NAMES = { auto: '自动存档', s0: '存档位一', s1: '存档位二', s2: '存档位三' };

function storage() {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch (e) {}
  var mem = {};
  return { getItem: function (k) { return mem[k] || null; }, setItem: function (k, v) { mem[k] = String(v); }, removeItem: function (k) { delete mem[k]; } };
}
var db = storage();

function metaOf(state) {
  var sc = (g.GameEngine && g.GameEngine.getScene(state.scene)) || {};
  return {
    name: (state.profile && state.profile.name) || '无名',
    sceneTitle: sc.title || state.scene,
    realm: g.GameEngine ? g.GameEngine.realmName(state) : '',
    playSeconds: state.playSeconds || 0,
    updatedAt: Date.now()
  };
}

function saveState(state, slot) {
  var key = PREFIX + slot;
  var pack = { meta: metaOf(state), state: state };
  try { db.setItem(key, JSON.stringify(pack)); return true; } catch (e) { return false; }
}

function loadState(slot) {
  var raw = db.getItem(PREFIX + slot);
  if (!raw) return null;
  try {
    var pack = JSON.parse(raw);
    if (!pack.state) return null;
    return migrate(pack.state);
  } catch (e) { return null; }
}

function migrate(state) {
  // 版本迁移钩子：后续扩展卷时在此做旧存档兼容（补默认字段即可）
  if (!state.settings) state.settings = { soundOn: true, textSpeed: 'mid', dangerHints: true, showEffects: false };
  if (!state.seenBeasts) state.seenBeasts = [];
  if (!state.seenDanyao) state.seenDanyao = [];
  if (!state.seenLocations) state.seenLocations = [];
  if (!state.endingsSeen) state.endingsSeen = [];
  state.version = 2;
  return state;
}

function deleteSlot(slot) { db.removeItem(PREFIX + slot); }

function listSlots() {
  return SLOT_KEYS.map(function (k) {
    var raw = db.getItem(PREFIX + k);
    var info = { slot: k, name: SLOT_NAMES[k], exists: !!raw, meta: null };
    if (raw) { try { info.meta = JSON.parse(raw).meta; } catch (e) {} }
    return info;
  });
}

function hasAuto() { return !!db.getItem(PREFIX + 'auto'); }

function autosave(state) {
  if (state) saveState(state, 'auto');
}

/* ---------- 导出 / 导入（跨设备续玩） ---------- */
function exportCode(state) {
  try {
    var json = JSON.stringify(state);
    var b64 = btoa(unescape(encodeURIComponent(json)));
    return 'WDCW2.' + b64;
  } catch (e) { return ''; }
}

function importCode(code) {
  if (!code || code.indexOf('WDCW2.') !== 0) return { ok: false, msg: '存档码格式不正确（应以 WDCW2. 开头）' };
  try {
    var b64 = code.slice(6);
    var json = decodeURIComponent(escape(atob(b64)));
    var state = JSON.parse(json);
    if (!state.profile || !state.scene) return { ok: false, msg: '存档内容不完整' };
    return { ok: true, state: migrate(state) };
  } catch (e) {
    return { ok: false, msg: '存档码解析失败：' + e.message };
  }
}

g.GameSave = {
  saveState: saveState, loadState: loadState, deleteSlot: deleteSlot,
  listSlots: listSlots, hasAuto: hasAuto, autosave: autosave,
  exportCode: exportCode, importCode: importCode, SLOT_NAMES: SLOT_NAMES
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameSave;
})(typeof window !== 'undefined' ? window : globalThis);
