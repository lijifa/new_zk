//u3d使用函数
var hdSquare = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称
var menuid = getParams()["menuId"]; //菜单id
var layuiId = getParams()["layuiId"]; //标签id
var plcTypeIds = getParams()['plcTypeIds']; //菜单设备串
var cameraShowId = "";
var cameraArray = [];
hdSquare.cameras = {};
var timer = null;
var timer1 = null;
var timer2 = null;
var timer3 = null;
var timer4 = null;
let lot = null;
var player = null;
var _G_SILDER_OPEN = true;
var leftBar = null;
var rightBar = null;
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer3);
		clearInterval(timer4);
	} else {
		// hdSquare.oneMinutesUpdate(); //一分钟更新
		hdSquare.fiveMinutesUpdate(); //五分钟更新
		if(hdSquare.breakerStateTimer){
			hdSquare.breakerStateTimer();
		}
		if(hdSquare.u3dUpdata){
			hdSquare.u3dUpdata();
		}
		hdSquare.changeBtn();//自动切换标签
	}
});
var objName = layuiId;
//刷新
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
	clearInterval(timer4);
}
//标签切换
// top.registerListener(objName, function(e) {
// 	if (e == objName) {
// 		// hdSquare.oneMinutesUpdate(); //一分钟更新
// 		hdSquare.fiveMinutesUpdate(); //五分钟更新
// 		if(hdSquare.breakerStateTimer){
// 			hdSquare.breakerStateTimer();
// 		}
// 		if(hdSquare.u3dUpdata){
// 			hdSquare.u3dUpdata();
// 		}
// 		hdSquare.changeBtn();//自动切换标签
// 	} else {
// 		clearInterval(timer);
// 		clearInterval(timer1);
// 		clearInterval(timer2);
// 		clearInterval(timer3);
// 		clearInterval(timer4);
// 	}
// }); //注册

hdSquare.init = function() {
	$("#camera-containerHD").prepend(
		'<iframe src="./JiFangSite/index.html?v=' + version +
		'" frameborder="0" width="100%" height="100%"></iframe>'
	);
	hdSquare.turnback(); //收起按钮
	hdSquare.popUps(); //弹窗
	hdSquare.electricRoom(); // 配电室铭牌
	hdSquare.deviceMonitor(); // 设备监测
	hdSquare.waringfaultlist(); //当前报警汇总
	hdSquare.ImvEnergyConsumptionData(); // 当日总能耗
	hdSquare.energyEfficiency(); // 电能利用效率
	hdSquare.analysisTopFive(); // 当日耗电前5名
	hdSquare.loadtemputer(); // 当日负荷曲线
	// hdSquare.oneMinutesUpdate(); //一分钟更新
	hdSquare.fiveMinutesUpdate(); //五分钟更新
	hdSquare.transformChange();
	hdSquare.changeBtn();//自动切换标签
};
hdSquare.oneMinutesUpdate = function() {
	timer1 = setInterval(function() {
		
	}, 60 * 1000)
}
hdSquare.fiveMinutesUpdate = function() {
	timer = setInterval(function() {
		console.log('五分钟更新');
		hdSquare.electricRoom(); // 配电室铭牌
		hdSquare.ImvEnergyConsumptionData(); // 当日总能耗
		hdSquare.analysisTopFive(); // 当日耗电前5名
		hdSquare.energyEfficiency(); // 电能利用效率
		hdSquare.loadtemputer(); // 当日负荷曲线
	}, 5 * 60 * 1000)
}

var password = null;
var passObj = {
		loadText:'指令传输中...',
		successText:'指令传输成功',
		failText:'指令传输失败',
		failReason:'指令传输失败'
	}
hdSquare.u3dinit = function(gameInstance) {
	leftBar.showMenu();
	rightBar.showMenu();
	let newCamera = new camera({
		outerContainer:'#camera-containerHD',
		cameraIdName:'camera1',
		cameraUrlArr:cameraArray,
		openCallBack:function(e){
			console.log(e);
		},
		closeCallBack:function(e){
			console.log(e);
			if(e == 'cameraclose'){
				hdSquare.resetSelectXiangJiStatus();
			}
		}
	});
	// 绑定监控
	hdSquare.bindCameraData = function() {
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
			hdSquare.resetSelectXiangJiStatus();
		}); */
	};
	hdSquare.bindCameraData(); //绑定摄像头
	// 查询摄像头状态
	hdSquare.selectCameraStatus = function(){
		$.post(hdInterface.selectCameraStatus, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
	}
	hdSquare.selectCameraStatus();
	// 密码控制弹窗
	let passwordFlag = '';
	let newType = '';
	let updataCamera = 0;
	let setTimer = null;
	/* password = new controlPassword({
		passwordBtn: [{
				value: 0,
				name: '分闸',
				select: true,
				hintMsg: '确定将摄像头断路器分闸吗？',
			},
			{
				value: 1,
				name: '合闸',
				select: false,
				hintMsg: '确定将摄像头断路器合闸吗？',
			},
		],
		controlUrl:hdInterface.openAndClosingGate,
		clickback:function(){
			clearTimeout(setTimer);
		},
		callback:function(e1,e2){
			password.editResultMsg(e1.msg,e1.msg);
			if(e2 == '3'){
				password.stage(e2);
				setTimer = setTimeout(function(){
					password.stage('');
				},1000*5)
			} else {
				passwordFlag = e2;
			}
		}
	}); */
	
	password = new instruction(passObj);
	// 断路器控制按钮
	hdSquare.plctempId = '';
	hdSquare.refeValue = '-1';
	controlType = false;
	hdSquare.breakerBtn = function() {
		let type = '',plctempId = '';
		$('.breakerBtn').on('click', function() {
			type = $(this).attr('data-breakerType');
			plctempId = $(this).attr('data-plctempId');
			if (type == '-1') {
				return;
			}
			// $('.breakerLoadMark').show();
			$('#markPassword').show();
		})
		$('#markPassword .passwordInput').on('input', function() {
			let length = $(this).val().length;
			$('#markPassword .passwordError').hide();
			$('#markPassword .passwordInput').removeClass('passwordInputError');
			if (length < 8) {
				$('#markPassword .sure').attr('disabled', true);
				$('#markPassword .sure').addClass('noClick');
			} else {
				$('#markPassword .sure').removeAttr('disabled');
				$('#markPassword .sure').removeClass('noClick');
			}
		})
		$('#markPassword .eye').on('click',function(e){
			let eye = $(this).css('background-image');
			if(eye.match('_No')){
				eye = eye.replace('_No','_Off');
				$(this).css({
					'background-image':eye,
				})
				$('#markPassword .passwordInput').attr('type','password');
			} else {
				eye = eye.replace('_Off','_No');
				$(this).css({
					'background-image':eye,
				})
				$('#markPassword .passwordInput').attr('type','text');
			}
		})
		$('#markPassword #cancel').on('click',function(){
			$('#markPassword').hide();
			$('#markPassword .passwordInput').val('');
			$('#markPassword .sure').attr('disabled', true);
			$('#markPassword .sure').addClass('noClick');
			$('#markPassword .eye').css({
				'background-image':'url(/common/image/eye_Off.png)',
			})
			$('#markPassword .passwordInput').attr('type','password');
			$('#markPassword .passwordError').hide();
			$('#markPassword .passwordInput').removeClass('passwordInputError');
		})
		$('#markPassword .closeIcon').on('click',function(){
			$('#markPassword').hide();
			$('#markPassword .passwordInput').val('');
			$('#markPassword .sure').attr('disabled', true);
			$('#markPassword .sure').addClass('noClick');
			$('#markPassword .eye').css({
				'background-image':'url(/common/image/eye_Off.png)',
			})
			$('#markPassword .passwordInput').attr('type','password');
			$('#markPassword .passwordError').hide();
			$('#markPassword .passwordInput').removeClass('passwordInputError');
		})
		$('#markPassword .sure').on('click',function(){
			let flagPassword = false;
			$.ajax({
				url:hdInterface.passwordAuthentication,
				type:'get',
				data:{
					password: $('#markPassword .passwordInput').val()
				},
				async:false,
				success:function(data) {
					if (data.data) {
						flagPassword = true;
						$('#markPassword .passwordError').hide();
						$('#markPassword .passwordInput').removeClass('passwordInputError');
					} else {
						flagPassword = false;
						$('#markPassword .passwordError').show();
						$('#markPassword .passwordInput').addClass('passwordInputError');
					}
				},
			})
			if(flagPassword){
				controlType = true;
				$('#markPassword').hide();
				$('#markPassword .passwordInput').val('');
				$('#markPassword .sure').attr('disabled', true);
				$('#markPassword .sure').addClass('noClick');
				$('#markPassword .eye').css({
					'background-image':'url(/common/image/eye_Off.png)',
				})
				$('#markPassword .passwordInput').attr('type','password');
				newType == 'start_type'?passObj.successText = '摄像头断路器分闸成功':passObj.failText = '摄像头断路器和闸成功';
				newType == 'start_type'?passObj.failText = '摄像头断路器分闸失败':passObj.failText = '摄像头断路器和闸失败';
				password.showInstruction(0,passObj);
				$.ajax({
					url:hdInterface.single,
					type:'post',
					data:{
						plctempId: '3731',//hdSquare.plctempId,
						refeValue: hdSquare.refeValue
					},
					timeout:60*1000,
					success:function(res) {
						if(res.code == 0){
						} else {
							passObj.failReason = res.msg;
							setTimeout(function(){
								password.showInstruction(-1,passObj);
								setTimeout(function(){
									password.showInstruction();
								},2*1000);
							},4*1000)
						}
					},
					complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
						if (status == 'timeout') { //超时,status还有success,error等值的情况
							passObj.failReason = '指令传输超时'
							password.showInstruction(-1,passObj);
							setTimeout(function(){
								password.showInstruction();
							},2*1000);
						}
					}
				})
			}
		})
		
	}
	hdSquare.breakerBtn();
	
	// 断路器控制
	hdSquare.breakerState = function() {
		$.get(hdInterface.circuitBreakerStatus, {
			siteId: _SITE_ID
		}).done(function(data) {
			if (data.code == 0 && data.data.length != 0) {
				// console.log('断路器控制');
				// console.log(data);
				if(newType == ''){
					newType = data.data[0]['refeStatus'];
				}
				$('.breakerBtn').attr('data-plctempId', data.data[0]['plctempId']);
				hdSquare.plctempId = data.data[0]['plctempId'];
				if (data.data[0]['refeStatus'] == 'stop_type') {
					$('.breakerBtn').attr('data-breakerType', '1');
					$('.breakerBtnImg').css({
						'left':'48px'
					})
					hdSquare.refeValue = '1';
					$('.breakerImg').css({
						'background-image': 'url(image/openDevice.png)'
					})
					$('.breakerStateText').css({
						"color": 'rgba(255, 255, 255, 1)'
					}).html(convert(data.data[0]['value']));
					$('.breakerState > img').attr('src', 'image/nomalGray.png');
					gameInstance.SendMessage('CircuitBreakerCanvas','CloseBreaker','0');
				} else if (data.data[0]['refeStatus'] == 'o_alarm_type') {
					$('.breakerBtn').attr('data-breakerType', '-1');
					$('.breakerBtnImg').css({
						'left':'48px'
					})
					$('.breakerStateText').css({
						"color": 'rgba(255, 255, 255, 1)'
					}).html(convert(data.data[0]['value']));
					$('.breakerImg').css({
						'background-image': 'url(image/openDevice.png)'
					})
					hdSquare.refeValue = '-1';
					$('.breakerState > img').attr('src', 'image/nomalGray.png');
					gameInstance.SendMessage('CircuitBreakerCanvas','CloseBreaker','-1');
				} else if(data.data[0]['refeStatus'] == 'start_type') {
					$('.breakerBtn').attr('data-breakerType', '0');
					$('.breakerBtnImg').css({
						'left':'4px'
					})
					$('.breakerImg').css({
						'background-image': 'url(image/closeDevice.png)'
					})
					hdSquare.refeValue = '0';
					$('.breakerStateText').css({
						"color": 'rgba(72, 211, 150, 1)'
					}).html(convert(data.data[0]['value']));
					$('.breakerState > img').attr('src', 'image/nomalGreen.png');
					gameInstance.SendMessage('CircuitBreakerCanvas','CloseBreaker','1');
				}
				// 状态改变成功
				if(newType != data.data[0]['refeStatus'] && controlType){
					data.data[0]['refeStatus'] == 'start_type'?passObj.successText = '摄像头断路器合闸成功':passObj.successText = '摄像头断路器分闸成功';
					password.showInstruction(1,passObj);
					setTimeout(function(){
						password.showInstruction();
					},2*1000);
					passwordFlag = '';
					newType = data.data[0]['refeStatus'];
					controlType = false;
				}
				// 页面摄像头初始状态由断开(离线) => 闭合，加载摄像头地址。
				if(data.data[0]['refeStatus'] == 'start_type'){
					updataCamera+=1;
					if(updataCamera == 1){
						let num = setInterval(function(){
							$.ajax({
								url:hdInterface.selectCameraDetailNew,
								type:'post',
								data:{siteId: _SITE_ID},
								// async:false,
								timeout:10000,
								success:function(data){
									if (data["code"] === 0) {
										if(data.data[0].cameraUrls != null){
											clearInterval(num);
										}
										cameraArray = data.data;
										newCamera.updataCameraList(cameraArray);
									}
								}
							})
						},10*1000)
					}
				}
			}
		})
	}
	hdSquare.breakerState(); // 断路器控制
	// 返回按钮
	hdSquare.backBtn = function() {
		$('.backBtn').on('click', function() {
			gameInstance.SendMessage("WallColldier", "WebGLuiButton");
		})
	}
	hdSquare.backBtn();
	// 监测切换按钮
	hdSquare.changeMonitorBtn = function() {
		$('.btn').on('click', function() {
			let index = $(this).index()+1;
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
				hdSquare.resetSelectXiangJiStatus();
			}
		})
	}
	hdSquare.changeMonitorBtn();
	//摄像头图表变亮
	hdSquare.resetSelectXiangJiStatus = function() {
		gameInstance.SendMessage("XiangJiMgr", "ResetSelectXiangJiStatus");
	}
	hdSquare.showBtnCenter = function() {
		$('.btnCenter').show();
	}
	hdSquare.showBtnCenter();
	// 加载资源
	hdSquare.U3DInfo = function() {
		$.get(hdInterface.getDeviceInfoCopy, {
			'siteId': _SITE_ID
		}, function(data) {
			if (data['code'] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", 'GetJsMessage',JSON.stringify(data));
			}
		})
		$.get(hdInterface.sensorU3dPD, {
			'siteId': _SITE_ID
		}, function(data) {
			if (data['code'] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(data));
			}
		})
		// 计量屏
		$.get(hdInterface.getCabinetInfo, {
			'siteId': _SITE_ID
		}, function(data) {
			if (data['code'] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", "GetMeasMessage", JSON.stringify(data));
			}
		})
	}
	hdSquare.U3DInfo();
	hdSquare.u3dUpdata = function(){
		timer3 = setInterval(function(){
			hdSquare.U3DInfo();
			hdSquare.selectCameraStatus();
			hdSquare.deviceMonitor(); // 设备监测
			hdSquare.waringfaultlist(); //当前报警汇总
			$('.pop_fault').css('display', 'none');
		},1000*60)
	}
	hdSquare.u3dUpdata();
	hdSquare.showVideo = function(id) {
		$("#camera" + id).css("z-index", "111");
	}
	hdSquare.showhdSquareVideo = function(id) {
		cameraShowId = id;
		newCamera.getCameraListPlay(id);
		/* hdSquare.closehdSquareVideo();
		var zindex = $("#camera10").css("z-index");
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
			if (item.cameraId == cameraShowId) {
				$('#camerID').html('');
				var src = '';
				src = item.cameraUrls;
				hdSquare.play("camerID", src);
				move({
					selector: '.cameraMove',
					handle: '.vcp-panel-bg',
					padding: [40, 10, 20, 10]
				});
			}
		}) */
	};
	hdSquare.closehdSquareVideo = function() {
		// $("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	hdSquare.canmerHide = function() {
		hdSquare.closehdSquareVideo();
	};
	//根据对应的id和位置移动摄像头
	hdSquare.moveVideo = function(str) {
		var strArr = str.split(",");
		var id = strArr[0];
		var pointx = strArr[1] - 100;
		var pointy = strArr[2];
		$("#camera10").css({
			"bottom": pointy + "px",
			"left": pointx + "px"
		});
	};
	// 获取设备列表
	hdSquare.getEqumentlist = function(gameInstance) {
		$.post(hdInterface.selectDeviceStatusByDeviceIdsModuleCopy, {
			siteId: _SITE_ID,
		}).done(function(result) {
			gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(result));
		});
	}
	// 实时数据
	hdSquare.getRealTimeData = function(gameInstance) {
		$.post(hdInterface.selectPlcTemplateStatusByPlcTypeIds, {
			"siteId": _SITE_ID,
			"plcTypeIds": "16,49,52,79,81,83,86,88,90,91,92,93,94,110,112,113,140,141,142,143",
		}).done(function(data) {
			gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(data));
		});
	}
	hdSquare.breakerStateTimer = function() {
		timer2 = setInterval(function() {
			hdSquare.breakerState(); // 断路器控制
		}, 3 * 1000)
	}
	hdSquare.breakerStateTimer()
}

//收起按钮

hdSquare.turnback = function() {
	leftBar = new SlideMenu({
		direction: 'left',
		menuBtn: '#btnLeft',
		menuBox: '.leftbar',
		menuSetPosition: [0, -342],
		btnSetposition: [342, 0],
		isOpen: false,
		bgDrop: 5,
		callBackFun: function(e) {
			if (e) {
				$('#btnLeft>i').removeClass('layui-icon-right').addClass('layui-icon-left');
				$('.backBtn').css({
					'left': '360px'
				})
				// _G_SILDER_OPEN = true;
			} else {
				$('#btnLeft>i').removeClass('layui-icon-left').addClass('layui-icon-right');
				$('.backBtn').css({
					'left': '20px'
				})
				// _G_SILDER_OPEN = false;
			}
		}
	})
	rightBar = new SlideMenu({
		direction: 'right',
		menuBtn: '#btnRight',
		menuBox: '.rightbar',
		menuSetPosition: [0, -342],
		btnSetposition: [342, 0],
		isOpen: false,
		bgDrop: 5,
		callBackFun: function(e) {
			if (e) {
				$('#btnRight>i').removeClass('layui-icon-left').addClass('layui-icon-right');
				// _G_SILDER_OPEN = true;
			} else {
				$('#btnRight>i').removeClass('layui-icon-right').addClass('layui-icon-left');
				// _G_SILDER_OPEN = false;
			}
		}
	})
}
// 监控视频画质
hdSquare.play = function(id, src) {
	let srcArr = []
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


// 设备监测
hdSquare.deviceMonitor = function() {
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
					hdSquare[key] = arrTemp;
					text = data.data[key].length + '处异常';
					$('#' + key).removeClass('textColorBlue');
					$('#' + key).addClass('textColorRed');
				} else {
					hdSquare[key] = [{
						text: '暂无异常'
					}];
					$('#' + key).removeClass('textColorRed');
					$('#' + key).addClass('textColorBlue');
				}
				$('#' + key).html(text);
			}
		}
	})
	$.get(hdInterface.environmentalSecurityNew, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data.code == 0) {
			let text = '正常';
			let arrTemp = [];
			data.data.forEach((item) => {
				let obj = {
					alarmName: convert(item.alarmName),
					time: convert(item.time),
				}
				arrTemp.push(obj);
			})
			if (data.data.length !== 0) {
				hdSquare['environmentalSecurity'] = arrTemp;
				text = data.data.length + '处异常';
				$('#environmentalSecurity').removeClass('textColorBlue');
				$('#environmentalSecurity').addClass('textColorRed');
			} else {
				hdSquare['environmentalSecurity'] = [{
					text: '暂无异常'
				}];
				$('#environmentalSecurity').removeClass('textColorRed');
				$('#environmentalSecurity').addClass('textColorBlue');
			}
			$('#environmentalSecurity').html(text);
		}
	})
}
// 电能利用效率
hdSquare.energyEfficiency = function() {
	let type = $('.transformerBtnOn').attr('data-type');
	$.get(hdInterface.energyEfficiency, {
		siteId: _SITE_ID,
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
hdSquare.loadtemputer = function() {
	let type = $('.transformerBtnOn').attr('data-type');
	$.get(hdInterface.dailyLoad, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			if(data.data.length == 0){
				$('#temp_echars .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
				$('.transformerBtn button').removeAttr('disabled').css({
					'cursor':'pointer',
				});
				return;
			}
			data.data.forEach((item,index) => {
				if(item.name.indexOf(type) != -1){
					$('.transformerBtn button').removeAttr('disabled').css({
						'cursor':'pointer',
					});
					if (JSON.stringify(item.data) == '{}') {
						$('.legend_pub').hide();
						$('#temp_echars .hd-loadmask').html(`
							<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
						`)
					} else {
						$('.legend_pub').show();
						var datax = item.data.dataX.split(',');
						var datay1 = item.data.dataY.split(',');
						var datay2 = item.data.dataY2.split(',');
						var dataXTime = [];
						datax.forEach((item) => {
							dataXTime.push(item + ':00');
						})
						echarsComponent.getLine({
							"elementId": "temp_echars", //容器id	[必填]
							xdata: dataXTime, //横坐标数据[必填]
							ydata: [datay1, datay2], //纵坐标数据[必填]
							ydataTitle: ['有功功率', '无功功率'],
							linecolors: ['#00FFFF', '#168FFF'], //线颜色[非必填]
							// interval:0,//间隔[非必填]
							// "yAxisMin":0,
							yAxisMinInterval: 10, //y轴最小刻度间距
							"unit": "kW/kVar", //单位
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
		} else {
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
			$('.legend_pub').hide();
		}
	})
}

//当日报警汇总
hdSquare.waringfaultlist = function() {
	$.get(hdInterface.alarmRecord, {
		siteId: _SITE_ID,
		type: 1,
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
hdSquare.popUps = function() {
	$('.device li').hover(function() {
		var offectTop = $(this).offset();
		var type = $(this).attr('data-id');
		$('.pop_fault').css({
			'top': offectTop.top + 20 + 'px',
			display: 'block'
		});
		if (hdSquare[type] !== undefined) {
			hdSquare.faultList(type);
			if (hdSquare[type][0].text !== '暂无异常') {
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
hdSquare.faultList = function(key) {
	var paramFault = {
		title: [], //列表标题
		list: [], //列表数据
		hangLie: {
			lieflag: true, //间隔列开
			lienum: '2', //间隔列 从0开始
			hangflag: true, //间隔行开
			hangnum: '1', //间隔行 从0开始
		},
	}
	paramFault.list = hdSquare[key];
	// console.log(paramFault.list);
	let fault = new listRollNew('fault', paramFault); //实例化
}
// 配电室铭牌
hdSquare.electricRoom = function() {
	$.get(hdInterface.electricRoom, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			for (let key in data.data) {
				$('#' + key).html(convert(data.data[key]));
			}
		}
	})
}
// 当日总能耗
hdSquare.ImvEnergyConsumptionData = function() {
	$.get(hdInterface.ImvEnergyConsumptionData, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
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
			$('#trend').html(convert(data.data['trend']) == '--' ? convert(data.data['trend']) : Math.abs(
				Number(convert(data.data['trend']))));
		}
	})
}
// 耗电量趋势
hdSquare.analysisTopFive = function() {
	$.get(hdInterface.selectNearSevenElectric, {
		siteId: _SITE_ID
	}).done(function(data) {
		// console.log('耗电量趋势');
		// console.log(data);
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) == '{}') {
				$('#top .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				let dataX = data.data.dataX.split(',');
				let dataY = data.data.dataY.split(',');
				echarsComponent.getLineShadow({
					elementId:'top',
					xdata:dataX,
					ydata:[dataY],
					linecolors:['rgba(0,255,255,1)'],
					areaStyleOpacity:0.5,
					offectTop:'rgba(0,255,255,0.8)',
					offectMiddle:'rgba(0,255,255,0.5)',
					offectBottom:'rgba(0,255,255,0.2)',
					unit:'kW·h',
					grid:{
						left:'20px',
						right:'20px',
						bottom:'0'
					},
					yAxisMinInterval:1,
					yAxisMin:0
				})
			}
		}
	})
}
// 变压器切换按钮
hdSquare.transformChange = function(){
	$(document).on('click','.transformerBtn button',function(){
		let type = $(this).attr('data-type');
		$(this).addClass('transformerBtnOn').siblings().removeClass('transformerBtnOn');
		$('.transformerBtn button').attr('disabled',true).css({
			'cursor':'not-allowed',
		});
		hdSquare.energyEfficiency();
		hdSquare.loadtemputer();
	})
}
hdSquare.changeBtn = function(){
	timer4 = setInterval(function(){
		$('.transformerBtn button.transformerBtnOn').removeClass('transformerBtnOn').siblings().addClass('transformerBtnOn');
		$('.transformerBtn button').attr('disabled',true).css({
			'cursor':'not-allowed',
		});
		let type = $('.transformerBtn button.transformerBtnOn').attr('data-type');
		hdSquare.energyEfficiency();
		hdSquare.loadtemputer();
	},20*1000)
}
hdSquare.init();
window.hdSquare = hdSquare;

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

hdSquare.topList = function(selector, data, electric) {
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
