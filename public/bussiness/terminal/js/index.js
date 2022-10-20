var terminal = {
	loadmar: 0,
	openFloor: ""
}
var _SITE_ID = getParams()['siteId'];
var layuiId=getParams()["layuiId"];//标签id
// var proId = getParams()['proId'];
var proId = getParams()['projectId'];
var sitename = getParams()['sitename']; //站点名称
terminal.init = function() {
	$("#innerheader").attr("data-title", decodeURI(sitename));
	terminal.temperatureStatis(0); //各末端实时温度统计
	terminal.nowTemperHumidity(); //室外湿度，温度
	terminal.switchControl2(); //开关控制
	terminal.floorControl(); //楼层控制
	setInterval(function() {
		// debugger		
		if(terminal.openFloor!==""){			
			terminal.temperatureStatis(terminal.openFloor);//各末端实时温度统计
		}		
		terminal.nowTemperHumidity(); //室外湿度，温度
	}, 60 * 1000);
	// },8000);
	
	$('.terminal-top').before(
		'<iframe src="./companyBuild/index.html" id="u3diframe" frameborder="0" style="width: 100%; height: 100%;overflow: hidden;margin-top: -34px;"></iframe>'
	)

}

/*u3d调用的方法*/
terminal.u3dinit = function(gameInstance) {
	$(".terminal-control-bar").show();
	//点击网页上的楼层按钮，发送消息给unity切换楼层。
	//切换楼层
	var SendUnityMessage = function(funcname, data) {
		gameInstance.SendMessage("SceneControl", funcname, data);
	}
	//JS发送消息给Unity
	terminal.SelectScene = function(str,res,clickfloor) {
		// TODO:此處需要修改為動態獲取
		// $.post(baseurl + "wisdom/zgendstatistics/selectRealTemperatureStatics", {
		// 	siteId: 15
		// }, function(res) {
			console.log("给u3d发的数据信息！")
			console.log(res)
			gameInstance.SendMessage("Net", "GetRKCData", JSON.stringify(res));
			if(clickfloor){
				SendUnityMessage("SelectScene", str);
			}
			
		// })
	}

	//点击网页顶部开关按钮，切换u3d中物体按钮状态
	//点击1楼开关
	terminal.OpenSwitch1 = function(str, state) {
		// gameInstance.SendMessage("JSControl", "OpenSwitch1", str + "|" + (state == 1 ? 0 : 1));
		gameInstance.SendMessage("JSControl", "OpenSwitch1", str + "|" + state);
	}
	//点击2楼开关
	terminal.OpenSwitch2 = function(str, state) {
		// gameInstance.SendMessage("JSControl", "OpenSwitch2", str + "|" + (state == 1 ? 0 : 1));
		gameInstance.SendMessage("JSControl", "OpenSwitch2", str + "|" + state);
	}
	
	//u3d点击楼层物体，切换页面上的显示
	terminal.enterFloor = function(floor) {
			switch (floor) {
				case "Floor1":
					$(".f1").click();
					break;
				case "Floor2":
					$(".f2").click();
					break;
				case "MainBuilding":
					$(".mainfloor").click();
					break;
			}
	}
}
//室外湿度，温度
terminal.nowTemperHumidity = function() {
	$.ajax({
		url: baseurl + "wisdom/zgendstatistics/selectTemperatureAndHumidity",
		type: "post",
		data: {
			// "projectId":12
			"projectId": proId
		},
		success: function(data) {
			if (data.code == 0) {
				var res = data.data || [];
				var temperature = res["temperature"] || "--"; //温度
				var humidity = res["humidity"] || "--"; //湿度
				$("#temperature").html(temperature);
				$("#humidity").html(humidity);
			}
		}
	});
}
//数据统计
// terminal.temperatureStatis = function(floor = "f1") {
terminal.temperatureStatis = function(index,clickfloor) {
	
	var floor = "f1";
	if(index){
		floor="f"+(index+1);
	}	
	var myChart2 = echarts.init(document.getElementById('main2'));

	function renderChar(xdata, ydata) {
		// 指定图表的配置项和数据
		var option2 = {
			// title: {
			// 	text: '柱图'
			// },
			// tooltip: {},
			// color: ['#0dbcfb', 'red', 'yellow', 'red', 'yellow'],
			grid: {
				left: '1%',
				right: '20%',
				bottom: '13%',
				top: '1%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				// data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
				axisLabel: {
					show: false,
					textStyle: {
						color: '#A5EAFF'
					}
				},
				axisTick: {
					show: false,
					lineStyle: {
						color: '#A5EAFF' // 刻度的颜色
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#A5EAFF' //更改坐标轴颜色
					}
				},
				splitLine: {
					show: false,
				}
			},
			yAxis: {
				// data: ["一楼大厅", "报告厅", "卫生间", "办公室", "电梯间"],
				data: ydata,
				type: 'category',
				interval: 0,
				axisLabel: {
					show: true,
					textStyle: {
						color: '#A5EAFF',
						fontSize: 12
					}
				},
				axisTick: {
					show: false,
					lineStyle: {
						color: '#A5EAFF' // 刻度的颜色
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#A5EAFF' //更改坐标轴颜色
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: ['#A5EAFF'],
						width: 1,
						type: 'solid'
					}
				}
			},
			series: [{
				barWidth: 12, //柱图宽度
				name: '费用',
				type: 'bar',
				itemStyle: {
					//柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
					emphasis: {
						barBorderRadius: 0
					},
					normal: {

						//柱形图圆角，初始化效果
						// barBorderRadius: [5, 5, 5, 5],

						// barBorderRadius: [3, 3, 3, 3],
						color: new echarts.graphic.LinearGradient(
							1, 0, 0, 0, // 0,0,1,0表示从左向右    0,0,0,1表示从右向左
							[{
									offset: 0,
									color: '#00FFFF'
								},
								{
									offset: 1,
									color: '#1683FF'
								},
							]),
						shadowColor: 'rgba(5, 103, 177, 0.5)',
						shadowBlur: 20,
						label: {
							formatter: "{c}" + "℃",
							show: true, //是否展示
							position: "right",
							textStyle: {
								fontWeight: 'bolder',
								fontSize: '14',
								fontFamily: '微软雅黑',
								color: '#00FFFF'
							},


						}
					}
				},
				// data: [100, 300, 400,600, 1000]
				data: xdata
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart2.setOption(option2);
	}

	function object(a, b) {
		return b.plate.localeCompare(a.plate);
	}
	$.ajax({
		url: baseurl + "wisdom/zgendstatistics/selectRealTemperatureStatics",
		type: "post",
		data: {
			"siteId": _SITE_ID
			// "siteId":15
		},
		success: function(data) {
			console.log("data==================");
			console.log(data);
			// debugger
			if(terminal.SelectScene){
				// console.log("index======");
				// console.log(index);
				switch (index) {
					case 0:
						terminal.SelectScene('Floor1',data,clickfloor);
						break;
					case 1:
						terminal.SelectScene('Floor2',data,clickfloor);
						break;
					case 2://主楼
						terminal.SelectScene('MainBuilding',data,clickfloor);
						break;
					default:
						break;
				}
			}
			
			if (data.code == 0) {
				var res = data.data || [];
				var res = res[floor] || [];
				// res=res.sort(object);
				terminal.dataList(res, floor);
				var temperatureAll = 0, //总温度
					windSpeedAll = 0, //总风速
					openequ = 0, //设备开启个数
					humidityAll = 0; //总湿度
				var xdata = [],
					ydata = [];
				var strLeft = "";
				for (var i = 0; i < res.length; i++) {
					var item = res[i] || [];
					var plate = convert(item["plate"]); //位置
					var co2 = convert(item["co2"]); //co2
					var temperature = convert(item["temperature"]); //温度
					var humidity = convert(item["humidity"]); //湿度
					var state = item["state"]; //启停
					var windSpeed = convert(item["windSpeed"]); //风速			
					temperatureAll += item["temperature"] || "0" * 1; //温度总合
					// windSpeedAll += item["windSpeed"] || "0"; //风速总合
					humidityAll += item["humidity"] || "0"; //湿度综合
					if (state != -1) {
						openequ++; //开启设备数量
					}
					$(".number span").html(openequ); //开启设备
					$(".number em").html(res.length); //设备总数
					xdata.push(temperature);
					ydata.push(plate);
					var zuanshiUl = floor == "f1" ? $(".floor1_model ul") : $(".floor2_model ul"); //图片上楼层上设备（钻石图片包含层）
					zuanshiUl.each(function(i, item) {
						var dataTitle = $(item).attr("data-title");
						if (plate.indexOf(dataTitle) != -1) {
							$(".pos" + (i + 1)).find(".title").html(plate + "末端");
							$(".pos" + (i + 1)).find(".temperature").html(temperature);
							$(".pos" + (i + 1)).find(".humidity").html(humidity);
							$(".pos" + (i + 1)).find(".co2").html(co2);
						}
					})
				}
				renderChar(xdata.reverse(), ydata.reverse());
				// var windAverage = windSpeedAll / res.length; //平均风速
				// var windAverageStr;
				// if(windAverage==1){
				// 	windAverageStr="低"
				// }if(windAverage==2){
				// 	windAverageStr="中"
				// }if(windAverage==3){
				// 	windAverageStr="高"
				// }
				$("#temp-average").html((temperatureAll / res.length).toFixed(2));
				// $("#wind-average").html(windAverageStr);
				$("#humidity-average").html((humidityAll / res.length).toFixed(2));
			}
		}
	});
	$(".hd-full-screen").click(function() {
		setTimeout(function() {
			myChart2.resize();
		}, 10);
	});
	$(window).resize(function() {
		myChart2.resize();
	});
}
//数据列表添加html
terminal.dataList = function(array, floor) {
	var str = "";
	var controlstr = "";
	var dataname = {
		"培训室": "peixunshi",
		"一楼大厅": "yiloudating",
		"电梯间": "diantijian",
		"办公室": "bangongshi",
		"卫生间": "weishengjian",
		"二楼办公室": "erloubangongshi",
		"大屏展示区": "dapingzhanshiqu",
		"会议室": "huiyishi",
		"二楼卫生间": "erlouweishengjian"
	};
	for (var i = 0; i < array.length; i++) {
		var item = array[i];
		var plate = convert(item["plate"]); //位置
		var co2 = convert(item["co2"]); //co2
		var temperature = convert(item["temperature"]); //温度
		var humidity = convert(item["humidity"]); //湿度
		var state = item["state"]; //启停
		var windSpeed = convert(item["windSpeed"]); //风速	
		var windAverageStr = "--";
		if (windSpeed == 1) {
			windAverageStr = "低"
		}
		if (windSpeed == 2) {
			windAverageStr = "中"
		}
		if (windSpeed == 3) {
			windAverageStr = "高"
		}
		var statestr = "";
		if (state == 0) {
			statestr = '<img src="./image/close.png" class="switch" data-status="0" isclick="false" data-name="' + plate +
				'"/>';
			// $(".status").html("中");
			// $(".status").css("color","yellow");
		}
		if (state == 1) {
			statestr = '<img src="./image/open.png" class="switch" data-status="1" isclick="false" data-name="' + plate + '"/>';
			// $(".status").html("优");
			// $(".status").css("color","#1DFF9C");
		}
		if (state == -1) {
			statestr = '--';
			// statestr='<img src="./image/unline.png" class="switch" data-status="-1" isclick="false" data-name="'+plate+'"/>';
			// $(".status").html("差");
			// $(".status").css("color","red");
		}

		str += `<li>
											<span class="width1">` + plate + `</span>
											<span class="width2">` + temperature +
			`</span>
											<span class="width2">` + humidity + `</span>
											<span class="width3">` + co2 +
			`</span>
											<span class="width2">` + windAverageStr + `</span>
											<span class="width2">` + statestr +
			`</span>
										</li>`;
		var control_statestr = '--',
			clas = "switch";
		if (state == 0) {
			control_statestr = '<img src="./image/icon_close.png" class="icon-switch">';
			clas = "switch close";
			// $(".coverpos[data-title='" + plate + "']").find("video").remove();
			// $(".coverpos[data-title='" + plate + "']").find("img").remove();
			// $(".coverpos[data-title='" + plate + "']").append(
			// 	'<img class="icon_video_close" src="./image/icon_video_close.png">');
		}
		if (state == 1) {
			control_statestr = '<img src="./image/icon_open.png" class="icon-switch">';
			clas = "switch";
			// $(".coverpos[data-title='" + plate + "']").find("video").remove();
			// $(".coverpos[data-title='" + plate + "']").find("img").remove();
			// $(".coverpos[data-title='" + plate + "']").append(
			// 	'<video src="./image/wkq.mp4" muted="true" loop="true" autoplay="true" class="iconvideo2 video"></video>');
		}
		if (state == -1) {
			control_statestr = '--';
			clas = "switch close"
		}
		controlstr += `<li data-floor="` + floor + `" data-name="` + dataname[plate] + `">
						<span class="` + clas +
			`" data-state="` + state +
			`" data-title="` + plate + `">
							` + control_statestr + `
							<em>` + plate +
			`</em>
						</span>
					</li>`;

		$(".floor" + (i + 1) + "_model inner").html();

	}
	$("#equipmentstatus").html(str);
	$("#switch-div").html(controlstr);
	terminal.loadmar++;
	if (terminal.loadmar == 1) {
		jQuery(".txtMarquee-top").slide({
			mainCell: ".bd ul",
			autoPlay: true,
			effect: "topMarquee",
			vis: 10,
			interTime: 50
		});
	}
}


//控制开关
terminal.switchControl2 = function() {
	$(document).on('click', '.terminal-top .switch', function() {
		var state = $(this).attr("data-state"); //当前开关状态
		var datatitle = $(this).attr("data-title"); //当前开关文字
		var datafloor = $(this).parent().attr("data-floor"); //当前楼层
		$("#iframe-body .hd-loadmask").show();
		if (state == 0) {
			changeSwitchStatus("1", datatitle, $(this)); //调用接口执行
		} else if (state == 1) {
			changeSwitchStatus("0", datatitle, $(this)); //调用接口执行
		} else if (state == -1) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('当前设备离线!');
			});
			$("#iframe-body .hd-loadmask").hide();
		}
		//点击网页上的开关，切换u3d设备开关状态
		// if (datafloor == "f1") {
		// 	terminal.OpenSwitch1($(this).parent("li").data("name"), state);
		// } else if (datafloor == "f2") {
		// 	terminal.OpenSwitch2($(this).parent("li").data("name"), state);
		// }
		
		

		//改变房间设备列表开关状态
		function changeEquipmentSwitchStates(state) {
			$("#equipmentstatus li span").each(function() {
				var title = $(this).html();
				if (datatitle.indexOf(title) != -1) {
					if (state == 1) {
						//执行开启
						$(this).parent().find(".switch").attr("src", "./image/open.png");
					} else if (state == 0) {
						//执行关闭
						$(this).parent().find(".switch").attr("src", "./image/close.png");
					}

				}
			});
		}

		function changeSwitchStatus(status, datatitle, obj) {
			$.ajax({				
				url: baseurl + "End/endSwitch",
				type: "post",
				timeout: 15000,
				// timeout : 1,
				data: {
					"name": datatitle,
					"status": status,
				},
				success: function(data) {
					// debugger
					var res = data.data || [];
					var returnStatus = res.status; //接口返回的状态
					if (data.code == 0) {
						$("#iframe-body .hd-loadmask").hide();
						if (returnStatus == 0) {
							obj.attr("data-state", "0");
							obj.addClass("close");
							obj.find("img").attr("src", "./image/icon_close.png");
							changeEquipmentSwitchStates("0");
							if (datafloor == "f1") {
								terminal.OpenSwitch1(obj.parent("li").data("name"), returnStatus);
							} else if (datafloor == "f2") {
								terminal.OpenSwitch2(obj.parent("li").data("name"), returnStatus);
							}
							
						} else if (returnStatus == 1) {
							obj.attr("data-state", "1");
							obj.removeClass("close");
							obj.find("img").attr("src", "./image/icon_open.png");
							changeEquipmentSwitchStates("1");
							if (datafloor == "f1") {
								terminal.OpenSwitch1(obj.parent("li").data("name"), returnStatus);
							} else if (datafloor == "f2") {
								terminal.OpenSwitch2(obj.parent("li").data("name"), returnStatus);
							}
						} else if (returnStatus == -1) {
							layui.use('layer', function() {
								var layer = layui.layer;
								layer.msg('当前设备不存在!');
							});
						} else if (returnStatus == -2) {
							layui.use('layer', function() {
								var layer = layui.layer;
								layer.msg('当前设备离线!');
							});
						}
					} else {
						console.log(data.msg);
					}
				},
				error: function(xhr, state, errorThrown) {
					if (state == 'timeout') {
						alert("请求超时,请联系管理员。")
					} else {
						alert("请求出错,请联系管理员。");
						//请求出错
					}
					$("#iframe-body .hd-loadmask").hide();
				},
				// complete:function(xhr,state,errorThrown){
				// 	//请求超时
				// 	 if (status == 'timeout'){
				// 		 $("#iframe-body .hd-loadmask").hide();
				// 		 alert("请求超时")
				// 	 }
				// }
			});
		}

	});
}


//楼层控制
terminal.floorControl = function() {		
	//点击网页上楼层按钮事件
	$("#floorBtns span").click(function() { 
		$(this).addClass("on").siblings().removeClass("on");
		var ind = $(this).index();
		 terminal.temperatureStatis(ind,"clickfloor"); //切换底部数据
		if (ind != 2) {
			//不是主楼
			// terminal.temperatureStatis("f" + (ind + 1)); //切换底部数据
			 // terminal.temperatureStatis(ind); //切换底部数据
			terminal.openFloor = ind;
			// $("#u3diframe").css("height", "calc(100% - 305px)");
			$(".terminal-bottom").css("z-index", "1");
			// $(".terminal-bottom").show();
			$(".terminal-bottom").css("opacity","1");
			$(".terminal-top").show();
		} else {
			//是主楼
			terminal.openFloor ="";
			$(".terminal-top").hide();
			$(".terminal-bottom").css("opacity","0");
			// $(".terminal-bottom").hide();
			$(".terminal-bottom").css("z-index", "-1");
			// $("#u3diframe").css("height", "100%")
		}

	});

}
terminal.init();
window.terminal = terminal;

function getUnity3D(params) {
	alert(params);
}
