var waterLevel = (function($) {
	function waterLevel(selector, param) {
		// 容器id
		this.elementId = selector;
		//参数
		this.param = param;
		// console.log(this.param);
		this.param.datay = this.param.datay/this.param.deep
		this.init()
		demoCanvas(this.elementId, this.param)//水型图
		border(this.elementId, this.param)//边框 刻度
		size(this.elementId, this.param)//适应窗口
	}
	// 水波图
	function demoCanvas(selector, param) {
		var name = selector + 'Canvas'
		$('#' + selector).html(
			`<div class="waterBox">
				<div class="waterBoxborder" style="width:${param.style.width};height:${param.style.height};">
					<div id="${name}" style="width:100%;height:100%;padding:0 10px 10px;"></div>
				</div>
			</div>`)
		var myChart = echarts.init(document.getElementById(`${name}`));
		var option = {
			graphic:[{
				type: 'group',
				left: 'center',
				top: '60%',
				children: [{
					type: 'text',
					z: 100,
					left: '10',
					top: 'middle',
					style: {
						fill: '#19d1ff',
						//text: '水位统计',
						font: '20px Microsoft YaHei'
					}
				}]
			}],
			series:[{
				type: 'liquidFill',
				radius: '100%',
				waveAnimation: true,//波浪静止关
				animationDuration: 1000,//上升时间
				animationDurationUpdate: 1000,
				waveLength: '80%',//波长
				amplitude: 10,//振幅
				center: ['50%', '50%'],
				shape: 'container',
				data: [{
					value: param.datay,
					itemStyle: {
						normal: {
							// color:'#3a47d4',
						},
					}}, {
					value: param.datay,
					itemStyle: {
						normal: {
							// color:'#1fdee1',
						},
					}}, {
					value: param.datay,
					itemStyle: {
						normal: {
							// color:'#1fdee1'
						},
					}},{
					value: param.datay,
					itemStyle: {
						normal: {
							// color:'#1fdee1',
							// opacity: .5,
							// color: new echarts.graphic.LinearGradient(//渐变色
							// 	0, 0, 0, 1,
							// 	// [
							// 	// 	{offset: 1, color:'rgba(58, 71, 212, 0)'},
							// 	// 	{offset: 0.5, color:'rgba(31, 222, 225, .2)'},
							// 	// 	{offset: 0, color:'rgba(31, 222, 225, 1)'},	
							// 	// ],
							// 	[{
							// 		offset:0,
							// 		color:'#3a47d4',
							// 		opacity: 0,
							// 	}, {
							// 		offset:0.5,
							// 		color:'#1fdee1',
							// 		opacity: 0.2
							// 	}, {
							// 		offset:1,
							// 		color:'#1fdeff',
							// 		opacity: 1
							// 	}],
							// )
						},
					}}],
				// color:['#1fdeff'],
				label:{
					normal:{
						formatter:"",//水球上显示文字，可以设置任意文字
						// show: false,
						// textStyle: {
						// 	color:'#ff0000',
						// 	fontSize: '22',
						// 	fontFamily:'serif',
						// 	fontWeight: '100'
						// }
					}
				},
				backgroundStyle: {
					color:'rgba(5,6,8,0.8)',
				},
				// itemStyle: {
				// 	normal: {
				// 		color: new echarts.graphic.LinearGradient(//渐变色
				// 			0, 0, 0, 1,
				// 			// [
				// 			// 	{offset: 1, color:'rgba(58, 71, 212, 0)'},
				// 			// 	{offset: 0.5, color:'rgba(31, 222, 225, .2)'},
				// 			// 	{offset: 0, color:'rgba(31, 222, 225, 1)'},	
				// 			// ],
				// 			[{
				// 				offset:0,
				// 				color:'#3a47d4',
				// 				opacity: 0,
				// 			}, {
				// 				offset:0.5,
				// 				color:'#1fdee1',
				// 				opacity: 0.2
				// 			}, {
				// 				offset:1,
				// 				color:'#1fdeff',
				// 				opacity: 1
				// 			}],
				// 		)
				// 	},
				// },
				outline: {
					show: false//外边框
				},
			}],
		}
		myChart.setOption(option);
	}
	// 四边数字
	function border(selector, param) {
		var name = selector + 'Canvas'
		for (let key in param.axisShow){
			if (param.axisShow[key].data !== undefined){
				// console.log(space)
				param.axisShow[key].data.forEach((item, index)=>{
					if ((typeof item) == 'string'){
						var space = 100 / (param.axisShow[key].data.length-1)
						var posi1 = space*index
					} else {
						var space = 100 / param.axisShow[key].data.reduce(maxVal)
						var posi1 = space*item
					}
					var posi2 = (key == 'left' || key == 'right') ? 'bottom' : 'left'
					$(`#${name}>div`).append(`<div class="${key}Date" 
					style="${posi2}:${posi1}%">${item}${item == 0? '':param.axisShow[key].unit}</div>`)
					$(`#${name}>div`).css('overflow','visible')
				})
			}
		}
	}
	// 随窗口变动
	function size(selector, param){
		$(window).on('resize', function(){
			demoCanvas(selector, param)
			border(selector, param)
		})
	}
	// 最大值
	function maxVal(a, b) {
		return b>a? b:a
	}
	waterLevel.prototype = {
		constructor: waterLevel,
		// 初始化方法
		init: function() {
			this.param = $.extend({
				style:{
					width:'200px',//图形宽
					height:'200px'//图形高
				},
				deep:'',//最大值
				datay:0,
				axisShow:{
					left:{
						data:[0,1,2,3,4],
						unit:'m'
					},
				},
			}, this.param)
		},
	}
	return waterLevel
})(jQuery)
// new waterLevel()