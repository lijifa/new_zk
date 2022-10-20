var siteId = getParams()['siteId'] || 13;
var menuNavId = getParams()['menuNavId']; //菜单id
var layuiId = getParams()['layuiId']; //菜单id
var sitename = getParams()['sitename'];
var conDiagram = {
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
		conDiagram.oneMinutesUpdate(); // 一分钟更新
	}
});
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer1);
}
// top.registerListener(objName, function (e) {
// 	// conDiagram.threePhaseVoltage(); //低压总进线三相电压趋势图
// 	// conDiagram.circuitState(); //电路状态
// 	if(e == objName){
// 		conDiagram.oneMinutesUpdate(); // 一分钟更新
// 	} else {
// 		clearInterval(timer1);
// 	}
// }); //注册
//初始化项目
conDiagram.init = function () {
	conDiagram.changeButton(); // 按钮切换
	conDiagram.popUps(); // 弹窗
	conDiagram.ImvEnergyConsumptionData(); // 用能检测
	conDiagram.powerMonitor(); //配电室总电力监测
	conDiagram.threePhaseVoltage(); //低压总进线三相电压趋势图
	conDiagram.environmentMonitor(); //环境安防监测
	conDiagram.selectZgMenuParamByMenuId(); //组态图
	conDiagram.oneMinutesUpdate(); // 一分钟更新
	$('.zztfullBtn').on('click',function(){
		let src = $(this).attr('src');
		$('.ztt').html(`
		<div id="ztt_dl">
		<div class="hd-loadmask"><img src="../../common/image/load.gif" class="iconimg" style="width: 80px;height: 80px;"></div>
		</div>
		`)
		if (screenfull.isEnabled) {
			if(src.indexOf('openFull') != -1){
				$(this).attr('src','/common/image/closeFull.png');
				clearInterval(timer1);
			} else {
				$(this).attr('src','/common/image/openFull.png');
				conDiagram.oneMinutesUpdate(); // 一分钟更新
			}
			screenfull.toggle(document.getElementById('zttFull'));
			conDiagram.selectZgMenuParamByMenuId(); //组态图
		}
	})
}
conDiagram.oneMinutesUpdate = function () {
	timer1 = setInterval(function () {
		conDiagram.ImvEnergyConsumptionData(); // 用能检测
		conDiagram.powerMonitor(); //配电室总电力监测
		conDiagram.threePhaseVoltage(); //低压总进线三相电压趋势图
		conDiagram.selectZgMenuParamByMenuId(); //组态图
		conDiagram.environmentMonitor(); //环境安防监测
		$('.pop_fault').css('display', 'none');
	}, 60 * 1000);
}
// 按钮切换
conDiagram.idFlagVol = 0;
conDiagram.idFlagCur = 0;
conDiagram.idMonitor = 0;
conDiagram.changeButton = function () {
	$('#volBtn').on('click', '.btn', function () {
		$(this).addClass('on').siblings().removeClass('on');
		let id = $(this).attr('data-id');
		if (id == conDiagram.idFlagVol) {
			console.log(id);
		} else {
			conDiagram.idFlagVol = id;
			getLineVol(conDiagram.idFlagVol);
		}
	})
	$('#energyTransformer').on('click','.btn',function(){
		$(this).addClass('on').siblings().removeClass('on');
		let id = $(this).attr('data-id');
		if (id == conDiagram.idMonitor) {
			console.log(id);
		} else {
			conDiagram.idMonitor = id;
			conDiagram.powerMonitor();
		}
	})
	$('#curBtn').on('click', '.btn', function () {
		$(this).addClass('on').siblings().removeClass('on');
		let id = $(this).attr('data-id');
		if (id == conDiagram.idFlagCur) {
			console.log(id);
		} else {
			conDiagram.idFlagCur = id;
			getLineCur(conDiagram.idFlagCur);
		}
	})
}
//获取参数
conDiagram.selectZgMenuParamByMenuId = function () {
	$.ajax({
		url: hdInterface.selectZgMenuParamByMenuId,
		type: "GET",
		data: {
			'menuId': menuNavId,
			'paramAlias': 1
		},
		success: function (result) {
			if (result['code'] === 0) {
				if (JSON.stringify(result.data) !== '{}') {
					conDiagram.deviceIds = result.data.bindDeviceList;
					conDiagram.getPic(result.data);
					conDiagram.circuitState(); //电路状态
				}
			}
		},
	})
}
// 
conDiagram.getPic = function (data) {
	$.post(hdInterface.selectDiagramByIdModulePD,{
		'siteId':siteId,
		'diagramCustomId': data.diagramCustomId
	},function(res){
		// console.log(res);
		$('.ztt').html(`
		<div id="ztt_dl"></div>
		`)
		createDrag(res.data.diagramJson,'ztt_dl','electric');
	})
}
// 用能检测
conDiagram.ImvEnergyConsumptionData = function () {
	$.get(hdInterface.ImvEnergyConsumptionData, {
		siteId: siteId
	}, function (data) {
		if (data['code'] === 0) {
			$('#electricityDay').html(convert(data.data.electricityDay) == '--' ? '0' : convert(data.data.electricityDay));
			$('#load').html(convert(data.data.load));
			$('#maxCapacity').html(convert(data.data.maxCapacity));
			$('#transformerCapacity').html(convert(data.data.transformerCapacity));
		}
	})
}
// 低压总进线三相电压趋势图
conDiagram.threePhaseVoltage = function () {
	conDiagram.listVol = [];
	$.get(hdInterface.imvThreeVoltage, {
		siteId: siteId,
		type:1
	}, function (data) {
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#threeVol .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				let arr = data.data;
				$('#volBtn').html('');
				arr.forEach((item, index) => {
					if (item.name !== '') {
						$('#volBtn').append(`
							<div class="btn ${conDiagram.idFlagVol == index? 'on':''}" data-id="${index}">${item.name}</div>
						`)
					}
					let obj = {
						dataX: [],
						dataY: [],
						deviceName: '',
						title: [],
					};
					obj.deviceName = item.name;
					for (let key in item.data) {
						if (key === 'dataX') {
							item.data[key] = item.data[key].split(',');
							item.data[key].forEach((itemKey, indexKey, arrKey) => {
								arrKey[indexKey] = itemKey + ':00';
							})
							obj.dataX = item.data[key];
						} else {
							item.data[key] = JSON.parse(item.data[key]);
							item.data[key].data = item.data[key].data.split(',');
							obj.dataY.push(item.data[key].data);
							obj.title.push(item.data[key].name);
						}
					}
					conDiagram.listVol.push(obj);
				})
				getLineVol(conDiagram.idFlagVol);
			}
		}
	})
}

function getLineVol(index) {
	$('.ABC_U').html(`
	<div id="threeVol">
		<div class="hd-loadmask">
			<img src="../../common/image/load.gif" class="iconimg" style="top: 50%;">
		</div>
	</div>
	`);
	let color = ['#00FFFF', '#168FFF', '#48D396'];
	$('#legendLable').html('');
	conDiagram.listVol[index].title.forEach((item, index) => {
		if (item !== '') {
			$('#legendLable').append(`
			<span class="legend_pub fr">
			<em class="icon_line" style="background-color:${color[index]}">
			</em><em class="font">${item}</em></span>
			`)
		}
	})
	echarsComponent.getLine({
		"elementId": 'threeVol',
		xdata: conDiagram.listVol[index].dataX, //横坐标数据[必填]
		ydata: conDiagram.listVol[index].dataY, //纵坐标数据[必填]
		ydataTitle: conDiagram.listVol[index].title,
		linecolors: color, //线颜色[非必填]
		// interval:0,//间隔[非必填]
		//"yAxisMin": 200, //y轴最小刻度默认为数据中最小值[非必填]
		yAxisMinInterval: 10,
		"unit": "V", //单位
		grid: {
			left: '20px',
			right: '25px',
			top: '20px',
			bottom: '0',
			// containLabel: true,
		},
		unitPadding: [0, 0, -15, -10],
		"markPoint": {
			label: {
				show: false,
			},
			symbol: "circle",
			symbolSize: 10,
			symbolOffset: [0, 0],
			data: [{
				type: 'max',
				name: 'MAX',
			}, {
				type: 'min',
				name: 'MIN'
			}, ],
		}, //标记点
	})
}
// 电路状态
conDiagram.circuitState = function () {
	$.get(hdInterface.circuitStatus, {
		deviceIds: conDiagram.deviceIds,
		siteId: siteId,
	}).done(function (data) {
		// console.log(data);
		if (data['code'] === 0) {
			// data.data = [
			// 	{name:'2#变压器',switchE:'0',trinomialIrregularity:'3.3',stableState:'0'},
			// 	{name:'1#变压器',switchE:'1',trinomialIrregularity:'1.0',stableState:'1'},
			// 	{name:'3#变压器',switchE:'0',trinomialIrregularity:'3',stableState:'0'},
			// 	{name:'4#变压器',switchE:'1',trinomialIrregularity:'5.3',stableState:'1'},
			// 	{name:'1#变压器',switchE:'0',trinomialIrregularity:'3.7',stableState:'1'},
			// 	{name:'2#变压器',switchE:'1',trinomialIrregularity:'2.5',stableState:'0'},
			// 	{name:'2#变压器',switchE:'0',trinomialIrregularity:'0.8',stableState:'0'}
			// ]
			if (data.data.length == 0) {
				$('#list .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				var paramCircuit = {
					//title: ['设备名称', '开关状态', '谐波畸变率(%)', '三相不平衡度(%)', '电路稳定状态', '当前负荷(kW)', '是否过载'], //列表标题
					title: ['设备名称', '开关状态', 'A相电流(A)', 'B相电流(A)', 'C相电流(A)', '频率(Hz)', '电路稳定状态'],
					list: [], //列表数据
					hangLie: {
						lieflag: true, //间隔列开
						lienum: '6', //间隔列 从0开始
						hangflag: true, //间隔行开
						hangnum: '1', //间隔行 从0开始
					}
				}
				// console.log("data", data.data);
				data.data.forEach((item) => {
					//开关状态 A相电流 B相电流 C相电流 三相不平衡度 频率 电路稳定状态
					let switchE, currentA, currentB, currentC, trinomialIrregularity, frequency, stableState;
					item.plctemplateInfos.forEach(sonItem => {
						switch (sonItem.plcTypeId) {
							case '289': //受电总回路开关
								switchE = checkStatus(sonItem.refeStatus, sonItem.refeText)
								break;
							case '243': //受电回路a相电流
								currentA = convertVal(sonItem.refeStatus, sonItem.refeValue);
								break;
							case '244': //受电回路b相电流
								currentB = convertVal(sonItem.refeStatus, sonItem.refeValue);
								break;
							case '245': //受电回路c相电流
								currentC = convertVal(sonItem.refeStatus, sonItem.refeValue);
								break;
							case '304': //受电回路三相不平衡
								trinomialIrregularity = convertVal(sonItem.refeStatus, sonItem.refeValue);
								stableState = sonItem.refeStatus;
								break;
							case '266': //频率
								frequency = convertVal(sonItem.refeStatus, sonItem.refeValue);
								break;
							default:
								break;
						}
					})

					var obj = {
						name: convert(item.name), //设备名称
						switchE: switchE, //启停状态
						currentA: currentA,
						currentB: currentB,
						currentC: currentC,
						// harmonic:convert(item.harmonic),//谐波畸变率
						frequency: convert(frequency), //三相不平衡度
						stableState: changeImgFan('figure_type', '异常', '稳定')//changeImgFan(stableState, '异常', '稳定'), //稳定状态
						// power:convert(item.power),//当前负荷
						// isOverloaded:changeImgFan(convert(item.isOverloaded),'过载','正常'),//是否过载
					}
					paramCircuit.list.push(obj);
				})
				let circuit = new listRollNew('list', paramCircuit);
			}
		}
	})
}
// 配电室总电力监测
conDiagram.powerMonitor = function () {
	conDiagram.powerDetection = [];
	var arr = {
		usefulPower: 'kW',
		unUsefulPower: 'kVar',
		totalVoltage: 'kV',
		totalCurrent: 'A',
		totalPower: 'Hz',
		powerFactor: '',
		apparentPower:'kVA',
		loadRate:'%',
	}
	var color = {
		totalVoltage: [
			[0.24, '#FF4444'],
			[0.64, '#1683FF'],
			[1, '#FF4444']
		],
		totalCurrent: [
			[0.69, '#48D396'],
			[0.75, '#1683FF'],
			[1, '#FF4444']
		],
		apparentPower: [
			[0.24, '#FF4444'],
			[0.64, '#1683FF'],
			[1, '#48D396']
		],
		loadRate: [
			[0.69, '#48D396'],
			[0.75, '#1683FF'],
			[1, '#FF4444']
		],
		totalPower: [
			[0.33, '#FF4444'],
			[0.66, '#1683FF'],
			[1, '#FF4444']
		],
		usefulPower: [
			[0.4, '#FF4444'],
			[0.7, '#1683FF'],
			[1, '#48D396']
		],
		unUsefulPower: [
			[0.4, '#48D396'],
			[0.7, '#1683FF'],
			[1, '#FF4444']
		],
		powerFactor: [
			[0.4, '#FF4444'],
			[0.6, '#1683FF'],
			[1, '#48D396']
		]
	}
	var max = {
		usefulPower: '100',
		unUsefulPower: '100',
		totalVoltage: '270',
		totalCurrent: '3200',
		totalPower: '51.5',
		powerFactor: '1.00',
		apparentPower: '100',
		loadRate: '100',
	}
	var min = {
		usefulPower: '0',
		unUsefulPower: '0',
		totalVoltage: '175',
		totalCurrent: '0',
		apparentPower: '0',
		loadRate: '0',
		totalPower: '48.5',
		powerFactor: '0.75',
	}
	let id = $('#energyTransformer .btn.on').attr('data-id');
	$.get(hdInterface.totalPowerDetection, {
		siteId: siteId
	}).done(function (data) {
		if (data['code'] === 0) {
			var temp = {
				"usefulPower": "0",
				"unUsefulPower": "0",
				"totalVoltage": "0",
				"totalCurrent": "0",
				"totalPower": "0",
				"powerFactor": "0",
				"apparentPower": "0",
				"loadRate": "0"
			}
			var _DATA = [];
			$('#energyTransformer').html('');
			data.data.forEach((item,index) => {
				if(item.deviceName != ''){
					$('#energyTransformer').append(`
						<div class="btn ${conDiagram.idMonitor == index? 'on':''}" data-id="${index}">${item.deviceName}</div>
					`)
				}
			})
			conDiagram.powerDetection = data.data.length == 0 ? [temp] : data.data;
			Object.keys(conDiagram.powerDetection[conDiagram.idMonitor]).forEach((item, index) => {
				if(item != 'deviceName' && item != 'totalVoltage' && item != 'totalCurrent'){
					echarsComponent.dashBoardEcharts({
						elementId: item,
						max: max[item],
						min: min[item],
						center: ['50%', '40%'],
						dashBoardcolor: color[item],
						dashBoardWidth: 10,
						titleSize: 12,
						titleColor: '#A5EAFF',
						titleOffSet: [0, -10],
						grid: {
							left: '0%',
							right: '0%',
							top: '0%',
							bottom: '0%',
						},
						detailShow: true,
						detailSize: 14,
						detailOffset: [0, 30],
						value: conDiagram.powerDetection[conDiagram.idMonitor][item] == null ? 0 : Number(convert(conDiagram.powerDetection[conDiagram.idMonitor][item])).toFixed(2),
						name: arr[item],
						pointer: {
							width: 3,
							length: '60%',
						},
					})
				}
			})
		}
	})
}
// 环境安防监测
conDiagram.environmentMonitor = function () {
	conDiagram.listCur = [];
	$.get(hdInterface.imvThreeVoltage, {
		siteId: siteId,
		type:0
	}, function (data) {
		console.log('低压总进线三相电流趋势图');
		console.log(data);
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#threeVol .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				let arr = data.data;
				$('#curBtn').html('');
				arr.forEach((item, index) => {
					if (item.name !== '') {
						$('#curBtn').append(`
							<div class="btn ${conDiagram.idFlagCur == index? 'on':''}" data-id="${index}">${item.name}</div>
						`)
					}
					let obj = {
						dataX: [],
						dataY: [],
						deviceName: '',
						title: [],
					};
					obj.deviceName = item.name;
					for (let key in item.data) {
						if (key === 'dataX') {
							item.data[key] = item.data[key].split(',');
							item.data[key].forEach((itemKey, indexKey, arrKey) => {
								arrKey[indexKey] = itemKey + ':00';
							})
							obj.dataX = item.data[key];
						} else {
							item.data[key] = JSON.parse(item.data[key]);
							item.data[key].data = item.data[key].data.split(',');
							obj.dataY.push(item.data[key].data);
							obj.title.push(item.data[key].name);
						}
					}
					conDiagram.listCur.push(obj);
				})
				getLineCur(conDiagram.idFlagCur);
			}
		}
	})
}
function getLineCur(index) {
	$('.ABC_I').html(`
	<div id="threeCur">
		<div class="hd-loadmask">
			<img src="../../common/image/load.gif" class="iconimg" style="top: 50%;">
		</div>
	</div>
	`);
	let color = ['#00FFFF', '#168FFF', '#48D396'];
	$('#legendLableCur').html('');
	conDiagram.listCur[index].title.forEach((item, index) => {
		if (item !== '') {
			$('#legendLableCur').append(`
			<span class="legend_pub fr">
			<em class="icon_line" style="background-color:${color[index]}">
			</em><em class="font">${item}</em></span>
			`)
		}
	})
	echarsComponent.getLine({
		"elementId": 'threeCur',
		xdata: conDiagram.listCur[index].dataX, //横坐标数据[必填]
		ydata: conDiagram.listCur[index].dataY, //纵坐标数据[必填]
		ydataTitle: conDiagram.listCur[index].title,
		linecolors: color, //线颜色[非必填]
		// interval:0,//间隔[非必填]
		//"yAxisMin": 200, //y轴最小刻度默认为数据中最小值[非必填]
		yAxisMinInterval: 40,
		"unit": "A", //单位
		grid: {
			left: '20px',
			right: '25px',
			top: '20px',
			bottom: '0',
			// containLabel: true,
		},
		unitPadding: [0, 0, -15, -10],
		"markPoint": {
			label: {
				show: false,
			},
			symbol: "circle",
			symbolSize: 10,
			symbolOffset: [0, 0],
			data: [{
				type: 'max',
				name: 'MAX',
			}, {
				type: 'min',
				name: 'MIN'
			}, ],
		}, //标记点
	})
}
//弹窗
conDiagram.popUps = function () {
	$('.device li').hover(function () {
		var offectTop = $(this).offset();
		var type = $(this).attr('data-id');
		$('.pop_fault').css({
			'top': offectTop.top - 150 + 'px',
			'left': offectTop.left - 215 + 'px',
			display: 'block'
		});
		if (conDiagram[type] !== undefined) {
			conDiagram.faultList(type);
			if (conDiagram[type][0].text !== '暂无异常') {
				$('#fault .gDlistOut .gDhang0').addClass('textColorRed');
				$('#fault .gDlistOut .gDhang1').addClass('textColorRed');
			} else {
				$('#fault .gDlistOut .gDhang0').addClass('textColorBlue');
				$('#fault .gDlistOut .gDhang1').addClass('textColorBlue');
			}
		} else {
			$('#fault').html(`
				<div class="hd-loadmask">
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				</div>
			`)
		}
	}, function () {
		$('.pop_fault').css({
			display: 'none'
		});
	})
	$(window).on('resize', function () {
		$('.pop_fault').css('display', 'none');
	})
}
conDiagram.faultList = function (key) {
	var paramFault = {
		title: [], //列表标题
		list: [
			// {text:'暂无异常'}
			// {type:'高压开关柜1温度过高',time:'03-09 09:16:50'},
			// {type:'高压开关柜1温度过低',time:'03-09 09:16:50'},
			// {type:'高压开关柜1温度过高',time:'03-09 09:16:50'},
		], //列表数据
		hangLie: {
			lieflag: true, //间隔列开
			lienum: '2', //间隔列 从0开始
			hangflag: true, //间隔行开
			hangnum: '1', //间隔行 从0开始
		},
		// Keyword:['过高','过低'],
		// KeywordClass:['textRed','textYellow']
	}
	paramFault.list = conDiagram[key];
	// console.log(paramFault.list);
	let fault = new listRollNew('fault', paramFault); //实例化
}
// 配电室铭牌

conDiagram.init();
window.conDiagram = conDiagram;

function changeImg(flag, Redtext, Greentext) {
	switch (flag) {
		case '0':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-red.png">
				</div>
				<div class="gDtext">&nbsp;&nbsp;${Redtext}</div>`;
		case '1':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-green.png">
				</div>
				<div class="gDtext">&nbsp;&nbsp;${Greentext}</div>`;
		case '-1':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-gray.png">
				</div>
				<div class="gDtext">&nbsp;&nbsp;离线</div>`;
		default:
			return '--';
	}
}

function changeImgFan(flag, Redtext, Greentext) {	//标志，异常，稳定
	switch (flag) {
		case 'o_alarm_type':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-gray.png">
				</div>
				<div class="gDtext">&nbsp;&nbsp;离线</div>`;
		case 'figure_type':
			return `<div class="gDtext">
						<img class="gDimg" src="../../common/image/circle-green.png">
						</div>
						<div class="gDtext">&nbsp;&nbsp;${Greentext}</div>`;

		case 's_alarm_type':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-red.png">
				</div>
				<div class="gDtext">&nbsp;&nbsp;${Redtext}</div>`;
		default:
			return '--';
	}
}

function transformerStatus(type, val) {
	switch (type) {
		case '-1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case 'unnormal_type':
			return `<div class="gDtext">
				<img class="gDimg" src="../../common/image/circle-green.png">
				</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case '1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		default:
			return '--';
	}
}

function transformerFault(type, val) {
	switch (type) {
		case '-1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-gray.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case '0':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-red.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		case '1':
			return `<div class="gDtext">
			<img class="gDimg" src="../../common/image/circle-green.png">
			</div><div class="gDtext">&nbsp;&nbsp;${val}</div>`;
		default:
			return '--';
	}
}

//根据三相不平衡判断电路稳定状态
function checkImbalance(data) {
	let realData = data.plctemplateInfos;

	for (let i = 0; i < realData.length; i++) {
		if (realData[i].plcTypeId == '304') {
			if (realData[i].isAlarm) {
				return realData[i].isAlarm != 0 ? '1' : '0';
			}
		}
	}
	return '';
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

function convertVal(status, val) {
	if (status == "o_alarm_type") {
		return '离线';
	} else {
		return Number(val).toFixed(2);
	}
}