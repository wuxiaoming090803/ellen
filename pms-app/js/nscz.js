define(["jquery","mui","cache","template"], function($, mui,Cache, template){
	var user;
	var nscz={
		/*****初始化数据***/
		initData:function(){
			user = Cache.getJSON("pms-user")
			//nscz.onLogin();//获取用户信息
			//nscz.getOprateType();//操作类型
		    //nscz.getZzdaData();//种植档案数据
		},
		bindClick:function(){
			//操作地块和种植档案切换事件
			mui(".nscz_main_qhlx").on('tap','a',function(){
				$(this).addClass('cur').siblings().removeClass('cur');
				var type = $(this).attr("type");
				if("zzda"==type){
					$("#sml_zzda,#big_zzda").show();
					$("#sml_czdk,#big_czdk").hide();
				}else{
					$("#sml_zzda,#big_zzda").hide();
					$("#sml_czdk,#big_czdk").show();
				}
			});
			mui(".nscz_main_lt_ul").on('tap','li',function(){
				var id = $(this).attr("id").substr(4);
				var type = $(".nscz_main_qhlx a[class='cur']").attr("type");
				if($(this).hasClass("cur")){
					//移除
					$(this).removeClass('cur');
					$(".ns_ckul").find("li[id=sml_"+id+"]").remove();
				}else{
					//增加
					$(this).addClass('cur');
					var html = $(this).prop("outerHTML");
					html = html.replace("big_","sml_");
					//选中到小模块里面去
					$("#sml_"+type).append(html);
					
					//绑定反选点击事件
					$("#sml_"+id).click(function(){
						$(this).remove();//移除自己
						$("#big_"+id).removeClass("cur");//变换选中状态
					});
				}
			});
			//右侧选中类型切换
			mui(".nscz_main_rt").on('tap','li',function(){
				$(this).addClass("cur").siblings().removeClass("cur");
			});
			//按钮事件
			mui('.operation').on('tap','a', function() {
             	if($(this).hasClass("next")){
             		var checkobj = $(".nscz_bzlxul li[class='cur']");
             		var type = checkobj.attr("id");
             		var str="nsType_1,nsType_2,nsType_3";
             		if(str.indexOf(type)!=-1){
             			router.go("/nscz_xznz");//选择农资页面
             		}else{
             			console.log("需要独自跳转");
             			var url = checkobj.data("url");
             			router.go(url);//跳入模板页面
             		}
             	}else{
             		router.go("/index");//跳入首页
             	}
            });
		},
		/***获取操作类型***/
		getOprateType:function(){
			$.ajax({
				url:'/web/work_types',
				type:'get',
				data:{'authToken':user.token,loginUserId:user.id},//
				success:function(res){
					if(res.status==200){
						var ItemData = {list:res.data};
						template.render("oprateData", ItemData).appendTo("oprateDataUl");
					}
				},error:function(e){
					console.log(e);
				}
			});
		},
		getZzdaData:function(){
			$.ajax({
				url:'/farmingPlans',
				type:'get',
				data:{'authToken':user.token,loginUserId:user.id,'epId':user.epId},
				success:function(res){
					if(res.status==200){
						var ItemData = {list:res.data};
						console.log(res.data);
					}
				},error:function(e){
					console.log(e);
				}
			});
		},
		onLogin:function(){
			$.ajax({
				url:'/login',
				type:'post',
				data:{'rfidCode':'1'},
				success:function(res){
					if(res.status==200){
						var data =res.data;
						var user ={'id':data.id,'token':data.userToken,'epId':data.epId};
						Cache.set("pms-user",user);
					}
				},error:function(e){
					console.log(e);
				}
			});
		}
	}
	
	return {
		init:function(){
			nscz.bindClick();//绑定点击事件
			mui('.mui-scroll-wrapper').scroll({ 
                scrollX: true,
                scrollY: false,
                indicators: false
		   });
		   //nscz.initData();
		  var s1 = document.documentElement.clientHeight;
		  var s2 = document.documentElement.clientWidth;
		  console.log(s1+"---"+s2);
		}
	};
});