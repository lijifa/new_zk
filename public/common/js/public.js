ajaxLoadBefore();


/**
 * 获取天气
 */
function getweather() {
	// console.log(getParams()["mfrsId"],getParams()["siteId"]);
	if (getParams()["mfrsId"] != undefined) {
		$.ajax({
			url: hdInterface.selectWeather,
			type: "post",
			data: {
				mfrsId: getParams()["mfrsId"] ? getParams()["mfrsId"] : '',
			},
			async: false,
			success: function(res) {
				if (res.code == 0) {
					var data = res["data"] || {};
					// console.log('企业天气');
					// console.log(res);
					var weatherStr = (data.dayWeather || "--") + " 气温 <span class='yellow1_pub'>" + (data
						.temperature || "--") + "℃</span>";
					$(".sc-title .weather").html(weatherStr);
				}
			},
		});
		return;
	}
	if (getParams()["siteId"] != undefined) {
		$.ajax({
			url: hdInterface.selectWeatherBySiteId,
			type: "post",
			data: {
				siteId: getParams()["siteId"] ? getParams()["siteId"] : '',
			},
			async: false,
			success: function(res) {
				if (res.code == 0) {
					var data = res["data"] || {};
					// console.log('站点天气');
					// console.log(res);
					var weatherStr = (data.dayWeather || "--") + " 气温 <span class='yellow1_pub'>" + (data
						.temperature || "--") + "℃</span>";
					$(".sc-title .weather").html(weatherStr);
				}
			},
		});
		return;
	}

}

/**
 * 获取站点名和项目名
 */
function getSiteNameAndProjectName() {
	var siteId = getParams()["siteId"];
	if (siteId != undefined) {
		$.ajax({
			url: hdInterface.selectSiteNameAndProjectNameBySiteIdModule,
			type: "post",
			data: {
				siteId: siteId,
			},
			success: function(res) {
				if (res.code == 0) {
					// console.log(res);
					var data = res["data"] || {};
					var projectName = data.projectName || "";
					var siteName = data.siteName || "";
					var status = data.status;
					var jfstr = '<img src="/common/image/icon_title1.png"/><span>所在机房：<em>' +
						siteName + '</em></span>';;
					// if(status==1){//正常
					//  jfstr='<img src="/common/image/icon_title1.png"/><span>所在机房：<em>'+siteName+'</em></span>';
					// }else{//不正常
					//  jfstr='<img src="/common/image/icon_title1_gray.png" style="margin-top:-2px;"/><span style="color:#bbb">所在机房：<em>'+siteName+'</em>（机房离线）</span>';
					// }
					$("#title-project em").html(projectName); //项目名称
					$("#title-site").html(jfstr); //机房名称

				}
			},
		});
	}
}

/**
 * 设置时间
 */
function setdatetime() {
	$.ajax({
		url: hdInterface.currentTimes,
		type: "GET",
		async: false,
		success: function(res) {
			if (res.code == 0) {
				var data = res["data"] || {};
				var currentTimes = data.currentTime;
				$("#datetime").html(currentTimes);
			}
		},
	});
}

function ajaxLoadBefore() {
	var loadArray = [];
	$.ajaxSetup({
		// cache:false,
		beforeSend: function(xhr) {
			$.each(loadArray, function() {
				if (this.loadtimes == "0") {
					loadmask(this.id);
				}
			});
		},
		complete: function(xhr, status) {
			// console.log('请求地址URL====',this.url);
			// 登录失效
			if (xhr.statusText === "success") {
				let obj = JSON.parse(xhr.responseText);
				if (obj.code == 401) {
					top.ajaxCount = top.ajaxCount + 1;
					if (top.ajaxCount == 1) {
						layui.use('layer', function() {
							let layer = layui.layer;
							layer.msg(obj.msg, {
								area: ['180px', '50px']
							});
							/* layer.confirm(obj.msg,{
								btn:['确定']
							},function(){
								top.location.href = "../../bussiness/login/login.html";
							}) */
						})
					}
					setTimeout(function() {
						top.location.href = "/bussiness/login/login.html";
					}, 1500)
				}
			}
			if (xhr.responseJSON && xhr.responseJSON.code == 401) {
				top.ajaxCount = top.ajaxCount + 1;
				if (top.ajaxCount == 1) {
					layui.use('layer', function() {
						let layer = layui.layer;
						layer.msg(obj.msg, {
							area: ['180px', '50px']
						});
						/* layer.confirm(obj.msg,{
							btn:['确定']
						},function(){
							top.location.href = "../../bussiness/login/login.html";
						}) */
					})
				}
				setTimeout(function() {
					top.location.href = "/bussiness/login/login.html";
				}, 1500)
				// top.location.href = "../../bussiness/login/login.html";
			}
		},
		// error:function(e,f,g){
		// 	console.log(e);
		// 	//哪个模块想添加报错隐藏加载gif和显示无数据功能则需要写上class名等于当前报错接口名
		// 	var response=e.responseText;
		// 	if(JSON.parse(response)){
		// 		var path=JSON.parse(response).path;	
		// 		if(path){
		// 			var pa=path.split('/');
		// 			var interfacename=pa[pa.length-1];
		// 			// console.log(interfacename)
		// 			var dom=$("."+interfacename);
		// 			dom.find(".hd-loadmask").hide();//隐藏加载按钮
		// 			//如果没有暂无数据图则添加
		// 			if(dom.find(".nodata").length==0){
		// 				dom.append('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
		// 			}
		// 		}
		// 	}
		// 	
		// }
	});
}

function loadmask(elementId) {
	var str = '<div class="hd-loadmask">' + '<img src="/common/image/load.gif" class="iconimg">' + "</div>";
	$("#" + elementId).append(str);
	$("#" + elementId).css("position", "relative");
}

function removemask(elementId) {
	$("#" + elementId)
		.find(".hd-loadmask")
		.remove();
}

$(function() {
	var showmenu = getParams()["showmenu"];
	var siteid = getParams()["siteId"];
	var sitename = decodeURI(getParams()["sitename"]); //机房名称
	var projectname = decodeURI(getParams()["proname"]); //项目名称
	var menuLeftId = decodeURI(getParams()["menuLeftId"]); //左侧机房菜单id
	//首页
	$("#leftbar").load("./common/html/leftBar.html");
	// 导航条
	$("#innerheader").load("/common/html/innerheader.html", function() {
		loadHeaderCallback();
	});
	$("#partheader").load("/common/html/innerPartHeader.html", function() {
		loadHeaderCallback();
	});

	function loadHeaderCallback() {
		var tit = $("#innerheader").attr("data-title");
		// $(".sc-title .title").html(tit);//设置标题
		$(".sc-title .title").html(decodeURIComponent(getParams()["titlename"])); //设置标题	  
		//判断站内导航按钮是否显示
		if (showmenu == "show") {
			$("#hidenavbarBtn").show();
		}
		setdatetime(); //设置时间	 
		getweather(); //设置天气
		getSiteNameAndProjectName(); //设置所在项目和机房
		setInterval(function() {
			getSiteNameAndProjectName(); //设置所在项目和机房
		}, 60 * 1000);
	}

	setTimeout(function() {
		addHideMenu(); //加载主题菜单
		setdatetime();
		setInterval(function() {
			setdatetime();
		}, 20 * 1000);

	}, 100);

	//JavaScript代码区域
	layui.use("element", function() {
		//左侧菜单展示隐藏
		$(document).on("click", ".left-take-back", function() {
			// $(".left-take-back").click(function(){
			if ($(this).hasClass("lefthide")) {
				//展示左面菜单
				$(".hd-header-left").show();
				$(this).css("left", "222px");
				$(this).removeClass("lefthide");
				$(this).html('<i class="layui-icon layui-icon-left"></i>');
				$(".layui-layout-admin .layui-body").css("left", "222px");
			} else {
				//隐藏左面菜单
				$(".hd-header-left").hide();
				$(this).css("left", "0");
				$(this).addClass("lefthide");
				$(this).html('<i class="layui-icon layui-icon-right"></i>');
				$(".layui-layout-admin .layui-body").css("left", "0");
			}
		});
		if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
			//移动端
			$(".left-take-back").addClass("lefthide");
			$(".left-take-back").css("left", "0");
			$(".left-take-back").addClass("lefthide");
			$(".left-take-back").html('<i class="layui-icon layui-icon-right"></i>');
			$(".layui-layout-admin .layui-body").css("left", "0");
		}
		$(".hd-full-screen").click(function() {
			if($(".big-bar").css('display') == 'none'){
				$(".big-bar").show();
			} else {
				$(".big-bar").hide();
			}
		});
		$("#hd_refresh").click(function() {
			var myifram = $(".layui-tab-content .layui-tab-item.layui-show iframe")[0];
			var myiframsrc = $(myifram).attr("src");
			$(myifram).attr("src", myiframsrc);
			// $(".layui-tab-content .layui-tab-item.layui-show iframe")[0].contentWindow.location.reload(true);
		});
		$(".big-bar").hover(
			function() {},
			function() {
				$(".big-bar").hide();
			}
		);
		$(".screenfull").click(function() {
			$("#hd_refresh").hide();
			//全屏
			$(this).addClass("full-screen");
			$(".layui-layout-admin .layui-body").addClass("hd-full-screen-body");
			$(this).find("i").attr("class", "layui-icon layui-icon-screen-restore");
			$(".hd-tab.layui-tab-title").hide();
			$(".heightcalc").css("height", "calc(100% - 0px)");
			$(".big-bar").hide();
			$(".hd-full-screen").hide();
			$(".hd-restore-screen").show();

		});
		$(".hd-restore-screen").click(function() {
			restoreScreen();
		});


		function restoreScreen() {
			$("#hd_refresh").show();
			//退出全屏
			$(".screenfull").removeClass("full-screen");
			$(".layui-layout-admin .layui-body").removeClass("hd-full-screen-body");
			$(".screenfull").find("i").attr("class", "layui-icon layui-icon-screen-full");
			$(".hd-tab.layui-tab-title").show();
			$(".heightcalc").css("height", "calc(100% - 32px)");
			$(".hd-full-screen").show();
			$(".hd-restore-screen").hide();
		}
		$(document).keyup(function(event) {
			switch (event.keyCode) {
				case 27:
					//退出全屏
					restoreScreen();
					// case 96:
					// alert("ESC");
			}
		});
		$("a.site-demo-active").hover(
			function() {
				$(this).children(".layui-icon-star").show();
			},
			function() {
				$(this).children(".layui-icon-star").hide();
			}
		);

		$(".control-tab li").click(function() {
			$(this).addClass("on").siblings().removeClass("on");
			var ind = $(this).index();
			if (ind == 1) {
				$(".search-cover").show();
			} else {
				$(".search-cover").hide();
			}
		});
		$(".control-bar .layui-icon-search").click(function() {
			$(".control-bar").hide();
			$(".search-bar").show();
			$(".search-bar .searchinput").focus();
		});
		$(".search-bar .layui-icon-close").click(function() {
			$(".control-bar").show();
			$(".search-bar").hide();
			$(".search-cover").hide();
			$(".searchinput").val(" ");
		});
		$(".searchinput").keyup(function() {
			// 按键弹起时触发的事件；
			//console.log(1);
			$(".search-cover").show();
		});
		layui.use("element", function() {
			var element = layui.element;
			//监听Tab切换，以改变地址hash值
			element.on('tab(demo)', function() {
				//把当前打开的lay-id传过去
				top.noticeU3d(this.getAttribute('lay-id'));
				// sessionStorage.setItem("layuiId",this.getAttribute('lay-id')||'hdzh-home');
				// sessionStorage.setItem("layuiId",this.getAttribute('lay-id'));
			});
			//触发事件
			var active = {
				//在这里给active绑定几项事件，后面可通过active调用这些事件
				tabAdd: function(url, id, name) {
					//新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
					//关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
					element.tabAdd("demo", {
						title: name,
						content: '<iframe data-frameid="' + id +
							'" scrolling="no" frameborder="0" src="' + url +
							'" style="width:100%;height:100%;"></iframe>',
						id: id, //规定好的id
					});
					element.render("tab");
				},
				tabChange: function(id) {
					//切换到指定Tab项
					element.tabChange("demo", id); //根据传入的id传入到指定的tab项
					// console.log(id);
				},
				tabDelete: function(id) {
					element.tabDelete("demo", id); //删除
				},
				tabDeleteAll: function(ids) {
					//删除所有
					$.each(ids, function(i, item) {
						element.tabDelete("demo",
						item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
					});
				},
			};

			if (typeof top.window.openNewTab === "undefined") {
				top.window.openNewTab = function(url, id, name) {
					$.each($(".layui-tab-title li[lay-id]"), function() {
						if ($(this).attr("lay-id") == id) {
							active.tabDelete(id)
						}
					});
					active.tabAdd(url, id, name);
					active.tabChange(id);
				};
			}

			//当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
			$(document).on("click", ".site-demo-active", function() {
				// $('.site-demo-active').on('click', function() {
				var dataid = $(this);
				console.log(dataid.attr("data-url"))
				//这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
				if ($(".layui-tab-title li[lay-id]").length <= 0) {
					//如果比零小，则直接打开新的tab项
					active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),
						dataid.attr("data-title"));
				} else {
					//否则判断该tab项是否已经存在

					var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
					$.each($(".layui-tab-title li[lay-id]"), function() {
						//如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
						if ($(this).attr("lay-id") == dataid.attr("data-id")) {
							isData = true;
						}
					});
					if (isData == false) {
						var clientwidth = document.documentElement.clientWidth;
						var tabwidth = 0;
						$(".layui-tab-title li").each(function() {
							// tabwidth+=$(this).width()*1+30;
							tabwidth += $(this).width() * 1 + 31;
						});

						if (tabwidth > clientwidth - 220) {
							var lastid = $(".layui-tab-title").children("li:last-child")
								.attr("lay-id");
							var lastelement = $(".layui-tab-title").children(
								"li:last-child");
							var lastid = lastelement.attr("lay-id");
							var lasttitle = lastelement.html().split("<")[0];
							var ifhas = false;
							$(".morelink a").each(function() {
								if ($(this).attr("data-id") == lastid) {
									ifhas = true;
								}
							});

							if (ifhas == false) {
								var righthtml =
									'<div class="morelinkdiv"><a data-url="index.html" data-id="' +
									lastid +
									'" data-title="' +
									lasttitle +
									'" class="site-demo-active" href="javascript:;" data-type="tabAdd">' +
									lasttitle +
									'</a><i class="layui-icon layui-icon-close"></i></div>';
								$(".morelink").append(righthtml);
							}
							lastelement.remove();
							$(".layui-tab-item iframe:last").parent().remove();
						}
						//标志为false 新增一个tab项
						if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator
							.userAgent)) {
							// console.log($(".hd-tab li").attr('lay-id'))
							var arr = []
							for (var i = 0; i < $(".hd-tab li").length; i++) {
								// if($(".hd-tab li").eq(i).attr('lay-id') !== 'hdzh-home'){
								arr.push($(".hd-tab li").eq(i).attr('lay-id'))
								// }
							}
							// console.log(arr)
							active.tabDeleteAll(arr)
						}
						active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),
							dataid.attr("data-title"));
					}
				}
				//最后不管是否新增tab，最后都转到要打开的选项页面上
				active.tabChange(dataid.attr("data-id"));

				//判断当前打开标签url是否和左侧的url一致，如果不一致，从新加载
				$("iframe").each(function(i, item) {
					if ($(item).attr("data-frameid") == dataid.attr(
						"data-id")) {
						if ($(item).attr("src") != dataid.attr("data-url")) {
							$(item).attr("src", dataid.attr("data-url"));
						}
					}
				});

				//判断点击机房页面菜单，从新加载站点概况页
				// if (dataid.attr("data-url").indexOf("bussiness/monitoring/index.html") != -1) {
				//   $("iframe").each(function (i, item) {
				//     if ($(item).attr("data-frameid") == dataid.attr("data-id")) {
				//       $(item).attr("src", dataid.attr("data-url"));
				//     }
				//   });
				// }
			});
			element.init();
		});
		// $(".closeall").click(function(){
		// 	var id="carInformation";
		// 	active.tabDelete(id);
		// });
		$(document).on("click", ".morelinkdiv .layui-icon-close", function() {
			$(this).parents(".morelinkdiv").hide();
		});
		//左侧导航关闭其他同级展开菜单
		$(document).on("click", "#menu li", function() {
			$(this).siblings("li").removeClass("layui-nav-itemed");
		});
		$(document).on("click", "#menu .layui-nav-child dd", function() {
			$(this).siblings("dd").removeClass("layui-nav-itemed");
		});
	});
	//键盘按Ctrl+Enter实现全屏
	window.keyCtrlEnterFull = function() {
		$(document).keyup(function(event) {
			// 　　if(event.ctrlKey && event.keyCode==121){
			if (event.altKey && event.keyCode == 48) {
				console.log("public=======alt+0============");
				var restorebtn = top.$(".hd-restore-screen").css('display');
				if (restorebtn == 'block') {
					top.$(".hd-restore-screen").click();
				} else {
					top.$(".screenfull").click();
				}

			}
		});
	}
	window.keyCtrlEnterFull();
	//获取当前年月日星期农历日期
	function getdate() {
		var sWeek = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		var dNow = new Date();
		var CalendarData = new Array(100);
		var madd = new Array(12);
		var tgString = "甲乙丙丁戊己庚辛壬癸";
		var dzString = "子丑寅卯辰巳午未申酉戌亥";
		var numString = "一二三四五六七八九十";
		var monString = "正二三四五六七八九十冬腊";
		var weekString = "日一二三四五六";
		var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
		var cYear, cMonth, cDay, TheDate;
		CalendarData = new Array(
			0xa4b,
			0x5164b,
			0x6a5,
			0x6d4,
			0x415b5,
			0x2b6,
			0x957,
			0x2092f,
			0x497,
			0x60c96,
			0xd4a,
			0xea5,
			0x50da9,
			0x5ad,
			0x2b6,
			0x3126e,
			0x92e,
			0x7192d,
			0xc95,
			0xd4a,
			0x61b4a,
			0xb55,
			0x56a,
			0x4155b,
			0x25d,
			0x92d,
			0x2192b,
			0xa95,
			0x71695,
			0x6ca,
			0xb55,
			0x50ab5,
			0x4da,
			0xa5b,
			0x30a57,
			0x52b,
			0x8152a,
			0xe95,
			0x6aa,
			0x615aa,
			0xab5,
			0x4b6,
			0x414ae,
			0xa57,
			0x526,
			0x31d26,
			0xd95,
			0x70b55,
			0x56a,
			0x96d,
			0x5095d,
			0x4ad,
			0xa4d,
			0x41a4d,
			0xd25,
			0x81aa5,
			0xb54,
			0xb6a,
			0x612da,
			0x95b,
			0x49b,
			0x41497,
			0xa4b,
			0xa164b,
			0x6a5,
			0x6d4,
			0x615b4,
			0xab6,
			0x957,
			0x5092f,
			0x497,
			0x64b,
			0x30d4a,
			0xea5,
			0x80d65,
			0x5ac,
			0xab6,
			0x5126d,
			0x92e,
			0xc96,
			0x41a95,
			0xd4a,
			0xda5,
			0x20b55,
			0x56a,
			0x7155b,
			0x25d,
			0x92d,
			0x5192b,
			0xa95,
			0xb4a,
			0x416aa,
			0xad5,
			0x90ab5,
			0x4ba,
			0xa5b,
			0x60a57,
			0x52b,
			0xa93,
			0x40e95
		);
		madd[0] = 0;
		madd[1] = 31;
		madd[2] = 59;
		madd[3] = 90;
		madd[4] = 120;
		madd[5] = 151;
		madd[6] = 181;
		madd[7] = 212;
		madd[8] = 243;
		madd[9] = 273;
		madd[10] = 304;
		madd[11] = 334;

		function GetBit(m, n) {
			return (m >> n) & 1;
		}

		function e2c() {
			TheDate = arguments.length != 3 ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
			var total, m, n, k;
			var isEnd = false;
			var tmp = TheDate.getFullYear();
			total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate
				.getDate() - 38;
			if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
				total++;
			}
			for (m = 0;; m++) {
				k = CalendarData[m] < 0xfff ? 11 : 12;
				for (n = k; n >= 0; n--) {
					if (total <= 29 + GetBit(CalendarData[m], n)) {
						isEnd = true;
						break;
					}
					total = total - 29 - GetBit(CalendarData[m], n);
				}
				if (isEnd) break;
			}
			cYear = 1921 + m;
			cMonth = k - n + 1;
			cDay = total;
			if (k == 12) {
				if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
					cMonth = 1 - cMonth;
				}
				if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
					cMonth--;
				}
			}
		}

		function GetcDateString() {
			var tmp = "农历";
			// tmp += tgString.charAt((cYear - 4) % 10);
			// tmp += dzString.charAt((cYear - 4) % 12);
			// tmp += "年 ";
			if (cMonth < 1) {
				tmp += "(闰)";
				tmp += monString.charAt(-cMonth - 1);
			} else {
				tmp += monString.charAt(cMonth - 1);
			}
			tmp += "月";
			tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
			if (cDay % 10 != 0 || cDay == 10) {
				tmp += numString.charAt((cDay - 1) % 10);
			}
			return tmp;
		}

		function GetLunarDay(solarYear, solarMonth, solarDay) {
			if (solarYear < 1921 || solarYear > 2020) {
				return "";
			} else {
				solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
				e2c(solarYear, solarMonth, solarDay);
				return GetcDateString();
			}
		}
		var D = new Date();
		var yy = D.getFullYear();
		var mm = D.getMonth() + 1;
		var dd = D.getDate();
		var ww = D.getDay();
		var hours = dNow.getHours() < 10 ? "0" + dNow.getHours() : dNow.getHours();
		var min = dNow.getMinutes() < 10 ? "0" + dNow.getMinutes() : dNow.getMinutes();
		var ss = parseInt(D.getTime() / 1000);

		function getFullYear(d) {
			// 修正firefox下year错误
			yr = d.getYear();
			if (yr < 1000) yr += 1900;
			return yr;
		}

		// var sValue = getFullYear(dNow) + "年" + (dNow.getMonth() + 1) + "月" + dNow.getDate() + "日" +dNow.getHours()+":"+dNow.getMinutes()+ " " + sWeek[dNow.getDay()] + " ";
		var sValue = getFullYear(dNow) + "年" + (dNow.getMonth() + 1) + "月" + dNow.getDate() + "日" + hours +
			":" + min + " " + sWeek[dNow.getDay()] + " ";
		sValue += GetLunarDay(yy, mm, dd);
		return sValue;
	}

	function addHideMenu() {
		if (menuLeftId != 'undefined') {
			$.ajax({
				url: hdInterface.selectZgMenuNavListByMenuLeftId,
				type: "GET",
				async: false,
				data: {
					menuLeftId: menuLeftId
				},
				success: function(res) {
					console.log("============顶部菜单所属站点："+menuLeftId+"=============");
					console.log(res);
					if (res.code == 0) {
						var siteMenu = res["data"] || [];
						var hidenavbarStr = "<ul>";
						for (var j = 0; j < siteMenu.length; j++) {
							var theme = siteMenu[j] || []; //主题
							var menuName = theme.menuName || ""; //主题名称
							var menuChildList = theme.menuChildList || []; //菜单列表
							hidenavbarStr +=
								`<li><span class="title">` + menuName + `</span>`;
							for (var k = 0; k < menuChildList.length; k++) {
								var menuitem = menuChildList[k];
								var menuName = menuitem.menuName || ""; //菜单名
								var titlename = menuitem.title || ""; //标题名称
								var menuurl = menuitem.url || ""; //菜单URl
								var menuId = menuitem.menuId || ""; //菜单ID
								var menuTopProjectId = menuitem.projectId || ""; //项目ID
								var menuTopSiteid = menuitem.siteId || "";
								var templateId = menuitem.templateId || ""; //模板id

								if (templateId == "") {
									//非模板
									if (menuurl.indexOf("http") == -1) {
										//没有http，拼menuLeftId
										menuurl = menuurl + '&menuLeftId=' + menuLeftId;
									}
									hidenavbarStr +=
										// `<span><a href="javascript:void(0)" data-url="` + menuurl +`">` +menuName + `</a></span>`;
										`<span><a href="javascript:void(0)" data-url="` + menuurl +
										`&v=${window.version}">` + menuName + `</a></span>`;
								} else {
									// console.log(projectId);
									//模板
									hidenavbarStr +=
										`<span><a href="javascript:void(0)" data-url="` +
										menuurl +
										`&projectId=` +
										menuTopProjectId +
										`&siteId=` +
										// menuTopSiteid + `&menuLeftId=`+menuLeftId+`">` +
										menuTopSiteid + `&menuLeftId=` + menuLeftId +
										`&v=${window.version}">` +
										menuName +
										`</a></span>`;
								}

							}

							hidenavbarStr += `</li>`;
						}
						hidenavbarStr +=
							`</ul><img src="./common/image/hidebavbar-close.png" class="closebtn" />`;
						parent.$("#hidenavbar").html(hidenavbarStr);
					}
				}
			});
		}
		$(document).on("click", ".hidenavbar .closebtn", function() {
			$(".hidenavbar").slideUp();
		});
		$(document).on("click", "#hidenavbarBtn", function() {
			parent.$(".hidenavbar").slideDown();
			$.ajax({
				url: hdInterface.selectZgMenuNavListByMenuLeftId,
				type: "GET",
				async: false,
				data: {
					menuLeftId: menuLeftId
				},
				success: function(res) {
					console.log("============顶部菜单=============");
					// console.log(menuLeftId);
					console.log(res);
					if (res.code == 0) {
						var siteMenu = res["data"] || [];
						var hidenavbarStr = "<ul>";
						for (var j = 0; j < siteMenu.length; j++) {
							var theme = siteMenu[j] || []; //主题
							var menuName = theme.menuName || ""; //主题名称
							var menuChildList = theme.menuChildList || []; //菜单列表
							hidenavbarStr +=
								`<li><span class="title">` + menuName + `</span>`;
							for (var k = 0; k < menuChildList.length; k++) {
								var menuitem = menuChildList[k];
								var menuName = menuitem.menuName || ""; //菜单名
								var titlename = menuitem.title || ""; //标题名称
								var menuurl = menuitem.url || ""; //菜单URl
								var menuId = menuitem.menuId || ""; //菜单ID
								var menuTopProjectId = menuitem.projectId || ""; //项目ID
								var menuTopSiteid = menuitem.siteId || "";
								var templateId = menuitem.templateId || ""; //模板id

								if (templateId == "") {
									//非模板
									if (menuurl.indexOf("http") == -1) {
										//没有http，拼menuLeftId
										menuurl = menuurl + '&menuLeftId=' + menuLeftId;
									}
									hidenavbarStr +=
										// `<span><a href="javascript:void(0)" data-url="` + menuurl +`">` +menuName + `</a></span>`;
										`<span><a href="javascript:void(0)" data-url="` +
										menuurl + `&v=${window.version}">` + menuName +
										`</a></span>`;
								} else {
									// console.log(projectId);
									//模板
									hidenavbarStr +=
										`<span><a href="javascript:void(0)" data-url="` +
										menuurl +
										`&projectId=` +
										menuTopProjectId +
										`&siteId=` +
										// menuTopSiteid + `&menuLeftId=`+menuLeftId+`">` +
										menuTopSiteid + `&menuLeftId=` + menuLeftId +
										`&v=${window.version}">` +
										menuName +
										`</a></span>`;
								}

							}

							hidenavbarStr += `</li>`;
						}
						hidenavbarStr +=
							`</ul><img src="./common/image/hidebavbar-close.png" class="closebtn" />`;
						parent.$("#hidenavbar").html(hidenavbarStr);
					}
				},
			});


			// var siteMenuArr = JSON.parse(localStorage.siteMenuArr); //调用菜单接口缓存的站内导航所有数据
			// var siteMenu = []; //当前siteId站内导航菜单
			// for (var i = 0; i < siteMenuArr.length; i++) {
			//   var item = siteMenuArr[i] || [];
			//   if (siteid == item.siteId) {
			//     // 当url传递的siteid和缓存的站内导航siteid相等时候
			//     siteMenu = item.siteMenu || [];
			//   }
			// }

		});
		$(document).on("click", "#hidenavbar li a", function() {
			var iframurl = $(this).attr("data-url");
			$(".layui-tab-item.layui-show").find("iframe").attr("src", iframurl);
			$(".hidenavbar").hide();
		});
		$(document).on("click", ".fixdev", function() {
			parent.$(".hidenavbar").slideUp();
		});
	}
});

// Loading组件开始
var loadingCom = {
	loading(obj = {}, callback) {
		boxId = obj.boxId;
		let timer = obj.timer ? obj.timer : 3000;
		let title = obj.title ? obj.title : 'Loading';
		let loadType = obj.type ? obj.type : '2';
		let mask = obj.mask != undefined ? obj.mask : true;
		// console.log("对比结果", obj.mask ? obj.mask : false);
		// console.log("mask值", obj.mask);
		let imgURL = obj.imgurl ? obj.imgurl : '/common/image/loading/loadingLogo.ico'

		const loadingList = [
			`<div class="loader loader-1" style="background: url(${imgURL}) no-repeat;background-size: 100% 100%;"><div class="css-diamond"></div></div>`,
			`<span class="loading-2-title">${title}</span><div class="loader loader-2"><div class="face"><div class="circle"></div></div><div class="face"><div class="circle"></div></div></div>`,
			`<div class="loader loader-3">
        <div class="loader-3-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="loader-3-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="loader-3-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div style="position: absolute;bottom: -30px;white-space: nowrap;color:#fff">${title}</div>
    </div>
    `,
		]

		switch (loadType) {
			case '1':
				$(`#${boxId}`).html(loadingList[0]);
				$(`#${boxId}`).addClass(`Boxshow ${mask?'LoadingMask':''}`)
				setTimeout(() => {
					this.closeLoading(boxId);
					if (callback && typeof callback === 'function') {
						callback();
					}
				}, timer);
				break;
			case '2':
				$(`#${boxId}`).html(loadingList[1])
				$(`#${boxId}`).addClass(`Boxshow ${mask?'LoadingMask':''}`)
				setTimeout(() => {
					this.closeLoading(boxId);
					if (callback && typeof callback === 'function') {
						callback();
					}
				}, timer);
				break;
			case '3':
				$(`#${boxId}`).html(loadingList[2])
				$(`#${boxId}`).addClass(`Boxshow ${mask?'LoadingMask':''}`)
				setTimeout(() => {
					this.closeLoading(boxId);
					if (callback && typeof callback === 'function') {
						callback();
					}
				}, timer);
				break;
		}
		// console.log("回调类型",typeof callback)
	},
	closeLoading(boxId) {
		console.log(boxId)
		$(`#${boxId}`).removeClass('Boxshow');
		$(`#${boxId}`).removeClass('LoadingMask');
	}
}
window.loadingCom = loadingCom;
// Loading组件结束

// Tip组件开始
var tipCom = {
	open() {
		$(".openTip").on('click', function() {
			let width = $(this).innerWidth();
			let height = $(this).innerHeight();
			let position = $(this).offset();

			let tipWidth = $(this).data("width") ? $(this).data("width") : 150;
			let tipHeight = $(this).data("height") ? $(this).data("height") : 50;
			let content = $(this).data("content") ? $(this).data("content") : "默认内容";
			let color = $(this).data("color") ? $(this).data("color") : "black";
			let time = $(this).data("time") ? $(this).data("time") : 1500;

			let tipX = position.left + width / 2 - tipWidth / 2 - 5;
			let tipY = position.top - tipHeight - 10;

			if ($(".tip").hasClass("noShow")) {
				$(".tip").css({
					width: `${tipWidth}px`,
					height: `${tipHeight}px`,
					backgroundColor: color,
					top: `${tipY}px`,
					left: `${tipX}px`
				});
				$(".triangle").css({
					backgroundColor: color
				})

				$(".tipContent").css({
					maxHeight: tipHeight - 15 + "px",
				});

				$(".tipContent").text(content);
				$(".tip").removeClass("animated fadeOut");
				$(".tip").addClass("animated fadeInDown");
				$(".tip").removeClass("noShow");

				setTimeout(() => {
					$(".tip").removeClass("animated fadeInDown");
					$(".tip").addClass("animated fadeOut");
					$(".tip").addClass("noShow");
				}, time);
			}
		});

		let tipDom = `
    <div class="tip noShow">
      <div class="tipContent"></div>
      <div class="triangle"></div>
    </div>
    `;
		$("body").append(tipDom);
	}
}
tipCom.open();
// Tip组件结束
// 加载数据遮罩层 loaging
var loadMask = {
	loadMaskTimer:null,
	openLoadMask:function(obj){
		let selector = obj.selector == undefined ? 'body' : obj.selector,
			timer = obj.timer == undefined ? '' : obj.timer,
			classStyle = obj.classStyle == undefined ? '' : obj.classStyle,
			title= obj.title == undefined ? '请等待' : obj.title,
			type = obj.type == undefined ? '1' : obj.type,
			imgURL = obj.imgURL == undefined ? '' : obj.imgURL,
			// timeout = obj.timeout == undefined ? 30 : obj.timeout,
			timeoutMsg = obj.timeoutMsg == undefined ? undefined : obj.timeoutMsg;
		let src = '';
		switch (type){
			case '1':
				src = `
				<div class="loader loader-3">
					<div class="loader-3-container container1">
					  <div class="circle1"></div>
					  <div class="circle2"></div>
					  <div class="circle3"></div>
					  <div class="circle4"></div>
					</div>
					<div class="loader-3-container container2">
					  <div class="circle1"></div>
					  <div class="circle2"></div>
					  <div class="circle3"></div>
					  <div class="circle4"></div>
					</div>
					<div class="loader-3-container container3">
					  <div class="circle1"></div>
					  <div class="circle2"></div>
					  <div class="circle3"></div>
					  <div class="circle4"></div>
					</div>
					<div style="position: absolute;bottom: -30px;white-space: nowrap;color:#fff">${title}</div>
				</div>
				`
				break;
			case '2':
				src = `<span class="loading-2-title">${title}</span><div class="loader loader-2"><div class="face"><div class="circle"></div></div><div class="face"><div class="circle"></div></div></div>`
				break;
			default:
				src = `<div class="loader loader-1" style="background: url(${imgURL}) no-repeat;background-size: 100% 100%;"><div class="css-diamond"></div></div>`;
				break;
		}
		$(selector).append(`
			<div class="loadMask ${classStyle}" id="loadMask">
				${src}
			</div>
		`)
		if(timer != '' && !isNaN(timer)){
			this.loadMaskTimer = setTimeout(function(){
				console.log('超时请求');
				if(timeoutMsg != undefined){
					$('#loadMask').html(`
					<div class="loadMaskMsg">${timeoutMsg}</div>
					`)
					setTimeout(function(){
						$('#loadMask').remove();
					},2*1000)
				} else {
					$('#loadMask').remove();
				}
			},timer*1000)
		}
	},
	closeLoadMask:function(){
		// $(document).children('#loadMask').remove();
		$('#loadMask').remove();
		clearTimeout(this.loadMaskTimer);
	}
}
window.loadMask = loadMask;

