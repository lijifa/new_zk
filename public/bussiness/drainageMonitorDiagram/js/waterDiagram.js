var projectindex = {};
var siteId = getParams()['siteId'];
var layuiId = getParams()["layuiId"]; //标签id
var menuNavId = getParams()['menuNavId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
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
	projectindex.flowMoniter();
	projectindex.waterTank();
	// projectindex.oneMinuteUpdata();
}
projectindex.oneMinuteUpdata = function () {
	timer = setInterval(function () {
		projectindex.flowMoniter();
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
				name: '火烈鸟自来水给水泵一号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '120',
				fault: '0'
			}, {
				name: '火烈鸟自来水给水泵二号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '123',
				fault: '0'
			},
			{
				name: '火烈鸟自来水给水泵三号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '134',
				fault: '0'
			},
			{
				name: '火烈鸟自来水给水泵四号',
				pl: 0,
				state: '0',
				auto: '自动',
				time: '156',
				fault: '0'
			}, {
				name: '火烈鸟自来水给水泵五号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '14',
				fault: '0'
			}, {
				name: '青少年自来水给水泵一号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '自动',
				time: '163',
				fault: '0'
			}, {
				name: '青少年自来水给水泵二号',
				pl: 0,
				state: '0',
				auto: '自动',
				time: '134',
				fault: '0'
			}, {
				name: '青少年自来水给水泵三号',
				pl: (Math.random() * 20 + 30).toFixed(1),
				state: '1',
				auto: '手动',
				time: '127',
				fault: '0'
			}, {
				name: '青少年自来水给水泵四号',
				pl: 0,
				state: '0',
				auto: '手动',
				time: '83',
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
// 当日流量监测 当日水位监测
projectindex.flowMoniter = function () {
	let dataX = onTheHour(), dataY = [], dataY2 = [];
	dataX.forEach((item, index) => {
		dataY2.push((Math.random() * 0.3 + 1.5).toFixed(2));
		switch (index) {
			case 0:
				dataY.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 1:
				dataY.push((Math.round(Math.random() * 4 + 16)));
				break;
			case 2:
				dataY.push((Math.round(Math.random() * 3 + 15)));
				break;
			case 3:
				dataY.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 4:
				dataY.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 5:
				dataY.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 6:
				dataY.push((Math.round(Math.random() * 4 + 16)));
				break;
			case 7:
				dataY.push((Math.round(Math.random() * 13 + 36)));
				break;
			case 8:
				dataY.push((Math.round(Math.random() * 13 + 36)));
				break;
			case 9:
				dataY.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 10:
				dataY.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 11:
				dataY.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 12:
				dataY.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 13:
				dataY.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 14:
				dataY.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 15:
				dataY.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 16:
				dataY.push((Math.round(Math.random() * 10 + 25)));
				break;
			case 17:
				dataY.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 18:
				dataY.push((Math.round(Math.random() * 10 + 50)));
				break;
			case 19:
				dataY.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 20:
				dataY.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 21:
				dataY.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 22:
				dataY.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 23:
				dataY.push((Math.round(Math.random() * 13 + 26)));
				break;
			default:
				break;
		}
	})
	if ($('#flowMoniter').length != 0) {
		echarsComponent.getLineShadow({
			elementId: 'flowMoniter',
			xdata: dataX,
			ydata: [dataY],
			linecolors: ['rgba(0, 255, 255, 1)'],
			unit: 'm³/h',
			yAxisMinInterval: 15,
			// yAxisMin:0,
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
	if ($('#waterMoniter').length != 0) {
		echarsComponent.getLineShadow({
			elementId: 'waterMoniter',
			xdata: dataX,
			ydata: [dataY2],
			linecolors: ['rgba(0, 255, 255, 1)'],
			unit: 'm',
			yAxisMinInterval: 0.5,
			yAxisMin: 0,
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

// 水箱水位
projectindex.waterTank = function () {
	if ($('#waterTank').length != 0) {
		let Tank = new waterTank('waterTank', {
			data: [0.6, 0.5, 0.4],
			borderColor: 'rgba(0,100,255, 1)',
			borderDistance: 10,
			// shape:'path://M246.24,257.89h350v79h-350V257.89z',
			// text:'1.5',
			color: ['rgba(0,100,255, 1)', 'rgba(9,136,234, 1)', 'rgba(4,187,252, 1)'],
			unit: '',
		})
	}
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

