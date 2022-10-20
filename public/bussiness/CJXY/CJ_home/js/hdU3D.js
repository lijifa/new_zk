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
    hdU3D.oneMinutesUpdate(); //一分钟更新
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
//   hdU3D.projectSecurity(); //项目安全
//   // hdU3D.tempData();
// }); //注册
hdU3D.init = function () {
  $(".sc-container").prepend(
    '<iframe src="./ChengJian/index.html?v=' +
    version +
    '" width="100%" frameborder="0" height="100%"></iframe>'
  );
  hdU3D.buttomIcon;
  // hdU3D.inform(); //位置信息
  // hdU3D.energyUse(); //项目能耗
  // hdU3D.projectSecurity(); // 项目安全
  // hdU3D.waterTank(); //水箱
  hdU3D.showHideButtom(); //收起按钮
  // hdU3D.faultPopups();
  // hdU3D.scoreShow(); //评分弹窗
  // hdU3D.oneMinutesUpdate();//一分钟更新
  // hdU3D.windowTo();//跳转
  // hdU3D.changeBtns();
  // hdU3D.tempData();
};

var skyFlag = false;
hdU3D.U3Dinit = function (gameInstance) {
  // $(this).parent().css('background-image', bg);
  // 网络请求
  $.ajax({
    url: hdInterface.selectDeviceStatusByProjectId,
    data: {
      projectId: _PROJECT_ID,
    },
    type: "post",
    success: (res) => {
      console.log(res);
      gameInstance.SendMessage(
        "UpdateStateMgr",
        "GetJsMessage",
        JSON.stringify(res)
      );
    },
  });

  // hdU3D.sendMsg = function () {
  //   $.post(
  //     hdInterface.selectSafetyMonitoringPD,
  //     {
  //       projectId: _PROJECT_ID,
  //     },
  //     function (data) {
  //       // console.log('机房状态=====');
  //       // console.log(data);
  //       if (data["code"] == 0) {
  //         gameInstance.SendMessage(
  //           "UpdateStateMgr",
  //           "GetDate",
  //           JSON.stringify(data)
  //         );
  //       }
  //     }
  //   );
  // };

  // hdU3D.sendMsg();
  // timer1 = setInterval(function(){
  // 	hdU3D.sendMsg();
  // },60*1000);
};
//一分钟更新
hdU3D.oneMinutesUpdate = function () {
  timer = setInterval(function () {
    // console.log('一分钟更新');
    hdU3D.energyUse(); //项目能耗
    hdU3D.projectSecurity(); // 项目安全
    hdU3D.waterTank(); //水箱
    $("#fault").css({
      opacity: "0",
      "z-index": -100,
    });
    // timer1 = setInterval(function(){
    hdU3D.sendMsg();
    // },60*1000);
  }, 60 * 1000);
};
//位置信息
hdU3D.inform = function () {
  $.post(
    hdInterface.selectProjectMessage,
    {
      projectId: _PROJECT_ID,
    },
    function (data) {
      if (data["code"] === 0) {
        var result = data.data || {};
        Object.keys(result).forEach(function (item) {
          var dom = $("#" + item);
          if (dom.length > 0) {
            dom.text(result[item]);
          }
        });
      }
    }
  );
};
//项目能耗
hdU3D.energyUse = function () {
  $.get(hdInterface.electricRoom, {
    siteId: _SITE_ID,
  }).done(function (data) {
    // console.log('项目能耗');
    // console.log(data);
    if (data["code"] === 0) {
      for (let key in data.data) {
        $("#" + key).html(convert(data.data[key]));
      }
    }
  });
};
// 项目安全
hdU3D.projectSecurity = function () {
  $.post(
    hdInterface.securityInfo,
    {
      siteId: _SITE_ID,
    },
    function (res) {
      if (res.code == 0) {
        $("#safetyScore").html(convert(res.data.safetyScore));
        if (res.data.safetyScore <= 90) {
          $("#safetyScore")
            .css({
              color: "#ff4444",
            })
            .siblings()
            .css({
              color: "#ff4444",
            });
        }
      }
    }
  );
  $.post(
    hdInterface.selectSafetyMonitoringPD,
    {
      projectId: _PROJECT_ID,
    },
    function (data) {
      if (data.code == 0) {
        if (data.data.length != 0) {
          $("#sumAlarm").html(convert(data.data[0].sumAlarm));
          if (data.data[0].sumAlarm == 0) {
            $("#sumAlarm").css({
              color: "#00ffff",
            });
            $("#sumAlarm").parent().siblings().css({
              color: "#a5eaff",
            });
            $("#sumAlarm").parent().parent().css({
              "background-image": "url(image/gaojingBlue.png)",
            });
          } else {
            $("#sumAlarm").css({
              color: "#ff4444",
            });
            $("#sumAlarm").parent().siblings().css({
              color: "#ff4444",
            });
            $("#sumAlarm").parent().parent().css({
              "background-image": "url(image/gaojingRed.png)",
            });
          }
          let gatewayOffline = data.data[0]["gatewayOffline"]
            ? data.data[0]["gatewayOffline"]
            : [];
          let count = gatewayOffline[0] ? gatewayOffline[0].count : -1;
          if (gatewayOffline.length == 0) {
            $("#gatewayOffline").html("在线");
            $("#gatewayOffline").css({
              color: "#00ffff",
            });
            $("#gatewayOffline").parent().siblings().css({
              color: "#a5eaff",
            });
            $("#gatewayOffline").parent().parent().css({
              "background-image": "url(image/wangguanGreen.png)",
            });
            let param = {
              // title:['网关名称','网关状态','最后采集时间'],
              list: [
                {
                  text: '<div style="color:#00ffff;text-align:center;">当前网关暂无异常</div>',
                },
              ],
            };
            let fault = new listRollNew("fault", param);
          } else {
            if (gatewayOffline.length == count) {
              $("#gatewayOffline").html("离线");
              $("#gatewayOffline").css({
                color: "#999",
              });
              $("#gatewayOffline").parent().siblings().css({
                color: "#999",
              });
              $("#gatewayOffline").parent().parent().css({
                "background-image": "url(image/wangguanGray.png)",
              });
              let param = {
                title: ["网关名称", "网关状态", "最后采集时间"],
                list: [],
                hangLie: {
                  lieflag: true, //间隔列开
                  lienum: "2", //间隔列 从0开始
                  hangflag: true, //间隔行开
                  hangnum: "0", //间隔行 从0开始
                },
              };
              gatewayOffline.forEach((item, index) => {
                param.list.push({
                  name: item.gatewayName,
                  statu: item.gatewayStatus,
                  time: item.acquisitionTime,
                });
              });
              let fault = new listRollNew("fault", param); //实例化
              $(".gDhang_item0").css({
                color: "#999",
              });
              $(".gDhang_item1").css({
                color: "#999",
              });
              $(".gDhang_item2").css({
                color: "#999",
              });
            } else {
              $("#gatewayOffline").html(gatewayOffline.length + "个离线");
              $("#gatewayOffline").css({
                color: "#ff4444",
              });
              $("#gatewayOffline").parent().siblings().css({
                color: "#ff4444",
              });
              $("#gatewayOffline").parent().parent().css({
                "background-image": "url(image/wangguanRed.png)",
              });
              let param = {
                title: ["网关名称", "网关状态", "最后采集时间"],
                list: [],
              };
              gatewayOffline.forEach((item, index) => {
                param.list.push({
                  name: item.gatewayName,
                  statu: item.gatewayStatus,
                  time: item.acquisitionTime,
                });
              });
              let fault = new listRollNew("fault", param); //实例化
              $(".gDhang_item0").css({
                color: "#ff4444",
              });
              $(".gDhang_item1").css({
                color: "#ff4444",
              });
              $(".gDhang_item2").css({
                color: "#ff4444",
              });
            }
          }
        }
      }
    }
  );
  $.get(hdInterface.alarmRecord, { siteId: 40 }, function (data) {
    if (data.code == 0) {
      if (data.data.length == 0) {
        let param1 = {
          // title:['网关名称','网关状态','最后采集时间'],
          list: [
            {
              text: '<div style="color:#00ffff;text-align:center;">当前暂无告警</div>',
            },
          ],
        };
        let fireList1 = new listRollNew("fireList", param1); //实例化
        return;
      }
      let param = {
        title: ["告警原因", "告警类型", "告警时间"],
        list: [],
        hangLie: {
          lieflag: true, //间隔列开
          lienum: "2", //间隔列 从0开始
          hangflag: true, //间隔行开
          hangnum: "0", //间隔行 从0开始
        },
      };

      data.data.forEach((item, index) => {
        param.list.push({
          reason: convert(item.reason),
          alarmType: convert(item.alarmType),
          alarmTime: convert(item.alarmTime),
        });
      });
      let fireList = new listRollNew("fireList", param); //实例化
      $(".gDhang_item0").css({
        color: "#ff4444",
      });
      $(".gDhang_item1").css({
        color: "#ff4444",
      });
      $(".gDhang_item2").css({
        color: "#ff4444",
      });
    }
  });
};
// list
hdU3D.listRoll = function (data) {
  let param = {
    title: [],
    list: [],
    hangLie: {
      lieflag: true, //间隔列开
      lienum: "2", //间隔列 从0开始
      hangflag: true, //间隔行开
      hangnum: "1", //间隔行 从0开始
    },
  };
  if (data.length !== 0) {
    data.forEach((item) => {
      var obj = {
        reason: item.reason,
        alarmTime: item.alarmTime,
      };
      param.list.push(obj);
    });
  } else {
    param.list = [
      {
        text: '<span style="text-align:center;display:block;">暂无异常</span>',
      },
    ];
  }
  let fault = new listRollNew("fault", param); //实例化
  $("#fault .gDlistIn li div").css("color", function () {
    if ($(this).html().indexOf("暂无异常") != -1) {
      return "#00ffff";
    } else {
      return "#FF4444";
    }
  });
};
// 弹窗
hdU3D.faultPopups = function () {
  $("#wangGuan").hover(
    function () {
      let offest = $(this).offset();
      $("#fault").css({
        opacity: "1",
        "z-index": 10,
        left: offest.left - 200 + "px",
        top: offest.top - 180 + "px",
      });
    },
    function () {
      $("#fault").css({
        opacity: "0",
        "z-index": -100,
      });
    }
  );
  $(window).on("resize", function () {
    $("#fault").css({
      opacity: "0",
      "z-index": -100,
    });
    $("#fireList").css({
      opacity: "0",
      "z-index": -100,
    });
  });
  $("#sencon").hover(
    function () {
      let offest = $(this).offset();
      $("#fireList").css({
        opacity: "1",
        "z-index": 10,
        left: offest.left - 200 + "px",
        top: offest.top - 180 + "px",
      });
    },
    function () {
      $("#fireList").css({
        opacity: "0",
        "z-index": -100,
      });
    }
  );
};

// 显示评分
hdU3D.scoreShow = function () {
  $("#scoreBtn").hover(
    function () {
      $(".score").show();
    },
    function () {
      $(".score").hide();
    }
  );
};
//收起按钮
hdU3D.showHideButtom = function () {
  let leftBar = new SlideMenu({
    direction: "down",
    menuBtn: "#buttomIcon",
    menuBox: ".bottombar",
    bgMask: false,
    menuSetPosition: [10, -230],
    btnSetposition: [240, 0],
    isOpen: true,
    bgDrop: 5,
    callBackFun: function (e) {
      if (e) {
        $(".buttomIcon i")
          .addClass("layui-icon-down")
          .removeClass("layui-icon-up");
      } else {
        $(".buttomIcon i")
          .removeClass("layui-icon-down")
          .addClass("layui-icon-up");
      }
    },
  });
};

//水箱
hdU3D.waterTank = function () {
  $.get(
    hdInterface.analysisTopFive,
    {
      siteId: _SITE_ID,
    },
    function (data) {
      // console.log('能耗设备排名')
      // console.log(data);
      if (data.code == 0) {
        data.data.forEach((item, index) => {
          $("#energyDevice" + index).html(convert(item.power));
          $("#energyDeviceName" + index).html(convert(item.deviceName));
        });
      }
    }
  );
};
// 跳转
hdU3D.windowTo = function () {
  $("#hoverFire").on("click", function () {
    let id = "";
    let title = "";
    let menuLeftId = "";
    let siteId = "";
    let projectId = "";
    parent.$("dt[data-name=AreaManagement] a").each((i, e) => {
      let dataUrl = $(e).attr("data-url");
      if (dataUrl.indexOf("bussiness/pdSquare/index.html") != -1) {
        id = $(e).attr("data-id");
        title = $(e).attr("data-title");
        let arr = dataUrl.substring(dataUrl.indexOf("?") + 1).split("&");
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf("=");
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj["menuLeftId"];
        siteId = obj["siteId"];
        projectId = obj["projectId"];
      }
    });
    let url = `bussiness/pdSecurity/index.html?projectId=${projectId}&siteId=${siteId}&sitename=中新装配式配电室安全概况&showmenu=show&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E5%AE%89%E5%85%A8%E6%A6%82%E5%86%B5&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
  $("#chuangan").on("click", function () {
    let id = "";
    let title = "";
    let menuLeftId = "";
    let siteId = "";
    let projectId = "";
    parent.$("dt[data-name=AreaManagement] a").each((i, e) => {
      let dataUrl = $(e).attr("data-url");
      if (dataUrl.indexOf("bussiness/pdSquare/index.html") != -1) {
        id = $(e).attr("data-id");
        title = $(e).attr("data-title");
        let arr = dataUrl.substring(dataUrl.indexOf("?") + 1).split("&");
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf("=");
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj["menuLeftId"];
        siteId = obj["siteId"];
        projectId = obj["projectId"];
      }
    });
    let url = `/bussiness/equipmentList/index.html?showmenu=show&siteId=${siteId}&projectId=${projectId}&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
  $("#jigui").on("click", function () {
    let id = "";
    let title = "";
    let menuLeftId = "";
    let siteId = "";
    let projectId = "";
    parent.$("dt[data-name=AreaManagement] a").each((i, e) => {
      let dataUrl = $(e).attr("data-url");
      if (dataUrl.indexOf("bussiness/pdSquare/index.html") != -1) {
        id = $(e).attr("data-id");
        title = $(e).attr("data-title");
        let arr = dataUrl.substring(dataUrl.indexOf("?") + 1).split("&");
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf("=");
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj["menuLeftId"];
        siteId = obj["siteId"];
        projectId = obj["projectId"];
      }
    });
    let url = `/bussiness/equipmentList/index.html?showmenu=show&siteId=${siteId}&projectId=${projectId}&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
};
hdU3D.changeBtns = function () {
  $(".control_btn span").click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    var type = $(this).data("type");
    $(".energy_statis>div").hide();
    $(".energy-comp>div").hide();
    $(".energy_statis>." + type).show();
    $(".energy-comp>." + type).show();
    if (type == "monery11") {
      $("#moneryEnergyTitle").html("费用统计");
    } else {
      $("#moneryEnergyTitle").html("能耗统计");
    }
  });
};

hdU3D.init();
