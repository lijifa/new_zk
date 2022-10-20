var warnContent = (function($){
	function warnContent(param){
		this.param = param;
		this.init();
		// createContainer(this.param);
		// createListRoll(this.param);
		createList(this.param);
		initChange(this.param);
		mouseMove(this.param);
		closeSound(this.param);
	}
	// 创建容器
	function createContainer(param){
		$(param.selector).html(`
		<div class="warnContent">
			<div class="warnTitle"><img src="/common/image/warnIcon.png" >告警信息</div>
			<div class="sound" style="background-image: url(/common/image/${param.isSound?'soundOpen':'soundClose'}.png);"></div>
			<i class="layui-icon layui-icon-close colseContent"></i>
			<div class="mainBody">
				<div class="listContent scrollbar" id="_LIST_ALARM"></div>
				<div class="triangleIcon"></div>
				<div class="solution" id="_SOLUTION_TEXT">
					<div class="solutionTitle">
						建议解决方案：
					</div>
					<div class="solutionContent" id="solutionContent"></div>
				</div>
			</div>
		</div>
		`)
	}
	// 滚动列表
	function createListRoll(param){
		$(param.selector+' #_LIST_ALARM').html('');
		let listParam = {
			selector: param.selector+" #_LIST_ALARM",
			data:[],
			intervalColumn:param.intervalColumn,
			effect:"topLoop",
			speed:param.speed,
			easing:param.easing,
			delayTime:param.delayTime,
			scroll:param.scroll,
			visible:param.visible,
			linkKey:param.linkKey,
			endFun:function(e){
				let WTOP = $(param.selector+' #_LIST_ALARM .SSContainer').offset().top;
				let illustrate = encodeURIComponent(JSON.stringify([]));
				let top = 20;
				$(param.selector+' #_LIST_ALARM li').each((i,e) => {
					if($(e).offset().top == WTOP){
						$(e).addClass('BG').siblings().removeClass('BG');
						illustrate = $(param.selector+' #_LIST_ALARM li.BG').attr('data-illustrate');
					}
				})
				// let num = e[8] ? e[0] + 1 : e[0];
				// $(param.selector+' #_LIST_ALARM li').eq(num*param.scroll).addClass('BG').siblings().removeClass('BG');
				// let illustrate = $(param.selector+' #_LIST_ALARM li.BG').attr('data-illustrate');
				$(param.selector+' #solutionContent').html('');
				JSON.parse(decodeURIComponent(illustrate)).forEach((item,index) => {
					if(item != 'undefined' && item != 'null'){
						$(param.selector+' #solutionContent').append(`
						<p><span class="solutionIndex">${index+1}</span>、${item.alarmRuleSolution}</p>
						`)
					}
				})
				if($(param.selector+' .BG').length != 0){
					top = e[8] ? Math.abs($(param.selector+' .BG').offset().top - $(param.selector+' .mainBody').offset().top - 30) :
					Math.abs($(param.selector+' .BG').offset().top - $(param.selector+' .mainBody').offset().top + 20);
				}
				$(param.selector+' .triangleIcon').css({
					'top': top + 'px'
				})
			},
			hoverInCallBack:function(e){
				$(e.currentTarget).addClass('BG').siblings().removeClass('BG');
				let illustrate = $(e.currentTarget).attr('data-illustrate');
				$(param.selector+' #solutionContent').html('');
				JSON.parse(decodeURIComponent(illustrate)).forEach((item,index) => {
					if(item != 'undefined' && item != 'null'){
						$(param.selector+' #solutionContent').append(`
						<p><span class="solutionIndex">${index+1}</span>、${item.alarmRuleSolution}</p>
						`)
					}
				})
				$(param.selector+' .triangleIcon').css({
					'top':$(param.selector+' .BG').offset().top - $(param.selector+' .mainBody').offset().top + 20 + 'px'
				})
			}
		}
		param.data.forEach((item,index) => {
			listParam.data.push(item);
		})
		let list = new SuperSlideList(listParam);
	}
	// 创建列表
	function createList(param){
		$(param.selector+' #_LIST_ALARM').html(`
			<ul></ul>
		`);
		let str = '';
		param.data.forEach((item,index) => {
			let hang = '';
			Object.keys(item).forEach((e,i) => {
				if(e != 'illustrate'){
					hang += `
					<div class="warnItem warnItem${i}">${item[e]}</div>
					`
				}
			})
			str += `<li data-illustrate="${item.illustrate}" class="warnInfo warnInfo${index}">${hang}</li>`
		})
		$(param.selector+' #_LIST_ALARM>ul').html(str);
	}
	// 初始化选项
	function initChange(param){
		$(param.selector+' #_LIST_ALARM .warnInfo').eq(0).addClass('BG').siblings().removeClass('BG');
		let illustrate = $(param.selector+' #_LIST_ALARM .warnInfo').eq(0).attr('data-illustrate');
		$(param.selector+' #solutionContent').html('');
		if(JSON.parse(decodeURIComponent(illustrate)).length == 0){
			$(param.selector+' #solutionContent').html(`
				<p>暂无解决方案</p>
			`);
			return;
		}
		JSON.parse(decodeURIComponent(illustrate)).forEach((item,index) => {
			if(item != 'undefined' && item != 'null'){
				$(param.selector+' #solutionContent').append(`
				<p><span class="solutionIndex">${index+1}</span>、${item.alarmRuleSolution}</p>
				`)
			}
		})
	}
	// 鼠标移入移出行
	function mouseMove(param){
		$(param.selector+' #_LIST_ALARM .warnInfo').hover(function(e){
			$(this).addClass('BG').siblings().removeClass('BG');
			let illustrate = $(this).attr('data-illustrate');
			$(param.selector+' #solutionContent').html('');
			$(param.selector+' .triangleIcon').css({
				'top':$(param.selector+' .BG').offset().top - $(param.selector+' .mainBody').offset().top + 20 + 'px'
			})
			if(JSON.parse(decodeURIComponent(illustrate)).length == 0){
				$(param.selector+' #solutionContent').html(`
					<p>暂无解决方案</p>
				`);
				return;
			}
			JSON.parse(decodeURIComponent(illustrate)).forEach((item,index) => {
				if(item != 'undefined' && item != 'null'){
					$(param.selector+' #solutionContent').append(`
					<p><span class="solutionIndex">${index+1}</span>、${item.alarmRuleSolution}</p>
					`)
				}
			})
		},function(e){
			
		})
	}
	// 静音操作
	function closeSound(param){
		$(param.selector+' .sound').unbind('click');
		$(param.selector+' .sound').on('click',function(){
			let str = $(this).css('background-image');
			if(str.indexOf('Open') != -1){
				str = str.replace(/Open/,'Close');
				if(param.closeSound && typeof param.closeSound == 'function'){
					param.closeSound('Close');
				}
			} else {
				str = str.replace(/Close/,'Open');
				if(param.closeSound && typeof param.closeSound == 'function'){
					param.closeSound('Open');
				}
			}
			$(this).css({
				'background-image':str,
			})
		})
	}
	warnContent.prototype = {
		constructor:warnContent,
		init:function(){
			this.param = $.extend({
				selector:'',//容器
				data:[],//数据
				linkKey:[],//数据显示字段
				intervalColumn:5,//间隔列
				speed:4000,//滚动速度
				delayTime:500,
				scroll:1,
				visible:8,
				easing:'swing',
				isSound:true,//初始声音开关
				closeSound:null,//声音回调函数
			},this.param);
		},
		upData:function(data){
			this.param.data = data;
			creatListRoll(this.param);
		}
	}
	return warnContent;
})(jQuery);