var solarEnergyWater = {};
var _SITE_ID = getParams()["siteId"];
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var params = {
  siteId: _SITE_ID,
};
var timer = null;
var layuiId = getParams()["layuiId"]; //标签id
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    clearInterval(timer);
  } else {
    solarEnergyWater.changeAuto();
  }
});
// 切换项目标签
// $(top.document.getElementsByTagName("iframe")).each((i, e) => {
//   if ($(e).attr("src").indexOf(location.pathname.substring(1)) != -1) {
//     layuiId == undefined ? (layuiId = $(e).attr("data-frameid")) : "";
//   }
// });
// top.registerListener(layuiId, function (e) {
//   if (e == layuiId) {
//     solarEnergyWater.changeAuto();
//   } else {
//     clearInterval(timer);
//   }
// }); //注册
solarEnergyWater.init = function () {
  solarEnergyWater.Uload();
  solarEnergyWater.ALoad();
  solarEnergyWater.showTip();
  solarEnergyWater.changeBottomBtn();
  solarEnergyWater.changeAuto();

  solarEnergyWater.basicDataOfSolarWater(); // 太阳能热水器基础数据
  solarEnergyWater.energySavingCarbonReduction(); // 太阳能热水器节能降碳
  solarEnergyWater.crsxTemperatureCurrentDayCurve(); //太阳能热水器当日储水温度
  solarEnergyWater.jcsTemperatureCurrentDayCurve(); //太阳能热水器当日进出水温度
};
// 储热水温度
solarEnergyWater.Uload = function () {
  solarEnergyWater.crsxTemperatureCurrentDayCurve = function () {
    $.post(hdInterface.crsxTemperatureCurrentDayCurve, {
      type: solarEnergyWater.indexFlag,
    }).done((res) => {
      // console.log(res);
      if (res.data == {}) return;
      let dataX = res.data.dataX.split(",");
      let dataY = res.data.dataY.split(",");
      let dataxTime = [];
      dataX.forEach(function (item) {
        dataxTime.push(item + ":00");
      });
      // console.log(dataX);
      // console.log(dataY);
      echarsComponent.getLine({
        elementId: "echarts1",
        xdata: dataxTime,
        ydata: [dataY],
        ydataTitle: ["储热水箱温度"],
        linecolors: ["rgba(78, 223, 146, 1)", "rgba(35, 56, 255, 1)"],
        // areaStyleOpacity: 0.2,
        offectTop: "rgba(78, 223, 146, 1)",
        offectMiddle: "rgba(78, 223, 146, .8)",
        offectBottom: "rgba(78, 223, 146, 0)",
        unit: "℃",
      });
    });
  };
};
// 集水器进出水温度
solarEnergyWater.ALoad = function () {
  solarEnergyWater.jcsTemperatureCurrentDayCurve = function () {
    $.post(hdInterface.jcsTemperatureCurrentDayCurve, {
      type: solarEnergyWater.indexFlag,
    }).done((res) => {
      let dataX = res.data.dataX.split(",");
      let dataxTime = [];
      dataX.forEach(function (item) {
        dataxTime.push(item + ":00");
      });
      if (res.data == {}) return;
      let dataY = JSON.parse(res.data.dataY).data.split(",");
      console.log(dataY);
      if (res.data.dataY2) {
        var dataY2 = JSON.parse(res.data.dataY2).data.split(",");
        console.log(dataY2);
      }
      echarsComponent.getLine({
        elementId: "echarts2",
        xdata: dataxTime,
        ydata: [dataY, dataY2],
        ydataTitle: ["出水温度", "进水温度"],
        linecolors: ["#F4E446", "#0A94FF"],
        unit: "℃",
      });
    });
    if (solarEnergyWater.indexFlag == 1) {
      $("#btmEchartImg").hide();
      $("#btmEchartTit").hide();
    } else if (solarEnergyWater.indexFlag == 2) {
      $("#btmEchartImg").show();
      $("#btmEchartTit").show();
    }
  };
};
// 显示提示信息
solarEnergyWater.showTip = function () {
  $(".standard").hover(
    function () {
      $(".tipInfo").show();
    },
    function () {
      $(".tipInfo").hide();
    }
  );
};
//热水器切换
solarEnergyWater.indexFlag = 1;
solarEnergyWater.changeBottomBtn = function () {
  $("#taiyangyu,#huangming").click(function () {
    let id = $(this).attr("id");
    let index = id === "taiyangyu" ? 1 : 2;
    if (index == solarEnergyWater.indexFlag) {
      return;
    }
    solarEnergyWater.indexFlag = index;
    solarEnergyWater.basicDataOfSolarWater(); //请求太阳能热水器基础数据
    solarEnergyWater.energySavingCarbonReduction(); // 太阳能热水器节能降碳
    solarEnergyWater.crsxTemperatureCurrentDayCurve(); //太阳能热水器当日储水温度
    solarEnergyWater.jcsTemperatureCurrentDayCurve(); //太阳能热水器当日进出水温度
    $(this)
      .addClass(`bottomBtn${index}Bg_active`)
      .siblings()
      .removeClass(`bottomBtn${index == 1 ? 2 : 1}Bg_active`);
    solarEnergyWater.videoAnime(solarEnergyWater.indexFlag);
    clearInterval(timer);
    solarEnergyWater.changeAuto();
  });
};
// video过度动画
solarEnergyWater.videoAnime = function (index) {
  if (index === 1) {
    anime({
      targets: [".videoOne"],
      opacity: 1,
      duration: 2000,
      delay: anime.stagger(100),
      easing: "easeOutExpo",
    });
    let one = anime.timeline({
      duration: 2000,
      easing: "easeOutExpo",
    });
    one.add({
      targets: [".videoTwo"],
      delay: anime.stagger(100),
      opacity: 0,
      begin: function (e) {},
    });
  } else {
    anime({
      targets: [".videoTwo"],
      opacity: 1,
      duration: 2000,
      delay: anime.stagger(100),
      easing: "easeOutExpo",
    });
    let two = anime.timeline({
      duration: 2000,
      easing: "easeOutExpo",
    });
    two.add({
      targets: [".videoOne"],
      delay: anime.stagger(100),
      opacity: 0,
      begin: function (e) {},
    });
  }
};
// video自动切换
solarEnergyWater.changeAuto = function () {
  timer = setInterval(function () {
    if (solarEnergyWater.indexFlag == 1) {
      $("#taiyangyu").removeClass("bottomBtn1Bg_active");
      $("#huangming").addClass("bottomBtn2Bg_active");
      solarEnergyWater.indexFlag = 2;
    } else if (solarEnergyWater.indexFlag == 2) {
      $("#taiyangyu").addClass("bottomBtn1Bg_active");
      $("#huangming").removeClass("bottomBtn2Bg_active");
      solarEnergyWater.indexFlag = 1;
    }
    solarEnergyWater.videoAnime(solarEnergyWater.indexFlag);
    solarEnergyWater.basicDataOfSolarWater(); // 太阳能热水器基础数据
    solarEnergyWater.energySavingCarbonReduction(); // 太阳能热水器节能降碳
    solarEnergyWater.crsxTemperatureCurrentDayCurve(); //太阳能热水器当日储水温度
    solarEnergyWater.jcsTemperatureCurrentDayCurve(); //太阳能热水器当日进出水温度
  }, 2 * 60 * 1000);
};

// 网络请求
// 太阳能热水器基础数据
solarEnergyWater.basicDataOfSolarWater = function () {
  $.post(hdInterface.basicDataOfSolarWater, {
    type: solarEnergyWater.indexFlag,
  }).done(function (res) {
    if (solarEnergyWater.indexFlag === 1) {
      $(".topTools .topToolsItem:first-child").hide();
      $(".topTools .topToolsItem:nth-child(4)").hide();
    } else {
      $(".topTools .topToolsItem:first-child").show();
      $(".topTools .topToolsItem:nth-child(4)").show();
    }
    if (res.data == {}) return;
    $(".csTemperature").text(convert(res.data.csTemperature));
    $(".crsxTemperature").text(convert(res.data.crsxTemperature));
    $(".sxsw").text(convert(res.data.sxsw));
    $(".hsgdTemperature").text(convert(res.data.hsgdTemperature));
    $(".jsTemperature").text(convert(res.data.jsTemperature));
  });
};
// 节能降碳
solarEnergyWater.energySavingCarbonReduction = function () {
  $.post(hdInterface.energySavingCarbonReduction, {
    type: solarEnergyWater.indexFlag,
  }).done(function (res) {
    if (res.data == {}) return;
    console.log(res);
    $(".savingStandardCoal").text(convert(res.data.savingStandardCoal));
    $(".carbonDioxideEmissions").text(convert(res.data.carbonDioxideEmissions));
  });
};
solarEnergyWater.init();
