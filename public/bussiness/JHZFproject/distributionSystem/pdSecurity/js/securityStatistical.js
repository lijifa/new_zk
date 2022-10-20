var securityStatistical = {}
var _SITE_ID = getParams()['siteId'];
var layuiId=getParams()['layuiId'];//菜单id
var timer = null;
// 离开页面调用
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
		 clearInterval(timer);
		 // console.log('离开')
	}
	else{
		// securityStatistical.init();
		securityStatistical.fiveMinutesUpdate();//五分钟更新
		// console.log('回来')
	}
});
var objName = layuiId;
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	securityStatistical.deviceList();// 报警统计列表
// 	// securityStatistical.fiveMinutesUpdate();//五分钟更新
// }); //注册
securityStatistical.init = function () {
	// securityStatistical.changeTime();//时间切换
	securityStatistical.selectAlarmTop('month');// 报警原因前5名 报警原因后5名
	securityStatistical.selectPlcTop('month');// 信号报警统计前10名
	securityStatistical.maxAmbientTemperature('month');//环境最大温度趋势
	securityStatistical.maxAmbientHumidity('month');// 环境最大湿度趋势
	securityStatistical.maxDeviceTemperature('month');// 设备最大温度趋势
	securityStatistical.deviceList();// 报警统计列表
	securityStatistical.fiveMinutesUpdate();//五分钟更新
}
securityStatistical.fiveMinutesUpdate = function(){
	timer = setInterval(function(){
		// console.log('安全统计五分钟更新');
		securityStatistical.selectAlarmTop('month');// 报警原因前5名 报警原因后5名
		securityStatistical.selectPlcTop('month');// 信号报警统计前10名
		securityStatistical.deviceList();// 报警统计列表
	},5*60*1000);
}
function gettimecode(type){
	var timeCode;
	if(type=='month'){
		timeCode=5;
	}
	else if(type=='year'){
		timeCode=6;
	}
	return timeCode;
}

// 报警原因前5名 报警原因后5名
securityStatistical.selectAlarmTop = function (type){
	$.post(hdInterface.selectAlarmTop,{
		"siteId": _SITE_ID,
		"isFirst":1,
	}).done(function(data){
		if (data['code'] === 0) {
			// console.log(data);
			$("#"+type+"warnRuleTop5").html(`
			<tr class="title"><td>排名</td><td>原因</td><td>次数</td></tr>
			`)
			if(data.data.length==0){
				$("#"+type+"warnRuleTop5 .nodata").remove();
				$("#"+type+"warnRuleTop5").append('<tr class="nodata"><td colspan="4"><img src="../../common/image/nodata.png" class="nodateimg" style="margin-top:50px"/></td></tr>');
			} else {
				data.data.forEach(function (item, ind) {
					$("#"+type+"warnRuleTop5").append(
						`<tr class="${ind%2===0?'content1':'content2'}"><td>TOP${ind+1}</td><td>${convert(item.reason)}</td><td class="tdContent">${convert(item.total)}</td></tr>`
					);
				})
			}
		}
		removemask(type+"sec-waring-cover");
	})
	$.post(hdInterface.selectAlarmTop,{
		"siteId": _SITE_ID,
		"isFirst":0,
	}).done(function(data){
		if (data['code'] === 0) {
			$("#"+type+"warnRuleLast5").html(`
			<tr class="title"><td>排名</td><td>原因</td><td>次数</td></tr>
			`)
			if(data.data.length==0){
				$("#"+type+"warnRuleLast5 .nodata").remove();
				$("#"+type+"warnRuleLast5").append('<tr class="nodata"><td colspan="4"><img src="../../common/image/nodata.png" class="nodateimg" style="margin-top:50px"/></td></tr>');
			} else {
				data.data.forEach(function (item, ind) {
					$("#"+type+"warnRuleLast5").append(
						`<tr class="${ind%2===0?'content1':'content2'}"><td>LAST${ind+1}</td><td>${convert(item.reason)}</td><td class="tdContent">${convert(item.total)}</td></tr>`
					);
				});
			}
		}
		removemask(type+"sec-waring-cover2");
	})
}

// 信号报警统计前10名
securityStatistical.selectPlcTop = function (type) {
	$.post(hdInterface.selectPlcTop,{
		"siteId": _SITE_ID,
	}).done(function(data){
		if(data['code'] === 0){
			console.log(data);
			if(JSON.stringify(data.data) == '{}'){
				$('#'+type+"main1>.hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">
				`)
			} else{
				let dataX = data.data.dataX.split(',');
				let dataY = data.data.dataY.split(',');
				echarsComponent.getBarChars({
					"elementId":type+"main1",//容器id[必填]
					xdata:dataX,//横坐标数据[必填]
					ydata:[dataY],//纵坐标数据[必填]
					// seriesColor:['#00ffff'],//线颜色[非必填]
					// areaStyleOpacity:0.1,//区域颜色[非必填]
					interval:0,//间隔[非必填]
					// "dataZoom":{
					// 	"isScroll":true,//是否可以自动切换[非必填]
					// 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					//  },
					// "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					// "labelColor":'#a5eaff',//坐标轴文字颜色
					"xAxisFontSize":10,//横坐标文字大小[非必填]
					"units":"次",//单位
					"grid":{
						left: '20px',
						right: '20px',
						bottom: '0',
						top: '35px',
						containLabel:true,
					},//边距[非必填]
					"yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
					"provideNumber": 7,
					yAxisMinInterval:20,
					yAxisMin:0,
				});
			}
		}
	})
}
// 环境最大湿度趋势
securityStatistical.maxAmbientTemperature=function(type){
	$.get(hdInterface.maxAmbientTemperature, {
		"siteId": _SITE_ID,
	}, function (data) {
		if(data['code'] === 0){
			if(JSON.stringify(data.data) === '{}'){
				$('#'+type+'main3>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				let title = [];
				let arr = [];
				let color = ['#994427','#00FFFF','#1683FF','#FBE945','#47D195'];
				// console.log(data.data);
				for(let key in data.data){
					data.data[key] = JSON.parse(data.data[key]);
					data.data[key].data = data.data[key].data.split(',');
					if(key !== 'dataX'){
						title.push(data.data[key].name);
						arr.push(data.data[key].data);
					}
				}
				// console.log(data.data);
				echarsComponent.getLine({
					"elementId":type+"main3",//容器id	[必填]
					 xdata:data.data.dataX.data,//横坐标数据[必填]
					 ydata:arr,//纵坐标数据[必填]
					 ydataTitle:title,
					 linecolors:color,//线颜色[非必填]
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"℃",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '35px',
					  },//边距[非必填]
					  yAxisMinInterval:5,
					  // yAxisMin:0,
				});
				$('#'+type+'TemperatureLegend').html('');
				title.forEach((item,index) => {
					$('#'+type+'TemperatureLegend').append(`
						<span style="background-color:${color[index]}"></span> <em>${item}</em>
					`)
				})
			}
		}
	})
}
// 环境最大温度趋势
securityStatistical.maxAmbientHumidity=function(type){
	$.get(hdInterface.maxAmbientHumidity, {
		"siteId": _SITE_ID,
	}, function (data) {
		if(data['code'] === 0){
			if(JSON.stringify(data.data) === '{}'){
				$('#'+type+'AlarmRank1>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				let title = [];
				let arr = [];
				let color = ['#994427','#00FFFF','#1683FF','#FBE945','#47D195'];
				for(let key in data.data){
					data.data[key] = JSON.parse(data.data[key]);
					data.data[key].data = data.data[key].data.split(',');
					if(key !== 'dataX'){
						title.push(data.data[key].name);
						arr.push(data.data[key].data);
					}
				}
				// console.log(data.data);
				echarsComponent.getLine({
					"elementId":type+"AlarmRank1",//容器id	[必填]
					 xdata:data.data.dataX.data,//横坐标数据[必填]
					 ydata:arr,//纵坐标数据[必填]
					 ydataTitle:title,
					 linecolors:color,//线颜色[非必填]
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"%",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '35px',
					  },//边距[非必填]
					  yAxisMinInterval:20,
					  // yAxisMin:0,
				});
				$('#'+type+'HumidityLegend').html('');
				title.forEach((item,index) => {
					$('#'+type+'HumidityLegend').append(`
						<span style="background-color:${color[index]}"></span> <em>${item}</em>
					`)
				})
			}
		}
	})
}
// 设备最大温度趋势
securityStatistical.maxDeviceTemperature=function(type){
	$.get(hdInterface.maxDeviceTemperature, {
		"siteId": _SITE_ID,
	}, function (data) {
		if(data['code'] === 0){
			if(JSON.stringify(data.data) === '{}'){
				$('#'+type+'AlarmRank2>.hd-loadmask').html(`<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">`)
			} else {
				let title = [];
				let arr = [];
				let color = ['#994427','#00FFFF','#1683FF','#FBE945','#47D195'];
				for(let key in data.data){
					data.data[key] = JSON.parse(data.data[key]);
					data.data[key].data = data.data[key].data.split(',');
					if(key !== 'dataX'){
						title.push(data.data[key].name);
						arr.push(data.data[key].data);
					}
				}
				// console.log(data.data);
				echarsComponent.getLine({
					"elementId":type+"AlarmRank2",//容器id	[必填]
					 xdata:data.data.dataX.data,//横坐标数据[必填]
					 ydata:arr,//纵坐标数据[必填]
					 ydataTitle:title,
					 linecolors:color,//线颜色[非必填]
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"℃",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '35px',
					  },//边距[非必填]
					  yAxisMinInterval:20,
					  // yAxisMin:0,
				});
				$('#'+type+'DeviceLegend').html('')
				title.forEach((item,index) => {
					$('#'+type+'DeviceLegend').append(`
						<span style="background-color:${color[index]}"></span> <em>${item}</em>
					`)
				})
			}
		}
	})
}
// 报警统计列表
securityStatistical.deviceList = function(){
	$.post(hdInterface.selectAlarmList,{
		"siteId": _SITE_ID,
	},function(data){
		if(data['code'] === 0){
			if(data.data.length == 0){
				$('#monthdeviceRunList .hd-loadmask').html(`
				<img src="../../common/image/nodata.png" class="position50" style="width:150px;height: 100px;">
				`)
			} else {
				// console.log(data.data.length);
				var paramFault = {
					title: ['设备名称','报警类型','发生时间','报警描述','修复状态'], //列表标题
					list: [],//列表数据
					hangLie: {
						lieflag:true,//间隔列开
						lienum:'2',//间隔列 从0开始
						hangflag:true,//间隔行开
						hangnum:'1',//间隔行 从0开始
					},
					// Keyword:['过高','过低'],
					// KeywordClass:['textRed','textYellow']
				}
				data.data.forEach((item) => {
					let obj = {
						deviceName:convert(item.deviceName),
						alarmType:convert(item.alarmType),
						alarmTime:convert(item.alarmTime),
						reason:convert(item.reason),
						state:convert(item.state)=='1'?'报警':convert(item.state)=='0'?'已修复':'--',
					}
					paramFault.list.push(obj);
				})
				let fault = new listRollNew('monthdeviceRunList',paramFault);//实例化
			}
		}
	})
}
securityStatistical.changeTime=function(type){
	$("#energy-day-control>span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var datatype=$(this).attr("data-type");
		$(".sc-container2").css("opacity","0");
		$(".sc-container2").css("z-index","-1");
		$(".sc-container2."+datatype).css("opacity","1");
		$(".sc-container2."+datatype).css("z-index","1");
	});
}


window.securityStatistical = securityStatistical;
securityStatistical.init();