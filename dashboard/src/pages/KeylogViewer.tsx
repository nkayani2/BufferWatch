import { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, Tag } from 'antd';
import { ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import { KeylogEntry } from '../types';
import dayjs from 'dayjs';

const { Title } = Typography;

function KeylogViewer() {
  const [logs, setLogs] = useState<KeylogEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleClear = () => {
    setLogs([]);
  };

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Keystrokes',
      dataIndex: 'keys',
      key: 'keys',
      render: (keys: string) => (
        <code style={{ background: '#1f1f1f', padding: '4px 8px', borderRadius: '4px' }}>
          {keys}
        </code>
      ),
    },
    {
      title: 'Length',
      dataIndex: 'keys',
      key: 'length',
      render: (keys: string) => <Tag>{keys.length} chars</Tag>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Keylogger Viewer</Title>
        <div>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={refreshing}
            style={{ marginRight: 8 }}
          >
            Refresh
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleClear} danger>
            Clear
          </Button>
        </div>
      </div>

      <Card style={{ marginTop: 24 }}>
        <Table
          dataSource={logs}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 20 }}
          locale={{
            emptyText:
              'No keylog data available. Use "Start Keylogger" command to begin capturing.',
          }}
        />
      </Card>
    </div>
  );
}

export default KeylogViewer;
