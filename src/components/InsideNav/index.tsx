import { RightOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import TopMenu from '../Menu/TopMenu';
import styles from './index.less';

const InsideNav: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { menuItem } = useModel('menuModel');

  const isOpen = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Row wrap={false} className={styles.headBox}>
        <Col flex="1" className={styles.headLeft}>
          <div
            className={styles.leftBtn}
            style={{ display: menuItem.menuType === '1' ? 'none' : 'block' }}
            onClick={() => isOpen()}
          >
            站内导航 <RightOutlined />
          </div>
        </Col>
      </Row>
      <TopMenu isShow={visible} isShowFun={() => isOpen()} />
    </>
  );
};
export default InsideNav;
