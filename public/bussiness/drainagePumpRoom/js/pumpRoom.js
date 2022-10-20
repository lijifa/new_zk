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

document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
		clearInterval(timer1);
	} else {
		// hdSquare.oneMinutesUpdate(); //一分钟更新
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
// 	hdSquare.waringfaultlist(); //当前报警汇总
// 	// console.log(e);//e当前页面的lay-id
// }); //注册
$("#camera-container").prepend(
	'<iframe src="./JiFangSite/index.html?v=' + version +
	'" frameborder="0" width="100%" height="100%"></iframe>'
);
hdSquare.init = function() {
	// $("#innerheader").attr("data-title", decodeURIComponent(sitename));
	hdSquare.bindCameraData(); //绑定摄像头
	// hdSquare.oneMinutesUpdate(); //一分钟更新
};
hdSquare.oneMinutesUpdate = function() {
	timer1 = setInterval(function() {
		hdSquare.getEqumentlist(); //加载U3D资源信息
		$('.pop_fault').css('display', 'none');
	}, 60 * 1000)
}

hdSquare.u3dinit = function(gameInstance) {
	// 监测切换按钮
	$('.btnCenter').show();
	hdSquare.changeMonitorBtn = function() {
		$('.btn').on('click', function() {
			let index = $(this).index();
			if(index == 0){
				$('.btn').eq(0).prop('disabled',true);
			}
			if ($(this).hasClass('btnOn')) {
				$(this).removeClass('btnOn');
				$(this).removeClass(`btnYellow${index}`);
				$(this).addClass(`btnBlue${index}`);
				$(this).attr('data-flag','0');
			} else {
				$(this).addClass('btnOn');
				$(this).addClass(`btnYellow${index}`);
				$(this).removeClass(`btnBlue${index}`);
				$(this).attr('data-flag','1');
			}
			let type = $(this).attr('data-type');
			let flag = $(this).attr('data-flag');
			gameInstance.SendMessage("ButtonInteraction", type, flag);
			if ($('.btn').eq(2).has('btnBlue2') && $(this).index() == 2) {
				$(this).parent(".camera").css("z-index", "-111");
				cameraShowId = "";
				// hdSquare.resetSelectXiangJiStatus();
			}
		})
	}
	hdSquare.changeMonitorBtn();
	//获取设备列表
	hdSquare.getEqumentlist = function() {
		let data = {
			"msg": "成功",
			"code": 0,
			"data": [{
					"deviceId": "s0072",
					"name": "给水泵一号",
					"pl": (Math.random() * 20 + 30).toFixed(1),
					"state": "1",
					"auto": "自动",
					"time": "163",
					"fault": "0"
				},
				{
					"deviceId": "s0073",
					"name": "给水泵二号",
					"pl": "0",
					"state": "0",
					"auto": "自动",
					"time": "134",
					"fault": "0"
				},
				{
					"deviceId": "s0074",
					"name": "给水泵三号",
					"pl": (Math.random() * 20 + 30).toFixed(1),
					"state": "1",
					"auto": "手动",
					"time": "127",
					"fault": "0"
				},
				{
					"deviceId": "s0075",
					"name": "给水泵四号",
					"pl": "0",
					"state": "0",
					"auto": "手动",
					"time": "83",
					"fault": "0"
				},
				{
					"deviceId": "s0100",
					"name": "给水泵一号",
					"pl": "0",
					"state": "0",
					"auto": "自动",
					"time": "163",
					"fault": "0"
				},
				{
					"deviceId": "s0101",
					"name": "给水泵二号",
					"pl": (Math.random() * 20 + 30).toFixed(1),
					"state": "1",
					"auto": "自动",
					"time": "145",
					"fault": "0"
				},
				{
					"deviceId": "s0102",
					"name": "给水泵三号",
					"pl": "0",
					"state": "0",
					"auto": "自动",
					"time": "'135",
					"fault": "0"
				},
				{
					"deviceId": "s0103",
					"name": "给水泵四号",
					"pl": (Math.random() * 20 + 30).toFixed(1),
					"state": "1",
					"auto": "自动",
					"time": "89",
					"fault": "0"
				}, {
					"deviceId": "s0108",
					"name": "排水泵一号",
					"pl": "0",
					"state": "0",
					"auto": "手动",
					"time": "152",
					"fault": "0"
				},
				{
					"deviceId": "s0109",
					"name": "排水泵二号",
					"pl": (Math.random() * 20 + 30).toFixed(1),
					"state": "1",
					"auto": "手动",
					"time": "135",
					"fault": "0"
				}
			]
		}
		gameInstance.SendMessage("UpdateStateMgr", 'GetJsMessage', JSON.stringify(data));
	}
	hdSquare.getEqumentlist();
}

// 监控视频画质
hdSquare.play = function(id, src) {
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
				playToggle: false,
				progressControl: false,
				volumePanel: false,
			},
			clarity: 'od',
			clarityLabel: {
				od: '流畅',
				hd: '高清',
				sd: '标清'
			},
		});
	},
	// 绑定监控
	hdSquare.bindCameraData = function() {
		var event = {
			initDevice: function(arr) {
				$.each(arr, function(i) {
					// <div class="videoCover">${this.cameraName}</div>
					var id = `id_test_video${i}`
				});
			},
		};
		var params = {
			siteId: _SITE_ID,
		};
		// $.post(baseurl + "wisdom/camera/selectCameraDetail", params)
		$.post(hdInterface.selectCameraDetailNew, params).done(function(data) {
			if (data["code"] === 0) {
				cameraArray = data.data;
			}
		});

		$(document).on("click", ".cameraclose", function() {
			// $(".cameraclose").click(function() {
			$(this).parent(".camera").css("z-index", "-111");
			cameraShowId = "";
			hdSquare.resetSelectXiangJiStatus();
			// $('#camerID').html('');
		});
	};
// 环境安防监测
hdSquare.environmentMonitor = function() {
	$.get(hdInterface.environmentalSecurity, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			// console.log(data);
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
				// data.data[key] = 10;
				if (data.data[key].length !== 0) {
					hdSquare[key] = arrTemp;
					text = data.data[key].length + '处异常';
					var img = $('#' + key + ' img').attr('src');
					if (img !== undefined) {
						img = img.replace(/Blue/, 'Red');
						$('#' + key + ' img').attr('src', img);
						$('#' + key + ' span').addClass('textColorRed');
					}
				} else {
					var img = $('#' + key + ' img').attr('src');
					hdSquare[key] = [{
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
}
// 电能利用效率
hdSquare.energyEfficiency = function() {
	$.get(hdInterface.energyEfficiency, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			// console.log(data);
			for (let key in data.data) {
				$('#' + key).html(convert(data.data[key]) == '--' ? convert(data.data[key]) : Number(
					convert(data.data[key])).toFixed(2));
			}
		}
	})
}
// 当日负荷曲线
hdSquare.loadtemputer = function() {
	$.get(hdInterface.dailyLoad, {
		siteId: _SITE_ID
	}).done(function(data) {
		if (data['code'] === 0) {
			if (JSON.stringify(data.data) == '{}') {
				$('#temp_echars .hd-loadmask').html(`
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				`)
			} else {
				var datax = data.data.dataX.split(',');
				var datay1 = data.data.dataY.split(',');
				var datay2 = data.data.dataY2.split(',');
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
					"unit": "kW", //单位
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
hdSquare.waringfaultlist = function() {
	$.get(hdInterface.alarmRecord, {
		siteId: _SITE_ID,
		type: 1,
	}).done(function(data) {
		if (data['code'] === 0) {
			// console.log(data);
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
						// alarmType:convert(item.alarmType),
						reason: convert(item.reason),
					}
					param1.list.push(obj)
				})
				let obj1 = new listRollNew('alarm_list', param1); //实例化
			}
		}
	})
}

hdSquare.init();
window.hdSquare = hdSquare;
