var hdU3D = {};
var _SITE_ID = getParams()['siteId'];
var _PROJECT_ID = getParams()['projectId'];
var layuiId = getParams()['layuiId']; //标签id
var timer = null;
var timer1 = null;
// 离开页面调用
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden') {
    clearInterval(timer);
  } else {
    hdU3D.oneMinutesUpdate(); //一分钟更新
  }
});
// var objName = layuiId;
// //刷新
// window.onunload = function() {
// 	top.unregisterListener(objName); //销毁
// 	clearInterval(timer);
// }
// //标签切换之后
// top.registerListener(objName, function(e) {
// 	if(objName == e){
// 		hdU3D.oneMinutesUpdate(); //一分钟更新
// 	} else {
// 		clearInterval(timer);
// 	}
// }); //注册
hdU3D.init = function () {
  $('.sc-container').prepend(
    '<iframe src="./pd_ZongLan/index.html?v=' +
      version +
      '" width="100%" frameborder="0" height="100%"></iframe>',
  );
  hdU3D.inform(); //位置信息
  hdU3D.energyUse(); //项目能耗
  hdU3D.changeEnergy();
  hdU3D.projectSecurity(); // 告警统计
  hdU3D.showHideButtom(); //收起按钮
  hdU3D.faultPopups();
  hdU3D.device();
  hdU3D.oneMinutesUpdate(); //一分钟更新
  hdU3D.windowTo(); //跳转
};
var skyFlag = false;
hdU3D.U3Dinit = function (gameInstance) {
  $('.U3DBtn').on('click', function () {
    if (skyFlag) {
      return;
    }
    skyFlag = true;
    if ($(this).hasClass('U3DLeft')) {
      if (!$(this).hasClass('U3DLeftOn')) {
        $('.U3DLeft').addClass('U3DLeftOn');
        $('.U3DRight').removeClass('U3DRightOn');
        gameInstance.SendMessage('BloomSitting', 'OpenDay');
      } else if ($(this).hasClass('U3DLeftOn')) {
        $('.U3DLeft').removeClass('U3DLeftOn');
        $('.U3DRight').addClass('U3DRightOn');
        gameInstance.SendMessage('BloomSitting', 'OpenNight');
      }
    } else if ($(this).hasClass('U3DRight')) {
      if (!$(this).hasClass('U3DRightOn')) {
        $('.U3DLeft').removeClass('U3DLeftOn');
        $('.U3DRight').addClass('U3DRightOn');
        gameInstance.SendMessage('BloomSitting', 'OpenNight');
      } else if ($(this).hasClass('U3DRightOn')) {
        $('.U3DLeft').addClass('U3DLeftOn');
        $('.U3DRight').removeClass('U3DRightOn');
        gameInstance.SendMessage('BloomSitting', 'OpenDay');
      }
    }
  });
  $('.btn-show').on('click', function () {
    let type = $(this).attr('data-type');
    if (type == '1') {
      $(this).removeClass('open');
      $(this).addClass('close');
      $(this).attr('data-type', '0');
      gameInstance.SendMessage('RecvJsMessageObject', 'GetEvent', '15001, ');
    } else {
      $(this).addClass('open');
      $(this).removeClass('close');
      $(this).attr('data-type', '1');
      gameInstance.SendMessage('RecvJsMessageObject', 'GetEvent', '15001, ');
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
        if (data['code'] == 0) {
          gameInstance.SendMessage(
            'Distribution',
            'StateSet',
            JSON.stringify(data),
          );
        }
      },
    );
  };
  hdU3D.sendMsg();
  // timer1 = setInterval(function(){
  // 	hdU3D.sendMsg();
  // },60*1000);
};
//一分钟更新
hdU3D.oneMinutesUpdate = function () {
  timer = setInterval(function () {
    // console.log('一分钟更新');
    hdU3D.energyUse(); //项目能耗
    hdU3D.device();
    hdU3D.projectSecurity(); // 项目安全
    $('#fault').css({
      opacity: '0',
      'z-index': -100,
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
      if (data['code'] === 0) {
        var result = data.data || {};
        Object.keys(result).forEach(function (item) {
          var dom = $('#' + item);
          if (dom.length > 0) {
            dom.text(result[item]);
          }
        });
      }
    },
  );
};
//项目能耗
hdU3D.energyUse = function () {
  $.get(hdInterface.selectEnergyStaticsDetailByProjectId, {
    projectId: _PROJECT_ID,
  }).done(function (data) {
    if (data['code'] === 0) {
      Object.keys(data.data).forEach((item, index) => {
        $('#' + item).html(convert(data.data[item]));
      });
      hdU3D.waterTank((convert(data.data.currentLoadPercent) / 100).toFixed(2));
    }
  });
};
// 项目能耗切换
let timerEnergy = null;
hdU3D.changeEnergy = function () {
  let num = 1;
  $('.energyBtnParent .btn').on('click', function () {
    if ($(this).hasClass('on')) {
      return;
    }
    $(this).addClass('on').siblings().removeClass('on');
    let index = $(this).attr('data-type');
    num = index;
    $(`.content[data-type=${index}]`)
      .removeClass('op')
      .siblings('.content')
      .addClass('op');
  });
  timerEnergy = setInterval(function () {
    num++;
    if (num % 2 == 1) {
      $('.energyBtnParent .btn[data-type=1]')
        .addClass('on')
        .siblings()
        .removeClass('on');
      $(`.content[data-type=1]`)
        .removeClass('op')
        .siblings('.content')
        .addClass('op');
    } else if (num % 2 == 0) {
      $('.energyBtnParent .btn[data-type=2]')
        .addClass('on')
        .siblings()
        .removeClass('on');
      $(`.content[data-type=2]`)
        .removeClass('op')
        .siblings('.content')
        .addClass('op');
    }
  }, 30 * 1000);
};
// 告警统计
hdU3D.projectSecurity = function () {
  // 报警
  $.get(
    hdInterface.alarmProjectNoticeList,
    {
      projectId: _PROJECT_ID,
      alarmTypes: '4,5,6',
    },
    function (data) {
      if (data.code == 0) {
        if (data.data.length != 0) {
          $('#bj').html(convert(data.data.length));
          if (data.data.length == 0) {
            let param1 = {
              // title:['网关名称','网关状态','最后采集时间'],
              list: [
                {
                  text: '<div style="color:#00ffff;text-align:center;">当前暂无报警</div>',
                },
              ],
            };
            let fireList1 = new listRollNew('fault', param1); //实例化
            return;
          }
          let param = {
            title: ['报警原因', '报警类型', '报警时间'],
            list: [],
            hangLie: {
              lieflag: true, //间隔列开
              lienum: '2', //间隔列 从0开始
              hangflag: true, //间隔行开
              hangnum: '0', //间隔行 从0开始
            },
          };

          data.data.forEach((item, index) => {
            param.list.push({
              reason: convert(item.reason),
              alarmTypeName: convert(item.alarmTypeName),
              alarmTime: convert(item.alarmTime),
            });
          });
          let fault = new listRollNew('fault', param); //实例化
          $('#fault .gDhang_item0').css({
            color: '#ff4444',
          });
          $('#fault .gDhang_item1').css({
            color: '#ff4444',
          });
          $('#fault .gDhang_item2').css({
            color: '#ff4444',
          });
        }
      }
    },
  );
  // 预警
  $.get(
    hdInterface.alarmProjectNoticeList,
    {
      projectId: _PROJECT_ID,
      alarmTypes: 3,
    },
    function (data) {
      if (data.code == 0) {
        $('#yj').html(convert(data.data.length));
        if (data.data.length == 0) {
          let param1 = {
            // title:['网关名称','网关状态','最后采集时间'],
            list: [
              {
                text: '<div style="color:#00ffff;text-align:center;">当前暂无预警</div>',
              },
            ],
          };
          let fireList1 = new listRollNew('fireList', param1); //实例化
          return;
        }
        let param = {
          title: ['预警原因', '预警类型', '预警时间'],
          list: [],
          hangLie: {
            lieflag: true, //间隔列开
            lienum: '2', //间隔列 从0开始
            hangflag: true, //间隔行开
            hangnum: '0', //间隔行 从0开始
          },
        };

        data.data.forEach((item, index) => {
          param.list.push({
            reason: convert(item.reason),
            alarmTypeName: convert(item.alarmTypeName),
            alarmTime: convert(item.alarmTime),
          });
        });
        let fireList = new listRollNew('fireList', param); //实例化
        $('#fireList .gDhang_item0').css({
          color: '#ffe037',
        });
        $('#fireList .gDhang_item1').css({
          color: '#ffe037',
        });
        $('#fireList .gDhang_item2').css({
          color: '#ffe037',
        });
      }
    },
  );
  // 规则数
  $.get(hdInterface.selectAlarmRuleCountByProjectId, {
    projectId: _PROJECT_ID,
  }).done((data) => {
    if (data.code == 0) {
      Object.keys(data.data).forEach((item, index) => {
        $('#' + item).html(convert(data.data[item]));
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
      lienum: '2', //间隔列 从0开始
      hangflag: true, //间隔行开
      hangnum: '1', //间隔行 从0开始
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
  let fault = new listRollNew('fault', param); //实例化
  $('#fault .gDlistIn li div').css('color', function () {
    if ($(this).html().indexOf('暂无异常') != -1) {
      return '#00ffff';
    } else {
      return '#FF4444';
    }
  });
};
// 弹窗
hdU3D.faultPopups = function () {
  $('#baojing').hover(
    function () {
      let offest = $(this).offset();
      $('#fault').css({
        opacity: '1',
        'z-index': 10,
        left: offest.left - 200 + 'px',
        top: offest.top - 180 + 'px',
      });
    },
    function () {
      $('#fault').css({
        opacity: '0',
        'z-index': -100,
      });
    },
  );
  $(window).on('resize', function () {
    $('#fault').css({
      opacity: '0',
      'z-index': -100,
    });
    $('#fireList').css({
      opacity: '0',
      'z-index': -100,
    });
  });
  $('#yujing').hover(
    function () {
      let offest = $(this).offset();
      $('#fireList').css({
        opacity: '1',
        'z-index': 10,
        left: offest.left - 200 + 'px',
        top: offest.top - 180 + 'px',
      });
    },
    function () {
      $('#fireList').css({
        opacity: '0',
        'z-index': -100,
      });
    },
  );
};

// 设备概况
hdU3D.device = function () {
  $.get(hdInterface.selectProjectDeviceCountStatics, {
    projectId: _PROJECT_ID,
  }).done((data) => {
    if (data.code == '0') {
      Object.keys(data.data).forEach((item, index) => {
        $('#' + item).html(convert(data.data[item]));
      });
      let val = data.data['deviceOnlineCount'] / data.data['deviceCount'];
      val = Math.round(val * 100);
      $('#val').html(convert(val));
      echarsComponent.getCircleChars({
        elementId: 'echarts',
        value: val > 100 ? 100 : val < 0 ? 0 : val,
        showText: false,
        startColor: 'rgba(0, 255, 255, 1)',
        endColor: 'rgba(0, 255, 255, 1)',
      });
    }
  });
};

//收起按钮
var bottomBar = null;
hdU3D.showHideButtom = function () {
  bottomBar = new SlideMenu({
    direction: 'down',
    menuBtn: '#buttomIcon',
    menuBox: '.bottombar',
    bgMask: false,
    menuSetPosition: [10, -230],
    btnSetposition: [240, 0],
    isOpen: true,
    bgDrop: 5,
    callBackFun: function (e) {
      if (e) {
        $('.buttomIcon i')
          .addClass('layui-icon-down')
          .removeClass('layui-icon-up');
      } else {
        $('.buttomIcon i')
          .removeClass('layui-icon-down')
          .addClass('layui-icon-up');
      }
    },
  });
};

//水箱
hdU3D.waterTank = function (data) {
  console.log(data, data - 0.05, data - 0.1);
  let water = new waterTank('waterTank', {
    data: [data, data - 0.05, data - 0.1],
    radius: '140%',
    center: ['50%', '50%'],
    borderDistance: 0,
    borderWidth: 0,
    borderColor: '#ff0000',
    unit: '',
    shape: 'path://M430,213.5h100v133H430V213.5z',
  });
};
// 跳转
hdU3D.windowTo = function () {
  $('#hoverFire').on('click', function () {
    let id = '';
    let title = '';
    let menuLeftId = '';
    let siteId = '';
    let projectId = '';
    parent.$('dt[data-name=AreaManagement] a').each((i, e) => {
      let dataUrl = $(e).attr('data-url');
      if (dataUrl.indexOf('bussiness/pdSquare/index.html') != -1) {
        id = $(e).attr('data-id');
        title = $(e).attr('data-title');
        let arr = dataUrl.substring(dataUrl.indexOf('?') + 1).split('&');
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf('=');
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj['menuLeftId'];
        siteId = obj['siteId'];
        projectId = obj['projectId'];
      }
    });
    let url = `bussiness/pdSecurity/index.html?projectId=${projectId}&siteId=${siteId}&sitename=中新装配式配电室安全概况&showmenu=show&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E5%AE%89%E5%85%A8%E6%A6%82%E5%86%B5&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
  $('#chuangan').on('click', function () {
    let id = '';
    let title = '';
    let menuLeftId = '';
    let siteId = '';
    let projectId = '';
    parent.$('dt[data-name=AreaManagement] a').each((i, e) => {
      let dataUrl = $(e).attr('data-url');
      if (dataUrl.indexOf('bussiness/pdSquare/index.html') != -1) {
        id = $(e).attr('data-id');
        title = $(e).attr('data-title');
        let arr = dataUrl.substring(dataUrl.indexOf('?') + 1).split('&');
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf('=');
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj['menuLeftId'];
        siteId = obj['siteId'];
        projectId = obj['projectId'];
      }
    });
    let url = `/bussiness/equipmentList/index.html?showmenu=show&siteId=${siteId}&projectId=${projectId}&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
  $('#jigui').on('click', function () {
    let id = '';
    let title = '';
    let menuLeftId = '';
    let siteId = '';
    let projectId = '';
    parent.$('dt[data-name=AreaManagement] a').each((i, e) => {
      let dataUrl = $(e).attr('data-url');
      if (dataUrl.indexOf('bussiness/pdSquare/index.html') != -1) {
        id = $(e).attr('data-id');
        title = $(e).attr('data-title');
        let arr = dataUrl.substring(dataUrl.indexOf('?') + 1).split('&');
        let obj = {};
        arr.forEach((item, index) => {
          let num = item.indexOf('=');
          obj[item.substring(0, num)] = item.substring(num + 1);
        });
        menuLeftId = obj['menuLeftId'];
        siteId = obj['siteId'];
        projectId = obj['projectId'];
      }
    });
    let url = `/bussiness/equipmentList/index.html?showmenu=show&siteId=${siteId}&projectId=${projectId}&titlename=%E4%B8%AD%E6%96%B0%E8%A3%85%E9%85%8D%E5%BC%8F%E9%85%8D%E7%94%B5%E5%AE%A4%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95&menuLeftId=${menuLeftId}&v=${version}`;
    top.window.openNewTab(url, id, title);
  });
};
hdU3D.init();
