@echo off
echo ========================================
echo  PropertyTrading 部署修复脚本
echo ========================================
echo.

REM 设置变量
set REPO_URL=https://github.com/DeangeloKreiger/PropertyTrading.git
set SOURCE_DIR=%~dp0
set TEMP_REPO=D:\temp_repo_PropertyTrading

echo [1/5] 创建临时目录...
if exist "%TEMP_REPO%" (
    echo 删除旧的临时目录...
    rmdir /s /q "%TEMP_REPO%"
)
mkdir "%TEMP_REPO%"

echo.
echo [2/5] 克隆GitHub仓库...
cd /d D:\
git clone %REPO_URL% "%TEMP_REPO%"

if errorlevel 1 (
    echo 错误: 克隆失败!
    echo 请确保:
    echo 1. 已安装Git
    echo 2. 有仓库访问权限
    echo 3. 网络连接正常
    pause
    exit /b 1
)

echo.
echo [3/5] 复制修复的文件...

REM 复制文件
copy /Y "%SOURCE_DIR%.npmrc" "%TEMP_REPO%\.npmrc"
copy /Y "%SOURCE_DIR%vercel.json" "%TEMP_REPO%\vercel.json"
copy /Y "%SOURCE_DIR%index.html" "%TEMP_REPO%\index.html"
copy /Y "%SOURCE_DIR%tsconfig.json" "%TEMP_REPO%\tsconfig.json"
copy /Y "%SOURCE_DIR%package.json" "%TEMP_REPO%\package.json"
copy /Y "%SOURCE_DIR%src\config\wagmi.ts" "%TEMP_REPO%\src\config\wagmi.ts"
copy /Y "%SOURCE_DIR%src\utils\contract.ts" "%TEMP_REPO%\src\utils\contract.ts"

echo.
echo [4/5] 提交更改...
cd /d "%TEMP_REPO%"
git add .
git commit -m "Fix deployment: resolve npm dependencies and TypeScript errors

- Add .npmrc for legacy-peer-deps support
- Fix TypeScript type errors in wagmi config and contract utils
- Update tsconfig for better compatibility
- Add Vercel deployment configuration
- Fix icon path in index.html"

echo.
echo [5/5] 推送到GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo 错误: 推送失败!
    echo 可能需要配置Git认证.
    echo.
    echo 您可以手动完成推送:
    echo 1. cd %TEMP_REPO%
    echo 2. git push origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ 成功! 修复已推送到GitHub
echo ========================================
echo.
echo 下一步:
echo 1. 访问 https://github.com/DeangeloKreiger/PropertyTrading/actions
echo 2. 查看部署进度 (约2-5分钟)
echo 3. 访问 https://deangelokreiger.github.io/PropertyTrading/
echo.
echo 临时仓库位置: %TEMP_REPO%
echo (可以稍后删除)
echo.

pause
