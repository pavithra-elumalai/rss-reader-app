import React from 'react';
import { Tooltip, Switch } from 'antd';
import { WifiOutlined,BulbOutlined,MoonFilled } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import useNetworkStatus from '../hooks/useNetworkStatus';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const isOnline = useNetworkStatus();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: darkMode ? '#1f1f1f' : '#f5f5f5',
      color: darkMode ? '#fff' : '#000',
      borderBottom: darkMode ? '1px solid #333' : '1px solid #ddd'
    }}>
      <h1 style={{ margin: 0, fontSize: '20px' }}>RSS Reader</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Tooltip title={isOnline ? "Online Mode" : "Offline Mode"}>
      <WifiOutlined style={{ 
        fontSize: '18px', 
        color: isOnline 
          ? (darkMode ? '#00ff88' : '#007bff') 
          : (darkMode ? '#ff4d4f' : '#d9363e') 
      }} />
    </Tooltip>
         <Tooltip title={darkMode ? 'Dark Mode' : 'Light Mode'}>
      <Switch
        size="medium"
        checked={darkMode}
        onChange={toggleTheme}
        checkedChildren={<MoonFilled style={{ fontSize: 14 }} />}
        unCheckedChildren={<BulbOutlined style={{ fontSize: 14 }} />}
      />
    </Tooltip>
      </div>
    </div>
  );
};

export default Header;
