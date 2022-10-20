function getParams() {
  var _stringSarch = location.search,
    _stringParams = _stringSarch.replace("?", ""),
    _strings = _stringParams.split("&");
  var _params = {};
  $.each(_strings, function () {
    var _object = this.split("=");
    _params[_object[0]] = _object[1];
  });
  return _params;
}

function ArrayFindIndex(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * 转换并合并为JSON对象
 * @param {Array} data
 */
function toJsonArrayWithUnionData(data, groups, id) {
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    return data;
  }

  function filter() {
    var _keys = [];
    $.each(Object.keys(data[0]), function () {
      var key = this.toString();
      if (groups.indexOf(key) <= -1) {
        _keys.push(key);
      }
    });
    return _keys;
  }
  var _objectMap = {};
  var propkey = filter()[0];
  $.each(data, function (i) {
    var _object = _objectMap[this[id]] || {};
    var _pthis = this;
    var _keys = Object.keys(this);
    var _column = _object[propkey] || {};
    $.each(_keys, function () {
      var key = this.toString();
      if (typeof _object[key] === "undefined") {
        if (groups.indexOf(key) <= -1) {
          _column[key] = _pthis[key];
        } else {
          _object[key] = _pthis[key];
        }
      } else {
        if (groups.indexOf(key) <= -1) {
          _column[key] = _pthis[key];
        }
      }
      _object[_pthis[propkey]] = _column;
    });
    _objectMap[_pthis[id]] = _object;
  });

  var _returnArray = [];
  $.each(Object.keys(_objectMap), function () {
    var _returnObject = {};
    var _propArray = [];
    var _pdata = _objectMap[this];
    $.each(Object.keys(_pdata), function () {
      var key = this.toString();
      if (groups.indexOf(key) > -1) {
        _returnObject[key] = _pdata[key];
      } else {
        _propArray.push(_pdata[key]);
      }
    });
    _returnObject["prop"] = _propArray;
    _returnArray.push(_returnObject);
  });
  return _returnArray;
}

/**
 * 指定位置插入新字符串
 * @param {Number} start 开始索引
 * @param {String} newStr 新字符串
 */
String.prototype.splice = function (start, newStr) {
  return this.slice(0, start) + newStr + this.slice(start);
};

/**
 * 插入换行符号
 * @param {String} string
 * @param {Number} spitIndex
 */
function insertWarpByIndex(string, spitIndex) {
  var stringArr = string.split("");
  var conut = 0;
  $.each(stringArr, function (i) {
    if (i % spitIndex === 0 && i > 0 && i < stringArr.length) {
      string = string.splice(i + conut++, "\n");
    }
  });
  return string;
}

/**
 * [处理结果集]
 * @author xiaojie
 * @param  v [值]
 * @date 2020/10/16 11:12
 */
function convert(v) {
  //判断当v为undefinded或者值为NULL时页面显示--
  return typeof v === "undefined" || v == null || v == "None" ? "--" : v;
}

/**
 * [处理结果集（数字）]
 * @author xiaojie
 * @param v [数值]
 * @param f [保留几位小数]
 * @date 2020/10/16 10:54
 */
function convertNumber(v, f) {
  //判断当v为undefinded或者值为NULL时页面显示--
  if (typeof v === "undefined" || v == null) {
    return "--";
  }
  var numberV = parseFloat(v);
  if (isNaN(v)) {
    return "--";
  }
  if (typeof f === "undefined") {
    return Math.round(v).toLocaleString();
  } else {
    return numberV.toFixed(f);
  }
}

/**
 * [处理结果集（百分比数据）]
 * @author xiaojie
 * @param v [值]
 * @param isexe [是否需要处理，true处理返回值，其他不处理返回值+%]
 * @date 2020/10/16 10:53
 */
function convertRate(v, isexe) {
  //判断是否需要处理
  if (isexe === true) {
    return typeof v === "undefined" || v == null ? 0 : v;
  }
  return typeof v === "undefined" || v == null ? "--" : v + "%";
}

/**
 * [自动赋值：将json数据中的值赋值到元素ID为键名的元素]
 * @author xiaojie
 * @param data [json数据]
 * @date 2020/10/16 10:23
 */
function autoSetElement(data) {
  $.each(Object.keys(data), function () {
    var $outDom = $("#".concat(this));
    if ($outDom.length > 0) {
      $outDom.text(convert(data[this]));
    }
  });
}

/**
 * [显示设备信号：当v的值为1，则显示t标题，0则显示t2标题，其他显示--]
 * @author xiaojie
 * @param v [值]
 * @param t [显示信息1 默认状态1]
 * @param t2 [显示信息2 默认状态0]
 * @param ist2 [是否默认显示2，true显示2，其他或不传参则显示1]
 * @date 2020/10/16 12:21
 */
function showdeviceStatus(v, t, t2, ist2) {
  //判断没有数值则返回--
  if (typeof v === "undefined" || v == null) {
    return "--";
  }
  //标题t默认状态值
  var normalTValue = 1;
  var normalT2Value = 0;
  //当ist2为true时转换默认值
  if (ist2 === true) {
    normalTValue = 0;
    normalT2Value = 1;
  }
  return parseInt(v) === normalTValue ? t : parseInt(v) === normalT2Value ? t2 : "--";
}
/*字符串中间添加特殊符号
str：字符串
sub：添加的字符
index：添加字符的位置
*/
function insertAt(str, sub, index) {
  return str.substr(0, index) + sub + str.substr(index);
}
/*按小时整点刷新*/
function refreshHour(callback) {
  setInterval(function () {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (min == 0) {
      if (sec == 0 || sec == 20 || sec == 40 || sec == 59) {
        console.log("=============");
        console.log("整点刷新");
        console.log(hour + "时" + min + "分" + sec + "秒");
        callback();
      }
    }
  }, 1000);
}

/*生成n-m之间的随机数，支持小数
  maxNum：最大数
  minNum：最小数
  decimalNum：保留小数的位数
*/
function randomNum(maxNum, minNum, decimalNum) {
  var max = 0,
    min = 0;
  minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * (max + 1));
      break;
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min);
      break;
    case 3:
      return (Math.random() * (max - min) + min).toFixed(decimalNum);
      break;
    default:
      return Math.random();
      break;
  }
}

/**
 * [函数防抖]
 * @author JF
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 * @desc  非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间；
 *        立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
 */
function debounce(func, wait, immediate = true) {
  let timer;
  return function () {
    let context = this,
      args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait)
    }
  }
}

/**
 * [函数节流]
 * @author JF
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 * @desc  时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
 */
function throttle(func, wait, type = 1) {
  if (type === 1) {
    let previous = 0;
  } else if (type === 2) {
    let timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/*标签选项卡*/
//multilayer 多层(zg-tab-content中的zg-tab-item层可以切换)  
//monolayer 单层(zg-tab-content中只有一个zg-tab-item，通过回调改变里面的内容)
//zg-tab-content层在不需要的时候可以不写
function ZgTabBar(params, callback) {
  var elementId = params.elementId || ""; //选项卡外层id
  var tabTitleStyle = params.tabTitleStyle || {}; //切换按钮样式对象
  var tabTitleStyleOn = tabTitleStyle.on || ""; //切换按钮选中高亮样式
  var tabTitleStyleDefault = tabTitleStyle.default || ""; //切换按钮默认样式
  var selectedLabelIndex = params.selectedLabelIndex || "0"; //选中标签索引

  $('#' + elementId + ' .zg-tab-title .btn').eq(selectedLabelIndex).addClass("on"); //选中标签
  if ($('#' + elementId + ' .zg-tab-content .zg-tab-item').length >= selectedLabelIndex) {
    $('#' + elementId + ' .zg-tab-content .zg-tab-item').eq(selectedLabelIndex).addClass("zg-show"); //选中标签内容层显示
  }

  $('#' + elementId + ' .zg-tab-title .btn').attr("style", tabTitleStyleDefault); //样式初始化
  $('#' + elementId + ' .zg-tab-title .btn.on').attr("style", tabTitleStyleOn); //样式初始化
  $('#' + elementId + ' .circleline .btn').each(function (btnindex, item) {
    if (btnindex < selectedLabelIndex) {
      // $(item).attr("style","background:url(./image/tabBar/bg_blue.png) no-repeat 0px 8px");
      $(item).attr("style", "background:url(../../common/image/tabBar/bg_blue.png) no-repeat 0px 8px");
      // $(item).attr("style","background:url(../../../common/image/tabBar/bg_blue.png) no-repeat 0px 8px");
    }
  })

  //按钮点击事件
  $('#' + elementId + ' .zg-tab-title').on('click', '.btn', function () {
    var zgTab = $(this).parents(".zg-tab");
    var tabtype = zgTab.attr("zg-tabtype");
    $(this).addClass('on').siblings().removeClass('on');
    $(this).attr("style", tabTitleStyleOn).siblings().attr("style", tabTitleStyleDefault);
    var ind = $(this).index();
    var text = $(this).html();
    if (tabtype == "multilayer") {
      //多层
      if (zgTab.find(".zg-tab-item").length > ind) {
        zgTab.find(".zg-tab-item").eq(ind).addClass("zg-show").siblings(".zg-tab-item").removeClass("zg-show");
      }
      if (callback) {
        callback(ind, text);
      }
    } else if (tabtype == "monolayer") {
      //单层
      if (zgTab.find(".zg-tab-item").length > 0) {
        var zgTabItem = zgTab.find(".zg-tab-item").eq(0);
      }
      if (callback) {
        callback(ind, text, zgTabItem);
      }
    }

  })
}


// 加减控件
function scaleBtn(size, maxVal = 100, minVal = 0, step = 1, callBackFun = false) {
  let toolsObj = $("[data-tool='scale']");
  toolsObj.css({
    width: size + 'px',
    height: size + 'px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#444750',
    borderRadius: '5px',
    cursor: 'pointer'
  })

  toolsObj.on("click", function (e) {
    e.preventDefault()
    e.stopPropagation()
    let parentObj = $(this).parent();
    let isDisable = parentObj.parents('.devControl').data('disable');

    if (isDisable != 1) {
      return
    }
    let val = parentObj.data("scaleval");
    let type = $(this).data("type");
    if (type == 'up') {
      val = (parseFloat(val) + parseFloat(step)).toFixed(1);
    } else {
      val = (parseFloat(val) - parseFloat(step)).toFixed(1);
    }
    if (val < minVal) {
      val = minVal;
      //return;
    }
    if (val > maxVal) {
      val = maxVal;
      //return;
    }
    parentObj.data("scaleval", parseFloat(val).toFixed(1));
    let thisObj = $(this);
    if (callBackFun && typeof callBackFun == 'function') {
      callBackFun(thisObj, val);
    }
  })
}

// 设置默认加减参数
function setScaleVal(val, thisObj) {
  thisObj.data("scaleval", val);
  thisObj.find("[data-tool='scale']").val(val);
  thisObj.find(".scaleRes span").text(parseFloat(val).toFixed(1));
}

function openBar(size, callBackFun) {
  let toolsObj = $("[data-tool='on-off']");
  toolsObj.css({
    width: size * 2 + 'px',
    height: size + 'px',
    background: '#444750',
    borderRadius: size / 2 + 'px',
    position: 'relative',
    cursor: 'pointer'
  })

  // 初始样式
  toolsObj.append(`<div class="_openBtn" style="width: ${size}px; height: ${size}px; background-color: #ACAEB2;position: absolute; left: 0px; border-radius:${size/2}px"></div>
  <div class="_openText" style="width: ${size}px; height: ${size}px; float: right; display: flex;justify-content: center;align-items: center;"><span style="font-size: 16px;color: #ACAEB2; font-weight:bold;transform:scale(0.55)">OFF</span></div>
  <div class="_openOffline" style="display:none;justify-content: center;align-items: center;height: 100%;font-size: 12px;">离线</div>`);

  // 监听点击触发切换
  toolsObj.on("click", function (e) {
    e.preventDefault()
    e.stopPropagation()
    let thisObj = $(this);
    let isDisable = thisObj.parents('.devControl,.lightBox').data('disable');
    if (isDisable == 0) {
      return
    }
    let isOpen = $(this).data("open");
    if (isOpen == 0 || isOpen == 1) {
      isOpen = isOpen == 0 ? 1 : 0;
    }else{
      return
    }
    setOpenVal(isOpen, $(this));

    if (callBackFun && typeof callBackFun == 'function') {
      callBackFun(thisObj, isOpen)
    }
  });
}

// 根据参数设置开关
function setOpenVal(val, thisObj) {
  switch (val) {
    case 0: // 关
      thisObj.find("div._openBtn").css({
        display: 'block',
        left: "0px",
        background: "#ACAEB2",
        transition: "left 0.5s",
      });

      thisObj.find("div._openText").css({
        display: 'flex',
        float: "right"
      })

      thisObj.find("div._openText span").css({
        color: "#ACAEB2",
      }).text('OFF');

      thisObj.find("div._openOffline").css({
        display: 'none',
      });

      thisObj.data("open", 0);
      thisObj.css({
        background: "#444750",
      });
      break;
    case 1: // 开
      thisObj.find("div._openBtn").css({
        display: 'block',
        left: thisObj.height() + "px",
        background: "#2AF99A",
        transition: "left 0.5s",
      });

      thisObj.find("div._openText").css({
        display: 'flex',
        float: "left"
      });

      thisObj.find("div._openText span").css({
        color: "#2AF99A",
      }).text('ON');

      thisObj.find("div._openOffline").css({
        display: 'none',
      });

      thisObj.data("open", 1);
      thisObj.css({
        background: "#076037",
      });
      break;
    default: //离线
      thisObj.find("div._openBtn").css({
        display: "none",
        transition: "display 0.5s",
      });

      thisObj.find("div._openText").css({
        display: "none",
      });

      thisObj.find("div._openOffline").css({
        display: 'flex',
      }).text('离线');

      thisObj.data("open", 9);
      thisObj.css({
        background: "#444750",
      });

      break;
  }
}

// 设置拖拽进度条
function setProgressVal(val, progressObj, time = '0.5') {
  let progressLen = progressObj.width() / 100 * val;
  progressObj.find('.ProgressLine').css({
    width: progressLen + 'px',
    transition: "width " + time + "s"
  })
  progressObj.data('val', val)
}

//选项卡
var tabBar = {
  //彩色按钮
  //callBackFun回调函数
  //callBackFun(i,lableName)参数包括i:索引  lableName:标签名
  tabBarColorfulBtn: function (callBackFun) {
      var objs = $("[data-tool='color-tab']");
      objs.each(function (i, item) {
        var thisObj = $(item)
        var itemArray = thisObj.data("items").split(",");
        var selectIndex = thisObj.data("index");
        var str = `<div class="zg-tab-title colorful">`;
        for (var i = 0; i < itemArray.length; i++) {
          var divclass = "btn";
          if (i === selectIndex) {
            divclass = "btn on";
          }
          str += `<div class="${divclass}">${itemArray[i]}</div>`;
        }
        str += `</div>`;
        thisObj.html(str);
      })

      objs.on("click", ".btn", function () {
        let isDisable = $(this).parents('.lightBox').data('disable');
        if (isDisable != 1) {
          return
        }

        var ind = $(this).index(); //索引
        var lableName = $(this).html(); //文字
        $(this).addClass("on").siblings().removeClass("on");
        //$(this).parents(".zg-tab").attr("data-index",ind);
        $(this).parents(".zg-tab").data("index", ind);
        if (callBackFun && typeof callBackFun == 'function') {
          callBackFun(ind, lableName);
        }
      });

    }
    //设置彩色按钮选中 
    //obj:需要改版的对象
    //index:选中对象索引 "-"代表不选 0,1,2.....
    ,
  colorfulChangeChecked: function (obj, index, isOpen = 1) {
      obj.data("index", index);
      if (isOpen == 1) {
        obj.find(".btn").removeClass("on");
        obj.find(".btn").eq(index).addClass("on");
      } else {
        obj.find(".btn").removeClass("on");
      }
      // obj.attr("data-index",index);

    }
    //圆环线按钮
    //callBackFun回调函数
    //callBackFun(i,lableName)参数包括i:索引  lableName:标签名
    ,
  tabBarCirclelineBtn: function (callBackFun) {
      var objs = $("[data-tool='line-tab']");
      objs.each(function (i, item) {
        var thisObj = $(item)
        var itemArray = thisObj.data("items").split(",");
        var selectIndex = thisObj.data("index");
        //根据标签需要，如果是4，就当成0使用给自己程序
        if (selectIndex == 4) {
          selectIndex = 0;
        }
        var str = `<div class="zg-tab-title circleline">`;
        for (var i = 0; i < itemArray.length; i++) {
          var divclass = "btn";
          if (i > 0 && i < selectIndex && selectIndex <= itemArray.length - 1) {
            divclass = "btn blue";
          }
          if (i === selectIndex) {
            divclass = "btn on";
          }
          str += `<div class="${divclass}">${itemArray[i]}</div>`;
        }
        str += `</div>`;
        thisObj.html(str);
      })

      objs.on("click", ".btn", function () {
        let isDisable = $(this).parents('.devControl').data('disable');
        if (isDisable != 1) {
          return
        }

        var ind = $(this).index(); //索引
        var lableName = $(this).html(); //文字
        $(this).addClass("on").siblings().removeClass("on").siblings().removeClass("blue");

        $(this).parents(".zg-tab").find(".btn").each(function (i) {
          if (i > 0 && i < ind) {
            $(this).addClass("blue");
          }
        });
        // $(this).parents(".zg-tab").attr("data-index",ind);
        //根据标签需要，如果是0，就变成4返回给页面
        if (ind == 0) {
          ind = 4;
        }
        $(this).parents(".zg-tab").data("index", ind);
        //$(this).parents(".zg-tab").attr("data-index",ind);
        if (callBackFun && typeof callBackFun == 'function') {
          callBackFun(ind, lableName);
        }

      });
    }
    //设置圆环按钮选中 
    //obj:需要处理的对象
    //index:选中对象索引 "-"代表不选 0,1,2.....
    ,
  circlelineChangeChecked: function (obj, index, isOpen = 1) {
      obj.data("index", index);
      if (isOpen == 1) {
        if (index == 4) {
          index = 0;
        }
        //obj.attr("data-index",index);				
        obj.find(".btn").removeClass("on");
        obj.find(".btn").removeClass("blue");
        obj.find(".btn").eq(index).addClass("on");
        obj.find(".btn").each(function (i, item) {
          if (i > 0 && i < index) {
            $(item).addClass("blue");
          }
        });
      } else {
        obj.find(".btn").removeClass("on");
        obj.find(".btn").removeClass("blue");
      }
    }
    //图片按钮
    ,
  tabBarImgBtn: function (callBackFun) {
      var objs = $("[data-tool='img-tab']");
      let modelArr = ["制冷","制热","送风"]

      objs.each(function (i, item) {
        var thisObj = $(item)
        // var itemArray=thisObj.data("items").split(",");
        var length = 3;
        var selectIndex = thisObj.data("index");
        var str = `<div class="zg-tab-title img-tab">`;
        for (var i = 0; i < length; i++) {
          var divclass = "btn";
          if (i === selectIndex) {
            divclass = "btn on";
          }
          str += `<div class="${divclass} modelBtn" data-num="${modelArr[i]}"></div>`;
        }
        str += `</div>`;
        thisObj.html(str);
      })
      objs.on("click", ".btn", function () {
        let isDisable = $(this).parents('.devControl').data('disable');
        if (isDisable != 1) {
          return
        }
        var ind = $(this).index(); //索引
        $(this).addClass("on").siblings().removeClass("on").siblings().removeClass("blue");

        $(this).parents(".zg-tab").find(".btn").each(function (i) {
          if (i < ind) {
            $(this).addClass("blue");
          }
        });
        $(this).parents(".zg-tab").data("index", ind);
        if (callBackFun && typeof callBackFun == 'function') {
          callBackFun(ind);
        }
      });
    }
    //设置图片按钮选中 
    //obj:需要改变的对象
    //index:选中对象索引 "-"代表不选 0,1,2.....
    ,
  tabBarImgChangeChecked: function (obj, index, isOpen = 1) {
    obj.data("index", index);
    if (isOpen == 1) {
      //obj.data("index",index);
      obj.find(".btn").removeClass("on");
      obj.find(".btn").eq(index).addClass("on");
    } else {
      obj.find(".btn").removeClass("on");
      //obj.find(".btn").eq(index).addClass("on");
    }
  }
}
//滑块
//<div class="zg-silder" data-tool="slider" data-count="10" data-disabled="1"></div>
//data-count 数值
//data-disabled 是否可用 1:可用 0:禁用
//修改数值的时候直接修改对应标签值，然后从新调用本方法即可
function ZgSlider(callBackFun) {
  layui.use('slider', function () {
    var slider = layui.slider;
    var objs = $("[data-tool='slider']");
    objs.each(function (index, item) {
      var count = $(item).data("count");
      var ifdisabled = $(item).parents('.lightBox').data("disable") == "1" ? false : true;
      var that = $(this);
      //渲染
      slider.render({
        elem: that, //绑定元素
        value: count,
        disabled: ifdisabled,
        change: function (value) {
          console.log(value) //动态获取滑块数值		  		
          that.data("count", value);
        }
      });
    })

    var thatss;
    $(document).on('mousedown', "[data-tool='slider']", function (e) {
      thatss = $(this);
    })

    $(document).on('mouseup', function (e) {
      if (typeof thatss == 'undefined') {
        return
      }
      e.preventDefault();
      e.stopPropagation();
      setTimeout(function () {
        if (callBackFun && typeof callBackFun == 'function') {
          // typeof thatss
          console.log(typeof thatss)
          var count = thatss.data("count");
          var ifdisabled = thatss.parents('.lightBox').data("disable") == "1";
          if (ifdisabled) {
            callBackFun(count, thatss);
          }
          thatss = undefined;
        }
      }, 100);
    })

  });
}

//滑块改变值
function ZgSliderSetValue(obj, count) {
  obj.data("count", count);
  ZgSlider();
}

$(function() {
  //获得当前<ul>
  var $uList = $(".scroll-box ul");
  var timer = null;
  //触摸清空定时器
  $uList.hover(function() {
      clearInterval(timer);
  },
  function() { //离开启动定时器
      timer = setInterval(function() {
          scrollList($uList);
      },
      1000);
  }).trigger("mouseleave"); //自动触发触摸事件
  //滚动动画
  function scrollList(obj) {
      //获得当前<li>的高度
      var scrollHeight = $("ul li:first").height();
      //滚动出一个<li>的高度
      $uList.stop().animate({
          marginTop: -scrollHeight
      },
      1000,
      function() {
          //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
          $uList.css({
              marginTop: 0
          }).find("li:first").appendTo($uList);
      });
  }
});

// 根据用户判断是否支持触屏U3d
function isTouchUnity3D(params) {
  let touchUnityUserArr = ['huangcq', 'qinjinghua']
  let userInfoObj = JSON.parse(localStorage.getItem("USER_INFO_CACHE"));
  if (touchUnityUserArr.indexOf(userInfoObj.loginName) !== -1) {
    return true
  }else{
    return false
  }
}
/* 
 * 按天数前推时间后推时间
 * num 间隔天数
 * flag  ture前推 false后推
 * str 年月日间隔符
 */
function changeTimeDate(num = 0,flag = true,str = '-'){
	let t = new Date().getTime();
	t = flag ? t - num*24*60*60*1000 : t + num*24*60*60*1000;
	let date = new Date(t);
	let Y = date.getFullYear();
	let M = date.getMonth()+1;
	let D = date.getDate();
	M = M < 10 ? '0' + M : M;
	D = D < 10 ? '0' + D : D;
	return Y + str + M + str + D;
}
/* 
 * 间隔时间
 * iM 间隔月
 * iD 间隔日
 * flag true前推 false 后推
 * begin true日期设为1号，false日期设为正常计算日期，
 * str 年月日间隔符
 * 
 */
function getIntervalDate(iM=0,iD=0,flag=true,begin=true,str='-'){
	let Y = new Date().getFullYear();
	let M = new Date().getMonth()+1;
	let D = new Date().getDate();
	
	if(flag){
		let iY = Math.floor(iM/12);
		Y = Y - iY;
		iM = iM%12;
		if(M - iM == 0){
			Y = Y - 1;
			M = 12;
		}  else if(M - iM < 0){
			Y = Y - 1;
			M = 12+(M - iM);
		} else {
			M = M - iM;
		}
	} else {
		let iY = Math.floor(iM/12);
		Y = Y + iY;
		iM = iM%12;
		if(M + iM == 12){
			Y = Y + 1;
			M = 1;
		}  else if(M - iM > 12){
			Y = Y - 1;
			M = -12+(M + iM);
		} else {
			M = M + iM;
		}
	}
	// console.log(Y,M,D);
	let t = new Date(Y,M-1,D).getTime();
	if(flag){
		t = new Date(t - iD*24*60*60*1000);
	} else {
		t = new Date(t + iD*24*60*60*1000);
	}
	Y = t.getFullYear();
	M = t.getMonth()+1;
	D = t.getDate();
	if(begin){
		D = '01';
	} else {
		D = D < 10 ? '0' + D : D;
	}
	M = M < 10 ? '0' + M : M;
	// console.log(Y,M,D);
	return Y+str+M+str+D;
}
/* 
 * 移动
 * obj ={
 * 	selector:'', 容器
 * 	handle:'',把手
 * 	padding:[0,0,0,0],//边距
 * 	callBackMove:function(e){
 * 		e.type//类型
 * 		e.initPosition//初始位置
 * 		e.lastTimePosition//上次移动结束位置
 * 		e.thisPosition//本次结束位置
 * 	},回调函数
 *}
 * 
 */
function move(obj){
	let id = obj.handle == undefined ? obj.selector:obj.handle;
	let padding = obj.padding == undefined ? [0,0,0,0] : obj.padding;
	if(padding.length == 1){
		padding = [padding[0],padding[0],padding[0],padding[0]];
	} else if(padding.length == 2){
		padding = [padding[0],padding[1],padding[0],padding[1]];
	} else if(padding.length == 3){
		padding = [padding[0],padding[1],padding[2],padding[1]];
	} else {
		padding = [padding[0],padding[1],padding[2],padding[3]];
	}
	let W = $(document).width(), H = $(document).height();
	$(window).on('resize',function(){
		W = $(document).width();
		H = $(document).height();
	})
	let mouseX = 0, mouseY = 0, divX = 0, divY = 0;
	let that = this;
	let positionStar = [],positionEnd = [],path = [],startTime = 0,endTime = 0;
	let initPosition = {left:$(obj.selector).offset().left,top:$(obj.selector).offset().top};
	$(id).hover(function(){
		$(this).css({'cursor':'move'});
	},function(){
		$(this).css({'cursor':'none'});
	})
	$(id).mousedown(function(e){
		$('body').append(`
		<div class="cameraMask" style="
		position:absolute;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);
		"></div>`);
		divX = e.pageX - $(obj.selector).offset().left;
		divY = e.pageY - $(obj.selector).offset().top;
		positionStar = {left:$(obj.selector).offset().left,top:$(obj.selector).offset().top};
		positionEnd = {left:$(obj.selector).offset().left,top:$(obj.selector).offset().top};
		startTime = new Date().getTime();
		$(document).mousemove(function(e){
			mouseX = e.clientX; mouseY = e.clientY;
			let left = mouseX - divX,top = mouseY - divY;
			if(left <= padding[3] ){
				left = padding[3];
			} else if(left+$(obj.selector).width()>W-padding[1]){
				left = W - padding[1] - $(obj.selector).width();
			}
			if(top <= padding[0] ){
				top = padding[0];
			} else if(top+$(obj.selector).height()>H-padding[2]){
				top = H - padding[2] - $(obj.selector).height();
			}
			$(obj.selector).css({
				"left":left,
				"top":top,
				"transform":"none",
			})
			if(mouseX - divX != positionStar[0] && mouseY - divY != positionStar[1]){
				path.push({left:mouseX - divX,top:mouseY - divY});
			}
		})
	})
	$(document).mouseup(function(e){
		$(document).unbind('mousemove');
		$('body .cameraMask').remove();
		positionEnd = {left:$(obj.selector).offset().left,top:$(obj.selector).offset().top};
		endTime = new Date().getTime();
		// console.log(positionStar);
		// console.log(positionEnd);
		// console.log(endTime - startTime);
		if(obj.callBackMove && typeof obj.callBackMove == 'function'){
			if(JSON.stringify(positionEnd) !== JSON.stringify(positionStar) &&
			path.length != 0){
				obj.callBackMove({
					type:'move',
					initPosition:initPosition,
					lastTimePosition:positionStar,
					thisPosition:positionEnd,
				});
			} else if(JSON.stringify(positionEnd) == JSON.stringify(positionStar) &&
			path.length != 0){
				obj.callBackMove({
					type:'loopback',
					initPosition:initPosition,
					lastTimePosition:positionStar,
					thisPosition:positionEnd,
				});
			} else if(JSON.stringify(positionEnd) == JSON.stringify(positionStar) &&
			path.length == 0){
				obj.callBackMove({
					type:'click',
					initPosition:initPosition,
					lastTimePosition:positionStar,
					thisPosition:positionEnd,
				});
			}
			positionStar = positionEnd;
			path = [];
		}
	})
}
// 近30天时间
function nearlyThirtyDays(dateNumbers, interval = '-', showYear = false) {
	let date = new Date();
	let time = date.getTime();
	let dateArray = [];
	for (let i = 1; i <= dateNumbers; i++) {
		let earlyTime = time - 24 * 60 * 60 * 1000 * i;
		let Y = new Date(earlyTime).getFullYear();
		let M = new Date(earlyTime).getMonth() + 1;
		let D = new Date(earlyTime).getDate();
		M = M < 10 ? '0' + M : M;
		D = D < 10 ? '0' + D : D;
		if (showYear) {
			dateArray.push(`${Y}${interval}${M}${interval}${D}`);
		} else {
			dateArray.push(`${M}${interval}${D}`);
		}
	}
	dateArray.reverse();
	return dateArray;
}
// 当日实时整点时间
function onTheHour (){
	let timer = new Date()
	let H = timer.getHours();
	let timerArr = []
	for(var i = 0; i <= H; i++){
		timerArr.push(i < 10 ? '0' + i + ':00' : i + ':00');
	}
	return timerArr;
}
// 近12月
function nearlyTwelveMonth(){
	let year = new Date().getFullYear();
	let M = new Date().getMonth();
	let arrayDate = [];
	for(let i = 0; i <= 11 ; i++){
		if(M == 0){
			M = 12;
			year = year - 1;
		}
		M = M < 10 ? '0' + M : M;
		arrayDate.push(year+'.'+M);
		M = M - 1;
	}
	arrayDate.reverse();
	return arrayDate;
}
// 计算0.5小时
function calculateHalfHour(val){
	let Remainder = val%1;
	let Integer = Math.floor(val);
	if(Remainder>0.5){
		Integer = Integer+1;
	} else if(Remainder<=0.5){
		Integer = Integer+0.5;
	}
	return Integer;
}

