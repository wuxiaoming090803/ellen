define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	
	var loginIn = {
		initImgHeight:function(){
			var height = $(document.body).height();
			$("div.p-login").css({height:height});
		},
		initHeaderData:function(userInfo){
			var header_jQ = $('header');
			var logout_jQ = $('#logout',header_jQ);
			var userName_jQ = $('#userName',header_jQ);
			var loginTime_jQ = $('#loginTime',header_jQ);
			userName_jQ.text(userInfo.userName);
			loginTime_jQ.text(new Date().Format("yyyy.MM.dd HH:mm"));
			
			logout_jQ.click(function(){
				Cache.remove("validParam");
				Cache.remove("userInfo");
				window.location.hash="#/login";
			});
		}
	};
	
	var websocket = {
		ws:null,
		readCommand:function(){
			return JSON.stringify({"model":"rfid_read","timeout":"5"});
		},
		connect:function(){
			var command = this.readCommand();
			ws = new WebSocket("ws://localhost:6800/");
			ws.onopen = function(){
				ws.send(command);
			};
			ws.onmessage = this.onmessage;
			ws.onerror = this.onerror;
		},
		readCard:function(){
			var command = this.readCommand();
			this.ws.send(command);
		},
		onmessage: function(res){
			console.log(res);
			var readData = JSON.parse(res.data);
			if(readData.status == "rfid_read_failed"){
				this.onerror(readData);
				return false;
			}
			var cardId = common.byteToString(readData.id);
			console.log("info:", cardId);
			$.getJSON("/login",{'rfidCode':cardId},function(resp){
				
				if(resp.status == 200){
					var resultData = resp.data;
					var loginUserId = resultData.id;
					var epId  = resultData.epId;
					var rfidCode = resultData.rfidCode;
					var userName = resultData.userName;
					var authToken = resultData.userToken.replace(/\+/g,"%2B")
					var effectiveDate = resultData.effectiveDate;
					Cache.remove("validParam");
					Cache.remove("userInfo");
					Cache.set("validParam", {'loginUserId':loginUserId,'authToken':authToken});
					Cache.set("userInfo", {'epId':epId,'rfidCode':rfidCode,'userName':userName,'effectiveDate':effectiveDate});
					
					var userInfo = Cache.getJSON('userInfo');
					loginIn.initHeaderData(userInfo);
					$("header").show();
					
					window.location.hash = "/index";
				}else{
					var mui_jQ = $('.mui-popup');
					if(mui_jQ.length<=0)
					{
						setTimeout(mui.alert("系统检测到此用户不存在"),10000000);
					}
					websocket.connect();
				}
			});
		},
		onerror: function(res){
			console.log("error:",res);
			websocket.connect();
		}
	};
	
	return {
		init:function(){
			loginIn.initImgHeight();
			$("header").hide();
			if(websocket.ws == null)
				websocket.connect();
			else
				websocket.readCard();


//		$.getJSON("/login",{'rfidCode':'13579'},function(resp){
//				debugger
//				if(resp.status == 200){
//					var resultData = resp.data;
//					var loginUserId = resultData.id;
//					var epId  = resultData.epId;
//					var rfidCode = resultData.rfidCode;
//					var userName = resultData.userName;
//					var authToken = resultData.userToken.replace(/\+/g,"%2B")
//					var effectiveDate = resultData.effectiveDate;
//					Cache.remove("validParam");
//					Cache.remove("userInfo");
//					Cache.set("validParam", {'loginUserId':loginUserId,'authToken':authToken});
//					Cache.set("userInfo", {'epId':epId,'rfidCode':rfidCode,'userName':userName,'effectiveDate':effectiveDate});
//					
//					var userInfo = Cache.getJSON('userInfo');
//					loginIn.initHeaderData(userInfo);
//					$("header").show();
//					
//					window.location.hash = "/index";
//				}
//			});
		}
	}
});
