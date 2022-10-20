(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  recalc();
})(document, window);


const rem = {
    designW: 1920, //设计图宽度
    designH: 1080, //设计图高度
	scale:1
};
rem.init=function(){
	rem.pageResize();
	// rem.chartsResize();
}

//计算缩放系数
rem.pageResize=function() {
        [pageH, pageW] = [$(window).height(), $(window).width()];
        let isWider = pageW / pageH > rem.designW / rem.designH;
        let [scaleW, scaleH] = [pageW / rem.designW, pageH / rem.designH];
        // let $container = $("#container");
		
        // switch (Cfg.zoomMode) {
        //     case "contain":
                // if (isWider) {
                //     $container.css({width: pageH * Cfg.designW / Cfg.designH, height: '100%'});
                // } else {
                //     $container.css({height: pageW * Cfg.designH / Cfg.designW, width: '100%'});
                // }
                rem.scale = isWider ? scaleH : scaleW;
        //         break;
        //     case 'cover':
        //         $("html,body").css('overflow', 'initial');
        //         if (isWider) {
        //             $container.css({height: pageW * Cfg.designH / Cfg.designW, width: '100%'});
        //         } else {
        //             $container.css({width: pageH * Cfg.designW / Cfg.designH, height: '100%'});
        //         }
        //         scale = isWider ? scaleW : scaleH;
        //         break;
        //     case 'stretch':
        //         scale = isWider ? scaleH : scaleW;
        //         $container.css({width: '100%'}, {height: '100%'});
        //         break;
        // }
        // $("html").css("font-size", scale * 16 + "px").css("opacity", 1);
        // notebookOptim = !(Cfg.notebookOptim === false || scale > .75);
        // console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + scale)
    }
 //图表缩放
rem.chartsResize=function(charts, param) {
        $(window).resize(() => {
            Object.keys(charts).forEach(id => {
                if (param && param.notResize.includes(id)) {
                    return
                }
                charts[id].resize();
            })
        });
    }
rem.init();
window.rem=rem;
