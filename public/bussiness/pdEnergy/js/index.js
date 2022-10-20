var hdEnergy = {};
var _SITE_ID = getParams()['siteId'];
var layuiId = getParams()['layuiId']; //菜单id
var timer = null;
var timer1 = null;
// 离开页面调用
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden') {
    clearInterval(timer);
  } else {
    hdEnergy.fiveMinutesUpdate(); //五分钟更新
  }
});
// var objName = layuiId;
// window.onunload = function() {
// 	top.unregisterListener(objName); //销毁
// 	clearInterval(timer);
// }
// top.registerListener(objName, function(e) {
// 	if(e == objName){
// 		hdEnergy.fiveMinutesUpdate();//五分钟更新
// 	} else {
// 		clearInterval(timer);
// 	}
// 	// hdEnergy.betterSystom();// 分系统耗电概览
// }); //注册
hdEnergy.init = function () {
  hdEnergy.electricityUsing(); // 当月用电时段统计
  hdEnergy.transformerPower(); // 变压器无功功率
  hdEnergy.powerFactor(); // 功率因数曲线
  hdEnergy.deviceRunList(); // 电能集抄
  hdEnergy.betterSystom(); // 分系统耗电概览
  hdEnergy.selectCurrentMonthMaxLoad(); // 当月最大负荷趋势图
  hdEnergy.maxTrend(); //最大需量
  hdEnergy.fiveMinutesUpdate(); //五分钟更新
};
hdEnergy.fiveMinutesUpdate = function () {
  timer = setInterval(function () {
    hdEnergy.transformerPower(); // 变压器无功功率
    hdEnergy.powerFactor(); // 功率因数曲线
    hdEnergy.deviceRunList(); // 电能集抄
    hdEnergy.betterSystom(); // 分系统耗电概览
    hdEnergy.maxTrend(); //最大需量
  }, 5 * 60 * 1000);
};
function gettimecode(type) {
  var timeCode;
  if (type == 'month') {
    timeCode = 5;
  } else if (type == 'year') {
    timeCode = 6;
  }
  return timeCode;
}
// 当月用电时段统计
hdEnergy.electricityUsing = function () {
  $.get(
    hdInterface.selectImvElectricityStatistics,
    {
      siteId: _SITE_ID,
    },
    function (data) {
      if (data['code'] === 0) {
        $('#hightSum').html(
          convert(data.data['hightSum']) == '--'
            ? '0'
            : convert(data.data['hightSum']),
        );
        $('#highProportion').html(convert(data.data['highProportion']));
        $('#higtCostSum').html(convert(data.data['higtCostSum']));
        $('#flatSum').html(
          convert(data.data['flatSum']) == '--'
            ? '0'
            : convert(data.data['flatSum']),
        );
        $('#flatProportion').html(convert(data.data['flatProportion']));
        $('#flatCostSum').html(convert(data.data['flatCostSum']));
        $('#lowEbbSum').html(
          convert(data.data['lowEbbSum']) == '--'
            ? '0'
            : convert(data.data['lowEbbSum']),
        );
        $('#lowEbbProportion').html(convert(data.data['lowEbbProportion']));
        $('#lowEbbCostSum').html(convert(data.data['lowEbbCostSum']));
        if (data.data.lineChartMap.length == 0) {
          $('#electricityUsing .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimage">
				`);
          $('#main3 .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimage">
				`);
        } else {
          let lineChartMap = data.data.lineChartMap;
          let obj = {
            dataX: [],
            dataG: [],
            dataP: [],
            dataD: [],
            title: [],
            titleG: [],
            titleP: [],
            titleD: [],
            color: ['#0078FF', '#2CEEFF', '#FFF831'],
          };
          for (let key in lineChartMap) {
            if (key == 'dataX') {
              obj.dataX = lineChartMap[key].split(',');
            } else {
              lineChartMap[key] = JSON.parse(lineChartMap[key]);
              if (lineChartMap[key].name.indexOf('高') !== -1) {
                obj.dataG = lineChartMap[key].data.split(',');
                obj.titleG = lineChartMap[key].name;
                obj.title[2] = lineChartMap[key].name;
              } else if (lineChartMap[key].name.indexOf('低') !== -1) {
                obj.dataD = lineChartMap[key].data.split(',');
                obj.titleD = lineChartMap[key].name;
                obj.title[1] = lineChartMap[key].name;
              } else {
                obj.dataP = lineChartMap[key].data.split(',');
                obj.titleP = lineChartMap[key].name;
                obj.title[0] = lineChartMap[key].name;
              }
            }
          }
          if (obj.dataX.length == 0) {
            $('#electricityUsing .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
					`);
            $('#main3 .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
					`);
          } else {
            echarsComponent.getStackBarChars({
              elementId: 'electricityUsing', //容器id	[必填]
              xdata: obj.dataX, //横坐标数据[必填]
              ydata: [obj.dataD, obj.dataP, obj.dataG], //纵坐标数据[必填]
              ydataTitle: [obj.titleD, obj.titleP, obj.titleG], //提示框标题项
              units: 'kW·h', //单位[非必填]
              // "interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
              barWidth: 10, //图表宽度
              itemColor: obj.color,
              provideNumber: 5,
              grid: {
                left: '40px',
                right: '20px',
                bottom: '5px',
                top: '25px',
              },
              yAxisMinInterval: 1500,
              yAxisMin: 0,
            });
            let dataX = [];
            let dataY1 = [],
              dataY2 = [];
            obj.dataX.forEach((item, index) => {
              dataX.push(item);
            });
            /* dataY1 = [
						5234.30,4503.65,4818.16,4271.93,4851.44,5129.54,3486.95,4491.54,4789.42,4135.42,
						4661.38,4723.65,5358.16,4871.93,3491.54,4389.42,4515.42,2806.95,3891.54,4589.42,
						4215.42,4862.38,4023.65,4558.16,4851.44,5329.54,4271.93,5651.44,5059.54,3406.95,
					]
					hdEnergy.maxTrend('main3',dataX,dataY1); */
          }
        }
      }
    },
  );
};
// 变压器无功功率
let bgColor = ['#00FFFF', '#0078ff'];
hdEnergy.transformerPower = function () {
  $.get(
    hdInterface.transformerUnPower,
    {
      siteId: _SITE_ID,
      type: 0,
    },
    function (data) {
      if (data['code'] === 0) {
        if (JSON.stringify(data.data) == '{}') {
          $('#main1 .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
				`);
        } else {
          let name = [],
            dataX = [],
            dataY = [],
            dataY2 = [];
          data.data.dataX.split(',').forEach((item) => {
            dataX.push(item + ':00');
          });
          dataY = JSON.parse(data.data.dataY).data.split(',');
          dataY2 = JSON.parse(data.data.dataY2).data.split(',');
          name[0] = JSON.parse(data.data.dataY).name;
          name[1] = JSON.parse(data.data.dataY2).name;
          $('#main1Legend .legend').html('');
          name.forEach((item, index) => {
            $('#main1Legend .legend').append(`
						<span><em style="background-color:${bgColor[index]};"></em>${item}</span>
					`);
          });

          echarsComponent.getLine({
            elementId: 'main1', //容器id	[必填]
            xdata: dataX, //横坐标数据[必填]
            ydata: [dataY, dataY2], //纵坐标数据[必填]
            ydataTitle: name, //提示框标题项
            linecolors: bgColor, //线颜色[非必填]
            // areaStyleOpacity:0.5,//区域颜色[渐变色必填]
            unit: 'kVar', //单位
            grid: {
              left: '30px',
              right: '30px',
              bottom: '5px',
              top: '25px',
              containLabel: true,
            }, //边距[非必填]
            yAxisMinInterval: 5,
            yAxisMin: 0,
            // "offectTop":"rgba(0, 255, 255, 1)",
            // "offectMiddle":"rgba(0, 255, 255, 0.5)",
            // "offectBottom":"rgba(0, 255, 255, 0.2)",
          });
        }
      }
    },
  );
};
// 功率因数曲线
hdEnergy.powerFactor = function () {
  $.get(
    hdInterface.transformerUnPower,
    {
      siteId: _SITE_ID,
      type: 1,
    },
    function (data) {
      if (data['code'] === 0) {
        if (JSON.stringify(data.data) == '{}') {
          $('#main2 .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
				`);
        } else {
          let name = [],
            dataX = [],
            dataY = [],
            dataY2 = [];
          data.data.dataX.split(',').forEach((item) => {
            dataX.push(item + ':00');
          });
          dataY = JSON.parse(data.data.dataY).data.split(',');
          dataY2 = JSON.parse(data.data.dataY2).data.split(',');
          name[0] = JSON.parse(data.data.dataY).name;
          name[1] = JSON.parse(data.data.dataY2).name;
          $('#main2Legend .legend').html('');
          name.forEach((item, index) => {
            $('#main2Legend .legend').append(`
						<span><em style="background-color:${bgColor[index]};"></em>${item}</span>
					`);
          });
          echarsComponent.getLine({
            elementId: 'main2', //容器id	[必填]
            xdata: dataX, //横坐标数据[必填]
            ydata: [dataY, dataY2], //纵坐标数据[必填]
            ydataTitle: name, //提示框标题项
            linecolors: bgColor, //线颜色[非必填]
            // areaStyleOpacity:0.5,//区域颜色[渐变色必填]
            // interval:0,//间隔[非必填]
            // "unit":"%",//单位
            grid: {
              left: '30px',
              right: '30px',
              bottom: '5px',
              top: '25px',
              containLabel: true,
            }, //边距[非必填]
            yAxisMinInterval: 0.2,
            yAxisMin: 0.7,
            yAxisMax: 1,
            // "offectTop":"rgba(0, 255, 255, 1)",
            // "offectMiddle":"rgba(0, 255, 255, 0.5)",
            // "offectBottom":"rgba(0, 255, 255, 0.2)",
          });
        }
      }
    },
  );
};
// 当月最大需量趋势图
hdEnergy.maxTrendBtnType = 0;
hdEnergy.selectMaximum = [];
hdEnergy.maxTrend = function () {
  $.get(hdInterface.selectMaximum, { siteId: _SITE_ID }, function (data) {
    if (data.code == 0) {
      if (data.data.length == 0) {
        $('#main3 .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
				`);
        return;
      }
      hdEnergy.selectMaximum = data.data;
      $('#maintain-equipment .changeBtn').html('');
      hdEnergy.selectMaximum.forEach((item, index) => {
        $('#maintain-equipment .changeBtn').append(`
				<button data-type="${index}" class="${
          index == hdEnergy.maxTrendBtnType ? 'on' : ''
        }">${item.name}</button>
				`);
      });
      hdEnergy.maxTrendLine(hdEnergy.maxTrendBtnType);
      $(document).on('click', '.changeBtn button', function () {
        let type = $(this).attr('data-type');
        if (type == hdEnergy.maxTrendBtnType) {
          return;
        }
        $(this).addClass('on').siblings().removeClass('on');
        hdEnergy.maxTrendBtnType = type;
        hdEnergy.maxTrendLine(hdEnergy.maxTrendBtnType);
      });
    }
  });
};
hdEnergy.maxTrendLine = function (type) {
  let color = ['#00ffff', '#0078ff', '#fff831'];
  let data = hdEnergy.selectMaximum[type];
  let name = [],
    dataX = [],
    dataY2 = [],
    dataY3 = [],
    dataY4 = [];
  data.data.dataX.split(',').forEach((item) => {
    dataX.push(item + ':00');
  });
  dataY2 = JSON.parse(data.data.dataY2).data.split(',');
  dataY3 = JSON.parse(data.data.dataY3).data.split(',');
  dataY4 = JSON.parse(data.data.dataY4).data.split(',');
  name[0] = JSON.parse(data.data.dataY2).name;
  name[1] = JSON.parse(data.data.dataY3).name;
  name[2] = JSON.parse(data.data.dataY4).name;
  let title = [];
  $('.legendMax').html('');
  name.forEach((item, index) => {
    // $('.legendMax').append(`
    // 	<span><em style="background-color:${color[index]};"></em>${item.includes('A')?'A相':item.includes('B')?'B相':'C相'}</span>
    // `)
    title.push(item.includes('A') ? 'A相' : item.includes('B') ? 'B相' : 'C相');
  });
  title.forEach((item, index) => {
    $('.legendMax').append(`
			<span><em style="background-color:${color[index]};"></em>${
      item.includes('A') ? 'A相' : item.includes('B') ? 'B相' : 'C相'
    }</span>
		`);
  });
  echarsComponent.getLine({
    elementId: 'main3', //容器id	[必填]
    xdata: dataX, //横坐标数据[必填]
    ydata: [dataY2, dataY3, dataY4], //纵坐标数据[必填]
    ydataTitle: title, //提示框标题项
    linecolors: color, //线颜色[非必填]
    // areaStyleOpacity:0.5,//区域颜色[非必填]
    unit: '%', //单位
    grid: {
      left: '30px',
      right: '20px',
      bottom: '5px',
      top: '25px',
      containLabel: true,
    }, //边距[非必填]
    yAxisMinInterval: 20,
    yAxisMin: 0,
    // "offectTop":"rgba(0, 255, 255, 1)",
    // "offectMiddle":"rgba(0, 255, 255, 0.5)",
    // "offectBottom":"rgba(0, 255, 255, 0.2)",
  });
};
// 当月最大负荷趋势图
hdEnergy.selectCurrentMonthMaxLoad = function () {
  $.get(
    hdInterface.transformerUnPower,
    {
      siteId: _SITE_ID,
      type: 2,
    },
    function (data) {
      if (data['code'] === 0) {
        if (JSON.stringify(data.data) == '{}') {
          $('#circle').html(`
					<img src="../../common/image/nodata.png" class="posimage">
				`);
        } else {
          let name = [],
            dataX = [],
            dataY = [],
            dataY2 = [];
          data.data.dataX.split(',').forEach((item) => {
            dataX.push(item);
          });
          dataY = JSON.parse(data.data.dataY).data.split(',');
          dataY2 = JSON.parse(data.data.dataY2).data.split(',');
          name[0] = JSON.parse(data.data.dataY).name;
          name[1] = JSON.parse(data.data.dataY2).name;
          $('#equfaulttop5 .legend').html('');
          name.forEach((item, index) => {
            $('#equfaulttop5 .legend').append(`
						<span><em style="background-color:${bgColor[index]};"></em>${item}</span>
					`);
          });
          echarsComponent.getLineShadow({
            elementId: 'circle', //容器id	[必填]
            xdata: dataX, //横坐标数据[必填]
            ydata: [dataY, dataY2], //纵坐标数据[必填]
            ydataTitle: name, //提示框标题项
            linecolors: bgColor, //线颜色[非必填]
            // areaStyleOpacity:0.5,//区域颜色[非必填]
            unit: 'kW', //单位
            grid: {
              left: '30px',
              right: '20px',
              bottom: '5px',
              top: '25px',
              containLabel: true,
            }, //边距[非必填]
            yAxisMinInterval: 50,
            yAxisMin: 0,
            // "offectTop":"rgba(0, 255, 255, 1)",
            // "offectMiddle":"rgba(0, 255, 255, 0.5)",
            // "offectBottom":"rgba(0, 255, 255, 0.2)",
          });
        }
      }
    },
  );
};
// 电能集抄
hdEnergy.deviceRunList = function () {
  $.get(
    hdInterface.energyCentralizedReading,
    {
      siteId: _SITE_ID,
    },
    function (data) {
      if (data['code'] === 0) {
        if (data.data.length == 0) {
          $('.deviceRunList .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimage">
				`);
          $('#dnjc').hide();
        } else {
          $('#dnjc').show();
          var deviceParams = {
            title: ['日期', '电量(kW·h)', '电费(元)'], //列表标题
            list: [], //列表数据[必填]
            hangLie: {
              lieflag: true, //间隔列开
              lienum: '1', //间隔列 从0开始
              hangflag: true, //间隔行开
              hangnum: '1', //间隔行 从0开始
            },
          };
          data.data.forEach((item) => {
            if (item.date != '总计') {
              let obj = {
                date: convert(item.date),
                // transformerMagnification:convert(item.transformerMagnification),
                powerConsumptionMonth: convert(item.powerConsumptionMonth),
                powerCostMonth: convert(item.powerCostMonth),
              };
              deviceParams.list.push(obj);
            } else {
              $('#totalText').html(convert(item.date));
              $('#totalEnergy').html(convert(item.powerConsumptionMonth));
              $('#totalBill').html(convert(item.powerCostMonth));
            }
          });
          let device = new listRollNew('deviceRunList', deviceParams);
        }
      }
    },
  );
};
// 分系统耗电概览
let img = '';
hdEnergy.betterSystom = function () {
  $.get(
    hdInterface.selectPowerConsumption,
    {
      siteId: _SITE_ID,
    },
    function (data) {
      if (data['code'] === 0) {
        if (data.data.length == 0) {
          $('#better .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimage">
				`);
        } else {
          var betterParams = {
            title: [], //列表标题
            list: [], //列表数据[必填]
            hangLie: {
              lieflag: true, //间隔列开
              lienum: '1', //间隔列 从0开始
              hangflag: true, //间隔行开
              hangnum: '1', //间隔行 从0开始
            },
            // scrollamount:40,
          };
          data.data.forEach((item) => {
            let obj = {
              div: `
							<div class="betterBox">
								<div class="betterTitle">${convert(item.deviceName)}</div>
								<div class="betterCon">
									<div>
										<span class="betterLeft">当日用电量: 
										<em class="fontsize24 testColorLightBlue">${convert(
                      item.powerConsumptionDay,
                    )}</em>
										kW·h</span>
										<span class="betterRight">占总电量：<em>${convert(item.proportion)}</em>%</span>
									</div>
									<div>
										<span class="betterLeft">当月: 
										<em class="testColorLightBlue">${convert(
                      item.powerConsumptionMonth,
                    )}</em> kW·h</span>
										<span class="betterRight">月环比: 
										<em>${changeText(convert(item.chainComparisonMonth))}</em>% <img src="${img}" >
										</span>
									</div>
								</div>
							</div>
						`,
            };
            betterParams.list.push(obj);
          });
          let better = new listRollNew('better', betterParams);
        }
      }
    },
  );
};
function changeText(type) {
  let flag = Number(type) < 0 ? 0 : Number(type) > 0 ? 1 : '--';
  switch (flag) {
    case 0:
      img = 'image/down1.png';
      return '' + Math.abs(Number(type - 0)); //下降
    case 1:
      img = 'image/up1.png';
      return '' + Math.abs(Number(type - 0)); //上升
    default:
      img = '';
      return '--';
  }
}
function loadLi(arr) {
  $('#better ul').html('');
  arr.forEach((item) => {
    $('#better ul').append(`
			<li><div class="betterBox">
				<div class="betterTitle">${convert(item.deviceName)}</div>
				<div class="betterCon">
					<div class="betterLeft">
						<span>当日耗电量:</span>
						<span class="fontsize24 testColorLightBlue">${convert(
              item.powerConsumptionDay,
            )}</span>
						<span style="margin-top:10px;">kW·h</span>
						<span>占比：<em>${convert(item.proportion)}</em>%</span>
					</div>
					<div class="betterRight">
						<span>本周: <em>${convert(item.powerConsumptionWeek)}</em>kW·h</span>
						<span>环比: 
						<em>${changeText(convert(item.chainComparisonWeek))}</em>%
						<img src="${img}" ></span>
						<span style="margin-top:10px;">本月: <em>${convert(
              item.powerConsumptionMonth,
            )}</em>kW·h</span>
						<span>环比: 
						<em>${changeText(convert(item.chainComparisonMonth))}</em>%
						<img src="${img}" ></span>
					</div>
				</div>
			</div></li>
		`);
  });
}
// 最大需量发生时段分布
hdEnergy.maxRequirement = function () {
  var obj = [
    {
      value: 57,
      name: '高峰时段',
    },
    {
      value: 29,
      name: '平段',
    },
    {
      value: 14,
      name: '低谷时段',
    },
  ];
  $('#name1').html(obj[2].value);
  $('#name2').html(obj[1].value);
  $('#name3').html(obj[0].value);
  echarsComponent.getPieChars({
    elementId: 'circle', //容器id	[必填]
    data: obj, //数据[必填]
    color: ['#FFF831', '#2CEEFF', '#0078FF'], //圆环颜色[非必填]
    radius: ['40%', '60%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小[非必填]
    center: ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置[非必填]
    animation: false, //是否关闭鼠标放大，false关 true 开[非必填]
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    }, //提示标签
    itemStyle: {
      normal: {
        label: {
          show: false,
          formatter: '{d}%\n{b}',
        },
        labelLine: {
          show: false,
        },
      },
    }, //线和文字
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0%',
      containLabel: true,
    },
  });
};

window.hdEnergy = hdEnergy;
hdEnergy.init();
