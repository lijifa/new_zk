var security = {
    isWarnLunBo : false,
    isFaultLunBo : false,
	loadmar:0//判断循环列表是否全部加载完成
};
var timer = null;
var timer1 = null;
var _SITE_ID = getParams()['siteId'];
var sitename = getParams()["sitename"]; //站点名称
var layuiId=getParams()['layuiId'];//菜单id
document.addEventListener("visibilitychange", function() {
	if(document.visibilityState == 'hidden'){
		 clearInterval(timer);
		 // clearInterval(timer1)
		 // console.log('离开')
	}
	else{
		// security.init()
		security.oneMinutesUpdate();//一分钟更新
		// console.log('回来')
	}
});
var objName = layuiId;
window.onunload = function() {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	security.loadEqulist();//加载设备列表
// 	// security.oneMinutesUpdate();//一分钟更新
// }); //注册
security.init = function () {
	$("#innerheader").attr("data-title", decodeURI(sitename));
	security.popUps();//弹窗
	security.initMonitor();// 平台安全运行时间 综合评分
	security.alarmTimeToRepair();// 近30天平均修复时间
	security.environmentalSecurity();// 安防检测 电气安全监测
	security.getwaringTop();// 当月预警次数排名
	security.loadEqulist();//加载设备列表
	security.oneMinutesUpdate();//一分钟更新
}
security.oneMinutesUpdate = function(){
	timer = setInterval(function(){
		// console.log('安全概况一分钟更新');
		security.initMonitor();// 平台安全运行时间 综合评分
		security.environmentalSecurity();// 安防检测 电气安全监测
		security.loadEqulist();//加载设备列表
		$('.pop_fault').css('display','none');
	},60*1000);
}
// 近30天平均修复时间
security.alarmTimeToRepair = function(){
	$.post(hdInterface.alarmTimeToRepair,{
		siteId: _SITE_ID,
	}).done(function(data){
		if(data['code'] === 0){
			let dataX = data.data.dataX.split(',');
			let dataY = data.data.dataY.split(',');
			echarsComponent.getLine({
				"elementId":"repairtime",//容器id	[必填]
				 xdata:dataX,//横坐标数据[必填]
				 // ydata:[['',2,3,4]],//纵坐标数据[必填]
				 ydata:[dataY],//纵坐标数据[必填]
				 linecolors:['#00FFFF'],//线颜色[非必填]
				 areaStyleOpacity:0.1,//区域颜色[非必填]
				 // "dataZoom":{
				 // 	"isScroll":true,//是否可以自动切换[非必填]
				 // 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
				 //  },
				  // "coordinateinecolor":'rgba(10,148,255,0.9)',//坐标轴颜色
				  // "labelColor":'red',//坐标轴文字颜色
				  "unit":"min",
				  "nodataImg":true
			});
		}
	})
}
// 安防检测 电气安全监测
security.environmentalSecurity = function(){
	$.get(hdInterface.environmentalSecurity,{
		siteId: _SITE_ID,
	}).done(function(data){
		if(data['code'] === 0){
			let num1 = 0;
			let num2 = 0;
			for(let key in data.data){
				let text = '正常';
				let arrTemp = [];
				data.data[key].forEach((item) => {
					let obj = {
						alarmName:convert(item.alarmName),
						time:convert(item.time),
					}
					arrTemp.push(obj);
				})
				if(data.data[key].length !== 0){
					text = '异常';
					security[key] = arrTemp;
					$('#'+key).addClass('fault');
					if(key == 'accessControl'|| key == 'warmFeeling' || key == 'flame'){
						num1+=data.data[key].length;
					} else if(key == 'transformerTemperature'|| key == 'cableTemperature' || key == 'electricLeakage'){
						num2+=data.data[key].length;
					}
				} else {
					security[key] = [{text:'暂无异常'}];
					$('#'+key).removeClass('fault');
				}
				if(num1 !== 0){
					$('#num1').css({'color':'#ff4444'});
				} else {
					$('#num1').css({'color':'#00ffff'});
				}
				if(num2 !== 0){
					$('#num2').css({'color':'#ff4444'});
				} else {
					$('#num2').css({'color':'#00ffff'});
				}
				$('#num1').html(num1);
				$('#num2').html(num2);
				$('#'+key).html(text);
			}
		}
	})
}
//弹窗
security.popUps = function () {
	$('.rightlabel .item').hover(function(){
		var offectTop = $(this).offset();
		// console.log(offectTop);
		var type = $(this).attr('data-id');
		$('.pop_fault').css({
			'top':offectTop.top-150+'px',
			'left':offectTop.left-230+'px',
			display:'block'
		});
		if(security[type] !== undefined){
			security.faultList(type);
			if(security[type][0].text !== '暂无异常'){
				// $('#fault .gDlistOut .gDhang0').css('color','#ff4444');
				// $('#fault .gDlistOut .gDhang1').css('color','#ff4444');
				$('#fault .gDlistOut .gDhang0').addClass('textColorRed');
				$('#fault .gDlistOut .gDhang1').addClass('textColorRed');
			} else {
				// $('#fault .gDlistOut .gDhang0').css('color','#48D396');
				// $('#fault .gDlistOut .gDhang1').css('color','#48D396');
				$('#fault .gDlistOut .gDhang0').addClass('textColorBlue');
				$('#fault .gDlistOut .gDhang1').addClass('textColorBlue');
			}
		} else {
			$('#fault').html(`
				<div class="hd-loadmask">
					<img src="../../common/image/nodata.png" class="position50" style="width:150px;height:100px;">
				</div>
			`)
		}
	},function(){
		$('.pop_fault').css({display:'none'});
	})
	$(window).on('resize',function(){
		$('.pop_fault').css('display','none');
	})
}
security.faultList = function (key) {
	var paramFault = {
		title: [], //列表标题
		list: [
			// {text:'暂无异常'}
			// {type:'高压开关柜1温度过高',time:'03-09 09:16:50'},
			// {type:'高压开关柜1温度过低',time:'03-09 09:16:50'},
			// {type:'高压开关柜1温度过高',time:'03-09 09:16:50'},
		],//列表数据
		hangLie: {
			lieflag:true,//间隔列开
			lienum:'2',//间隔列 从0开始
			hangflag:true,//间隔行开
			hangnum:'1',//间隔行 从0开始
		},
		// Keyword:['过高','过低'],
		// KeywordClass:['textRed','textYellow']
	}
	paramFault.list = security[key];
	// console.log(paramFault.list);
	let fault = new listRollNew('fault',paramFault);//实例化
}

// 加载设备列表
security.loadEqulist = function () {
	$.get(hdInterface.alarmRecord, {
		'siteId': _SITE_ID,
		'type':1,
	}, function (data) {
		// console.log(data);
		if (data['code'] === 0) {
			if(data.data.length == 0){
				$('#transformerMonitor').html('当前暂无报警');
				$('#transformerMonitor').css('text-align','center');
			} else {
				var paramTransformerMonitor = {
						title: ['信号名称', '报警原因', '报警时间'], //列表标题
						list: [],//列表数据
						hangLie: {
							lieflag:true,//间隔列开
							lienum:'3',//间隔列 从0开始
							hangflag:true,//间隔行开
							hangnum:'1',//间隔行 从0开始
						}
					}
				data.data.forEach((item) => {
					var obj = {
						name:convert(item.tempName),
						reason:convert(item.reason),
						time:convert(item.alarmTime),
					}
					paramTransformerMonitor.list.push(obj);
				})
				let transformerMonitor = new listRollNew('transformerMonitor',paramTransformerMonitor);
			}
		}
	})
}
 // 平台安全运行时间 综合评分
security.initMonitor = function () {
	// 评分 1m
	$.post(hdInterface.securityInfo, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			for(let key in data.data){
				$('#'+key).html(convert(data.data[key]));
			}
			$('#centervideo .hd-loadmask').hide();
			// console.log(data)
			// 加载当月报警次数（左侧小圆环图表）
			security.alarmRate(data);
			//加载当日报警次数（右侧小圆环图表）
			security.integrityRate(data);
			//综合安全评分
			security.safetyScore(data);
		}
	});	
};
/*加载当月报警次数（左侧小圆环图表）*/
security.alarmRate = function (data) {
	var value=(data.data.realWarnRuleCount/data.data.warnRuleCount*100)||"";
	var showText=`<span style="font-size:30px;">${convert(data.data.currentMonthCount)}</span>`;
	// console.log("实时预警规则====");
	// console.log(showText);
	$("#circleWaringText").html(convert(showText));	
	echarsComponent.getCircleChars({
		"elementId":"main7",//容器id	[必填]
		"value":100,//百分比值[必填]
		"startColor":'#36D1FF',//开始时候颜色[非必填]
		"endColor":'#36D1FF',//结束时候颜色	[非必填]
		// "fontSize":"12",//中间文字大小[非必填]
		// "fontColor":"#fff",//中间文字颜色[非必填]
		"showText":false,//是否显示中间文字 bool[非必填]
		"radiusx":'90%',
	});
}
/*加载当日报警次数（右侧小圆环图表）*/
security.integrityRate = function (data) {
	// console.log(data)
	var value=data.data.deviceAlarmCount/data.data.deviceCount*100;
	var showText=`<span style="color:#ff4444;"><span style="font-size:30px;">${convert(data.data.currentDayCount)}</span></span>`;
	// console.log("=======实时设备故障");
	// console.log(showText);
	$("#circleFaultText").html(convert(showText));
	echarsComponent.getCircleChars({
		"elementId":"main8",//容器id	[必填]
		"value":100,//百分比值[必填]
		"startColor":'#36D1FF',//开始时候颜色[非必填]
		"endColor":'#36D1FF',//结束时候颜色	[非必填]
		// "fontSize":"12",//中间文字大小[非必填]
		// "fontColor":"#fff",//中间文字颜色[非必填]
		"showText":false,//是否显示中间文字 bool[非必填]
		"radiusx":'90%',
	});
}
/*显示隐藏评分规则*/
$("#control_btn").hover(function(){
	 $(".div_rules").show();
 },function(){
	 $(".div_rules").hide();
 });
/*综合安全评分*/
security.safetyScore= function(data){	
	if (data['code'] === 0) {
		var $vediodom = $("#warnLight");
		var $centerMessage = $('.center-message');
		var $safetyScore = $('#safetyScore');
		if (data.data.safetyScore <= 90) {
			var url = "./image/dianRedx264.mp4";			
			$("#warnLight").attr("src", url);			
			$centerMessage.css({
				'color':'#E93F41',
			})
		}else{
			var url = "./image/dianGreenx264.mp4";
			
			$("#warnLight").attr("src", url);
			$centerMessage.css({
				'color':'#3DFFAA',
			})			
		}		
		$safetyScore.text(convert(data.data.safetyScore));
		$safetyScore.next().text('综合安全评分');
	}
};
//近30天报警前5名（特殊图表渲染自定义样式）
security.getwaringTop = function () {
	var salvProName = [],
		salvProValue = [];
	//预警次数排名近30天
	$.post(hdInterface.selectAlarmTop, {
		'siteId': _SITE_ID,
		"isFirst":1,
	}, function (data) {
		if (data['code'] === 0) {
			if(data.data.length == 0){
				$('#main_top1').attr('style','position: relative;')
				$('#main_top1 .hd-loadmask').html(`<img src="../../common/image/nodata.png" class="imagePo">`)
			} else {
				let list = []
				data.data.forEach((item) => {
					let obj = {
						name:convert(item.reason),
						electric:convert(item.total),
					}
					list.push(obj);
				})
				// console.log(list);
				security.topList('main_top1',list,'electric')
			}
		}
	})

	// $(window).resize(function () {
	// 	myChart.resize();
	// });
}
//  var data = [
// 	{name: '设备名称', electric: '4158'},
// 	{name: '锅炉循环泵一号', electric: '4236'},
// 	{name: '设备名称', electric: '1098'},
// 	{name: '设备名称', electric: '1237'},
// 	{name: '离心式制冷机一号', electric: '7057'},
// ]
security.topList = function (selector,data,electric) {
	$('#'+selector).html(`<ul class="top_list"></ul>`)
	var maxElectric = 0
	var testData = null
	data.forEach((item,index)=>{
		maxElectric = item.electric-0>maxElectric ? (item.electric-0):maxElectric;
	})
	/* for (var i = 0; i<data.length; i++){
		for (var j = 0;j<data.length; j++){
			if (data[i].electric-0>data[j].electric-0){
				testData = data[i]
				data[i] = data[j]
				 data[j] = testData
			}
		}
	} */
	data.forEach((item,index)=>{
		if(maxElectric==0){
			var width = 0
		}else{
			var width = (item.electric/maxElectric)*100
		}
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
window.security = security;
security.init();
