import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Typography } from 'antd';
import {
  UserOutlined,
  CloudServerOutlined,
  CodeOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import wsService from '../services/websocket';
import { Command } from '../types';
import dayjs from 'dayjs';

const { Title } = Typography;

function Dashboard() {
  const [connected, setConnected] = useState(false);
  const [commandCount, setCommandCount] = useState(0);
  const [recentCommands, setRecentCommands] = useState<Command[]>([]);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'tcp_connected' || message.type === 'connection_status') {
        setConnected(message.connected || message.type === 'tcp_connected');
      } else if (message.type === 'tcp_disconnected') {
        setConnected(false);
      } else if (message.type === 'tcp_response') {
        setCommandCount((prev) => prev + 1);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (time: string) => dayjs(time).format('HH:mm:ss'),
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Dashboard Overview</Title>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="C2 Server Status"
              value={connected ? 'Online' : 'Offline'}
              valueStyle={{ color: connected ? '#3f8600' : '#cf1322' }}
              prefix={<CloudServerOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Connected Clients"
              value={connected ? 1 : 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: connected ? '#3f8600' : '#999' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Commands Executed"
              value={commandCount}
              prefix={<CodeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Uptime"
              value={connected ? 'Active' : 'Inactive'}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" style={{ marginTop: 24 }}>
        <Table
          dataSource={recentCommands}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: 'No recent activity' }}
        />
      </Card>

      <Card title="System Information" style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p>
              <strong>Proxy Server:</strong> ws://localhost:8080
            </p>
            <p>
              <strong>C2 Server:</strong> 127.0.0.1:50005
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Status:</strong>{' '}
              <Tag color={connected ? 'green' : 'red'}>
                {connected ? 'Connected' : 'Disconnected'}
              </Tag>
            </p>
            <p>
              <strong>Mode:</strong> Security Research
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Dashboard;
