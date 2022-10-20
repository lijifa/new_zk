var controlPassword = (function(){
	let lot = null;
	let plctempId = null;
	function controlPassword(param){
		this.param = param;
		this.init();
	}
	
	controlPassword.prototype = {
		constructor:controlPassword,
		init:function(){
			this.param = $.extend({
				passwordBtn:[],
				completeMsg:[{success:'Success',failure:'Failure'}],
				loadTip:'',
				controlUrl:'',
				callback:null,
				clickback:null,
				isPassword:true,
			},this.param);
			let that = this;
			that.createMarkPassword(that.param);
			that.createPasswordBtn(that.param);
			that.createAnimate(that.param);
			that.closeMarkPassword(that);
			if(that.param.isPassword){
				that.btnCallBackFn(that);
			}
		},
		// 创建控制密码弹窗
		createMarkPassword:function(param){
			$('#markPassword').remove();
			$('body').append(`
			<div class="markPassword hide" id="markPassword">
				<div class="password show" id="password">
					<div class="iconE">控制密码</div>
					<div class="closeIcon"></div>
					<div class="hintMsg"></div>
					<div style="position:relative;">
						<input class="passwordInput" name="control" type="password" autocomplete="off" placeholder="请输入控制密码" maxlength="20"/>
						<span class="passwordError" style="display: none;">密码错误</span>
					</div>
					<div class="passwordBtn"></div>
				</div>
				<div class="password hide" id="loadGif">
					<div class="loadText">指令传输中...</div>
					<div class="loadding" id="loadAnimate"></div>
					<div class="loaddingText">
						${param.loadTip}
					</div>
				</div>
				<div class="password hide" style="padding:0px 30px 0px;" id="resultSuccess">
					<div class="closeIcon"></div>
					<div class="result">
						<div class="resultImg" style="background-image: url(/common/image/success.png);"></div>
						<div style="padding:0 0 0 20px;">
							<div class="msgTitle">控制成功</div>
							<div class="successMsg"></div>
						</div>
					</div>
				</div>
				<div class="password hide" style="padding:0px 30px 0px;" id="resultFailure">
					<div class="closeIcon"></div>
					<div class="result">
						<div class="resultImg" style="background-image: url(/common/image/failure.png);"></div>
						<div style="padding:0 0 0 20px;">
							<div class="msgTitle">控制失败</div>
							<div class="failureMsg"></div>
						</div>
					</div>
				</div>
			</div>
			`)
		},
		// 创建传输动画
		createAnimate:function(param){
			lot = lottie.loadAnimation({
				container: document.getElementById('loadAnimate'),
				renderer: 'html',
				loop: true,
				autoplay: false,
				path: '/common/lib/data.json',
				name: 'loaddingGif'
			});
		},
		// 创建按钮
		createPasswordBtn:function(param){
			$('#markPassword .passwordBtn').html('<div class="btnItem" id="cancel">取消</div>');
			param.passwordBtn.forEach((item,index) => {
				$('#markPassword .passwordBtn').append(`
					<button class="btnItem sure noClick"
						data-value="${item.value}"
						style="display:${item.select?'block':'none'}"
						disabled
					>${item.name}</button>
				`)
				item.select ? $('#markPassword .hintMsg').html(item.hintMsg):'';
			})
		},
		// 关闭弹出层
		closeMarkPassword:function(that){
			$('#markPassword .closeIcon').on('click',function(){
				that.stage('');
				if(that.param.clickback && typeof that.param.clickback == 'function'){
					that.param.clickback();
				}
			})
			$('#markPassword').on('click','#cancel',function(){
				that.stage('');
				if(that.param.clickback && typeof that.param.clickback == 'function'){
					that.param.clickback();
				}
			})
			$('#markPassword .passwordInput').on('input', function() {
				let length = $(this).val().length;
				$('#markPassword .passwordError').hide();
				$('#markPassword .passwordInput').removeClass('passwordInputError');
				if (length < 3) {
					$('#markPassword .sure').attr('disabled', true);
					$('#markPassword .sure').addClass('noClick');
				} else {
					$('#markPassword .sure').removeAttr('disabled');
					$('#markPassword .sure').removeClass('noClick');
				}
			})
		},
		// 弹层不同状态
		stage:function(type){
			switch (type) {
				case '0':// 显示密码输入框
					$('#markPassword').addClass('show').removeClass('hide');
					$('#markPassword #loadGif').addClass('hide').removeClass('show');
					$('#markPassword #resultSuccess').addClass('hide').removeClass('show');
					$('#markPassword #resultFailure').addClass('hide').removeClass('show');
					$('#markPassword #password').addClass('show').removeClass('hide');
					$('#markPassword .passwordInput').val('');
					break;
				case '1':// 传输动画
					$('#markPassword').addClass('show').removeClass('hide');
					$('#markPassword #loadGif').addClass('show').removeClass('hide');
					$('#markPassword #resultSuccess').addClass('hide').removeClass('show');
					$('#markPassword #resultFailure').addClass('hide').removeClass('show');
					$('#markPassword #password').addClass('hide').removeClass('show');
					$('#markPassword .passwordInput').val('');
					break;
				case '2':// 成功结果
					$('#markPassword').addClass('show').removeClass('hide');
					$('#markPassword #loadGif').addClass('hide').removeClass('show');
					$('#markPassword #resultSuccess').addClass('show').removeClass('hide');
					$('#markPassword #resultFailure').addClass('hide').removeClass('show');
					$('#markPassword #password').addClass('hide').removeClass('show');
					$('#markPassword .passwordInput').val('');
					break;
				case '3':// 失败结果
					$('#markPassword').addClass('show').removeClass('hide');
					$('#markPassword #loadGif').addClass('hide').removeClass('show');
					$('#markPassword #resultSuccess').addClass('hide').removeClass('show');
					$('#markPassword #resultFailure').addClass('show').removeClass('hide');
					$('#markPassword #password').addClass('hide').removeClass('show');
					$('#markPassword .passwordInput').val('');
					break;
				default:// 关闭
					$('#markPassword').addClass('hide').removeClass('show');
					$('#markPassword #loadGif').addClass('hide').removeClass('show');
					$('#markPassword #resultSuccess').addClass('hide').removeClass('show');
					$('#markPassword #resultFailure').addClass('hide').removeClass('show');
					$('#markPassword #password').addClass('show').removeClass('hide');
					$('#markPassword .passwordInput').val('');
					$('#markPassword .passwordError').hide();
					$('#markPassword .passwordInput').removeClass('passwordInputError');
					break;
			}
		},
		// 按钮功能 回调
		btnCallBackFn:function(that){
			$('#markPassword').on('click','.sure',function(){
				let flagPassword = false;
				let val = $(this).attr('data-value');
				$.ajax({
					url:hdInterface.passwordAuthentication,
					type:'get',
					data:{
						password: $('#markPassword .passwordInput').val()
					},
					async:false,
					success:function(data) {
						if (data.code == 0) {
							if (data.data) {
								flagPassword = true;
								$('#markPassword .passwordError').hide();
								$('#markPassword .passwordInput').removeClass('passwordInputError');
							} else {
								flagPassword = false;
								$('#markPassword .passwordError').show();
								$('#markPassword .passwordInput').addClass('passwordInputError');
							}
						}
					}
				})
				let type = val;
				if(flagPassword){
					that.stage('1');
					// 传输动画开始
					let num1 = Math.round(Math.random() * 500 + 500),
						num2 = Math.round(Math.random() * 1000 + 1000);
					lot.goToAndStop(0, false);
					lot.play();
					// 开始断路器控制状态请求
					setTimeout(function(){
						$.ajax({
							url:that.param.controlUrl,
							type:'post',
							data:plctempId,
							timeout:60*1000,
							success:function(res) {
								if (res.code == 0) {
									// that.stage('2');
									if(that.param.callback && typeof that.param.callback == 'function'){
										that.param.callback(res,'2');
									}
								} else {
									// that.stage('3');
									if(that.param.callback && typeof that.param.callback == 'function'){
										that.param.callback(res,'3');
									}
								}
							},
							complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
								if (status == 'timeout') { //超时,status还有success,error等值的情况
									that.editResultMsg('控制超时','控制超时');
									that.stage('3');
									setTimeout(function(){
										that.stage('');
									},5*1000)
								}
							}
						})
					},2000)
					// num1秒后动画达到num1位置并暂停动画
					/* setTimeout(function() {
						lot.goToAndStop(num1, false);
						// 2s后开始动画
						setTimeout(function() {
							lot.play();
							// num2秒后动画达到num1+num2位置并暂停动画
							setTimeout(function() {
								lot.goToAndStop(num1 + num2, false);
								// 开始断路器控制状态请求
								$.ajax({
									url:that.param.controlUrl,
									type:'get',
									data:plctempId,
									success:function(res) {
										// data.code = Math.round(Math.random());
										if (res.code == 0) {
											// 成功后1s开始动画
											setTimeout(
												function() {
													lot.play();
													// 完成剩余动画、改变页面状态
													setTimeout(function() {
														lot.goToAndStop(2700,false);
														that.stage('2');
														if(that.param.callback && typeof that.param.callback == 'function'){
															that.param.callback(res);
														}
													},2700 - num1 - num2);
												}, 1000);
										} else {
											// 失败后1s开始动画
											setTimeout(function() {
												lot.play();
												// 完成剩余动画
												setTimeout(function() {
													lot.goToAndStop(2700,false);
													that.stage('3');
													if(that.param.callback && typeof that.param.callback == 'function'){
														that.param.callback(res);
													}
												},2700 - num1 - num2);
											}, 1000);
										}
									}
								})
							}, num2);
						}, 2000);
					}, num1); */
				}
			})
		},
		// 直接控制无需密码
		controlWithoutPassword:function(that){
			// that.stage('1');
			// 传输动画开始
			let num1 = Math.round(Math.random() * 500 + 500),
				num2 = Math.round(Math.random() * 1000 + 1000);
			lot.goToAndStop(0, false);
			lot.play();
			// 开始断路器控制状态请求
			setTimeout(function(){
				$.ajax({
					url:that.param.controlUrl,
					type:'post',
					data:plctempId,
					timeout:60*1000,
					success:function(res) {
						if (res.code == 0) {
							// that.stage('2');
							if(that.param.callback && typeof that.param.callback == 'function'){
								that.param.callback(res,'2');
							}
						} else {
							// that.stage('3');
							if(that.param.callback && typeof that.param.callback == 'function'){
								that.param.callback(res,'3');
							}
						}
					}
				})
			},2000)
			
			// num1秒后动画达到num1位置并暂停动画
			/* setTimeout(function() {
				lot.goToAndStop(num1, false);
				// 2s后开始动画
				setTimeout(function() {
					lot.play();
					// num2秒后动画达到num1+num2位置并暂停动画
					setTimeout(function() {
						lot.goToAndStop(num1 + num2, false);
						// 开始断路器控制状态请求
						$.ajax({
							url:that.param.controlUrl,
							type:'get',
							data:plctempId,
							success:function(res) {
								// data.code = Math.round(Math.random());
								if (res.code == 0) {
									// 成功后1s开始动画
									setTimeout(
										function() {
											lot.play();
											// 完成剩余动画、改变页面状态
											setTimeout(function() {
												lot.goToAndStop(2700,false);
												that.stage('2');
												if(that.param.callback && typeof that.param.callback == 'function'){
													that.param.callback(res);
												}
											},2700 - num1 - num2);
										}, 1000);
								} else {
									// 失败后1s开始动画
									setTimeout(function() {
										lot.play();
										// 完成剩余动画
										setTimeout(function() {
											lot.goToAndStop(2700,false);
											that.stage('3');
											if(that.param.callback && typeof that.param.callback == 'function'){
												that.param.callback(res);
											}
										},2700 - num1 - num2);
									}, 1000);
								}
							}
						})
					}, num2);
				}, 2000);
			}, num1); */
		},
		// 修改按钮
		changeSelected:function(select,id = {}){
			plctempId = id;
			$(`#markPassword button[data-value=${select}]`).show().siblings('button').hide();
			this.param.passwordBtn.forEach((item,index) => {
				if(item.value == select){
					$('#markPassword .hintMsg').html(item.hintMsg);
					$('#markPassword #resultSuccess .successMsg').html(
					this.param.completeMsg[index]&&this.param.completeMsg[index]['success']?this.param.completeMsg[index]['success']:'成功'
					);
					$('#markPassword #resultFailure .failureMsg').html(
					this.param.completeMsg[index]&&this.param.completeMsg[index]['failure']?this.param.completeMsg[index]['failure']:'失败'
					);
				}
			})
		},
		// 修改请求结果提示信息
		editResultMsg:function(success = '',failure = ''){
			$('#markPassword #resultSuccess .successMsg').html(success);
			$('#markPassword #resultFailure .failureMsg').html(failure);
		}
	}
	return controlPassword;
})(jQuery);