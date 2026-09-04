/* ============================================================
   问道苍梧 · 像素头像精细参数（32×32 增强版）
   覆盖 data/characters.js 中的基础 avatar 字段：
     hair 0-5 发型（齐刘海短发/长直发/高马尾/双丸子/盘发髻/碎刘海）
     eyes 0-5 眼型（圆眼/凤眼/半闭慵懒/眯眼/吊眼/大眼）
     robe 0-2 服饰（交领道袍/高领劲装/襦裙）
     acc  0-3 饰品（无/发簪/额饰花钿/耳坠）
     expr 默认表情（normal/happy/sad/angry/cold/sly/shy）
   对话支持 @名字|表情@ 临时指定表情（如 @苏小满|happy@）。
   ============================================================ */
(function (g) {
'use strict';
g.GameData = g.GameData || {};
g.GameData.avatars = {
  /* 主角与金手指 */
  player:    { hair:2, eyes:0, robe:0, acc:1, expr:'normal' },   // 高马尾少年剑修，发簪束发
  wulao:     { hair:1, eyes:3, robe:1, acc:0, expr:'sly' },       // 银白长须披发，眯眼毒舌

  /* 可攻略女主 */
  xiaoman:   { hair:3, eyes:0, robe:2, acc:1, expr:'happy' },     // 双丸子髻小师妹
  qingshuang:{ hair:1, eyes:1, robe:0, acc:0, expr:'cold' },      // 长发白衣剑修
  liuli:     { hair:1, eyes:2, robe:0, acc:3, expr:'sly' },       // 紫发慵懒，耳坠
  baizhi:    { hair:0, eyes:0, robe:2, acc:1, expr:'normal' },    // 齐刘海白衣医者
  yunshang:  { hair:3, eyes:2, robe:0, acc:1, expr:'sly' },       // 双髻精明大小姐
  qingluan:  { hair:1, eyes:1, robe:1, acc:2, expr:'cold' },      // 剑灵青蓝劲装+额饰
  murong_xue:{ hair:1, eyes:1, robe:2, acc:1, expr:'cold' },      // 长发粉衣嫡女

  /* 兄弟 */
  xinglie:   { hair:2, eyes:3, robe:1, acc:0, expr:'normal' },    // 高马尾刀客
  wenyu:     { hair:0, eyes:1, robe:0, acc:0, expr:'normal' },    // 齐刘海温润军师
  shilei:    { hair:2, eyes:3, robe:1, acc:0, expr:'normal' },    // 莽汉体修
  shenyue:   { hair:3, eyes:0, robe:0, acc:0, expr:'happy' },     // 跟班小少年

  /* 师父 */
  changfeng: { hair:1, eyes:1, robe:0, acc:0, expr:'cold' },      // 银发白衣剑修
  sun_bo:    { hair:1, eyes:3, robe:0, acc:0, expr:'happy' },     // 灰发胖老头眯眼笑
  lin_qingyin:{hair:0, eyes:1, robe:0, acc:2, expr:'cold' },      // 清冷符修+额饰
  hong_lie:  { hair:2, eyes:3, robe:1, acc:0, expr:'normal' },    // 铁塔体修

  /* 同门 */
  zhu_chen:  { hair:0, eyes:1, robe:0, acc:0, expr:'normal' },
  lin_xiaoji:{ hair:3, eyes:0, robe:0, acc:0, expr:'happy' },
  qian_duoduo:{hair:0, eyes:2, robe:0, acc:0, expr:'sly' },

  /* 家族 */
  shen_bo:   { hair:1, eyes:3, robe:1, acc:0, expr:'normal' },    // 灰发家主
  shen_mu:   { hair:4, eyes:0, robe:2, acc:1, expr:'normal' },    // 盘发主母
  fu_bo:     { hair:1, eyes:3, robe:1, acc:0, expr:'normal' },    // 白发老管家
  shen_tianhu:{hair:2, eyes:2, robe:1, acc:0, expr:'angry' },

  /* 慕容家 */
  murong_zhao:{hair:1, eyes:2, robe:1, acc:0, expr:'sly' },
  murong_lie:{ hair:0, eyes:2, robe:1, acc:0, expr:'angry' },

  /* 反派 */
  chenxuan:  { hair:0, eyes:2, robe:1, acc:0, expr:'sly' },
  hei_lian:  { hair:1, eyes:2, robe:1, acc:1, expr:'cold' },
  xue_wuji:  { hair:1, eyes:4, robe:1, acc:0, expr:'angry' },     // 赤发吊眼大反派
  gu_daoren: { hair:1, eyes:2, robe:1, acc:0, expr:'sly' },

  /* 江湖 NPC */
  zhang_bo:  { hair:1, eyes:3, robe:1, acc:0, expr:'normal' },    // 白发老汉
  liu_sanniang:{hair:1, eyes:2, robe:0, acc:3, expr:'sly' },      // 美艳老板娘+耳坠
  qian_wanjin:{hair:1, eyes:3, robe:0, acc:0, expr:'happy' },

  /* 灵兽伙伴：白九走灵狐特例绘制（species 标记） */
  bai_jiu:   { species:'fox' }
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.avatars;
})(typeof window !== 'undefined' ? window : globalThis);
