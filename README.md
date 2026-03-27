# BufferWatch

**A Security Analysis Project Focusing on Memory Corruption Vulnerabilities**

## Team Members

- **Nadir Rizwan Kayani** — 45811  
- **Muhammad Hammad** — 47326  
- **Muhammad Abdul Basit Khan** — 35754  

## Supervised By

- **Muhammad Osama Raza**

## Project Overview

This repository contains a detailed analysis and demonstration of critical memory safety vulnerabilities, with a focus on **buffer overflow** exploits in C/C++ Windows applications. The project examines real-world malicious code (a backdoor implant) to identify insecure programming patterns that lead to exploitable conditions.

Through reverse engineering and source code review, we highlight common unsafe practices, including:

- Use of unsafe functions (`strcpy`, `strncpy` without proper bounds)
- Lack of input validation on network-supplied data
- Custom string manipulation with out-of-bounds access
- Fixed-size buffers handling untrusted input

The goal is to educate developers and security researchers on how to recognize, understand, and prevent buffer overflow vulnerabilities—one of the most dangerous and historically exploited classes of memory corruption bugs.

## Project Files

- `Win11bypass.c` — Backdoor client with persistence, remote shell, keylogging, and file download capabilities (contains analyzed vulnerabilities)
- `keylogger.h` — Header file for keylogging functionality
- `server.c` — Companion remote control server (for demonstration purposes)
- `dashboard/` — Modern React + TypeScript dashboard for C2 control (NEW!)
- `WINDOWS_SETUP.md` — Complete setup guide for Windows users (NEW!)
- Other files include related experiments and variant implementations

> **Note:** This code is provided strictly for educational and research purposes in a controlled environment. It must not be used for malicious or unauthorized activities.

## 🚀 Quick Start

### For Windows Users

If you're on Windows and getting a **"gcc not recognized"** error, see **[WINDOWS_SETUP.md](WINDOWS_SETUP.md)** for detailed instructions.

**Quick steps:**
1. Install GCC (via MSYS2 or use WSL) - see [WINDOWS_SETUP.md](WINDOWS_SETUP.md)
2. Compile the server: `gcc server.c -o server` (in WSL/MSYS2)
3. Run the React dashboard: `cd dashboard && npm install && npm run dev`

See the complete guide: **[WINDOWS_SETUP.md](WINDOWS_SETUP.md)**

### For Linux/Mac Users

```bash
# Compile the server
gcc server.c -o server
./server

# In another terminal, start the dashboard
cd dashboard
npm install
npm run proxy    # Terminal 2
npm run dev      # Terminal 3
```

## 📚 Documentation

- **[WINDOWS_SETUP.md](WINDOWS_SETUP.md)** - Complete Windows setup guide (GCC installation, WSL, troubleshooting)
- **[dashboard/README.md](dashboard/README.md)** - Dashboard setup and usage
- **[DASHBOARD_OVERVIEW.md](DASHBOARD_OVERVIEW.md)** - Technical architecture and features

## 🛠️ Build Scripts

We've provided convenient build scripts:

**Windows:**
- `build_server.bat` - Compile the C2 server
- `start_dashboard.bat` - Launch dashboard and proxy in separate windows

**Linux/Mac/WSL:**
- `build_server.sh` - Compile the C2 server

## Learning Outcomes

- Understanding stack-based and heap-based buffer overflows
- Identifying unsafe string handling in legacy Windows applications
- Recognizing the importance of bounds checking and safe APIs
- Understanding the real-world impact of memory vulnerabilities in malware
- Learning C2 (Command & Control) communication patterns
- Building modern web interfaces for security tools

**Stay safe. Code responsibly.**

