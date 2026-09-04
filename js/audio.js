/* ============================================================
   问道苍梧 · 轻量音效（WebAudio 合成，无外部素材）
   ============================================================ */
(function (g) {
'use strict';
var ctx = null, master = null, lastType = 0;

function ensure() {
  if (ctx) return true;
  try {
    var AC = g.AudioContext || g.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    return true;
  } catch (e) { return false; }
}

function soundOn() {
  try {
    if (g.GameEngine && g.GameEngine.state && g.GameEngine.state.settings) return g.GameEngine.state.settings.soundOn;
  } catch (e) {}
  return true;
}

function tone(freq, dur, type, vol, delay) {
  if (!ensure() || !soundOn()) return;
  var t0 = ctx.currentTime + (delay || 0);
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain); gain.connect(master);
  osc.start(t0); osc.stop(t0 + dur + 0.05);
}

function sweep(f0, f1, dur, type, vol) {
  if (!ensure() || !soundOn()) return;
  var t0 = ctx.currentTime;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(f0, t0);
  osc.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain); gain.connect(master);
  osc.start(t0); osc.stop(t0 + dur + 0.05);
}

var SFX = {
  click: function () { tone(660, 0.06, 'triangle', 0.08); },
  type: function () {
    var now = Date.now();
    if (now - lastType < 70) return;
    lastType = now;
    tone(320 + Math.random() * 120, 0.02, 'sine', 0.03);
  },
  hit: function () { sweep(300, 90, 0.12, 'sawtooth', 0.14); },
  hurt: function () { sweep(200, 70, 0.16, 'square', 0.1); },
  win: function () { tone(523, 0.12, 'triangle', 0.12); setTimeout(function () { tone(784, 0.2, 'triangle', 0.12); }, 110); },
  lose: function () { sweep(300, 120, 0.3, 'sawtooth', 0.1); },
  break: function () { tone(392, 0.1, 'triangle', 0.12); setTimeout(function () { tone(523, 0.1, 'triangle', 0.12); }, 90); setTimeout(function () { tone(659, 0.18, 'triangle', 0.14); }, 180); },
  fog: function () { sweep(500, 900, 0.4, 'sine', 0.06); },
  gift: function () { tone(880, 0.08, 'sine', 0.1); setTimeout(function () { tone(1174, 0.14, 'sine', 0.1); }, 80); },
  end: function () { tone(392, 0.16, 'sine', 0.12); setTimeout(function () { tone(330, 0.2, 'sine', 0.12); }, 150); setTimeout(function () { tone(262, 0.4, 'sine', 0.12); }, 320); },
  item: function () { tone(880, 0.06, 'triangle', 0.09); }
};

function play(name) {
  if (!soundOn()) return;
  if (!ensure()) return;
  if (SFX[name]) SFX[name]();
  else tone(500, 0.06, 'sine', 0.08);
}

/* 首次用户手势时解锁 AudioContext */
function unlock() { if (ensure() && ctx.state === 'suspended') ctx.resume(); }

g.GameAudio = { play: play, unlock: unlock, tone: tone, sweep: sweep };
if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', unlock, { once: true });
  document.addEventListener('pointerdown', unlock, { once: true });
}
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameAudio;
})(typeof window !== 'undefined' ? window : globalThis);
