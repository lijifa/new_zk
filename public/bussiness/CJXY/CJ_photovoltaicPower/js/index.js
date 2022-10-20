var photovoltaicPower = {};
var _SITE_ID = getParams()["siteId"];
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var params = {
  siteId: _SITE_ID,
};
var timer = null,
  timer1 = null;
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
  } else {
  }
});
photovoltaicPower.init = function () {
  photovoltaicPower.todayLoad();
  photovoltaicPower.Uload();
  photovoltaicPower.ALoad();
  photovoltaicPower.showTip();
  photovoltaicPower.Power();
  photovoltaicPower.loadselectTemperatureAndHumidity();
};
// 当日蓄电池电压
photovoltaicPower.todayLoad = function () {
  $.ajax({
    url: hdInterface.selectBatteryVoltageByCurrentDay,
    type: "post",
    success: (res) => {
      if (res.code == 0 && res.data !== [] && res.data !== null) {
        let dataX = res.data.dataX.split(",");
        let dataY = $.parseJSON(res.data.dataY).data.split(",");
        let dataxTime = [];
        dataX.forEach(function (item) {
          dataxTime.push(item + ":00");
        });
        echarsComponent.getLineShadow({
          elementId: "echarts",
          xdata: dataxTime,
          ydata: [dataY],
          linecolors: ["rgba(78, 223, 146, 1)"],
          areaStyleOpacity: 0.3,
          unit: "V",
          interval: 3,
          grid: {
            left: "20px",
            top: "25px",
            right: "20px",
            bottom: "10px",
          },
          offectTop: "rgba(78, 223, 146, 1)",
          offectMiddle: "rgba(78, 223, 146, .8)",
          offectBottom: "rgba(78, 223, 146, 0)",
        });
      }
    },
  });
};
// 逆变器输入输出电压
photovoltaicPower.Uload = function () {
  $.ajax({
    url: hdInterface.selectInputOutVoltageByCurrentDay,
    type: "post",
    success: (res) => {
      if (res.code == 0 && res.data !== [] && res.data !== null) {
        let dataX = res.data.dataX.split(",");
        let dataY = $.parseJSON(res.data.dataY).data.split(",");
        let dataY2 = $.parseJSON(res.data.dataY2).data.split(",");
        let dataxTime = [];
        dataX.forEach(function (item) {
          dataxTime.push(item + ":00");
        });
        echarsComponent.getLine({
          elementId: "echarts1",
          xdata: dataxTime,
          ydata: [dataY2, dataY],
          ydataTitle: ["输入电压", "输出电压"],
          linecolors: ["#4EDF92", "#2338FF"],
          unit: "V",
          interval: 3,
          grid: {
            left: "20px",
            top: "25px",
            right: "0px",
            bottom: "0px",
          },
        });
      }
    },
  });
};
// 逆变器输入输出电流
photovoltaicPower.ALoad = function () {
  $.ajax({
    url: hdInterface.selectInputOutCurrentByCurrentDay,
    type: "post",
    success: (res) => {
      if (res.code == 0 && res.data !== [] && res.data !== null) {
        let dataX = res.data.dataX.split(",");
        let dataY = $.parseJSON(res.data.dataY).data.split(",");
        let dataY2 = $.parseJSON(res.data.dataY2).data.split(",");
        let dataxTime = [];
        dataX.forEach(function (item) {
          dataxTime.push(item + ":00");
        });
        echarsComponent.getLine({
          elementId: "echarts2",
          xdata: dataxTime,
          ydata: [dataY2, dataY],
          ydataTitle: ["输入电流", "输出电流"],
          linecolors: ["#4EDF92", "#2338FF"],
          unit: "A",
          interval: 3,
          grid: {
            left: "20px",
            top: "25px",
            right: "0px",
            bottom: "0px",
          },
        });
      }
    },
  });
};
// 显示提示信息
photovoltaicPower.showTip = function () {
  $(".standard").hover(
    function () {
      $(".tipInfo").show();
    },
    function () {
      $(".tipInfo").hide();
    }
  );
};
// 光伏发电量统计
photovoltaicPower.Power = function () {
  let date = new Date();
  let day = date.getDate();
  function getYearDay() {
    let date = new Date();
    let year = date.getFullYear();
    let old = new Date(`${year}-01-01 00:00:00`);
    let now = new Date();
    let allday = now - old;
    return Math.floor(allday / (24 * 3600 * 1000));
  }
  let Monele = Number(day) * 2.75;
  let Yearele = Number(getYearDay()) * 2.75;
  $("#Monele").text(convert(Monele.toFixed(2)));
  $("#Yearele").text(convert(Yearele.toFixed(2)));
  // 计算标准煤
  let Moncoal = Monele * 0.1229;
  let MonCo2 = Monele * 0.9288;
  $("#Moncoal").text(Moncoal.toFixed(2));
  $("#MonCo2").text(MonCo2.toFixed(2));
};
// 室外温湿度
photovoltaicPower.loadselectTemperatureAndHumidity = function () {
  $.post(hdInterface.selectTemperatureAndHumidityBySiteId, {
    siteId: 52,
  }).done(function (res) {
    if (res.code == 0 && res.data !== {} && res.data !== null) {
      $("#temperature").text(res.data.temperature);
      $("#humidity").text(res.data.humidity);
    }
  });
};

photovoltaicPower.init();
