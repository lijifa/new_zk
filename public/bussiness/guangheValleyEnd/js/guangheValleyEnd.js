//u3d使用函数
var internationalFirmsU3D = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称
var menuid = getParams()["menuId"]; //菜单id
var layuiId = getParams()["layuiId"]; //标签id
var plcTypeIds = getParams()['plcTypeIds']; //菜单设备串
var cameraShowId = "";
var cameraArray = [];
var timer = null;
var timer1 = null;
var timer2 = null;
var timer3 = null;
var guangheValleyEnd = {};
var hidePage = false;
// 场景状态标记
var builder = top.window.guangheguCilck == '' ||
	top.window.guangheguCilck == undefined ? '0' : top.window.guangheguCilck;
top.window.guangheguCilck = '';
let oldRightTargetArr = [];
switch (builder) {
	case '0':
		oldRightTargetArr = ['.rigthNav0', '.rightNavItem0'];
		break;
	case '1':
		oldRightTargetArr = ['.rightNav1', '.rightNavItem1'];
		break;
	case '2':
		oldRightTargetArr = ['.rightNav2', '.rightNavItem2'];
		break;
	case '3':
		oldRightTargetArr = ['.rightNav3', '.rightNavItem3'];
		break;
	default:
		break;
}
// 离开页面调用
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		// console.log('离开');
		clearInterval(timer);
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer3);
		hidePage = true;
	} else {
		// console.log('回来')
		hidePage = false;
		guangheValleyEnd.oneMinuseUpdata();
		guangheValleyEnd.fiveMinuseUpdata();
		guangheValleyEnd.updataU3D();
		guangheValleyEnd.changeScenesAuto();
	}
});
// 切换项目标签
$(top.document.getElementsByTagName('iframe')).each((i,e) => {
	if($(e).attr('src').indexOf(location.pathname.substring(1))!= -1){
		// console.log($(e).attr('data-frameid'));
		layuiId == undefined ? layuiId = $(e).attr('data-frameid') : '';
	}
})
window.onunload = function() {
	// top.unregisterListener(layuiId); //销毁
	hidePage = true;
	clearInterval(timer);
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
}
// top.registerListener(layuiId, function(e) {
// 	// console.log(e == objName);
// 	if(e == layuiId){
// 		// console.log('切回');
// 		hidePage = false;
// 		guangheValleyEnd.oneMinuseUpdata();
// 		guangheValleyEnd.fiveMinuseUpdata();
// 		guangheValleyEnd.updataU3D();
// 		guangheValleyEnd.changeScenesAuto();
// 	} else {
// 		// console.log('切走');
// 		hidePage = true;
// 		clearInterval(timer);
// 		clearInterval(timer1);
// 		clearInterval(timer2);
// 		clearInterval(timer3);
// 	}
// }); //注册
guangheValleyEnd.init = function() {
	$(".moduanU3d").html(
		`<iframe src="./GuangHeGu_MoDuan/index.html?v=${version}" frameborder="0" width="100%" height="100%"></iframe>`
	);
	guangheValleyEnd.dateHotLine();
	guangheValleyEnd.hotMonitor();
	guangheValleyEnd.deviceMonitor();
	guangheValleyEnd.fiveMinuseUpdata();
	// guangheValleyEnd.animationStar();
};

guangheValleyEnd.fiveMinuseUpdata = function() {
	// console.log('开启五分钟轮询');
	timer2 = setInterval(function() {
		guangheValleyEnd.hotMonitor();
	}, 60 * 1000)
}
// U3D加载完成启动动画
guangheValleyEnd.animationStar = function() {
	guangheValleyEnd.createNavAnime(); // 上下栏动画
	guangheValleyEnd.leftColumn(); //左侧栏
	guangheValleyEnd.rightColumn(); //右侧栏
}
//unity3D场景加载完毕调用
guangheValleyEnd.U3Dinit = function(gameInstance){
	guangheValleyEnd.U3DLoaded = function() {
		// debugger;
		// alert(top.window.guangheguCilck);
		var location = top.window.guangheguCilck ? top.window.guangheguCilck : "";
		// alert("-"+location);
		// gameInstance.SendMessage('AddressablBuildingPrefabs', 'EndInitialization', location);
		// 查询室内温度实时值
		$.post(hdInterface.selectEndPlcValueByDeviceIds, {
			deviceIds: "549,550,551",
			siteId: _SITE_ID
		}).done(res => {
			// console.log(`返回数据`, res.data);
			gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(res));
		});
	
		//查询设备冷热总能耗
		$.post(hdInterface.selectEndPlcValueByDeviceIds, {
			deviceIds: "538,539,540",
			siteId: _SITE_ID
		}).done(res => {
			// console.log(`返回数据`, res.data);
			gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(res));
		});
		guangheValleyEnd.updataU3D();
	}
	guangheValleyEnd.updataU3D = function() {
		console.log('U3D定时刷新');
		timer3 = setInterval(function() {
			// 查询室内温度实时值
			$.post(hdInterface.selectEndPlcValueByDeviceIds, {
				deviceIds: "549,550,551",
				siteId: _SITE_ID
			}).done(res => {
				// console.log(`返回数据`, res.data);
				gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(res));
			});
	
			//查询设备冷热总能耗
			$.post(hdInterface.selectEndPlcValueByDeviceIds, {
				deviceIds: "538,539,540",
				siteId: _SITE_ID
			}).done(res => {
				// console.log(`返回数据`, res.data);
				gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(res));
			});
		}, 60 * 1000);
	}
	guangheValleyEnd.getU3DData = function() {
		// debugger;
		// 查询室内温度实时值
		$.post(hdInterface.selectEndPlcValueByDeviceIds, {
			deviceIds: "549,550,551",
			siteId: _SITE_ID
		}).done(res => {
			console.log(`返回数据`, res.data);
			gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "25005," + JSON.stringify(res));
		});
	
		//查询设备冷热总能耗
		$.post(hdInterface.selectEndPlcValueByDeviceIds, {
			deviceIds: "538,539,540",
			siteId: _SITE_ID
		}).done(res => {
			// debugger;
			// console.log(`返回数据`, res.data);
			gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "25006," + JSON.stringify(res));
		});
	}
	// 点击切换场景
	guangheValleyEnd.changeScenes = function() {
		$('.scenseItem').on('click', function() {
			let flag = $(this).attr('data-clickFlag');
			let type = $(this).attr('data-builder');
			let newRightTargetArr = [];
			switch (type) {
				case '0':
					newRightTargetArr = ['.rigthNav0', '.rightNavItem0'];
					break;
				case '1':
					newRightTargetArr = ['.rightNav1', '.rightNavItem1'];
					break;
				case '2':
					newRightTargetArr = ['.rightNav2', '.rightNavItem2'];
					break;
				case '3':
					newRightTargetArr = ['.rightNav3', '.rightNavItem3'];
					break;
				default:
					break;
			}
			if (type != builder && flag == '1') {
				$(this).addClass('on').siblings().removeClass('on');
				$('.scenseItem').attr('data-clickFlag','0');
				// $('.scenseItem').css('cursor','not-allowed');
				gameInstance.SendMessage("FloorObject(Clone)", "ObjMove", type);
				if (type != '0') {
					anime({
						targets: ['.terminalNav'],
						translateY: 180,
						duration: 2000,
						delay: anime.stagger(100),
						easing: 'easeOutExpo',
					});
				} else if (type == '0') {
					anime({
						targets: ['.terminalNav'],
						translateY: 0,
						duration: 2000,
						delay: anime.stagger(100),
						easing: 'easeOutExpo',
					});
				}
				var tl = anime.timeline({
					duration: 500,
					easing: 'easeOutExpo',
				});
				tl.add({
					targets: oldRightTargetArr,
					delay: anime.stagger(50, {
						direction: 'reverse'
					}),
					translateX: 340,
					begin: function(e) {
						$('.rightBtn').hide();
						$('.rightBtn').eq(builder).attr('anime-handle', '0');
						$('.rightNavBg'+builder).css({
							'transition': 'all ease 1.5s',
							'height':'0',
						})
					}
				})
				tl.add({
					targets: newRightTargetArr,
					delay: anime.stagger(50),
					translateX: 0,
					begin: function(e) {
						$('.rightBtn').eq(type).show().html(`
							<div class="rightBtnBgOpen">
								<i class="layui-icon layui-icon-right"></i>
							</div>
						`).attr('anime-handle', '1');
						$('.rightNavBg'+type).css({
							'transition': 'all ease .5s',
							'height':'100%',
						})
						builder = type;
						oldRightTargetArr = newRightTargetArr;
					},
					complete:function(e){
						setTimeout(function(){
							$('.scenseItem').attr('data-clickFlag','1');
							// $('.scenseItem').css('cursor','pointer');
						},500)
					}
				})
				
			}
	
		})
	}
	
	// 自动切换场景
	guangheValleyEnd.changeScenesAuto = function() {
		console.log('自动切换场景开启');
		clearInterval(timer);
		if(hidePage){
			return;
		}
		timer = setInterval(function() {
			builder = builder - 0 < 3 ? builder - 0 + 1 + '' : '0';
			$('.scenseItem').eq(builder).addClass('on').siblings().removeClass('on');
			let newRightTargetArr = [];
			let oldBuilder = '0';
			switch (builder) {
				case '0':
					oldBuilder = '3';
					newRightTargetArr = ['.rigthNav0', '.rightNavItem0'];
					break;
				case '1':
					oldBuilder = '0';
					newRightTargetArr = ['.rightNav1', '.rightNavItem1'];
					break;
				case '2':
					oldBuilder = '1';
					newRightTargetArr = ['.rightNav2', '.rightNavItem2'];
					break;
				case '3':
					oldBuilder = '2';
					newRightTargetArr = ['.rightNav3', '.rightNavItem3'];
					break;
				default:
					break;
			}
			// console.log('场景====',builder,oldBuilder);
			gameInstance.SendMessage("FloorObject(Clone)", "ObjMove", builder);
			$('.scenseItem').attr('data-clickFlag','0');
			// $('.scenseItem').css('cursor','not-allowed');
			if (builder != '0') {
				anime({
					targets: ['.terminalNav'],
					translateY: 180,
					duration: 2000,
					delay: anime.stagger(100),
					easing: 'easeOutExpo',
				});
			} else if (builder == '0') {
				anime({
					targets: ['.terminalNav'],
					translateY: 0,
					duration: 2000,
					delay: anime.stagger(100),
					easing: 'easeOutExpo',
				});
			}
			var tl = anime.timeline({
				duration: 500,
				easing: 'easeOutExpo',
			});
			tl.add({
				targets: oldRightTargetArr,
				delay: anime.stagger(50, {
					direction: 'reverse'
				}),
				translateX: 340,
				begin: function(e) {
					$('.rightBtn').hide();
					$('.rightBtn').eq(oldBuilder).attr('anime-handle', '0');
					$('.rightNavBg'+oldBuilder).css({
						'transition': 'all ease 1.5s',
						'height':'0',
					})
				}
			})
			tl.add({
				targets: newRightTargetArr,
				delay: anime.stagger(50),
				translateX: 0,
				begin: function(e) {
					$('.rightBtn').eq(builder).show().html(`
						<div class="rightBtnBgOpen">
							<i class="layui-icon layui-icon-right"></i>
						</div>
					`).attr('anime-handle', '1');
					$('.rightNavBg'+builder).css({
						'transition': 'all ease .5s',
						'height':'100%',
					})
					oldRightTargetArr = newRightTargetArr;
				},
				complete:function(e){
					setTimeout(function(){
						$('.scenseItem').attr('data-clickFlag','1');
						// $('.scenseItem').css('cursor','pointer');
					},500)
				}
			})
		}, 180 * 1000);
	}
	
	guangheValleyEnd.U3DLoaded();
	guangheValleyEnd.changeScenes();
	// 泊雅苑远近端数据
	guangheValleyEnd.farAndNear = function(){
		$.ajax({
			url:hdInterface.selectEndPlotPlcValueByDeviceIds,
			type:'post',
			data:{
				deviceIds:'536,699,698,697,696,695,694,693,692,691,690,689,688,687,686,685,684,683,682,681,680,679,678,677,676,675,700,701,702,703,704',
			},
			success:function(data){
				// console.log(`12321`,data);
				if(data.code == 0){
					gameInstance.SendMessage("UpdateStateMgr", "GetXiaoQuMessage", JSON.stringify(data));
					gameInstance.SendMessage("UpdateStateMgr", "DataTransmission");
					data.data.forEach((item,index) => {
						// 机房泊雅苑支路热量值
						if(item.deviceId == '536'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hotAll').html(convert(e.refeText));
								}
							})
						}
						// 1号楼供回水温度 热量
						if(item.deviceId == '689'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#floorIn1').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '689'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#floorOut1').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '689'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hot1').html(convert(e.refeText));
								}
							})
						}
						// 2号楼供回水位温度 热量
						if(item.deviceId == '694'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#floorIn2').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '694'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#floorOut2').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '694'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hot2').html(convert(e.refeText));
								}
							})
						}
						// 8号楼供回水位温度 热量
						if(item.deviceId == '679'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#floorIn8').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '679'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#floorOut8').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '679'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hot8').html(convert(e.refeText));
								}
							})
						}
						// 4号楼供回水位温度 热量
						if(item.deviceId == '699'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#floorIn4').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '699'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#floorOut4').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '699'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hot4').html(convert(e.refeText));
								}
							})
						}
						// 14号楼供回水位温度 热量
						if(item.deviceId == '684'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#floorIn14').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '684'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#floorOut14').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '684'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#hot14').html(convert(e.refeText));
								}
							})
						}
						// 泵房供回水位温度 热量
						if(item.deviceId == '700'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '338'){
									$('#bengfangIn').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '700'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '339'){
									$('#bengfangOut').html(convert(e.refeText));
								}
							})
						}
						if(item.deviceId == '700'){
							item.plctemplateInfos.forEach((e,i) => {
								if(e.plcTypeId == '327'){
									$('#bengfangHot').html(convert(e.refeText));
								}
							})
						}
					})
				}
			}
		})
		/* $.post(hdInterface.selectEndPlotPlcValueByDeviceIds,{
			deviceIds:'550,540,539,551,549,538',
		}).done(data => {
			console.log(data);
			if(data.code == 0){
				gameInstance.SendMessage("UpdateStateMgr", "GetXiaoQuMessage", JSON.stringify(data));
				gameInstance.SendMessage("UpdateStateMgr", "DataTransmission");
			}
		}) */
	}
	guangheValleyEnd.farAndNear();
	guangheValleyEnd.clearTimer = function(e){
		if(e == 0){
			clearInterval(timer);
		} else {
			guangheValleyEnd.changeScenesAuto();
		}
	}
	guangheValleyEnd.oneMinuseUpdata = function() {
		console.log('开启一分钟轮询');
		timer1 = setInterval(function() {
			guangheValleyEnd.dateHotLine();
			guangheValleyEnd.farAndNear();
			guangheValleyEnd.deviceMonitor();
		}, 60 * 1000)
	}
	guangheValleyEnd.oneMinuseUpdata();
}

// 页面加载完成
// 上下栏动画
guangheValleyEnd.createNavAnime = function() {
	// 场景栏
	anime({
		targets: ['.changeScenesNav'],
		translateX: 0,
		duration: 2000,
		delay: anime.stagger(100),
		easing: 'easeOutExpo',
	});
	// 三端栏
	if (builder == '0') {
		anime({
			targets: ['.terminalNav'],
			translateY: 0,
			duration: 2000,
			delay: anime.stagger(100),
			easing: 'easeOutExpo',
		});
	}

}
// 左侧栏
guangheValleyEnd.leftColumn = function() {
	$('.leftBtn').animeXY({
		id: 'leftBtn',
		// handle:'.leftBtnTemp',
		startEnd: [-340, 0],
		targets: ['.leftNav', '.leftNavItem'],
		isOpen: true,
		duration: 500,
		delay: 100,
		begin: function(e) {
			$('.leftBtn').hide();
			if (e.state == 'open') {
				$('.leftBtn').html(`
					<div class="leftBtnBgOpen">
						<i class="layui-icon layui-icon-left"></i>
					</div>
				`)
				$('.leftNavBg').css({
					'transition': 'all ease .5s',
					'height':'100%',
				});
			} else if (e.state == 'close') {
				$('.leftBtn').html(`
					<div class="leftBtnBgClose">
						<i class="layui-icon layui-icon-right"></i>
					</div>
				`)
				$('.leftNavBg').css({
					'transition': 'all ease 1s',
					'height':'0',
				});
			}
		},
		complete: function(e) {
			$('.leftBtn').show();
		}
	})

	/* $.fn.animeNumber({
		targets: '.deviceTotal0',
		innerHTML: [0, 31],
	});
	$.fn.animeNumber({
		targets: '.deviceTotal1',
		innerHTML: [0, 0],
	});
	$.fn.animeNumber({
		targets: '.deviceTotal2',
		innerHTML: [0, 3],
	});
	$.fn.animeNumber({
		targets: '.deviceTotal3',
		innerHTML: [0, 8],
	});
	$.fn.animeNumber({
		targets: '.deviceTotal4',
		innerHTML: [0, 10],
	});
	$.fn.animeNumber({
		targets: '.deviceTotal5',
		innerHTML: [0, 10],
	}); */
}
// 右侧栏
guangheValleyEnd.rightColumn = function() {
	$('.scenseItem').eq(builder).addClass('on').siblings().removeClass('on');
	$('.rightBtn').hide().attr('anime-handle', '0');
	$('.rightBtn').eq(builder).show().attr('anime-handle', '1');
	// 泊雅苑远近端
	$('.rightBtnTemp0').animeXY({
		id: 'rightBtnTemp0',
		// handle:'.rightBtnTemp0',
		startEnd: [180, 0],
		targets: '.terminalNav',
		direction: 'Vertical',
		isOpen: builder == 0 ? true : false,
		duration: 2000,
		delay: 100,
		begin: function(e) {
			// $('.rightBtn').hide();
			// builder == 0 ? guangheValleyEnd.changeRightBtn(builder,e.state):'';
		},
		complete: function(e) {
			// $('.rightBtn').eq(builder).show();
		}
	})
	// 泊雅苑
	$('.rightBtnTemp0').animeXY({
		id: 'rightBtnTemp0',
		// handle:'.rightBtnTemp0',
		startEnd: [340, 0],
		targets: ['.rigthNav0', '.rightNavItem0'],
		isOpen: builder == 0 ? true : false,
		duration: 500,
		delay: 50,
		begin: function(e) {
			$('.rightBtn').hide();
			builder == 0 ? guangheValleyEnd.changeRightBtn(builder, e.state) : '';
		},
		complete: function(e) {
			$('.rightBtn').eq(builder).show();
		}
	})
	// 温泉度假酒店
	$('.rightBtnTemp1').animeXY({
		id: 'rightBtnTemp1',
		// handle:'.rightBtnTemp1',
		startEnd: [340, 0],
		targets: ['.rightNav1', '.rightNavItem1'],
		isOpen: builder == 1 ? true : false,
		duration: 500,
		delay: 50,
		begin: function(e) {
			$('.rightBtn').hide();
			builder == 1 ? guangheValleyEnd.changeRightBtn(builder, e.state) : '';
		},
		complete: function(e) {
			$('.rightBtn').eq(builder).show();
		}
	})
	// 泊心堂
	$('.rightBtnTemp2').animeXY({
		id: 'rightBtnTemp2',
		// handle:'.rightBtnTemp2',
		startEnd: [340, 0],
		targets: ['.rightNav2', '.rightNavItem2'],
		isOpen: builder == 2 ? true : false,
		duration: 500,
		delay: 50,
		begin: function(e) {
			$('.rightBtn').hide();
			builder == 2 ? guangheValleyEnd.changeRightBtn(builder, e.state) : '';
		},
		complete: function(e) {
			$('.rightBtn').eq(builder).show();
		}
	})
	// 售楼中心
	$('.rightBtnTemp3').animeXY({
		id: 'rightBtnTemp3',
		// handle:'.rightBtnTemp3',
		startEnd: [340, 0],
		targets: ['.rightNav3', '.rightNavItem3'],
		isOpen: builder == 3 ? true : false,
		duration: 500,
		delay: 50,
		begin: function(e) {
			$('.rightBtn').hide();
			builder == 3 ? guangheValleyEnd.changeRightBtn(builder, e.state) : '';
		},
		complete: function(e) {
			$('.rightBtn').eq(builder).show();
		}
	})
}
// 按钮切换
guangheValleyEnd.changeRightBtn = function(type, state) {
	if (state == 'open') {
		$('.rightBtnTemp' + type).html(`
			<div class="rightBtnBgOpen">
				<i class="layui-icon layui-icon-right"></i>
			</div>
		`)
		$('.rightNavBg'+type).css({
			'transition': 'all ease .5s',
			'height':'100%',
		})
	} else if (state == 'close') {
		$('.rightBtnTemp' + type).html(`
			<div class="rightBtnBgClose">
				<i class="layui-icon layui-icon-left"></i>
			</div>
		`)
		$('.rightNavBg'+type).css({
			'transition': 'all ease 1s',
			'height':'0',
		})
	}
}
// 近30天泊雅苑每日热量
guangheValleyEnd.dateHotLine = function() {
	$.post(hdInterface.selectEndTheMonitorNearly30DaysHeatValues,
		{
			// siteId:_SITE_ID,
			deviceId:700
		},function(res){
			// console.log('近30天泊雅苑每日热量');
			// console.log(res);
			if(res.code == 0){
				let dataX = res.data.dataX.split(',');
				let dataY = res.data.dataY.split(',');
				echarsComponent.getLine({
					elementId: "dateHotLine",
					xdata: dataX,
					ydata: [dataY],
					unit:'kW·h',
					linecolors: ['rgba(22, 143, 255, 1)']
				})
			}
	})
	/* echarsComponent.getLine({
		elementId: "dateHotLine",
		xdata: nearlyThirtyDays(30, '.'),
		ydata: [
			[45830, 48060, 46790, 46950, 48560, 47410, 45630, 46360, 46290, 45550, 46260, 44210,
				44530, 47360, 48190, 46550, 45660, 44910, 42530, 43360, 46890, 45750, 46260, 44210,
				43630, 47560, 45790, 47750, 44830, 46550
			]
		],
		unit:'kW·h',
		linecolors: ['rgba(22, 143, 255, 1)']
	}) */
	guangheValleyEnd.getTemperatureLine('roomTemperature1', _SITE_ID, '1580');
	guangheValleyEnd.getTemperatureLine('roomTemperature2', _SITE_ID, '1579');
	guangheValleyEnd.getTemperatureLine('roomTemperature3', _SITE_ID, '1578');
}
guangheValleyEnd.getTemperatureLine = function(el, _SITE_ID, plctempId) {
	$.post(hdInterface.selectEndInsideAndOutsideTemperatureCurve, {
		siteId: _SITE_ID,
		plctempId: plctempId,
	}).done(function(res) {
		if (res.code == 0) {
			let dataX = [];
			let dataY = [],
				dataY2 = [];
			res.data.dataX.split(',').forEach((item, index) => {
				dataX.push(item + ':00');
			})
			res.data.dataY.split(',').forEach((item, index) => {
				dataY.push(item);
			})
			res.data.dataY2.split(',').forEach((item, index) => {
				dataY2.push(item);
			})
			echarsComponent.getLine({
				elementId: el,
				xdata: dataX,
				ydata: [dataY, dataY2],
				unit: '℃',
				ydataTitle: ['室内温度', '室外温度'],
				linecolors: ['rgba(0, 255, 255, 1)', 'rgba(22, 143, 255, 1)'],
				grid: {
					right: '25px'
				}
			})
		}
	})
}
guangheValleyEnd.getHotEnergy = function(url, _SITE_ID, deviceIds, fn) {
	$.post(hdInterface[url], {
		siteId: _SITE_ID,
		deviceIds: deviceIds,
	}).done((res) => {
		// console.log(res);
		if (res.code == 0) {
			if (fn && typeof fn == 'function') {
				fn(res.data);
			}
		}
	})
}
guangheValleyEnd.hotMonitor = function() {
	guangheValleyEnd.getHotEnergy('selectEndHotelPlcValueByDeviceIds', _SITE_ID, '533,538,549', function(data) {
		$('#heatLossValue').html(convert(data.heatLossValue));
		$('#heatLossRatio').html(convert(data.heatLossRatio));
		data.imvDeviceDiagrams.forEach((item, index) => {
			if (item.deviceId == '538') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#hotelHotTotal').html(convert(e.refeText));
					}
				})
			}
			if (item.deviceId == '533') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#hotelHot').html(convert(e.refeText));
					}
				})
			}
			if (item.deviceId == '549') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '314') {
						$('#hotelTemperature').html(convert(e.refeText));
					}
				})
			}
		})
	})
	guangheValleyEnd.getHotEnergy('selectEndSalesCenterPlcValueByDeviceIds', _SITE_ID, '535,540,550', function(
		data) {
		$('#salesCenter').html(convert(data.heatLossValue));
		$('#hotheatLossValue').html(convert(data.heatLossRatio));
		data.imvDeviceDiagrams.forEach((item, index) => {
			/* if (item.deviceId == '535') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#salesCenter').html(convert(e.refeText));
					}
				})
			} */
			if (item.deviceId == '540') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#salesCenter1').html(convert(e.refeText));
					}
				})
			}
			if (item.deviceId == '535') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#salesCenter2').html(convert(e.refeText));
					}
				})
			}
			if (item.deviceId == '550') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '314') {
						$('#salesCenterTemperature').html(convert(e.refeText));
					}
				})
			}
		})
	})
	guangheValleyEnd.getHotEnergy('selectEndPlcValueByDeviceIds', _SITE_ID, '534,551', function(
		data) {
		data.forEach((item, index) => {
			if (item.deviceId == '534') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '327') {
						$('#boxintang').html(convert(e.refeText));
					}
				})
			}
			if (item.deviceId == '551') {
				let plctemplateInfos = item.plctemplateInfos;
				plctemplateInfos.forEach((e, i) => {
					if (e.plcTypeId == '314') {
						$('#boxinTemperature').html(convert(e.refeText));
					}
				})
			}
		})
	})
	guangheValleyEnd.getHotEnergy('selectTemperatureAndHumidityCopy', _SITE_ID, '', function(data) {
		if(data){
			$('.temperature').html(convert(data.temperature));
		} else {
			$('.temperature').html('--');
		}
	})
}
// 末端监测设备统计
guangheValleyEnd.deviceMonitor = function(){
	$.ajax({
		url:hdInterface.selectEndTheMonitorPlcValueByDeviceIds,
		type:'post',
		data:{
			projectId:projectId
		},
		success:function(data){
			if(data.code == 0){
				if(data.data == null){
					return;
				}
				Object.keys(data.data).forEach((item,index) => {
					$('#'+item).html(convert(data.data[item]));
				})
			}
		}
	})
}



guangheValleyEnd.init();

function nearlyThirtyDays(dateNumbers, interval = '-', showYear = false) {
	let date = new Date();
	let time = date.getTime();
	let dateArray = [];
	for (let i = 1; i <= dateNumbers; i++) {
		let earlyTime = time - 24 * 60 * 60 * 1000 * i;
		let Y = new Date(earlyTime).getFullYear();
		let M = new Date(earlyTime).getMonth() + 1;
		let D = new Date(earlyTime).getDate();
		M = M < 10 ? '0' + M : M;
		D = D < 10 ? '0' + D : D;
		if (showYear) {
			dateArray.push(`${Y}${interval}${M}${interval}${D}`);
		} else {
			dateArray.push(`${M}${interval}${D}`);
		}
	}
	dateArray.reverse();
	return dateArray;
}
