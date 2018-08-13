define(["jquery","mui"], function($,mui){
	
	//console.log("define keyboard...", $, mui);
	//跟页面无关的方法定义
	//逻辑处理
	var keyboard = {
		output:null,
		_board:null,
		_options:{eId:"", height:40, okAction:null},
		renderTo:function(options){
			var that = this;
			this._options = options;
			var eId = options.eId;
			var board = $("div[ref=keyboard]");
			this.output = $(eId);
			if(board[0]){
				board.css({
					position: "absolute",
					left: that.output.offset().left,
					"z-index":1,
					top: that.output.offset().top + options.height
				});
				board.show();
			}else{
				$.ajax({
					type:"get",
					url:"views/keyboard.html",
					dataType:"html",
					success:function(res){
						board = $(document.createElement("div"));
						board.attr("ref", "keyboard");
						board.html(res);
						board.css({
							position: "absolute",
							"z-index":1,
							left: that.output.offset().left,
							top: that.output.offset().top + options.height
						});
						that.output.after(board);
						that.bindEvent(board);
						that._board = board;
					}
				});
			}
		},
		checkNumber:function(v){
			//var number = this.output.val();
			var that = this;
			var number = that.getValue(this.output);
			if(number == ""){
				return true;
			}else if(number.indexOf(".") != -1 && v == "."){
				return false;
			}else if(number == "0" && v == "0"){
				return false;
			}
			return true;
		},
		bindEvent:function(board){
			var that = this;
			board.find("input[type=button]").on("click", function(e){
				var buttonValue = $(this).data("val");
				if(["backspace","clear","ok"].indexOf(buttonValue) != -1){
					that.doAction(buttonValue);
					return false;
				}
				if(that.checkNumber(buttonValue)){
					var number = that.getValue(that.output);//that.output.val();
					if(number == "" && buttonValue == "."){
						number = "0";
					}
					if(number == "0" && buttonValue != "."){
						number = "";
					}
					that.setValue(that.output,number+""+buttonValue);
					//that.output.val(number+""+buttonValue);
				}
				that.output.focus();
				return false;
			});
		},
		doAction:function(action){
			var that = this;
			if(action == "backspace"){
				var number =  that.getValue(that.output);//that.output.val();
				if(number == null || number == ""){
					return;
				}
				number = number.substr(0, number.length -1);
				that.setValue(that.output,number);
				//that.output.val(number);
			}else if(action == "clear"){
				//that.output.val("");
				that.setValue(that.output,"");
			}else if(action == "ok"){
				that._board.hide();
				if(that._options.okAction) that._options.okAction();
			}
		},
		getValue:function(obj){
			var number = "";
			if(obj.is("input")){
				number=obj.val();
			}else{
				number=obj.find("input")[0].value;
			}
			return number;
		},
		setValue:function(obj,num){
			if(obj.is("input")){
				obj.val(num);
			}else{
				obj.find("input")[0].value=num;
			}
		}
	};
	
	return {
		renderTo:function(op){
			keyboard.renderTo(op);
		}
	};
});