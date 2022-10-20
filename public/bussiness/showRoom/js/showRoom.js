var showRoom = {};
let timer = null;
//屏蔽右键菜单
document.oncontextmenu = function () {
		event.returnValue = false;
	}
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == 'hidden') {
    clearInterval(timer);
    // clearInterval(timer1);
  } else {
    timer = setInterval(function () {
      showRoom.timeAndWeather();
    }, 5 * 1000);
  }
});
var objName = parent.layuiId;
//刷新
window.onunload = function () {
  // top.unregisterListener(objName); //销毁
  clearInterval(timer);
  sessionStorage.removeItem('OffLineDevices');
  // clearInterval(timer1);
}
// 转圈
window.onload = function () {
  loadingCom.loading({
    boxId: 'outLineDev',
    timer: 10000,
    mask: false,
    title: ' ',
    type: '3'
  });
  // loadingCom.loading({boxId: 'DevCount',timer: 500000,mask: false,title: ' ',type: '3'});
}


//标签切换
// top.registerListener(objName, function (e) {
//   showRoom.sevenDayRecording(); //近7天历史预警记录
// }); //注册

showRoom.u3dinit = function (gameInstance) {
  // showRoom.sendMessageToU3d(sessionStorage.getItem("showRoomData"));
  //js给u3d发送数据
  showRoom.sendMessageToU3d = function (obj) {
    gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "3000," + obj);
  }
  testFun()
  showRoom.realTimeSendMsg(); //实时数据推送
  showsliderBar();
  // 初始设置展厅模式
  //$('.rightItem').eq(3).click();
}
// showRoom.GetJsSessionStorage=function(){
// 	return JSON.stringify(sessionStorage.getItem("showRoomData"));	
// }
function showsliderBar() {
  $(".bottomBar").animate({
    bottom: "0px"
  }, 300);
  $(".rightBar").animate({
    right: "20px"
  }, 300);

}
showRoom.init = function () {
  showRoom.leftBar(); //收起展开左侧表格
  showRoom.fullMask(); //蒙层
  showRoom.popUps();
  showRoom.realTimeIndoor(); //实时室内
  showRoom.severDayOutdoorTemperature(); //近7天室外温度变化
  showRoom.severDayIndoorTemperature(); //近7天室内温度变化
  showRoom.sevenDayDistributed(); //近7天室内人体舒适度分布
  showRoom.sevenDayRecording(); //近7天历史预警记录
  showRoom.timeAndWeather(); //时间天气
  showRoom.rightBtnChange(); //右侧场景按钮切换
  timer = setInterval(function () {
    showRoom.timeAndWeather();
  }, 5 * 1000);
  showRoom.oneMinutesUpdate();
  let eRoomU3d = '<iframe src="./eRoom/index.html" width="100%" frameborder="0" style="height:100%"></iframe>';
  $(".layui-layout-body").prepend(eRoomU3d);
};
// 一分钟更新
showRoom.oneMinutesUpdate = function () {
  timer1 = setInterval(function () {
    showRoom.realTimeIndoor(); //实时室内
    showRoom.severDayOutdoorTemperature(); //近7天室外温度变化
    showRoom.severDayIndoorTemperature(); //近7天室内温度变化
    showRoom.sevenDayDistributed(); //近7天室内人体舒适度分布
    showRoom.sevenDayRecording(); //近7天历史预警记录
  }, 60 * 1000)
}
//收起展开左侧表格
showRoom.leftBar = function () {
  let leftBar = new SlideMenu({
    direction: "left",
    menuBtn: ".leftLine",
    menuBox: ".leftBarOut",
    bgMask: false,
    menuSetPosition: [0, -720],
    btnSetposition: [740, 20],
    bgDrop: 5,
    callBackFun: function (e) {
      if (e) {
        $(".leftLine i").addClass("layui-icon-left").removeClass("layui-icon-right");
      } else {
        $(".leftLine i").removeClass("layui-icon-left").addClass("layui-icon-right");
      }
    },
  });
};
//蒙层
showRoom.fullMask = function () {
  $("#showFullMask").on("click", function () {
    //读取数据
    setDefaultParam();

    $(".fullMask").show();
    // $('.fullMask').css({
    // 	width:'100%',
    // 	height:'100%',
    // })
    setTimeout(function () {
      $(".control").css({
        width: "870px",
        height: "475px",
      });
    }, 10);
  });
  // $(".fullMask").on("click", function (e) {
  //   let _con = $(".control");
  //   if (!_con.is(e.target) && _con.has(e.target).length === 0) {
  //     // $('.fullMask').hide();
  //     // $('.fullMask').css({
  //     // 	width:'0%',
  //     // 	height:'0%',
  //     // })
  //     $(".control").css({
  //       width: "0",
  //       height: "0",
  //     });
  //     setTimeout(function () {
  //       $(".fullMask").hide();
  //     }, 500);
  //   }
  // });
  $(".supplyBtn").on("click", function () {
    // $('.fullMask').css({
    // 	width:'0%',
    // 	height:'0%',
    // })
    $(".control").css({
      width: "0",
      height: "0",
    });
    setTimeout(function () {
      $(".fullMask").hide();
    }, 500);
  });
  $(".close").on("click", function () {
    // $('.fullMask').css({
    // 	width:'0%',
    // 	height:'0%',
    // })
    $(".control").css({
      width: "0",
      height: "0",
    });
    setTimeout(function () {
      $(".fullMask").hide();
    }, 500);
  });
};
//实时室内
showRoom.realTimeIndoor = function () {
  $.get(hdInterface.selectRealEnvironment, {}, function (data) {
    // data={
    // "dataY":"null,36.6,2,null,null,null,null",
    // "dataX":"17:20,17:30,17:40,17:50,18:00,18:10,18:20",
    // "dataY2":"null,11,2,null,null,null,null",
    // "dataY3":"null,11,2,null,null,null,null",
    // }
    if (JSON.stringify(data) == "{}") {
      $("#realTimeIndoorTemperature .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata" style="top:50%;">
			`);
      $("#realTimeIndoorhur .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata" style="top:50%;">
			`);
      $("#lightChange .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata" style="top:50%;">
			`);
    } else {
      let dataX = data.dataX ? data.dataX.split(",") : [];
      let dataY = data.dataY ? data.dataY.split(",") : [];
      let dataY2 = data.dataY2 ? data.dataY2.split(",") : [];
      let dataY3 = data.dataY3 ? data.dataY3.split(",") : [];

      // let dataX = data.dataX.split(",");
      // let dataY = data.dataY.split(",");
      // let dataY2 = data.dataY2.split(",");
      // let dataY3 = data.dataY3.split(",");
      //实时室内温度变化
      echarsComponent.getLineShadow({
        elementId: "realTimeIndoorTemperature",
        xdata: dataX,
        ydata: [dataY],
        linecolors: ["rgb(1,187,255)"],
        areaStyleOpacity: 0.5,
        // unit:'℃',
        yAxisMin: 0,
        yAxisMinInterval: 10,
        grid: {
          bottom: "0",
          top: "10px",
          right: "20px",
          left: "20px",
        },
        offectTop: "rgba(1,187,255,1)",
        offectMiddle: "rgba(1,187,255,.5)",
        offectBottom: "rgba(1,187,255,.2)",
        boundaryGap: true,
        interval: 0
      });
      //实时室内湿度变化
      echarsComponent.getLineShadow({
        elementId: "realTimeIndoorhur",
        xdata: dataX,
        ydata: [dataY2],
        linecolors: ["rgb(1,187,255)"],
        areaStyleOpacity: 0.5,
        // unit:'%',
        yAxisMin: 0,
        yAxisMinInterval: 10,
        grid: {
          bottom: "0",
          top: "10px",
          right: "20px",
          left: "20px",
        },
        offectTop: "rgba(1,187,255,1)",
        offectMiddle: "rgba(1,187,255,.5)",
        offectBottom: "rgba(1,187,255,.2)",
        boundaryGap: true,
        interval: 0
      });
      //实时室内PM2.5变化
      echarsComponent.getBarChars({
        elementId: "lightChange",
        xdata: dataX,
        ydata: [dataY3],
        barWidth: 10,
        yAxisMin: 0,
        yAxisMinInterval: 10,
        // units:'μg/m³',
        grid: {
          top: "10px",
          bottom: "0",
          right: "10px",
          left: "20px",
        },
        provideNumber: 5,
        colorGradient: [{
          // startColor: "rgba(19, 174, 255,1)",
          // endColor: "rgba(23, 41, 93, 1)",			
          startColor: "rgba(1,187,255,0.6)",
          endColor: "rgba(19, 174, 255, 1)"
        }],
        interval: 0,
      });
    }
  });
};
//近7天室外温度变化
showRoom.severDayOutdoorTemperature = function () {
  $.get(hdInterface.selectOutTemperatureHistory, {}, function (data) {
    if (JSON.stringify(data) == "{}") {
      $("#severDayOutdoorTemperature .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata" style="top:50%;">
			`);
      $(".lightNing").hide();
    } else {
      $(".lightNing").show();
      let dataX = data.dataX.split(",");
      let dataY = data.dataY.split(",");
      let dataY2 = data.dataY2.split(",");
      echarsComponent.getLine({
        elementId: "severDayOutdoorTemperature",
        xdata: dataX,
        ydata: [dataY, dataY2],
        ydataTitle: ["最高气温", "最低气温"],
        linecolors: ["rgb(1,187,255)", "rgb(0,255,255)"],
        // unit:'℃',
        yAxisMin: 0,
        yAxisMinInterval: 10,
        grid: {
          bottom: "0",
          top: "25px",
          right: "20px",
        },
        boundaryGap: true,
        interval: 0,
      });
    }
  });
};
//近7天室内温度变化
showRoom.severDayIndoorTemperature = function () {
  $.get(hdInterface.selectInTemperatureHistory, {}, function (data) {
    if (JSON.stringify(data) == "{}") {
      $("#severDayIndoorTemperature .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata" style="top:50%;">
			`);
    } else {
      let dataX = data.dataX ? data.dataX.split(",") : [];
      let dataY = data.dataY ? data.dataY.split(",") : [];
      echarsComponent.getLineShadow({
        elementId: "severDayIndoorTemperature",
        xdata: dataX,
        ydata: [dataY],
        linecolors: ["rgb(1,187,255)"],
        areaStyleOpacity: 0.5,
        // unit:'℃',
        yAxisMin: 0,
        yAxisMinInterval: 10,
        grid: {
          bottom: "0",
          top: "10px",
          right: "20px",
          left: "5px",
        },
        offectTop: "rgba(1,187,255,1)",
        offectMiddle: "rgba(1,187,255,.5)",
        offectBottom: "rgba(1,187,255,.2)",
        boundaryGap: true,
        interval: 0
      });
    }
  });
};
/* 
//末端面板实时列表
showRoom.endingList = function(){
	let params = {
		title:['名称','风速','温度','状态'],
		list:[
			{name:'面板一号',stup:'高',temper:'32.5℃',state:changeIcon(1)},
			{name:'面板二号',stup:'低',temper:'30.5℃',state:changeIcon(0)},
			{name:'面板三号',stup:'中',temper:'31.2℃',state:changeIcon(1)},
			{name:'面板四号',stup:'中',temper:'33.6℃',state:changeIcon(1)},
		]
	}
	let list = new listRollNew('list',params);
} */
//近7天室内人体舒适度分布
showRoom.sevenDayDistributed = function () {
  $.get(hdInterface.selectComfortHistory, {}, function (data) {
    $("#comfortable").html(convert(data.comfortable));
    $("#moreComfortable").html(convert(data.moreComfortable));
    $("#unComfortable").html(convert(data.unComfortable));
    echarsComponent.getPieChars({
      elementId: "sevenDayDistributed",
      data: [{
          value: data.comfortable,
          name: "舒适",
        },
        {
          value: data.moreComfortable,
          name: "较舒适",
        },
        {
          value: data.unComfortable,
          name: "不舒适",
        },
      ],
      color: ["#00ffff", "#0DC97C", "#137DFF"],
      animation: false,
      tooltip: {
        show: false,
      },
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      },
      silent: false,
    });
  });
};
//近7天历史预警记录
showRoom.sevenDayRecording = function () {
  $.get(hdInterface.selectWarnHistory, {}, function (data) {
    if (data.length == 0) {
      $("#sevenDayRecording .hd-loadmask").html(`
				<img src="../../common/image/nodata.png" class="nodata">
			`);
      $("#faultList").html("暂无数据");
    } else {
      let params = {
        title: ["预警原因", "发生时间"],
        list: [],
      };
      params.list = data;
      let sevenDayRecording = new listRollNew("sevenDayRecording", params);

      let faultparams = {
        title: [],
        list: [],
      };
      faultparams.list = data;
      //let topList = new listRollNew("faultList", faultparams);
      let topList = new SuperSlideList({
        selector: '#faultList', //容器
        data: faultparams.list,
        effect: 'upLoop',
        speed: 2000,
      })
    }
  });
};
//时间天气
showRoom.timeAndWeather = function () {
  $.get(hdInterface.selectRealWeather, {}, function (data) {
    $('#time').html(convert(data.time));
    $('#weather').html(convert(data.weather));
  })
}
//右侧场景按钮切换
function changeIconItem(thisObj) {
  for (let i = 0; i < $(".rightItem").length; i++) {
    let img = $(".rightItem").eq(i).attr("style");
    img = img.replace(/B.png/, "G.png");
    $(".rightItem").eq(i).attr("style", img);
  }
  thisObj.addClass("openicon").siblings().removeClass("openicon");
  let backgroundImage = $(".openicon").attr("style");
  backgroundImage = backgroundImage.replace(/G.png/, "B.png");
  $(".openicon").attr("style", backgroundImage);
}
showRoom.rightBtnChange = function () {
  $(".rightItem").on("click", debounce(function () {
    changeIconItem($(this))
    let clickItem = $(this).index();

    // 设置模式
    if (clickItem != 4) {
      let clickIndex = clickItem + 1;
      setMode(clickIndex)
    }
  }, 500));

};

//弹窗
showRoom.popUps = function () {
  // $('.outline').hover(function () {
  //   $('.popUps').css({
  //     'display': 'block'
  //   })
  // }, function () {
  //   $('.popUps').css({
  //     'display': 'none'
  //   })
  // })
  let flag = true;
  $('.outline').on('click',function () {
    if(flag){
      $('.popUps').css({
        'display': 'block'
      })
    } else {
      $('.popUps').css({
        'display': 'none'
      })
    }
    flag = !flag
  })
}
//实时数据推送
showRoom.realTimeSendMsg = function () {

  if (typeof EventSource !== "undefined") {
    var eventSource = new EventSource("/showroom/ih/connect");
    // var eventSource = new EventSource("a");
    var timestr = new Date();
    // showRoom.sendMessageToU3d(sessionStorage.getItem("showRoomData"));//实时给u3d发消息
    // 监听服务器返回数据
    // eventSource.onmessage = function (event) {
    //   console.log(event.data);
    // };
    eventSource.addEventListener("temperature", function (event) {
      // console.log("温度：", event.data);
      $("#temperature").html(convert(event.data));
    });
    eventSource.addEventListener("humidity", function (event) {
      // console.log("湿度：", event.data);
      $("#humidity").html(convert(event.data));
    });
    eventSource.addEventListener("pm2.5", function (event) {
      // console.log("pm2.5：", event.data);
      $("#PM").html(convert(event.data));
    });
    eventSource.addEventListener("comfort", function (event) {
      // console.log("舒适度：", event.data);
      let obj = JSON.parse(event.data);
      $("#comfort").html(convert(obj.name));
	  if(obj.name.indexOf("不")!=-1){
		  $("#shushi_img").css('background-image','url(./image/bushushi.png)');
		  $("#comfort").css("color","#ff6047");
	  }
	   if(obj.name.indexOf("较")!=-1){
	  		  $("#shushi_img").css('background-image','url(./image/jiaoshushi.png)');
			  $("#comfort").css("color","#ffd000");
	  }
    });
    eventSource.addEventListener("fanCoilUnit", function (event) {
      let obj = JSON.parse(event.data);
      var myDate = new Date();
      var mytime = myDate.toLocaleTimeString(); //获取当前时间
      // console.log('风机盘管监听' + obj.deviceId + '：==============' + mytime)
      // console.log(obj)
      if (obj.Online == 'off') {
        obj['devStatus'] = 0
        offLine(obj, 2)
      } else {
        onLine(obj, 2)
        obj['devStatus'] = 1
        saveControlData(obj);
      }
      // console.log("风机盘管监听：", obj);
      $("#device" + obj.deviceId + " li")
        .eq(1)
        .html(speedWind(obj.windSpeed));
      $("#device" + obj.deviceId + " li")
        .eq(2)
        .html(convert(obj.settingTemperature));
      $("#device" + obj.deviceId + " li")
        .eq(3)
        .html(changeIcon(obj.switchMode));
      // {"mode":0,"settingTemperature":0.0,"address":"/192.168.1.34","realTimeTemperature":0.0,"centralControlId":2,"updateTime":1619158477805,"windSpeed":1,"deviceId":2,"switchMode":0}
    });
    eventSource.addEventListener("light", function (event) {

      let obj = JSON.parse(event.data);
      let data
      var myDate = new Date();
      var mytime = myDate.toLocaleTimeString(); //获取当前时间
      // console.log('灯光' + obj.deviceId + '：==============' + mytime)
      // console.log('灯光' + obj.deviceId + '：', obj);
      // 设置开关状态
      if (obj.brightness > 0) {
        obj['switchMode'] = 1
      } else if (obj.brightness == 0) {
        obj['switchMode'] = 0
      } else {
        obj['switchMode'] = 9
      }

      onLine(obj, 1)
      obj['devStatus'] = 1
      saveControlData(obj, 1);
      /*      {"mode":2,"address":"/127.0.0.1","brightness":70,"centralControlId":1,"unitId":14,"updateTime":1619086358940,"deviceId":2}*/
    });
    eventSource.addEventListener("offlineLight", function (event) {
      // console.log("灯-离线：" + event.data);
      let obj = JSON.parse(event.data);
      obj['devStatus'] = 0
      offLine(obj, 1)
    });
    //offlineList
    eventSource.addEventListener("offlineList", function (event) {
      var myDate = new Date();
      var mytime = myDate.toLocaleTimeString(); //获取当前时间
      let datalist = JSON.parse(event.data);
      if (event.data == sessionStorage.getItem('OffLineDevices')) {
        //console.log("本地存储和网络数据相同");
        return;
      } else {
        sessionStorage.setItem('OffLineDevices', event.data);

        // console.log("要存到SessionStorage的数据", datalist);
        // var datalist=[{"centralControlId":"1","deviceId":"1","deviceName":"灯光1号已离线"},{"centralControlId":"1","deviceId":"2","deviceName":"灯光2号已离线"},{"centralControlId":"2","deviceId":"1","deviceName":"风机盘管1号已离线"},{"centralControlId":"2","deviceId":"2","deviceName":"风机盘管2号已离线"},{"centralControlId":"2","deviceId":"3","deviceName":"风机盘管3号已离线"},{"centralControlId":"2","deviceId":"4","deviceName":"风机盘管4号已离线"}]
        var str = '';
        datalist.forEach(function (item, i) {
          var centralControlId = convert(item.centralControlId);
          var deviceId = convert(item.deviceId);
          var namestr = centralControlId == "2" ? "风机盘管" : "灯光";

          str += `<div><span>${namestr}${deviceId}号</span><span>离线</span></div>`;
        })
        $('#concainer').html(str);
        $('#outLine').html(datalist.length);
      }
    });
    eventSource.addEventListener("offlineFanCoilUnit", function (event) {
      // console.log("风机-离线：" + event.data);
      let obj = JSON.parse(event.data);
      obj['devStatus'] = 0
      offLine(obj, 2)
    });
    eventSource.addEventListener("error", function (event) {
      console.log("错误：" + event);
    });
    eventSource.addEventListener("open", function (event) {
      console.log("建立连接：" + event);
    });
  } else {
    // document.getElementById("date").innerHTML = "抱歉，您的浏览器不支持 server-sent 事件 ...";
    layui.use("layer", function () {
      var layer = layui.layer;
      layer.msg("抱歉，您的浏览器不支持 server-sent 事件 ...");
    });
  }
};

showRoom.init();

function speedWind(type) {
  switch (type) {
    case 1:
      return "低";
    case 2:
      return "中";
    case 3:
      return "高";
    case 4:
      return "自动";
    default:
      return "--";
  }
}
// state
function changeIcon(type) {
  switch (type) {
    case 0:
      return `
				<div class="gDtext">
					<img class="gDimg offLineImg" src="./image/iconRed.png">
				</div>
				<div class="gDtext"style="color:#FF4444">
					&nbsp;关闭
				</div>
			`;
    case 1:
      return `
				<div class="gDtext">
					<img class="gDimg offLineImg" src="./image/iconGreen.png">
				</div>
				<div class="gDtext" style="color:#2EE045">
					&nbsp;开启
				</div>
			`;
    case -1:
      return;
    default:
      return "--";
  }
}

// 渲染开关组件【初始化】
openBar(26, (e, i) => {
  // e:当前点击的元素，i:当前开关状态【0：关，1：开】
  let clickItem = e.parents('.devControl, .lightBox').data("id");
  let id = e.parents('.devControl, .lightBox').attr("id");
  if (id.indexOf('F') != -1) {
    isOff(clickItem, 2, i);
  }
  if (id.indexOf('L') != -1) {
    isOff(clickItem, 1, i);
  }
  //let getDev = getOneDevice(e.parents('.devControl'));
});

// 渲染加减组件【初始化】
scaleBtn(26, 35, 5, 0.5, (o, v) => {
  o.parent().find(".scaleRes span").text(parseFloat(v).toFixed(1));
});

//彩色按钮【初始化】
tabBar.tabBarColorfulBtn(function (i, lableName) {
  console.log("索引:" + i + ", 标签名:" + lableName);
});
//彩色按钮选中状态状态改变
//tabBar.colorfulChangeChecked($("[data-tool='color-tab']").eq(0),"0");
//线形圆环按钮【初始化】
tabBar.tabBarCirclelineBtn(function (i, lableName) {
  console.log("索引:" + i + ", 标签名:" + lableName);
});
//线形圆环按钮改变状态
//tabBar.circlelineChangeChecked($("[data-tool='line-tab']").eq(0),"1");

// 根据参数设置面板单个设备参数值
function setControlParam(data, devType = 2) {
  let obj = "";

  //判断是否离线
  if (data.devStatus == 0) {
    offLine(data, devType);
    return;
  }

  switch (devType) {
    case 1: // 灯光
      obj = $("#L_" + data.deviceId);
      if (data.switchMode == 1) {
        obj.data('disable', 1);
        setStatusIcon(obj, 1);
      } else if (data.switchMode == 0) {
        obj.data('disable', 2);
        setStatusIcon(obj, 2);
      } else {
        obj.data('disble', 0);
        setStatusIcon(obj, 0);
      }
      obj.data('url', data.address);
      let objLightSwith = obj.find("[data-tool='on-off']");
      let objColorTab = obj.find("[data-tool='color-tab']");
      let objLight = obj.find("[data-tool='slider']");
      // 设置开关
      setOpenVal(data.switchMode, objLightSwith);
      //setLightVal(data.switchMode, objSwith);
      // 设置模式
      tabBar.colorfulChangeChecked(objColorTab, data.mode - 1, data.switchMode);
      // 亮度控制
      ZgSliderSetValue(objLight, data.brightness);
      break;
    case 2: // 风机盘管
      obj = $("#F_" + data.deviceId);
      if (data.switchMode == 1) {
        obj.data('disable', 1);
        setStatusIcon(obj, 1);
      } else if (data.switchMode == 0) {
        obj.data('disable', 2);
        setStatusIcon(obj, 2);
      } else {
        obj.data('disble', 0);
        setStatusIcon(obj, 0);
      }
      obj.data('url', data.address);
      let objSwith = obj.find("[data-tool='on-off']");
      let objScale = obj.find(".toolsScale");
      let objLineTab = obj.find("[data-tool='line-tab']");
      let objImgTab = obj.find("[data-tool='img-tab']");
      // 设置开关
      setOpenVal(data.switchMode, objSwith);
      // 加减
      objScale.css('color', '#FFF');
      setScaleVal(data.settingTemperature, objScale);
      // 设置风速
      tabBar.circlelineChangeChecked(objLineTab, data.windSpeed, data.switchMode);
      // 设置模式
      tabBar.tabBarImgChangeChecked(objImgTab, data.mode - 1, data.switchMode);
      // tabBar.colorfulChangeChecked(objLineTab, data.windSpeed);
      break;
    default:
      break;
  }
}

function setStatusIcon(thisObj, status = 1) {
  let res = ''
  switch (status) {
    case 0:
      thisObj.find('.litIcon').addClass('quitIcon');
      thisObj.find('.litIcon').removeClass('successIcon');
      thisObj.find('.litIcon').removeClass('powerOffIcon');
      break;
    case 1:
      thisObj.find('.litIcon').removeClass('quitIcon');
      thisObj.find('.litIcon').addClass('successIcon');
      thisObj.find('.litIcon').removeClass('powerOffIcon');
      break;
    case 2:
      thisObj.find('.litIcon').addClass('powerOffIcon');
      thisObj.find('.litIcon').removeClass('successIcon');
      thisObj.find('.litIcon').removeClass('quitIcon');
      break;

    default:
      break;
  }
}

// 获取单个设备控制数据
function getOneDevice(thisObj, type = 2) {
  let lightSwitch = 0;
  let switchVal = 0;
  let scaleVal = "";
  let modeVal = "";
  let lightProgress = "";
  let lightMode = "";
  let id = "";
  let res = "";
  switch (type) {
    case 1:
      // 获取开关参数的值
      lightSwitch = thisObj.find("[data-tool='on-off']").data("open");
      // 获取灯光亮度
      lightProgress = thisObj.find("[data-tool='slider']").data("count");
      // 获取灯光模式
      lightMode = thisObj.find("[data-tool='color-tab']").data("index");
      // 获取设备ID
      devId = thisObj.data("id");
      // 获取设备状态
      devStatus = thisObj.data("disable");
      // 获取设备地址
      devUrl = thisObj.data("url");
      res = {
        deviceId: devId,
        brightness: lightProgress, // 亮度百分比
        mode: [0, 1, 2].indexOf(lightMode) == '-1' ? 1 : lightMode + 1, // 1：冷；2：暖；3：暖冷
        switchMode: [0, 1].indexOf(lightSwitch) == '-1' ? 0 : lightSwitch, // 0：关闭；1：开启
        devStatus: devStatus,
        address: devUrl,
        centralControlId: 1
      };
      break;
    case 2:
      // 获取开关参数的值
      switchVal = thisObj.find("[data-tool='on-off']").data("open");
      // 获取温度参数的值
      scaleVal = thisObj.find(".toolsScale").data("scaleval");
      // 获取模式参数的值
      modeVal = thisObj.find("[data-tool='img-tab']").data("index");
      // 获取风速参数的值
      windSpeed = thisObj.find("[data-tool='line-tab']").data("index");
      // 获取设备ID
      devId = thisObj.data("id");
      // 获取设备状态
      devStatus = thisObj.data("disable");
      // 获取设备地址
      devUrl = thisObj.data("url");
      res = {
        settingTemperature: parseFloat(scaleVal),
        realTimeTemperature: parseFloat(scaleVal),
        // settingTemperature: scaleVal,
        // realTimeTemperature: scaleVal,
        mode: [0, 1, 2].indexOf(modeVal) == '-1' ? 3 : modeVal + 1, // 1：制冷、2：制热、3：自动
        windSpeed: [1, 2, 3, 4].indexOf(windSpeed) == '-1' ? 4 : windSpeed, // 1：低、2：中、3：高、4：自动
        deviceId: devId,
        switchMode: [0, 1].indexOf(switchVal) == '-1' ? 0 : switchVal, // 0：关闭；1：开启
        devStatus: devStatus,
        address: devUrl,
        centralControlId: 2
      };
      break;

    default:
      res = {}
      break;
  }
  return res;
}

// 本地存储设置数据
function saveControlData(data, type = 2, isPcControl = true) {
  // 获取现在已存数据
  // let controlDataTmp = sessionStorage.getItem("showRoomData");
  // let controlData = JSON.parse(controlDataTmp) ? JSON.parse(controlDataTmp) : {'F': {}, 'L':{}}
  let controlData = getControlData('', 3)

  switch (type) {
    case 1: // 灯光	
      data['brightness'] = parseInt(data.brightness);
      data['mode'] = parseInt(data.mode);
      controlData['L']['L_' + data.deviceId] = data;
      break;
    case 2: // 风机盘管
      controlData['F']['F_' + data.deviceId] = data;
      break;
    default:
      controlData = data;
      break;
  }
  sessionStorage.setItem('showRoomData', JSON.stringify(controlData))
  // 更新离线数据
  //showRoom.popUps();
  if (isPcControl) {
    showRoom.sendMessageToU3d(sessionStorage.getItem("showRoomData")); //实时给u3d发消息
  }
}

// 获取本地缓存数据
function getControlData(devId, type = 2) {
  // 获取现在已存数据
  let controlDataTmp = sessionStorage.getItem("showRoomData");
  let controlData = JSON.parse(controlDataTmp) ? JSON.parse(controlDataTmp) : {
    'F': {},
    'L': {}
  }
  let res = {
    'F': {},
    'L': {}
  }
  switch (type) {
    case 1: // 灯光
      res = controlData['L']['L_' + devId];
      break;
    case 2: // 风机盘管
      res = controlData['F']['F_' + devId];
      break;
    default: // 全部
      res = controlData;
      break;
  }

  if (!res) {
    if (type == 2) {
      res = {
        "mode": 1,
        "settingTemperature": 18.0,
        "realTimeTemperature": 18.0,
        "centralControlId": 2,
        "windSpeed": 4,
        "deviceId": devId,
        "switchMode": 0,
        "devStatus": 0
      }
    } else if (type == 1) {
      res = {
        "mode": 1,
        "brightness": 0,
        "centralControlId": 1,
        "deviceId": devId,
        "switchMode": 0,
        "devStatus": 0
      }
    }
  }
  return res;
}

// 设置数据
function setDefaultParam() {
  // 获取现在已存数据
  let controlDataTmp = sessionStorage.getItem("showRoomData");
  let controlData = JSON.parse(controlDataTmp)
  if (controlData && controlData['F']) {
    Object.values(controlData['F']).map((item) => {
      setControlParam(item)
    })
  }

  if (controlData && controlData['L']) {
    Object.values(controlData['L']).map((item) => {
      setControlParam(item, 1)
    })
  }
}

// 离线设备
function offLine(data, type = 2) {
  let obj = "";
  let devData = "";
  // 离线状态
  switch (type) {
    case 1: // 灯光
      obj = $("#L_" + data.deviceId);
      obj.data('disable', 0);
      setStatusIcon(obj, 0);

      let objLightSwith = obj.find("[data-tool='on-off']");
      let objColorTab = obj.find("[data-tool='color-tab']");
      let objLight = obj.find("[data-tool='slider']");

      // 设置开关
      setOpenVal(9, objLightSwith);
      // 设置模式
      tabBar.colorfulChangeChecked(objColorTab, 9);
      // 亮度控制
      ZgSliderSetValue(objLight, 0);

      // 修改缓存设备状态
      devData = getControlData(data.deviceId, 1);
      devData['devStatus'] = 0;
      saveControlData(devData, 1);
      break;
    case 2: // 风机盘管
      //末端风机盘管状态改变
      obj = $("#F_" + data.deviceId);

      console.log('风机盘管离线函数被调用')
      let deviceId = "device" + obj.data("id");
      $('#' + deviceId).children().eq(-1).html(`<div class="gDtext">
        <img class="gDimg offLineImg" src="./image/iconGrey.png">
      </div>
      <div class="gDtext"style="color:#CCCCCC">&nbsp;离线</div>`)

      obj.data('disable', 0);
      setStatusIcon(obj, 0);
      let objSwith = obj.find("[data-tool='on-off']");
      let objScale = obj.find(".toolsScale");
      let objLineTab = obj.find("[data-tool='line-tab']");
      let objImgTab = obj.find("[data-tool='img-tab']");
      // 设置开关
      setOpenVal(9, objSwith);
      // 加减
      objScale.css('color', '#666');
      setScaleVal(0.0, objScale);
      // 设置风速
      //objLineTab.find('.btn').css('color','#666');
      tabBar.circlelineChangeChecked(objLineTab, '-');
      // 设置模式
      tabBar.tabBarImgChangeChecked(objImgTab, '-');
      // 修改缓存设备状态
      devData = getControlData(data.deviceId, 2);
      devData['devStatus'] = 0;
      saveControlData(devData, 2);
      break;
  }
}

// 开关设备
function isOff(deviceId, type = 2, isOpen = 1, isAuto = true) {
  //读取点击设备的缓存内容
  let devData = "";
  let obj = "";
  // 离线状态
  switch (type) {
    case 1: // 灯光
      devData = getControlData(deviceId, 1)
      obj = $("#L_" + deviceId);
      let objColorTab = obj.find("[data-tool='color-tab']");
      let objLight = obj.find("[data-tool='slider']");
      // 设置模式
      tabBar.colorfulChangeChecked(objColorTab, devData.mode - 1, isOpen);
      // 亮度控制
      if (isOpen == 1) {
        obj.data('disable', 1);
        setStatusIcon(obj, 1);
        if (isAuto) {
          let brightness = devData.brightness ? devData.brightness : 50;
          ZgSliderSetValue(objLight, brightness);
        }
      } else {
        obj.data('disable', 2);
        setStatusIcon(obj, 2);
        if (isAuto) {
          ZgSliderSetValue(objLight, 0);
        }
      }
      break;
    case 2: // 风机盘管
      devData = getControlData(deviceId, 2)
      obj = $("#F_" + deviceId);
      obj.data('disable', 1);
      let objScale = obj.find(".toolsScale");
      let objLineTab = obj.find("[data-tool='line-tab']");
      let objImgTab = obj.find("[data-tool='img-tab']");
      // 加减
      if (isOpen == 1) {
        obj.data('disable', 1);
        setStatusIcon(obj, 1);
        objScale.css('color', '#FFF');
      } else {
        setStatusIcon(obj, 2);
        obj.data('disable', 2);
        objScale.css('color', '#666');
      }
      //setScaleVal(devData.realTimeTemperature, objScale);
      // 设置风速
      tabBar.circlelineChangeChecked(objLineTab, devData.windSpeed, isOpen);
      // 设置模式
      tabBar.tabBarImgChangeChecked(objImgTab, devData.mode - 1, isOpen);
      break;
  }
}

// 在线设备
function onLine(data, type = 2) {
  let obj = "";
  switch (type) {
    case 1: // 灯光
      // 读取缓存数据
      //let LData = getControlData(data.deviceId, 1);
      obj = $("#L_" + data.deviceId);
      // 判断当前设备状态，避免重复操作
      if (obj.data('disable') != 0) {
        return
      }
      setControlParam(data, type)


      // obj.data('disable', 1);
      // setStatusIcon(obj, 1);
      // let objLightSwith = obj.find("[data-tool='on-off']");
      // let objColorTab = obj.find("[data-tool='color-tab']");
      // let objLight = obj.find("[data-tool='slider']");
      // // 设置开关
      // setOpenVal(LData.switchMode, objLightSwith);
      // // 设置模式
      // tabBar.colorfulChangeChecked(objColorTab, LData.mode - 1);
      // // 亮度控制
      // ZgSliderSetValue(LData.brightness, objLight);
      // // 修改缓存设备状态
      // // LData['devStatus'] = 1;
      // // saveControlData(LData, 1);
      break;
    case 2: // 风机盘管
      // 读取缓存数据
      //let FData = getControlData(data.deviceId, 2);
      obj = $("#F_" + data.deviceId);

      // 判断当前设备状态，避免重复操作
      if (obj.data('disable') != 0) {
        return
      }
      setControlParam(data, type)

      // obj.data('disable', 1);
      // setStatusIcon(obj, 1);
      // let objSwith = obj.find("[data-tool='on-off']");
      // let objScale = obj.find(".toolsScale");
      // let objLineTab = obj.find("[data-tool='line-tab']");
      // let objImgTab = obj.find("[data-tool='img-tab']");
      // // 设置开关
      // setOpenVal(FData.switchMode, objSwith);
      // // 加减
      // objScale.css('color', '#FFF');
      // setScaleVal(FData.settingTemperature, objScale);
      // // 设置风速
      // tabBar.circlelineChangeChecked(objLineTab, FData.windSpeed);
      // // 设置模式
      // tabBar.tabBarImgChangeChecked(objImgTab, FData.mode - 1);
      // // 修改缓存设备状态
      // FData['devStatus'] = 1;
      // saveControlData(FData, 2);
      break;
    default:
      break;
  }
}

// 自定义点击提交
$('#submitData').on('click', debounce(function () {
  let f_data = {}
  let l_data = {}
  let devControl = $('.devControl');
  let lightBox = $('.lightBox');
  devControl.each(function (item) {
    let devData = getOneDevice($(this));
    f_data['F_' + devData.deviceId] = devData;
  })

  lightBox.each(function (item) {
    let devData = getOneDevice($(this), 1);
    l_data['L_' + devData.deviceId] = devData;
  })
  let allData = {
    'F': f_data,
    'L': l_data
  }

  //js给u3d发送数据
  saveControlData(allData, 9)
  // showRoom.sendMessageToU3d(JSON.stringify(allData));
  showRoom.sendMessageToU3d(sessionStorage.getItem("showRoomData"));
  // 提交数据
  sendData(allData);
  loadingCom.loading({
    boxId: 'mainLoading',
    title: '模式转换中'
  },boxId=>{
    console.log("-------------",boxId);
  });
}, 500));

// 延时执行
let sendTime = '';
// 提交数据
function sendData(data, modeIndex = 4) {
  let f_data = data['F'];
  let l_data = data['L'];
  let sub_f_data = [];
  let sub_l_data = [];
  Object.values(f_data).map((item) => {
    if (item.devStatus != 0) {
      sub_f_data.push(item)
    }
  })
  Object.values(l_data).map((item) => {
    if (item.devStatus != 0) {
      sub_l_data.push(item)
    }
  })

  // 组装提交数据
  let subDataTmp = {
    fanCoilUnitDtoList: sub_f_data,
    lightDtoList: sub_l_data
  }

  // 延时发送（防止多次发送造成数据堵塞）
  if (sendTime) clearTimeout(sendTime);
  sendTime = setTimeout(() => {
    let subData = JSON.stringify(subDataTmp)
    $.ajax({
      type: "post",
      url: hdInterface.control,
      data: {
        control: subData
      },
      dataType: "json",
      success: function (data) {
        // 全部修改成功
        console.log(data)
      }
    });
  }, 2000)
}

// 设置模式
function setMode(data) {
  let modeVals = [1, 2, 3, 4]
  if (modeVals.indexOf(data) == -1) {
    return
  }
  let messageText = ''
  switch (data) {
    case 1:
      messageText = '默认'
      break;
    case 2:
      messageText = '会议'
      break;
    case 3:
      messageText = '舒适'
      break;
    case 4:
      messageText = '外出'
      break;

    default:
      break;
  }
  loadingCom.loading({
    boxId: 'mainLoading',
    timer: '3000',
    title: '模式转换中',
    type: '2'
  }, ()=>{
    messagePop('已切换为' + messageText + '场景')
  })
  $.ajax({
    type: "post",
    url: hdInterface.switchingMode,
    data: {
      mode: data
    },
    dataType: "json",
    success: function (data) {
      // 全部修改成功
      if (messageText) {
        //messagePop('已切换为' + messageText + '模式')
        //loadingCom.closeLoading();
      }
    }
  });
}

// 设置灯光、风机盘管
function setOneDevice(data) {
  // 组装提交数据
  let subDataTmp = {
    fanCoilUnitDtoList: [],
    lightDtoList: []
  }
  let msg = ''
  if (data.centralControlId == 1) {
    subDataTmp['lightDtoList'].push(data);
    msg = '灯光设置成功';
    saveControlData(data, 1); //保存到本地缓存
  }

  if (data.centralControlId == 2) {
    subDataTmp['fanCoilUnitDtoList'].push(data);
    msg = '风机盘管设置成功';
    saveControlData(data, 2); //保存到本地缓存
  }

  // 延时发送（防止多次发送造成数据堵塞）
  if (sendTime) clearTimeout(sendTime);
  sendTime = setTimeout(() => {
    let subData = JSON.stringify(subDataTmp)

    loadingCom.loading({
      boxId: 'mainLoading',
      timer: '3000',
      title: '模式转换中',
      type: '2'
    })
    $.ajax({
      type: "post",
      url: hdInterface.control,
      data: {
        control: subData
      },
      dataType: "json",
      success: function (data) {
        // 全部修改成功
        //messagePop(msg)
	      changeIconItem($('#showFullMask'))	//激活自定义图标
      }
    });
  }, 2000)
}

// 弹窗提示
function messagePop(text, time = 3000) {
  $('.pop').html(text).show();
  setTimeout(function () {
    $('.pop').html('').hide();
  }, time)
}

// 模拟数据===开始==============================================================
function testFun(isAll = true) {
  let testF = [{
    "mode": 1,
    "settingTemperature": 18.0,
    "realTimeTemperature": 18.0,
    "centralControlId": 2,
    "windSpeed": 4,
    "deviceId": 1,
    "switchMode": 0,
    "devStatus": 0
  }, {
    "mode": 1,
    "settingTemperature": 18.0,
    "realTimeTemperature": 18.0,
    "centralControlId": 2,
    "windSpeed": 4,
    "deviceId": 2,
    "switchMode": 0,
    "devStatus": 0
  }, {
    "mode": 1,
    "settingTemperature": 18.0,
    "realTimeTemperature": 18.0,
    "centralControlId": 2,
    "windSpeed": 4,
    "deviceId": 3,
    "switchMode": 0,
    "devStatus": 0
  }, {
    "mode": 1,
    "settingTemperature": 18.0,
    "realTimeTemperature": 18.0,
    "centralControlId": 2,
    "windSpeed": 4,
    "deviceId": 4,
    "switchMode": 0,
    "devStatus": 0
  }, ]
  let testL = [{
    "mode": 1,
    "brightness": 0,
    "centralControlId": 1,
    "deviceId": 1,
    "switchMode": 0,
    "devStatus": 0
  }, {
    "mode": 1,
    "brightness": 0,
    "centralControlId": 1,
    "deviceId": 2,
    "switchMode": 0,
    "devStatus": 0
  }, ]
  let allData_F = {},
    allData_L = {};
  if (isAll) {
    testF.map((item) => {
      allData_F['F_' + item.deviceId] = item
    })
    testL.map((item) => {
      allData_L['L_' + item.deviceId] = item
    })
    let allData = {
      F: allData_F,
      L: allData_L
    }
    saveControlData(allData, 3)
  } else {
    let f = Rand(testF)
    let l = Rand(testL)
    saveControlData(f)
    saveControlData(l, 1)
  }
}

function Rand(arr) {
  var a = Math.floor(Math.random() * arr.length); //Math.floor(Math.random()); //Math.floor()方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。
  //alert(Math.random()*arr.length);
  //alert(a);
  return arr[a];
}


// setInterval(function(){
//   testFun(false);
//   showRoom.sendMessageToU3d(sessionStorage.getItem("showRoomData"));//实时给u3d发消息
//   showRoom.popUps();
// },5000);

// testFun()

// setTimeout(function(){
//   offLine({"centralControlId":"2","deviceId":"4","deviceName":"风机盘管4号已离线"}, 2);
//   showRoom.popUps();
// },10000)
// 
// 
// 
// setTimeout(function(){
//   let onLineJson = {
//     "mode":1,
//     "settingTemperature":20.0,
//     "realTimeTemperature":20.0,
//     "centralControlId":2,
//     "windSpeed":2,
//     "deviceId":4,
//     "switchMode":1,
//     "devStatus":1
//   }
//   saveControlData(onLineJson, 2)
//   onLine(onLineJson, 2);
//   showRoom.popUps();
// },15000)

// 模拟数据==结束===============================================================



//图片选项卡【初始化】
tabBar.tabBarImgBtn(function (i, lableName) {
  console.log("索引:" + i);
});

//蓝线选项卡【初始化】
$(".bottomline>.btn").click(function () {
  var index = $(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(this).parents(".zgTab1").find(".zg-tab-item").hide();
  $(this).parents(".zgTab1").find(".zg-tab-item").eq(index).show();
  // if(index==0){
  // 	$(".control").css("background-image","url(./image/background5.png)");
  // }
  // if(index==1){
  // 	$(".control").css("background-image","url(./image/background6.png)");
  // }
});


//进度条【初始化】
ZgSlider(function (count, obj) {
  // 当滑动鼠标抬起时打开开关状态
  let lightItem = obj.parents('.lightBox').data('id');
  let objSwith = obj.parents('.lightBox').find("[data-tool='on-off']");

  if (count > 0 && objSwith.data('open') == 0) {
    setOpenVal(1, objSwith);
    isOff(lightItem, 1, 1, false);
  }

  if (count <= 0 && objSwith.data('open') == 1) {
    setOpenVal(0, objSwith);
    isOff(lightItem, 1, 0, false);
  }
});


// 数据对比
function contrastData(data, type = 1) {
  // 获取已存储的发送数据
  let getSendData = sessionStorage.getItem("showRoomSendData")

}