define(["jquery","mui","template","common","router"], function($, mui, template,common,router){
	var task={
		bindClick:function(){
			$(".right .item").click(function(){
				var url = $(this).data("url");
				if(url){
					router.go(url);
				}
			});
		},
		bindUserInfo:function(){
			var userInfo = common.loginInUser.getUserInfo();
			var module_jQ = $('.p-task-status');
			var rfidCode_jQ = $('#rfidCode',module_jQ);
			var userName_jQ = $('#userName',module_jQ);
			var effectiveDate_jQ = $('#effectiveDate',module_jQ);
			rfidCode_jQ.text(userInfo.rfidCode);
			userName_jQ.text(userInfo.userName);
			effectiveDate_jQ.text(userInfo.effectiveDate.split(' ')[0]);
		},
		bindExitClick:function(){
			$('.exit','.p-task-status').click(function(){
				$('#logout','header').trigger("click");
			});
		}
	}
	
	
	return {
		init:function(){
			//是否登录？
			if(!common.isLogin()){
				router.go("/login");
				return false;
			}
			task.bindClick();
			task.bindUserInfo();
			task.bindExitClick()
		}
	};
});