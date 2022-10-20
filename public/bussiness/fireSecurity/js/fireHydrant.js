var fireHydrant = {}
fireHydrant.init = function() {
	fireHydrant.hiddenTrouble();
	fireHydrant.equipmentFault();
	fireHydrant.loadlist();
	fireHydrant.hazardTypeEchars();
	fireHydrant.popups();
}
//当月隐患类型汇总
function time (){
	let timer = new Date()
	let H = timer.getHours();
	let timerArr = []
	for(var i = 0; i <= H; i++){
		timerArr.push(i < 10 ? '0' + i + ':00' : i + ':00');
	}
	return timerArr;
}
fireHydrant.hiddenTrouble = function() {
	$(".jfsqzt .hd-loadmask").hide();
	let dataX = time();
	let dataY = [];
	dataX.forEach((item) => {
		dataY.push((Math.random()*0.02+0.27).toFixed(2));
	})
	echarsComponent.getLineShadow({
		"elementId": "waterlevel0", //容器id	[必填]
		xdata: dataX, //横坐标数据[必填]
		ydata: [dataY], //纵坐标数据[必填]
		// ydataTitle:title,//提示框标题项
		linecolors: ['#00FFFF'], //线颜色[非必填]
		areaStyleOpacity: 0.5, //区域颜色[渐变色必填]
		"unit": "m", //单位
		"grid": {
			left: '20px',
			right: '20px',
			bottom: '0',
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
fireHydrant.equipmentFault = function() {
	$("#COPtemperature .hd-loadmask").hide();
	echarsComponent.getBarChars({
		"elementId": "mainCOP", //容器id	[必填]				
		"xdata": ["C02 161消火栓按钮", "C02 132消火栓按钮", "C02 082消火栓按钮", "C02 125消火栓按钮", "C06 017信号阀",], //横坐标数据[必填]
		"ydata": [
			[28, 24, 18, 16, 7]
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
		// "interval": 0, //设置所有x轴标签间隔显示为0（所有都显示）[非必填]
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

//设备故障详情
fireHydrant.loadlist = function() {
	var result = {
		"msg": "成功",
		"code": 0,
		"data": [
			{
				"plate": "C02 045信号阀",
				"address": "商业3层A705号",
				"faulttime":changeTimeDate(1)+" 09:20:37",
			},
			{
				"plate": "C02 139消火栓按钮",
				"address": "商业2层A605号",
				"faulttime":changeTimeDate(2)+" 11:16:21",
			},
			{
				"plate": "C04 162水流指示器",
				"address": "商业1层A501号",
				"faulttime":changeTimeDate(2)+" 14:35:54",
			},
			{
				"plate": "C02 092消火栓按钮",
				"address": "商业2层B105号",
				"faulttime":changeTimeDate(3)+" 08:41:23",
			},
			{
				"plate": "C02 045消火栓按钮",
				"address": "商业3层B305号",
				"faulttime":changeTimeDate(3)+" 09:36:24",
			},
			{
				"plate": "C04 102水流指示器",
				"address": "商业3层B507号",
				"faulttime":changeTimeDate(3)+" 12:26:55",
			},
			{
				"plate": "C02 132消火栓按钮",
				"address": "塔楼B7层B103",
				"faulttime":changeTimeDate(3)+" 15:24:12",
			},
			{
				"plate": "C04 101水流指示器",
				"address": "商业1层A605号",
				"faulttime":changeTimeDate(3)+" 15:49:34",
			},
			{
				"plate": "C02 152消火栓按钮",
				"address": "商业负1层报警阀室",
				"faulttime":changeTimeDate(4)+" 11:00:24",
			},
			{
				"plate": "C06 017信号阀",
				"address": "商业2层A305号",
				"faulttime":changeTimeDate(5)+" 03:34:15",
			},
			{
				"plate": "C02 182消火栓按钮",
				"address": "商业3层A503号",
				"faulttime":changeTimeDate(1)+" 09:15:35",
			},
		]
	}
	let params = {
		title:['设备名称', '所在位置', '故障时间'],
		list:[
			// {name:'消火栓启动',site:'商业塔楼A5层楼梯间',time:'05-20 12:05:17'},
			// {name:'水压过低',site:'试验消火栓压力过低',time:'05-19 10:34:24'},
		]
	}
	params.list = result.data;
	let obj1 = new listRollNew('equipmentstatuscover',params);
}
//当月隐患类型占比
fireHydrant.hazardTypeEchars=function(){
	
	echarsComponent.getCircleChars({
		"elementId":"equfaultechars",//容器id	[必填]
		"value":74,//百分比值[必填]
		// "startColor":'#4DF2AA',//开始时候颜色[非必填]
		// "endColor":'#36D0FF',//结束时候颜色	[非必填]
		"fontSize":"16",//中间文字大小[非必填]
		"fontColor":"#00FFFF",//中间文字颜色[非必填]
	});
	echarsComponent.getCircleChars({
		"elementId":"pressurechars",//容器id	[必填]
		"value":8,//百分比值[必填]
		// "startColor":'#4DF2AA',//开始时候颜色[非必填]
		// "endColor":'#36D0FF',//结束时候颜色	[非必填]
		"fontSize":"16",//中间文字大小[非必填]
		"fontColor":"#00FFFF",//中间文字颜色[非必填]
	});
	echarsComponent.getCircleChars({
		"elementId":"otherechars",//容器id	[必填]
		"value":18,//百分比值[必填]
		// "startColor":'#4DF2AA',//开始时候颜色[非必填]
		// "endColor":'#36D0FF',//结束时候颜色	[非必填]
		"fontSize":"16",//中间文字大小[非必填]
		"fontColor":"#00FFFF",//中间文字颜色[非必填]
	});
	
}
// 弹窗
fireHydrant.popups = function(){
	let pop = new popUps({
		selector:'.pop',
		offsetLeft:-390,
		offsetTop:10,
		hoverDom:'#alarm',
		fun:function(e){
			let params = {
				title:[],
				list:[
					{name:'水压过低',site:'商业3层楼梯间',time:changeTimeDate(2)+' 10:34:24'},
					{name:'消火栓启动',site:'商业塔楼A5层楼梯间',time:changeTimeDate(1)+' 08:05:17'},
				],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'2',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			let list = new listRollNew('list',params);
		}
	})
}
fireHydrant.init();
window.fireHydrant = fireHydrant;



