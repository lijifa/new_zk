var fireWater = {}
fireWater.init = function() {
	fireWater.changeBtn();
	fireWater.hiddenTrouble();
	fireWater.popups();
	fireWater.timeChange();
}
//当月隐患类型汇总
function time (){
	let timer = new Date()
	let H = timer.getHours();
	let timerArr = []
	for(var i = 0; i <= H; i++){
		timerArr.push(i < 10 ? '0' + i + ':00' : i + ':00');
	}
	return timerArr;
}
fireWater.hiddenTrouble = function() {
	$(".jfsqzt .hd-loadmask").hide();
	let dataX = time();
	let dataY = [];
	dataX.forEach((item) => {
		dataY.push((Math.random()*0.1+2.75).toFixed(4));
	})
	echarsComponent.getLineShadow({
		"elementId": "waterlevel0", //容器id	[必填]
		xdata: dataX, //横坐标数据[必填]
		ydata: [dataY], //纵坐标数据[必填]
		// ydataTitle:title,//提示框标题项
		linecolors: ['#00FFFF'], //线颜色[非必填]
		areaStyleOpacity: 0.5, //区域颜色[渐变色必填]
		"unit": "PV", //单位
		"grid": {
			left: '20px',
			right: '20px',
			bottom: '15px',
			top: '25px',
			containLabel: true,
		}, //边距[非必填]
		yAxisMin:0,
		yAxisMinInterval:0.2,
		"offectTop": "rgba(0, 255, 255, 1)",
		"offectMiddle": "rgba(0, 255, 255, 0.5)",
		"offectBottom": "rgba(0, 255, 255, 0.2)",
	})
	let dataY1 = [];
	let dataY2 = [];
	dataX.forEach((item) => {
		dataY1.push((Math.random()*0.04+1.18).toFixed(4));
		dataY2.push((Math.random()*0.1+1.08).toFixed(4));
	})
	echarsComponent.getLine({
		"elementId": "waterlevel1", //容器id	[必填]
		xdata: dataX, //横坐标数据[必填]
		ydata: [dataY1,dataY2], //纵坐标数据[必填]
		// ydataTitle:title,//提示框标题项
		linecolors: ['#00FFFF','#FFB72C'], //线颜色[非必填]
		"yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
		yAxisMinInterval:0.2,
		"unit": "m", //单位
		"grid": {
			left: '20px',
			right: '20px',
			bottom: '15px',
			top: '25px',
			containLabel: true,
		}, //边距[非必填]
	})
}

//切换按钮
fireWater.changeBtn = function() {
	$('.btnParent').on('click', '.btn', function() {
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
		let id = $(this).attr('data-id');
		$(".waterlevel").css("z-index","-1");
		$(".waterlevel").css("opacity","0");
		$(".waterlevel").eq(id).css("z-index","1");
		$(".waterlevel").eq(id).css("opacity","1");
	})
}
// 弹窗
fireWater.popups = function(){
	let pop = new popUps({
		selector:'.pop',
		offsetLeft:-390,
		offsetTop:10,
		hoverDom:'#alarm',
		fun:function(e){
			let params = {
				title:[],
				list:[
					{name:'湿式报警阀1#',site:'商业负1层报警阀室',time:changeTimeDate(2)+' 06:34:24'},
				],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'2',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			let list = new listRollNew('list',params);
		}
	})
}
//上次巡检时间
fireWater.timeChange = function(){
	let date = new Date();
	let M = date.getMonth() + 1;
	let D = date.getDate();
	M = M < 10 ? '0' + M : M;
	D = D <= 10 ? '01' : D<= 20 ? '11' : '21';
	$('#timeChange').html(M + '.' + D + ' 08:00');
}
fireWater.init();
window.fireWater = fireWater;
