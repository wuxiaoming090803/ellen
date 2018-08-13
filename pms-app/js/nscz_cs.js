define(["jquery","mui","template","flow","keyboard"], function($, mui, template,flow,keyboard){
	//添加路径:选中农资>>操作工时>>人工数量>> 
	var curNum;//当前选项值
	var startNum=1;//开始编号
	var nscz_cs={
		farmFlow:null,
		createFlow:function(){
			this.farmFlow = flow.createFlow({
				elem:"subContainer",
				process:[
					{isTemplate:true, resource:"cs_sub1",init:nscz_cs.sub_init},
					{isTemplate:true, resource:"cs_sub2",init:nscz_cs.sub_init},
					{isTemplate:true, resource:"cs_sub3",init:nscz_cs.sub_init},
					{isTemplate:true, resource:"cs_sub4",init:nscz_cs.sub_init}
				]
			});
			return this.farmFlow;
		},
		//采收作物
		sub1:function(){
			var ckid = $("#nscz_cszw").attr("data-v");
			console.log(ckid);
			if(ckid){
				$(".nscs_ul li[id="+ckid+"]").addClass("cur").siblings().removeClass("cur");
			}else{
				var curObj = $(".nscz_main_lt_ul li[class='cur']");
				$("#nscz_cszw").html(curObj.find(".nscz_qymc2>span").html());
				$("#nscz_cszw").attr("data-v",curObj.attr("id"));
			}
			$("#big_zzda li").click(function(event){
				$(this).addClass("cur").siblings().removeClass("cur");
				var checkzw = $(this).find(".nscz_qymc2>span").html();
				$("#nscz_cszw").html(checkzw);
				$("#nscz_cszw").attr("data-v",$(this).attr("id"));
			});
		},
		//采收量
		sub2:function(){
			nscz_cs.showInputData('nscz_csl');
		},
		//操作工时
		sub3:function(){
			nscz_cs.showInputData('nscz_czgs');
		},
		//人工数量
		sub4:function(){
			nscz_cs.showInputData('nscz_rgsl');
			 //人数的点击事件
            mui('#subContainer .line').on('tap','button', function() {
            	$(this).addClass("cur").siblings().removeClass("cur");
            	var num = $(this).html().replace(/人/ig,'');
				$("#nscz_rgsl").html(num);
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
					$("#subContainer .line").children().removeClass("cur");
				}});
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
							router.go("/nscz");
						},3000);
             		}else{
             			that.farmFlow.next();
             		}
             	}else{
             		if(flowIndex==0){
             			console.log("返回到选中农资");
             			router.go("/nscz");
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
			curNum = index;//此处不需要加1 
			var curObj = $(".progress-bar-common>span:eq("+curNum+")");
			curObj.addClass("now");
			$(".progress-bar-common>span:lt("+curNum+")").removeClass("now").addClass("pass");//小于
			$(".progress-bar-common>span:gt("+curNum+")").removeClass("now").removeClass("pass");//大于
			$(".title-common>span,#nscz_title").html(curObj.html());//变更操作名称
			var funcName = "nscz_cs.sub"+(index+1);
			eval(funcName+"();");//动态调用绑定方法*/
		}


	}
	
	return {
		init:function(){
			console.log("采收初始化");
			//此处创建动态步骤条
			nscz_cs.createFlow().start();//创建子模板
			//全部绑定事件
			nscz_cs.blidStep();
		}
	};
});