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
var player = null;
internationalFirmsU3D.cameras = {};
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	} else {
		internationalFirmsU3D.updata();
	}
});
var objName = layuiId;
//刷新
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
//标签切换
// top.registerListener(objName, function(e) {
// 	if(e == objName){
// 		internationalFirmsU3D.updata();
// 	} else {
// 		clearInterval(timer);
// 	}
// }); //注册
internationalFirmsU3D.init = function() {
	$("#camera-containerIF").prepend(
		'<iframe src="./CBDbuild/index.html?v=' + version +
		'" frameborder="0" width="100%" height="100%"s></iframe>'
	);
};

internationalFirmsU3D.u3dinit = function(gameInstance) {
	let newCamera = new camera({
		outerContainer:'#camera-containerIF',
		cameraIdName:'camera2',
		cameraUrlArr:cameraArray,
		openCallBack:function(e){
			console.log(e);
		},
		closeCallBack:function(e){
			console.log(e);
			if(e == 'cameraclose'){
				internationalFirmsU3D.resetSelectXiangJiStatus();
			}
		}
	});
	//摄像头图表变亮
	internationalFirmsU3D.resetSelectXiangJiStatus = function() {
		gameInstance.SendMessage("XiangJiMgr", "ResetSelectXiangJiStatus");
	}
	internationalFirmsU3D.showVideo = function(id) {
		$("#camera1").css("z-index", "111");
	}
	internationalFirmsU3D.showinternationalFirmsU3DVideo = function(id) {
		cameraShowId = id;
		newCamera.getCameraListPlay(id);
		/* internationalFirmsU3D.closeinternationalFirmsU3DVideo();
		var zindex = $("#camera1").css("z-index");
		// internationalFirmsU3D.closeinternationalFirmsU3DVideo();
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
			if (item.cameraId == cameraShowId) {
				$('#camerID1').html('');
				var src = ''
				src = item.cameraUrls;
				internationalFirmsU3D.play("camerID1", src);
				move({
					selector: '.cameraMove',
					handle: '.vcp-panel-bg',
					padding: [40, 10, 40, 10]
				});
			}
		}) */
	};
	internationalFirmsU3D.closeinternationalFirmsU3DVideo = function() {
		// $("#camera-container .camera").css("z-index", "-111");
	};
	//关闭监控(移动调用)
	internationalFirmsU3D.canmerHide = function() {
		// internationalFirmsU3D.closeinternationalFirmsU3DVideo();
	};
	//根据对应的id和位置移动摄像头
	internationalFirmsU3D.moveVideo = function(str) {
		var strArr = str.split(",");
		var id = strArr[0];
		var pointx = strArr[1] - 100;
		var pointy = strArr[2];
		$("#camera1").css({
			"bottom": pointy + "px",
			"left": pointx + "px"
		});
	};
	//获取设备列表
	internationalFirmsU3D.getEqumentlist = function(gameInstance) {
		// 信号
		$.post(hdInterface.selectPlcTemplateStatusByPlcTypeIdsModule, {
			"siteId": _SITE_ID,
			"plcTypeIds": plcTypeIds
		}).done(function(result) {
			if ((result.code == '0' || result.code == '200') && result.data.length > 0) {
				gameInstance.SendMessage("UpdateStateMgr", "GetSensorMessage", JSON.stringify(result));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", "SensoerOfflineData");
			}
		});
		// 设备
		$.post(hdInterface.selectDeviceStatusByDeviceIdsModuleCopy, {
			"siteId": _SITE_ID,
		}).done(function(result) {
			if ((result.code == '0' || result.code == '200') && result.data.length > 0) {
				gameInstance.SendMessage("UpdateStateMgr", "GetJsMessage", JSON.stringify(result));
			} else {
				gameInstance.SendMessage("UpdateStateMgr", "noData");
			}
		});
	}


	internationalFirmsU3D.getEqumentlist(gameInstance); //获取设备列表
	// 监控
	internationalFirmsU3D.bindCameraData = function() {
		$.post(hdInterface.selectCameraDetailNew, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				// console.log(data.data);
				cameraArray=data.data;
				newCamera.updataCameraList(cameraArray);
				// gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
		
		/* $(document).on("click", ".cameraclose", function() {
				$(this).parent(".camera").css("z-index","-111");
				cameraShowId = "";
				internationalFirmsU3D.resetSelectXiangJiStatus();
		}); */
		
	};
	internationalFirmsU3D.bindCameraData();
	// 查询摄像头状态
	internationalFirmsU3D.selectCameraStatus = function(){
		$.post(hdInterface.selectCameraStatus, {siteId: _SITE_ID,}).done(function(data) {
			if (data["code"] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", "CameraState",JSON.stringify(data));
			}
		});
	}
	internationalFirmsU3D.selectCameraStatus();
	internationalFirmsU3D.updata = function() {
		timer = setInterval(function() {
			internationalFirmsU3D.getEqumentlist(gameInstance);
			internationalFirmsU3D.selectCameraStatus();
		}, 60 * 1000);
	}
	internationalFirmsU3D.updata();
}
internationalFirmsU3D.play = function(id, src) {
	let srcArr = []
	srcArr[0] = src[0];
	srcArr[1] = src[1];
	player = new TcPlayer(id, {
		m3u8_hd: srcArr[0], //高清
		m3u8: srcArr[1], //超清
		//"m3u8_hd"   : "http://hls01open.ys7.com/openlive/f2bc6eb65d974b48b919f2c0df71f42b.m3u8",//高清
		//"m3u8_sd"   : "http://hls01open.ys7.com/openlive/f2bc6eb65d974b48b919f2c0df71f42b.m3u8",//超清
		//flv: "http://2157.liveplay.myqcloud.com/live/2157_358535a.flv", //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
		autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
		// poster: "http://www.test.com/myimage.jpg",
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
internationalFirmsU3D.init();
window.internationalFirmsU3D = internationalFirmsU3D;
