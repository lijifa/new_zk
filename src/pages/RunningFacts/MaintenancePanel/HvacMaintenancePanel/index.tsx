import Chart from '@/components/Echarts';
import SubHeader from '@/components/SubHeader';
import TopCom from '@/components/TopCom';
import { Select } from 'antd';
import React, { memo, useState } from 'react';
import ScrollList from './components/ScrollList';
import styles from './index.less';
let { Option } = Select;
const list: any = [
  {
    label: '光合谷',
  },
  {
    label: '武清人民医院',
  },
];

interface list {
  title: string;
  onePicture: any;
  twoPicture: any;
  threePicture: any;
  titleo: string;
  titletw: string;
  titleth: string;
  Num1: number;
  Num2: number | string;
  Num3: number;
  color1: string;
  color2: string;
  color3: string;
}

const colum: Array<any> = [
  {
    title: '站内安全',
    onePicture: require('./img/icon16.png'),
    twoPicture: require('./img/icon5.png'),
    threePicture: require('./img/icon6.png'),
    titleo: '告警总数',
    titletw: '报警总数',
    titleth: '预警总数',
    Num1: 13,
    Num2: 12,
    Num3: 1,
    color1: 'rgba(255, 68, 68, 1)',
    color2: 'rgba(255, 68, 68, 1)',
    color3: 'rgba(238, 210, 55, 1)',
  },
  {
    title: '当日很增',
    onePicture: require('./img/icon5.png'),
    twoPicture: require('./img/icon6.png'),
    threePicture: require('./img/icon12.png'),
    titleo: '新增报警',
    titletw: '增加预警',
    titleth: '以恢复告警',
    Num1: 0,
    Num2: 0,
    Num3: 0,
    color1: 'rgba(255, 68, 68, 1)',
    color2: 'rgba(238, 210, 55, 1)',
    color3: 'rgba(0, 216, 160, 1)',
  },
  {
    title: '站内人员',
    onePicture: require('./img/icon13.png'),
    twoPicture: require('./img/icon14.png'),
    threePicture: require('./img/icon15.png'),
    titleo: '人员总数',
    titletw: '负责人',
    titleth: '联系电话',
    Num1: 10,
    Num2: '王新杰',
    Num3: 15621298898,
    color1: '',
    color2: '',
    color3: '',
  },
];
const waring = [
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
  {
    name: '冷却泵四号故障状态故障',
    waring: '设备故障',
    time: '2022-07-01 12:40:42',
  },
];
let Data = [
  {
    name: '巡检任务',
    value: 0,
  },
  {
    name: '抄表任务',
    value: 0,
  },
  {
    name: '维修任务',
    value: 0,
  },
  {
    name: '保养任务',
    value: 0,
  },
];
const title = {
  size: 50,
  linHeight: 40,
};
const title5 = {
  text: '任务总数',
  size: 20,
};

let circle = {
  max: 95,
  min: 70,
  top: '50%',
  left: '30%',
};
let middletext = {
  top: '38%',
  left: '29%',
};
let outsidetext1 = {
  top: '22%',
  left: '55%',
  width1:120,
};

let color = [
  'rgba(22, 143, 255, 1)',
  'rgba(72, 211, 150, 1)',
  'rgba(0, 255, 255, 1)',
  'rgba(232, 211, 111, 1)',
];
let ConComformatterColor = [
  'rgba(150, 214, 255, 1)',
  'rgba(0, 255, 255, 1)',
  'rgba(150, 214, 255, 1)',
]
let ConComTitleColor = [
  'rgba(0, 255, 255, 1)',
  'rgba(150, 214, 255, 1)',
  'rgba(150, 214, 255, 1)',

]
let ConComformatterSize = [18,25,15,15]
const agg = false;
const HvacMaintenancePanel = memo(() => {
  const [Index, setIndex] = useState<number>(0);
  const [btnIndx, setBtnIndex] = useState<number>(0);
  function Thead() {
    const title = ['报警', '预警'];
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
  function LeftPage(Index: number) {
    let result;
    switch (Index) {
      case 0:
        result = (
          <>
            <ScrollList waring={waring} />
          </>
        );
        break;
      case 1:
        result = (
          <>
            <ScrollList waring={waring} agg={agg} />
          </>
        );
        break;
      default:
        break;
    }
    return result;
  }
  function RightThead() {
    const title = ['剩余保养时长', '近七天运行时长'];
    const btnclock = (index: number) => {
      return () => {
        setBtnIndex(index);
      };
    };
    return title.map((item, index) => {
      return (
        <div
          key={index}
          className={styles.legendBtn}
          onClick={btnclock(index)}
          style={{
            color: index === btnIndx ? 'rgba(0, 255, 255, 1) ' : '',
            border: index === btnIndx ? '1px solid rgba(0, 255, 255, 1)' : '',
          }}
        >
          {' '}
          {item}
        </div>
      );
    });
  }
  function Rightpage(btnIndex: number) {
    let result;
    switch (btnIndex) {
      case 0:
        result = (
          <>
            <div className={styles.nodata}>
              <img src={require('./img/nodata.png')} />
            </div>
          </>
        );
        break;
      case 1:
        result = (
          <>
            <div>页面二</div>
          </>
        );
        break;
      default:
        break;
    }
    return result;
  }

  return (
    <div className={styles.mainContent}>
      <SubHeader
        title={'暖通运维看板'}
        leftItem={
          <>
            <div>
              {list.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
          </>
        }
      />
      <div className={styles.moduleContent}>
        <div className={styles.moduleFlex} style={{ height: '180px' }}>
          {colum.map((item, index) => {
            return <TopCom key={index} Tproperty={item} />;
          })}
        </div>
        <div className={styles.moduleFlex} style={{ height: '310px' }}>
          <div className={styles.module} style={{ flex: '1' }}>
            <div className={styles.moduleMargin}>
              <div className={styles.moduleTitle}>
                <img src={require('./img/titleImg.png')} />
                <span>当前待处理任务</span>
              </div>
              <div className={styles.moduleInner}>
                <div className={styles.echarts}>
                  <Chart
                    type="ConCom"
                    XDATA={Data}
                    ConComTitle={title}
                    ConComUnit="次"
                    ConComTitle3={title5}
                    ConComCircle={circle}
                    ConComMiddletext={middletext}
                    ConComOutsidetext={outsidetext1}
                    ConComColor={color}
                    ConComformatterColor={ConComformatterColor}
                    ConComformatterSize={ConComformatterSize}
                    ConComTitleColor={ConComTitleColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.module} style={{ flex: '1' }}>
            <div className={styles.moduleMargin}>
              <div className={styles.moduleTitle}>
                <img src={require('./img/titleImg.png')} />
                <span>当前待处理任务</span>
              </div>
              <div className={styles.moduleInner}>
                <div className={styles.echarts}>
                <Chart
                    type="ConCom"
                    XDATA={Data}
                    ConComTitle={title}
                    ConComUnit="次"
                    ConComTitle3={title5}
                    ConComCircle={circle}
                    ConComMiddletext={middletext}
                    ConComOutsidetext={outsidetext1}
                    ConComColor={color}
                    ConComformatterColor={ConComformatterColor}
                    ConComformatterSize={ConComformatterSize}
                    ConComTitleColor={ConComTitleColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.module} style={{ flex: '1' }}>
            <div className={styles.moduleMargin}>
              <div className={styles.moduleTitle}>
                <img src={require('./img/titleImg.png')} />
                <span>当前待处理任务</span>
              </div>
              <div className={styles.moduleInner}>
                <div className={styles.echarts}>
                <Chart
                    type="ConCom"
                    XDATA={Data}
                    ConComTitle={title}
                    ConComUnit="次"
                    ConComTitle3={title5}
                    ConComCircle={circle}
                    ConComMiddletext={middletext}
                    ConComOutsidetext={outsidetext1}
                    ConComColor={color}
                    ConComformatterColor={ConComformatterColor}
                    ConComformatterSize={ConComformatterSize}
                    ConComTitleColor={ConComTitleColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.moduleFlex} style={{ flex: '1' }}>
          <div className={styles.module} style={{ flex: '1' }}>
            <div className={styles.moduleMargin}>
              <div className={styles.moduleTitle}>
                <img src={require('./img/titleImg.png')} />
                <span>当前告警汇总</span>
              </div>
              <div className={styles.lines}>{Thead()}</div>
              <div className={styles.moduleInner}>{LeftPage(Index)}</div>
            </div>
          </div>
          <div className={styles.module} style={{ flex: '1' }}>
            <div className={styles.moduleMargin}>
              <div className={styles.moduleTitle}>
                <img src={require('./img/titleImg.png')} />
                <span>当前待处理任务</span>
              </div>
              <div className={styles.legendBtns}>{RightThead()}</div>
              {/* <div className={styles.moduleInner}>{Rightpage(btnIndx)}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HvacMaintenancePanel;
