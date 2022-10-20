/* 
 *水球图控件
 * 依赖：jquery.js echarts.js echarts-liquidfill.js 
 * author:zxw 2021-04-14
 * params:{
	 backgroundColor:'',//canvas画布背景色
	 radius:'100%',//水球图大小
	 center:['50%','50%'],//水球图位置
	 amplitude:'3%',//波浪振幅幅
	 waveLength:"50%",//波浪长短
	 shape:'container',//水球图外形形状
	 text:'',//显示文字内容
	 data:[0.6,0.5,0.4],//波浪大小高低1为满状态
	 borderDistance:0,//内边距
	 borderWidth:0,//边宽
	 borderColor:'transparent',//边框颜色
	 shapeBackgroundColor:'transparent',//水球图空白填充颜色
	 color:['rgba(0,100,255, 1)','rgba(9,136,234, 1)','rgba(4,187,252, 1)'],//波浪颜色
	 titleColor:'#fff',//文字颜色
	 textFontSize:{
	 	fontSize:16,
	 	fontWeight:400,
	 },//文字大小
	 unitFontSize:{
	 	fontSize:14,
	 	fontWeight:400,
	 },//单位大小
	 unit:'m',//单位
	 titleCenter:['center','center'],//文字位置
 }
 * 
 */
/* 
 *example
 * let waterTank = new waterTank('id',{
	 data:[0.6,0.5,0.4],
	 borderColor:'rgba(0,100,255, 1)',
	 borderDistance:10,
	 shape:'path://M421.24,236.29l52.99,30.55v61.1l-52.99,30.55l-52.99-30.55v-61.1L421.24,236.29z',
	 text:'1.5',
	 color:['rgba(0,100,255, 1)','rgba(9,136,234, 1)','rgba(4,187,252, 1)'],
	 unit:'m',
 })
 * 
*/

var waterTank = (function($){
	function waterTank(selector,params){
		this.elementID = selector;
		this.params = params;
		this.init();
		echartsLiquidfill(this.elementID,this.params);
	}
	function echartsLiquidfill(selector,params){
		option = {
			/* backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
				offset: 0,
				color: params.backgroundColor.start,
			}, {
				offset: 1,
				color: params.backgroundColor.end,
			}]), */
			backgroundColor:params.backgroundColor,
			title: {
				// text: (params.data[0] * 100).toFixed(0) + '{a|m}',
				text:`{textFontSize|${params.text}}{unitFontSize|${params.unit}}`,
				textStyle: {
					// fontSize: params.fontSize,
					// fontFamily: 'Microsoft Yahei',
					// fontWeight: 'normal',
					color: params.titleColor,
					rich: {
						textFontSize: params.textFontSize,
						unitFontSize: params.unitFontSize,
					}
				},
				x: params.titleCenter[0],
				y: params.titleCenter[1],
			},
			/* graphic: [{
				type: 'group',
				left: 'center',
				top: '60%',
				children: [{
					type: 'text',
					z: 100,
					left: '10',
					top: 'middle',
					style: {
						fill: '#333',
						text: '流量统计',
						font: '20px Microsoft YaHei'
					}
				}]
			}], */
			series: [
				{
				type: 'liquidFill',
				radius: params.radius,
				center: params.center,
				amplitude:params.amplitude,
				waveLength:params.waveLength,
				// shape:'path://M421.24,236.29l52.99,30.55v61.1l-52.99,30.55l-52.99-30.55v-61.1L421.24,236.29z',
				shape: params.shape,
				data: params.data,
				backgroundStyle: {
					color:params.shapeBackgroundColor,
					/* color: {
						type: 'linear',
						x: 1,
						y: 0,
						x2: 0.5,
						y2: 1,
						colorStops: [{
							offset: 1,
							color: params.shapeBackgroundColor.start,
						}, {
							offset: 0.5,
							color: params.shapeBackgroundColor.minddle,
						}, {
							offset: 0,
							color: params.shapeBackgroundColor.end,
						}],
						globalCoord: false
					}, */
				},
				outline: {
					borderDistance: params.borderDistance,
					itemStyle: {
						borderWidth: params.borderWidth,
						borderColor:params.borderColor,
						/* borderColor: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: params.borderColor.start,
							}, {
								offset: 0.5,
								color: params.borderColor.middle,
							}, {
								offset: 1,
								color: params.borderColor.end,
							}],
							globalCoord: false
						},
						shadowBlur: 0,
						shadowColor: '', */
					}
				},
				itemStyle:{
					shadowBlur:0,
					shadowColor:'rgba(0,0,0,0)'
				},
				color:params.color,
				/* color: [
				{
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 1,
						color: 'rgba(58, 71, 212, 0)'
					}, {
						offset: 0.5,
						color: 'rgba(31, 222, 225, .2)'
					}, {
						offset: 0,
						color: 'rgba(31, 222, 225, 1)'
					}],
					globalCoord: false
				}
				], */
				label: {
					normal: {
						formatter: '',
					}
				}
			}, 
			]
		};
		var myChart = echarts.init(document.getElementById(selector));
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
	
	waterTank.prototype = {
		constructor:waterTank,
		init: function(){
			this.params = $.extend({
				backgroundColor:'',//canvas背景色
				radius:'100%',//大小
				center:['50%','50%'],//位置
				amplitude:'3%',//波幅
				waveLength:"50%",//波长
				shape:'container',//形状
				text:'',//文字
				data:[0.6,0.5,0.4],//波浪大小
				borderDistance:0,//内边距
				borderWidth:0,//边宽
				borderColor:'transparent',//边框颜色
				shapeBackgroundColor:'transparent',
				color:['rgba(0,100,255, 1)','rgba(9,136,234, 1)','rgba(4,187,252, 1)'],//波浪颜色
				titleColor:'#fff',//文字颜色
				textFontSize:{
					fontSize:16,
					fontWeight:400,
				},//文字大小
				unitFontSize:{
					fontSize:14,
					fontWeight:400,
				},//单位大小
				unit:'m',//单位
				titleCenter:['center','center'],//文字位置
			},this.params)
		}
	};
	return waterTank;
})(jQuery)