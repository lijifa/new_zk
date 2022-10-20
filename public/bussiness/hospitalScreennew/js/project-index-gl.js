var siteId = getParams()['siteId'] || 13;
var menuNavId = getParams()['menuNavId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var layuiId = getParams()["layuiId"]; //标签id
var projectindex = {
	oneceload: 0, //是否第一次加载
	iswaring: "false", //是否设备报警
};
var timer1 = null
var timer2 = null
var obj1 = null
var param1 = {
	title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长(h)', '设备状态'], //列表标题
	list: [], //列表数据.
	hangLie: {
		lieflag: true, //间隔列开
		lienum: '5', //间隔列 从0开始
		hangflag: true, //间隔行开
		hangnum: '1', //间隔行 从0开始
	}
}

/**
 * 
 * @param {*} type 数值和图片的映射 -1灰 0绿 1红
 * @param {*} val 要显示的文字 
 * @returns 
 */
function transformerStatus(type, val) {
	// console.log("状态", type);
	switch (type) {
		case -1:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case 0:
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-green.png">
				</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case 1:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		default:
			return '--';
	}
}

/**
 * 
 * @param {*} type 值和图片的映射 -1灰 0红 1绿
 * @param {*} val  要显示的文字 
 * @returns 
 */
function transformerFault(type, val) {
	switch (type) {
		case -1:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case 0:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case 1:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-green.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		default:
			return '--';
	}
}

function auto(k, v) {
	switch (k) {
		case '0':
			return 'v';
		case '1':
			return 'v';
		default:
			return '--';
	}
}

// 离开页面调用
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer1);
		clearInterval(timer2);
		console.log('离开')
	} else {
		console.log('回来')
		projectindex.fiveMintueUpdata();
		projectindex.oneMinuteUpdata();
	}
});
$(top.document.getElementsByTagName('iframe')).each((i, e) => {
	if ($(e).attr('src').indexOf(location.pathname.substring(1)) != -1) {
		// console.log($(e).attr('data-frameid'));
		layuiId == undefined ? layuiId = $(e).attr('data-frameid') : '';
	}
})
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer1);
	clearInterval(timer2);
}
// top.registerListener(objName, function(e) {
// 	console.log(objName,e);
// 	if (layuiId == e) {
// 		console.log('回到光合谷供热');
// 		projectindex.fiveMintueUpdata();
// 		projectindex.oneMinuteUpdata();
// 	} else {
// 		console.log('离开光合谷供热');
// 		clearInterval(timer1);
// 		clearInterval(timer2);
// 	}
// });
//初始化项目
projectindex.init = function () {
	projectindex.loadEnergyToday(); //今日能耗
	projectindex.loadwatertemp(); //供水温度趋势
	projectindex.selectZgMenuParamByMenuId();
	projectindex.loadSystemDifference(); // 系统差值监测
	projectindex.oneMinuteUpdata();
	projectindex.fiveMintueUpdata();
	$('.zztfullBtn').on('click', function () {
		let src = $(this).attr('src');
		if (screenfull.isEnabled) {
			$('.ztt').html(`
			<div id="ztt_dl">
			<div class="hd-loadmask"><img src="../../common/image/load.gif" class="iconimg" style="width: 80px;height: 80px;"></div>
			</div>
			`)
			if (src.indexOf('openFull') != -1) {
				$(this).attr('src', '/common/image/closeFull.png');
				clearInterval(timer2);
			} else {
				$(this).attr('src', '/common/image/openFull.png');
				projectindex.oneMinuteUpdata(); // 一分钟更新
			}
			screenfull.toggle(document.getElementById('zttFull'));
			projectindex.selectZgMenuParamByMenuId(); //组态图
		}
	})
}
projectindex.oneMinuteUpdata = function () {
	timer2 = setInterval(function () {
		console.log('60s更新')
		projectindex.selectZgMenuParamByMenuId();
		projectindex.loadSystemDifference(); // 系统差值监测
	}, 1000 * 60);
}
projectindex.fiveMintueUpdata = function () {
	timer1 = setInterval(function () {
		console.log('5分钟更新');
		projectindex.loadEnergyToday(); //今日能耗
		projectindex.loadwatertemp(); //供水温度趋势
		projectindex.oneceload++;
	}, 1000 * 60 * 5)
}
//获取参数
projectindex.selectZgMenuParamByMenuId = function () {
	$.ajax({
		url: hdInterface.selectZgMenuParamByMenuId,
		type: "GET",
		data: {
			'menuId': menuNavId,
			'paramAlias': 1
		},
		success: function (result) {
			if (result.code == 0) {
				result = result.data || {};
				projectindex.loadDeviceStatus(result); //当前设备状态
				projectindex.getpicture(result); //获取图片
				projectindex.loadtempCOP(result); //系统实时COP
			}
		},
	})
}
//获取组态图myDiagram.model.updateTargetBindings(node.data)
projectindex.getpicture = function (result) {
	$.ajax({
		url: hdInterface.selectDiagramByIdModule,
		type: "post",
		data: {
			'siteId': result.siteId,
			'diagramCustomId': result.diagramCustomId
		},
		success: function (result) {
			if (result.code == 0) {
				$('.ztt_dl').html(`
				<div id="ztt_dl" style="height: 100%;"></div>
				`)
				createDrag(result.data.diagramJson);
			}
		},
	})
}

//冷冻供回水温度曲线，调用接口形式
projectindex.loadwatertemp = function () {
	$.ajax({
		// url:hdInterface.chilledWaterSupplyAndReturnCopy,
		url: hdInterface.selectInsideTemperatureCurveHot,
		type: "post",
		data: {
			"siteId": siteId,
		},
		/**
		 * @author xiaojie
		 * @param result
		 */
		success: function (result) {
			var ReturnWaterArr = [],
				WaterSupplyArr = [],
				timeArr = [],
				temperatureArr = [],
				humidityArr = [];
			if (result.code == 0) {
				var data = result.data || [];
				if (data.length == 0) {
					$('#main').html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
					$('#humidity').hide()
					return;
				} else {
					timeArr = data.dataX.split(',')
					WaterSupplyArr = data.dataY.split(',') //供水温度
					ReturnWaterArr = data.dataY2.split(',') //回水温度
					temperatureArr = data.dataY3.split(',') //室外温度
					humidityArr = data.dataY4.split(',') //湿度
					for (var i = 0; i < humidityArr.length; i++) {
						if (humidityArr[i] !== 'null') {
							$('#humidity').html(humidityArr[i])
						}
					}
					var dataXTime = []
					timeArr.forEach((item, index) => {
						dataXTime.push(item + ":00");
					})
					// temperatureArr=[-11,-15,-12,-9,-41,24,36,31,38,31,25,18,34,36,61,31]
					$('#temperature').html(temperatureArr[temperatureArr.length - 1])
					echarsComponent.getLine({
						"elementId": "main", //容器id	[必填]
						xdata: dataXTime, //横坐标数据[必填]
						ydata: [temperatureArr, WaterSupplyArr, ReturnWaterArr], //纵坐标数据[必填]
						ydataTitle: ['室外', '供水', '回水'], //提示框标题项
						linecolors: ['#168FFF', '#00FFFF', '#FF830A'], //线颜色[非必填]
						// interval:4,//间隔[非必填]
						"unit": "℃", //单位
						"grid": {
							left: '3%',
							right: '4%',
							bottom: '0%',
							top: '30px',
						}, //边距[非必填]
						"nodataImg": true,
						// yAxisMin:0,
						yAxisMinInterval: 5,
					});
					$('.Unit').css('display', 'block')
				}

			}
		}
	});
}
// COP曲线
projectindex.loadtempCOP = function (data) {
	$.post(hdInterface.selectSiteCopStatics, {
		"siteId": siteId,
		"timeCode": 0,
	}).done(function (res) {
		if (res.code == 0) {
			removemask("COPtemperature");
			var data = res.data || {};
			var dataX = data.dataX.split(",");
			var datay = data.dataY.split(",");
			var datay2 = data.dataY2.split(",");
			var dataXTimeCOP = []
			dataX.forEach((item, index) => {
				dataXTimeCOP.push(item + ":00");
			})
			echarsComponent.getLine({
				"elementId": "mainCOP", //容器id	[必填]
				xdata: dataXTimeCOP, //横坐标数据[必填]
				ydataTitle: ['标准值', 'COP'], //提示框标题项
				ydata: [datay2, datay], //纵坐标数据[必填]
				linecolors: ['#994427', '#0ac5f5'], //线颜色[非必填]
				yAxisMin: 0,
				yAxisMinInterval: 1,
				"grid": {
					left: '4%',
					right: '4%',
					bottom: '0%',
					top: '4%',
				} //边距[非必填]
			});
		}
	});
}
//今日能耗 温湿度
projectindex.loadEnergyToday = function () {
	//当日能耗监控
	// selectElectricAndWaterTodayCopy
	$.post(hdInterface.selectElectricAndWaterTodayModule, {
		'siteId': siteId,
		'timeCode': '0',
		'type': 2
	}, function (data) {
		// console.log(data)
		if (data['code'] === 0) {
			data = data.data || [];
			$("#electricEnergy").html(convert(data.electric)); //电能耗
			$("#waterEnergy").html(convert(data.water)); //水能耗
			$("#gas").html(convert(data.gas)); //天然气
			$("#energyConsumption").html(convert(data.energy)); //冷热总能耗
			$("#flow").html(convert(data.flow)); //系统流速
		}
	});
	$.post(hdInterface.selectTemperatureAndHumidityCopy, {
		'siteId': siteId,
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			data = data.data || {};
			$('#temperatureTody').html(convert(data.temperature))
			$('#humidityTody').html(convert(data.humidity))
		}
	})


}


// 系统差值监测
projectindex.loadSystemDifference = function () {
	$.ajax({
		// url:hdInterface.systemDifferenceDetectionCopy,
		url: hdInterface.systemDifferenceDetectionHot,
		type: "POST",
		data: {
			"siteId": siteId,
		},
		success: function (result) {
			var data = result.data || []
			if (result['code'] === 0) {
				$('#differenceManifold').html(convert(data.pressureDifferenceOfWaterCollectorAndDistributor)) //集分水器压差
				$('#SystemDifference').html(convert(data.pressureDifferenceOfRefrigeratingSupplyAndReturn)) //系统压差
				$('#supplyAndReturn').html(convert(data.temperatureDifferenceBetweenChilledSupplyAndReturnWater)) //供回水温差
				$('#waterSupply').html(convert(data.chilledWaterSupplyTemperature)) //冷冻供水温度
				$('#returnWater').html(convert(data.chilledReturnWaterTemperature)) //冷冻回水温度
				$('#supplyWaterDif').html(convert(data.chilledWaterSupplyPressure)) //供水压力
				$('#returnWaterDif').html(convert(data.chilledReturnWaterPressure)) //回水压力
			}
		},
	})
}

//设备状态
projectindex.loadDeviceStatus = function (result) {
	var bindDeviceList = result.bindDeviceList; //绑定设备
	if (bindDeviceList) {
		$.ajax({
			// url:hdInterface.selectDeviceStatusByDeviceIds,
			url: hdInterface.selectDeviceStatusByDeviceIdsModule,
			type: "post",
			data: {
				"siteId": siteId,
				"deviceIds": bindDeviceList
			},
			success: function (result) {
				if (result.code == 0) {
					//设备状态
					var deviceStatusList = result.data || [];
					if (deviceStatusList.length == 0) {
						$("#equipmentstatuscover").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
						return;
					}
					deviceStatusList.sort(function (a, b) {
						if (a.plate > b.plate) return 1;
						if (a.plate < b.plate) return -1;
						return 0;
					})
					var warnLightflag = false
					param1.list = [];
					// console.log("滚动列表数据", deviceStatusList);
					deviceStatusList.forEach((item, index) => {
						if (item.fault == '1') {
							warnLightflag = true
						} else { }
						if (warnLightflag) {
							$("#warnLight").attr("src", "./image/red.mp4");
						} else {
							$("#warnLight").attr("src", "./image/green.mp4")
						}
						let frequency; //频率
						let state = '--'; //启停状态
						let handAuto; //手自动
						let fault; //设备状态
						item.plctemplateInfos.forEach(sonItem => {
							switch (sonItem.plcTypeId) {
								case "69":
									frequency = convertFrequency(sonItem.refeStatus, sonItem.refeValue);
									break;
								case "114":
									state = checkStatus(sonItem.refeStatus, sonItem.refeText);
									break;
								case "119":
									fault = checkStatus(sonItem.refeStatus, sonItem.refeText);
									break;
								case "120":
									handAuto = convert(sonItem.refeText);
									break;
								default:
									break;
							}
							if (sonItem.plcTypeId == '313') {
								console.log("---", item);
								if (sonItem.refeStatus == 'stop_type' || sonItem.refeStatus == 'start_type') {
									state = checkStatus(sonItem.refeStatus, sonItem.refeText);
									fault = checkStatus("normal_type", "正常");
								}
								if (sonItem.refeStatus == 'd_alarm_type') {
									fault = checkStatus(sonItem.refeStatus, sonItem.refeText);
									state = checkStatus(sonItem.refeStatus, "停止");
								}
								if (sonItem.refeStatus == 'o_alarm_type') {
									fault = checkStatus(sonItem.refeStatus, sonItem.refeText);
									state = checkStatus(sonItem.refeStatus, "离线");
								}
							}
						})
						var obj = {
							plate: convert(item.plate), //名称
							frequency: convert(frequency), //频率
							state: convert(state), //启停状态
							auto: convert(handAuto), //手自动
							runtime: convert(item.runtime), //运行时长
							fault: convertFault(fault) //故障状态
						}
						param1.list.push(obj)
					})
					obj1 = new listRollNew('equipmentstatuscover', param1); //实例化
				}
			}
		})
	} else {
		$("#equipmentstatuscover").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
	}
	// removemask("equipmentstatuscover");
}

projectindex.init();
window.projectindex = projectindex;
/**
 * 数值转化为显示字段
 * @param number
 * @param defaultText
 */
function numberMap(number, successText, failText, defaultText) {
	if (typeof number === "number") {
		number = parseFloat(number).toFixed(2);
	}
	if (number == null) {
		number = "--";
	}
	return number;
}
/*循环播放列表专用数组整理方法,
	arr:需要整理的数组，
	listLength:列表需要显示的长度
*/
function txtMarqueeArr(arr, listLength) {
	var clonelist = []; //整理后的数组
	if (arr.length > listLength) {
		var arrend = arr[arr.length - 1]; //最后一个
		var arrbrgin = arr.slice(0, listLength); //开始几个
		clonelist.push(arrend); //最后一个数组放到第一个位置
		for (var j = 0; j < arr.length; j++) {
			clonelist.push(arr[j]); //获取的数组放中间位置
		}
		for (var i = 0; i < arrbrgin.length; i++) {
			clonelist.push(arrbrgin[i]); //开始几个数组放到最后面的位置
		}
	} else {
		clonelist = arr; //不大于规定长度，直接返回原数组
	}

	return clonelist;
}

//获取当前时间
function getTime() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	return time = h + ":" + m;
}

//验证设备状态数据 val当前设备绑定信号信息 
//type 表示设备的状态 refeStatus
//val  表示具体数据   refeText
//ifreverse是否需要反转 例如：正序（-1灰 0绿 1红）反转之后（-1灰 0红 1绿）
function checkStatus(type, val) {
	switch (type) {
		case "s_alarm_type":
		case "d_alarm_type":
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case "o_alarm_type":
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;

		case "start_type":
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-green.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case "stop_type":
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-red.png">
				</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case "normal_type":
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-green.png">
				</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case "figure_type":
			return val;
		default:
			return '--';
	}
}
//转化设备状态 没传的显示正常
function convertFault(v) {
	//判断当v为undefinded或者值为NULL时页面显示--
	return typeof v === "undefined" || v == null || v == "None" ? `--` : v;
}
function convertFrequency(status, val) {
	if (status == 'o_alarm_type') {
		return "离线";
	} else {
		return val;
	}
}