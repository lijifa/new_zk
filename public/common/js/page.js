var page = (function($){
	let pageTotal = null;//页码总数
	let pageBtnArr = [];//页码数组
	let _PARAMS = null;//全局参数
	let nowPageNum = 1;//当前页码
	let allowClick = true;//允许按钮点击
	function page(param){
		this.param = param;
		this.init();
	}
	
	page.prototype = {
		constructor:page,
		init:function(){
			this.param = $.extend({
				element:'',
				total:'',
				url:'',
				type:'get',
				pageNum:1,
				pageSize:20,
				unitId:'',
				classify:'',
				name:'',
				ajaxData:[],
				clickBack:null,
				callBack:null,
			},this.param);
			let that = this;
			_PARAMS = this;
			that.ajaxPage(_PARAMS);
			that.clickBtn(_PARAMS);
		},
		createPage:function(param,length){
			$(param.element).html('');
			if(param.total == 0){
				return;
			}
			let start = (param.pageNum - 1) * param.pageSize + 1;
			let end = start + length - 1;
			$(param.element).html(`
				<div class="pager">
					<div class="pagerInfo">第${start}到${end}条，共${param.total}条</div>
					<div class="pagerBtn">
						<ul></ul>
					</div>
				</div>
			`)
		},
		createBtn:function(that){
			$(that.param.element+' .pager .pagerBtn ul').html('');
			if(that.param.total == 0){
				return;
			}
			$(that.param.element+' .pager .pagerBtn ul').append(`
				<li class="prev"><</li>
			`)
			pageTotal = Math.ceil(that.param.total/that.param.pageSize);
			pageBtnArr = [];
			if(pageTotal < 8){
				for(let i = 1; i <= pageTotal; i++){
					pageBtnArr.push(`<li data-pageNum="${i}" class="${i == that.param.pageNum ? 'on' : ''} pageNum">${i}</li>`);
				}
			} else {
				if(that.param.pageNum <= 4){
					for(let i = 1; i <= 5; i++){
						pageBtnArr.push(`<li data-pageNum="${i}" class="${i == that.param.pageNum ? 'on' : ''} pageNum">${i}</li>`);
					}
					pageBtnArr.push(`<li class="omit">...</li>`);
					pageBtnArr.push(`<li data-pageNum="${pageTotal}" class="pageNum">${pageTotal}</li>`);
				} else if(pageTotal - that.param.pageNum <= 4){
					pageBtnArr.push(`<li data-pageNum="1" class="pageNum">1</li>`);
					pageBtnArr.push(`<li class="omit">...</li>`);
					for(let i = pageTotal - 5 ; i <= pageTotal; i++){
						pageBtnArr.push(`<li data-pageNum="${i}" class="${i == that.param.pageNum ? 'on' : ''} pageNum">${i}</li>`);
					}
				} else {
					pageBtnArr.push(`<li data-pageNum="1" class="pageNum">1</li>`);
					pageBtnArr.push(`<li class="omit">...</li>`);
					for(let i = that.param.pageNum - 2 ; i <= that.param.pageNum - 0 + 2; i++){
						pageBtnArr.push(`<li data-pageNum="${i}" class="${i == that.param.pageNum ? 'on' : ''} pageNum">${i}</li>`);
					}
					pageBtnArr.push(`<li class="omit">...</li>`);
					pageBtnArr.push(`<li data-pageNum="${pageTotal}" class="pageNum">${pageTotal}</li>`);
				}
			}
			pageBtnArr.forEach((item,index) => {
				$(that.param.element+' .pager .pagerBtn ul').append(item);
			})
			$(that.param.element+' .pager .pagerBtn ul').append(`
				<li class="next">></li>
			`)
		},
		clickBtn:function(that){
			$(that.param.element).on('click','.pager .pagerBtn .pageNum',function(){
				if(!allowClick){
					return;
				}
				let num = $(this).attr('data-pageNum');
				if(num == nowPageNum){
					return;
				}
				$(this).addClass('on').siblings('.pageNum').removeClass('on');
				nowPageNum = num;
				that.param.pageNum = nowPageNum;
				allowClick = false;
				if(that.param.clickBack && typeof that.param.clickBack == 'function'){
					that.param.clickBack();
				}
				that.ajaxPage(that);
			})
			$(that.param.element).on('mousedown mouseup','.pager .pagerBtn .prev',function(e){
				if(!allowClick){
					return;
				}
				if(nowPageNum == 1){
					return;
				}
				if(e.type == 'mousedown'){
					$(this).css({
						"background-color":'rgba(54, 153, 255, 0.2)'
					})
				} else if(e.type == 'mouseup'){
					$(this).css({
						"background-color":'rgba(54, 153, 255, 0)'
					})
					$(that.param.element+' .pager .pagerBtn .on').prev('.pageNum').addClass('on').siblings('.pageNum').removeClass('on');
					let num = $(that.param.element+' .pager .pagerBtn .on').attr('data-pageNum');
					nowPageNum = num;
					that.param.pageNum = nowPageNum;
					allowClick = false;
					if(that.param.clickBack && typeof that.param.clickBack == 'function'){
						that.param.clickBack();
					}
					that.ajaxPage(that);
				}
			})
			$(that.param.element).on('mousedown mouseup','.pager .pagerBtn .next',function(e){
				if(!allowClick){
					return;
				}
				if(nowPageNum == pageTotal){
					return;
				}
				if(e.type == 'mousedown'){
					$(this).css({
						"background-color":'rgba(54, 153, 255, 0.2)'
					})
				} else if(e.type == 'mouseup'){
					$(this).css({
						"background-color":'rgba(54, 153, 255, 0)'
					})
					$(that.param.element+' .pager .pagerBtn .on').next('.pageNum').addClass('on').siblings('.pageNum').removeClass('on');
					let num = $(that.param.element+' .pager .pagerBtn .on').attr('data-pageNum');
					nowPageNum = num;
					that.param.pageNum = nowPageNum;
					allowClick = false;
					if(that.param.clickBack && typeof that.param.clickBack == 'function'){
						that.param.clickBack();
					}
					that.ajaxPage(that);
				}
			})
		},
		ajaxPage:function(that){
			let obj = {};
			that.param.ajaxData.forEach((item,index) => {
				obj[item] = that.param[item];
				if(item == 'pageNum'){
					nowPageNum = obj[item];
				}
			})
			$.ajax({
				url:that.param.url,
				type:that.param.type,
				data:obj,
				success:function(data){
					if(that.param.callBack && typeof that.param.callBack == 'function'){
						that.param.callBack(data);
					}
					if(data.code == 0){
						that.param.total = data.total;
						that.createPage(that.param,data.rows.length);
						that.createBtn(that);
						// that.clickBtn(that);
						allowClick = true;
					}
				}
			})
		},
		filterData:function(obj){
			_PARAMS.param = $.extend(_PARAMS.param,obj);
			_PARAMS.ajaxPage(_PARAMS);
		}
	}
	return page;
})(jQuery)