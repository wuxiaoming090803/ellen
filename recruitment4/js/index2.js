
		/*var html1;
		for(var j=0;j<30;j++){
			//$("#tree1").clone().attr('id','tree'+j).appendTo('#main');
			html1=$("#tree1").clone().attr("id","tree"+j);
			$("#tree1").after(html1);
		}*/
		function setRem(){
            var w=document.documentElement.clientWidth; /*获取浏览器可是区域的宽度*/
            //console.log(w);
            w=w>750?750:w; //*屏幕宽大于768px 当做768px处理 */
            //设置rem的值
            document.querySelector('html').style.fontSize=w/20+'px';
            return fontsize=w/20;
        }

        var setFontSize=setRem();
        //console.log(setFontSize);
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
				 	x:"10.3",
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
				 	x:"4", 
				 	y:"97.5"
				 },
				 "27":{
				 	x:"10", 
				 	y:"101"
				 },
				 "28":{
				 	x:"7", 
				 	y:"103"
				 },
				 "29":{
				 	x:"13", 
				 	y:"107"
				 },
				 "30":{
				 	x:"4", 
				 	y:"112"
				 },
				 "31":{
				 	x:"10", 
				 	y:"116"
				 },
				 "32":{
				 	x:"7", 
				 	y:"117.5"
				 },
				 "33":{
				 	x:"13", 
				 	y:"121.5"
				 },
				 "34":{
				 	x:"4", 
				 	y:"126.7"
				 },
				 "35":{
				 	x:"10", 
				 	y:"130.5"
				 },
				 "36":{
				 	x:"1", 
				 	y:"136"
				 }
			};
			
	
	var num=0;
	var $man1=$("#man1");
	var $mainImg=$("#man1 .people");
	function trigger(){//向上滑动
		num++;
		
		var oddEvenNum=num%2;
		
		if(num<37){
			
			
			if(num<=6){//婴儿
				if(oddEvenNum==0){
				  $mainImg.attr("src","images/man1.gif");
				}else{
				  $mainImg.attr("src","images/man2.gif");
				}
				
				
			}else if(num>6&&num<15){//青少年
				if(oddEvenNum==0){
				 
				  $mainImg.attr("src","images/man4.gif");
				}else{
				 
				  $mainImg.attr("src","images/man3.gif");
				}
				
				
			}else{//成年
				
				if(oddEvenNum==0){
				  $mainImg.attr("src","images/man6.png");
				}else{
				  $mainImg.attr("src","images/man5.png");
				}
				
			}
			
			$man1.css({"transform":"translate("+map[num].x+"rem,"+map[num].y+"rem)"});
			
			if(num==1){
			  $mainImg.attr("src","images/man1.gif");
			}
			
		}else{
			clearInterval(animate);
			return;																																																																																																																																																		
		}
		
	}
	function trigger1(){//向下滑动
		
		num--;
		var oddEvenNum1=num%2;
		if(num>0){
			
			if(num<=5){//婴儿
				if(oddEvenNum1==0){
				  $mainImg.attr("src","images/man1.gif");
				}else{
				  $mainImg.attr("src","images/man2.gif");
				 
				}
				
				
			}else if(num>5&&num<=13){//青少年
				if(oddEvenNum1==0){
				
				  $mainImg.attr("src","images/man4.gif");
				}else{
				 
				  $mainImg.attr("src","images/man3.gif");
				}
				
				
			}else{//成年
				
				if(oddEvenNum1==0){
				 
				  $mainImg.attr("src","images/man6.png");
				}else{
				 
				  $mainImg.attr("src","images/man5.png");
				}
				
			}
			 $man1.css({"transform":"translate("+map[num].x+"rem,"+map[num].y+"rem)"});
			
			
		}else{
			clearInterval(animate1);
			return;																																																																																																																																																		
		}
		
	}
	trigger();
	    var $btn=$("#btn");
	    var $btn1=$("#btn1");
		var box=document.querySelector('body');
        //记录触屏数据
        var startX=0;
        var moveX=0;
        var distanceX=0;
        
        var startY=0;
        var moveY=0;
        var distanceY=0;
        
        var scrollTop1=0; 
        var allLeft=0;
        var scrollTop0=0;
        var animate=0;
        var animate1=0;
        box.addEventListener('touchstart',function(e){
           
            //记录触屏开始位置
            startX= e.targetTouches[0].clientX;
            startY= e.targetTouches[0].clientY;
        });

        box.addEventListener('touchmove',function(e){
           
            //获取当前鼠标移动的位置
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX; //计算距离差
            moveY= e.targetTouches[0].clientY;
            distanceY=moveY-startY; //计算距离差
            
            
        });

        box.addEventListener('touchend',function(){
        	
        	if($btn.hasClass("moving")||$btn1.hasClass("moving")){
        		return;
        	}
            scrollTop0=scrollTop1;
            
            
            
            
            //scrollTop1=($(document).scrollTop())/setFontSize;//向下移动的距离为图片向上滑出去的高度
			console.log(scrollTop1)	;
            //在触屏结束后判断用户滑动方式
            if(distanceY>0){
                console.log('向下滑动');
                scrollTop1+=Math.abs(distanceY);
                
				
				$("#main").css("top",(scrollTop1/fontsize)+"rem");
                
                
                var stepNum=limit(map, scrollTop1/fontsize);  
				
				
				if(num<=0){
					return;
				}
				
                $btn1.trigger("click").addClass("moving");//定时之前走一次
               
            	animate1 = setInterval(function(){
					$btn1.trigger("click");
					
					if(num+4 > stepNum){
						clearInterval(animate1);
						$btn1.removeClass("moving");
						$btn.removeClass("moving");
					}
				},1000)
              if(scrollTop1>0){
                	$("#main").css("top",0);
				}
                
                
            }

            if(distanceY<0){
                console.log('向上滑动');
                //var angle = 60;    //假设角度为60度
				//var radian =  ;     //计算出弧度
				//scrollTop1-=distanceY;//向下移动的距离为累加手指移动的距离
				
				
				scrollTop1-=Math.abs(distanceY);
				$("#main").css("top",(scrollTop1/fontsize)+"rem");
				
				var stepNum=limit(map, scrollTop1/fontsize);  
				
				if(num>36){
					return;
				}
                $btn.trigger("click").addClass("moving");//定时之前走一次
                
                
               
            	animate = setInterval(function(){
					$btn.trigger("click");
					
					if(num-4 > stepNum){
						clearInterval(animate);
						$btn.removeClass("moving");
						$btn1.removeClass("moving");
					}
				},1000)
               
				if(scrollTop1<-2190){
					$("#main").css("top",-2190);
				}
               
                
            }

            //数据重置
            startX=0;
            moveX=0;
            distanceX=0;
            startY=0;
            moveY=0;
            distanceY=0;
        });
        
   
	function limit(arrObj, num){
		
	    var newArr = [];
//	    Object.keys(arr).map(function(x){
//	        // 对数组各个数值求差值
//	        newArr.push(Math.abs(x - num));
//	    });
//	    // 求最小值的索引
//	    var index = newArr.indexOf(Math.min.apply(null, newArr));
//	    return arr[index];



      for(var key in arrObj){
      	//对数组各个数值求差值
      	 newArr.push(Math.abs(arrObj[key].y - num));
      	
      }
      //console.log(newArr)
      // 求最小值的索引
	    var index = newArr.indexOf(Math.min.apply(null, newArr));
	    return index;
	}












//$(function  () {
	   
        
		/*var hill = document.getElementById('hill')
		var path = MorphSVGPlugin.pathDataToBezier("#motionPath");
		
		TweenMax.to(hill, 5, {
		  bezier:{
		    values:path, 
		    type:"cubic", 
		    autoRotate: 180
		  },
		  ease:Linear.easeNone, 
		  repeat: -1
		})
        */
        
        
        
        
		/*var swiper = new Swiper('body',{
			 on: {
			    touchEnd: function(event){
			     var $main1=$("#main1");
			     var scrollHeight=$(document).scrollTop();//滚出去的高度
			     var winHeight=$main1.offset().top;//小人距离window的距离
			     var screenTop=winHeight-scrollHeight;//小人距离浏览器顶部的距离
			     
			     $main1.animate({top:"8.96rem",left:"5.04rem"});
			     
			     console.log(screenTop)
			    },
			 }
		});
			*/
//})