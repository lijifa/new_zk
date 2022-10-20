	/*
	* 侧滑菜单控件
	* author: ljf 2021-04-16
	* param: {
    *   direction:      菜单方向【up/down/left(默认的)/right】
	*   menuBtn:        菜单按钮【容器节点（id/class）】
	*   menuBox:        菜单内容容器【容器节点（id/class）】
	* 	menuSetPosition:菜单收起展开位置【默认0,盒子宽高】
	* 	btnSetposition:	按钮收起展开位置 【默认0,盒子宽高】
	* 
	* 	isOpen:         默认菜单是否展开【true/false(默认的收起)】
	* 	btnFollow:      菜单按钮是否跟随【true(默认的)/false】【未完。。。】
	* 
	* 	delay:          菜单滑动过渡效果的时间【0.5s】
	* 	isClickBgClose: 是否允许点击背景关闭【true(默认的)/false】【未完。。。】
	* 	bgMask:         是否蒙版【true(默认的)/false】
	* 	bgDrop:			毛玻璃效果【默认0】
    * 	callBackFun:    菜单回调【function/''】
                        回调参数：true  - 菜单打开
                                 false - 菜单关闭
    * }
    */

   /*
    * example
    *   let leftMenu = new SlideMenu({
    *           "menuBtn": '.btnLeft',
    *           "menuBox": '.leftbar',
    *           "bgMask": true,
    *           "menuSetPosition": [20,-200],
    *           "btnSetposition": [220,0],
    *	    })
	*/
	var SlideMenu = (function ($) {
		let btnInitOffset = {
			"left":{},
			"right":{},
			"up":{},
			"down":{},
		};
		function SlideMenu(param) {
			// 参数
			this.param = param;
			// 初始化
			this.init();
		}
		SlideMenu.prototype = {
		
            constructor: SlideMenu,
            
			init: function(){
				// 处理参数
				this.param = $.extend({
					"direction": 'left',
					"menuBtn": '',
                    "menuBox": '',
                    // "menuDistance": '',
                    "delay": 0.5,
                    "menuSetPosition": 0,
					"btnSetposition": 0,
                    // "menuBtnMargin": 0,
					// "menuBtnHide": 0,
                    "isOpen": false,
					"btnFollow":true,
					"bgDrop":0,
					"isClickBgClose": true,
					"bgMask": false,
					"callBackFun": ''
				}, this.param)
                // 插入背景Div
                if (this.param.bgMask && $("#SlideMenuBj").length < 1) {
                    $('body').append(`<div id="SlideMenuBj" style="width: 100%;
                        height: 100%;
                        background-color: #000;
                        opacity: .5;
                        position:fixed;
                        display: none;
                        z-index: 0;
                        bottom: 0;"></div>`);
                }

                // 获取菜单及按钮的宽度
                // this.menuBtnObj = $(this.param.menuBtn).position();
                // this.menuBoxObj = $(this.param.menuBox).position();
                // console.log(this.menuBtnObj)
                let that = this;
				btnInitOffset[this.param.direction] = that.btnOffset();
				// if(this.param.direction == 'right' || this.param.direction == 'up'){
				// 	console.log(btnInitOffset[this.param.direction]);
				// }
                if (this.param.bgMask) {
                    this.bgObj = $("#SlideMenuBj");
                    // 点击背景隐藏菜单
                    $("#SlideMenuBj").on('click', function () {
                        that.hideMenu();
                    });
                }
                
                // 绑定点击菜单
                //this.showMenu();
                $(this.param.menuBtn).on('click', () => {
                    if (this.param.isOpen) {
                        this.hideMenu();
                    }else{
                        this.showMenu();
                    }
                })
				that.menuInit();
				$(window).on('resize',function(){
					that.menuInit();
				})
            },
			menuInit: function(){
				if (!this.param.isOpen) {
					this.param.isOpen = !this.param.isOpen;
					this.changeMenuCSS(this.param.direction,this.param.delay);
					this.param.isOpen = !this.param.isOpen;
				}
				if(this.param.btnFollow){
					this.param.isOpen = !this.param.isOpen;
					this.changeBtnCSS(this.param.direction,this.param.delay);
					this.param.isOpen = !this.param.isOpen;
				}
				$(this.param.menuBox).css({
					'backdrop-filter': 'blur('+ this.param.bgDrop +'px)',
				})
			},
            // 显示菜单
            showMenu: function() {
				// console.log('显示')
                let time = this.param.delay;
                let d = this.param.direction;
				this.changeMenuCSS(d,time);
				if(this.param.btnFollow){
					this.changeBtnCSS(d,time);
				}
                if (this.param.bgMask) {
                    this.bgObj.css({
                        display: "block",
                        transition: "opacity .5s"
                    });
                }
                this.param.isOpen = true;
                if(this.param.callBackFun && typeof this.param.callBackFun == 'function'){
                    this.param.callBackFun(this.param.isOpen);
                }
            },

            // 隐藏菜单
            hideMenu: function() {
				// console.log('隐藏')
                let time = this.param.delay;
                let d = this.param.direction;
                this.changeMenuCSS(d,time);
                if(this.param.btnFollow){
                	this.changeBtnCSS(d,time);
                }
                if (this.param.bgMask) {
                    this.bgObj.css({
                        display: "none",
                        transition: "display 1s"
                    });
                }
                this.param.isOpen = false;

                if(this.param.callBackFun && typeof this.param.callBackFun == 'function'){
                    this.param.callBackFun(this.param.isOpen)
                }
            },
			
			// 获取容器位置宽高
			boxOffset: function(){
				let bodyWidth = $('body').width();
				let bodyHeight = $('body').height();
				let obj = {
					width: $(this.param.menuBox).width(),
					height: $(this.param.menuBox).height(),
					left: $(this.param.menuBox).offset().left,
					top: $(this.param.menuBox).offset().top,
					right: bodyWidth - $(this.param.menuBox).offset().left - $(this.param.menuBox).width(),
					bottom: bodyHeight - $(this.param.menuBox).offset().top - $(this.param.menuBox).height(),
				}
				return obj;
			},
			
			//获取按钮位置宽高
			btnOffset: function(){
				let bodyWidth = $('body').width();
				let bodyHeight = $('body').height();
				let obj = {
					direction: this.param.direction,
					width: $(this.param.menuBtn).width(),
					height: $(this.param.menuBtn).height(),
					left: $(this.param.menuBtn).offset().left,
					top: $(this.param.menuBtn).offset().top,
					right: bodyWidth - $(this.param.menuBtn).offset().left - $(this.param.menuBtn).width(),
					bottom: bodyHeight - $(this.param.menuBtn).offset().top - $(this.param.menuBtn).height(),
				}
				return obj;
			},
			
			
			//菜单css赋值
			changeMenuCSS: function(d,time){
				let menuDiv = $(this.param.menuBox);
				let menuSetPosition = null;
				// console.log(this.param.isOpen);
				switch (d) {
				    case 'left':
						menuSetPosition = this.param.menuSetPosition === 0 ? [0,0 - menuDiv.width()] : this.param.menuSetPosition;
						$(this.param.menuBox).css({
				            left: menuSetPosition[this.param.isOpen ? 1 : 0],
				            transition: "left "+time+"s"
				        });
				        break;
				    case 'right':
						menuSetPosition = this.param.menuSetPosition === 0 ? [0,0 - menuDiv.width()] : this.param.menuSetPosition;
				        $(this.param.menuBox).css({
				            right: menuSetPosition[this.param.isOpen ? 1 : 0],
				            transition: "right "+time+"s"
				        });
				        break;
				    case 'up':
						menuSetPosition = this.param.menuSetPosition === 0 ? [0,0 - menuDiv.height()] : this.param.menuSetPosition;
				        $(this.param.menuBox).css({
				            top: menuSetPosition[this.param.isOpen ? 1 : 0],
				            transition: "top "+time+"s"
				        });
				        break;
				    case 'down':
						menuSetPosition = this.param.menuSetPosition === 0 ? [0,0 - menuDiv.height()] : this.param.menuSetPosition;
				        $(this.param.menuBox).css({
				            bottom: menuSetPosition[this.param.isOpen ? 1 : 0],
				            transition: "bottom "+time+"s"
				        });
				        break;
				    default:
				        break;
				}
			},
			
			//按钮css赋值
			changeBtnCSS: function(d,time){
				let btn = $(this.param.menuBtn);
				let btnSetposition = null;
				switch (d) {
				    case 'left':
						btnSetposition = this.param.btnSetposition === 0 ? [btnInitOffset['left']['left'],0] : this.param.btnSetposition;
						$(this.param.menuBtn).css({
				            left: btnSetposition[this.param.isOpen ? 1 : 0],
				            transition: "left "+time+"s"
				        });
				        break;
				    case 'right':
						btnSetposition = this.param.btnSetposition === 0 ? [btnInitOffset['right']['right'],0] : this.param.btnSetposition;
				        $(this.param.menuBtn).css({
				            right: btnSetposition[this.param.isOpen ? 1 : 0],
				            transition: "right "+time+"s"
				        });
				        break;
				    case 'up':
						btnSetposition = this.param.btnSetposition === 0 ? [btnInitOffset['up']['top'],0] : this.param.btnSetposition;
				        $(this.param.menuBtn).css({
				            top: btnSetposition[this.param.isOpen ? 1 : 0],
				            transition: "top "+time+"s"
				        });
				        break;
				    case 'down':
						btnSetposition = this.param.btnSetposition === 0 ? [btnInitOffset['down']['bottom'],0] : this.param.btnSetposition;
				        $(this.param.menuBtn).css({
				            bottom: btnSetposition[this.param.isOpen ? 1 : 0],
				            transition: "bottom "+time+"s"
				        });
				        break;
				    default:
				        break;
				}
			},
		
			// 改变isOpen状态
			changeIsOpen: function(isOpen){
				this.param.isOpen = !isOpen;
				if(isOpen){
					this.showMenu();
				} else {
					this.hideMenu();
				}
			}
		};
		return SlideMenu;
    })(jQuery);

    // $('span').each(function () {
    //     var dom = $(this);
    //     dom.on('click', function () {
    //         hideNav();
    //         alert(dom.text())
    //     });
    // });