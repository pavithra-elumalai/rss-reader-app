import React, { useState, useEffect, useContext } from 'react';
import { Menu, Input, Avatar, Typography, Divider, Button, Modal, Form } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTheme } from '../context/ThemeContext';
import { FeedContext } from '../context/FeedContext';

dayjs.extend(relativeTime);
const { Text } = Typography;

const Sidebar = () => {
  const { feeds, selectFeed, selectedFeedId, loadFeeds, addFeed } = useContext(FeedContext);
  const { darkMode } = useTheme();

  const [searchValue, setSearchValue] = useState('');
  const [filteredFeeds, setFilteredFeeds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Filter feeds based on search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredFeeds(
        feeds?.filter(feed =>
          feed.title?.toLowerCase().includes(searchValue.toLowerCase())
        ) || []
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchValue, feeds]);

  // Load feeds into local state when changed
  useEffect(() => {
    setFilteredFeeds(Array.isArray(feeds) ? feeds : []);
  }, [feeds]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddFeed = () => {
    form.validateFields()
      .then(async (values) => {
        await addFeed(values);
        loadFeeds();
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err) => console.error('Form validation error:', err));
  };

  return (
    <>
      <Menu
        mode="vertical"
        selectedKeys={[`feed-item-${selectedFeedId}`]}
        style={{
          overflowY: 'auto',
          backgroundColor: darkMode ? '#000' : '#fff',
          color: darkMode ? '#fff' : '#000',
          height: '100%',
          borderRight: 0,
        }}
      >
        <Menu.Item key="search" disabled>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            allowClear
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </Menu.Item>

        <Menu.Item
          key="add-feed"
          icon={<PlusOutlined />}
          style={{
            backgroundColor: darkMode ? '#000' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
          onClick={showModal}
        >
          Add Feed
        </Menu.Item>

        {filteredFeeds.map(feed => (
          <React.Fragment key={`feed-${feed.id}`}>
            <Menu.Item
              key={`feed-item-${feed.id}`}
              onClick={() => selectFeed(feed.id)}
              style={{
                backgroundColor:
                  selectedFeedId === feed.id
                    ? (darkMode ? '#1f1f1f' : '#e6f7ff')
                    : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar src={feed.image} shape="square" size={32} />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <Text
                    strong
                    ellipsis={{ tooltip: feed.title }}
                    style={{
                      color: darkMode ? '#fff' : '#111',
                      maxWidth: '160px',
                    }}
                  >
                    {feed.title}
                  </Text>
                  <Text style={{ color: darkMode ? '#ccc' : '#666', fontSize: 12 }}>
                    {dayjs(feed.publishedAt).fromNow()}
                  </Text>
                </div>
              </div>
            </Menu.Item>
            <Divider style={{ margin: '4px 0', borderColor: darkMode ? '#444' : '#ddd' }} />
          </React.Fragment>
        ))}
      </Menu>

      <Modal
        title="Add New RSS Feed"
        open={isModalVisible}
        onOk={handleAddFeed}
        onCancel={handleCancel}
        okText="Add Feed"
        style={{ backgroundColor: darkMode ? '#1f1f1f' : '#fff' }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Feed Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="e.g., My Tech Blog" />
          </Form.Item>
          <Form.Item
            label="RSS Link"
            name="link"
            rules={[{ required: true, message: 'Please enter a valid RSS link' }]}
          >
            <Input placeholder="https://example.com/rss.xml" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Sidebar;
