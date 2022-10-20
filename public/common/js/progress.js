	/*
	* 滑动条控件
	* author: ljf 2021-04-19
	* param: {
  *   el:         容器名称
	*   val:        设置值【1-100;默认值0）】
	*   size:       设置默认滑块高度【容器节点（id/class）】
	*   drag:       设置是否拖动【true(默认的)/false】
	*   tip:        设置数值显示【true(默认的)/false】
	* 	title:      是否鼠标滑入滑块时显示数值【true/false(默认的)】
	* 	toFixed:    精准数值设置，当滑块长度过长时可以设置此参数调整改val的改变频率，【默认值0不设置，建议最大设置为2】
  *   direction:  设置滑块方向【horizontal 水平(默认的)/vertical】
	* 	color:      颜色【默认的#eb3e3e】
  * 	progressBtn: 滑块按钮样式
  * 	ProgressLineRadius: 滑块圆角
  * 	getVal:     实时返回【function/''】
  *               回调参数：实时返回的滑动数据
  * 	getMouseUp: 松开鼠标回调【function/''】
  *               回调参数：松开鼠标最终数据返回的滑动数据
  * }
  */

  /*
  * example
  *     var progress = $(".progress").Progress({
  *     val: 10,
  *     size: 60,
  *     drag: true,
  *     toFixed: 2,
  *     tip: true,
  *     title: true,
  *     direction: "vertical",
  *     color: "green",
  *     progressBtn: "",
        ProgressLineRadius: ''
  *     getVal: function (res) {
  *       //获取滑块val值
  *       console.log(res);
  *    },
  *     getMouseUp: function (e) {
  *       //获取最终离开滑块val值
  *       console.log(e);
  *     }
  *   });
  */
;(function($) {
  $.fn.Progress = function(el) {
    var config = $.extend(
      {
        val: 0,                   //设置值1-100;默认值0
        size: 20,                 //设置默认滑块高度
        drag: true,               //设置是否拖动
        //tip: true,               //设置数值显示
        title: true,             //是否鼠标滑入滑块时显示数值，默认为false
        toFixed: 0,               //精准数值设置，当滑块长度过长时可以设置此参数调整改val的改变频率，默认值0不设置，建议最大设置为2。
        direction: 'horizontal',  //设置滑块方向 horizontal 水平  vertical垂直
        color: '#EBE7DF',
        progressBtn: '',
        ProgressLineRadius: '',
        getVal: ''
      },
      el
    )

    return this.each(function() {
      var that = $(this)
      var idx = that.index()
      var numW = config.val
      var numOld
      var x
      //颜色
      var barColor = config.color;
      //获取方向
      var dir = config.direction
      //获取滑块高度
      var lineH = config.size
      var $ProgressBar = $('<div class="ProgressBar"></div>') //创建底色
      $ProgressBar.height(lineH).css('borderRadius', config.ProgressLineRadius ? config.ProgressLineRadius : lineH / 2)
      var $ProgressLine = $(
        '<div class="ProgressLine" id="Progress' +
          idx +
          '" text-content-after=""></div>'
      ) //创建滑块
      $ProgressLine.css('borderRadius', config.ProgressLineRadius ? (config.ProgressLineRadius + ' 0px' + ' 0px ' + config.ProgressLineRadius) : lineH / 2)
      var $input = $('<text class="progressVal"></text>') //创建隐藏文本，用于监听值的变化
      $ProgressBar.append($ProgressLine)
      $ProgressBar.children().append($input)
      that.append($ProgressBar)
      var lineW = (config.val / 100) * ($ProgressBar.width() - lineH) //获取config中width;
      // lineW = Math.max(lineH, lineW);
      $ProgressLine.css({'width': lineW + lineH, 'background': barColor}) //设置width;
      if (numW <= 0) {
        numW = 0
      }
      if (numW >= 100) {
        numW = 100
      }
      config.tip && $ProgressLine.attr('text-content-after', numW) //设置显示数
      $input.text(numW) //设置显示数值
      numOld = numW

      $('head').append(
        '<style>#Progress' + idx + '::before{ '+ (config.progressBtn ? config.progressBtn : ('width:' + lineH + 'px; background:' + barColor)) + '}</style>'
      )

      //判断方向
      switch (dir) {
        case 'vertical':
          that.children().addClass('vertical')
          break
      }

      var left = (config.size - $input.width()) / 2
      $(this)
        .find('.progressVal')
        .css('right', left)
      //判断用户是否设置滑动
      if (!config.drag) {
        $ProgressLine.addClass('disabled')
        return
      }
      //动态根据动态数组更新长度回调方法
      if (config.setVal) {
        config.setVal(
          function setValue(i) {
            //
            var i = i.toFixed(config.toFixed)
            var lineW = (i / 100) * ($ProgressBar.width() - lineH) //获取config中width;
            var wid = lineW + lineH
            if (lineW + lineH > $(this).width()) {
              wid = $(this).width()
            }
            if (i <= 0) {
              i = 0
            }
            if (i >= 100) {
              i = 100
            }

            $ProgressLine.css('width', wid) //设置width;
            $(this)
              .find('.progressVal')
              .text(i)
            config.tip && $ProgressLine.attr('text-content-after', i)
          }.bind(this)
        )
      }

      $(this)[0].toFixed = config.toFixed
      $(this)[0].lineH = lineH
      $(this)[0].tip = config.tip
      //updateValue
      jQuery.fn.extend({
        updateValue: function(i) {
          if (i < 0 || i > 100) {
            return
          }
          //
          var i = i.toFixed(this[0].toFixed)
          var lineH = this[0].lineH
          var lineW =
            (i / 100) *
            ($(this)
              .find('.ProgressBar')
              .width() -
              lineH) //获取config中width;
          var wid = lineW + lineH
          if (lineW + lineH > $(this).width()) {
            wid = $(this).width()
          }
          if (i <= 0) {
            i = 0
          }
          if (i >= 100) {
            i = 100
          }
          $(this)
            .find('.ProgressLine')
            .css('width', wid) //设置width;
          $(this)
            .find('.progressVal')
            .text(i)
          this[0].tip &&
            $(this)
              .find('.ProgressLine')
              .attr('text-content-after', i)
        }
      })

      if (config.title) {
        $(this).hover(
          function() {
            $(this)
              .find('.progressVal')
              .stop(true)
              .fadeIn()
          },
          function() {
            $(this)
              .find('.progressVal')
              .stop(true)
              .fadeOut()
          }
        )
      }

      //封装滑块
      function setProW(e) {
        switch (dir) {
          case 'horizontal':
            x = e.pageX - $ProgressBar.offset().left + lineH / 2
            break
          case 'vertical':
            x =
              $ProgressBar.width() -
              (e.pageY - $ProgressBar.offset().top - lineH / 2)
            break
        }
        x = Math.max(lineH, x)
        x = Math.min($ProgressBar.width(), x)
        //设置滑块长度
        $ProgressLine.css('width', x)
        numW = (((x - lineH) / ($ProgressBar.width() - lineH)) * 100).toFixed(
          config.toFixed
        )
        if (numW <= 0) {
          numW = 0
        }
        if (numW >= 100) {
          numW = 100
        }
        config.tip && $ProgressLine.attr('text-content-after', numW) //设置显示数

        if (numOld != numW) {
          $input.text(numW) //设置显示数值
          if (config.getVal) {
            config.getVal(numW)
          }
        }
        return numW;
      }

      //封装title属性
      function titleShow(title, i, that) {
        if (title) {
          that.find('.titleTip').text(i)
        }
      }

      //绑定滑块点击事件
      that.on('mousedown', function(e) {
        e.preventDefault()
        e.stopPropagation()
        var x
        //添加document鼠标移动事件
        $(document).on('mousemove', function(e) {
          numOld = numW
          e.stopPropagation()
          e.preventDefault()
          setProW(e)
        })
        setProW(e)
      })

      //绑定松开滑块事件
      that.on('mouseup', debounce((e)=>{
        let v = setProW(e)
        that.data('val', v)
        config.getMouseUp(v)
      }, 500, false))

      //取消事件
      $(document).on('mouseup', function(e) {
        e.preventDefault()
        e.stopPropagation()
        $(document).off('mousemove')
      })
    })
  }
})(jQuery)
