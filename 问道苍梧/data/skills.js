/* ============================================================
   问道苍梧 · 功法库（凡/灵/玄/地/天/仙）
   ============================================================ */
(function (g) {
'use strict';
g.GameData = g.GameData || {};
g.GameData.skills = {
  cangwu_yinqi:   { name:'苍梧引气诀', tier:'灵品功法', desc:'梧老亲授的引气法门，以雷为媒，唤醒沉睡的上古灵根。修炼速度提升（修为获取 ×1.2）。', combat:{ atk:3 } },
  jian_dian:      { name:'青云剑典', tier:'地品功法', desc:'玄清宗剑道镇宗功法，剑势堂皇，一往无前。', combat:{ atk:8, hp:20 } },
  danjing:        { name:'丹经要略', tier:'灵品功法', desc:'丹道入门总纲，通晓百草药性，可炼制一至三品丹药。' },
  fulu:           { name:'太清符箓', tier:'地品功法', desc:'符道正宗，一笔一画皆是天地法则。', combat:{ atk:4, spd:6 } },
  tixiu:          { name:'淬体真诀', tier:'地品功法', desc:'体修无上法门，以身为炉，肉身成圣。', combat:{ def:8, hp:60 } },
  xuanlei_jiubian:{ name:'玄雷九变', tier:'天品功法', desc:'上古雷法，传闻修至九变可引天雷淬体。（隐藏·雷灵根限定）', combat:{ atk:15, spd:10 }, hidden:true }
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.skills;
})(typeof window !== 'undefined' ? window : globalThis);
