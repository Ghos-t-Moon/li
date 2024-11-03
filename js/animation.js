//获取图片列表
var arrImg = document.getElementById('imglist').children;
//获取序列号
var arrBtn = document.getElementById('btn-group').children;
//定义初始化图片引索及相关变量
var imgIndex = 0, oldImg,newImg,num,$radyTimeout,$bbTimeout;
ready();
//运动前准备两张图的方法
function ready(){
	oldImg = arrImg[imgIndex];
	imgIndex++;
	if(imgIndex > arrImg.length - 1){//当图片索引自增至大于最大索引时，索引值设置为0
		imgIndex = 0;
	}
	newImg = arrImg[imgIndex];
	oldImg.style.left = 0;
	oldImg.style.zIndex = "2";
	newImg.style.zIndex = "2";
	newImg.style.left = "620px";
	num = 0;//初始化运动值
	clearTimeout($radyTimeout);
	$radyTimeout = setTimeout(function(){
		move();
		setSelected();
	}, 5000);
}
//图片轮播方法
function move(){
	num += 5;
	oldImg.style.left = -num + 'px';
	newImg.style.left = 620 - num + 'px';
	if(num < 620){
		$bbTimeout = setTimeout('move()' , 13);
	} else{
		ready();
	}
}
//单击序号，切换图片
for(var i = 0;i < arrBtn.length; i++){
	arrBtn[i].onclick = function(){
		clearTimeout($bbTimeout);
		oldImg.style.left = 0;
		newImg.style.left = 0;
		oldImg.style.zIndex = '1';
		newImg.style.zIndex = '1';
		imgIndex = Number(this.innerHTML) - 1;
		setSelected();
		ready();
	}
}
//序号跟随图片
function setSelected(){
	for(var i = 0; i < arrBtn.length; i++){
		if(i == imgIndex){
			arrBtn[i].className = 'act';
		} else{
			arrBtn[i].className = '';
		}
	}
}
//单击“右”方向触发事件并处理
document.getElementById('btn-right').onclick = function(){
	clearTimeout($bbTimeout);
	oldImg.style.left = 0;
	newImg.style.left = 0;
	oldImg.style.zIndex = "1";
	newImg.style.zIndex = "1";
	setSelected();
	ready();
}
//单击“左”方向触发事件并处理
document.getElementById('btn-left').onclick = function(){
	clearTimeout($bbTimeout);
	oldImg.style.left = 0;
	newImg.style.left = 0;
	oldImg.style.zIndex = "1";
	newImg.style.zIndex = "1";
	//运动时，单击“左”要-1
	if(num != 0){
		imgIndex--;
		if(imgIndex < 0){
			imgIndex = arrImg.length - 1;
		}
		console.log(imgIndex)
	}
	//静止时，单击“左”要-2
	if(num == 0){
		imgIndex -= 2;
		if(imgIndex < 0){
			imgIndex = imgIndex + arrImg.length;
		}
	}
	setSelected();
	ready();
}