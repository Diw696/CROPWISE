@echo off
cd /d "%~dp0"
title CropWise - Smart Agricultural Guide

echo ===================================================
echo             Starting CropWise...
echo ===================================================

where node >nul 2>&1
if errorlevel 1 goto :no_node

if not exist ".env" goto :no_env
goto :start_app

:no_node
echo.
echo [ERROR] Node.js was not found on your system!
echo Please install Node.js v20.6 or higher from: https://nodejs.org/
echo.
pause
exit /b 1

:no_env
if exist ".env.example" (
    echo [INFO] .env file not found. Creating from .env.example...
    copy ".env.example" ".env" >nul
    echo [WARNING] Remember to configure your GEMINI_API_KEY in .env.
)
echo.

:start_app
echo [OK] Node.js found.
echo.
echo ===================================================
echo   Application URL : http://localhost:3000
echo   Default Login   : 
echo     - Username    : admin
echo     - Password    : admin987
echo ===================================================
echo.
echo Starting server...
echo Press Ctrl+C in this window to stop the server.
echo.

start "" "http://localhost:3000"
node server.js

echo.
echo Server has stopped.
pause
