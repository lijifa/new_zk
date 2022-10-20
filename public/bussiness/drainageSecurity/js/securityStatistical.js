var securityStatistical = {}
var _SITE_ID = getParams()['siteId'];
securityStatistical.init = function () {
	securityStatistical.changeTime();
	securityStatistical.device('monthDevice',30);
	securityStatistical.fault('monthFault',30);
	securityStatistical.faultList('monthFaultList',30);
	securityStatistical.deviceList('monthDeviceList',30);
	securityStatistical.warnTime('monthWarnTime',30);
	securityStatistical.alarmTime('monthAlarmTime',30);
	securityStatistical.warn('monthWarn',30);
	securityStatistical.alarm('monthAlarm',30);
	
	securityStatistical.device('yearDevice',12);
	securityStatistical.fault('yearFault',12);
	securityStatistical.faultList('yearFaultList',12);
	securityStatistical.deviceList('yearDeviceList',12);
	securityStatistical.warnTime('yearWarnTime',12);
	securityStatistical.alarmTime('yearAlarmTime',12);
	securityStatistical.warn('yearWarn',12);
	securityStatistical.alarm('yearAlarm',12);
}
// 设备分布
securityStatistical.device = function(id,type){
	let data = [
		{
			value:31,
			name:'通用设备'
		},
		{
			value:12,
			name:'监测设备'
		},
		{
			value:89,
			name:'传感器'
		},
	]
	echarsComponent.getPieChars({
		elementId:id,
		data:data,
		color:['rgba(22, 143, 255, 1)','rgba(72, 211, 150, 1)','rgba(0, 246, 255, 1)'],
		animation:false,
		radius:['80%','95%'],
		tooltip:{
			show:false
		},
		itemStyle:{
			normal:{
				label: {
					show: false,
				},
				labelLine:{
					show:false
				}
			}
		}
	})
}
// 告警分布
securityStatistical.fault = function(id,type){
	let data = [
		{
			value:36,
			name:'设备故障'
		},
		{
			value:112,
			name:'离线报警'
		},
		{
			value:112,
			name:'规则预警'
		},
		{
			value:112,
			name:'规则报警'
		},
	]
	echarsComponent.getPieChars({
		elementId:id,
		data:data,
		color:['rgba(22, 143, 255, 1)','rgba(72, 211, 150, 1)','rgba(0, 246, 255, 1)','rgba(252, 170, 110, 1)'],
		animation:false,
		radius:['80%','95%'],
		tooltip:{
			show:false
		},
		itemStyle:{
			normal:{
				label: {
					show: false,
				},
				labelLine:{
					show:false
				}
			}
		}
	})
}
// 给排水系统告警统计
securityStatistical.faultList = function(id,type){
	if(type == 30){
		if(json.code == 0){
			let param = {
				title:['告警原因','告警类型','发生时间','持续时长(h)','恢复状态'],
				list:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'4',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			json.data.alarm30.forEach((item,index) => {
				item.duration = item.duration == '--' ? calculateHalfHour(((new Date().getTime() - new Date(item.time).getTime())/(60*60*1000)).toFixed(1)) : item.duration;
				param.list.push({
					reason:convert(item.reason),
					type:convert(item.type),
					time:convert(item.time),
					duration:convert(item.duration),
					returnState:convert(item.returnState),
				})
			})
			let faultList = new listRollNew(id,param);
		}
	} else {
		if(json.code == 0){
			let param = {
				title:['告警原因','告警类型','发生时间','持续时长(h)','恢复状态'],
				list:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'4',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			json.data.alarm12.forEach((item,index) => {
				item.duration = item.duration == '--' ? calculateHalfHour(((new Date().getTime() - new Date(item.time).getTime())/(60*60*1000)).toFixed(1)) : item.duration;
				param.list.push({
					reason:convert(item.reason),
					type:convert(item.type),
					time:convert(item.time),
					duration:convert(item.duration),
					returnState:convert(item.returnState),
				})
			})
			let faultList = new listRollNew(id,param);
		}
	}
}
// 设备运行统计
securityStatistical.deviceList = function(id,type){
	if(type == 30){
		if(json.code == 0){
			let param = {
				title:['设备名称','安装日期','使用状态','总运行时长(h)','维保时长(月)'],
				list:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'4',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			json.data.device30.forEach((item,index) => {
				param.list.push({
					name:convert(item.name),
					date:convert(item.date),
					state:convert(item.state),
					runTime:convert(item.runTime),
					maintenanceTime:convert(item.maintenanceTime),
				})
			})
			let faultList = new listRollNew(id,param);
		}
	} else {
		if(json.code == 0){
			let param = {
				title:['设备名称','安装日期','使用状态','总运行时长(h)','维保时长(月)'],
				list:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'4',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			json.data.device12.forEach((item,index) => {
				param.list.push({
					name:convert(item.name),
					date:convert(item.date),
					state:convert(item.state),
					runTime:convert(item.runTime),
					maintenanceTime:convert(item.maintenanceTime),
				})
			})
			let faultList = new listRollNew(id,param);
		}
	}
}
// 平均报警恢复时间
securityStatistical.warnTime = function(id,type){
	let dataY = [];
	let arr = [0,30,47,120,0,0,240,62,0,0,140,157,0,0,0,0,47,0,140,17,0,0,0,0,0,0,0,185,0,123,0];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push(arr[Math.round(Math.random()*30)]);
		})
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			yAxisMinInterval:20,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:"0px",
				bottom:'0',
				right:"20px",
				top:"10px"
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			dataY.push(arr[Math.round(Math.random()*30)]);
		})
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:"0px",
				bottom:'0',
				right:"20px",
				top:"10px"
			}
		})
	}
	
}
// 平均预警恢复时间
securityStatistical.alarmTime = function(id,type){
	let dataY = [];
	let arr = [0,30,47,120,0,0,240,62,0,0,140,157,0,0,0,0,47,0,140,17,0,0,0,0,0,0,0,185,0,123,0];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push(arr[Math.round(Math.random()*30)]);
		})
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:"0px",
				bottom:'0',
				right:"20px",
				top:"10px"
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			dataY.push(arr[Math.round(Math.random()*30)]);
		})
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:"0px",
				bottom:'0',
				right:"20px",
				top:"10px"
			}
		})
	}
	
}
// 报警前5名
securityStatistical.warn = function(id,type){
	let data = [
		{name:"火烈鸟中水给水泵一号故障",total:"6"},
		{name:"动物园漏损报警",total:"5"},
		{name:"东果园自来水水表离线",total:"3"},
		{name:"青少年自来水Cl离子超标",total:"1"},
		{name:"火烈鸟自来水泵房排水泵二号故障",total:"1"},
	]
	let data1 = [
		{name:"火烈鸟自来水给水泵四号离线",total:"17"},
		{name:"火烈鸟中水给水泵一号故障",total:"15"},
		{name:"动物园漏损报警",total:"11"},
		{name:"光合谷防汛报警",total:"9"},
		{name:"总站点生活用水水表离线",total:"7"},
	]
	rank.stackRank({
		selector:'#'+id,
		data:type == 30 ? data : data1,
		title:['排名','报警规则','次数'],
		rank:'total',
		rankText:'TOP'
	})
}
// 预警前5名
securityStatistical.alarm = function(id,type){
	let data = [
		{name:"总站点生活用水异常",total:"9"},
		{name:"动物园自来水用水异常",total:"6"},
		{name:"光合谷汛情预警",total:"1"},
		{name:"隐形广场自来水用水异常",total:"1"},
		{name:"和雅自来水用水异常",total:"1"},
	]
	let data1 = [
		{name:"动物园自来水用水异常",total:"21"},
		{name:"总站点生活用水异常",total:"10"},
		{name:"光合谷汛情预警",total:"8"},
		{name:"泊心堂自来水用水异常",total:"6"},
		{name:"市政绿化用水异常",total:"3"},
	]
	rank.stackRank({
		selector:'#'+id,
		data:type == 30 ? data : data1,
		title:['排名','预警规则','次数'],
		rank:'total',
		rankText:'TOP'
	})
}
//时间切换
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