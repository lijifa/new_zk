var project = {
	// sitelist:[],
	siteOnParams:{}
}
var _PROJECT_ID = getParams()['projectId'];
var proname=getParams()['proname'];
var layuiId=getParams()["layuiId"];//标签id
project.init = function () {
	// project.onunload()
	$('.nowYear').html(new Date().getFullYear());
	project.loadselectProjectMessage();//加载项目信息
	project.headerBtnClick();//切换供冷供热
	project.changeEnergy();//切换能耗
	project.loadselectEnergyStaticsByProjectId();//加载能耗统计
	project.clickSites();//点击查看机房数据
	project.addSwitchpageBtn();//2d 3d切换
	project.buttomIcon();// 收起展开
	project.send();
	// $("#innerheader").attr("data-title",decodeURI(proname)+"总览");
};
project.addSwitchpageBtn = function() {
	var params = location.href.split("?")[1];
	if(location.href.indexOf("3d")!=-1){
		var str = `<a class="on">切换3D</a>
				 <a href="index.html?` + params +
			`">切换2D</a>`;
	}else{
		var str = `<a href="index3d.html?` + params + `">切换3D</a>
				 <a class="on">切换2D</a>`;
	}
		
	var dom = $("#switchpagebtn");
	if (dom.find("a").length == 0) {
		$("#switchpagebtn").html(str);
	}
}
//u3d初始化
project.u3dinit=function(gameInstance){
	//供冷
	project.SetCooling=function(hasOn){
		if(hasOn){
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '关');
		}else{
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '开');
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '关');
		}
		
	}
	//供暖
	project.SetHeating=function(hasOn){
		if(hasOn){
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '关');
		}else{
			gameInstance.SendMessage("UpdateHeating", "SetHeating", '开');
			gameInstance.SendMessage("UpdateHeating", "SetCooling", '关');
		}
		
	}
	//移动列表弹窗位置
	project.showSitelist=function(params){
		
		var paramsArr=params.split(",");
		var pos=paramsArr[0];//机房索引 1:光合谷地热井机房  2:光合谷地源机房		
		var pointx=paramsArr[1];//横坐标
		var pointy=paramsArr[2];//纵坐标
		if(pointx>1450){
			pointx=pointx*1-250;
		}
		if(pointy<350){
			pointy=pointy*1+270;
		}
		pointy=pointy*1-150;
		var dom=$("#sitelist"+pos);
		dom.css({"left":pointx+"px","bottom":pointy+"px"});
		dom.show();
		this.siteOnParams={
			"siteOnIndex":pos,
			"pointx":pointx,
			"pointy":pointy
		};
	}
	project.hideSitelist=function(){
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
	project.sendList=function(data){		
		 $.post(hdInterface.selectSafetyMonitoring, {
		 	'projectId': _PROJECT_ID
		 }, function (data) {
			gameInstance.SendMessage("Net", "GetGuangheguData", JSON.stringify(data));
			project.loadselectSafetyMonitoring(data);
			project.loadselectSafetyMonitoringList(data);
		});		
	}
	project.sendList();
	setInterval(project.sendList,60*1000);
}
//加载机房列表数据
project.loadselectSafetyMonitoringList=function(data){
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
			var status=item.status;//站点状态
			var currentDayEnergy=convert(item.currentDayEnergy);//当日总能耗
			var displayStyle='style="display: none;"'
			if(i+1==this.siteOnParams.siteOnIndex){
				displayStyle=`style="display: block;left:${this.siteOnParams.pointx}px;bottom:${this.siteOnParams.pointy}px;"`;
			}
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
								<span class="rolling-over-animated duration3 ${status==1?'fulde':''}" id="status1">${status==1?"报警":status==0?"正常":"离线"}</span>
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
project.loadselectSafetyMonitoring=function(data){
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
//切换供冷供热
project.headerBtnClick=function(){
	$(".topbtn").click(function(){
		var hasOn=$(this).hasClass("on");//是否选中
		$(".topbtn").removeClass("on");
		if(!hasOn){
			$(this).addClass("on");
		}
		var dataIndex=$(this).attr("data-index");
		switch (dataIndex){
			case 'cooling':
				project.SetCooling(hasOn);
				break;
			case 'heating':
				project.SetHeating(hasOn);
				break;
			default:
				break;
		}
	});
}
//切换能耗
project.changeEnergy=function(){
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
//加载项目信息左侧
project.loadselectProjectMessage=function(){
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
project.loadselectEnergyStaticsByProjectId=function(){
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
//点击查看机房数据
project.clickSites=function(){
	$('body').on('click','#sites li',function(){
		var isclick=$(this).hasClass("siteclick");
		var sitename=$(this).find(".title").html();
		if(isclick){
			//选中状态
			$(this).removeClass("siteclick");
			// project.changeSiteList(sitename,2);
		}else{
			//未选中状态
			$(this).addClass("siteclick");
			// project.changeSiteList(sitename,1);
		}		
		
		
	});
	
}
//清除选中状态
project.clearsiteclick=function(index){
	$("#sites li").eq(index-1).removeClass("siteclick");
}
// 收起展开
project.buttomIcon=function(){
	let bottomBar = new SlideMenu({
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
project.send=function(){
	 $.post(hdInterface.selectSafetyMonitoring, {
		'projectId': _PROJECT_ID
	 }, function (data) {
		 console.log(data)
		 data.data.forEach((item,index)=>{
			if(item.siteId == 14){
				if(item.status == '-1'){
					$('#gjJiFang1').show()
					$('#gjJiFang2').hide()
					$('#gjJiFang3').hide()
				} else if (item.status == '0'){
					$('#gjJiFang1').hide()
					$('#gjJiFang2').hide()
					$('#gjJiFang3').show()
				} else {
					$('#gjJiFang1').hide()
					$('#gjJiFang2').show()
					$('#gjJiFang3').hide()
				}
				$("#container").append(
				`<div class="project-details" id="sitelist" style="top: 30%;left: 55%;" data-disflag='hide'>
				<div class="title" id="siteName1">${item.siteName}</div>
				<ul>
					<li>
						<span class="rolling-over-animated duration1">所属系统</span>
						<span class="rolling-over-animated duration1">${item.systemName}</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">供冷面积</span>
						<span class="rolling-over-animated duration2"><em>${item.coolingArea}</em>万㎡</span>
					</li>
					<li>
						<span class="rolling-over-animated duration2">供热面积</span>
						<span class="rolling-over-animated duration2"><em>${item.heatingArea}</em>万㎡</span>
					</li>
					<li>
						<span class="rolling-over-animated duration3">站点状态</span>
						<span class="rolling-over-animated duration3 ${item.status==1?'fulde':''}" id="status1">${item.status==1?"报警":item.status==0?"正常":"离线"}</span>
					</li>
					<li>
						<span class="rolling-over-animated duration4">当日总能耗</span>
						<span class="rolling-over-animated duration4"><em>${item.currentDayEnergy}</em>标准煤</span>
					</li>
				</ul>
			</div>
				`);
			}
		 })
	});	
	$('.jifang').on('click',function(){
		var disFlag=$('#sitelist').attr('data-disflag')
		if(disFlag=='show'){
			$('#sitelist').hide()
			$('#sitelist').attr('data-disflag','hide')
		} else {
			$('#sitelist').show()
			$('#sitelist').attr('data-disflag','show')
		}
	})
	$(document).mouseup(function(e) {
	    var  content = $('#sitelist');
		var content1 = $('.jifang')
	    if(!content.is(e.target) && !content1.is(e.target)
		&& content.has(e.target).length === 0
		&& content1.has(e.target).length === 0) { 
			$('#sitelist').hide()
			$('#sitelist').attr('data-disflag','hide')
	    }
	});
	$('#gjJiFang1').on('dblclick',function(){
		// window.GuoJiSite1()
		DoubleClickJiFangBuild1()
		})
	$('#gjJiFang2').dblclick(function(){
		// window.GuoJiSite1()
		DoubleClickJiFangBuild1()
	})
	$('#gjJiFang3').dblclick(function(){
		// window.GuoJiSite1()
		DoubleClickJiFangBuild1()
	})
	$('#moduan').dblclick(function(){
		DoubleClickMoDuanBuild1()
		// window.GuoJiSite1()
	})
}
function DoubleClickJiFangBuild1(){
	window.GuoJiSite1 = function () {
		var topJQ = top.$;
		  var GuoJiSiteMenuData = topJQ("#menu [data-url^='./bussiness/internationalFirmsU3D/index.html']");	  
		  var dataUrlStr='./bussiness/internationalFirmsU3D/index.html'
		  // console.log(parent._PROJECT_ID);
		  for (var i = 0; i < GuoJiSiteMenuData.length; i++) {	 
			var url=topJQ(GuoJiSiteMenuData[i]).data("url");
			var id=topJQ(GuoJiSiteMenuData[i]).data("id");
			var title=topJQ(GuoJiSiteMenuData[i]).data("title");
			if(url.indexOf(_PROJECT_ID)!=-1){
			  top.window.openNewTab(url, id, title);
				// var dataUrlArr.push(top.$('#menu a').attr('data-url')==undefined?undefined:top.$('#menu a').attr('data-url'))
				// console.log(dataUrlArr)
				// var dataUrlIndex=null
				// for(var j=0;j<dataUrlArr.length;j++){
				// 	if(dataUrlArr[j].attr('data-url')!==undefined&&
				// 	dataUrlArr[j].attr('data-url').indexOf(dataUrlStr)!==-1){
				// 		dataUrlIndex=index
				// 	}
				// }
				// dataUrlArr.forEach((item,index)=>{
				// 	if(item.attr('data-url')!==undefined&&item.attr('data-url').indexOf(dataUrlStr)!==-1){
				// 		dataUrlIndex=index
				// 	}
				// })
				// if(dataUrlIndex!==null){
				// 	top.$('#menu a').parent().find('layui-this').removeClass('layui-this')
				// 	top.$('#menu a').eq(dataUrlIndex).parent().addClass('layui-this')
				// }
				// var dataUrl=top.$('#menu a')
			  return;
			}
		  }
		  layui.use('layer', function() {
		      var layer = layui.layer;
		      layer.msg('当前项目没有机房页面，请联系管理员添加！');	  			
		  });
	}
	// alert("当前项目没有机房页面，请联系管理员添加！");
		// console.log(top.$('#menu a'))
		// var dataUrl=top.$('#menu a')
		// console.log(dataUrl)
	  // top.window.openNewTab(GuoJiSiteMenuData.data("url"), GuoJiSiteMenuData.data("id"), GuangHeGuSiteMenuData.data("title"));
	window.GuoJiSite1()
};
function DoubleClickMoDuanBuild1(){
	// 跳转到国际企业社区末端页
	window.MoDuanSite1 = function () {
		var topJQ = top.$;
	  var MoDuanSiteMenuData = topJQ("#menu [data-url^='./bussiness/CBDterminal/index3d.html']");	  
	  // console.log(parent._PROJECT_ID);
	  for (var i = 0; i < MoDuanSiteMenuData.length; i++) {	 
		var url=topJQ(MoDuanSiteMenuData[i]).data("url");
		var id=topJQ(MoDuanSiteMenuData[i]).data("id");
		var title=topJQ(MoDuanSiteMenuData[i]).data("title");
		if(url.indexOf(_PROJECT_ID)!=-1){
			// console.log(url)
		  top.window.openNewTab(url, id, title);
		  return;
		}
	  }
	  // alert("当前项目没有机房页面，请联系管理员添加！");
	  layui.use('layer', function() {
		  var layer = layui.layer;
		  layer.msg('当前项目没有末端页面，请联系管理员添加！');	  			
	  });				
		// console.log(top.$('#menu a'))
	  // top.window.openNewTab(MoDuanSiteMenuData.data("url"), MoDuanSiteMenuData.data("id"), GuangHeGuSiteMenuData.data("title"));
	};
	window.MoDuanSite1()
}

project.init();
window.project = project;