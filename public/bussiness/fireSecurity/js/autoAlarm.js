var autoalarm = {}
autoalarm.init = function() {
	autoalarm.equipmentFault();
	autoalarm.hiddenTrouble();
	autoalarm.loadlist();
	if(autoalarm.fireList.length !== 0){
		autoalarm.popups();
	}
	// autoalarm.popups();
}
//当月设备故障前五名
autoalarm.equipmentFault = function() {
	$("#COPtemperature .hd-loadmask").hide();
	echarsComponent.getBarChars({
		"elementId": "mainCOP", //容器id	[必填]				
		"xdata": ["A08 164消火栓按钮", "A08 147消火栓按钮", "A08 058消火栓按钮", "A08 127消火栓按钮", "A09 015信号阀"], //横坐标数据[必填]
		"ydata": [
			[27, 24, 16, 08, 06]
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
			bottom: '10px',
			top: '25px',
		},
		"yAxisMin": 0, //y轴最小刻度默认为数据中最小值[非必填]
		yAxisMinInterval:5,
		provideNumber:7
	});
}
//当月隐患类型汇总
autoalarm.hiddenTrouble = function() {
	$(".jfsqzt .hd-loadmask").hide();
	echarsComponent.getBarChars({
		"elementId": "hiddenTrouble", //容器id	[必填]				
		"xdata": ["火灾报警", "误报", "设备故障", "设备离线", "设备监管", "断线/短路","电源故障","其他"], //横坐标数据[必填]
		"ydata": [
			[6, 4, 16, 8, 6, 7,15,8]
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
			bottom: '10px',
			top: '25px',
		},
		"yAxisMin": 0, //y轴最小刻度默认为数据中最小值[非必填]
		yAxisMinInterval:5,
		provideNumber:6
	});
}
//设备故障详情
autoalarm.loadlist = function() {
	var result = {
		"msg": "成功",
		"code": 0,
		"data": [
			{
				"addressnumber":"A08 106",
				"plate": "水流指示",
				"address": "商业3层A617号",
				"faulttime":changeTimeDate(1)+" 15:30:19",
				"state": "1"
			},
			{
				"addressnumber":"A05 164",
				"plate": "消火栓按钮",
				"address": "商业1层A603号",
				"faulttime":changeTimeDate(2)+" 09:20:16",
				"state": "1"
			},
			{
				"addressnumber":"A08 188",
				"plate": "信号阀",
				"address": "商业2层A605号",
				"faulttime":changeTimeDate(2)+" 09:35:60",
				"state": "1"
			},
			{
				"addressnumber":"A09 056",
				"plate": "消火栓按钮",
				"address": "商业1层A605号",
				"faulttime":changeTimeDate(2)+" 20:19:20",
				"state": "1"
			},
			{
				"addressnumber":"A08 015",
				"plate": "信号阀",
				"address": "商业3层A511号",
				"faulttime":changeTimeDate(3)+" 05:34:51",
				"state": "1"
			},
			{
				"addressnumber":"A09 142",
				"plate": "信号阀",
				"address": "商业3层A604号",
				"faulttime":changeTimeDate(3)+" 14:49:21",
				"state": "1"
			},
			{
				"addressnumber":"A07 091",
				"plate": "消火栓按钮",
				"address": "商业2层A513号",
				"faulttime":changeTimeDate(4)+" 02:50:10",
				"state": "1"
			},
			{
				"addressnumber":"A08 182",
				"plate": "水流指示",
				"address": "商业3层A609号",
				"faulttime":changeTimeDate(4)+" 03:05:50",
				"state": "1"
			},
			{
				"addressnumber":"A03 132",
				"plate": "信号阀",
				"address": "商业1层A615号",
				"faulttime":changeTimeDate(4)+" 05:10:09",
				"state": "1"
			},
			{
				"addressnumber":"A06 060",
				"plate": "消火栓按钮",
				"address": "商业2层A506号",
				"faulttime":changeTimeDate(4)+" 12:09:05",
				"state": "1"
			},
			{
				"addressnumber":"A07 069",
				"plate": "消火栓按钮",
				"address": "商业2层A525号",
				"faulttime":changeTimeDate(4)+" 18:50:16",
				"state": "1"
			},
			{
				"addressnumber":"A08 037",
				"plate": "消火栓按钮",
				"address": "商业2层A523号",
				"faulttime":changeTimeDate(5)+" 17:03:37",
				"state": "1"
			},
			{
				"addressnumber":"A08 046",
				"plate": "水流指示",
				"address": "商业2层A509号",
				"faulttime":changeTimeDate(6)+" 07:17:23",
				"state": "1"
			},
		]
	}
	var param1 = {
		vis: '7', //可视数
		title: ['地址编号', '设备名称', '所在位置', '故障时间', '是否在线'], //列表标题
		list: [], //列表数据
		stateItem: ['state', 'fault'], //图标标志列
		changeFlag: ['fault'], //0 1互换标志数组
		hangLie: {
			lieflag: true, //间隔列开
			lienum: '5', //间隔列 从0开始
			hangflag: true, //间隔行开
			hangnum: '1', //间隔行 从0开始
		}
	}
	var deviceStatusList = result.data || [];
	param1.list = []
	var warnLightflag = false
	deviceStatusList.forEach((item, index) => {
		// if (item.fault == '1') {
		// 	warnLightflag = true
		// } else {}
		// if (warnLightflag) {
		// 	$("#warnLight").attr("src", "./image/red.mp4");
		// } else {
		// 	$("#warnLight").attr("src", "./image/green.mp4")
		// }
		var obj = {
			addressnumber:"<em style='display:inline-block;width:20px;text-align:center;'>"+(index+1)+"</em>"+convert(item.addressnumber),
			plate: convert(item.plate), //名称
			address:convert(item.address),
			faulttime:convert(item.faulttime),
			state: convert(item.state), //启停状态
			
			// plate: convert(item.plate), //名称
			// frequency: convert(item.frequency), //频率
			// state: convert(item.state), //启停状态
			// automatically: convert(item.automatically), //手自动
			// fault: convert(item.fault) //故障状态
		}
		param1.list.push(obj)
	})
	obj1 = new listRoll('equipmentstatuscover', param1); //实例化
}
// 弹窗
let _fire_list = JSON.parse(localStorage.getItem('_fire_list'));
console.log(_fire_list);
autoalarm.fireList = [];
for(let key in _fire_list.fireFault){
	let obj = {
		name:'火警',
		site:_fire_list.fireFault[key]['site'],
		time:_fire_list.fireFault[key]['time'],
	}
	autoalarm.fireList.push(obj);
}
autoalarm.popups = function(){
	$('#fireTotal').html(autoalarm.fireList.length);
	let pop = new popUps({
		selector:'.pop',
		offsetLeft:-390,
		offsetTop:10,
		hoverDom:'#alarm',
		fun:function(e){
			let params = {
				title:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'2',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
				list:[
					// {name:'火警报警',time:'2021-05-20 13:10:24',site:'商业2层A605号'},
					// {name:'火警报警',time:'2021-04-20 09:23:47',site:'塔楼B8层804号'},
					// {name:'火警报警',time:'2021-04-19 12:09:30',site:'商业负1层报警阀室'},
				]
			}
			params.list = autoalarm.fireList;
			let list = new listRollNew('list',params);
		}
	})
}
autoalarm.init();
window.autoalarm = autoalarm;
