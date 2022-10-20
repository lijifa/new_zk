var energySavingStatistical = {}
var _SITE_ID = getParams()['siteId'];
energySavingStatistical.init = function () {
	energySavingStatistical.systemEnergyEfficiency();
	energySavingStatistical.runList();
	// energySavingStatistical.turnPng();
	energySavingStatistical.statistics();
	energySavingStatistical.monthElectricDayTop();
	energySavingStatistical.copDistribution();
}

// 日耗电排行(近30天)
energySavingStatistical.monthElectricDayTop = function () {
	// $.post(`${baseurl}/common/selectMonthElectricDayTop`, {
	$.post(hdInterface.selectMonthElectricDayTop, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {			
			(data['data'] || []).forEach(function (item, ind) {
				$("#ul-electric-top5").append(
					`<li>NO.${ind+1}<span class="count">${Math.round(item.resultValueTop)}</span>kW·h <span class="time">${item.date}</span></li>`
				);
			})
			if(data['data']|| [].length==0){
				$("#ul-electric-top5").append('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"/></div>');
			}
		}
		removemask("ener-30-elect-cover");
	})
}

// 能耗监控
energySavingStatistical.statistics = function () {
	// $.post(`${baseurl}/common/selectMonthAvgAndStatistics`, {
	//能耗总计、能耗均值
	$.post(hdInterface.selectMonthAvgAndStatistics, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var result = data['data']||[];
			Object.keys(result).forEach(function (key) {
				var $key = $(`#${key}`);
				if ($key.length > 0) {
					$key.text(convertNumber(result[key]))
				}
			});
		}
	})
	//能耗总计表格，30天日耗电趋势，30天气温趋势，
	// $.post(`${baseurl}/common/selectMonthInfo`, {
	 $.post(hdInterface.selectMonthInfo, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var electricityTop5 = {
					xdata: [],
					ydata: [],
					ymax: 0
				},
				energyEfficiency = {
					xdata: [],
					ydata: []
				};
			data['data'].forEach(function (item, ind) {
				$("#ul-statistics").append(
					`<li>  
						<span class="width1"> ${convert(item.selectedDate)}</span>
						<span class="width1"> ${convertNumber(item.avgTemperatureInfo)}</span>
						<span class="width1"> ${convertNumber(item.avgHumidityInfo)}</span>
						<span class="width1"> ${convertNumber(item.electricSumInfo)}</span>
						<span class="width1"> ${convertNumber(item.waterSumInfo)}</span>
						<span class="width1"> ${convertNumber(item.calSumInfo)}</span>
						<span class="width1"> ${convertNumber(item.flowInfo)}</span>
					</li>`
				);
				var elect = convertNumber(item.electricSumInfo||0, 0);
				electricityTop5.xdata.push(convert(item.selectedDate).substring(5,10));
				electricityTop5.ydata.push(elect);
				energyEfficiency.xdata.push(convert(item.selectedDate).substring(5,10));
				energyEfficiency.ydata.push(convertNumber(item.avgTemperatureInfo||0, 0));
				if (electricityTop5.ymax < elect) {
					electricityTop5.ymax = elect;
				}
			});
			//滚动列表
			jQuery(".txtMarquee-top").slide({
				mainCell: ".bd ul",
				autoPlay: true,
				effect: "topMarquee",
				vis: 10,
				interTime: 50
			});
			energySavingStatistical.electricityTop5(electricityTop5.xdata.reverse(), electricityTop5.ydata.reverse(), electricityTop5.ymax);
			energySavingStatistical.energyEfficiency(energyEfficiency.xdata.reverse(), energyEfficiency.ydata.reverse());
		}
		removemask("energy-total-cover");
		removemask("ener-day-ele-cover");
		removemask("ener-30-tem-cover");
	})
}

// 30天气温趋势
energySavingStatistical.energyEfficiency = function (xdata, ydata) {
	var chart = {
		// 基于准备好的dom，初始化echarts实例
		el: echarts.init(document.getElementById('main1')),
		// 指定图表的配置项和数据
		option: function (xdata, ydata) {
			return {
				// tooltip: {},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '5%',
					top: '11%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: xdata || [],
					color: '#fff',
					boundaryGap: false,
					axisLabel: {
						show: true,
						// rotate:20,
						textStyle: {
							color: '#a5eaff'
						}
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' //更改坐标轴颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},

				},
				yAxis: {
					name: '°C',
					type: 'value',
					scale: true,
					color: '#082f60',
					axisLabel: {
						show: true,						
						textStyle: {
							color: '#a5eaff'
						}
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' // 刻度的颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(10,148,255,0.3)'],
							width: 1,
							type: 'solid'
						}
					}
				},
				series: [{
					name: '锅炉',
					data: ydata || [],
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							color: '#FF830A', //改变折线点的颜色
							lineStyle: { // 系列级个性化折线样式
								width: 3, // 折线宽度
								type: 'solid', // 折线是实线
								color: "#FF830A" // 折线颜色
							}
						},
					},
					symbolSize: 0 //折线点的大小
				}]
			}
		},
		render: function () {
			// 使用刚指定的配置项和数据显示图表。
			this.el.setOption(this.option(xdata, ydata));
		}
	}
	chart.render();
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			chart.el.resize();
		}, 10);
	});
	$(window).resize(function () {
		chart.el.resize();
	});
}

// 30日系统cop统计
energySavingStatistical.systemEnergyEfficiency = function () {
	var chart = {
		el: echarts.init(document.getElementById('main2')),
		option: function (xdata, ydata) {
			return {
				// tooltip: {},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '5%',
					top: '10%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: xdata,
					color: '#fff',
					axisLabel: {
						show: true,
						// interval:0,
						// rotate:20,
						textStyle: {
							color: '#a5eaff'
						}
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' //更改坐标轴颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},

				},
				yAxis: {
					// name: '°C',
					type: 'value',
					scale: true,
					color: '#082f60',
					axisLabel: {
						show: true,
						textStyle: {
							color: '#a5eaff'
						}
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' // 刻度的颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(10,148,255,0.3)'],
							width: 1,
							type: 'solid'
						}
					}
				},
				series: [{
					name: 'COP',
					data: ydata,
					type: 'bar',
					barWidth: 10, //柱图宽度
					smooth: true,
					itemStyle: {
						normal: {
							color: '#25F8FF', //改变折线点的颜色					
						},
					}
				}]
			};
		},
		render: function (xdata, ydata) {
			// 使用刚指定的配置项和数据显示图表。
			chart.el.setOption(chart.option(xdata, ydata));
		}
	}
	//系统COP统计(近30天)
	// $.post(`${baseurl}/common/selectSystemMonthCop`, {
	$.post(hdInterface.selectSystemMonthCop, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var xdata = [],
				ydata = [];
			data['data'].forEach(function (item) {
				xdata.push(item.date.substr(5,10));
				ydata.push(item.cop||0)
			})
			chart.render(xdata, ydata);
		}
		removemask("ener-cop-cover");
	});
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			chart.el.resize();
		}, 10);
	});
	$(window).resize(function () {
		chart.el.resize();
	});
}

// 30天单日耗电趋势图表绘制
energySavingStatistical.electricityTop5 = function (xdata, ydata, ymax) {
	// 基于准备好的dom，初始化echarts实例
	var chart = {
		// 获取图表对象
		el: echarts.init(document.getElementById('main3')),
		// 指定图表的配置项和数据
		option: function (xdata, ydata, ymax) {
			return {
				// tooltip: {},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '3%',
					top: '10%',
					containLabel: true
				},
				dataZoom: [ //滑动条
					{
						xAxisIndex: 0, //这里是从X轴的0刻度开始
						show: false, //是否显示滑动条，不影响使用
						type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
						startValue: 0, // 从头开始。
						endValue: 4,
						interval: 0,
					}
				],
				xAxis: {
					type: 'category',
					data: xdata || [],
					color: '#fff',
					boundaryGap: false,
					axisLabel: {
						show: true,
						// 让字体完全显示
						interval: 0,
						// rotate:20,//文字旋转
						textStyle: {
							color: '#a5eaff'

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
					}
				},
				yAxis: {
					name: '°C',
					type: 'value',
					scale: true,
					color: '#082f60',
					max: ymax,					
					axisLabel: {
						show: true,
						textStyle: {
							color: '#a5eaff'
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
					name: '专利',
					data: ydata || [],
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							color: '#48D396', //改变折线点的颜色
							lineStyle: { // 系列级个性化折线样式
								width: 2, // 折线宽度
								type: 'solid', // 折线是实线
								color: "#48D396" // 折线颜色
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
								offset: .5,
								color: 'rgba(72,211,150,0.3)'
							}, {
								offset: 1,
								color: 'rgba(0,255,255,0.1)'
							}])

						}
					}, //区域颜色渐变
					symbolSize: 3 //折线点的大小
				}]
			};
		},
		// 开始绘制
		render: function () {
			var option = this.option(xdata, ydata);

			function r() {
				if (option.dataZoom[0].startValue < 30) {
					option.dataZoom[0].startValue += 1;
					option.dataZoom[0].endValue += 1;
				} else {
					option.dataZoom[0].startValue = 0;
					option.dataZoom[0].endValue = 4;
				}
				// 使用刚指定的配置项和数据显示图表。
				chart.el.setOption(option);
			}
			setInterval(r, 1000);
			r();
		}
	}
	chart.render();
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			chart.el.resize();
		}, 10);
	});
	$(window).resize(function () {
		chart.el.resize();
	});


}

// 30天设备耗电排行
energySavingStatistical.runList = function () {
	var chart = {
		// 基于准备好的dom，初始化echarts实例
		el: echarts.init(document.getElementById('main4')),
		// 指定图表的配置项和数据
		option: function (xdata, ydata) {
			return {
				// tooltip: {},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '5%',
					top: '11%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: xdata,
					color: '#fff',
					axisLabel: {
						show: true,
						interval: 0,
						textStyle: {
							color: '#a5eaff',
							fontSize: 10,
							lineHeight: 12,
						},
						interval: 0,
						// rotate: "45",
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' //更改坐标轴颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},

				},
				yAxis: {
					name: '°C',
					type: 'value',
					scale: true,
					color: '#082f60',
					axisLabel: {
						show: true,
						textStyle: {
							color: '#a5eaff'
						}
					},
					axisTick: {
						lineStyle: {
							color: 'rgba(10,148,255,0.1)' // 刻度的颜色
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(10,148,255,0.3)' //更改坐标轴颜色
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(10,148,255,0.3)'],
							width: 1,
							type: 'solid'
						}
					}
				},
				series: [{
					name: '',
					data: ydata,
					type: 'bar',
					barWidth: 20, //柱图宽度
					smooth: true,
					itemStyle: {
						normal: {
							color: '#25F8FF', //改变折线点的颜色	
							label: {
							   show: true,		//开启显示
							   position: 'top',	//在上方显示
							   textStyle: {	    //数值样式
								   color: '#a5eaff',
								   fontSize: 12
							   }
							}
						},
					},
					// symbolSize: 0, //折线点的大小
				}]
			};
		},
		// 转换数据
		convert: function (data) {
			var xdata = [],
				ydata = [];
			for (var i = 0; i < 5; i++) {
				var item = data[i];
				if (typeof item === 'undefined') {
					xdata.push("--");
					ydata.push(0);
				} else {
					xdata.push(insertWarpByIndex(item.name, 5));
					ydata.push(Math.round(item.resultValueDeviceTop));
				}
			}
			return [xdata, ydata]
		},
		render: function (data) {
			var [xdata, ydata] = this.convert(data);
			chart.el.setOption(chart.option(xdata, ydata));
		}
	}

	// 设备耗电排行
	// $.post(`${baseurl}/common/selectMonthElectricDeviceTop`, {
	$.post(hdInterface.selectMonthElectricDeviceTop, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			chart.render(data['data']);
		}
		removemask("ener-equelect-cover");		
	})
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			chart.el.resize();
		}, 10);
	});
	$(window).resize(function () {
		chart.el.resize();
	});
}

//旋转动画
energySavingStatistical.turnPng = function () {

	//加载png序列start
	var nameLink = './image/tiaotiao/';
	nameArr = [];
	for (var i = 0; i < 59; i++) {
		if (i < 10) {
			var str = "tiaotiao_0000" + i + ".png";
		}
		if (i >= 10 && i <= 99) {
			var str = "tiaotiao_000" + i + ".png";
		}
		if (i >= 100 && i <= 999) {
			var str = "tiaotiao_00" + i + ".png";
		}
		nameArr.push(str);
	}
	var myImgs = $("#waringlightright");
	loadPng(nameArr, nameLink, myImgs, 10, "myImageHolder");
	//加载png序列end

}

// 系统COP分布(近30天)
energySavingStatistical.copDistribution = function () {
	// $.post(`${baseurl}/common/selectCopDistribution`, {
	$.post(hdInterface.selectCopDistribution, {
		'siteId': _SITE_ID
	}, function (data) {
		if (data['code'] === 0) {
			var result = data['data']||[];
			Object.keys(result).forEach(function (k) {
				var jqueryDom = $(`#${k}`);
				if (jqueryDom.length > 0) {
					jqueryDom.text(k.indexOf('Distribution')>-1?result[k]+'%':result[k]);
				}
			})
		}
	})
}

window.energySavingStatistical = energySavingStatistical;
energySavingStatistical.init();