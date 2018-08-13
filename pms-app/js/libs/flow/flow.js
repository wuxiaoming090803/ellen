define(["jquery","mui","template"], function($,mui,template){
	
	console.log("define flow...", $, mui);
	//跟页面无关的方法定义
	//逻辑处理
	function Flow(option){
		this._option = $.extend({elem:null,process:[]}, option);
		this.elem = this._option.elem;
		this.processlist = this._option.process;
		this.flowIndex = 0;
	}
	
	Flow.prototype.setProcess = function(processlist){
		if(processlist){
			this.processlist = processlist;
		}
	};
	
	Flow.prototype.pre = function(){
		if(this.processlist == null){
			throw new Error("没有流程数据");
		}
		if(this.flowIndex > 0){
			this.flowIndex = this.flowIndex - 1;
			this.go(this.processlist[this.flowIndex]);
		}
	};
	
	Flow.prototype.next = function(){
		if(this.processlist == null){
			throw new Error("没有流程数据");
		}
		if(this.flowIndex < this.processlist.length - 1){
			this.flowIndex = this.flowIndex + 1;
			this.go(this.processlist[this.flowIndex]);
		}
	};
	
	Flow.prototype.go = function(process){
		var that = this;
		if(process.isTemplate){
			template.render(process.resource, process.data).fillTo(this.elem);
			this.bindEvent();
		}else{
			$.ajax({
				type:"get",
				url:process.resource,
				dataType:"html",
				success:function(res){
					template.compile(res, process.data).fillTo(that.elem);
					that.bindEvent();
				}
			});
		}
	};
	
	Flow.prototype.bindEvent = function(){
		var that = this;
		$("a[f-rel=subprocess]").on("click", function(){
			var event = $(this).data("event");
			if(event == "next"){
				that.next();
			}else if(event == "pre"){
				that.pre();
			}
			if(that.processlist[that.flowIndex] && that.processlist[that.flowIndex].action){
				that.processlist[that.flowIndex].action(that.flowIndex);
			}
		});
		
		if(that.processlist[that.flowIndex] && that.processlist[that.flowIndex].init){
			that.processlist[that.flowIndex].init(that.flowIndex);
		}
	};
	
	Flow.prototype.start = function(){
		if(this.processlist == null){
			throw new Error("没有流程数据");
		}
		this.go(this.processlist[0]);
	};
	
	return {
		createFlow:function(options){
			return new Flow(options);
		}
	};
});