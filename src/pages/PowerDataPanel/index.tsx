import BoardBack from '@/components/BoardBack';
import Item_H from '@/components/BoardItem';
import SubHeader from '@/components/SubHeader';
import { Radio, Select } from 'antd';
import { useState } from 'react';
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

const PowerDataPanel = () => {
  const [warn, setWarn] = useState<String>('报警');
  const [power, setPower] = useState<String>('用电量');

  return (
    <>
      <SubHeader
        title={'电力数据看板'}
        leftItem={
          <>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
          </>
        }
      />
      <div
        style={{ padding: '5px 10px', height: '100%' }}
        className={styles.container}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '180px',
          }}
        >
          <div style={{ width: '30%' }}>
            <BoardBack
              title={'当日用电量统计'}
              subTitle={'单位:kW·h'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon2.png')}
                      />
                    }
                    title={'计划用电量'}
                    num={22.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon1.png')}
                      />
                    }
                    title={'实际用电量'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon17.png')}
                      />
                    }
                    title={'昨日同期'}
                    num={222.3}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon18.png')}
                      />
                    }
                    title={'环比(%)'}
                    num={222.3}
                  />
                </>
              }
            />
          </div>
          <div style={{ width: '25%' }}>
            <BoardBack
              title={'经济运行'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon19.png')}
                      />
                    }
                    title={'有功功率(kW)'}
                    num={22.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon8.png')}
                      />
                    }
                    title={'负荷率(%)'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon10.png')}
                      />
                    }
                    title={'功率因数'}
                    num={'0.00'}
                  />
                </>
              }
            />
          </div>
          <div style={{ width: '25%' }}>
            <BoardBack
              title={'告警统计'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon5.png')}
                      />
                    }
                    title={'系统报警'}
                    num={<span style={{ color: '#FF4444' }}>0</span>}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon6.png')}
                      />
                    }
                    title={'系统预警'}
                    num={<span style={{ color: '#FFE037' }}>0</span>}
                  />
                  <div className={styles.warnBox}>
                    <div>
                      报警规则
                      <span>1</span>
                    </div>
                    <div>
                      预警规则
                      <span>0</span>
                    </div>
                  </div>
                </>
              }
            />
          </div>
          <div style={{ width: '17%' }}>
            <BoardBack
              title={'室内环境'}
              content={
                <>
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon3.png')}
                      />
                    }
                    title={'变电室温度(℃)'}
                    num={222.2}
                  />
                  <Item_H
                    icon={
                      <img
                        src={require('@/assets/PowerDataPanel/icon/icon4.png')}
                      />
                    }
                    title={'变电室湿度(%)'}
                    num={'0.00'}
                  />
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
            height: 'calc(100% - 600px)',
          }}
        >
          <div style={{ width: '100%' }}>
            <BoardBack
              title={'总用电趋势图'}
              subTitle={
                <>
                  <Radio.Group
                    value={power}
                    onChange={(e) => {
                      setPower(e.target.value);
                    }}
                  >
                    <Radio.Button value="用电量">用电量</Radio.Button>
                    <Radio.Button value="用电趋势">用电趋势</Radio.Button>
                  </Radio.Group>
                </>
              }
              content={<></>}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            height: '280px',
          }}
        >
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
              content={
                <>
                  <div></div>
                </>
              }
            />
          </div>
          <div style={{ width: '27%' }}>
            <BoardBack
              title={'用电安全'}
              content={
                <>
                  <div className={styles.tableBox}>
                    <table className={styles.firstTable}>
                      <thead>
                        <tr>
                          <td>
                            <span>漏电流值:</span>
                          </td>
                          <td>
                            <span className={styles.titleTem}> -- A</span>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    <table>
                      <thead className={styles.tableTh}>
                        <tr>
                          <td>受总铜排温度</td>
                          <td>变压器绕组温度</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                              <span>
                                A相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                A相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span>
                                B相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                B相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span>
                                C相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                C相: <span>--</span>
                              </span>
                              <span>℃</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              }
            />
          </div>
          <div style={{ width: '27%' }}>
            <BoardBack
              title={'供电质量'}
              content={
                <>
                  <div className={styles.tableBox}>
                    <table className={styles.firstTable}>
                      <thead>
                        <tr>
                          <td>
                            <span>供电频率:</span>
                          </td>
                          <td>
                            <span className={styles.titleEle}> -- Hz</span>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    <table>
                      <thead className={styles.tableTh}>
                        <tr>
                          <td>三相线电压</td>
                          <td>不平衡度</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                              <span>
                                A相: <span>--</span>
                              </span>
                              <span>V</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                A相: <span>--</span>
                              </span>
                              <span>V</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span>
                                B相: <span>--</span>
                              </span>
                              <span>V</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                B相: <span>--</span>
                              </span>
                              <span>V</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span>
                                C相: <span>--</span>
                              </span>
                              <span>V</span>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerDataPanel;
