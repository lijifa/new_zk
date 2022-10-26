import React, { memo, useState } from 'react';
import { colum } from './constant';
import styles from './index.less';
import SubHeader from '@/components/SubHeader';
import {Select} from 'antd'
let {Option} = Select

const TransformerPanel = memo(() => {
  const list: any = [
    {
      label: '光合谷',
    },
    {
      label: '武清人民医院',
    },
  ];
  const [btnIndex, setbtnIndex] = useState(0);
  const [data, setdata] = useState(1);
  const bod: Array<any> = [
    { name: '功率因数' },
    { name: '有功功率' },
    { name: '无功功率' },
    { name: '视在功率' },
    { name: '电流' },
    { name: '线电压' },
    { name: '频率' },
  ];
  const changeBtn = (index: number) => {
    return () => {
      setbtnIndex(index);
    };
  };
  function Thead() {
    const title = ['负荷', '功率', '电流', '电压', '温度'];
    return title.map((item, index) => {
      return (
        <div key={index} className={styles.moduleTableTitle}>
          {item}
        </div>
      );
    });
  }
  //展示列表
  function ModuleTR() {
    return colum.map((item, index) => {
      return (
        <div className={styles.moduleTableNum}>
          <i></i>
          <span>{item.name}</span>
          <em>{item.number}</em>
          {item.unit}
        </div>
      );
    });
  }
  //点击按钮改变页面
  function modificationPage(btnIndex: number) {
    let result;
    switch (btnIndex) {
      case 0:
        result = (
          <>
            <div style={{ color: 'red' }}>11</div>
          </>
        );
        break;
      case 1:
        result = (
          <>
            <div style={{ color: 'red' }}>22</div>
          </>
        );
        break;
      case 2:
        result = (
          <>
            <div style={{ color: 'red' }}>33</div>
          </>
        );
        break;
      case 3:
        result = (
          <>
            <div style={{ color: 'red' }}>44</div>
          </>
        );
        break;
      case 4:
        result = (
          <>
            <div style={{ color: 'red' }}>55</div>
          </>
        );
        break;
      case 5:
        result = (
          <>
            <div style={{ color: 'red' }}>66</div>
          </>
        );
        break;
      case 6:
        result = (
          <>
            <div style={{ color: 'red' }}>77</div>
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
        title={'变压器状态检测'}
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
        <div className={styles.moduleFlex} style={{ height: '300px' }}>
          <div
            className={styles.module}
            style={{ flex: '1', marginRight: '0' }}
          >
            <div className={styles.moduleTitle}>
              <img src={require('./img/titleImg.png')} />
              <span>变压器实时数据</span>
            </div>
            <div className={styles.line}>
              状态说明：
              <i className={styles.bgGreen}></i>
              <span className={styles.colorGreen}>正常</span>
              <i className={styles.bgYellow}></i>
              <span className={styles.colorYellow}>预警</span>
              <i className={styles.bgRed}></i>
              <span className={styles.colorRed}>报警</span>
            </div>
            <div className={styles.moduleInner}>
              <div className={styles.moduleTable}>
                {Thead()}
                {ModuleTR()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.moduleFlex} style={{ flex: 1 }}>
          <div
            className={styles.module}
            style={{ width: '100%', marginRight: ' 0' }}
          >
            <div className={styles.moduleTitle}>
              <img src={require('./img/titleImg.png')} />
              <span>变压器实时数据</span>
            </div>
            <div className={styles.legendBtns}>
              {bod.map((item, index) => {
                return (
                  <div
                    onClick={changeBtn(index)}
                    key={index}
                    className={styles.legendBtn}
                    style={{
                      color: index === btnIndex ? 'rgba(0, 255, 255, 1)' : '',
                      border:
                        index === btnIndex
                          ? '1px solid rgba(0, 255, 255, 1)'
                          : '',
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div className={styles.moduleInner}>
              <div className={styles.echarts}>
                {data ? (
                  modificationPage(btnIndex)
                ) : (
                  <img
                    className={styles.nodata}
                    src={require('./img/nodata.png')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TransformerPanel;
