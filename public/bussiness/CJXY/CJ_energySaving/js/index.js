var energySavingIndex = {};
var _SITE_ID = 13; //getParams()['siteId'];
var projectId = 7; //getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var params = {
  siteId: _SITE_ID,
};
var timer = null,
  timer1 = null;
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    clearInterval(timer);
    // console.log('离开')
  } else {
    energySavingIndex.fiveMinutesUpdate();
    energySavingIndex.init();
    // console.log('回来')
  }
});
energySavingIndex.init = function () {
  // if(sitename){
  // 	$("#innerheader").attr("data-title", decodeURI(sitename));
  // }
  energySavingIndex.loadenergyStatics(); //当日分项能耗统计
  energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis(); //实时能效分析
  energySavingIndex.loadselectTemperatureAndHumidity(); //室外温湿度
  energySavingIndex.loadEnergyDay(); //当日能耗变化图表
  energySavingIndex.loadEnergyMouth(); //当月能耗变化图表
  energySavingIndex.loadenergySavingCurrent(); //当年节能量
  // energySavingIndex.loadcurrentYearEnergyCostDetails(); //某年实际能耗费用详情
  energySavingIndex.deviceElectricRank(); //当月设备耗电排行
  energySavingIndex.buildingEnergyCost(); //2022年部分教学楼水电统计

  // 五分钟刷新
  energySavingIndex.fiveMinutesUpdate();
};
energySavingIndex.fiveMinutesUpdate = function () {
  // console.log('开启五分钟轮询');
  timer = setInterval(function () {
    // console.log('五分钟');
    energySavingIndex.loadselectTemperatureAndHumidity(); //室外温湿度
    energySavingIndex.loadenergyStatics(); //当日分项能耗
    energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis(); //实时能效分析
    energySavingIndex.loadEnergyDay(); //当日能耗变化图表
  }, 5 * 60 * 1000);
};

//室外温湿度
energySavingIndex.loadselectTemperatureAndHumidity = function () {
  $.post(hdInterface.selectTemperatureAndHumidityBySiteId, {
    siteId: 50,
  }).done(function (res) {
    if (res.code == 0) {
      console.log(res);
      var data = res.data || {};
      Object.keys(data).forEach(function (item) {
        var dom = $("#" + item);
        dom.html(convertNumber(data[item]));
      });
    }
  });
};

//当日分项能耗
energySavingIndex.loadenergyStatics = function () {
  $.post(hdInterface.currentDayEnergyStatics, {
    siteId: 50,
    timeCode: 0,
  }).done(function (res) {
    if (res.code == 0) {
      var data = res.data || {};
      Object.keys(data).forEach(function (item) {
        var dom = $("#energy_" + item);
        dom.html(convertNumber(data[item]));
      });
    }
  });
};

//当前总能耗
energySavingIndex.loadenergySavingCurrent = function () {
  $.post(hdInterface.currentYearEnergyCost, {
    siteId: 50,
  }).done(function (res) {
    if (res.code == 0 && res.data !== null && res.data !== []) {
      $("#energySaving").text(convert(res.data.allSum));
    }
  });
};

//当日能耗变化图表
energySavingIndex.loadEnergyDay = function () {
  var clickindex = 1;
  setInterval(function () {
    $("#energy-day-control span").eq(clickindex).click();
    clickindex++;
    if (clickindex > 1) {
      clickindex = 0;
    }
  }, 1000 * 30);
  $("#energy-day-control span").click(function () {
    $(this).addClass("on").siblings("span").removeClass("on");
    var type = $(this).attr("data-type");
    switch (type) {
      case "electricity": //电
        // $(".energy-day-cont-bg").css("opacity","1");
        $(".energy-day-cont-bg").show();
        // $("#main2electricity").show();
        // $("#main2gas").hide();
        $("#main2electricity").css({ opacity: "1", "z-index": "10" });
        $("#main2gas").css({ opacity: "0", "z-index": "-10" });
        break;
      case "gas": //气
        // $(".energy-day-cont-bg").css("opacity","0");
        $(".energy-day-cont-bg").hide();
        // $("#main2electricity").hide();
        // $("#main2gas").show();
        $("#main2electricity").css({ opacity: "0", "z-index": "-10" });
        $("#main2gas").css({ opacity: "1", "z-index": "10" });
        break;
      default:
        break;
    }
  });

  getdata(0, "main2electricity", "kW·h"); //电
  getdata(1, "main2gas", "m³"); //水
  function getdata(energyType, elementId, unit) {
    $.post(hdInterface.currentDayEnergyChange, {
      siteId: 50,
      energyCode: energyType, //能耗类型(0电2气)
    })
      .done(function (res) {
        if (res.code == 0) {
          var data = res.data || {};
          var datax = data.dataX.split(",");
          var datay = data.dataY.split(",");
          var dataxTime = [];
          datax.forEach(function (item) {
            dataxTime.push(item + ":00");
          });
          echarsComponent.getLine({
            elementId: elementId, //容器id	[必填]
            xdata: dataxTime, //横坐标数据[必填]
            ydata: [datay], //纵坐标数据[必填]
            linecolors: ["rgba(0, 255, 255, 1)"], //线颜色[非必填]
            areaStyleOpacity: 0.2, //区域颜色[非必填]
            // interval: 4, //间隔[非必填]
            // "dataZoom":{
            // "isScroll":true,//是否可以自动切换[非必填]
            // "endValue":2//显示个数，长度是当前数字+2个[非必填]
            //  },
            //  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
            //  "labelColor":'#a5eaff',//坐标轴文字颜色
            unit: unit, //单位
            yAxisMin: 0, //y轴最小刻度默认为数据中最小值[非必填]
            // yAxisMinInterval: 100,
            grid: {
              left: "20px",
              right: "4%",
              bottom: "0px",
              top: "25px",
            }, //边距[非必填]
            nodataImg: true, //无数据时候是否显示暂无数据图片
          });
          $("#energy-day .hd-loadmask").hide();
        }
      })
      .fail(function (response) {
        $(".energy-day-cont-bg").css({ opacity: "0", "z-index": "-10" });
      });
  }
};
//当月能耗变化图表
energySavingIndex.loadEnergyMouth = function () {
  var clickindex = 1;
  setInterval(function () {
    $("#energy-mouth-control span").eq(clickindex).click();
    clickindex++;
    if (clickindex > 1) {
      clickindex = 0;
    }
  }, 1000 * 30);
  $("#energy-mouth-control span").click(function () {
    $(this).addClass("on").siblings("span").removeClass("on");
    var type = $(this).attr("data-type");
    switch (type) {
      case "electricity": //电
        // $(".energy-day-cont-bg").css("opacity","1");
        $(".energy-day-cont-bg").show();
        // $("#main2electricity").show();
        // $("#main2gas").hide();
        $("#mouth_electricity").css({ opacity: "1", "z-index": "10" });
        $("#mouth_gas").css({ opacity: "0", "z-index": "-10" });
        break;
      case "gas": //气
        // $(".energy-day-cont-bg").css("opacity","0");
        $(".energy-day-cont-bg").hide();
        // $("#main2electricity").hide();
        // $("#main2gas").show();
        $("#mouth_electricity").css({ opacity: "0", "z-index": "-10" });
        $("#mouth_gas").css({ opacity: "1", "z-index": "10" });
        break;
      default:
        break;
    }
  });

  getdata(0, "mouth_electricity", "kW·h"); //电
  getdata(1, "mouth_gas", "m³"); //水
  function getdata(energyType, elementId, unit) {
    $.post(hdInterface.currentMonthEnergyChange, {
      siteId: 50,
      energyCode: energyType, //能耗类型(0电2气)
    })
      .done(function (res) {
        if (res.code == 0) {
          var data = res.data || {};
          var datax = data.dataX.split(",");
          var datay = data.dataY.split(",");
          var dataxTime = [];
          datax.forEach(function (item) {
            dataxTime.push(item);
          });
          echarsComponent.getLine({
            elementId: elementId, //容器id	[必填]
            xdata: dataxTime, //横坐标数据[必填]
            ydata: [datay], //纵坐标数据[必填]
            linecolors: ["rgba(0, 255, 255, 1)"], //线颜色[非必填]
            areaStyleOpacity: 0.2, //区域颜色[非必填]
            // interval:4,//间隔[非必填]
            // "dataZoom":{
            // "isScroll":true,//是否可以自动切换[非必填]
            // "endValue":2//显示个数，长度是当前数字+2个[非必填]
            //  },
            //  "coordinateinecolor":'rgba(10,148,255,0.2)',//坐标轴颜色
            //  "labelColor":'#a5eaff',//坐标轴文字颜色
            unit: unit, //单位
            yAxisMin: 0, //y轴最小刻度默认为数据中最小值[非必填]
            // yAxisMinInterval: 300,
            grid: {
              left: "20px",
              right: "4%",
              bottom: "0px",
              top: "25px",
            }, //边距[非必填]
            nodataImg: true, //无数据时候是否显示暂无数据图片
          });
          $("#energy-mouth .hd-loadmask").hide();
        }
      })
      .fail(function (response) {
        $(".energy-day-cont-bg").css({ opacity: "0", "z-index": "-10" });
      });
  }
};

//实时能效分析
energySavingIndex.loadrealTimeEnergyEfficiencyAnalysis = function () {
  var clickindex = 1;
  // clearInterval(timer1);
  // timer1 = setInterval(function(){
  // 	// console.log(clickindex);
  // 	$("#energyefficiency span").eq(clickindex).addClass('on').siblings("span").removeClass("on");
  // 	$('.energyEfficiencybar ul li').eq(clickindex).show().siblings().hide();
  // 	clickindex++;
  // 	if(clickindex>2){
  // 		clickindex=0
  // 	}
  // },1000*20);
  //0电1水2气
  $("#energyefficiency span").on("click", function () {
    $(this).addClass("on").siblings("span").removeClass("on");
    var ind = $(this).index();
    clickindex = ind;
    $(".energyEfficiencybar ul li").eq(ind).show().siblings().hide();
  });
  function getdata(energyType = 0, datatype) {
    $.post(hdInterface.realTimeEnergyEfficiencyAnalysis, {
      siteId: 50,
      energyCode: energyType,
    }).done(function (res) {
      // console.log(res);
      if (res.code == 0) {
        var data = res.data || {};
        // console.log(datatype+'=====================')
        Object.keys(data).forEach(function (item) {
          var dom = $("#" + datatype + item);
          if (item == "fell") {
            var value = data[item];
            if (value == null) {
              value = "--";
            } else if (value >= 0) {
              value = Math.abs(value) + '% <img src="/common/image/up1.png">';
              dom.addClass("colorRed");
            } else {
              value = Math.abs(value) + '% <img src="/common/image/down1.png">';
              dom.addClass("colorGreen");
            }
            // console.log(item,value);
            dom.html(value);
          } else if (item == "currentTime" || item == "yesterdayTime") {
            // console.log(item,data[item]);
            dom.html(data[item] >= 1 ? Math.round(data[item]) : data[item]);
          } else {
            // console.log(item,convertNumber(data[item]));
            dom.html(convertNumber(data[item]));
          }
        });
      }
    });
  }
  getdata(0, "electric");
  getdata(1, "water");
  // getdata(2,"gas");
};

//当月设备耗电排行

$("#energy-month-control span").click(function () {
  $(this).addClass("on").siblings().removeClass("on");
  let _energyType = $(this).index();
  energySavingIndex.deviceElectricRank(_energyType);
});
energySavingIndex.deviceElectricRank = function (energyType) {
  $.post(hdInterface.deviceElectricRank, {
    siteId: 50,
    timeCode: 5,
    energyType: energyType || 0,
  }).done(function (res) {
    // console.log(res);
    if (res.code == 0) {
      let resData = [
        {
          plate: "--",
          electric: "--",
        },
        {
          plate: "--",
          electric: "--",
        },
        {
          plate: "--",
          electric: "--",
        },
        {
          plate: "--",
          electric: "--",
        },
        {
          plate: "--",
          electric: "--",
        },
      ];
      if (res.data && res.data.length) {
        resData = res.data;
      }
      for (item in resData) {
        $("#plate" + item).text(resData[item].plate);
        $("#electric" + item).text(resData[item].electric);
      }
      if (energyType === 1) {
        console.log(energyType);
        for (let i = 0; i < 5; i++) {
          $("#elec" + i).text("m³");
        }
      } else {
        for (let i = 0; i < 5; i++) {
          console.log(energyType);
          $("#elec" + i).text("kW·h");
        }
      }
    }
  });
};

// 2022年部分教学楼水电统计
energySavingIndex.buildingEnergyCost = function () {
  $.post(hdInterface.buildingEnergyCost).done(function (res) {
    console.log(res);
    let buildingName = ["楼名称"],
      eleEnergyCost = ["电能耗(kW·h)"],
      waterEnergyCost = ["水能耗(m³)"];
    res.data.map((item) => {
      buildingName.push(item.buildingName);
      eleEnergyCost.push(item.eleEnergyCost);
      waterEnergyCost.push(item.waterEnergyCost);
    });
    // $("#thisyear").html(convert(data[0].year));

    let tdStr = "<tr class='floorField'>";
    if (res.code != 0) return;
    // 楼名称
    buildingName.map((item, index) => {
      tdStr += `<td>${item}</td>`;
    });
    tdStr += `</tr>`;
    // 电能耗
    let tdStr1 = "<tr>";
    eleEnergyCost.map((item, index) => {
      if (item == "-" || item == null) {
        item = "暂无";
      }
      tdStr1 += `<td>${item}</td>`;
    });
    tdStr1 += `</tr>`;
    // 水能耗
    let tdStr2 = "<tr>";
    waterEnergyCost.map((item, index) => {
      if (item == "-" || item == null) {
        item = "暂无";
      }
      tdStr2 += `<td>${item}</td>`;
    });
    tdStr2 += `</tr>`;
    $(".floorBox").html(`
		<table class="floorTable" border="1">
			${tdStr}
			${tdStr1}
			${tdStr2}
		</table>
		`);
  });
};

function getNowYear() {
  let date = new Date();
  let year = date.getFullYear();
  // console.log(year);
  $("#thisyear2").text(year);
  $("#thisyear").text(year);
}
getNowYear();

// 某年各教学楼水电能耗统计
// energySavingIndex.loadcurrentYearEnergyCostDetails = function () {
//   $.post(hdInterface.currentYearEnergyCostDetails, {
//     siteId: _SITE_ID,
//   }).done(function (res) {
//     if (res.code == 0) {
//       var data = res.data || {};
//       var str = "";
//       $("#thisyear2").html(convert(data[0].year));
//       $("#thisyear").html(convert(data[0].year));
//       data.forEach(function (item, index) {
//         var status = item.status;
//         if (status == "1") {
//           str += `<li class="has">${item.detail}</li>`;
//         } else {
//           str += `<li>${item.detail}</li>`;
//         }
//       });
//       $("#bottombarUl").html(str);
//     }
//   });
// };

window.energySavingIndex = energySavingIndex;
energySavingIndex.init();

//数字特效
function loadnum1(var1) {
  numAutoPlus("energySaving", 0, {
    time: 2000,
    num: var1,
    rate: 40,
    format: true,
  });
}
