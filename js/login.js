$(function(){
	//单击“快速登陆”切换页面
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left: '0px',width: '70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
	});
	//单击“快速注册”切换页面
	$('#switch_login').click(function(){
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left: '154px',width: '70px'});
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
	});
});
var pwdmin = 6;
$(document).ready(function(){
	//单机注册按钮时进行表单验证
	$('#reg').click(function(){
		//验证用户名是否为空，为空返回fasle
		if($('#user').val() == ""){
			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
			return false;
		}
		//验证用户名长度是否满足要求（用户名为4~16个字符）,不满足返回false;
		if($('#user').val().length < 4 || $('#user').val().length > 16){
			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>用户名为4~16个字符</b></font>");
			return false;
		}else{
			$('#user').focus().css({
				border: "1px solid #d7d7d7",
				boxShadow: "none"
			});
			$('#userCue').html("<font>快速注册请注意格式</font>");
		}
		//验证密码长度是否满足要求（密码不小于6位），不满足返回false
		if($('#passwd').val().length < pwdmin){
			$('#passwd').focus();
			$('#userCue').html("<font color='red'><b>密码不能小于"+ pwdmin +"位</b></font>");
			return false;
		}
		//验证两次输入的密码是否一致，不满足返回false
		if($('#passwd2').val() !=$('#passwd').val()){
			$('#passwd2').focus();
			$('#userCue').html("<font color='red'><b>两次密码不一致！</b></font>");
			return false;
			}
			//使用正则表达式验证QQ号码格式是否正确
			var sqq = /^[1-9]{1}[0-9]{4,9}$/;
			//
			if (!sqq.test($('#qq').val())||$('#qq').val().length < 5||$('#qq').val().length > 12) {
				$('#qq').focus().css({
					border: "1px solid red",
					boxShadow: "0 0 2px red"
				});
				$('#userCue').html("<font color='red'><b>×QQ号码格式不正确</b></font>");
				return false;
			}else{
				$('#qq').css({
					border: "1px solid #D7D7D7",
					boxShadow: "none"
				});
			}
			//
			$('#regUser').submit();
	});
});