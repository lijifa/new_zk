var camera = (function($){
	let _CAMERA_SELF = null;
	let _PLAYER = null;
	let cameraIdFlag = '';
	let noUrls = null;
	function camera(param){
		this.param = param;
		this.init();
	}
	camera.prototype = {
		constructor:camera,
		init:function(){
			this.param = $.extend({
				outerContainer:'#camera-container',
				cameraIdName:'camerID',
				cameraUrlArr:[],
				class:'',
				openCallBack:null,
				closeCallBack:null,
				left:'',
				top:'',
				clarity:['hd','od'],
			},this.param);
			_CAMERA_SELF = this;
			this.createCameraContainer();
			this.clickCloseBtn();
		},
		// 创建监控视频容器
		createCameraContainer:function(){
			// $('body '+this.param.outerContainer+' .camera').remove();
			$(this.param.outerContainer).append(`
				<div class="camera camera1 cameraMove ${this.param.class}" data-flag="false" id="camera">
					<i class="layui-icon layui-icon-close cameraclose"></i> 
					<div id="${this.param.cameraIdName}" style="width: 580px; height: 350px;"></div>
				</div>
			`)
			this.param.left == '' ? '' : $('body '+this.param.outerContainer+' .camera').css({left:this.param.left+'px',transform:'translate(0%,0%)'});
			this.param.top == '' ? '' : $('body '+this.param.outerContainer+' .camera').css({top:this.param.top+'px',transform:'translate(0%,0%)'});
			noUrls = new errorAlert({
				msgTitle:'播放失败',
				msg:'未获取到播放地址',
				closeBack:function(){
					if(_CAMERA_SELF.param.openCallBack && typeof _CAMERA_SELF.param.openCallBack == 'function'){
						_CAMERA_SELF.param.closeCallBack('cameraclose');
					}
				}
			})
		},
		// 获取视频列表播放
		getCameraListPlay:function(cameraId){
			let that = this;
			if(cameraIdFlag == cameraId){
				this.closeCamera();
			} else {
				if(_PLAYER != null && typeof _PLAYER.destroy == 'function'){
					_PLAYER.destroy();
				}
				// this.createCameraContainer();
				let openFlag = false;
				this.param.cameraUrlArr.forEach((item,index) => {
					if(item.cameraId == cameraId){
						if(item.cameraUrls != null && item.cameraUrls.length != 0){
							openFlag = true;
							cameraIdFlag = cameraId;
							_PLAYER = new TcPlayer(this.param.cameraIdName, {
								m3u8_hd: this.param.clarity.includes('hd')?item.cameraUrls[0]:undefined, //高清
								m3u8:this.param.clarity.includes('od')?item.cameraUrls[1]:undefined,//item.cameraUrls[1], //原画
								autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
								width: "580", //视频的显示宽度，请尽量使用视频分辨率宽度
								height: "350", //视频的显示高度，请尽量使用视频分辨率高度
								controlBar: {
									playToggle: false,
									progressControl: false,
									volumePanel: false,
								},
								clarity: 'hd',
								clarityLabel: {
									od: '流畅',
									hd: '高清',
									sd: '标清'
								},
							});
							// 视频窗口可移动
							move({selector:'.cameraMove',handle:'.vcp-panel-bg',padding:[40,10,20,10],callBackMove:function(e){
								that.param.left = e.thisPosition.left;
								that.param.top = e.thisPosition.top;
							}});
							if(openFlag){
								this.openCamera();
							}
						} else {
							noUrls.createErrorAlert();
						}
					}
				})
				
			}
		},
		// 打开摄像头
		openCamera:function(){
			$(this.param.outerContainer+' #camera').css({
				'z-index':'111'
			})
			$(this.param.outerContainer+' .cameraclose').css({
				'z-index': '111',
				'display': 'block',
			})
			if(this.param.openCallBack && typeof this.param.openCallBack == 'function'){
				this.param.openCallBack('open');
			}
		},
		// 关闭摄像头
		closeCamera:function(msg = 'close'){
			$(this.param.outerContainer+' #camera').css({
				'z-index':'-111'
			})
			$(this.param.outerContainer+' .cameraclose').css({
				'z-index': '-111',
				'display': 'none',
			})
			if(_PLAYER != null && typeof _PLAYER.destroy == 'function'){
				_PLAYER.destroy();
			}
			cameraIdFlag = '';
			_PLAYER = null;
			if(this.param.closeCallBack && typeof this.param.closeCallBack == 'function'){
				this.param.closeCallBack(msg);
			}
		},
		// 点击×号
		clickCloseBtn:function(){
			let that = this;
			$(this.param.outerContainer).on('click','.camera .cameraclose',function(){
				that.closeCamera('cameraclose');
			})
		},
		// 更新监控视频数据
		updataCameraList:function(arr){
			_CAMERA_SELF.param.cameraUrlArr = arr;
		}
	}
	return camera;
})(jQuery)