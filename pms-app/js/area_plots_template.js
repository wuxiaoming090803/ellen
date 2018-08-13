define(["jquery","mui"], function($,mui){
	var _idArray=[];
	var _currentPlotId = '';
	var _json=null;
	var _parentData=[];
	var _updateJson=function(plot){
		var list=_json.farmingPlanAreas;
		var res = list.filter(function(item){
			return plot.areaId===item.areaId;
		});
		if(res.length===0){
			var _res=_parentData.filter(function(item){
				return plot.parentId===item.id;
			});
			if(_res.length>0){
				plot.areaName=(_res[0].areaName+'_'+plot.areaName);
			}
//			else{
//				plot.areaName='';
//			}
			list.push(plot);
		}else{
			list.splice(list.indexOf(res[0]),1);
		}
	}
	
	var _createDivInner=function(isKongXianZZDA,isZZDA,stateText,item){
		var divInner =  document.createElement('div');
		divInner.className=("e inner "+((!isZZDA ||isKongXianZZDA)? 'pointer':""));
		var label =  null;
		if(isKongXianZZDA){
			var checkout =  document.createElement('input');
			checkout.className="e box";
			checkout.setAttribute('type',"checkbox");
			checkout.setAttribute('checked',"true");
			label =  document.createElement('label');
			label.className="replace-box";
			divInner.appendChild(checkout);
			divInner.appendChild(label);
		}
		var spanState =  document.createElement('span');
		spanState.className="state";
		spanState.innerText = stateText;
		var infoP =  document.createElement('p');
		infoP.className = "info";
			var spanName =  document.createElement('span');
			spanName.className = "name";
			spanName.innerText =item.areaName.indexOf('_')>0?item.areaName.split('_')[1]:item.areaName;
			var spanSize =  document.createElement('span');
			spanSize.className = "size";
			spanSize.innerText = item.areaSize +"亩";
		infoP.appendChild(spanName);
		infoP.appendChild(spanSize);
		
		divInner.appendChild(spanState);
		divInner.appendChild(infoP);
		//divInner.appendChild(checkout).appendChild(label).appendChild(spanState).appendChild(infoP);
		return divInner;		
	}
	
	var initAreaPlotHeight = function(isZZDA,module){
		//var plotWrap = $('.e.plot-wrap-common');
		var winHeight = $(window).outerHeight();
		var headerHeight = $('header').outerHeight();
		var titleHeight = $('.title-common').outerHeight();
		var btnHeight = $('.btn-operate-common').outerHeight();
		var maxHeight = winHeight-headerHeight-titleHeight-btnHeight;
		if(isZZDA)
		{
			maxHeight -= ($('.progress-bar-common').outerHeight()+$('.selected-plots').outerHeight());
		}
		$(module).css("max-height",maxHeight);
//		plotWrap.css("max-height",maxHeight);
	}
	
	var _AreaPlotsTemplate = {
		getAreaData:function(callback){
			$.getAjax("/areas",{areaType:0},function(resp){
				if(resp.status==200){
					if(callback){
						callback(resp.data);
						_parentData=resp.data;
					}
				}else{
					console.log(resp.msg);
				}
			});
//			var data = [{
//				'id':"q11",
//				'areaName':"区域11"
//			},{
//				'id':"q9",
//				'areaName':"区域9"
//			},{
//				'id':"q8",
//				'areaName':"区域8"
//			},{
//				'id':"q7",
//				'areaName':"区域7"
//			},{
//				'id':"q6",
//				'areaName':"区域6"
//			}];
//			callback(data);
		},
		getPlotsData:function(areaId,callback){//10.10.200.69:3000
			$.getAjax("/soil",{id:areaId},function(resp){

				if(resp.status==200){
					if(callback){
						callback(resp.data);
					}
				}else{
					console.log(resp.msg);
				}
			});
//			var data = [
//				{'area_name': "地块5",'is_usable': 1, 'is_care': 0, 'area_size': 100, 'id': areaId+"d1", 'residue_size': 100},
//				
//				{'area_name': "地块6",'is_usable': 1, 'is_care': 0, 'area_size': 100, 'id': areaId+"d2", 'residue_size': 100},
//				
//				{'area_name': "地块7",'is_usable': 0, 'is_care': 1, 'area_size': 100, 'id': areaId+"d3", 'residue_size': 100},
//				
//				{'area_name': "地块11",'is_usable': 0, 'is_care': 1, 'area_size': 100, 'id': areaId+"d4", 'residue_size': 100},
//				
//				{'area_name': "地块2",'is_usable': 0, 'is_care': 0, 'area_size': 100, 'id': areaId+"d5", 'residue_size': 0},
//				
//				{'area_name': "地块1",'is_usable': 1, 'is_care': 1, 'area_size': 100, 'id': areaId+"d5", 'residue_size': 100}
//				
//				]
//			callback(data);
		},
		
		getPlots:function(areaId,isZZDA,callback){
			var plot_wrapper = document.createElement('div');
			plot_wrapper.className = "e plot-wrapper" ;
			var plotsUlContainer = document.createElement('ul');
			var plotClass = document.createAttribute('class');
			plotClass.value = "e plots p-clear";
			plotsUlContainer.setAttributeNode(plotClass);
			var plotId = document.createAttribute('id');
			plotId.value = areaId;
			plotsUlContainer.setAttributeNode(plotId);
			initAreaPlotHeight(isZZDA,plotsUlContainer);
			
			_AreaPlotsTemplate.getPlotsData(areaId,function(plotsData){
				
				var list=_json.farmingPlanAreas;
				plotsData.forEach(function(item){
					var res=list.filter(function(each){
						return each.areaId===item.areaId;
					})
					if(item.farmingArea===undefined){
						if(res.length>0){
							item.farmingArea=res[0].farmingArea
						}else{
							item.farmingArea=0;
						}
					}
					var stateClass = "";
					var stateText = "";
					if(item.isUsable==1){
						stateClass = "kongxian";
						stateText = "空闲";
					}else if(item.isCare==1){
						stateClass = "baoyu";
						stateText = "保育";
					}else{
						stateClass = "zhongzhi";
						stateText = "种植";
					}
					
					var isKongXianZZDA = isZZDA && item.isUsable==1;
					
					var li =  document.createElement('li');
					li.className="item "+stateClass;
					li.setAttribute('id',item.areaId);
					
					var divInner=_createDivInner(isKongXianZZDA,isZZDA,stateText,item);
					if(_idArray.indexOf(item.areaId)!==-1){
						divInner.className+=' active';
					}else{
						divInner.className=(divInner.className.replace('active',''));
					}
					//console.log(item)
					var _itemToArea=function(d,aid){
						var plot={};
						plot.areaId=d.areaId;
						plot.areaName=d.areaName;
						plot.areaSize=d.areaSize;
						plot.farmingArea=d.farmingArea;//d.areaSize-d.residueSize;
						plot.residueSize=d.residueSize;
						plot.id='';
						plot.parentId=aid;
						return plot;
					}
					divInner.onclick=function(){//点击大的
						if(isKongXianZZDA){
							_updateJson(_itemToArea(item,areaId));
							var selectedPlotWrapper_jQ = $('#selectedPlotWrapper');
							var ZZDAAreaPlotsWrapper_jQ = $('#ZZDAAreaPlotsWrapper');
							
							var divInner_jQ = $(divInner);
							var divInnerItem_jQ = divInner_jQ.parents('.item');
							var divInnerId =divInnerItem_jQ.attr('id');
							
							if(divInner_jQ.hasClass('active')){
								divInner_jQ.removeClass('active');
								var bigPlotInner_jQ = $('#'+divInnerId,selectedPlotWrapper_jQ);
								bigPlotInner_jQ.remove();
								
							}else{
								var item_clone_jQ = divInnerItem_jQ.clone();
								
								item_clone_jQ.click(function(){//点击小的
									//_updateJson(_itemToArea(item,areaId));
									var bigPlotInner_jQ = $('#'+divInnerId,ZZDAAreaPlotsWrapper_jQ).find('.e.inner');
									item_clone_jQ.remove();
									bigPlotInner_jQ.click();
								});
								selectedPlotWrapper_jQ.append(item_clone_jQ);
								divInner_jQ.addClass('active');
							}
						}else if(!isZZDA){
							var single_jQs = $('.e.single','#areaPlotsWrapper');
							var parent =  single_jQs.filter(function(index){
								return $(single_jQs[index]).data('plots')==areaId;
							});
							var plotData = $.extend({},{'parentName':parent.text()},item);
							sessionStorage.setItem("plotDetail",JSON.stringify(plotData));
							window.location.hash = '/massif-details';
						}
					};
					
					li.appendChild(divInner);
					
					plotsUlContainer.appendChild(li);
					
				});
				//return plotsUlContainer;
				plot_wrapper.appendChild(plotsUlContainer);
				if(callback){callback(plot_wrapper)}
			});
			
		},
		initSelectedPlotWrapper:function(){
			var str=sessionStorage.getItem('editDaJson'); 
			if(str!==null){
				_json=JSON.parse(str);
				//debugger
				var list=_json.farmingPlanAreas;
				var selectedPlotWrapper = document.getElementById('selectedPlotWrapper');
				list.forEach(function(item){
					//删除item.parentId
					var id=item.areaId;
					if(item.residueSize===undefined){
						item.residueSize=item.areaSize-item.farmingArea;
					}
					//debugger
					_idArray.push(id);
					var li=document.createElement('li');
					li.className='item kongxian';
					li.setAttribute('id',id);
					//item.areaSize=item.farmingArea;
					//item.areaName=item.areaName.split('_')[1];
					var divInner=_createDivInner(true,true,'空闲',item);
					divInner.onclick=function(){//点击小的
						item.areaId=id;
						//debugger
						//_updateJson(item); ///////////   数据对不上待删除
						var bigPlotInner_jQ = $('#'+id,$('#ZZDAAreaPlotsWrapper')).find('.e.inner');
						if(bigPlotInner_jQ.length>0)
						{
							bigPlotInner_jQ.click();
						}else{
							_updateJson(item);
						}
						$(li).remove();
						var index=_idArray.indexOf(id);
						_idArray.splice(index,1);
					};
					
					
					li.appendChild(divInner)
					selectedPlotWrapper.appendChild(li);
				})
			}else{
				_json={
					farmingPlanAreas:[],
					farmingStatus:'',
					id:'',
					isUpdate:'',
					productId:'',
					farmingPlanAt:'',
					productName:'',
					residueSize:0
				}
			}
		},
		initAreaPlots:function(isZZDA,callback){
			
			_AreaPlotsTemplate.initSelectedPlotWrapper();
			
			//initPlotHeight(isZZDA);
			
			var container = document.createElement("div");
			container.className = "area-plots";
			
			/* area 区域 */
			var area = document.createElement("div");
			area.className ="area";
			
			var area_inner = document.createElement("div");
			area_inner.className = "area-inner";
//			var areaAttr = document.createAttribute("class");
//			areaAttr.value = "area";
//			area.setAttributeNode(areaAttr);
			
			_AreaPlotsTemplate.getAreaData(function(areaData){
				
				areaData.forEach(function(_d,index){
					var areaItem = document.createElement("a");
					var areaItemClass = document.createAttribute("class");
				    areaItemClass.value = index==0?"e single bg-green-common":"e single";
				    areaItem.setAttributeNode(areaItemClass);
				    
				    var areaItemHref = document.createAttribute('href');
				    areaItemHref.value = "javascript:void(0);";
				    areaItem.setAttributeNode(areaItemHref);
				     
				    var dataPlotId = document.createAttribute('data-plots');
				    dataPlotId.value = _d.id;
				    areaItem.setAttributeNode(dataPlotId);
					areaItem.innerText = _d.areaName;
					
					areaItem.onclick = function(){
						var this_area = $(this);
						$('.e.single').removeClass('bg-green-common');
						this_area.addClass('bg-green-common');
						
						var areaId = this_area.data('plots');
						_currentPlotId = areaId;
						$('.e.plots').parents('.e.plot-wrapper').hide();
						
						if($('#'+areaId).length>0){
							var area_jQ = $('#'+areaId);
							area_jQ.parents('.e.plot-wrapper').show();
							area_jQ.scrollTop(0);
						}else{
							_AreaPlotsTemplate.getPlots(areaId,isZZDA,function(resultHtml){
								container.appendChild(resultHtml);
								$(resultHtml).show();
								//var area_jQ = $('#'+areaId);
//								area_jQ.scrollTop(0);
//								if(callback) callback(container);
							});
						}
						
						
					}
					
				 	area_inner.appendChild(areaItem);
				});
				
				initAreaPlotHeight(isZZDA,area_inner);
				area.appendChild(area_inner);
				container.appendChild(area);
				_AreaPlotsTemplate.getPlots(areaData[0].id,isZZDA,function(resultHtml){
					container.appendChild(resultHtml);
					if(callback) callback(container);
				});
				$('.e.next').click(function(){
					if(_json.farmingPlanAreas.length<=0){
						mui.alert("请至少选择一个地块");
					}else{
						_idArray = [];
						sessionStorage.setItem('editDaJson',JSON.stringify(_json));
						window.location.hash="#/zzda";
					}
				});
				$('.e.back','.p-zzda-plot').click(function(){
					_idArray=[];
					sessionStorage.removeItem('editDaJson');
					window.location.hash = "#/zzda-archive";
				});
//				container.appendChild(_AreaPlotsTemplate.getPlots(areaData[0].id,isZZDA));
//				return container;
			});
			
		}
	}
	
	return{
		getAreaPlot:_AreaPlotsTemplate.initAreaPlots
	}
});