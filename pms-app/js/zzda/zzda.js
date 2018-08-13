define(["jquery","zzda_step","loading","mui"], function($, zzda_step,loading,mui){

	var _ZZDA = {
		stepIndex: 2,
		executeOneStep:function(index){
			_this = this;
			var plantOperateWrapper = $('#plantOperate');
			plantOperateWrapper.empty();
			switch(index){
				case 2:plantOperateWrapper.append(zzda_step.getPlantingTime(2));break;
				case 3:plantOperateWrapper.append(zzda_step.getPlantingStandard(3));break;
				case 4:zzda_step.getCropName(4,function(html){
					plantOperateWrapper.append(html);
				});break;
				case 5:plantOperateWrapper.append(zzda_step.getPlantingArea(5));
				break;
			}
		},
		
		initButtonClick:function(){
			var _this = this;
			var backBtn = $('#back');
			var nextBtn = $('#next');
			var stepItems = $('.step');
			backBtn.click(function(){
				if(_this.stepIndex>2){
					_this.stepIndex--;
					_this.executeOneStep(_this.stepIndex);
					stepItems.removeClass('now');
					stepItems.eq(_this.stepIndex+1).removeClass('pass');
					stepItems.eq(_this.stepIndex).addClass('now');
					if(_this.stepIndex==4){
						nextBtn.text("下一步");
					}
				}else{
					window.location.hash = "/zzda-plot";
				}
			});
			var isAbledClickNext = true;
			nextBtn.click(function(){
				var ableNext = $('[data-index='+_this.stepIndex+']').text()!="";
				if(_this.stepIndex<5){
					if(ableNext){
						_this.stepIndex++;
						_this.executeOneStep(_this.stepIndex);
						stepItems.removeClass('now');
						stepItems.eq(_this.stepIndex-1).addClass('pass');
						stepItems.eq(_this.stepIndex).addClass('now');
						if(_this.stepIndex==5){
							nextBtn.text("完成");
						}
					}else{
						mui.alert($('#stepMainTitle').text()) ;
					}
				}else{
					if(ableNext){
						if(isAbledClickNext)
						{
							isAbledClickNext = false;
							zzda_step.updateData(function(){
								window.location.hash = "/zzda-archive";
								isAbledClickNext = true;
							});
						}
					}
				}
			});
			
		}
	}
	
	return {
		init:function(){
			_ZZDA.stepIndex = 2;
			zzda_step.bindJson();
			_ZZDA.executeOneStep(_ZZDA.stepIndex);
			_ZZDA.initButtonClick();
		}
	};
});