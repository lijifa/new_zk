import KeepAliveTabs from '@/components/KeepAliveTabs';
import IndexMenu from '@/components/Menu';
import HeaderMenu from '@/components/Menu/HeaderMenu';
import RightContent from '@/components/RightContent';
import { Outlet, useModel } from '@umijs/max';
import { Layout } from 'antd';
import { AliveScope } from 'react-activation';
import baseStyle from './index.less';
const { Header, Sider, Content } = Layout;
// const { pathname } = useLocation;
const App = () => {
  // const outlet = useOutlet()
  const { collapsed } = useModel('global');
  // 是否全屏
  const { full } = useModel('isFullModel', (model) => ({ full: model.isFull }));

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header
          className={baseStyle.layoutHeader}
          style={{
            padding: 0,
            display: full ? 'none' : 'flex',
          }}
        >
          <div className={baseStyle.logo} />
          <HeaderMenu />
          <RightContent />
        </Header>
        <Layout className={baseStyle.siteLayout}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={baseStyle.layoutSider}
            style={{ display: full ? 'none' : 'block' }}
          >
            <IndexMenu name="李吉发" />
          </Sider>
          <Content className={baseStyle.layoutContent}>
            {/* <HeadTags /> */}
            <KeepAliveTabs />
            <AliveScope>
              <Outlet />
            </AliveScope>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
