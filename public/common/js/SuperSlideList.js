/* 
 * SuperSlide封装滚动列表组件
 * 依赖：jquery.js jquery.SuperSlide.2.1.3.js
 * author:zxw 2021-05-07
 * 
 * let params = {
 * 		selector:'.list',
 * 		title:['标题1','标题2','标题3'],
 * 		data:[
 * 			{name:'2011-11-11',state:'2011-11-11',china:'中国'},
 * 			{name:'2011-11-11',state:'2011-11-11',china:'中国'},
 * 			{name:'2011-11-11',state:'2011-11-11',china:'中国'},
 * 			{name:'2011-11-13',state:'<img src="../image/circle-red.png" class="SSImg"> 222',china:'中国'},
 * 		],
 * 		effect:'upLoop',
 * }
 * let super = new SuperSlideList(params);
 * 
 * */
var SuperSlideList = (function($) {
	let creatList = null;
	let flagGUN = true;
	function SuperSlideList(params) {
		this.params = params;
		this.init();
		createContainer(this.params);
		createTitle(this.params);
		createList(this.params);
		createActive(this.params);
		createHover(this.params);
		onResize(this.params);
	}
	//创建容器
	function createContainer(params) {
		$(params.selector).html(`
			<div class="SuperSlide SuperSlideColumn">
				<div class="SSTitle"></div>
				<div class="SSContainer">
					<ul class="SSInfoList"></ul>
				</div>
			</div>
		`)
	}
	//创建标题
	function createTitle(params) {
		if (params.title.length !== 0) {
			let num = 0;
			if ((typeof params.intervalColumn == 'boolean' && params.intervalColumn) || params
				.intervalColumn === '' || params.intervalColumn == 'auto') {
				params.intervalColumn = params.title.length;
			}
			params.title.forEach((item, index) => {
				$(params.selector + ' .SSTitle').append(`
					<div class="SSTitleItem ${createClassRowColumn(params.intervalColumn,'SSTitleItem',num)}">${item}</div>
				`)
				num = num < params.intervalColumn ? num + 1 : 0;
			})
		}
	}
	//创建列表
	function createList(params) {
		params.data.forEach((item, index) => {
			$(params.selector + ' .SSInfoList').append(`
				<li class="SSRow" data-illustrate="${item.illustrate?item.illustrate:index}">${eachObject(item,params)}</li>
			`)
		})
	}
	//遍历对象
	function eachObject(obj, params) {
		let str = '';
		let num = 0;
		if ((typeof params.intervalColumn == 'boolean' && params.intervalColumn) || params.intervalColumn ===
			'' || params.intervalColumn == 'auto') {
			params.intervalColumn = params.title.length;
		}
		if (params.linkKey.length == 0) {
			// for (let key in obj) {
			// 	str +=
			// 		`<div class="SSRowItem ${createClassRowColumn(params.intervalColumn,'SSRowItem',num)}">${obj[key]}</div>`;
			// 	num = num < params.intervalColumn ? num + 1 : 0;
			// }
			Object.keys(obj).forEach((item) => {
				str +=
					`<div class="SSRowItem ${createClassRowColumn(params.intervalColumn,'SSRowItem',num)}">${obj[item]}</div>`;
				num = num < params.intervalColumn ? num + 1 : 0;
			})
		} else {
			params.linkKey.forEach((item, index) => {
				str +=
					`<div class="SSRowItem ${createClassRowColumn(params.intervalColumn,'SSRowItem',num)}">${obj[item]}</div>`;
				num = num < params.intervalColumn ? num + 1 : 0;
			})
		}
		return str;
	}
	// 间隔行列类名
	function createClassRowColumn(flag, str, num) {
		let dom = '';
		if (flag != 0 && !isNaN(flag)) {
			dom = `${str}${num}`;
			return dom;
		} else {
			return '';
		}
	}
	//滚动
	function createActive(params) {
		//计算容器最大显示信息条数，向下取整。
		let height = $(params.selector).height();
		let titleHeight = $(params.selector + ' .SSTitle').height();
		let containerHeight = height - titleHeight;
		let itemHeight = $(params.selector + ' .SSRow').height();
		let vis = params.visible == '' ? Math.floor(containerHeight / itemHeight) : params.visible == 'auto' ?
			Math.floor(containerHeight / itemHeight) : params.visible;
		if (params.data.length >= vis) {
			createList(params);
		} else {
			flagGUN = false;
		}
		if (params.isActive) {
			let slideObject = {
				// titCell: ''
				mainCell: '.SSContainer .SSInfoList', //运行内容
				autoPlay: true, //自动运行
				autoPage:true,//自动分页
				effect: params.effect, //效果
				vis: vis, //可视数
				delayTime: params.delayTime,//效果速度
				interTime: params.speed, //运行速度
				easing: params.easing, //缓动效果
				scroll: params.scroll, //滚动条数
				startFun:function(e1,e2,e3,e4,e5,e6,e7,e8){
					if(params.startFun && typeof params.startFun == 'function'){
						params.startFun([e1,e2,e3,e4,e5,e6,e7,e8,flagGUN]);
					}
				},
				endFun:function(e1,e2,e3,e4,e5,e6,e7,e8){
					if(params.endFun && typeof params.endFun == 'function'){
						params.endFun([e1,e2,e3,e4,e5,e6,e7,e8,flagGUN]);
					}
				}
			}
			// 滚动效果
			switch (params.effect) {
				case 'leftLoop':
					slideObject.effect = 'leftLoop';
					slideObject.opp = false;
					break;
				case 'rightLoop':
					slideObject.effect = 'leftLoop';
					slideObject.opp = true;
					break;
				case 'upLoop':
					slideObject.effect = 'topLoop';
					slideObject.opp = false;
					break;
				case 'downLoop':
					slideObject.effect = 'topLoop';
					slideObject.opp = true;
					break;
				case 'leftMarquee':
					slideObject.effect = 'leftMarquee';
					slideObject.opp = false;
					break;
				case 'rightMarquee':
					slideObject.effect = 'leftMarquee';
					slideObject.opp = true;
					break;
				case 'upMarquee':
					slideObject.effect = 'topMarquee';
					slideObject.opp = false;
					break;
				case 'downMarquee':
					slideObject.effect = 'topMarquee';
					slideObject.opp = true;
					break;
				case 'left':
					slideObject.effect = 'leftMarquee';
					slideObject.opp = false;
					break;
				case 'right':
					slideObject.effect = 'leftMarquee';
					slideObject.opp = true;
					break;
				case 'up':
					slideObject.effect = 'topMarquee';
					slideObject.opp = false;
					break;
				case 'down':
					slideObject.effect = 'topMarquee';
					slideObject.opp = true;
					break;
				default:
					slideObject.effect = params.effect;
					slideObject.opp = false;
					break;
			}
			if(creatList && typeof creatList[0].destroy == 'function'){
				creatList[0].destroy();
			}
			creatList = $(params.selector + ' .SuperSlide').slide(slideObject);
		}
		let num = 0;
		if ((params.intervalRow && typeof params.intervalRow == 'boolean') || params.intervalRow === '' ||
			params.intervalRow == 'auto') {
			params.intervalRow = 1;
		}
		$(params.selector + ' .SSRow').addClass(function() {
			let strClass = `${createClassRowColumn(params.intervalRow,'SSRow',num)}`;
			num = num < params.intervalRow ? num + 1 : 0;
			return strClass;
		})
		if (params.loadComplete && typeof params.loadComplete == 'function') {
			params.loadComplete(true);
		}
	}
	//hover
	function createHover(params) {
		$(params.selector + ' .SSRow').hover(function(e) {
			if (params.hoverInCallBack && typeof params.hoverInCallBack == 'function') {
				params.hoverInCallBack(e);
			}
		}, function(e) {
			if (params.hoverOutCallBack && typeof params.hoverOutCallBack == 'function') {
				params.hoverOutCallBack(e);
			}
		})
	}
	// onResize
	function onResize(params) {
		resizeEnd(250, function() {
			creatList[0].destroy();
			createContainer(params);
			createTitle(params);
			createList(params);
			createActive(params);
			createHover(params);
		})
	}
	// resizeEnd
	function resizeEnd(delayTime = 200, Fn) {
		var rdate; //用于记录每次触发resize的时间
		var timer = null;
		$(window).resize(function() {
			rdate = new Date();
			if (timer === null) {
				timer = setTimeout(resizeEnd, delayTime);
			}
		});
		function resizeEnd() {
			//再等等~
			if (new Date() - rdate < delayTime) {
				setTimeout(resizeEnd, delayTime);
			} else {
				timer = null;
				//trigger 一个resizeend事件
				$(window).trigger("resizeend");
			}
		}
		//监听resizeend 
		$(window).on("resizeend", function(e) {
			if (typeof Fn == 'function') {
				Fn();
			} else {
				console.log(Fn + '不是方法');
			}
		});
	}
	SuperSlideList.prototype = {
		constructor: SuperSlideList,
		init: function() {
			this.params = $.extend({
				selector: '', //容器
				title: [], //标题
				data: [], //数据
				linkKey: [], //关联字段
				isActive: true, //是否滚动
				intervalRow: 0, //间隔行
				intervalColumn: 0, //间隔列
				visible: 'auto', //显示条数
				effect: 'topMarquee', //滚动效果
				speed: 50, //速度
				scroll:1,
				delayTime:500,
				easing:'swing',
				hoverInCallBack: null, //鼠标移入回调函数
				hoverOutCallBack: null, //鼠标移出回调函数
				loadComplete: null, //加载完成回调函数
				startFun:null,
				endFun:null,
			}, this.params)
		},
	};
	return SuperSlideList;
})(jQuery);
