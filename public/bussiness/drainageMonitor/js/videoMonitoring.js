var videoMonitoring = {};
var siteId = getParams()['siteId'] || 13;
var menuNavId = getParams()['menuNavId']; //菜单id
var sitename = getParams()["sitename"]; //站点名称
videoMonitoring.init = function() {
	videoMonitoring.changeBtn(); //按钮切换
	videoMonitoring.getlist();
}
videoMonitoring.getlist = function() {
	var data = {
		"msg": "成功",
		"code": 0,
		"data": [{
			"videourl":"http://hls01open.ys7.com/openlive/4f04bd17f05849239d62239caec9d1de.m3u8",
			"number": "S40",
			"name": "消防中控室监控#1",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/openlive/",
			"address": "一层B48-1",
			"open":"0"			
		},
		{   "videourl":"http://hls.open.ys7.com/openlive/022d5b4c54cb41d09fff77ab729566d9.m3u8",
			"number": "S43",
			"name": "变电室监控#1",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/fdfSfvke/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/e3b2ac9061ab4a00812dcaac3fe2a657.m3u8",
			"number": "S43",
			"name": "变电室监控#2",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/lwevHrvm/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/8fffa428923a4a9696697c39aad352ca.m3u8",
			"number": "S44",
			"name": "变电室监控#3",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/mdbgHsja/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/b8d92d5a207d4cf69234d8d1c1e11f84.m3u8",
			"number": "S45",
			"name": "变电室监控#4",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/tssFnadb/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/6beb64e160034383987b78081e0ca839.m3u8",
			"number": "S46",
			"name": "变电室监控#5",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/htaCfevs/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/989ac5f37cf042c5b812104826460a16.m3u8",
			"number": "S47",
			"name": "消防通道#1",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/bceFbfwd/",
			"address": "一层A29-1",
			"open":"0"			
		},
		{   "videourl":"http://hls.open.ys7.com/openlive/aa4f0fb49fd049c89b0d3da9e0953abb.m3u8",
			"number": "S48",
			"name": "消防通道#2",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/geaVhrbEm/",
			"address": "一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/79730c87fc7d431eab224e48ef9bb9fc.m3u8",
			"number": "S41",
			"name": "消防泵房监控#1",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/efvsGdss/",
			"address": "负一层",
			"open":"0"			
		},
		{	"videourl":"http://hls.open.ys7.com/openlive/eb08cb2bc56344278a95377da8026b70.m3u8",
			"number": "S42",
			"name": "消防报警阀室监控#1",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/asfdFdfv/",
			"address": "负一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/79730c87fc7d431eab224e48ef9bb9fc.m3u8",
			"number": "S49",
			"name": "消防通道#3",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/mvnhEgtd/",
			"address": "一层",
			"open":"0"			
		},
		{   "videourl":"http://hls01open.ys7.com/openlive/79730c87fc7d431eab224e48ef9bb9fc.m3u8",
			"number": "S50",
			"name": "消防通道#4",
			"brand": "海康威视",
			"equipmentUrl": "ezopen://open.ys7.com/C57840386/",
			"videoUrl": "http://hls01open.ys7.com/kjfeGtja/",
			"address": "一层",
			"open":"0"			
		},
		]
	}
	
	$.ajax({
		url:'js/video.json',
		success:function(data){
			if(data.code == 0){
				var paramTransformerMonitor = {
					title: ['监控编号', '监控名称', '品牌', '设备链接', '视频链接','所在位置','播放'], //列表标题
					list: [],//列表数据
					hangLie: {
						lieflag:true,//间隔列开
						lienum:'6',//间隔列 从0开始
						hangflag:true,//间隔行开
						hangnum:'1',//间隔行 从0开始
					}
				};
				data.data.forEach((item) => {
					let obj = {
						no:convert(item.no),
						name:convert(item.name),
						bammer:convert(item.bammer),
						daviceLink:convert(item.daviceLink),
						videoLink:convert(item.videoLink),
						site:convert(item.site),
						play:transformerStatus(item.play,item.videourl),
					}
					paramTransformerMonitor.list.push(obj);
				})
				let transformerMonitor = new listRollNew('transformerMonitor',paramTransformerMonitor);
			}
		}
	})
	
	
	var paramsDevice = {
			title: ['设备编号', '设备名称', '所属系统', '一级分类', '二级分类','品牌','安装日期','状态','所在位置'], //列表标题
			list: [],//列表数据
			hangLie: {
				lieflag:true,//间隔列开
				lienum:'8',//间隔列 从0开始
				hangflag:true,//间隔行开
				hangnum:'1',//间隔行 从0开始
			}
		}
	$.ajax({
		url:'js/device.json',
		success:function(data){
			if(data.code == 0){
				data.data.forEach((item,index) => {
					let obj = {
						code: convert(item.code),
						name:convert(item.name),
						system:convert(item.system),
						classOne:convert(item.classOne),
						classTwo:convert(item.classTwo),
						brand: convert(item.brand),
						time:convert(item.time),
						state:convert(item.state),
						site: convert(item.site)
					}
					paramsDevice.list.push(obj);
				})
				let device = new listRollNew('device',paramsDevice);
			}
		}
	})
}
videoMonitoring.changeBtn = function() {
	$('.btnContainer').on('click', 'li', function() {
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
		let type = $(this).attr('data-type');
		$.ajax({
			url:'js/video.json',
			success:function(data){
				if(data.code == 0){
					var paramTransformerMonitor = {
						title: ['监控编号', '监控名称', '品牌', '设备链接', '视频链接','所在位置','播放'], //列表标题
						list: [],//列表数据
						hangLie: {
							lieflag:true,//间隔列开
							lienum:'6',//间隔列 从0开始
							hangflag:true,//间隔行开
							hangnum:'1',//间隔行 从0开始
						}
					};
					data.data.forEach((item) => {
						if(type == ''){
							let obj = {
								no:convert(item.no),
								name:convert(item.name),
								bammer:convert(item.bammer),
								daviceLink:convert(item.daviceLink),
								videoLink:convert(item.videoLink),
								site:convert(item.site),
								play:transformerStatus(item.play,item.videourl),
							}
							paramTransformerMonitor.list.push(obj);
						} else {
							if(type == item.type){
								let obj = {
									no:convert(item.no),
									name:convert(item.name),
									bammer:convert(item.bammer),
									daviceLink:convert(item.daviceLink),
									videoLink:convert(item.videoLink),
									site:convert(item.site),
									play:transformerStatus(item.play,item.videourl),
								}
								paramTransformerMonitor.list.push(obj);
							}
						}
					})
					let transformerMonitor = new listRollNew('transformerMonitor',paramTransformerMonitor);
				}
			}
		})
		let flag = '';
		switch (type){
			case '0':
				flag = "";
				break;
			case '1':
				flag = "排水系统";
				break;
			case '2':
				flag = "自来水系统";
				break;
			case '3':
				flag = "中水系统";
				break;
			default:
				break;
		}
		$.ajax({
			url:'js/device.json',
			success:function(data){
				if(data.code == 0){
					let paramsDevice = {
						title: ['设备编号', '设备名称', '所属系统', '一级分类', '二级分类','品牌','安装日期','状态','所在位置'], //列表标题
						list: [],//列表数据
						hangLie: {
							lieflag:true,//间隔列开
							lienum:'8',//间隔列 从0开始
							hangflag:true,//间隔行开
							hangnum:'1',//间隔行 从0开始
						}
					}
					data.data.forEach((item,index) => {
						if(flag == ''){
							let obj = {
								code: convert(item.code),
								name:convert(item.name),
								system:convert(item.system),
								classOne:convert(item.classOne),
								classTwo:convert(item.classTwo),
								brand: convert(item.brand),
								time:convert(item.time),
								state:convert(item.state),
								site: convert(item.site)
							}
							paramsDevice.list.push(obj);
						} else {
							if(item.system == flag){
								let obj = {
									code: convert(item.code),
									name:convert(item.name),
									system:convert(item.system),
									classOne:convert(item.classOne),
									classTwo:convert(item.classTwo),
									brand: convert(item.brand),
									time:convert(item.time),
									state:convert(item.state),
									site: convert(item.site)
								}
								paramsDevice.list.push(obj);
							}
						}
						
					})
					let device = new listRollNew('device',paramsDevice);
				}
			}
		})
	})
}

$(".transformer2 button").click(function(){
	var dataIndex=$(this).data("index");
	$(this).addClass("on").siblings().removeClass("on");
	$("#floor"+dataIndex).show().siblings(".floor").hide();
});
videoMonitoring.init();
window.videoMonitoring = videoMonitoring;

function transformerStatus(type,videourl) {
	switch (type) {
		case '0':
			return `<div class="gDtext">
			<img class="gDimg videoimg" src="./image/videoBlue.png" data-videourl="${videourl}">
			</div><div class="gDtext">&nbsp;&nbsp;</div>`;		
		default:
			return '--';
	}
}
function showVideoPop(videourl,callback){
	var player;
	// layui.use('layer', function(){
	//   var layer = layui.layer;	  
	//   layer.open({
	//     type: 1,
	// 	title:"",
	// 	area: ['590px', '361px'],
	//     content: $('#id_test_video'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	// 	cancel: function(index, layero){ 
	// 	 //  if(confirm('确定要关闭么')){ //只有当点击confirm框的确定时，该层才会关闭
	// 		// layer.close(index)
	// 	 //  }
	// 	 layer.close(index);
	// 	 player.destroy();
	// 	 callback();
	// 	  return false; 
	// 	}   
	//   });
	// });  
	setTimeout(function(){
		player =  new TcPlayer('id_test_video', {
			//http://127.0.0.1/common/image/video/yellow.mp4
			"mp4":videourl,
			// "m3u8":"http://hls.open.ys7.com/openlive/eb08cb2bc56344278a95377da8026b70.m3u8",
			// "m3u8_hd":"http://200002949.vod.myqcloud.com/200002949_b6ffc.f230.av.m3u8",
			// "m3u8_sd":"http://200002949.vod.myqcloud.com/200002949_b6ffc.f220.av.m3u8",
			// "flv": "http://2157.liveplay.myqcloud.com/live/2157_358535a.flv", //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
			"autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
			// "poster" : "http://www.test.com/myimage.jpg",
			"width" :  '580',//视频的显示宽度，请尽量使用视频分辨率宽度
			"height" : '350',//视频的显示高度，请尽量使用视频分辨率高度
			// "controls":'none'
			});
			move({selector:'.cameraMove',handle:'.vcp-panel-bg',padding:[40,10,40,10]});
			// setInterval(function(){
			// 	if(player.playing()==false){
			// 		player.play();
			// 	}
			// },100);
	},100)
	
}

$('#transformerMonitor').on('click', '.videoimg', function() {
	var videourl=$(this).data("videourl");
	// $(this).attr("src","image/videoyellow_on.png");	//更换成选中状态的图片
	// console.log(videourl);
	$('.mask').show();
	$('.cameraclose').show();
	$('.cameraclose').css({
		"z-index":'111',
	});
	$('.cameraMove').css({
		"z-index":10,
		"opacity": 1,
	})
	showVideoPop(videourl,function(){
		$("#transformerMonitor .videoimg").attr("src","./image/video.png");
	});
})
$('.floorinit').on('click', '.video', function() {
	var videourl=$(this).data("videourl");
	$(this).attr("src","image/videoyellow_on.png");	
	$('.mask').show();
	$('.cameraclose').show();
	$('.cameraclose').css({
		"z-index":'111',
	});
	$('.cameraMove').css({
		"z-index":10,
		"opacity": 1,
	})
	showVideoPop(videourl,function(){
		$(".floorinit .video").attr("src","image/videoyellow.png");
	});
})
$('.cameraclose').on('click',function(){
	$('#id_test_video').html('');
	$('.mask').hide();
	$('.cameraclose').hide();
	$('.cameraclose').css({
		"z-index":'-111'
	});
	$('.cameraMove').css({
		"z-index":-10,
		"opacity": 0,
	})
})
