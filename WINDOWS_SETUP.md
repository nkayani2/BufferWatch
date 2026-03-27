# BufferWatch - Windows Setup Guide

This guide will help you set up and run BufferWatch on Windows systems.

## 🚨 The GCC Error on Windows

If you see this error:
```
gcc : The term 'gcc' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

This means you don't have a C compiler installed on Windows. Follow the instructions below to fix this.

## 📦 Installing GCC on Windows

You have **three main options** to install GCC on Windows:

### Option 1: MinGW-w64 (Recommended for Students)

**MinGW-w64** provides GCC for Windows without requiring a full Linux environment.

#### Installation Steps:

1. **Download MSYS2** (includes MinGW-w64):
   - Go to https://www.msys2.org/
   - Download the installer (e.g., `msys2-x86_64-20240113.exe`)
   - Run the installer and follow the prompts
   - Install to `C:\msys64` (default location)

2. **Update MSYS2**:
   - Open **MSYS2 MSYS** from the Start menu
   - Run: `pacman -Syu`
   - Close the terminal when prompted
   - Reopen **MSYS2 MSYS** and run: `pacman -Su`

3. **Install MinGW-w64 GCC**:
   ```bash
   pacman -S mingw-w64-x86_64-gcc
   ```

4. **Add to PATH**:
   - Open Windows Settings → System → About → Advanced system settings
   - Click "Environment Variables"
   - Under "System variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\msys64\mingw64\bin`
   - Click "OK" on all dialogs

5. **Verify Installation**:
   - Open a **new** PowerShell or Command Prompt
   - Run: `gcc --version`
   - You should see GCC version information

### Option 2: TDM-GCC (Easier but Older)

**TDM-GCC** is a standalone GCC distribution for Windows.

#### Installation Steps:

1. Go to https://jmeubank.github.io/tdm-gcc/
2. Download the installer (64-bit recommended)
3. Run the installer
4. Select "Create" for a new installation
5. Choose installation directory (e.g., `C:\TDM-GCC-64`)
6. Check "Add to PATH" during installation
7. Complete the installation
8. Restart your terminal
9. Verify: `gcc --version`

### Option 3: Visual Studio Build Tools (Microsoft's Compiler)

If you prefer Microsoft's compiler (MSVC) instead of GCC:

1. Download **Visual Studio Community** from https://visualstudio.microsoft.com/
2. During installation, select "Desktop development with C++"
3. After installation, you'll use `cl.exe` instead of `gcc`

**Note**: The server.c code uses POSIX sockets, which are not directly compatible with Windows. You would need to modify the code to use Winsock2 for this option.

## 🔨 Compiling the C2 Server on Windows

Once GCC is installed, you have two options:

### Method 1: Using PowerShell/Command Prompt

```powershell
# Navigate to the BufferWatch directory
cd "D:\Buffer watch fyp\BufferWatch"

# Compile the server
gcc server.c -o server.exe

# Run the server
.\server.exe
```

### Method 2: Using the Build Script

We've provided a Windows batch script for easier compilation:

```powershell
# Run the build script
.\build_server.bat
```

## ⚠️ Important Notes for Windows

### 1. **Server Compatibility**

The `server.c` file uses **POSIX sockets** (Linux/Unix style), which are NOT natively supported on Windows.

**Solutions**:

#### Solution A: Use WSL (Windows Subsystem for Linux) - RECOMMENDED
```powershell
# Install WSL
wsl --install

# After restart, open WSL and navigate to your project
cd /mnt/d/Buffer\ watch\ fyp/BufferWatch

# Compile and run in WSL
gcc server.c -o server
./server
```

#### Solution B: Run in MSYS2 MinGW Terminal
```bash
# Open MSYS2 MinGW 64-bit from Start menu
cd /d/Buffer\ watch\ fyp/BufferWatch
gcc server.c -o server
./server
```

#### Solution C: Use a Linux VM
- Install VirtualBox or VMware
- Create an Ubuntu VM
- Run the server in the VM

### 2. **Dashboard (React) on Windows**

The React dashboard works perfectly on Windows! No special setup needed:

```powershell
# Navigate to dashboard directory
cd dashboard

# Install dependencies (first time only)
npm install

# Terminal 1: Start the proxy
npm run proxy

# Terminal 2: Start the dashboard
npm run dev
```

## 🎯 Complete Setup on Windows

### Recommended Setup: WSL + Windows

This gives you the best of both worlds:

1. **Server runs in WSL** (Linux environment for C code)
2. **Dashboard runs in Windows** (PowerShell/Terminal)

#### Steps:

**Terminal 1 - WSL (Server)**:
```bash
# Open WSL
wsl

# Navigate to project
cd /mnt/d/Buffer\ watch\ fyp/BufferWatch

# Compile and run server
gcc server.c -o server
./server
```

**Terminal 2 - PowerShell (Proxy)**:
```powershell
cd "D:\Buffer watch fyp\BufferWatch\dashboard"
npm run proxy
```

**Terminal 3 - PowerShell (Dashboard)**:
```powershell
cd "D:\Buffer watch fyp\BufferWatch\dashboard"
npm run dev
```

## 🐛 Troubleshooting

### "gcc not recognized" even after installation
- Make sure you've added GCC to your PATH
- **Restart your terminal** (very important!)
- Try opening a new PowerShell window as Administrator
- Verify PATH: `echo $env:PATH` (PowerShell) or `echo %PATH%` (CMD)

### "Cannot find -lwsock32" or socket errors
- The server uses Linux sockets, not Windows sockets
- Use WSL or MSYS2 as described above
- Alternatively, modify server.c to use Winsock2 (requires code changes)

### Node.js/npm not found
- Install Node.js from https://nodejs.org/
- Choose LTS version (v20 or v18)
- Restart terminal after installation

### Port already in use
- Check if another program is using port 50005:
  ```powershell
  netstat -ano | findstr :50005
  ```
- Kill the process or change the port in server.c

## 📚 Additional Resources

- **MSYS2 Documentation**: https://www.msys2.org/
- **MinGW-w64**: https://www.mingw-w64.org/
- **WSL Documentation**: https://docs.microsoft.com/windows/wsl/
- **Node.js for Windows**: https://nodejs.org/

## ✅ Quick Verification Checklist

- [ ] GCC installed and working (`gcc --version`)
- [ ] Node.js installed (`node --version`)
- [ ] WSL or MSYS2 setup (for running server)
- [ ] Dashboard dependencies installed (`npm install` in dashboard/)
- [ ] All terminals can access the project directory

## 🎓 For Educational Use

Remember, this is a **security research project** for educational purposes. Always:
- Use in controlled lab environments only
- Get proper authorization before testing
- Follow your institution's ethical guidelines
- Never use on systems you don't own or have explicit permission to test

---

**Need Help?** Contact the project team:
- Nadir Rizwan Kayani — 45811
- Muhammad Hammad — 47326
- Muhammad Abdul Basit Khan — 35754
