var echarsConfig = {
	labelColor: "#c3e8ff",
	lineColor: "rgba(10,148,255,0.3)"
	// labelColor: "#96D6FF",
	// lineColor: "rgba(10,148,255,0.3)",
	// labelColor: "#fff",
	// lineColor: "#fff"
};
var echarsComponent = {}

//竖向柱图
/*
	obj={
			"elementId":"main1",//容器id	[必填]				
			"xdata":["场馆", "学校", "园区", "医院"],//横坐标数据[必填]
			"ydata":[[2, 4, 6,8],[1, 3, 5,7],[1, 3, 5,9]],//纵坐标数据[必填]
			"seriesColor":[],//图表颜色[非必填]
			"units":"℃",//单位[非必填]
			"showCount":true,//是否显示顶部数字 bool[非必填]
			"labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
			"lineColor":"rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
			"dataZoom":{
			 	"isScroll":true,//是否可以自动切换[非必填]
			 	"endValue":0//显示个数，长度是当前数字+2个[非必填]
			 },
			 "interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
			 "xAxisFontSize":10,//横坐标文字大小[非必填]
			 "barWidth":30,//图表宽度
			 "colorGradient":[{"startColor":"red","endColor":"yellow"},{"startColor":"red","endColor":"green"}],//渐变颜色
			 "grid": {
			  	left: '3%',
			  	right: '4%',
			  	bottom: '5%',
			 	top: '25px',
			  },
			  "yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
			  yAxisMinInterval:10,//y轴最小刻度间距
			  "nodataImg":true,//无数据时候是否显示暂无数据图片
			  provideNumber:5
		}
*/
echarsComponent.getBarChars = function (obj) {
	var defaultColor = 'rgba(0, 255, 255, 0.9)';
	var defaultStartColor = "rgb(72,212,150,1)";
	var defaultEndColor = "rgb(0,255,255,1)";

	var elementId = obj.elementId;
	var xdata = obj.xdata == undefined ? [] : obj.xdata;
	var ydata = obj.ydata == undefined ? [] : obj.ydata;
	var seriesColor = obj.seriesColor == undefined ? [] : obj.seriesColor;
	var showCount = obj.showCount == undefined ? false : true;
	var labelColor = obj.labelColor == undefined ? echarsConfig.labelColor : obj.labelColor;
	var lineColor = obj.lineColor == undefined ? echarsConfig.lineColor : obj.lineColor;
	var dataZoom = obj.dataZoom || [];
	var isScroll = dataZoom.isScroll == undefined ? false : true;
	var endValue = dataZoom.endValue == undefined ? 2 : dataZoom.endValue;
	var interval = obj.interval;
	var yAxisMin = obj.yAxisMin;
	var yAxisMax = obj.yAxisMax;
	var yAxisMinInterval = obj.yAxisMinInterval;
	var barWidth = obj.barWidth == undefined ? 10 : obj.barWidth;
	var xAxisFontSize = obj.xAxisFontSize == undefined ? 12 : obj.xAxisFontSize; //横坐标字号
	var colorGradient = obj.colorGradient == undefined ? [] : obj.colorGradient; //渐变颜色
	var nodataImg = obj.nodataImg;
	var provideNumber = obj.provideNumber || 4;
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});

	if (nodataImg == true) {
		var nodata = nodata();
		if (nodata == false) {
			return nodata;
		}
	}

	function nodata() {
		var xdataFlage = false,
			ydataFlage = false;
		xdata.forEach(function (item) {
			if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
				xdataFlage = true;
			}
		})
		ydata.forEach(function (arr) {
			arr.forEach(function (item) {
				if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
					ydataFlage = true;
				}
			})
		})
		if (xdataFlage == false || ydataFlage == false) {
			var dom = $("#" + elementId);
			// console.log(dom)
			// console.log(dom.find(".nodata").length)
			if (dom.find(".nodata").length == 0) {
				dom.html('<div class="nodata"><img src="../../../common/image/nodata.png" class="nodateimg"></div>');
			}
			return false;
		}
	}

	var myChart = echarts.init(document.getElementById(elementId));
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: lineColor
				}
			},
			textStyle: {
				align: 'left'
			}
			// formatter:function(params){
			// 	// return "<div style='text-align:left;padding:3px;'>"+params.seriesName+"<br/>"+params.name.replace(/\s*/g,'')+"："+params.value+"</div>";
			// 	return "<div style='text-align:left;padding:3px;'>"+params.name.replace(/\s*/g,'')+":"+params.value+"</div>";
			// }
		},
		grid: grid,
		// grid: {
		// 	left: '3%',
		// 	right: '4%',
		// 	bottom: '5%',
		// 	top: '25px',
		// 	containLabel: true
		// },
		xAxis: {
			type: 'category',
			data: xdata,
			color: '#fff',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor,
					fontSize: xAxisFontSize,
					lineHeight: 12,
				},
				formatter: value=> {
					var newParamsName = "";
					// console.log("++++++++++++", value);
					var paramsNameNumber = value? value.length : '';
					// var provideNumber = provideNumber;
					var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
					if (paramsNameNumber > provideNumber) {
						for (var p = 0; p < rowNumber; p++) {
							var tempStr = "";
							var start = p * provideNumber;
							var end = start + provideNumber;
							if (p == rowNumber - 1) {
								tempStr = value.substring(start, paramsNameNumber);
							} else {
								tempStr = value.substring(start, end) + "\n";
							}
							newParamsName += tempStr;
						}
					} else {
						newParamsName = value;
					}
					return newParamsName
				},
				// interval: 0
			},
			axisTick: {
				show: false, //不显示刻度
				lineStyle: {
					color: lineColor //更改坐标轴刻度颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},

		},
		yAxis: {
			name: obj.units, //y轴单位
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: [0, 0, -10, -10]
			},
			type: 'value',
			scale: true,
			minInterval: 1,
			color: '#ccc',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor
				}
			},
			axisTick: {
				show: false,
				lineStyle: {
					color: lineColor // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: lineColor,
					width: 1,
					type: 'solid'
				}
			}
		},

		series: []
	};
	// 使用刚指定的配置项和数据显示图表。
	function r() {
		if (option.dataZoom[0].startValue < xdata.length - 1) {
			option.dataZoom[0].startValue += 1;
			option.dataZoom[0].endValue += 1;
		} else {
			option.dataZoom[0].startValue = 0;
			option.dataZoom[0].endValue = endValue + 1;
		}
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	if (isScroll) {
		option.dataZoom = [ //滑动条
				{
					xAxisIndex: 0, //这里是从X轴的0刻度开始
					show: false, //是否显示滑动条，不影响使用
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					startValue: -1, // 从头开始。
					endValue: endValue,
					interval: 0,
				}
			],
			setInterval(r, 3000);
		r();
	}
	if (interval != undefined) {
		option.xAxis.axisLabel.interval = interval;
	}
	if (yAxisMin != undefined) {
		option.yAxis.min = yAxisMin;
	}
	if (yAxisMax != undefined) {
		option.yAxis.max = yAxisMax;
	}
	if (yAxisMinInterval != undefined) {
		option.yAxis.minInterval = yAxisMinInterval;
	}
	for (var i = 0; i < ydata.length; i++) {
		// console.log(obj["ydata"][i],obj["seriesColor"][i])

		var itemSeriesColor = seriesColor[i] == undefined ? defaultColor : seriesColor[i];
		var itemcolor = itemSeriesColor;
		if (colorGradient.length > 0) {
			var itemColorGradient = colorGradient[i] || {};
			itemcolor = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
					offset: 0,
					color: itemColorGradient.startColor || defaultStartColor,
				},
				{
					offset: 1,
					color: itemColorGradient.endColor || defaultEndColor,
				},
			])
		}
		var objItem = {
			name: "",
			data: ydata[i],
			type: 'bar',
			barWidth: barWidth, //柱图宽度
			smooth: true,
			itemStyle: {
				normal: {
					color: itemcolor, //改变柱图颜色
					// color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
					// 		offset: 0,
					// 		color: startColor,
					// 	},
					// 	{
					// 		offset: 1,
					// 		color: endColor,
					// 	},
					// ]),
					label: {
						show: showCount, //开启显示
						position: 'top', //在上方显示
						textStyle: { //数值样式
							color: labelColor,
							fontSize: 12
						}
					}
				},
			},
		}

		option.series.push(objItem);
	}


	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//横向柱状图
/* var obj = {
	"elementId": "main4", //容器id	[必填]		
	"xdata": ["标题1", "标题2", "标题3"], //横坐标数据[必填]
	"ydata": [12, 0, 0], //纵坐标数据[必填]
	"labelColor": "#fff", //标签汉字颜色[非必填]
	"labelFontSize": "14", //标签汉字字号[非必填]
	"countColor": "#fff", //标签数字颜色[非必填]
	"countFontSize": "14", //标签数字字号[非必填]
	"showCount":true,//是否显示数字[非必填]
	"showShadow": true, //是否展示阴影，默认没有阴影[非必填]
	"startColor": "#ccc", //开始颜色[非必填]
	"endColor": "#000", //结束颜色[非必填]
	"barWidth": 30, //图表宽度[非必填]
 "nodataImg":true,//无数据时候是否显示暂无数据图片
} */
echarsComponent.getCrossBarChars = function (obj) {
	var elementId = obj.elementId;
	var xdata = obj.xdata == undefined ? [] : obj.xdata;
	var ydata = obj.ydata == undefined ? [] : obj.ydata;
	var labelColor = obj.labelColor == undefined ? echarsConfig.labelColor : obj.labelColor;
	var labelFontSize = obj.labelFontSize == undefined ? 12 : obj.labelFontSize;
	var countColor = obj.countColor == undefined ? echarsConfig.labelColor : obj.countColor;
	var countFontSize = obj.countFontSize == undefined ? 12 : obj.countFontSize;
	var showCount = obj.showCount == undefined ? false : true;
	var showShadow = obj.showShadow == undefined ? false : true;
	var startColor = obj.startColor == undefined ? "rgb(72,212,150,1)" : obj.startColor;
	var endColor = obj.endColor == undefined ? "rgb(0,255,255,1)" : obj.endColor;
	var barWidth = obj.barWidth == undefined ? 10 : obj.barWidth;
	var nodataImg = obj.nodataImg;

	var myChart = echarts.init(document.getElementById(elementId));

	function renderchart(xdata, ydata) {
		// var xdata = ["冷冻供水温度过高", "冷冻供水温度过高", "冷冻供水温度过高", "冷冻供水温度过高", "冷冻供水温度过高"];
		// var ydata = [239, 181, 154, 144, 135];
		var salvProMax = []; //背景按最大值
		if (showShadow) {
			//如果有阴影，则赋值给数组
			for (let i = 0; i < ydata.length; i++) {
				if (ydata[i] !== "") {
					salvProMax.push(ydata[0] ? ydata[0] : 1)
				}
			}
		}

		var option = {
			// backgroundColor:"#003366",
			grid: {
				left: "2%",
				right: "2%",
				bottom: "0%",
				top: "2%",
				containLabel: true,
			},
			// tooltip: {},
			// tooltip: {
			// 	trigger: 'axis',
			// 	axisPointer: {
			// 		type: 'none'
			// 	},
			// 	formatter: function (params) {
			// 		return params[0].name + ' : ' + params[0].value
			// 	}
			// },
			xAxis: {
				show: false,
				type: "value",
			},
			yAxis: [{
					type: "category",
					inverse: true,
					axisLabel: {
						show: true,
						textStyle: {
							color: labelColor,
							fontSize: labelFontSize,
							lineHeight: 16
						},
						// formatter: function (value) {
						//     var newParamsName = "";
						//     var paramsNameNumber = value.length;
						//     var provideNumber = 4;
						//     var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
						//     if (paramsNameNumber > provideNumber) {
						//         for (var p = 0; p < rowNumber; p++) {
						//             var tempStr = "";
						//             var start = p * provideNumber;
						//             var end = start + provideNumber;
						//             if (p == rowNumber - 1) {
						//                 tempStr = value.substring(start, paramsNameNumber);
						//             } else {
						//                 tempStr = value.substring(start, end) + "\n";
						//             }
						//             newParamsName += tempStr;
						//         }
						//     } else {
						//         newParamsName = value;
						//     }
						//     return newParamsName
						// },
						interval: 0
					},
					splitLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					data: xdata,
				},
				{
					type: "category",
					inverse: true,
					axisTick: "none",
					axisLine: "none",
					show: showCount,
					axisLabel: {
						textStyle: {
							color: countColor,
							fontSize: countFontSize,
						},
						interval: 0
					},
					data: ydata,
				},
			],
			series: [{
					// name: "值",
					type: "bar",
					zlevel: 1,
					cursor: "default",
					itemStyle: {
						normal: {
							barBorderRadius: 2,
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: startColor,
								},
								{
									offset: 1,
									color: endColor,
								},
							]),
						},
					},
					barWidth: barWidth,
					data: ydata,
				},
				{
					// name: "背景",
					type: "bar",
					barWidth: 2 * barWidth,
					barGap: "-150%",
					cursor: "default",
					data: salvProMax,
					itemStyle: {
						normal: {
							color: "rgba(0,163,163,0.5)",
							barBorderRadius: 2,
						},
					},
				},
			],
		};

		if (nodataImg == true) {
			var nodata = nodata();
			if (nodata == false) {
				return nodata;
			}
		}

		function nodata() {
			var xdataFlage = false,
				ydataFlage = false;
			xdata.forEach(function (item) {
				if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
					xdataFlage = true;
				}
			})
			ydata.forEach(function (item) {
				if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
					ydataFlage = true;
				}
			})
			if (xdataFlage == false || ydataFlage == false) {
				var dom = $("#" + elementId);
				// console.log(dom)
				// console.log(dom.find(".nodata").length)
				if (dom.find(".nodata").length == 0) {
					dom.html('<div class="nodata"><img src="../../../common/image/nodata.png" class="nodateimg"></div>');
				}
				return false;
			}
		}

		myChart.setOption(option);
		$(".hd-full-screen").click(function () {
			setTimeout(function () {
				myChart.resize();
			}, 10);
		});
		$(window).resize(function () {
			myChart.resize();
		});
	}
	renderchart(xdata, ydata);
}

//百分比柱状图
/* var obj={
	"elementId": "main5", //容器id	[必填]
	"barWidth":10,//图表宽度
	"series":[{
		"ydata":50,
		"color":"red",
		"name":"柱图1"
	},
	{
		"ydata":1,
		"color":"green",
		"name":"柱图2"
	}]//百分比 [必填]
} */
echarsComponent.getPercentBarChars = function (obj) {
	var elementId = obj.elementId;
	var barWidth = obj.barWidth || 15;
	var series = obj.series || [];
	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		grid: {
			left: "-5%",
			right: "0",
			bottom: "0",
			top: "0",
			containLabel: true,
		},
		// tooltip:{},
		xAxis: {
			type: "value",
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
		},
		yAxis: {
			type: "category",
			data: [""],
			splitLine: {
				show: true,
			},
			axisTick: {
				show: true,
			},
			axisLine: {
				show: true,
			},
			axisLabel: {
				show: true,
			},
		},
		//  series: [
		//    {
		//      name: "开启",
		//      type: "bar",
		//      stack: "总量",
		//      barWidth: 15,
		//      itemStyle: {
		//        normal: {
		//          color: "#00B0F0",
		//          // barBorderRadius: [2, 2, 2, 2],
		//        },
		//      },
		//      z: 10,
		//      data: [30],
		//    },
		//  {
		//   name: "开启2",
		//   type: "bar",
		//   stack: "总量",
		//   barWidth: 15,
		//   itemStyle: {
		//     normal: {
		//       color: "#fff",
		//       // barBorderRadius: [2, 2, 2, 2],
		//     },
		//   },
		//   z: 10,
		//   data: [30],
		// },
		//    {
		//      name: "离线",
		//      type: "bar",
		//      stack: "总量",
		//      itemStyle: {
		//        normal: {
		//          // barBorderRadius: [2, 2, 2, 2],
		//          color: "#BFBFBF",
		//          // shadowBlur: [0, 0, 0, -10],
		//          // shadowColor: '#FF4343',
		//          // shadowOffsetX: -20,
		//        },
		//      },
		//      data: [40],
		//    },
		//  ],
	};
	option.series = [];
	for (var i = 0; i < series.length; i++) {
		var item = series[i];
		option.series.push({
			name: item.name,
			type: "bar",
			stack: "百分比图",
			barWidth: barWidth,
			itemStyle: {
				normal: {
					// barBorderRadius: [2, 2, 2, 2],
					color: item.color,
					// shadowBlur: [0, 0, 0, -10],
					// shadowColor: '#FF4343',
					// shadowOffsetX: -20,
				},
			},
			data: [item.ydata],
		});
	}
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//百分比环状图
/*
obj={
	"elementId":"main2",//容器id	[必填]
	"value":10,//百分比值[必填]
	"startColor":'#4DF2AA',//开始时候颜色[非必填]
	"endColor":'#36D0FF',//结束时候颜色	[非必填]
	"fontSize":"12",//中间文字大小[非必填]
	"fontColor":"#fff",//中间文字颜色[非必填]
	"showText":false,//是否显示中间文字 bool[非必填]
	"pointx":'10%',//文字x轴位置[非必填]
	"pointy":'10%',//文字y轴位置[非必填]
	"radiusx":"90%",//控制环状图宽度，数值越接近100%，图越细
	}
*/
echarsComponent.getCircleChars = function (obj) {
	var elementId = obj.elementId;
	// var value = obj.value == undefined ? "--" : convertRate(obj.value, true);
	var value = obj.value == undefined ? "--" : obj.value;
	var startColor = obj.startColor == undefined ? "#4DF2AA" : obj.startColor;
	var endColor = obj.endColor == undefined ? "#36D0FF" : obj.endColor;
	var fontSize = obj.fontSize == undefined ? '12' : obj.fontSize;
	var fontColor = obj.fontColor == undefined ? echarsConfig.labelColor : obj.fontColor;
	var showText = obj.showText == undefined ? true : obj.showText;
	var pointx = obj.pointx == undefined ? 'center' : obj.pointx;
	var pointy = obj.pointy == undefined ? 'center' : obj.pointy;
	var radiusx = obj.radiusx == undefined ? '80%' : obj.radiusx;
	var myChart = echarts.init(document.getElementById(elementId));
	var datas = {
		value: value,
		units: "%",
		ringColor: [{
			offset: 0,
			color: startColor, // 0% 处的颜色
		}, {
			offset: 1,
			color: endColor // 100% 处的颜色
		}]
	}
	var option = {
		// backgroundColor:"#000",
		title: {
			text: datas["value"] + datas.units,
			x: pointx,
			y: pointy,
			show: showText,
			textStyle: {
				fontWeight: 'normal',
				color: fontColor,
				fontSize: fontSize
			}
		},
		color: ['#282c40'],
		legend: {
			show: false,
			data: []
		},

		series: [{
			name: 'Line 1',
			type: 'pie',
			clockWise: true,
			radius: [radiusx, '100%'],
			itemStyle: {
				normal: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}
			},
			hoverAnimation: false,
			data: [{
				value: datas["value"],
				name: '',
				itemStyle: {
					normal: {
						color: { // 完成的圆环的颜色
							colorStops: datas.ringColor
						},
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					}
				}
			}, {
				name: '',
				value: 100 - datas["value"]
			}]
		}]
	};
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//环形水波
/*
obj={
	"elementId":"main3",//容器id	[必填]
	"textCount":"12bar",//数字和单位[数字必填，单位非必填]
	"textColor":"rgba(255, 183, 254, 1)",//颜色，只支持rgb[非必填]
	"fontSize":"40",//中间字号[非必填]
	"borderWidth":"10",//边框宽度[非必填]
	"fontWeight":false//是否加粗文字，默认加粗[非必填]
	"pointx":"50%",//文字横坐标位置[非必填]
	"pointy":"50%"//文字纵坐标位置[非必填]
}*/
echarsComponent.getWaterCircleChars = function (obj) {
	var elementId = obj.elementId;
	var textCount = obj.textCount == undefined ? "--" : obj.textCount;
	var textColor = obj.textColor == undefined ? "rgba(255, 183, 44, 1)" : obj.textColor;
	var borderWidth = obj.borderWidth == undefined ? "2" : obj.borderWidth;
	var tecol = textColor.split('(')[1];
	tecol = tecol.split(",");
	var fontSize = obj.fontSize == undefined ? 32 : obj.fontSize;
	var fontWeight = obj.fontWeight == undefined ? 'bold' : obj.fontWeight;
	var pointx = obj.pointx == undefined ? 'center' : obj.pointx;
	var pointy = obj.pointy == undefined ? 'middle' : obj.pointy;
	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		title: {
			text: textCount,
			textStyle: {
				fontSize: fontSize,
				fontFamily: 'Microsoft Yahei',
				fontWeight: fontWeight,
				color: textColor,
				rich: {
					a: {
						fontSize: 28,
					}
				}
			},
			x: pointx,
			y: pointy
		},
		// backgroundColor: '#04184A',
		series: [{
			type: 'liquidFill',
			data: [0.3, 0.15, 0.07],
			radius: '95%',
			// 水球颜色
			color: ['rgba(' + tecol[0] + ', ' + tecol[1] + ', ' + tecol[2] + ', 0.4)', 'rgba(' + tecol[0] + ', ' + tecol[1] +
				', ' + tecol[2] + ', 0.5)', 'rgba(' + tecol[0] + ', ' + tecol[1] + ', ' + tecol[2] + ', 0.9)'
			],
			center: ['50%', '50%'],
			outline: {
				// show: false
				borderDistance: 5,
				itemStyle: {
					borderWidth: borderWidth,
					borderColor: textColor,
				},
			},
			label: {
				normal: {
					formatter: '',
				}
			},
			// 内图 背景色 边
			backgroundStyle: {
				color: 'rgba(4,24,174,0)',
				borderWidth: 5,
				// borderColor: 'red',
			}
		}]
	};
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//仪表盘
/*
obj={
	"elementId":"main6",//容器id	[必填]
	"data":10,//数据值[必填]
	"point":['50%', '62%'],//位置[非必填]
	"maxdata":5,//刻度最大值[非必填]
	"axisLabel":{//刻度属性[非必填]
		show: true,
		distance: -15, //文字位置
		formatter: function (v) {
		  switch (v + "") {
			case "0":
			  return "0";
			case "1":
			  return "1";
			case "2":
			  return "2";
			case "3":
			  return "3";
			case "4":
			  return "4";
			case "5":
			  return "5";
		  }
		},
	  },
	  "colorSet":"#00FFFF",	//外圈颜色[非必填]			  
	  "colorSet2":"#04a7a7",//内圈颜色[非必填]
}
*/
echarsComponent.getDashBoard = function (obj) {
	var elementId = obj.elementId || '';
	var point = obj.point || ['50%', '60%'];
	var radius = obj.radius || {};
	var colorSet = obj.colorSet || '#00FFFF';
	var colorSet2 = obj.colorSet2 || '#04a7a7';
	var maxdata = obj.maxdata || 100;
	var axisLabel = $.extend({
		show: true,
		color: colorSet,
		distance: -15, //文字位置
	}, obj.axisLabel || {});
	var dataArr1 = obj.data || "";
	// var colorSet = {
	//   color: "#00FFFF",
	// };

	// var dataArr1=10;
	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		// tooltip: {
		//   // formatter: "{a} <br/>{b} : {c}%",
		// },
		series: [{
				name: "内部进度条",
				type: "gauge",
				center: point,
				radius: radius["inner"] || '50%',
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						color: [
							// [dataArr1 / 100, colorSet.color],
							[1, colorSet2],
							[1, "rgba(14, 79, 83, 1)"],
							//  [1, "#04a7a7"],
							// [1, "rgba(14, 79, 83, 1)"],
						],
						width: 10,
					},
				},
				axisLabel: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				itemStyle: {
					show: false,
				},
				detail: {
					show: false,
					formatter: function (value) {
						if (value !== 0) {
							var num = Math.round(value);
							return parseInt(num).toFixed(0) + "%";
						} else {
							return 0;
						}
					},
					offsetCenter: [0, 82],
					textStyle: {
						padding: [0, 0, 0, 0],
						fontSize: 18,
						fontWeight: "700",
						color: colorSet,
					},
				},
				title: {
					//标题
					show: true,
					offsetCenter: [0, 46], // x, y，单位px
					textStyle: {
						color: "#fff",
						fontSize: 14, //表盘上的标题文字大小
						fontWeight: 400,
						fontFamily: "PingFangSC",
					},
				},
				data: [{
					// name: "title",
					value: dataArr1,
				}, ],
				pointer: {
					show: true,
					length: "60%",
					radius: "20%",
					width: 5, //指针粗细
				},
				animationDuration: 4000,
				min: 0, //最小刻度
				max: maxdata, //最大刻度
			},
			{
				name: "外部刻度",
				type: "gauge",
				center: point,
				radius: radius["outer"] || '62%',
				min: 0, //最小刻度
				max: maxdata, //最大刻度
				splitNumber: 10, //刻度数量
				startAngle: 225,
				endAngle: -45,
				axisLine: {
					show: true,
					lineStyle: {
						width: 1,
						color: [
							[1, "rgba(0,0,0,0)"]
						],
					},
				},
				//仪表盘轴线,文字位置
				axisLabel: axisLabel,
				//刻度标签。
				axisTick: {
					show: true,
					splitNumber: 5,
					lineStyle: {
						color: colorSet, //用颜色渐变函数不起作用
						width: 1,
					},
					length: -8, //刻度宽度
				},
				//刻度样式
				splitLine: {
					show: true,
					length: -13, //长线刻度宽度
					lineStyle: {
						color: colorSet, //用颜色渐变函数不起作用
						width: 1,
					},
				}, //分隔线样式
				detail: {
					show: false,
				},
				pointer: {
					show: false,
				},
			},
		],
	};

	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//折线图
/*
obj={
	"elementId":"main7",//容器id	[必填]
	 xdata:["11","22","33","44","55","66","77"],//横坐标数据[必填]
	 ydata:[[10,20,15,20,15,20,15],[14,10,1,10,1,10,1]],//纵坐标数据[必填]
	 ydataTitle:[]//提示框标题项
	 linecolors:['#ccc','red'],//线颜色[非必填]
	 areaStyleOpacity:0.1,//区域颜色[非必填]
	 interval:0,//间隔[非必填]
	 ifboundaryGap:true,//是否坐标文字显示到中间（不超出坐标轴左右边界）【非必填】
	 "dataZoom":{
	 	"isScroll":true,//是否可以自动切换[非必填]
	 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
	  },
	  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
	  "labelColor":'#a5eaff',//坐标轴文字颜色
	  "unit":"℃",//单位
	  "grid":{
		  left: '3%',
		  right: '4%',
		  bottom: '5%',
		  top: '25px',
	  },//边距[非必填]
	   "nodataImg":true,//无数据时候是否显示暂无数据图片
	   "yAxisMin":0,//y轴最小刻度默认为数据中最小值[非必填]
	   yAxisMinInterval:10,//y轴最小刻度间距
	   "markPoint":{
					 	label: {
					 	 show: true,
					 	 position: "top",
					 	 distance: 7,
					 	 offset: [1, 10],
					 	 formatter: '{b}: {c}'
					    },
					    symbol: "circle",
					    symbolSize: 10,
					    symbolOffset: [0, 0],                          
					    data: [ {type: 'max', name: 'MAX'},{type: 'min', name: 'MIN'}, ],  
					 },//标记点
}
*/
echarsComponent.getLine = function (obj) {
	var elementId = obj.elementId; //容器id	[必填]
	var xdata = obj.xdata || [];
	var ydata = obj.ydata || [];
	var ydataTitle = obj.ydataTitle || [];
	var linecolors = obj.linecolors || [];
	var areaStyleOpacity = obj.areaStyleOpacity || '0';
	var coordinateinecolor = obj.coordinateinecolor || echarsConfig.lineColor; //坐标轴颜色
	var labelColor = obj.labelColor || echarsConfig.labelColor; //坐标轴文字颜色
	var interval = obj.interval; //间隔
	var yAxisMin = obj.yAxisMin; //y轴最小值
	var yAxisMax = obj.yAxisMax; //y轴最小值
	var yAxisMinInterval = obj.yAxisMinInterval; //y轴最小间距
	var ifboundaryGap = obj.boundaryGap == undefined ? false : obj.boundaryGap;
	var dataZoom = obj.dataZoom || [];
	var isScroll = dataZoom.isScroll == undefined ? false : true;
	var endValue = dataZoom.endValue == undefined ? 2 : dataZoom.endValue;
	var unit = obj.unit || "";
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	var animation = obj.animation || true;
	var padding = obj.unitPadding || [0, 0, -10, -10];
	var markPoint = $.extend({}, obj.markPoint || {}); //标记点

	var nodataImg = obj.nodataImg; //暂无数据图片是否应用
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(elementId));
	// 指定图表的配置项和数据
	var option = {
		animation: animation, //控制当前的点击滑动时节点是否放大
		tooltip: {
			// backgroundColor: "rgba(50,50,50,0.1)",
			// borderColor: "rgba(51,51,51,0.1)",
			trigger: 'axis',
			confine: true,
			axisPointer: {
				lineStyle: {
					color: coordinateinecolor
				}
			},
			textStyle: {
				align: 'left',
				color:'#fff',
			}
		},
		grid: grid,
		// dataZoom: [
		// 	//滑动条
		// 	{
		// 		xAxisIndex: 0, //这里是从X轴的0刻度开始
		// 		show: false, //是否显示滑动条，不影响使用
		// 		type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
		// 		startValue: -1, // 从头开始。
		// 		endValue: 1,
		// 		interval: 0,
		// 	},
		// ],
		xAxis: {
			type: "category",
			data: xdata,
			color: "#fff",
			boundaryGap: ifboundaryGap,
			axisLabel: {
				// 让字体完全显示
				interval: interval,
				show: true,
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0.0)", //更改坐标轴刻度颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
		},
		yAxis: {
			name: unit,
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: padding,
			},
			type: "value",
			scale: true,
			color: "#082f60",
			// max: parseInt(data['max_y']) + 3, //设置最大值
			// min: 0, //最小值
			// splitNumber: 5, //11个刻度线，也L就是10等分
			// minInterval: 1, //y轴只要整数
			axisLabel: {
				show: true,
				showMinLabel: '', // 强制显示最小值标签  true false
				// showMaxLabel: true, // 强制显示最大值标签
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0)", // 刻度的颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: coordinateinecolor,
					width: 1,
					type: "solid",
				},
			},
		},
		series: [
			// 	{
			// 		name: "",
			// 		data: ydata[0],
			// 		type: "line",
			// 		smooth: true,
			// 		itemStyle: {
			// 			normal: {
			// 				color: "#14EAFC", //改变折线点的颜色
			// 				lineStyle: {
			// 					// 系列级个性化折线样式
			// 					width: 3, // 折线宽度
			// 					type: "solid", // 折线是实线
			// 					color: "#14EAFC", // 折线颜色
			// 				},
			// 				areaStyle: {
			// 					type: "default",
			// 					opacity: 0.1,
			// 				},
			// 			},
			// 		},
			// 		symbolSize: 5, //折线点的大小
			// 	},
			// 	{
			// 		name: "",
			// 		data: ydata[1],
			// 		type: "line",
			// 		smooth: true,
			// 		itemStyle: {
			// 			normal: {
			// 				color: "#FFB72C", //改变折线点的颜色
			// 				lineStyle: {
			// 					// 系列级个性化折线样式
			// 					width: 3, // 折线宽度
			// 					type: "solid", // 折线是实线
			// 					color: "#FFB72C", // 折线颜色
			// 				},
			// 				areaStyle: {
			// 					type: "default",
			// 					opacity: 0.1,
			// 				},
			// 			},
			// 		},
			// 		symbolSize: 0, //折线点的大小
			// 	},
			// 
		],
		render: function () {
			for (var i = 0; i < ydata.length; i++) {
				var item = ydata[i];
				var linecolor = linecolors[i] || "#FFB72C";
				option.series.push({
					name: ydataTitle[i] || '',
					data: item,
					type: "line",
					smooth: true,
					itemStyle: {
						normal: {
							color: linecolor, //改变折线点的颜色
							lineStyle: {
								// 系列级个性化折线样式
								width: 3, // 折线宽度
								type: "solid", // 折线是实线
								color: linecolor, // 折线颜色
							},
							areaStyle: {
								type: "default",
								opacity: areaStyleOpacity,
							},

						},
					},
					// markPoint: {						
					// 	label: {
					// 	 show: true,
					// 	 position: "top",
					// 	 distance: 7,
					// 	 offset: [1, 10],
					// 	 formatter: '{b}: {c}'
					//    },
					//    symbol: "circle",
					//    symbolSize: 10,
					//    symbolOffset: [0, 0],                          
					//    data: [ {type: 'max', name: 'MAX'},{type: 'min', name: 'MIN'}, ],  
					// },
					markPoint: markPoint,
					// areaStyle: {
					// 	normal: {
					// 		//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
					// 		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					// 			offset: 0,
					// 			color: 'rgba(0,255,255,0.6)'
					// 		}, {
					// 			offset: .34,
					// 			color: 'rgba(0,255,255,0.2)'
					// 		}, {
					// 			offset: 1,
					// 			color: 'rgba(0,255,255,0)'
					// 		}])
					// 
					// 	}
					// }, //区域颜色渐变
					symbolSize: 0, //折线点的大小
				});

			}
		}
	};
	option.render(ydata);
	if (yAxisMin != undefined) {
		option.yAxis.min = yAxisMin;
	}
	if (yAxisMax != undefined) {
		option.yAxis.max = yAxisMax;
	}
	if (yAxisMinInterval != undefined) {
		option.yAxis.minInterval = yAxisMinInterval;
	}
	if (nodataImg == true) {
		var nodata = nodata();
		if (nodata == false) {
			return nodata;
		}
	}

	function nodata() {
		var xdataFlage = false,
			ydataFlage = false;
		xdata.forEach(function (item) {
			if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
				xdataFlage = true;
			}
		})
		ydata.forEach(function (arr) {
			arr.forEach(function (item) {
				if (typeof item !== "undefined" && item !== null && item != "null" && item !== '') {
					ydataFlage = true;
				}
			})
		})
		if (xdataFlage == false || ydataFlage == false) {
			var dom = $("#" + elementId);
			// console.log(dom)
			// console.log(dom.find(".nodata").length)
			if (dom.find(".nodata").length == 0) {
				dom.html('<div class="nodata"><img src="../../../common/image/nodata.png" class="nodateimg"></div>');
			}
			return false;
		}
	}
	myChart.setOption(option);

	function r() {
		if (option.dataZoom[0].startValue < xdata.length - 1) {
			option.dataZoom[0].startValue += 1;
			option.dataZoom[0].endValue += 1;
		} else {
			option.dataZoom[0].startValue = 0;
			option.dataZoom[0].endValue = endValue + 1;
		}
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	if (interval != undefined) {
		option.xAxis.axisLabel.interval = interval;
	}
	if (isScroll) {
		option.dataZoom = [ //滑动条
				{
					xAxisIndex: 0, //这里是从X轴的0刻度开始
					show: false, //是否显示滑动条，不影响使用
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					startValue: -1, // 从头开始。
					endValue: endValue,
					interval: 0,
				}
			],
			setInterval(r, 1000);
		r();
	}


	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

// 比例柱状图
/*
	obj={
			"elementId":"main1",//容器id	[必填]				
			"xdata":["场馆", "学校", "园区", "医院"],//横坐标数据[必填]
			"ydata":[[2, 4, 6,8],[1, 3, 5,7],[1, 3, 5,9]],//纵坐标数据[必填]
			"ydataTitle":[]//提示框标题项
			"seriesColor":[],//图表颜色[非必填]
			"units":"℃",//单位[非必填]
			"showCount":true,//是否显示顶部数字 bool[非必填]
			"labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
			"lineColor":"rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
			// "dataZoom":{
			//  	"isScroll":true,//是否可以自动切换[非必填]
			//  	"endValue":0//显示个数，长度是当前数字+2个[非必填]
			//  },
			 "interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
			 "xAxisFontSize":10,//横坐标文字大小[非必填]
			 "barWidth":30,//图表宽度
			 "itemColor":['#1683FF','#00FBFC']
			 yAxisMin:0,y轴最小刻度
			 yAxisMinInterval:10,//y轴最小刻度间距
		}
*/
echarsComponent.getStackBarChars = function (obj) {
	// 基于准备好的dom，初始化echarts实例
	var defaultColor = 'rgba(0, 255, 255, 0.9)';
	var defaultStartColor = "rgb(72,212,150,1)";
	var defaultEndColor = "rgb(0,255,255,1)";
	var elementId = obj.elementId;
	// var dataTitle = obj.dataTitle;
	var itemColor = obj.itemColor;
	var xdata = obj.xdata == undefined ? [] : obj.xdata;
	var ydata = obj.ydata == undefined ? [] : obj.ydata;
	var ydataTitle = obj.ydataTitle == undefined ? [] : obj.ydataTitle;
	var seriesColor = obj.seriesColor == undefined ? [] : obj.seriesColor;
	var showCount = obj.showCount == undefined ? false : true;
	var labelColor = obj.labelColor == undefined ? echarsConfig.labelColor : obj.labelColor;
	var lineColor = obj.lineColor == undefined ? echarsConfig.lineColor : obj.lineColor;
	var dataZoom = obj.dataZoom || [];
	var provideNumber = obj.provideNumber || 4;
	var yAxisMin = obj.yAxisMin;
	var yAxisMax = obj.yAxisMax;
	var yAxisMinInterval = obj.yAxisMinInterval;
	// var isScroll = dataZoom.isScroll == undefined ? false : true;
	// var endValue = dataZoom.endValue == undefined ? 2 : dataZoom.endValue;
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	var interval = obj.interval;
	var barWidth = obj.barWidth == undefined ? 10 : obj.barWidth;
	var xAxisFontSize = obj.xAxisFontSize == undefined ? 12 : obj.xAxisFontSize; //横坐标字号
	var myChart = echarts.init(document.getElementById(elementId));
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					type: 'shadow',
					color: lineColor,
					opacity: '0.2'
				}
			},
			textStyle: {
				align: 'left'
			}
			// formatter:function(params){
			// 	// return "<div style='text-align:left;padding:3px;'>"+params.seriesName+"<br/>"+params.name.replace(/\s*/g,'')+"："+params.value+"</div>";
			// 	return "<div style='text-align:left;padding:3px;'>"+params.name.replace(/\s*/g,'')+":"+params.value+"</div>";
			// }
		},
		grid: grid,
		// legend: {
		// 	data: dataTitle,
		// 	left: 'right',
		// 	textStyle: {
		// 		color: "#fff",
		// 	},
		// },
		xAxis: {
			type: 'category',
			data: xdata,
			color: '#fff',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor,
					fontSize: xAxisFontSize,
					lineHeight: 12,
				},
				formatter: function (value) {
					var newParamsName = "";
					var paramsNameNumber = value.length;
					// var provideNumber = 4;
					var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
					if (paramsNameNumber > provideNumber) {
						for (var p = 0; p < rowNumber; p++) {
							var tempStr = "";
							var start = p * provideNumber;
							var end = start + provideNumber;
							if (p == rowNumber - 1) {
								tempStr = value.substring(start, paramsNameNumber);
							} else {
								tempStr = value.substring(start, end) + "\n";
							}
							newParamsName += tempStr;
						}
					} else {
						newParamsName = value;
					}
					return newParamsName
				},
				// interval: 0
			},
			axisTick: {
				show: false, //不显示刻度
				lineStyle: {
					color: lineColor //更改坐标轴刻度颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},

		},
		yAxis: {
			name: obj.units, //y轴单位
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: [0, 0, -15, -10]
			},
			type: 'value',
			min: 0,
			scale: true,
			minInterval: 1,
			boundaryGap: [0, 0.1],
			// min: 0,
			color: '#ccc',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor
				}
			},
			axisTick: {
				show: false,
				lineStyle: {
					color: lineColor // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: lineColor,
					width: 1,
					type: 'solid'
				}
			}
		},

		series: []
	};
	// function r() {
	// 	if (option.dataZoom[0].startValue < xdata.length - 1) {
	// 		option.dataZoom[0].startValue += 1;
	// 		option.dataZoom[0].endValue += 1;
	// 	} else {
	// 		option.dataZoom[0].startValue = 0;
	// 		option.dataZoom[0].endValue = endValue + 1;
	// 	}
	// 	// 使用刚指定的配置项和数据显示图表。
	// 	myChart.setOption(option);
	// }
	// if (isScroll) {
	// 	option.dataZoom = [ //滑动条
	// 			{
	// 				xAxisIndex: 0, //这里是从X轴的0刻度开始
	// 				show: false, //是否显示滑动条，不影响使用
	// 				type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
	// 				startValue: -1, // 从头开始。
	// 				endValue: endValue,
	// 				interval: 0,
	// 			}
	// 		],
	// 		setInterval(r, 3000);
	// 	r();
	// }
	if (interval != undefined) {
		option.xAxis.axisLabel.interval = interval;
	}
	if (yAxisMin != undefined) {
		option.yAxis.min = yAxisMin;
	}
	if (yAxisMax != undefined) {
		option.yAxis.max = yAxisMax;
	}
	if (yAxisMinInterval != undefined) {
		option.yAxis.minInterval = yAxisMinInterval;
	}
	for (var i = 0; i < ydata.length; i++) {
		var objItem = {
			name: ydataTitle[i], //dataTitle[i],
			data: ydata[i],
			type: 'bar',
			stack: 'non',
			barWidth: barWidth, //柱图宽度
			smooth: true,
			itemStyle: {
				normal: {
					color: itemColor[i], //改变柱图颜色
					// color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
					// 		offset: 0,
					// 		color: startColor,
					// 	},
					// 	{
					// 		offset: 1,
					// 		color: endColor,
					// 	},
					// ]),
					// label: {
					// 	show: showCount, //开启显示
					// 	position: 'top', //在上方显示
					// 	textStyle: { //数值样式
					// 		color: labelColor,
					// 		fontSize: 12
					// 	}
					// }
				},
			},
		}

		option.series.push(objItem);
	}
	// option[xAxis][0]['axisLabel'] = {
	//        //  interval: 'auto',

	//    }
	// 使用刚指定的配置项和数据显示图表。

	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

// 尖柱状图
/* obj = {
	"elementId":"item1",//容器id	[必填]
	xdata:["11","22","33","44","55","66","77"],//横坐标数据[必填]
	ydata:["11","22","33","44","55","33","22"],//横坐标数据[必填]
	"units":"℃",//单位[非必填]
	"showCountColor":'#fff',//顶部数字颜色[非必填]
	"labelColor":"#96D6FF",//横纵坐标文字颜色[非必填]
	"lineColor":"rgba(10,148,255,0.3)",//图表里面线颜色[非必填]
	"interval":0,//设置所有x轴标签间隔显示为0（所有都显示）[非必填]
	
	"xAxisFontSize":10,//横坐标文字大小[非必填]
	"barWidth":30,//图表宽度
	"offect0":'rgba(22,143,250,0.3)',//0处颜色
	"offect1":'rgba(22,143,250,0.3)',//1处颜色
}
 
 */
echarsComponent.getJianChar = function (obj) {
	// 基于准备好的dom，初始化echarts实例
	var elementId = obj.elementId;
	var xdata = obj.xdata == undefined ? [] : obj.xdata;
	var ydata = obj.ydata == undefined ? [] : obj.ydata;
	var units = obj.units
	var showCountColor = obj.showCountColor == undefined ? '#fff' : obj.showCountColor;
	var labelColor = obj.labelColor == undefined ? echarsConfig.labelColor : obj.labelColor;
	var lineColor = obj.lineColor == undefined ? echarsConfig.lineColor : obj.lineColor;
	var offect0 = obj.offect0 == undefined ? 'rgba(22,143,250,0.3)' : obj.offect0;
	var offect1 = obj.offect1 == undefined ? 'rgba(22,143,250,0.3)' : obj.offect1;
	var interval = obj.interval;
	var barWidth = obj.barWidth == undefined ? 100 : obj.barWidth;
	var xAxisFontSize = obj.xAxisFontSize == undefined ? 12 : obj.xAxisFontSize; //横坐标字号
	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		grid: {
			left: '3%',
			right: '3%',
			bottom: '5%',
			top: '10%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: lineColor
				}
			},
			textStyle: {
				align: 'left'
			}
		},
		axisPointer: {
			lineStyle: {
				type: 'shadow',
				color: lineColor,
				opacity: '0.2'
			}
		},
		xAxis: {
			type: 'category',
			data: xdata,
			color: '#fff',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor,
					fontSize: xAxisFontSize,
					lineHeight: 12,
				},
				formatter: function (value) {
					var newParamsName = "";
					var paramsNameNumber = value.length;
					var provideNumber = 7;
					var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
					if (paramsNameNumber > provideNumber) {
						for (var p = 0; p < rowNumber; p++) {
							var tempStr = "";
							var start = p * provideNumber;
							var end = start + provideNumber;
							if (p == rowNumber - 1) {
								tempStr = value.substring(start, paramsNameNumber);
							} else {
								tempStr = value.substring(start, end) + "\n";
							}
							newParamsName += tempStr;
						}
					} else {
						newParamsName = value;
					}
					return newParamsName
				},
				interval: interval
			},
			axisTick: {
				show: false, //不显示刻度
				lineStyle: {
					color: lineColor //更改坐标轴刻度颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},

		},
		yAxis: {
			name: units, //y轴单位
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: [0, 0, -15, -10]
			},
			type: 'value',
			scale: true,
			min: 0,
			color: '#ccc',
			axisLabel: {
				show: true,
				textStyle: {
					color: labelColor
				}
			},
			axisTick: {
				show: false,
				lineStyle: {
					color: lineColor // 刻度的颜色
				}
			},
			axisLine: {
				lineStyle: {
					color: lineColor //更改坐标轴颜色
				}
			},
			splitArea: {
				areaStyle: {
					color: 'rgba(37,248,255,0.2)'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: lineColor,
					width: 1,
					type: 'solid'
				}
			}
		},
		series: [{
			// name: 'hill',
			type: 'pictorialBar',
			barCategoryGap: '0%',
			barWidth: barWidth, //柱图宽度
			symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
			label: {
				show: true,
				position: 'top',
				distance: 5,
				color: showCountColor,
				fontWeight: 'bolder',
				fontSize: 12,
			},
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
								color: offect0 //  0%  处的颜色
							},
							{
								offset: 1,
								color: offect1 //  100%  处的颜色
							}
						],
						global: false //  缺省为  false
					}
				},
				emphasis: {
					opacity: 1
				}
			},
			data: ydata,
			z: 10
		}]
	};
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

//折线阴影图
/*
obj={
	"elementId":"main7",//容器id	[必填]
	 xdata:["11","22","33","44","55","66","77"],//横坐标数据[必填]
	 ydata:[[10,20,15,20,15,20,15],[14,10,1,10,1,10,1]],//纵坐标数据[必填]
	 linecolors:['#ccc','red'],//线颜色[非必填]
	 areaStyleOpacity:0.1,//区域颜色[非必填]
	 interval:0,//间隔[非必填]
	 "dataZoom":{
	 	"isScroll":true,//是否可以自动切换[非必填]
	 	"endValue":2//显示个数，长度是当前数字+2个[非必填]
	  },
	  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
	  "labelColor":'#a5eaff',//坐标轴文字颜色
	  "unit":"℃",//单位
	  "grid":{
		  left: '3%',
		  right: '4%',
		  bottom: '5%',
		  top: '25px',
	  }//边距[非必填]
	  yAxisMin:0,y轴最小刻度
	  yAxisMinInterval:10,//y轴最小刻度间距
	  "padding":[0, 0, -10, 20],
	  "offectTop":"rgba(255,0,0,1)",
	  "offectMiddle":"rgba(0,255,0,1)",
	  "offectBottom":"rgba(0,0,255,1)",
	  "boundaryGap":true,//是否横坐标标签靠中间显示（不超出左右坐标轴边界）
}
*/
echarsComponent.getLineShadow = function (obj) {
	var elementId = obj.elementId; //容器id	[必填]
	var xdata = obj.xdata || [];
	var ydata = obj.ydata || [];
	var ydataTitle = obj.ydataTitle == undefined ? [] : obj.ydataTitle;
	var linecolors = obj.linecolors || [];
	var areaStyleOpacity = obj.areaStyleOpacity || '0';
	var coordinateinecolor = obj.coordinateinecolor || echarsConfig.lineColor; //坐标轴颜色
	var labelColor = obj.labelColor || echarsConfig.labelColor; //坐标轴文字颜色
	var interval = obj.interval; //间隔
	var yAxisMin = obj.yAxisMin; //y轴最小值
	var yAxisMinInterval = obj.yAxisMinInterval; //y轴最小间距
	var dataZoom = obj.dataZoom || [];
	var isScroll = dataZoom.isScroll == undefined ? false : true;
	var endValue = dataZoom.endValue == undefined ? 2 : dataZoom.endValue;
	var unit = obj.unit || "";
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	var padding = obj.padding || [0, 0, -10, -10];
	var offectTop = obj.offectTop == undefined ? 'rgba(0,255,255,0.8)' : obj.offectTop;
	var offectMiddle = obj.offectMiddle == undefined ? 'rgba(0,255,255,0.4)' : obj.offectMiddle;
	var offectBottom = obj.offectBottom == undefined ? 'rgba(0,255,255,0)' : obj.offectBottom;
	var animation = obj.animation || true;
	var ifboundaryGap = obj.boundaryGap == undefined ? false : obj.boundaryGap;
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(elementId));
	// 指定图表的配置项和数据
	var option = {
		animation: animation, //控制当前的点击滑动时节点是否放大
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: coordinateinecolor
				}
			},
			textStyle: {
				align: 'left'
			}
		},
		grid: grid,
		// dataZoom: [
		// 	//滑动条
		// 	{
		// 		xAxisIndex: 0, //这里是从X轴的0刻度开始
		// 		show: false, //是否显示滑动条，不影响使用
		// 		type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
		// 		startValue: -1, // 从头开始。
		// 		endValue: 1,
		// 		interval: 0,
		// 	},
		// ],
		xAxis: {
			type: "category",
			data: xdata,
			color: "#fff",
			boundaryGap: ifboundaryGap,
			axisLabel: {
				// 让字体完全显示
				interval: interval,
				show: true,
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0.0)", //更改坐标轴刻度颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
		},
		yAxis: {
			name: unit,
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: padding
			},
			type: "value",
			scale: true,
			color: "#082f60",
			// max: parseInt(data['max_y']) + 3, //设置最大值
			// min: 0, //最小值
			// splitNumber: 11, //11个刻度线，也L就是10等分
			// minInterval: 1, //y轴只要整数
			axisLabel: {
				show: true,
				showMinLabel: true, // 强制显示最小值标签
				// showMaxLabel: true, // 强制显示最大值标签
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0)", // 刻度的颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: coordinateinecolor,
					width: 1,
					type: "solid",
				},
			},
		},
		series: [
			// 	{
			// 		name: "",
			// 		data: ydata[0],
			// 		type: "line",
			// 		smooth: true,
			// 		itemStyle: {
			// 			normal: {
			// 				color: "#14EAFC", //改变折线点的颜色
			// 				lineStyle: {
			// 					// 系列级个性化折线样式
			// 					width: 3, // 折线宽度
			// 					type: "solid", // 折线是实线
			// 					color: "#14EAFC", // 折线颜色
			// 				},
			// 				areaStyle: {
			// 					type: "default",
			// 					opacity: 0.1,
			// 				},
			// 			},
			// 		},
			// 		symbolSize: 5, //折线点的大小
			// 	},
			// 	{
			// 		name: "",
			// 		data: ydata[1],
			// 		type: "line",
			// 		smooth: true,
			// 		itemStyle: {
			// 			normal: {
			// 				color: "#FFB72C", //改变折线点的颜色
			// 				lineStyle: {
			// 					// 系列级个性化折线样式
			// 					width: 3, // 折线宽度
			// 					type: "solid", // 折线是实线
			// 					color: "#FFB72C", // 折线颜色
			// 				},
			// 				areaStyle: {
			// 					type: "default",
			// 					opacity: 0.1,
			// 				},
			// 			},
			// 		},
			// 		symbolSize: 0, //折线点的大小
			// 	},
			// 
		],
		render: function () {
			for (var i = 0; i < ydata.length; i++) {
				var item = ydata[i];
				var linecolor = linecolors[i] || "#FFB72C";
				option.series.push({
					name: ydataTitle[i],
					data: item,
					type: "line",
					smooth: true,
					itemStyle: {
						normal: {
							color: linecolor, //改变折线点的颜色
							lineStyle: {
								// 系列级个性化折线样式
								width: 3, // 折线宽度
								type: "solid", // 折线是实线
								color: linecolor, // 折线颜色
							},
							areaStyle: {
								type: "default",
								opacity: areaStyleOpacity,
							},

						},
					},
					areaStyle: {
						normal: {
							//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: offectTop
							}, {
								offset: .34,
								color: offectMiddle
							}, {
								offset: 1,
								color: offectBottom
							}])

						}
					}, //区域颜色渐变
					symbolSize: 0, //折线点的大小
				});

			}
		}
	};

	function r() {
		if (option.dataZoom[0].startValue < xdata.length - 1) {
			option.dataZoom[0].startValue += 1;
			option.dataZoom[0].endValue += 1;
		} else {
			option.dataZoom[0].startValue = 0;
			option.dataZoom[0].endValue = endValue + 1;
		}
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	if (interval != undefined) {
		option.xAxis.axisLabel.interval = interval;
	}
	if (yAxisMin != undefined) {
		option.yAxis.min = yAxisMin;
	}
	if (yAxisMinInterval != undefined) {
		option.yAxis.minInterval = yAxisMinInterval;
	}
	if (isScroll) {
		option.dataZoom = [ //滑动条
				{
					xAxisIndex: 0, //这里是从X轴的0刻度开始
					show: false, //是否显示滑动条，不影响使用
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					startValue: -1, // 从头开始。
					endValue: endValue,
					interval: 0,
				}
			],
			setInterval(r, 1000);
		r();
	}
	option.render(ydata);
	myChart.setOption(option);

	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

// 饼图
/* obj = {
	"elementId": "main8", //容器id	[必填]
	"data": [{
			value: 140,
			name: '硕士'
		},
		{
			value: 120,
			name: '博士'
		},
		{
			value: 340,
			name: '本科'
		}
	], //数据[必填]
	"color": ['#ff4444', '#0a94ff', '#18d992', '#f77f0b', '#0acbfb'], //圆环颜色[非必填]
	"radius": ['55%', '70%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小[非必填]
	"center": ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置[非必填]
	"animation":false,//是否关闭鼠标放大，false不关 true 关[非必填]
	"tooltip": {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},//提示标签
	"itemStyle": {
		normal: {
			label: {
				show: true,
				formatter: '{b} : {c} ({d}%)'
			},
			labelLine: {
				show: true
			}
		}
	}//线和文字
	grid:{
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}
	silent:false,
}
 */
echarsComponent.getPieChars = function (obj) {
	var elementId = obj.elementId; //容器id	[必填]
	var data = obj.data || [];
	var piecolor = obj.color == undefined ? ['#ff4444', '#0a94ff', '#18d992', '#f77f0b', '#0acbfb'] : obj.color;
	var pieradius = obj.radius == undefined ? ['55%', '70%'] : obj.radius;
	var piecenter = obj.center == undefined ? ['50%', '50%'] : obj.center;
	var animation = obj.animation == undefined ? true : obj.animation;
	var silent = obj.silent == undefined ? true : obj.silent;
	var tooltip = $.extend({
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	}, obj.tooltip || {});
	var itemStyle = $.extend({
		normal: {
			label: {
				show: true,
				formatter: '{b} : {c} ({d}%)'
			},
			labelLine: {
				show: true
			}
		}
	}, obj.itemStyle || {});
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		// title: {
		// 	text: '饼图',
		// 	textStyle: {
		// 		color: '#fff'
		// 	}
		// },
		tooltip: tooltip,
		color: piecolor,
		// calculable : true,
		series: [{
			name: '',
			type: 'pie',
			radius: pieradius, // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
			center: piecenter, // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置                                
			itemStyle: itemStyle,
			emphasis: {
				scale: false
			},
			hoverAnimation: true,
			// silent: silent,
			animation: animation,
			// data:[
			//     {value:140, name:'硕士'},
			//     {value:120, name:'博士'},
			//     {value:340, name:'本科'},
			//     {value:90, name:'其它'},
			//     {value:310, name:'专科'}
			// ]
			data: data
		}]
	};

	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}
// 仪表盘
/* 
	obj = {
		elementId:'main1',
		max: 220,
		min: 0,
		dashBoardcolor: [[0.3, '#67e0e3'],[0.7, '#37a2da'],[1, '#fd666d']],
		dashBoardWidth: 30,
		titleSize: 60,
		titleColor: '#ff0000',
		titleOffSet: [0,0],
		axisLabel:true,
		axisLabelSize: 20,
		detailShow:true,
		detailFormatter:'{value} kW·h',
		detailSize:16,
		detailOffset:[0,10],
		value:100,
		name:'vvv',
		detailColor:'#fff',
		grid:{}
	}
 */
echarsComponent.dashBoardEcharts = function (obj) {
	var elementId = obj.elementId
	var max = obj.max == undefined ? 100 : obj.max;
	var min = obj.min == undefined ? 0 : obj.min;
	var dashBoardcolor = obj.dashBoardcolor == undefined ? [
		[0.3, '#67e0e3'],
		[0.7, '#37a2da'],
		[1, '#fd666d']
	] : obj.dashBoardcolor;
	var dashBoardWidth = obj.dashBoardWidth == undefined ? 30 : obj.dashBoardWidth;
	var titleOffSet = obj.titleOffSet == undefined ? [0, -100] : obj.titleOffSet;
	var titleColor = obj.titleColor == undefined ? '#333' : obj.titleColor;
	var titleSize = obj.titleSize == undefined ? 30 : obj.titleSize;
	var axisLabel = obj.axisLabel == undefined ? false : obj.axisLabel;
	var axisLabelSize = obj.axisLabelSize == undefined ? 20 : obj.axisLabelSize;
	var value = obj.value == undefined ? 0 : obj.value;
	var name = obj.name == undefined ? 0 : obj.name;
	var detailColor = obj.detailColor == undefined ? '#fff' : obj.detailColor;
	var detailShow = obj.detailShow == undefined ? true : obj.detailShow;
	var detailFormatter = obj.detailFormatter == undefined ? '{value}' : obj.detailFormatter;
	var detailSize = obj.detailSize == undefined ? 12 : obj.detailSize;
	var detailOffset = obj.detailOffset == undefined ? [0, 10] : obj.detailOffset;
	var axisTick = obj.axisTick == undefined ? {
		show: false
	} : obj.axisTick;
	var pointer = obj.pointer == undefined ? {
		show: true
	} : obj.pointer;
	var center = obj.center == undefined ? ['50%', '50%'] : obj.center;
	var grid = $.extend({
		left: '3%',
		right: '4%',
		bottom: '5%',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	var myChart = echarts.init(document.getElementById(elementId),null,{devicePixelRatio: 2});
	var option = {
		series: [{
			type: 'gauge',
			max: max,
			min: min,
			// 颜色
			axisLine: {
				lineStyle: {
					width: dashBoardWidth,
					color: dashBoardcolor
				}
			},
			pointer: {
				itemStyle: {
					color: 'auto'
				}
			},
			center: center,
			// 小刻度
			axisTick: axisTick,
			// 大刻度
			splitLine: axisTick,
			// 刻度数值
			axisLabel: {
				show: axisLabel,
				color: 'auto',
				distance: 40,
				fontSize: axisLabelSize,
			},
			pointer: pointer,
			// 中间文字
			detail: {
				show: detailShow,
				valueAnimation: true,
				formatter: detailFormatter,
				color: detailColor,
				offsetCenter: detailOffset,
				textStyle: {
					fontSize: detailSize,
					fontWeight: '400'
				}
			},
			title: {
				// show:false,
				offsetCenter: titleOffSet,
				textStyle: {
					color: titleColor,
					fontSize: titleSize,
					fontWeight: '400'
				}
			},
			// 初始值
			grid: grid,
			data: [{
				value: value,
				name: name,
			}],
			startAngle: 220,
			endAngle: -40,
		}]
	}
	myChart.setOption(option);
	$(".hd-full-screen").click(function () {
		setTimeout(function () {
			myChart.resize();
		}, 10);
	});
	$(window).resize(function () {
		myChart.resize();
	});
}

// 曲线图混合柱状图
/* 
 obj = {
	 elementId:'main1',//容器
	 dataX:[1,2,3,4,5,6,7],//x轴数据
	 dataY:[[11,22,33,44,55,66,77],[16,22,27,47,65,55,84]],//y轴数据
	 color:['#ffff00','#00ffff'],//颜色
	 smooth:true,//平滑曲线
	 beyondColor:['#ff0000'],//超出颜色
	 isStandard:true,//是否开启超出标准值变色
	 standardLine:[16,22,27,47,65,55,84],//标准值
	 width:[10,3],//线宽，柱宽
	 seriesType:['bar','line'],//系列类型
	 animation:true,//动画
	 ydataTitle:['',''],//系列名称
	 coordinateinecolor:'#ff0000',//坐标轴颜色
	 labelColor:'#333',//坐标文字颜色
	 interval:1,//x轴标签间隔
	 yAxisMin:0,//y轴最小值
	 yAxisMinInterval:1,//y轴最小间隔
	 unit:'g',//y轴单位
	 padding:[],//y轴单位位置
	 grid:{
		 left: '20px',
		 right: '30px',
		 bottom: '0',
		 top: '25px',
		 containLabel: true,
	 },
	 ifboundaryGap:true//图表两侧留白
 }
 */
echarsComponent.lineMixBar = function(obj) {
	let elementId = obj.elementId; //容器
	let dataX = obj.dataX; //x轴数据
	let dataY = obj.dataY; //y轴数据
	let smooth = obj.smooth == undefined ? false : obj.smooth; //曲线平滑
	let beyondColor = obj.beyondColor == undefined ? [] : obj.beyondColor; //超出颜色
	let isStandard = obj.isStandard == undefined ? false : obj.isStandard; //开启标准曲线
	let standardLine = obj.standardLine == undefined ? [] : obj.standardLine; //标准曲线数据
	let width = obj.width == undefined ? [] : obj.width; //图形宽度
	let seriesType = obj.seriesType == undefined ? [] : obj.seriesType; //系列类型
	let animation = obj.animation == undefined ? true : obj.animation; //开启图表动画
	let ydataTitle = obj.ydataTitle == undefined ? [] : obj.ydataTitle; //系列名称
	let color = obj.color || []; //系列颜色
	let coordinateinecolor = obj.coordinateinecolor || echarsConfig.lineColor; //坐标轴颜色
	let labelColor = obj.labelColor || echarsConfig.labelColor; //坐标轴文字颜色
	let interval = obj.interval; //间隔
	let yAxisMin = obj.yAxisMin; //y轴最小值
	let yAxisMinInterval = obj.yAxisMinInterval; //y轴最小间距
	let unit = obj.unit || ""; //y轴单位
	let grid = $.extend({
		left: '20px',
		right: '30px',
		bottom: '0',
		top: '25px',
		containLabel: true,
	}, obj.grid || {});
	let padding = obj.padding || [0, 0, -10, -10];
	let ifboundaryGap = obj.boundaryGap == undefined ? true : obj.boundaryGap; //图标两侧留白

	var myChart = echarts.init(document.getElementById(elementId));
	var option = {
		animation: animation, //控制当前的点击滑动时节点是否放大
		tooltip: {
			trigger: 'axis',
			confine: true,
			axisPointer: {
				lineStyle: {
					color: coordinateinecolor
				}
			},
			textStyle: {
				align: 'left'
			}
		},
		grid: grid,
		xAxis: {
			type: "category",
			data: dataX,
			color: "#fff",
			boundaryGap: ifboundaryGap,
			axisLabel: {
				// 让字体完全显示
				interval: interval,
				show: true,
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0.0)", //更改坐标轴刻度颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
		},
		yAxis: {
			name: unit,
			nameTextStyle: { //y轴单位样式
				color: labelColor,
				padding: padding,
			},
			type: "value",
			scale: true,
			color: "#082f60",
			// max: parseInt(data['max_y']) + 3, //设置最大值
			// min: 0, //最小值
			// splitNumber: 5, //11个刻度线，也L就是10等分
			// minInterval: 1, //y轴只要整数
			axisLabel: {
				show: true,
				// showMinLabel: '', // 强制显示最小值标签  true false
				// showMaxLabel: true, // 强制显示最大值标签
				textStyle: {
					// color: "#a5eaff",
					color: labelColor
				},
				interval: 0,
				showMinLabel: true,
				showMaxLabel: true,
			},
			axisTick: {
				lineStyle: {
					color: "rgba(10,148,255,0)", // 刻度的颜色
				},
			},
			axisLine: {
				lineStyle: {
					color: coordinateinecolor, //更改坐标轴颜色
				},
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: coordinateinecolor,
					width: 1,
					type: "solid",
				},
			},
		},
		series: [],
	};
	if (interval != undefined) {
		option.xAxis.axisLabel.interval = interval;
	}
	if (yAxisMin != undefined) {
		option.yAxis.min = yAxisMin;
	}
	if (yAxisMinInterval != undefined) {
		option.yAxis.minInterval = yAxisMinInterval;
	}
	if (isStandard && standardLine.length == 0) {
		dataY.forEach((item, index) => {
			if (seriesType[index] == 'line') {
				standardLine = item;
			}
		})
	}
	dataY.forEach((item, index) => {
		if (seriesType[index]) {
			option.series.push({
				name: ydataTitle[index],
				type: seriesType[index] || 'line',
				data: item,
				smooth: smooth,
				itemStyle: {
					color: function(val) {
						let str = '';
						if (isStandard) {
							str = val.data <= standardLine[val.dataIndex] ?
								new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: color[index]['startColor']?color[index]['startColor']:color[index]},
									{ offset: 1, color: color[index]['endColor']?color[index]['endColor']:color[index]}
								]) :
								new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: beyondColor[0]['startColor']?beyondColor[0]['startColor']:beyondColor[0]},
									{ offset: 1, color: beyondColor[0]['endColor']?beyondColor[0]['endColor']:beyondColor[0]}
								]);
						} else {
							str = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: color[index]['startColor']?color[index]['startColor']:color[index]},
								{ offset: 1, color: color[index]['endColor']?color[index]['endColor']:color[index]}
							]);
						}
						return str || '#ff0000';
					},
				},
				lineStyle: {
					width: width[index] || 3, // 折线宽度
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{ offset: 0, color: color[index]['startColor']?color[index]['startColor']:color[index]},
						{ offset: 1, color: color[index]['endColor']?color[index]['endColor']:color[index]}
					]) || '#ffff00'
				},
				barWidth: width[index] || 10,
				symbolSize: 0, //折线点的大小
			})
		}
	});
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


