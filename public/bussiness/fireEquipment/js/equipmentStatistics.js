var equimentStatistics = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var sitename = getParams()["sitename"]; //站点名称
var timer = null;
document.addEventListener('visibilitychange',function(){
	if(document.visibilityState == 'hidden'){
		clearInterval(timer);
	} else {
		
	}
})

equimentStatistics.init = function (){
	equimentStatistics.nearStatistics();//近30天设备临期统计
	equimentStatistics.faultStatistics();// 近30天设备故障统计
	equimentStatistics.faultDistributed();// 近30天设备故障系统分布
	equimentStatistics.deviceMonitor();// 当日设备监测
	equimentStatistics.fireFight();//消防隐患原因前5名
	equimentStatistics.recoverTime();//设备故障恢复时间统计
	equimentStatistics.faultTop();//系统报警前5名  设备故障前5名
}
// 近30天设备临期统计
equimentStatistics.nearStatistics = function(){
	$('#expiredDdevice').html(4);
	$('#provisionalEquipment').html(5);
	$('#replacementDevice').html(52);
}
// 近30天设备故障统计
equimentStatistics.faultStatistics = function(){
	let dataX = null;
	let dataY = [
		14,16,35,22,31,
		34,24,36,18,06,
		25,23,14,06,21,
		31,28,12,30,26,
		15,26,11,03,27,
		30,22,14,18,09
		];
	let flag = Math.round(Math.random()*10);
	// console.log(flag);
	if(flag<0){
		$('#faultStatistics .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		dataX = monthDay();
		// dataX.forEach((item) => {
		// 	dataY.push(Math.round(Math.random()*30 + 5));
		// })
		echarsComponent.getBarChars({
			elementId:'faultStatistics',
			xdata:dataX,
			ydata:[dataY],
			units:'次',
			yAxisMin:0,
			barWidth:10,
			colorGradient:[
				{
					startColor:'rgba(22, 143, 255, 0.3)',
					endColor:'rgba(0, 255, 255, 1)',
				}
			],
			grid:{
				top:'25px',
				right:'10px'
			},
			provideNumber:5
		})
	}
	
}
// 近30天设备故障系统分布
equimentStatistics.faultDistributed = function(){
	let dataVal = [
			{
				// value:Math.round(Math.random()*10+80),
				value:80,
				name:'火灾自动报警系统',
			},
			{
				// value:Math.round(Math.random()*20+5),
				value:25,
				name:'消防给水监控系统',
			},
			{
				// value:Math.round(Math.random()*10+60),
				value:62,
				name:'自动喷水灭火系统',
			},
			{
				// value:Math.round(Math.random()*15+25),
				value:35,
				name:'消火栓监控系统',
			},
			{
				// value:Math.round(Math.random()*15+1),
				value:14,
				name:'防火分区监控系统',
			},
			{
				// value:Math.round(Math.random()*10+50),
				value:58,
				name:'智能应急疏散系统',
			},
		]
	$('#fire').html(convert(dataVal[0].value));
	$('#fireFighting').html(convert(dataVal[1].value));
	$('#sprayWater').html(convert(dataVal[2].value));
	$('#fireHydrant').html(convert(dataVal[3].value));
	$('#firePrevention').html(convert(dataVal[4].value));
	$('#smergencyEvacuation').html(convert(dataVal[5].value));
	let total = 0
	dataVal.forEach((item) => {
		total+=item.value;
	})
	// console.log(total);
	let restorations = 256;//Math.round(Math.random()*10+(total-20));
	$('#total').html(total);
	let LV = (restorations/total)*100;
	$('#restorations').html(restorations);
	$('#restorationsLV').html(LV.toFixed(0));
	echarsComponent.getPieChars({
		elementId:'faultDistributed',
		data:dataVal,
		color:['#168FFF','#48D396','#00FFFF','#6B95DE','#FCAA6E','#E8D36F'],
		radius:['65%','80%'],
		grid:{
			left: '20px',
			right: '20px',
			bottom: '20px',
			top: '20px',
			containLabel: true,
		},
		tooltip:{
			show:false,
		},
		animation:false,
		// silent:false,
		itemStyle: {
			normal: {
				borderColor: '#041e39',
				borderWidth: 3,
				// borderRadius: 5,
				label: {
					show: false,
					formatter: '{b} : {c} ({d}%)'
				},
				labelLine: {
					show: false,
				},
			},
		},
	})
}
// 当日设备监测
equimentStatistics.deviceMonitor = function(){
	let total = 5041;
	$('#total1').html(total);
	$('#total2').html(total);
	$('#total3').html(274);
	let device1 = 4990;//Math.round(Math.random()*60+300);
	let device2 = 4936;//Math.round(Math.random()*60+300);
	let device3 = 63;//Math.round(Math.random()*60+300);
	$('#device1').html(convert(device1));
	$('#device2').html(convert(device2));
	$('#device3').html(convert(device3));
	let per1 = 99;//(device1/total)*100;
	let per2 = 98;//(device2/total)*100;
	let per3 = 23;//(device3/total)*100;
	$('#per1').html(per1.toFixed(0));
	$('#per2').html(per2.toFixed(0));
	$('#per3').html(per3.toFixed(0));
	echarsComponent.getCircleChars({
		elementId:'deviceMonitor1',
		value:per1,
		startColor:'#00ffff',
		endColor:'#00ffff',
		fontColor:'#00ffff',
		showText:false
	})
	echarsComponent.getCircleChars({
		elementId:'deviceMonitor2',
		value:per2,
		startColor:'#48D396',
		endColor:'#48D396',
		fontColor:'#48D396',
		showText:false
	})
	echarsComponent.getCircleChars({
		elementId:'deviceMonitor3',
		value:per3,
		startColor:'#13C5FF',
		endColor:'#13C5FF',
		fontColor:'#13C5FF',
		showText:false
	})
}
// 临期设备详情
/* equimentStatistics.deviceDetail = function(){
	let flag = Math.round(Math.random()*10);
	if(flag<0){
		$('#deviceDetail .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		var deviceDetailParam = {
			title: ['设备编号', '设备名称','所属系统','设备分类','品牌','开始使用日期','设备寿命','状态','所在位置'], //列表标题
			list: [], //列表数据.
			hangLie: {
				lieflag: true, //间隔列开
				lienum: '8', //间隔列 从0开始
				hangflag: true, //间隔行开
				hangnum: '1', //间隔行 从0开始
			}
		}
		deviceDetailParam.list = list(Math.round(Math.random()*60+10));
		console.log(deviceDetailParam.list.length);
		let obj1 = new listRollNew('deviceDetail', deviceDetailParam); //实例化
		colorChange();
	}
	// console.log($('.gDhang_item7'));
	$(window).on('resize',function(){
		colorChange();
	})
} */
// 消防隐患原因前5名
equimentStatistics.fireFight = function(){
	let dataX = null;
	let dataY = [];
	let flag = Math.round(Math.random()*10);
	// console.log(flag);
	if(flag<0){
		$('#fireFight .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		dataX = ['设备故障','设备离线','电流过载','火灾报警','水压过低'];
		dataY = [338,253,118,35,9];
		echarsComponent.getBarChars({
			elementId:'fireFight',
			xdata:dataX,
			ydata:[dataY],
			units:'次',
			yAxisMin:0,
			yAxisMinInterval:100,
			barWidth:10,
			colorGradient:[
				{
					startColor:'rgba(22, 143, 255, 0.3)',
					endColor:'rgba(0, 255, 255, 1)',
				}
			],
			grid:{
				top:'25px',
				right:'10px'
			},
			provideNumber:5,
		   "interval":0,
		})
	}
}
// 设备故障恢复时间统计
equimentStatistics.recoverTime = function(){
	let dataX = null;
	let dataY = [];
	let flag = Math.round(Math.random()*10);
	// console.log(flag);
	if(flag<0){
		$('#recoverTime .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		dataX = ['0-1天','1-3天','3-7天','7天以上'];
		dataY = [270,34,20,14];
		echarsComponent.getBarChars({
			elementId:'recoverTime',
			xdata:dataX,
			ydata:[dataY],
			units:'次',
			yAxisMin:0,
			yAxisMinInterval:100,
			barWidth:10,
			colorGradient:[
				{
					startColor:'rgba(22, 143, 255, 0.3)',
					endColor:'rgba(0, 255, 255, 1)',
				}
			],
			grid:{
				top:'25px',
				right:'10px'
			},
			provideNumber:5
		})
	}
}
// 系统报警前5名  设备故障前5名
equimentStatistics.faultTop = function(){
	let data1 = [
		{name:'商业3层575号楼梯间',total:'18'},
		{name:'商业3层587号',total:'12'},
		{name:'商业2层605号',total:'7'},
		{name:'塔楼A8层103室',total:'7'},
		{name:'塔楼A8层楼梯间',total:'3'}
	]
	let data2 = [
		{name:'P05 153立式洒水喷头',total:'29'},
		{name:'C02 161消火栓',total:'28'},
		{name:'A08 164消火栓按钮',total:'27'},
		{name:'P04 162立式洒水喷头',total:'25'},
		{name:'A08 147消火栓按钮',total:'24'},
	]
	let flag = Math.round(Math.random()*10);
	if(flag<0){
		$('#faultTop').siblings('.hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
		$('#deviceTop').siblings('.hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		$('#faultTop').siblings('.hd-loadmask').hide();
		$('#deviceTop').siblings('.hd-loadmask').hide();
		data1.forEach((item,index) => {
			$('#faultTop').append(`
				<tr class="tableItem"><td>TOP${index+1}</td><td>${item.name}</td><td class="textColorLightBlue">${item.total}</td></tr>
			`)
		})
		data2.forEach((item,index) => {
			$('#deviceTop').append(`
				<tr class="tableItem"><td>TOP${index+1}</td><td>${item.name}</td><td class="textColorLightBlue">${item.total}</td></tr>
			`)
		})
	}
}



equimentStatistics.init();
window.equimentStatistics = equimentStatistics;
function colorChange(){
	$('.gDhang_item7').css('color',function(){
		if($(this).html().indexOf('已到期') !== -1){
			return '#ff4444';
		} else {
			return '#FFB72C';
		}
	})
	// $('.gDhang_item7').css('color',function(){
	// 	if($(this).html().indexOf('已到期') !== -1){
	// 		return '#ff4444';
	// 	} else {
	// 		return '#FFB72C';
	// 	}
	// })
}
// 30天
function monthDay(){
	let time = new Date().getTime();
	let timeTemp = [];
	for(let i = 30; i > 0; i--){
		let M = new Date(time-i*24*60*60*1000).getMonth() + 1;
		let D = new Date(time-i*24*60*60*1000).getDate();
		M = M < 10 ? '0' + M : M;
		D = D < 10 ? '0' + D : D;
		let MD = M + '.' + D;
		timeTemp.push(MD);
	}
	return timeTemp;
}
/* function list(num){
	let diviceNo = ['x57','x56','x55','x54','x53','x52','x51','x50','x49','x48'];
	let deviceName = ['消防1','消防2','消防3','消防4','消防5','消防6','消防7','消防7','消防9'];
	let systom = ['消防给水监控系统','消防给水监控系统','智能应急疏散系统','火灾自动报警系统'];
	let type = ['湿式报警阀组','水表','灯具','蓄电池','湿式报警阀组','水表','灯具','蓄电池','湿式报警阀组','水表'];
	let ppName = ['品牌1','品牌2','品牌3','品牌4','品牌5','品牌6','品牌7','品牌7','品牌9'];
	let time = ['2021-03-31','2021-03-30','2021-03-28','2021-03-20','2021-03-25','2021-03-21','2021-03-27'];
	let usimg = ['4年','5年','1年','2年','3年'];
	let state = ['即将到期','已到期'];
	let site = ['一层A3-1', 'B栋5层022室', '一层A3-2', 'B栋5层020室', '一层A3-3'];
	let temp = [];
	for(let i = 0; i<num; i++){
		let obj = {
			// diviceNo:diviceNo[Math.round(Math.random()*(diviceNo.length-1))],
			diviceNo:'x'+Math.round(Math.random()*num),
			deviceName:deviceName[Math.round(Math.random()*(deviceName.length-1))],
			systom:systom[Math.round(Math.random()*(systom.length-1))],
			type:type[Math.round(Math.random()*(type.length-1))],
			ppName:ppName[Math.round(Math.random()*(ppName.length-1))],
			time:time[Math.round(Math.random()*(time.length-1))],
			usimg:usimg[Math.round(Math.random()*(usimg.length-1))],
			state:state[Math.round(Math.random()*(state.length-1))],
			site:site[Math.round(Math.random()*(site.length-1))],
		}
		temp.push(obj);
	}
	return temp;
} */