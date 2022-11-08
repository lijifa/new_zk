/* 
  Echart二次封装组件
*/

import * as echarts from 'echarts';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import styles from './index.less';

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
  ConComUnit,
  ConComTitle,
  ConComTitle2,
  ConComTitle3,
  ConComCircle,
  ConComMiddletext,
  ConComOutsidetext,
  ConComColor,
  ConComformatterColor,
  ConComformatterSize,
  ConComTitleColor
}: PieData): ReactElement {
  const xDataRef = useRef(XDATA);
  const yDataRef = useRef(YDATA);
  const pie = useRef<any>(null);
  const chartContent = useRef<any>(null);
  let setPieOPtion: any;
  let MyChart: any;
  function initChart() {
    if (MyChart != undefined) {
      MyChart.dispose();
    }
    MyChart = echarts.init(pie.current);
    const options = setPieOPtion(xDataRef, yDataRef);
    MyChart.setOption(options);
    window.addEventListener('resize', function () {
      MyChart.resize();
    });
  }

  switch (type) {
    // 折线图
    case 'Line':
      setPieOPtion = function setPieOption(xDataRef: any, yDataRef: any) {
        const xdata = xDataRef.current;
        const ydata = yDataRef.current;
        const lineName = LineName || [];
        const lineStyleColor = LineStyleColor || [];
        const lineStyleOpacity = LineStyleOpacity || [];
        const lineYAxisName = LineYAxisName;
        const lineTooltipShow = LineTooltipShow ?? true;
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
        const series = ydata?.map((item: any, index: any) => {
          const StyleColor = lineStyleColor[index] || '#00FFFF';
          const StyleOpacity = lineStyleOpacity[index] ?? 0.3;
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
    case 'Bar':
      setPieOPtion = function setPieOption(xDataRef: any, yDataRef: any) {
        const xdata = xDataRef.current;
        const ydata = yDataRef.current;
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
        const barTooltipShow = BarTooltipShow ?? true;
        const barStyleColor = BarStyleColor || [];
        const series = ydata?.map((item: any, index: any) => {
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
    case 'VerBar':
      setPieOPtion = function setPieOption(xDataRef: any, yDataRef: any) {
        const xdata = xDataRef.current;
        const ydata = yDataRef.current;
        const verlabelColor = VerlabelColor || '#fff';
        const verlabelFontSize = VerlabelFontSize ?? 12;
        const vercountColor = VercountColor || '#fff';
        const vercountFontSize = VercountFontSize ?? 12;
        const vershowCount = VershowCount || false;
        const verstartColor = VerstartColor || 'rgb(72,212,150,1)';
        const verendColor = VerendColor || 'rgb(0,255,255,1)';
        const verbarWidth = VerbarWidth ?? 10;
        const data = ydata?.map((item: any) => {
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
    case 'Round':
      setPieOPtion = function setPieOption(xDataRef: any) {
        const xdata = xDataRef.current;
        const roundTextColor = RoundTextColor || '#fff';
        const roundStyleColor = RoundStyleColor || '#36D0FF';
        const roundPieName = RoundPieName || 'Line 1';
        const roundDataName = RoundDataName || '01';
        const roundRadius = RoundRadius || ['50%', '60%'];
        const roundTooltipShow = RoundTooltipShow ?? true;
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
    case 'Dash':
      setPieOPtion = function setPieOption(xDataRef: any) {
        const point = DashPoint || ['50%', '60%'];
        const radius = { inner: '', outer: '' };
        const colorSet = DashOutTextStyle || '#00FFFF';
        const colorSet2 = DashInStyle || '#04a7a7';
        const maxdata = DashMaxData ?? 100;
        const axisLabel = {
          show: DashShowText || false,
          color: colorSet,
          distance: DashTextPosition ?? -15, //文字位置
        };
        const dataArr = xDataRef.current || '';
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
    case 'ConCom':
      setPieOPtion = function setPieOption(xDataRef: any) {
        let getAllValue = 0;
        const getxDataRef = () => {
          xDataRef.current.map((res: any) => {
            return (getAllValue += res.value);
          });
        };
        getxDataRef();
        const data = xDataRef.current;
        const unit = ConComUnit;
        const AllValue = getAllValue;
        const title = ConComTitle;
        const title2 = ConComTitle2;
        const title3 = ConComTitle3;
        const circle = ConComCircle;
        const middletext = ConComMiddletext;
        const outsidetext = ConComOutsidetext;
        const color = ConComColor || [
          '#00D8A0',
          '#888888',
          '#DA0C0C',
          '#FF7C1B',
          '#F7CA3F',
        ];
       const formatter = ConComformatterColor || [
        ' rgba(106, 113, 124, 1)',
        ' rgba(106, 113, 124, 1)',
        ' rgba(106, 113, 124, 1)',
       ]
       const fromattersize = ConComformatterSize || [16,16,15,15] //最后一位是item高度
       const titleColor = ConComTitleColor || [
        ' rgba(106, 113, 124, 1)',
        ' rgba(106, 113, 124, 1)',
        ' rgba(106, 113, 124, 1)',
       ]
        return {
          color: color,
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          title: {
            text: `{a|${AllValue}}\n{b|${
              title2?.text ? title2?.text : ''
            }}\n{c|${title3?.text}}`,
            top: middletext?.top,
            textAlign: 'center',
            left: middletext?.left,
            textStyle: {
              color: '#fff',
              rich: {
                a: {
                  fontSize: title?.size,
                  lineHeight: title?.linHeight,
                  // fontWeight: 'bold',
                  color: titleColor[0],
                },
                b: {
                  fontSize: title2?.size,
                  color: titleColor[1],
                  lineHeight: title2?.linHeight,
                },
                c: {
                  fontSize: title3?.size,
                  color: titleColor[2],
                },
              },
            },
          },
          legend: {
            top: outsidetext?.top,
            orient: 'vertical',
            left: outsidetext?.left,
            icon: 'rect',
            itemWidth: 15,
            itemHeight: fromattersize[3],
            itemGap: 13,
            textStyle: {
              rich: {
                name: {
                  color: formatter[0],
                  fontSize: fromattersize[0],
                  width: outsidetext?.width1,
                },
                percent: {
                  color: formatter[1],
                  fontSize: fromattersize[1],
                },
                unit: {
                  color:formatter[2],
                  fontSize: fromattersize[2],
                },
              },
            },
            formatter: function (name: any) {
              let res = data.filter((v: any) => v.name === name);
              return `{name| ${name} }{percent| ${
                res[0].value === undefined ? '--' : res[0].value
              }}{unit| ${unit}}`;
            },
          },
          toolbox: {
            show: false,
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: [circle?.min, circle?.max],
              center: [circle?.left, circle?.top],
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
              data: data,
            },
          ],
        };
      };
      break;
    default:
      console.log('setPieOPtion错误：输入Type名字不匹配');
      break;
  }

  // 实时更新数据
  useEffect(() => {
    xDataRef.current = XDATA;
    yDataRef.current = YDATA;
    setTimeout(() => {
      initChart();
    }, 300);
  }, [XDATA, YDATA]);

  // 实时更新尺寸
  useEffect(() => {
    let ResizeObject = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        if (ele == undefined) {
        }
        setTimeout(() => {
          MyChart.resize();
        }, 301);
      }
    });
    const ele = document.getElementById('chartContent');
    if (ele) {
      ResizeObject.observe(ele);
    }
  }, []);

  return (
    <div
      ref={chartContent}
      style={{ height: '100%', width: '100%' }}
      id="chartContent"
    >
      <div ref={pie} className={styles.pie} id="pie" />
    </div>
  );
}
