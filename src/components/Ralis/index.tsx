import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import './css/ralis1.less';
import Music from './img/warning.mp3';
import styles from './css/ralis1.less';
import { useModel } from '@umijs/max';
import {
  getalarmNoticeList,
  getalarmNoticeListCount,
  getselectUnit,
  getselectSecondAlarmType,
} from '@/services/Ralis/WarningList';
import { useInterval } from 'ahooks';
const Ralis: React.FC = memo(() => {
  const [RalisList, setRalisList] = useState<API.RalisList>({
    show: false, //显示与隐藏
    showOunt: true, //打开或关闭声音
    warning: false, //报警隐藏与显示
    bar: false, //站点隐藏与显示
    btnshow: false, //分页的显示
    warngsize: 0, //根据警报类型获取type，查询
    IconTop: 20, //分页的默认高度
    text: '请选择报警类型',
    texto: '请选择站点',
    isActive: 0, //列表背景
    isActive1: 0, //分页背景
    allnum: 0,
  });
  const audioRef = useRef<HTMLAudioElement | any>();
  const scrollRef = useRef<HTMLDivElement | any>(); //获取li
  const btnRef = useRef<HTMLDivElement | any>();
  const roll = useRef<HTMLDivElement | any>();
  const [showOunt, setshowOunt] = useState(true); //打开或关闭声音
  const [columT, setcolumT] = useState([]); //设置后台返回列表信息
  const [pageNum, setpageNum] = useState(1); //设置默认页数
  const [total, setotal] = useState(0); //后台返回的异常总数
  const [traNum, settraNum] = useState<number>(0); //改变特效传入的值
  const [allnum, setallnum] = useState<number | string>(''); //获取请求总数
  const [soundB, setsoundB] = useState<boolean>(true); // 静音标题切换]
  const [showpage, setshowpage] = useState(true);
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    audioRef.current.autoPlay = true;
    TgetalarmNoticeList();
    getalarmNoticeListCount().then((res) => {
      if (res.data === null) {
        setallnum(0);
      } else {
        setallnum(res.data);
      }
    });
    if (allnum === 0) {
      audioRef.current.pause();
      setsoundB(false);
    }
    getselectUnit().then((res) => {
      setWite(res.rows);
    });
  }, [allnum, initialState?.selectedCompany?.key]);
  let pageindex = Math.ceil(total / 30);
  let page = [];
  for (let i = 0; i < pageindex; i++) {
    page.push(i);
  }
  const playMusic = () => {
    audioRef.current.src = Music;
    if (showOunt === true && allnum !== 0 && soundB === true) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const TgetalarmNoticeList = useCallback(() => {
    getalarmNoticeList({
      projectId: '',
      siteId: '',
      timeCode: '',
      alarmType: '',
      pageNum: pageNum,
    }).then((res) => {
      let _colmT = res.rows;
      setotal(res.total);
      setcolumT(_colmT);
    });
  }, [pageNum, columT]);
  //请求
  useInterval(() => {
    getalarmNoticeListCount().then((res) => {
      setallnum(res.data);
    });
  }, 60000);
  //开启关闭静音
  const changeOund = (e: any) => {
    e.stopPropagation();
    setshowOunt(!showOunt);
    setsoundB(!soundB);
    if (soundB === false && allnum !== 0) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  //展示站点
  const changeSelect = (e: any) => {
    e.stopPropagation();
    setRalisList({ ...RalisList, warning: false, bar: true });
  };
  //展示报警
  const changeWrring = (e: any) => {
    e.stopPropagation();
    setRalisList({ ...RalisList, warning: true, bar: false });
  };
  const [PoliceType, setPoliceType] = useState<API.Police>({
    newSiteid: null,
    newAlarmType: null,
  });
  //保留报警
  const changeSelectT = (id: number) => {
    return (e: any) => {
      e.stopPropagation();
      setRalisList({ ...RalisList, warning: false, text: e.target.innerHTML });
      setPoliceType({ ...PoliceType, newAlarmType: id });
    };
  };
  //保留选择站点
  const changeSite = (id: number) => {
    return (e: any) => {
      e.stopPropagation();
      setRalisList({ ...RalisList, bar: false, texto: e.target.innerHTML });
      setPoliceType({ ...PoliceType, newSiteid: id });
    };
  };
  //随鼠标移动
  const changeIconTop = (index: number) => {
    return (e: any) => {
      if (index === 0) {
        setRalisList({ ...RalisList, IconTop: 20, isActive: index });
      } else {
        let _h = 20 + index * 40;
        if (scrollRef.current.scrollTop == 0) {
          setRalisList({ ...RalisList, IconTop: _h, isActive: index });
        } else {
          let _h1 = (index - 1) * 40 - (scrollRef.current.scrollTop - 60);
          setRalisList({ ...RalisList, IconTop: _h1, isActive: index });
        }
      }
      //setRalisList({...RalisList,isActive:index})
    };
  };
  //根据页数改变scrollTo
  const changebtnshow = (e: any) => {
    e.stopPropagation();
    setRalisList({ ...RalisList, btnshow: true });
    let scroll = Math.round(e.target.innerHTML / 3);
    setTimeout(() => {
      if (!RalisList.btnshow === true) {
        if (scroll === 1) {
          scroll = 0;
          btnRef.current.scrollTo(0, scroll * 60);
        } else {
          btnRef.current.scrollTo(0, scroll * 60);
        }
      }
    }, 0);
  };
  //改变页数
  const closebtnshow = (index: number) => {
    let { newSiteid, newAlarmType } = PoliceType;
    return (e: any) => {
      let _show = e.target.innerHTML * 1;
      e.stopPropagation();
      setRalisList({ ...RalisList, btnshow: false, isActive1: index });
      setpageNum(e.target.innerHTML);
      setpageNum(_show);
      getalarmNoticeList({
        pageNum: _show,
        alarmType: newAlarmType,
        siteId: newSiteid,
        pageSize: 30,
      }).then((res) => {
        setcolumT(res.rows);
        setotal(res.total);
      });
    };
  };
  //重置按钮
  const changerest = (e: any) => {
    let _pageNume = 1;
    e.stopPropagation();
    setpageNum(_pageNume);
    setRalisList({
      ...RalisList,
      warning: false,
      bar: false,
      btnshow: false,
      IconTop: 20,
      text: '请选择报警类型',
      texto: '请选择站点',
      isActive: 0,
      isActive1: 0,
    });
    setPoliceType({ ...PoliceType, newSiteid: null, newAlarmType: null });
    setTimeout(() => {
      btnRef.current.scrollTo(0, 0);
    }, 0);
    getalarmNoticeList({ pageNum: _pageNume, pageSize: 30 }).then((res) => {
      setcolumT(res.rows);
      setotal(res.total);
    });
  };
  //改变特效
  const changetransition = (traNum: number) => {
    if (traNum === 0) {
      return 'all 0s ease 0s';
    } else if (traNum === 1) {
      return 'all 0.5s ease 0s';
    } else {
      return (
        'all 0.5s ease 0s',
        setTimeout(() => {
          settraNum(0);
        }, 500)
      );
    }
  };
  //点击旁边关闭
  const changeCloseT = (e: any) => {
    let _pageNume = 1;
    e.stopPropagation();
    settraNum(2);
    setRalisList({
      ...RalisList,
      show: false,
      warning: false,
      bar: false,
      btnshow: false,
      IconTop: 20,
      text: '请选择报警类型',
      texto: '请选择站点',
      isActive: 0,
      isActive1: 0,
    });
    setpageNum(1);
    setLeft(move.Left);
    setTop(move.Top);
    getalarmNoticeList({ pageNum: _pageNume, pageSize: 30 }).then((res) => {
      setcolumT(res.rows);
      setotal(res.total);
    });
  };
  const changewarn = (e: any) => {
    e.stopPropagation();
    settraNum(2);
    setRalisList({ ...RalisList, warning: false, bar: false, btnshow: false });
  };
  //上一页
  const perpage = (e: any) => {
    let { newSiteid, newAlarmType } = PoliceType;
    e.stopPropagation();
    let _per = 1;
    if (pageNum < 2) {
      _per = 1;
    } else {
      _per = pageNum - 1;
    }
    setpageNum(_per);
    getalarmNoticeList({
      pageNum: _per,
      alarmType: newAlarmType,
      siteId: newSiteid,
      pageSize: 30,
    }).then((res) => {
      setcolumT(res.rows);
      setotal(res.total);
    });
    setRalisList({ ...RalisList, btnshow: false, isActive1: _per - 1 });
  };
  //下一页
  const nextpage = (e: any) => {
    let { newSiteid, newAlarmType } = PoliceType;
    e.stopPropagation();
    let _p = 1;
    if (pageNum > pageindex - 1) {
      _p = pageindex;
    } else {
      _p = pageNum + 1;
    }
    setpageNum(_p);
    getalarmNoticeList({
      pageNum: _p,
      alarmType: newAlarmType,
      siteId: newSiteid,
      pageSize: 30,
    }).then((res) => {
      setcolumT(res.rows);
      setotal(res.total);
    });
    setRalisList({ ...RalisList, btnshow: false, isActive1: _p - 1 });
  };
  //关于小球移动
  const [move, setmove] = useState<{ Left: number; Top: number }>({
    Left: 0,
    Top: 0,
  });
  //保存报警和站点信息
  const [webwite, setWite] = useState<Array<any>>([]);
  const [war, setwar] = useState<Array<any>>([]);
  //点击小球打开
  const changClose = (e: any) => {
    e.stopPropagation();
    settraNum(1);
    //playMusic();
    setmove({ Left: Left, Top: Top });
    getselectSecondAlarmType().then((res) => {
      setwar(res.rows);
    });

    if (time < 150) {
      setRalisList({ ...RalisList, show: true });
    } else {
      setRalisList({ ...RalisList, show: false });
    }
  };
  //查询
  const inquire = (e: any) => {
    let { newSiteid, newAlarmType } = PoliceType;
    e.stopPropagation();
    setpageNum(1);
    setRalisList({ ...RalisList, isActive1: 0 });
    getalarmNoticeList({
      alarmType: newAlarmType,
      pageNum: 1,
      siteId: newSiteid,
      pageSize: 30,
    }).then((res) => {
      setcolumT(res.rows);
      setotal(res.total);
    });
  };
  //拖拽及边界判断
  let innerLeft = 0;
  let innerTop = 0;
  const [time, settime] = useState<number>(0);
  const [Left, setLeft] = useState(314);
  const [Top, setTop] = useState(305);
  const getStart = (e: any) => {
    let osmall: API.osmallvalue = roll;
    let firstTime = new Date().getTime();
    osmall.startX = e.clientX - osmall.current.offsetLeft;
    osmall.startY = e.clientY - osmall.current.offsetTop;
    document.onmousemove = function (e) {
      e.preventDefault();
      innerLeft = e.clientX - osmall.startX;
      innerTop = e.clientY - osmall.startY;
      let windth = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      setLeft(innerLeft);
      setTop(innerTop);
      settraNum(0);
      if (innerLeft <= 0) {
        setLeft(0);
      }
      if (innerTop <= 0) {
        setTop(0);
      }

      if (innerLeft > windth - 110) {
        setLeft(windth - 110);
      }
      if (innerTop > height - 110) {
        setTop(height - 110);
      }
    };
    document.onmouseup = function () {
      let lastTime = new Date().getTime();
      document.onmousemove = null;
      document.onmouseup = null;
      settraNum(1);
      let time = lastTime - firstTime;
      settime(time);
    };
  };
  //点击播放报警
  const changeplay = () => {
    playMusic();
    setshowpage(false);
  };

  return (
    <div>
      {
        <div
          className={RalisList.show === false ? 'alarmMask ' : 'alarmMaskL'}
          style={{
            left: RalisList.show === false ? Left : '0%',
            top: RalisList.show === false ? Top : '0%',
            transition: [changetransition(traNum)],
          }}
          onClick={changeCloseT}
          onMouseDown={getStart}
          ref={roll}
        >
          {/* 小球 */}
          <div
            className="ballBg"
            style={{
              display: RalisList.show === false ? 'block' : 'none',
              cursor: 'pointer',
              backgroundImage:
                allnum === 0 || null
                  ? `url(${require('./img/circleBgGreen.png')})`
                  : '',
            }}
            onClick={changClose}
          >
            <div
              className={allnum === 0 || null ? 'ballOuts' : 'ballOut'}
            ></div>
            <div className={allnum === 0 || null ? 'ballIns' : 'ballIn'}></div>
            <div
              className={allnum === 0 || null ? 'warnIcons' : 'warnIcon'}
            ></div>
            <div className="warnTotal">
              <span
                className="warningTotal"
                style={{ fontSize: '28px', color: ' #FCFD00' }}
              >
                {allnum > 999 ? '99+' : allnum}
              </span>
              <span
                style={{
                  marginTop: '3px',
                  display: 'block',
                  fontSize: ' 12px',
                  lineHeight: '16px',
                }}
              >
                所有项目
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '12px',
                  lineHeight: '16px',
                }}
              >
                当前警告
              </span>
            </div>
          </div>

          {/**警告框 */}
          <div
            className="warnContainer"
            style={{ display: RalisList.show === true ? 'block' : 'none' }}
            onClick={changewarn}
          >
            <div className="warnContent">
              <div className="warnTitle">
                <img src={require('./img/warnIcon.png')} />
                告警信息
              </div>
              <div onClick={changeOund}>
                {soundB === true ? (
                  <div className="sound"></div>
                ) : (
                  <div className="gound"></div>
                )}
              </div>
              <div onClick={changeCloseT}>
                <img
                  className="colseContent"
                  src={require('./img/关闭26.png')}
                />
              </div>
              <div className="selectInquire">
                <div className="selectInput" onClick={changeSelect}>
                  <span>{RalisList.texto}</span>
                  {RalisList.bar == false ? (
                    <img
                      className="colseContent"
                      src={require('./img/selectClose.png')}
                    />
                  ) : (
                    <img
                      className="colseContent"
                      src={require('./img/selectOpen.png')}
                    />
                  )}
                  {RalisList.bar === false ? (
                    ''
                  ) : (
                    <div className="selectBox">
                      <div className="selectList">
                        <ul>
                          {webwite.map((item, index) => {
                            return (
                              <li
                                onClick={changeSite(item.unitId)}
                                key={item.unitId}
                              >
                                {item.name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="selectInput" onClick={changeWrring}>
                  <span>{RalisList.text}</span>
                  {RalisList.warning == false ? (
                    <img
                      className="colseContent"
                      src={require('./img/selectClose.png')}
                    />
                  ) : (
                    <img
                      className="colseContent"
                      src={require('./img/selectOpen.png')}
                    />
                  )}
                  {RalisList.warning === false ? (
                    ''
                  ) : (
                    <div className="selectBox">
                      <div className="selectList">
                        <ul>
                          {war.map((item, index) => {
                            return (
                              <li
                                key={item.alarmTypeId}
                                onClick={changeSelectT(item.alarmTypeId)}
                              >
                                {item.alarmTypeName}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <button type="button" className="inquire" onClick={inquire}>
                  查询
                </button>
                <button type="button" className="reset" onClick={changerest}>
                  重置
                </button>
              </div>
              <div className="mainBody">
                <div
                  className="listContent"
                  ref={scrollRef}
                  style={{ display: total === 0 ? 'none' : 'block' }}
                >
                  <ul>
                    {columT.map((item: any, index) => {
                      return (
                        <li
                          key={item.businessAlarmRuleTempId}
                          onMouseMove={changeIconTop(index)}
                          className={
                            index == RalisList.isActive ? 'IconActive' : ''
                          }
                          style={{
                            backgroundColor:
                              index % 2 == 0 ? '' : ' rgba(3, 27, 51, 1)',
                          }}
                        >
                          <div className=" warnItem0">{index + 1}</div>
                          <div className="warnItem1">{item.siteName}</div>
                          <div className="warnItem2">{item.systemName}</div>
                          <div className="warnItem3">{item.reason}</div>
                          {item.alarmType == 4 ? (
                            <div className="warnItem4">
                              <img
                                style={{ marginRight: '5px' }}
                                src={require('./img/circle-red.png')}
                              />
                              警报规则
                            </div>
                          ) : item.alarmType == 5 ? (
                            <div className="warnItem4">
                              <img
                                style={{ marginRight: '5px' }}
                                src={require('./img/circle-gray.png')}
                              />
                              离线报警
                            </div>
                          ) : item.alarmType == 6 ? (
                            <div className="warnItem4">
                              <img
                                style={{ marginRight: '5px' }}
                                src={require('./img/circle-red.png')}
                              />
                              设备故障
                            </div>
                          ) : item.alarmType == 3 ? (
                            <div className="warnItem4">
                              <img
                                style={{ marginRight: '5px' }}
                                src={require('./img/circle-red.png')}
                              />
                              规则预警
                            </div>
                          ) : (
                            '--'
                          )}
                          <div className="warnItem5">{item.alarmTime}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div
                  className="triangleIcon"
                  style={{
                    top: RalisList.IconTop,
                    display: total === 0 ? 'none' : 'block',
                  }}
                ></div>
                <div
                  className="solution"
                  style={{ display: total === 0 ? 'none' : 'block' }}
                >
                  <div className="solutionTitle">建议解决方案:</div>
                  <div className="solutionContent ">
                    <p>
                      {columT.map((item: any, index) => {
                        return index == RalisList.isActive
                          ? item.alarmRuleSolutions.map(
                              (iend: any, index: any) => {
                                return (
                                  <span key={index}>
                                    {iend.alarmRuleSolution}
                                  </span>
                                );
                              },
                            )
                          : '';
                      })}
                    </p>
                  </div>
                </div>
                <div
                  className="listContent1"
                  style={{ display: total === 0 ? 'block' : 'none' }}
                >
                  <img className="nodata" src={require('./img/nodata1.png')} />
                </div>
                <div className="pageBtn">
                  <div className="jumpTo">
                    共<span className="totalNum">{total}</span>
                    条,每页30条,跳至
                    <span className="pageNum" onClick={changebtnshow}>
                      {pageNum}
                    </span>
                    页
                    <div className="btnList" ref={btnRef}>
                      <ul
                        style={{
                          display:
                            RalisList.btnshow === true ? 'block' : 'none',
                        }}
                      >
                        {page.map((item, index) => {
                          return (
                            <li
                              key={index}
                              onClick={closebtnshow(index)}
                              className={
                                index == RalisList.isActive1 ? 'btnList1' : ''
                              }
                            >
                              {item + 1}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div style={{ flex: '1' }}></div>
                  <div
                    style={{
                      width: '70px',
                      display: 'flex',
                      justifyContent: ' space-between',
                    }}
                  >
                    <div className="prevBtn" onClick={perpage}></div>
                    <div className="nextBtn" onClick={nextpage}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <audio ref={audioRef} loop />
      <div
        onClick={changeplay}
        style={{
          zIndex: '1100',
          position: 'fixed',
          top: '0',
          width: '100%',
          height: '100%',
          display: showpage === true ? 'block' : 'none',
        }}
      ></div>
    </div>
  );
});

export default Ralis;
