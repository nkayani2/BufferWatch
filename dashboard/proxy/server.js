import { WebSocketServer } from 'ws';
import net from 'net';

const WS_PORT = 8080;
const TCP_HOST = '127.0.0.1';
const TCP_PORT = 50005;

console.log(`🚀 Starting BufferWatch WebSocket Proxy Server...`);

const wss = new WebSocketServer({ port: WS_PORT });

// Store active connections
const clients = new Map();
let tcpClient = null;
let tcpConnected = false;

function connectToTCP() {
  if (tcpClient) {
    tcpClient.destroy();
  }

  tcpClient = new net.Socket();

  tcpClient.connect(TCP_PORT, TCP_HOST, () => {
    console.log(`✅ Connected to TCP server at ${TCP_HOST}:${TCP_PORT}`);
    tcpConnected = true;

    // Notify all WebSocket clients
    broadcastToClients({
      type: 'tcp_connected',
      message: 'Connected to C2 server'
    });
  });

  tcpClient.on('data', (data) => {
    console.log(`📨 Received from TCP: ${data.toString()}`);

    // Forward TCP response to all WebSocket clients
    broadcastToClients({
      type: 'tcp_response',
      data: data.toString()
    });
  });

  tcpClient.on('error', (err) => {
    console.error('❌ TCP connection error:', err.message);
    tcpConnected = false;

    broadcastToClients({
      type: 'tcp_error',
      message: err.message
    });

    // Retry connection after 5 seconds
    setTimeout(connectToTCP, 5000);
  });

  tcpClient.on('close', () => {
    console.log('🔌 TCP connection closed');
    tcpConnected = false;

    broadcastToClients({
      type: 'tcp_disconnected',
      message: 'Disconnected from C2 server'
    });

    // Retry connection after 5 seconds
    setTimeout(connectToTCP, 5000);
  });
}

function broadcastToClients(message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(messageStr);
    }
  });
}

// Initialize TCP connection
connectToTCP();

wss.on('connection', (ws) => {
  const clientId = Date.now() + Math.random();
  clients.set(clientId, ws);

  console.log(`🌐 New WebSocket client connected (ID: ${clientId})`);

  // Send connection status
  ws.send(JSON.stringify({
    type: 'connection_status',
    connected: tcpConnected,
    message: tcpConnected ? 'Connected to C2 server' : 'Connecting to C2 server...'
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`📤 Received from WebSocket client:`, data);

      if (data.type === 'command' && tcpConnected) {
        const command = data.command + '\n';
        console.log(`🔧 Sending command to TCP: ${command.trim()}`);
        tcpClient.write(command);
      } else if (!tcpConnected) {
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Not connected to C2 server'
        }));
      }
    } catch (err) {
      console.error('❌ Error processing WebSocket message:', err);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });

  ws.on('close', () => {
    console.log(`👋 WebSocket client disconnected (ID: ${clientId})`);
    clients.delete(clientId);
  });

  ws.on('error', (err) => {
    console.error('❌ WebSocket error:', err);
  });
});

console.log(`✅ WebSocket server listening on ws://localhost:${WS_PORT}`);
console.log(`📡 Proxying to TCP server at ${TCP_HOST}:${TCP_PORT}`);
