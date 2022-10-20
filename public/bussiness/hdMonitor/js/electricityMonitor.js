var electricityMonitor = {};
var _SITE_ID = getParams()['siteId'] || 13;
var menuNavId=getParams()['menuNavId'];//菜单id
var layuiId=getParams()['layuiId'];//菜单id
var sitename = getParams()['sitename'];
var timer = null;
// 离开页面调用
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
		// console.log('离开')
	} else {
		// electricityMonitor.init();
		electricityMonitor.fiveMinutesUpdate();
		// console.log('回来')
	}
});
electricityMonitor.init = function() {
	$("#innerheader").attr("data-title", decodeURI(sitename));
	electricityMonitor.changeBtn(); //切换按钮
	electricityMonitor.createButton(); // 生成设备按钮
	electricityMonitor.fiveMinutesUpdate(); //五分钟更新
}
electricityMonitor.fiveMinutesUpdate = function() {
	timer = setInterval(function() {
		console.log('电力页五分钟更新函数');
		electricityMonitor.changeBtn(); //切换按钮
		electricityMonitor.createButton(); // 生成设备按钮
	}, 5 * 60 * 1000);
}
// 生成设备按钮
electricityMonitor.listIDS = [];
electricityMonitor.idFlag = '';
electricityMonitor.idsFlag = '';
electricityMonitor.transformFlag = 0;
electricityMonitor.typeFlag = 'lowVoltageActivePower';
electricityMonitor.createButton = function() {
	$.get(hdInterface.getDeviceInfo, {
		"siteId": _SITE_ID,
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data);
			if (data.data.length == 0) {
				$('#electricechar .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:300px;height:200px;">
				`)
				$('.transformer').hide();
				$('.transformer2').hide();
			} else {
				$('.transformer').show();
				$('.transformer2').show();
				$('.transformer').html('');
				data.data.forEach((item, index) => {
					$('.transformer').append(`
					<button class="${electricityMonitor.transformFlag==index?'on':''}" data-id="${item.deviceId}">${item.deviceName}</button>
					`)
					electricityMonitor.listIDS.push(item.type);
				})
				for (let key in electricityMonitor.listIDS[electricityMonitor.transformFlag]) {
					$('#' + key).attr('data-ids', electricityMonitor.listIDS[electricityMonitor.transformFlag][key]);
					$('.transformer2 button').removeClass('on');
					$('#' + electricityMonitor.typeFlag).addClass('on');
				}
				electricityMonitor.idFlag = data.data[electricityMonitor.transformFlag].deviceId;
				electricityMonitor.idsFlag = data.data[electricityMonitor.transformFlag]['type'][electricityMonitor.typeFlag];
				electricityMonitor.loopPowerDetection(electricityMonitor.idFlag, electricityMonitor.idsFlag);
			}
		}
	})
}
// 回路电力检测
electricityMonitor.loopPowerDetection = function(id, type) {
	$('.transformer button').prop('disabled', true);
	$('.transformer button').css('cursor', 'no-drop');
	$('.transformer2 button').prop('disabled', true);
	$('.transformer2 button').css('cursor', 'no-drop');
	$.get(hdInterface.loopPowerDetection, {
		"siteId": _SITE_ID,
		"deviceId": id,
		"type": type,
	}, function(data) {
		if (data['code'] === 0) {
			console.log(data);
			if (JSON.stringify(data.data) === '{}') {
				$('#electricechar .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:300px;height:200px;">
				`)
				$('.transformer button').prop('disabled', false);
				$('.transformer button').css('cursor', 'pointer');
				$('.transformer2 button').prop('disabled', false);
				$('.transformer2 button').css('cursor', 'pointer');
			} else {
				// console.log(data);
				let obj = {
					dataX: [],
					dataY: [],
					title: [],
					color: ['#48D396', '#00FFFF', '#1683FF', '#ded281'],
				}
				/* for (let key in data.data) {
					data.data[key] = JSON.parse(data.data[key]);
					if (key === 'dataX') {
						// data.data[key] = JSON.parse(data.data[key]);
						obj.dataX = data.data[key].data.split(',');
						obj.dataX.forEach((item, index, arr) => {
							arr[index] = item + ':00';
						})
					} else {
						// data.data[key] = JSON.parse(data.data[key]);
						obj.dataY.push(data.data[key].data.split(','));
						obj.title.push(data.data[key].name);
					}
				} */
				Object.keys(data.data).sort().forEach((item,index) => {
					data.data[item] = JSON.parse(data.data[item]);
					if (item === 'dataX') {
						obj.dataX = data.data[item].data.split(',');
						obj.dataX.forEach((item, index, arr) => {
							arr[index] = item + ':00';
						})
					} else {
						obj.dataY.push(data.data[item].data.split(','));
						obj.title.push(data.data[item].name);
					}
				})
				// console.log(type);
				electricityMonitor.getElectChars(obj);
				$('.transformer button').prop('disabled', false);
				$('.transformer button').css('cursor', 'pointer');
				$('.transformer2 button').prop('disabled', false);
				$('.transformer2 button').css('cursor', 'pointer');
			}
		}
	})
}

//显示图表
electricityMonitor.getElectChars = function(obj) {
	$('#legendEcharts').html('');
	obj.title.forEach((item, index) => {
		$('#legendEcharts').append(`
			<span style="background-color:${obj.color[index]}"></span>
			<em>${convert(item)}</em>
		`)
	})
	let unit = ['kW', 'kVar', '', 'kVA', 'A', 'V', 'V', 'Hz'];
	let MIN = [undefined,undefined,0.7,undefined,undefined,200,300,48];
	let MAX = [undefined,undefined,1,undefined,undefined,260,450,52];
	let index = $('.transformer2 .on').index();
	// console.log(index);
	let min = 0;
	obj.dataY.forEach((item,index) => {
		item.forEach((e,i) => {
			if(e && min >= e - 0){
				min = e - 0;
			}
		})
	})
	min - 0 >= 0 ? min = 0 : '';
	let params = {
		"elementId": 'electricechar',
		xdata: obj.dataX, //横坐标数据[必填]
		ydata: obj.dataY, //纵坐标数据[必填]
		ydataTitle: obj.title,
		linecolors: obj.color, //线颜色[非必填]
		interval: 1, //间隔[非必填]
		"yAxisMin":MIN[index],//y轴最小刻度默认为数据中最小值[非必填]
		yAxisMax:MAX[index],
		"unit": unit[index], //单位
		grid: {
			left: '35px',
			right: '35px',
			top: '25px',
			bottom: '15px',
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
	}
	let type = $('.children.on').attr('id');
	// if(type == 'lowVoltagePowerFactor'){
	// 	params.yAxisMin = 0.5;
	// } else if (type == 'lowVoltageFrequency'){
	// 	params.yAxisMin = 49;
	// }
	echarsComponent.getLine(params);
}
//切换按钮
electricityMonitor.changeBtn = function() {
	//第一层标题切换
	$(".transformer").on('click', 'button', function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(".transformer2 button").eq(0).addClass("on").siblings().removeClass('on');
		electricityMonitor.transformFlag = $(this).index();
		loadechars();
	});
	//第二层标题切换
	$(".transformer2 button").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		electricityMonitor.typeFlag = $(this).attr('id');
		// checkboxChecked();
		loadechars();
	});
	//从新调用图表
	function loadechars() {
		let lev1 = $(".transformer .on").data("id"); //第一层标题选项id
		let lev2 = $(".transformer2 .on").data("ids"); //第二层标题选项ids
		if (lev1 == electricityMonitor.idFlag && lev2 == electricityMonitor.idsFlag) {
			// console.log(lev1,lev2);
		} else {
			$('.electricechar').html(`
				<div id="electricechar" style="position: relative;">
					<div class="hd-loadmask">
						<img src="../../common/image/load.gif" class="iconimg">
					</div>
				</div>
			`)
			electricityMonitor.idFlag = lev1;
			electricityMonitor.idsFlag = lev2;
			electricityMonitor.loopPowerDetection(lev1, lev2);
		}
	}
}
electricityMonitor.init();
window.electricityMonitor = electricityMonitor;
