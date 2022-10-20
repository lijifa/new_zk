var fireLive = {};
var time = null;
var layuiId = getParams()["layuiId"]; //标签id
fireLive.init = function(){
	// fireLive.alarmAnimate();
	fireLive.popUps();
	fireLive.createList();
	fireLive.fireFault();//火警弹窗列表
	fireLive.U3DJson(fireLive.data);
	$(".sc-container").prepend('<iframe src="./FireControl/index.html" width="100%" frameborder="0" height="100%"></iframe>');
}
// var objName = layuiId;
// //刷新
// window.onunload = function() {
// 	top.unregisterListener(objName); //销毁
// }
// //标签切换
// top.registerListener(objName, function(e) {
// 	// fireLive.popUps();
// 	// fireLive.createList();
// 	// fireLive.fireFault();//火警弹窗列表
// 	// fireLive.U3DJson(fireLive.data);
// }); //注册
//生成蒙层
fireLive.createMask = function(){
	$('.sc-container').append(`
		<div class="fireAlarm">
			<div class="show" style="display: block;">
				<div class="topAlarm"></div>
				<div class="middleAlarm">
					<div class="out"></div>
					<div class="in"></div>
					<div class="background">
						<div class="textAlarm">--</div>
						<div class="shutUp"></div>
					</div>
				</div>
				<div class="bottomAlarm"></div>
			</div>
			<div class="hide" style="display: none;"></div>
		</div>
	`)
	fireLive.alarmAnimate();//报警动画
	fireLive.MaskAndBall();// 收起展开
	fireLive.fireFault();//火警弹窗列表
}
//报警动画
fireLive.alarmAnimate = function (){
	fireLive.flag = true;
	time = setInterval(function(){
		if(fireLive.flag){
			$('.topAlarm').css({
				'opacity':0.5
			})
			$('.bottomAlarm').css({
				'opacity':0.5
			})
		} else {
			$('.topAlarm').css({
				'opacity':1
			})
			$('.bottomAlarm').css({
				'opacity':1
			})
		}
		fireLive.flag = !fireLive.flag;
	},1000)
}
//弹窗
fireLive.popUps = function(){
	let pop = new popUps({
		selector:'.faultList',
		offsetLeft:-200,
		offsetTop:20,
		hoverDom:'.alarmNum',
		fun:function(e){
			// fireLive.fireFault();
			// console.log(fireLive.data);
		}
	});
}
// 火警列表
fireLive.data = [
	{img:'<img src="image/fireAlarm.png" class="listImg">',site:'商业负1层报警阀室',time:changeTimeDate(1)+' 12:09:30',text1:'误报',text2:'已处理'},
	{img:'<img src="image/fireAlarm.png" class="listImg">',site:'塔楼B8层804号',time:changeTimeDate(2)+' 09:23:47',text1:'误报',text2:'已处理'},
	{img:'<img src="image/fireAlarm.png" class="listImg">',site:'商业2层A605号',time:changeTimeDate(3)+' 09:10:24',text1:'误报',text2:'已处理'},
]
let params = {
	title:[],
	list:[],
	hangLie: {
		lieflag:true,//间隔列开
		lienum:'4',//间隔列 从0开始
		hangflag:true,//间隔行开
		hangnum:'1',//间隔行 从0开始
	},
}
fireLive.data.forEach((item,index) => {
	item.text1 = `<a class="btn1 index${index}" data-index="${index}">${item.text1}</a>`
	item.text2 = `<a class="btn2 index${index}" data-index="${index}">${item.text2}</a>`
})


// 收起展开
fireLive.MaskAndBall = function(){
	let flag = true;
	let arr = ['.shutUp','.hide'];
	if(fireLive.data.length == 0){
		flag = false;
		$('.show').hide();
		$('.hide').show();
		$('.shutUp').unbind();
		$('.hide').unbind();
		// arr = [];
	}
	let mask = new ballAndMask({
		selector:'.fireAlarm',
		ballR:[20,20],
		delay:0.5,
		positionBall:['70%',8],
		clickHandle:arr,
		isOpen:flag,
		isMove:false,
		callBackClick:function(e){
			if(e){
				$('.show').show();
				$('.hide').hide();
				// $('.alarmNum').hide();
				fireLive.alarmAnimate();
			} else {
				$('.show').hide();
				$('.hide').show();
				// $('.alarmNum').show();
				clearInterval(time);
			}
		},
	})
}
//U3D json数据
fireLive.U3DJson = function(array){
	let list = {
			fireFault:[//火灾报警1
				// data1:{name:'火警报警',time:'2021-05-20 13:10:24',site:'商业2层A605号'},
				// data2:{name:'火警报警',time:'2021-04-20 09:23:47',site:'塔楼B8层804号'},
				// data3:{name:'火警报警',time:'2021-04-19 12:09:30',site:'商业负1层报警阀室'},
			],
			fireWater:[//消防给水
				{name:'湿式报警阀1#',site:'商业负1层报警阀室',time:changeTimeDate(2)+' 06:34:24'},
			],
			autoSpray:[],//自动喷灭
			fireHydrant:[//消火栓
				{name:'水压过低',site:'商业3层楼梯间',time:changeTimeDate(1)+' 10:34:24'},
				{name:'消火栓启动',site:'商业塔楼A5层楼梯间',time:changeTimeDate(2)+' 08:05:17'},
			],
			fireEmergency:[],//消防应急
		}
	array.forEach((item,index) => {
		list.fireFault.push(item);
	})
	localStorage.setItem('_fire_list',JSON.stringify(list));
}
//火警弹窗列表
fireLive.fireFault = function(){
	$('#faultTotal').html(fireLive.data.length);
	if(fireLive.data.length == 0){
		$('.alarmNum').addClass('textColorGreen');
		$('#list').html(`<div style="text-align:center;color:#48D396">当前暂无报警</div>`);
		$('.textAlarm').html('暂无火灾报警');
		$('.alarmNum').removeClass('textColorRed');
	} else {
		$('.alarmNum').addClass('textColorRed');
		$('.textAlarm').html(fireLive.data[0]['site']+'&nbsp;&nbsp;火灾报警');
		fireLive.createList();
	}
}
//创建列表
fireLive.createList = function(){
	params.list = fireLive.data;
	let list = new listRollNew('list',params);
	fireLive.btnFunction();
	$(window).on('resize',function(){
		fireLive.btnFunction();
	})
}
let num = null;
// 误报 已处理按钮
fireLive.btnFunction = function(){
	$('.btn1').on('click',function(){
		let id = $(this).data('index');
		fireLive.data.forEach((item,index) => {
			if(item['text1'].indexOf(`index${id}`) !== -1){
				num = index;
			}
		})
		fireLive.data.splice(num,1);
		fireLive.U3DJson(fireLive.data);
		fireLive.fireFault();
		fireLive.loadData();
		let _fire_list = JSON.parse(localStorage.getItem('_fire_list'));
		let params = {
			list:[],
			hangLie: {
				lieflag:true,//间隔列开
				lienum:'2',//间隔列 从0开始
				hangflag:true,//间隔行开
				hangnum:'1',//间隔行 从0开始
			},
		}
		_fire_list['fireFault'].forEach((item) => {
			let objList = {
				name:item['name'] == undefined ? '火警' : item['name'],
				site:item['site'],
				time:item['time']
			}
			params.list.push(objList);
		})
		if(params.list.length == 0){
			$('.U3Dpop').css({
				'display':'none',
			})
			fireLive.move(0);
		}
		let faultItemList = new listRollNew('faultItem',params);
	})
	$('.btn2').on('click',function(){
		let id = $(this).data('index');
		let num = null;
		fireLive.data.forEach((item,index) => {
			if(item['text1'].indexOf(`index${id}`) !== -1){
				num = index;
			}
		})
		fireLive.data.splice(num,1);
		fireLive.U3DJson(fireLive.data);
		fireLive.fireFault();
		fireLive.loadData();
		let _fire_list = JSON.parse(localStorage.getItem('_fire_list'));
		let params = {
			list:[],
			hangLie: {
				lieflag:true,//间隔列开
				lienum:'2',//间隔列 从0开始
				hangflag:true,//间隔行开
				hangnum:'1',//间隔行 从0开始
			},
		}
		_fire_list['fireFault'].forEach((item) => {
			let objList = {
				name:item['name'] == undefined ? '火警' : item['name'],
				site:item['site'],
				time:item['time']
			}
			params.list.push(objList);
		})
		if(params.list.length == 0){
			$('.U3Dpop').css({
				'display':'none',
			})
			fireLive.move(0);
		}
		let faultItemList = new listRollNew('faultItem',params);
	})
}
//U3D
fireLive.u3dinit = function(gameInstance){
	//U3D传递数据
	fireLive.loadData = function(){
		let _fire_list = JSON.parse(localStorage.getItem('_fire_list'));
		Object.keys(_fire_list).forEach((objitem,objindex) => {
			_fire_list[objitem].forEach((item,index) => {
				Object.keys(item).forEach((e,i,a) => {
					if(e == 'name'){
						item[e] = item[e].length > 5 ? item[e].substring(0,5) + '...' : item[e];
					} else if(e == 'time'){
						item[e] = item[e].length > 5 ? item[e].substring(5) : item[e];
					} else if(e == 'site'){
						item[e] = item[e].length > 7 ? item[e].substring(0,7) + '...' : item[e];
					}
				})
			})
		})
		gameInstance.SendMessage("RecvJsMessageObject", "GetEvent", "15005,"+JSON.stringify(_fire_list))
		if(_fire_list['fireFault'].length == 0){
			fireLive.MaskAndBall();
		}
	}
	fireLive.createList();
	fireLive.MaskAndBall();
}
fireLive.name = '';
fireLive.popU3D = function(e,gameInstance){
	fireLive.move = function(num){
		gameInstance.SendMessage("LoadedPrefab", "CamerMovement", "15017,"+num);
	}
	let positionSite = e.split(',');
	let obj = {
		left:positionSite[0],
		top:positionSite[1],
		z:positionSite[2],
		text:positionSite[3] == 'TextMeshPro' ? 'fireFault' : positionSite[3],
	}
	if(obj.left !== '' && obj.top !== '' && obj.text !== fireLive.name){
		fireLive.name = obj.text;
		let _fire_list = JSON.parse(localStorage.getItem('_fire_list'));
		if(_fire_list[obj.text].length !== 0){
			$('.U3Dpop').css({
				'display':'block',
				'left':Math.round(obj.left)+'px',
				'bottom':Math.round(obj.top)+'px',
				'transform': `translate(-50%,${obj.text == 'fireFault' ? -20 : -13}%)`,
			})
			let params = {
				list:[],
				hangLie: {
					lieflag:true,//间隔列开
					lienum:'2',//间隔列 从0开始
					hangflag:true,//间隔行开
					hangnum:'1',//间隔行 从0开始
				},
			}
			_fire_list[obj.text].forEach((item) => {
				let objList = {
					name:item['name'] == undefined ? '火警' : item['name'],
					site:item['site'],
					time:item['time']
				}
				params.list.push(objList);
			})
			let faultItemList = new listRollNew('faultItem',params);
			fireLive.move(1);
		} else {
			fireLive.move(0);
		}
	} else {
		$('.U3Dpop').css({
			'display':'none',
		})
		fireLive.name = '';
		fireLive.move(0);
	}
}
fireLive.init();