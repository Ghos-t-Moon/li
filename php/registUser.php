<?php
//获取前端发送的数据：控件名分别为username、hpwd、qq的值
$username = $_REQUEST['user'];
$password = $_REQUEST['hpwd'];
$qq = $_REQUEST['qq'];
//连接数据库，输入MySQL主机名、用户名、密码
$link = mysqli_connect('localhost:3306','root','123456')or die(json_encode(array('result'=>'database connect error')));
//选择要操作的库
mysqli_select_db($link,'my_database')or die(json_encode(array('result'=>'select database error')));
//MySQL查询语句，以从前端获取到的username为条件
$sql_select = "select username from user_info where username='$username'";
//执行查询
$res = mysqli_query($link,$sql_select);
//判断用户是否存在
if(mysqli_fetch_assoc($res)!=null){
	//查询结果为空，则表示用户名已存在
	echo json_encode(array('result'=>'username is exist','username'=>$username));
}else{
	//查询结果为空，则需要将新用户信息插入到数据库中
	$sql_insert = "insert into user_info(username,password,qq)values('$username','$password','$qq')";
	//执行插入语句
	mysqli_query($link,$sql_insert);
	//判断受影响的行数是否发生变化
	if(mysqli_affected_rows($link)>0){
		//插入新用户信息成功，返回JSON格式数据
		echo json_encode(array('result'=>'success','username'=>$username));
	}else{
		echo json_encode(array('result'=>'insert username error'));
	}
}
//关闭数据库连接
mysqli_close($link);