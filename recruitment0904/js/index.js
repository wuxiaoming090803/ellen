
		
		

    var t_img; // 定时器
	var isLoad = true; // 控制变量
	
	// 判断图片加载状况，加载完成后回调
	isImgLoad(function(){
	    // 加载完成
	});
	
	// 判断图片加载的函数
	function isImgLoad(callback){
	    // 查找所有图，迭代处理
	    $('img').each(function(){
	        // 找到为0就将isLoad设为false，并退出each
	        if(this.height === 0){
	            isLoad = false;
	            return false;
	        }
	    });
	    // 为true，没有发现为0的。加载完毕
	    if(isLoad){
	        clearTimeout(t_img); // 清除定时器
	        console.log("加载完成");
//			        alert("加载完成");
	        $(document).ready(function (){
	        	$('.loading_box').hide();
	        	
	        //正文内容	
	         
	        
			 document.getElementById("mp3Btn").addEventListener("tap",function(){
				 	var $this=$(this);
				 	if($this.hasClass("playing1")){
				 		document.getElementById("mp3").pause();
				 		$this.removeClass("playing1");
				 	}else{
				 		document.getElementById("mp3").play();
				 		$this.addClass("playing1");
				 	}
			 })
			$(document).bind('mousewheel', function(event, delta) { return false; });
	        function setRem(){
	            var w=document.documentElement.clientWidth; /*获取浏览器可是区域的宽度*/
	            //console.log(w);
	            w=w>750?750:w; //*屏幕宽大于768px 当做768px处理 */
	            //设置rem的值
	            document.querySelector('html').style.fontSize=w/20+'px';
	            return fontsize=w/20;
	        }

	        var setFontSize=setRem();
	        var house={
	        	   "1":{
						x:"5.4",
						y:"8.3"
					},
	        		"2":{
						x:"11.3",
						y:"17.5"
					},
					"3":{
						x:"11.8",
						y:"62.2"
					},
					"4":{
						x:"9.6",
						y:"165.5"
					}
					
	        };
	        var logo = {
		        	"1":{
						x:"9.6",
						y:"27.2"
					},
					"2":{
						x:"7.3",
						y:"36.4"
					},
					"3":{
						x:"12",
						y:"47.3"
					},
					"4":{
						x:"12.1",
						y:"76.9"
					},
					"5":{
						x:"11.7",
						y:"91.2"
					},
					
					"6":{
						x:"11.2",
						y:"104"
					},
					"7":{
						x:"11.5",
						y:"119"
					},
					"8":{
						x:"11.8",
						y:"133.3"
					},
					"9":{
						x:"4.1",
						y:"154.7"
					},
					"10":{
						x:"12.1",
						y:"177.6"
					},
					"11":{
						x:"12.4",
						y:"192.1"
					}
	        };
	        var bubble = {
	        	   "1":{
						x:"2",
						y:"9",
						value:"1997年公司成立于武定路435号"
					},
					"2":{
						x:"6.5",
						y:"18.2",
						value:"1998年搬至康吉大厦并获评上海市高新技术企业"
					},
					 "3":{
					 	x:"1",
					 	y:"28",
					 	value:"我在2001年进军档案信息化领域"
					 },
					 "4":{
					 	x:"8.4",
					 	y:"37",
					 	value:"我在2002年获得涉及国家秘密的计算机信息系统集成资质"
					 },
					 "5":{
					 	x:"2.2",
					 	y:"48",
					 	value:"于2003年我获得CMMI3认证"
					 },
					 "6":{
					 	x:"6",
					 	y:"62",
					 	value:"2005年，办公新址天地软件园11号楼"
					 },
					 "7":{
					 	x:"3",
					 	y:"77",
					 	value:"我在2006年推出司法行政、数字化监狱、法院行政整体解决方案"
					 },
					 "8":{
					 	x:"2.5",
					 	y:"92",
					 	value:"在2008年，我完成股份制改革，更名为上海中信信息发展股份有限公司"
					 },
					 "9":{
					 	x:"1.6",
					 	y:"105.5",
					 	value:"2009年，我获得上海市科技小巨人企业称号"
					 },
					 "10":{
					 	x:"2",
					 	y:"120",
					 	value:"我于2010年参与全国肉菜流通追溯标准的制定，进军食品安全流通追溯领域"
					 },
					 "11":{
					 	x:"2.3",
					 	y:"134.8",
					 	value:"2013年，我又获得CMMI5认证"
					 },
					 "12":{
					 	x:"6.3",
					 	y:"155.8",
					 	value:"2015年6月11日我在深交所创业板成功上市！"
					 },
					 "13":{
					 	x:"6.3",
					 	y:"165.8",
					 	value:"2016年，信息发展产业园奠基，打造西虹桥新地标"
					 },
					 "14":{
					 	x:"3.3",
					 	y:"179.8",
					 	value:"2018年，在上海设立信息发展-霍尼韦尔联合创新实验室"
					 },
					 "15":{
					 	x:"3.3",
					 	y:"193.8",
					 	value:"2018年，我又和阿里巴巴达成在人工智能领域的框架合作协议"
					 }
					 
	        };
			var map = {
				    "1":{
						x:"10.2",
						y:"5.6"
					},
					"2":{
						x:"4",
						y:"9.2"
					},
					 "3":{
					 	x:"10",
					 	y:"13.2"
					 },
					 "4":{
						x:"7",
						y:"15.2"
					},
					 "5":{
					 	x:"13",
					 	y:"18.5"
					 },
					 "6":{
					 	x:"4",
					 	y:"23.5"
					 },
					 "7":{
					 	x:"10",
					 	y:"27.5"
					 },
					 "8":{
					 	x:"7.5",
					 	y:"29.5"
					 },
					 "9":{
					 	x:"13",
					 	y:"33"
					 },
					 "10":{
					 	x:"4",
					 	y:"38.5"
					 },
					 "11":{
					 	x:"10",
					 	y:"42.5"
					 },
					 "12":{
					 	x:"7",
					 	y:"44.2"
					 },
					 "13":{
					 	x:"12.3",
					 	y:"47.2"
					 },
					 "14":{
					 	x:"4",
					 	y:"53.5"
					 },
					 "15":{
					 	x:"10",
					 	y:"57"
					 },
					 "16":{
					 	x:"7",
					 	y:"59"
					 },
					 "17":{
					 	x:"13",
					 	y:"63"
					 },
					 "18":{
					 	x:"4", 
					 	y:"68"
					 },
					 "19":{
					 	x:"10", 
					 	y:"72"
					 },
					 "20":{
					 	x:"7", 
					 	y:"73.5"
					 },
					 "21":{
					 	x:"13", 
					 	y:"77.5"
					 },
					 "22":{
					 	x:"4", 
					 	y:"83"
					 },
					 "23":{
					 	x:"10", 
					 	y:"86.5"
					 },
					 "24":{
					 	x:"7", 
					 	y:"88.5"
					 },
					 "25":{
					 	x:"13", 
					 	y:"92"
					 },
					 "26":{
					 	x:"8.3", 
					 	y:"94.3"
					 },
					 "27":{
					 	x:"4", 
					 	y:"96.5"
					 },
					 "28":{
					 	x:"10", 
					 	y:"100"
					 },
					 "29":{
					 	x:"7", 
					 	y:"101.5"
					 },
					 "30":{
					 	x:"13", 
					 	y:"105"
					 },
					 "31":{
					 	x:"4", 
					 	y:"110.8"
					 },
					 "32":{
					 	x:"10", 
					 	y:"114.3"
					 },
					 "33":{
					 	x:"7", 
					 	y:"116.5"
					 },
					 "34":{
					 	x:"13.5", 
					 	y:"120"
					 },
					 "35":{
					 	x:"4", 
					 	y:"125.7"
					 },
					 "36":{
					 	x:"10", 
					 	y:"129.5"
					 },
					 "37":{
					 	x:"7.6", 
					 	y:"131"
					 },
					 "38":{
				 	    x:"13.5", 
					 	y:"134.3"
					 },
					 "39":{
					 	x:"4", 
					 	y:"140.5"
					 },
					 "40":{
					 	x:"10", 
					 	y:"144"
					 },
					 "41":{
					 	x:"7.2", 
					 	y:"145.7"
					 },
					 "42":{
					 	x:"13.6", 
					 	y:"149.6"
					 },
					 "43":{
					 	x:"4", 
					 	y:"154.8"
					 },
					 "44":{
					 	x:"10", 
					 	y:"158.5"
					 },
					 "45":{
					 	x:"7", 
					 	y:"160.3"
					 },
					 "46":{
					 	x:"13", 
					 	y:"163"
					 },
					 "47":{
					 	x:"4", 
					 	y:"169.5"
					 },
					 "48":{
					 	x:"10", 
					 	y:"173.3"
					 },
					 "49":{
					 	x:"7.2", 
					 	y:"175"
					 },
					 "50":{
					 	x:"13.7", 
					 	y:"178.5"
					 },
					 "51":{
					 	x:"4.2", 
					 	y:"184.2"
					 },
					 "52":{
					 	x:"10.5", 
					 	y:"187.9"
					 },
					 "53":{
					 	x:"7.8", 
					 	y:"189.5"
					 },
					 "54":{
					 	x:"13.8", 
					 	y:"193"
					 },
					 "55":{
					 	x:"3.8", 
					 	y:"198.8"
					 },
					 "56":{
					 	x:"10", 
					 	y:"202.5"
					 },
					 "57":{
					 	x:"3.8", 
					 	y:"206.2"
					 },
					 "58":{
					 	x:"-3.5", 
					 	y:"210.2"
					 },
					 "59":{
					 	x:"-3.5", 
					 	y:"211.2"
					 },
					 "60":{
					 	x:"-4", 
					 	y:"230"
					 }
				};
		   var $man1=$("#man1");
		   var $mainImg=$("#man1 .people");
		   var $btn=$("#btn");
		   var $btn1=$("#btn1");
		    var num = 0;	
		    var animate1 ;
			var $wrapper=$(".wrapper")[0];
			  	var oldY = 0,flag="";
			var scroll = new BScroll($wrapper, {
				    probeType:2,
				    momentum:false,
				    tap:true,
				    bounce:false,
				    scrollX:false,
				    preventDefaultException:{
				    	tagName: /^(img|TEXTAREA|BUTTON|IMG)$/
				    }
				 });
				  
		   scroll.on("beforeScrollStart",function(){
		   	
			   	if(!$("#mp3Btn").hasClass("hasPlay")){
			   		$("#mp3Btn").addClass("hasPlay");
			   	   document.getElementById("mp3").play();
			   	}
		   	  
		   })
		    scroll.on('scroll', function (pos) {
		    	var y =(Math.abs(pos.y)/setFontSize)+ Number(map["2"].y);
				var dot = compare(y,oldY);
				oldY = y;
				$man1.css({"transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
				$man1.css({"-moz-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
				$man1.css({"-ms-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
				$man1.css({"-webkit-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
				$man1.css({"-o-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
			})
		   
		
		   move();
		   function move(){
		   	num++
		   	 $man1.css({"transform":"translate("+map[num].x+"rem,"+map[num].y+"rem)"});
	   	 
		   }
		 
	   function compare(newY,oldY){
	   
	   	if(newY - oldY > 0){
	   		flag="up"
	   	}else{
	   		flag ="down"
	   	}
	   
	   	  var listHeight = [],bubbleList = [];
	   	  var logoList=[],houseList=[];
	   	  for(var key in map){
	   	  	listHeight.push(map[key]);
	   	  }
	   	  for(var k in bubble){
	   	  	bubbleList.push(bubble[k]);
	   	  }
	   	  for(var m in logo){
	   	  	logoList.push(logo[m]);
	   	  }
	   	  for(var w in house){
	   	  	houseList.push(house[w]);
	   	  }
	   	if(flag=="up"){
		  	for(var j = 0; j <bubbleList.length;j++){
		   	  	var bheight1 = Number(bubbleList[j].y),
		   	  		bleft=Number(bubbleList[j].x);
		   	  	if(newY > bheight1&& newY < bheight1+2){
		   	  		if($(".T"+j).length > 0){
		   	  		   $(".T"+j).show().addClass("showChange");
		   	  		}else{
		   	  			$("<div class='bubble-tooltip T"+j+"'>"+bubbleList[j].value+"</div>")
		   	  			.appendTo($("#main"))
		   	  			.css({
		   	  				"top":bheight1+"rem",
		   	  				"left":bleft+"rem"
		   	  			})
		   	  		}
		   	  	}else if(newY >  bheight1+6){
		   	  		$(".T"+j).hide().removeClass("showChange");
		   	  	}
	   	  	}
		  	for(var n=0;n<logoList.length;n++){
		  		var logoHeight=Number(logoList[n].y);
		  		if(newY > logoHeight&& newY < logoHeight+2){
		  			$(".logo"+n).addClass("bigMore");
		  		}else{
		  			$(".logo"+n).removeClass("bigMore");
		  		}
		  	}
		  	for(var r=0;r<houseList.length;r++){
		  		var houseHeight=Number(houseList[r].y);
		  		if(newY > houseHeight-1&& newY < houseHeight+5){
		  			$("#house"+(r+1)).addClass("bigMore1");
		  		}else{
		  			$("#house"+(r+1)).removeClass("bigMore1");
		  		}
		  	}
	   	}else{
	   		for(var k = bubbleList.length -1; k >= 0;k--){
		   	  	var bheight1 = Number(bubbleList[k].y),
		   	  		bleft=Number(bubbleList[k].x);
		   	  		console.log("向下滑newY"+newY);
		   	  	if(newY < bheight1-5){
		   	  		if($(".T"+(k-1)).hasClass("showChange")){
		   	  		  $(".T"+k).hide().removeClass("showChange");	
		   	  		}
		   	  	}else if(newY < bheight1+1 && newY > bheight1-2){
		   	  		 $(".T"+k).show().addClass("showChange");
		   	  		 
		   	  	}
	   	  	}
	   		/*for(var s=logoList.length-1;s>=0;s--){
	   			var logoHeight=Number(logoList[s].y);
		  		if(newY <logoHeight-2){
		  			$(".logo"+s).removeClass("bigMore");
		  		}else{
		  			$(".logo"+s).addClass("bigMore");
		  			break;
		  		}
	   		}*/
	   		for(var s=logoList.length-1;s>=0;s--){
		  		var logoHeight=Number(logoList[s].y);
		  		if(newY > logoHeight-1&& newY < logoHeight+3.5){
		  			$(".logo"+s).addClass("bigMore");
		  		}else{
		  			$(".logo"+s).removeClass("bigMore");
		  		}
		  	}
	   		for(var u=houseList.length-1;u>=0;u--){
		  		var houseHeight=Number(houseList[u].y);
		  		if(newY > houseHeight-0.8&& newY < houseHeight+2){
		  			$("#house"+(u+1)).addClass("bigMore1");
		  		}else{
		  			$("#house"+(u+1)).removeClass("bigMore1");
		  		}
		  	}
	   	}
	 	 
	   	  for(var i = 0; i <listHeight.length -1;i++){
	   	  	var height1 = Number(listHeight[i].y),heigtht2 = Number(listHeight[i+1].y);
	   	  	if(newY >= height1 && newY < heigtht2){
	   	  		var newX = computeRandom(listHeight[i],listHeight[i+1],newY);
	   	  		var newDot = {
	   	  			"x":newX,"y":newY
	   	  		}
	   	  		if(newY>=198.8 && newY<=210.2){
	   	  			$(".man5").hide();
	   	  			$(".specialTitle").show();
	   	  		}else{
	   	  			$(".man5").show();
	   	  			$(".specialTitle").hide();
	   	  		}
	   	  		return newDot;
	   	  	}
	   	  }
	   }
	   function computeRandom(dot1,dot2,newdot){
	   		var y1 = Math.abs(dot1.y),y2= Math.abs(dot2.y),min = dot2,max = dot1;
	   		if(y1 - y2 >= 0){
	   			min = dot1,max = dot2;
	   		}
	   		var minX = Number(min.x),
	   			minY = Number(min.y),
	   			maxX = Number(max.x),
	   			maxY = Number(max.y);
	   		var rate = (maxY - minY) /(maxX - minX);
	   		var newRate = Math.abs(rate);
		    
		    if(newdot < map["10"].y){
		    	$mainImg.attr("src","images/man1.gif");	
		    }
			if(newdot >= map["10"].y && newdot < map["26"].y){
				$mainImg.attr("src","images/man2.gif");
			} 
			if(newdot >= map["26"].y && newdot < map["55"].y){
				$mainImg.attr("src","images/man3.png");
			}	
			if(newdot >= map["55"].y ){
				$mainImg.attr("src","images/man4.png");
			}
	   		//判断左侧
	   		if(minX - maxX < 0){
	   			var newX = Math.abs(newdot - Math.abs(Number(min.y)))/ newRate + Number(min.x);
	            $mainImg.css("transform","rotateY(0deg) translateY(-0.5rem)");
	            $man1.css("z-index","45");
	   		}else{
	   			var newX = Number(min.x) - Math.abs(newdot - Math.abs(Number(min.y)))/ newRate;
				$mainImg.css("transform","rotateY(180deg) translateY(-0.5rem)");
				$man1.css("z-index","55");
	
	
	   		}
	   		   
	   		return newX;
	   }
		function limit(arrObj, num){
			
		    var newArr = [];
	      for(var key in arrObj){
	      	//对数组各个数值求差值
	      	 newArr.push(Math.abs(arrObj[key].y - num));
	      	
	      }
	     
	      // 求最小值的索引
		    var index = newArr.indexOf(Math.min.apply(null, newArr));
		    return index;
		}
		
		        	
		        	
	        	
	        	
	        	
	        	
	        	
	        	
	        	
	        	
	        //正文结束	
	        	
            }); 
	        // 回调函数
	        callback();
	    // 为false，因为找到了没有加载完成的图，将调用定时器递归
	    
	    }else{
	        isLoad = true;
	        t_img = setTimeout(function(){
	            isImgLoad(callback); // 递归扫描
	        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	    }
	}







