import * as echarts from 'echarts';
import React, { memo, useEffect, useState } from 'react';

type EChartsOption = echarts.EChartsOption;
interface Props {
  ID: any; //id 
  Data:Array<any>,//数据data
  total:string //中间第一行数据
  centerTitle:string,//中间第二行数据
  centertest:string//中间第三行数据

}

const ConCom = memo((props: Props) => {
  let { ID ,Data ,centerTitle,centertest ,total =''} = props;


  function init() {
    var chartDom = document.getElementById(ID)!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: [
        '#00D8A0',
        '#F7CA3F',
        '#DA0C0C',
        '#FF7C1B',
        '#888888'
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      title: {
        text: `{a|${total}}\n{b|${centertest}}\n{c|${centerTitle}}`,
        top: '10%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#fff',
          rich: {
            a: {
              fontSize: 40,
              lineHeight: 50,
             // fontWeight: 'bold',
              color: 'rgba(106, 113, 124, 1)',
            },
            b: {
              fontSize: 16,
              color: '#black',
              lineHeight: 30,
              fontWeight: 'rgba(106, 113, 124, 1)'
            },
            c:{
              fontSize:15,
              color:'rgba(106, 113, 124, 1)'
            }
          },
        },
      },
      legend: {
        top: '70%',
        orient: 'vertical',
        left: '20%',
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        textStyle: {
          rich: {
            name: {
              color: ' rgba(106, 113, 124, 1)',
              fontSize: 16,
              width: 40,
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
          return (
            '{name| ' + name + '}{percent| ' + res[0].value + '}' + '{unit| 天}'
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
          radius: [70, 90],
          center: ['50%', '35%'],
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
