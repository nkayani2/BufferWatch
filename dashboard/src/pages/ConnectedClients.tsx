import { useEffect, useState } from 'react';
import { Card, Table, Tag, Typography, Badge } from 'antd';
import { Client } from '../types';
import wsService from '../services/websocket';
import dayjs from 'dayjs';

const { Title } = Typography;

function ConnectedClients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'tcp_connected' || message.type === 'connection_status') {
        const isConnected = message.connected || message.type === 'tcp_connected';
        if (isConnected) {
          setClients([
            {
              id: '1',
              ip: '127.0.0.1',
              status: 'online',
              lastSeen: new Date().toISOString(),
              connectedAt: new Date().toISOString(),
            },
          ]);
        } else {
          setClients([]);
        }
      } else if (message.type === 'tcp_disconnected') {
        setClients([]);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'online' ? 'success' : 'error'} text={status.toUpperCase()} />
      ),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Connected At',
      dataIndex: 'connectedAt',
      key: 'connectedAt',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Last Seen',
      dataIndex: 'lastSeen',
      key: 'lastSeen',
      render: (time: string) => dayjs(time).format('HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Tag color="blue" style={{ cursor: 'pointer' }}>
          View Details
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Connected Clients</Title>

      <Card style={{ marginTop: 24 }}>
        <Table
          dataSource={clients}
          columns={columns}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: 'No clients connected' }}
        />
      </Card>
    </div>
  );
}

export default ConnectedClients;
