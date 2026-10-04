@echo off
setlocal
title Care Quality Compliance - Local Preview
pushd "%~dp0"
if errorlevel 1 goto folder_error

echo.
echo  Care Quality Compliance
echo  Local website preview for Windows
echo.

where node >nul 2>&1
if errorlevel 1 goto node_missing

set "NEXT_TELEMETRY_DISABLED=1"
node "scripts\start-local.mjs"
set "CQC_EXIT_CODE=%ERRORLEVEL%"
popd
if "%CQC_EXIT_CODE%"=="0" exit /b 0
echo.
echo The preview could not start. Read the message above or START-HERE-WINDOWS.txt.
pause
exit /b %CQC_EXIT_CODE%

:node_missing
echo Node.js is needed to run this website on your computer.
echo.
echo 1. Install the current LTS version from https://nodejs.org/
echo 2. Keep the npm and Add to PATH options selected during installation.
echo 3. Close this window, then double-click start.bat again.
echo.
echo Nothing has been uploaded or published.
popd
pause
exit /b 1

:folder_error
echo Please extract the entire ZIP to a normal folder before running start.bat.
pause
exit /b 1
