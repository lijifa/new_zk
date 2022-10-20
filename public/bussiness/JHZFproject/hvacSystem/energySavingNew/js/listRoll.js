var listRoll = (function($) {
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
	}
	//空盒子
	function kong(selector, param) {
		var kongHeight = param.style.lineHeight*param.slide.vis-0//空图片高度
		$('#'+selector).html(`<div style="padding:0 0 0 10px;">
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
		$('#'+selector).html(`<div style="padding:0 0 0 10px;">
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
		var listHeight = lineHeight*param.slide.vis//>100? lineHeight*param.slide.vis:100//listout高度
		$('#'+selector+' '+'.gDlistOut').attr('style', `height:${listHeight}px;`)//滚动外盒高度
		var hangnum = 0
		for (var i = 0; i<param.list.length; i++) {
			var lienum = 0
			for (let key in param.list[i]) {
				if (key == 'automatically') {
					param.list[i][key] = Auto(param.list[i][key])
				} else {}
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
				} else {}
			}
			if (hangnum>param.hangLie.hangnum) {
				hangnum = 0
			}
			$('#'+selector+' '+'.gDlistIn').append(`<li class="gDhang${hangnum}">${itemList}</li>`)
			itemList = ''
			if (param.hangLie.hangflag){
				hangnum++
			} else {}
		}
		// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li'))
		for (var i = 0; i<$('#'+selector+' '+'.gDlistIn'+'>'+'li').length; i++){
			// console.log($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障'))
			if($('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).html().indexOf('故障') !== -1){
				$('#'+selector+' '+'.gDlistIn'+'>'+'li').eq(i).addClass('textRed')
			}
		}
		
	}
	//滚动函数
	function gun(selector, param) {
		jQuery('#'+selector+' '+'.gDlistOut').slide({
			mainCell:'.gDlistIn',
			autoPlay:param.slide.autoPlay,//自动播放
			effect:param.slide.effect,//效果
			vis:param.slide.vis,//可视数
			interTime:param.slide.interTime,//速度
			// delayTime:param.slide.interTime,
			// easing:'linear'
		});
		$('#'+selector+' '+'.gDlistIn').css({
			'height':'auto',
		})
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
			case ('0'):// 0 红色 停止
				obj.html = `<img class="gDimg" src="./image/circle-red.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;停止'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('1'):// 1 绿色 开启
				obj.html = `<img class="gDimg" src="./image/circle-green.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;开启'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('-1'):// -1 灰色
				obj.html = `<img class="gDimg" src="./image/circle-gray.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
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
				obj.html = `<img class="gDimg" src="./image/circle-red.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;故障'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('0'):// 1 绿色 开启
				obj.html = `<img class="gDimg" src="./image/circle-green.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
				obj.text = '&nbsp;正常'
				obj.display = param.style.iconText? 'inline-block':'none'
				break;
			case ('-1'):// -1 灰色
				obj.html = `<img class="gDimg" src="./image/circle-gray.png" style="height: ${iconSize}px;width: ${iconSize}px;">`
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
				slide:{
					autoPlay:true,//自动播放
					effect:"topMarquee",//效果
					vis:'5',//可视数
					interTime:'40',//速度
				},
				title: [],//列表标题
				list: [],//列表数据
				stateItem: [],//图标标志列
				changeFlag: [],//0 1互换标志数组
				style: {
					lineHeight:'40',// 行高
					titleHeight:'40',//标题高度
					titleSize:'16',//标题字体大小
					fontSize:'16',//字体大小
					iconSize:'16',//图标大小
					iconText:true,//图标文字
				},
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'2',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				}
			}, this.param)
		},
		// getList:function(selector, param){
		// 	var itemList = ''
		// 	var lineHeight = param.style.lineHeight//li高度
		// 	var hangnum = 0
		// 	$('#'+selector+' '+'.gDlistIn').html(``)
		// 	for (var i = 0; i<param.list.length; i++) {
		// 		var lienum = 0
		// 		for (let key in param.list[i]) {
		// 			if (lienum>param.hangLie.lienum) {
		// 				lienum = 0
		// 			}
		// 			if (key.indexOf('state') !== -1) {
		// 				var img = changeImg(param.list[i][key], param)
		// 				itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;">${img.html}
		// 							<div class="gDtext" style="display: ${img.display};">${img.text}</div></div>`
		// 			} else {
		// 				itemList += `<div class="gDhang_item${lienum}" style="height:${lineHeight}px;">${param.list[i][key]}</div>`
		// 			}
		// 			if (param.hangLie.lieflag){
		// 				lienum++
		// 			} else {}
		// 		}
		// 		if (hangnum>param.hangLie.hangnum) {
		// 			hangnum = 0
		// 		}
		// 		$('#'+selector+' '+'.gDlistIn').append(`<li class="gDhang${hangnum}">${itemList}</li>`)
		// 		itemList = ''
		// 		if (param.hangLie.hangflag){
		// 			hangnum++
		// 		} else {}
		// 	}
		// 	// console.log($('#'+selector+' '+'.gDlistIn').children()[0].outerHTML)
		// 	var liArr = []
		// 	liArr[0] = $('#'+selector+' '+'.gDlistIn').children()[param.list.length-1].outerHTML
		// 	for (var i = 0; i<param.slide.vis; i++){
		// 		liArr[i+1] = $('#'+selector+' '+'.gDlistIn').children()[i].outerHTML
		// 	}
		// 	$('#'+selector+' '+'.gDlistIn').prepend(liArr[0])
		// 	$('#'+selector+' '+'.gDlistIn'+' '+'li').eq(0).addClass('clone')
		// 	for (var i = 0; i<liArr.length; i++) {
		// 		var index = $('#'+selector+' '+'.gDlistIn'+' '+'li').length
		// 		$('#'+selector+' '+'.gDlistIn').append(liArr[i+1])
		// 		$('#'+selector+' '+'.gDlistIn'+' '+'li').eq(index-1).addClass('clone')
		// 	}
		// 	// gun(selector, param)
		// }
	};
	return listRoll;
})(jQuery);
