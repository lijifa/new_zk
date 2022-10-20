var CBDterminal2D = {}
var _PROJECT_ID=getParams()['projectId'];
CBDterminal2D.init=function(){
	CBDterminal2D.changeExtreme();
	CBDterminal2D.changeFloor();
	CBDterminal2D.switchState();
}
// 开关切换
CBDterminal2D.switchState=function(){
	$('#controlState').on('click','.switch',function(){
		var statePlcId='';
		var switchState='';
		var switchFlag=$(this).attr('data-flag');
		statePlcId=$(this).attr('data-statePlcId')
		switchState=$(this).attr('data-switchState')
		switchState=switchState=='1'?'0':'1';
		var _HTML=$(this).html()
		$(this).html(`切换中...`)
		var _THAT = $(this)
		if(switchFlag=='flag'){
			// console.log(switchFlag)
			_THAT.attr('data-flag','noflag')
			var timer1 = setTimeout(function(){
				$.post(hdInterface.endSwitch,{
					"statePlcId":statePlcId,
					"status":switchState
				},function(data){
					if(data['code']===0){
						// console.log(data)
						if(data.data.status==switchState){
							_THAT.attr('data-switchState',data.data.status)
							if(data.data.status=='1'){
								_THAT.html(`开<img src="./image/btn_open.png"/>关`)
							} else if (data.data.status=='0'){
								_THAT.html(`开<img src="./image/btn_close.png"/>关`)
							}
							// CBDterminal3D.getData();
							CBDterminal2D.getData();
						} else if(data.data.status=='-1') {
							_THAT.html(_HTML)
						} else{
							_THAT.html(_HTML)
						}
						clearTimeout(timer1)
					}
				})
				// CBDterminal3D.getData();
				_THAT.attr('data-flag','flag')
			},1500)
			// setTimeout(function(){
			// 	$(this).attr('data-flag','flag')
			// },2000)
		} else {
			// _THAT.html(_HTML)
		}
		
	})
}
CBDterminal2D.getData = function(){
		// console.log(gameInstance);
		$.post(hdInterface.selectEndDeviceRealList, {
			"siteId": _SITED_ID
		}, function(data) {
			if (data['code'] === 0) {
				$('#floor2').html('');
				data.data.forEach((item,index)=>{
					$('#floor2').append(`
						<div class="extreme pos${item.position}">
							<img src=${item.state==1?"./image/icon_img1.png":item.state==0?"./image/icon_img2.png":"./image/icon_img3.png"} />
							<div class="content">
								<div class="lev4title_pub">${item.plate}</div>
								<div class="item">
									<span class="span1">温度：</span>
									<span class="span2"><em>${convert(item.temperature)}</em>℃</span>
								</div>
								<div class="item">
									<span class="span1">风速：</span>
									<span class="span2">${item.windSpeed==1?'低':item.windSpeed==2?'中':item.windSpeed==3?'高':'--'}</span>
								</div>
								<div class="item">
									<span class="span1">状态：</span>
									<span class="span2">${item.state==0?'停止':item.state==1?'开启':'离线'}</span>
								</div>
								
							</div>
						</div>
					`)
				})
			}
		})
	}
CBDterminal2D.changeExtreme=function(){
	$('#floor2').on('click','.extreme img',function(){
		var dataclick=$(this).attr("data-click");
		if(dataclick!="true"){
			$(".content").hide();
			$(this).siblings(".content").show();
			$(".extreme img").attr("data-click","false");
			$(this).attr("data-click","true");
			
		}else{
			$(".content").hide();
			$(this).siblings(".content").hide();
			$(this).attr("data-click","false");
		}
	});
	$(document).mouseup(function(e) { 
	    var  content = $('#floor2 .content');
		var content1 = $('#floor2 .extreme img')
	    if(!content.is(e.target) && !content1.is(e.target)
		&& content.has(e.target).length === 0
		&& content1.has(e.target).length === 0
		) { 
			$('#floor2 .content').hide()
			$(".extreme img").attr("data-click","false");
	    }
	});
}
//楼层切换
CBDterminal2D.changeFloor=function(){
	$("#floorbtn span").click(function(){
		$(this).addClass("on").siblings("span").removeClass("on");
		var floorindex=$(this).data("floor");
		$(".floor li").hide();
		$("#floor"+floorindex).show();
	});
	$('#return-back').click(function(){
		$('#floorbtn span').removeClass('on')
	})
}
CBDterminal2D.init();
window.CBDterminal2D=CBDterminal2D;