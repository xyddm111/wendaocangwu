/* ============================================================
   问道苍梧 · 敌人/妖兽图鉴（一阶~九阶 + 妖王/妖皇/妖帝 + BOSS）
   全游戏 60+ 种；前期小怪即丰富，后期大妖/BOSS 齐全
   ============================================================ */
(function (g) {
'use strict';
g.GameData = g.GameData || {};
g.GameData.beasts = {
  /* ========== 一阶（炼气期常见妖兽）12 种 ========== */
  qingyan_lang: { id:'qingyan_lang', name:'青岩狼', tier:'一阶妖兽', desc:'青州山林常见的群居妖兽，铜头铁尾，成群出没。', atk:3, def:2, hp:18, drops:{ shouhe1:1 }, shengwang:2 },
  chimu_shu:    { id:'chimu_shu', name:'赤目鼠', tier:'一阶妖兽', desc:'灵田里的祸害，赤目尖牙，胜在数量多。', atk:2, def:1, hp:12, drops:{ shouhe1:1 }, shengwang:1 },
  tiebei_zhu:   { id:'tiebei_zhu', name:'铁背猪', tier:'一阶妖兽', desc:'皮糙肉厚的低阶妖兽，发起蛮来横冲直撞。', atk:4, def:4, hp:30, drops:{ shouhe1:2 }, shengwang:2 },
  hua_ling_zhi: { id:'hua_ling_zhi', name:'花翎雉', tier:'一阶妖兽', desc:'尾羽华丽的山雉，飞不高，跑得快，肉质鲜美。', atk:2, def:1, hp:14, drops:{ shouhe1:1 }, shengwang:1 },
  shui_jian_yu:{ id:'shui_jian_yu', name:'水箭鱼', tier:'一阶妖兽', desc:'溪流中的妖兽，能喷出锋利水箭。', atk:3, def:1, hp:16, drops:{ shouhe1:1 }, shengwang:1 },
  sui_shi_chan:{ id:'sui_shi_chan', name:'碎石蟾', tier:'一阶妖兽', desc:'体型巨大如石，受惊时喷吐碎石。', atk:3, def:2, hp:20, drops:{ shouhe1:1 }, shengwang:1 },
  shi_tie_yi:  { id:'shi_tie_yi', name:'噬铁蚁', tier:'一阶妖兽', desc:'嗜食铁矿的蚂蚁，甲壳坚硬，蚁群过境寸草不生。', atk:2, def:3, hp:24, drops:{ shouhe1:1 }, shengwang:1 },
  bi_yan_hou:  { id:'bi_yan_hou', name:'碧眼猴', tier:'一阶妖兽', desc:'通人性的灵猴，碧眼能辨宝，最爱偷修士的丹药。', atk:4, def:2, hp:22, drops:{ shouhe1:1 }, shengwang:2 },
  feng_ren_que:{ id:'feng_ren_que', name:'风刃雀', tier:'一阶妖兽', desc:'疾如风的雀鸟，翎羽如刀。', atk:4, def:1, hp:14, drops:{ shouhe1:1 }, shengwang:2 },
  yan_jia_xi:  { id:'yan_jia_xi', name:'岩甲蜥', tier:'一阶妖兽', desc:'背生岩甲的蜥蜴，防御惊人。', atk:3, def:4, hp:28, drops:{ shouhe1:1 }, shengwang:2 },
  du_nang_zhu: { id:'du_nang_zhu', name:'毒囊蛛', tier:'一阶妖兽', desc:'林中织网的毒蛛，毒囊可入药。', atk:5, def:1, hp:16, drops:{ shouhe1:1 }, shengwang:2 },
  yue_ying_diao:{ id:'yue_ying_diao', name:'月影貂', tier:'一阶妖兽', desc:'月光下出没的灵貂，皮毛价值不菲。', atk:3, def:2, hp:18, drops:{ shouhe1:1 }, shengwang:2 },
  /* ========== 二阶（筑基初期妖兽）10 种 ========== */
  huaban_mang: { id:'huaban_mang', name:'花斑蟒', tier:'二阶妖兽', desc:'盘踞山林的花斑巨蟒，绞杀之力惊人。', atk:6, def:3, hp:38, drops:{ shouhe2:1, mangpi:1 }, shengwang:4 },
  youying_bao: { id:'youying_bao', name:'幽影豹', tier:'二阶妖兽', desc:'行踪如鬼魅的暗夜猎手，速度奇快。', atk:8, def:2, hp:30, drops:{ shouhe2:1, bao_gu:1 }, shengwang:4 },
  wuyin_she:   { id:'wuyin_she', name:'雾隐蛇', tier:'二阶妖兽', desc:'秘境雾林中的毒蛇，藏于浓雾，一击致命。', atk:9, def:4, hp:42, drops:{ shouhe2:1, shedu:1 }, shengwang:5 },
  chi_yan_quan:{ id:'chi_yan_quan', name:'赤炎犬', tier:'二阶妖兽', desc:'火属性妖犬，獠牙带火，性烈。', atk:7, def:3, hp:34, drops:{ shouhe2:1 }, shengwang:4 },
  shuang_tou_she:{ id:'shuang_tou_she', name:'双头蛇', tier:'二阶妖兽', desc:'双头各喷毒雾火息，进退皆敌。', atk:8, def:4, hp:40, drops:{ shouhe2:1 }, shengwang:4 },
  tie_yi_ying: { id:'tie_yi_ying', name:'铁翼鹰', tier:'二阶妖兽', desc:'翼如铁铸的巨鹰，俯冲之势可裂石。', atk:7, def:2, hp:32, drops:{ shouhe2:1 }, shengwang:4 },
  qing_lin_e:  { id:'qing_lin_e', name:'青鳞鳄', tier:'二阶妖兽', desc:'沼泽霸主，鳞甲坚硬，咬合力惊人。', atk:7, def:6, hp:48, drops:{ shouhe2:1 }, shengwang:5 },
  zhang_qi_ha: { id:'zhang_qi_ha', name:'瘴气蛤', tier:'二阶妖兽', desc:'吐息成瘴，凡人触之即倒。', atk:6, def:4, hp:36, drops:{ shouhe2:1 }, shengwang:4 },
  xue_ya_zhu:  { id:'xue_ya_zhu', name:'血牙野猪', tier:'二阶妖兽', desc:'獠牙染血的狂暴野猪，发起狂来六亲不认。', atk:8, def:5, hp:44, drops:{ shouhe2:1 }, shengwang:5 },
  han_bing_tu: { id:'han_bing_tu', name:'寒冰兔', tier:'二阶妖兽', desc:'北地雪原的冰系灵兔，看似无害，吐息冻人。', atk:5, def:3, hp:30, drops:{ shouhe2:1 }, shengwang:3 },
  /* ========== 三阶（筑基后期妖兽）9 种 ========== */
  leiwen_hu:   { id:'leiwen_hu', name:'雷纹虎', tier:'三阶妖兽', desc:'虎纹生雷，啸声如雷，雷系妖兽中的王者。', atk:12, def:6, hp:60, drops:{ shouhe3:1, hupi:1 }, shengwang:8 },
  bingjing_chan:{ id:'bingjing_chan', name:'冰晶蟾', tier:'三阶妖兽', desc:'通体冰晶的寒性妖兽，吐息可冻裂岩石。', atk:10, def:8, hp:48, drops:{ shouhe3:1, chan_yi:1 }, shengwang:8 },
  shijia_gui:  { id:'shijia_gui', name:'石甲龟', tier:'三阶妖兽', desc:'秘境深处的龟类妖兽，甲壳坚逾精铁。', atk:6, def:12, hp:85, drops:{ shouhe3:1, guijia:1 }, shengwang:8 },
  zi_dian_diao:{ id:'zi_dian_diao', name:'紫电貂', tier:'三阶妖兽', desc:'身负紫电的灵貂，快若惊雷。', atk:11, def:4, hp:40, drops:{ shouhe3:1 }, shengwang:8 },
  lie_di_xiong:{ id:'lie_di_xiong', name:'裂地熊', tier:'三阶妖兽', desc:'一掌裂地的巨熊，力量恐怖。', atk:10, def:9, hp:75, drops:{ shouhe3:1 }, shengwang:8 },
  huo_yan_xi:  { id:'huo_yan_xi', name:'火焰蜥', tier:'三阶妖兽', desc:'火属性妖兽，尾焰如炬。', atk:12, def:5, hp:50, drops:{ shouhe3:1 }, shengwang:8 },
  du_wang_xie: { id:'du_wang_xie', name:'毒王蝎', tier:'三阶妖兽', desc:'蝎中王者，尾针之毒可放倒金丹以下修士。', atk:13, def:5, hp:45, drops:{ shouhe3:1 }, shengwang:8 },
  jin_bei_yuan:{ id:'jin_bei_yuan', name:'金背猿', tier:'三阶妖兽', desc:'背生金毛的灵猿，力大无穷，通晓粗浅拳法。', atk:11, def:7, hp:65, drops:{ shouhe3:1 }, shengwang:8 },
  feng_xiao_lang:{ id:'feng_xiao_lang', name:'风啸狼王', tier:'三阶妖兽·精英', desc:'青岩狼群的王者，御风而行，啸声裂石。', atk:12, def:6, hp:58, drops:{ shouhe3:2, hupi:1 }, shengwang:10 },
  /* ========== 四阶（金丹期妖兽）8 种 ========== */
  mijing_shouling:{ id:'mijing_shouling', name:'秘境守灵', tier:'四阶妖兽', desc:'青云秘境核心的守灵，无形无相，镇守秘境机缘。', atk:15, def:10, hp:100, drops:{ shouhe4:1, canque_yujian:1 }, shengwang:15 },
  qingjiao:    { id:'qingjiao', name:'青蛟', tier:'四阶妖兽·准妖王', desc:'青云秘境深处的青鳞蛟龙，蛟龙一怒，山崩地裂。（卷1小BOSS）', atk:18, def:12, hp:150, drops:{ shouhe4:2, qingjiao_lin:1 }, shengwang:25 },
  huo_yan_shi: { id:'huo_yan_shi', name:'火岩狮', tier:'四阶妖兽', desc:'东荒火山口的火系妖兽，狮鬃燃火。', atk:16, def:10, hp:120, drops:{ shouhe4:1 }, shengwang:12 },
  xuan_shui_jiao:{ id:'xuan_shui_jiao', name:'玄水蛟', tier:'四阶妖兽', desc:'深潭中的黑水蛟龙，控水成浪。', atk:17, def:12, hp:140, drops:{ shouhe4:2 }, shengwang:15 },
  xue_yi_fu:   { id:'xue_yi_fu', name:'血翼蝠王', tier:'四阶妖兽', desc:'血翼蔽天的蝠王，嗜血成性。', atk:16, def:8, hp:100, drops:{ shouhe4:1 }, shengwang:12 },
  lei_peng:    { id:'lei_peng', name:'雷鹏', tier:'四阶妖兽', desc:'翼展蔽日的雷鹏，振翅间雷云翻涌。', atk:18, def:9, hp:110, drops:{ shouhe4:1 }, shengwang:15 },
  han_shuang_lang:{ id:'han_shuang_lang', name:'寒霜狼王', tier:'四阶妖兽', desc:'北漠冰原的狼王，吐息成冰。', atk:17, def:11, hp:130, drops:{ shouhe4:1 }, shengwang:15 },
  yan_yue_ju_yuan:{ id:'yan_yue_ju_yuan', name:'岩岳巨猿', tier:'四阶妖兽', desc:'背负山岳般的巨猿，一拳可碎小山。', atk:16, def:14, hp:170, drops:{ shouhe4:2 }, shengwang:18 },
  /* ========== 五阶（金丹后期/元婴初）6 种 ========== */
  xuan_bing_gu:{ id:'xuan_bing_gu', name:'玄冰骨鸟', tier:'五阶妖兽', desc:'北漠冰原的冰系妖兽，骨翼如刀，寒息千里。', atk:22, def:14, hp:160, drops:{ shouhe5:1 }, shengwang:18 },
  yan_yu_mo_niu:{ id:'yan_yu_mo_niu', name:'炎狱魔牛', tier:'五阶妖兽', desc:'炎狱深渊走出的魔牛，四蹄踏火。', atk:24, def:18, hp:200, drops:{ shouhe5:1 }, shengwang:20 },
  zi_jin_lei_peng:{ id:'zi_jin_lei_peng', name:'紫金雷鹏', tier:'五阶妖兽', desc:'紫金翎羽的雷鹏，雷霆为翼。（隐藏支线）', atk:26, def:14, hp:170, drops:{ shouhe5:1 }, shengwang:20 },
  jiu_wei_ling_hu:{ id:'jiu_wei_ling_hu', name:'九尾灵狐', tier:'五阶妖兽·灵兽', desc:'通体雪白的九尾灵狐，天生通灵，可遇不可求。（卷2可收服为伙伴）', atk:20, def:12, hp:140, drops:{ shouhe5:1, linghu_mao:1 }, shengwang:25 },
  hei_shui_xuan_she:{ id:'hei_shui_xuan_she', name:'黑水玄蛇', tier:'五阶妖兽', desc:'深潭黑水中的玄蛇，毒水滔天。', atk:25, def:16, hp:190, drops:{ shouhe5:1 }, shengwang:22 },
  chi_yang_jin_wu:{ id:'chi_yang_jin_wu', name:'赤阳金乌', tier:'五阶妖兽', desc:'身负赤阳之力的金乌，焚天煮海。（隐藏BOSS）', atk:28, def:13, hp:160, drops:{ shouhe5:2 }, shengwang:25 },
  /* ========== 六阶（元婴期）5 种 ========== */
  ming_huo_yao_feng:{ id:'ming_huo_yao_feng', name:'冥火妖凰', tier:'六阶妖兽', desc:'冥火中涅槃的妖凰，凤鸣九霄。', atk:32, def:18, hp:230, drops:{ shouhe6:1 }, shengwang:28 },
  cang_lei_gu_yuan:{ id:'cang_lei_gu_yuan', name:'苍雷古猿', tier:'六阶妖兽', desc:'存活万年的古猿，苍雷加身，力可擎天。', atk:34, def:20, hp:260, drops:{ shouhe6:1 }, shengwang:28 },
  xuan_ming_gui:{ id:'xuan_ming_gui', name:'玄冥龟', tier:'六阶妖兽', desc:'背负玄冥二气的古龟，不动如山。', atk:26, def:30, hp:320, drops:{ shouhe6:1 }, shengwang:30 },
  qi_se_tun_tian:{ id:'qi_se_tun_tian', name:'七色吞天蟒', tier:'六阶妖兽', desc:'七色鳞甲的吞天蟒，可吞山河之气。', atk:35, def:22, hp:280, drops:{ shouhe6:1 }, shengwang:30 },
  zhen_yue_qi_lin:{ id:'zhen_yue_qi_lin', name:'镇岳麒麟（伪）', tier:'六阶妖兽', desc:'身怀麒麟血脉的异兽，其吼镇山河。', atk:38, def:26, hp:300, drops:{ shouhe6:1 }, shengwang:32 },
  /* ========== 七阶（化神期）4 种 ========== */
  fen_tian_yao_feng:{ id:'fen_tian_yao_feng', name:'焚天妖凰', tier:'七阶妖兽', desc:'焚天灭地的妖凰，凤炎可焚神魂。', atk:45, def:28, hp:380, drops:{ shouhe7:1 }, shengwang:40 },
  han_yuan_zhu_long:{ id:'han_yuan_zhu_long', name:'寒渊烛龙', tier:'七阶妖兽', desc:'盘踞寒渊的烛龙，睁眼为昼，闭眼为夜。', atk:48, def:32, hp:420, drops:{ shouhe7:1 }, shengwang:45 },
  wan_gu_lei_shou:{ id:'wan_gu_lei_shou', name:'万古雷兽', tier:'七阶妖兽', desc:'与天地同寿的雷兽，雷霆即其呼吸。', atk:50, def:30, hp:400, drops:{ shouhe7:1 }, shengwang:45 },
  bu_dong_ming_wang:{ id:'bu_dong_ming_wang', name:'不动明王猿', tier:'七阶妖兽', desc:'金刚不坏的巨猿，怒目如明王。', atk:46, def:38, hp:480, drops:{ shouhe7:1 }, shengwang:45 },
  /* ========== 八阶（渡劫期）3 种 ========== */
  tai_gu_xuan_wu:{ id:'tai_gu_xuan_wu', name:'太古玄武', tier:'八阶妖兽', desc:'太古遗种，龟蛇同体，背负天道。', atk:55, def:55, hp:700, drops:{ shouhe8:1 }, shengwang:60 },
  jiu_tian_ying_long:{ id:'jiu_tian_ying_long', name:'九天应龙', tier:'八阶妖兽', desc:'应天而生的神龙，行云布雨，威压九天。', atk:70, def:48, hp:650, drops:{ shouhe8:1 }, shengwang:70 },
  you_ming_mo_jiao:{ id:'you_ming_mo_jiao', name:'幽冥魔蛟', tier:'八阶妖兽', desc:'幽冥中孕育的魔蛟，其鳞可噬魂。', atk:68, def:50, hp:620, drops:{ shouhe8:1 }, shengwang:70 },
  /* ========== 九阶（大乘期）2 种 ========== */
  hun_dun_zu_long:{ id:'hun_dun_zu_long', name:'混沌祖龙', tier:'九阶妖兽', desc:'开天辟地前的混沌祖龙，其存在即法则。（隐藏BOSS）', atk:95, def:70, hp:1000, drops:{ shouhe9:1 }, shengwang:100 },
  jiu_you_tian_mo:{ id:'jiu_you_tian_mo', name:'九幽天魔', tier:'九阶妖兽·灭世', desc:'被苍梧仙帝镇压于九渊的灭世天魔，万载封印已近极限。（卷4最终BOSS）', atk:110, def:80, hp:1200, drops:{ shouhe9:1 }, shengwang:120 },
  /* ========== 妖王 / 妖皇 / 妖帝 ========== */
  qingjiao_wang:{ id:'qingjiao_wang', name:'青蛟王', tier:'妖王·四阶巅峰', desc:'青云秘境之主，蛟龙中的王者。卷1秘境大BOSS，击杀可得蛟龙逆鳞与秘境至宝。', atk:22, def:16, hp:220, drops:{ shouhe4:3, qingjiao_lin:2, wuming_cantu:1 }, shengwang:40 },
  yao_huang_baize:{ id:'yao_huang_baize', name:'妖皇·白泽', tier:'妖皇', desc:'通晓万物的上古神兽白泽，妖界至尊。（卷3 登场）', atk:85, def:60, hp:900, drops:{ shouhe9:1 }, shengwang:90 },
  yao_di_zhu_jiuyin:{ id:'yao_di_zhu_jiuyin', name:'妖帝·烛九阴', tier:'妖帝', desc:'妖界亘古的帝王，其目开合间昼夜颠倒。（卷4 登场）', atk:120, def:90, hp:1500, drops:{ shouhe9:2 }, shengwang:150 }
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.beasts;
})(typeof window !== 'undefined' ? window : globalThis);
