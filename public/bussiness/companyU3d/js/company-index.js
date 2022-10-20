var companyindex={};
// var objName = 'companyName'
// window.onunload = function(){
// 	top.unregisterListener(objName)
// }
//初始化项目
companyindex.init=function(){
	// top.registerListener(objName, function(e){console.log("来自项企业"+e)});
	companyindex.countplus();
	companyindex.innovation();
	companyindex.serivceTurnpng();
	// companyindex.bottomBarTurnpng();
	// companyindex.research();
	// companyindex.personStructure();
	
	// companyindex.EnergySaving();
	// companyindex.EnergySaving2();
	// var video = document.getElementById('movie');
	// setInterval(function(){
	// 	video.play();
	// },20000);
	$(".sc-container").prepend('<iframe src="./MainBuilding/index.html" width="100%" height="100%" frameborder="0"></iframe>');
}
/*服务团队图片轮播*/
companyindex.serivceTurnpng=function(){		
	var nameLink = './image/tuandui/';
	nameArr = [];	
	for (var i = 0; i < 59; i++) {
		if(i<10){
			var str="tuandui_0000"+i+".png";
		}
		if(i>=10&&i<=99){
			var str="tuandui_000"+i+".png";
		}
		if(i>=100&&i<=999){
			var str="tuandui_00"+i+".png";
		}
		nameArr.push(str);
	}
	var myImgs = $("#waringlightright");
	loadPng(nameArr, nameLink, myImgs, 59,"myImageHolder",true);
}
/*底部横条图片轮播*/
companyindex.bottomBarTurnpng=function(){		
	var nameLink = './image/hengtiao/';
	nameArr = [];	
	for (var i = 0; i < 88; i++) {
		if(i<10){
			var str="hengtiao_0000"+i+".png";
		}
		if(i>=10&&i<=99){
			var str="hengtiao_000"+i+".png";
		}
		if(i>=100&&i<=999){
			var str="hengtiao_00"+i+".png";
		}
		nameArr.push(str);
	}
	var myImgs = $("#waringlightright2");
	loadPng(nameArr, nameLink, myImgs, 88,"myImageHolder2");
}
/*创新能力*/
companyindex.innovation=function(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var option = {
		grid: {
			left: '12%',
			top: '20%',
			bottom: '20%',
			right: '8%'
		},
		xAxis: {
			data: [2016,2017,2018,2019,2020,2021],
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(10, 148, 255, 0.4)',
					width: 1 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#0ACDFF',
					fontSize: 8,
					lineHeight: 10,
				},
				interval: 0,
				rotate: "45",
			}
		},
		yAxis: [{
			splitNumber: 1,
			axisTick: {
				show: false
			},
			max:80,
			interval:20,
			axisLine: {
				lineStyle: {
					color: 'rgba(10, 148, 255, 0.4)',
					width: 1 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#0ACDFF'
				}
			},
			splitArea: {
				areaStyle: {
					color: 'rgba(255,255,255,.5)'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(10, 148, 255, 0.4)',
					width: 0.5,
					type: 'dashed'
				}
			}
		}],
		series: [{
			name: 'hill',
			type: 'pictorialBar',
			barCategoryGap: '0%',
			symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
			label: {
				show: true,
				position: 'top',
				distance: 15,
				color: '#0A94FF',
				fontWeight: 'bolder',
				fontSize: 16,
			},
			data: [3,5,10,18,31,56],
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
								offset: 0,
								color: 'rgba(10,148,255,1)' //  0%  处的颜色
							},
							{
								offset: 1,
								color: 'rgba(10,148,255,0.3)' //  100%  处的颜色
							}
						],
						global: false //  缺省为  false
					}
				},
				emphasis: {
					opacity: 1
				}
			},
			z: 10
		}]
	};
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	$(".hd-full-screen").click(function() {
		setTimeout(function() {
			myChart.resize();		
		}, 10);
	});
	$(window).resize(function() {
		myChart.resize();	
	});
}
/*数字递增功能*/
companyindex.countplus=function(){
	numAutoPlus('numValue', 0, {
		time: 2000,
		num: 31860,
		rate: 40
	})
	numAutoPlus('numValue2', 0, {
		time: 2000,
		num: 2400,
		rate: 40
	})
}

/*3D标签云*/
tagcloud({
		selector: ".tagcloud", //元素选择器
		fontsize: 16, //基本字体大小, 单位px
		radius: 60, //滚动半径, 单位px
		mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
		ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
		direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
		keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
	});
	
companyindex.init();
window.companyindex=companyindex;

