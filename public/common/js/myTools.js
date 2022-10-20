	/*
	* 折线图组件
	* selector: 需要加折线图的容器id
	* param: {
	*	dataX:[],
	*	x_suffix: '',
	*	yUnit:'',
	*	smooth: 是否平滑,
	*	borderColor：背景网格颜色,
	*	fontColor：xy标度颜色,
	*	isSmooth: 是否平滑,
	*	interval: X轴数据间隔
	*	isRealTime: 是否实时,
	*	realTimes: 实时调研间隔1000,
	*	line_1:'',	//
	*		dataY：	   Y轴数据
	*		lineText： 线名称
	*		lineColor：线颜色
	*	line_2:''	//
	*		dataY：	   Y轴数据
	*		lineText： 线名称
	*		lineColor：线颜色
	*	grid:
	*		top: '24px',
	*		right: '20px',
	*		left: '25px',
	*		bottom: '24px'
	*/
	var HDline = (function ($) {
		function HDline(selector, param) {
			// 容器
			this.elementId = selector;
			// 参数
			this.param = param;
			// 处理后的参数
			this.option = param;
			this.init();
		}
		
		HDline.prototype = {
		
			constructor: HDline,
		
			init: function(){
				// 处理参数
				this.setParam();
			},
		
			setParam: function(){
				this.param = $.extend({
					"dataX": [],
					"x_suffix": '',
					"yUnit": '',
					"isSmooth": true,
					"borderColor": 'rgba(10, 148, 255, 0.2)',
					"fontColor": '#0A94FF',
					"interval": 2,
					"line_1": {
						"dataY": [],
						"lineText": '',
						"lineColor": '#FF8309'
					},
					"line_2": {
						"dataY": [],
						"lineText": '',
						"lineColor": '#0993FF'
					},
					"grid": {
						top: '24px',
						right: '20px',
						left: '25px',
						bottom: '24px'
					}
				}, this.param)

				// 处理字符串
				let _dataX = this.param.dataX,
					_line_1 = this.param.line_1,
					_line_2 = this.param.line_2;
				let newOption = this.param
				newOption['dataX'] = _dataX.length ? _dataX.split(",") : [],
				newOption['line_1']['dataY'] = _line_1 ? _line_1.dataY.split(",") : [],
				newOption['line_2']['dataY'] = _line_2 ? _line_2.dataY.split(",") : [];

				// 添加X轴后缀
				if (this.param.x_suffix) {
					newOption['dataX'].map((item, k)=> {
						newOption['dataX'][k] = item + this.param.x_suffix;
					})
				}

				var option = {
					tooltip: {
						trigger: 'axis'
					},
					grid: newOption.grid,
					xAxis: [{
						type: 'category',
						data: newOption.dataX,
						axisLine: {
							show: true,
							lineStyle: {
								color: newOption.borderColor
							}
						},
						axisLabel: {
							textStyle: {
								color: newOption.fontColor
							},
							interval: newOption.interval
						},
						axisTick: {       // 刻度线
							"show": false
						},
						// 两端对齐
						boundaryGap: false,
					}],
					yAxis: [{
						name: newOption.yUnit,
						scale: true,
						nameTextStyle:{
							color:"#0A94FF",
							fontSize:13,
							padding: [0, 0, -10, -10]
						},
						type: 'value',
						splitNumber: 4,
						splitLine: {
							lineStyle: {
								type: 'solid',
								color: newOption.borderColor
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: newOption.borderColor
							},
						},
						axisTick: {       // 刻度线
							"show": false
						},
						axisLabel: {
							textStyle: {
								color: newOption.fontColor
							}
						},
						// nameTextStyle: {
						//     color: borderColor
						// },
						splitArea: {
							show: false
						}
					}],
					series: [{
						// 去掉这线上的小圆点
						//symbol: 'none',
						name: newOption.line_1.lineText,
						type: 'line',
						data: newOption.line_1.dataY,
						lineStyle: {
							normal: {
								width: 3,
								// color: {
								// 	type: 'linear',
								// 	colorStops: [{
								// 		offset: 0,
								// 		color: '#FF8309' // 0% 处的颜色
								// 	}, {
								// 		offset: 1,
								// 		color: '#FBE945' // 100% 处的颜色
								// 	}],
								// 	globalCoord: false // 缺省为 false
								// },
								color: newOption.line_1.lineColor,
								// shadowColor: 'rgba(0, 255, 255, 0.3)',
								shadowBlur: 0,
								shadowOffsetY: 0
							}
						},
						itemStyle: {
							normal: {
								color: newOption.line_1.lineColor,
								//borderWidth: 10,
								/*shadowColor: 'rgba(72,216,191, 0.3)',
								shadowBlur: 100,*/
								//borderColor: "#A9F387"
							}
						},
						smooth: newOption.isSmooth
					},{
						// 去掉这线上的小圆点
						//symbol: 'none',
						name: newOption.line_2.lineText,
						type: 'line',
						data: newOption.line_2.dataY,
						lineStyle: {
							normal: {
								width: 3,
								color: newOption.line_2.lineColor,
								// color: {
								// 	type: 'linear',
								// 	colorStops: [{
								// 		offset: 0,
								// 		color: '#0993FF' // 0% 处的颜色
								// 	}, {
								// 		offset: 1,
								// 		color: '#19D1FF' // 100% 处的颜色
								// 	}],
								// 	globalCoord: false // 缺省为 false
								// },
								// shadowColor: 'rgba(0, 255, 255, 0.3)',
								shadowBlur: 0,
								shadowOffsetY: 0
							}
						},
						itemStyle: {
							normal: {
								color: newOption.line_2.lineColor,
								//borderWidth: 10,
								/*shadowColor: 'rgba(72,216,191, 0.3)',
								shadowBlur: 100,*/
								//borderColor: "#A9F387"
							}
						},
						smooth: newOption.isSmooth    // 平滑
					}]
				};
				
				this.option = option

				/* 此处需要注意this的指向，
					在setInterval回调函数中的this指向为window */
				// var that = this;  
				// this.timer = setInterval(function () {
				// 	that.x++;
				// 	if(that.x > that.wrapperW){
				// 		that.x = 0;
				// 	}
				// 	that.oWrapper.style.transform = 'translate('+ (-that.x) +'px)';
				// },this.containerW / this.speed);   // 将速度转化成定时器时间
			},
			createLine: function(){
				// 初始化图形
				this.chartLineInit = echarts.init(document.getElementById(this.elementId));
				this.chartLineInit.setOption(this.option);
			}
		};
		return HDline;
	})(jQuery);