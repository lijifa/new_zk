/*
 * 新风系统/净化系统
 */
var Cdoas = (function ($) {
	let unClickBtn = true;
	let roomTip = 'AHU1';
	function Cdoas() {
		// 容器
		this.siteId = getParams()['siteId'] || 32;
		this.siteId = getParams()['siteId'] || 32;
		this.deviceIds = '913,914,915,916,917,918';
		this.oneceload = 0, //是否第一次加载
			this.init();
	}
	Cdoas.prototype = {
		constructor: Cdoas,
		init: function () {
			this.loadErrorList();
			this.nowTemperHumidity();
			this.inOutWater();
			this.loadDevRealTimeList();
			changeRoom(roomTip);
			let that = this;
			this.changeMenu(that);
			let time = null;
			time = setInterval(function () {
				that.loadErrorList();
				that.nowTemperHumidity();
				that.inOutWater();
				that.loadDevRealTimeList();
				changeRoom(roomTip);
				that.oneceload++;
			}, 60 * 1000);
			//获取lay-id
			var lay_id = '';
			lay_id = $($($($(window)[0]['frameElement']).parents()[2]).children('.layui-tab-title'))
				.children('.layui-this').attr('lay-id');
			var layuiId = $($(window)[0]['frameElement']).data('frameid'); //标签id
			var objName = layuiId;
			document.addEventListener("visibilitychange", function () {
				if (document.visibilityState == 'hidden') {
					clearInterval(time);
					console.log('取消刷新外科楼');
				} else {
					//重新设定当前显示页的定时器
					if (lay_id == objName) {
						time = setInterval(function () {
							that.loadErrorList();
							that.nowTemperHumidity();
							that.inOutWater();
							that.loadDevRealTimeList();
							changeRoom(roomTip);
							that.oneceload++
						}, 60 * 1000);
					}
				}
			});
			//刷新
			window.onunload = function () {
				// top.unregisterListener(objName); //销毁
			}
			//标签切换
			// top.registerListener(objName, function (e) {
			// 	if (e == objName) {
			// 		time = setInterval(function () {
			// 			that.loadErrorList();
			// 			that.nowTemperHumidity();
			// 			that.inOutWater();
			// 			that.loadDevRealTimeList();
			// 			changeRoom(roomTip);
			// 			that.oneceload++
			// 			console.log('刷新外科楼');
			// 		}, 60 * 1000);
			// 	} else {
			// 		clearInterval(time);
			// 		lay_id = $($($($(window)[0]['frameElement']).parents()[2]).children(
			// 			'.layui-tab-title')).children('.layui-this').attr('lay-id');
			// 	}

			// }); //注册
		},

		// 当日实时温湿度
		inOutWater: function () {
			$.ajax({
				// url:hdInterface.chilledWaterSupplyAndReturnCopy,
				url: hdInterface.chilledWaterSupplyAndReturnModule,
				type: "post",
				data: {
					"siteId": this.siteId,
				},
				success: function (result) {
					var timeArr = [],
						temperatureArr = [];
					if (result.code == 0) {
						var data = result.data || [];
						if (data.length == 0) {
							$('#temperature').html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
							// $('#humidity').hide()
							return;
						} else {
							timeArr = data.dataX.split(',')
							temperatureArr = data.dataY3.split(',') //室外温度
							humidityArr = data.dataY4.split(',')    //湿度

							var dataXTime = []
							timeArr.forEach((item, index) => {
								dataXTime.push(item + ":00");
							})

							echarsComponent.getLine({
								"elementId": "temperature", //容器id	[必填]
								"xdata": dataXTime, //横坐标数据[必填]
								"ydata": [temperatureArr], //纵坐标数据[必填]
								"ydataTitle": ['室外温度'], //提示框标题项

								"linecolors": ['#3BD5FC'], //线颜色[非必填]
								// interval:4,//间隔[非必填]
								"unit": "℃", //单位
								"grid": {
									left: '10px',
									top: '25px',
									rigth: '20px',
									bottom: '10px'
								}, //边距[非必填]
								"nodataImg": true,
								"yAxisMin": 0,
								"yAxisMinInterval": 5,
							});
							// $('.Unit').css('display', 'block')
						}

					}
				}
			});
		},

		//系统实时状态
		nowTemperHumidity: function () {
			// $('#temp').html((Math.random() * 7 + 18).toFixed(1));
			// $('#hum').html((Math.random() * 20 + 50).toFixed(1));
		},

		// 近30天设备报警分布
		loadErrorList: function () {
			$.ajax({
				// url:hdInterface.chilledWaterSupplyAndReturnCopy,
				url: hdInterface.getAlarmDetail,
				type: "post",
				data: {
					"deviceIds": this.deviceIds,
				},
				success: function (result) {
					if (result.code == 0) {
						var data = result.data || [];
						var errorData = [];
						if (data.length == 0) {
							// $('#errorBox').html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
							errorData = [{
								value: 0,
								name: '送风机故障'
							}, {
								value: 0,
								name: '电再加热过热'
							}, {
								value: 0,
								name: '防冻八景'
							}, {
								value: 0,
								name: '过滤阻塞报警'
							}]
						} else {
							let errorItem = '', colorArr = ['#624BD3', '#0084FF', '#00D8EB', '#00F1AB'], countNum = 0;
							errorData = data.map((item, index) => {
								if (index > 3) {
									return
								}
								errorItem += `<div class="flexRow">
												<em class="legendBox" style="background-color: ${colorArr[index]};"></em><span
													class="legendName">${item.reason}</span><span class="legendNum">${item.count}</span><em
													class="legendUnit">次</em>
											</div>`;
								countNum += parseInt(item.count);
								return {
									value: item.count,
									name: item.reason
								}
							})

							$('#countNum').text(countNum);


							$('#errorHtml').html('<div class="posi50">' + errorItem + '</div>');
						}

						echarsComponent.getPieChars({
							elementId: 'alarmType',
							color: ['#624BD3', '#0084FF', '#00D8EB', '#00F1AB'],
							data: errorData,
							animation: false,
							tooltip: {
								show: false
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								}
							},
							silent: false
						})
					}
				}
			});
		},

		// 近30天报警恢复时间排行
		loadDevRealTimeList: function () {
			$.ajax({
				// url:hdInterface.chilledWaterSupplyAndReturnCopy,
				url: hdInterface.getRecoveryTimeRankingByDeviceIds,
				type: "post",
				data: {
					"deviceIds": this.deviceIds,
				},
				success: function (result) {
					if (result.code == 0) {
						var data = result.data || [];
						if (data.length == 0) {
							$('#alarmTime').html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
							// $('#humidity').hide()
							return;
						} else {
							let RankData = data.map((item) => {
								return {
									name: item.reason,
									total: item.time
								}
							})
							rank.processRank({
								selector: '#alarmTime',
								data: RankData,
								rank: 'total'
							})
						}
					}
				}
			});
		},

		// 切换菜单
		changeMenu: function (that) {
			$('.firstDiv .leftItem').click(function (e) {

				if ($(this).hasClass('itemActive')) {
					return;
				}
				if (unClickBtn) {
					return;
				}
				unClickBtn = true;
				let index = $(this).index();
				e.preventDefault();
				// 查找出所有激活状态的标题样式
				$('.firstDiv').find('.itemActive').removeClass('itemActive');
				// 添加当前点击的激活样式
				$(this).addClass('itemActive');
				roomTip = $(this).find('.text2').text();
				loadingCom.loading({ boxId: 'box1', timer: 2000, mask: true, title: '加载中' })
				changeRoom(roomTip);
				// 水球预警
				// that.inOutWater();
				// that.nowTemperHumidity();
			});
		}
	};

	// 切换房间状态
	function changeRoom(roomNo) {
		let roomDeviceIds = '';
		switch (roomNo) {
			case 'AHU1':
				roomDeviceIds = '913,914,915,916,917,918';
				break;
			case 'AHU2':
				roomDeviceIds = '924,923,922,921,920,919,901';
				break;
			case 'AHU3':
				roomDeviceIds = '930,929,928,927,926,925,902 ';
				break;
			case 'AHU4':
				roomDeviceIds = '936,935,934,933,932,931,903';
				break;
			case 'AHU5':
				roomDeviceIds = '942,941,940,939,938,937,904';
				break;
			case 'AHU6':
				roomDeviceIds = '948,947,946,945,944,943,905';
				break;
			case 'AHU7':
				roomDeviceIds = '954,953,952,951,950,949,906';
				break;
			default:
				roomDeviceIds = '';
				break;
		}
		$.post(hdInterface.selectDeviceDataByDeviceIds, {
			deviceIds: roomDeviceIds
		}, function (res) {
			if (res.code == 0) {
				let data = findPlctemp(res.data);
				let obj = roomObj(roomNo, data);
				$('#temp').html(data.temperature || '--');
				$('#hum').html(data.humidity || '--');
				$('#state1').html(deviceText(data.fan, data.fanText, data.fanAlarm, data.fanAlarmText));
				$('#state2').html(deviceText(data.humidifier, data.humidifierText));
				$('#state3').html(deviceText(data.electricHeating, data.electricHeatingText, data.electricHeatingAlarm, data.electricHeatingAlarmText));
				createRoom(obj);
				data.fanAlarm == 'd_alarm_type' ?
					$('.fs_ok').css({
						'animation': 'none'
					}) :
					(
						data.fan == 'stop_type' || data.fan == 'o_alarm_type' ?
							$('.fs_ok').css({
								'animation': 'none'
							}) : data.fan == 'start_type' || data.fan == 'normal_type' ?
								$('.fs_ok').css({
									'animation': 'turn 2s linear infinite'
								}) : '--'
					)
			}
			unClickBtn = false;
		})
	}

	function findPlctemp(data) {
		let plcObj = {
			temperature: null,
			temperatureText: null,
			humidity: null,
			humidityText: null,
			filter: null,
			filterText: null,
			electricHeating: null,
			electricHeatingText: null,
			electricHeatingAlarm: null,
			electricHeatingAlarmText: null,
			humidifier: null,
			humidifierText: null,
			surfaceCooler: null,
			surfaceCoolerText: null,
			fan: null,
			fanText: null,
			fanAlarm: null,
			fanAlarmText: null
		}
		let temperaturePlc = ['4639', '4650', '4659', '4668', '4677', '4686', '4704', '4695'],//温度plcIds
			humidityPlc = ['4643', '4651', '4660', '4669', '4678', '4687', '4705', '4696'],//湿度plcIds
			filterPlc = ['4647', '4646', '4657', '4666', '4675', '4684', '4702', '4693'],//过滤器plcIds
			electricHeatingPlc = ['4634', '4642', '4654', '4663', '4672', '4681', '4699', '4690'],//电加热运行plcIds
			electricHeatingAlarm = ['4635', '4644', '4655', '4664', '4673', '4682', '4700', '4691'],//电加热报警plcIds
			humidifierPlc = ['4636', '4645', '4656', '4665', '4674', '4683', '4701', '4692'],//加湿器plcIds
			surfaceCoolerPlc = ['4648', '4649', '4658', '4667', '4676', '4685', '4703', '4694'],//表冷器plcIds
			fanPlc = ['4632', '4640', '4652', '4706', '4670', '4679', '4697', '4688'],//风机运行plcIds
			fanAlarm = ['4633', '4641', '4653', '4662', '4671', '4680', '4698', '4689'];//风机报警plcIds
		data.forEach((item, index) => {
			// 温度
			if (temperaturePlc.includes(item.plctempId)) {
				plcObj.temperature = isNaN(item.refeText) ? '--' : item.refeText;
				plcObj.temperatureText = isNaN(item.refeText) ? '--' : item.refeText;
			}
			// 湿度
			if (humidityPlc.includes(item.plctempId)) {
				plcObj.humidity = isNaN(item.refeText) ? '--' : item.refeText;
				plcObj.humidityText = isNaN(item.refeText) ? '--' : item.refeText;
			}
			// 过滤器
			if (filterPlc.includes(item.plctempId)) {
				plcObj.filter = item.refeStatus;
				plcObj.filterText = item.refeText;
			}
			// 电加热运行
			if (electricHeatingPlc.includes(item.plctempId)) {
				plcObj.electricHeating = item.refeStatus;
				plcObj.electricHeatingText = item.refeText;
			}
			// 电加热报警
			if (electricHeatingAlarm.includes(item.plctempId)) {
				plcObj.electricHeatingAlarm = item.refeStatus;
				plcObj.electricHeatingAlarmText = item.refeText;
			}
			// 加湿器
			if (humidifierPlc.includes(item.plctempId)) {
				plcObj.humidifier = item.refeStatus;
				plcObj.humidifierText = item.refeText;
			}
			// 表冷器
			if (surfaceCoolerPlc.includes(item.plctempId)) {
				plcObj.surfaceCooler = item.refeStatus;
				plcObj.surfaceCoolerText = item.refeText;
			}
			// 风机运行
			if (fanPlc.includes(item.plctempId)) {
				plcObj.fan = item.refeStatus;
				plcObj.fanText = item.refeText;
			}
			// 风机报警
			if (fanAlarm.includes(item.plctempId)) {
				plcObj.fanAlarm = item.refeStatus;
				plcObj.fanAlarmText = item.refeText;
			}
		})
		return plcObj;
	}

	function roomObj(roomNo, data) {
		let roomObj = [];
		switch (roomNo) {
			case 'AHU1':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -90px;left: 48px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 540px;top: 80px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 390px;top: 80px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 936px;top: 370px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 880px;top: 80px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 700px;top: 370px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 370px;'
					},
					tip_imgBg: './imageIcu/purify1.png',
					fs_ok: 'top:240px;right:316px'
				}
				break;
			case 'AHU2':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -60px;left: 50px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 590px;top: -30px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 430px;top: -30px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 970px;top: 270px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: -30px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 720px;top: 270px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 270px;'
					},
					tip_imgBg: './imageIcu/purify2.png',
					fs_ok: 'top:135px;right:318px',
				}
				break;
			case 'AHU3':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -60px;left: 50px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 590px;top: -30px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 430px;top: -30px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 970px;top: 270px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: -30px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 720px;top: 270px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 270px;'
					},
					tip_imgBg: './imageIcu/purify3.png',
					fs_ok: 'top:135px;right:318px',
				}
				break;
				break;
			case 'AHU4':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -60px;left: 50px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 590px;top: -30px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 430px;top: -30px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 970px;top: 270px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: -30px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 720px;top: 270px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 270px;'
					},
					tip_imgBg: './imageIcu/purify4.png',
					fs_ok: 'top:135px;right:318px',
				}
				break;
				break;
			case 'AHU5':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -60px;left: 50px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 590px;top: -30px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 430px;top: -30px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 970px;top: 270px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: -30px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 720px;top: 270px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 270px;'
					},
					tip_imgBg: './imageIcu/purify5.png',
					fs_ok: 'top:135px;right:318px',
				}
				break;
				break;
			case 'AHU6':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -60px;left: 50px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 590px;top: -30px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 430px;top: -30px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 970px;top: 270px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: -30px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 720px;top: 270px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 270px;'
					},
					tip_imgBg: './imageIcu/purify6.png',
					fs_ok: 'top:135px;right:318px',
				}
				break;
				break;
			case 'AHU7':
				roomObj = {
					tip_1: {
						temperature: data.temperature,
						humidity: data.humidity,
						style: 'min-width: 160px;top: -90px;left: 60px;'
					},
					tip_2: {
						html: deviceState(data.electricHeating, data.electricHeatingText, '电加热', data.electricHeatingAlarm, data.electricHeatingAlarmText),
						style: 'min-width: 120px;right: 540px;top: 80px;'
					},
					tip_3: {
						html: deviceState(data.humidifier, data.humidifierText, '加湿器'),
						style: 'min-width: 120px;right: 390px;top: 80px;'
					},
					// tip_4: {
					// 	html:'初效过滤器：<img src="./imageIcu/statusStart.png" />运行',
					// 	style:'min-width: 150px;right: 936px;top: 370px;'
					// },
					tip_5: {
						html: deviceState(data.filter, data.filterText, '初/中效过滤器'),
						style: 'min-width: 150px;right: 900px;top: 80px;'
					},
					tip_6: {
						html: deviceState(data.surfaceCooler, data.surfaceCoolerText, '表冷器'),
						style: 'min-width: 120px;right: 700px;top: 370px;'
					},
					tip_7: {
						html: deviceState(data.fan, data.fanText, '风机', data.fanAlarm, data.fanAlarmText),
						style: 'min-width: 120px;right: 230px;top: 370px;'
					},
					tip_imgBg: './imageIcu/purify7.png',
					fs_ok: 'top:240px;right:316px'
				}
				break;
			default:
				break;
		}
		return roomObj;
	}

	function createRoom(roomObj) {
		$('.tip_1').attr('style', roomObj.tip_1.style);
		$('#temperatureText').html(roomObj.tip_1.temperature || '--');
		$('#humidityText').html(roomObj.tip_1.humidity || '--');
		$('.tip_2').attr('style', roomObj.tip_2.style).html(roomObj.tip_2.html);
		$('.tip_3').attr('style', roomObj.tip_3.style).html(roomObj.tip_3.html);
		// $('.tip_4').attr('style',roomObj.tip_4.style).html(roomObj.tip_4.html);
		$('.tip_5').attr('style', roomObj.tip_5.style).html(roomObj.tip_5.html);
		$('.tip_6').attr('style', roomObj.tip_6.style).html(roomObj.tip_6.html);
		$('.tip_7').attr('style', roomObj.tip_7.style).html(roomObj.tip_7.html);
		$('.pipeDiv img.pipebg').attr('src', roomObj.tip_imgBg);
		$('.fs_ok').attr('style', roomObj.fs_ok);
	}

	function deviceState(S, St, name, F, Ft) {
		return F ? (
			F == 'd_alarm_type' ?
				`${name}：<img src="./imageIcu/statusError.png" /><span style="color:#ff4444;">${Ft}</span>` :
				(
					S == null ? `${name}：--` : S == 'stop_type' || S == 'o_alarm_type' ?
						`${name}：<img src="./imageIcu/statusStop.png" /><span style="color:#999;">${St}</span>` :
						S == 'start_type' || S == 'normal_type' ?
							`${name}：<img src="./imageIcu/statusStart.png" />${St}` : St
				)
		) : (
			S == null ? `${name}：--` : S == 'stop_type' || S == 'o_alarm_type' ?
				`${name}：<img src="./imageIcu/statusStop.png" /><span style="color:#999;">${St}</span>` :
				S == 'start_type' || S == 'normal_type' ?
					`${name}：<img src="./imageIcu/statusStart.png" />${St}` : St
		)
	}
	function deviceText(S, St, F, Ft) {
		return F ? (
			F == 'd_alarm_type' ?
				`<span style="color: #ff4444;">${Ft}</span>` :
				(
					S == null ? '--' : S == 'stop_type' || S == 'o_alarm_type' ?
						`<span style="color: #999;">${St}</span>` :
						S == 'start_type' || S == 'normal_type' ?
							`<span style="color: #18D991;">${St}</span>` : St
				)
		) : (
			S == null ? '--' : S == 'stop_type' || S == 'o_alarm_type' ?
				`<span style="color: #999;">${St}</span>` :
				S == 'start_type' || S == 'normal_type' ?
					`<span style="color: #18D991;">${St}</span>` : St
		)
	}
	return Cdoas;
})(jQuery);

new Cdoas()
