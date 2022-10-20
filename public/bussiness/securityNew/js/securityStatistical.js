var securityStatistical = {}
var _SITE_ID = getParams()['siteId'];
securityStatistical.init = function () {
	securityStatistical.initOnce('month');//三个表格
	securityStatistical.initOnce('year');//三个表格
	securityStatistical.waring30statistical('month');//预警统计
	securityStatistical.waring30statistical('year');//预警统计
	// securityStatistical.loadSignalFailure('month');//信号故障统计TOP5
	// securityStatistical.loadSignalFailure('year');//信号故障统计TOP5
	securityStatistical.loadMeanRepairTime('month');//平均修复时间分析
	securityStatistical.loadMeanRepairTime('year');//平均修复时间分析
	// securityStatistical.loadEquipmentFailureRankingTOP5('month');//信号报警排行
	// securityStatistical.loadEquipmentFailureRankingTOP5('year');//设备故障排行TOP5
	// securityStatistical.warningSystemHistory('month');//系统预警历史记录
	// securityStatistical.warningSystemHistory('year');//系统预警历史记录
	// securityStatistical.EquipmentFaultHistory('month');//超过维修时间设备
	// securityStatistical.EquipmentFaultHistory('year');//设备故障历史记录
	// securityStatistical.loadselectDeviceMaintenanceStatics();//需要保养设备数量
	securityStatistical.changeTime();//时间切换
	securityStatistical.getPieChars('month');//报警类型统计
	securityStatistical.getPieChars('year');//报警类型统计
	// securityStatistical.rulesClick();//点击报警规则
	securityStatistical.alarmConst('month');// 设备、信号、离线报警统计
	securityStatistical.alarmConst('year');// 设备、信号、离线报警统计
	securityStatistical.deviceList('month');//平均设备报警修复时间
	securityStatistical.deviceList('year');//平均设备报警修复时间
}
function gettimecode(type) {
	var timeCode;
	if (type == 'month') {
		timeCode = 5;
	}
	else if (type == 'year') {
		timeCode = 6;
	}
	return timeCode;
}
securityStatistical.initOnce = function (type) {
	//预警统计前5名
	$.post(hdInterface.selectSystemWarnStatics, {
		"siteId": _SITE_ID,
		"isFirst": "0",
		"timeCode": gettimecode(type)
	}, function (data) {
		// console.log(type)
		// console.log(data)
		if (data['code'] === 0) {
			data.data.forEach(function (item, ind) {
				$("#" + type + "warnRuleTop5").append(
					`<tr class="${ind % 2 === 0 ? 'content1' : 'content2'}"><td>TOP${ind + 1}</td><td>${convert(item.warnRuleName)}</td><td>${convert(item.warnCount)}</td></tr>`
				);
			})
			if (data.data.length == 0) {
				$("#" + type + "warnRuleTop5 .nodata").remove();
				$("#" + type + "warnRuleTop5").append('<tr class="nodata"><td colspan="4"><img src="../../common/image/nodata.png" class="nodateimg"/></td></tr>');
			}
		}
		removemask(type + "sec-waring-cover");
	})
	//预警统计后5名
	$.post(hdInterface.selectSystemWarnStatics, {
		"siteId": _SITE_ID,
		"isFirst": "1",
		"timeCode": gettimecode(type)
	}, function (data) {
		// console.log(type)
		console.log(data)
		if (data['code'] === 0) {
			data.data.forEach(function (item, ind) {
				$("#" + type + "warnRuleLast5").append(
					`<tr class="${ind % 2 === 0 ? 'content1' : 'content2'}"><td>LAST${ind + 1}</td>
					<td style='
						white-space: nowrap;
						overflow: hidden;
						position: absolute;
						text-overflow: ellipsis;
						width: 180px;'
					>${convert(item.warnRuleName)}</td><td>${convert(item.warnCount)}</td></tr>`
				);
			});
			if (data.data.length == 0) {
				$("#" + type + "warnRuleLast5 .nodata").remove();
				$("#" + type + "warnRuleLast5").append('<tr class="nodata"><td colspan="4"><img src="../../common/image/nodata.png" class="nodateimg"/></td></tr>');
			}
		}
		removemask(type + "sec-waring-cover2");
	})
	//设备运行详情
	$.post(hdInterface.selectDeviceRunDetail, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			var param1 = {
				vis: '14',//可视数
				title: ['设备名称', '设备类型', '运行时长(h)', '待维保时长(h)'], //列表标题
				list: [],//列表数据
				// stateItem: [],//图标标志列
				// changeFlag: [],//0 1互换标志数组
				style: {
					lineHeight: '35',// 行高
					titleHeight: '32',//标题高度
					titleSize: '14',//标题字体大小
					fontSize: '14',//字体大小
					iconSize: '16',//图标大小
					iconText: false,//图标文字
				},
				hangLie: {
					lieflag: true,//间隔列开
					lienum: '4',//间隔列 从0开始
					hangflag: true,//间隔行开
					hangnum: '1',//间隔行 从0开始
				}
			}
			// var re=data['data'].slice(0,21);
			// console.log(re)
			data['data'].forEach((item, index) => {
				var obj = {
					deviceName: convert(item.plate),//设备名称
					deviceType: convert(item.deviceTypeName),//设备类型
					runTime: convert(item.runTime),//运行时长(h)
					deviceFaultCount: convert(item.residualLife),//设备维修时长
				}
				param1.list.push(obj)
			})
			let obj1 = new listRoll(type + 'deviceRunList', param1);//实例化
		}
		$("#equ-detail-cover .hd-loadmask").hide();
	})
}
//预警统计
securityStatistical.waring30statistical = function (type) {
	$.post(hdInterface.selectWarnStaticsTrend, {
		'siteId': _SITE_ID,
		'timeCode': gettimecode(type)
	}, function (data) {
		if (data['code'] === 0) {
			var data = data.data || {};
			var xdata = data.dataX || '';
			xdata = xdata.split(",");
			var warndata = data.dataY || '';
			warndata = warndata.split(",");
			var recoverdata = data.dataY2 || '';
			recoverdata = recoverdata.split(",");
			echarsComponent.getBarChars({
				"elementId": type + "main1",//容器id	[必填]
				xdata: xdata,//横坐标数据[必填]
				ydata: [warndata, recoverdata],//纵坐标数据[必填]
				seriesColor: ['#FFB72C', '#25F8FF'],//线颜色[非必填]
				// areaStyleOpacity:0.1,//区域颜色[非必填]
				// interval:0,//间隔[非必填]
				// "dataZoom":{
				// 	"isScroll":true,//是否可以自动切换[非必填]
				// 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
				//  },
				// "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
				// "labelColor":'#a5eaff',//坐标轴文字颜色
				"units": "次",//单位
				yAxisMin: 0,
				// yAxisMinInterval:5,
				"grid": {
					left: '3%',
					right: '4%',
					bottom: '1%',
					top: '35px',
				},//边距[非必填]
				"provideNumber": 9
			});
			// var obj = {
			// 	"elementId": type+"main1", //容器id	[必填]				
			// 	"xdata": xdata, //横坐标数据[必填]
			// 	"ydata": [warndata,recoverdata], //纵坐标数据[必填]
			// 	// "interval": 0, //间隔几个显示
			// 	"seriesColor":['#FFB72C','#25F8FF'],//图表颜色
			// 	"units": "次", //单位
			// 	// "showCount": true, //
			// 	// "labelColor":"#96D6FF",
			// 	// "lineColor":"rgba(10,148,255,0.3)",
			// 	// "dataZoom":{
			// 	// 	"isScroll":true,
			// 	// 	"endValue":0
			// 	// },
			// 	 "nodataImg":true,//无数据时候是否显示暂无数据图片
			// 	 "provideNumber": 9
			// }
			// echarsComponent.getBarChars(obj);
		}
		removemask("waring-statis-cover");
	})


}
//信号故障统计TOP5
securityStatistical.loadSignalFailure = function (type) {
	$.post(hdInterface.selectPlcTemplateFaultStatics, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {
		$("#signalFailure .hd-loadmask").hide();
		var elementId = type + "main2";
		var data = data.data || {};
		var xdata = data.dataX || '';
		xdata = xdata.split(",");
		var ydata = data.dataY || '';
		ydata = ydata.split(",");
		var xdatahuanhang = [];
		for (var i = 0; i < xdata.length; i++) {
			xdatahuanhang.push(insertAt(xdata[i], '\n', 6));
		}

		echarsComponent.getBarChars({
			"elementId": elementId,//容器id	[必填]				
			"xdata": xdatahuanhang,//横坐标数据[必填]
			"ydata": [ydata],//纵坐标数据[必填]
			"seriesColor": [],//图表颜色[非必填]
			"units": "次",//单位[非必填]
			// "showCount":true,//是否显示顶部数字 bool[非必填]
			// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
			"lineColor": "rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
			// "dataZoom":{
			//  	"isScroll":true,//是否可以自动切换[非必填]
			//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
			//  },
			// "interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
			"xAxisFontSize": 10,//横坐标文字大小[非必填]
			"barWidth": 12,//图表宽度
			"colorGradient": [{ "startColor": "rgba(255, 183, 44, 0.7)", "endColor": "rgba(255, 183, 44, 1)" }],//渐变颜色
			"grid": {
				left: '3%',
				right: '4%',
				bottom: '5%',
				top: '35px',
			},
			"nodataImg": true
		});

	})

}
//平均修复时间分析
securityStatistical.loadMeanRepairTime = function (type) {
	$.post(hdInterface.selectRecoveryAnalysis, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {
		// console.log(data)
		$("#meanRepairTime .hd-loadmask").hide();
		var elementId = type + "main2";
		var data = data.data || {};
		var xdata = data.dataX || '';
		xdata = xdata.split(",");
		var ydata = data.dataY || '';
		ydata = ydata.split(",");
		// var ydata2=data.dataY2||'';
		//     ydata2=ydata2.split(",");
		echarsComponent.getLineShadow({
			"elementId": type + "main3",//容器id	[必填]
			xdata: xdata,//横坐标数据[必填]
			ydata: [ydata],//纵坐标数据[必填]
			linecolors: ['#00ffff'],//线颜色[非必填]
			areaStyleOpacity: 0.3,//区域颜色[非必填]
			// interval:0,//间隔[非必填]
			// "dataZoom":{
			// 	"isScroll":true,//是否可以自动切换[非必填]
			// 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
			//  },
			// "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
			// "labelColor":'#a5eaff',//坐标轴文字颜色
			"unit": "min",//单位
			"grid": {
				left: '20px',
				right: '20px',
				bottom: '0',
				top: '25px',
			},//边距[非必填]
			"offectTop": "rgba(0,255,255,1)",
			"offectMiddle": "rgba(0,255,255,.8)",
			"offectBottom": "rgba(0,255,255,.5)"
		});
	})

}
//设备故障排行TOP5
securityStatistical.loadEquipmentFailureRankingTOP5 = function (type) {
	$.post(hdInterface.selectDeviceFaultRank, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {

		$("#equfaulttop5 .hd-loadmask").hide();
		var data = data.data || {};
		var xdata = data.dataX || '';
		xdata = xdata.split(",");
		var ydata = data.dataY || '';
		ydata = ydata.split(",");

		var xdatahuanhang = [];
		for (var i = 0; i < xdata.length; i++) {
			xdatahuanhang.push(insertAt(xdata[i], '\n', 6));
		}
		echarsComponent.getBarChars({
			"elementId": type + "AlarmRank2",//容器id	[必填]				
			"xdata": xdatahuanhang,//横坐标数据[必填]
			"ydata": [ydata],//纵坐标数据[必填]
			"seriesColor": [],//图表颜色[非必填]
			"units": "次",//单位[非必填]
			// "showCount":true,//是否显示顶部数字 bool[非必填]
			// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
			"lineColor": "rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
			// "dataZoom":{
			//  	"isScroll":true,//是否可以自动切换[非必填]
			//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
			//  },
			// "interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
			"xAxisFontSize": 10,//横坐标文字大小[非必填]
			"barWidth": 12,//图表宽度
			"colorGradient": [{ "startColor": "rgba(37, 248, 255, 0.7)", "endColor": "rgba(37, 248, 255, 1)" }],//渐变颜色
			"grid": {
				left: '3%',
				right: '4%',
				bottom: '5%',
				top: '35px',
			}
		});
	})

}
//系统预警历史记录11111
securityStatistical.warningSystemHistory = function (type) {
	//接口是假的，需要修改
	$.post(hdInterface.selectSystemWarnHistoryDetail, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			var param1 = {
				vis: '14',//可视数
				title: ['预警原因', '预警时间'], //列表标题
				list: [],//列表数据
				// stateItem: [],//图标标志列
				// changeFlag: [],//0 1互换标志数组
				style: {
					lineHeight: '30',// 行高
					titleHeight: '32',//标题高度
					titleSize: '14',//标题字体大小
					fontSize: '14',//字体大小
					iconSize: '16',//图标大小
					iconText: false,//图标文字
				},
			}
			data['data'].forEach((item, index) => {
				var obj = {
					deviceName: convert(item.warnRuleName),//字段需要修改
					runTime: convert(item.time),//字段需要修改
				}
				param1.list.push(obj)
			})
			let obj1 = new listRoll(type + 'waringHistoryList', param1);//实例化

		}
		$("#waringHistory .hd-loadmask").hide();
	})
}
//设备故障历史记录11111
securityStatistical.EquipmentFaultHistory = function (type) {
	//接口是假的，需要修改
	$.post(hdInterface.selectDeviceFaultHistoryDetail, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type)
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			var param1 = {
				vis: '14',//可视数
				title: ['设备名称', '故障时间'], //列表标题
				list: [],//列表数据
				// stateItem: [],//图标标志列
				// changeFlag: [],//0 1互换标志数组
				style: {
					lineHeight: '30',// 行高
					titleHeight: '32',//标题高度
					titleSize: '14',//标题字体大小
					fontSize: '14',//字体大小
					iconSize: '16',//图标大小
					iconText: false,//图标文字
				},
			}
			data['data'].forEach((item, index) => {
				var obj = {
					deviceName: convert(item.plate),//字段需要修改
					runTime: convert(item.time),//字段需要修改
				}
				param1.list.push(obj)
			})
			let obj1 = new listRoll(type + 'equltFaultHistoryList', param1);//实例化

		}
		$("#equltFaultHistory .hd-loadmask").hide();
	})

}
//需要保养设备数量
securityStatistical.loadselectDeviceMaintenanceStatics = function () {
	// hdInterface.selectDeviceMaintenanceStatics
	$.post(hdInterface.selectDeviceMaintenanceStatics, {
		"siteId": _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var data = data.data;
			var deviceMaintenanceCount = convert(data.deviceMaintenanceCount);
			$("#monthcount").html(deviceMaintenanceCount);
			$("#yearcount").html(deviceMaintenanceCount);
		}
	})
}
//时间切换
securityStatistical.changeTime = function (type) {
	$("#energy-day-control>span").click(function () {
		$(this).addClass("on").siblings().removeClass("on");
		var datatype = $(this).attr("data-type");
		$(".sc-container2").css("opacity", "0");
		$(".sc-container2").css("z-index", "-1");
		$(".sc-container2." + datatype).css("opacity", "1");
		$(".sc-container2." + datatype).css("z-index", "1");
	});
}
//报警类型统计
securityStatistical.getPieChars = function (type) {
	$.post(hdInterface.selectSafeScoreNew, {
		"siteId": _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			$('#monthrulesnum').html(convert(data.data.alarmCount))
			$('#yearrulesnum').html(convert(data.data.alarmCount))
			$('#' + type + 'Dev').html(convert(data.data.faultAlarm))
			$('#' + type + 'Lix').html(convert(data.data.signalAlarm))
			$('#' + type + 'Xin').html(convert(data.data.ruleAlarm))
			var dataVal = [
				{
					value: data.data.faultAlarm,
					name: '设备故障 ',
				},
				{
					value: data.data.signalAlarm,
					name: '离线报警',
				},
				{
					value: data.data.ruleAlarm,
					name: '规则报警',
				}
			]
			echarsComponent.getPieChars({
				"elementId": type + "type", //容器id	[必填]
				"data": dataVal, //数据[必填]
				"color": ['rgba(22, 143, 255, 0.7)', 'rgba(72, 211, 150, 0.7)', 'rgba(37, 248, 255, 0.7)'], //圆环颜色[非必填]
				"radius": ['55%', '60%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小[非必填]
				"center": ['25%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置[非必填]
				"animation": false,//是否关闭鼠标放大，false不关 true 关[非必填]
				"tooltip": {
					show: false,
					trigger: 'item',
					formatter: "{b} : {c} ({d}%)"
				},//提示标签
				"itemStyle": {
					normal: {
						label: {
							show: false,
							formatter: "{b|{c}条}\n{c|{b}}",
							rich: {
								b: {
									padding: [-10, 0, 0, 0],
									align: 'left',
									fontSize: 14,
									// color:'#96D6FF',
								},
								c: {
									align: 'center',
									padding: [-10, 0, 0, 0],
									fontSize: 14,
									// color:'#96D6FF',
								}
							}
						},
						labelLine: {
							show: false
						}
					}
				},//线和文字
			})
		}
	})
}
// 设备、信号、离线报警统计
securityStatistical.alarmConst = function (type) {
	// 设备
	$.post(hdInterface.selectAlarmCountStaticsModule, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type),
		"alarmType": 6
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			if (JSON.stringify(data.data) === '{}') {
				$('#' + type + 'AlarmRank1>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataXtemp = []
				var maxdataY = 0
				dataX.forEach((item, index) => {
					if (item.indexOf('设备报警') != '-1') {
						var indexTemp = item.indexOf('设备报警')
						dataXtemp.push(item.substring(0, indexTemp))
					} else {
						dataXtemp.push(item);
					}

					// maxdataY=Math.max(maxdataY,item)
				})
				// dataY.forEach((item,index)=>{
				// 	maxdataY=Math.max(maxdataY,item)
				// })
				// if (maxdataY>=100){
				// 	maxdataY=maxdataY
				// } else if (maxdataY<=10&&maxdataY!==0){
				// 	maxdataY=maxdataY+2
				// } else if (maxdataY==0){
				// 	maxdataY=5
				// } else {
				// 	maxdataY=maxdataY+5
				// }
				// console.log(maxdataY)
				// console.log(dataYtemp)
				echarsComponent.getBarChars({
					"elementId": type + "AlarmRank1",//容器id	[必填]				
					"xdata": dataXtemp,//横坐标数据[必填]
					"ydata": [dataY],//纵坐标数据[必填]
					"seriesColor": [],//图表颜色[非必填]
					"units": "次",//单位[非必填]
					// "showCount":true,//是否显示顶部数字 bool[非必填]
					// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
					"lineColor": "rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
					// "dataZoom":{
					//  	"isScroll":true,//是否可以自动切换[非必填]
					//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
					//  },
					"interval": 0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
					"xAxisFontSize": 10,//横坐标文字大小[非必填]
					"barWidth": 12,//图表宽度
					"colorGradient": [{ "startColor": "rgba(37, 248, 255, 0.2)", "endColor": "rgba(37, 248, 255, 1)" }],//渐变颜色
					"grid": {
						left: '20px',
						right: '20px',
						bottom: '5px',
						top: '30px',
					},
					"nodataImg": true,
					"yAxisMin": 0,
					// "yAxisMax": maxdataY,
					"provideNumber": 6
				});
			}
		}
	})
	// 信号
	$.post(hdInterface.selectAlarmCountStaticsModule, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type),
		"alarmType": 4
	}, function (data) {
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) === '{}') {
				$('#' + type + 'AlarmRank2>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataXtemp = []
				var maxdataY = 0
				dataX.forEach((item, index) => {
					if (item.indexOf('信号报警') != '-1') {
						var indexTemp = item.indexOf('信号报警')
						dataXtemp.push(item.substring(0, indexTemp))
					} else {
						dataXtemp.push(item)
					}

					// maxdataY=Math.max(maxdataY,item)
				})
				// if (maxdataY>=100){
				// 	maxdataY=maxdataY
				// } else if (maxdataY<=10&&maxdataY!==0){
				// 	maxdataY=maxdataY+2
				// } else if (maxdataY==0){
				// 	maxdataY=5
				// } else {
				// 	maxdataY=maxdataY+5
				// }
				// console.log(maxdataY)
				// console.log(dataXtemp)
				echarsComponent.getBarChars({
					"elementId": type + "AlarmRank2",//容器id	[必填]				
					"xdata": dataXtemp,//横坐标数据[必填]
					"ydata": [dataY],//纵坐标数据[必填]
					"seriesColor": [],//图表颜色[非必填]
					"units": "次",//单位[非必填]
					// "showCount":true,//是否显示顶部数字 bool[非必填]
					// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
					"lineColor": "rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
					// "dataZoom":{
					//  	"isScroll":true,//是否可以自动切换[非必填]
					//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
					//  },
					"interval": 0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
					"xAxisFontSize": 10,//横坐标文字大小[非必填]
					"barWidth": 12,//图表宽度
					"colorGradient": [{ "startColor": "rgba(37, 248, 255, 0.2)", "endColor": "rgba(37, 248, 255, 1)" }],//渐变颜色
					"grid": {
						left: '20px',
						right: '20px',
						bottom: '5px',
						top: '30px',
					},
					"nodataImg": true,
					"yAxisMin": 0,
					// "yAxisMax": maxdataY,
					"provideNumber": 6
				});
			}
		}
	})
	// 离线
	$.post(hdInterface.selectAlarmCountStaticsModule, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type),
		"alarmType": 5
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			if (JSON.stringify(data.data) === '{}') {
				$('#' + type + 'AlarmRank3>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataXtemp = []
				var maxdataY = 0
				dataX.forEach((item, index) => {
					if (item.indexOf('离线报警') != '-1') {
						var indexTemp = item.indexOf('离线报警')
						dataXtemp.push(item.substring(0, indexTemp))
					} else {
						dataXtemp.push(item)
					}

					// maxdataY=Math.max(maxdataY,item)
				})
				// if (maxdataY>=100){
				// 	maxdataY=maxdataY
				// } else if (maxdataY<=10&&maxdataY!==0){
				// 	maxdataY=maxdataY+2
				// } else if (maxdataY==0){
				// 	maxdataY=5
				// } else {
				// 	maxdataY=maxdataY+5
				// }
				// console.log(maxdataY)
				// console.log(data)
				// console.log(dataXtemp)
				echarsComponent.getBarChars({
					"elementId": type + "AlarmRank3",//容器id	[必填]				
					"xdata": dataXtemp,//横坐标数据[必填]
					"ydata": [dataY],//纵坐标数据[必填]
					"seriesColor": [],//图表颜色[非必填]
					"units": "次",//单位[非必填]
					// "showCount":true,//是否显示顶部数字 bool[非必填]
					// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
					"lineColor": "rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
					// "dataZoom":{
					//  	"isScroll":true,//是否可以自动切换[非必填]
					//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
					//  },
					"interval": 0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
					"xAxisFontSize": 10,//横坐标文字大小[非必填]
					"barWidth": 12,//图表宽度
					"colorGradient": [{ "startColor": "rgba(37, 248, 255, 0.2)", "endColor": "rgba(37, 248, 255, 1)" }],//渐变颜色
					"grid": {
						left: '20px',
						right: '20px',
						bottom: '5px',
						top: '30px',
					},
					"nodataImg": true,
					"yAxisMin": 0,
					// yAxisMinInterval:50,
					// "yAxisMax": maxdataY,
					"provideNumber": 6,
				});
			}
		}
	})
}
//平均设备报警修复时间
securityStatistical.deviceList = function (type) {
	$.post(hdInterface.selectDeviceRecoveryAnalysis, {
		"siteId": _SITE_ID,
		"timeCode": gettimecode(type),
	}, function (data) {
		// console.log(data.data)
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) === '{}') {
				$('#' + type + 'main5>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				echarsComponent.getLineShadow({
					"elementId": type + "main5",//容器id	[必填]
					xdata: dataX,//横坐标数据[必填]
					ydata: [dataY],//纵坐标数据[必填]
					linecolors: ['#25F8FF'],//线颜色[非必填]
					areaStyleOpacity: 0.5,//区域颜色[非必填]
					// interval:0,//间隔[非必填]
					// "dataZoom":{
					// 	"isScroll":true,//是否可以自动切换[非必填]
					// 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					//  },
					// "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					// "labelColor":'#a5eaff',//坐标轴文字颜色
					"unit": "min",//单位
					"grid": {
						left: '20px',
						right: '20px',
						bottom: '0',
						top: '25px',
					},//边距[非必填]
					"offectTop": "rgba(0,255,255,1)",
					"offectMiddle": "rgba(0,255,255,.8)",
					"offectBottom": "rgba(0,255,255,.5)"
				});

			}
		}
	})
}

securityStatistical.rulesClick = function () {
	$('#monthrules').on('click', function () {
		var dis = $('#rules1').css('display')
		if (dis == 'none') {
			$('.div_rules').show()
		} else {
			$('.div_rules').hide()
		}
	})
	$('#yearrules').on('click', function () {
		var dis = $('#rules2').css('display')
		if (dis == 'none') {
			$('.div_rules').show()
		} else {
			$('.div_rules').hide()
		}
	})
}



window.securityStatistical = securityStatistical;
securityStatistical.init();