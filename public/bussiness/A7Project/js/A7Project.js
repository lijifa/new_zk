var A7Project = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var layuiId = getParams()["layuiId"]; //标签id
var cameraBox = null;
var timer = null,timer1 = null, awaitTimer = false, tipTime = null;
var clickFloor = true;
var floorNum = 1;
var EquipmentLevel = true;
var GotoControlPanel = true;
//屏蔽右键菜单
document.oncontextmenu = function () {
	event.returnValue = false;
}
/* document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
	} else {
	}
});
var objName = layuiId;
//刷新
window.onunload = function() {
	top.unregisterListener(objName); //销毁
}
//标签切换
top.registerListener(objName, function(e) {
	if(e == objName){
	} else {
	}
}); //注册
 */

A7Project.init = function() {
	$("#camera-containerA7").prepend(
		'<iframe src="./Community/index.html?v=' + version +
		'" frameborder="0" width="100%" height="100%" style="margin-top: 0;"></iframe>'
	);
	A7Project.createScenesPanel();
	A7Project.changePanel();
	A7Project.openAndClose();
	timer = setInterval(function(){
		let year = new Date().getFullYear();
		let month = new Date().getMonth()+1;
		let date = new Date().getDate();
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();
		let str = '';
		month = month < 10 ? '0' + month : month;
		date = date < 10 ? '0' + date : date;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		str = year+'/'+month+'/'+date+' '+hours+':'+minutes+':'+seconds;
		$('#time').html(str);
	},1000);
};
let scenesData = {
	code: 0,
	msg: 'success',
	data: {
		floor1: [{
			name: '暖通系统',
			panel: 1,
			area: [{
				name: '暖通系统',
				key: '0',
				scenes: [{
						"name": "一楼走廊空调一号",
						"key": "1",
						"location": "-8.682801,1.392314,-6.932545,0"
					},
					{
						"name": "一楼技术部一号",
						"key": "1",
						"location": "-6.014966,1.392314,6.657168,-90"
					},
					{
						"name": "一楼大厅空调一号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼大厅空调二号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼大厅空调三号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼大厅空调四号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼大厅空调五号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼大厅空调六号",
						"key": "1",
						"location": "2.305333,1.392314,10.23375,-270"
					},
					{
						"name": "一楼培训室一号",
						"key": "1",
						"location": "5.331677,1.392314,3.615757,-90"
					},
					{
						"name": "一楼培训室二号",
						"key": "1",
						"location": "5.331677,1.392314,3.615757,-90"
					},
					{
						"name": "一楼培训室三号",
						"key": "1",
						"location": "5.331677,1.392314,3.615757,-90"
					},
					{
						"name": "一楼培训室四号",
						"key": "1",
						"location": "5.331677,1.392314,3.615757,-90"
					},
					{
						"name": "二楼休息区空调",
						"key": "2",
						"location": "-12.3245,5.392313,-9.442062,90"
					},
					{
						"name": "会议室准备间空调",
						"key": "2",
						"location": "-12.40351,5.392313,-5.129635,90"
					},
					{
						"name": "二楼走廊空调一号",
						"key": "2",
						"location": "-8.326214,5.392313,-7.13913,0"
					},
					{
						"name": "空调西1",
						"key": "2",
						"location": "-5.802458,5.392313,2.39343,0"
					},
					{
						"name": "空调东1",
						"key": "2",
						"location": "-5.802458,5.392313,2.39343,0"
					},
					{
						"name": "运维办公室空调",
						"key": "2",
						"location": "-5.882823,5.392313,7.159527,-90"
					},
					{
						"name": "二楼大厅空调东一号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调东二号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调东三号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调东四号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调东五号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调东六号",
						"key": "2",
						"location": "-2.459143,5.392313,9.581721,-90"
					},
					{
						"name": "二楼大厅空调西一号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					},
					{
						"name": "二楼大厅空调西二号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					}, {
						"name": "二楼大厅空调西三号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					}, {
						"name": "二楼大厅空调西四号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					}, {
						"name": "二楼大厅空调西五号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					}, {
						"name": "二楼大厅空调西六号",
						"key": "2",
						"location": "-2.186813,5.392313,-8.720753,-90"
					}
				]
			}]
		}, {
			name: '照明系统',
			panel: 2,
			area:[{
				name:'照明系统',
				key:'0',
				scenes:[{
					"name":'一楼照明触摸屏',
					"key":'1',
					"location":'-2.445567,5.31,5.487529,-90'
				},{
					"name":'二楼照明触摸屏',
					"key":'2',
					"location":'-2.445567,5.31,5.487529,-90'
				}]
			}]
		}]
	}
}
// 面板选项点击
A7Project.U3Dinit = function(gameInstance) {
	A7Project.OperationRecordX = function(e){
		clearTimeout(tipTime);
		$('.textInfo').show().html(JSON.parse(e).content);
		tipTime = setTimeout(function(){
			$('.textInfo').hide();
		},2000);
		$.post(hdInterface.automaticCruiserRecord,JSON.parse(e),function(data){
			console.log(data);
		})
	}
	A7Project.changeScenes = function() {
		$(document).on('click', '.scenes', function() {
			if(!EquipmentLevel){
				return;
			}
			let type = $(this).attr('data-type');
			let text = $(this).text();
			gameInstance.SendMessage("FPSController", "EquipmentLevel", type+','+text);
			$('.cruise').removeClass('cruiseOn');
			scenesFlag = type;
			GotoControlPanel = false;
			$('.cruise').css({
				'cursor':'not-allowed'
			})
		})
		$(document).on('mousedown mouseup', '.scenes', function(e) {
			if(!EquipmentLevel){
				return;
			}
			if(e.type == 'mousedown'){
				$(this).addClass('on');
			} else if(e.type == 'mouseup'){
				$(this).removeClass('on');
			}
		})
		$(document).on('touchstart touchend', '.scenes', function(e) {
			if(!EquipmentLevel){
				return;
			}
			if(e.type == 'touchstart'){
				$(this).addClass('on');
			} else if(e.type == 'touchend'){
				$(this).removeClass('on');
			}
		})
	}
	A7Project.changeScenes();
	cameraBox = new camera({
		outerContainer: '#camera-containerA7',
		cameraIdName: 'camerA7',
		cameraUrlArr: [],
		openCallBack: function(e) {

		},
		closeCallBack: function(e) {

		}
	})
	// 面板数据
	A7Project.deviceData = function(){
		/* $.post(hdInterface.queryDevicePlcTemplateInfo,{
			siteId:49
		}).done(function(data){
			if(data.code == 0){
				console.log('查询=====');
				console.log(data);
				gameInstance.SendMessage("CanvasLongTimeShow", "SendJson", JSON.stringify(data));
			}
		}) */
		$.ajax({
			url:hdInterface.queryDevicePlcTemplateInfo,
			type:'post',
			timeout:3000,
			data:{
				siteId:49
			},
			success:function(data){
				if(data.code == 0){
					// console.log('查询=====');
					// console.log(data);
					gameInstance.SendMessage("CanvasLongTimeShow", "SendJson", JSON.stringify(data));
				}
			}
		})
	}
	A7Project.deviceData();
	timer1 = setInterval(function(){
		if (awaitTimer) {
			return;
		}
		A7Project.deviceData();
	},3*1000)
	// 切换楼层
	A7Project.changeFloor = function(){
		$('.floorBar>div').on('click',function(){
			if(!clickFloor){
				return;
			}
			let floor = $(this).attr('data-floor');
			if(floor == floorNum){
				return;
			}
			$(this).addClass('on').siblings('div').removeClass('on');
			gameInstance.SendMessage("FPSController", "ButtonQieHuanLouCeng", floor);
		})
	}
	A7Project.changeFloor();
	// 返回按钮
	A7Project.returnBack = function(){
		$('.return').on('click',function(){
			gameInstance.SendMessage("FPSController", 'StopCruise');
			$('.cruise').removeClass('cruiseOn');
			EquipmentLevel = true;
			$('.scenes').removeClass('on');
		})
	}
	A7Project.returnBack();
	// 寻路按钮
	A7Project.cruiseAuto = function(){
		$('.cruise').on('click',function(){
			if(!GotoControlPanel){
				return;
			}
			if($(this).hasClass('cruiseOn')){
				gameInstance.SendMessage("FPSController", 'StopPathfinding');
				$(this).removeClass('cruiseOn');
				EquipmentLevel = true;
				$('.controlPanel').show();
			} else {
				gameInstance.SendMessage("FPSController", 'PlayerPathfinding');
				$(this).addClass('cruiseOn');
				EquipmentLevel = false;
				$('.controlPanel').hide();
			}
		})
	}
	A7Project.cruiseAuto();
	// 控制
	A7Project.control = function(e){
		awaitTimer = true;
		$.post(hdInterface.multiple,{
			params:e,
		}).done(function(data){
			// console.log('控制=====');
			// console.log(data);
			A7Project.createMask(0);
			if(data.code == 0){
				setTimeout(function(){
					A7Project.removeMask();
					A7Project.createMask(1);
				},3*1000);
			} else {
				setTimeout(function(){
					A7Project.removeMask();
					A7Project.createMask(2);
				},3*1000);
			}
			setTimeout(A7Project.removeMask,5*1000);
		})
	}
}
// 生成场景面板
A7Project.createScenesPanel = function(floor = '1', type = '1') {
	let data = scenesData.data['floor' + floor];
	data.forEach((item, index) => {
		if (type == item.panel) {
			data = item.area;
		}
	})
	$('.controlItem').html('');
	data.forEach((item, index) => {
		$('.controlItem').append(`
		<div class="panel ${index == 0 ? 'panelOn' : ''}" data-index="${index}">${item.name}</div>
		<ul class="panelItem panelItem${index}" style="${index == 0 ? 'height:auto':''}"></ul>
		`)
		item.scenes.forEach((e, i) => {
			$(`.panelItem${index}`).append(`
			<li class="scenes" data-type="${e.key}">${e.name}</li>
			`)
		})
	})
}
// 场景控制面板切换
let changePanelFlag = '1';
A7Project.changePanel = function() {
	$('.controlBtn button').on('click', function() {
		let flag = $(this).attr('data-flag');
		if (changePanelFlag == flag) {
			return;
		}
		$(this).addClass('on').siblings().removeClass('on');
		changePanelFlag = flag;
		A7Project.createScenesPanel(1, changePanelFlag);
	})
}
// 场景栏选项收起展开
let openAndCloseIndex = '0';
A7Project.openAndClose = function() {
	$(document).on('click', '.panel', function() {
		let index = $(this).attr('data-index');
		if (openAndCloseIndex == index) {
			$('.panelItem').css({
				height: '0',
			})
			$('.panel').removeClass('panelOn');
			openAndCloseIndex = '';
		} else {
			$(this).addClass('panelOn').siblings('.panel').removeClass('panelOn');
			$('.panelItem').eq(index).css({
				height: 'auto',
			}).siblings('.panelItem').css({
				height: '0px',
			})
			openAndCloseIndex = index;
		}
	})
}
// 添加遮罩层
A7Project.createMask = function (index){
	let html = '';
	switch (index){
		case 0:
			html = `
			<div class="loadImg">
				<img src="image/loading.gif" >
				<span>数据正在传输中...</span>
			</div>`
			break;
		case 1:
			html = `
			<div class="loadImg">
				<img src="image/loadS.png" >
				<span>控制成功</span>
			</div>
			`
			break;
		case 2:
			html = `
			<div class="loadImg">
				<img src="image/loadF.png" >
				<span>控制失败</span>
			</div>
			`
			break;
		default:
			break;
	}
	$('body.layui-layout-body').append(`
		<div class="mask">
			<div class="loadBg">
				${html}
			</div>
		</div>
	`)
}
A7Project.removeMask = function(){
	$('.mask').remove();
	awaitTimer = false;
}


A7Project.init();
window.A7Project = A7Project;
