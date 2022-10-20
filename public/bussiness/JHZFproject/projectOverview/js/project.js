var project = {
	// sitelist:[],
	siteOnParams: {}
}
var _PROJECT_ID = getParams()['projectId'];
var _SITE_ID = getParams()['siteId'];
var proname = getParams()['proname'];
var layuiId = getParams()["layuiId"]; //标签id
var timer = null;
document.addEventListener("visibilitychange", function() {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	} else {
		project.creatTimer();
	}
});
var objName = layuiId;
//刷新
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
//标签切换
// top.registerListener(objName, function(e) {
// 	if (e == objName) {
// 		project.creatTimer();
// 	} else {
// 		clearInterval(timer);
// 	}
// }); //注册
project.init = function () {
	$('.nowYear').html(new Date().getFullYear());
	project.loadselectProjectMessage(); //加载项目信息
	project.changeEnergy(); //切换能耗
	project.loadselectEnergyStaticsByProjectId(); //加载能耗统计
	project.buttomIcon(); //收起展开
	project.operations();
	project.scoreRe();
	$("#container").append('<iframe src="./JingHai/index.html?v='+version+'" frameborder="0" height="100%" width="100%"></iframe>');
};
//u3d初始化
project.u3dinit = function (gameInstance) {
	project.U3DInfo = function() {
		$.get(hdInterface.selectSiteElectricSituationList, {
			'projectId': _PROJECT_ID
		}, function(data) {
			console.log(data);
			if (data['code'] === 0) {
				gameInstance.SendMessage("UpdateStateMgr", 'GetJsMessage',JSON.stringify(data));
			}
		})
	}
	project.U3DInfo();
	project.creatTimer = function(){
		timer = setInterval(function(){
			project.U3DInfo();
		},1000*60);
	};
	project.creatTimer();
}
//切换能耗
project.changeEnergy = function () {
	$('.site').on('click',function(){
		if($(this).hasClass('siteOn')){
			$(this).removeClass('siteOn');
		} else {
			$(this).addClass('siteOn');
		}
	})
	$('.sky>div').on('click', function() {
		let bg = $(this).parent().css('background-image');
		if($(this).hasClass('skyOn')){
			return;
		}
		$(this).addClass('skyOn').siblings().removeClass('skyOn');
		if (bg.match('white')) {
			bg = bg.replace(/white/, 'black');
		} else {
			bg = bg.replace(/black/, 'white');
		}
		$(this).parent().css('background-image', bg);
	})
	var clickNum = 1;
	$(".control_btn span").click(function () {
		clickNum++;
		$(this).addClass("on").siblings().removeClass("on");
		var type = $(this).data('type');
		$(".energy_statis>div").hide();
		$(".energy-comp>div").hide();
		$(".energy_statis>." + type).show();
		$(".energy-comp>." + type).show();
	});
	setInterval(function () {
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

// 运维统计
project.operations = function(){
	$.post(hdInterface.selectSafeScoreNew, {
		'siteId': _SITE_ID
	},function(data){
		if(data.code == 0){
			$('#safetyScore').html(convert(data.data.safetyScore));
		}
	})
	$.post(hdInterface.selectAlarmCount,{
		'projectId': _PROJECT_ID
	},function(data){
		if(data.code == 0){
			$('#alarmCount').html(convert(data.data.alarmCount));
			$('#recoveryCount').html(convert(data.data.recoveryCount));
		}
	})
}

project.scoreRe = function(){
	$('.scoreResult').hover(function(){
		$('.score').show();
	},function(){
		$('.score').hide();
	})
}
project.init();
window.project = project;