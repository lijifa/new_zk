var CBDterminal = {}
var _PROJECT_ID = getParams()['projectId'];
var _SITED_ID=getParams()['siteId']
var _PROJECT_PARK=encodeURI(getParams()['projectPark'])
var  _BUILDING_INFOR=encodeURI(getParams()['buildingInfor'])
// console.log(decodeURIComponent(unescape(_BUILDING_INFOR)))
CBDterminal.init = function() {
	CBDterminal.addSwitchpageBtn();// 2d 3d切换
	CBDterminal.loadEquipmentlist(); //设备
	CBDterminal.temperatureToday();//当日温度
	// CBDterminal.switchState();//开关切换
	CBDterminal.turnback();//收起按钮
	$('#projectPark').html(decodeURIComponent(unescape(_PROJECT_PARK)))
	$('#buildingInfor').html(decodeURIComponent(unescape(_BUILDING_INFOR)))
}
// 2d 3d切换
CBDterminal.addSwitchpageBtn = function() {
	var params = location.href.split("?")[1];
	if(location.href.indexOf("3d")!=-1){
		var str = `<a class="on">切换3D</a>
				 <a href="index2d.html?` + params +
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
//收起按钮
CBDterminal.turnback = function() {
	let leftBar = new SlideMenu({
		direction:'left',
		menuBtn:'#btnLeft',
		menuBox:'.leftbar',
		menuSetPosition:[0,-340],
		btnSetposition:[340,0],
		isOpen:true,
		bgDrop:5,
		callBackFun:function(e){
			if(e){
				$('#btnLeft>i').removeClass('layui-icon-right').addClass('layui-icon-left')
				$('.floorbtn').css({
					'left':'360px',
					transition: 'left ease 0.5s'
				})
				$('.return-back').css({
					'left':'360px',
					transition: 'left ease 0.5s'
				})
			} else {
				$('#btnLeft>i').removeClass('layui-icon-left').addClass('layui-icon-right')
				$('.return-back').css({
					'left':'10px',
					transition: 'left ease 0.5s'
				})
				$('.floorbtn').css({
					'left':'10px',
					transition: 'left ease 0.5s'
				})
			}
		}
	})
	let rightBar = new SlideMenu({
		direction:'right',
		menuBtn:'#btnRight',
		menuBox:'.rightbar',
		menuSetPosition:[0,-340],
		btnSetposition:[340,0],
		isOpen:true,
		bgDrop:5,
		callBackFun:function(e){
			if(e){
				$('#btnRight>i').removeClass('layui-icon-left').addClass('layui-icon-right')
				$('.switch-page').css({
					'right':'360px',
					transition: 'right ease 0.5s'
				})
			} else {
				$('#btnRight>i').removeClass('layui-icon-right').addClass('layui-icon-left')
				$('.switch-page').css({
					'right':'20px',
					transition: 'right ease 0.5s'
				})
			}
		}
	})
}
//设备
CBDterminal.loadEquipmentlist = function() {
	$.post(hdInterface.selectEndDeviceRealList, {
		"siteId": _SITED_ID
	}, function(data) {
		// console.log(data)
		if (data['code'] === 0) {
			// console.log(data.data)
			if(data.data.length === 0){
				var nodata='<img src="../../common/image/nodata.png" class="dataImg" style="width: 150px;height:100px;">'
				$('#controlState>.hd-loadmask').html(nodata)
				$('#main1>.hd-loadmask').html(nodata)
				$('#equipmentlist>.hd-loadmask').html(nodata)
			} else {
				// 设备列表
				var param1 = {
					vis: '14', //可视数
					title: ['设备名称', '风速'], //列表标题
					list: [], //列表数据
					// stateItem: [],//图标标志列
					// changeFlag: [],//0 1互换标志数组
					style: {
						lineHeight: '30', // 行高
						titleHeight: '32', //标题高度
						titleSize: '14', //标题字体大小
						fontSize: '14', //字体大小
						iconSize: '16', //图标大小
						iconText: false, //图标文字
					},
				}
				data['data'].forEach((item, index) => {
					var obj = {
						plate: convert(item.plate), //字段需要修改
						windSpeed: item.windSpeed==1?'低':item.windSpeed==2?'中':item.windSpeed==3?'高':'--', //字段需要修改
					}
					param1.list.push(obj)
				})
				let obj1 = new listRoll('equipmentlist', param1); //实例化
				
				// 各温控器温度
				var xdata=[]
				var ydata=[]
				var state=0
				data.data.forEach((item,index)=>{
					xdata.push(item.plate)
					ydata.push(item.temperature)
					if (item.state === '-1'){
						state=state+1
					}
				})
				$('#dayenergyCost').html(data.data.length)
				$('#daycostQuota').html(state)
				echarsComponent.getBarChars({
					"elementId": "main1", //容器id	[必填]				
					"xdata": xdata, //横坐标数据[必填]
					"ydata":[ydata],//纵坐标数据[必填]
					// "units": "℃", //单位
					"interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
					"colorGradient": [{
						"startColor": "rgba(37, 248, 255, .6)",
						"endColor": "rgba(37, 248, 255, 1)"
					}], //渐变颜色
					"grid": {
						left: '3%',
						right: '4%',
						bottom: '0',
						top: '25px',
					},
					"nodataImg": true,
					"yAxisMin":0,
					// }
				});
				// 设备控制
				// console.log(data)
				data.data.forEach((item,index)=>{
					var str=''
					if(item.state === '-1'){
						str=`<span class="fr" data-switchState="-1" data-statePlcId="${item.statePlcId}">--</span>`
					} else if (item.state === '0'){
						str=`<span id="" class="fr switch" data-flag='flag' data-switchState="0" data-statePlcId="${item.statePlcId}">开<img src="./image/btn_close.png"/>关</span>`
					} else if (item.state === '1'){
						str=`<span id="" class="fr switch" data-flag='flag' data-switchState="1" data-statePlcId="${item.statePlcId}">开<img src="./image/btn_open.png"/>关</span>`
					}
					$('#controlState').append(`
						<li>
							<span class="fl">${index+1}</span>
							<span class="fl title">${item.plate}</span>
							${str}
						</li>
					`)
				})
				$("#controlState .hd-loadmask").hide();
				// console.log($('#controlState #switch'));
				$('#floor2').html('');
				data.data.forEach((item,index)=>{
					$('#floor2').append(`
						<div class="extreme pos${item.position}">
							<img src=${item.state==1?"./image/icon_img1.png":item.state==0?"./image/icon_img2.png":"./image/icon_img3.png"} />
							<div class="content">
								<div class="lev4title_pub">${item.plate}</div>
								<div class="item">
									<span class="span1">温度：</span>
									<span class="span2"><em>${convert(item.temperature)}</em>℃</span>
								</div>
								<div class="item">
									<span class="span1">风速：</span>
									<span class="span2">${item.windSpeed==1?'低':item.windSpeed==2?'中':item.windSpeed==3?'高':'--'}</span>
								</div>
								<div class="item">
									<span class="span1">状态：</span>
									<span class="span2">${item.state==0?'停止':item.state==1?'开启':'离线'}</span>
								</div>
								
							</div>
						</div>
					`)
				})
			}
		}
	})
}
// 当日温度
CBDterminal.temperatureToday = function(){
	$.post(hdInterface.selectTemperatureAndHumidityCopy,{
		"siteId":_SITED_ID
	},function(data){
		if(data['code']===0){
			// console.log(data.data)
			if(data.data !== null){
				$('#temperature').html(convert(data.data.temperature))
				$('#humidity').html(convert(data.data.humidity))
			}
		}
	})
}


CBDterminal.init();
window.CBDterminal = CBDterminal;
