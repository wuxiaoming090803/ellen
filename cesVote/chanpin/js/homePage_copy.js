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
	    		$(".productPage").addClass("checkPage");
            $(".productPage").removeClass("productPage1");
            $(".productPage").removeClass("returnPage2");
            $(".productPage").removeClass("returnPage1");

            $(".productUl .swiper-container").attr("id", "");
            $(".lanternLf").attr("id", "checkBoxArrow");

            $("#checkBoxArrow").click(function () {
                $(".productPage").removeClass("checkPage");
                $(".productUl .swiper-container").attr("id", "");
                $(".lanternLf").attr("id", "arrow");

                $(".productPage").addClass("returnPage2");
                $(".productPage").removeClass("returnPage1");

                $(".checkBox").removeClass("checkActive");

                $(".character1 .character").attr("src","images/character1.png");
                $(".character2 .character").attr("src","images/character2.png");
                $(".character3 .character").attr("src","images/character3.png");
                $(".character4 .character").attr("src","images/character4.png");
                $(".character5 .character").attr("src","images/character5.png");
                $(".character6 .character").attr("src","images/character6.png");
            })
        });
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
	var resultArry = [];
    function checkBoxZ() {
        $(".checkBox0").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character1.png");
                resultArry.splice($.inArray($(this).data("value")),1);

            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character1-1.png");
                resultArry.push($(this).data("value"));
            }
        })
        $(".checkBox1").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character2.png");
                 resultArry.splice($.inArray($(this).data("value")),1);

            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character2-1.png");
                 resultArry.push($(this).data("value"));
            }
        })
        $(".checkBox2").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character3.png");
                 resultArry.splice($.inArray($(this).data("value")),1);
            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character3-1.png");
                 resultArry.push($(this).data("value"));
            }
        })
        $(".checkBox3").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character4.png");
				 resultArry.splice($.inArray($(this).data("value")),1);
            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character4-1.png");
                 resultArry.push($(this).data("value"));
            }
        })
        $(".checkBox4").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character5.png");
				 resultArry.splice($.inArray($(this).data("value")),1);
            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character5-1.png");
                 resultArry.push($(this).data("value"));
            }
        })
        $(".checkBox5").click(function () {
            if ($(this).hasClass("checkActive")) {
                $(this).removeClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character6.png");
				 resultArry.splice($.inArray($(this).data("value")),1);
            } else {
                $(this).addClass("checkActive");
                $(this).siblings(".character").attr("src", "images/character6-1.png");
                 resultArry.push($(this).data("value"));
            }
        });
    }


    function swiperImg(){
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

    //打开弹窗
    function openDailog() {
        $(".warp_dialog").removeClass("warp_dialog3");
        $(".warp_dialog").removeClass("warp_dialog4");
        $(".warp_dialog").addClass("warp_dialog1");
        $(".dialogMain").removeClass("dialogMax");
        alert(resultArry);
//      $(".dialogMain").append(resultArry);
        setTimeout(function () {
            $(".warp_dialog").addClass("warp_dialog2");
        }, 300);
    };


    $(".submit").click(function () {
        openDailog();
    })
    $("#cancel").click(function () {
        dialogFooter();
    })
    score();
    checkBoxZ();

})