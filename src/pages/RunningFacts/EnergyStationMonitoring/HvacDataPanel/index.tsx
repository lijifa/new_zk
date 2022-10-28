import BoardBack from '@/components/BoardBack';
import Item_H, { Item_V } from '@/components/BoardItem';
import Chart from '@/components/Echarts';
import SubHeader from '@/components/SubHeader';
import { Radio, Select } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const { Option } = Select;

const data: any = [
  {
    label: '光合谷',
  },
  {
    label: '武清人民医院',
  },
];

const HvacDataPanel = () => {
  const [warn, setWarn] = useState<String>('报警');

  return (
    <div className={styles.content}>
      <SubHeader
        title={'暖通数据看板'}
        leftItem={
          <>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
          </>
        }
      />

      <div
        style={{ height: '100%', padding: '0 10px' }}
        className={styles.container}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '180px',
          }}
        >
          <div style={{ width: '22%' }}>
            <BoardBack
              title={'能耗统计'}
              subTitle={'单位:kgce'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/icon2.png')}
                      />
                    }
                    title={'当日计划能耗'}
                    num={22.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/icon1.png')}
                      />
                    }
                    title={'当日能耗'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/icon1.png')}
                      />
                    }
                    title={'昨日能耗'}
                    num={222.3}
                  />
                </>
              }
            />
          </div>
          <div style={{ width: '30%' }}>
            <BoardBack
              title={'当日分项能耗'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E1.png')}
                      />
                    }
                    title={'电能耗(kw.h)'}
                    num={22.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E3.png')}
                      />
                    }
                    title={'水能耗(m³)'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E4.png')}
                      />
                    }
                    title={'天然气(Nm³)'}
                    num={'0.00'}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E2.png')}
                      />
                    }
                    title={'耗冷/热量(GJ)'}
                    num={222.3}
                  />
                </>
              }
            />
          </div>
          <div style={{ width: '30%' }}>
            <BoardBack
              title={'昨日分项能耗'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E1.png')}
                      />
                    }
                    title={'电能耗(kw.h)'}
                    num={22.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E3.png')}
                      />
                    }
                    title={'水能耗(m³)'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E4.png')}
                      />
                    }
                    title={'天然气(Nm³)'}
                    num={'0.00'}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/HvacDataPanel/icon/E2.png')}
                      />
                    }
                    title={'耗冷/热量(GJ)'}
                    num={222.3}
                  />
                </>
              }
            />
          </div>
          <div style={{ width: '15%' }}>
            <BoardBack
              title={'室外环境'}
              content={
                <>
                  <div className={styles.OutBox}>
                    <div className={styles.topBox}>
                      <div className={styles.Tem}>
                        环境温度
                        <span>
                          <span>12~22</span>℃
                        </span>
                      </div>
                      <div className={styles.Hum}>
                        环境湿度
                        <span>
                          <span>24</span>%
                        </span>
                      </div>
                    </div>
                    <div className={styles.Wind}>
                      风力
                      <span>{'0-3级 < 5.4m/s'}</span>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </div>

        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            height: 'calc(100% - 560px)',
          }}
        >
          <div style={{ width: '100%' }}>
            <BoardBack
              title={'系统运行曲线'}
              content={
                <div style={{ width: '100%', height: '100%' }}>
                  <Chart
                    type="Line"
                    XDATA={[1, 2, 3, 4, 5]}
                    YDATA={[[1, 3, 4, 56, 7]]}
                  />
                </div>
              }
            />
          </div>
        </div>
        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            height: '230px',
          }}
        >
          <div style={{ width: '27%' }}>
            <BoardBack
              title={'设备统计'}
              content={
                <>
                  <div>
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/HvacDataPanel/icon/icon10.png')}
                        />
                      }
                      title={'通用设备'}
                      num={22.2}
                    />
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/HvacDataPanel/icon/icon12.png')}
                        />
                      }
                      title={'摄像头'}
                      num={22.2}
                      line={'15%'}
                    />
                  </div>
                  <div>
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/HvacDataPanel/icon/icon11.png')}
                        />
                      }
                      title={'传感器设备'}
                      num={22.2}
                    />
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/HvacDataPanel/icon/icon13.png')}
                        />
                      }
                      title={'末端设备'}
                      num={22.2}
                      line={'15%'}
                    />
                  </div>
                </>
              }
            />
          </div>
          <div style={{ width: '27%' }}>
            <BoardBack
              title={'告警统计'}
              content={
                <>
                  <div>
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/PowerDataPanel/icon/icon5.png')}
                        />
                      }
                      title={'系统报警'}
                      num={<span style={{ color: '#FF4444' }}>20</span>}
                    />
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/PowerDataPanel/icon/icon7.png')}
                        />
                      }
                      title={'报警规则'}
                      num={22.2}
                      line={'15%'}
                    />
                  </div>
                  <div>
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/PowerDataPanel/icon/icon6.png')}
                        />
                      }
                      title={'系统预警'}
                      num={<span style={{ color: '#FFE037' }}>22.2</span>}
                    />
                    <Item_V
                      icon={
                        <img
                          src={require('@/assets/PowerDataPanel/icon/icon7.png')}
                        />
                      }
                      title={'预警规则'}
                      num={22.2}
                      line={'15%'}
                    />
                  </div>
                </>
              }
            />
          </div>
          <div style={{ width: '44%' }}>
            <BoardBack
              title={'当前告警汇总'}
              subTitle={
                <>
                  <Radio.Group
                    value={warn}
                    onChange={(e) => {
                      setWarn(e.target.value);
                    }}
                  >
                    <Radio.Button value="报警">报警</Radio.Button>
                    <Radio.Button value="预警">预警</Radio.Button>
                  </Radio.Group>
                </>
              }
              content={<></>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HvacDataPanel;
