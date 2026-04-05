# BufferWatch Dashboard

A modern React + TypeScript dashboard for the BufferWatch C2 (Command & Control) security research tool.

## ⚠️ Educational Purpose Only

This tool is developed strictly for **educational and security research purposes**. It demonstrates Windows memory buffer vulnerabilities as part of an academic final year project.

**DO NOT** use this tool for unauthorized access or malicious activities.

## 🎯 Features

- **Modern Dark UI** - Built with Ant Design for a professional look
- **Real-time Communication** - WebSocket-based connection to C2 server
- **Dashboard Overview** - Monitor connection status and activity
- **Connected Clients** - View all connected clients with real-time status
- **Command Center** - Execute commands with one-click buttons
- **Screenshots Gallery** - Auto-refreshing gallery of captured screens
- **Keylogger Viewer** - Real-time keylog data viewer
- **Live Terminal** - Interactive terminal with command history

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ConnectedClients.tsx
│   │   ├── CommandCenter.tsx
│   │   ├── Screenshots.tsx
│   │   ├── KeylogViewer.tsx
│   │   └── LiveTerminal.tsx
│   ├── services/        # WebSocket service
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # CSS styles
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── proxy/
│   └── server.js        # Node.js TCP-to-WebSocket proxy
├── public/              # Static assets
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- The C server (server.c) compiled and ready to run

### Installation

1. Navigate to the dashboard directory:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

You need to run **three** components in separate terminals:

#### 1. Start the C2 Server (Terminal 1)

**⚠️ WINDOWS USERS:** If you get `gcc: command not found` or `gcc not recognized`, see **[../WINDOWS_SETUP.md](../WINDOWS_SETUP.md)** for detailed instructions.

**For Linux/Mac/WSL:**
```bash
# In the project root directory
gcc server.c -o server
./server
```

**For Windows (PowerShell):**
```powershell
# Option A: Use WSL (Recommended)
wsl
cd /mnt/d/your/path/to/BufferWatch
gcc server.c -o server
./server

# Option B: Use MSYS2 MinGW Terminal
cd /d/your/path/to/BufferWatch
gcc server.c -o server
./server

# Option C: Use the build script
.\build_server.bat
```

The server will listen on `192.168.23.130:50005` (or configure as needed).

> **Note**: The server uses POSIX sockets (Linux-style), so on Windows you **must** use WSL or MSYS2. See [../WINDOWS_SETUP.md](../WINDOWS_SETUP.md) for details.

#### 2. Start the WebSocket Proxy (Terminal 2)

The proxy bridges WebSocket (frontend) to TCP (C server):

**All platforms:**
```bash
cd dashboard
npm run proxy
```

This starts the proxy on `ws://localhost:8080`.

#### 3. Start the React Dashboard (Terminal 3)

**All platforms:**
```bash
cd dashboard
npm run dev
```

The dashboard will open at `http://localhost:3000`.

### Quick Start for Windows

Use the provided Windows batch script to start the dashboard and proxy:

```powershell
# From the project root
.\start_dashboard.bat
```

This will open two windows for the proxy and dashboard. You still need to start the C2 server in WSL/MSYS2 separately.

## 🔧 Configuration

### Changing Server Address

If you need to change the server address:

1. **C Server (server.c)**: Modify line 31
```c
server_address.sin_addr.s_addr = inet_addr("YOUR_IP_HERE");
```

2. **Proxy Server (proxy/server.js)**: Modify lines 4-5
```javascript
const TCP_HOST = 'YOUR_IP_HERE';
const TCP_PORT = 50005;
```

3. **Rebuild**: Recompile server.c and restart the proxy

## 📡 Available Commands

The dashboard supports the following commands:

- `whoami` - Display current user
- `persist` - Add persistence to startup
- `keylog_start` - Start keylogger
- `screenshot` - Take a screenshot
- `livescreen_start` - Start live screen streaming
- `livescreen_stop` - Stop live screen streaming
- `dir` - List directory contents
- `cd [path]` - Change directory
- `download [url] [filename]` - Download file from URL
- Any Windows command (e.g., `ipconfig`, `systeminfo`, etc.)

## 🎨 UI Features

- **Dark Theme** - Professional dark mode UI
- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Live connection status and responses
- **Toast Notifications** - Success/error feedback
- **Interactive Terminal** - Command history and output

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **UI Framework**: Ant Design 5
- **State Management**: React Hooks
- **Routing**: React Router v6
- **Real-time**: WebSocket
- **Backend Proxy**: Node.js + ws library

## 📝 Development

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔒 Security Notes

This project is for **educational purposes only**:

- The client (memory_bufferoverflow_vulnerability_02.c) is a demonstration of security vulnerabilities
- Use only in controlled environments with explicit authorization
- Never deploy on production systems
- Always follow ethical hacking guidelines
- Respect privacy and legal boundaries

## 👥 Team

- Nadir Rizwan Kayani — 45811
- Muhammad Hammad — 47326
- Muhammad Abdul Basit Khan — 35754

**Supervised By**: Muhammad Osama Raza

## 📄 License

This project is for academic purposes as part of a final year project at [University Name].

## 🤝 Contributing

This is an academic project. For questions or issues, please contact the team members.

---

**Disclaimer**: This software is provided for educational and research purposes only. The authors are not responsible for any misuse or damage caused by this program.
