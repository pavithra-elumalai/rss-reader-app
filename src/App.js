import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/Header';
import FeedContent from './components/FeedContent';
import { ThemeProvider } from './context/ThemeContext';
import { FeedProvider } from './context/FeedContext'; 
import 'antd/dist/reset.css';

const { Sider, Header, Content } = Layout;

const App = () => {
  return (
    <FeedProvider> 
      <ThemeProvider>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <Sider width={390}>
            <Sidebar />
          </Sider>

          {/* Main Area */}
          <Layout>
            {/* Header */}
            <Header style={{ padding: '0' }}>
              <HeaderBar />
            </Header>

            {/* Content */}
            <Content style={{ padding: '0' }}>
              <FeedContent />
            </Content>
          </Layout>
        </Layout>
      </ThemeProvider>
    </FeedProvider>
  );
};

export default App;
