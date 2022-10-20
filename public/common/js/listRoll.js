var listRoll = (function($) {
	var jqlist = null
	// 构建方法
	function listRoll(selector, param) {
		// 容器
		this.elementId = selector;
		// 参数
		// param.playTop = 0//初始top值
		// console.log(param)
		this.param = param;
		this.init();
		if (param.list.length == 0) {
			kong(this.elementId, this.param)//空图标
		} else {
			title(this.elementId, this.param)//列标题
			list(this.elementId, this.param)//列表
			gun(this.elementId, this.param)//滚动
			hover(this.elementId, this.param)//滚动和hover效果
		}
		// jqlist = jQuery('#'+selector+' '+'.gDlistOut').slide({
		// 	mainCell:'.gDlistIn',
		// 	autoPlay:this.param.slide.autoPlay,//自动播放
		// 	effect:this.param.slide.effect,//效果
		// 	vis:this.param.vis,//可视数
		// 	interTime:this.param.slide.interTime,//速度
		// 	// delayTime:param.slide.interTime,
		// 	// easing:'linear'
		// });
	}
	//空盒子
	function kong(selector, param) {
		var kongHeight = param.style.lineHeight*param.slide.vis-0//空图片高度
		$('#'+selector).html(`<div class="gDDiv">
								<div class="gDkong" style="height:${kongHeight}px;">
									<div class="imgKong"></div>
								</div>
							</div>`)
	}
	//列标题
	function title(selector, param){
		var titleSize = param.style.titleSize// 标题字体大小
		var fontSize = param.style.fontSize//字体大小
		var titleHeight = param.style.titleHeight//标题行高
		$('#'+selector).html(`<div class="gDDiv">
							<div class="gunDong" style="line-height:${titleHeight}px;height:${titleHeight}px;">
								<div class="gDitem"></div>
							</div>
							<div class="gDlistOut">
								<ul class="gDlistIn" style="font-size:${fontSize}px;"></ul>
							</div>
							</div>`)
		var lienum = 0
		for (var i = 0; i<param.title.length; i++) {
			if (lienum>param.hangLie.lienum) {
				lienum = 0
			}
			$('#'+selector+' '+'.gDitem').append(`<div class="gDlie_title${lienum}" style="font-size:${titleSize}px;height:${titleHeight}px;">${param.title[i]}</div>`)
			if (param.hangLie.lieflag){
				lienum++
			} else {}
		}
	}
	// 列表渲染
	function list(selector, param){
		var itemList = '' //列表内循环变量
		var lineHeight = param.style.lineHeight//li高度
		// var listHeight = lineHeight*param.vis//>100? lineHeight*param.slide.vis:100//listout高度
		// $('#'+selector+' '+'.gDlistOut').attr('style', `height:${listHeight}px;`)//滚动外盒高度
		var hangnum = 0
		for (var i = 0; i<param.list.length; i++) {
			var lienum = 0
			for (let key in param.list[i]) {
				if (key == 'automatically') {
					param.list[i][key] = Auto(param.list[i][key])
				}
				if (lienum>param.hangLie.lienum) {
					lienum = 0
				}
				if (param.stateItem.includes(key)) {
					if (param.changeFlag.includes(key)){
						var img = changeFaultImg(param.list[i][key], param)
						itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">
									<div class="gDtext">${img.html}</div><div class="gDtext" style="display:${img.display};">&nbsp;${img.text}</div>
									</div>`
					} else {
						var img = changeStateImg(param.list[i][key], param)
						itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">
									<div class="gDtext">${img.html}</div><div class="gDtext" style="display:${img.display};">&nbsp;${img.text}</div>
									</div>`
					}
				} else {
					itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">${param.list[i][key]}</div>`
				}
				if (param.hangLie.lieflag){
					lienum++
				}
			}
			if (hangnum>param.hangLie.hangnum) {
				hangnum = 0
			}
			$('#'+selector+' '+'.gDlistIn').append(`<li class="gDhang${hangnum}">${itemList}</li>`)
			itemList = ''
			if (param.hangLie.hangflag){
				hangnum++
			}
		}
		// console.log(param.list)
		// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li'))
		for (var i = 0; i<$('#'+selector+' '+'.gDlistIn'+'>'+'li').length; i++){
			// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障'))
			if($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障') !== -1 ||
				$('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('报警') !== -1)
				{
				$('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).addClass('textRed')
			}
		}
		// jqlist.destroy()
		// jqlist.reset()
	}
	//滚动函数
	function gun(selector, param) {
		$('#'+selector+' .gDlistOut').liMarquee(param.slide);
		var leng = $("#"+selector+" .gDlistOut .str_move.str_move_clone:eq(0) li")
		if (leng.length % 2 == 1){
			$("#"+selector+" .gDlistOut .str_move.str_move_clone:eq(0)").addClass('jiShu')
			$("#"+selector+" .gDlistOut .str_move.str_move_clone:eq(1)").addClass('jiShu')
		}
	}
	//滚动和hover
	function hover(selector, param) {
		//hover变色
		$('#'+selector+' '+'li').hover(function () {
			$(this).addClass('textHover')
			$(this).children().addClass('textHover')
		},function () {
			$(this).removeClass('textHover')
			$(this).children().removeClass('textHover')
		})
	}
	// state icon图标
	function changeStateImg(state, param){
		var iconSize= param.style.iconSize
		let obj = {}
		switch (state){
			case ('--'):
				obj.html = '--'
				obj.text = ''
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('0'):// 0 红色 停止
				obj.html = `<img class="gDimg" src="../../common/image/circle-red.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;停止'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('1'):// 1 绿色 开启
				obj.html = `<img class="gDimg" src="../../common/image/circle-green.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;开启'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('-1'):// -1 灰色
				obj.html = `<img class="gDimg" src="../../common/image/circle-gray.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;离线'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
		}
		return obj
	}
	// fault icon 图标
	function changeFaultImg(fault, param){
		var iconSize= param.style.iconSize
		let obj = {}
		switch (fault){
			case ('1'):// 0 红色 停止
				obj.html = `<img class="gDimg" src="../../common/image/circle-red.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;故障'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('0'):// 1 绿色 开启
				obj.html = `<img class="gDimg" src="../../common/image/circle-green.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;正常'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('-1'):// -1 灰色
				obj.html = `<img class="gDimg" src="../../common/image/circle-gray.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;离线'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
		}
		return obj
	}
	// 手自动
	function Auto(automatically){
		if(automatically == 0){
			automatically="自动";
		}
		else if(automatically == 1){
			automatically="手动";
		}else{
			automatically="--";
		}
		return automatically
	}
	listRoll.prototype = {
		constructor: listRoll,
		// 初始化方法
		init: function() {
			this.param = $.extend({
				vis:'5',//可视数[必填]
				slide:{
					direction: 'up',//控制滚动方向 up:上 down:下 left:左
					loop:-1,//循环次数，-1 为无限循环
					scrolldelay:0,//每次重复之前的延迟
					scrollamount: 20, //滚动速度 数值越小,滚动速度越慢

					circular: true, //是否无缝滚动 布尔值
					drag: false, //是否可以拖拽 布尔值
					runshort: false, //内容不足不滚动
					hoverstop: true, // 鼠标悬浮暂停
				},
				title: [],//列表标题
				list: [],//列表数据[必填]
				stateItem: [],//图标标志列
				changeFlag: [],//0 1互换标志数组
				style: {
					lineHeight:'30',// 行高
					titleHeight:'30',//标题高度
					titleSize:'14',//标题字体大小
					fontSize:'14',//字体大小
					iconSize:'16',//图标大小
					iconText:false,//图标文字
				},
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'1',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				}
			}, this.param)
		},
		
		// changelist:function(selector, param){
		// 	// console.log(this.param)
		// 	this.param.list = param.list
		// 	jqlist[0].destroy()
		// 	var itemList = '' //列表内循环变量
		// 	var lineHeight = this.param.style.lineHeight//li高度
		// 	// var listHeight = lineHeight*param.vis//>100? lineHeight*param.slide.vis:100//listout高度
		// 	// $('#'+selector+' '+'.gDlistOut').attr('style', `height:${listHeight}px;`)//滚动外盒高度
		// 	var hangnum = 0
		// 	$('#'+selector+' '+'.gDlistIn').html('')
		// 	for (var i = 0; i<this.param.list.length; i++) {
		// 		var lienum = 0
		// 		for (let key in this.param.list[i]) {
		// 			if (key == 'automatically') {
		// 				this.param.list[i][key] = Auto(this.param.list[i][key])
		// 			}
		// 			if (lienum>this.param.hangLie.lienum) {
		// 				lienum = 0
		// 			}
		// 			if (this.param.stateItem.includes(key)) {
		// 				if (this.param.changeFlag.includes(key)){
		// 					var img = changeFaultImg(this.param.list[i][key], this.param)
		// 					itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">
		// 								<div class="gDtext">${img.html}</div><div class="gDtext" style="display:${img.display};">&nbsp;${img.text}</div>
		// 								</div>`
		// 				} else {
		// 					var img = changeStateImg(this.param.list[i][key], this.param)
		// 					itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">
		// 								<div class="gDtext">${img.html}</div><div class="gDtext" style="display:${img.display};">&nbsp;${img.text}</div>
		// 								</div>`
		// 				}
		// 			} else {
		// 				itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;line-height:${lineHeight}px;">${this.param.list[i][key]}</div>`
		// 			}
		// 			if (param.hangLie.lieflag){
		// 				lienum++
		// 			}
		// 		}
		// 		if (hangnum>this.param.hangLie.hangnum) {
		// 			hangnum = 0
		// 		}
		// 		$('#'+selector+' '+'.gDlistIn').append(`<li class="gDhang${hangnum}">${itemList}</li>`)
		// 		itemList = ''
		// 		if (this.param.hangLie.hangflag){
		// 			hangnum++
		// 		}
		// 	}
		// 	// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li'))
		// 	for (var i = 0; i<$('#'+selector+' '+'.gDlistIn'+'>'+'li').length; i++){
		// 		// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障'))
		// 		if($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障') !== -1){
		// 			$('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).addClass('textRed')
		// 		}
		// 	}
		// 	var gDlistIn = $('.gDlistIn').parent().html()
		// 	$('#'+selector+' '+'.gDlistOut').html(gDlistIn)
		// 	// jqlist = jQuery('#'+selector+' '+'.gDlistOut').slide({
		// 	// 	mainCell:'.gDlistIn',
		// 	// 	autoPlay:this.param.slide.autoPlay,//自动播放
		// 	// 	effect:this.param.slide.effect,//效果
		// 	// 	vis:this.param.vis,//可视数
		// 	// 	interTime:this.param.slide.interTime,//速度
		// 	// 	// delayTime:param.slide.interTime,
		// 	// 	// easing:'linear'
		// 	// });
		// 	console.log('销毁完成')
		// }
	};
	return listRoll;
})(jQuery);
