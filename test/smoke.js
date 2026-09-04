/* 问道苍梧 · 引擎冒烟测试（Node 环境，无 DOM） */
'use strict';
require('../data/items.js');
require('../data/danfang.js');
require('../data/skills.js');
require('../data/beasts.js');
require('../data/characters.js');
require('../data/avatars.js');
require('../data/map.js');
require('../data/vol1.js');
require('../data/vol2x.js');
require('../data/endings.js');
require('../js/engine.js');
require('../js/save.js');
require('../js/audio.js');
require('../js/combat.js');

var E = globalThis.GameEngine;
var SAVE = globalThis.GameSave;
var GC = globalThis.GameCombat;
var assert = function (cond, msg) { if (!cond) { console.error('✗ FAIL: ' + msg); process.exit(1); } console.log('✓ ' + msg); };
function fight(maxTurns) {
  GC.start(E.resolve);
  var guard = 0;
  while (!GC.state.ended && guard++ < (maxTurns || 20)) GC.act('attack');
  assert(GC.state.ended === true, '战斗 ' + (maxTurns || 20) + ' 回合内结束');
}

/* ===== 四种出身开局 ===== */
['noble', 'poor', 'demon', 'merchant'].forEach(function (origin) {
  var p = { name: '测试', origin: origin, spiritRoot: 'lei', physique: 'fan', temper: { xiayi: 2, gongli: 2, henla: 2 } };
  var rr = E.newGame(p);
  assert(rr.scene.id === E.ORIGINS[origin].startScene, '出身 ' + origin + ' 开局场景正确：' + rr.scene.id);
  assert(rr.choices.length >= 3, '出身 ' + origin + ' 开局有 3 个选项');
});

/* ===== 世家嫡子全流程（卷1 → 卷2） ===== */
var profile = { name: '沈青玄', origin: 'noble', spiritRoot: 'lei', physique: 'fan', temper: { xiayi: 2, gongli: 2, henla: 2 } };
var r = E.newGame(profile);
assert(r.scene.id === 'v1n_01', '初始场景 v1n_01');
assert(E.state.items.cangwu_jing === 1, '苍梧镜在身');

// 第一幕：质问退婚 → 选择后果场景 → 古镜
r = E.choose(1).resolve;
assert(r.scene.id === 'v1n_01a', '质问退婚 → 后果场景');
assert(E.state.temper.xiayi === 3 && E.state.flags.question_public, '侠义 +1 且 flag 记录');
r = E.choose(0).resolve;
assert(r.scene.id === 'v1n_02', '后果 → 古镜惊鸣');
// 第二幕：试探梧老
r = E.choose(1).resolve;
assert(r.scene.id === 'v1n_03', '进入青州古道');
assert(E.state.skills.indexOf('cangwu_yinqi') >= 0, '习得苍梧引气诀');
// 第三幕：绕道（真实分支）
r = E.choose(2).resolve;
assert(r.scene.id === 'v1n_04', '绕道直达青云会武');
assert(E.state.rel.xinglie === -8, '未帮邢烈，好感为负');
// 会武：宣战
r = E.choose(2).resolve;
assert(r.scene.id === 'v1n_04b', '会武余波');
r = E.choose(0).resolve;
assert(r.scene.id === 'v1n_05', '进入择师');
// 择师：剑道 → 拜师后果
r = E.choose(0).resolve;
assert(r.scene.id === 'v1n_05a', '择师 → 拜师后果');
assert(E.state.skills.indexOf('jian_dian') >= 0, '习得青云剑典');
r = E.choose(0).resolve;
assert(r.scene.id === 'v1n_07', '进入入门第一课');
// 幕四~五（新增场景全流程）
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_07b', '师父第一课');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_07c', '师父第二课');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_08', '内门排挤');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_08a', '风波之后(忍)');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_08c', '顾清霜初遇');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_08d', '清霜剑指');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_08e', '桂花糕');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_09', '忍一时 → 修炼');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_09b', '梧老夜课');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_09c', '上古秘闻');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_09d', '雷灵初成');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_09e', '心魔微兆');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10', '坊市风云');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10a', '坊市风波(云裳)');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10b', '温如玉棋局');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10c', '白芷心事');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10d', '云裳藏宝阁');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_10e', '坊市夜市');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_11', '宗门任务');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_11b', '猎狼战斗场景');
fight(20);
r = E.enterScene('v1n_11d'); assert(r.scene.id === 'v1n_11d', '篝火夜酒');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_12', '情谊幕');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_12a', '护她(挺身)');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_12b', '平安结');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_12c', '秘境前夜');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_13', '秘境召集');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_13b', '秘境入口');
// 幕八 秘境（含新增拾遗幕）
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_14', '雾林');
fight(20);
r = E.enterScene('v1n_14b'); assert(r.scene.id === 'v1n_14b', '雾林拾遗');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_15', '灵药谷');
r = E.choose(1).resolve; assert(r.scene.id === 'v1n_15d', '秘境夜营');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_16', '放弃灵药 → 暗算');
r = E.choose(1).resolve; assert(r.scene.id === 'v1n_16c', '引向龙吟 → 取珠');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_16d', '前人手记');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_17', '青蛟王');
fight(40);
// 智取灵芝分支：持火灵符 → 智取展开 → 得灵芝 → 夜营
E.state.items.huoyan_ling = 1;
r = E.enterScene('v1n_15');
r = E.choose(1).resolve; assert(r.scene.id === 'v1n_15c', '智取灵芝展开');
assert((E.state.items.lingzhi || 0) >= 1, '智取获得百年灵芝');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_15d', '智取 → 秘境夜营');
r = E.enterScene('v1n_17b'); assert(r.scene.id === 'v1n_17b', '灵池遗泽');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_18', '心魔·筑基');
r = E.choose(0).resolve;
assert(E.state.stats.realmIdx === 9, '直面心魔 → 筑基初期');
assert(r.scene.id === 'v1n_19', '秘境归来');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_19b', '梧老夜谈');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_19c', '筑基之夜');
r = E.choose(0).resolve; assert(r.scene.id === 'v1n_20', '风云初定');
// 阶段结局
r = E.choose(0).resolve;
assert(r.scene.id === 'v1e_stay', '阶段结局·留宗');
assert(r.ending === 'vol1_stay', '阶段结局标记 vol1_stay');
// 卷2 全流程
r = E.choose(0).resolve; assert(r.scene.id === 'v2_01', '踏入卷二');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_01b', '大比前夜');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_01c', '大比清晨');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_02', '大比抽签');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_02b', '第一擂');
fight(20);
r = E.enterScene('v2_02c'); assert(r.scene.id === 'v2_02c', '大比间隙');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_03', '陈玄之战');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_03b', '控心之战');
fight(20);
r = E.enterScene('v2_03c'); assert(r.scene.id === 'v2_03c', '控心丹源');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_03d', '禁地夜探');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_04', '月下之约');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_04b', '月下场景');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_05', '暗流');
assert(r.ending === 'vol2_hook', '卷二章末钩子');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_05b', '云裳来信');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_06', '边陲惨状');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_06b', '孤儿');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_07', '月下尾行');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_07b', '铁证');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_07c', '夜探慕容家');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_08', '东荒猎妖');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_08b', '猎豹');
fight(20);
r = E.enterScene('v2_08c'); assert(r.scene.id === 'v2_08c', '灵狐认主');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_08e', '归途火狮');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_08f', '狮鬃火');
fight(20);
r = E.enterScene('v2_08d'); assert(r.scene.id === 'v2_08d', '白九日常');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_09', '身世之影');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_09c', '梧老深谈');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_09d', '白九寻图');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_09e', '归家');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_10d', '决赛前夜');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_10', '决赛·劫场');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_10b', '魔刀');
fight(20);
r = E.enterScene('v2_10c'); assert(r.scene.id === 'v2_10c', '魔刀少年');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_11', '师父之伤');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_11b', '黑莲拦路');
fight(20);
r = E.enterScene('v2_11c'); assert(r.scene.id === 'v2_11c', '师父呓语');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_12', '绝境金丹');
r = E.choose(0).resolve;
assert(E.state.stats.realmIdx === 12, '道心之问 → 金丹初期');
assert(r.scene.id === 'v2_13', '月下之约二');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_13b', '定情');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_13c', '定情翌日');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_13d', '如玉之信');
r = E.choose(0).resolve; assert(r.scene.id === 'v2_14', '风云落幕');
r = E.choose(0).resolve; assert(r.scene.id === 'v2e_restore', '卷2结局·重整旗鼓');
assert(r.ending === 'vol2_restore', '卷2结局标记');
r = E.choose(0).resolve; assert(r.scene.id === 'v3_teaser', '卷3预告');
assert(r.ending === 'vol3_teaser', '卷3预告标记');
var hook = globalThis.GameData.endings.vol2_hook.render(E.state);
assert(hook.indexOf('沈青玄') >= 0, '卷2结局动态包含主角名');

/* ===== 支线场景 ===== */
['v1s_trader','v1s_pick','v1s_shilei','v1s_canteen','v1s_money','v1s_zui','v1s_zhang','v1s_beast','v1s_ban','v1s_auction','v1s_library'].forEach(function (sid) {
  var sr = E.enterScene(sid);
  assert(!!sr.scene, '支线场景存在：' + sid);
  assert(sr.choices.length >= 1, '支线 ' + sid + ' 有选项');
});
var sr = E.enterScene('v1s_trader');
sr = E.choose(2);
assert(sr.resolve.scene.id === 'v1s_trader_d', '绕道 → 无奖励场景');
sr = E.choose(0);
assert(sr.mapreturn === true, '支线结束 → 返回地图');
assert(E.state.flags.side_trader_done === true, '支线完成标记已记录');
var sr2 = E.enterScene('v1s_money');
sr2 = E.choose(2);
assert(sr2.resolve.scene.id === 'v1s_money_info', '买秘境消息 → 情报场景');
assert(E.state.flags.info_mijing === true, '秘境消息 flag 已记录');
var pc = E.enterScene('v1n_16c');
assert(pc.scene.id === 'v1n_16c', '取珠场景');
pc = E.choose(0).resolve;
assert(pc.scene.id === 'v1n_16d', '前人手记');
pc = E.choose(0).resolve;
assert(pc.scene.id === 'v1n_17', '取珠 → 青蛟王');

/* ===== 战斗数值与突破 ===== */
E.state = E.newState(profile);
E.enterScene('v1n_03b');
GC.start(E.resolve);
assert(GC.state.enemy.name === '山匪头子', '自定义敌人对象可用');
fight(20);
// 存档 / 读档 / 导出导入
SAVE.saveState(E.state, 's0');
var loaded = SAVE.loadState('s0');
assert(loaded && loaded.scene === E.state.scene, '存档/读档一致');
var code = SAVE.exportCode(E.state);
assert(code.indexOf('WDCW2.') === 0, '导出码格式正确');
var imp = SAVE.importCode(code);
assert(imp.ok && imp.state.scene === E.state.scene, '导入码还原状态');
assert(!SAVE.importCode('xxx').ok, '非法码被拒绝');
// 深度往返：中文名 + 卷二中途复杂状态 + 特殊字符名
E.newGame({ name: '张小凡', origin: 'noble', spiritRoot: 'lei', physique: 'fan', temper: { xiayi: 3, gongli: 1, henla: 2 } });
E.state.flags.wulao_sleep = true; E.state.flags.love_xiaoman = true;
E.state.stats.realmIdx = 12; E.state.stats.lingshi = 9999;
E.state.rel.xiaoman = 85; E.state.rel.murong_xue = -12;
E.state.items.tanghulu = 5;
var c2 = SAVE.exportCode(E.state); var i2 = SAVE.importCode(c2);
assert(i2.ok && i2.state.flags.wulao_sleep && i2.state.rel.xiaoman === 85 && i2.state.items.tanghulu === 5, '中文名/中期存档往返完整');
E.newGame({ name: '测试\'\"<>', origin: 'merchant', spiritRoot: 'huo', physique: 'dao', temper: { xiayi: 2, gongli: 2, henla: 2 } });
assert(SAVE.importCode(SAVE.exportCode(E.state)).state.profile.name === '测试\'\"<>', '特殊字符名往返 OK');
// 突破系统（固定随机数）
E.state.stats.xiwei = 9999;
E.state.stats.xinjing = 80;
var origRandom = Math.random;
Math.random = function () { return 0; };
var br = E.tryBreakthrough(E.state);
Math.random = origRandom;
assert(br.ok === true && E.state.stats.realmIdx === 1, '修为足够时突破成功 → 炼气二层');

console.log('\n=== 全部冒烟测试通过 ===');
