/**
 * [loadPng description]
 * @param  {[arry]} nameArr  [图片名称的数组]
 * @param  {[type]} nameLink [图片的路径]
 * @param  {[type]} myImgs    [需要加载位置的id]
 * @param  {[string]} cacheImg    [缓存图片的class]
 * @param  {[bool]} loadOnce    [是否只加载一次]
 */
function loadPng(nameArr,nameLink,imgsID,maxNum,cacheImg,loadOnce) {
    // //初始化image对象
    // var html = $("body").html()
    // //遍历数组的路径，预加载到客户端
    // for (var i = 0; i < nameArr.length; i++){
    //     html += "<img class = 'myImageHolder1' src = '"+nameLink+nameArr[i]+"'>";
    // }
    // $("#imgs_spw").html(html)
    // var myImgs = $('.myImageHolder1');
    var myImgs =$('.'+cacheImg);;
    var sum = 0;
    myImgs.each(function(a){
        let Img = $(this);
        if(Img[0].complete){
			// console.log(sum)
            // 用于缓存图片
            sum++;          
        }
        Img.on('load', function(){ 
			// console.log(sum)
            sum++;
        });
        Img.on('error', function(){ 
// 
//             console.log(Img.attr('src'));
//             Img.attr('src',nameLink + nameArr[a]);
        });
      });

    var n = 0
    var myAnim = setInterval(function(){
        if(sum < maxNum-1){
            return;
        }
        imgsID.css("display","block");
        $(".loadimg").css("display","none");
        // $(".warn").css("display","none");
        var nextImage = nameLink+nameArr[n];
        imgsID.attr('src',nextImage);        
        if(n == maxNum-1){
			 n =0;
			if(loadOnce==true){
				clearInterval(myAnim);
			}
          
        }else{
            n++;
        }   
    },42);
}
