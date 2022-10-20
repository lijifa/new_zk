var security = {
  isWarnLunBo: false,
  isFaultLunBo: false,
  loadmar: 0, //判断循环列表是否全部加载完成
};
var timer = null;
var timerLine = null;
var _SITE_ID = getParams()["siteId"];
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var layuiId = getParams()["layuiId"]; //标签id
var timer = null;
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    clearInterval(timer);
  } else {
    // security.rainfallStatistics();
  }
});
var objName = layuiId;
window.onunload = function () {
  // top.unregisterListener(objName); //销毁
  clearInterval(timer);
};
// top.registerListener(objName, function (e) {
//   security.rainfallStatistics();
// }); //注册
security.init = function () {
  // security.playWarnLight();// 播放预警信息
  // security.initMonitor(); // 初始化安全监控 1m
  // security.rainfallStatistics();
  // security.minFlowStatistics();
  // security.popUpsList();
  // security.offLineAlarm({ data: {} });
  // security.wellCoverAlarm({ data: {} });
};
security.oneMinuteUpdate = function () {
  timer = setInterval(function () {
    security.rainfallStatistics();
  }, 60 * 1000);
};
security.safetyScore = function (data) {
  var url = "./image/中间圆_x264.mp4";
  // if ($vediodom.attr("src") === url) {
  // 	hdTools.removemask("abc")
  // 	return;
  // }
  $("#warnLight").attr("src", url);
  // return
  $.post(hdInterface.alarmTimes, {}).done((res) => {
    if (res.code === 0) {
      // console.log(res);
      var $vediodom = $("#warnLight");
      var $centerMessage = $(".center-message");
      var $safetyScore = $("#safetyScore");
      // res.data.totalScore = 100;
      if (res.data.totalScore <= 90) {
        var url = "./image/huanhuan_x264.mp4";
        // if ($vediodom.attr("src") === url) {
        // 	hdTools.removemask("abc")
        // 	return;
        // }
        $("#warnLight").attr("src", url);
        // voicePaly();
        $(".safetyScore").css({
          color: "#E93F41",
        });
      } else {
        var url = "./image/中间圆_x264.mp4";
        // if ($vediodom.attr("src") === url) {
        // 	hdTools.removemask("abc")
        // 	return;
        // }
        $("#warnLight").attr("src", url);
        $(".safetyScore").css({
          color: "#3DFFAA",
        });
        // voiceClose();
      }
      // console.log("========更新安全综合评分");
      console.log(res.data.totalScore);
      $("#safetyScore").text(convert(res.data.totalScore));
      $("#safetyScore").next().text("综合安全评分");
    }
  });
};

//离线报警次数,井盖报警次数
$.ajax({
  url: hdInterface.alarmTimes,
  type: "post",
  success: (res) => {
    if (res.data !== {} && res.code !== 0) return;
    // console.log(res);
    /*当日离线报警*/
    // security.offLineAlarm = function (data) {
    // data.data.realWarnRuleCount = 34;
    // data.data.warnRuleCount = 112;
    if (res.data.offlineAlarmTimes > 0) {
      $(".TextColor").css("color", "#FF204A");
      $("#circleWaringText1").text(convert(res.data.offlineAlarmTimes));
    } else if (res.data.offlineAlarmTimes == 0) {
      $(".TextColor").css("color", "#00FFFF");
      $("#circleWaringText1").text(convert(res.data.offlineAlarmTimes));
    }

    var value = res.data.offlineAlarmTimes;
    var showText = `<span style="font-size:30px;">${convert(
      res.data.offlineAlarmTimes
    )}</span>/${convert(res.data.offlineAlarmTimes)}`;
    $("#circleWaringText").html(convert(showText));
    echarsComponent.getCircleChars({
      elementId: "main7", //容器id	[必填]
      value: value, //百分比值[必填]
      startColor: "#FF204A", //开始时候颜色[非必填]
      endColor: "#FF204A", //结束时候颜色	[非必填]
      showText: false, //是否显示中间文字 bool[非必填]
    });
    // };
    /*当日井盖报警*/
    // security.wellCoverAlarm = function (data) {
    // data.data.realWarnRuleCount = 56;
    // data.data.warnRuleCount = 112;
    if (res.data.coverAlarmTimes > 0) {
      $(".TextColor2").css("color", "#FF204A");
      $("#circleFaultText2").text(convert(res.data.coverAlarmTimes));
    } else if (res.data.coverAlarmTimes == 0) {
      $(".TextColor2").css("color", "#00FFFF");
      $("#circleFaultText2").text(convert(res.data.coverAlarmTimes));
    }
    var value = res.data.coverAlarmTimes;
    var showText = `<span style="font-size:30px;">${convert(
      res.data.coverAlarmTimes
    )}</span>/${convert(res.data.coverAlarmTimes)}`;
    $("#circleWaringText").html(convert(showText));
    echarsComponent.getCircleChars({
      elementId: "main8", //容器id	[必填]
      value: value, //百分比值[必填]
      startColor: "#FF204A", //开始时候颜色[非必填]
      endColor: "#FF204A", //结束时候颜色	[非必填]
      showText: false, //是否显示中间文字 bool[非必填]
    });
    // };
  },
});

/*显示隐藏评分规则*/
$("#control_btn").hover(
  function () {
    $(".div_rules").show();
  },
  function () {
    $(".div_rules").hide();
  }
);
security.safetyScore();
security.init();

//  报警时间和原因
$.ajax({
  url: hdInterface.realAlarmDetailWarnning,
  type: "post",
  data: {
    siteId: 50,
  },
  success: (res) => {
    // console.log(res);
    if (res.code !== 0 && res.data !== []) return;
    let list = res.data.map((item) => {
      return {
        state: item.alarmName,
        name: item.time,
      };
    });
    var obj1 = new SuperSlideList({
      selector: "#faultList", //容器
      title: ["报警原因", "报警时间"], //标题
      data: list,
      intervalRow: 0, //间隔行
      intervalColumn: 0, //间隔列
    });
  },
});

//实时回水温度检测
$.ajax({
  url: hdInterface.selectHeatingResult,
  type: "post",
  success: (res) => {
    if (res.code !== 0 && res.data !== []) return;
    // console.log(res);
    let list = res.data.map((item, index) => {
      return {
        name: `<p><b>${index + 1}</b> ${item.buildingName}</p>`,
        state: `<p>${item.waterReturnTemperature}</p>`,
        china: `<p>${item.returnWaterPressure}</p>`,
      };
    });
    var obj2 = new SuperSlideList({
      selector: "#leftTable", //容器
      title: ["建筑名称", "回水温度(℃)", "回水压力(bar)"], //标题
      //[
      data: list,
    });
  },
});

//平台运行时间，当月阻止事故次数，累计发出报警次数
$.ajax({
  url: hdInterface.statisticsWranning,
  type: "post",
  success: (res) => {
    // console.log(res);
    if (res.data == {}) return;
    $("#sec-Date").text(convert(res.data.totalRunDays));
    $("#sec-Recovery").text(convert(res.data.preventTimes));
    $("#sec-Use").text(convert(res.data.totalAlarmTimes));
  },
});
//实时主教学楼暖气检测
$.ajax({
  url: hdInterface.heatingDetection,
  type: "post",
  success: (res) => {
    // console.log(res);
    if (res.data == {}) return;
    $("#realTimeFlow").text(convert(res.data.realTimeFlow));
    $("#waterSupplyTemperature").text(convert(res.data.waterSupplyTemperature));
    $("#returnWaterPressure").text(convert(res.data.returnWaterPressure));
  },
});
//当日校园用水量检测
$.ajax({
  url: hdInterface.currentDayWaterCost,
  type: "post",
  success: (res) => {
    // console.log(res);
    if (res.code !== 0) return;
    $("#currentDayWaterCost").text(convert(res.data.currentDayWaterCost));
  },
});
//报警排行
$.ajax({
  url: hdInterface.alarmRank,
  type: "post",
  success: (res) => {
    if (res.data == {}) return;
    for (item in res.data) {
      $("#reason" + item).text(res.data[item].reason);
      $("#times" + item).text(convert(res.data[item].times));
    }
  },
});
