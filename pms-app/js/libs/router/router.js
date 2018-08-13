define(['jquery'], function($){
	
	function Rounter(){
		this.container = null;
		this.cache = [];
		this.pathIndex = [];
	    //将url/callback 以key/value形式储存在cache内
	    this.addRouter = function (path, resource, componet) {
	    	console.info(typeof(func));
	    	if(typeof(componet) != "object"){
	    		console.log("componet必需是对象.");
	    		return false;
	    	}
	    	if(this.pathIndex.indexOf(path) != -1){
	    		throw new Error("Path have been exists!");
	    	}
	        var _router = {"path":path, "resource":resource, "componet":componet};
	        this.cache.push(_router);
	        this.pathIndex.push(path);
	    };
	}

	//匹配hash对应的回调函数,并触发
    Rounter.prototype.trigger = function (hash) {
        var cache = this.cache;
        var container = this.container;
        //判断是否是检查项
        var lhash = hash;
	    if(hash.indexOf("Item/")!=-1){//动态编号一定要以 Item/数字
	    	lhash = lhash.substring(0,lhash.lastIndexOf("/")+1);//截取斜杠中间部分
	    }
        var index = this.pathIndex.indexOf(lhash);
        //console.info("trigger:"+cache[index]);
        if(index != -1){
        	if(cache[index].resource && cache[index].resource != ""){
        		$.ajax({
	        		url: cache[index].resource,
	        		type:'get',
	        		dataType:'html',
	        		success:function(response){
	        			container.html(response);
						try{
							if(cache[index].componet)
	        					cache[index].componet.init();
						}catch(e){
							throw new Error("加载模块时发生错误", e);
						}
	        		},
	        		error:function(){
	        			console.log("加载失败！请检查网络或地址是否有误.");
	        		}
	        	});
        	}else{
        		if(cache[index].componet)
	        		cache[index].componet.init();
        	}
        }
    };

    //初始化 添加监听浏览器hashchange 以及dom loaded函数
    Rounter.prototype.init = function () {
    	var cache = this.cache;
    	var pathIndex = this.pathIndex;
    	if(cache.length > 0){
    		for(var i=0; i<cache.length; i++){
    			var _router = cache[i];
    			var lspash = _router.path;
				if(lspash.indexOf("{num}")!=-1){
					//路径前缀
					var prev = lspash.substring(0,lspash.lastIndexOf("/")+1);
					lspash = prev;
				}
				pathIndex.push(lspash);
    			//pathIndex.push(_router.path);
    		}
    	}
    	var _this = this,hash='';
		if(window.location.hash !== ''){
			hash= location.hash.slice(1);
		    _this.trigger(hash);
		}
		window.addEventListener('hashchange', function () {
	        hash = location.hash.slice(1);
	        _this.trigger(hash);
	    });
    };

    var rounter = new Rounter();
    
    window.router = {
		render:function(e){
			rounter.container = (typeof(e) == "string" ? $("#"+e) : $(e));
		},
		addRouter:function(path, resource, componet){
			rounter.addRouter(path, resource, componet);
		},
		mapper:function(mappings){
			rounter.cache = mappings;
		},
		go:function(path){
			window.location.hash=path;
		},
		init:function(){
			rounter.init();
		}
	};
	return window.router;
});