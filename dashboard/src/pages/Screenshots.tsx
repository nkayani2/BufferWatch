import { useState } from 'react';
import { Card, Typography, Empty, Image, Row, Col, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Screenshot } from '../types';

const { Title, Text } = Typography;

function Screenshots() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Screenshots Gallery</Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={refreshing}
        >
          Refresh
        </Button>
      </div>

      <Card style={{ marginTop: 24 }}>
        {screenshots.length === 0 ? (
          <Empty
            description={
              <span>
                No screenshots captured yet.
                <br />
                <Text type="secondary">Use the "Take Screenshot" command to capture screens.</Text>
              </span>
            }
          />
        ) : (
          <Row gutter={[16, 16]}>
            {screenshots.map((screenshot) => (
              <Col xs={24} sm={12} md={8} lg={6} key={screenshot.id}>
                <Card
                  hoverable
                  cover={<Image alt={screenshot.filename} src={screenshot.url} />}
                >
                  <Card.Meta
                    title={screenshot.filename}
                    description={new Date(screenshot.timestamp).toLocaleString()}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </div>
  );
}

export default Screenshots;
