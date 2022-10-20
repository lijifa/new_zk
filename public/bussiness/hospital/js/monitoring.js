//u3d使用函数
var monitoring = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称
var menuLeftId = getParams()["menuLeftId"]; //菜单id
var layuiId = getParams()["layuiId"]; //标签id
var deviceIds = getParams()['deviceIds']; //菜单设备串
var cameraShowId = "";
var cameraArray = [];
var timer1 = null,
	timer2 = null,
	timer3 = null;
var timerfault = null;
var timerAlarm = null;
monitoring.cameras = {};
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer3);
		clearInterval(timerfault);
		clearInterval(timerAlarm);
	} else {
		monitoring.oneMinuteUpdata();
		monitoring.fiveMintueUpdata();
		// monitoring.upData();
	}
});
var objName = layuiId;
//刷新
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
	clearInterval(timerfault);
	clearInterval(timerAlarm);
}
//标签切换
// top.registerListener(objName, function(e) {
// 	if (layuiId == e) {
// 		monitoring.oneMinuteUpdata();
// 		monitoring.fiveMintueUpdata();
// 		// monitoring.upData();
// 	} else {
// 		clearInterval(timer1);
// 		clearInterval(timer2);
// 		clearInterval(timer3);
// 		clearInterval(timerfault);
// 		clearInterval(timerAlarm);
// 	}
// }); //注册


monitoring.init = function () {
	monitoring.loadtemputer(); //实时供水温度
	monitoring.loadCop(); //cop
	monitoring.loadControlChars(); //监控覆盖	
	monitoring.bindCameraData(); //绑定摄像头
	monitoring.loadSafeScore(); //安全综合评分
	monitoring.loadSystemWarnAvgRecoveryTime(); //系统预警平均修复时间
	monitoring.loadDeviceFaultAvgRecoveryTime(); //设备故障平均修复时间
	monitoring.loadplcTemplateStatics(); //信号数量统计（信号总计、离线信号、故障信号）
	monitoring.loadselectEnergyCostStatics(); //能耗费用统计
	monitoring.loadenergyStatics(); //当日总能耗，当日冷热总能耗
	monitoring.loadselectTemperatureAndHumidity(); //室外温湿度
	monitoring.turnback(); //收起按钮

	monitoring.oneMinuteUpdata();
	//整点刷新(按小时刷新)
	monitoring.fiveMintueUpdata();
};
monitoring.oneMinuteUpdata = function () {
	timer1 = setInterval(function () {
		monitoring.loadSafeScore(); //安全综合评分
		monitoring.loadSystemWarnAvgRecoveryTime(); //系统预警平均修复时间
		monitoring.loadDeviceFaultAvgRecoveryTime(); //设备故障平均修复时间
		monitoring.loadplcTemplateStatics(); //信号数量统计（信号总计、离线信号、故障信号）
		monitoring.loadtemputer(); //实时供水温度
	}, 60 * 1000);
}
monitoring.fiveMintueUpdata = function () {
	timer2 = setInterval(function () {
		monitoring.loadenergyStatics(); //当日总能耗，当日冷热总能耗
		monitoring.loadselectEnergyCostStatics(); //能耗费用统计
		monitoring.loadCop(); //cop
		monitoring.loadselectTemperatureAndHumidity(); //室外温湿度
	}, 5 * 60 * 1000);
}


monitoring.u3dinit = function (gameInstance) {
	//摄像头图表变亮
	monitoring.resetSelectXiangJiStatus = function () {
		gameInstance.SendMessage("JiFangManager", "ResetSelectXiangJiStatus");
	}
	top.window.showVideo = function (id) {
		$("#camera" + id).css("z-index", "111");
	}
	top.window.showMonitoringVideo = function (id) {
		cameraShowId = id;
		var zindex = $("#camera10").css("z-index");
		top.window.closeMonitoringVideo();
		if (zindex == "-111") {
			$("#camera10").css("z-index", "111");
			$('.cameraclose').css({
				'z-index': '111',
				'display': 'block',
			})
		} else {
			$("#camera10").css("z-index", "-111");
			$('.cameraclose').css({
				'z-index': '-111',
				'display': 'none',
			})
			cameraShowId = "";
		}
		var params = {
			siteId: _SITE_ID,
		};
		cameraArray.forEach((item, index) => {
			if (item.position == cameraShowId) {
				$('#camerID').html('');
				var src = ''
				src = item.cameraUrl
				monitoring.play("camerID", src)
				move({
					selector: '.cameraMove',
					handle: '.vcp-panel-bg',
					padding: [40, 10, 40, 10]
				});
			}
		})
	};
	top.window.closeMonitoringVideo = function () {
		$("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	top.window.canmerHide = function () {
		top.window.closeMonitoringVideo();
	};
	//根据对应的id和位置移动摄像头
	top.window.moveVideo = function (str) {
		var strArr = str.split(",");
		var id = strArr[0];
		var pointx = strArr[1] - 100;
		var pointy = strArr[2];
		$("#camera10").css({
			"bottom": pointy + "px",
			"left": pointx + "px"
		});
	};
	//获取设备列表
	monitoring.getEqumentlist = function (gameInstance) {
		$.post(hdInterface.selectDeviceStatusByDeviceIdsModuleCopy, {
			siteId: _SITE_ID,
		}).done(function (result) {
			if (result.code == '200' || result.code == '0') {
				gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(result));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		});
	}
	//实时数据
	monitoring.getRealTimeData = function (gameInstance) {
		$.get(hdInterface.sensorU3d, {
			"siteId": _SITE_ID,
			"plcTypeIds": "16,49,52,79,81,83,86,88,90,91,92,93,94,110,112,113,140,141,142,143,329,330,331,332,333,334",
		}).done(function (data) {
			if (data.code == '200' || data.code == '0') {
				gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(data));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		});
	}


	monitoring.getEqumentlist(gameInstance); //获取设备列表
	monitoring.getRealTimeData(gameInstance); //实时数据
	monitoring.upData = function () {
		timer3 = setInterval(function () {
			monitoring.getEqumentlist(gameInstance); //获取设备列表
			monitoring.getRealTimeData(gameInstance); //实时数据
		}, 60 * 1000)
	}
	monitoring.upData();
}
//收起左右状态栏、温度、报警详情
monitoring.closeSlideBar = function () {
	$(".sildebar").hide();
	$(".humidityTemp").hide();
	$(".btn_shouqi").hide();
	$("#pop_fault").hide();
	$("#bob_fault").hide();
}
//显示左右状态栏、温度、报警详情
monitoring.showSlideBar = function () {
	$(".sildebar").show();
	$(".humidityTemp").show();
	$(".btn_shouqi").show();
}
// 点击显示隐藏评分规则
$(".btn_rules").hover(function () {
	$(".div_rules").show();
}, function () {
	$(".div_rules").hide();
});
//点击显示故障信号设备列表

$("#devFault").hover(function () {
	monitoring.faultlist(); //故障信号列表
	timerfault = setInterval(function () {
		monitoring.faultlist(); //当前设备报警详情
	}, 1000 * 60)
	$("#pop_fault").show();
}, function () {
	$("#pop_fault").hide();
	clearInterval(timerfault);
});
$("#pop_fault").hover(function () {
	$(this).show();
}, function () {
	$(this).hide();
	clearInterval(timerfault);
})

$("#devAlarm").hover(function () {
	monitoring.alarmlist(); //故障信号列表
	timerAlarm = setInterval(function () {
		monitoring.alarmlist(); //故障信号列表
	}, 1000 * 60)
	$("#bob_fault").show();
}, function () {
	$("#bob_fault").hide();
	clearInterval(timerAlarm);
});
$("#bob_fault").hover(function () {
	$(this).show();
}, function () {
	$(this).hide();
	clearInterval(timerAlarm);
})
//收起按钮
var leftBar = null;
var rightBar = null;
monitoring.turnback = function () {
	leftBar = new SlideMenu({
		direction: 'left',
		menuBtn: '#btnLeft',
		menuBox: '.leftbar',
		menuSetPosition: [0, -340],
		btnSetposition: [340, 0],
		isOpen: true,
		bgDrop: 5,
		callBackFun: function (e) {
			if (e) {
				$('#btnLeft>i').removeClass('layui-icon-right').addClass('layui-icon-left')
			} else {
				$('#btnLeft>i').removeClass('layui-icon-left').addClass('layui-icon-right')
			}
		}
	})
	rightBar = new SlideMenu({
		direction: 'right',
		menuBtn: '#btnRight',
		menuBox: '.rightbar',
		menuSetPosition: [0, -340],
		btnSetposition: [340, 0],
		isOpen: true,
		bgDrop: 5,
		callBackFun: function (e) {
			if (e) {
				$('#btnRight>i').removeClass('layui-icon-left').addClass('layui-icon-right')
			} else {
				$('#btnRight>i').removeClass('layui-icon-right').addClass('layui-icon-left')
			}
		}
	})
}
//屏蔽右键菜单
/* document.oncontextmenu = function () {
	console.log(111);
	event.returnValue = false;
	if(leftBar.param.isOpen && rightBar.param.isOpen){
		leftBar.hideMenu();
		rightBar.hideMenu();
	} else {
		leftBar.param.isOpen = false;
		leftBar.showMenu();
		rightBar.param.isOpen = false;
		rightBar.showMenu();
	}
} */
$(document).on('contextmenu', function () {
	event.returnValue = false;
	if (leftBar.param.isOpen && rightBar.param.isOpen) {
		leftBar.hideMenu();
		rightBar.hideMenu();
	} else {
		leftBar.param.isOpen = false;
		leftBar.showMenu();
		rightBar.param.isOpen = false;
		rightBar.showMenu();
	}
})
monitoring.play = function (id, src) {
	let srcArr = []
	srcArr[0] = src
	srcArr[1] = src.substring(0, src.lastIndexOf('.')) + '.hd' + src.substring(src.lastIndexOf('.'))
	var player = new TcPlayer(id, {
		m3u8_hd: srcArr[1], //高清
		m3u8: srcArr[0], //超清
		autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
		width: "580", //视频的显示宽度，请尽量使用视频分辨率宽度
		height: "350", //视频的显示高度，请尽量使用视频分辨率高度
		controlBar: {
			volumePanel: false,
			progressControl: false,
		},
		clarity: 'od',
		clarityLabel: {
			od: '流畅',
			hd: '高清',
			sd: '标清'
		},
	});
}
monitoring.bindCameraData = function () {
	var event = {
		initDevice: function (arr) {
			$.each(arr, function (i) {
				var id = `id_test_video${i}`
			});
		},
	};
	var params = {
		siteId: _SITE_ID,
	};
	$.post(hdInterface.selectCameraDetailNew, params).done(function (data) {
		if (data["code"] === 0) {
			cameraArray = data.data
		}
	});

	$(document).on("click", ".cameraclose", function () {
		$(this).parent(".camera").css("z-index", "-111");
		cameraShowId = "";
		monitoring.resetSelectXiangJiStatus();
	});

};

//实时供水温度
monitoring.loadtemputer = function () {
	$.post(hdInterface.selectInsideTemperatureCurve, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			var dataX = data.dataX.split(",");
			var datay = data.dataY.split(","); //供水温度
			var datay2 = data.dataY2.split(","); //回水温度
			var datay3 = data.dataY3.split(","); //室外温度
			var dataXTime = [];
			dataX.forEach(function (item) {
				dataXTime.push(item + ":00");
			})
			echarsComponent.getLine({
				"elementId": "temp_echars", //容器id	[必填]
				xdata: dataXTime, //横坐标数据[必填]
				ydata: [datay3, datay, datay2], //纵坐标数据[必填]
				ydataTitle: ['室外', '供水', '回水'],
				linecolors: ['#1683ff', '#00ffff', '#FFB72C'], //线颜色[非必填]
				"unit": "℃", //单位		  
				"grid": {
					left: '1%',
					right: '6%',
					bottom: '0',
					top: '25px',
				}, //边距[非必填]
				"nodataImg": true,
			});
		}
	});
}
//实时cop
monitoring.loadCop = function () {
	$.post(hdInterface.selectSiteCopStatics, {
		"siteId": _SITE_ID,
		"timeCode": 0,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			var dataX = data.dataX.split(",");
			var datay = data.dataY.split(",");
			var datay2 = data.dataY2.split(",");
			var dataXTimeCOP = [];
			dataX.forEach(function (item) {
				dataXTimeCOP.push(item + ":00");
			})
			echarsComponent.getLine({
				"elementId": "cop_echars", //容器id	[必填]
				xdata: dataXTimeCOP, //横坐标数据[必填]
				ydata: [datay, datay2], //纵坐标数据[必填]
				linecolors: ['#0A94FF', '#994427'], //线颜色[非必填]
				ydataTitle: ['COP', '标准值'],
				yAxisMin: 0,
				"grid": {
					left: '4%',
					right: '6%',
					bottom: '5%',
					top: '4%',
				} //边距[非必填]
			});
		}
	});
}
//监控覆盖
monitoring.loadControlChars = function () {
	$.post(hdInterface.cameraOverride, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			var rate = convertNumber(data.cameraRate) * 1; //监控百分比
			var isHealthy = convertNumber(data.isHealthy); //消防设施
			$("#controlCount").html(rate + "%");
			$(".evaluation li").eq(isHealthy).show(); //控制消防设施状态
			var color = ['#1683FF', '#00FFFF', '#48D396'];
			switch (rate) {
				case 50:
					color = ['#1683FF', '#2d4c5a', '#2d4c5a'];
					break;
				case 75:
					color = ['#1683FF', '#00FFFF', '#2d4c5a'];
					break;
				case 100:
					color = ['#1683FF', '#00FFFF', '#48D396'];
					break;
				default:
					color = ['#2d4c5a', '#2d4c5a', '#2d4c5a'];
					break;
			}
			/* echarsComponent.getPieChars({
				"elementId": "control_chars", //容器id	[必填]
				"data": [{
						value: 50,
						name: '影像监控'
					},
					{
						value: 25,
						name: '系统监控'
					},
					{
						value: 25,
						name: '设备监控'
					}
				], //数据[必填]
				"color": color, //圆环颜色[非必填]
				"radius": ['95%', '100%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小[非必填]
				"center": ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置[非必填]
				"animation": false, //是否关闭鼠标放大，false不关 true 关[非必填]
				"tooltip": {
					trigger: 'item',
					formatter: "{b} :{d}%",
					show: false
				}, //提示标签 formatter 中a代表数据中的name b代表value d% 代表百分比
				"itemStyle": {
					normal: {
						label: {
							show: false,
							formatter: '{b} : {c} ({d}%)'
						},
						labelLine: {
							show: false
						}
					}
				} //线和文字 formatter 中a代表数据中的name b代表value d% 代表百分比

			}); */
		}
	});
	let param = {
		vis: '1', //可视数
		title: ['设备名称', '启停状态', '设备状态'], //列表标题
		list: [], //列表数据
		hangLie: {
			lieflag: true,
			lienum: 3,
			hangflag: true,
			hangnum: 0
		}
	}
	// 机房设备列表
	$.post(hdInterface.selectDeviceStatusByDeviceIdsModule, {
		siteId: _SITE_ID,
		"deviceIds": deviceIds
	}, function (res) {
		if (res.code == 0) {
			// console.log(res);
			if (res.data.length == 0) {
				$('#deviceList').html(`
				<img src="/common/image/nodata.png" style="width:150px;height:100px;" class="load"/>
				`)
				return;
			}
			let frequency; //频率
			let state = '--'; //启停状态
			let handAuto; //手自动
			let fault; //设备状态
			res.data.forEach((item, index) => {
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
					// frequency: convert(frequency), //频率
					state: convert(state), //启停状态
					// auto: convert(handAuto), //手自动
					// runtime: convert(item.runtime), //运行时长
					fault: convertFault(fault) //故障状态
				}
				param.list.push(obj)
			})

			let deviceList = new listRollNew('deviceList', param);
		}
	})
}
//查询安全综合评分
monitoring.loadSafeScore = function () {
	$.post(hdInterface.selectSafeScoreNew, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			console.log(res);
			var data = res.data || {};
			// Object.keys(data).forEach(function(item) {
			// 	var dom = $("#safe #" + item);
			// 	if(item == )
			// 	dom.html(convertNumber(data[item]));
			// });
			$("#safe #realWarnRuleCount").html(data.realWarnRuleCount);
			$("#safe #safetyScore").html(data.safetyScore);
			$("#safe #deviceAlarmCount").html(data.deviceAlarmCount == data.alarmCount && data.deviceAlarmCount != 0 ? 1 : data.deviceAlarmCount);
		}
	});
}
//系统预警平均修复时间
monitoring.loadSystemWarnAvgRecoveryTime = function () {
	$.post(hdInterface.systemWarnAvgRecoveryTime, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			Object.keys(data).forEach(function (item) {
				var dom = $("#" + item);
				dom.html(convert(data[item]));
			});
		}
	});
}
//设备故障平均修复时间
monitoring.loadDeviceFaultAvgRecoveryTime = function () {
	$.post(hdInterface.deviceFaultAvgRecoveryTime, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			Object.keys(data).forEach(function (item) {
				var dom = $("#Equ" + item);
				dom.html(convert(data[item]));
			});
		}
	});
}
//信号数量统计 设备总数 离线设备 运行状态
monitoring.loadplcTemplateStatics = function () {
	$.post(hdInterface.selectDeviceCountStatics, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			// console.log(res)
			var data = res.data || {};
			Object.keys(data).forEach(function (item) {
				var dom = $('#' + item);
				dom.html(convert(data[item]));
			});
		}
	});
}
//当日/月能耗费用
monitoring.loadselectEnergyCostStatics = function () {
	//timeCode 0当日1当月
	$.post(hdInterface.selectEnergyCostStatics, {
		"siteId": _SITE_ID,
		"timeCode": 0,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			var dayenergyCost = data["energyCost"] * 1;
			var daycostQuota = data["costQuota"] * 1;
			if (dayenergyCost > daycostQuota) {
				$("#dayenergyCost").addClass("yellow3_pub");
			} else {
				$("#dayenergyCost").removeClass("yellow3_pub");
			}
			Object.keys(data).forEach(function (item) {
				var dom = $("#day" + item);
				dom.html(convert(data[item]));
			});
		}
	});
	$.post(hdInterface.selectEnergyCostStatics, {
		"siteId": _SITE_ID,
		"timeCode": 1,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			var monthenergyCost = data["energyCost"] * 1;
			var monthcostQuota = data["costQuota"] * 1;
			if (monthenergyCost > monthcostQuota) {
				$("#monthenergyCost").addClass("yellow3_pub");
			} else {
				$("#monthenergyCost").removeClass("yellow3_pub");
			}
			Object.keys(data).forEach(function (item) {
				var dom = $("#month" + item);
				dom.html(convert(data[item]));
			});
		}
	});
}
//当日总能耗 当日冷热总能耗
monitoring.loadenergyStatics = function () {
	$.post(hdInterface.energyStatics, {
		"siteId": _SITE_ID,
		"timeCode": 0,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			Object.keys(data).forEach(function (item) {
				var dom = $("#energyStatics" + item);
				dom.html(convert(data[item]));
			});
		}
	});
}
//室外温湿度
monitoring.loadselectTemperatureAndHumidity = function () {
	$.post(hdInterface.selectTemperatureAndHumidity, {
		"siteId": _SITE_ID,
	}).done(function (res) {
		if (res.code == 0) {
			var data = res.data || {};
			Object.keys(data).forEach(function (item) {
				var dom = $("#" + item);
				dom.html(convert(data[item]));
			});
		}
	});
}

//系统预警设备故障详情列表
monitoring.waringfaultlist = function () {
	$.post(hdInterface.selectDeviceFaultAndWarnDetail, {
		"siteId": _SITE_ID,
	}, function (data) {
		if (data['code'] === 0) {
			var param1 = {
				vis: '1', //可视数
				title: ['当前异常详情：'], //列表标题
				list: [], //列表数据
			}
			data['data'].forEach((item, index) => {
				var obj = {
					deviceName: convert(item),
				}
				param1.list.push(obj)
			})
			let obj1 = new listRollNew('waringfaultlist', param1); //实例化
		}
	})
}
//当前设备报警详情
monitoring.faultlist = function () {
	$.post(hdInterface.realAlarmDetailModule, {
		"siteId": _SITE_ID,
		"alarmType": "4,5,6"
	}, function (data) {
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#pop_fault>.hd-loadmask').css('padding', '5px 0 0 30px');
				$('#pop_fault>.hd-loadmask').html(
					'<span>系统报警：</span><br/><br/><span style="color:#ff4444;">当前设备运行良好，暂无报警</span>');
			} else {
				var param1 = {
					vis: '1', //可视数
					title: ['系统报警：'], //列表标题
					list: [], //列表数据
					hangLie: {
						lieflag: true,
						lienum: 3,
						hangflag: true,
						hangnum: 0
					}
				}
				data['data'].forEach((item, index) => {
					var obj = {
						alarmName: convert(item.alarmName),
						state: item.alarmType == '5' ?
							'<img class="gDimg" src="../../common/image/circle-gray.png">' :
							'<img class="gDimg" src="../../common/image/circle-red.png">',
						time: convert(item.time),
					}
					param1.list.push(obj)
				})
				let obj1 = new listRollNew('pop_fault', param1); //实例化
			}
		}
	})

}
//当前系统预警详情
monitoring.alarmlist = function () {
	$.post(hdInterface.realSystemWarnDetail, {
		"siteId": _SITE_ID,
	}, function (data) {
		if (data['code'] === 0) {
			if (data.data.length == 0) {
				$('#bob_fault>.hd-loadmask').css('padding', '5px 0 0 30px');
				$('#bob_fault>.hd-loadmask').html(
					'<span>设备预警：</span><br/><br/><span style="color:#ffb72c;">当前设备运行良好，暂无预警</span>');
			} else {
				var param1 = {
					vis: '1', //可视数
					title: ['系统预警：'], //列表标题
					list: [], //列表数据
					hangLie: {
						lieflag: true,
						lienum: 3,
						hangflag: true,
						hangnum: 0
					}
				}
				data['data'].forEach((item, index) => {
					var obj = {
						deviceName: convert(item.warnRuleName),
						state: '<img class="gDimg" src="../../common/image/circle-red.png">',
						time: convert(item.time),
					}
					param1.list.push(obj)
				})
				let obj1 = new listRollNew('bob_fault', param1); //实例化
			}
		}
	})
}
monitoring.init();
window.monitoring = monitoring;

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

