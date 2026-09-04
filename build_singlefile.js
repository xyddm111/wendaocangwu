/* ============================================================
   问道苍梧 · 打包为「单文件 HTML」（离线单机版）
   把 css/style.css 与全部 js/data 内联进一个 index.html，
   输出 问道苍梧_单文件版.html —— 可发到手机/电脑双击即玩。
   用法：node build_singlefile.js
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = __dirname;

var html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
var css = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');

// 内联样式
html = html.replace(/<link rel="stylesheet" href="css\/style\.css">/, '<style>\n' + css + '\n</style>');

// 内联脚本（保持原加载顺序）
html = html.replace(/<script src="([^"]+)"><\/script>/g, function (m, src) {
  var p = path.join(ROOT, src);
  var code = fs.readFileSync(p, 'utf8');
  // 防内联破坏：避免 </script> 序列
  code = code.replace(/<\/script>/gi, '<\\/script>');
  return '<script>\n' + code + '\n</script>';
});

// 单文件版没有独立的 sw.js，移除离线缓存注册块（file:// 本来也不生效）
html = html.replace(/<\/script>\s*<\/body>/, '</body>'); // 兜底
html = html.replace(/\/\/ 注册离线缓存[\s\S]*?<\/script>/, '');

var out = path.join(ROOT, '问道苍梧_单文件版.html');
fs.writeFileSync(out, html, 'utf8');
console.log('已生成: 问道苍梧_单文件版.html');
console.log('大小: ' + (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
