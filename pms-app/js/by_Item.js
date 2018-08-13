define(["jquery","mui","template","flow","keyboard"], function($, mui, template,flow,keyboard){
	//添加路径:选中农资>>操作工时>>人工数量>> 
	var curNum;//当前选项值
	var byItem={
		farmFlow:null,
		createFlow:function(){
			this.farmFlow = flow.createFlow({
				elem:"subContainer",
				process:[
					{isTemplate:true, resource:"by_sub1",init:byItem.sub_init},
					{isTemplate:true, resource:"by_sub2",init:byItem.sub_init},
					{isTemplate:true, resource:"by_sub3",init:byItem.sub_init}
				]
			});
			return this.farmFlow;
		},
		//保育类型
		sub1:function(){
			byItem.showChoiceData($("#by_lx"));
		},
		//操作工时
		sub2:function(){
			byItem.showInputData('by_gs');
		},
		//人工数量
		sub3:function(){
			byItem.showInputData('by_rgsl');
			 //人数的点击事件
            mui('#subContainer .line').on('tap','button', function() {
            	$(this).addClass("cur").siblings().removeClass("cur");
            	var num = $(this).html().replace(/人/ig,'');
				$("#by_rgsl").html(num);
				mui(".mui-numbox").numbox().setValue(Number(num));//设置值
            });
            $(".operation a:eq(1)").text("提交");
		},
		showInputData:function(objId){
			var curObj = $("#"+objId);
			if(curObj.html()){
				mui(".mui-numbox").numbox().setValue(curObj.html());//设置值
			}else{
				curObj.html(mui(".mui-numbox").numbox().getValue());
			}
			$("#subContainer .mui-numbox-input").change(function(){
				curObj.html($(this)[0].value);
				if("nscz_rgsl"==objId){
					$("#subContainer .line").children().removeClass("cur");
				}
			});
			$(".mui-numbox-input").on("focus", function(e){
				keyboard.renderTo({eId:".mui-numbox",height:50,okAction:function(){
					var mum = mui(".mui-numbox").numbox().getValue();
					curObj.html(mum);
				}});
			});
		},
		showChoiceData:function(objId){
			var type = objId.attr("data-v");
			if(type){
				$("#subContainer .ggfs_ul li[data-type="+type+"]").addClass("cur");
			}else{
				$("#subContainer .ggfs_ul li:eq(0)").addClass("cur");
			}
			var curObj=$("#subContainer .ggfs_ul li[class='item cur']");
			//获取选中的
			var curType =curObj.find("span").html();
			objId.html(curType);
			objId.attr("data-v",curObj.data("type"));
			$(".ggfs_ul li").click(function(event){
				$(this).addClass("cur").siblings().removeClass("cur");
				var czmc = $(this).find("span").html();
				objId.html(czmc);
				objId.attr("data-v",$(this).data("type"));
			});
		},
		blidStep:function(){
			var that = this;
			 $('a.mui-btn').on('click', function() {
			 	var flowIndex = that.farmFlow.flowIndex;
             	if($(this).hasClass("next")){
             		var maxlen = that.farmFlow.processlist.length;
             		if(flowIndex==maxlen-1){
             			mui.toast("提交成功，跳转首页");
             			setTimeout(function(){
							router.go("/index");
						},3000);
             		}else{
             			that.farmFlow.next();
             		}
             	}else{
             		if(flowIndex==0){
             			console.log("返回到选中农资");
             			router.go("/by_Index");
             		}else{
             			that.farmFlow.pre();
             			$(".operation a:eq(1)").text("上一步");
             		}
             	}
            });
		},
		//子模块初始化
		sub_init:function(index){
			mui('.mui-numbox').numbox();//公用：初始化数字按钮
			curNum = index+1;//此处不需要加1 
			var curObj = $(".progress-bar-common>span:eq("+curNum+")");
			curObj.addClass("now");
			$(".progress-bar-common>span:lt("+curNum+")").removeClass("now").addClass("pass");//小于
			$(".progress-bar-common>span:gt("+curNum+")").removeClass("now").removeClass("pass");//大于
			$(".title-common>span,#nscz_title").html(curObj.html());//变更操作名称
			var funcName = "byItem.sub"+(index+1);
			eval(funcName+"();");//动态调用绑定方法*/
		}
	}
	return {
		init:function(){
			console.log("采收初始化");
			//此处创建动态步骤条
			byItem.createFlow().start();//创建子模板
			//全部绑定事件
			byItem.blidStep();
		}
	};
});