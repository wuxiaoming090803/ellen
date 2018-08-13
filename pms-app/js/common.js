define(['jquery', 'cache'], function($, cache){
	
	var loginInUser = {
		getUserInfo:function(){
			var userInfo = cache.get("userInfo");
			if(userInfo!="undefined")
			{
				return JSON.parse(userInfo);
			}else{
				return {};
			}
		},
		getValidParam:function(){
			var validParam = cache.get("validParam");
			if(validParam!="undefined")
			{
				return JSON.parse(validParam);
			}else{
				return {};
			}
		}
	}
	var	_requestUri = "http://pmsapp.agrisaas.com.cn/pmsapp/v1.0.0";//http://10.10.200.69:3000
	
	$.ajaxSetup({
		global: true,
		timeout:10000,
		complete:function(xhr,status){
			//console.log(xhr.responseText);
		    if(xhr.responseText=="401"){
		        $("#logout",'header').trigger("click");
		    }
		}
	});
	
	$(document).ajaxSend(function(evt, request, settings){
		if(!settings.url.startsWith("views/") && !settings.url.startsWith("http:")){
			var validParam =loginInUser.getValidParam();
			if(settings.header){
                settings.header = $.extend(settings.header, validParam);
                settings.url = _requestUri + settings.url;
           }else{
            	settings.url = _requestUri + settings.url;
            	for(var key in validParam)
				{
					settings.url += (settings.url.indexOf("?")>-1?"&":"?")+key+"="+validParam[key];
				}
            }
		}
	});
	
	jQuery.extend({
		easyAjax: function (_url,_type, _data, _success, _error, _complete) {
	        $.ajax({
	            type: _type,
	            contentType: "application/json",
	            url: _url,
	            data: _data == null ? null : JSON.stringify(_data),
	            success: _success,
	            complete: _complete,
	            error: _error
	        });
	   },
	   getAjax:function(_url,_data,_success){
	   		var epId = loginInUser.getValidParam().epId;
	   		_data = $.extend({},{"epId":epId},_data);
	   		$.getJSON(_url,_data,_success);
	   }
	});
	
	Date.prototype.Format = function (fmt) {
	    var o = {  
	        "M+": this.getMonth() + 1, //月份   
	        "d+": this.getDate(), //日   
	        "H+": this.getHours(), //小时   
	        "m+": this.getMinutes(), //分   
	        "s+": this.getSeconds(), //秒   
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
	        "S": this.getMilliseconds() //毫秒   
	    };  
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
	    for (var k in o)  
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
	    return fmt;  
	};

	var byteToString = function (arr) {  
        if(typeof arr === 'string') {  
            return arr;  
        }
        var str = '', _arr = arr; 
        for(var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(16);
            if(_arr[i] <= 15){
            	one = "0"+one;
            }
            str = str + one;
        }  
        return str;  
    };

	document.oncontextmenu = function(){
        event.returnValue = false;
    };

	return {
		loginInUser:loginInUser,
		isLogin:function(){
			if(loginInUser.getUserInfo()){
				return true;
			}
			return false;
		},
		byteToString:function(arr){
			return byteToString(arr);
		}
  	};
});