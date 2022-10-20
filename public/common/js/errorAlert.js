var errorAlert = (function($){
	
	function errorAlert(param){
		this.param = param;
		this.init();
	}
	
	errorAlert.prototype = {
		constructor:errorAlert,
		init:function(){
			this.param = $.extend({
				msgTitle:'',
				msg:'',
				closeBack:null,
				imgUrl:'/common/image/failure.png',
				name:'errorAlert'
			},this.param);
		},
		createErrorAlert:function(obj){
			this.param = $.extend(obj,this.param);
			$('body').append(`
				<div class="errorAlert" id="${this.param.name}">
					<div class="errorBox" style="padding:0px 30px 0px;" id="resultFailure">
						<div class="erroeClose"></div>
						<div class="errorResult">
							<div class="errorImg" style="background-image: url(${this.param.imgUrl});"></div>
							<div style="padding:0 0 0 20px;">
								<div class="errorTitle">${this.param.msgTitle}</div>
								<div class="erroeMsg">${this.param.msg}</div>
							</div>
						</div>
					</div>
				</div>
			`)
			let that = this;
			$(document).on('click','#'+that.param.name+' .erroeClose',function(){
				$('#'+that.param.name).remove();
				if(that.param.closeBack && typeof that.param.closeBack == 'function'){
					that.param.closeBack();
				}
			})
		},
		closeErrorAlert:function(){
			$('#'+this.param.name).remove();
			if(this.param.closeBack && typeof this.param.closeBack == 'function'){
				this.param.closeBack();
			}
		}
	}
	
	return errorAlert;
})(jQuery)