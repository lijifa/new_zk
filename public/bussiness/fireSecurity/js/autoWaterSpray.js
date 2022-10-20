var autoWaterSpray = {}
autoWaterSpray.init = function() {
	autoWaterSpray.pressureMonitoring();
	autoWaterSpray.equipmentFault();
	autoWaterSpray.getwaringtypechars();
	autoWaterSpray.popups();
	autoWaterSpray.timeChange();
}
//当天喷淋管网压力监测
function time (){
	let timer = new Date()
	let H = timer.getHours();
	let timerArr = []
	for(var i = 0; i <= H; i++){
		timerArr.push(i < 10 ? '0' + i + ':00' : i + ':00');
	}
	return timerArr;
}
autoWaterSpray.pressureMonitoring = function() {
	$(".jfsqzt .hd-loadmask").hide();
	let dataX = time();
	let dataY = [];
	dataX.forEach((item) => {
		dataY.push((Math.random()*0.016+0.054).toFixed(2));
	})
	echarsComponent.getLineShadow({
		"elementId": "pressureMonitoring", //容器id	[必填]
		xdata: dataX, //横坐标数据[必填]
		ydata: [dataY], //纵坐标数据[必填]
		// ydataTitle:title,//提示框标题项
		linecolors: ['#00FFFF'], //线颜色[非必填]
		areaStyleOpacity: 0.5, //区域颜色[渐变色必填]
		"unit": "Mpa", //单位
		"grid": {
			left: '20px',
			right: '20px',
			bottom: '5px',
			top: '25px',
			containLabel: true,
		}, //边距[非必填]
		yAxisMin:0,
		yAxisMinInterval:0.02,
		"offectTop": "rgba(0, 255, 255, 1)",
		"offectMiddle": "rgba(0, 255, 255, 0.5)",
		"offectBottom": "rgba(0, 255, 255, 0.2)",
	})
}
//当月设备故障前五名
autoWaterSpray.equipmentFault = function() {
	$("#COPtemperature .hd-loadmask").hide();
	echarsComponent.getBarChars({
		"elementId": "mainCOP", //容器id	[必填]				
		"xdata": ["P05 153立式洒水喷头", "P04 162立式洒水喷头", "P05 093立式洒水喷头", "B01 103湿式报警阀", "C05 035末端试水装置"], //横坐标数据[必填]
		"ydata": [
			[29, 25, 23, 18, 16]
		], //纵坐标数据[必填]
		"seriesColor": [], //图表颜色[非必填]
		"units": "次", //单位[非必填]
		// "showCount":true,//是否显示顶部数字 bool[非必填]
		// "labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
		"lineColor": "rgba(10,148,255,0.3)", //图表里面线颜色[非必填]
		// "dataZoom":{
		//  	"isScroll":true,//是否可以自动切换[非必填]
		//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
		//  },
		"interval": 0, //设置所有x轴标签间隔显示为0（所有都显示）[非必填]
		"xAxisFontSize": 10, //横坐标文字大小[非必填]
		"barWidth": 12, //图表宽度
		"colorGradient": [{
			"startColor": "rgba(22, 143, 255, 0.2)",
			"endColor": "rgba(0, 255, 255, 1)"
		}], //渐变颜色
		"grid": {
			left: '20px',
			right: '20px',
			bottom: '5px',
			top: '25px',
		},
		yAxisMin:0,
		yAxisMinInterval:5,
		provideNumber:7
	});
}
//当月报警类型分布图表
autoWaterSpray.getwaringtypechars=function(){
	var color=['#1683FF', '#48D396', '#00FFFF'];
	
		echarsComponent.getPieChars({
		"elementId": "waringtypechars", //容器id	[必填]
		"data": [6,32,10], //数据[必填]
		"color":color, //圆环颜色[非必填]
		"radius": ['90%', '100%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小[非必填]
		"center": ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置[非必填]
		"animation":false,//是否关闭鼠标放大，false不关 true 关[非必填]
		"tooltip": {
			trigger: 'item',
			formatter: "{b} :{d}%",
			show:false
		},//提示标签 formatter 中a代表数据中的name b代表value d% 代表百分比
		"itemStyle": {
			normal: {
				label: {
					show: false,
					formatter: '{b} : {c} ({d}%)'
				},
				labelLine: {
					show: false
				}
			}
		}//线和文字 formatter 中a代表数据中的name b代表value d% 代表百分比
	
	});
}
// 弹窗
autoWaterSpray.popups = function(){
	let pop = new popUps({
		selector:'.pop',
		offsetLeft:-390,
		offsetTop:10,
		hoverDom:'#alarm'
	})
}

// 上次巡检时间
autoWaterSpray.timeChange = function(){
	let date = new Date();
	let M = date.getMonth() + 1;
	M = M < 10 ? '0'+ M + '.01 08:00' : M + '.01 08:00';
	$('#timeChange').html(M);
}

autoWaterSpray.init();
window.autoWaterSpray = autoWaterSpray;
