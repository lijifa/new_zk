var instruction = (function($){
		function instruction(param){
			this.param = param;
			this.init();
		}
		instruction.prototype = {
			constructor:instruction,
			init:function(){
				this.param = $.extend({
					loadText:'指令传输中...',
					successText:'指令传输成功',
					failText:'指令传输失败',
					failReason:'',
				},this.param)
				let that = this;
				that.createMark();
				// that.closeInstruction();
				$(document).on('click','.closeX',function(){
					$('#breakerLoadMark').hide();
					$('#breakerLoadMark').html('');
				})
			},
			// 创建遮罩层
			createMark:function(){
				$('body').append(`
				<div class="breakerLoadMark" id="breakerLoadMark"></div>
				`)
			},
			// 关闭遮罩层
			closeInstruction:function(){
				$('#breakerLoadMark').hide();
				$('#breakerLoadMark').html('');
			},
			// 成功样式
			success:function(obj){
				this.param = $.extend(this.param,obj);
				$('#breakerLoadMark').html(`
					<div class="breakerLoadImg" id="instructionSuccess">
						<video src="/common/image/lightSuccess.mp4"autoplay muted></video>
						<div class="closeX"></div>
						<div class="breakerLoadText" style="color:rgba(72, 211, 150, 1);">${this.param.successText}</div>
					</div>
				`)
			},
			// 失败样式
			fail:function(obj){
				this.param = $.extend(this.param,obj);
				$('#breakerLoadMark').html(`
					<div class="breakerLoadImg" id="instructionFail">
						<video src="/common/image/lightFail.mp4"autoplay muted></video>
						<div class="closeX"></div>
						<div class="breakerLoadText" style="color:rgba(255, 68, 68, 1);">${this.param.failText}</div>
						<div class="breakerLoadReason" style="color:rgba(255, 68, 68, 1);">${this.param.failReason}</div>
					</div>
				`)
			},
			// 加载样式
			load:function(obj){
				this.param = $.extend(this.param,obj);
				$('#breakerLoadMark').html(`
					<div class="breakerLoadImg" id="instructionLoad">
						<video src="/common/image/lightLoad.mp4"autoplay muted loop></video>
						<div class="breakerLoadText">${this.param.loadText}</div>
						<div class="breakerLoadNum"><span>0</span><em>%</em></div>
					</div>
				`)
				let val = 0;
				let time = setInterval(function(){
					$('#breakerLoadMark #instructionLoad .breakerLoadNum span').html(val);
					val++;
					if(val >= 100){
						clearInterval(time);
					}
				},20);
			},
			// 展示状态
			showInstruction:function(state,obj){
				$('#breakerLoadMark').show();
				let that = this;
				switch (state){
					case -1:
						that.fail(obj);
						break;
					case 0:
						that.load(obj);
						break;
					case 1:
						that.success(obj);
						break;
					default:
						$('#breakerLoadMark').hide();
						$('#breakerLoadMark').html('');
						break;
				}
				
			}
		}
		return instruction;
})(jQuery)