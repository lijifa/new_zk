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
var timer = null;
var timer1 = null;
var leftbar = null;
var rightbar = null;
monitoring.cameras = {};
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	} else {
		// monitoring.oneMinuteUpdata();
	}
});
var objName = layuiId;
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	// monitoring.oneMinuteUpdata();
// }); //注册
monitoring.init = function() {
	monitoring.windowTo();
	monitoring.popUpsList();
	monitoring.energyCost();
	$("#camera-container").prepend(
		'<iframe src="./JiFangSite/index.html?v=' + version +
		'" frameborder="0" width="100%" height="100%"></iframe>'
	);
	monitoring.turnback(); //收起按钮
	// monitoring.oneMinuteUpdata();

};
monitoring.oneMinuteUpdata = function() {
	timer = setInterval(function() {
		monitoring.energyCost();
	}, 60 * 1000);
}

monitoring.u3dinit = function(gameInstance) {
	leftbar.showMenu();
	rightbar.showMenu();
	// u3d假数据
	monitoring.initData = function() {
		$.ajax({
			url: "js/init.json",
			success: function(data) {
				if (data.code == 0) {
					data.data.forEach((item, index) => {
						item.plctemplateInfos.forEach((e, i) => {
							if (e.plcTypeId == "001") {
								e.refeText = (Math.random() * 40 + 10).toFixed(2);
							}
							if (e.plcTypeId == "002") {
								e.refeText = ((Math.random() * 500)*(new Date().getDate())).toFixed(2);
							}
							if (e.plcTypeId == "003") {
								e.refeText = (Math.random() * 0.5).toFixed(2);
							}
						})
					})
					gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(data));
				}
			}
		})
	}
	// u3d按钮
	monitoring.changeBtn = function() {
		$('.bottomBtn').show();
		let old = new Date().getTime();
		let flag = '0';
		$('.sysBtn').on('click', function(e) {
			if(new Date().getTime() - old < 1000){
				return;
			}
			if(flag == $(this).attr('data-flag')){
				flag = $(this).siblings().attr('data-flag');
				let imgUrl = $(this).siblings().css('background-image');
				if (imgUrl.match(/Blue/)) {
					imgUrl = imgUrl.replace(/Blue/, 'Yellow');
				} else if (imgUrl.match(/Yellow/)) {
					imgUrl = imgUrl.replace(/Yellow/, 'Blue');
				}
				$(this).siblings().css({
					"background-image": imgUrl
				})
				$(this).each((i, e) => {
					let imgSiblings = $(e).css('background-image');
					if (imgSiblings.match(/Yellow/)) {
						imgSiblings = imgSiblings.replace(/Yellow/, 'Blue');
					}
					$(e).css({
						"background-image": imgSiblings
					})
				})
				gameInstance.SendMessage("UpdateStateMgr", "TapWaterButton", flag);
			} else {
				flag = $(this).attr('data-flag');
				let imgUrl = $(this).css('background-image');
				if (imgUrl.match(/Blue/)) {
					imgUrl = imgUrl.replace(/Blue/, 'Yellow');
				} else if (imgUrl.match(/Yellow/)) {
					imgUrl = imgUrl.replace(/Yellow/, 'Blue');
				}
				$(this).css({
					"background-image": imgUrl
				})
				$(this).siblings().each((i, e) => {
					let imgSiblings = $(e).css('background-image');
					if (imgSiblings.match(/Yellow/)) {
						imgSiblings = imgSiblings.replace(/Yellow/, 'Blue');
					}
					$(e).css({
						"background-image": imgSiblings
					})
				})
				gameInstance.SendMessage("UpdateStateMgr", "TapWaterButton", flag);
			}
			old = new Date().getTime();
		})
	}
	monitoring.initData();
	monitoring.changeBtn();
	//摄像头图表变亮
	monitoring.resetSelectXiangJiStatus = function() {
		gameInstance.SendMessage("JiFangManager", "ResetSelectXiangJiStatus");
	}
	top.window.showVideo = function(id) {
		$("#camera" + id).css("z-index", "111");
	}
	top.window.showMonitoringVideo = function(id) {
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
	top.window.closeMonitoringVideo = function() {
		$("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	top.window.canmerHide = function() {
		top.window.closeMonitoringVideo();
	};
	//根据对应的id和位置移动摄像头
	top.window.moveVideo = function(str) {
		var strArr = str.split(",");
		var id = strArr[0];
		var pointx = strArr[1] - 100;
		var pointy = strArr[2];
		$("#camera10").css({
			"bottom": pointy + "px",
			"left": pointx + "px"
		});
	};
}
//收起按钮
monitoring.turnback = function() {
	leftbar = new SlideMenu({
		direction: 'left',
		menuBtn: '#btnLeft',
		menuBox: '.leftbar',
		menuSetPosition: [0, -340],
		btnSetposition: [340, 0],
		isOpen: false,
		bgDrop: 5,
		callBackFun: function(e) {
			if (e) {
				$('#btnLeft>i').removeClass('layui-icon-right').addClass('layui-icon-left')
			} else {
				$('#btnLeft>i').removeClass('layui-icon-left').addClass('layui-icon-right')
			}
		}
	})
	rightbar = new SlideMenu({
		direction: 'right',
		menuBtn: '#btnRight',
		menuBox: '.rightbar',
		menuSetPosition: [0, -340],
		btnSetposition: [340, 0],
		isOpen: false,
		bgDrop: 5,
		callBackFun: function(e) {
			if (e) {
				$('#btnRight>i').removeClass('layui-icon-left').addClass('layui-icon-right')
			} else {
				$('#btnRight>i').removeClass('layui-icon-right').addClass('layui-icon-left')
			}
		}
	})
}

monitoring.play = function(id, src) {
	let srcArr = []
	srcArr[0] = src
	// src.lastIndexOf('.')
	// console.log(src.lastIndexOf('.'))
	srcArr[1] = src.substring(0, src.lastIndexOf('.')) + '.hd' + src.substring(src.lastIndexOf('.'))
	// console.log(srcArr)
	var player = new TcPlayer(id, {
		m3u8_hd: srcArr[1], //高清
		m3u8: srcArr[0], //超清
		//"m3u8_hd"   : "http://hls01open.ys7.com/openlive/f2bc6eb65d974b48b919f2c0df71f42b.m3u8",//高清
		//"m3u8_sd"   : "http://hls01open.ys7.com/openlive/f2bc6eb65d974b48b919f2c0df71f42b.m3u8",//超清
		//flv: "http://2157.liveplay.myqcloud.com/live/2157_358535a.flv", //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
		autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
		// poster: "http://www.test.com/myimage.jpg",
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
monitoring.bindCameraData = function() {
	var event = {
		initDevice: function(arr) {
			$.each(arr, function(i) {
				var id = `id_test_video${i}`
			});
		},
	};
	var params = {
		siteId: _SITE_ID,
	};
	$.post(hdInterface.selectCameraDetailNew, params).done(function(data) {
		if (data["code"] === 0) {
			cameraArray = data.data
		}
	});

	$(document).on("click", ".cameraclose", function() {
		$(this).parent(".camera").css("z-index", "-111");
		cameraShowId = "";
		monitoring.resetSelectXiangJiStatus();
	});

};
// 跳转
monitoring.windowTo = function() {
	$('#windowTo').on('click', function() {
		let url = '';
		parent.$('#hidenavbar a').each((i, e) => {
			if ($(e).attr('data-url').indexOf('/drainageMonitor/device.html') != -1) {
				url = $(e).attr('data-url');
			}
		})
		/* url = `/bussiness/drainageMonitor/device.html?showmenu=show&siteId=13&projectId=7&
		titlename=%E7%BB%99%E6%8E%92%E6%B0%B4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95
		&menuLeftId=83`; */
		// console.log(url);
		let id = parent.$('.hd-tab.layui-tab-title .layui-this').attr('lay-id');
		let title = '光合谷给排水机房';
		top.window.openNewTab(url, id, title);
	})
}
// 弹窗
monitoring.popUpsList = function() {
	$('.tipList').on('mouseenter mouseleave', function(e) {
		if (e.type == 'mouseenter') {
			$('.tipList').css({
				'opacity': 1,
				'z-index': 1000,
			});
			$('.pop').css({
				'display': 'block',
				'opacity': 1,
				'z-index': 999,
			})
		} else if (e.type == 'mouseleave') {
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
			$('.pop').css({
				'display': 'block',
				'opacity': 0,
				'z-index': -999,
			})
		}
	})
	let device = new popUps({
		selector: '.pop',
		offsetLeft: 130,
		offsetTop: 0,
		hoverDom: '.hoverDom',
		fun: function(e) {
			// console.log(e);
			let param = {
				// title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长', '故障状态'], //列表标题
				list: [], //列表数据
				hangLie: {
					lieflag: true,
					lienum: 3,
					hangflag: true,
					hangnum: 0
				}
			}
			if (e.type == 1) {
				/* let warnList = [{
						warnRuleName: "泊心堂自来水用水流量过高",
						time: "11.03 07:40"
					},
					{
						warnRuleName: "温泉室外用水流量过高",
						time: "10.27 08:40"
					}
				];
				warnList.forEach((item, index) => {
					param.list.push({
						warnRuleName: convert(item.warnRuleName),
						// type: '规则预警',
						state: '<img class="gDimg" src="../../common/image/circle-red.png">',
						time: convert(item.time),
					})
				}) */
				param.list = [{text:'当前暂无预警'}];
				let warnListRoll = new listRollNew('listPop', param); //实例化
				$('#listPop .gDhang_item0').css({
					'width':'100%',
					'text-align':'center'
				})
				/* $('#listPop li').css({
					color: '#ffb72c'
				}) */
			} else {
				/* let alarmList = [{
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
				];
				alarmList.forEach((item, index) => {
					param.list.push({
						alarmName: convert(item.alarmName),
						// type: item.alarmType == '4' ? '规则报警' : item.alarmType == '5' ?
						// 	'离线报警' : item.alarmType == '6' ? '设备故障' : '--',
						state: item.alarmType == '5' ?
							'<img class="gDimg" src="../../common/image/circle-gray.png">' :
							'<img class="gDimg" src="../../common/image/circle-red.png">',
						time: convert(item.time),
					})
				}) */
				param.list = [{text:'当前暂无报警'}]
				let alarmListRoll = new listRollNew('listPop', param); //实例化
				$('#listPop .gDhang_item0').css({
					'width':'100%',
					'text-align':'center'
				})
				/* $('#listPop li').css({
					color: '#ff4444'
				})
				$('#listPop').on('mouseenter mouseleave', '.gDhang0 .gDhang_item0', function(e) {
					if (e.type == 'mouseenter') {
						let X = $(this).offset().top;
						let Y = $(this).offset().left;
						let color = $(this).css('color');
						$('.tipList').html($(this).html()).css({
							'top': X + 'px',
							'left': Y + 'px',
							// 'color': color,
							'opacity': 1,
							'z-index': 1000,
						});

					} else if (e.type == 'mouseleave') {
						$('.tipList').css({
							'opacity': 0,
							'z-index': -99,
						});

					}
				}) */
			}

		}
	})

}
// 当日能耗费用
monitoring.energyCost = function() {
	$('#energyCost').html((Math.random() * 2300 + 4700).toFixed(2));
	$('#energyQuota').html(8500);
	$('#monthEnergyCost').html(((Math.random() * 1300 + 5700)*(new Date().getDate())).toFixed(2))
	$('#monthEnergyQuota').html(855000);
	$('#energyDepletion').html((Math.random() * 150 + 450).toFixed(2));
	$('#waterDepletion').html((Math.random() * 300 + 640).toFixed(2));
	$('#reclaimedDepletion').html((Math.random() * 70 + 100).toFixed(2));
}

monitoring.init();
window.monitoring = monitoring;
