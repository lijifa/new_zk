var siteId = getParams()['siteId']||13;
// var menuid=getParams()['menuId'];//菜单id
var menuNavId=getParams()['menuNavId'];//菜单id
var projectindex = {
	oneceload: 0,//是否第一次加载
	iswaring:"false",//是否设备报警
};
//初始化项目
projectindex.init = function() {
	projectindex.selectWaterSourceproductionWell();
	projectindex.loadWaterSourceHeatPumpUnit();
//	projectindex.loadDeviceStatus();
	projectindex.loadEnergy();
	// projectindex.loadPlateHeatExchangers();
	projectindex.loadwatertemp();
	// projectindex.getpicture();
	projectindex.selectZgMenuParamByMenuId();//获取参数
	// projectindex.selectGeothermalWellStatus();		//地热井
	projectindex.loadGeothermalWellHtGmlBH();		//地热井板换	
	setInterval(function() {
		projectindex.selectWaterSourceproductionWell();
		projectindex.loadWaterSourceHeatPumpUnit();
	//	projectindex.loadDeviceStatus();
		// projectindex.selectGeothermalWellStatus();	//地热井
		projectindex.loadGeothermalWellHtGmlBH();	//地热井板换
		projectindex.loadEnergy();
		// projectindex.loadPlateHeatExchangers();
		projectindex.loadwatertemp();
		projectindex.oneceload++;
	}, 1000*60)
}

//地热井进出水温度
projectindex.selectWaterSourceproductionWell=function(){
	$.ajax({
		url:hdInterface.selectWaterSourceproductionWell,
		type: "POST",	
		data: {
			// "siteId": "13",
			"siteId":siteId,
		},
		success: function(result) {
			if(result.code==0){
				var data=result.data||[];
				$("#productionWellTemperature").html(numberMap(data.productionWellTemperature));
				$("#rechargeWellTemperature").html(numberMap(data.rechargeWellTemperature));
				$("#productionWellPressure").html(numberMap(data.productionWellPressure));
				$("#rechargeWellPressure").html(numberMap(data.rechargeWellPressure));
				// $("#pressureDifference").html(data.pressureDifference||"--");	
				
				$("#chilledWaterSupplyTemperature").html(numberMap(data.chilledWaterSupplyTemperature));//供暖进水温度
				$("#chilledWaterSupplyPressure").html(numberMap(data.chilledWaterSupplyPressure));//供暖进水压力
				$("#chilledReturnWaterTemperature").html(numberMap(data.chilledReturnWaterTemperature));//供暖出水温度
				$("#chilledReturnWaterPressure").html(numberMap(data.chilledReturnWaterPressure));//供暖出水压力
				
			}
		}})
}
//获取图片
// projectindex.getpicture=function(){
// 	  $.ajax({
// 	  url: hdInterface.selectZgMenuParamByMenuId,
// 	  type: "GET",
// 	  data:{
// 		'menuId':menuNavId,
// 		'paramAlias':1
// 	  },
// 	  success: function (result) {
// 			
// 		  	if (result.code==0){
// 		  		result = result.data||{};
// 		  		if(JSON.stringify(result)=='{}'){
// 		  			//水源
// 		  			$(".ztt_sy").css("background","url(./image/sy_ztt.gif) 0px 44px no-repeat");
// 		  			$(".ztt_sy").css("background-size","97% 90%");
// 		  			//单冷
// 		  			$(".ztt_dl").css("background","url(./image/dl_ztt.gif) 0px 44px no-repeat");
// 		  			$(".ztt_dl").css("background-size","97% 90%");				
// 		  			// 锅炉
// 		  			$(".ztt_gl").css("background","url(./image/gl_ztt.gif) 0px 44px no-repeat");
// 		  			$(".ztt_gl").css("background-size","97% 90%");
// 		  			//地热井
// 		  			$(".ztt_drj").css("background","url(./image/drj_ztt.gif) 0px 44px no-repeat");
// 		  			$(".ztt_drj").css("background-size","97% 90%");
// 		  			return;
// 		  		}
// 		  		var picId=result["pid"]||"";
// 		  		$.post(hdInterface.selectPictureById, {picIds: picId})
// 		  			.done(function (r) {
// 		  				
// 		  				if (r.code == 0) {
// 		  					var data=r.data||[];
// 		  					var picPath=data[0]["picPath"]||"";
// 		  					$(".ztt").css("background","url("+picPath+") 0px 44px no-repeat");
// 		  					$(".ztt").css("background-size","97% 90%");
// 		  				}
// 		  			})
// 		  	}
// 		  
// 	  }})
// 	  }
// 

//获取参数
projectindex.selectZgMenuParamByMenuId=function(){
	 $.ajax({
	url: hdInterface.selectZgMenuParamByMenuId,
	type: "GET",
	data:{
			'menuId':menuNavId,
			'paramAlias':1
	},
	success: function (result) {
			  	if (result.code==0){
			  		result = result.data||{};
					projectindex.getpicture(result);//获取图片
					projectindex.loadDeviceStatus(result);//获取设备并展示
					setInterval(function(){
						projectindex.loadDeviceStatus(result);//获取设备并展示
					},1000*60);
			  	}
	}})
		
}
//获取图片
projectindex.getpicture=function(result){
	
				var picId=result["pid"]||"";
				var bindDeviceList=result["bindDeviceList"]||"";
		  		if(JSON.stringify(result)=='{}'){
		  			//水源
		  			$(".ztt_sy").css("background","url(./image/sy_ztt.gif) 0px 44px no-repeat");
		  			$(".ztt_sy").css("background-size","97% 90%");
		  			//单冷
		  			$(".ztt_dl").css("background","url(./image/dl_ztt.gif) 0px 44px no-repeat");
		  			$(".ztt_dl").css("background-size","97% 90%");				
		  			// 锅炉
		  			$(".ztt_gl").css("background","url(./image/gl_ztt.gif) 0px 44px no-repeat");
		  			$(".ztt_gl").css("background-size","97% 90%");
		  			//地热井
		  			$(".ztt_drj").css("background","url(./image/drj_ztt.gif) 0px 44px no-repeat");
		  			$(".ztt_drj").css("background-size","97% 90%");
		  			return;
		  		}
		  		
		  		$.post(hdInterface.selectPictureById, {picIds: picId})
		  			.done(function (r) {
		  				if (r.code == 0) {
		  					var data=r.data||[];
		  					var picPath=data[0]["picPath"]||"";
		  					$(".ztt").css("background","url("+picPath+") 0px 44px no-repeat");
		  					$(".ztt").css("background-size","97% 90%");
		  				}
		  			})
		  	}

//非列表单个数据
projectindex.loadWaterSourceHeatPumpUnit=function(){
	$.ajax({
		url:hdInterface.JKselectWaterSourceHeatPumpUnit,
		type: "post",
		data: {
			// "siteId": "13",
			"siteId":siteId,
		},
		success: function(result) {
			if(result.code==0){
				var data=result.data||[];					
			//水源热泵机组
			var waterSourceHeatPumpUnit = data|| {};
			$("#coolingsupplytemp").html(numberMap(waterSourceHeatPumpUnit.coolingWaterSupplyTemperature)); //冷却供水温度
			$("#coolingsupplypre").html(numberMap(waterSourceHeatPumpUnit.coolingWaterSupplyPressure)); //冷却供水压力
			$("#coolingreturnWatertemp").html(numberMap(waterSourceHeatPumpUnit.coolingReturnWaterTemperature)); //冷却回水温度
			$("#coolingreturnwaterpre").html(numberMap(waterSourceHeatPumpUnit.coolingReturnWaterPressure)); //冷却回水压力
			$("#chilledwatersupplytemp").html(numberMap(waterSourceHeatPumpUnit.chilledWaterSupplyTemperature)); //冷冻供水温度
			$("#chilledwatersupplypre").html(numberMap(waterSourceHeatPumpUnit.chilledWaterSupplyPressure)); //冷冻供水压力
			$("#chilledreturnwatertemp").html(numberMap(waterSourceHeatPumpUnit.chilledReturnWaterTemperature)); //冷冻回水温度
			$("#chilledreturnWaterpre").html(numberMap(waterSourceHeatPumpUnit.chilledReturnWaterPressure)); //冷冻回水压力
			$("#pressuredif").html(numberMap(waterSourceHeatPumpUnit.pressureDifferenceOfWaterCollectorAndDistributor)); //集分水器压差
			$("#systemset").html(numberMap(waterSourceHeatPumpUnit.systemSetDifferentialPressure)); //系统供回压差
			}
		},
	})
}
//冷冻供回水温度曲线，调用接口形式
projectindex.loadwatertemp=function(){
	$.ajax({
			// url: baseurl + "wisdom/zgsystemmonitoring/chilledWaterSupplyAndReturn",
			url:hdInterface.chilledWaterSupplyAndReturn,
			type: "post",
			data: {
				"siteId": siteId,
			},
			// beforeSend:function(){
			// 	loadmask("ldtemperature");
			// },
			// success: function(result) {
			// 		removemask("ldtemperature");
			//
			// 		// console.log(result)
			// 		var ReturnWaterArr=[],WaterSupplyArr=[],timeArr=[];
			// 		if(result.code==0){
			// 			var data=result.data||[];
			// 			for (var i = 0; i < data.length; i++) {
			// 				var item=data[i];
			// 				var ReturnWaterTemperature=item["ReturnWaterTemperature"]||0,
			// 					WaterSupplyTemperature=item["WaterSupplyTemperature"]||0,
			// 					time=item["time"]||"--";
			// 				ReturnWaterArr.push(ReturnWaterTemperature);
			// 				WaterSupplyArr.push(WaterSupplyTemperature);
			// 				timeArr.push(time);
			// 			}
			// 			projectindex.warning(WaterSupplyArr,ReturnWaterArr,timeArr);
			// 		}
			// }

		/**
		 * @author xiaojie
		 * @param result
		 */
		success: function(result) {
					removemask("ldtemperature");
					var ReturnWaterArr=[],WaterSupplyArr=[],timeArr=[];
					if(result.code==0){
						var data=result.data||[];
						if(data.length==0){
							$('#drj_main').html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
							$("#drj_main").siblings(".echars-units").hide();
							return;
						}
						// data=data.splice(0,10);
						for (var i = 0; i < data.length; i++) {
						// for (var i = 0; i < 10; i++) {
							var item=data[i];
							var time=item["time"]||"--";
							// if (typeof item["waterSupplyTemperature"] !== "undefined" && typeof item["returnWaterTemperature"] !== "undefined"){
							if (typeof item["waterSupplyTemperature"] !== "undefined" && typeof item["returnWaterTemperature"] !== "undefined"&&(item["waterSupplyTemperature"]!=null||item["returnWaterTemperature"]!=null)){
								ReturnWaterArr.push(item["returnWaterTemperature"]);
								WaterSupplyArr.push(item["waterSupplyTemperature"]);
								timeArr.push(time);
							}
							
						}
						
						echarsComponent.getLine({
							"elementId":"drj_main",//容器id	[必填]
							 xdata:timeArr,//横坐标数据[必填]
							 ydata:[WaterSupplyArr,ReturnWaterArr],//纵坐标数据[必填]
							 linecolors:['#FCEA45','#FF4444'],//线颜色[非必填]
							 // areaStyleOpacity:0.1,//区域颜色[非必填]
							 // interval:0,//间隔[非必填]
							 // "dataZoom":{
								// "isScroll":true,//是否可以自动切换[非必填]
								// "endValue":2//显示个数，长度是当前数字+2个[非必填]
							 //  },
							  // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
							  // "labelColor":'#a5eaff',//坐标轴文字颜色
							  "unit":"℃",//单位
							  "grid":{
								  left: '4%',
								  right: '4%',
								  bottom: '5%',
								  top: '25px',
							  },//边距[非必填]
							  "nodataImg":true,
						});
						// projectindex.warning(WaterSupplyArr,ReturnWaterArr,timeArr);
					}
				}
			});
}
//今日能耗
projectindex.loadEnergy=function(){
	//当日能耗监控、室内外温度
	$.post(hdInterface.selectElectricAndWaterDay,{'siteId':siteId}, function (data) {
		if (data['code'] === 0) {
			data = data.data[0]||[];
			$("#electricEnergy").html(convertNumber(data.electricSumKw)); //电能耗
			$("#waterEnergy").html(convertNumber(data.waterSumM)); //水能耗
			$("#energyConsumption").html(convertNumber(data.energyConsumption)); //冷热总能耗
			$("#flow").html(convertNumber(data.flow)); //冷热总能耗
		}
	});
	
}
//当前板换状态
// projectindex.loadPlateHeatExchangers=function(){
// 	$.ajax({
// 			// url: baseurl + "wisdom/zgsystemmonitoring/selectPlateHeatExchangers",
// 			url:hdInterface.selectPlateHeatExchangers,
// 			type: "POST",	
// 			data: {
// 				// "siteId": "13",
// 				"siteId":siteId,
// 			},
// 			success: function(result) {
// 				if(result.code==0){
// 					var plateHeatExchangerList=result.data||[];	
// 					// plateHeatExchangerList.sort(function(a,b){
// 					//         if(a.deviceName>b.deviceName) return 1 ;
// 					//         if(a.deviceName<b.deviceName) return -1 ;
// 					//         return 0 ;
// 					//  }) ;
// 					//板换状态
// 					// var plateHeatExchangerList = data.plateHeatExchangerList || {};
// 					var clonePlateHeatExchangerList = txtMarqueeArr(plateHeatExchangerList, 7); //整理后的板换状态数组
// 					
// 					if (projectindex.oneceload > 0) {
// 						//第二次加载整理后的数组
// 						projectindex.loadPlateHeatExchangerHtml(clonePlateHeatExchangerList);
// 					} else {
// 						//第一次加载原本的数组
// 						projectindex.loadPlateHeatExchangerHtml(plateHeatExchangerList);
// 						//只在第一次时候加载滚动插件
// 						// jQuery(".txtMarquee-top").slide({
// 						// 	mainCell: ".bd ul",
// 						// 	autoPlay: true,
// 						// 	effect: "topMarquee",
// 						// 	vis: 7,
// 						// 	interTime: 50
// 						// });
// 					}
// 				}
// 				removemask("bhcover");
// 			},
// 		})
// }
// 
// 
// 
//当前设备状态
projectindex.loadDeviceStatus=function(){
	var pathname=window.location.pathname;
	var diagramId=1;
	if(pathname.indexOf('-dl')!=-1){
		diagramId=2;
	}
	if(pathname.indexOf('-gl')!=-1){
		diagramId=3;
	}
	if(pathname.indexOf('-drj')!=-1){
		diagramId=21;
	}
	$.ajax({
			// url: baseurl + "wisdom/zgsystemmonitoring/selectDeviceStatusByDiagram",
			url:hdInterface.selectDeviceStatusByDiagram,
			type: "post",
			data: {
				// "siteId": "13",
				"siteId":siteId,
				// "diagramId":parseInt(getParams()['diagramId']),
				"diagramId":diagramId
			},
			success: function(result) {
				if(result.code==0){
					//设备状态
					var deviceStatusList = result.data||[];	
					// deviceStatusList.sort(function(a,b){
					//         if(a.state>b.state) return 1 ;
					//         if(a.state<b.state) return -1 ;
					//         return 0 ;
					//  }) ;					 
					 
					 deviceStatusList.sort(function(a,b){
					        if(a.plate>b.plate) return 1 ;
					        if(a.plate<b.plate) return -1 ;
					        return 0 ;
					 })				 
					
				// 	var cloneAndDeviceStatuslist = txtMarqueeArr(deviceStatusList, 7); //整理后的设备状态数组
				// 	if (projectindex.oneceload > 0) {
				// 		//第二次加载整理后的数组
				// 		projectindex.loadDeviceHtml(cloneAndDeviceStatuslist);
				// 	} else {
				// 		//第一次加载原本的数组
				// 		projectindex.loadDeviceHtml(deviceStatusList);
				// 		//只在第一次时候加载滚动插件
				// 		jQuery(".txtMarquee-top").slide({
				// 			mainCell: ".bd ul",
				// 			autoPlay: true,
				// 			effect: "topMarquee",
				// 			vis: 7,
				// 			interTime: 50
				// 		});
				// 	}
				}
				// removemask("equipmentstatuscover");
			}
		})
}


//【地热井】 当前设备状态
// projectindex.selectGeothermalWellStatus=function(){
// 	var pathname=window.location.pathname;
// 	var diagramId=1;
// 	if(pathname.indexOf('-drj')!=-1){
// 		diagramId=21;
// 	}
// 	$.ajax({
// 			// url: baseurl + "wisdom/zgsystemmonitoring/selectDeviceStatusByDiagram",
// 			url:hdInterface.selectGeothermalWell,
// 			type: "post",
// 			data: {
// 				// "siteId": "13",
// 				"siteId":siteId,
// 				// "diagramId":parseInt(getParams()['diagramId']),
// 				"diagramId":diagramId
// 			},
// 			success: function(result) {
// 				// console.log(result)
// 				if(result.code==0){
// 					console.log(result.data)
// 					//设备状态
// 					var deviceStatusList = result.data||[];	
// 					// deviceStatusList.sort(function(a,b){
// 					//         if(a.state>b.state) return 1 ;
// 					//         if(a.state<b.state) return -1 ;
// 					//         return 0 ;
// 					//  }) ;
// 					 deviceStatusList.sort(function(a,b){
// 					        if(a.plate>b.plate) return 1 ;
// 					        if(a.plate<b.plate) return -1 ;
// 					        return 0 ;
// 					 })
projectindex.loadDeviceStatus=function(result){	
	var bindDeviceList=result.bindDeviceList;//绑定设备
	if(bindDeviceList){
		$.ajax({
				url:hdInterface.selectDeviceStatusByDeviceIds,
				type: "post",
				data: {
					"siteId":siteId,
					"deviceIds":bindDeviceList
				},
				success: function(result) {
					console.log(result.data)
					if (result.code == 0){
						var deviceStatusList = result.data||[];
						 deviceStatusList.sort(function(a,b){
								if(a.plate>b.plate) return 1 ;
								if(a.plate<b.plate) return -1 ;
								return 0 ;
						 })
						var param1 = {
							vis:'7',//可视数
							title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长(H)', '故障状态'], //列表标题
							list: [],//列表数据
							stateItem: ['state', 'fault'],//图标标志列
							changeFlag: ['fault'],//0 1互换标志数组
							hangLie: {
								lieflag:true,//间隔列开
								lienum:'5',//间隔列 从0开始
								hangflag:true,//间隔行开
								hangnum:'1',//间隔行 从0开始
							}
						}
						var warnLightflag = false
						deviceStatusList.forEach((item,index)=>{
							if(item.fault == '1'){
								warnLightflag = true
							}
							if(warnLightflag){
								$("#warnLight").attr("src","./image/red.mp4");
							}else{
								$("#warnLight").attr("src","./image/green.mp4")
							}
							var obj = {
								plate:convert(item.plate),//名称
								frequency:convert(item.frequency),//频率
								state: convert(item.state),//启停状态
								automatically: convert(item.automatically),//手自动
								runtime:convert(item.runtime),//运行时长
								fault: convert(item.fault)//故障状态
							}
							param1.list.push(obj)
						})
						let obj1 = new listRoll('equipmentstatuscover',param1);//实例化
					}
				// 	var cloneAndDeviceStatuslist = txtMarqueeArr(deviceStatusList, 7); //整理后的设备状态数组
				// 	console.log(deviceStatusList)
				// 	if (projectindex.oneceload > 0) {
				// 		// 第二次加载整理后的数组
				// 		projectindex.loadGeothermalWellHtGml(deviceStatusList);
				// 	} else {
				// 		// 第一次加载原本的数组
				// 		projectindex.loadGeothermalWellHtGml(deviceStatusList);
				// 		// 只在第一次时候加载滚动插件
				// 		jQuery("#equipmentstatuscover .txtMarquee-top").slide({
				// 			mainCell: ".bd ul",
				// 			autoPlay: true,
				// 			effect: "topMarquee",
				// 			vis: 7,
				// 			interTime: 50
				// 		});
				// 	}
				}
			})
	}else{
		$("#equipmentstatuscover").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
	}
	removemask("equipmentstatuscover");
	
}

// //当前设备状态
// projectindex.loadDeviceStatus=function(){
// 	var pathname=window.location.pathname;
// 	var diagramId=1;
// 	if(pathname.indexOf('-dl')!=-1){
// 		diagramId=2;
// 	}
// 	if(pathname.indexOf('-gl')!=-1){
// 		diagramId=3;
// 	}
// 	if(pathname.indexOf('-drj')!=-1){
// 		diagramId=21;
// 	}
// 	$.ajax({
// 			// url: baseurl + "wisdom/zgsystemmonitoring/selectDeviceStatusByDiagram",
// 			url:hdInterface.selectDeviceStatusByDiagram,
// 			type: "post",
// 			data: {
// 				// "siteId": "13",
// 				"siteId":siteId,
// 				// "diagramId":parseInt(getParams()['diagramId']),
// 				"diagramId":diagramId
// 			},
// 			success: function(result) {
// 				if(result.code==0){
// 					//设备状态
// 					var deviceStatusList = result.data||[];	
// 					// deviceStatusList.sort(function(a,b){
// 					//         if(a.state>b.state) return 1 ;
// 					//         if(a.state<b.state) return -1 ;
// 					//         return 0 ;
// 					//  }) ;					 
// 					 
// 					 deviceStatusList.sort(function(a,b){
// 					        if(a.plate>b.plate) return 1 ;
// 					        if(a.plate<b.plate) return -1 ;
// 					        return 0 ;
// 					 })				 
// 					
// 				// 	var cloneAndDeviceStatuslist = txtMarqueeArr(deviceStatusList, 7); //整理后的设备状态数组
// 				// 	if (projectindex.oneceload > 0) {
// 				// 		//第二次加载整理后的数组
// 				// 		projectindex.loadDeviceHtml(cloneAndDeviceStatuslist);
// 				// 	} else {
// 				// 		//第一次加载原本的数组
// 				// 		projectindex.loadDeviceHtml(deviceStatusList);
// 				// 		//只在第一次时候加载滚动插件
// 				// 		jQuery(".txtMarquee-top").slide({
// 				// 			mainCell: ".bd ul",
// 				// 			autoPlay: true,
// 				// 			effect: "topMarquee",
// 				// 			vis: 7,
// 				// 			interTime: 50
// 				// 		});
// 				// 	}
// 				}
// 				// removemask("equipmentstatuscover");
// 			}
// 		})
// }
// 

//【地热井】 当前设备状态
// projectindex.selectGeothermalWellStatus=function(){
// 	var pathname=window.location.pathname;
// 	var diagramId=1;
// 	if(pathname.indexOf('-drj')!=-1){
// 		diagramId=21;
// 	}
// 	$.ajax({
// 			url:hdInterface.selectGeothermalWell,
// 			type: "post",
// 			data: {
// 				"siteId":siteId,
// 				"diagramId":diagramId
// 			},
// 			success: function(result) {
// 				// console.log(result)
// 				if(result.code==0){
// 					//设备状态
// 					var deviceStatusList = result.data||[];	
// 					// deviceStatusList.sort(function(a,b){
// 					//         if(a.state>b.state) return 1 ;
// 					//         if(a.state<b.state) return -1 ;
// 					//         return 0 ;
// 					//  }) ;					 
// 					 
// 					 deviceStatusList.sort(function(a,b){
// 					        if(a.plate>b.plate) return 1 ;
// 					        if(a.plate<b.plate) return -1 ;
// 					        return 0 ;
// 					 })
// 					var param1 = {
// 						slide: {
// 							autoPlay:true,//自动播放
// 							effect:"topMarquee",//效果topMarquee
// 							vis:'7',//可视数
// 							interTime:'50',//速度
// 						},
// 						title: ['设备名称', '频率(HZ)', '启停状态', '手自动', '运行总时长', '故障状态'], //列表标题
// 						list: [],//列表数据
// 						stateItem: ['state', 'fault'],//图标标志列
// 						style: {
// 							lineHeight:'30',// 行高
// 							titleHeight:'30',//标题高度
// 							titleSize:'14',//标题字体大小
// 							fontSize:'14',//字体大小
// 							iconSize:'16',//图标大小
// 							iconText:false,//图标文字
// 						},
// 						hangLie: {
// 							lieflag:true,//间隔列开
// 							lienum:'2',//间隔列 从0开始
// 							hangflag:true,//间隔行开
// 							hangnum:'1',//间隔行 从0开始
// 						}
// 					}
// 					deviceStatusList.forEach((item,index)=>{
// 						var obj = {
// 							plate:item.plate,//名称
// 							frequency:item.frequency||'--',//频率
// 							state: State(item.state),//启停状态
// 							automatically: Auto(item.automatically),//手自动
// 							runtime:item.runtime,//运行时长
// 							fault: Fault(item.fault)//故障状态
// 						}
// 						param1.list.push(obj)
// 					})
// 					// param1.list = deviceStatusList
// 					let obj1 = new listRoll('equipmentstatuscover',param1);//实例化
// 					//var cloneAndDeviceStatuslist = txtMarqueeArr(deviceStatusList, 7); //整理后的设备状态数组
// 					// console.log(deviceStatusList)
// 					// if (projectindex.oneceload > 0) {
// 						//第二次加载整理后的数组
// 						// projectindex.loadGeothermalWellHtGml(deviceStatusList);
// 					// } else {
// 						//第一次加载原本的数组
// 						// projectindex.loadGeothermalWellHtGml(deviceStatusList);
// 						//只在第一次时候加载滚动插件
// 						// jQuery("#equipmentstatuscover .txtMarquee-top").slide({
// 						// 	mainCell: ".bd ul",
// 						// 	autoPlay: true,
// 						// 	effect: "topMarquee",
// 						// 	vis: 7,
// 						// 	interTime: 50
// 						// });
// 					// }
// 				}
// 				// removemask("equipmentstatuscover");
// 			},
// 		})
// }
// 
// //【地热井】 加载地热井设备状态html
// projectindex.loadGeothermalWellHtGml = function(list) {
// 	
// 	if(list.length==0){
// 	 	$("#geothermalWellstatus").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
// 		return;
// 	}
// 	var html = "";
// 	for (var i = 0; i < list.length; i++) {
// 		var item = list[i] || {};
// 		var plate = numberMap(item.plate), //名称
// 			frequency = numberMap(item.frequency), //频率
// 			runtime = item.runtime==null?"--":parseInt(item.runtime); //运行时长			
// 			
// 			var state,automatically,fault;
// 			if(item.state == 0){
// 				//停止
// 				// state="停止";
// 				// state='<img src="./image/circle-blue.png"/>';
// 				state='<img src="./image/circle-red.png"/>';
// 			}
// 			else if(item.state == 1){
// 				//开启
// 				// state="开启";
// 				state='<img src="./image/circle-green.png"/>';
// 			}else if(item.state == -1){
// 				state='<img src="./image/circle-gray.png"/>';
// 			}else {
// 				state="--";
// 			}
// 			
// 			if(item.automatically == 0){
// 				automatically="自动";
// 			}
// 			else if(item.automatically == 1){
// 				automatically="手动";
// 			}else{
// 				automatically="--";
// 			}
// 			
// 			if(item.fault == 0){
// 				//正常
// 				// fault="正常";
// 				fault='<img src="./image/circle-green.png"/>';
// 			}
// 			else if(item.fault == 1){
// 				//故障
// 				// fault="故障";
// 				fault='<img src="./image/circle-red.png"/>';
// 			}else if(item.state == -1){
// 				fault='<img src="./image/circle-gray.png"/>';
// 			}else{
// 				fault="--";
// 			}
// 			// state = item.state == 0 ? "开始" : "停止", //启停状态
// 			// automatically = item.automatically == "0" ? "自动" : "手动", //手自动			
// 			// fault = item.fault == "0" ? "正常" : "故障"; //故障状态
// 			
// 		if (item.fault == "1") {			
// 			//故障
// 			html += '<li class="red">';
// 			projectindex.iswaring="true";//设备报警
// 		} else {
// 			//正常
// 			html += '<li>';
// 		}
// 		html += '<span class="width1">' + plate + '</span>' +
// 			'<span class="width2"> ' + frequency + '</span>' +
// 			'<span class="width2"> ' + state + '</span>' +
// 			'<span class="width2"> ' + automatically + '</span>' +
// 			'<span class="width2"> ' + runtime + '</span>' +
// 			'<span class="width2"> ' + fault + '</span>' +
// 			'</li>';
// 	}
// 	$("#geothermalWellstatus").html(html);
// 	
// 	if(projectindex.iswaring=="true"){
// 		// $(".waringlight").show();
// 		$("#warnLight").attr("src","./image/red.mp4");
// 	}else{
// 		$("#warnLight").attr("src","./image/green.mp4")
// 	}
// }
// //【地热井】 当前板换状态
projectindex.loadGeothermalWellHtGmlBH=function(){
	$.ajax({
			// url: baseurl + "wisdom/zgsystemmonitoring/selectPlateHeatExchangers",
			url:hdInterface.selectPlateHeatExchangers,
			type: "POST",	
			data: {
				// "siteId": "13",
				"siteId":siteId,
			},
			success: function(result) {
				if(result.code==0){
					console.log(result.data)
					var plateHeatExchangerList=result.data||[];	
					plateHeatExchangerList.sort(function(a,b){
					        if(a.deviceName>b.deviceName) return 1 ;
					        if(a.deviceName<b.deviceName) return -1 ;
					        return 0 ;
					 }) ;
					 var param2 = {
						vis:'7',//可视数
					 	title: ['设备名称', '二次侧供水温度(℃)', '二次侧回水温度(℃)'], //列表标题
					 	list: [],//列表数据
					 	// stateItem: [],//图标标志列
						// changeFlag: [],//0 1互换标志数组
						hangLie: {
							lieflag:true,//间隔列开
							lienum:'2',//间隔列 从0开始
							hangflag:true,//间隔行开
							hangnum:'1',//间隔行 从0开始
						}
					 }
					 plateHeatExchangerList.forEach((item,index)=>{
					 	var obj = {
					 		deviceName:convert(item.deviceName),//名称
					 		onceTemperature:convert(item.onceTemperature),//一次
					 		twiceTemperature:convert(item.twiceTemperature),//二次
					 	}
					 	param2.list.push(obj)
					 })
					let obj2 = new listRoll('bhcover',param2);//实例化
					//板换状态
					// var plateHeatExchangerList = data.plateHeatExchangerList || {};
					// var clonePlateHeatExchangerList = txtMarqueeArr(plateHeatExchangerList, 7); //整理后的板换状态数组
					
					// if (projectindex.oneceload > 0) {
						//第二次加载整理后的数组
						// projectindex.loadBHHtml(clonePlateHeatExchangerList);
					// } else {
						//第一次加载原本的数组
						// projectindex.loadBHHtml(plateHeatExchangerList);
						//只在第一次时候加载滚动插件
						// jQuery("#bhcover .txtMarquee-top").slide({
						// 	mainCell: ".bd ul",
						// 	autoPlay: true,
						// 	effect: "topMarquee",
						// 	vis: 7,
						// 	interTime: 50
						// });
					// }
				}
				// removemask("bhcover");
			},
		})
}
//加载板换状态html
projectindex.loadPlateHeatExchangerHtml = function(list) {	
	if(list.length==0){
	 	$("#bhstatus").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
		return;
	 }
	var bhhtml = "";
	for (var i = 0; i < list.length; i++) {
		var changeritem = list[i] || {};
		var deviceName = numberMap(changeritem.deviceName), //板换名称
			onceTemperature = numberMap(changeritem.onceTemperature), //一次测温 
			twiceTemperature = numberMap(changeritem.twiceTemperature); //二次测温 

		bhhtml += '<li>' +
			'<span class="width3">' + deviceName + '</span>' +
			'<span class="width3 textcenter">' + onceTemperature + '</span>' +
			'<span class="width3 textcenter">' + twiceTemperature + '</span>' +
			'</li>'
	}
	$("#bhstatus").html(bhhtml);
}

//加载设备状态html
projectindex.loadDeviceHtml = function(list) {
	if(list.length==0){
	 	$("#equipmentstatus").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
		return;
	 }
	var html = "";
	for (var i = 0; i < list.length; i++) {
		var item = list[i] || {};
		var plate = numberMap(item.plate), //名称
			frequency = numberMap(item.frequency), //频率
			runtime = item.runtime==null?"--":parseInt(item.runtime); //运行时长			
			
			var state,automatically,fault;
			if(item.state == 0){
				//停止
				// state="停止";
				// state='<img src="./image/circle-blue.png"/>';
				state='<img src="./image/circle-red.png"/>';
			}
			else if(item.state == 1){
				//开启
				// state="开启";
				state='<img src="./image/circle-green.png"/>';
			}else if(item.state == -1){
				state='<img src="./image/circle-gray.png"/>';
			}else {
				state="--";
			}
			
			if(item.automatically == 0){
				automatically="自动";
			}
			else if(item.automatically == 1){
				automatically="手动";
			}else{
				automatically="--";
			}
			
			if(item.fault == 0){
				//正常
				// fault="正常";
				fault='<img src="./image/circle-green.png"/>';
			}
			else if(item.fault == 1){
				//故障
				// fault="故障";
				fault='<img src="./image/circle-red.png"/>';
			}else if(item.state == -1){
				fault='<img src="./image/circle-gray.png"/>';
			}else{
				fault="--";
			}
			// state = item.state == 0 ? "开始" : "停止", //启停状态
			// automatically = item.automatically == "0" ? "自动" : "手动", //手自动			
			// fault = item.fault == "0" ? "正常" : "故障"; //故障状态
			
		if (item.fault == "1") {			
			//故障
			html += '<li class="red">';
			projectindex.iswaring="true";//设备报警
		} else {
			//正常
			html += '<li>';
		}
		html += '<span class="width1">' + plate + '</span>' +
			'<span class="width2"> ' + frequency + '</span>' +
			'<span class="width2"> ' + state + '</span>' +
			'<span class="width2"> ' + automatically + '</span>' +
			'<span class="width2"> ' + runtime + '</span>' +
			'<span class="width2"> ' + fault + '</span>' +
			'</li>';
	}
	$("#equipmentstatus").html(html);
	
	if(projectindex.iswaring=="true"){
		// $(".waringlight").show();
		$("#warnLight").attr("src","./image/red.mp4");
	}else{
		$("#warnLight").attr("src","./image/green.mp4")
	}
	
	
}
//冷冻供回水温度图表样式,gsYdata 供水y轴数据，hsYdata 回水y轴数据，xdata X轴数据
projectindex.warning = function(gsYdata,hsYdata,xdata) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('drj_main'));
	// 指定图表的配置项和数据
	var option = {

		tooltip: {
			trigger: 'axis',
			// formatter:function(params){
			// 	// return JSON.stringify(params);
			// 	// return params.seriesName+'<br/>'+params.name +'-'+params.value;
			// 	return "<div style='text-align:left;padding:3px;'>"+params.seriesName+"<br/>时间:"+params.name+"<br/>温度:"+params.value+"</div>";
			// }
		},
		// legend: {
		// 	data: ['销量']
		// },
		grid: {
			left: '5%',
			right: '5%',
			bottom: '0%',
			top: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			//data: [2016, 2017, 2018, 2019, 2020],
			 data:xdata,       		
			color: '#fff',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#a5eaff'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#082f60' // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: '#082f60' //更改坐标轴颜色
				}
			},

		},
		yAxis: {
			name: '°C',
			type: 'value',
			scale: true,
			color: '#082f60',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#a5eaff'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#082f60' // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: '#082f60' //更改坐标轴颜色
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#082f60'],
					width: 1,
					type: 'solid'
				}
			}
		},
		series: [{
				name: '出水温度',
				//data: [6, 9, 10, 18, 13],
				data:gsYdata,
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color: '#FCEA45', //改变折线点的颜色
						lineStyle: { // 系列级个性化折线样式
							width: 2, // 折线宽度
							type: 'solid', // 折线是实线
							color: "#FCEA45" // 折线颜色
						}
					},
				},
				// 		areaStyle: {
				// 			normal: {
				// 				//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
				// 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				// 
				// 					offset: 0,
				// 					color: 'rgba(9,121,211,0.60)'
				// 				}, {
				// 					offset: .34,
				// 					color: 'rgba(9,121,211,0.30)'
				// 				}, {
				// 					offset: 1,
				// 					color: 'rgba(9,121,211,0.00)'
				// 				}])
				// 
				// 			}
				// 		}, //区域颜色渐变
				symbolSize: 3, //折线点的大小
			},
			{
				name: '进水温度',
				// data: [13, 25, 20, 28, 20],
				data:hsYdata,
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color: '#FF4444', //改变折线点的颜色
						lineStyle: { // 系列级个性化折线样式
							width: 2, // 折线宽度
							type: 'solid', // 折线是实线
							color: "#FF4444" // 折线颜色
						}
					},
				},
				// 		areaStyle: {
				// 			normal: {
				// 				//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
				// 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				// 
				// 					offset: 0,
				// 					color: 'rgba(9,121,211,0.60)'
				// 				}, {
				// 					offset: .34,
				// 					color: 'rgba(9,121,211,0.30)'
				// 				}, {
				// 					offset: 1,
				// 					color: 'rgba(9,121,211,0.00)'
				// 				}])
				// 
				// 			}
				// 		}, //区域颜色渐变
				symbolSize: 3, //折线点的大小
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	$(window).resize(function() {
		myChart.resize();
	});
}

projectindex.init();
window.projectindex = projectindex;
/**
 * 数值转化为显示字段
 * @param number
 * @param defaultText
 */
function numberMap(number, successText, failText, defaultText) {
	if (typeof number === "number") {
		number = parseFloat(number).toFixed(2);
	}
	if (number == null){
		number = "--";
	}
	return number;
}
/*循环播放列表专用数组整理方法,
	arr:需要整理的数组，
	listLength:列表需要显示的长度
*/
function txtMarqueeArr(arr, listLength) {
	var clonelist = []; //整理后的数组
	if (arr.length > listLength) {
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

//获取当前时间
function getTime(){
	var date=new Date();
	var h=date.getHours();
	var m=date.getMinutes();
	h=h<10?"0"+h:h;
	m=m<10?"0"+m:m;
	return time=h+":"+m;
}

// // 启停状态
// function State(state){
// 	if(state == 0){
// 		state = '停止';//红
// 	}else if(state == 1){
// 		state = '开启';//绿
// 	}else if(state == -1){
// 		state='离线';//灰
// 	}else {
// 		state="--";
// 	}
// 	return state
// }
// // 手自动
// function Auto(automatically){
// 	if(automatically == 0){
// 		automatically="自动";
// 	}
// 	else if(automatically == 1){
// 		automatically="手动";
// 	}else{
// 		automatically="--";
// 	}
// 	return automatically
// }
// // 故障状态
// function Fault(fault){
// 	if(fault == 0){
// 		fault='正常';//绿 正常
// 	}else if(fault == 1){
// 		fault='故障';//红 故障
// 	}else if(fault == -1){
// 		fault='离线';//灰色
// 	}else{
// 		fault="--";
// 	}
// 	return fault
// }