/* ============================================================
   问道苍梧 · 地图数据（五域 + 势力/家族/秘境）
   ============================================================ */
(function (g) {
'use strict';
g.GameData = g.GameData || {};
g.GameData.map = {
  regions: [
    { id:'qingzhou',  name:'青州', desc:'山明水秀，宗门林立，主角家乡所在。', x:52, y:60, color:'rgba(63,111,90,.30)' },
    { id:'zhongzhou', name:'中州', desc:'修真正统，皇朝威仪。', x:58, y:45, color:'rgba(122,92,58,.30)' },
    { id:'donghuang', name:'东荒', desc:'蛮荒之地，妖兽横行。', x:82, y:66, color:'rgba(90,74,58,.30)' },
    { id:'nanjiang',  name:'南疆', desc:'巫蛊瘴气，魔道渊薮。', x:34, y:80, color:'rgba(90,58,74,.30)' },
    { id:'xixi',      name:'西陲', desc:'沙海佛国，丹道圣地。', x:16, y:50, color:'rgba(138,122,74,.30)' },
    { id:'beimo',     name:'北漠', desc:'冰原古战场，封印所在。', x:48, y:14, color:'rgba(74,90,106,.30)' }
  ],
  locations: [
    { id:'loc_shenjia',  name:'沈家',   region:'qingzhou',  x:36, y:62, type:'家族', desc:'临江城修仙世家，主角出身之地。' },
    { id:'loc_linjiang', name:'临江城', region:'qingzhou',  x:42, y:68, type:'城', desc:'青州繁华大城，商贾云集。', sides:[
      { scene:'v1s_trader', flag:'side_trader_done' },
      { scene:'v1s_pick', flag:'side_pick_done' }
    ] },
    { id:'loc_xuanqing', name:'玄清宗', region:'qingzhou',  x:55, y:36, type:'宗门', desc:'青云山上的正道宗门，卷1主舞台。', sides:[
      { scene:'v1s_shilei', flag:'side_shilei_done' },
      { scene:'v1s_canteen', flag:'side_canteen_done' },
      { scene:'v1s_money', flag:'side_money_done' },
      { scene:'v1s_library', flag:'side_library_done' }
    ] },
    { id:'loc_qingyunshan', name:'青云山', region:'qingzhou', x:52, y:30, type:'灵山', desc:'玄清宗所在的灵山福地。', sides:[
      { scene:'v1s_ban', flag:'side_ban_done' }
    ] },
    { id:'loc_mijing',   name:'青云秘境', region:'qingzhou', x:63, y:24, type:'秘境', desc:'三年一开的秘境，机缘与凶险并存。' },
    { id:'loc_cangwu',   name:'苍梧城', region:'zhongzhou', x:58, y:50, type:'城', desc:'中州大城，万宝阁总号所在。', sides:[
      { scene:'v1s_zui', flag:'side_zui_done' },
      { scene:'v1s_zhang', flag:'side_zhang_done' }
    ] },
    { id:'loc_wanbao',   name:'万宝阁', region:'zhongzhou', x:63, y:46, type:'势力', desc:'商通八方的修真商行，有钱能使鬼推磨。', sides:[
      { scene:'v2s_escort', flag:'side_escort_done' },
      { scene:'v1s_auction', flag:'side_auction_done' }
    ] },
    { id:'loc_huangdu',  name:'大夏皇都', region:'zhongzhou', x:70, y:50, type:'势力', desc:'大夏皇朝都城，世俗权力的巅峰。' },
    { id:'loc_tianjian', name:'天剑宗', region:'zhongzhou', x:46, y:38, type:'宗门', desc:'剑修圣地，一剑破万法。' },
    { id:'loc_taiqing',  name:'太清宗', region:'zhongzhou', x:72, y:40, type:'宗门', desc:'符箓道法正宗。' },
    { id:'loc_danding',  name:'丹鼎阁', region:'xixi',      x:20, y:56, type:'势力', desc:'丹道圣地，天下丹药出丹鼎。' },
    { id:'loc_foguo',    name:'沙海佛国', region:'xixi',    x:10, y:42, type:'势力', desc:'西陲佛门，慈悲与金刚并存。' },
    { id:'loc_xuemo',    name:'血魔宗', region:'nanjiang',  x:28, y:82, type:'魔道', desc:'魔道巨擘，血海滔天。' },
    { id:'loc_baigu',    name:'白骨教', region:'nanjiang',  x:42, y:88, type:'魔道', desc:'魔道凶宗，白骨成山。' },
    { id:'loc_yaoshou',  name:'妖兽山脉', region:'donghuang', x:78, y:64, type:'秘境', desc:'东荒妖兽聚集地，猎妖者的天堂与坟场。' },
    { id:'loc_sanxiu',   name:'散修集市', region:'donghuang', x:86, y:56, type:'城', desc:'三教九流聚集的自由之地。', sides:[
      { scene:'v2s_mapparts', flag:'side_mapparts_done' },
      { scene:'v2s_market', flag:'side_market_done' }
    ] },
    { id:'loc_guzhanchang', name:'北漠古战场', region:'beimo', x:48, y:18, type:'遗迹', desc:'上古大战的遗迹，杀伐之气万年不散。' },
    { id:'loc_bingyuan', name:'冰原',   region:'beimo',      x:34, y:10, type:'秘境', desc:'北漠冰原，玄冰千里。' },
    { id:'loc_jiuyuan',  name:'九渊封印之地', region:'beimo', x:56, y:22, type:'遗迹', desc:'苍梧仙帝镇压天魔之处。封印若破，苍梧界倾覆。' }
  ]
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.map;
})(typeof window !== 'undefined' ? window : globalThis);
