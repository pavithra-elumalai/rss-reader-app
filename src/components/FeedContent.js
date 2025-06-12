import React, { useContext } from 'react';
import { FeedContext } from '../context/FeedContext';
import { Card, Typography, List } from 'antd';
import { useTheme } from '../context/ThemeContext';

const { Title, Paragraph, Link } = Typography;

const FeedContent = () => {
  const { articles, feeds, selectedFeedId} = useContext(FeedContext);
  const { darkMode } = useTheme();
 
  const selectedFeed = feeds.find(feed => feed.id === selectedFeedId);

  const backgroundColor = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#000000';
  const cardBackground = darkMode ? '#2a2a2a' : '#fafafa';

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: '100%', backgroundColor, color: textColor }}>
      {selectedFeed && <Title level={3} style={{ color: textColor }}>{selectedFeed.title}</Title>}
      <List
        dataSource={articles}
        renderItem={item => (
          <Card style={{ marginBottom: '16px', backgroundColor: cardBackground }} hoverable>
            <Title level={4} style={{ color: textColor }}>{item.title}</Title>
            <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ color: textColor }}>
              {item.content}
            </Paragraph>
            <Link href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#69b1ff' : '#1890ff' }}>
              Read More
            </Link>
          </Card>
        )}
      />
    </div>
  );
};

export default FeedContent;
