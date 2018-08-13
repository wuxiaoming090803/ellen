define(["jquery","arttemplate"], function($, arttemplate){
	
	//console.log("define template...", $, arttemplate);
	//跟页面无关的方法定义
	//逻辑处理
	var template = {
		html:"",
		render:function(templateId, data){
			this.html = arttemplate(templateId, data);
			return this;
		},
		compile:function(source, data){
			var renders = arttemplate.compile(source);
			this.html = renders(data);
			return this;
		},
		appendTo:function(e){
			e = e && typeof(e) == "string" ? "#"+e : e;
			$(e).append(this.html);
		},
		fillTo:function(e){
			e = e && typeof(e) == "string" ? "#"+e : e;
			$(e).html(this.html);
		}
	};
	
	
	return template;
});