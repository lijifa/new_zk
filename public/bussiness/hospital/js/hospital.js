/*
* 科教楼
*/
var Hospital = (function ($) {
    function Hospital() {
        // 容器
        this.hospitalSiteId = getParams()['siteId'] || 32;
        this.oneceload = 0,  //是否第一次加载
            this.init();
    }

    // 判断设备状态
    function getDevStatus(fault, state) {
        let devStatusObj = {
            stateIcon: '<img class="statusIcon" src="./imageIcu/statusStop.png" />',
            stateText: '设备离线',
            stateBg: 'rightItemOff'
        }
        switch (fault) {
            case '-1':   //离线
                devStatusObj = {
                    stateIcon: '<img class="statusIcon" src="./imageIcu/statusStop.png" />',
                    stateText: '设备离线',
                    stateBg: 'rightItemOff'
                }
                break;
            case '0':   //正常
                if (state == 1) {
                    devStatusObj = {
                        stateIcon: '<img class="statusIcon" src="./imageIcu/statusStart.png" />',
                        stateText: '正常运行',
                        stateTextColor: 'green'
                    }
                } else {
                    devStatusObj = {
                        stateIcon: '<img class="statusIcon" src="./imageIcu/statusStop.png" />',
                        stateText: '停止运行',
                        stateBg: 'rightItemOff'
                    }
                }

                break;
            case '1':   //故障
                devStatusObj = {
                    stateIcon: '<img class="statusIcon" src="./imageIcu/statusError.png" />',
                    stateText: '设备报警',
                    stateBg: 'rightItemErr',
                    stateTextColor: 'red'
                }
                break;
            default:
                devStatusObj = {
                    stateIcon: '<img class="statusIcon" src="./imageIcu/statusStop.png" />',
                    stateText: '设备离线',
                    stateBg: 'rightItemOff'
                }
                break;
        }
        return devStatusObj;
    }

    // 判断设备类型
    function getDevType(devType) {
        let devObj = {
            devTypeName: '--',
            devTypeImg: '<img src="./imageHospital/xunhuanshuibeng.png" />'
        }
        switch (devType) {
            case 146:   //风冷模块
                devObj = {
                    devTypeName: '风冷模块',
                    devTypeImg: '<img src="./imageHospital/fengleng.png" />'
                }
                break;
            case 148:   //循环水泵
                devObj = {
                    devTypeName: '循环水泵',
                    devTypeImg: '<img src="./imageHospital/xunhuanshuibeng.png" />'
                }
                break;
            case 150:   //补水泵
                devObj = {
                    devTypeName: '补水泵',
                    devTypeImg: '<img src="./imageHospital/bushuibeng.png" />'
                }
                break;
        }
        return devObj;
    }

    Hospital.prototype = {

        constructor: Hospital,

        init: function () {
            // 当日能耗
            this.todayElectric();
            // 当日供回水监测
            this.inOutWater();
            // 补水箱水位实时监测
            this.WaterBoxRealValue();
            //冷冻水实时数据监控
            this.chilledReturnWaterPressure()
            //设备实时状态监测
            this.deviceRealTimeStatus()

            let that = this
            let time = null;
            time = setInterval(function () {
                that.todayElectric();
                that.inOutWater();
                that.WaterBoxRealValue()
                that.chilledReturnWaterPressure()
                that.deviceRealTimeStatus()
                that.oneceload++
                // console.log(that.oneceload)
                console.log('shuaxin科教楼');
            }, 60 * 1000);
            var lay_id = '';
            lay_id = $($($($(window)[0]['frameElement']).parents()[2]).children('.layui-tab-title')).children('.layui-this').attr('lay-id');
            var layuiId = getParams()["layuiId"]; //标签id
            var objName = layuiId;
            document.addEventListener("visibilitychange", function () {
                if (document.visibilityState == 'hidden') {
                    clearInterval(time);
                    console.log('取消shuaxin科教楼');
                } else {
                    if (lay_id == objName) {
                        console.log(lay_id);
                        console.log(objName);
                        time = setInterval(function () {
                            that.todayElectric();
                            that.inOutWater();
                            that.WaterBoxRealValue()
                            that.chilledReturnWaterPressure()
                            that.deviceRealTimeStatus()
                            that.oneceload++
                            // console.log(that.oneceload)
                            console.log('shuaxin科教楼');
                        }, 60 * 1000);
                    }
                }
            });
            //刷新
            window.onunload = function () {
                // top.unregisterListener(objName); //销毁
            }
            // 标签切换
            // top.registerListener(objName, function(e) {
            // 	// console.log('objName===sit-115',objName);
            // 	// console.log('e===sit-115',e);
            // 	if(e == objName){
            // 		// that.inOutWater();
            // 		// that.WaterBoxRealValue();
            // 		time = setInterval(function () {
            // 		    that.todayElectric();
            // 		    that.inOutWater();
            // 		    that.WaterBoxRealValue()
            // 		    that.chilledReturnWaterPressure()
            // 		    that.deviceRealTimeStatus()
            // 		    that.oneceload++
            // 		    // console.log(that.oneceload)
            // 			console.log('shuaxin科教楼');
            // 		}, 60 * 1000);
            // 	} else {
            // 		lay_id = $($($($(window)[0]['frameElement']).parents()[2]).children('.layui-tab-title')).children('.layui-this').attr('lay-id');
            // 		console.log(lay_id);
            // 		clearInterval(time);
            // 		console.log('取消shuaxin科教楼');
            // 	}
            // }); //注册
        },
        //当日能耗
        todayElectric: function () {
            $.post(hdInterface.selectElectricAndWaterTodayModule, {
                'siteId': this.hospitalSiteId,
                'timeCode': '0'
            }, function (data) {
                if (data['code'] === 0) {
                    // console.log(data);
                    $('#electricVal').html(convert(data.data.energy))
                    $('#flowVal').html(convert(data.data.flow))
                }
            })
        },
        // 当日供回水监测
        inOutWater: function () {
            $.post(hdInterface.wqchilledWaterSupplyAndReturn, {
                'siteId': this.hospitalSiteId
            }, function (data) {
                if (data['code'] === 0) {
                    // console.log(data)
                    var timerX = []
                    var dataY1 = data.data.dataY.split(',')
                    var dataY2 = data.data.dataY2.split(',')
                    data.data.dataX.split(',').forEach((item, index) => {
                        timerX.push(item + ":00");
                    })
                    //                  let lineParam = {
                    //                      dataX: data.data.dataX,
                    //                      yUnit: '℃',
                    // borderColor:'rgba(3,27,51,0.9)',
                    // fontColor: '#0bbeff',
                    //                      line_1: {
                    //                          lineText: '供水温度',
                    //                          dataY: data.data.dataY,
                    //                          lineColor: '#FF8309'
                    //                      },
                    //                      line_2: {
                    //                          lineText: '回水温度',
                    //                          dataY: data.data.dataY2,
                    //                          lineColor: '#0993FF'
                    //                      },
                    //                      grid: {
                    //                          top: '24px',
                    //                          right: '20px',
                    //                          left: '40px',
                    //                          bottom: '24px'
                    //                      },
                    //                  }

                    // let lineObj = new HDline('inOutWaterTemperature', lineParam)
                    // lineObj.createLine();
                    // inOutWaterTemperature(datax, lineData1, lineData2)
                    echarsComponent.getLine({
                        "elementId": "inOutWaterTemperature",//容器id	[必填]
                        xdata: timerX,//横坐标数据[必填]
                        ydata: [dataY1, dataY2],//纵坐标数据[必填]
                        linecolors: ['#FF8309', '#0993FF'],//线颜色[非必填]
                        // areaStyleOpacity:0.1,//区域颜色[非必填]
                        // interval:2,//间隔[非必填]
                        // "dataZoom":{
                        // "isScroll":true,//是否可以自动切换[非必填]
                        // "endValue":2//显示个数，长度是当前数字+2个[非必填]
                        //  },
                        // "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
                        // "labelColor":'#a5eaff',//坐标轴文字颜色
                        "unit": "℃",//单位
                        "yAxisMinInterval": 1,
                        "grid": {
                            left: '20px',
                            right: '20px',
                            bottom: '15px',
                            top: '25px',
                        },//边距[非必填]
                    })
                }
            })
        },
        //补水箱水位实时监测
        // waterLevel: function (_datay=0, maxHeight=4) {
        //              var chartWaterLevel = echarts.init(document.getElementById('waterLevel'));
        //              var datay = 0;
        //              if (_datay) {
        //                  datay = _datay/maxHeight;
        //              }

        //              option = {
        //                  graphic: [{
        //                      type: 'group',
        //                      left: 'center',
        //                      top: '60%',
        //                      children: [{
        //                          type: 'text',
        //                          z: 100,
        //                          left: '10',
        //                          top: 'middle',
        //                          style: {
        //                              fill: '#19d1ff',
        //                              //text: '水位统计',
        //                              font: '20px Microsoft YaHei'
        //                          }
        //                      }]
        //                  }],
        //                  series: [{
        //                      type: 'liquidFill',
        //                      radius: '80%',
        //                      center: ['50%', '50%'],
        //                      shape: 'rect',
        //                      data: [datay, datay, datay],
        //                      backgroundStyle: {
        //                          color: 'rgba(5,6,8,0.8)',
        //                          // color: {
        //                          //     type: 'linear',
        //                          //     x: 1,
        //                          //     y: 0,
        //                          //     x2: 0.5,
        //                          //     y2: 1,
        //                          //     colorStops: [{
        //                          //         offset: 1,
        //                          //         color: 'rgba(68, 145, 253, 0)'
        //                          //     }, {
        //                          //         offset: 0.5,
        //                          //         color: 'rgba(68, 145, 253, .25)'
        //                          //     }, {
        //                          //         offset: 0,
        //                          //         color: 'rgba(68, 145, 253, 1)'
        //                          //     }],
        //                          //     globalCoord: false
        //                          // },
        //                      },
        //                      outline: {
        //                          show: false
        //                      },
        //                      color: {
        //                          type: 'linear',
        //                          x: 0,
        //                          y: 0,
        //                          x2: 0,
        //                          y2: 1,
        //                          colorStops: [{
        //                              offset: 1,
        //                              color: 'rgba(58, 71, 212, 0)'
        //                          }, {
        //                              offset: 0.5,
        //                              color: 'rgba(31, 222, 225, .2)'
        //                          }, {
        //                              offset: 0,
        //                              color: 'rgba(31, 222, 225, 1)'
        //                          }],
        //                          globalCoord: false
        //                      },
        //                      label: {
        //                          normal: {
        //                              formatter: '',
        //                          }
        //                      }
        //                  }]
        //              };
        //              chartWaterLevel.setOption(option);
        //          },

        //          // 补水箱水位实时监测
        WaterBoxRealValue: function () {
            let that = this
            $.post(hdInterface.selectWaterBoxRealValue, {
                'siteId': this.hospitalSiteId
            }, function (data) {
                // console.log(data)
                if (data['code'] === 0) {
                    var val = data.data.refeValue;
                    // var datay = data.data.dataY;
                    // var datay2 = data.data.dataY2;
                    // that.waterLevel(val)
                    let param1 = {
                        style: {
                            width: '210px',//图形宽
                            height: '210px'//图形高
                        },
                        deep: '6',//最大值
                        datay: val,
                        axisShow: {
                            left: {
                                data: [0, 1, 2, 3, 4, 5, 6],
                                unit: 'm'
                            },
                        }
                    }
                    let obj1 = new waterLevel('waterLevel', param1)
                }
            })
        },

        //室外湿度，温度
        nowTemperHumidity: function () {
            var proId = getParams()['projectId'];
            $.ajax({
                url: baseurl + "wisdom/zgendstatistics/selectTemperatureAndHumidity",
                type: "post",
                data: {
                    // "projectId":12
                    "projectId": proId
                },
                success: function (data) {
                    if (data.code == 0) {
                        var res = data.data || [];
                        var temperature = res["temperature"] || "--"; //温度
                        var humidity = res["humidity"] || "--"; //湿度
                        $("#temperature").html(temperature);
                        $("#humidity").html(humidity);
                    }
                }
            });
        },

        //冷冻水实时数据监控
        chilledReturnWaterPressure: function () {
            $.post(hdInterface.selectWaterAndReturnRealValue, {
                'siteId': this.hospitalSiteId
            }, function (data) {
                if (data['code'] === 0) {
                    $('#chilledReturnWaterPressure').html(convert(data.data.chilledReturnWaterPressure))
                    $('#chilledReturnWaterTemperature').html(convert(data.data.chilledReturnWaterTemperature))
                    $('#chilledWaterSupplyPressure').html(convert(data.data.chilledWaterSupplyPressure))
                    $('#chilledWaterSupplyTemperature').html(convert(data.data.chilledWaterSupplyTemperature))
                }
            })
        },

        //设备实时状态监测
        deviceRealTimeStatus: function () {
            let that = this
            $.post(hdInterface.deviceRealTimeStatus, {
                'siteId': this.hospitalSiteId
            }, function (data) {
                if (data['code'] === 0) {
                    var devData = data.data
                    if (devData.length == 0) {
                        $("#devList").html('<div class="nodata"><img src="../../common/image/nodata.png" class="nodateimg"></div>');
                        return;
                    }
                    var htmlTpl = ''
                    devData.map((item) => {
                        htmlTpl += that.devHtmlTpl(item)
                    })
                    $('#devList').html(htmlTpl)
                }
            })
        },
        // 设备单项模板
        devHtmlTpl: function (data) {
            var fault = data.fault,
                state = data.state,
                title = data.plate,
                devType = data.deviceTypeId,
                devTypeImg = '',
                stateIcon = '',
                stateText = '',
                stateTextColor = '',
                stateBg = '';

            // 获取设备状态对象
            let statusObj = getDevStatus(fault, state);
            stateBg = statusObj.stateBg
            stateText = statusObj.stateText
            stateTextColor = statusObj.stateTextColor
            stateIcon = statusObj.stateIcon

            // 获取设备类型图片
            devTypeImg = getDevType(devType).devTypeImg;

            var htmlTpl = '<div class="rightItem ' + stateBg + '">'
            htmlTpl += '<div class="itemImg">'
            htmlTpl += devTypeImg
            htmlTpl += '</div>'
            htmlTpl += '<div>'
            htmlTpl += '<div class="itemText_1">' + title + '</div>'
            htmlTpl += '<div>' + stateIcon + '<span class="itemText_2 ' + stateTextColor + '">' + stateText + '</span></div>'
            htmlTpl += '</div>'
            htmlTpl += '</div>'
            return htmlTpl;
        }
    };
    return Hospital;
})(jQuery);

new Hospital()
