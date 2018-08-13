define(["jquery","datebox","keyboard","mui"], function($,DateBox,keyboard,mui){
	var isNullEmpty = function(val){
		return !(val!='' && val!=null && val!=undefined)
	}
	var _json = null;
	var _isEdit = false;
	
	var _ZZDAStep = {

		bindJson:function(){
			_json = JSON.parse(sessionStorage.getItem('editDaJson'));
			_isEdit = JSON.parse(sessionStorage.getItem('isEdit'));
			
			var list = _json.farmingPlanAreas;
			var farmingPlanAt = _json.farmingPlanAt;
			var productName = _json.productName;
			var productId = _json.productId;
			var farmingStandard = _json.farmingStandard;
			
			var farmingPlanAtDeal =!isNullEmpty(farmingPlanAt)? farmingPlanAt.split(' ')[0]:'';
			var farmingStandardText = "";
			switch(farmingStandard){
				case 1: farmingStandardText = "绿色";break;
				case 2: farmingStandardText = "有机";break;
				case 3: farmingStandardText = "无公害";break;
			}
			
			var plotName = "";
			var farmingArea = "";
			list.forEach(function(item){
				if(item.farmingArea===undefined){
					item.farmingArea=0;
				}
				farmingArea+=("<div>"+item.areaName+":<span>"+(_isEdit?item.farmingArea:0)+"</span>亩</div>");
				plotName += (" "+item.areaName);
			});
	
			$('[data-index=1]').text(plotName);
			$('[data-index=2]').text(farmingPlanAtDeal);
			$('[data-index=3]').text(farmingStandardText);
			$('[data-index=4]').text(productName);
			$('[data-index=5]').html(farmingArea);
		},
		updateData:function(callback){
			var _jsonDeal = {};
			var type="POST";
			if(_isEdit) { _jsonDeal.id = _json.id; type = "PATCH" }
			_jsonDeal.productId = _json.productId;
			_jsonDeal.farmingStandard = _json.farmingStandard;
			_jsonDeal.farmingPlanAt  = _json.farmingPlanAt ;
			_jsonDeal.farmingPlanAreas = [];
			_json.farmingPlanAreas.forEach(function(item){
				var farmingPlanArea = {};
				farmingPlanArea.areaId = item.areaId;
				farmingPlanArea.farmingArea = item.farmingArea;
				_jsonDeal.farmingPlanAreas.push(farmingPlanArea);
			});
			$.easyAjax("/farmingPlans",type , _jsonDeal ,callback);

		},
		plantingTime:function(index){
			var farmingPlanAtDeal = $('[data-index=2]').text();
		    var str = sessionStorage.getItem('editDaJson');
			var operation = $('<div/>').addClass('operation');
			var span = $('<span/>').text("种植时间");
			var dateInput = $('<input/>').addClass('box date').attr('id','dateBox').attr('type','text').attr('readonly','true');
			
			dateInput[0].addEventListener('focus',function(){
				_ZZDAStep.setValue(index,this.value);
			});
			//失去焦点
			dateInput[0].addEventListener('blur',function(){
				_ZZDAStep.setValue(index,this.value);
				_json.farmingPlanAt = this.value+" 00:00:00";
			});
			var imgLogo = $('<img/>').addClass('date-logo').attr('src','./img/zzda/date.png');
			operation.append(span).append(dateInput).append(imgLogo);
			_ZZDAStep.setTitle("请选择种植时间");
			
			var w=$('#plantOperate')[0].offsetWidth*0.55
			new DateBox(dateInput[0],{
				type:'M',
				maxDate:'2500-01-01',
				dateComponentStyle:{
					width:w,				//选择日期窗口宽度
					//height:197,				//选择日期窗口高度
					dateButoonFontSize:12,	//选择日期按钮字体大小
					dateButoonWidth:w/7,		//选择日期按钮宽度
					//dateButoonHeight:25,	
				},
			});
			if(!isNullEmpty(farmingPlanAtDeal))
			{
				$(dateInput[0]).val(farmingPlanAtDeal);
			}
			
			return operation;
		},
		plantingStandard:function(index){
			var farmingStandardText = $('[data-index=3]').text();
			var dataJsonArray = [
				{
					text:"绿色",
					imgSrc:"./img/zzda/lvse.png",
					idName:"lvSe",
					standardNum:1
				},
				{
					text:"有机",
					imgSrc:"./img/zzda/youji.png",
					idName:"youJi",
					standardNum:2
				},
				{
					text:"自来水",
					imgSrc:"./img/zzda/zilaishui.png",
					idName:"ziLaiShui",
					standardNum:3
				}
			];
			var ul = $('<ul/>').addClass('standard-type-common p-clear');
			var value='';
			dataJsonArray.forEach(function(d){
				var li_1 = $('<li/>').addClass('each');
				var div_1 = $('<div/>').addClass('e inner');
				var span_1 = $('<span/>').addClass('heading').text(d.text);
				var img_1 = $('<img/>').addClass('width-full e img').attr('src',d.imgSrc);
				if(d.standardNum===_json.farmingStandard){
					div_1.addClass('active');
					img_1.attr('src',d.imgSrc.replace('.png','-selected.png'));
				}
				var input_1 = $('<input/>').addClass('box').attr('type','checkbox').attr('id',d.idName).attr('checked','true');
				var setValue=function(val,standardNum){
					value=val;
					_json.farmingStandard = standardNum;		
					_ZZDAStep.setValue(index,value);
				}
				
				var label_1 = $('<label/>').addClass('replace-box');
			
				div_1[0].onclick=function(){
					var imgSrc = img_1.attr('src');
					var inner_jQ = $(this);
//					if(inner_jQ.hasClass('active')){
//						inner_jQ.removeClass('active');
//						///////////////////setValue('',);
//						img_1.attr('src',imgSrc.replace('-selected.png','.png'));
//					}else{
					if(!inner_jQ.hasClass('active'))
					{
						var inner_all_jQs = $('.e.inner');
						var bg_img_jQs = inner_all_jQs.find('.e.img');
						inner_all_jQs.removeClass('active');
						inner_jQ.addClass('active');
						
						for(var i = 0;i < bg_img_jQs.length;i++){
							var this_bg_img_jQ = $(bg_img_jQs[i]);
							this_bg_img_jQ.attr('src',this_bg_img_jQ.attr('src').replace('-selected.png','.png'));
						}
						
						img_1.attr('src',imgSrc.replace('.png','-selected.png'));
						
						setValue(span_1.text(),d.standardNum);
					}
//					}
				}
				div_1.append(span_1).append(img_1).append(input_1).append(label_1);
				li_1.append(div_1);
				ul.append(li_1);
			});
			
			_ZZDAStep.setTitle("请选择种植标准");
			return ul;
		},
		cropName:function(index,callback){
	//10.10.200.69
			$.getAjax("/crop",null,function(resp){
				
				if(resp.status==200){
					var data =resp.data;//['黄瓜','西红柿','冬瓜','南瓜','冬瓜'];
					var operation = $('<div/>').addClass('operation');
					var span = $('<span/>').text('作物名称');
					var cropSelect = $('<div/>').addClass('crop-select');
					var inputbox = $('<input/>').addClass('box').attr('placeholder','请选择作物名称').attr('readonly','true');
					var spanArrow = $('<span/>').addClass('mui-icon mui-icon-arrowdown e arrow');
					var drop = $('<div/>').addClass('drop');
					var inputSearch = $('<input/>').addClass('search').attr('placeholder','请输入作物名称').attr('type','text');
					var searchLogo = $('<img/>').addClass('search-logo').attr('src','./img/zzda/search.png');
					var ul = $('<ul/>').addClass('crop-list');
					
					inputbox.on('click',function(){
						spanArrow.click();
					})
					
					var render=function(_d){
						ul.empty();
						_d.forEach(function(d){
							var li = $('<li/>').addClass('crop').text(d.productName);
							if(d===inputbox.val()){
								li.addClass('active');
							}
							li[0].onclick=function(){
								_ZZDAStep.setValue(index,this.innerText);
								inputbox.val(this.innerText);
								spanArrow.click();
								li.siblings().removeClass('active');
								li.addClass('active');
								_json.productId = d.id;
							}
		
							ul.append(li);
						});
						//activeCropItem(ul);
					}
					render(data);
					inputSearch[0].oninput=function(){
						var val=this.value;
						render(data.filter(function(item){
							return item.productName.indexOf(val)!==-1;
						}))
					}
					
					spanArrow.on('click',function(){
						if(!drop.is(":visible"))
						{
							spanArrow.removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
							drop.slideDown();
						}else{
							spanArrow.addClass('mui-icon-arrowdown').removeClass('mui-icon-arrowup');
							drop.slideUp();
						}
					});
					
					drop.append(inputSearch).append(searchLogo).append(ul);
					cropSelect.append(inputbox).append(spanArrow).append(drop);
					operation.append(span).append(cropSelect);
					
					_ZZDAStep.setTitle("请选择作物名称");
					//return operation;
					if(callback) callback(operation);
				}else{
					console.log(resp.msg);
				}
			});

		},
		plantingArea:function(index){
			var list = _json.farmingPlanAreas;
			var areas=$('[data-index=5]');
			var wrapper=$('<div/>');
			list.forEach(function(item,index){
				var residueSize = item.residueSize;//item.areaSize-item.farmingArea
				var operation = $('<ul/>').addClass('operation');
				
				var li = $('<li/>').addClass('single');
				var div = $('<div/>').addClass('plot-name').text(item.areaName);
				var span = $('<span/>').addClass('remark').text('('+residueSize+'亩可用)');
				var input = $('<input/>').addClass('box date')
					.attr('id','areaContainer'+index).attr('placeholder','请输入种植面积')
					.attr('readonly','true').val(item.farmingArea);
				var setAreaValue=function(index,value){
					areas[0].children[index].children[0].innerText=value;
					if(value>residueSize){
						mui.alert("输入的种植面积已超出实际剩余可种植面积，请重新输入");
						input[0].value = 0;
					}else{
						item.farmingArea = parseInt(value);
					}
					
				}
				input[0].addEventListener('focus',function(){
					setAreaValue(index,this.value);
				});
				input[0].addEventListener('blur',function(){
					setAreaValue(index,this.value);
					
				});
				
				
				input.on('click',function(){
					keyboard.renderTo({eId:'#areaContainer'+index,height:100});
				});
				var unit = $('<span/>').addClass('unit').text('亩');
				div.append(span);
				li.append(div).append(input).append(unit);
				operation.append(li);
				wrapper.append(operation);
			});
			
			
			_ZZDAStep.setTitle("请选择种植面积");
			return wrapper;
		},
		setValue:function(index,value){
			$('[data-index='+index+']').text(value);
		},
		setTitle:function(value){
			var stepMainTitle = $('#stepMainTitle');
			var stepSubTitle = $('#stepSubTitle');
			stepMainTitle.text(value);
			stepSubTitle.text(value);
		}
		
	}
	return {
		bindJson:_ZZDAStep.bindJson,
		updateData:_ZZDAStep.updateData,
		getPlantingTime:_ZZDAStep.plantingTime,
		getPlantingStandard:_ZZDAStep.plantingStandard,
		getCropName:_ZZDAStep.cropName,
		getPlantingArea :_ZZDAStep.plantingArea
	};
});