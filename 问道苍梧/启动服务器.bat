@echo off
chcp 65001 >nul
title 问道苍梧 · 局域网服务器
cd /d "%~dp0"
echo ============================================
echo   问道苍梧 局域网服务器（双击启动）
echo   启动后，手机/平板（同一Wi-Fi）打开：
echo   http://192.168.1.61:8740/index.html
echo   本机访问：http://127.0.0.1:8740/index.html
echo   关闭本窗口 = 停止服务器
echo ============================================
echo.
node server.js
pause
