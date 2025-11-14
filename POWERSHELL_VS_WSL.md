# PowerShell vs WSL - Quick Reference

This guide helps you understand when to use PowerShell vs WSL for BufferWatch.

## 🖥️ Two Different Environments

### PowerShell (Windows Native)
- **What**: Windows command-line interface
- **When**: For running Node.js, npm, Windows commands
- **Path format**: `D:\Buffer watch fyp\BufferWatch`
- **Commands**: `cd`, `dir`, `npm`, Node.js
- **Cannot run**: gcc (unless you install MinGW and add to PATH)

### WSL (Windows Subsystem for Linux)
- **What**: Linux environment inside Windows
- **When**: For running gcc, compiling C code, Linux commands
- **Path format**: `/mnt/d/Buffer\ watch\ fyp/BufferWatch`
- **Commands**: `cd`, `ls`, `gcc`, `./server`
- **How to enter**: Type `wsl` in PowerShell

## 🎯 What Goes Where

| Component | Environment | Why |
|-----------|-------------|-----|
| **C2 Server** | WSL | Needs gcc and Linux sockets |
| **WebSocket Proxy** | PowerShell | Node.js works on Windows |
| **React Dashboard** | PowerShell | Node.js works on Windows |

## 📋 Common Mistakes & Fixes

### ❌ Mistake 1: Using WSL paths in PowerShell
```powershell
PS D:\> cd /mnt/d/Buffer\ watch\ fyp/BufferWatch
# ERROR: This is a WSL path, PowerShell doesn't understand it!
```

✅ **Fix:**
```powershell
PS D:\> cd "D:\Buffer watch fyp\BufferWatch"
# SUCCESS: Use Windows paths in PowerShell
```

### ❌ Mistake 2: Running gcc in PowerShell without installing it
```powershell
PS D:\> gcc server.c -o server
# ERROR: gcc not found (unless you installed MinGW/MSYS2)
```

✅ **Fix Option A - Use WSL:**
```powershell
PS D:\> wsl
user@DESKTOP:~$ cd /mnt/d/Buffer\ watch\ fyp/BufferWatch
user@DESKTOP:~$ gcc server.c -o server
# SUCCESS: gcc is available in WSL
```

✅ **Fix Option B - Install MSYS2 and use MSYS2 terminal**

### ❌ Mistake 3: Using Windows paths in WSL
```bash
user@DESKTOP:~$ cd D:\Buffer watch fyp\BufferWatch
# ERROR: This is a Windows path, WSL doesn't understand it!
```

✅ **Fix:**
```bash
user@DESKTOP:~$ cd /mnt/d/Buffer\ watch\ fyp/BufferWatch
# SUCCESS: Use /mnt/X/ format for Windows drives in WSL
```

## 🚀 Step-by-Step: Opening WSL

### Method 1: From PowerShell
```powershell
# You're in PowerShell (notice PS D:\>)
PS D:\Buffer watch fyp\BufferWatch> wsl

# Now you're in WSL/Linux (notice different prompt)
user@DESKTOP-ABC123:/mnt/d/Buffer watch fyp/BufferWatch$
```

### Method 2: From Start Menu
1. Press Windows key
2. Type "WSL" or "Ubuntu" or "Debian" (depends on your distro)
3. Click the WSL app

### Method 3: Windows Terminal
1. Open Windows Terminal
2. Click the down arrow (˅) at the top
3. Select your WSL distribution (Ubuntu, Debian, etc.)

## 🔄 Switching Between Environments

### From PowerShell to WSL:
```powershell
PS D:\> wsl
# Now in WSL
```

### From WSL to PowerShell:
```bash
user@DESKTOP:~$ exit
# Back to PowerShell
```

Or just open a new PowerShell window!

## 📝 Complete Example Session

```powershell
# ========== TERMINAL 1: C2 Server in WSL ==========
PS D:\Buffer watch fyp\BufferWatch> wsl
user@DESKTOP:~$ cd /mnt/d/Buffer\ watch\ fyp/BufferWatch
user@DESKTOP:/mnt/d/Buffer watch fyp/BufferWatch$ gcc server.c -o server
user@DESKTOP:/mnt/d/Buffer watch fyp/BufferWatch$ ./server
Server listening on 192.168.23.130:50005
...

# ========== TERMINAL 2: Proxy in PowerShell ==========
PS D:\> cd "D:\Buffer watch fyp\BufferWatch\dashboard"
PS D:\Buffer watch fyp\BufferWatch\dashboard> npm run proxy
✅ WebSocket server listening on ws://localhost:8080
...

# ========== TERMINAL 3: Dashboard in PowerShell ==========
PS D:\> cd "D:\Buffer watch fyp\BufferWatch\dashboard"
PS D:\Buffer watch fyp\BufferWatch\dashboard> npm run dev
✅ Dashboard running at http://localhost:3000
...
```

## 💡 Pro Tips

1. **Use Windows Terminal** - It lets you open multiple tabs for PowerShell and WSL
2. **Check your prompt** - It tells you which environment you're in
   - `PS D:\>` = PowerShell
   - `user@DESKTOP:~$` = WSL
3. **Spaces in paths**:
   - PowerShell: Use quotes `"D:\Buffer watch fyp"`
   - WSL: Use backslash `cd /mnt/d/Buffer\ watch\ fyp`
4. **Copy from WSL to Windows**: Your WSL files are at `\\wsl$\Ubuntu\...` in File Explorer

## 🔍 Identifying Your Environment

Run these commands to see which environment you're in:

**In PowerShell:**
```powershell
PS D:\> echo $PSVersionTable
# Shows PowerShell version info
```

**In WSL:**
```bash
user@DESKTOP:~$ uname -a
# Shows Linux kernel info
```

## ❓ FAQ

**Q: Do I need to install WSL?**
A: If you don't have it: `wsl --install` in PowerShell (as Administrator)

**Q: Can I just use MSYS2 instead of WSL?**
A: Yes! MSYS2 gives you gcc. Use the MSYS2 MinGW terminal, not PowerShell.

**Q: Why can't I just run everything in PowerShell?**
A: The C server uses POSIX sockets (Linux-style), which don't work natively in Windows. You need WSL or MSYS2.

**Q: Can I run the dashboard in WSL too?**
A: Yes, but it's easier in PowerShell since Node.js works fine on Windows.

## 📚 Learn More

- [WSL Documentation](https://docs.microsoft.com/windows/wsl/)
- [MSYS2 Documentation](https://www.msys2.org/)
- [Windows Terminal](https://aka.ms/terminal)
