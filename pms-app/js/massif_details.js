define(["jquery","mui","template","loading"], function($, mui, template,loading){
	var _dataRecord = {};
	var currentId = "";
	var _plotDetailJson = "";
	var _MassifDetails = {
		init:function(){
			
			var module_jQ = $('.p-massif-details');
			var subTitleWrap_jQ = $('.selected-plots');
			subTitleWrap_jQ.find('#areaName').text(_plotDetailJson.areaName);
			subTitleWrap_jQ.find('#parentName').text(_plotDetailJson.parentName);
			subTitleWrap_jQ.find('#acreage').text(_plotDetailJson.areaSize);
			
			var detail_area_jQ = $('#detailArea',module_jQ);
			var records_wrap_jQ = $('#recordsWrap',module_jQ);
			var single_jQs = $('.e.single',records_wrap_jQ);
			if(single_jQs.length>0)
			{
				var zZSingle_jQs = single_jQs.filter(function(index){
					return $(single_jQs[index]).hasClass('zhongzhi');
				});
				/* 添加loading */
				detail_area_jQ.append(loading.getLoading());
				
				var first_single_jQ = single_jQs.eq(0);
				/* 宽度计算 */
				var initWidth = records_wrap_jQ.width();
				var actualWidth =  single_jQs.length*(single_jQs[0].clientWidth+4);
				if(actualWidth>initWidth){
					records_wrap_jQ.css('width',actualWidth);
				}
				/* 点击种植档案触发的事件 */
				zZSingle_jQs.click(function(){
					var zZSingle_jQ = $(this);
					zZSingle_jQs.removeClass('active');
					zZSingle_jQ.addClass('active');
					var id = zZSingle_jQ.data('id');
					
					if(!detail_area_jQ.is(":visited")){
						detail_area_jQ.show();
						_MassifDetails.initDetailHeight();
					}
					_MassifDetails.initClickSub(id);
				});
				
				/* 判定地块详情一开始是否要显示 */
				if(first_single_jQ.hasClass('zhongzhi')){
					first_single_jQ.click();
				}
			}
			/* back按钮 */
			var back_jQ = $('.e.back',module_jQ);
			back_jQ.click(function(){
				_dataRecord = {};
				currentId = "";
				sessionStorage.removeItem('plotDetail');
				window.location.hash = "#/plots-seek";
			});
		},
		initDetailHeight:function(){
			/* detail区域的高度 */
			var winHeight = $(window).height();
			var module_jQ = $('.p-massif-details'); // 该页面的作用域
			var list_jQs = $('.e.list',module_jQ);
			var wrapper_jQ = $('.e.wrapper',module_jQ);
			wrapper_jQ.css('max-height',winHeight-40.5*16);
		},
		initClickSub :function(id){
			if(id!=currentId){
				currentId = id;
				
				var module_jQ = $('.p-massif-details'); // 该页面的作用域
				var detailArea_jQ = $('#detailArea');
				var sub_jQs = $('.e.sub',module_jQ);
				var list_jQs = $('.e.list',module_jQ);
				/* 每个选项的点击事件 */
				sub_jQs.each(function(){
					var sub_this_jQ = $(this);
					var typeId = sub_this_jQ.data('type');
					
					sub_this_jQ.unbind("click");
					sub_this_jQ.click(function(){
						sub_jQs.removeClass('bg-green-common');
						sub_this_jQ.addClass('bg-green-common');
						list_jQs.addClass('p-hide-important');
						$('#'+typeId).removeClass('p-hide-important');
						if(typeId=="jbxx"){
							_MassifDetails.getJbxxData(id);
						}else if(typeId=="nscz"){
							_MassifDetails.getNsczData(id);
						}else if(typeId=="trpxx"){
							_MassifDetails.getTrpData(id);
						}else if(typeId=="csxx"){
							_MassifDetails.getCsData(id);
						}
					});
					if(typeId=="jbxx"){
						sub_this_jQ.click();
					}
				})
			}
		},
		
		getRecordsData:function(areaId,callback){
			
			$.getAjax("/farmingPlanHistory",{areaId:areaId},function(resp){

				if(resp.status==200){
					var data = {};
					data.list = resp.data;
					resp.data.forEach(function(item){
						_dataRecord[item.id] = {'jbxx':null,'nscz':null,'trp':null,'cs':null};
					});
					template.render("recordsInfo", data).fillTo("recordsWrap");
					if(callback) callback();
				}else{
					console.log(resp.msg);
				}
			});
		},
		getJbxxData:function(id){
			var jbxx_jQ = $('#jbxx','.p-massif-details');
			var jbxxData = _dataRecord[id].jbxx;
			
			if(jbxx_jQ.children().length>0){
				jbxx_jQ.empty();
			}
			if(jbxxData==null)
			{
				var loading_jQ = $('.e.loading-common','.p-massif-details');
				loading_jQ.show();
				$.getAjax("/farmingPlanHistory/"+id,null,function(resp){
				
					if(resp.status==200){
						loading_jQ.hide();
						_dataRecord[id].jbxx = resp;
						template.render("jbxxTemp",resp).fillTo("jbxx");
					}else{
						console.log(resp.msg);
					}
				});
			}else{
				template.render("jbxxTemp",jbxxData).fillTo("jbxx");
			}
		},
		getNsczData:function(id){//10.10.200.83
			var nscz_jQ = $('#nscz','.p-massif-details');
			var nsczData = _dataRecord[id].nscz;
			if(nscz_jQ.children().length>0){
				nscz_jQ.empty();
			}
			if(nsczData==null)
			{	
				var loading_jQ = $('.e.loading-common','.p-massif-details');
				loading_jQ.show();
				$.getAjax("/web/work_infos",{planId:id},function(resp){
				
					if(resp.status==200){
						loading_jQ.hide();
						resp.dataIsEmpty = Object.keys(resp.data).length>0?false:true;
						_dataRecord[id].nscz = resp;
						template.render("nsczTemp",resp).fillTo("nscz");
					}else{
						console.log(resp.msg);
					}
				});
			}else{
				template.render("nsczTemp",nsczData).fillTo("nscz");
			}
		},
		getTrpData:function(id){
			var trpxx_jQ = $('#trpxx','.p-massif-details');
			var trpData = _dataRecord[id].trp;
			if(trpxx_jQ.children().length>0){
				trpxx_jQ.empty();
			}
			if(trpData==null)
			{
				var loading_jQ = $('.e.loading-common','.p-massif-details');
				loading_jQ.show();
				$.getAjax("/web/input_use_logs",{planId:id},function(resp){
					
					if(resp.status==200){
						loading_jQ.hide();
						_dataRecord[id].trp = resp;
						template.render("trpTemp",resp).fillTo("trpxx");
					}else{
						console.log(resp.msg);
					}
				});
			}else{
				template.render("trpTemp",trpData).fillTo("trpxx");
			}
		},
		getCsData:function(id){
			var csxx_jQ = $('#csxx','.p-massif-details');
			var csData = _dataRecord[id].cs;
			if(csxx_jQ.children().length>0){
				csxx_jQ.empty();
			}
			if(csData==null)
			{
				var loading_jQ = $('.e.loading-common','.p-massif-details');
				loading_jQ.show();
				$.getAjax("/web/product_incomes",{planId:id},function(resp){
				
					if(resp.status==200){
						loading_jQ.hide();
						_dataRecord[id].cs = resp;
						template.render("csTemp",resp).fillTo("csxx");
					}else{
						console.log(resp.msg);
					}
				});
			}else{
				template.render("csTemp",csData).fillTo("csxx");
			}
		}
	}

	
	return {
		init:function(){
			_plotDetailJson = JSON.parse(sessionStorage.getItem('plotDetail'));
			_MassifDetails.getRecordsData(_plotDetailJson.areaId,function(){
				_MassifDetails.init();
			});
		}
	};
});