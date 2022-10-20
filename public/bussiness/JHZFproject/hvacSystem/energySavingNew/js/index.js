var energySavingIndex = {};
var _SITE_ID = getParams()['siteId'];
var projectId=getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var params = {
	'siteId': _SITE_ID
};
var timer = null,timer1 = null;
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
		 clearInterval(timer)
		 // console.log('离开')
	}
	else{
		energySavingIndex.fiveMinutesUpdate();
		// energySavingIndex.init();
		// console.log('回来')
	}
});
energySavingIndex.init = function () {
	// if(sitename){
	// 	$("#innerheader").attr("data-title", decodeURI(sitename));
	// }
	energySavingIndex.loadEnergyDay();//当日能耗变化图表
	energySavingIndex.loadEnergyMonth();//当月节能变化
	energySavingIndex.loadselectTemperatureAndHumidity();//室外温湿度
	energySavingIndex.loadCurrentDayEnergyCost();//当日能耗费用
	energySavingIndex.loadenergyStatics();//当日分项能耗
	energySavingIndex.loadCop();//实时cop
	energySavingIndex.loadenergySavingCurrentYear();//当年节能量
	energySavingIndex.loadcurrentYearEnergyCostDetails();//某年实际能耗费用详情
	energySavingIndex.loadlastYearEverySquareMetreEnergyCost();//去年每平米能耗费用
	energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis();//实时能效分析
	//整点刷新
	// refreshHour(function(){
	// 	console.log('整点')
	// 	energySavingIndex.loadselectTemperatureAndHumidity();//室外温湿度
	// 	energySavingIndex.loadCurrentDayEnergyCost();//当日能耗费用
	// 	energySavingIndex.loadenergyStatics();//当日分项能耗
	// 	energySavingIndex.loadCop();//实时cop
	// 	energySavingIndex.loadlastYearEverySquareMetreEnergyCost();//去年每平米能耗费用
	// 	energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis();//实时能效分析
	// 	energySavingIndex.loadEnergyDay();//当日能耗变化图表
	// })
	// 五分钟刷新
	energySavingIndex.fiveMinutesUpdate();
};
energySavingIndex.fiveMinutesUpdate = function(){
	// console.log('开启五分钟轮询');
	timer=setInterval(function(){
		// console.log('五分钟');
		energySavingIndex.loadselectTemperatureAndHumidity();//室外温湿度
		energySavingIndex.loadCurrentDayEnergyCost();//当日能耗费用
		energySavingIndex.loadenergyStatics();//当日分项能耗
		energySavingIndex.loadCop();//实时cop
		energySavingIndex.loadlastYearEverySquareMetreEnergyCost();//去年每平米能耗费用
		energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis();//实时能效分析
		energySavingIndex.loadEnergyDay();//当日能耗变化图表
	},5*60*1000)
}

//室外温湿度
energySavingIndex.loadselectTemperatureAndHumidity=function(){
	$.post(hdInterface.selectTemperatureAndHumidity, {
		"siteId":_SITE_ID,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				Object.keys(data).forEach(function(item){
					var dom=$("#"+item);
					dom.html(convert(data[item]));
				});
			}
	});
}
//当日能耗费用
energySavingIndex.loadCurrentDayEnergyCost=function(){
	//timeCode 0当日1当月
	$.post(hdInterface.selectEnergyCostStatics, {
		"siteId":_SITE_ID,
		"timeCode":0,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				var dayenergyCost=data["energyCost"],
				    daycostQuota=data["costQuota"];
					if(dayenergyCost>daycostQuota){
						$("#dayenergyCostpardiv").addClass("yellow3_pub");
					}else{
						$("#dayenergyCostpardiv").removeClass("yellow3_pub");
					}
				Object.keys(data).forEach(function(item){
					var dom=$("#day"+item);
					dom.html(convert(data[item]));
				});
			}
	});
	
}
//当日分项能耗
energySavingIndex.loadenergyStatics=function(){
	$.post(hdInterface.AllenergyStaticsModule, {
		"siteId":_SITE_ID,
		"timeCode":0,
		}).done(function(res) {
			console.log(res)
			if(res.code==0){
				var data=res.data||{};
				Object.keys(data).forEach(function(item){
					var dom=$("#energy"+item);
					dom.html(convert(data[item]));
				});
			}
	});
}
//cop
energySavingIndex.loadCop=function(){
	$.post(hdInterface.selectSiteCopStatics, {
		"siteId":_SITE_ID,
		"timeCode":0,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				var dataX=data.dataX.split(",");
				var datay=data.dataY.split(",");
				var datay2=data.dataY2.split(",");
				var dataXTime=[];
				dataX.forEach(function(item){
					dataXTime.push(item+":00");
				})
				echarsComponent.getLine({
					"elementId":"main",//容器id	[必填]
					 xdata:dataXTime,//横坐标数据[必填]
					 ydata:[datay,datay2],//纵坐标数据[必填]
					 linecolors:['rgba(0, 255, 255, 1)','#994427'],//线颜色[非必填]
					 areaStyleOpacity:0,//区域颜色[非必填]
					 // interval:4,//间隔[非必填]
					 // "dataZoom":{
					 // 	"isScroll":true,//是否可以自动切换[非必填]
					 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
					 //  },
					  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
					  // "labelColor":'#a5eaff',//坐标轴文字颜色
					  // "unit":"℃",//单位
					  ydataTitle:['COP','标准值'],
					  yAxisMin:0,
					  yAxisMinInterval:1,
					  "grid":{
						  left: '3%',
						  right: '4%',
						  bottom: '0px',
						  top: '4%',
					  }//边距[非必填]
				});
			}
		$("#copdiv .hd-loadmask").hide();
	});
	
}
//当年节能量
energySavingIndex.loadenergySavingCurrentYear=function(){
	$.post(hdInterface.energySavingCurrentYear, {
		"siteId":_SITE_ID,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				var energySaving=parseInt(data["energySaving"]);
				if(energySaving=='0'){
					$("#energySaving").html(energySaving);
				}else{
					loadnum1(energySaving);
				}
				$("#energySectionRate").html(convert(data["energySectionRate"]));
				$("#energySavingRate").html(convert(data["energySavingRate"]));
			}
	});
}
// 某年实际能耗费用详情 
energySavingIndex.loadcurrentYearEnergyCostDetails=function(){
	$.post(hdInterface.currentYearEnergyCostDetails, {
		"siteId":_SITE_ID,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				var str="";
				$("#thisyear").html(convert(data[0].year));
				data.forEach(function(item,index){
					var status=item.status;
					if(status=="1"){
						str+=`<li class="has">${item.detail}</li>`;
					}else{
						str+=`<li>${item.detail}</li>`;
					}
					
				})
				$("#bottombarUl").html(str);
			}
	});
}
//去年每平米能耗费用
energySavingIndex.loadlastYearEverySquareMetreEnergyCost=function(){
	$.post(hdInterface.lastYearEverySquareMetreEnergyCost, {
		"siteId":_SITE_ID,
		}).done(function(res) {
			if(res.code==0){
				var data=res.data||{};
				$(".lastYear").html(convert(data['lastYear']));
				Object.keys(data).forEach(function(item){
					var dom=$("#"+item);
					dom.html(convert(data[item]));
				});
			}
	});
}

//当日能耗变化图表
energySavingIndex.loadEnergyDay=function(){
	var clickindex=1;
	setInterval(function(){
		$("#energy-day-control span").eq(clickindex).click();
		clickindex++;
		if(clickindex>1){clickindex=0}
	},1000*30);
	$("#energy-day-control span").click(function(){
		$(this).addClass("on").siblings("span").removeClass("on");
		var type=$(this).attr("data-type");
		switch (type){
			case 'electricity'://电
				// $(".energy-day-cont-bg").css("opacity","1");
				$(".energy-day-cont-bg").show();
				// $("#main2electricity").show();
				// $("#main2gas").hide();
				$("#main2electricity").css({"opacity":"1","z-index":"10"});
				$("#main2gas").css({"opacity":"0","z-index":"-10"});
				break;
			case 'gas'://气
				// $(".energy-day-cont-bg").css("opacity","0");
				$(".energy-day-cont-bg").hide();
				// $("#main2electricity").hide();
				// $("#main2gas").show();
				$("#main2electricity").css({"opacity":"0","z-index":"-10"});
				$("#main2gas").css({"opacity":"1","z-index":"10"});
				break;
			default:
				break;
		}
	});
	getdata(0,"main2electricity","kW·h");//电
	getdata(2,"main2gas","Nm³");//气
	function getdata(energyType,elementId,unit){
		$.post(hdInterface.currentDayEnergyChange, {
			"siteId":_SITE_ID,
			"energyCode":energyType//能耗类型(0电2气)
			}).done(function(res) {
				// console.log(res);
				if(res.code==0){
					var data=res.data||{};
					var datax=data.dataX.split(",");
					var datay=data.dataY.split(",");
					var dataxTime=[];
					datax.forEach(function(item){
						dataxTime.push(item+":00");
					})
					echarsComponent.getLine({
						"elementId":elementId,//容器id	[必填]
						 xdata:dataxTime,//横坐标数据[必填]
						 ydata:[datay],//纵坐标数据[必填]
						 linecolors:['rgba(0, 255, 255, 1)'],//线颜色[非必填]
						 areaStyleOpacity:0.2,//区域颜色[非必填]
						 // interval:4,//间隔[非必填]
						 // "dataZoom":{
							// "isScroll":true,//是否可以自动切换[非必填]
							// "endValue":2//显示个数，长度是当前数字+2个[非必填]
						 //  },
						 //  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
						 //  "labelColor":'#a5eaff',//坐标轴文字颜色
						  "unit":unit,//单位
						   "yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
						   yAxisMinInterval:100,
						  "grid":{
							  left: '20px',
							  right: '4%',
							  bottom: '0px',
							  top: '25px',
						  },//边距[非必填]
					});
					$("#energy-day .hd-loadmask").hide();
				}
		}).fail(function(response) {
			$(".energy-day-cont-bg").css({"opacity":"0","z-index":"-10"});
		});
	}
	
	
}
//当月节能变化图表
energySavingIndex.loadEnergyMonth=function(){
	$.post(hdInterface.currentMonthEnergySavingChange, {
		"siteId":_SITE_ID,
		}).done(function(res) {
			if(res.code==0){
				if(JSON.stringify(res.data)==='{}'){
					$('#main3 .hd-loadmask').html('<img src="/common/image/nodata.png" class="iconimg" style="top: 45%;left:40%;width:150px;height:100px;">')
				}else{
					var data=res.data||{};
					var dataX=data.dataX.split(",");
					var datay=data.dataY.split(",");//实际能耗
					var datay2=data.dataY2.split(",");//能耗指标
					echarsComponent.getLineShadow({
						"elementId":"main3",//容器id	[必填]
						 xdata:dataX,//横坐标数据[必填]
						 ydata:[datay,datay2],//纵坐标数据[必填]
						 linecolors:['#00FFFF','#994427'],//线颜色[非必填]
						 // areaStyleOpacity:0.2,//区域颜色[非必填]
						 // interval:4,//间隔[非必填]
						 // "dataZoom":{
							// "isScroll":true,//是否可以自动切换[非必填]
							// "endValue":2//显示个数，长度是当前数字+2个[非必填]
						 //  },
						 //  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
						 //  "labelColor":'#a5eaff',//坐标轴文字颜色
						  "unit":"标准煤(kgce)",//单位
						  "padding":[0, 0, -10, 15],
						  ydataTitle:['实际能耗','能耗指标'],
						  yAxisMin:0,
						  // yAxisMinInterval:100,
						  "grid":{
							  left: '3%',
							  right: '4%',
							  bottom: '0px',
							  top: '25px',
						  }//边距[非必填]
					});
					$("#main3 .hd-loadmask").hide();
				}
			}
	});
	
}
//实时能效分析
energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis=function(){
	var clickindex=1;
	clearInterval(timer1);
	timer1 = setInterval(function(){
		// console.log(clickindex);
		$("#energyefficiency span").eq(clickindex).addClass('on').siblings("span").removeClass("on");
		$('.energyEfficiencybar ul li').eq(clickindex).show().siblings().hide();
		clickindex++;
		if(clickindex>2){
			clickindex=0
		}
	},1000*20);
	//0电1水2气
	$("#energyefficiency span").on('click',function(){
		$(this).addClass("on").siblings("span").removeClass("on");
		var ind=$(this).index();
		clickindex = ind;
		$(".energyEfficiencybar ul li").eq(ind).show().siblings().hide();
	});
	function getdata(energyType=0,datatype){
		$.post(hdInterface.realTimeEnergyEfficiencyAnalysis, {
			"siteId":_SITE_ID,
			"energyCode":energyType 
			}).done(function(res) {
				// console.log(res);
				if(res.code==0){
					var data=res.data||{};
					// console.log(datatype+'=====================')
					Object.keys(data).forEach(function(item){
						var dom=$("#"+datatype+item);
						if(item=="fell"){
							 var value=data[item];
							 if(value==null){
							 	value="--";
							 }else if(value>=0){
								value=Math.abs(value)+'% <img src="/common/image/up1.png">';
								dom.addClass("colorRed");
							}else{
								value=Math.abs(value)+ '% <img src="/common/image/down1.png">';
								dom.addClass("colorGreen");
							}
							// console.log(item,value);
							dom.html(value);
						}else if(item=="currentTime"||item=="yesterdayTime"){
							// console.log(item,data[item]);
							dom.html(data[item]>=1?Math.round(data[item]):data[item]);
						}else{
							// console.log(item,convert(data[item]));
							dom.html(convert(data[item]));
						}
					})
					
				}
		});
	}
	getdata(0,"electric");
	getdata(1,"water");
	getdata(2,"gas");
}
window.energySavingIndex = energySavingIndex;
energySavingIndex.init();

//数字特效
function loadnum1(var1) {
	numAutoPlus('energySaving', 0, {
		time: 2000,
		num: var1,
		rate: 40,
		format: true
	})
}
