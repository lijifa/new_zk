import Analyseheader from '@/components/Analyseheader';
import Chart from '@/components/Echarts';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button, Tabs } from 'antd';
import React, { memo } from 'react';
import styles from './index.less';
let list = [
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
];
//右侧样式
let RightList = [
  {
    label: '平均频率',
    Children: (
      <>
        <div className={styles.earchs}>
          <Chart
            type="LineChart"
            XDATA={[
              '2022-09-26',
              '2022-09-29',
              '2022-10-01',
              '2022-10-05',
              '2022-10-09',
              '2022-10-14',
              '2022-10-18',
            ]}
            YDATA={[
              [1, 2, 3, 4, 5, 6, 8],
              [8, 1, 6, 3, 8, 5, 6],
              [5, 6, 5, 8, 1, 3, 2],
            ]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ', '#268CFF', '#f7d18a']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '三相电压',
    Children: (
      <>
        <div>我是页面二</div>
      </>
    ),
  },
  {
    label: '三相电压不平衡度',
    Children: (
      <>
        <div>我是页面三</div>
      </>
    ),
  },
  {
    label: '三相电流不平衡度',
    Children: (
      <>
        <div>我是页面四</div>
      </>
    ),
  },
];
const items = RightList.map((item: any, index: any) => {
  return {
    label: item.label,
    key: index,
    children: item.Children,
  };
});

const PowerQuality = memo(() => {
  return (
    <>
      <PageHeader title="电能质量分析" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} type={3} list={list} />
        <div className={styles.module}>
          <div className={styles.left}>
            <Analyseheader title="电能质量时间分布" />
          </div>
          <div className={styles.right}>
            <Tabs type="card" items={items} destroyInactiveTabPane />
          </div>
        </div>
        <div className={styles.moduleB}>
          <div className={styles.bars}>
            <div className={styles.barsContent}>
              <Button
                type="primary"
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  height: '30px',
                }}
              >
                导出
              </Button>
              <span className={styles.barsLeft}>
                <img src={require('./img/tipRed.png')} />

                {
                  ' 电能质量不合格：平均频率<49.5或>50.5   三相电压<198或>235   三相平均电压不平衡度>5%   三相平均电流不平衡度>10%'
                }
              </span>
            </div>
          </div>
          <div className={styles.table}></div>
        </div>
      </div>
    </>
  );
});

export default PowerQuality;
