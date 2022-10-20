var security = {
    isWarnLunBo : false,
    isFaultLunBo : false,
	loadmar:0//判断循环列表是否全部加载完成
};
var timer = null
var timerLine = null
var _SITE_ID = getParams()['siteId'];
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
		 clearInterval(timer)
		 clearInterval(timerLine)
		 // console.log('离开')
	}
	else{
		security.init()
		// console.log('回来')
	}
});
security.init = function () {
	if(sitename){
		$("#innerheader").attr("data-title", decodeURI(sitename));
	}	
	security.topLeftData()// 左上角安全信息 1d
	security.getwaringTop();// 当月预警次数排名
	security.setIconLine();// 图标扫描线
	// 冷冻供回水温差
	security.press();
	// 冷冻供回水压差
	// security.topList();//当月预警次数排名
	function monitor() {
		// clearInterval(timer);
		// console.log('60s更新')
		security.initMonitor(); // 初始化安全监控 1m
		security.playWarnLight();// 播放预警信息
	}
	monitor();
	timer=setInterval(monitor, 60*1000);
	removemask("centervideo");
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
// 图标扫描线
security.setIconLine = function(){
	var num1 = -14,num2 = 18,num3 = 8,num4 = 26;
	$('#line1').css('top',num1+'px')
	$('#line2').css('top',num2+'px')
	$('#line3').css('top',num3+'px')
	$('#line4').css('top',num4+'px')
	timerLine = setInterval(function(){
		num1 = num1++>=58? -14:num1;
		num2 = num2++>=58? -14:num2;
		num3 = num3++>=58? -14:num3;
		num4 = num4++>=58? -14:num4;
		$('#line1').css('top',num1+'px')
		$('#line2').css('top',num2+'px')
		$('#line3').css('top',num3+'px')
		$('#line4').css('top',num4+'px')
	},50)
}


// 左上角安全信息 当月故障高发设备TOP5 设备距维护剩余天数排行 1d 
security.topLeftData = function(){
	// 左上角安全信息 1d
	$.post(hdInterface.safeOverViewCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#sec-Date').html(convert(data.data.safeRunDay))
			$('#sec-Recovery').html(convert(data.data.warnRecoveryCount))
			$('#sec-Use').html(convert(data.data.deviceUseCycle))
		}
	});
	// 当月故障高发设备TOP5 1d
	$.post(hdInterface.deviceFaultRankCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data);
			if (data.data.length === 0){
				$(".cont4-ul").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg" style="margin-top:50px;"></div>');
			} else {
				$('.cont4-ul').html(`
				<li style="background:rgba(0, 163, 163, 0.1);">
					<span class="ulSpan1">排名</span><span class="cont4-pad">设备名称</span>
					<span class="ulSpan2"}">次数</span>
				</li>
				`)
				data.data.forEach((item,index)=>{
					// ${index>2? 'cont4-span-kong':'cont4-span-red'}
					$('.cont4-ul').append(`
						<li style="${index%2!==0?'background:rgba(0, 163, 163, 0.1)':''}">
							<span class="ulSpan1">${index+1}</span><span class="cont4-pad">${convert(item.plate)}</span>
							<span class="ulSpan2">${convert(item.faultCount)}</span>
						</li>
					`)
				})
				$('.cont4-ul li').eq(4).css('border','0')
			}
		}
	});
	// 急需维保设备排名 1d
	$.post(hdInterface.deviceMaintenanceDayCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data);
			// data.data = {}
			if(JSON.stringify(data.data) == '{}'  || !data.data.dataX || !data.data.dataY || !data.data.dataY2){
				$("#main4").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
				// return;
			} else {
				if (data.data.status == 1){
					$('#jinggao').css('display','block')
				}
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')//运行时长
				var dataY2 = data.data.dataY2.split(',')//剩余维保时间
				// dataY=[20,30,15,10,16]
				// dataY=[150,150,150,150,150]
				echarsComponent.getStackBarChars({
					"elementId":"main4",//容器id	[必填]
					"xdata":dataX,//横坐标数据[必填]
					"ydata":[dataY,dataY2],//纵坐标数据[必填]
					"itemColor":['rgba(0, 255, 255, 0.6)','rgba(252, 234, 69, 0.6)'],
					"ydataTitle":['运行时长','剩余保养时间'],//提示框标题项
					'interval':0,
					"units":'h',//单位[非必填]
					"colorGradient":[{
						"startColor":"rgba(0, 255, 255, 0.2)","endColor":"rgba(0, 255, 255, 1)"
					}],
					"nodataImg":true,//无数据时候是否显示暂无数据图片
					"provideNumber":4,
					'yAxisMin': Math.min(...dataY2) - 10, //取最小值
					'yAxisMinInterval':50,//y轴最小刻度间距

				})
				$('.echarts-legend').css('display','block')
			}
		}
	});
}
// 初始化安全监控 1m
security.initMonitor = function () {
	// 冷冻供回水温压差 1m
	$.post(hdInterface.waterSupplyAndReturnCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#temper_data').html(convert(data.data.temperatureDifferenceBetweenChilledSupplyAndReturnWater))
			$('#pressure_data').html(convert(data.data.pressureDifferenceOfRefrigeratingSupplyAndReturn))
		}
	});
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
			var res=data.data||[];
			if(res.length==0){
				// $(".bottomList-left").hide();
				$("#warnList").html('当前系统运行良好，暂无预警')
			} else {
				var param1 = {
					vis:'2',//可视数
					// title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长', '故障状态'], //列表标题
					list: [],//列表数据
					// stateItem: [],//图标标志列
					// changeFlag: [],//0 1互换标志数组
					hangLie:{
						lieflag:true,
						lienum:3,
						hangflag:true,
						hangnum:0
					}
				}
				res.forEach((item,index)=>{
					param1.list.push({
						warnRuleName:convert(item.warnRuleName),
						// type:'规则预警',
						state:'<img class="gDimg" src="../../common/image/circle-red.png">',
						time:convert(item.time),
					})
				})
				// console.log(param1)
				let obj1 = new listRollNew('warnList',param1);//实例化
			}
		}
	});

	/*当前报警详情 1m*/
	$.post(hdInterface.realAlarmDetailModule, {
		'siteId': _SITE_ID,
		"alarmType":"4,5,6"
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			var res=data.data||[];
			if(res.length==0){
				// $(".bottomList-right").hide();
				$("#faultList").html('当前设备运行良好，暂无报警')
			} else {
				var param2 = {
					vis:'2',//可视数
					list: [],//列表数据
					// stateItem: [],//图标标志列
					// changeFlag: [],//0 1互换标志数组
					hangLie:{
						lieflag:true,
						lienum:3,
						hangflag:true,
						hangnum:0
					}
				}
				res.forEach((item,index)=>{
					param2.list.push({
						alarmName:convert(item.alarmName),
						// type:item.alarmType=='4'?'规则报警':item.alarmType=='5'?'离线报警':item.alarmType=='6'?'设备故障':'--',
						state:item.alarmType=='5'?'<img class="gDimg" src="../../common/image/circle-gray.png">':'<img class="gDimg" src="../../common/image/circle-red.png">',
						time:convert(item.time),
					})
				})
				let obj2 = new listRollNew('faultList',param2);//实例化
			}
		}
	});
	$('#warnList').on('mouseenter mouseleave','.gDhang0',function(e){
		if(e.type == 'mouseenter'){
			let X = $(this).offset().top;
			let Y = $(this).offset().left;
			let color = $(this).css('color');
			$('.tipList').html($(this).html()).css({
				'top':X+'px',
				'left':Y+'px',
				'color':color,
				'opacity': 1,
				'z-index': 1,
			}).attr('data-selector','warnList');
		} else if(e.type == 'mouseleave'){
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
		}
	})
	$('#faultList').on('mouseenter mouseleave','.gDhang0',function(e){
		if(e.type == 'mouseenter'){
			let X = $(this).offset().top;
			let Y = $(this).offset().left;
			let color = $(this).css('color');
			$('.tipList').html($(this).html()).css({
				'top':X+'px',
				'left':Y+'px',
				'color':color,
				'opacity': 1,
				'z-index': 1,
			}).attr('data-selector','faultList');
		} else if(e.type == 'mouseleave'){
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
		}
	})
	$('.tipList').on('mouseenter mouseleave',function(e){
		let selector = $(this).attr('data-selector');
		if(e.type == 'mouseenter'){
			$('.tipList').css({
				'opacity': 1,
				'z-index': 1,
			});
			selector != '' ? $('#'+selector+' .gDlistOut').liMarquee('pause'):'';
		} else if(e.type == 'mouseleave'){
			$('.tipList').css({
				'opacity': 0,
				'z-index': -99,
			});
			selector != '' ? $('#'+selector+' .gDlistOut').liMarquee('play'):'';
			$('.tipList').attr('data-selector','');
		}
	})
};

/*循环播放列表专用数组整理方法,
 arr:需要整理的数组，
 listLength:列表需要显示的长度
*/
function txtMarqueeArr(arr, listLength) {
    var clonelist = []; //整理后的数组
    if (arr.length >= listLength) {
        var arrend = arr[arr.length - 1]; //最后一个
        var arrbrgin = arr.slice(0, listLength); //开始几个
        clonelist.push(arrend); //最后一个数组放到第一个位置
        for (var j = 0; j < arr.length; j++) {
            clonelist.push(arr[j]); //获取的数组放中间位置
        }
        for (var i = 0; i < arrbrgin.length; i++) {
            clonelist.push(arrbrgin[i]); //开始几个数组放到最后面的位置
        }
    } else {
        clonelist = arr; //不大于规定长度，直接返回原数组
    }

    return clonelist;
}

/*综合安全评分*/
security.safetyScore= function(data){	
	if (data['code'] === 0) {
		var $vediodom = $("#warnLight");
		var $centerMessage = $('.center-message');
		var $safetyScore = $('#safetyScore');
		if (data.data.safetyScore <= 90) {
			var url = "./image/huanhuan_x264.mp4";
			// if ($vediodom.attr("src") === url) {
			// 	hdTools.removemask("abc")
			// 	return;
			// }
			$("#warnLight").attr("src", url);
			// voicePaly();
			$centerMessage.css({
				'color':'#E93F41',
			})
		}else{
			var url = "./image/中间圆_x264.mp4";
			// if ($vediodom.attr("src") === url) {
			// 	hdTools.removemask("abc")
			// 	return;
			// }
			$("#warnLight").attr("src", url);
			$centerMessage.css({
				'color':'#3DFFAA',
			})
			// voiceClose();
		}
		// console.log("========更新安全综合评分");
		// console.log(data.data.safetyScore);
		$safetyScore.text(convert(data.data.safetyScore));
		$safetyScore.next().text('综合安全评分');
	}
};

// 当月预警次数排名
security.getwaringTop = function () {
	var salvProName = [],
		salvProValue = [];
	//预警次数排名近30天
	$.post(hdInterface.warnCountRankCopy, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data)
			// data.data = {}
			// console.log(data.data.length)
			if(JSON.stringify(data.data) == '{}'){
				$('#main_top1').attr('style','position: relative;')
				$('#main_top1 .hd-loadmask').html(`<img src="../../common/image/nodata.png" class="imagePo">`)
			} else {
				// console.log(data.data)
				salvProName = data.data.dataX.split(',');
				salvProValue = data.data.dataY.split(',');
				var salvProNamesub=[];
				// 插入换行符号 \n
				for (var i = 0; i < salvProName.length; i++) {
					var item=salvProName[i];
					item=insertAt(item,'\n',4);
					salvProNamesub.push(item);
				}
				var list = [];
				salvProName.forEach((item,index) => {
					list.push({name:convert(item),electric:convert(salvProValue[index])});
				})
				/* var list = [
					{name: convert(salvProName[0]), electric: convert(salvProValue[0])},
					{name: convert(salvProName[1]), electric: convert(salvProValue[1])},
					{name: convert(salvProName[2]), electric: convert(salvProValue[2])},
					{name: convert(salvProName[3]), electric: convert(salvProValue[3])},
					{name: convert(salvProName[4]), electric: convert(salvProValue[4])},
				] */
				security.topList('main_top1',list,'electric')
			}
		}
	})

	// $(window).resize(function () {
	// 	myChart.resize();
	// });
}

/*加载当前预警次数*/
security.alarmRate = function (data) {
	var value=(data.data.realWarnRuleCount/data.data.warnRuleCount*100)||"";
	var showText=`<span style="font-size:30px;">${convert(data.data.realWarnRuleCount)}</span>/${convert(data.data.warnRuleCount)}`;
	// console.log("实时预警规则====");
	// console.log(showText);
	$("#circleWaringText").html(convert(showText));	
	echarsComponent.getCircleChars({
		"elementId":"main7",//容器id	[必填]
		"value":value,//百分比值[必填]
		"startColor":'#36D1FF',//开始时候颜色[非必填]
		"endColor":'#36D1FF',//结束时候颜色	[非必填]
		// "fontSize":"12",//中间文字大小[非必填]
		// "fontColor":"#fff",//中间文字颜色[非必填]
		"showText":false,//是否显示中间文字 bool[非必填]
	});
	
	
}

/*加载设备故障数量*/
security.integrityRate = function (data) {
	// console.log(data)
	var value=data.data.deviceAlarmCount/data.data.alarmCount*100;
	var showText=`<span style="color:#ff4444;"><span style="font-size:30px;">${convert(data.data.deviceAlarmCount)}</span>/${convert(data.data.alarmCount)}</span>`;
	// console.log("=======实时设备故障");
	// console.log(showText);
	$("#circleFaultText").html(convert(showText));
	echarsComponent.getCircleChars({
		"elementId":"main8",//容器id	[必填]
		"value":value,//百分比值[必填]
		"startColor":'#36D1FF',//开始时候颜色[非必填]
		"endColor":'#36D1FF',//结束时候颜色	[非必填]
		// "fontSize":"12",//中间文字大小[非必填]
		// "fontColor":"#fff",//中间文字颜色[非必填]
		"showText":false,//是否显示中间文字 bool[非必填]
	});
}

//左侧中间冷冻供回温差
security.temper = function () {
	// var textcount=(isNaN(data)==true?"--":data) + 'bar';
	// echarsComponent.getWaterCircleChars({
	// 	"elementId":"temper_spw",//容器id	[必填]
	// 	"textCount":'',//数字和单位[数字必填，单位非必填]
	// 	"textColor":"rgba(99, 216, 165, 1)",//颜色，只支持rgb[非必填]
	// 	"fontSize":"14",//中间字号[非必填]
	// 	"borderWidth":"4",//边框宽度[非必填]
	// 	"fontWeight":'normal'//是否加粗文字，默认加粗[非必填]
	// })
	
}
 
 //左侧中间冷冻供回压差
 security.press = function () {
 	// var textcount= (isNaN(data)==true?"--":data) + '℃'
	// echarsComponent.getWaterCircleChars({
 // 		"elementId":"press_spw",//容器id	[必填]
 // 		"textCount":'',//数字和单位[数字必填，单位非必填]
 // 		"textColor":"rgba(0, 198, 255, 1)",//颜色，只支持rgb[非必填]
 // 		"fontSize":"14",//中间字号[非必填]
 // 		"borderWidth":"4",//边框宽度[非必填]
 // 		"fontWeight":'normal'//是否加粗文字，默认加粗[非必填]
 // 	})
 };
 $("#control_btn").hover(function(){
	 // var dis=$(this).find(".div_rules").css("display");
	 // if(dis=="none"){
		//  $(".div_rules").show();
	 // }else{
		//  $(".div_rules").hide();
	 // }
	 $(".div_rules").show();
 },function(){
	 $(".div_rules").hide();
 });
 //当月预警次数排名方法
 var data = [
	{name: '设备名称', electric: '4158'},
	{name: '锅炉循环泵一号', electric: '4236'},
	{name: '设备名称', electric: '1098'},
	{name: '设备名称', electric: '1237'},
	{name: '离心式制冷机一号', electric: '7057'},
]
security.topList = function (selector,data,electric) {
	$('#'+selector).html(`<ul class="top_list"></ul>`)
	var maxElectric = 0
	var testData = null
	data.forEach((item,index)=>{
		maxElectric = item.electric-0>maxElectric ? (item.electric-0):maxElectric;
	})
	for (var i = 0; i<data.length; i++){
		for (var j = 0;j<data.length; j++){
			if (data[i].electric-0>data[j].electric-0){
				testData = data[i]
				data[i] = data[j]
				 data[j] = testData
			}
		}
	}
	data.forEach((item,index)=>{
		if(maxElectric==0){
			var width = 0
		}else{
			var width = (item.electric/maxElectric)*100
		}
		$('#'+selector+' .top_list').append(`<li>
							<div class="li_top">
								<span class="list_No">${index+1}</span>
								<span class="list_name">${item.name}</span>
								<span class="list_Num">${item.electric}</span>
							</div>
							<div class="li_bottom">
								<div style="position: relative;margin-right: 5px;height: 5px;">
									<div class="li_line" style="width:${width}%;"></div>
								</div>
							</div>
						</li>`)
	})
}
window.security = security;
security.init();
