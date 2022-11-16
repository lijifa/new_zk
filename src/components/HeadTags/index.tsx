import { FullscreenOutlined, RedoOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import { Button, Col, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import Tab from './Tab';
const HeadTags: React.FC = () => {
  // 是否全屏
  const { full, ScreenOpen, ScreenClose } = useModel(
    'isFullModel',
    (model: any) => ({
      full: model.isFull,
      ScreenOpen: model.ScreenOpen,
      ScreenClose: model.screenClose,
    }),
  );
  const { tags } = useModel('menuModel');
  // 本地路由信息
  const location = useLocation();

  // 刷新页面内容
  const Refresh = () => {
    // location.replace(history.location.pathname);
  };
  // 全屏当前页面
  const ScreenAll = () => {
    if (full) {
      return (
        <Button
          type="text"
          style={{ color: '#A5EAFF' }}
          size="small"
          icon={<FullscreenOutlined />}
          onClick={ScreenClose}
        >
          全屏
        </Button>
      );
    } else {
      return (
        <Button
          type="text"
          style={{ color: '#A5EAFF' }}
          size="small"
          icon={<FullscreenOutlined />}
          onClick={ScreenOpen}
        >
          全屏
        </Button>
      );
    }
  };

  // 没有页签的时候跳转到首页
  useEffect(() => {
    if (tags.length === 0) {
      history.push('/home');
    }
  }, [tags.length]);

  return (
    <Row wrap={false} className={styles.tabTools}>
      <Col flex="1" className={styles.tabList}>
        <ul>
          <li
            key={'home'}
            className={`${styles.tabItem} ${
              location.pathname === '/home' ? styles.active : ''
            }`}
            onClick={() => history.push('/home')}
          >
            <span>{'首页'}</span>
          </li>
          <Tab />
        </ul>
      </Col>
      <Col className={styles.headRight}>
        <Space>
          <Button
            type="text"
            style={{ color: '#A5EAFF' }}
            size="small"
            icon={<RedoOutlined />}
            onClick={() => Refresh()}
          >
            刷新
          </Button>
          {ScreenAll()}
        </Space>
      </Col>
    </Row>
  );
};
export default HeadTags;
