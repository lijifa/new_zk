	/*
	* U3d组件
	* selector: 需要加U3d的容器id
	* param: {
	* 	jsonPath: json文件路径
	* 	completeCallback: 加载完成后的回调函数
	* 	doneTime: 回调延时时间默认为0
	* }
	*/
	var U3DTools = (function ($) {
		function U3DTools(selector, param) {
			// 容器
			this.elementId = selector;
			// 参数
			this.param = param;
			// 初始化
			this.init();
		}
		U3DTools.prototype = {
		
			constructor: U3DTools,
		
			init: function(){
				// 处理参数
				this.param = $.extend({
					"jsonPath": '',
					"completeCallback": '',
					"doneTime": 0
				}, this.param)
				
				this.canvas = '';

				// 插入小手div
				$('body').prepend('<div id="#pointer" style="cursor: pointer"></div><div id="#default" style="cursor: default"></div>')
			},
		
			loadProgress: function(gameInstance, progress, that) {
				if (!gameInstance.Module) {
					return;
				}
				
				const loader = document.querySelector("#loader");
				if (!gameInstance.progress) {
					const progress = document.querySelector("#loader .progress");
					progress.style.display = "block";
					gameInstance.progress = progress.querySelector(".full");
					loader.querySelector(".spinner").style.display = "none";
				}
				gameInstance.progress.style.transform = `scaleX(${progress})`;
				if (progress === 1 && !gameInstance.removeTimeout) {
					gameInstance.removeTimeout = setTimeout(function () {
						loader.style.display = "none";

						// 回调函数
						if (typeof(that.param.completeCallback) === 'function') {
							that.param.completeCallback(gameInstance)
						}
					}, that.param.doneTime);
				}
			},
			
			createUnity: function(){
				var gameInstance = UnityLoader.instantiate(this.elementId, this.param.jsonPath, { onProgress: (gameInstance, progress) =>this.loadProgress(gameInstance, progress, this) });
				return gameInstance
			}
		};

		return U3DTools;
	})(jQuery);

	// 鼠标小手
	function ChangeMouse2Pointer(arg0) {
		let canvas = document.getElementById("#canvas")
		if (canvas) {
			let pointerDiv = document.getElementById("#pointer");
			canvas.style.cursor = pointerDiv.style.cursor;
		}
	}
	// 鼠标默认
	function ChangeMouse2Default(arg0) {
		let canvas = document.getElementById("#canvas")
		if (canvas) {
			let defaultDiv = document.getElementById("#default");
			canvas.style.cursor = defaultDiv.style.cursor;
		}
	}

	function Log(str) {
		// console.log('unityLog ========',str)
		// Reset()
		// console.log('完成')
	}
	 function Reset()
	{
		console.log('Reset');
	   var canvas = document.getElementById("#canvas");//获取#canvas
	  
	   canvas.width = window.innerWidth;
	   canvas.height= window.innerHeight;
	// console.log('Reset函数调用成功');
	   if (typeof canvas.width!= "number") 
		  {
	     //在标准模式下面
	     if (document.compatMode == "CSS1Compat" ) 
			{
	          canvas.width= document.documentElement.clientWidth;
	           canvas.height= document.documentElement.clientHeight;
	     } else 
			{
	           canvas.width= document.body.clientWidth;
	           canvas.height= window.body.clientHeight;
	     }
	   }
	 }
	 
	// window.keyCtrlEnterFull();
	
	window.keyCtrlEnterFull=function(){
		$(document).keyup(function(event){			
		// 　　if(event.ctrlKey && event.keyCode==121){
			if(event.altKey && event.keyCode==48){
			console.log("u3dtools=======alt+0============");
				var restorebtn=top.$(".hd-restore-screen").css('display');
				if(restorebtn=='block'){
					top.$(".hd-restore-screen").click();
				}else{
					top.$(".screenfull").click();
				}
				
		　　}
		});
	}
	window.keyCtrlEnterFull();