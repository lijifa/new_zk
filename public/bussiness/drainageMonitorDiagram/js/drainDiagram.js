var projectindex = {};
var siteId = getParams()['siteId'];
var menuNavId = getParams()['menuNavId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var layuiId = getParams()["layuiId"]; //标签id
var timer = null;
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	}
	else {
		// projectindex.oneMinuteUpdata();
	}
});
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	// projectindex.oneMinuteUpdata();
// }); //注册
projectindex.init = function () {
	projectindex.deviceState();
	projectindex.monthRisk();
	projectindex.riskMonitor();
	projectindex.waterTank();
	projectindex.weather();
	// projectindex.oneMinuteUpdata();
}
projectindex.oneMinuteUpdata = function () {
	timer = setInterval(function () {
		projectindex.monthRisk();
		projectindex.weather();
	}, 60 * 1000)
}
// 当前设备状态
projectindex.deviceState = function () {
	let param = {
		title: ['设备名称', '频率(Hz)', '启停状态', '手自动', '运行时长(h)', '设备状态'],
		list: [],
		hangLie: {
			lieflag: true,//间隔列开
			lienum: '5',//间隔列 从0开始
			hangflag: true,//间隔行开
			hangnum: '1',//间隔行 从0开始
		},
		Keyword: ['data-flag="red"'],
		KeywordClass: ['colorRed']
	},
		data = [
			{
				name: '青少年自来水泵房排水泵一号',
				pl: 0,
				state: '0',
				auto: '手动',
				time: '152',
				fault: '0'
			}, {
				name: '青少年自来水泵房排水泵二号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '135',
				fault: '0'
			},
			{
				name: '青少年中水泵房排水泵一号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '自动',
				time: '125',
				fault: '0'
			},
			{
				name: '青少年中水泵房排水泵二号',
				pl: 0,
				state: '0',
				auto: '自动',
				time: '167',
				fault: '0'
			}, {
				name: '火烈鸟自来水泵房排水泵一号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '自动',
				time: '148',
				fault: '0'
			}, {
				name: '火烈鸟自来水泵房排水泵二号',
				pl: 0,
				state: '0',
				auto: '自动',
				time: '95',
				fault: '0'
			}
		];
	data.forEach((item, index) => {
		param.list.push({
			name: convert(item.name),
			pl: convert(item.pl),
			state: statuVal(item.state),
			auto: convert(item.auto),
			time: convert(item.time),
			fault: faultVal(item.fault)
		})
	})
	if ($('#list').length != 0) {
		let list = new listRollNew('list', param);
	}
}
// 当月风险次数
projectindex.monthRisk = function () {
	let dataX = currentMonth(), dataY = [];
	dataX.forEach((item, index) => {
		switch (index) {
			case 5:
				dataY.push(2);
				break;
			case 8:
				dataY.push(1);
				break;
			case 9:
				dataY.push(3);
				break;
			case 14:
				dataY.push(1);
				break;
			case 16:
				dataY.push(2);
				break;
			case 22:
				dataY.push(4);
				break;
			case 26:
				dataY.push(1);
				break;
			case 28:
				dataY.push(1);
				break;
			default:
				dataY.push(0);
				break;
		}
	})
	if ($('#risk').length != 0) {
		echarsComponent.getLineShadow({
			elementId: 'risk',
			xdata: dataX,
			ydata: [dataY],
			linecolors: ['rgba(0, 255, 255, 1)'],
			unit: '次',
			yAxisMinInterval: 1,
			grid: {
				left: '0',
				right: '20px',
				bottom: '0',
				top: '30px'
			},
			offectTop: "rgba(0, 255, 255, 1)",
			offectMiddle: "rgba(0, 255, 255, 0.5)",
			offectBottom: "rgba(0, 255, 255, 0.1)",
			areaStyleOpacity: 0.5
		})
	}
}
// 风险监测点
projectindex.riskMonitor = function () {
	let param = {
		title: ['风险点名称', '预警水位', '报警水位'],
		list: [],
		hangLie: {
			lieflag: true,//间隔列开
			lienum: '2',//间隔列 从0开始
			hangflag: true,//间隔行开
			hangnum: '1',//间隔行 从0开始
		},
	},
		data = [
			{
				name: '一号污水井',
				warn: '200mm',
				alarm: '400mm'
			},
			{
				name: '二号污水井',
				warn: '200mm',
				alarm: '400mm'
			},
			{
				name: '三号污水井',
				warn: '200mm',
				alarm: '400mm'
			},
			{
				name: '四号污水井',
				warn: '200mm',
				alarm: '400mm'
			}
		]
	data.forEach((item, index) => {
		param.list.push({
			name: convert(item.name),
			warn: convert(item.warn),
			alarm: convert(item.alarm),
		})
	})
	if ($('#riskList').length != 0) {
		let riskList = new listRollNew('riskList', param);
	}
}
// 水箱水位
projectindex.waterTank = function () {
	if ($('#yl').length != 0) {
		let Tank = new waterTank('yl', {
			data: [0.05, 0.05, 0.05],
			borderColor: 'rgba(0,100,255, 1)',
			borderDistance: 0,
			borderWidth: 0,
			radius: '120%',
			// center:['50%','75%'],
			shape: 'path://M367.24,230.39h108v114c0,11.05-8.95,20-20,20h-68c-11.05,0-20-8.95-20-20V230.39z',
			// text:'1.5',
			color: ['rgba(0,100,255, 1)', 'rgba(9,136,234, 1)', 'rgba(4,187,252, 1)'],
			unit: '',
		})
	}
}
// 天气
projectindex.weather = function () {
	$.ajax({
		url: hdInterface.selectTemperatureAndHumidityCopy,
		type: 'post',
		data: {
			siteId: siteId
		},
		success: function (data) {
			if (data.code == 0 && data.data) {
				$('#temperature').html(convert(data.data.temperature));
				$('#humidity').html(convert(data.data.humidity));
				$('#precipitation').html(0);
			}
		}
	})
}
projectindex.init();

function statuVal(type) {
	switch (type) {
		case '-1':
			return '<div><img src="../../common/image/circle-gray.png" /></div>';
		case '0':
			return '<div><img src="../../common/image/circle-red.png" /></div>';
		case '1':
			return '<div><img src="../../common/image/circle-green.png" /></div>';
		default:
			return;
	}
}
function faultVal(type) {
	switch (type) {
		case '-1':
			return '<div><img src="../../common/image/circle-gray.png" /></div>';
		case '0':
			return '<div><img src="../../common/image/circle-green.png" /></div>';
		case '1':
			return '<div data-flag="red"><img src="../../common/image/circle-red.png" /></div>';
		default:
			return;
	}
}
// 当月日期
function currentMonth(str = '.') {
	let arrayDate = [];
	let month = new Date().getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	let date = new Date().getDate();
	for (let i = 1; i <= date - 1; i++) {
		let dateNew = i < 10 ? '0' + i : i;
		arrayDate.push(month + str + dateNew);
	}
	return arrayDate;
}

