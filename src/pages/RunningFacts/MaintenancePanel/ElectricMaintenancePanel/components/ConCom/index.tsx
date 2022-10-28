import * as echarts from 'echarts';
import React, { memo, useEffect, useState } from 'react';

type EChartsOption = echarts.EChartsOption;
interface Props {
  ID: any;
}

const ConCom = memo((props: Props) => {

  let { ID } = props;
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
  function init() {
    var chartDom = document.getElementById(ID)!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: [
        'rgba(22, 143, 255, 1)',
        'rgba(72, 211, 150, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(232, 211, 111, 1)',
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      title: {
        text: '{a|' + total + '}\n{b|任务总数}',
        top: 'center',
        textAlign: 'center',
        left: '22%',
        textStyle: {
          color: '#fff',
          rich: {
            a: {
              fontSize: 60,
              lineHeight: 80,
              fontWeight: 'bold',
              color: '#00FFFF',
            },
            b: {
              fontSize: 20,
              color: '#96d6ff',
            },
          },
        },
      },
      legend: {
        top: '20%',
        orient: 'vertical',
        left: '45%',
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        textStyle: {
          rich: {
            name: {
              color: 'rgba(150, 214, 255, 1)',
              fontSize: 18,
              width: 150,
            },
            percent: {
              color: 'rgba(0, 255, 255, 1)',
              fontSize: 25,
            },
            unit: {
              color: 'rgba(150, 214, 255, 1)',
              fontSize: 15,
            },
          },
        },
        formatter: function (name: any) {
          let res = echartData.filter((v) => v.name === name);
          return (
            '{name| ' + name + '}{percent| ' + res[0].value + '}' + '{unit| 次}'
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
          radius: [70, 95],
          center: ['23%', '50%'],
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
