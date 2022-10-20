/* 
 * 弹窗组件
 * author: zxy 2021-04-25
 * params:{
 *		selector:'',//弹窗id
 *		offsetLeft: 0,//偏移量
 * 		offsetTop: 0,//偏移量
 * 		hoverDom:'',//hover节点
 * 		fun:null,//回调函数
 * }
 * let pop = new popUps({
 *		selector:'.pop',
 *		offsetLeft:100,
 *		offsetTop:0,
 *		hoverDom:'.main',
 *		fun:function(e){
 *			$('.pop').html(e.num)
 *		}
 *	});
 * 
 * */



var popUps = (function($){
	function popUps(params){
		this.params = params;
		this.init();
		popUpsInit(this.params);
		hoverShowPopUps(this.params);
	}
	function popUpsInit(params){
		$(params.selector).css({
			'display':'block',
			'opacity':0,
			'z-index':-999,
		})
	}
	function hoverShowPopUps(params){
		let height = $(window).height();
		let width = $(window).width();
		// if(typeof params.hoverDom == 'string'){
		// 	params.hoverDom = [params.hoverDom];
		// }
		// params.hoverDom.forEach((item,index) => {
			$(params.hoverDom).on('mouseenter mouseleave',function(e){
				if(e.type == 'mouseenter'){
					$(params.selector).css({
						'display':'block',
						'opacity':1,
						'z-index':999,
					})
					let popHeight = $(params.selector).outerHeight();
					let popWidth = $(params.selector).outerWidth();
					let offset = $(this).offset();
					let left = offset.left + params.offsetLeft;
					let top = offset.top + params.offsetTop;
					$(params.selector).css({
						left:left + 'px',
						top:top + 'px',
					})
					let index = JSON.stringify($(this).data()) == '{}'?$(this).index():$(this).data();
					if(params.fun&&typeof params.fun == 'function'){
						params.fun(index);
					}
				} else if(e.type == 'mouseleave'){
					$(params.selector).css({
						'display':'block',
						'opacity':0,
						'z-index':-999,
					})
				}
			})
		// })
		
		$(params.selector).on('mouseenter mouseleave',function(e){
			if(e.type == 'mouseenter'){
				$(params.selector).css({
					'display':'block',
					'opacity':1,
					'z-index':999,
				})
			} else if(e.type == 'mouseleave'){
				$(params.selector).css({
					'display':'block',
					'opacity':0,
					'z-index':-999,
				})
			}
		})
	}
	popUps.prototype = {
		constructor:popUps,
		init:function(){
			this.params = $.extend({
				selector:'',//弹窗id
				offsetLeft: 0,//偏移量
				offsetTop: 0,//偏移量
				hoverDom:'',//hover节点
				fun:null,
			},this.params)
		},
	}
	return popUps;
})(jQuery)