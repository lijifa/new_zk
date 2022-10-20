var security = {
	isWarnLunBo: false,
	isFaultLunBo: false,
	loadmar: 0//判断循环列表是否全部加载完成
};
var timer = null
var timerLine = null
var _SITE_ID = getParams()['siteId'];
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var layuiId = getParams()["layuiId"]; //标签id
var timer = null;
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	}
	else {
		security.rainfallStatistics();
	}
});
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	security.rainfallStatistics();
// }); //注册
security.init = function () {
	security.playWarnLight();// 播放预警信息
	security.initMonitor(); // 初始化安全监控 1m
	security.rainfallStatistics();
	security.minFlowStatistics();
	security.popUpsList();
}
security.oneMinuteUpdate = function () {
	timer = setInterval(function () {
		security.rainfallStatistics();
	}, 60 * 1000)
}
// 播放预警信息
security.playWarnLight = function () {
	var audio;

	function voicePaly() {
		if (!audio) {
			audio = new Audio("./image/dingdong.mp3");
			audio.autoplay = true;
			audio.ended = "ended";
			audio.muted = "muted";
		}
		audio.play();
	}

	function voiceClose() {
		if (audio) {
			audio.pause();
		}
	}
};

// 初始化安全监控 1m
security.initMonitor = function () {
	// 评分 1m
	$.post(hdInterface.selectSafeScoreNew, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			// 当前预警次数
			security.alarmRate(data);
			//当前报警次数
			security.integrityRate(data);
			//综合安全评分
			security.safetyScore(data);
		}
	});
	/*系统预警详情 1m*/
	$.post(hdInterface.realSystemWarnDetailCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			var res = data.data || [];
			// if(res.length==0){
			// 	// $(".bottomList-left").hide();
			// 	$("#warnList").html('当前系统运行良好，暂无预警')
			// } else {
			var param1 = {
				vis: '2',//可视数
				// title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长', '故障状态'], //列表标题
				list: [],//列表数据
				// stateItem: [],//图标标志列
				// changeFlag: [],//0 1互换标志数组
				hangLie: {
					lieflag: true,
					lienum: 3,
					hangflag: true,
					hangnum: 0
				}
			}
			let list = [
				{
					warnRuleName: "泊心堂自来水用水流量过高",
					time: "11.03 07:40"
				},
				{
					warnRuleName: "温泉室外用水流量过高",
					time: "10.27 08:40"
				}
			]
			list.forEach((item, index) => {
				param1.list.push({
					warnRuleName: convert(item.warnRuleName),
					// type:'规则预警',
					state: '<img class="gDimg" src="../../common/image/circle-red.png">',
					time: convert(item.time),
				})
			})
			// console.log(param1)
			param1.list = [{ text: '当前暂无预警' }];
			let obj1 = new listRollNew('warnList', param1);//实例化
			// }
		}

	});

	/*当前报警详情 1m*/
	$.post(hdInterface.realAlarmDetailModule, {
		'siteId': _SITE_ID,
		"alarmType": "4,5,6"
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			var res = data.data || [];
			// if(res.length==0){
			// 	// $(".bottomList-right").hide();
			// 	$("#faultList").html('当前设备运行良好，暂无报警')
			// } else {
			var param2 = {
				vis: '2',//可视数
				list: [],//列表数据
				// stateItem: [],//图标标志列
				// changeFlag: [],//0 1互换标志数组
				hangLie: {
					lieflag: true,
					lienum: 3,
					hangflag: true,
					hangnum: 0
				}
			}
			let list = [
				{
					alarmName: "自来水CL粒子含量过分高",
					time: "11.09 11.10",
					alarmType: '4'
				},
				{
					alarmName: "火烈鸟自来水给水泵二号离线",
					time: "11.07 22.10",
					alarmType: '5'
				},
				{
					alarmName: "总站房生活用水水表离线",
					time: "11.07 22.10",
					alarmType: '5'
				}
			]
			/* list.forEach((item,index)=>{
				param2.list.push({
					alarmName:convert(item.alarmName),
					// type:item.alarmType=='4'?'规则报警':item.alarmType=='5'?'离线报警':item.alarmType=='6'?'设备故障':'--',
					state:item.alarmType=='5'?'<img class="gDimg" src="../../common/image/circle-gray.png">':'<img class="gDimg" src="../../common/image/circle-red.png">',
					time:convert(item.time),
				})
			}) */
			param2.list = [{ text: '当前暂无报警' }];
			let obj2 = new listRollNew('faultList', param2);//实例化
			// }
		}
	});
	$('#warnList').on('mouseenter mouseleave', '.gDhang0', function (e) {
		if (e.type == 'mouseenter') {
			let X = $(this).offset().top;
			let Y = $(this).offset().left;
			let color = $(this).css('color');
			$('.tipList').html($(this).html()).css({
				'top': X + 'px',
				'left': Y + 'px',
				'color': color,
				'opacity': 1,
				'z-index': 1,
			}).attr('data-selector', 'warnList');
		} else if (e.type == 'mouseleave') {
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
		}
	})
	$('#faultList').on('mouseenter mouseleave', '.gDhang0', function (e) {
		if (e.type == 'mouseenter') {
			let X = $(this).offset().top;
			let Y = $(this).offset().left;
			let color = $(this).css('color');
			$('.tipList').html($(this).html()).css({
				'top': X + 'px',
				'left': Y + 'px',
				'color': color,
				'opacity': 1,
				'z-index': 1,
			}).attr('data-selector', 'faultList');
		} else if (e.type == 'mouseleave') {
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
		}
	})
	$('.tipList').on('mouseenter mouseleave', function (e) {
		let selector = $(this).attr('data-selector');
		if (e.type == 'mouseenter') {
			$('.tipList').css({
				'opacity': 1,
				'z-index': 1,
			});
			if ($('#' + selector + ' .no_drag').length != 0) {
				selector != '' ? $('#' + selector + ' .gDlistOut').liMarquee('pause') : '';
			}
		} else if (e.type == 'mouseleave') {
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
			if ($('#' + selector + ' .no_drag').length != 0) {
				selector != '' ? $('#' + selector + ' .gDlistOut').liMarquee('play') : '';
			}
			$('.tipList').attr('data-selector', '');
		}
	})
};


/*综合安全评分*/
security.safetyScore = function (data) {
	if (data['code'] === 0) {
		var $vediodom = $("#warnLight");
		var $centerMessage = $('.center-message');
		var $safetyScore = $('#safetyScore');
		data.data.safetyScore = 100;
		if (data.data.safetyScore <= 90) {
			var url = "./image/huanhuan_x264.mp4";
			// if ($vediodom.attr("src") === url) {
			// 	hdTools.removemask("abc")
			// 	return;
			// }
			$("#warnLight").attr("src", url);
			// voicePaly();
			$centerMessage.css({
				'color': '#E93F41',
			})
		} else {
			var url = "./image/中间圆_x264.mp4";
			// if ($vediodom.attr("src") === url) {
			// 	hdTools.removemask("abc")
			// 	return;
			// }
			$("#warnLight").attr("src", url);
			$centerMessage.css({
				'color': '#3DFFAA',
			})
			// voiceClose();
		}
		// console.log("========更新安全综合评分");
		// console.log(data.data.safetyScore);
		$safetyScore.text(convert(data.data.safetyScore));
		$safetyScore.next().text('综合安全评分');
	}
};

/*加载当前预警次数*/
security.alarmRate = function (data) {
	data.data.realWarnRuleCount = 0;
	data.data.warnRuleCount = 112;
	var value = (data.data.realWarnRuleCount / data.data.warnRuleCount * 100) || "";
	var showText = `<span style="font-size:30px;">${convert(data.data.realWarnRuleCount)}</span>/${convert(data.data.warnRuleCount)}`;
	$("#circleWaringText").html(convert(showText));
	echarsComponent.getCircleChars({
		"elementId": "main7",//容器id	[必填]
		"value": value,//百分比值[必填]
		"startColor": '#36D1FF',//开始时候颜色[非必填]
		"endColor": '#36D1FF',//结束时候颜色	[非必填]
		"showText": false,//是否显示中间文字 bool[非必填]
	});


}

/*加载设备故障数量*/
security.integrityRate = function (data) {
	data.data.deviceAlarmCount = 0;
	data.data.alarmCount = 260;
	var value = data.data.deviceAlarmCount / data.data.alarmCount * 100;
	var showText = `<span style="color:#ff4444;"><span style="font-size:30px;">${convert(data.data.deviceAlarmCount)}</span>/${convert(data.data.alarmCount)}</span>`;
	$("#circleFaultText").html(convert(showText));
	echarsComponent.getCircleChars({
		"elementId": "main8",//容器id	[必填]
		"value": value,//百分比值[必填]
		"startColor": '#36D1FF',//开始时候颜色[非必填]
		"endColor": '#36D1FF',//结束时候颜色	[非必填]
		// "fontSize":"12",//中间文字大小[非必填]
		// "fontColor":"#fff",//中间文字颜色[非必填]
		"showText": false,//是否显示中间文字 bool[非必填]
	});
}

$("#control_btn").hover(function () {
	$(".div_rules").show();
}, function () {
	$(".div_rules").hide();
});
// 降雨量统计
security.rainfallStatistics = function () {
	let dataX = onTheHour(), dataY = [];
	dataX.forEach((item, index) => {
		dataY.push(0);
	})
	echarsComponent.getLineShadow({
		elementId: 'rainfall',
		xdata: dataX,
		ydata: [dataY],
		linecolors: ['rgba(54, 208, 255, 1)'],
		unit: 'mm',
		offectTop: "rgba(54, 208, 255, 1)",
		offectMiddle: "rgba(54, 208, 255, 0.5)",
		offectBottom: "rgba(54, 208, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
}
// 夜间最小流量统计
security.minFlowStatistics = function () {
	let dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'], dataY = [];
	dataX.forEach((item, index) => {
		dataY.push((Math.random() * 8 + 10).toFixed(2));
	})
	echarsComponent.getLineShadow({
		elementId: 'minFlow',
		xdata: dataX,
		ydata: [dataY],
		linecolors: ['rgba(54, 208, 255, 1)'],
		unit: 'm³/h',
		yAxisMinInterval: 2,
		offectTop: "rgba(54, 208, 255, 1)",
		offectMiddle: "rgba(54, 208, 255, 0.5)",
		offectBottom: "rgba(54, 208, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
}
// 弹窗
security.popUpsList = function () {
	let drain = new popUps({
		selector: '.pop',
		offsetLeft: 90,
		offsetTop: 0,
		hoverDom: '.main',
		fun: function (e) {
			console.log(e);
		}
	})
}
window.security = security;
security.init();
