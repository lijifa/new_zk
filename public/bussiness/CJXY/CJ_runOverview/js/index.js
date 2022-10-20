var hdU3D = {};
var _SITE_ID = getParams()["siteId"];
var _PROJECT_ID = getParams()["projectId"];
var layuiId = getParams()["layuiId"]; //标签id
var timer = null;
var timer1 = null;
// 离开页面调用
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    clearInterval(timer);
  } else {
    // hdU3D.oneMinutesUpdate(); //一分钟更新
  }
});
var objName = layuiId;
//刷新
window.onunload = function () {
  // top.unregisterListener(objName); //销毁
  clearInterval(timer);
};
//标签切换之后
// top.registerListener(objName, function (e) {
//   // hdU3D.projectSecurity(); //项目安全
//   // hdU3D.tempData();
// }); //注册
hdU3D.init = function () {
  $(".sc-container").prepend(
    '<iframe src="./pd_ZongLan/index.html?v=' +
    version +
    '" width="100%" frameborder="0" style="margin-top: -35px;height:calc(100% + 35px)"></iframe>'
  );
  // hdU3D.tempData();
};
var skyFlag = false;
hdU3D.U3Dinit = function (gameInstance) {
  $(".sky>div").on("click", function () {
    if (skyFlag) {
      return;
    }
    skyFlag = true;
    let bg = $(this).parent().css("background-image");
    $(this).addClass("skyOn").siblings().removeClass("skyOn");
    if (bg.match("white")) {
      bg = bg.replace(/white/, "black");
      gameInstance.SendMessage("BloomSitting", "OpenNight");
    } else {
      bg = bg.replace(/black/, "white");
      gameInstance.SendMessage("BloomSitting", "OpenDay");
    }
    $(this).parent().css("background-image", bg);
    // setTimeout(function(){
    // 	skyFlag = false;
    // },1000*3);
  });
  $(".btn-show").on("click", function () {
    let type = $(this).attr("data-type");
    if (type == "1") {
      $(this).removeClass("open");
      $(this).addClass("close");
      $(this).attr("data-type", "0");
      gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "15001, ");
    } else {
      $(this).addClass("open");
      $(this).removeClass("close");
      $(this).attr("data-type", "1");
      gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "15001, ");
    }
  });
  hdU3D.sendMsg = function () {
    $.post(
      hdInterface.selectSafetyMonitoringPD,
      {
        projectId: _PROJECT_ID,
      },
      function (data) {
        // console.log('机房状态=====');
        // console.log(data);
        if (data["code"] == 0) {
          gameInstance.SendMessage(
            "Distribution",
            "StateSet",
            JSON.stringify(data)
          );
        }
      }
    );
  };
  hdU3D.sendMsg();
  // timer1 = setInterval(function(){
  // 	hdU3D.sendMsg();
  // },60*1000);
};
hdU3D.init();

// 当日主教学楼能耗检测按钮点击
$(".control_btn span").click(function () {
  $(this).addClass("on").siblings().removeClass("on");
  if ($(".control_btn span:first-child").hasClass("on")) {
    $("#leftChart").show();
    $("#leftChart2").hide();
  } else if ($(".control_btn span:last-child").hasClass("on")) {
    $("#leftChart").hide();
    $("#leftChart2").show().css({ marginTop: "10%", opacity: "100" });
  }
});

// 当月城建主楼电、水能耗
$.ajax({
  url: hdInterface.cjEnergyCurrentMonthCurve,
  type: "post",
  success: (res) => {
    // console.log(res);
    let dataX1 = res.data[1].dataX.split(",");
    let dataY1 = res.data[1].dataY.split(",");
    //当日主教学楼图表耗电量
    let dataObj = {
      elementId: "leftChart",
      xdata: dataX1,
      ydata: [dataY1],
      ydataTitle: ["耗电量"],
      linecolors: ["#00FFFF", "#48D396"],
      areaStyleOpacity: 0.1,
      interval: 3,
      ifboundaryGap: true,
      coordinateinecolor: "rgba(10,148,255,0.1)",
      labelColor: "#a5eaff",
      unit: "kW·h",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%",
        top: "25px",
      },
      nodataImg: true,
      yAxisMin: 0,
      yAxisMinInterval: 150,
    };
    echarsComponent.getLine(dataObj);
  },
});

$.ajax({
  url: hdInterface.cjEnergyCurrentMonthCurve,
  type: "post",
  success: (res) => {
    let dataX2 = res.data[2].dataX.split(",");
    let dataY2 = res.data[2].dataY.split(",");
    //当日主教学楼耗水量
    let dataObj1 = {
      elementId: "leftChart2",
      xdata: dataX2,
      ydata: [dataY2],
      ydataTitle: ["耗水量"],
      linecolors: ["#00FFFF"],
      areaStyleOpacity: 0.1,
      interval: 3,
      ifboundaryGap: true,
      coordinateinecolor: "rgba(10,148,255,0.1)",
      labelColor: "#a5eaff",
      unit: "m³",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%",
        top: "25px",
      },
      nodataImg: true,
      yAxisMin: 0,
      yAxisMinInterval: 10,
    };
    echarsComponent.getLine(dataObj1);
  },
});

// 当日城建主楼室内外温度趋势
$.ajax({
  url: hdInterface.cjInAndOutTemperatureCurve,
  type: "post",
  success: (res) => {
    // console.log(res);
    let dataX = res.data.dataX.split(",");
    let dataY = res.data.dataY.split(",");
    let dataY2 = res.data.dataY2.split(",");
    let dataxTime = [];
    dataX.forEach(function (item) {
      dataxTime.push(item + ":00");
    });
    //室内温度监测图表
    let dataObj2 = {
      elementId: "todayTempWatchChart",
      xdata: dataxTime,
      ydata: [dataY, dataY2],
      ydataTitle: ["室内温度", "室外温度"],
      linecolors: ["#0A94FF", "#FFF001"],
      interval: 2,
      ifboundaryGap: true,
      // coordinateinecolor: 'rgba(10,148,255,0.1)',
      labelColor: "#72B9FF",
      unit: "℃",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%",
        top: "25px",
      },
      nodataImg: true,
      yAxisMin: 0,
      yAxisMinInterval: 10,
    };
    echarsComponent.getLine(dataObj2);
  },
});
function goDetail() {
  // window.location.href = `/bussiness/CJXY/CJ_equipmentList/index.html?showmenu=show&siteId=${_SITE_ID}&projectId=${_PROJECT_ID}&titlename=设备清单`;
  let url = "";
  parent.$("#hidenavbar a").each((i, e) => {
    if (
      $(e)
        .attr("data-url")
        .indexOf("/bussiness/CJXY/CJ_equipmentList/index.html") != -1
    ) {
      url = $(e).attr("data-url");
    }
  });
  /* url = `/bussiness/drainageMonitor/device.html?showmenu=show&siteId=13&projectId=7&
    titlename=%E7%BB%99%E6%8E%92%E6%B0%B4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95
    &menuLeftId=83`; */
  // console.log(url);
  let id = parent.$(".hd-tab.layui-tab-title .layui-this").attr("lay-id");
  let title = "主教学楼";
  top.window.openNewTab(url, id, title);
}

// 网络请求
// 主楼当日能耗 / 流量
$.ajax({
  url: hdInterface.cjEnergyStatics,
  type: "post",
  data: {},
  success: (res) => {
    // console.log(res);
    $("#eleEnergyCurrentDay").text(convert(res.data?.eleEnergyCurrentDay));
    $("#realTimeFlow").text(convert(res.data?.realTimeFlow));
    $("#waterEnergyCurrentDay").text(convert(res.data?.waterEnergyCurrentDay));
  },
});
// 主楼暖气状况监测
$.ajax({
  url: hdInterface.cjHeatingStatus,
  type: "post",
  success: (res) => {
    // console.log(res);
    $("#waterSupplyTemperature").text(
      convert(res.data?.waterSupplyTemperature)
    );
    $("#returnWaterPressure").text(convert(res.data?.returnWaterPressure));
  },
});
// 主楼实时室内温度监测
$.ajax({
  url: hdInterface.cjIndoorTemperature,
  type: "post",
  success: (res) => {
    // console.log(res);
    for (item in res.data) {
      // console.log(item);
      if (res.data[item].type == 1) {
        $("#refeValue1").html(convert(res.data[item].refeValue) + "&nbsp;℃");
      }
      if (res.data[item].type == 2) {
        $("#refeValue2").html(convert(res.data[item].refeValue) + "&nbsp;℃");
      }
      if (res.data[item].type == 3) {
        $("#refeValue3").html(convert(res.data[item].refeValue) + "&nbsp;℃");
      }
    }
  },
});
// 当日主楼耗电设备
$.ajax({
  url: hdInterface.cjtDeviceEleEnergyRank,
  type: "post",
  success: (res) => {
    for (item in res.data) {
      $("#deviceName" + item).text(res.data[item].deviceName);
      $("#eleEnergy" + item).text(res.data[item].eleEnergy);
    }
  },
});
