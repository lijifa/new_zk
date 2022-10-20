var animeCompontent = (function($) {
	let animeOpenId = {};
	let animeCloseId = {};
	$.fn.animeXY = function(options) {
		let opts = $.extend({
			id: "", //动画标识id
			handle: this, //控制按钮
			startEnd: [], // startEnd[0]收起位置 startEnd[1]展开位置
			direction: 'Horizontal', //动画方向 horizontal----水平方向   
			// Vertical----竖直方向

			// anime组件参数
			targets: [], //动画元素 按先后顺序进行
			delay: 100, //动画延时
			duration: 200, //执行动画时长
			isOpen: true, //是否展开菜单 false不展开 true展开
			// isOpen 等同于 autoplay:false,//自动播放动画
			begin: '', //动画开始回调函数
			complete: '', //动画完成回调函数
		}, options);

		initialization(opts);
		active(opts);
	}
	// 初始化菜单
	function initialization(param) {
		$(param.handle).css({
			"cursor": "pointer"
		})
		$(param.handle).attr('anime-handle', param.isOpen ? '1' : '0');
		if (param.isOpen) {
			menuOpen(param);
			animeOpenId[param.id].play();
		} else {
			menuClose(param);
			animeCloseId[param.id].play();
		}
	}
	// 菜单事件
	function active(param) {
		$(param.handle).on('click', function() {
			let flag = $(this).attr('anime-handle');
			if (flag == '1') {
				menuClose(param);
				animeCloseId[param.id].play();
			} else {
				menuOpen(param);
				animeOpenId[param.id].play();
			}
		})


	}

	// 菜单展开事件
	function menuOpen(param) {
		let obj = {
			targets: param.targets,
			// translateX: param.startEnd[1],
			delay: anime.stagger(param.delay),
			easing: 'easeOutExpo',
			duration: param.duration,
			autoplay: param.isOpen,
			update: function(e) {},
			begin: function(e) {
				$(param.handle).attr('anime-handle', '1');
				if (param.begin && typeof param.begin == 'function') {
					param.begin({
						id: param.id,
						state: 'open'
					});
				}
			},
			complete: function(e) {
				if (param.complete && typeof param.complete == 'function') {
					param.complete({
						id: param.id,
						state: 'open'
					});
				}
			}
		}
		param.direction == 'Vertical' ? obj.translateY = param.startEnd[1] : obj.translateX = param.startEnd[1];
		animeOpenId[param.id] = anime(obj);
	}
	// 菜单收起事件
	function menuClose(param) {
		let obj = {
			targets: param.targets,
			// translateX: param.startEnd[0],
			delay: anime.stagger(param.delay, {
				direction: 'reverse'
			}),
			easing: 'easeOutExpo',
			duration: param.duration,
			autoplay: param.isOpen,
			update: function(e) {},
			begin: function(e) {
				$(param.handle).attr('anime-handle', '0');
				if (param.begin && typeof param.begin == 'function') {
					param.begin({
						id: param.id,
						state: 'close'
					});
				}
			},
			complete: function(e) {
				if (param.complete && typeof param.complete == 'function') {
					param.complete({
						id: param.id,
						state: 'close'
					});
				}
			}
		}
		param.direction == 'Vertical' ? obj.translateY = param.startEnd[0] : obj.translateX = param.startEnd[0];
		animeCloseId[param.id] = anime(obj);
	}
	// 时间轴动画
	$.fn.timeLine = function(options) {
		let opts = $.extend({
			targets: '.params-inheritance-demo .el',
			delay: function(el, i) { return i * 200 },
			duration: 500,
			easing: 'easeOutExpo',
			direction: 'alternate',
		})
	}
	function timerLine(param){
		let obj = {
			targets: '.params-inheritance-demo .el',
			delay: function(el, i) { return i * 200 },
			duration: 500,
			easing: 'easeOutExpo',
			direction: 'alternate',
		}
		animeCloseId[param.id] = anime.timeline(obj);
	}
	
	// 数值滚动增加
	$.fn.animeNumber = function (options){
		let opts = $.extend({
			targets:this,
			innerHTML:[],
			easing: 'linear',
			round: 1
		},options);
		anime({
			targets: opts.targets,
			innerHTML: opts.innerHTML,
			easing: opts.easing,
			round: opts.round
		});
	}



	function animeCompontent(param) {

	}

	animeCompontent.prototype = {
		constructor: animeCompontent,
		init: function() {
			this.param = $.extend({

			}, this.param);
		}
	}
	return animeCompontent;

})(jQuery)
