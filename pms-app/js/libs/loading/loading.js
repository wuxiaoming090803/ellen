//<div class="loading-common">
//	<div class="spinner-container container1">
//	    <div class="circle1"></div>
//	    <div class="circle2"></div>
//	    <div class="circle3"></div>
//	    <div class="circle4"></div>
//	</div>
//	<div class="spinner-container container2">
//	    <div class="circle1"></div>
//	    <div class="circle2"></div>
//	    <div class="circle3"></div>
//	    <div class="circle4"></div>
//	</div>
//	<div class="spinner-container container3">
//	    <div class="circle1"></div>
//	    <div class="circle2"></div>
//	    <div class="circle3"></div>
//	    <div class="circle4"></div>
//	</div>
//</div>
define(["jquery"], function($){
	var _Loading= {
		getLoading:function(){
			var loading_jQ = $('<div/>').addClass('e loading-common');
			for(var i=1; i<=3 ; i++)
			{
				var container_jQ = $('<div/>').addClass('spinner-container container'+i);
				for(var j=1; j<=4; j++)
				{
					var circle_jQ = $('<div/>').addClass('circle'+j);
					container_jQ.append(circle_jQ);
				}
				loading_jQ.append(container_jQ);
			}
			return loading_jQ;
		}
	}
	return{
		getLoading:_Loading.getLoading
	}
});