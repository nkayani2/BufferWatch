@echo off
REM BufferWatch - Windows Startup Script
REM This script helps you run all three components in separate windows

echo ========================================
echo BufferWatch Dashboard - Windows Launcher
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [INFO] Node.js found:
node --version
echo.

REM Check if dashboard directory exists
if not exist dashboard (
    echo [ERROR] dashboard directory not found!
    echo Please run this script from the BufferWatch root directory.
    echo.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist dashboard\node_modules (
    echo [INFO] Installing dashboard dependencies...
    cd dashboard
    call npm install
    cd ..
    echo.
)

echo [INFO] Starting BufferWatch components...
echo.
echo IMPORTANT: You need to start the C2 server separately in WSL or MSYS2!
echo.
echo This script will open two windows:
echo   1. WebSocket Proxy (port 8080)
echo   2. React Dashboard (port 3000)
echo.
echo Press any key to continue...
pause >nul

REM Start the proxy in a new window
start "BufferWatch Proxy" cmd /k "cd dashboard && npm run proxy"

REM Wait a moment for proxy to start
timeout /t 2 /nobreak >nul

REM Start the dashboard in a new window
start "BufferWatch Dashboard" cmd /k "cd dashboard && npm run dev"

echo.
echo [SUCCESS] Components started!
echo.
echo Next steps:
echo   1. Start the C2 server in WSL or MSYS2 (see WINDOWS_SETUP.md)
echo   2. The proxy window shows WebSocket server status
echo   3. The dashboard will open at http://localhost:3000
echo.
echo To stop: Close the terminal windows or press Ctrl+C in each window
echo.
pause
