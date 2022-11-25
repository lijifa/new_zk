import { BackwardOutlined, ForwardOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import { Button, Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import IconFont from '../IconFont';
import styles from './index.less';
import Tab from './Tab';
const HeadTags: React.FC = () => {
  const [float, setFloat] = useState(true);
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
          icon={<IconFont type="icon-zhankai2" />}
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
          icon={<IconFont type="icon-zhankai1" />}
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
        <span className={styles.tab_button} onClick={() => setFloat(false)}>
          <BackwardOutlined />
        </span>
        <ul>
          <div
            className={styles.content}
            style={{
              float: float ? 'right' : 'left',
            }}
          >
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
          </div>
        </ul>
        <span
          className={styles.tab_button}
          onClick={() => setFloat(true)}
          style={{
            marginLeft: 'auto',
            borderLeft: 'solid 1px rgba(157, 203, 255, 0.3)',
          }}
        >
          <ForwardOutlined />
        </span>
      </Col>
      <Col className={styles.headRight}>
        <Space>
          <Button
            type="text"
            style={{ color: '#A5EAFF' }}
            size="small"
            icon={<IconFont type="icon-gengxin" />}
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
