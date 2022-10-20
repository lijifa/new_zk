var CBDterminal3D = {}
var _PROJECT_ID=getParams()['projectId'];
var _SITED_ID=getParams()['siteId']
// console.log(_PROJECT_ID)
CBDterminal3D.init=function(){
	CBDterminal3D.changeExtreme();
	CBDterminal3D.changeFloor();
	CBDterminal3D.switchState();
	$(".sc-container").append('<iframe src="./CBDbuild/index.html" frameborder="0" style="width: 100%; height: 100%;margin-top: -34px;"></iframe>');
}
// 开关切换
CBDterminal3D.switchState=function(){
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
							CBDterminal3D.getData();
							// CBDterminal.loadEquipmentlist();
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
CBDterminal3D.changeExtreme=function(){
	$(".extreme img").click(function(){
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
}
//楼层切换
CBDterminal3D.changeFloor=function(){
	// $("#floorbtn span").click(function(){
	// 	$(this).addClass("on").siblings("span").removeClass("on");
	// 	var floorindex=$(this).data("floor");
	// 	$(".floor li").hide();
	// 	$("#floor"+floorindex).show();
	// });
}
var JSON_DATA=null;
CBDterminal3D.u3dinit=function(gameInstance){
	$("#floorbtn span").click(function(){
		// console.log($(this).index())
		$(this).addClass("on").siblings("span").removeClass("on");
		var floorindex=$(this).data("floor");
		$(".floor li").hide();
		$("#floor"+floorindex).show();
		var indexNum = $(this).index()
		var floorIndex = indexNum==0?4:indexNum==1?3:indexNum==2?2:indexNum==3?1:0;
		var str = '15001,'+floorIndex
		gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", str);
	});
	$('#return-back').click(function(){
		$('#floorbtn span').removeClass('on')
		gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", '15001,1000');
	})
	CBDterminal3D.getData = function(){
		// console.log(gameInstance);
		$.post(hdInterface.selectEndDeviceRealList, {
			"siteId": _SITED_ID
		}, function(data) {
			if (data['code'] === 0) {
				JSON_DATA=data;
				var str = '15010,'+JSON.stringify(JSON_DATA)
				gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", str);
			}
		})
	}
	CBDterminal3D.getData();
}
CBDterminal3D.offFloor=function(floor){
	var floorActive=floor==4?0:floor==3?1:floor==2?2:floor==1?3:0;
	$('#floorbtn span').eq(floorActive).addClass('on').siblings("span").removeClass("on")
	// $('#return-back').click(function(){
	// 	$('#floorbtn span').removeClass('on')
	// })
}
CBDterminal3D.init();
window.CBDterminal3D=CBDterminal3D;