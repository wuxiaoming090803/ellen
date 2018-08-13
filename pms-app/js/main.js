require.config({
	baseUrl: "js/",
	paths:{
		"jquery":"libs/jquery/jquery-1.11.1",
		"datebox":"libs/datebox/datebox",
		
		"router":"libs/router/router",
		"cache":"libs/cache/cache",
		"mui":"libs/mui/mui.min",
		"arttemplate":"libs/arttemplate/template-web",
		"flow":"libs/flow/flow",
		"loading":"libs/loading/loading",
		
		"zzda_step":"zzda/zzda_step",
		"zzda":"zzda/zzda"
	}
});


require(["login","common", "router",'index','plots_seek','massif_details','zzda','zzda_plot','zzda_archive',
'nscz','nscz_xznz','nscz_bzItem','nscz_gg','nscz_cs','by_Index','by_Item'],
		function(login, common, router,index,plots_seek,massif_details,zzda,zzda_plot,zzda_archive,
			nscz,nscz_xznz,nscz_bzItem,nscz_gg,nscz_cs,by_Index,by_Item){
	var router_mappings = [
		{
			path:"/login", resource:"views/login.html", componet:login
		},{
			path:"/index", resource:"views/task_status.html", componet:index
		},{
			path:"/plots-seek", resource:"views/plots_seek.html", componet:plots_seek
		},{
			path:"/massif-details", resource:"views/massif_details.html", componet:massif_details
		},{
			path:"/zzda", resource:"views/zzda.html", componet:zzda
		},{
			path:"/zzda-plot", resource:"views/zzda_plot.html", componet:zzda_plot
		},{
			path:"/zzda-archive", resource:"views/zzda_archive.html", componet:zzda_archive
		},{
			path:"/nscz", resource:"views/nscz.html", componet:nscz
		},{
			path:"/nscz_xznz", resource:"views/nscz_xznz.html",componet:nscz_xznz
		},{
			path:"/nscz_bzItem", resource:"views/nscz_Item.html",componet:nscz_bzItem
		},{
			path:"/nscz_gg", resource:"views/nscz_gg.html",componet:nscz_gg
		},{
			path:"/nscz_cs", resource:"views/nscz_cs.html",componet:nscz_cs
		},{
			path:"/by_Index", resource:"views/by_index.html",componet:by_Index
		},{
			path:"/by_Item", resource:"views/by_Item.html",componet:by_Item//_Item
		},
		{
			path:"/by", resource:"views/by_index_1.html",componet:by_Index
		}
	];
	router.render("workcontent");
	router.mapper(router_mappings);
	router.init();
});