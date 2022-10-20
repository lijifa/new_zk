var siteId = getParams()['siteId'] || 13;
var menuNavId = getParams()['menuNavId']; //菜单id
var layuiId = getParams()['layuiId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称
var deviceId = getParams()["deviceId"];
var deviceMonitor = {
	oneceload: 0, //是否第一次加载
	iswaring: "false", //是否设备报警
};

var timer1 = null;
var timer2 = null;
// 离开页面调用
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer1);
	} else {
		deviceMonitor.oneMinutesUpdate(); //一分钟更新
	}
});
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer1);
}
// top.registerListener(objName, function (e) {
// 	deviceMonitor.transformerMonitor(); // 重点设备状态监测
// 	deviceMonitor.switchMonitor(); // 回路开关状态监测
// }); //注册
//初始化项目
deviceMonitor.init = function () {
	$("#innerheader").attr("data-title", decodeURI(sitename));
	deviceMonitor.imvTransformerParameter(); // 请求变压器监控基础数据
	deviceMonitor.selectTransformerChart();//变压器曲线数据
	// deviceMonitor.transformer(); // 切换变压器 切换功率温度
	deviceMonitor.transformerMonitor(); // 重点设备状态监测
	deviceMonitor.switchMonitor(); // 回路开关状态监测
	deviceMonitor.oneMinutesUpdate(); //一分钟更新
}
deviceMonitor.oneMinutesUpdate = function () {
	timer1 = setInterval(function () {
		deviceMonitor.imvTransformerParameter(); // 请求变压器监控基础数据
		deviceMonitor.transformer(); // 切换变压器 切换功率温度
		// deviceMonitor.selectTransformerChart(deviceMonitor.idFlag,deviceMonitor.typeFlag);
		deviceMonitor.transformerMonitor(); // 重点设备状态监测
		deviceMonitor.switchMonitor(); // 回路开关状态监测
	}, 60 * 1000);
}
// 变压器监控基础数据
deviceMonitor.imvTransformerParameter = function () {
	$.get(hdInterface.imvTransformerParameter, {
		'siteId': siteId,
		'deviceId':deviceId
	}, function (data) {
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) == '{}' || data.data.length == 0) {
				$('#table .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimg">
				`)
				$('#echarts1 .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimg">
				`)
			} else {
				$('.transformer').html('');
				deviceMonitor.changeTable(data.data[0]); //渲染table表格
			}
		}
	})
}
deviceMonitor.changeTable = function (item) {
	$('.power_temperature em').html(`${item.deviceName}温度`);
	$('#table').html('');
	$('#table').append(`
	<table border="1" cellspacing="5" cellpadding="5">
		<tr><th>属性</th><th>负荷</th><th>功率</th><th>电流</th><th>电压</th><th>温度</th></tr>
		<tr>
			<td>变压器类型：${convert(item.deviceTypeName)}</td>
			<td>额定容量：${convert(item.capacity)}kVA</td>
			<td>有功功率：${convert(item.usefulPower)}kW</td>
			<td>A相电流：${convert(item.aElectricCurrent)}A</td>
			<td>Uab线电压：${convert(item.abVoltage)}V</td>
			<td>A相绕组温度：${convert(item.aTemperature)}℃</td>
		</tr>
		<tr>
			<td>运行状态：${convert(item.runningState)}</td>
			<td>视在功率：${convert(item.apparentPower)}kVA</td>
			<td>无功功率：${convert(item.unUsefulPower)}kVar</td>
			<td>B相电流：${convert(item.bElectricCurrent)}A</td>
			<td>Ubc线电压：${convert(item.bcVoltage)}V</td>
			<td>B相绕组温度：${convert(item.bTemperature)}℃</td>
		</tr>
		<tr>
			<td>进线号：${convert(item.processLine)}</td>
			<td>负荷率：${convert(item.loadRate)}%</td>
			<td>功率因数：${convert(item.powerFactor)}</td>
			<td>C相电流：${convert(item.cElectricCurrent)}A</td>
			<td>Uca线电压：${convert(item.caVoltage)}V</td>
			<td>C相绕组温度：${convert(item.cTemperature)}℃</td>
		</tr>
	</table>
	`)
}

deviceMonitor.transformer = function () {
	// 切换变压器
	$('.transformer').on('click', 'button', function () {
		$(this).addClass('on').siblings().removeClass('on');
		$('.power_temperature button').eq(0).addClass('on').siblings().removeClass('on');
		deviceMonitor.transformerFlag = $(this).index();
		deviceMonitor.changeTable(deviceMonitor.imvTransformerList[deviceMonitor.transformerFlag]); //渲染table表格
		changeIDTYPE();
		$('.power_temperature em').html(`${$(this).text()}温度`);
	})
	// 切换功率温度
	$('.power_temperature button').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
		changeIDTYPE();
		let text = $('.transformer .on').text();
		let flag = $(this).attr('data-type');
		$('.power_temperature em').html(`${text}${flag==1?'功率':'温度'}`);
	})
	// 获取id type
	function changeIDTYPE() {
		let id = $('.transformer .on').data('id');
		let type = $('.power_temperature .on').data('type');
		if (id == deviceMonitor.idFlag && type == deviceMonitor.typeFlag) {
			console.log(id, type);
		} else {
			$('.temperature').html(`
			<div id="deviceEcharts" style="position: relative;height: 100%;">
				<div class="hd-loadmask"><img src="../../common/image/load.gif" class="iconimg"></div>
			</div>
			`)
			deviceMonitor.idFlag = id;
			deviceMonitor.typeFlag = type;
			deviceMonitor.selectTransformerChart(deviceMonitor.idFlag, deviceMonitor.typeFlag);
		}
	}
}
// 获取曲线数据
deviceMonitor.selectTransformerChart = function () {
	// 温度
	$.get(hdInterface.selectTransformerChart, {
		'siteId': siteId,
		'type': 0,
		'deviceId':deviceId
	}, function (data) {
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) === '{}') {
				$('#echarts2 .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimg">
				`)
			} else {
				let obj = {
					dataX: [],
					dataY: [],
					title: [],
					color: ['#00FFFF', '#1683FF', '#FBE945']
				}
				for (let key in data.data) {
					if (key === 'dataX') {
						data.data[key] = JSON.parse(data.data[key]);
						obj.dataX = data.data[key].data.split(',');
						obj.dataX.forEach((item, index, arr) => {
							arr[index] = item + ':00';
						})
					} else {
						data.data[key] = JSON.parse(data.data[key]);
						obj.dataY.push(data.data[key].data.split(','));
						obj.title.push(data.data[key].name.split(','));
					}
				}
				$('.legendPower2').html('');
				obj.title.forEach((item, index) => {
					$('.legendPower2').append(`
					<span style="background-color:${obj.color[index]}"></span>
					<em>${item}</em>
					`)
				})
				echarsComponent.getLine({
					"elementId": 'echarts2',
					xdata: obj.dataX, //横坐标数据[必填]
					ydata: obj.dataY, //纵坐标数据[必填]
					ydataTitle: obj.title,
					linecolors: obj.color, //线颜色[非必填]
					// interval:0,//间隔[非必填]
					// "yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
					// yAxisMinInterval: yAxisMinInterval[index],
					"unit": '℃',
					grid: {
						left: '35px',
						right: '35px',
						top: '25px',
						bottom: '0',
						containLabel: true,
					},
					markPoint: {
						label: {
							show: false,
							position: "top",
							distance: 7,
							offset: [1, 10],
							formatter: '{b}: {c}'
						},
						symbol: "circle",
						symbolSize: 10,
						symbolOffset: [0, 0],
						data: [{
							type: 'max',
							name: 'MAX'
						}, {
							type: 'min',
							name: 'MIN'
						}, ],
					}, //标记点
				})
			}
		}
	})
	// 功率
	$.get(hdInterface.selectTransformerChart, {
		'siteId': siteId,
		'type': 1,
		'deviceId':deviceId
	}, function (data) {
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) === '{}') {
				$('#echarts1 .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="posimg">
				`)
			} else {
				let obj = {
					dataX: [],
					dataY: [],
					title: [],
					color: ['#00FFFF', '#1683FF', '#FBE945']
				}
				for (let key in data.data) {
					if (key === 'dataX') {
						data.data[key] = JSON.parse(data.data[key]);
						obj.dataX = data.data[key].data.split(',');
						obj.dataX.forEach((item, index, arr) => {
							arr[index] = item + ':00';
						})
					} else {
						data.data[key] = JSON.parse(data.data[key]);
						obj.dataY.push(data.data[key].data.split(','));
						obj.title.push(data.data[key].name.split(','));
					}
				}
				$('.legendPower1').html('');
				obj.title.forEach((item, index) => {
					$('.legendPower1').append(`
					<span style="background-color:${obj.color[index]}"></span>
					<em>${item}</em>
					`)
				})
				echarsComponent.getLine({
					"elementId": 'echarts1',
					xdata: obj.dataX, //横坐标数据[必填]
					ydata: obj.dataY, //纵坐标数据[必填]
					ydataTitle: obj.title,
					linecolors: obj.color, //线颜色[非必填]
					// interval:0,//间隔[非必填]
					// "yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
					// yAxisMinInterval: yAxisMinInterval[index],
					"unit": '     kVA/kW/kVar',
					grid: {
						left: '35px',
						right: '35px',
						top: '25px',
						bottom: '0',
						containLabel: true,
					},
					markPoint: {
						label: {
							show: false,
							position: "top",
							distance: 7,
							offset: [1, 10],
							formatter: '{b}: {c}'
						},
						symbol: "circle",
						symbolSize: 10,
						symbolOffset: [0, 0],
						data: [{
							type: 'max',
							name: 'MAX'
						}, {
							type: 'min',
							name: 'MIN'
						}, ],
					}, //标记点
				})
			}
		}
	})
}

// 显示图表
deviceMonitor.powerEcharts = function (obj) {
	$('.legendPower').html('');
	obj.title.forEach((item, index) => {
		$('.legendPower').append(`
		<span style="background-color:${obj.color[index]}"></span>
		<em>${item}</em>
		`)
	})
	let unit = ['℃', 'kW'];
	let yAxisMinInterval = [5, 100];
	let index = $('.power_temperature .on').index();
	
}



// 重点设备状态监测
deviceMonitor.transformerMonitor = function () {
	$.get(hdInterface.selectImvKeyEquipment, {
		"siteId": siteId,
		'deviceId':deviceId
	}, function (data) {
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#transformerMonitor .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimg">
				`)
			} else {
				var paramTransformerMonitor = {
					title: ['设备名称', '监测类型', '监测值（正常范围）', '状态', '时间'], //列表标题
					list: [], //列表数据
					hangLie: {
						lieflag: true, //间隔列开
						lienum: '5', //间隔列 从0开始
						hangflag: true, //间隔行开
						hangnum: '1', //间隔行 从0开始
					}
				}
				data.data.forEach((item) => {
					let type, value, status, timer,tempStatus,tempValue; //类型，数值，状态，时间
					item.plctemplateInfos.forEach(sonItem => {
						type = sonItem.plcTypeName;
						value = sonItem.refeText;
						tempStatus = sonItem.refeStatus;
						tempValue = sonItem.refeValue;
						status = checkStatus(sonItem.refeStatus);
						timer = sonItem.updateTime;
					})
					let obj = {
						name: convert(item.name),
						type: convert(type),
						value: tempStatus == "figure_type" ? tempValue : value,
						status: status,
						time: convert(timer),
					}
					paramTransformerMonitor.list.push(obj);
				})
				let transformerMonitor = new listRollNew('transformerMonitor', paramTransformerMonitor);
			}
		}
	})
}
// 回路开关状态监测
deviceMonitor.switchMonitor = function () {
	$.post(hdInterface.circuitSwitchStatus, {
		"siteId": siteId,
	}, function (data) {
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#switchMonitor .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="posimg">
				`)
			} else {
				var paramSwitchMonitor = {
					title: ['回路名称', '监测类型', '状态', '时间'], //列表标题
					list: [], //列表数据
					hangLie: {
						lieflag: true, //间隔列开
						lienum: '5', //间隔列 从0开始
						hangflag: true, //间隔行开
						hangnum: '1', //间隔行 从0开始
					}
				}
				data.data.forEach((item) => {
					let status, timer;
					item.plctemplateInfos.forEach(sonItem => {
						status = checkStatus2(sonItem.refeStatus, sonItem.refeText);
						timer = sonItem.updateTime;
					})
					let obj = {
						circuit: convert(item.circuit),
						circuitType: convert(item.circuitType),
						circuitStatus: status,
						time: convert(timer),
					}
					paramSwitchMonitor.list.push(obj);
				})
				let switchMonitor = new listRollNew('switchMonitor', paramSwitchMonitor);
			}
		}
	})
}
deviceMonitor.init();
window.deviceMonitor = deviceMonitor;

function circuitStatus(type) {
	switch (type) {
		case '0':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;断开</div>`;
		case '1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-green.png">
			</div><div class="gDtext">&nbsp;&nbsp;闭合</div>`;
		case '-1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;离线</div>`;
		default:
			return '--';
	}
}
//验证设备状态数据 val当前设备绑定信号信息 
//type 表示设备的状态 refeStatus
function checkStatus(type) {
	switch (type) {
		case "null_type": //空值
			return '--';
		case "s_alarm_type": //设备报警
		case "d_alarm_type": //信号报警
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;故障</div>`;
		case "o_alarm_type": //离线报警
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;离线</div>`;
		case "null_type": 
			return `--`;
		default:
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-green.png">
			</div><div class="gDtext">&nbsp;&nbsp;正常</div>`;
	}
}
//验证设备状态数据 val当前设备绑定信号信息 
//type 表示设备的状态 refeStatus
//val  表示具体数据   refeText
//ifreverse是否需要反转 例如：正序（-1灰 0绿 1红）反转之后（-1灰 0红 1绿）
function checkStatus2(type, val) {
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

