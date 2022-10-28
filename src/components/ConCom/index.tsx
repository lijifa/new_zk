import * as echarts from 'echarts';
import React, { memo, useEffect } from 'react';

type EChartsOption = echarts.EChartsOption;


const ConCom = memo((props: API.Props) => {
  let {
    ID,
    Data,
    unit,
    title,
    title2,
    title3,
    circle,
    middletext,
    outsidetext
  } = props;

  function init() {
    var chartDom = document.getElementById(ID)!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#00D8A0', '#F7CA3F', '#DA0C0C', '#FF7C1B', '#888888'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      title: {
        text: `{a|${title?.text === undefined ? '':title?.text}}\n{b|${title2?.text}}\n{c|${title3?.text}}`,
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
              color: 'rgba(106, 113, 124, 1)',
            },
            b: {
              fontSize: title2?.size,
              color: 'rgba(106, 113, 124, 1)k',
              lineHeight: title2?.linHeight,
            },
            c: {
              fontSize: title3?.size,
              color: 'rgba(106, 113, 124, 1)',
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
        itemHeight: 15,
        itemGap: 13,
        textStyle: {
          rich: {
            name: {
              color: ' rgba(106, 113, 124, 1)',
              fontSize: 16,
              width: outsidetext?.width1,
            },
            percent: {
              color: ' rgba(106, 113, 124, 1)',
              fontSize: 16,
            },
            unit: {
              color: 'rgba(106, 113, 124, 1)',
              fontSize: 15,
            },
          },
        },
        formatter: function (name: any) {
          let res = Data.filter((v) => v.name === name);
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
          center: [ circle?.left,circle?.top],
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
          data: Data,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <div
      id={ID}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    ></div>
  );
});

export default ConCom;
