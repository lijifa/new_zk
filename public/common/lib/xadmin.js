//密码正则
var passRegular = /^[a-zA-Z0-9]{1,30}$/;
//用户名
var userRegular = /^[a-zA-Z0-9]{1,50}$/
//名称 是否包含特殊符号 true包含 则不通过
var nameRegular = /^[A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;
//姓名
var userNameRegular = /^[\u4E00-\u9FA5]{1,25}$/;
//模块
var moduleRegular = /^[A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;
//编号
var numberRegular = /^[a-zA-Z0-9]{1,50}$/;
//金额
var moneyRegular = /^[0-9]{1,10}$/;
//8位密码
$(function() {
    //加载弹出层
    layui.use(['form', 'element'], function() {
        layer = layui.layer;
        element = layui.element;
    });
    $('.container .left_open i').click(function(event) {
        if ($('.left-nav').css('left') == '0px') {
            $('.left-nav').animate({
                left: '-200px'
            }, 100);
            $('.page-content').animate({
                left: '0px'
            }, 100);
            $('.page-content-bg').hide();
        } else {
            $('.left-nav').animate({
                left: '0px'
            }, 100);
            $('.page-content').animate({
                left: '200px'
            }, 100);
            if ($(window).width() < 768) {
                $('.page-content-bg').show();
            }
        }
    });
    // 
    $('.page-content-bg').click(function(event) {
        $('.left-nav').animate({
            left: '-200px'
        }, 100);
        $('.page-content').animate({
            left: '0px'
        }, 100);
        $(this).hide();
    });
    // 
    //     $('.layui-tab-close').click(function(event) {
    //         $('.layui-tab-title li').eq(0).find('i').remove();
    //     });
    //左侧菜单效果
    // $('#content').bind("click",function(event){
    $('.left-nav #nav li').click(function(event) {
        // if ($(this).children('.sub-menu').length) {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).find('.nav_right').html('&#xe697;');
            $(this).children('.sub-menu').stop().slideUp();
            $(this).siblings().children('.sub-menu').slideUp();
        } else {
            $(this).addClass('open');
            $(this).children('a').find('.nav_right').html('&#xe6a6;');
            $(this).children('.sub-menu').stop().slideDown();
            $(this).siblings().children('.sub-menu').stop().slideUp();
            $(this).siblings().find('.nav_right').html('&#xe697;');
            $(this).siblings().removeClass('open');
            // }
        }
    })
})
var cateIds = [];

function getCateId(cateId) {
    $("tbody tr[fid=" + cateId + "]").each(function(index, el) {
        id = $(el).attr('cate-id');
        cateIds.push(id);
        getCateId(id);
    });
}
/*弹出层*/
/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function x_admin_show(title, url, w, h, data) {
    console.log('哈哈哈')


    localStorage.setItem('isNew', '0')
    if (title == null || title == '') {
        title = false;
    };
    console.log('哈哈哈')

    if (url == null || url == '') {
        url = "404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() * 0.9);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    if (w == 100) {
        layer.open({
            type: 2,
            area: [w + '%', w + '%'],
            fix: false, //不固定
            maxmin: false,
            shadeClose: false,
            closeBtn: false,
            shade: 0.4,
            title: false,
            content: url,

        });
    } else {
        layer.open({
            type: 2,
            area: [w + 'px', h + 'px'],
            fix: false, //不固定
            maxmin: false,
            shadeClose: false,
            shade: 0.4,
            title: false,
            content: url,
        });
    }
}

function openFrame(title, url) {
    var w = ($(window).width() * 0.9);
    var h = ($(window).height() - 50);
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: false,
        closeBtn: 0,
        shadeClose: false,
        shade: 0.4,
        title: false,
        content: url,
    });
}
// 延迟2秒跳转
function skipUrl(url, time, state) {
    if (state == 1) {
        localStorage.setItem('isNew', 0);
    }
    if (time == 2) {
        setInterval(function() {
            window.location.href = url
        }, 500);
    } else {
        window.location.href = url
    }
}
/*关闭弹出框口*/
function x_admin_close() {
    // 	var index = parent.layer.getFrameIndex(window.name);
    // 	parent.layer.close(index);
//  layer.msg("添加或修改失败，返回上一页面！")
    setInterval(function() {
    	
    	window.location.href = "javascript:history.back(-1)"
            
        }, 100);
    
}
//返回上一页
//type 是否是一个表单返回，null为是，1否默认为null
    function x_admin_close_bianji(type) {
        // 	var index = parent.layer.getFrameIndex(window.name);
        // 	parent.layer.close(index);
       //询问框
        if (type) {
            setInterval(function() {
                    
                window.location.href = "javascript:history.back(-1)"
                // window.location.href = "platform-user.html"

            }, 100);
        }else{
            layer.confirm('本操作将会放弃您之前的输入，是否要返回？', {
              btn: ['是','否'] //按钮
            }, function(){
                setInterval(function() {
                    window.location.href = "javascript:history.back(-1)"
                    // window.location.href = "platform-user.html"
                }, 100);
            }, function(){
              return;
            }); 
        }
     
    }
    
/**
 * JQ ajax post提交方法封装
 * @param {String} url	ajax接口路径
 * @param {JSON} data
 * @param {String} callback 	ajax成功后回调函数
 */
function postAjax(url, data, headers, callback) {

    // console.log('是否返回成功'+callback);
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load();
    });
    console.log(data);
    $.ajax({
        type: "post",
        url: url,
        data: data,
        headers: headers,
		// contentType: 'application/json; charset=UTF-8',
		// dataType:'json',
        success: function(ret) {
            console.log('ret===',ret);
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            console.log(ret);
        }
    });
}

function postAjaxjson(url, data, headers, callback) {

    console.log('是否返回成功'+callback);
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load();
    });
    $.ajax({
        type: "post",
        url: url,
        data: data,
        headers: headers,
		contentType: 'application/json; charset=UTF-8',
		dataType:'json',
        success: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            console.log(ret);
        }
    });
}
/**
 * JQ ajax get提交方法封装
 * @param {String} url  ajax接口路径
 * @param {String} callback		ajax成功后回调函数
 */
function getAjax(url, headers, callback, data) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load();
    });
    $.ajax({
        type: "get",
        url: url,
        data: data,
        dataType: "text",
        headers: headers,
        success: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(err) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            //			layer.closeAll('loading');
            //			layer.msg("网络异常");
        }
    });
}
/**
 * JQ ajax get同步提交方法封装   带蒙版弹出
 * @param {String} url  ajax接口路径
 * @param {String} callback		ajax成功后回调函数
 */
function getAsyncAjaxAndMb(url, headers, callback) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load(3, {
            shade: [0.9, '#393D49'] //0.1透明度的白色背景
        });
    });
    $.ajax({
        type: "get",
        url: url,
        dataType: "text",
        async: false,
        headers: headers,
        success: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(err) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            //			layer.closeAll('loading');
            //			layer.msg("网络异常");
        }
    });
}
/**
 * JQ ajax get同步提交方法封装
 * @param {String} url  ajax接口路径
 * @param {String} callback		ajax成功后回调函数
 */
function getAsyncAjax(url, headers, callback, data) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load();
    });
    $.ajax({
        type: "get",
        url: url,
        dataType: "text",
        async: false,
        data:data,
        headers: headers,
        success: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(err) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            //			layer.closeAll('loading');
            //			layer.msg("网络异常");
        }
    });
}
/**
 * JQ ajax post同步提交方法封装
 * @param {String} url  ajax接口路径
 * @param {String} callback     ajax成功后回调函数
 */
function postAsyncAjax(url, data, headers, callback) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.load();
    });
    $.ajax({
        type: "post",
        url: url,
        dataType: "text",
        async: false,
        data:data,
        headers: headers,
        success: function(ret) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
            });
            callback(ret);
        },
        error: function(err) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.closeAll('loading');
                layer.msg("网络异常")
            });
            //          layer.closeAll('loading');
            //          layer.msg("网络异常");
        }
    });
}
//获取url参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//时间戳转化
function getMyDate(str) {
    var oDate = new Date(str * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间  
    return oTime;
};
//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
//获取省
function getPro(pro_val) {
    var pro_val = pro_val || 0;
    $.ajax({
        type: 'GET',
        url: getPCA,
        async: false,
        data: {
            "fid": 1
        },
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id == pro_val) {
                    var selected = "selected";
                } else {
                    var selected = "";
                }
                var html = '<option value="' + res.data[i].id + '" class="pca_dt" ' + selected + ' >' + res.data[i].regionName + '</option>';
                $("#province").append(html);
            }
        },
        error: function(err) {
            console.log(typeof err);
            console.log("Error: " + JSON.stringify(err));
        }
    });
}
//获取市
function getCity(provinceId, city_val = 0) {
    $.ajax({
        type: 'GET',
        url: getPCA,
        async: false,
        data: {
            "fid": provinceId
        },
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            $('#city .pca_dt').remove();
            $('#area .pca_dt').remove();
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id == city_val) {
                    var selected = "selected";
                } else {
                    var selected = "";
                }
                var html = '<option value="' + res.data[i].id + '" class="pca_dt" ' + selected + ' >' + res.data[i].regionName + '</option>'
                $("#city").append(html)
            }
        },
        error: function(err) {
            console.log(typeof err)
            console.log("Error: " + JSON.stringify(err));
        }
    });
}
//获取区
function getArea(cityId, area_val = 0) {
    $.ajax({
        type: 'GET',
        url: getPCA,
        async: false,
        data: {
            "fid": cityId
        },
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            $('#area .pca_dt').remove();
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id == area_val) {
                    var selected = "selected";
                } else {
                    var selected = "";
                }
                var html = '<option value="' + res.data[i].id + '" class="pca_dt" ' + selected + ' >' + res.data[i].regionName + '</option>'
                $("#area").append(html)
            }
        },
        error: function(err) {
            console.log(typeof err)
            console.log("Error: " + JSON.stringify(err));
        }
    });
}

function getProvinceId() {
    $.ajax({
        type: 'GET',
        url: getAllCity + '?cyParentid=' + 0,
        dataType: 'text',
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            var data = JSON.parse(res)
            console.log(data.data)
            for (var i = 0; i < data.data.length; i++) {
                var item = '<option value="' + data.data[i].id + '" onclick="cityId(' + data.data[i].id + ')">' + data.data[i].cyName + '</option>';
                $(".provinceId").append(item)
            }
        },
        error: function(err) {
            console.log(typeof err)
            console.log("Error: " + JSON.stringify(err));
        }
    });
}

function cityId(ciyId) {
    $.ajax({
        type: 'GET',
        url: getAllCity + '?cyParentid=' + ciyId,
        dataType: 'text',
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            var data = JSON.parse(res)
            console.log(data.data)
            for (var i = 0; i < data.data.length; i++) {
                var item = '<option value="' + data.data[i].id + '" onclick="locId(' + data.data[i].id + ')">' + data.data[i].cyName + '</option>';
                $(".cityId").append(item)
            }
        },
        error: function(err) {
            console.log(typeof err)
            console.log("Error: " + JSON.stringify(err));
        }
    });
}

function locId(loId) {
    $.ajax({
        type: 'GET',
        url: getAllCity + '?cyParentid=' + loId,
        dataType: 'text',
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(res) {
            var data = JSON.parse(res)
            console.log(data.data)
            for (var i = 0; i < data.data.length; i++) {
                var item = '<option value="' + data.data[i].id + '">' + data.data[i].cyName + '</option>';
                $("#area").append(item)
            }
        },
        error: function(err) {
            console.log(typeof err)
            console.log("Error: " + JSON.stringify(err));
        }
    });
}
//获取明天时间，格式YYYY-MM-DD
function getTomrrowFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取今天时间，格式YYYY-MM-DD
function getTodayFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取前三个月时间，格式YYYY-MM-DD
function getThreeMonthAgoFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    if(date.getMonth()<3){
        var month = date.getMonth() - 2 + 12;
        var year = date.getFullYear() - 1;
    }else{
        var month = date.getMonth() - 2;
        var year = date.getFullYear();
    }
    
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取前1个月时间，格式YYYY-MM-DD
function getOneMonthAgoFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    if(date.getMonth()<1){
        var month = 12;
        var year = date.getFullYear() - 1;
    }else{
        var month = date.getMonth();
        var year = date.getFullYear();
    }
    
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取去年今天时间，格式YYYY-MM-DD
function getLastYearTodayFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    var year = date.getFullYear() - 1;
    var month = date.getMonth() + 1;
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取去年今天前三个月时间，格式YYYY-MM-DD
function getLastYearThreeMonthAgoFormatDate() {
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    var seperator1 = "-";
    var year = date.getFullYear() - 1;
    var month = date.getMonth() - 2;
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//10位时间戳转为字符串
function timestampToTime(timestamp,type) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    h = ' ' + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
    m = ':' + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    s = ':' + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    if (type == "M") {
        //返回日期格式
        return Y + M + D + " " + h + m;
    }else if(type == "S"){
        return Y + M + D + " " + h + m + s;
    }else{
        return Y + M + D;
    }
    
}
//七牛token
function getTokenMessage() {
    var token = {};
    $.ajax({
        url: getQNToken,
        async: false,
        headers: {
            "Authorization": localStorage.getItem("Token")
        },
        success: function(data) {
            token.token = data;
        }
    })
    console.log(token)
    return token;
}
//下载文件
function download(name, url) {
    var xmlResquest = new XMLHttpRequest();
    xmlResquest.open("GET", url, true);
    xmlResquest.setRequestHeader("Content-type", "application/json");
    xmlResquest.setRequestHeader("Authorization", localStorage.getItem("Token"));
    xmlResquest.responseType = "blob";
    xmlResquest.onload = function(oEvent) {
        var content = xmlResquest.response;
        var elink = document.createElement('a');
        elink.download = name + ".xlsx";
        elink.style.display = 'none';
        var blob = new Blob([content]);
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    };
    xmlResquest.send();
}
/**
 * 正则验证
 * @param title string 需要验证的title，比如姓名，密码，编号等
 * @param value string title对应的值
 * @param type int 说明： 1密码 2用户名 3名称 4姓名 5备注 6模块 7预留字段 8编号 9金额 10下拉框
 * @param must_fill int 说明： 0非必填，其他值均是必填
 * @returns {string|boolean} 如果返回字符串，则不符合验证条件；返回 true 则符合验证条件
 */
//正则验证方法 type 1密码 2用户名 3名称 4姓名 5备注 6模块 7预留字段 8编号 9金额
function testRegular(title, value, type, must_fill = 0) {
    var message = true;
    function myselfregular(){
    	if (type == 1) {
            // var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{1,30}$/;
            var reg = /^[A-Za-z0-9]{1,30}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于30字符的数字、字母";
            }
        } else if (type == 2) {
            // var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{1,50}$/;
            var reg = /^[A-Za-z0-9]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符的数字、字母";
            }
        } else if (type == 3) {
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符并不能输入特殊符号";
            }
        } else if (type == 4) {
            var reg = /^[\u4e00-\u9fa5]{1,10}$/;
            if (!reg.test(value)){
                message = title + "格式有误，请输入不大于10字符的汉字";
            }
        } else if (type == 5){
            // var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{0,250}$/;
            // var reg =  /^\s*\S((.){1,250}\S)?\s*$/; //带空格
            // var reg = /^[\s\S]{1,250}$/;
            if (value.length>=250) {
                message = title + "格式有误,请输入不大于250个的字符";
            }else if(value.length = 0){
                message = title + "格式有误,请输入内容";
            }
        } else if (type == 6) {
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符并不能输入特殊符号";
            }
        } else if (type == 7) {
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符并不能输入特殊符号";
            }
        } else if (type == 8) {
            // var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{1,50}$/;
            var reg = /^[A-Za-z0-9]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符的数字、字母";
            }
        } else if (type == 9) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg = /^[0-9]{1,10}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于10位的正整数";
            }
        } else if (type == 10) {
            if (value == ''|| value == null) {
                message = "请选择" + title;
            }
        }else if (type == 11) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg = /^(?=.*[a-zA-Z0-9])(?=.*\d)(?=.*[~!@#$%^*()_+`\-={}:";'<>?,.\/]).{8,30}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入8至30位的数字字母特殊符号";
            }
        }else if (type == 12) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg=/^[0-9]+(.[0-9]{1,2})?$/;
            if (!reg.test(value)) {
                message = title + "请输入有效价格";
            }
        }else if (type == 13) {
            // var reg = /^[+]?\d{1,10}$/;
            // var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
            var reg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入正确手机号码";
            }
        }else if (type == 14) {
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,250}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于250字符并不能输入特殊符号";
            }
        } else if (type == 15) {
            var reg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(value)) {
                message = title + "请输入正确的身份证格式";
            }
        } else if (type == 16) {
            var reg =  /^(?=.*[a-zA-Z0-9])(?=.*\d)(?=.*[~!@#$%^*()_+`\-={}:";'<>?,.\/]).{1,250}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于250字符包含特殊符号";
            }
        }else if (type == 17) {
            var reg = /^[\u4e00-\u9fa5]{1,10}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于十位的中文";
            }
        }
        else if (type == 18) {
        //     // var reg = /^[+]?\d{1,10}$/;
            var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入100以内的正数";
            }
        }
        else if (type == 19) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg=/^[0-9]+(.[0-9]{2})?$/;
            if (!reg.test(value)) {
                message = title + "请输入有效金额";
            }
        }else if (type == 20) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg=/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
            if (!reg.test(value)) {
    //      	1、可以使用6-20个子母、数字、下划线和减号 
    //			2、必须以字母开头（字母不区分大小写） 
    //			3、不能设置中文
                message = title + "请输入格式正确的微信号码";
            }
        }else if (type == 21) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (!reg.test(value)) {
                message = title + "请输入正确的邮箱地址";
            }
        }else if (type == 22) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg=/^[A-Za-z0-9]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "请输入正确的三级域名";
            }
        }else if (type == 23) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg= /^(([\u4e00-\u9fff]{2,50})|([a-z\.\s\,]{2,50}))$/i;
            if (!reg.test(value)) {
                message = title + "请输入正确的公司名称";
            }
        }else if (type == 24) {
            // var reg = /^[+]?\d{1,10}$/;
            var reg= /[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            if (!reg.test(value)) {
                message = title + "请输入正确的链接";
            }
        }else if (type == 25) {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于20字符的中英文和数字";
            }
        } else if (type == 26) {
            // var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{0,250}$/;
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5-\u0020]{1,50}$/; //带空格
            if (!reg.test(value)) {
                message = title + "格式有误,请输入不大于50个的字符";
            }
        } else if (type == 27) {
//      	可以输入任何,但是不能超过50字符
            if (value.length>=50) {
                message = title + "格式有误,请输入不大于50个的字符";
            }else if(value.length = 0){
                message = title + "格式有误,请输入内容";
            }
        }else if (type == 28) {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;
            if (!reg.test(value)) {
                message = title + "格式有误，请输入不大于50字符的中英文和数字";
            }
        }
        else if (type == 29) {
//          可以输入任何,但是不能超过300字符
            if (value.length>=300) {
                message = title + "格式有误,请输入不大于300个的字符";
            }else if(value.length = 0){
                message = title + "格式有误,请输入内容";
            }
        }
		else if (type == 30) {
			//          可以输入任何,但是不能超过300字符
			            if (value.length>200) {
			                message = title + "格式有误,请输入不大于200个的字符";
			            }else if(value.length = 0){
			                message = title + "格式有误,请输入内容";
			            }
		} 

		else if (type == 31) {		   
		    if (value.indexOf(",")==-1) {
		        message = title + "格式有误，请选择正确的地点";
		    }
		}
		  else if (type == 32) {
		    if (value == '' || value == null) {
		            message = "请填写" + title;
		    }
		}
		
		else if (type == 33) {
		    if (value == '' || value == null) {
		        message = "请输入不大于20字符标题" + title;
		    }
		}
		
		else if (type == 34) {
			//          可以输入任何,但是不能超过300字符
			            if (value.length>20) {
			                message = title + "格式有误,请输入不大于20个的字符";
			            }else if(value.length = 0){
			                message = title + "格式有误,请输入内容";
			            }
		}

        else if (type == 35) {
            // var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{0,250}$/;
            // var reg =  /^\s*\S((.){1,250}\S)?\s*$/; //带空格
            // var reg = /^[\s\S]{1,250}$/;
            if (value.length>=31) {
                message = title + "格式有误,请输入不大于30个的字符";
            }else if(value.length = 0){
                message = title + "格式有误,请输入内容";
            }
        }
		else if (type == 36) {
		    var reg = /^[A-Za-z\u4e00-\u9fa5]{1,6}$/;
		    if (!reg.test(value)) {
		        message = title + "格式有误，请输入不大于6字符的中英文";
		    }
		}   
		else if (type == 37) {
		    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,30}$/;
		    if (!reg.test(value)) {
		        message = title + "格式有误，请输入不大于30字符的中英文和数字";
		    }
		}
		else if (type == 38) {
		    var reg = /^[A-Za-z\u4e00-\u9fa5]{1,10}$/;
		    if (!reg.test(value)) {
		        message = title + "格式有误，请输入不大于10字符的中英文";
		    }
		} 
		else if (type == 39) {
		    // var reg = /^[+]?\d{1,10}$/;
		    // var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
		    var reg=/^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
		    if (!reg.test(value)) {
		        message = title + "格式有误，请输入正确手机号码";
		    }
		}
		else if (type == 40) {
		    var reg = /^[A-Za-z\u4e00-\u9fa5]{1,20}$/;
		    if (!reg.test(value)) {
		        message = title + "格式有误，请输入不大于20字符的中英文";
		    }
		} 
    }
    if (must_fill != 0) {
        if (title=='备注'){
            myselfregular();
            return message;
        }else {
            if (value == '' || value == null) {
                if (type == 10) {
                    message = "请选择" + title;
                } else {
                    message = title+"不能为空，请填写" + title;
                }
                return message;
            }else{
                myselfregular();
                return message;
            }
        }


    }else{
        if(value == '' || value == null){
            return message;
        }else{
            myselfregular();
            return message;
        }
    }
    
//  return message;
    // return true;
}


function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}
//当前时间减去计算时间
function newtime(othertime) {
	var date1 = (new Date()).getTime()/1000;
	// console.log(date1);
    // var date1 = new Date(startTime);   //开始时间
            
    var date2 = new Date(othertime);     //结束时间
     
    var date3 =date1- othertime;   //时间差的毫秒数
     
             //计算出相差天数
            
    var days = Math.floor(date3 / (24 * 3600 * 1));         //计算出小时数
            
    var leave1 = date3 % (24 * 3600 * 1);     //计算天数后剩余的毫秒数
            
    var hours = Math.floor(leave1 / (3600 * 1));         //计算相差分钟数
            
    var leave2 = leave1 % (3600 * 1);         //计算小时数后剩余的毫秒数
            
    var minutes = Math.floor(leave2 / (60 * 1));         //计算相差秒数
            
    var leave3 = leave2 % (60 * 1);       //计算分钟数后剩余的毫秒数
            
    var seconds = Math.round(leave3 / 1);     
    
    return " " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
}

function strToHexCharCode(str) {　　
    if (str === "")　　　　 return "";　　
    var hexCharCode = [];　　
    hexCharCode.push("0x");　　
    for (var i = 0; i < str.length; i++) {　　　　
        hexCharCode.push((str.charCodeAt(i)).toString(16));　　
    }　　
    return hexCharCode.join("");
}
// 左侧菜单存储 value1是一级菜单value2是二级菜单value3是三级菜单
function leftnavshow(value1,value2,value3){
    localStorage.setItem("ulIndex",value1);
    localStorage.setItem("liIndex",value2);
    localStorage.setItem("thirdIndex",value3);
}
function ErrorHandling(code){
    if (code<0) {
        localStorage.clear();
        window.location.href="./login.html";
    }
}
//把数组变成用,分开的字符串
//arr 需要重组的数组
  function getTextByJs(arr) {
      var str = "";
      for (var i = 0; i < arr.length; i++) {
          str += arr[i]+ ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
     if (str.length > 0) {
         str = str.substr(0, str.length - 1);
     }
     return str;
 }

  //时间戳转换成日期
function timeStampTurnTime(timeStamp){//时分秒
    if(timeStamp > 0){
        var date = new Date();  
        date.setTime(timeStamp);  
        var y = date.getFullYear();      
        var m = date.getMonth() + 1;      
        m = m < 10 ? ('0' + m) : m;      
        var d = date.getDate();      
        d = d < 10 ? ('0' + d) : d;      
        var h = date.getHours();    
        h = h < 10 ? ('0' + h) : h;    
        var minute = date.getMinutes();    
        var second = date.getSeconds();    
        minute = minute < 10 ? ('0' + minute) : minute;      
        second = second < 10 ? ('0' + second) : second;     
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;       
    }else{
        return "";
    }
}
function timeStampTurnDay(timeStamp){//日期
    if(timeStamp > 0){
        var date = new Date();  
        date.setTime(timeStamp);  
        var y = date.getFullYear();      
        var m = date.getMonth() + 1;      
        m = m < 10 ? ('0' + m) : m;      
        var d = date.getDate();      
        d = d < 10 ? ('0' + d) : d;      
        var h = date.getHours();    
        h = h < 10 ? ('0' + h) : h;    
        var minute = date.getMinutes();    
        var second = date.getSeconds();    
        minute = minute < 10 ? ('0' + minute) : minute;      
        second = second < 10 ? ('0' + second) : second;     
        return y + '-' + m + '-' + d;       
    }else{
        return "";
    }
}
//转换优先级
function priorityNum(num){
    var str = '';
    if(num === 0){
        str = '低';
    }else if(num === 1){
        str = '非常紧急';
    }else if(num === 2){
        str = '紧急';
    }else if(num === 3){
        str = '一般';
    }else if(num === 4){
        str = '低';
    }
    return str;
}
// 状态英文转换汉字
function statusType(status){
    var str = '';
    if(status == 'working'){
        str = '进行中';
    }else if(status == 'default'){
        str = '待审核';
    }else if(status == 'team'){
        str = '已派发';
    }else if(status == 'assign'){
        str = '已派发';
    }else if(status == 'worked-success'){
        str = '维修完成';
    }else if(status == 'worked-fail'){
        str = '未修好';
    }else if(status == 'done'){
        str = '已完成';
    }
    return str;
}
//循环日期数组提取日期修改月日显示公共方法
function dataMapArray(obj){
    var arrNew = [];
    console.log(obj)
    for (key in obj) {
        arrNew.push(key)
    }
    var arr = arrNew.sort();
    console.log(arr);
    var arrNew2 = [];
    
    for(var i = 0 ; i < arr.length ; i++){
        // arrNew.push(arr[i]);
        // console.log(arrNew);
        arrNew2.push(arr[i].split("-")[2]);
    }
    var arr2 = arrNew2.slice(1,arrNew2.length);
    return arr2;
}
////写cookies，一个小时过期 
    function setCookie(name, value) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + 60 * 60 * 1000); 
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"; 
    } 


    //读取cookies 
    function getCookie(name) { 
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); 
   
        if (arr = document.cookie.match(reg)) 
   
            return unescape(arr[2]); 
        else 
            return null; 
    } 

    //删除cookies 
    function delCookie(name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 60 * 60 * 1000); 
        var cval = getCookie(name); 
        if (cval != null) 
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"; 
    }

// 秒数转化为时分秒
function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if(minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if(hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}

//  //集团人员身份识别 如果是集团人员 表格里显示公司名称 搜索条件 公司名称显示出来 如果不是集团人员 表格里的公司名称字段隐藏 搜索条件公司名称隐藏起来
$(document).ready(function(){
    if(localStorage.getItem('roleId')!="0"){
        $('.searchcompanyName').css('display','none');
        $('#tbvd').bootstrapTable('hideColumn', 'companyName');
    }else{
        $('.searchcompanyName').css('display','inline-block');
    }; 
})

//日期转时间戳
//datestr 年月日 时分秒 2014-05-08 00:22:11
function  dateTurnTime(date){
			// var date="2014-05-08 00:22:11";
	date = new Date(Date.parse(date.replace(/-/g, "/")));
	date = date.getTime();
	return date;
}
//时间戳转日期
function getDateString(stamp) {
           let d=new Date(parseInt(stamp));
           let month=(d.getMonth()+1)<10?(0+""+(d.getMonth()+1)):(d.getMonth()+1);
           let day=d.getDate()<10?(0+""+d.getDate()):d.getDate();
           let hour=d.getHours()<10?(0+""+d.getHours()):d.getHours();
           let minute=d.getMinutes()<10?(0+""+d.getMinutes()):d.getMinutes();
           let second=d.getSeconds()<10?(0+""+d.getSeconds()):d.getSeconds();
           let dateString=d.getFullYear()+ "-" + month +"-"+day+" "+hour+":"+minute+":"+second
           return dateString;
}

//获取当前年月日
function getnowdate() {
		var mdate = new Date();
		var y = mdate.getFullYear();
		var m = mdate.getMonth() + 1;
		var d = mdate.getDate();
		if (m < 10) {
			m = "0" + m;
		}
		if (d < 10) {
			d = "0" + d;
		}
		var thisdate = y + '-' + m + '-' + d;
		return thisdate;
}