//经济运行分析
import Analyseheader from '@/components/Analyseheader';
import Chart from '@/components/Echarts';
import { PageHeader } from '@/components/SubHeader';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import Searchheader from './Searchheader'
import React, { memo } from 'react';
import ConCom from './ConCom';
import styles from './index.less';
let Data = [
  {
    name: '优良',
    //value: 0,
  },
  {
    name: '一般',
   // value: 0,
  },
  {
    name: '极差',
   // value: 0,
  },
  {
    name: '超载',
   // value: 0,
  },
  {
    name: '离线',
   // value: 0,
  },
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const Distributing = memo(() => {
  const dateFormat = 'YYYY/MM/DD';
  return (
    <>
      <PageHeader title="变配站耗电分析" />
      <div className={styles.moduleContent}>
        <Searchheader
        time = {true}
        type ={ 3}
        
        />
      
        <div className={styles.module}>
          <div className={styles.moduleLeft}>
            <Analyseheader title="经济运行时间占比" rightshow={false} />
            <div className={styles.earchs}>
              <ConCom
                ID="main"
                Data={Data}
                centerTitle="总运行天数"
                centertest="--天"
                unit='天'
              />
            </div>
          </div>
          <div className={styles.moduleRight}>
            <Analyseheader title="变电站日负荷趋势图" rightshow={true} />
            <div className={styles.earchsR}>
              <Chart
                type="LineChart"
                XDATA={['2022-09-26', '2022-09-29', '2022-10-01', '2022-10-05', '2022-10-09', '2022-10-14', '2022-10-18']}
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
          </div>
        </div>
        <div className={styles.moduleB}>
          <div className={styles.bars}>
            <div className={styles.barscontent}>
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
              <span className={styles.toolbarTip}>
                <i className={styles.green}></i>
                优良：日负荷率在57%至77%内
                <i className={styles.yellow}></i>
                一般：日负荷率大于77%至90%或处于30%至57%
                <i className={styles.overload}></i>
                超载：日负荷率大于90%
                <i className={styles.red}></i>
                极差：日负荷率小于30%
                总有功功率、总无功功率、总视在功率、日负荷率都为24小时平均值。
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Distributing;
