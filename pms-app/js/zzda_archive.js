define(["jquery","template","loading","mui"], function($,template,loading,mui){
	var _data={};
	var _ZzdaArchive = {
		intHei:function(){
			var wrap = $('#daListWrapper');
			var module_jQ = $('.p-zzda-archive');
			var winHeight = $(window).height();
			var headerHei = $('header').outerHeight();
			var titleCommonHei = $('.title-common',module_jQ).outerHeight();
			var progressHei = $('.progress-bar-common',module_jQ).outerHeight();
			var subCommonHei = $('.sub-title-common',module_jQ).outerHeight()
			var btnHei = $('.btn-operate',module_jQ).outerHeight()
			var maxHei = winHeight-headerHei-titleCommonHei-progressHei-subCommonHei-btnHei;
			wrap.css("max-height",maxHei);
		},
		initDaClick:function(){
			var module_jQ = $('.p-zzda-archive'); 
			var inner_jQs = $('.e.inner',module_jQ);
			var img_bg_jQs = $('.e.img',module_jQ);
			
			inner_jQs.each(function(index){
				var inner_jQ = $(inner_jQs[index]);
				inner_jQ.click(function(){
					var this_inner_jQ = $(this);
					var isUpdate = this_inner_jQ.data('isupdate');
					if(isUpdate==0){
						mui.alert('该种植档案已农事操作，不可进行编辑');
					}else{
						/* 存储当前档案信息 */
						var index = this_inner_jQ.data('index');
						sessionStorage.setItem('editDaJson',JSON.stringify(_data.list[index]));
						/* 图片背景的修改 */
						var this_img_jQ = $('.e.img',this_inner_jQ);
						
						var thisImgNewSrc = "";
						inner_jQs.each(function(index){
							var inner_item_jQ = $(inner_jQs[index]);
							inner_item_jQ.removeClass('active');	
							
							var img_item_jQ = $('.e.img',inner_item_jQ);
							var imgItemSrc = img_item_jQ.attr('src');
							if(imgItemSrc.indexOf('selected')>0){
								img_item_jQ.attr('src',imgItemSrc.replace('-selected.png','.png'));
							}
						});
						
	//					if(this_inner_jQ.hasClass('active')){
	//						this_inner_jQ.removeClass('active');
	//						thisImgNewSrc = this_img_jQ.attr('src').replace('-selected.png','.png');
	//					}else{
							this_inner_jQ.addClass('active');
							thisImgNewSrc = this_img_jQ.attr('src').replace('.png','-selected.png');
						//}
					
						this_img_jQ.attr('src',thisImgNewSrc);
						
					}
					
				});
			});
		},
		
		initBtnClick:function(){
			var module_jQ = $('.p-zzda-archive');
			var inner_jQs = $('.e.inner',module_jQ);
			var edit_jQ = $('.e.edit',module_jQ);
			var new_jQ = $('.e.new',module_jQ);
			var back_jQ = $('.e.back',module_jQ);
			edit_jQ.click(function(){
				if(sessionStorage.getItem('editDaJson')!=null&&sessionStorage.getItem('editDaJson')!="")
				{
					window.location.hash="#/zzda-plot"
				}else{
					mui.alert('您还未选择一个种植档案');
				}
				sessionStorage.setItem('isEdit','true')
			});
			back_jQ.click(function(){
				sessionStorage.removeItem('editDaJson');
				//sessionStorage.setItem('isEdit','false')
				window.location.hash="#/index"
			});
			new_jQ.click(function(){
				sessionStorage.removeItem('editDaJson');
				sessionStorage.setItem('isEdit','false')
				window.location.hash="#/zzda-plot"
			});
		},
		
		createDaList:function(){		
			
			sessionStorage.removeItem('editDaJson');
			
			var wrap = $('#daListWrapper');
			wrap.append(loading.getLoading());
			var loading_jQ = $('.e.loading-common',wrap);
			loading_jQ.show();
			
			$.getAjax("/farmingPlans",null,function(resp){
				if(resp.status==200){
					loading_jQ.hide();
					var result = resp.data;
					_data.list = result;
					template.render("daItemTemplate", _data).fillTo("daListWrapper");
					$('#num','.p-zzda-archive').text(result.length);
					_ZzdaArchive.initDaClick();
					_ZzdaArchive.initBtnClick();
					_ZzdaArchive.intHei();
				
				}else{
					console.log(resp.msg);
				}
			});
		}
	}
	
	return {
		init:function(){
			_ZzdaArchive.createDaList();
		}
	};
});