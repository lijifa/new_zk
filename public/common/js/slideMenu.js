	/*
	* 侧滑菜单控件
	* author: ljf 2021-04-16
	* param: {
    *   direction:      菜单方向【up/down/left(默认的)/right】
	*   menuBtn:        菜单按钮【容器节点（id/class）】
	*   menuBox:        菜单内容容器【容器节点（id/class）】
	*   menuBoxMargin:  菜单偏移距离【默认0】
	*   menuBtnMargin:  菜单按钮与边的距离【默认0】
	* 	delay:          菜单滑动过渡效果的时间【0.5s】
	* 	isClickBgClose: 是否允许点击背景关闭【true(默认的)/false】【未完。。。】
	* 	isOpen:         默认菜单是否展开【true/false(默认的)】
	* 	btnFollow:      菜单按钮是否跟随【true(默认的)/false】【未完。。。】
	* 	bgMask:         是否蒙版【true(默认的)/false】
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
    *           "menuBoxMargin": 6,
    *           "menuBtnMargin": 353,
    *	    })
	*/
	var SlideMenu = (function ($) {
		function SlideMenu(param) {
			// 参数
			this.paramData = param;
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
                    "menuDistance": '',
                    "delay": 0.5,
                    "menuBoxMargin": 0,
                    "menuBtnMargin": 0,
                    "isOpen": true,
					"isClickBgClose": true,
					"bgMask": false,
					"callBackFun": ''
				}, this.paramData)
                
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
                if (this.param.bgMask) {
                    this.bgObj = $("#SlideMenuBj");
                    // 点击背景隐藏菜单
                    $("#SlideMenuBj").on('click', function () {
                        that.hideMenu();
                    });
                }
                
                // 绑定点击菜单
                //this.showMenu();
                $(this.param.menuBtn).on('click', function () {
                    if (that.param.isOpen) {
                        that.hideMenu();
                    }else{
                        that.showMenu();
                    }
                })
            },
            
            // 显示菜单
            showMenu: function() {
                let time = this.param.delay;
                let d = this.param.direction;
                let btn = $(this.param.menuBtn);
                let menuDiv = $(this.param.menuBox);
                let menuBoxMargin = this.param.menuBoxMargin;
                let menuBtnMargin = this.param.menuBoxMargin === 0 ? menuDiv.width() : this.param.menuBtnMargin;
                switch (d) {
                    case 'left':
                        menuDiv.css({
                            left: menuBoxMargin,
                            transition: "left "+time+"s"
                        });
                        btn.css({
                            left: menuBtnMargin,
                            transition: "left "+time+"s"
                        });
                        break;
                    case 'right':
                        menuDiv.css({
                            right: menuBoxMargin,
                            transition: "right "+time+"s"
                        });
                        btn.css({
                            right: menuBtnMargin,
                            transition: "right "+time+"s"
                        });
                        break;
                    case 'up':
                        menuDiv.css({
                            top: menuBoxMargin,
                            transition: "top "+time+"s"
                        });
                        btn.css({
                            top: menuBtnMargin,
                            transition: "top "+time+"s"
                        });
                        break;
                    case 'down':
                        menuDiv.css({
                            bottom: menuBoxMargin,
                            transition: "bottom "+time+"s"
                        });
                        btn.css({
                            bottom: menuBtnMargin,
                            transition: "bottom "+time+"s"
                        });
                        break;
                    default:
                        break;
                }
                if (this.param.bgMask) {
                    this.bgObj.css({
                        display: "block",
                        transition: "opacity .5s"
                    });
                }
                this.param.isOpen = true;

                if(this.param.callBackFun && typeof this.param.callBackFun == 'function'){
                    this.param.callBackFun(true)
                }
            },

            // 隐藏菜单
            hideMenu: function() {
                let time = this.param.delay;
                let d = this.param.direction;
                let btn = $(this.param.menuBtn);
                let menuDiv = $(this.param.menuBox);
                let menuBoxMargin = this.param.menuBoxMargin;
                // let menuBtnMargin = this.param.menuBtnMargin;
                let menuBtnMargin = this.param.menuBoxMargin === 0 ? menuDiv.width() : this.param.menuBtnMargin;
                let menuW = 0-menuBtnMargin;
                let menuH = 0-menuBtnMargin;
                switch (d) {
                    case 'left':
                        menuDiv.css({
                            left: menuW,
                            transition: "left "+time+"s"
                        });
                        btn.css({
                            left: 0,
                            transition: "left "+time+"s"
                        });
                        break;
                    case 'right':
                        menuDiv.css({
                            right: menuW,
                            transition: "right "+time+"s"
                        });
                        btn.css({
                            right: 0,
                            transition: "right "+time+"s"
                        });
                        break;
                    case 'up':
                        menuDiv.css({
                            top: menuH,
                            transition: "top "+time+"s"
                        });
                        btn.css({
                            top: 0,
                            transition: "top "+time+"s"
                        });
                        break;
                    case 'down':
                        menuDiv.css({
                            bottom: menuH,
                            transition: "bottom "+time+"s"
                        });
                        btn.css({
                            bottom: 0,
                            transition: "bottom "+time+"s"
                        });
                        break;
                    default:
                        break;
                }
                if (this.param.bgMask) {
                    this.bgObj.css({
                        display: "none",
                        transition: "display 1s"
                    });
                }
                this.param.isOpen = false;

                if(this.param.callBackFun && typeof this.param.callBackFun == 'function'){
                    this.param.callBackFun(false)
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