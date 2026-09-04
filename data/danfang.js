/* ============================================================
   问道苍梧 · 丹方（炼丹系统）
   ============================================================ */
(function (g) {
'use strict';
g.GameData = g.GameData || {};
g.GameData.danfang = {
  juqi:   { name:'聚气丹（一品）', skill:'danjing', rate:0.8, rateDesc:'一品丹师', mats:[{id:'bailing_cao',n:2},{id:'shouhe1',n:1}], out:'juqi_dan', outJp:'juqi_dan_jp' },
  huichun:{ name:'回春丹（二品）', skill:'danjing', rate:0.7, rateDesc:'二品丹师', mats:[{id:'bailing_cao',n:2},{id:'shouhe2',n:1}], out:'huichun_dan' },
  ningqi: { name:'凝气丹（二品）', skill:'danjing', rate:0.65, rateDesc:'二品丹师', mats:[{id:'bailing_cao',n:3},{id:'shouhe2',n:2}], out:'ningqi_dan' },
  guiyuan:{ name:'归元丹（三品）', skill:'danjing', rate:0.55, rateDesc:'三品丹师', mats:[{id:'lingzhi',n:1},{id:'shouhe2',n:2}], out:'guiyuan_dan' },
  yanghun:{ name:'养魂丹（三品）', skill:'danjing', rate:0.5, rateDesc:'三品丹师', mats:[{id:'lingzhi',n:2},{id:'shouhe3',n:1}], out:'yanghun_dan' },
  pozhan: { name:'破障丹（三品）', skill:'danjing', rate:0.45, rateDesc:'三品丹师', mats:[{id:'lingzhi',n:2},{id:'shouhe3',n:2}], out:'pozhan_dan', outJp:'pozhan_dan_jp' }
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.danfang;
})(typeof window !== 'undefined' ? window : globalThis);
