	var hdTools={
		/*
		*加载遮罩层
		*elementId:需要加遮罩的容器id
		*/
		loadmask:function(elementId){
			var str='<div class="hd-loadmask">'+
					'<img src="../../common/image/load.gif" class="iconimg">'+			
				'</div>'
			$("#"+elementId).append(str);
			$("#"+elementId).css("position","relative");
		},
		/*
		*移除遮罩层
		*elementId:需要移除遮罩的容器id
		*/
		removemask:function(elementId){
			$("#"+elementId).find(".hd-loadmask").remove();
			$("#"+elementId).css("position","static");
		},
		/*ajax封装,包括遮罩层*/
		AJAX:function(eleid,url,type,callback,data,headers){
			 hdTools.loadmask(eleid);
			 $.ajax({
			    type:type,
			    url: baseurl+url,
			    data: data,
			    headers: headers,				
			    success: function(ret) {
			        console.log('ret===',ret);
					hdTools.removemask(eleid);
			        callback(ret);
			    },
			    error: function(ret) {
			        layui.use('layer', function() {
			            var layer = layui.layer;
			            hdTools.removemask(eleid);
			            layer.msg("网络异常")
			        });
			        console.log(ret);
			    }
			});
			
		},
		/*ajax封装(参数类型是json字符串),包括遮罩层*/
		AJAXJSON:function(eleid,url,type,callback,data,headers){
			 hdTools.loadmask(eleid);
			 $.ajax({
			    type:type,
			    url: baseurl+url,
			    data: data,
			    headers: headers,	
				contentType: 'application/json; charset=UTF-8',
				dataType:'json',
			    success: function(ret) {
			        console.log('ret===',ret);
					hdTools.removemask(eleid);
			        callback(ret);
			    },
			    error: function(ret) {
			        layui.use('layer', function() {
			            var layer = layui.layer;
			            hdTools.removemask(eleid);
			            layer.msg("网络异常")
			        });
			        console.log(ret);
			    }
			});
			
		},
		// /**
		//  * [changeheight 高度可变的柱状图]
		//  * @param  {[type]} pid     [div的id]
		//  * @param  {[type]} num     [具体的数值]
		//  * @param  {[type]} price   [占得份数]
		//  * @param  {[type]} dheight [div总的高度]
		//  * @return {[type]}         [description]
		//  * hdTools.changeheight("nowwaring1",26,100,200) [使用实例]
		//  */
		changeheight:function(pid,num,price,dheight,i=1,n=1) {
			// setInterval(function(){
			// 	if(n>num){
			// 		return
			// 	}
			// 	var load = n/price;
			// 	var hei = load*dheight>100?100:load*dheight;
			// 	var top = dheight - load*dheight;
			// 	$("#"+pid).css("height",hei+"%");	
			// 	$("#"+pid).css("margin-top",top+"%");
		 //        n =n+i;
		 //    },20);
		 // setInterval(function(){
		 	// if(n>num){
		 	// 	return
		 	// }
		 	var load = num/price;
		 	var hei = load*dheight>100?100:load*dheight;
			var top = dheight - load*dheight;
			if (hei == 0){
				hei = 0
			} else if (hei<0.2 && hei>0) {
				hei = 0.8
			} else {}
				// hei = hei < 0.2 ? 0.8 : hei;
		 	$("#"+pid).css("height",hei+"%");	
		 	$("#"+pid).css("margin-top",top+"%");
		     // n =n+i;
		 // },20);
		},
		
		//按照字符串"-"前面数字排序
		sortByTopNumber:function(arr){
			arr=JSON.stringify(arr).replace(/{/g,"").replace(/}/g,"").replace(/"/g,"").split(",");
			function f(a,b){
				var a=a.split("-")[0]*1;
				var b=b.split("-")[0]*1;
				if(a>b){return 1;}
				else{return -1;}
			}
			return arr.sort(f);
		}
		
		}