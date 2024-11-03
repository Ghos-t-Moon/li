<?php
//获取前端发送的数据：控件名分别为username、lhpwd的值
$username = $_REQUEST['username'];
$password = $_REQUEST['lhpwd'];
//链接MySQL数据库，输入MySQL主机名、用户名、密码
$link = mysqli_connect('localhost:3306','root','123456') or die(json_encode(array('result'=>'database connect error')));
// 选择要操作的库
mysqli_select_db($link,'my_database')or die(json_encode(array('result'=>'select database error')));
//MySQL查询语句，以从前端获取到的username条件
$sql_select = "select password from user_info where username='$username'";
//执行查询
$res = mysqli_query($link,$sql_select);
//判断用户名是否存在
if(mysqli_fetch_assoc($res)== null){
	//查询结果为空，则表示该用户不存在
	echo json_encode(array('result'=>'username is not exist'));
}else{
	//再次执行查询
	$res = mysqli_query($link,$sql_select);
	//通过while循环将查询结果依次赋给$pwd
	while ($pwd=mysqli_fetch_assoc($res)){
		//比对从数据库取到的密码与前端返回的密码是否一致
		if($pwd['password']==$password){
			//比对成功，返回JSON格式数据
			echo json_encode(array('result'=>'success','username'=>$username,'password'=>$password));
		}else{
			//比对失败，返回JSON格式数据
			echo json_encode(array('result'=>'password error'));
		}
	}
}
//关闭数据库链接
mysqli_close($link);