/**
 * Created by DDX on 2018/3/19.
 */
$(document).ready(function () {
    //点击乘舆
    function horse() {
        $("#Inn").click(function () {
            openDailog();
            $("#dialogTitle").html("乘舆");
            //$("#dialogCenter").html('');
            $("#dialogCenter").html('' +
                '<div class="dialogHeader">' +
                '<h4><span class="h4Main"><span class="selected">魏爱红</span><span>请乘坐</span><span  class="selected">1号车</span></span></h4>' +
                '</div>' +
                '<div class="dialogBot dialogBotM">' +
                '<ul>' +
                '<li>' +
                '<button>' +
                '<span><label></label>' +
                '<text>车长：居晨</text></span>' +
                '<span><i class="dialogBotMImg"></i>13761782186</span>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<span><label></label>' +
                '<text>司机：赵师傅</text></span>' +
                '<span><i class="dialogBotMImg"></i>13761782186</span>' +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                "");
        })


        //var i = 1;
        //var clearTim = setInterval(function () {
        //    $("#horse img").attr("src", "images/horse" + i + ".png");
        //    i++;
        //    if (i == 4) {
        //        i = 1;
        //    }
        //}, 150);
        //
        //setTimeout(function () {
        //    clearInterval(clearTim)
        //}, 681)


    };

    //setInterval(function () {
    //    horse();
    //},3000);

    //点击住店
    function hotel() {
        $("#hotel").click(function () {
            openDailog();
            $("#dialogTitle").html("住店");
            $("#dialogCenter").html('' +
                '<div class="dialogHeader">' +
                '</div>' +
                '<div class="dialogBot dialogBot2">' +
                '<ul>' +
                '<li class="selected">' +
                '<button>' +
                '<label></label>' +
                '<text>张伟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>张亚峰</text>' +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                "");
        });
    };

    //点击打尖
    function disbudding() {
        $("#disbudding").click(function () {
            openDailog();
            $("#dialogTitle").html("打尖");
            $("#dialogCenter").html('' +
                '<div class="dialogHeader">' +
                '<h4><span class="h4Main"><span>您在</span><span class="selected">产品（第三组）</span></span></h4>' +
                '</div>' +
                '<div class="dialogBot dialogBot1">' +
                '<ul>' +
                '<li class="selected">' +
                '<button>' +
                '<label></label>' +
                '<text>张伟伟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>张亚峰</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>程强强</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>王超超</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>曹义敏</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>刘世杰</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>李玟玟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>王武</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>李玟玟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>王武</text>' +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                "");
        });
    };

    //点击打擂
    function competition() {
        $("#competition").click(function () {
            openDailog();
            $("#dialogTitle").html("打擂");
            $("#dialogCenter").html('' +
                '<div class="dialogHeader">' +
                '<h4><span class="h4Main"><span>您在</span><span class="selected">产品（第三组）</span></span></h4>' +
                '</div>' +
                '<div class="dialogBot">' +
                '<ul>' +
                '<li class="selected">' +
                '<button>' +
                '<label></label>' +
                '<text>张伟伟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>张亚峰</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>程强强</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>王超超</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>曹义敏</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>刘世杰</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>李玟玟</text>' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button>' +
                '<label></label>' +
                '<text>王武</text>' +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                "");
        });
    };

    //点击议程
    function meeting() {
        $("#meeting").click(function () {
            openDailog();
            $(".dialogMain").addClass("dialogMax");
            $("#dialogTitle").html("议程");
            $("#dialogCenter").addClass("dialogCenterY");
            $("#dialogCenter").html('' +
                '<div class="dialogHeader">' +
                '<h4><span class="selected">2018年3月产品、技术、咨询业务培训</span></h4>' +
                '</div>' +
                '<div class="dialogBot dialogBotY">' +
                '<p class="topP"><label>培训时间：</label><span>2018年3月30日至2018年4月1日</span></p>' +
                '<p class="topP"><label>培训地点：</label><span>嘉兴豪仕登大酒店</span></p>' +
                '<p class="topP"><label>集合时间地点：</label><span>2018年3月30日上午7:45公司集合点名，8:00准时发车</span></p>' +
                '<p class="topP"><label>紧急联络人：</label><span>居晨(13524332360)、宗忆陈(13761815757)</span></p>' +
                '<p class="topP"><label>具体日程安排如下：</label><span></span></p>' +
                '<p class="topP"><img src="./images/dialogBotY.jpg" alt=""></p>' +
                '<h5>注意事项：</h5>' +
                '<p class="botP">1.请务必携带本人有效身份证。</p>' +
                '<p class="botP">2.为了更好地保障大家的人身安全、提高行动效率，本次出行将进行分组，请组长在活动期间对本组管理人员的培训出席情况、健康状况及需求予以关注。</p>' +
                '<p class="botP">3.外出必须集体行动，注意人身安全，单独外出必须向组长报告。</p>' +
                '<p class="botP">4.自由活动期间大家可以至酒店享用健身中心休闲运动等，如遇突发状况请立即与组长或紧急联络人联系。</p>' +
                '<h5>培训要求：</h5>' +
                '<p class="botP">1.要求每一个参加培训的员工在培训结束后，4月 13 日前提交个人培训小结至本组组长，组长汇总组员小结后，提交至信息发展鹰学院-居晨（分机：8175）处。</p>' +
                '<p class="botP">2.培训期间要求不得迟到、早退，培训考勤纳入公司工资考勤，如有违反，按公司制度执行。如有特殊情况，需要提前三天向各事业部分管领导请假，所有请假以纸质请假单为准，统一交居晨处（26日之提交请假单的一律当缺席处理），无故缺席者第一季度绩效考核一律为E。</p>' +
                '<p class="botP">3.要求培训完后由各业部管控中心安排考试，考试成绩将纳入第一季度绩效考核（具体参加考试名单和其他要求由各业务管控中心确定）</p>' +
                '</div>' +
                "");
        });
    }

    //点击地点
    function place() {
        $("#place").click(function () {
            openDailog();
            $(".dialogMain").addClass("dialogMax");
            $("#dialogTitle").html("地点");
            $("#dialogCenter").html('' +
                '<div class="dialogHeader dialogD">' +
                '<h5 class="selected">嘉兴豪仕登大酒店</h5>' +
                '<h6><label>详细地址：</label>嘉兴市秀洲区吉杨路639号</h6>' +
                '<img src="images/wxmap.jpg" alt="">' +
                '</div>' +
                "");
        });
    }

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
        setTimeout(function () {
            $(".warp_dialog").addClass("warp_dialog2");
        }, 300);
    };


    horse();
    hotel();
    dialogFooter();
    disbudding();
    competition();
    meeting();
    place();
})