/* ============================================================
   问道苍梧 · 结局组装模板
   原理：结局方向定死，细节读取本局实际状态动态拼装。
   ============================================================ */
(function (g) {
'use strict';
var GD = g.GameData;
function Eng() { return g.GameEngine; }
function charName(id) { var c = GD.characters[id]; return c ? c.name : id; }
function teacherName(s) {
  return ['——','柳长风·剑道','孙伯符·丹道','林清音·符道','洪烈·体修'][s.flags.teacher || 1] || '——';
}
function temperLabel(axis) { return { xiayi:'侠义', gongli:'功利', henla:'狠辣' }[axis] || ''; }

g.GameData = g.GameData || {};
g.GameData.endings = {
  /* 卷1 预览结局（动态总结本局） */
  preview_end: {
    title: '少年初立',
    render: function (s) {
      var E = Eng();
      var dt = E.dominantTemper(s);
      var rels = Object.keys(s.rel || {}).sort(function (a, b) { return s.rel[b] - s.rel[a]; }).slice(0, 3)
        .map(function (id) { return charName(id) + '（好感 ' + s.rel[id] + '）'; });
      var parts = [];
      parts.push('『' + s.profile.name + '』以' + E.realmName(s) + '之身，拜入玄清宗' + teacherName(s) + '门下。');
      parts.push('主导性格：' + temperLabel(dt.axis) + '（' + dt.val + '）。声望 ' + s.stats.shengwang + '，灵石 ' + s.stats.lingshi + '。');
      if (rels.length) parts.push('此时站在你身边的：' + rels.join('、') + '。');
      if (s.flags.sign_divorce) parts.push('那纸退婚书，你收下了——此仇，记在心里。');
      if (s.flags.question_public) parts.push('你当众质问过慕容雪，满堂哗然——有些话，说了就是种子。');
      if (s.flags.remember_face) parts.push('慕容雪的脸，你刻进了心里——这张脸，早晚要还。');
      if (s.flags.probe_wulao) parts.push('你试探过梧老的来历，他笑而不答——这面镜子，藏着更大的秘密。');
      if (s.flags.test_wulao) parts.push('你让梧老证明自己——他骂骂咧咧地证明了。');
      if (s.flags.help_xinglie || s.flags.wait_xinglie) parts.push('邢烈与你并肩砍过山匪，这份交情是真的。');
      if (s.flags.skip_xinglie) parts.push('你绕过了那场乱斗——有些缘分，错过就是错过。');
      var danCount = 0, beastCount = 0;
      for (var k in s.items) { var it = GD.items[k]; if (it && it.type === 'dan') danCount += s.items[k]; }
      if (s.seenBeasts) beastCount = s.seenBeasts.length;
      parts.push('行囊里丹药 ' + danCount + ' 枚，妖兽图鉴点亮 ' + beastCount + ' 种。');
      parts.push('—— 苍梧界的故事，才刚刚开始。');
      return parts.join('\n');
    }
  },
  /* 卷1 阶段结局（动态总结） */
  vol1_stay: {
    title: '潜龙在渊',
    render: function (s) {
      var E = Eng();
      return '『' + s.profile.name + '』以' + E.realmName(s) + '之境留在玄清宗，声望 ' + s.stats.shengwang + '。' +
        (s.rel.xiaoman > 20 ? '\n苏小满的信物还揣在怀里——她说大比之后要你带她去苍梧城。' : '') +
        (s.rel.wenyu > 15 ? '\n温如玉深夜出山的背影，你始终没有说破。' : '') +
        '\n——宗门大比、正魔之局，静待风起。';
    }
  },
  vol1_travel: {
    title: '仗剑天涯',
    render: function (s) {
      var E = Eng();
      return '『' + s.profile.name + '』以' + E.realmName(s) + '之境仗剑下山，游历四方，声望 ' + s.stats.shengwang + '。' +
        (s.flags.meet_yunshang ? '\n万宝阁的客卿帖子还在行囊里——云裳说，东荒有桩大生意等着你。' : '') +
        '\n——江湖路远，山高水长。';
    }
  },
  vol1_secret: {
    title: '身世之问',
    render: function (s) {
      var E = Eng();
      return '『' + s.profile.name + '』握紧残缺玉简，踏上了追寻身世之路，声望 ' + s.stats.shengwang + '。' +
        (s.flags.wulao_sleep ? '\n梧老仍在沉睡——这一次，换你独自前行。' : '\n梧老在镜中嘀咕：「查到这一步，想回头可就难喽。」') +
        '\n——九渊之下，苍梧为钥；血脉为引，你是谁的钥？';
    }
  },
  /* 卷二阶段性收尾 */
  vol2_hook: {
    title: '风起云涌 · 待续',
    render: function (s) {
      var E = Eng();
      var lines = ['『' + s.profile.name + '』以' + E.realmName(s) + '之境，在宗门大比中崭露头角，声望 ' + s.stats.shengwang + '。'];
      if (s.flags.moon_xiaoman) lines.push('月下之约，苏小满红着脸说想与你同游苍梧城。');
      if (s.flags.moon_qingshuang) lines.push('月下之约，顾清霜说：我的剑，可以借你。');
      if (s.flags.moon_yunshang) lines.push('月下之约，云裳递来万宝阁客卿帖，还有北漠残图的线索。');
      if (s.flags.moon_baizhi) lines.push('月下之约，白芷为你调了一枚养脉丹。');
      if (s.flags.moon_liuli) lines.push('月下之约，夜琉璃警告你：血无极在查你怀里的镜子。');
      lines.push('——血无极现踪，温如玉深夜出山，黑莲的影子在暗处窥伺。\n卷二未完待续：大比决赛、正魔之局、身世之谜，皆在前方。');
      return lines.join('\n');
    }
  },
  /* 卷二终章抉择（动态总结本局因果） */
  vol2_end_hook: {
    title: '风云落幕 · 终章抉择',
    render: function (s) {
      var E = Eng();
      var lines = ['『' + s.profile.name + '』以' + E.realmName(s) + '之境回到残破的玄清宗，声望 ' + s.stats.shengwang + '。'];
      if (s.flags.love_xiaoman) lines.push('苏小满把新编的平安结塞进你手里，什么也没说。');
      if (s.flags.love_qingshuang) lines.push('顾清霜擦拭着你的断剑，说要替你重铸一柄。');
      if (s.flags.love_yunshang) lines.push('云裳送来的客卿令还揣在怀里——万宝阁，站在你这边。');
      if (s.flags.love_baizhi) lines.push('白芷每日来给师父换药，也顺道多看你一眼。');
      if (s.flags.love_liuli) lines.push('夜琉璃在夜色里远远地看了你一眼，又消失在暗处。');
      if (s.flags.xinglie_rear_guard) lines.push('邢烈为你断后，浑身是血地回来了——酒，他也带回来了。');
      if (s.flags.wenyu_chess || s.flags.wenyu_wait || s.flags.wenyu_reply) lines.push('温如玉的黑玉棋子还留在你身上——他到底在替谁下棋？');
      if (s.flags.take_orphan || s.flags.settle_orphan) lines.push('归山在客房里睡着了，怀里还抱着那包灵茶。');
      if (s.flags.dao_guard) lines.push('你的道，是守护。');
      else if (s.flags.dao_power) lines.push('你的道，是变强。');
      else if (s.flags.dao_love) lines.push('你的道，是那个人。');
      lines.push('——血无极重伤了玄清宗，而九渊的封印正在松动。\n你的下一个抉择，将决定苍梧界的走向。');
      return lines.join('\n');
    }
  },
  /* 卷二阶段结局 */
  vol2_restore: {
    title: '重整旗鼓',
    render: function (s) {
      var E = Eng();
      var lines = ['『' + s.profile.name + '』以' + E.realmName(s) + '之境，回到残破的山门，与同门重建玄清宗。'];
      if (s.flags.love_xiaoman) lines.push('苏小满陪在你身边，说要把山门重新种满桃树。');
      if (s.flags.love_qingshuang) lines.push('顾清霜说：剑在，宗门就在。');
      if (s.flags.dao_guard) lines.push('你的道，是守护——血无极那一掌，你记下了。');
      lines.push('——卷三：大争之世，等你回来。');
      return lines.join('\n');
    }
  },
  vol2_lead: {
    title: '集结号令',
    render: function (s) {
      var E = Eng();
      var lines = ['『' + s.profile.name + '』以' + E.realmName(s) + '之境竖起大旗，青州联军初具雏形。'];
      if (s.flags.love_yunshang) lines.push('云裳把万宝阁的库房钥匙交给你：「打赢了，分我一半战利品就行。」');
      if (s.flags.ally_wanbao) lines.push('钱万金亲自押着三车灵材送到联军大营。');
      lines.push('——卷三：正魔大战，一触即发。');
      return lines.join('\n');
    }
  },
  vol2_chase: {
    title: '孤身向北',
    render: function (s) {
      var E = Eng();
      var lines = ['『' + s.profile.name + '』以' + E.realmName(s) + '之境，孤身踏上北漠之路。'];
      if (s.flags.love_liuli) lines.push('夜琉璃在城门口等你，只说了一句：「我陪你走一段。」');
      if (s.flags.love_baizhi) lines.push('白芷塞给你一包丹药：「北漠苦寒，多带些。」');
      if (s.flags.wulao_awake) lines.push('梧老在镜中低语：「九渊……老夫好像记得路。」');
      lines.push('——卷三：九渊之下，答案在等你。');
      return lines.join('\n');
    }
  },
  vol3_teaser: {
    title: '大争之世 · 预告',
    render: function (s) {
      var E = Eng();
      return '『' + s.profile.name + '』回望青州，迈步向北。\n——内奸揭露、正魔大战、梧老记忆觉醒、元婴之劫，尽在卷三。';
    }
  },
  /* 终局结局方向（后续卷实现，先占位以保证结构完整） */
  feisheng:  { title: '飞升证道', render: function () { return '（卷4 实现）'; } },
  chengba:   { title: '称霸一方', render: function () { return '（卷4 实现）'; } },
  guiyin:    { title: '携侣归隐', render: function () { return '（卷4 实现）'; } },
  modao:     { title: '堕入魔道', render: function () { return '（卷4 实现）'; } },
  shendao:   { title: '身死道消', render: function () { return '（卷4 实现）'; } },
  jingzhu:   { title: '苍梧镜主', render: function () { return '（隐藏·卷4 实现）'; } },
  chongsheng:{ title: '重开一世', render: function () { return '（隐藏·多周目实现）'; } }
};
if (typeof module !== 'undefined' && module.exports) module.exports = g.GameData.endings;
})(typeof window !== 'undefined' ? window : globalThis);
