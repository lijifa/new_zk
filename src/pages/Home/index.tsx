import Chart from '@/components/Echarts';
import SubHeader from '@/components/SubHeader';
import { Select } from 'antd';
import React, { memo, useState } from 'react';
import { IconD1, IconD2, IconD3, IconD4, IconD5, IconD6 } from './constant';
import HeaderTitle from './HeaderTitle';
import Image from './img/0c56f05e81c134631638b2c84aa90546.jpg';
import styles from './index.less';
const { Option } = Select;

const data: any = [
  {
    label: '静海政府能源管理',
  },
  {
    label: '武清人民医院',
  },
];
//项目能耗
function RightList(title: string, num: number) {
  return (
    <>
      <div className={styles.ListItem}>
        <div className={styles.ListItemTitle}>{title}</div>
        <div className={styles.ListItemText}>{num}</div>
      </div>
    </>
  );
}
//运维状态
function Maintenance(img: string, title: string, Mnum: number, unit: string) {
  return (
    <>
      <div className={styles.deviceCustomItem}>
        <img src={img} />
        <div className={styles.deviceCustomTitle}>{title}</div>
        <div className={styles.deviceCustomText}>
          <span>{Mnum}</span>
          {unit}
        </div>
      </div>
    </>
  );
}
//运维状态
function MaintenanceI(img: string, title: string, Mnum: number, unit: string) {
  return (
    <>
      <div className={styles.deviceCustomItem}>
        <img src={img} />
        <div className={styles.deviceCustomTitle}>{title}</div>
        <div className={styles.deviceCustomText}>
          <span style={{ color: 'rgba(255, 255, 255, 1)' }}>{Mnum}</span>
          {unit}
        </div>
      </div>
    </>
  );
}
const HomePage = memo(() => {
  const [Index, setIndex] = useState<number>(0);

  function Thead() {
    const title = ['用电量', '用水量', '天然气'];
    const changeBtn = (index: number) => {
      return () => {
        setIndex(index);
      };
    };
    return title.map((item, index) => {
      return (
        <div
          key={index}
          onClick={changeBtn(index)}
          style={{
            color: index === Index ? 'rgba(0, 255, 255, 1)' : '',
            border: index === Index ? '1px solid rgba(0, 255, 255, 1)' : '',
          }}
        >
          {item}
        </div>
      );
    });
  }
  function Rightpage(Index: number) {
    let result;
    switch (Index) {
      case 0:
        result = (
          <>
            <div
              className={styles.echartsContent}
              style={{ height: '100%', width: '100%' }}
            >
              <Chart
                type="Line"
                XDATA={[
                  '00:00',
                  '01:00',
                  '02:00',
                  '03:00',
                  '04:00',
                  '05:00',
                  '06:00',
                  '07:00',
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                ]}
                YDATA={[[1, 2, 3, 4, 5, 6, 8, 11, 25, 10, 9, 6, 8, 3, 4, 6]]}
                LineStyleColor={['rgba(90,196,255)']}
                LineTooltipShow
                LineLegendColor={'#666'}
                LineColor={'rgba(44,72,114)'}
                LineXtextColor={'rgba(90,196,255)'}
                LineYtextColor={'rgba(90,196,255)'}
                LineYAxisName="Nm³"
                LineGrid={{
                  left: '3%',
                  right: '4%',
                  top: '20%',
                  bottom: '14%',
                }}
              />
            </div>
          </>
        );
        break;
      case 1:
        result = (
          <>
            <div
              className={styles.echartsContent}
              style={{ height: '100%', width: '100%' }}
            >
              <Chart
                type="Line"
                XDATA={[
                  '00:00',
                  '01:00',
                  '02:00',
                  '03:00',
                  '04:00',
                  '05:00',
                  '06:00',
                  '07:00',
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                ]}
                YDATA={[[1, 2, 3, 4, 5, 6, 8, 11, 25, 10, 9, 6, 8, 3, 4, 6]]}
                LineStyleColor={['rgba(90,196,255)']}
                LineTooltipShow
                LineLegendColor={'#666'}
                LineColor={'rgba(44,72,114)'}
                LineXtextColor={'rgba(90,196,255)'}
                LineYtextColor={'rgba(90,196,255)'}
                LineYAxisName="Nm³"
                LineGrid={{
                  left: '3%',
                  right: '4%',
                  top: '20%',
                  bottom: '14%',
                }}
              />
            </div>
          </>
        );
        break;
      case 2:
        result = (
          <>
            <div
              className={styles.echartsContent}
              style={{ height: '100%', width: '100%' }}
            >
              <Chart
                type="Line"
                XDATA={[
                  '00:00',
                  '01:00',
                  '02:00',
                  '03:00',
                  '04:00',
                  '05:00',
                  '06:00',
                  '07:00',
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                ]}
                YDATA={[[1, 2, 3, 4, 5, 6, 8, 11, 25, 10, 9, 6, 8, 3, 4, 6]]}
                LineStyleColor={['rgba(90,196,255)']}
                LineTooltipShow
                LineLegendColor={'#666'}
                LineColor={'rgba(44,72,114)'}
                LineXtextColor={'rgba(90,196,255)'}
                LineYtextColor={'rgba(90,196,255)'}
                LineYAxisName="m³"
                LineGrid={{
                  left: '3%',
                  right: '4%',
                  top: '20%',
                  bottom: '14%',
                }}
              />
            </div>
          </>
        );
        break;
      default:
        break;
    }
    return result;
  }
  return (
    <div className={styles.main}>
      <SubHeader
        title={'天津轨道集团光合谷园'}
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
      <div className={styles.maincontent}>
        <div className={styles.module} style={{ marginRight: '10px' }}>
          <div className={styles.mainModule} style={{ height: '130px' }}>
            <HeaderTitle Title="气象数据" />
            <div className={styles.outDoor}>
              <div className={styles.outDoorItem1}>
                <span className={styles.outDoorTitle}>室外温度</span>
                <span className={styles.outDoorText}>
                  <em>5</em>℃
                </span>
              </div>
              <div className={styles.outDoorItem2}>
                <span className={styles.outDoorTitle}>室外温度</span>
                <span className={styles.outDoorText}>
                  <em>86</em> %
                </span>
              </div>
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '0.9', marginTop: '10px' }}
          >
            <HeaderTitle Title="实时能耗" />
            <div className={styles.energyCost}>
              <div className={styles.Costmodule}>
                <img src={require('./img/iconL1.png')} />
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>当日耗电量</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>kW.h
                  </div>
                </div>
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>电费用</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>元
                  </div>
                </div>
              </div>
              <div className={styles.Costmodule}>
                <img src={require('./img/iconL2.png')} />
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>当日水耗量</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>m³
                  </div>
                </div>
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>水费用</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>元
                  </div>
                </div>
              </div>
              <div className={styles.Costmodule}>
                <img src={require('./img/iconL3.png')} />
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>当日天然气</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>Nm³
                  </div>
                </div>
                <div className={styles.energyImg}>
                  <div className={styles.energyCostTitle}>天然气费用</div>
                  <div className={styles.energyCostNum}>
                    <em>899.65</em>元
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '1.1', marginTop: '10px' }}
          >
            <HeaderTitle Title="项目简介" />
            <div className={styles.projectIntroduce}>
              <p>
                天津光合谷旅游度假区位于天津市静海区团泊新城东区，是天津轨道集团开发的一体化园区，距中心城区不到20公里，
                致力于建设成为以现代服务业和生态旅游业为主导，文化旅游、温泉度假、会议培训、有机体验于一体的大型文化休闲产业园区，将4500亩用地划分为青年文化区、温泉酒店区、湿地公园区和设施农业区四大板块，打造独具特色的北方生态文化旅游胜地。
              </p>
            </div>
          </div>
        </div>
        <div
          className={styles.module}
          style={{ marginRight: '10px', flex: '2.5' }}
        >
          <div
            className={styles.mainModule}
            style={{ flex: '2.8', backgroundImage: `url(${Image})` }}
          >
            <HeaderTitle Title="项目能耗" />
            <div className={styles.mianList}>
              <div className={styles.LeftList}>
                <div className={styles.COTitle}>
                  2022年累计减排CO
                  <sub>2</sub>
                </div>
                <span>
                  <em>9573.36</em>kg
                </span>
                <div className={styles.COTips}>≈一颗40年大树190天吸收量</div>
              </div>
              <div className={styles.RightList}>
                <div className={styles.ListChild}>
                  {RightList('年用电量(kW·h)', 3286068.29)}
                  {RightList('年用水量(m³)', 3286068.29)}
                  {RightList('年用气量(Nm³)', 3286068.29)}
                </div>
                <div className={styles.ListChild}>
                  {RightList('年建筑用能(kgce)', 3286068.29)}
                  {RightList('年人均用能(kgce/人)', 3286068.29)}
                  {RightList('单位面积用能(kgce/㎡)', 3286068.29)}
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '1', marginTop: '10px' }}
          >
            <HeaderTitle Title="能耗趋势" />
            <div className={styles.Title}>
              <div className={styles.lines}>{Thead()}</div>
            </div>
            <div className={styles.center}>{Rightpage(Index)}</div>
          </div>
        </div>
        <div className={styles.module}>
          <div className={styles.mainModule} style={{ height: '130px' }}>
            <HeaderTitle Title="系统状态" />
            <div className={styles.alarmCon}>
              <div className={styles.alarmItem}>
                <img src={require('./img/i1_red.png')} />
                <span>供电供热</span>
              </div>
              <div className={styles.alarmItem}>
                <img src={require('./img/i2_gray.png')} />
                <span>供配电</span>
              </div>
              <div className={styles.alarmItem}>
                <img src={require('./img/i3_gray.png')} />
                <span>给排水</span>
              </div>
              <div className={styles.alarmItem}>
                <img src={require('./img/i4_gray.png')} />
                <span>消防</span>
              </div>
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '1', marginTop: '10px' }}
          >
            <HeaderTitle Title="告警统计" />
            <div className={styles.deviceCustom}>
              <div className={styles.alarmCustomItem}>
                <img src={require('./img/iconE1.png')} />
                <div>
                  <div className={styles.deviceCustomTitle}>报警数量</div>
                  <div className={styles.deviceCustomText}>
                    <span style={{ color: 'rgba(255, 68, 68, 1)' }}>0</span>个
                  </div>
                </div>
              </div>
              <div className={styles.alarmCustomItem}>
                <img src={require('./img/iconE2.png')} />
                <div>
                  <div className={styles.deviceCustomTitle}>预警数量</div>
                  <div className={styles.deviceCustomText}>
                    <span style={{ color: 'rgba(255, 224, 55, 1)' }}>0</span>个
                  </div>
                </div>
              </div>
              <div className={styles.alarmCustomItem}>
                <img src={require('./img/iconE3.png')} />
                <div>
                  <div className={styles.deviceCustomTitle}>故障数量</div>
                  <div className={styles.deviceCustomText}>
                    <span style={{ color: 'rgba(255, 68, 68, 1)' }}>0</span>个
                  </div>
                </div>
              </div>
              <div className={styles.alarmCustomItem}>
                <img src={require('./img/iconE4.png')} />
                <div>
                  <div className={styles.deviceCustomTitle}>离线数量</div>
                  <div className={styles.deviceCustomText}>
                    <span>0</span>个
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '1', marginTop: '10px' }}
          >
            <HeaderTitle Title="运维状态" />
            <div className={styles.tencec}>
              {Maintenance(IconD1, '运维人员', 13, '人')}
              <div className={styles.deviceCustomLine}></div>
              {Maintenance(IconD2, '待处理任务', 11, '次')}
              <div className={styles.deviceCustomLine}></div>
              {Maintenance(IconD3, '今日已完成', 0, '次')}
            </div>
          </div>
          <div
            className={styles.mainModule}
            style={{ flex: '1', marginTop: '10px' }}
          >
            <HeaderTitle Title="设备状态" />
            <div className={styles.tencec}>
              {Maintenance(IconD4, '在线设备', 43, '次')}
              <div className={styles.deviceCustomLine}></div>
              {MaintenanceI(IconD5, '离线设备', 0, '个')}
              <div className={styles.deviceCustomLine}></div>
              {MaintenanceI(IconD6, '停用设备', 20, '个')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
