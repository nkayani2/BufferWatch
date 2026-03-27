@echo off
REM BufferWatch - Windows Build Script for C2 Server
REM This script compiles the server.c file on Windows

echo ========================================
echo BufferWatch C2 Server - Windows Builder
echo ========================================
echo.

REM Check if GCC is installed
where gcc >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] GCC not found!
    echo.
    echo Please install GCC first. You have several options:
    echo   1. Install MSYS2 from https://www.msys2.org/
    echo   2. Install TDM-GCC from https://jmeubank.github.io/tdm-gcc/
    echo   3. Use WSL (Windows Subsystem for Linux)
    echo.
    echo See WINDOWS_SETUP.md for detailed instructions.
    echo.
    pause
    exit /b 1
)

echo [INFO] GCC found:
gcc --version | findstr "gcc"
echo.

REM Check if server.c exists
if not exist server.c (
    echo [ERROR] server.c not found in current directory!
    echo Please run this script from the BufferWatch root directory.
    echo.
    pause
    exit /b 1
)

echo [INFO] Compiling server.c...
echo.

REM Compile the server
gcc server.c -o server.exe

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Compilation failed!
    echo.
    echo Note: This server uses POSIX sockets which may not work on Windows.
    echo Recommended solutions:
    echo   1. Use WSL (Windows Subsystem for Linux) - BEST OPTION
    echo   2. Use MSYS2 MinGW terminal
    echo   3. Run in a Linux VM
    echo.
    echo See WINDOWS_SETUP.md for more details.
    echo.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Server compiled successfully!
echo Output: server.exe
echo.
echo To run the server:
echo   1. Make sure you're in WSL, MSYS2, or a Linux environment
echo   2. Run: .\server.exe
echo.
echo Note: The server uses Linux/POSIX sockets, so it must run in a
echo       Unix-like environment (WSL, MSYS2, or Linux VM).
echo.
pause
