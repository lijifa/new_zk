var project = {
	// sitelist:[],
	siteOnParams: {}
}
var _PROJECT_ID = getParams()['projectId'];
var proname = getParams()['proname'];
var layuiId = getParams()["layuiId"]; //标签id
project.init = function () {
	$('.nowYear').html(new Date().getFullYear());
	// project.onunload()
	project.loadselectProjectMessage(); //加载项目信息
	// project.headerBtnClick();//切换供冷供热
	project.changeEnergy(); //切换能耗
	project.loadselectEnergyStaticsByProjectId(); //加载能耗统计
	project.clickSites(); //点击查看机房数据
	project.buttomIcon(); //收起展开
	$("#innerheader").attr("data-title", decodeURI(proname) + "总览");
	$("#container").append('<iframe src="./GuangHeGuSite/index.html?v='+version+'" frameborder="0" height="100%" width="100%"></iframe>');
	project.energyBtn();
};
//u3d初始化
project.u3dinit = function (gameInstance) {
	//供冷供暖
	project.SetCoolHeat = function (dataIndex) {
		if (dataIndex == 'cooling') {
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '开');
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '关');
		} else if(dataIndex == 'heating') {
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '开');
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '关');
		} else {
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '关');
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '关');
		}
	
	}
	project.headerBtnClick(); //切换供冷供热
	//移动列表弹窗位置
	project.showSitelist = function (params) {
		var heightWIN = $(document).height()
		var widthEIN = $(document).width()
		var paramsArr = params.split(",");
		var pos = paramsArr[0]; //机房索引 1:光合谷地热井机房  2:光合谷地源机房  3.酒店  4.售楼中心  5.会所  6.青少年交流中心机房 7.泊雅苑
		var pointx = paramsArr[1]; //横坐标
		var pointy = paramsArr[2]; //纵坐标
		// console.log(heightWIN,widthEIN)
		// console.log("x前",pointx)
		if (pointx > widthEIN - 500) {
			pointx = pointx * 1 - 350;
		} else if (pointx < 500) {
			pointx = pointx * 1 + 100
		} else {
			pointx = pointx * 1 + 100
		}
		// console.log("x后",pointx)
		// console.log("y前",pointy)
		if (pointy < 150) {
			pointy = pointy * 1 + 150;
		} else if (pointy > heightWIN - 300) {
			pointy = pointy * 1 - 150;
		} else {
			pointy = pointy * 1 - 100;
		}
		// console.log("y后",pointy)
		var dom = $("#sitelist" + pos);
		dom.css({
			"left": pointx + "px",
			"bottom": pointy + "px"
		});
		dom.show();
		this.siteOnParams = {
			"siteOnIndex": pos,
			"pointx": pointx,
			"pointy": pointy
		};
	}
	project.hideSitelist = function () {
		$(".project-details").hide();
		this.siteOnParams = {};
	}
	//显示隐藏机房数据
	// project.changeSiteList=function(sitename,status){
	// 	var obj;
	// 	if(sitename.indexOf('地热井机房')!=-1){
	// 		obj="1500"+status+",1";//开,地热井机房
	// 	}else{
	// 		obj="1500"+status+",2";//开,地源机房
	// 	}
	// 	gameInstance.SendMessage("Net", "GetEvent", obj);
	// }
	//发送实时机房数据
	project.sendList = function (data) {
		$.post(hdInterface.selectSafetyMonitoring, {
			'projectId': _PROJECT_ID
		}, function (data) {
			if (data.code == '200' || data.code == '0') {
				// console.log(data);
				gameInstance.SendMessage("Net", "GetGuangheguData", JSON.stringify(data));
				//泊雅苑面板数据
				let communityFakerData = {
					siteName: "泊雅苑一号楼",
					supplyWaterTemperature: "21", //供水温度
					supplyWaterPressure: "0", //供水压力
					backWaterTemperature: "21.5", //回水温度
					backWaterPressure: "0.1", //回水压力
					heat: "1600"
				}
				let totalData;
				let hotel = { //酒店
					siteName: "温泉度假酒店",
					heat: '',
					dewIndoor: '',
				};
				let salesCenter = { //售楼中心
					siteName: "售楼中心",
					firstFloor: '',
					secondFloor: '',
					dewIndoor: ''
				};
				let club = { //会所
					siteName: "泊心堂会所",
					dewIndoor: ''
				}

				// 查询室内温度实时值
				$.post(hdInterface.selectIndoorTemperature, {
					siteId: 13
				}).done(fres => {
					//查询设备冷热总能耗
					$.post(hdInterface.selectHotColdTotalEnergyConsumptionByDeviceIds, {
						siteId: 13
					}).done(sres => {
						if (sres.code == '200' || sres.code == 0 && fres.code == '200' || fres.code == '0') {
							totalData = [...fres.data, ...sres.data];
							totalData.forEach(item => {
								switch (item.deviceId) {
									case "538":
										hotel.heat = project.getDataByPclTypeId(item.plctemplateInfos, 315); //酒店热力入口热量
										break;
									case "549":
										hotel.dewIndoor = project.getDataByPclTypeId(item.plctemplateInfos, 314); //酒店大厅室内温度
										break;
									case "539":
										salesCenter.firstFloor = project.getDataByPclTypeId(item.plctemplateInfos, 315); //售楼中心一层热力入口热量
										break;
									case "540":
										salesCenter.secondFloor = project.getDataByPclTypeId(item.plctemplateInfos, 315); //售楼中心二层热力入口热量
										break;
									case "550":
										salesCenter.dewIndoor = project.getDataByPclTypeId(item.plctemplateInfos, 314); //售楼室内温度
										break;
									case "551":
										club.dewIndoor = project.getDataByPclTypeId(item.plctemplateInfos, 314); //会所前厅室内温度
										break;
									default:
										break;
								}
							});
							// totalData = [...communityFakerData, ...hotel, ...salesCenter, ...club];
							let realData = {
								code: "0",
								data: []
							};
							// console.log(data.data);
							realData.data.push(data.data[0]); //光合谷地热井机房
							realData.data.push(data.data[1]); //光合谷地源机房
							realData.data.push(hotel) //酒店
							realData.data.push(salesCenter) //售楼中心
							realData.data.push(club) //会所	
							realData.data.push(data.data[2]) //青少年交流中心机房
							realData.data.push(communityFakerData) //泊雅苑
							project.loadselectSafetyMonitoring(realData);
							project.loadselectSafetyMonitoringList(realData);
						}
					});
				})
			} else {
				gameInstance.SendMessage("Net", "noData");
			}
		});
	}
	project.sendList();
	setInterval(project.sendList, 60 * 1000);
}
//加载机房列表数据
project.loadselectSafetyMonitoringList = function (data) {
	console.log("机房列表数据", data);
	$(".project-details").remove();
	if (data.code == 0) {
		var data = data.data || [];
		var str = '';
		for (var i = 0; i < data.length; i++) {
			var item = data[i] || {};
			var siteName = convert(item.siteName); //项目名称	
			var systemName = convert(item.systemName); //系统名称
			var coolingArea = convert(item.coolingArea); //供冷面积
			var heatingArea = convert(item.heatingArea); //供热面积
			var refeStatus = item.refeStatus; //站点状态
			var currentDayEnergy = convert(item.currentDayEnergy); //当日总能耗
			//光合谷机房改版
			var heat = convert(item.heat); //热量
			var dewIndoor = convert(item.dewIndoor); //室内温度
			var firstFloor = convert(item.firstFloor); //一层热量
			var secondFloor = convert(item.secondFloor); //二层热量
			if (item.supplyWaterTemperature) {
				var supplyWaterTemperature = convert(item.supplyWaterTemperature) //供水温度
				var supplyWaterPressure = convert(item.supplyWaterPressure) //供水压力
				var backWaterTemperature = convert(item.backWaterTemperature) //回水温度
				var backWaterPressure = convert(item.backWaterPressure) //回水压力
			}
			var displayStyle = 'style="display: none;"'
			if (i + 1 == this.siteOnParams.siteOnIndex) {
				displayStyle = `style="display: block;left:${this.siteOnParams.pointx}px;bottom:${this.siteOnParams.pointy}px;"`;
			}
			if (i == 0 || i == 1) {
				str += `<div class="project-details" id="sitelist${i+1}" ${displayStyle}>
						<div class="title" id="siteName1">${siteName}</div>
						<ul>
							<li>
								<span class="rolling-over-animated duration1">所属系统</span>
								<span class="rolling-over-animated duration1">${systemName}</span>
							</li>
							<li>
								<span class="rolling-over-animated duration2">供冷面积</span>
								<span class="rolling-over-animated duration2"><em>${coolingArea}</em>万㎡</span>
							</li>
							<li>
								<span class="rolling-over-animated duration2">供热面积</span>
								<span class="rolling-over-animated duration2"><em>${heatingArea}</em>万㎡</span>
							</li>
							<li>
								<span class="rolling-over-animated duration3">站点状态</span>
								<span class="rolling-over-animated duration3 ${refeStatus=='s_alarm_type'?'fulde':''}" id="status1">${refeStatus=='s_alarm_type'?"报警":refeStatus=='normal_type'?"正常":refeStatus=='o_alarm_type'?"离线":"--"}</span>
							</li>
							<li>
								<span class="rolling-over-animated duration4">当日总能耗</span>
								<span class="rolling-over-animated duration4"><em>${currentDayEnergy}</em>标准煤</span>
							</li>
						</ul>
					</div>`;
			} else if (i == 2) { //酒店
				str += `<div  style="height:auto" class="project-details" id="sitelist${i+1}" ${displayStyle}>
						<div class="title" id="siteName1">${siteName}</div>
						<ul>
							<li>
								<span class="rolling-over-animated duration1">热量</span>
								<span class="rolling-over-animated duration1">${heat} GJ</span>
							</li>
							<li>
								<span class="rolling-over-animated duration2">大厅室内温度</span>
								<span class="rolling-over-animated duration2"><em>${dewIndoor}</em>&nbsp;℃</span>
							</li>
						</ul>
					</div>`;
			} else if (i == 3) { //售楼中心
				str += `<div  style="height:auto" class="project-details" id="sitelist${i+1}" ${displayStyle}>
						<div class="title" id="siteName1">${siteName}</div>
						<ul>
							<li>
								<span class="rolling-over-animated duration1">一层热量</span>
								<span class="rolling-over-animated duration1">${firstFloor}&nbsp;GJ</span>
							</li>
							<li>
								<span class="rolling-over-animated duration2">二层热量</span>
								<span class="rolling-over-animated duration2"><em>${dewIndoor}</em>&nbsp;GJ</span>
							</li>
							<li>
							<span class="rolling-over-animated duration2">大厅室内温度</span>
							<span class="rolling-over-animated duration2"><em>${dewIndoor}</em>&nbsp;℃</span>
						</li>
						</ul>
					</div>`;
			} else if (i == 4) { //会所
				str += `<div  style="height:auto" class="project-details" id="sitelist${i+1}" ${displayStyle}>
						<div class="title" id="siteName1">${siteName}</div>
						<ul>
							<li>
								<span class="rolling-over-animated duration1">大厅室内温度</span>
								<span class="rolling-over-animated duration1">${dewIndoor}&nbsp;℃</span>
							</li>
						</ul>
					</div>`;
			} else if (i == 5) { //青少年交流中心机房
				str += `<div class="project-details" id="sitelist${i+1}" ${displayStyle}>
				<div class="title" id="siteName1">${siteName}</div>
				<ul>
					<li>
						<span class="rolling-over-animated duration1">所属系统</span>
						<span class="rolling-over-animated duration1">${systemName}</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">供冷面积</span>
						<span class="rolling-over-animated duration2"><em>${coolingArea}</em>万㎡</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">供热面积</span>
						<span class="rolling-over-animated duration2"><em>${heatingArea}</em>万㎡</span>
					</li>
					<li>
						<span class="rolling-over-animated duration3">站点状态</span>
						<span class="rolling-over-animated duration3 ${refeStatus=='s_alarm_type'?'fulde':''}" id="status1">${refeStatus=='s_alarm_type'?"报警":refeStatus=='normal_type'?"正常":refeStatus=='o_alarm_type'?"离线":"--"}</span>
					</li>
					<li>
						<span class="rolling-over-animated duration4">当日总能耗</span>
						<span class="rolling-over-animated duration4"><em>${currentDayEnergy}</em>标准煤</span>
					</li>
				</ul>
			</div>`;
			} else if (i == 6) { //泊雅苑
				str += `<div class="project-details" id="sitelist${i+1}" ${displayStyle}>
				<div class="title" id="siteName1">${siteName}</div>
				<ul>
					<li>
						<span class="rolling-over-animated duration1">供水温度</span>
						<span class="rolling-over-animated duration1">${supplyWaterTemperature}&nbsp;℃</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">供水压力</span>
						<span class="rolling-over-animated duration2"><em>${supplyWaterPressure}</em>bar</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">回水温度</span>
						<span class="rolling-over-animated duration2"><em>${backWaterTemperature}</em>℃</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">回水压力</span>
						<span class="rolling-over-animated duration2"><em>${backWaterPressure}</em>bar</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">热量</span>
						<span class="rolling-over-animated duration2"><em>${heat}</em>GJ</span>
					</li>
				</ul>
			</div>`;
			}
		}
		$("#container").append(str);
	}
}
//加载实时机房数据
project.loadselectSafetyMonitoring = function (data) {
	if (data.code == 0) {
		var data = data.data || [];
		var str = '';
		for (var i = 0; i < data.length; i++) {
			var item = data[i] || {};
			var siteName = convert(item.siteName);
			var systemName = convert(item.systemName);
			var status = item.status;
			var classcolor;
			switch (status) {
				case "1":
					classcolor = "fault";
					break;
				case "0":
					classcolor = "normal";
					break;
				case "-1":
					classcolor = "offline";
					break;
				default:
					break;
			}
			str += `<li class="${classcolor}">
							<img src="./image/icon_fault.png">
							<div class="title">${siteName}</div>
							<div class="system">${systemName}</div>
						</li>`;
		}
		$("#sites").html(str);
	}

}
//切换供冷供热
project.headerBtnClick = function () {
	$(".U3DBtn").on('click',function () {
		let flag = '';
		if($(this).hasClass('U3DLeft')){
			if(!$(this).hasClass('U3DLeftOn')){
				flag = 'leftOn';
			} else if($(this).hasClass('U3DLeftOn')){
				flag = 'leftOff';
			}
		} else if($(this).hasClass('U3DRight')){
			if(!$(this).hasClass('U3DRightOn')){
				flag = 'rightOn';
			} else if($(this).hasClass('U3DRightOn')){
				flag = 'rightOff';
			}
		}
		let dataIndex = '';
		switch (flag){
			case 'leftOn':
			$('.U3DLeft').addClass('U3DLeftOn');
			$('.U3DRight').removeClass('U3DRightOn');
			dataIndex = $(this).attr('data-index');
				break;
			case 'rightOn':
			$('.U3DLeft').removeClass('U3DLeftOn');
			$('.U3DRight').addClass('U3DRightOn');
			dataIndex = $(this).attr('data-index');
				break;
			case 'leftOff':
			case 'rightOff':
			$('.U3DLeft').removeClass('U3DLeftOn');
			$('.U3DRight').removeClass('U3DRightOn');
				break;
		}
		project.SetCoolHeat(dataIndex);
	});
}
//切换能耗
project.changeEnergy = function () {
	var clickNum = 1;
	$(".control_btn span").click(function () {
		clickNum++;
		$(this).addClass("on").siblings().removeClass("on");
		var type = $(this).data('type');
		$(".energy_statis>div").hide();
		$(".energy-comp>div").hide();
		$(".energy_statis>." + type).show();
		$(".energy-comp>." + type).show();
		if (type == "monery11") {
			$("#moneryEnergyTitle").html("费用统计");
		} else {
			$("#moneryEnergyTitle").html("能耗统计");
		}
	});
	setInterval(function () {
		// console.log(clickNum);
		if (clickNum % 2 == 0) {
			$(".control_btn span").eq(0).addClass("on").siblings().removeClass("on");
			var type1 = $(".control_btn span").eq(0).data('type');
			$(".energy_statis>div").hide();
			$(".energy-comp>div").hide();
			$(".energy_statis>." + type1).show();
			$(".energy-comp>." + type1).show();
			if (type1 == "monery11") {
				$("#moneryEnergyTitle").html("费用统计");
			} else {
				$("#moneryEnergyTitle").html("能耗统计");
			}
		} else if (clickNum % 2 == 1) {
			$(".control_btn span").eq(1).addClass("on").siblings().removeClass("on");
			var type2 = $(".control_btn span").eq(1).data('type');
			$(".energy_statis>div").hide();
			$(".energy-comp>div").hide();
			$(".energy_statis>." + type2).show();
			$(".energy-comp>." + type2).show();
			if (type2 == "monery11") {
				$("#moneryEnergyTitle").html("费用统计");
			} else {
				$("#moneryEnergyTitle").html("能耗统计");
			}
		}
		clickNum++;
	}, 1000 * 30)
}
//加载项目信息
project.loadselectProjectMessage = function () {
	$.post(hdInterface.selectProjectMessage, {
		'projectId': _PROJECT_ID
	}, function (data) {
		if (data['code'] === 0) {
			var result = data.data || {};
			// if (result['provinceName'] == null) {
			// 	$('#provinceName').css('height','10px')
			// }
			Object.keys(result).forEach(function (item) {
				var dom = $("#" + item);
				if (dom.length > 0) {
					dom.text(result[item]);
				}
			})

		}
	})
}
//加载能耗统计
project.loadselectEnergyStaticsByProjectId = function () {
	$.post(hdInterface.selectEnergyStaticsByProjectId, {
		'projectId': _PROJECT_ID
	}, function (data) {
		if (data['code'] === 0) {
			var result = data.data || {};
			Object.keys(result).forEach(function (item) {
				var dom = $("#" + item);
				if (dom.length > 0) {
					dom.text(result[item]);
				}
			})
		}
	})
}
//点击查看机房数据
project.clickSites = function () {
	$('body').on('click', '#sites li', function () {
		var isclick = $(this).hasClass("siteclick");
		var sitename = $(this).find(".title").html();
		if (isclick) {
			//选中状态
			$(this).removeClass("siteclick");
			// project.changeSiteList(sitename,2);
		} else {
			//未选中状态
			$(this).addClass("siteclick");
			// project.changeSiteList(sitename,1);
		}
	});

}
//清除选中状态
project.clearsiteclick = function (index) {
	$("#sites li").eq(index - 1).removeClass("siteclick");
}
// 收起展开
var buttomBar = null;
project.buttomIcon = function () {
	buttomBar = new SlideMenu({
		direction: 'down',
		menuBtn: '#buttomIcon',
		menuBox: '.bottombar',
		menuSetPosition: [10, -230],
		btnSetposition: [240, 0],
		isOpen: true,
		bgDrop: 5,
		callBackFun: function (e) {
			if (e) {
				$('#buttomIcon>i').removeClass('layui-icon-up').addClass('layui-icon-down')
			} else {
				$('#buttomIcon>i').removeClass('layui-icon-down').addClass('layui-icon-up')
			}
		}
	})
}
//获取指定id的一条数据
project.getDataByPclTypeId = function (data, id) {
	for (let i = 0; i < data.length; i++) {
		if (id == data[i].plcTypeId) {
			return data[i].refeText;
		}
	}
}
project.energyObj = {
	energyA:{
		energyType1:'由水源热泵机组+单冷机组供应',
		energyType2:'由地热井水梯级利用+水源热泵+锅炉(调峰)供应',
		energyType3:'由风机盘管+新风系统+地板采暖组成'
	},
	energyB:{
		energyType1:'由地源机组供应',
		energyType2:'由地源机组供应',
		energyType3:'由风机盘管系统组成'
	},
	energyC:{
		energyType1:'由水源机组+单冷机组供应',
		energyType2:'由地热井水梯级利用+水源机组组成',
		energyType3:'由风机盘管系统组成'
	},
}
// 能源形式
project.energyType = function (data){
	Object.keys(data).forEach((item,index) => {
		$(`#${item}`).html(data[item]);
	})
}
// 能源形式按钮
let timer = null;
project.energyBtn = function(){
	let num = 0;
	$('.energyBtnParent .btn').on('click',function(){
		if($(this).hasClass('on')){
			return;
		}
		let type = $(this).attr('data-type');
		num = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		project.energyType(project.energyObj[type]);
	})
	timer = setInterval(function(){
		num++;
		$('.energyBtnParent .btn').eq(num%3).addClass('on').siblings().removeClass('on');
		let type = $('.energyBtnParent .btn').eq(num%3).attr('data-type');
		project.energyType(project.energyObj[type]);
	},20*1000);
}
project.init();
window.project = project;