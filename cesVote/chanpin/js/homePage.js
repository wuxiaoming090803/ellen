/**
 * Created by DDX on 2018/3/20.
 */
$(document).ready(function () {

    // 底部按钮轮播图初始化
    var mySwiper1 = new Swiper('#productBut', {
        direction: 'horizontal',
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    $(".productUl .swiper-container").attr("id", "");
    // 点击底部按钮触发动画
    function score() {
    		$(".productMain").click(function(e){
	    		var btnId = $(e.target).parents(".swiper-slide").attr("id");
	    		if(btnId == "checkBox"){
	    			var labels1 = $(".first .mui-input-row").find("label");
	    			moveLabel(labels1);
	    			var labels2 = $(".second .mui-input-row").find("label");
	    			moveLabel(labels2);
	    			var labels3 = $(".third .mui-input-row").find("label");
	    			moveLabel(labels3);
	    			var labels4 = $(".four .mui-input-row").find("label");
	    			moveLabel(labels4);
	    			var labels5 = $(".five .mui-input-row").find("label");
	    			moveLabel(labels5);
	    			var labels6 = $(".six .mui-input-row").find("label");
	    			moveLabel(labels6);
	    		}
	    		function moveLabel(items){
	    			var obj = {0:"PPT制",1:"演讲台风",2:"原型效果",3:"改进结果",4:"改进效果"};
	    			for(var k = 0 ; k < items.length; k++){
	    				items[k].innerHTML = obj[k];
	    			}
	    		}
			$(".productPage").addClass("scorePage");
	        $(".productPage").removeClass("productPage1");
	        $(".productPage").removeClass("returnPage1");
	        $(".productPage").removeClass("returnPage2");
	        //评论页面轮播图
	        $(".productUl .swiper-container").attr("id", "productSwiper");
	
	        $(".productUl>div>div").removeClass("swiperL");
	        // 人物轮播初始化
	        var mySwiper3 = new Swiper('#productSwiper', {
	            direction: 'horizontal',
	            // 如果需要前进后退按钮
	            //loop: true,
	            slidesPerView: 3,
	            centeredSlides: true,
	            navigation: {
	                nextEl: '.swiper-button-next',
	                prevEl: '.swiper-button-prev',
	            },
	            on: {
	                slideChangeTransitionStart: function (event) {
	                    swiperImg();
	                    updateNavPosition()
	                },
	            },
	        });
	        var mySwiper2 = new Swiper('#swiper-container2', {
	            watchSlidesProgress: true,
	            watchSlidesVisibility: true,
	        })
	
	        function updateNavPosition() {
	            $('#swiper-container2 .active-nav').removeClass('active-nav')
	            var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
	
	
	            if (!activeNav.hasClass('swiper-slide-visible')) {
	                console.log(1);
	                if (activeNav.index() > mySwiper2.activeIndex) {
	                    console.log(2);
	                    var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
	                    mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
	                }
	                else {
	                    console.log(3);
	                    mySwiper2.slideTo(activeNav.index())
	                }
	            }
	        }
	        $(".lanternLf").attr("id", "scoreArrow");
	        //左上角返回
	        $("#scoreArrow").click(function () {
	            $(".productPage").removeClass("scorePage");
	            $(".productPage").addClass("returnPage1");
	            $(".productPage").removeClass("returnPage2");
	
	            $(".productUl .swiper-container").attr("id", "");
	
	
	            $(".productUl>div>div").addClass("swiperL");
	
	            $(".lanternLf").attr("id", "arrow");
	        })
	    	})
        // 点击底部按钮1触发动画
 

    }
	 var rangeList = document.querySelectorAll('.first input[type="range"]');
	 var valueList = document.querySelectorAll('.first input[type="text"]');
	 countScore(rangeList,valueList,"point_sum0");
	 var rangeList1 = document.querySelectorAll('.second input[type="range"]');
	 var valueList1 = document.querySelectorAll('.second input[type="text"]');
	 countScore(rangeList1,valueList1,"point_sum1");
	 var rangeList2 = document.querySelectorAll('.third input[type="range"]');
	 var valueList2 = document.querySelectorAll('.third input[type="text"]');
	 countScore(rangeList2,valueList2,"point_sum2");
	 var rangeList3 = document.querySelectorAll('.four input[type="range"]');
	 var valueList3 = document.querySelectorAll('.four input[type="text"]');
	 countScore(rangeList3,valueList3,"point_sum3");
	 var rangeList4 = document.querySelectorAll('.five input[type="range"]');
	 var valueList4 = document.querySelectorAll('.five input[type="text"]');
	 countScore(rangeList4,valueList4,"point_sum4");
	 var rangeList5 = document.querySelectorAll('.six input[type="range"]');
	 var valueList5 = document.querySelectorAll('.six input[type="text"]');
	 countScore(rangeList5,valueList5,"point_sum5");
	 
	 function countScore(rangeList,valueList,scoreName){
		 for(var i=0,len=rangeList.length;i<len;i++){
	        rangeList[i].addEventListener('input',function(){
	        		var sum = 0;
	            if(this.id.indexOf('field')>=0){
	                document.getElementById(this.id+'-input').value = this.value;
	                for(var j=0,len=valueList.length;j<len;j++){
	  					var val = Number(document.getElementById(valueList[j].id).value)
	 					sum +=val ;
	 				}
	                document.getElementById(scoreName).innerHTML = Math.round(sum * 100) / 100;
	            }else{
	                document.getElementById(this.id+'-val').innerHTML = this.value;
	            }	        
	        });
	    }
	}

    function swiperImg() {
        if($(".character1").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第一组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum0">8.3</span> <span class="scoreS">分</span></h4>'+
                '</div>');
        }else if($(".character2").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第二组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum1">9.1</span> <span class="scoreS">分</span></h4>'+
                '</div>')
        }else if($(".character3").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第三组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum2">7.3</span> <span class="scoreS">分</span></h4>'+
                '</div>')
        }else if($(".character4").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第四组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum3">8.1</span> <span class="scoreS">分</span></h4>'+
                '</div>')
        }else if($(".character5").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第五组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum4">8.5</span> <span class="scoreS">分</span></h4>'+
                '</div>')
        }else if($(".character6").hasClass("swiper-slide-active")){
            $(".scoreMain").html('' +
                '<div class="scoreTitle">'+
                '<h5>第六组评分</h5>'+
                '<h4><span class="scoreB" id="point_sum5">9.3</span> <span class="scoreS">分</span></h4>'+
                '</div>')
        }
    }

    //弹出窗口js
    function openDailog() {
        $(".warp_dialog").removeClass("warp_dialog3");
        $(".warp_dialog").removeClass("warp_dialog4");
        $(".warp_dialog").addClass("warp_dialog1");
        $(".dialogMain").removeClass("dialogMax");
        setTimeout(function () {
            $(".warp_dialog").addClass("warp_dialog2");
        }, 300);
    };
    //关闭弹窗
    function dialogFooter() {
        $("#dialogFooter").click(function () {
            $(".warp_dialog").addClass("warp_dialog3");
            setTimeout(function () {
                $(".warp_dialog").addClass("warp_dialog4");
                $(".warp_dialog").removeClass("warp_dialog2");
                $(".warp_dialog").removeClass("warp_dialog1");
            }, 300);
        })

    };

    //提交
    function scoreSubmit() {
        //评分提交
        $(".submit").click(function () {
            openDailog();
            $(".confirm").attr("id", "scoreConfirm");
            $("#dialogCenter").html('' +
                ' <h4>是否提交</h4>' +
                '<h6></h6>');

            $("#scoreConfirm").click(function () {
                dialogFooter();

                $(".productPage").addClass("completePage");
            })
        });
    }

    $("#cancel").click(function () {
        dialogFooter();
    })
    score();
//  checkBoxZ();
    scoreSubmit()
})