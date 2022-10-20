var equipmentList = {};
var siteId = getParams()['siteId'] || 13;
var menuNavId = getParams()['menuNavId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称
let type = null;
let pageNew = null;
let notClick = false;
equipmentList.init = function() {
	equipmentList.changeBtn(); //按钮切换
	equipmentList.getlist();
}
equipmentList.getlist = function() {
	pageNew = new page({
		element:'#page',
		url:hdInterface.deviceEquipmentList,
		type:'post',
		pageNum:1,
		pageSize:20,
		unitId:siteId,
		classify:'',
		name:'',
		ajaxData:['pageNum','pageSize','unitId','classify','name'],
		clickBack:function(){
			window.loadMask.openLoadMask({
				type:'1',
			})
			// $('#device').html('<img src="/common/image/load.gif" class="load">');
		},
		callBack:function(e){
			// console.log('分页返回值');
			// console.log(e);
			let data = [];
			notClick = false;
			if(e.code == 0){
				e.rows.forEach((item,index) => {
					data.push({
						refeStatus:refeStatus(item.refeStatus),
						name:convert(item.name),
						systemName:convert(item.systemName),
						deviceTypeName:convert(item.deviceTypeName),
						brand:convert(item.brand),
						installDate:convert(item.installDate),
						installationLocation:convert(item.installationLocation)
					})
				})
				if(data.length == 0){
					/* window.loadMask.openLoadMask({
						type:'1',
					}) */
					$('#device').html(`
					<img src="/common/image/nodata.png">
					`)
					
				} else {
					equipmentList.tableList(data);
				}
				window.loadMask.closeLoadMask();
			}
		}
	})
}
equipmentList.tableList = function(data){
	$('#device').html(`
		<ul class="title">
			<li class="flex0">设备状态</li>
			<li class="flex1">设备名称</li>
			<li class="flex2">所属系统</li>
			<li class="flex3">设备类型</li>
			<li class="flex4">品牌</li>
			<li class="flex5">安装日期</li>
			<li class="flex6">所在位置</li>
		</ul>
	`);
	data.forEach((item,index) => {
		let str = '';
		Object.keys(item).forEach((e,i) => {
			str += `<li class="flex${i}">${item[e]}</li>`
		})
		$('#device').append(`
			<ul>${str}</ul>
		`)
	})
	
}
equipmentList.changeBtn = function() {
	$('.btnContainer li').on('click',function(){
		if(notClick){
			return;
		}
		$(this).addClass('on').siblings('li').removeClass('on');
		let dataType = $('.btnContainer li.on').attr('data-type');
		if(dataType == type){
			return;
		}
		notClick = true;
		window.loadMask.openLoadMask({
			type:'1',
		})
		// $('#device').html('<img src="/common/image/load.gif" class="load">');
		pageNew.filterData({
			classify:dataType,
			name:$('#filterInput').val(),
			pageNum:1,
		});
		type = dataType;
	})
	$('.search').on('mousedown mouseup',function(e){
		if(notClick){
			return;
		}
		if(e.type == "mousedown"){
			$(this).css({
				"background-color": "rgba(54, 153, 255, 1)"
			})
		} else if(e.type == "mouseup"){
			notClick = true;
			window.loadMask.openLoadMask({
				type:'1',
			})
			// $('#device').html('<img src="/common/image/load.gif" class="load">');
			$(this).css({
				"background-color": "rgba(54, 153, 255, 0.5)"
			})
			let dataType = $('.btnContainer li.on').attr('data-type');
			pageNew.filterData({
				classify:dataType,
				name:$('#filterInput').val(),
				pageNum:1,
			});
		}
	})
	$('.reset').on('mousedown mouseup',function(e){
		$('#filterInput').val('');
		if(notClick){
			return;
		}
		if(e.type == "mousedown"){
			$(this).css({
				"background-color": "rgba(235, 157, 83, 1)"
			})
		} else if(e.type == "mouseup"){
			notClick = true;
			window.loadMask.openLoadMask({
				type:'1',
			})
			// $('#device').html('<img src="/common/image/load.gif" class="load">');
			$(this).css({
				"background-color": "rgba(235, 157, 83, 0.5)"
			})
			let dataType = $('.btnContainer li.on').attr('data-type');
			pageNew.filterData({
				classify:dataType,
				name:$('#filterInput').val(),
				pageNum:1,
			});
		}
	})
	$(document).on('mouseup',function(e){
		if(e.type == 'mouseup'){
			$('.reset').css({
				"background-color": "rgba(235, 157, 83, 0.5)"
			})
			$('.search').css({
				"background-color": "rgba(54, 153, 255, 0.5)"
			})
		}
	})
}

equipmentList.init();
window.equipmentList = equipmentList;
function refeStatus(refeStatus){
	if(refeStatus == 'o_alarm_type'){
		return '<img src="/common/image/circle-gray.png" style="width:16px;height:16px;"> 离线';
	} else {
		return '<img src="/common/image/circle-green.png" style="width:16px;height:16px;"> 在线';
	}
	// switch (refeStatus){
	// 	case 'start_type':
	// 		return '<img src="/common/image/circle-green.png" style="width:16px;height:16px;"> 启动';
	// 	case 'stop_type':
	// 		return '<img src="/common/image/circle-red.png" style="width:16px;height:16px;"> 停止';
	// 	case 'o_alarm_type':
	// 		return '<img src="/common/image/circle-gray.png" style="width:16px;height:16px;"> 离线';
	// 	case 's_alarm_type':
	// 		return '<img src="/common/image/circle-red.png" style="width:16px;height:16px;"> 故障';
	// 	default:
	// 		return '<img src="/common/image/circle-green.png" style="width:16px;height:16px;"> 在线';
	// }
}
