import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Badge, Typography, Space } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  CodeOutlined,
  PictureOutlined,
  FileTextOutlined,
  ConsoleSqlOutlined,
  WifiOutlined,
  DisconnectOutlined,
} from '@ant-design/icons';
import wsService from './services/websocket';
import { WSMessage } from './types';

// Pages
import Dashboard from './pages/Dashboard';
import ConnectedClients from './pages/ConnectedClients';
import CommandCenter from './pages/CommandCenter';
import Screenshots from './pages/Screenshots';
import KeylogViewer from './pages/KeylogViewer';
import LiveTerminal from './pages/LiveTerminal';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleMessage = (message: WSMessage) => {
      if (message.type === 'connection_status' || message.type === 'tcp_connected') {
        setConnected(message.connected || message.type === 'tcp_connected');
      } else if (message.type === 'tcp_disconnected') {
        setConnected(false);
      }
    };

    wsService.addMessageHandler(handleMessage);
    wsService.connect();

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard Overview',
    },
    {
      key: '/clients',
      icon: <TeamOutlined />,
      label: 'Connected Clients',
    },
    {
      key: '/command',
      icon: <CodeOutlined />,
      label: 'Command Center',
    },
    {
      key: '/screenshots',
      icon: <PictureOutlined />,
      label: 'Screenshots Gallery',
    },
    {
      key: '/keylogger',
      icon: <FileTextOutlined />,
      label: 'Keylogger Viewer',
    },
    {
      key: '/terminal',
      icon: <ConsoleSqlOutlined />,
      label: 'Live Terminal',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Title level={3} style={{ color: '#fff', margin: 0 }}>
            🛡️ BufferWatch
          </Title>
          <Space style={{ marginTop: 10 }}>
            <Badge status={connected ? 'success' : 'error'} />
            {connected ? (
              <span style={{ color: '#52c41a' }}>
                <WifiOutlined /> Connected
              </span>
            ) : (
              <span style={{ color: '#ff4d4f' }}>
                <DisconnectOutlined /> Disconnected
              </span>
            )}
          </Space>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout style={{ marginLeft: 250 }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #303030',
          }}
        >
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            Security Research Tool - Educational Purpose Only
          </Title>
        </Header>

        <Content style={{ margin: '24px', minHeight: 280 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ConnectedClients />} />
            <Route path="/command" element={<CommandCenter />} />
            <Route path="/screenshots" element={<Screenshots />} />
            <Route path="/keylogger" element={<KeylogViewer />} />
            <Route path="/terminal" element={<LiveTerminal />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
