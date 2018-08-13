define(["jquery","area_plots_template","loading"], function($, area_plots_template,loading){

	return {
		init:function(){
			var wrap = $('#ZZDAAreaPlotsWrapper');
			wrap.append(loading.getLoading());
			var loading_jQ = $('.e.loading-common',wrap);
			loading_jQ.show();
			
			area_plots_template.getAreaPlot(true,function(html){
				loading_jQ.hide();
				wrap.html(html);
			});
			
		}
	};
});