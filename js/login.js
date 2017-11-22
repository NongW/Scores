// JavaScript Document
//支持Enter键登录
		document.onkeydown = function(e){
			if($(".bac").length==0)
			{
				if(!e) e = window.event;
				if((e.keyCode || e.which) == 13){
					var obtnLogin=document.getElementById("submit_btn")
					obtnLogin.focus();
				}
			}
		}

    	$(function(){
			//提交表单
			$('#submit_btn').click(function(){
				//show_loading();
				if($('#email').val() == ''){
					show_err_msg('学号还没填呢！');	
					$('#email').focus();
				}else if($('#password').val() == ''){
					show_err_msg('密码还没填呢！');
					$('#password').focus();
				}else{
					//ajax提交表单，#login_form为表单的ID。 如：$('#login_form').ajaxSubmit(function(data) { ... });
				    //show_msg('登录成功咯！  正在为您跳转...', 'http://localhost:8000/scores/?id="+$('#password').val()+"&pass=nwboss007&year=2015&semester=1');
                    
				    $.ajax({
				        url: "http://10.253.113.19:8000/scores/?id=" + $('#email').val() + "&pass=" + $('#password').val() +
                            "&year="+$('#year').find("option:selected").val()+"&semester="+$('#system').find("option:selected").val(),
				        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers" },
				        processData: false,
				        dataType: "json",
				        success: function (data) {
				            $("#tb").empty();
				            if (data.message == "success") {
				                $.each(data.result.scores, function (index, data) {
				                    $("#tb").append("<tr><th>" + data.lession + "</th><th>" + data.score + "</th></tr>");
				                })
				            }
				            else if (data.status == "400")
				                $("#tb").append("<p>密码或账号错误</p>");
				            else if (data.status == "404")
				                $("#tb").append("<p>地址错误</p>");
				            else
				                $("#tb").append("<p>系统错误</p>");
				        },
				        error: function (XMLHttpRequest, textStatus, errorThrown) {
				            alert(XMLHttpRequest.status);
				            alert(XMLHttpRequest.readyState);
				            alert(textStatus);
				        }
				    });
				}
			});
			$('#reset').click(function(){
				$('#tb').empty();
			})
		});