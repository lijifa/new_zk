import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import baseStyle from './baseLayout.less';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={baseStyle.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className={baseStyle.siteLayout}>
        <Header
          className={baseStyle.siteLayoutBackground}
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: baseStyle.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className={baseStyle.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;