# BufferWatch React Dashboard - Project Overview

## 📋 Complete Folder Structure

```
BufferWatch/
├── dashboard/                          # NEW: React Dashboard Application
│   ├── src/
│   │   ├── components/                # Future reusable components
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Overview with stats and status
│   │   │   ├── ConnectedClients.tsx  # Real-time client list
│   │   │   ├── CommandCenter.tsx     # Command execution interface
│   │   │   ├── Screenshots.tsx       # Screenshot gallery
│   │   │   ├── KeylogViewer.tsx      # Keylogger data viewer
│   │   │   └── LiveTerminal.tsx      # Interactive terminal
│   │   ├── services/
│   │   │   └── websocket.ts          # WebSocket client service
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   ├── styles/
│   │   │   └── index.css             # Global styles
│   │   ├── App.tsx                   # Main app with routing
│   │   └── main.tsx                  # Entry point
│   ├── proxy/
│   │   └── server.js                 # Node.js TCP-to-WebSocket bridge
│   ├── public/
│   │   └── vite.svg                  # App icon
│   ├── package.json                  # Dependencies and scripts
│   ├── vite.config.ts                # Vite configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── .gitignore                    # Git ignore rules
│   ├── index.html                    # HTML template
│   └── README.md                     # Dashboard documentation
│
├── server.c                          # C2 TCP server (port 50005)
├── memory_bufferoverflow_vulnerability_02.c  # Windows client/payload
├── keylogger.h                       # Keylogger implementation
└── README.md                         # Main project README

```

## 🎯 Implementation Summary

### What Was Built

1. **Complete Vite + React + TypeScript Project**
   - Modern build setup with Vite 6
   - Full TypeScript support
   - Ant Design UI framework
   - React Router for navigation

2. **Node.js WebSocket Proxy Server**
   - Bridges WebSocket (frontend) to TCP (C server on port 50005)
   - Handles real-time bidirectional communication
   - Auto-reconnection logic
   - Error handling and logging

3. **WebSocket Client Service**
   - Manages WebSocket connection lifecycle
   - Message handler system
   - Command sending interface
   - Reconnection mechanism

4. **Six Complete Dashboard Pages**

   a. **Dashboard Overview**
      - Connection status indicators
      - Statistics cards (clients, commands, uptime)
      - Recent activity table
      - System information

   b. **Connected Clients**
      - Real-time client list
      - IP addresses and connection times
      - Status badges
      - Last seen timestamps

   c. **Command Center**
      - 6 quick-action buttons:
        * Who Am I
        * Add Persistence
        * Start Keylogger
        * Take Screenshot
        * Start Live Screen
        * Stop Live Screen
      - Custom command input
      - Real-time response viewer
      - Terminal-style output

   d. **Screenshots Gallery**
      - Grid layout for screenshots
      - Auto-refresh functionality
      - Empty state handling
      - Image preview support

   e. **Keylogger Viewer**
      - Table view of keylog entries
      - Timestamps and keystroke data
      - Refresh and clear actions
      - Character count display

   f. **Live Terminal**
      - Interactive command-line interface
      - Command history
      - Real-time output streaming
      - Auto-scroll functionality
      - Terminal styling (green on black)

5. **Professional UI/UX**
   - Dark theme throughout
   - Responsive design (mobile-friendly)
   - Ant Design components
   - Real-time connection status in header
   - Sidebar navigation
   - Professional color scheme

## 🚀 How to Use

### Step 1: Install Dependencies
```bash
cd dashboard
npm install
```

### Step 2: Start the C2 Server
```bash
# In project root
gcc server.c -o server
./server
```

### Step 3: Start the WebSocket Proxy
```bash
# In dashboard directory
npm run proxy
```

### Step 4: Start the React Dashboard
```bash
# In dashboard directory
npm run dev
```

### Step 5: Access the Dashboard
Open browser to `http://localhost:3000`

## 🔧 Technical Architecture

### Communication Flow

```
React Frontend (Port 3000)
    ↕ WebSocket
WebSocket Proxy (Port 8080)
    ↕ TCP Socket
C2 Server (Port 50005)
    ↕ TCP Socket
Windows Client (pesis.exe)
```

### Data Flow

1. User clicks button in React UI
2. WebSocket sends JSON message to proxy
3. Proxy converts to TCP and forwards to C server
4. C server sends command to Windows client
5. Client responds to C server
6. C server forwards response to proxy
7. Proxy sends WebSocket message to React
8. React UI updates in real-time

## 📦 Dependencies Used

### Frontend
- `react` ^18.3.1 - UI library
- `react-dom` ^18.3.1 - DOM rendering
- `react-router-dom` ^6.27.0 - Routing
- `antd` ^5.21.7 - UI components
- `@ant-design/icons` ^5.5.1 - Icons
- `dayjs` ^1.11.13 - Date formatting
- `axios` ^1.7.8 - HTTP client (for future use)

### Dev Dependencies
- `vite` ^6.0.3 - Build tool
- `typescript` ^5.7.2 - Type safety
- `@vitejs/plugin-react` ^4.3.4 - React plugin
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `@types/node` - Node.js types

### Proxy Server
- `ws` ^8.18.0 - WebSocket library
- `net` (built-in) - TCP socket library

## 🎨 Features Implemented

✅ Dark modern UI with Ant Design
✅ Sidebar navigation with all required pages
✅ Real-time WebSocket connection
✅ TCP-to-WebSocket proxy server
✅ Dashboard overview with stats
✅ Connected clients list
✅ Command center with quick actions
✅ Custom command input
✅ Screenshots gallery
✅ Keylogger viewer
✅ Live terminal with history
✅ Connection status indicator
✅ Toast notifications (via Ant Design message)
✅ Responsive design
✅ TypeScript type safety
✅ Professional styling
✅ Auto-reconnection
✅ Error handling
✅ Comprehensive documentation

## 🔐 Security Considerations

This is an **educational security research tool**:

- Demonstrates buffer overflow vulnerabilities
- Shows C2 communication patterns
- Educational purpose only
- Use only in controlled lab environments
- Never use for unauthorized access
- Follow ethical hacking guidelines

## 📝 Available Commands

The dashboard supports all commands from the C client:

- `whoami` - Current user
- `persist` - Add persistence
- `keylog_start` - Start keylogger
- `screenshot` - Capture screen
- `livescreen_start` - Start screen streaming
- `livescreen_stop` - Stop screen streaming
- `dir` - List directory
- `cd [path]` - Change directory
- `download [url] [file]` - Download file
- Any Windows command (ipconfig, systeminfo, etc.)

## 🚧 Future Enhancements

Potential improvements:
- Screenshot file handling
- Keylog file parsing
- Live screen streaming display
- File download/upload interface
- Multiple client support
- Command history persistence
- Session recording
- Alert system
- User authentication
- Database storage

## 👥 Credits

**BufferWatch Team**:
- Nadir Rizwan Kayani — 45811
- Muhammad Hammad — 47326
- Muhammad Abdul Basit Khan — 35754

**Supervisor**: Muhammad Osama Raza

## 📄 License

Academic project for educational purposes only.

---

**Created**: March 2026
**Technology**: React 18 + TypeScript + Vite 6 + Ant Design 5
**Purpose**: Final Year Project - Security Research
