define(["jquery","mui","template","keyboard"], function($, mui, template,keyboard){
	var xznz_xznz={
		bindClick:function(){
			//加减操作
			mui(".right_t .nzinfo").on('tap','a',function(){
				var type = $(this).data("type");
				var id = $(this).parent().parent().attr("id");
				//点击之后设置不可点击
				$(this).addClass("disable").siblings().removeClass("disable");
				var  productName = $("#"+id).children("span:first-child").html();
				var nzcid = 'nzc_'+id;
				var sonl = $("#ck_nz").find("div[id="+nzcid+"]").length;
				if("add"==type){
					if(sonl==0){//判断左侧是否有改元素，没有则新增
						var item = $("#ck_nz").children().length;
						//按钮html
						var czbutton = '<div class="mui-numbox" data-numbox-min="1" id="ck_num">'
							  +'<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>'
							  +'<input class="mui-numbox-input" type="number"/>'
							  +'<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>'
							+'</div>';
						
						var html = '<div class="nzinfo" id='+nzcid+'>'
									+'<span>'+item+'</span>'
								+'<span>'+productName+'</span>'
								+'<span>'+czbutton+'</span>'
								+'</div>';
						$("#ck_nz").append(html);
						mui('.mui-numbox').numbox(); //动态绑定
						$("#cktotal").html(Number($("#cktotal").html())+1);
					}
				}else{
					if(sonl>0){//有子标签则删除
						$("#"+nzcid).remove();
						$("#cktotal").html(Number($("#cktotal").html())-1);
						xznz_xznz.numCheck();//重新排列序号
					}
				}
			});
			//数字事件
			mui('#ck_nz').on('change','.mui-numbox-input', function() {
				xznz_xznz.calCount();
            });
			//上一步，下一步方法
             mui('.operation').on('tap','a', function() {
             	if($(this).hasClass("next")){
					router.go("/nscz_bzItem");//跳入模板页面
             	}else{
             		router.go("/nscz");
             	}
            });
		},
		//替换序号方法
		numCheck:function (){
		    var num = $(".left_t div[class='nzinfo']").length;     //获取tr的长度
		    for (var i = 0; i < num; i++) {         //进行循环
		        $(".left_t div[class='nzinfo']").eq(i).children("span:first-child").html(i+1);          
		    };
		},
		//计算总和数量
		calCount:function(){
			var totalCount=0;
			$("#ck_nz>div[class='nzinfo']").each(function(index){
				var curCount = $(this).children(":last-child").children().find("input")[0].value;
				totalCount+=Number(curCount);
			});
			$("#cktotal").html(totalCount);
		}
	}
	
	return {
		init:function(){
			xznz_xznz.bindClick();//绑定点击事件
			mui('.mui-numbox').numbox()
		}
	};
});