var photovoltaicPower = {};
var _SITE_ID = getParams()["siteId"];
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var params = {
  siteId: _SITE_ID,
};
var timer = null,
  timer1 = null;
var layuiId = getParams()["layuiId"]; //标签id
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    clearInterval(timer);
  } else {
    photovoltaicPower.changeAuto();
  }
});
// 切换项目标签
$(top.document.getElementsByTagName("iframe")).each((i, e) => {
  if ($(e).attr("src").indexOf(location.pathname.substring(1)) != -1) {
    layuiId == undefined ? (layuiId = $(e).attr("data-frameid")) : "";
  }
});
// top.registerListener(layuiId, function (e) {
//   if (e == layuiId) {
//     photovoltaicPower.changeAuto();
//   } else {
//     clearInterval(timer);
//   }
// }); //注册
photovoltaicPower.init = function () {
  photovoltaicPower.todayLoad();
  photovoltaicPower.Uload();
  photovoltaicPower.ALoad();
  photovoltaicPower.showTip();
  photovoltaicPower.changeBottomBtn();
  photovoltaicPower.changeAuto();
  photovoltaicPower.selectWeatherBySiteId();
  photovoltaicPower.selectRandom();
};
// 当日负载功率
// photovoltaicPower.todayLoad = function(){
// 	echarsComponent.getLineShadow({
// 		elementId:'echarts1',
// 		xdata:[1,2,3,4,5],
// 		ydata:[[23,12,35,24,15]],
// 		linecolors:['rgba(78, 223, 146, 1)'],
// 		areaStyleOpacity:0.3,
// 		unit:'kW·h',
// 		grid:{
// 			left:'20px',
// 			top:'25px',
// 			right:'20px',
// 			bottom:'10px'
// 		},
// 		offectTop:'rgba(78, 223, 146, 1)',
// 		offectMiddle:'rgba(78, 223, 146, .8)',
// 		offectBottom:'rgba(78, 223, 146, 0)'
// 	})
// }

// 实时风机功率统计
photovoltaicPower.todayLoad = function () {
  let list1 = [];
  let list2 = [];
  let dataX = [];
  let date = new Date();
  let hours = date.getHours();
  for (let i = 0; i < 24; i++) {
    if (i <= hours) {
      dataX.push((i < 10 ? "0" + i : i) + ":00");
    }
  }
  for (let i = 0; i < hours; i++) {
    let num1 = (Math.floor(Math.random() * (300 - 100)) + 100) / 100;
    let num2 = (Math.floor(Math.random() * (300 - 100)) + 100) / 100;
    list1.push(num1);
    list2.push(num2);
  }
  echarsComponent.getLine({
    elementId: "echarts1",
    xdata: dataX,
    ydata: [list1, list2],
    splitNumber: 4,
    ydataTitle: ["水平式", "垂直式"],
    linecolors: ["#F4E446", "#1AD1FF"],
    unit: "kW/h",
  });
};
// 逆变器输入输出电压
photovoltaicPower.Uload = function () {
  let list1 = [];
  let list2 = [];
  let dataX = [];
  let date = new Date();
  let hours = date.getHours();
  for (let i = 0; i < 24; i++) {
    if (i <= hours) {
      dataX.push((i < 10 ? "0" + i : i) + ":00");
    }
  }
  for (let i = 0; i < hours; i++) {
    let num1 = (Math.floor(Math.random() * (150 - 110)) + 110) / 10;
    let num2 = (Math.floor(Math.random() * (150 - 110)) + 110) / 10;
    list1.push(num1);
    list2.push(num2);
  }
  echarsComponent.getLine({
    elementId: "echarts3",
    xdata: dataX,
    ydata: [list1, list2],
    splitNumber: 4,
    ydataTitle: ["水平式", "垂直式"],
    linecolors: ["#F4E446", "#1AD1FF"],
    unit: "V",
  });
};
// 逆变器输入输出电流
photovoltaicPower.ALoad = function () {
  let list1 = [];
  let list2 = [];
  let dataX = [];
  let date = new Date();
  let hours = date.getHours();
  for (let i = 0; i < hours; i++) {
    let num1 = (Math.floor(Math.random() * (380 - 220)) + 220) / 10;
    let num2 = (Math.floor(Math.random() * (380 - 220)) + 220) / 10;
    list1.push(num1);
    list2.push(num2);
  }
  for (let i = 0; i < 24; i++) {
    if (i <= hours) {
      dataX.push((i < 10 ? "0" + i : i) + ":00");
    }
  }
  echarsComponent.getLine({
    elementId: "echarts2",
    xdata: dataX,
    ydata: [list1, list2],
    splitNumber: 4,
    ydataTitle: ["水平式", "垂直式"],
    linecolors: ["#F4E446", "#1AD1FF"],
    unit: "A",
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

//切换
photovoltaicPower.videoFlag = 1;
photovoltaicPower.changeBottomBtn = function () {
  $(".btnCenter .btn").click(function () {
    let index = $(this).data("type");
    let otherIndex = index == 1 ? 2 : 1;
    if (index == photovoltaicPower.videoFlag) {
      return;
    }
    photovoltaicPower.videoFlag = index;
    $(this)
      .addClass(`btnYellow${index}`)
      .removeClass(`btnBlue${index}`)
      .siblings()
      .removeClass(`btnYellow${otherIndex}`)
      .addClass(`btnBlue${otherIndex}`);
    photovoltaicPower.videoAnime(photovoltaicPower.videoFlag);
    clearInterval(timer);
    photovoltaicPower.changeAuto();
  });
};
// video过度动画
photovoltaicPower.videoAnime = function (index) {
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
photovoltaicPower.changeAuto = function () {
  timer = setInterval(function () {
    if (photovoltaicPower.videoFlag == 1) {
      $(".btn[data-type=1]").removeClass("btnYellow1").addClass("btnBlue1");
      $(".btn[data-type=2]").addClass("btnYellow2").removeClass("btnBlue2");
      photovoltaicPower.videoFlag = 2;
    } else if (photovoltaicPower.videoFlag == 2) {
      $(".btn[data-type=1]").removeClass("btnBlue1").addClass("btnYellow1");
      $(".btn[data-type=2]").addClass("btnBlue2").removeClass("btnYellow2");
      photovoltaicPower.videoFlag = 1;
    }
    photovoltaicPower.videoAnime(photovoltaicPower.videoFlag);
  }, 2 * 60 * 1000);
};
// 环境监测
photovoltaicPower.selectWeatherBySiteId = function () {
  $.post(hdInterface.selectWeatherBySiteId, {
    siteId: _SITE_ID,
  }).done((res) => {
    console.log(res);
    // console.log(res.code == 0 && res.data !== {});
    if (res.code == 0 && res.data !== {}) {
      $("#temperature").text(res.data?.temperature);
      $("#humidity").text(convert(res.data?.humidity));
      $("#windPower").text(convert(res.data?.windPower));
    }
  });
};
// 发电量统计
photovoltaicPower.selectRandom = function () {
  let _random1 = (Math.floor(Math.random() * (300 - 200)) + 200) / 100;
  let _random2 = (Math.floor(Math.random() * (300 - 200)) + 200) / 100;
  $("#SdayEle").text(_random1);
  $("#CdayEle").text(_random2);

  let myDate = new Date();
  let nowDay = myDate.getDate(); //获取当前日(1-31)
  $("#SMonEle").text((_random1 * nowDay).toFixed(2));
  $("#CMonEle").text((_random2 * nowDay).toFixed(2));

  $("#MonMei").text(
    (
      (Number((_random1 * nowDay).toFixed(2)) +
        Number((_random2 * nowDay).toFixed(2))) *
      0.1229
    ).toFixed(2)
  );
  $("#MonCo2").text(
    (
      (Number((_random2 * nowDay).toFixed(2)) +
        Number((_random1 * nowDay).toFixed(2))) *
      0.9288
    ).toFixed(2)
  );
};

photovoltaicPower.init();
