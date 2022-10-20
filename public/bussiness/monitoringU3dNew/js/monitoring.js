//u3d使用函数
var monitoring = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称
var menuid = getParams()["menuId"]; //菜单id
var layuiId = getParams()["layuiId"]; //标签id
var plcTypeIds = getParams()['plcTypeIds']; //菜单设备串
var cameraShowId = "";
var cameraArray = [];
var player = null;
monitoring.cameras = {};
var timer1 = null,timer2 = null;
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer1);
		clearInterval(timer2);
	} else {
		if(monitoring.upData){
			monitoring.upData();
		}
		if(monitoring.breakerStateUpdata){
			monitoring.breakerStateUpdata();
		}
	}
});
// var objName = layuiId;
// //刷新
// window.onunload = function() {
// 	top.unregisterListener(objName); //销毁
// 	clearInterval(timer1);
// 	clearInterval(timer2);
// }
// //标签切换
// top.registerListener(objName, function(e) {
// 	if(e == objName){
// 		if(monitoring.upData){
// 			monitoring.upData();
// 		}
// 		if(monitoring.breakerStateUpdata){
// 			monitoring.breakerStateUpdata();
// 		}
// 	} else {
// 		clearInterval(timer1);
// 		clearInterval(timer2);
// 	}
// }); //注册

monitoring.init = function () {
	$("#camera-containerIN").prepend(
		'<iframe src="./JiFangSite/index.html?v='+version+'" frameborder="0" width="100%" height="100%"></iframe>'
	);
};

monitoring.u3dinit = function (gameInstance) {
	let newCamera = new camera({
		outerContainer:'#camera-containerIN',
		cameraIdName:'camera3',
		cameraUrlArr:cameraArray,
		openCallBack:function(e){
			console.log(e);
		},
		closeCallBack:function(e){
			console.log(e);
			if(e == 'cameraclose'){
				monitoring.resetSelectXiangJiStatus();
			}
		}
	});
	monitoring.bindCameraData = function () {
		$.post(hdInterface.selectCameraDetailNew, {siteId: _SITE_ID,}).done(function (data) {
			if (data["code"] === 0) {
				cameraArray = data.data;
				newCamera.updataCameraList(cameraArray);
				// console.log(data);
				// gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
		/* $(document).on("click", ".cameraclose", function () {
			$(this).parent(".camera").css("z-index", "-111");
			cameraShowId = "";
			monitoring.resetSelectXiangJiStatus();
		}); */
	};
	monitoring.bindCameraData(); //绑定摄像头
	// 查询摄像头状态
	monitoring.selectCameraStatus = function(){
		$.post(hdInterface.selectCameraStatus, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				// cameraArray = data.data;
				gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
	}
	monitoring.selectCameraStatus();
	//摄像头图表变亮
	monitoring.resetSelectXiangJiStatus = function () {
		gameInstance.SendMessage("XiangJiMgr", "ResetSelectXiangJiStatus");
	}
	monitoring.resetSelectXiangJiStatus();
	monitoring.showVideo = function (id) {
		$("#camera" + id).css("z-index", "111");
	}
	monitoring.showMonitoringVideo = function (id) {
		cameraShowId = id;
		newCamera.getCameraListPlay(id);
		// monitoring.closeMonitoringVideo();
		/* var zindex = $("#camera1").css("z-index");
		if (zindex == "-111") {
			$("#camera1").css("z-index", "111");
			$('.cameraclose').css({
				'z-index': '111',
				'display': 'block',
			})
		} else {
			$("#camera1").css("z-index", "-111");
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
			// position
			if (item.cameraId == cameraShowId) {
				$('#camerID1').html('');
				var src = ''
				src = item.cameraUrls;
				monitoring.play("camerID1", src);
				move({
					selector: '.cameraMove',
					handle: '.vcp-panel-bg',
					padding: [40, 10, 40, 10]
				});
			}
		}) */
	};
	monitoring.closeMonitoringVideo = function () {
		// $("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	monitoring.canmerHide = function () {
	};
	//根据对应的id和位置移动摄像头
	monitoring.moveVideo = function (str) {
		var strArr = str.split(",");
		var id = strArr[0];
		var pointx = strArr[1] - 100;
		var pointy = strArr[2];
		$("#camera1").css({
			"bottom": pointy + "px",
			"left": pointx + "px"
		});
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
				// gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		});
	}
	//实时数据
	monitoring.getRealTimeData = function (gameInstance) {
		$.get(hdInterface.sensorU3d, {
			"siteId": _SITE_ID,
			// "plcTypeIds":plcTypeIds
			"plcTypeIds": "16,49,52,79,81,83,86,88,90,91,92,93,94,110,112,113,140,141,142,143,329,330,331,332,333,334",
		}).done(function (data) {
			if (data.code == '200' || data.code == '0') {
				gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(data));
			} else {
				// gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		});
	}

	//板换底部
	monitoring.banhuan = function (gameInstance) {
		// gameInstance.SendMessage("UpdateStateMgr","GetNewHuanban", "88888," + JSON.stringify(res))
		$.get(hdInterface.sensorU3d, {
			deviceIds: "533,534,535,536,537",
			siteId: _SITE_ID
		}).done(res => {
			if (res.code == '200' || res.code == '0') {
				gameInstance.SendMessage("UpdateStateMgr", "GetNewReliang", JSON.stringify(res))
			} else {
				// gameInstance.SendMessage("UpdateStateMgr", "noData")
			}
		})
	}
	//集分水器
	monitoring.waterSegregate = function (gameInstance) {
		$.get(hdInterface.sensorU3d, {
			deviceIds: "546,545,547,548",
			siteId: _SITE_ID
		}).done(res => {
			if (res.code == '200' || res.code == '0') {
				gameInstance.SendMessage("UpdateStateMgr", "GetNewWendu", JSON.stringify(res));
			} else {
				// gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		})
	}

	// monitoring.banhuan(gameInstance);
	// monitoring.waterSegregate(gameInstance);
	monitoring.getEqumentlist(gameInstance); //获取设备列表
	monitoring.getRealTimeData(gameInstance); //实时数据
	monitoring.upData = function () {
		timer1 = setInterval(function () {
			// monitoring.banhuan(gameInstance);
			// monitoring.waterSegregate(gameInstance);
			monitoring.getEqumentlist(gameInstance); //获取设备列表
			monitoring.getRealTimeData(gameInstance); //实时数据
			monitoring.selectCameraStatus();
		}, 60 * 1000)
	}
	monitoring.upData();
	// 密码控制弹窗
	let passwordFlag = '';
	let newType = '';
	let setTimer = null;
	let password = new controlPassword({
		passwordBtn: [{
				value: 0,
				name: '停止',
				select: true,
				hintMsg: '确定将光合谷地热井机房内设备停止吗？',
			},
			{
				value: 1,
				name: '启动',
				select: false,
				hintMsg: '确定启动光合谷地热井机房内设备吗？',
			},
			{
				value: 2,
				name: '停止',
				select: true,
				hintMsg: '确定将光合谷地热井机房内设备停止吗？',
			},
			{
				value: 3,
				name: '启动',
				select: false,
				hintMsg: '确定启动光合谷地热井机房内设备吗？',
			},
		],
		/* completeMsg:[
			{
				success:'光合谷地热井机房内设备停止发送成功',
				failure:'光合谷地热井机房内设备停止发送失败',
			},
			{
				success:'光合谷地热井机房内设备启动发送成功',
				failure:'光合谷地热井机房内设备启动发送失败',
			},
			{
				success:'光合谷地热井机房内设备停止发送成功',
				failure:'光合谷地热井机房内设备停止发送失败',
			},
			{
				success:'光合谷地热井机房内设备启动发送成功',
				failure:'光合谷地热井机房内设备启动发送失败',
			},
		], */
		loadTip:'机房控制需要时间较长，请您耐心等待',
		controlUrl:hdInterface.okssGhg,
		clickback:function(){
			clearTimeout(setTimer);
		},
		callback:function(e1,e2){
			// hdSquare.breakerState();
			/* console.log(e);
			setTimeout(function(){
				password.stage('');
			},1000)
			monitoring.breakerState(); */
			// console.log(e1);
			// console.log(e2);
			password.editResultMsg(e1.msg,e1.msg);
			if(e2 == '3'){
				password.stage(e2);
				setTimer = setTimeout(function(){
					// if(!btnFlag){
						password.stage('');
					// }
				},1000*5)
			} else {
				passwordFlag = e2;
			}
		}
	});
	// 一件启停按钮
	monitoring.startEnd = function() {
		$('#markPass .closeIcon').on('click',function(){
			$('#markPass').addClass('hide').removeClass('show');
		})
		$('.btn').on('click', function() {
			let type = $(this).attr('data-type');
			// let plctempId = $(this).attr('data-plctempId');
			if (type == '-1') {
				return;
			}
			if(($('.stateBd').html()).indexOf('本地') != -1){
				$('#markPass').addClass('show').removeClass('hide');
				setTimeout(function(){
					$('#markPass').addClass('hide').removeClass('show');
				},1000*5)
				return;
			}
			// $('.markPassword').addClass('show').removeClass('hide');
			password.stage('0');
			password.changeSelected(type,{
				// plctempId: 1,
				// refeValue: type,
				cmd: type
			});
		})
	}
	monitoring.startEnd();
	// 断路器控制
	monitoring.breakerState = function() {
		$('.btn').show();
		$('.stateBg').show();
		$.get(hdInterface.getplcTempId, {
			siteId: _SITE_ID
		}).done(function(data) {
			// console.log('一键启停');
			// console.log(data);
			if (data.code == 0) {
				data.data.forEach((item,index) => {
					if(item.deviceId == 781){ //本地/远程控制状态
						$('.stateBd').css({
							'display':'block'
						}).html('操作状态：'+item.value);
					}
					if(item.deviceId == 756){ //一键启停按钮状态
						if(newType == ''){
							newType = item['refeStatus'];
						}
						
						if (item['refeStatus'] == 'stop_type') {
							$('.btn').attr('data-type','1').css({
								"background-image":"url(/common/image/startB.png)",
								"display":"block"
							})
							$('.stateBg').css({
								"display":"block",
								"background-image": "url(/common/image/stopBg.png)"
							}).html('状态：已停止')
						} else if (item['refeStatus'] == 'o_alarm_type') {
							$('.btn').attr('data-type','-1').css({
								"background-image":"url(/common/image/offLineB.png)",
								"display":"block"
							})
							$('.stateBg').css({
								"background-image": "url(/common/image/stopBg.png)",
								"display":"block"
							}).html('状态：离线')
						} else if(item['refeStatus'] == 'start_type') {
							$('.btn').attr('data-type','0').css({
								"background-image":"url(/common/image/stopB.png)",
								"display":"block"
							})
							$('.stateBg').css({
								"background-image": "url(/common/image/startBg.png)",
								"display":"block"
							}).html('状态：已启动')
						}
						if(newType != item['refeStatus']){
							password.stage(passwordFlag);
							setTimeout(function(){
								clearTimeout(setTimer);
								password.stage('');
							},1000*5);
							passwordFlag = '';
							newType = item['refeStatus'];
						}
					}
				})
			}
		})
	}
	monitoring.breakerState();
	monitoring.breakerStateUpdata = function () {
		timer2 = setInterval(function () {
			monitoring.breakerState();
		}, 3 * 1000)
	}
	monitoring.breakerStateUpdata();
}

monitoring.play = function (id, src) {
	let srcArr = [];
	srcArr[0] = src[0];
	srcArr[1] = src[1];
	// srcArr[1] = src.substring(0, src.lastIndexOf('.')) + '.hd' + src.substring(src.lastIndexOf('.'))
	player = new TcPlayer(id, {
		m3u8_hd: srcArr[0], //高清
		m3u8: srcArr[1], //超清
		autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
		width: "580", //视频的显示宽度，请尽量使用视频分辨率宽度
		height: "350", //视频的显示高度，请尽量使用视频分辨率高度
		controlBar: {
			volumePanel: true,
			progressControl: true,
		},
		clarity: 'hd',
		clarityLabel: {
			od: '流畅',
			hd: '高清',
			sd: '标清'
		},
	});
}


monitoring.init();
window.monitoring = monitoring;