var energySavingStatistical = {}
var _SITE_ID = getParams()['siteId'];

var timeCode = 5;//5近30天，6近12个月
var timeCode1 = 6;//5近30天，6近12个月

var timer1 = null
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
	}
	else{
	}
});
energySavingStatistical.init = function() {
	energySavingStatistical.changeTime();
	energySavingStatistical.list('monthList',30);
	energySavingStatistical.costLine('monthCost',30);
	energySavingStatistical.electric('monthElectricTrend',30);
	energySavingStatistical.water('monthWaterTrend',30);
	energySavingStatistical.reclaimd('monthReclaimedTrend',30);
	energySavingStatistical.topList1('monthElectric',30);
	energySavingStatistical.topList2('monthWater',30);
	energySavingStatistical.topList3('monthReclaimed',30);
	
	energySavingStatistical.list('yearList',12);
	energySavingStatistical.costLine('yearCost',12);
	energySavingStatistical.electric('yearElectricTrend',12);
	energySavingStatistical.water('yearWaterTrend',12);
	energySavingStatistical.reclaimd('yearReclaimedTrend',12);
	energySavingStatistical.topList1('yearElectric',12);
	energySavingStatistical.topList2('yearWater',12);
	energySavingStatistical.topList3('yearReclaimed',12);
}
// 时间切换
energySavingStatistical.changeTime=function(type){
	$("#energy-day-control>span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var datatype=$(this).attr("data-type");
		$(".sc-container2").css("opacity","0");
		$(".sc-container2").css("z-index","-1");
		$(".sc-container2."+datatype).css("opacity","1");
		$(".sc-container2."+datatype).css("z-index","1");
	});
}
// 滚动列表 
energySavingStatistical.list = function(id,type){
	let data = [];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			data.push({
				date:item,
				electricity:(Math.random()*150+450).toFixed(2),
				water:(Math.random()*300+600).toFixed(2),
				reclaimed:(Math.random()*70+100).toFixed(2)
			})
		});
		let param = {
			title:['日期','耗电量(kW·h)','耗自来水量(m³)','耗中水量(m³)'],
			list:[],
			hangLie:{
				lieflag:true,//间隔列开
				lienum:'3',//间隔列 从0开始
				hangflag:true,//间隔行开
				hangnum:'1',//间隔行 从0开始
			},
		}
		data.forEach((item,index) => {
			param.list.push({
				date:convert(item.date),
				electricity:convert(item.electricity),
				water:convert(item.water),
				reclaimed:convert(item.reclaimed)
			})
		})
		let list = new listRollNew(id,param);
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			data.push({
				date:item,
				electricity:((Math.random()*150+450)*30).toFixed(2),
				water:((Math.random()*300+600)*30).toFixed(2),
				reclaimed:((Math.random()*70+100)*30).toFixed(2)
			})
		});
		let param = {
			title:['月份','耗电量(kW·h)','耗自来水量(m³)','耗中水量(m³)'],
			list:[],
			hangLie:{
				lieflag:true,//间隔列开
				lienum:'3',//间隔列 从0开始
				hangflag:true,//间隔行开
				hangnum:'1',//间隔行 从0开始
			},
		}
		data.forEach((item,index) => {
			param.list.push({
				date:convert(item.date),
				electricity:convert(item.electricity),
				water:convert(item.water),
				reclaimed:convert(item.reclaimed)
			})
		})
		let list = new listRollNew(id,param);
	}
	
}
// 费用曲线
energySavingStatistical.costLine = function(id,type){
	let dataY = [],
		dataY1 = [],
		dataY2 = [];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push((Math.random()*150+450).toFixed(2));
			dataY1.push((Math.random()*1700+3700).toFixed(2));
			dataY2.push((Math.random()*410+580).toFixed(2));
		});
		echarsComponent.getLine({
			elementId:id,
			xdata:dataX,
			ydata:[dataY,dataY1,dataY2],
			linecolors:['rgba(54, 208, 255, 1)','rgba(22, 143, 255, 1)','rgba(252, 234, 69, 1)'],
			unit:'元',
			// yAxisMinInterval:10,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'30px'
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			dataY.push(((Math.random()*150+450)*30).toFixed(2));
			dataY1.push(((Math.random()*1700+3700)*30).toFixed(2));
			dataY2.push(((Math.random()*410+580)*30).toFixed(2));
		});
		echarsComponent.getLine({
			elementId:id,
			xdata:dataX,
			ydata:[dataY,dataY1,dataY2],
			linecolors:['rgba(54, 208, 255, 1)','rgba(22, 143, 255, 1)','rgba(252, 234, 69, 1)'],
			unit:'元',
			// yAxisMinInterval:10,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'30px'
			}
		})
	}
	
}
// 耗电趋势图
energySavingStatistical.electric = function(id,type){
	let dataY = [];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push((Math.random()*150+450).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			dataY.push(((Math.random()*150+450)*30).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	}
}
// 自来水流量趋势图
energySavingStatistical.water = function(id,type){
	let dataY = [];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push((Math.random()*300+640).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		dataX.forEach((item,index) => {
			dataY.push(((Math.random()*300+640)*30).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	}
}
// 中水力量趋势图
energySavingStatistical.reclaimd = function(id,type){
	let dataY = [];
	if(type == 30){
		let dataX = nearlyThirtyDays(30,'.');
		dataX.forEach((item,index) => {
			dataY.push((Math.random()*70+100).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	} else {
		let dataX = nearlyTwelveMonth();
		console.log(dataX);
		dataX.forEach((item,index) => {
			dataY.push(((Math.random()*70+100)*30).toFixed(2));
		});
		echarsComponent.getLineShadow({
			elementId:id,
			xdata:dataX,
			ydata:[dataY],
			linecolors:['rgba(0, 255, 255, 1)'],
			// unit:'元',
			// yAxisMinInterval:10,
			offectTop:"rgba(0, 255, 255, 1)",
			offectMiddle:"rgba(0, 255, 255, 0.5)",
			offectBottom:"rgba(0, 255, 255, 0.1)",
			areaStyleOpacity:0.5,
			grid:{
				left:'0',
				right:'20px',
				bottom:'0',
				top:'10px'
			}
		})
	}
}

energySavingStatistical.topList1 = function (id,type) {
	let data = [
		{name: '青少年自来水给水一号泵', total: '896.54'},
		{name: '青少年自来水给水三号泵', total: '850.43'},
		{name: '火烈鸟自来水给水二号泵', total: '796.62'},
		{name: '火烈鸟自来水给水四号泵', total: '754.43'},
		{name: '青少年中水给水一号泵', total: '687.3'},
	]
	let data1 = [
		{name: '青少年自来水给水三号泵', total: '10524.5'},
		{name: '火烈鸟自来水给水四号泵', total: '9970.34'},
		{name: '火烈鸟自来水给水二号泵', total: '9430.54'},
		{name: '青少年自来水给水一号泵', total: '8674.76'},
		{name: '青少年中水给水二号泵', total: '7915.67'},
	]
	rank.processRank({
		selector:'#'+id,
		data:type == 30 ? data : data1,
		rank:'total',
		rankText:'No.'
	})
}
energySavingStatistical.topList2 = function (id,type) {
	var data = [
		{name: '温泉室外用水', total: '3752.3'},
		{name: '总站房生活用水', total: '3462'},
		{name: '泊心堂用水', total: '2996.5'},
		{name: 'CS接待中心用水', total: '2643.4'},
		{name: '动物园用水', total: '2425'},
	]
	var data1 = [
		{name: '总站房生活用水', total: '45024.6'},
		{name: '泊心堂用水', total: '42264.6'},
		{name: 'CS接待中心用水', total: '36640'},
		{name: '动物园用水', total: '32108.4'},
		{name: '酒店客房和温泉馆用水', total: '29974.3'},
	]
	rank.processRank({
		selector:'#'+id,
		data:type == 30 ? data : data1,
		rank:'total',
		rankText:'No.'
	})
}
energySavingStatistical.topList3 = function (id,type) {
	var data = [
		{name: '服务中心用水', total: '962'},
		{name: '酒店中心用水', total: '873.5'},
		{name: '宿舍二至四层用水', total: '663'},
		{name: '餐厅一层用水', total: '654'},
		{name: '餐厅二层用水', total: '599.6'},
	]
	var data1 = [
		{name: '酒店中心用水', total: '11556'},
		{name: '服务中心用水', total: '10462.6'},
		{name: '宿舍二至四层用水', total: '7999.5'},
		{name: '餐厅一层用水', total: '7728'},
		{name: '餐厅二层用水', total: '7001'},
	]
	rank.processRank({
		selector:'#'+id,
		data:type == 30 ? data : data1,
		rank:'total',
		rankText:'No.'
	})
}
window.energySavingStatistical = energySavingStatistical;
energySavingStatistical.init();
