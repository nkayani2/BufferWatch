export interface Client {
  id: string;
  ip: string;
  status: 'online' | 'offline';
  lastSeen: string;
  connectedAt: string;
}

export interface Command {
  id: string;
  command: string;
  timestamp: string;
  response?: string;
  status: 'pending' | 'success' | 'error';
}

export interface Screenshot {
  id: string;
  filename: string;
  timestamp: string;
  url: string;
}

export interface KeylogEntry {
  id: string;
  timestamp: string;
  keys: string;
}

export interface WSMessage {
  type: 'tcp_connected' | 'tcp_disconnected' | 'tcp_response' | 'tcp_error' | 'connection_status' | 'error';
  message?: string;
  data?: string;
  connected?: boolean;
}
