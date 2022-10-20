/*
 * 滚动列表控件
 * 依赖：liMarquee.css listRoll.css jquery.js jquery.liMarquee.js
 * author:zxw 2021-03-17
 * params:{
 *		title: [],//列表标题
 *		list: [],//列表数据[必填]
 *		hangLie: {
 *			lieflag:true,//间隔列开
 *			lienum:'1',//间隔列 从0开始
 *			hangflag:true,//间隔行开
 *			hangnum:'1',//间隔行 从0开始
 *		},
 *		Keyword: [],//筛选文字
 *		KeywordClass: [],//筛选添加class样式
 * 		scrollamount:20,//滚动速度
 * }
 */
/*
 *example
 * let list = new listRollNew('id',{
 *	 title:['名称','时间'],
 *	 list:[
 *		 {name:'名称',time:'2021-03-17'},
 *		 {name:'名称',time:'2021-03-17'},
 *		 {name:'名称',time:'2021-03-17'},
 *		 {name:'名称',time:'2021-03-17'},
 *	 ],
 *	 Keyword: ['2021'],
 *	 KeywordClass: ['timetext'],
 * })
 * // 带icon图标内容文字请如下添加list:[]
 *	list:[
 * {键名:`<div class="gDtext">
 * 		<img class="gDimg" src="../../common/image/circle-red.png">
 *	</div>
 *	<div class="gDtext">
 *		&nbsp;&nbsp;报警
 *	</div>`}
 * ]
 *
 *
 *
 */
var listRollNew = (function ($) {
  // 构建方法
  function listRollNew(selector, param) {
    // 容器
    this.elementId = selector;
    // 参数
    this.param = param;
    this.init();
    title(this.elementId, this.param); //列标题
    list(this.elementId, this.param); //列表
    gun(this.elementId, this.param); //滚动
    hover(this.elementId, this.param); //滚动和hover效果
    resizeFull(this.elementId, this.param);
  }
  //列标题
  function title(selector, param) {
    $("#" + selector).html(`<div class="gDDiv">
							<div class="gunDong">
								<div class="gDitem"></div>
							</div>
							<div class="gDlistOut">
								<ul class="gDlistIn"></ul>
							</div>
							</div>`);
    var lienum = 0;
    for (var i = 0; i < param.title.length; i++) {
      if (lienum > param.hangLie.lienum) {
        lienum = 0;
      }
      $("#" + selector + " " + ".gDitem").append(
        `<div class="gDlie_title${lienum}">${param.title[i]}</div>`
      );
      if (param.hangLie.lieflag) {
        lienum++;
      } else {
      }
    }
  }
  // 列表渲染
  function list(selector, param) {
    var itemList = ""; //列表内循环变量
    var hangnum = 0;
    for (var i = 0; i < param.list.length; i++) {
      var lienum = 0;
      for (let key in param.list[i]) {
        // 手自动
        if (key == "automatically") {
          param.list[i][key] = Auto(param.list[i][key]);
        }
        if (lienum > param.hangLie.lienum) {
          lienum = 0;
        }
        itemList += `<div class="gDhang_item${lienum}">${param.list[i][key]}</div>`;
        if (param.hangLie.lieflag) {
          lienum++;
        }
      }
      if (hangnum > param.hangLie.hangnum) {
        hangnum = 0;
      }
      /* 带icon图标的文字项
				<div class="gDtext">
					<img class="gDimg" src="../../common/image/circle-red.png">
				</div>
				<div class="gDtext">
					&nbsp;&nbsp;报警
				</div> 
			*/
      $("#" + selector + " " + ".gDlistIn").append(
        `<li class="gDhang${hangnum}">${itemList}</li>`
      );
      itemList = "";
      if (param.hangLie.hangflag) {
        hangnum++;
      }
    }
    for (
      var i = 0;
      i < $("#" + selector + " " + ".gDlistIn" + ">" + "li").length;
      i++
    ) {
      param.Keyword.forEach((item, index) => {
        if (
          $("#" + selector + " " + ".gDlistIn" + ">" + "li")
            .eq(i)
            .html()
            .indexOf(item) !== -1
        ) {
          $("#" + selector + " " + ".gDlistIn" + ">" + "li")
            .eq(i)
            .addClass(param.KeywordClass[index]);
        }
      });
    }
  }
  //滚动函数
  function gun(selector, param) {
    $("#" + selector + " .gDlistOut").liMarquee({
      direction: "up", //控制滚动方向 up:上 down:下 left:左
      loop: -1, //循环次数，-1 为无限循环
      scrolldelay: 0, //每次重复之前的延迟
      scrollamount: param.scrollamount, //滚动速度 数值越小,滚动速度越慢
      circular: true, //是否无缝滚动 布尔值
      drag: false, //是否可以拖拽 布尔值
      runshort: false, //内容不足不滚动
      hoverstop: true, // 鼠标悬浮暂停
    });
    var leng = $(
      "#" + selector + " .gDlistOut .str_move.str_move_clone:eq(0) li"
    );
    if (leng.length % 2 == 1) {
      $("#" + selector + " .gDlistOut .str_move.str_move_clone:eq(0)").addClass(
        "jiShu"
      );
      $("#" + selector + " .gDlistOut .str_move.str_move_clone:eq(1)").addClass(
        "jiShu"
      );
    }
  }
  //滚动和hover
  function hover(selector, param) {
    //hover变色
    $("#" + selector + " " + "li").hover(
      function () {
        $(this).addClass("textHover");
        // $(this).children().addClass('textHover');
      },
      function () {
        $(this).removeClass("textHover");
        // $(this).children().removeClass('textHover');
      }
    );
    /* $('#'+selector+' '+'.gDlistOut').on('mouseenter mouseleave',function(e){
			if(e.type == 'mouseenter'){
				$('#'+selector+' .gDlistOut').liMarquee('pause');
			} else if(e.type == 'mouseleave'){
				$('#'+selector+' .gDlistOut').liMarquee('play');
			}
		}) */
  }
  // onReasiz
  function resizeFull(selector, param) {
    $(window).on("resize", function () {
      // console.log('resize');
      title(selector, param);
      list(selector, param);
      gun(selector, param);
      hover(selector, param);
    });
    let MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    let observer = new MutationObserver(() => {
      title(selector, param);
      list(selector, param);
      gun(selector, param);
      hover(selector, param);
    });
    let div = document.querySelector(
      ".grid-stack .grid-stack-item." + selector
    );
    if (div) {
      observer.observe(div, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    }
  }
  listRollNew.prototype = {
    constructor: listRollNew,
    // 初始化方法
    init: function () {
      this.param = $.extend(
        {
          title: [], //列表标题
          list: [], //列表数据[必填]
          hangLie: {
            lieflag: true, //间隔列开
            lienum: "1", //间隔列 从0开始
            hangflag: true, //间隔行开
            hangnum: "1", //间隔行 从0开始
          },
          Keyword: [],
          KeywordClass: [],
          scrollamount: 20, //滚动速度
        },
        this.param
      );
    },
  };
  return listRollNew;
})(jQuery);
