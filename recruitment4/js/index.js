
		
		function setRem(){
            var w=document.documentElement.clientWidth; /*获取浏览器可是区域的宽度*/
            //console.log(w);
            w=w>750?750:w; //*屏幕宽大于768px 当做768px处理 */
            //设置rem的值
            document.querySelector('html').style.fontSize=w/20+'px';
            return fontsize=w/20;
        }

        var setFontSize=setRem();
       
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
   var $man1=$("#man1");
   var $mainImg=$("#man1 .people");
   var $btn=$("#btn");
   var $btn1=$("#btn1");
    var num = 0;	
    var animate1 ;
	var $wrapper=$(".wrapper")[0]
	var scroll = new BScroll($wrapper, {
		    probeType:2,
		    momentum:false
		  });
   
    
    scroll.on('touchend', function (pos) {
    	
	    console.log("touchend");
	    
	
	})
    scroll.on('scroll', function (pos) {
    	
    	var y =(Math.abs(pos.y)/setFontSize)+ Number(map["1"].y);
    	console.log("y----"+y);
		var dot = compare(y);
		
		console.log("dot----"+dot);
		$man1.css({"transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
		$man1.css({"-moz-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
		$man1.css({"-ms-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
		$man1.css({"-webkit-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
		$man1.css({"-o-transform":"translate("+dot.x+"rem,"+dot.y+"rem)"});
	})
   

   move();
   function move(){
   	num++
   	 $man1.css({"-webkit-transform":"translate("+map[num].x+"rem,"+map[num].y+"rem)"});
   }
   function compare(newY){
   	  var listHeight = [];
   	  for(var key in map){
   	  	listHeight.push(map[key]);
   	  }
   	  for(var i = 0; i <listHeight.length -1;i++){
   	  	var height1 = Number(listHeight[i].y),heigtht2 = Number(listHeight[i+1].y);
   	  	if(newY >= height1 && newY < heigtht2){
   	  		var newX = computeRandom(listHeight[i],listHeight[i+1],newY);
   	  		var newDot = {
   	  			"x":newX,"y":newY
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
   		//判断左侧
   		if(minX - maxX < 0){
   			var newX = Math.abs(newdot - Math.abs(Number(min.y)))/ newRate + Number(min.x);
   			$mainImg.attr("src","images/man1.gif");
   			if(newdot >= map["6"].y && newdot < map["14"].y){
   				$mainImg.attr("src","images/man4.gif");
   			} 
   			if(newdot >= map["14"].y){
   				$mainImg.attr("src","images/man6.png");
   			}
   		}else{
   			var newX = Number(min.x) - Math.abs(newdot - Math.abs(Number(min.y)))/ newRate;
   			$mainImg.attr("src","images/man2.gif");
   			if(newdot >= map["6"].y && newdot < map["14"].y){
   				$mainImg.attr("src","images/man3.gif");
   			}
   			if(newdot >= map["14"].y){
   				$mainImg.attr("src","images/man5.png");
   			}
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












