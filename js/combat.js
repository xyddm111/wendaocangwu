/* ============================================================
   问道苍梧 · 多回合策略战斗
   ============================================================ */
(function (g) {
'use strict';
var E = g.GameEngine;

var combat = {
  active: false, sc: null, enemy: null, pHp: 0, eHp: 0, round: 0, log: [], usedBottom: false, ended: false
};

function start(scene) {
  var def = scene.combat;
  var enemy = typeof def.enemy === 'string' ? E.beastDef(def.enemy) : def.enemy;
  if (!enemy) { E.enterScene(def.winGoto); return; }
  var ps = E.combatStats(E.state);
  combat.active = true; combat.sc = scene; combat.enemy = enemy;
  combat.pHp = ps.hp; combat.eHp = enemy.hp;
  combat.round = 0; combat.log = []; combat.usedBottom = false; combat.ended = false;
  combat.ps = ps;
  if (def.intro) combat.log.push(def.intro);
  combat.log.push('遭遇【' + enemy.name + '】（' + (enemy.tier || '') + '）');
  if (def.beast) E.applyEffects(E.state, { beasts: [def.enemy] });
  render();
}

function enemyAtk() {
  var def = combat.enemy;
  var dmg = Math.max(1, def.atk - Math.floor(combat.ps.def * 0.5) + (Math.random() * 3 - 1));
  combat.pHp -= dmg;
  combat.log.push('【' + def.name + '】向你袭来，你受 <span class="hit">' + dmg + '</span> 点伤（气血 ' + Math.max(0, combat.pHp) + '/' + combat.ps.hp + '）');
}

function playerHit(mult, extra) {
  var dmg = Math.max(1, Math.round(combat.ps.atk * (mult || 1)) - Math.floor(combat.enemy.def * 0.5) + (Math.random() * 3 - 1) + (extra || 0));
  var crit = Math.random() < (0.05 + combat.ps.spd * 0.004);
  if (crit) dmg = Math.round(dmg * 1.8);
  combat.eHp -= dmg;
  combat.log.push((crit ? '<b>暴击！</b>' : '你') + '挥出攻击，命中【' + combat.enemy.name + '】 <span class="hit">' + dmg + '</span> 点（' + Math.max(0, combat.eHp) + '/' + combat.enemy.hp + '）');
}

function act(kind) {
  if (!combat.active || combat.ended) return;
  var s = E.state;
  combat.round++;
  var def = combat.sc.combat;

  switch (kind) {
    case 'attack': playerHit(1.15); break;
    case 'fengmang': playerHit(1.45); combat.log.push('你孤注一掷，全力出手——但门户大开！'); break;
    case 'guard': combat.log.push('你凝神防守，稳住阵脚。'); combat.pHp = Math.min(combat.ps.hp, combat.pHp + 4); break;
    case 'yinshen': playerHit(0.75); combat.log.push('你且战且走，伺机而动。'); break;
    case 'huoyan_ling':
      if (E.hasItem(s, 'huoyan_ling')) { E.applyEffects(s, { items: { remove: { huoyan_ling: 1 } } }); playerHit(2.2, 6); combat.log.push('你掷出火灵符，烈焰轰然炸开！'); }
      else return;
      break;
    case 'ding_shen':
      if (E.hasItem(s, 'dingshen_fu')) { E.applyEffects(s, { items: { remove: { dingshen_fu: 1 } } }); combat.log.push('你祭出定身符，【' + combat.enemy.name + '】被定在原地，动弹不得！'); playerHit(1.6); return; }
      else return;
      break;
    case 'heal':
      if (E.hasItem(s, 'huichun_dan')) { E.applyEffects(s, { items: { remove: { huichun_dan: 1 } } }); var h = 50; combat.pHp = Math.min(combat.ps.hp, combat.pHp + h); combat.log.push('你吞下回春丹，气血恢复 <span class="heal">+' + h + '</span>（' + combat.pHp + '/' + combat.ps.hp + '）'); }
      else if (E.hasItem(s, 'zhixue_san')) { E.applyEffects(s, { items: { remove: { zhixue_san: 1 } } }); var h2 = 20; combat.pHp = Math.min(combat.ps.hp, combat.pHp + h2); combat.log.push('你敷上止血散，气血恢复 <span class="heal">+' + h2 + '</span>'); }
      else return;
      break;
    case 'flee':
      if (E.hasItem(s, 'mizong_fu')) { E.applyEffects(s, { items: { remove: { mizong_fu: 1 } } }); combat.log.push('你捏碎迷踪符，身形化作一缕青烟遁走！'); return end(false, 'flee'); }
      combat.log.push('你试图脱身——却被缠住，动弹不得！');
      break;
  }

  // 敌人反击
  if (combat.eHp > 0) enemyAtk();

  // 胜负判定
  if (combat.eHp <= 0) return end(true);
  if (combat.pHp <= 0) return defeat();
  if (combat.round >= (combat.sc.combat.maxRounds || 6)) {
    combat.log.push('鏖战已久，双方体力不支，各自退开……');
    return end(false, 'stale');
  }
  render();
}

function defeat() {
  var def = combat.sc.combat;
  if (!combat.usedBottom) {
    combat.usedBottom = true;
    combat.log.push('—— 危急关头，你怀中的苍梧镜骤然亮起！');
    combat.log.push('梧老：<span style="color:#4fd1a0">「啧，小子，命都快没了还在逞强。老夫替你挡这一下——下不为例！」</span>');
    combat.pHp = Math.floor(combat.ps.hp * 0.4);
    combat.eHp = Math.max(1, combat.eHp - Math.floor(combat.enemy.hp * 0.2));
    E.applyEffects(E.state, { stats: { xiwei: -30 }, flags: { used_bottom_1: true } });
    combat.log.push('镜光护体！你捡回一条命，但修为略有折损（-30 修为）。');
    render();
    return;
  }
  return end(false, 'defeat');
}

function end(win, reason) {
  if (combat.ended) return;
  combat.ended = true;
  var def = combat.sc.combat;
  var notes = [];
  if (win) {
    g.GameAudio.play('win');
    combat.log.push('—— 你击败了【' + combat.enemy.name + '】！');
    if (def.winText) combat.log.push(def.winText);
    if (def.drops) {
      E.applyEffects(E.state, { items: { add: def.drops } });
      notes.push({ type: 'item', k: Object.keys(def.drops)[0], v: def.drops[Object.keys(def.drops)[0]] });
    }
    E.applyEffects(E.state, { stats: { shengwang: (def.shengwang || 2) } });
    var beatFlag = 'beat_' + (typeof def.enemy === 'string' ? def.enemy : combat.enemy.name);
    var beatFx = { flags: {} };
    beatFx.flags[beatFlag] = true;
    E.applyEffects(E.state, beatFx);
  } else {
    g.GameAudio.play('lose');
    combat.log.push('—— ' + (reason === 'flee' ? '你全身而退。' : reason === 'stale' ? '双方暂且罢手。' : '你战败了……'));
  }
  render();
  setTimeout(function () {
    var goto = win ? def.winGoto : (reason === 'flee' ? (def.fleeGoto || def.loseGoto) : def.loseGoto);
    if (!goto) { if (g.GameUI) g.GameUI.closeCombat(); return; }
    var r = E.enterScene(goto);
    if (g.GameUI) { g.GameUI.closeCombat(); g.GameUI.render(r, notes); }
  }, win ? 900 : 1400);
  return win;
}

function options() {
  var s = E.state;
  var opts = [
    { kind: 'attack', label: '⚔ 强攻', desc: '全力进攻（1.15 倍伤害）' },
    { kind: 'fengmang', label: '🔥 锋芒毕露', desc: '孤注一掷（1.45 倍伤害，不设防）' },
    { kind: 'guard', label: '🛡 凝神防守', desc: '稳住阵脚，回复少量气血' },
    { kind: 'yinshen', label: '🌀 游走缠斗', desc: '稳中求进（0.75 倍伤害）' }
  ];
  if (E.hasItem(s, 'huichun_dan') || E.hasItem(s, 'zhixue_san')) opts.push({ kind: 'heal', label: '💊 服丹疗伤', desc: '服用回春丹/止血散恢复气血' });
  if (E.hasItem(s, 'huoyan_ling')) opts.push({ kind: 'huoyan_ling', label: '🔥 火灵符', desc: '掷出火灵符，重创敌人' });
  if (E.hasItem(s, 'dingshen_fu')) opts.push({ kind: 'ding_shen', label: '✋ 定身符', desc: '定住敌人一瞬，追加攻击' });
  if (E.hasItem(s, 'mizong_fu')) opts.push({ kind: 'flee', label: '💨 遁走', desc: '捏碎迷踪符脱身' });
  return opts;
}

function render() {
  if (!g.GameUI) return;
  g.GameUI.renderCombat(combat);
}

g.GameCombat = { start: start, options: options, act: act, get state() { return combat; } };
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameCombat;
})(typeof window !== 'undefined' ? window : globalThis);
