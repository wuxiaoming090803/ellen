define(["jquery","mui","template","flow","keyboard"], function($, mui, template,flow,keyboard){
	//添加路径:选中农资>>操作工时>>人工数量>> 
	var curNum;//当前选项值
	var by_Index={
		bindClick:function(){
			//区域的点击事件
			$(".area-plots a").click(function(){
				$(this).addClass("bg-green-common").siblings().removeClass("bg-green-common");
				var plots = $(this).data("plots");
				$(".area-plots ul").addClass("p-hide-important");
				$(".area-plots ul[id="+plots+"]").removeClass("p-hide-important");
			});
			//空前地块的点击事件
			$(".area-plots li[class='item kongxian']").click(function(){
				$(this).find("div").toggleClass("active");//变换选中状态
				var id = $(this).attr("id").substr(4);
				console.log($(this).find("div").className);
				if($(this).find("div").hasClass("active")){
					var html = $(this).prop("outerHTML");
					html = html.replace("big_","sml_");
					$(".selected-plots ul").append(html);
					//绑定反选点击事件
					$("#sml_"+id).click(function(){
						$(this).remove();//移除自己
						$("#big_"+id).find("div").removeClass("active");//变换选中状态
					});
				}else{
					$(".selected-plots ul").find("li[id=sml_"+id+"]").remove();
					
				}
			});
			
			
			
		},
		blidStep:function(){
			var that = this;
			 $('a.mui-btn').on('click', function() {
             	if($(this).hasClass("next")){
             		router.go("/by_Item");
             	}else{
             		router.go("/index");//跳入首页
             	}
            });
		},
	}
	return {
		init:function(){
			by_Index.bindClick();
			//全部绑定事件
			by_Index.blidStep();
			var maxHeight  = 1080;
			
			
		}
	};
});