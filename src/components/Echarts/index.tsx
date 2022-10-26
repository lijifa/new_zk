import { Empty } from 'antd';
import * as echarts from 'echarts';
import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

interface PieData {
  type: string /*        图表类型
                          LineChart    折线图
                          BarChart     柱状图
                          VerBarChart  横向柱状图
                          RoundChart   圆环图
                          DashChart    仪表盘
                       */;
  XDATA: string[] | number[] | number;
  YDATA?: number[] | number[][];

  // 折线图参数 Line...
  LineName?: string | string[]; //线段名字
  LineStyleColor?: string | string[]; //线段颜色
  LineStyleOpacity?: string | string[]; //线段透明度
  LineYAxisName?: string; //Y轴单位
  LineGrid?: object; //边距
  LineXInterval?: number; //X轴数据间距
  LineYInterval?: number; //Y轴数据间距
  LineTooltipShow?: boolean; //提示框可见
  LineXtextColor?: string; //X轴刻度文字颜色
  LineColor?: string; //刻度颜色
  LineYtextColor?: string; //Y轴刻度文字颜色
  LineLegendColor?: string; //图例文字颜色
  LineLegendPadding?: number[]; //图例位置

  // 柱状图参数 Bar...
  BarName?: string | string[]; //线段名字
  BarStyleColor?: string | string[]; //线段颜色
  BarYAxisName?: string; //Y轴单位
  BarGrid?: object; //边距
  BarXInterval?: number; //X轴数据间距
  BarYInterval?: number; //Y轴数据间距
  BarTooltipShow?: boolean; //提示框可见

  // 横向柱状图参数 Ver...
  VerlabelColor?: string; //Y轴表单左侧文字颜色
  VerlabelFontSize?: number; //Y轴表单左侧文字大小
  VercountColor?: string; //Y轴表单右侧文字颜色
  VercountFontSize?: number; //Y轴表单右侧文字大小
  VershowCount?: boolean; //是否显示右侧文字
  VerstartColor?: string; //开始颜色
  VerendColor?: string; //结束颜色
  VerbarWidth?: number; //线条宽度

  // 圆环图参数 Round...
  RoundTextColor?: string; //文字颜色
  RoundStyleColor?: string; //线段颜色
  RoundPieName?: string; //线段名称
  RoundDataName?: string; //数据名称
  RoundRadius?: string[]; //宽度
  RoundTooltipShow?: boolean; //提示框可见

  // 仪表盘参数 Dash...
  DashOutTextStyle?: string; //外侧文字颜色
  DashInStyle?: string; //线段颜色
  DashMaxData?: number; //最大刻度
  DashTextPosition?: number; //文字位置
  DashPoint?: string[]; //图形位置
  DashShowText?: boolean; //是否显示文字
}

export default function Chart({
  type,
  XDATA,
  YDATA,
  LineStyleColor,
  LineYAxisName,
  LineStyleOpacity,
  LineGrid,
  LineName,
  LineXInterval,
  LineYInterval,
  LineTooltipShow,
  LineXtextColor,
  LineColor,
  LineYtextColor,
  LineLegendColor,
  LineLegendPadding,
  BarYAxisName,
  BarGrid,
  BarName,
  BarStyleColor,
  BarXInterval,
  BarYInterval,
  BarTooltipShow,
  VerlabelColor,
  VerlabelFontSize,
  VercountColor,
  VercountFontSize,
  VershowCount,
  VerstartColor,
  VerendColor,
  VerbarWidth,
  RoundTextColor,
  RoundStyleColor,
  RoundPieName,
  RoundDataName,
  RoundRadius,
  RoundTooltipShow,
  DashOutTextStyle,
  DashInStyle,
  DashMaxData,
  DashTextPosition,
  DashPoint,
  DashShowText,
}: PieData): ReactElement {
  const [xData, setXData] = useState<any>(XDATA);
  const [yData, setYData] = useState<any>(YDATA);
  const pie = useRef<any>(null);

  let setPieOPtion: any;
  let MyChart: any;
  function initChart() {
    if (MyChart != null || MyChart != undefined) {
      MyChart.dispose();
    }
    MyChart = echarts.init(pie.current);
    const options = setPieOPtion(xData, yData);
    MyChart.setOption(options);
    window.addEventListener('resize', function () {
      MyChart.resize();
    });
  }

  switch (type) {
    // 折线图
    case 'LineChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      setPieOPtion = function setPieOption(XData: [], YData: []) {
        const xdata = XData;
        const ydata = YData;
        const lineName = LineName || [];
        const lineStyleColor = LineStyleColor || [];
        const lineStyleOpacity = LineStyleOpacity || [];
        const lineYAxisName = LineYAxisName;
        const lineTooltipShow = LineTooltipShow || false;
        const lineXtextColor = LineXtextColor || '#A5EAFF';
        const lineColor = LineColor || '#133755';
        const lineYtextColor = LineYtextColor || '#A5EAFF';
        const lineLegendColor = LineLegendColor || '#A5EAFF';
        const grid = LineGrid || {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '3%',
          containLabel: true,
        };
        const lineXInterval = LineXInterval;
        const lineYInterval = LineYInterval;
        const lineLegendPadding = LineLegendPadding || [0, 0, 0, 0];
        const series = ydata.map((item, index) => {
          const StyleColor = lineStyleColor[index] || '#00FFFF';
          const StyleOpacity = lineStyleOpacity[index] || 0.3;
          const name = lineName[index];
          return {
            name: name,
            data: item,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: StyleColor, // 折线线条颜色
              width: 3, //线条宽度
            },
            itemStyle: {
              color: StyleColor, //小圆点颜色
            },
            zlevel: index,
            z: index,
            showSymbol: false, //小圆点显示方式
            areaStyle: {
              color: StyleColor, //改变区域颜色
              opacity: StyleOpacity,
            },
          };
        });

        return {
          // 提示框
          tooltip: {
            show: lineTooltipShow,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: grid,
          xAxis: {
            type: 'category',
            data: xdata,
            axisLine: {
              lineStyle: {
                color: lineColor, //X轴刻度颜色
              },
            },
            axisLabel: {
              interval: lineXInterval, //数据间距
              color: lineXtextColor, //X轴刻度文字颜色
            },
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            name: lineYAxisName, //Y轴单位
            nameTextStyle: {
              color: '#A5EAFF',
            },
            interval: lineYInterval, //数据间距
            axisLine: {
              show: true, //Y轴刻度线显示
              lineStyle: {
                color: lineColor, //Y轴刻度颜色
              },
            },
            splitLine: {
              lineStyle: {
                color: lineColor, //Y轴网格背景颜色
              },
            },
            axisLabel: {
              color: lineYtextColor, //Y轴刻度文字颜色
            },
            boundaryGap: false, //设置左右边距
          },
          // 图例
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            padding: lineLegendPadding,
            textStyle: {
              color: lineLegendColor,
            },
          },
          series: series,
        };
      };
      break;
    // 柱状图
    case 'BarChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      setPieOPtion = function setPieOption(XData: [], YData: []) {
        const xdata = XData;
        const ydata = YData;
        const grid = BarGrid || {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '3%',
          containLabel: true,
        };
        const barYAxisName = BarYAxisName;
        const barName = BarName || [];
        const barXInterval = BarXInterval;
        const barYInterval = BarYInterval;
        const barTooltipShow = BarTooltipShow || false;
        const barStyleColor = BarStyleColor || [];
        const series = ydata.map((item, index) => {
          const StyleColor = barStyleColor[index] || '#00FFFF';
          const name = barName[index];
          return {
            name: name,
            type: 'bar',
            zlevel: index,
            z: index,
            barWidth: '20%',
            data: item,
            itemStyle: {
              color: StyleColor,
            },
          };
        });
        return {
          tooltip: {
            show: barTooltipShow,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: grid,
          xAxis: [
            {
              type: 'category',
              data: xdata,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: '#133755', //X轴刻度颜色
                },
              },
              axisLabel: {
                interval: barXInterval, //数据间距
                color: '#A5EAFF', //X轴刻度文字颜色
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: barYAxisName, //Y轴单位
              nameTextStyle: {
                color: '#A5EAFF',
              },
              interval: barYInterval, //数据间距
              axisLine: {
                show: true, //Y轴刻度线显示
                lineStyle: {
                  color: '#133755', //Y轴刻度颜色
                },
              },
              splitLine: {
                lineStyle: {
                  color: '#133755', //Y轴网格背景颜色
                },
              },
              axisLabel: {
                color: '#A5EAFF', //Y轴刻度文字颜色
              },
              boundaryGap: false, //设置左右边距
            },
          ],
          series: series,
        };
      };

      break;
    // 横向柱状图
    case 'VerBarChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      setPieOPtion = function setPieOption(XData: [], YData: []) {
        const xdata = XData;
        const ydata = YData;
        const verlabelColor = VerlabelColor || '#fff';
        const verlabelFontSize = VerlabelFontSize || 12;
        const vercountColor = VercountColor || '#fff';
        const vercountFontSize = VercountFontSize || 12;
        const vershowCount = VershowCount || false;
        const verstartColor = VerstartColor || 'rgb(72,212,150,1)';
        const verendColor = VerendColor || 'rgb(0,255,255,1)';
        const verbarWidth = VerbarWidth || 10;
        const data = ydata.map((item) => {
          return item;
        });
        return {
          grid: {
            left: '2%',
            right: '2%',
            bottom: '0%',
            top: '2%',
            containLabel: true,
          },
          xAxis: {
            show: false,
            type: 'value',
          },
          yAxis: [
            {
              type: 'category',
              inverse: true,
              axisLabel: {
                show: true,
                color: verlabelColor,
                fontSize: verlabelFontSize,
                lineHeight: 16,
                interval: 0,
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              data: xdata,
            },
            {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: vershowCount,
              axisLabel: {
                color: vercountColor,
                fontSize: vercountFontSize,
                interval: 0,
              },
              data: ydata,
            },
          ],
          series: [
            {
              // name: "值",
              type: 'bar',
              zlevel: 1,
              cursor: 'default',
              itemStyle: {
                BorderRadius: 2,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: verstartColor,
                  },
                  {
                    offset: 1,
                    color: verendColor,
                  },
                ]),
              },
              barWidth: verbarWidth,
              data: data[0],
            },
            {
              // name: "背景",
              type: 'bar',
              barWidth: 2 * verbarWidth,
              barGap: '-150%',
              cursor: 'default',
              data: '',
              itemStyle: {
                color: 'rgba(0,163,163,0.5)',
                BorderRadius: 2,
              },
            },
          ],
        };
      };
      break;
    // 圆环图
    case 'RoundChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      setPieOPtion = function setPieOption(XData: number) {
        const xdata = XData;
        const roundTextColor = RoundTextColor || '#fff';
        const roundStyleColor = RoundStyleColor || '#36D0FF';
        const roundPieName = RoundPieName || 'Line 1';
        const roundDataName = RoundDataName || '01';
        const roundRadius = RoundRadius || ['50%', '60%'];
        const roundTooltipShow = RoundTooltipShow || false;
        return {
          title: {
            text: xdata + '%',
            x: 'center',
            y: 'center',
            textStyle: {
              color: roundTextColor, //文字颜色
              fontSize: '3em',
            },
          },
          tooltip: {
            show: roundTooltipShow,
            trigger: 'item',
            axisPointer: {
              type: 'shadow',
            },
          },
          color: '#333',
          series: [
            {
              name: roundPieName,
              type: 'pie',
              clockWise: true,
              radius: roundRadius,
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              hoverAnimation: false,
              data: [
                {
                  value: xdata,
                  name: roundDataName,
                  itemStyle: {
                    normal: {
                      color: roundStyleColor,
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                  },
                },
                {
                  // name: ,
                  value: 100 - (xdata as number),
                },
              ],
            },
          ],
        };
      };
      break;
    // 仪表盘
    case 'DashChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      setPieOPtion = function setPieOption(XData: number) {
        const point = DashPoint || ['50%', '60%'];
        const radius = { inner: '', outer: '' };
        const colorSet = DashOutTextStyle || '#00FFFF';
        const colorSet2 = DashInStyle || '#04a7a7';
        const maxdata = DashMaxData || 100;
        const axisLabel = {
          show: DashShowText || false,
          color: colorSet,
          distance: DashTextPosition || -15, //文字位置
        };
        const dataArr = XData || '';
        return {
          series: [
            {
              name: '内部进度条',
              type: 'gauge',
              center: point,
              radius: radius.inner || '50%',
              splitNumber: 10,
              axisLine: {
                lineStyle: {
                  color: [
                    // [dataArr1 / 100, colorSet.color],
                    [1, colorSet2],
                    [1, 'rgba(14, 79, 83, 1)'],
                    //  [1, "#04a7a7"],
                    // [1, "rgba(14, 79, 83, 1)"],
                  ],
                  width: 10,
                },
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              itemStyle: {
                show: false,
              },
              detail: {
                show: false,
                formatter: function (value: any) {
                  if (value !== 0) {
                    const num = Math.round(value).toString();
                    return parseInt(num).toFixed(0) + '%';
                  } else {
                    return 0;
                  }
                },
                offsetCenter: [0, 82],
                axisLabel: {
                  padding: [0, 0, 0, 0],
                  fontSize: 18,
                  fontWeight: '700',
                  color: colorSet,
                },
              },
              title: {
                //标题
                show: true,
                offsetCenter: [0, 46], // x, y，单位px
                axisLabel: {
                  color: '#fff',
                  fontSize: 14, //表盘上的标题文字大小
                  fontWeight: 400,
                  fontFamily: 'PingFangSC',
                },
              },
              data: [
                {
                  // name: "title",
                  value: dataArr,
                },
              ],
              pointer: {
                show: true,
                length: '60%',
                radius: '20%',
                width: 8, //指针粗细
                itemStyle: {
                  color: '#04a7a7',
                },
              },
              animationDuration: 4000,
              min: 0, //最小刻度
              max: maxdata, //最大刻度
            },
            {
              name: '外部刻度',
              type: 'gauge',
              center: point,
              radius: radius.outer || '62%',
              min: 0, //最小刻度
              max: maxdata, //最大刻度
              splitNumber: 10, //刻度数量
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: [[1, 'rgba(0,0,0,0)']],
                },
              },
              //仪表盘轴线,文字位置
              axisLabel: axisLabel,
              //刻度标签。
              axisTick: {
                show: true,
                splitNumber: 5,
                lineStyle: {
                  color: colorSet, //用颜色渐变函数不起作用
                  width: 1,
                },
                length: -8, //刻度宽度
              },
              //刻度样式
              splitLine: {
                show: true,
                length: -13, //长线刻度宽度
                lineStyle: {
                  color: colorSet, //用颜色渐变函数不起作用
                  width: 1,
                },
              }, //分隔线样式
              detail: {
                show: false,
              },
              pointer: {
                show: false,
              },
            },
          ],
        };
      };
      break;
    // 带图例的圆环图
    case 'RoundToolChart':
      if (xData?.length == 0 || xData == null || xData == undefined) {
        return (
          <div style={{ height: '100%' }}>
            <Empty />
          </div>
        );
      }
      let echartData = [
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
      let total = 0;
      echartData.forEach(function (value) {
        total += value.value;
      });
      setPieOPtion = function setPieOption(XData: number) {
        return {
          // 数据初始化
          color: [
            '#06FDBC',
            '#F6FE05',
            '#07B0FE',
            '#FDB408',
            '#00DB1C',
            '#0188FE',
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          title: {
            text: '{a|' + total + '}\n{b|任务总数}',
            top: 'center',
            textAlign: 'center',
            left: '49.5%',
            textStyle: {
              color: '#fff',
              rich: {
                a: {
                  fontSize: 30,
                  lineHeight: 60,
                  fontWeight: 400,
                  color: '#00FFFF',
                },
                b: {
                  fontSize: 15,
                  color: '#96d6ff',
                },
              },
            },
          },
          legend: {
            top: 'center',
            orient: 'vertical',
            left: '75%',
            icon: 'rect',
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 13,
            textStyle: {
              rich: {
                name: {
                  color: '#96d6ff',
                  fontSize: 12,
                  width: 80,
                },
                percent: {
                  color: '#18DB9F',
                  fontSize: 20,
                },
                unit: {
                  color: '#96d6ff',
                  fontSize: 12,
                },
              },
            },
            formatter: function (name: any) {
              let res = echartData.filter((v) => v.name === name);
              return (
                '{name| ' +
                name +
                '}{percent| ' +
                res[0].value +
                '}' +
                '{unit| 次}'
              );
            },
          },
          toolbox: {
            show: false,
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: [65, 80],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: false,
                },
              },
              // hoverAnimation: false,
              hoverOffset: 5,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                },
              },
              data: echartData,
            },
          ],
        };
      };
      break;
    default:
      console.log('setPieOPtion错误：输入Type名字不匹配');
      break;
  }

  useEffect(() => {
    setYData(YDATA);
    setXData(XDATA);
    setTimeout(() => {
      initChart();
    }, 500);
  }, []);

  // const Btn = document.getElementsByClassName(
  //   'ant-pro-sider-collapsed-button',
  // )[0];

  // Btn.addEventListener('click', () => {
  //   setTimeout(() => {
  //     if (MyChart != null || MyChart != undefined) {
  //       MyChart.dispose();
  //     }
  //     MyChart = echarts.init(pie.current);
  //     const options = setPieOPtion(xData, yData);
  //     MyChart.setOption(options);
  //     MyChart.resize();
  //   }, 200);
  // });

  return <div ref={pie} className={styles.pie} id="pie" />;
}
