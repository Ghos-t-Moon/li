$(function () {
	//注册时的Ajax请求
	//单击注册按钮时，将密码进行MD5加密，赋给隐藏的input框
	$('#regUser').on('submit', function () {
		$('#hpwd').val($.md5($('#passwd').val()));
	});
	//注册时发送Ajax请求
	$('#regUser').ajaxForm({
		//请求地址
		url: 'http://localhost/wed/php/registUser.php',
		//数据提交方式
		type: 'post',
		//发送给后台的数据
		data: $('#regUser').serialize(),
		//期待后端返回的数据格式
		dataType: 'json',
		//请求成功时回调函数
		success: function (data) {
			//注册成功时
			if (data['result'] == 'success') {
				alert('恭喜你：用户' + data['username'] + ',注册成功！');
				//刷新页面，进行登录
				window.location.reload();
				//用户名存在时，注册失败
			} else if (data['result'] == 'username is exist') {
				alert('用户：' + data['username'] + '已存在，请重新注册!');
			} else {
				//后端数据插入失败
				alert('未知原因，注册失败');
			}
		},
		//请求失败时回调函数
		error: function (err) {
			console.log(err)
			alert('请求失败！');
		}
	});
	//登录时的Ajax请求
	//单击登录按钮时，将密码进行MD5加密，赋给隐藏的input框
	$('#login_form').on('submit', function () {
		$('#lhpwd').val($.md5($('#p').val()));
	});
	//登录时发送Ajax请求
	$('#login_form').ajaxForm({
		url: 'http://localhost/wed/php/login.php',
		type: 'post',
		data: $('#login_form').serialize(),
		dataType: 'json',
		//请求成功时回调函数
		success: function (data) {
			//后台比对密码成功时
			if (data['result'] == 'success') {
				alert('用户:' + data['username'] + ',登录成功！');
				//跳转到“党史学习教育网”首页
				window.location.href = 'http://localhost/wed/html/index.html';
			} else {
				//不存在用户名或密码错误时
				alert('用户名或密码错误')
			}
		},
		//请求失败时回调函数
		error: function (err) {
			alert('请求失败')
		}
	});
});	