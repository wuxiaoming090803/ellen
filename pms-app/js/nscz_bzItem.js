define(["jquery","mui","template","flow","keyboard"], function($, mui, template,flow,keyboard){
	//添加路径:选中农资>>操作工时>>人工数量>> 
	var czbz= ['nzcz_xznz','nzcz_czgs','nzcz_rgsl'];
	var curNum;//当前选项值
	var startNum=1;//开始编号
	var nscz_bzItem={
		farmFlow:null,
		createFlow:function(){
			this.farmFlow = flow.createFlow({
				elem:"subContainer",
				process:[
					{isTemplate:true, resource:"bz_sub1",init:nscz_bzItem.sub_init},
					{isTemplate:true, resource:"bz_sub2",init:nscz_bzItem.sub_init}
				]
			});
			return this.farmFlow;
		},
		//工时的绑定事件
		sub1:function(){
			nscz_bzItem.showInputData('nscz_gs');
			/*if($("#nscz_gs").html()!=1){
				mui(".mui-numbox").numbox().setValue($("#nscz_gs").html());//设置值
			}
			mui('body').on('change','#gs_number', function() {
				var val = mui(this)[0].value;
				$("#nscz_gs").html(val);//小时数量
            });*/
		},
		sub2:function(){
			nscz_bzItem.showInputData('nscz_rgsl');
			/*if($("#nscz_rgsl").html()!=1){
				mui(".mui-numbox").numbox().setValue($("#nscz_rgsl").html());//设置值
			}
			mui('body').on('change','#rgsl_number', function() {
				var val = mui(this)[0].value;
				$("#nscz_rgsl").html(val);//人工数量
            });*/
            //人数的点击事件
            mui('.xzgs_right .line').on('tap','button', function() {
            	var num = $(this).html().replace(/人/ig,'');
				$("#nscz_rgsl").html(num);
				mui(".mui-numbox").numbox().setValue(Number(num));//设置值
				$(this).addClass("cur").siblings().removeClass("cur");
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
             			router.go("/nscz_xznz");
             		}else{
             			$(".operation a:eq(1)").text("上一步");
             			that.farmFlow.pre();
             		}
             	}
            });
		},
		//子模块初始化
		sub_init:function(index){
			mui('.mui-numbox').numbox();//公用：初始化数字按钮
			curNum = index+1;
			var curObj = $(".progress-bar-common>span:eq("+curNum+")");
			curObj.addClass("now");
			$(".progress-bar-common>span:lt("+curNum+")").removeClass("now").addClass("pass");//小于
			$(".progress-bar-common>span:gt("+curNum+")").removeClass("now");//大于
			$(".title-common>span,#nscz_title").html(curObj.html());//变更操作名称
			var funcName = "nscz_bzItem.sub"+(index+1);
			eval(funcName+"();");//动态调用绑定方法
			nscz_bzItem.controlButton(index);
			
		},
		controlButton:function(index){
			/*if(index==this){
				
			}*/
			
		}


	}
	
	return {
		init:function(){
			console.log("初始化");
			//此处创建动态步骤条
			nscz_bzItem.createFlow().start();//创建子模板
			//全部绑定事件
			nscz_bzItem.blidStep();
		}
	};
});