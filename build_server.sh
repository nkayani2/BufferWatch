#!/bin/bash
# BufferWatch - Linux/WSL Build Script for C2 Server

echo "========================================"
echo "BufferWatch C2 Server - Linux Builder"
echo "========================================"
echo ""

# Check if GCC is installed
if ! command -v gcc &> /dev/null; then
    echo "[ERROR] GCC not found!"
    echo ""
    echo "Please install GCC:"
    echo "  Ubuntu/Debian: sudo apt-get install build-essential"
    echo "  Fedora/RHEL:   sudo dnf install gcc"
    echo "  Arch:          sudo pacman -S gcc"
    echo "  macOS:         xcode-select --install"
    echo ""
    exit 1
fi

echo "[INFO] GCC found:"
gcc --version | head -n 1
echo ""

# Check if server.c exists
if [ ! -f "server.c" ]; then
    echo "[ERROR] server.c not found in current directory!"
    echo "Please run this script from the BufferWatch root directory."
    echo ""
    exit 1
fi

echo "[INFO] Compiling server.c..."
echo ""

# Compile the server
gcc server.c -o server

if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] Compilation failed!"
    echo "Please check the error messages above."
    echo ""
    exit 1
fi

echo ""
echo "[SUCCESS] Server compiled successfully!"
echo "Output: ./server"
echo ""
echo "To run the server:"
echo "  ./server"
echo ""
echo "Note: The server listens on 192.168.23.130:50005"
echo "      Modify server.c line 31 to change the IP address if needed."
echo ""
