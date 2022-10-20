var projectU3D = {}
var _PROJECT_ID = getParams()['projectId'];
projectU3D.init=function(){
	// projectU3D.changeExtreme();
	// projectU3D.projectU3Ddata();//U3D传递数据
	$('.nowYear').html(new Date().getFullYear());
	projectU3D.loadselectProjectMessage();
	projectU3D.loadselectEnergyStaticsByProjectId();
	projectU3D.buttomIcon();
	projectU3D.changeEnergy();
	$("#container").append('<iframe src="./CBDbuild/index.html?v='+version+'" frameborder="0" width="100%" height="100%"></iframe>');
}
projectU3D.changeExtreme=function(){
	$(".extreme img").click(function(){
		var dataclick=$(this).attr("data-click");
		if(dataclick!="true"){
			$(".content").hide();
			$(this).siblings(".content").show();
			$(".extreme img").attr("data-click","false");
			$(this).attr("data-click","true");
			
		}else{
			$(".content").hide();
			$(this).siblings(".content").hide();
			$(this).attr("data-click","false");
		}
		
	});
}
//U3D传递数据
projectU3D.projectU3Ddata=function(gameInstance){
	//移动列表弹窗位置
	projectU3D.showSitelist=function(params){
		var heightWIN=$(document).height()
		var widthEIN=$(document).width()
		var paramsArr=params.split(",");
		// console.log(paramsArr)
		var pos=paramsArr[0];//机房索引 1:光合谷地热井机房  2:光合谷地源机房		
		var pointx=paramsArr[1];//横坐标
		var pointy=paramsArr[2];//纵坐标
		// console.log(heightWIN,widthEIN)
		// console.log("x前",pointx)
		if(pointx>widthEIN-500){
			pointx=pointx*1-350;
		} else if(pointx<500) {
			pointx=pointx*1+100
		} else{
			pointx=pointx*1+100
		}
		// console.log("x后",pointx)
		// console.log("y前",pointy)
		if(pointy<150){
			pointy=pointy*1+150;
		} else if(pointy>heightWIN-300) {
			pointy=pointy*1-150;
		} else{
			pointy=pointy*1-100;
		}
		// console.log("y后",pointy)
		var dom=$("#sitelist"+pos);
		dom.css({"left":pointx+"px","bottom":pointy+"px"});
		dom.show();
		this.siteOnParams={
			"siteOnIndex":pos,
			"pointx":pointx,
			"pointy":pointy
		};
	}
	projectU3D.hideSitelist=function(){
		$(".project-details").hide();
		this.siteOnParams={};
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
	projectU3D.sendList=function(data){		
		 $.post(hdInterface.selectSafetyMonitoring, {
		 	'projectId': _PROJECT_ID
		 }, function (data) {
			 // console.log(data)
			 // data.data.forEach((item,index)=>{
				//  console.log(item)
				//  item.status='1'
			 // })
			gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "15012,"+JSON.stringify(data));
			projectU3D.loadselectSafetyMonitoring(data);
			projectU3D.loadselectSafetyMonitoringList(data);
		});		
	}
	projectU3D.sendList();
	setInterval(projectU3D.sendList,60*1000);
	// $.post(hdInterface.selectSafetyMonitoring, {
	//  	'projectId': _PROJECT_ID
	//  }, function (data) {
	// 	gameInstance.SendMessage("Net", "GetGuangheguData", JSON.stringify(data));
	// 	project.loadselectSafetyMonitoring(data);
	// 	project.loadselectSafetyMonitoringList(data);
	// });	
}
//加载机房列表数据
projectU3D.loadselectSafetyMonitoringList=function(data){
	$(".project-details").remove();
	if(data.code==0){
		var data=data.data||[];
		var str='';
		for (var i = 0; i < data.length; i++) {
			var item=data[i]||{};
			var siteName=convert(item.siteName);//项目名称	
			var systemName=convert(item.systemName);//系统名称
			var coolingArea=convert(item.coolingArea);//供冷面积
			var heatingArea=convert(item.heatingArea);//供热面积
			var refeStatus=item.refeStatus;//站点状态
			var currentDayEnergy=convert(item.currentDayEnergy);//当日总能耗
			var displayStyle='style="display: none;"'
			// if(i+1==this.siteOnParams.siteOnIndex){
			// 	displayStyle=`style="display: block;left:${this.siteOnParams.pointx}px;bottom:${this.siteOnParams.pointy}px;"`;
			// }
			str+=`<div class="project-details" id="sitelist${i+1}" ${displayStyle}>
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
		}
		$("#container").append(str);
	}
}
//加载实时机房数据
projectU3D.loadselectSafetyMonitoring=function(data){
		if(data.code==0){
			var data=data.data||[];
			var str='';
			for (var i = 0; i < data.length; i++) {
				var item=data[i]||{};
				var siteName=convert(item.siteName);	
				var systemName=convert(item.systemName);	
				var status=item.status;
				var classcolor;
				switch (status){
					case "1":
					    classcolor="fault";
						break;
					case "0":
						classcolor="normal";
						break;
					case "-1":
						classcolor="offline";
						break;
					default:
						break;
				}
				str+=`<li class="${classcolor}">
							<img src="./image/icon_fault.png">
							<div class="title">${siteName}</div>
							<div class="system">${systemName}</div>
						</li>`;
			}
			$("#sites").html(str);
		}
	
}

//加载项目信息左侧
projectU3D.loadselectProjectMessage=function(){
	$.post(hdInterface.selectProjectMessage, {
		'projectId': _PROJECT_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			var result = data.data||{};
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
//加载能耗统计底部
projectU3D.loadselectEnergyStaticsByProjectId=function(){
	$.post(hdInterface.selectEnergyStaticsByProjectId, {
		'projectId': _PROJECT_ID
	}, function (data) {
		if (data['code'] === 0) {
			// console.log(data.data)
			var result = data.data||{};
			Object.keys(result).forEach(function (item) {
				var dom = $("#" + item);
				if (dom.length > 0) {
						dom.text(result[item]);
				}
			})
		}
	})
}
// 收起展开
var bottomBar = null;
projectU3D.buttomIcon=function(){
	bottomBar = new SlideMenu({
		direction:'down',
		menuBtn:'#buttomIcon',
		menuBox:'.bottombar',
		bgMask:false,
		menuSetPosition:[10,-230],
		btnSetposition:[240,0],
		isOpen:true,
		bgDrop:5,
		callBackFun:function(e){
			if(e){
				$('#buttomIcon>i').removeClass('layui-icon-up').addClass('layui-icon-down')
			} else {
				$('#buttomIcon>i').removeClass('layui-icon-down').addClass('layui-icon-up')
			}
		}
	})
}
//切换能耗
projectU3D.changeEnergy=function(){
	var clickNum=0;
	$(".control_btn span").click(function(){
		clickNum++;
		$(this).addClass("on").siblings().removeClass("on");
		var type=$(this).data('type');
		$(".energy_statis>div").hide();
		$(".energy-comp>div").hide();
		$(".energy_statis>."+type).show();
		$(".energy-comp>."+type).show();
		if(type=="monery11"){
			$("#moneryEnergyTitle").html("费用统计");
		}else{
			$("#moneryEnergyTitle").html("能耗统计");
		}
	});
	setInterval(function(){
			 // console.log(clickNum);
			 if(clickNum%2==0){
				 $(".control_btn span").eq(0).addClass("on").siblings().removeClass("on");
				var type1=$(".control_btn span").eq(0).data('type');
				$(".energy_statis>div").hide();
				$(".energy-comp>div").hide();
				$(".energy_statis>."+type1).show();
				$(".energy-comp>."+type1).show();
				if(type1=="monery11"){
					$("#moneryEnergyTitle").html("费用统计");
				}else{
					$("#moneryEnergyTitle").html("能耗统计");
				}
			 }else if(clickNum%2==1){
				 $(".control_btn span").eq(1).addClass("on").siblings().removeClass("on");
				var type2=$(".control_btn span").eq(1).data('type');
				$(".energy_statis>div").hide();
				$(".energy-comp>div").hide();
				$(".energy_statis>."+type2).show();
				$(".energy-comp>."+type2).show();
				if(type2=="monery11"){
					$("#moneryEnergyTitle").html("费用统计");
				}else{
					$("#moneryEnergyTitle").html("能耗统计");
				}
			 }
			 clickNum++;
	},1000*30)
}
projectU3D.init();
window.projectU3D=projectU3D;