/* 
 * 全屏警告蒙版插件
 * author：zxw 2021-04-29
 * params:{
 *		selector:'',//盒子节点
 *		ballR:[100,100],//球形直径
 *		radius:'100%',//圆角
 *		delay:0.5,//动画时间
 *		positionBall:['50%','50%'],//球形初始位置
 *		clickHandle:[],//变形控制器
 *		isOpen:true,//默认蒙层打开状态，关闭状态为球形
 *		isMove:true,//是否可移动，默认开
 *		callBackMove:null,//移动回调函数
 *		callBackClick:null,//点击回调函数
 * }
 * 
 * let mask = new ballAndMask({
 *		selector:'.fireAlarm',
 *		ballR:[20,20],
 *		delay:0.5,
 *		positionBall:['70%',8],
 *		clickHandle:['.shutUp','.hide'],
 *		isOpen:true,
 *		isMove:false,
 *		callBackClick:function(e){
 *			console.log(e);
 *		},
 *	})
 * 
 * 
 */
var ballAndMask = (function($){
	function ballAndMask(params){
		this.params = params
		this.init();
	}
	let positionStar = null;//用于比较移动先后位置
	let positionEnd = null;//用于比较移动先后位置
	let timerStart = null;
	let timerEnd = null;
	let timer = null;
	let intervalTimer = null;
	ballAndMask.prototype = {
		constructor:ballAndMask,
		init:function(){
			this.params = $.extend({
				selector:'',//盒子节点
				ballR:[100,100],//球形直径
				radius:'100%',//圆角
				delay:0.5,//动画时间
				positionBall:['50%','50%'],//球形初始位置
				clickHandle:[],//变形控制器
				isOpen:true,//默认蒙层打开状态，关闭状态为球形
				isMove:true,//是否可移动，默认开
				callBackMove:null,//移动回调函数
				callBackClick:null,//点击回调函数
			},this.params)
			let that = this;
			that.BallMaskInit();
			that.clickMask();
			if(this.params.isMove){
				that.ballMove();
			}
			that.timing();
		},
		// 防抖函数
		timing:function(){	
			if(window.matchMedia("(any-pointer: coarse)").matches) {	//触屏
				console.log("触摸屏");
				$(this.params.selector).on('touchstart touchend',function(e){
					if(e.type == 'touchstart'){
						timerStart = new Date().getTime();
						intervalTimer = timerStart - timerEnd;
					} else if(e.type == 'touchend'){
						timerEnd = new Date().getTime();
						timer = timerEnd - timerStart;
					}
				})
			}else{
				$(this.params.selector).on('mousedown',function(e){
					if(e.type == "mousedown"){
						timerStart = new Date().getTime();
						intervalTimer = timerStart - timerEnd;
					}
				})
				$(this.params.selector).on('mouseup',function(e){
					if(e.type == "mouseup"){
						timerEnd = new Date().getTime();
						timer = timerEnd - timerStart;
					}
				})
			}
		},
		// 初始化数据
		BallMaskInit:function(){
			let ballR = this.params.ballR;
			let radius = this.params.radius;
			let left = this.params.positionBall[0], top = this.params.positionBall[1];
			positionStar = this.params.positionBall;
			positionEnd = this.params.positionBall;
			if(this.params.isOpen){
				$(this.params.selector).addClass('Mask');
				$(this.params.selector).css({
					'width':'100%',
					'height':'100%',
					'border-radius':'0%',
					"left":'0%',
					"top":'0%',
					// "transform": "translate(-50%,-50%)",
					'transition': 'all ease 0s',
				})
			} else {
				$(this.params.selector).addClass('Ball');
				$(this.params.selector).css({
					'width':ballR[0],
					'height':ballR[1],
					"left":left,
					"top":top,
					// "transform": "translate(-50%,-50%)",
					'border-radius':radius,
					'transition': 'all ease 0s',
				})
			}
		},
		//点击变形控制器 改变形状
		clickMask: function(){
			let flag = this.params.isOpen? true : false;
			let ballR = this.params.ballR;
			let delay = this.params.delay;
			let radius = this.params.radius;
			let that = this;
			this.params.clickHandle.forEach((item) => {
				if(item == that.params.selector){
					// 双击蒙层
					$(document).on('click',item,function(e){
						if(!isNaN(intervalTimer) && intervalTimer < 500){
							return;
						}
						if(timer > 200 || timer < 20){
							return;
						}
						if($(e.target).attr('class') == undefined){
							return;
						}
						if($(e.target).attr('class').indexOf(that.params.selector.substring(1)) == -1){
							return;
						}
						let left = that.params.positionBall[0], top = that.params.positionBall[1];
						if(flag){
							/* isOpen 为true时 点击变为球形 */
							$(that.params.selector).css({
								'width':ballR[0],
								'height':ballR[1],
								"left":left,
								"top":top,
								'border-radius':radius,
								'transition': 'all ease ' + delay + 's',
							})
							$(that.params.selector).addClass('Ball').removeClass('Mask');
						} else {
							/* isOpen 为false时 点击铺满全屏 */
							$(that.params.selector).css({
								'width':'100%',
								'height':'100%',
								"left":'0%',
								"top":'0%',
								'border-radius':'0%',
								'transition': 'all ease ' + delay + 's',
							})
							$(that.params.selector).removeClass('Ball').addClass('Mask');
						}
						// if($(that.param.selector).hasClass('Ball')){
						// 	flag = false;
						// } else {
						// 	flag = true;
						// }
						flag = !flag;
						if(that.params.callBackClick && typeof that.params.callBackClick == 'function'){
							that.params.callBackClick(flag);
						}
					})
				} else {
					//双击变形器
					$(document).on('click',item,function(e){
						if(!isNaN(intervalTimer) &&intervalTimer < 500){
							return;
						}
						if(timer > 200 || timer < 20){
							return;
						}
						let left = that.params.positionBall[0], top = that.params.positionBall[1];
						if(flag){
							/* isOpen 为true时 点击变为球形 */
							$(that.params.selector).css({
								'width':ballR[0],
								'height':ballR[1],
								"left":left,
								"top":top,
								'border-radius':radius,
								'transition': 'all ease ' + delay + 's',
							})
							$(that.params.selector).addClass('Ball').removeClass('Mask');
						} else {
							/* isOpen 为false时 点击铺满全屏 */
							$(that.params.selector).css({
								'width':'100%',
								'height':'100%',
								"left":'0%',
								"top":'0%',
								'border-radius':'0%',
								'transition': 'all ease ' + delay + 's',
							})
							$(that.params.selector).removeClass('Ball').addClass('Mask');
						}
						flag = !flag;
						if(that.params.callBackClick && typeof that.params.callBackClick == 'function'){
							that.params.callBackClick(flag);
						}
					})
				}
			})
		},
		// 球形移动
		ballMove: function(){
			let W = $(window).width(), H = $(window).height();
			let mouseX = 0, mouseY = 0, divX = 0, divY = 0;
			let that = this;
			$(window).on('resize',function(){
				W = $(window).width();
				H = $(window).height();
				let left = $(that.params.selector).offset().left,
					top  = $(that.params.selector).offset().top;
				let w = $(that.params.selector).width(),
					h = $(that.params.selector).height();
				let BallLeft = 0,BallTop = 0;
				if(left >= W - w){
					BallLeft = W - w;
				} else {
					BallLeft = left;
				}
				if(top >= H - h){
					BallTop = H - h;
				} else {
					BallTop = top;
				}
				$('.Ball').css({
					"left":BallLeft,
					"top":BallTop,
					"transition":"none",
				})
			})
			$(this.params.selector).mousedown(function(e){
				let w = $(e.currentTarget).width(),h = $(e.currentTarget).height();
				divX = e.offsetX; divY = e.offsetY;
				$('body').append(`
				<div class="moveMask" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:1099;"></div>
				`)
				$(document).mousemove(function(e){
					mouseX = e.clientX; mouseY = e.clientY;
					let BallLeft = mouseX - divX,BallTop = mouseY - divY;
					if(BallLeft<0){
						BallLeft = 0;
					} else if(BallLeft>W-w){
						BallLeft = W-w;
					}
					if(BallTop<0){
						BallTop = 0;
					} else if(BallTop>H-h){
						BallTop = H-h;
					}
					$('.Ball').css({
						"left":BallLeft,
						"top":BallTop,
						"transition":"none",
					})
					// 更新球形位置
					if($(that.params.selector).hasClass('Ball')){
						that.params.positionBall = [mouseX - divX,mouseY - divY];
						positionEnd = that.params.positionBall;
					}
				})
			})
			$(document).mouseup(function(e){
				$(document).unbind('mousemove');
				$('.moveMask').remove();
				if(that.params.callBackMove && typeof that.params.callBackMove == 'function'){
					let flag = 'list';
					if(JSON.stringify(positionStar) !== JSON.stringify(positionEnd)){
						that.params.callBackMove(flag);
					}
				}
				positionStar = positionEnd;
			})


			$(this.params.selector).on('touchstart',function(e){
				let w = $(e.currentTarget).width(),h = $(e.currentTarget).height();
				divX = e.targetTouches[0].clientX; divY = e.targetTouches[0].clientY;
				$('body').append(`
				 <div class="moveMask" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:1099;"></div>
				`)
				$(document).on('touchmove',function(e){
					mouseX = e.targetTouches[0].clientX-50; mouseY = e.targetTouches[0].clientY-50;
					let BallLeft = mouseX,BallTop = mouseY;
					if(BallLeft<0){
						BallLeft = 0;
					} else if(BallLeft>W-w){
						BallLeft = W-w;
					}
					if(BallTop<0){
						BallTop = 0;
					} else if(BallTop>H-h){
						BallTop = H-h;
					}
					$('.Ball').css({
						"left":BallLeft,
						"top":BallTop,
						"transition":"none",
					})
					// 更新球形位置
					if($(that.params.selector).hasClass('Ball')){
						that.params.positionBall = [mouseX ,mouseY];
						positionEnd = that.params.positionBall;
					}
				})
			})
			$(document).on("touchend",function(e){
				$(document).off('touchmove');
				$('.moveMask').remove();
				if(that.params.callBackMove && typeof that.params.callBackMove == 'function'){
					let flag = 'list';
					if(JSON.stringify(positionStar) !== JSON.stringify(positionEnd)){
						that.params.callBackMove(flag);
					}
				}
				positionStar = positionEnd;
			})
		},
		
	};
	
	return ballAndMask;
})(jQuery)