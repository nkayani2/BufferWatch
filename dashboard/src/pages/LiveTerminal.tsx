import { useState, useEffect, useRef } from 'react';
import { Card, Input, Button, Typography, Space } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import wsService from '../services/websocket';

const { Title } = Typography;
const { TextArea } = Input;

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  timestamp: string;
}

function LiveTerminal() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [connected, setConnected] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (msg: any) => {
      if (msg.type === 'tcp_connected' || msg.type === 'connection_status') {
        setConnected(msg.connected || msg.type === 'tcp_connected');
      } else if (msg.type === 'tcp_disconnected') {
        setConnected(false);
        addToHistory('output', '--- Disconnected from C2 server ---');
      } else if (msg.type === 'tcp_response') {
        addToHistory('output', msg.data);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addToHistory = (type: 'input' | 'output', content: string) => {
    setHistory((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleSendCommand = () => {
    if (!command.trim()) return;

    if (!connected) {
      addToHistory('output', 'Error: Not connected to C2 server');
      return;
    }

    addToHistory('input', `$ ${command}`);

    try {
      wsService.sendCommand(command);
      setCommand('');
    } catch (error) {
      addToHistory('output', 'Error: Failed to send command');
    }
  };

  const handleClear = () => {
    setHistory([]);
  };

  const renderTerminalContent = () => {
    return history
      .map((line, index) => {
        if (line.type === 'input') {
          return `\n${line.content}`;
        } else {
          return line.content;
        }
      })
      .join('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Live Terminal</Title>
        <Button icon={<ClearOutlined />} onClick={handleClear}>
          Clear Terminal
        </Button>
      </div>

      <Card style={{ marginTop: 24 }}>
        <div
          ref={terminalRef}
          style={{
            background: '#1f1f1f',
            color: '#0f0',
            padding: '16px',
            borderRadius: '4px',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            height: '500px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {history.length === 0 ? (
            <div style={{ color: '#666' }}>
              BufferWatch Terminal v1.0
              <br />
              Type commands and press Enter or click Send
              <br />
              <br />
            </div>
          ) : (
            renderTerminalContent()
          )}
        </div>

        <Space.Compact style={{ width: '100%', marginTop: 16 }}>
          <Input
            placeholder="Enter command..."
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onPressEnter={handleSendCommand}
            disabled={!connected}
            size="large"
            prefix={<span style={{ color: '#0f0' }}>$</span>}
            style={{
              fontFamily: 'Courier New, monospace',
              background: '#1f1f1f',
              color: '#0f0',
              border: '1px solid #333',
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendCommand}
            disabled={!connected}
            size="large"
          >
            Send
          </Button>
        </Space.Compact>
      </Card>
    </div>
  );
}

export default LiveTerminal;
