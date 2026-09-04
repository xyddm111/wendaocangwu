/* ============================================================
   问道苍梧 · 局域网静态服务器（零依赖，Node 运行）
   用途：手机/平板与电脑同一 Wi-Fi 时，在手机浏览器打开
         http://电脑IP:8740/index.html 即可游玩。
   启动：node server.js
   ============================================================ */
'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');
var os = require('os');

var ROOT = __dirname;
var PORT = process.env.PORT || 8740;
var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8'
};

function lanIPs() {
  var out = [];
  var ifs = os.networkInterfaces();
  for (var k in ifs) {
    (ifs[k] || []).forEach(function (i) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address);
    });
  }
  return out;
}

var server = http.createServer(function (req, res) {
  var urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  var fp = path.normalize(path.join(ROOT, urlPath));
  if (fp.indexOf(ROOT) !== 0) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(fp, function (err, data) {
    if (err) { res.writeHead(404); res.end('not found: ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', function () {
  console.log('问道苍梧 局域网服务器已启动');
  console.log('本机访问: http://127.0.0.1:' + PORT + '/index.html');
  lanIPs().forEach(function (ip) { console.log('手机访问(同一Wi-Fi): http://' + ip + ':' + PORT + '/index.html'); });
});
