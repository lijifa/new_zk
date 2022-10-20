import { getWeatherBySiteId } from '@/services/zg-base/common';
import { RightOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useInterval } from 'ahooks';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import TopMenu from '../Menu/TopMenu';
import styles from './index.less';

const SubHead: React.FC = () => {
  const [currenttTime, setCurrenttTime] = useState(
    dayjs().format('YYYY-MM-DD HH:mm'),
  );
  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('--');
  const { menuItem } = useModel('menuModel');
  // 获取天气
  const getWeather = async () => {
    let res = await getWeatherBySiteId(13);
    setWeather(res.data.dayWeather);
    setTemperature(res.data.temperature);
  };

  // 获取标题
  const getTitle = () => {
    if (!menuItem.url) return;
    const params = new URLSearchParams(
      new URL(`https://${menuItem.url}`).search,
    ).get('titlename');
    if (params) {
      return params;
    }
    return '华德智慧能源';
  };

  const isOpen = () => {
    setVisible(!visible);
  };

  // 使用定时循环器 更新时间天气
  useInterval(() => {
    let nowTime = dayjs().format('YYYY-MM-DD HH:mm');
    let weekIndex = dayjs().day();
    let weekArr = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ];
    setCurrenttTime(nowTime + ' ' + weekArr[weekIndex]);
    getWeather();
  }, 60000);

  useEffect(() => {
    getWeather();
  }, []);

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
        <Col className={styles.headCenter}>
          <img src="/image/subHead/titlebgleft.png" />
          <div className={styles.headTitle}>{getTitle()}</div>
          <img src="/image/subHead/titlebgright.png" />
        </Col>
        <Col flex="1" className={styles.headRight}>
          {currenttTime} {weather} 气温{' '}
          <span style={{ fontWeight: 'bold', color: 'yellow' }}>
            {temperature}℃
          </span>
        </Col>
      </Row>
      <TopMenu isShow={visible} isShowFun={() => isOpen()} />
    </>
  );
};
export default SubHead;
