var energySavingIndex = {};
var _SITE_ID = getParams()['siteId'];
var params = {
	'siteId': _SITE_ID
};
energySavingIndex.init = function () {
	energySavingIndex.loadEchars();
	// energySavingIndex.pngturn();
	energySavingIndex.devicesElectricTop5();
	energySavingIndex.energyEfficiency();
	function interval() {
		energySavingIndex.loadMonitor();
		// energySavingIndex.deviceCopDistribution();
	}
	interval();
	setInterval(interval, 60000);
};

// 设备性能系数分布
// energySavingIndex.deviceCopDistribution = function () {
// 	$.post(baseurl + "/common/selectDeviceCopDistribution", {
// 		'siteId': _SITE_ID
// 	}, function (data) {
// 		debugger
// 		if (data['code'] === 0) {
// 			var result = data['data'][0];
// 			$.each(Object.keys(result), function () {
// 				var $output = $(`#${this}`);
// 				if ($output.length > 0) {
// 					$output.text(parseInt(result[this]));
// 				}
// 			});
// 		}
// 	});
// }

//实时能效分析
energySavingIndex.energyEfficiency=function(){
	// $.post(baseurl + "common/selectSystemSyn", {
	$.post(hdInterface.selectSystemSyn, {		
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var result = data['data'][0];
			var DAY1Elect=Math.round(result.DAY1Elect);//今日电消耗
			var DAY2Elect=Math.round(result.DAY2Elect);//昨日电消耗
				
			$(".electric .thiscount").html(DAY1Elect==0?DAY1Elect:DAY1Elect||"--");
			$(".electric .yescount").html(DAY2Elect==0?DAY2Elect:DAY2Elect||"--");	
			var DAY1Water=Math.round(result.DAY1Water);//今日水消耗
			var DAY2Water=Math.round(result.DAY2Water);//昨日水消耗
			$(".water .thiscount").html(DAY1Water==0?DAY1Water:DAY1Water||"--");
			$(".water .yescount").html(DAY2Water==DAY2Water?DAY2Water:DAY2Water||"--");
			var percentageElect=result.percentageElect;//电百分比
			var percentageWater=result.percentageWater;//水百分比
			var hour=result._hour;//时间
			$(".energyEfficiencybar .time").html(hour-1+":00--"+hour+":00");
			if(DAY2Elect!=0&&percentageElect!=undefined){
				if(percentageElect<0){
					$(".electric .compare").css("color","#48D396");
					$(".electric .compare").html(percentageElect.toFixed(2)+"%↓");
				}
				else if(percentageElect==0){
					$(".electric .compare").html(percentageElect.toFixed(2)+"%");
				}
				else{
					$(".electric .compare").css("color","red");
					$(".electric .compare").html(percentageElect.toFixed(2)+"%↑");
				}
			}
			if(DAY2Water!=0&&percentageWater!=undefined){
				if(percentageWater<0){
					$(".water .compare").css("color","#48D396");
					$(".water .compare").html(percentageWater.toFixed(2)+"%↓");
				}
				else if(percentageWater==0){
					$(".water .compare").html(percentageWater.toFixed(2)+"%");
				}
				else{
					$(".water .compare").css("color","red");
					$(".water .compare").html(percentageWater.toFixed(2)+"%↑");
				}
			}
		}
	})
}


// 当日设备耗电排行
energySavingIndex.devicesElectricTop5 = function () {
	// $.post(baseurl + "common/selectElectricRank", {
	$.post(hdInterface.ENselectElectricRank, {		
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			$("#devicesElectricTop5").empty();
			if(data['data'].length==0){
				$("#devicesElectricTop5").append('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"/></div>');
				return;
			}
			$.each(data['data'], function (i) {
				$("#devicesElectricTop5").append(
					`<li>
						<img src="./image/icon${i+5}.png" />
						<span class="title"><span class="rolling-over-animated duration${i+1}">NO.${i+1} ${this.plate}</span></span>
						<span class="count"><span class="rolling-over-animated duration${i+1}">${parseInt(this.dayElectric).toLocaleString()} kW·h</span></span>
					</li>`
				);
			})
		}
	})
}

// 加载监控数据
energySavingIndex.loadMonitor = function () {

	//当前机房状态
	$.post(hdInterface.ENselectWaterSourceHeatPumpUnit, params, function (data) {
		if (data['code'] === 0) {
			data = data.data||[];
			$.each(Object.keys(data), function () {
				var $output = $(`#${this}`);
				if ($output.length > 0) {
					// if (this.toLocaleLowerCase().indexOf('pressure') > -1) {
						$output.text(convertNumber(data[this], 2));
					// } else {
						// $output.text(convertNumber(data[this]));
					// }
				}
			});
		}
	});

	//当日能耗监控、室内外温度
	$.post(hdInterface.selectElectricAndWaterDay, params, function (data) {
		if (data['code'] === 0) {
			data = data.data[0]||[];
			autoSetElement(data);
		}
	});

	//当日总能耗
	// $.post(`${baseurl}/common/selectElectricAndWaterDayConsumption`, params, function (data) {
	$.post(hdInterface.selectElectricAndWaterDayConsumption, params, function (data) {
		if (data['code'] === 0) {
			var result = data["data"][0];
			$.each(Object.keys(result), function () {
				var $output = $(`#${this}`);
				if ($output.length > 0) {
					$output.text(parseInt(result[this]).toLocaleString());
				}
			});
			// loadnum(parseInt(result['AllSum']), parseInt(result['deviceCount']));			
			loadnum1(parseInt(result['AllSum']));
		}
	})
	//昨日总能耗
	// $.post(`${baseurl}/common/yesterdayTotalEnergy`, params, function (data) {
	$.post(hdInterface.yesterdayTotalEnergy, params, function (data) {
		if (data['code'] === 0) {
			var result = data["data"][0];
			loadnum2(parseInt(result['countEnergyYesterdayDay']));
		}
	})
}

//图表,系统实时COP
energySavingIndex.loadEchars = function () {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	// 指定图表的配置项和数据
	var option = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '3%',
			top: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			// data: ["0:00", "3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"],
			// data:xdata,       		
			color: '#fff',
			boundaryGap: false,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#0a94ff'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#082f60' // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: '#082f60' //更改坐标轴颜色
				}
			},

		},
		yAxis: {
			//name: '°C',
			type: 'value',
			scale: true,
			color: '#082f60',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#0a94ff'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#082f60' // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: '#082f60' //更改坐标轴颜色
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#082f60'],
					width: 1,
					type: 'solid'
				}
			}
		},
		series: [{
			name: 'COP',
			// data: [3, 5, 10, 18, 31, 3, 5, 10],
			// data:seriesData,
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					color: '#48D396', //改变折线点的颜色
					lineStyle: { // 系列级个性化折线样式
						width: 2, // 折线宽度
						type: 'solid', // 折线是实线
						color: "#00FFFF" // 折线颜色
					}
				},
			},
			areaStyle: {
				normal: {
					//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(72,211,150,1)'
					}, {
						offset: .34,
						color: 'rgba(0,255,255,0.5)'
					}, {
						offset: 1,
						color: 'rgba(0,255,255,0.1)'
					}])

				}
			}, //区域颜色渐变
			symbolSize: 3, //折线点的大小
		}]
	};

	// $.post(baseurl + "common/selectSystemCop", {
	$.post(hdInterface.selectSystemCop, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var x = [],
				y = [];
			$.each(data['data'], function () {
				x.push(this.day_hours + ":00");
				y.push(this.cop ? this.cop : '0');
			});
			if(x.length==0&&y.length==0){
				$("#main").html('<div class="nodata" style="height:150px;"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
				$('#main').siblings('.echars-units').hide();
			}else{
				option.xAxis.data = x;
				option.series[0].data = y;
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				$(".hd-full-screen").click(function () {
					setTimeout(function () {
						myChart.resize();
					}, 10);
				});
			}
			
			
		}
	})
}

//图片旋转
energySavingIndex.pngturn = function () {
	//加载png序列start
	var nameLink = './image/lengji2/';
	nameArr = [
		"lengji2_00000.png", "lengji2_00001.png", "lengji2_00002.png", "lengji2_00003.png", "lengji2_00004.png",
		"lengji2_00005.png", "lengji2_00006.png",
		"lengji2_00007.png", "lengji2_00008.png", "lengji2_00009.png", "lengji2_00010.png", "lengji2_00011.png",
		"lengji2_00012.png", "lengji2_00013.png",
		"lengji2_00014.png", "lengji2_00015.png", "lengji2_00016.png", "lengji2_00017.png", "lengji2_00018.png",
		"lengji2_00019.png", "lengji2_00020.png",
		"lengji2_00021.png", "lengji2_00022.png", "lengji2_00023.png", "lengji2_00024.png", "lengji2_00025.png",
		"lengji2_00026.png", "lengji2_00027.png", "lengji2_00028.png", "lengji2_00029.png", "lengji2_00030.png",
		"lengji2_00031.png", "lengji2_00032.png", "lengji2_00033.png", "lengji2_00034.png", "lengji2_00035.png",
		"lengji2_00035.png", "lengji2_00036.png", "lengji2_00037.png", "lengji2_00038.png", "lengji2_00039.png",
		"lengji2_00040.png", "lengji2_00041.png", "lengji2_00042.png", "lengji2_00043.png", "lengji2_00044.png",
		"lengji2_00045.png", "lengji2_00046.png", "lengji2_00047.png", "lengji2_00048.png", "lengji2_00049.png",
		"lengji2_00050.png", "lengji2_00051.png", "lengji2_00052.png", "lengji2_00053.png", "lengji2_00054.png",
		"lengji2_00055.png", "lengji2_00056.png", "lengji2_00057.png", "lengji2_00058.png", "lengji2_00059.png",
		"lengji2_00060.png",
	];
	var myImgs = $("#waringlight");
	loadPng(nameArr, nameLink, myImgs, 60, "myImageHolder1");
	//加载png序列end
}
window.energySavingIndex = energySavingIndex;
energySavingIndex.init();

//数字特效
function loadnum1(var1) {
	// $("#numValue").text(var1);
	numAutoPlus('numValue', 0, {
		time: 2000,
		num: var1,
		rate: 40,
		format: true
	})
	
}
function loadnum2(var2) {	
	numAutoPlus('numValue2', 0, {
		time: 2000,
		num: var2,
		rate: 40
	})
}