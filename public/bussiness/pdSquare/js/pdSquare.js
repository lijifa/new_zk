//u3d使用函数
var pdSquare = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称
var menuid = getParams()["menuId"]; //菜单id
var layuiId = getParams()["layuiId"]; //标签id
var plcTypeIds = getParams()['plcTypeIds']; //菜单设备串
var cameraShowId = "";
var cameraArray = [];
pdSquare.cameras = {};
var timer = null;
var timer1 = null;
var timer2 = null;
var timer4 = null;
var leftBar = null;
var rightBar = null;
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer4);
	} else {
		// pdSquare.oneMinutesUpdate(); //一分钟更新
		pdSquare.fiveMinutesUpdate(); //五分钟更新
		pdSquare.u3dUpdata();
		pdSquare.changeBtn();
	}
});
// var objName = layuiId;
// //刷新
// window.onunload = function() {
// 	top.unregisterListener(objName); //销毁
// 	clearInterval(timer);
// 	clearInterval(timer1);
// }
// //标签切换
// top.registerListener(objName, function(e) {
// 	pdSquare.waringfaultlist(); //当前报警汇总
// 	// console.log(e);//e当前页面的lay-id
// }); //注册

pdSquare.init = function() {
	pdSquare.turnback(); //收起按钮
	pdSquare.popUps(); //弹窗
	$("#camera-containerPD").prepend(
		'<iframe src="./JiFangSite/index.html?v='+version+'" frameborder="0" width="100%" height="100%"></iframe>'
	);
	pdSquare.electricRoom(); // 配电室铭牌
	pdSquare.environmentMonitor(); // 环境安防监测
	pdSquare.deviceMonitor(); // 设备监测
	pdSquare.waringfaultlist(); //当前报警汇总
	pdSquare.ImvEnergyConsumptionData(); // 当日总能耗
	pdSquare.energyEfficiency(); // 电能利用效率
	pdSquare.analysisTopFive(); // 当日耗电前5名
	pdSquare.loadtemputer(); // 当日负荷曲线
	// pdSquare.oneMinutesUpdate(); //一分钟更新
	pdSquare.fiveMinutesUpdate(); //五分钟更新
	pdSquare.transformChange();
	pdSquare.changeBtn();
};
pdSquare.oneMinutesUpdate = function() {
	timer1 = setInterval(function() {
		// console.log('站点页一分钟更新函数');
	}, 60 * 1000)
}
pdSquare.fiveMinutesUpdate = function() {
	timer = setInterval(function() {
		// console.log('站点页五分钟更新函数');
		pdSquare.electricRoom(); // 配电室铭牌
		pdSquare.ImvEnergyConsumptionData(); // 当日总能耗
		pdSquare.analysisTopFive(); // 当日耗电前5名
		pdSquare.energyEfficiency(); // 电能利用效率
		pdSquare.loadtemputer(); // 当日负荷曲线
	}, 5 * 60 * 1000)
}

pdSquare.u3dinit = function(gameInstance) {
	leftBar.showMenu();
	rightBar.showMenu();
	let newCamera = new camera({
		outerContainer:'#camera-containerPD',
		cameraIdName:'camera4',
		cameraUrlArr:cameraArray,
		// clarity:['hd'],
		openCallBack:function(e){
			console.log(e);
		},
		closeCallBack:function(e){
			console.log(e);
		}
	});
	// 监测切换按钮
	pdSquare.changeMonitorBtn = function() {
		$('.btn').on('click', function() {
			// 移除了btnBlue0按钮，避免改变大量样式，让index加1 
			let i = $(this).index();
			let index = i + 1;
			if ($(this).hasClass('btnOn')) {
				$(this).removeClass('btnOn');
				$(this).removeClass(`btnYellow${index}`);
				$(this).addClass(`btnBlue${index}`);
			} else {
				$(this).addClass('btnOn');
				$(this).addClass(`btnYellow${index}`);
				$(this).removeClass(`btnBlue${index}`);
			}
			let type = $(this).attr('data-type');
			gameInstance.SendMessage("RecvJsMessageObject", 'GetEvent', type + ', ');
			if ($('.btn').eq(2).has('btnBlue2') && $(this).index() == 2) {
				$(this).parent(".camera").css("z-index", "-111");
				cameraShowId = "";
				pdSquare.resetSelectXiangJiStatus();
			}
		})
	}
	pdSquare.backBtn = function (){
		$('.backBtn').on('click',function(){
			$('.btnCenter').show();
			$(this).hide();
			gameInstance.SendMessage('Collider','FrontReturn');
		})
	}
	pdSquare.changeMonitorBtn();
	pdSquare.backBtn();
	//摄像头图表变亮
	pdSquare.resetSelectXiangJiStatus = function() {
		gameInstance.SendMessage("XiangJiMgr", "ResetSelectXiangJiStatus");
	}
	pdSquare.showBtnCenter = function() {
		$('.btnCenter').show();
		$('.bottomTip').show();
	}
	// 加载资源
	pdSquare.U3DInfo = function() {
		gameInstance.SendMessage("RecvJsMessageObject", 'GetEvent', '15019' + ', ');
		$.get(hdInterface.getDeviceInfoCopy, {
			'siteId': _SITE_ID
		}, function(data) {
			if (data['code'] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", 'GetJsMessage', JSON.stringify(data));
			}else{
				gameInstance.SendMessage("UpdateStateMgr", 'noData');
			}
		})
		$.get(hdInterface.sensorU3dPD, {
			'siteId': _SITE_ID
		}, function(data) {
			if (data['code'] === 0) {
				// console.log(data);
				gameInstance.SendMessage("UpdateStateMgr", 'GetJsSenousMessage',JSON.stringify(data));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", 'noData');
			}
		})
		$.get(hdInterface.getCabinetInfo, {
			'siteId': _SITE_ID
		}, function(data) {
			console.log(data);
			if (data['code'] === 0) {
				// console.log(data);
				gameInstance.SendMessage("UpdateStateMgr", 'GetJsCabinetMessage',JSON.stringify(data));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", 'noData');
			}
		})
	}
	//显示对应id的监控
	// pdSquare.showVideo=function(id){
	// 	$("#camera" + id).show();
	// }
	pdSquare.showVideo = function(id) {
		$("#camera" + id).css("z-index", "111");
	}
	// 开启摄像头
	pdSquare.showpdSquareVideo = function(id) {
		cameraShowId = id;
		// console.log(cameraShowId);
		newCamera.getCameraListPlay(cameraShowId);
	};
	pdSquare.closepdSquareVideo = function() {
		// $("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	pdSquare.canmerHide = function() {
		pdSquare.closepdSquareVideo();
	};
	//根据对应的id和位置移动摄像头
	pdSquare.moveVideo = function(str) {
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
	pdSquare.getEqumentlist = function(gameInstance) {
		$.post(hdInterface.selectDeviceStatusByDeviceIdsModuleCopy, {
			siteId: _SITE_ID,
		}).done(function(result) {
			gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(result));
		});
	}
	//实时数据
	pdSquare.getRealTimeData = function(gameInstance) {
		$.post(hdInterface.selectPlcTemplateStatusByPlcTypeIds, {
			"siteId": _SITE_ID,
			// "plcTypeIds":plcTypeIds
			"plcTypeIds": "16,49,52,79,81,83,86,88,90,91,92,93,94,110,112,113,140,141,142,143",
		}).done(function(data) {
			gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(data));
		});
	}


	// 绑定监控
	pdSquare.bindCameraData = function() {
		$.post(hdInterface.selectCameraDetailNew, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				cameraArray = data.data;
				newCamera.updataCameraList(cameraArray);
				// gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
	
		/* $(document).on("click", ".cameraclose", function() {
			$(this).parent(".camera").css("z-index", "-111");
			cameraShowId = "";
			pdSquare.resetSelectXiangJiStatus();
		}); */
	};
	pdSquare.bindCameraData();
	// 查询摄像头状态
	pdSquare.selectCameraStatus = function(){
		$.post(hdInterface.selectCameraStatus, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
	}
	pdSquare.selectCameraStatus();
	pdSquare.u3dUpdata = function(){
		timer2 = setInterval(function(){
			pdSquare.U3DInfo(); //加载U3D资源信息
			pdSquare.selectCameraStatus();
			pdSquare.environmentMonitor(); // 环境安防监测
			pdSquare.deviceMonitor(); // 设备监测
			pdSquare.waringfaultlist(); //当前报警汇总
			$('.pop_fault').css('display', 'none');
		},60*1000)
	}
	pdSquare.u3dUpdata();
}

//收起按钮

pdSquare.turnback = function() {
	leftBar = new SlideMenu({
		direction:'left',
		menuBtn:'#btnLeft',
		menuBox:'.leftbar',
		menuSetPosition:[0,-342],
		btnSetposition:[342,0],
		isOpen:false,
		bgDrop:5,
		callBackFun:function(e){
			if(e){
				$('#btnLeft>i').removeClass('layui-icon-right').addClass('layui-icon-left')
				$('.backBtn').css({
					'left':'360px'
				})
			} else {
				$('#btnLeft>i').removeClass('layui-icon-left').addClass('layui-icon-right')
				$('.backBtn').css({
					'left':'20px'
				})
			}
		}
	})
	rightBar = new SlideMenu({
		direction:'right',
		menuBtn:'#btnRight',
		menuBox:'.rightbar',
		menuSetPosition:[0,-342],
		btnSetposition:[342,0],
		isOpen:false,
		bgDrop:5,
		callBackFun:function(e){
			if(e){
				$('#btnRight>i').removeClass('layui-icon-left').addClass('layui-icon-right')
			} else {
				$('#btnRight>i').removeClass('layui-icon-right').addClass('layui-icon-left')
			}
		}
	})
}
// 监控视频画质
pdSquare.play = function(id, src) {
	let srcArr = [];
	srcArr[0] = src[0];
	srcArr[1] = src[1];
	// srcArr[1] = src.substring(0, src.lastIndexOf('.')) + '.hd' + src.substring(src.lastIndexOf('.'))
	var player = new TcPlayer(id, {
		m3u8_hd: srcArr[0], //高清
		m3u8: srcArr[1], //原画
		autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
		width: "580", //视频的显示宽度，请尽量使用视频分辨率宽度
		height: "350", //视频的显示高度，请尽量使用视频分辨率高度
		controlBar: {
			playToggle: false,
			progressControl: false,
			volumePanel: false,
		},
		clarity: 'hd',
		clarityLabel: {
			od: '流畅',
			hd: '高清',
			sd: '标清'
		},
	});
}

// 环境安防监测
pdSquare.environmentMonitor = function() {
	$.get(hdInterface.environmentalSecurity, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			for (let key in data.data) {
				let text = '正常';
				let arrTemp = [];
				data.data[key].forEach((item) => {
					let obj = {
						alarmName: convert(item.alarmName),
						time: convert(item.time),
					}
					arrTemp.push(obj);
				})
				if (data.data[key].length !== 0) {
					pdSquare[key] = arrTemp;
					text = data.data[key].length + '处异常';
					var img = $('#' + key + ' img').attr('src');
					if (img !== undefined) {
						img = img.replace(/Blue/, 'Red');
						$('#' + key + ' img').attr('src', img);
						$('#' + key + ' span').addClass('textColorRed');
					}
				} else {
					var img = $('#' + key + ' img').attr('src');
					pdSquare[key] = [{
						text: '暂无异常'
					}];
					if (/Red/.test(img)) {
						img = img.replace(/Red/, 'Blue');
					}
					$('#' + key + ' img').attr('src', img);
					$('#' + key + ' span').removeClass('textColorRed');
				}
				$('#' + key + ' em').html(text);
			}
		}
	})
}
// 设备监测
pdSquare.deviceMonitor = function() {
	$.get(hdInterface.equipmentMonitoring, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			for (let key in data.data) {
				let text = '正常';
				let arrTemp = [];
				data.data[key].forEach((item) => {
					let obj = {
						alarmName: convert(item.alarmName),
						time: convert(item.time),
					}
					arrTemp.push(obj);
				})
				if (data.data[key].length !== 0) {
					pdSquare[key] = arrTemp;
					text = data.data[key].length + '处异常';
					$('#' + key).removeClass('textColorBlue');
					$('#' + key).addClass('textColorRed');
				} else {
					pdSquare[key] = [{
						text: '暂无异常'
					}];
					$('#' + key).removeClass('textColorRed');
					$('#' + key).addClass('textColorBlue');
				}
				$('#' + key).html(text);
			}
		}
	})
}
// 电能利用效率
pdSquare.energyEfficiency = function() {
	let type = $('.transformerBtnOn').attr('data-type');
	$.get(hdInterface.energyEfficiency, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			$('#harmonic').html('--');
			$('#powerFactor').html('--');
			data.data.forEach((item,index) => {
				if(item.deviceName.indexOf(type) != -1){
					for (let key in item) {
						$('#' + key).html(convert(item[key]) == '--' ? convert(data.data[key]) : Number(
							convert(item[key])).toFixed(2));
					}
				}
			})
		}
	})
}
// 当日负荷曲线
pdSquare.loadtemputer = function() {
	let type = $('.transformerBtnOn').attr('data-type');
	$.get(hdInterface.dailyLoad, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			if(data.data.length == 0){
				$('#temp_echars').html(`
				<div style="height: 100%;position: relative;" id="echarsCreate">
					<div class="hd-loadmask">
						<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
					</div>
				</div>
				`)
				$('.transformerBtn button').removeAttr('disabled').css({
					'cursor':'pointer',
				});
				return;
			}
			let _item = {};
			data.data.forEach((item,index) => {
				console.log(item.name.indexOf(type) != -1);
				if(item.name.indexOf(type) != -1){
					_item = item;
				} else {
					// $('#temp_echars').html(`
					// <div style="height: 100%;position: relative;" id="echarsCreate">
					// 	<div class="hd-loadmask">
					// 		<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
					// 	</div>
					// </div>
					// `)
					// $('.transformerBtn button').removeAttr('disabled').css({
					// 	'cursor':'pointer',
					// });
					// $('.legend_pub').hide();
				}
			})
			$('.transformerBtn button').removeAttr('disabled').css({
				'cursor':'pointer',
			});
			if (JSON.stringify(_item) == '{}') {
				$('.legend_pub').hide();
				$('#temp_echars').html(`
				<div style="height: 100%;position: relative;" id="echarsCreate">
					<div class="hd-loadmask">
						<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
					</div>
				</div>
				`)
			} else {
				$('.legend_pub').show();
				var datax = _item.data.dataX.split(',');
				var datay1 = _item.data.dataY.split(',');
				var datay2 = _item.data.dataY2.split(',');
				var dataXTime = [];
				datax.forEach((item) => {
					dataXTime.push(item + ':00');
				})
				echarsComponent.getLine({
					"elementId": "echarsCreate", //容器id	[必填]
					xdata: dataXTime, //横坐标数据[必填]
					ydata: [datay1, datay2], //纵坐标数据[必填]
					ydataTitle: ['有功功率', '无功功率'],
					linecolors: ['#00FFFF', '#168FFF'], //线颜色[非必填]
					// interval:0,//间隔[非必填]
					// "yAxisMin":0,
					yAxisMinInterval: 10, //y轴最小刻度间距
					"unit": "kW/kVar", //单位
					unitPadding:[0,0,-10,10],
					"grid": {
						left: '20px',
						right: '20px',
						bottom: '0',
						top: '25px',
					}, //边距[非必填]
					"markPoint": {
						label: {
							show: false,
							// position: "top",
							// distance: 7,
							// offset: [1, 10],
							// formatter: '{b}: {c}'
						},
						symbol: "circle",
						symbolSize: 7,
						symbolOffset: [0, 0],
						data: [{
							type: 'max',
							name: 'MAX'
						}, {
							type: 'min',
							name: 'MIN'
						}, ],
					}, //标记点
				});
			}
		}
	})
}

//当日报警汇总
pdSquare.waringfaultlist = function() {
	$.get(hdInterface.alarmRecord, {
		siteId: _SITE_ID,
		type:1,
	}).done(function(data) {
		if (data['code'] === 0) {
			if (data.data.length === 0) {
				$('#alarm_list .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				var param1 = {
					title: ['报警时间', '报警原因'], //列表标题
					list: [], //列表数据.
					hangLie: {
						lieflag: true, //间隔列开
						lienum: '2', //间隔列 从0开始
						hangflag: true, //间隔行开
						hangnum: '1', //间隔行 从0开始
					}
				}
				data.data.forEach((item, index) => {
					var obj = {
						alarmTime: convert(item.alarmTime),
						reason: convert(item.reason),
					}
					param1.list.push(obj)
				})
				let obj1 = new listRollNew('alarm_list', param1); //实例化
			}
		}
	})
}

//弹窗
pdSquare.popUps = function() {
	$('.device li').hover(function() {
		var offectTop = $(this).offset();
		var type = $(this).attr('data-id');
		$('.pop_fault').css({
			'top': offectTop.top + 20 + 'px',
			display: 'block'
		});
		if (pdSquare[type] !== undefined) {
			pdSquare.faultList(type);
			if (pdSquare[type][0].text !== '暂无异常') {
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
	}, function() {
		$('.pop_fault').css({
			display: 'none'
		});
	})
	$(window).on('resize', function() {
		$('.pop_fault').css('display', 'none');
	})
}
pdSquare.faultList = function(key) {
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
	paramFault.list = pdSquare[key];
	// console.log(paramFault.list);
	let fault = new listRollNew('fault', paramFault); //实例化
}
// 配电室铭牌
pdSquare.electricRoom = function() {
	$.get(hdInterface.electricRoom, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			// console.log(data);
			for (let key in data.data) {
				$('#' + key).html(convert(data.data[key]));
			}
		}
	})
}
// 当日总能耗
pdSquare.ImvEnergyConsumptionData = function() {
	$.get(hdInterface.ImvEnergyConsumptionData, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			// console.log(data);
			$('#electricityDay').html(convert(data.data.electricityDay) == '--' ? '0' : convert(data.data
				.electricityDay));
			$('#electricityYesterday').html(convert(data.data.electricityYesterday));
			$('#electricityCostGoalToday').html(convert(data.data.electricityCostGoalToday));
			$('#timePeriod').html(convert(data.data.hour));
			$('#avePower').html(convert(data.data.avePower));
			if (data.data['trend'] > 0) {
				$('#trend').parent().addClass('textColorRed');
				$('#trend').parent().removeClass('textColorBlue');
				$('#trend').siblings().html(` <img src="./image/up1.png" style="opacity:1;">`); //↑
			} else if (data.data['trend'] < 0) {
				$('#trend').parent().addClass('textColorBlue');
				$('#trend').parent().removeClass('textColorRed');
				$('#trend').siblings().html(` <img src="./image/down1.png" style="opacity:1;">`); //↓
			}
			$('#trend').html(convert(data.data['trend'])=='--'?convert(data.data['trend']):Math.abs(Number(convert(data.data['trend']))));
		}
	})
}
// 当日耗电前5名
pdSquare.analysisTopFive = function() {
	$.get(hdInterface.analysisTopFive, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			if (data.data.length === 0) {
				$('#top .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				var list = [];
				data.data.forEach((item) => {
					let obj = {
						name: convert(item.deviceName),
						power: convert(item.power),
					}
					list.push(obj);
				})
				pdSquare.topList('top', list, 'power');
			}
		}
	})
}
// 变压器切换按钮
pdSquare.transformChange = function(){
	$(document).on('click','.transformerBtn button',function(){
		let type = $(this).attr('data-type');
		$(this).addClass('transformerBtnOn').siblings().removeClass('transformerBtnOn');
		$('.transformerBtn button').attr('disabled',true).css({
			'cursor':'not-allowed',
		});
		pdSquare.energyEfficiency();
		pdSquare.loadtemputer();
	})
}
pdSquare.changeBtn = function(){
	timer4 = setInterval(function(){
		$('.transformerBtn button.transformerBtnOn').removeClass('transformerBtnOn').siblings().addClass('transformerBtnOn');
		$('.transformerBtn button').attr('disabled',true).css({
			'cursor':'not-allowed',
		});
		let type = $('.transformerBtn button.transformerBtnOn').attr('data-type');
		pdSquare.energyEfficiency();
		pdSquare.loadtemputer();
	},20*1000)
}
pdSquare.init();
window.pdSquare = pdSquare;

// 当日耗电前5名
function systemTop(selector, arr, val) {
	$('#' + selector).html(`<ul class="systemTop"></ul>`);
	let maxVal = 0;
	let sum = 0
	arr.forEach((item) => {
		item[val] = item[val] - 0;
		maxVal = item[val] > maxVal ? item[val] : maxVal;
		sum += item[val];
	})
	arr.forEach((item) => {
		var widthVal = (item[val] / maxVal) * 100;
		$('#' + selector + ' .systemTop').append(`
			<li>
				<div class="systemName">
					${item.name}
				</div>
				<div class="systemVal">
					<div class="systemValLine" style="width: ${widthVal}%;">
						<div class="systemValLineHandle"></div>
					</div>
				</div>
			</li>
		`)
	})
	let average = ((sum / arr.length) / maxVal) * 100;
	average = average.toFixed(2);
	$('#' + selector + ' .systemTop').append(`
		<div class="averageLine">
			<div class="verticalLine" style="left: ${average}%;"></div>
			<div class="averageVal" style="left: ${average>=63?63:average}%;">平均电量: 
			<em>${(sum/arr.length).toFixed(2)}</em>kW·h</div>
		</div>
	`)
}

pdSquare.topList = function(selector, data, electric) {
	$('#' + selector).html(`<ul class="top_list"></ul>`)
	var maxElectric = 0
	var testData = null
	data.forEach((item, index) => {
		maxElectric = item[electric] - 0 > maxElectric ? (item[electric] - 0) : maxElectric;
	})
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data.length; j++) {
			if (data[i][electric] - 0 > data[j][electric] - 0) {
				testData = data[i]
				data[i] = data[j]
				data[j] = testData
			}
		}
	}
	data.forEach((item, index) => {
		var width = (item[electric] / maxElectric) * 100
		$('#' + selector + ' .top_list').append(`
			<li>
				<div class="li_top">
					<span class="list_No">${index+1}</span>
					<span class="list_name">${item.name}</span>
					<span class="list_Num">${item[electric]}</span>
				</div>
				<div class="li_bottom">
					<div style="position: relative;height: 5px;">
						<div class="li_line" style="width:${width}%;"></div>
					</div>
				</div>
			</li>
		`)
	})
}
