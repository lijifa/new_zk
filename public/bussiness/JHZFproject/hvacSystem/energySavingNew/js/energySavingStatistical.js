var energySavingStatistical = {}
var _SITE_ID = getParams()['siteId'];

var timeCode = 5;//5近30天，6近12个月
var timeCode1 = 6;//5近30天，6近12个月

var timer1 = null
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
		 // clearInterval(timer1)
		 // console.log('离开')
	}
	else{
		// energySavingStatistical.init()
		// console.log('回来')
	}
});
energySavingStatistical.init = function() {
	energySavingStatistical.changeTime()
	energySavingStatistical.statistics12()
	energySavingStatistical.statistics30()
	// $('.top_Y').on('click',function(){
	// 	timeCode = 6
	// 	energySavingStatistical.statistics()
	// 	// console.log(6)
	// })
	// $('.top_M').on('click',function(){
	// 	timeCode = 5
	// 	energySavingStatistical.statistics()
	// 	// console.log(5)
	// })
	// $(window).on('resize',function(){
	// 	energySavingStatistical.statistics()
	// })
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
// 能耗监控30天
energySavingStatistical.statistics30 = function() {
	//能耗总计
	$.post(hdInterface.AllenergyStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#electric').html(convert(data.data.electric))//电能耗
			$('#water').html(convert(data.data.water))//水能耗
			$('#gas').html(convert(data.data.gas))//天然气能耗
			$('#energy').html(convert(data.data.energy))//冷热总能耗
		}
	})
	//能耗总计表格
	$.post(hdInterface.AllenergyListModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			if(data.data.length == 0){
				$('#ul-statistics .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="iconimg" style="top: 60%;width: 150px;height: 100px;transform: translate(-40%);">`)
			}else{
				var param = {
					vis:'10',//可视数
					// title: ['日期', '室外温度℃', '室外湿度%', '电能耗kW·h', '水能耗m³', '燃气能耗m³', '冷热总能耗cal'], //列表标题
					title: ['日期', '室外温度℃', '室外相对湿度%', '耗电量kW·h', '耗水量m³', '耗气量Nm³', '耗冷（热）量GJ'], //列表标题
					list: [],//列表数据
					// stateItem: [],//图标标志列
					// changeFlag: [],//0 1互换标志数组
					style: {
						lineHeight:'40',// 行高
						titleHeight:'40',//标题高度
						titleSize:'14',//标题字体大小
						fontSize:'14',//字体大小
						iconSize:'16',//图标大小
						iconText:false,//图标文字
					},
				}
				data['data'].forEach((item,index)=>{
					var obj = {
						date:convert(item.date),//日期
						temperature:convert(item.temperature),//室外温度℃
						humidity:convert(item.humidity),//室外湿度%
						electric:convert(item.electric),//电消耗kW·h
						water: convert(item.water),//水消耗m³
						gas: convert(item.gas),//天然气能耗m³
						energy: convert(item.energy)//冷热总能耗m³
					}
					param.list.push(obj)
				})
				let objList = new listRoll('ul-statistics',param);//实例化
			}
		}
	})
	//能耗均值
	$.post(hdInterface.energyAvgStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#avgTemperature').html(convert(data.data.temperature))//平均温度
			$('#avgHumidity').html(convert(data.data.humidity))//平均湿度
			$('#avgElectric').html(convert(data.data.electric))//电能耗
			$('#avgWater').html(convert(data.data.water))//水能耗
			$('#avgGas').html(convert(data.data.gas))//天然气能耗
			$('#avgEnergy').html(convert(data.data.energy))//冷热总能耗
		}
	})
	// 设备耗电排行
	$.post(hdInterface.deviceElectricRankModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(data.data.length === 0){
				$('#main_top').attr('style','position: relative;')
				$('#main_top .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}else{
				var list = []
				data.data.forEach((item,index)=>{
					var obj = {
						name: convert(item.plate), 
						electric: convert(item.electric),
					}
					list.push(obj)
				})
				energySavingStatistical.topList('main_top',list,'electric')
			}
		}
	})
	// 耗电量变化趋势
	$.post(hdInterface.electricChangeTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main1').attr('style','position: relative;')
				$('#main1 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main1",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 // ydataTitle:[''],
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:3,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"kW·h",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  // "offectTop":"rgba(255,0,0,1)",
					  // "offectMiddle":"rgba(0,255,0,1)",
					  // "offectBottom":"rgba(0,0,255,1)"
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	//机房COP统计
	$.post(hdInterface.selectSiteCopStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main3').attr('style','position: relative;')
				$('#main3 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataY2 = data.data.dataY2.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main3",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:3,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '25px',
					  },//边距[非必填]
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 温度变化趋势
	$.post(hdInterface.temperatureTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main2').attr('style','position: relative;')
				$('#main2 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main2",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:3,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"℃",//单位
					  "grid":{
						  left: '25px',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 能耗统计
	$.post(hdInterface.energyAllSumTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main4').attr('style','position: relative;')
				$('#main4 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main4",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:3,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"标准煤(kgce)",//单位
					  // yAxisMinInterval:20,
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  "padding":[0, 0, -10, 5],
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 节能率和节费率趋势
	$.post(hdInterface.energySavingSectionFeeTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main5').attr('style','position: relative;')
				$('#main5').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataY2 = data.data.dataY2.split(',')
				echarsComponent.getLine({
					"elementId":"main5",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY,dataY2],//纵坐标数据[必填]
					 ydataTitle:['节能率','节费率'],//提示框标题项
					 linecolors:['#168FFF','#00FFFF'],//线颜色[非必填]
					 // areaStyleOpacity:0.1,//区域颜色[非必填]
					 // interval:5,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"%",//单位
					  // yAxisMinInterval:5,
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '25px',
					  }//边距[非必填]
					  // "offectTop":"rgba(0,255,255,0.8)",
					  // "offectMiddle":"rgba(0,255,255,0.5)",
					  // "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
}

// 能耗监控12个月
energySavingStatistical.statistics12 = function() {
	//能耗总计
	$.post(hdInterface.AllenergyStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#electric1').html(convert(data.data.electric))//电能耗
			$('#water1').html(convert(data.data.water))//水能耗
			$('#gas1').html(convert(data.data.gas))//天然气能耗
			$('#energy1').html(convert(data.data.energy))//冷热总能耗
		}
	})
	//能耗总计表格
	$.post(hdInterface.AllenergyListModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			if(data.data.length == 0){
				$('#ul-statistics1 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="iconimg" style="top: 60%;width: 150px;height: 100px;transform: translate(-40%);">`)
			}else{
				var param1 = {
					vis:'10',//可视数
					// title: ['日期', '室外温度℃', '室外湿度%', '电能耗kW·h', '水能耗m³', '燃气能耗m³', '冷热总能耗cal'], //列表标题
					title: ['日期', '室外温度℃', '室外相对湿度%', '耗电量kW·h', '耗水量m³', '耗气量Nm³', '耗冷（热）量GJ'], //列表标题
					list: [],//列表数据
					// stateItem: [],//图标标志列
					// changeFlag: [],//0 1互换标志数组
					style: {
						lineHeight:'40',// 行高
						titleHeight:'40',//标题高度
						titleSize:'14',//标题字体大小
						fontSize:'14',//字体大小
						iconSize:'16',//图标大小
						iconText:false,//图标文字
					},
				}
				data['data'].forEach((item,index)=>{
					var obj = {
						date:convert(item.date),//日期
						temperature:convert(item.temperature),//室外温度℃
						humidity:convert(item.humidity),//室外湿度%
						electric:convert(item.electric),//电消耗kW·h
						water: convert(item.water),//水消耗m³
						gas: convert(item.gas),//天然气能耗m³
						energy: convert(item.energy)//冷热总能耗m³
					}
					param1.list.push(obj)
				})
				let objList1 = new listRoll('ul-statistics1',param1);//实例化
			}
		}
	})
	//能耗均值
	$.post(hdInterface.energyAvgStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			$('#avgTemperature1').html(convert(data.data.temperature))//平均温度
			$('#avgHumidity1').html(convert(data.data.humidity))//平均湿度
			$('#avgElectric1').html(convert(data.data.electric))//电能耗
			$('#avgWater1').html(convert(data.data.water))//水能耗
			$('#avgGas1').html(convert(data.data.gas))//天然气能耗
			$('#avgEnergy1').html(convert(data.data.energy))//冷热总能耗
		}
	})
	// 设备耗电排行
	$.post(hdInterface.deviceElectricRankModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(data.data.length === 0){
				$('#main_top1').attr('style','position: relative;')
				$('#main_top1 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}else{
				var list = []
				data.data.forEach((item,index)=>{
					var obj = {
						name: convert(item.plate), 
						electric: convert(item.electric),
					}
					list.push(obj)
				})
				energySavingStatistical.topList('main_top1',list,'electric')
			}
		}
	})
	// 耗电量变化趋势
	$.post(hdInterface.electricChangeTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main11').attr('style','position: relative;')
				$('#main11 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataYtemp=[]
				dataY.forEach((item,index)=>{
					dataYtemp.push((item/10000).toFixed(2));
				})
				echarsComponent.getLineShadow({
					"elementId":"main11",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataYtemp],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 // ydataTitle:[''],
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:2,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"万kW·h",//单位
					  "grid":{
						  left: '5%',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  // "offectTop":"rgba(255,0,0,1)",
					  // "offectMiddle":"rgba(0,255,0,1)",
					  // "offectBottom":"rgba(0,0,255,1)"
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	//机房COP统计
	$.post(hdInterface.selectSiteCopStaticsModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main31').attr('style','position: relative;')
				$('#main31 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataY2 = data.data.dataY2.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main31",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00FFFF'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:2,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '25px',
					  },//边距[非必填]
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 温度变化趋势
	$.post(hdInterface.temperatureTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main21').attr('style','position: relative;')
				$('#main21 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				echarsComponent.getLineShadow({
					"elementId":"main21",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY],//纵坐标数据[必填]
					 linecolors:['#00ffff'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:2,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"℃",//单位
					  "grid":{
						  left: '25px',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 能耗统计
	$.post(hdInterface.energyAllSumTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main41').attr('style','position: relative;')
				$('#main41 .hd-loadmask').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataYtemp=[]
				dataY.forEach((item,index)=>{
					dataYtemp.push((item/10000).toFixed(2))
				})
				echarsComponent.getLineShadow({
					"elementId":"main41",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataYtemp],//纵坐标数据[必填]
					 linecolors:['#00ffff'],//线颜色[非必填]
					 areaStyleOpacity:0.5,//区域颜色[非必填]
					 // interval:2,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"标准煤(tce)",//单位
					  // yAxisMinInterval:20,
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '0%',
						  top: '25px',
					  },//边距[非必填]
					  "padding":[0, 0, -10, 25],
					  "offectTop":"rgba(0,255,255,0.8)",
					  "offectMiddle":"rgba(0,255,255,0.5)",
					  "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
	// 节能率和节费率趋势
	$.post(hdInterface.energySavingSectionFeeTrendModule, {
		'siteId': _SITE_ID,
		'timeCode': timeCode1
	}, function(data) {
		if (data['code'] === 0) {
			// console.log(data)
			if(JSON.stringify(data.data) == '{}'){
				$('#main51').attr('style','position: relative;')
				$('#main51').html(`<img src="../../../../common/image/nodata.png" class="imagePo">`)
			}
			else{
				var dataX = data.data.dataX.split(',')
				var dataY = data.data.dataY.split(',')
				var dataY2 = data.data.dataY2.split(',')
				echarsComponent.getLine({
					"elementId":"main51",//容器id	[必填]
					 xdata:dataX,//横坐标数据[必填]
					 ydata:[dataY,dataY2],//纵坐标数据[必填]
					 ydataTitle:['节能率','节费率'],//提示框标题项
					 linecolors:['#168FFF','#00FFFF'],//线颜色[非必填]
					 // areaStyleOpacity:0.1,//区域颜色[非必填]
					 // interval:2,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  "unit":"%",//单位
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '5px',
						  top: '25px',
					  }//边距[非必填]
					  // "offectTop":"rgba(0,255,255,0.8)",
					  // "offectMiddle":"rgba(0,255,255,0.5)",
					  // "offectBottom":"rgba(0,255,255,0.1)"
				})
			}
		}
	})
}

var data = [
	{name: '设备名称', electric: '4158'},
	{name: '锅炉循环泵一号', electric: '4236'},
	{name: '设备名称', electric: '1098'},
	{name: '设备名称', electric: '1237'},
	{name: '离心式制冷机一号', electric: '7057'},
]
energySavingStatistical.topList = function (selector,data,electric) {
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
		var width = (item.electric/maxElectric)*100
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
window.energySavingStatistical = energySavingStatistical;
energySavingStatistical.init();

