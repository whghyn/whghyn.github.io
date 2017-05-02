/*
 * 当前游戏用于游戏的主逻辑
 * 
 * 
 */
var board = new Array();
//设置游戏分数-连续按对多少个黑色的方块
var score=0;//正确次数
var timerun = 0.000;//计时
var t;

$(function(){
	//该函数用于完成游戏初始化
	init();
})
;
//该函数用于完成游戏初始化
function init(){
	//获取HTML页面中的12个<div>元素（4行3列 ）
	//遍历4遍，表示4行
	for(var i=0;i<4;i++){//i从0到3
		board[i]=new Array();
		//遍历3遍，表示3列
		for(var j=0; j<3; j++){//j从0到2
		  //board[i][j]二维数组表示4行3列
		  //设置12个白色的方块（棋盘）
		  var $grid = $("#grid-"+i+"-"+j);
		  $grid.css({
		  	"top":(i*100)+"px",
		  	"left":(j*100)+"px"
		  });
		  
		  //生成12个黑色的方块（棋子）
		  //将12个黑色的方块添加到游戏容器中
		  $("#box_container").append($("<div class='block' id='block-"+i+"-"+j+"'></div>"));
		  var $block = $("#block-"+i+"-"+j);
		  $block.css({
		  	"top":(i*100)+"px",
		  	"left":(j*100)+"px"
		  });
		  //将12个黑色的方块的初始化为0，表示不显示
		  board[i][j] = 0;
		}
	}
	//每行随机显示一个黑色的方块
	//每一行随机显示一个黑色方块
	for(var i=0;i<4;i++)//遍历四遍
	{
		//随机生成三列中的位置：0,1,2
		var randy=Math.floor(Math.random()*3);
		//判断当前位置的黑色方块的上一行同一列是否也是黑色
		if(i>0&&board[i-1][randy]==1){
			 randy=Math.floor(Math.random()*3);
		}
		//根据随机位置获取对应棋子的<div>元素
		var $block = $("#block-"+i+"-"+randy);
		//将其显示出来
		$block.css("background-color","#000");
		//将显示的黑色的方块的值修改为1，表示显示
		board[i][randy]=1;
	}
	//最后一行的3个方块中，输入文字提示
	$("#block-3-0").text("按J开始");
	$("#block-3-1").text("按K开始");
	$("#block-3-2").text("按L开始");
}
//绑定键盘事件
   
 $(document).keydown(function(event){
   	 
   	//键盘JKL-event.keyCode
   	switch(event.keyCode){
   		case 74://J
   		//判断用户输入的键盘值是否是正确的
   		if(board[3][0]==1 ){
   			//正确-判断当前是第一次输入
   			if(score==0){
   				//第一次输入-游戏开始
   				//1.计时器开始计时
   				timeRun();
   				//2.向下移动
   				moveDown();
   				//清空提示信息
   				$("#block-3-0").text("");
   				$("#block-3-1").text("");
   				$("#block-3-2").text("");
   			}else{
   				//不是第一次输入
   				//判断当前输入是否为50次
   				if(score==30){
   					//gameover
   					gameover();
   				}else{
   					//向下移动
   				moveDown();
   				}
   				
   			}
   		}else{
   			//错误-gameover
   			gameover();
   		}
   		break;
   		case 75:
   		//判断用户输入的键盘值是否是正确的
   		if(board[3][1]==1 ){
   			//正确-判断当前是第一次输入
   			if(score==0){
   				//第一次输入-游戏开始
   				//1.计时器开始计时
   				timeRun();
   				//2.向下移动
   				moveDown();
   				//清空提示信息
   				$("#block-3-0").text("");
   				$("#block-3-1").text("");
   				$("#block-3-2").text("");
   			}else{
   				//不是第一次输入
   				//判断当前输入是否为50次
   				if(score==30){
   					//gameover
   					gameover();
   				}else{
   					//向下移动
   				moveDown();
   				}
   				
   			}
   		}else{
   			//错误-gameover
   			gameover();
   		}//K
   		break;
   		case 76:
   		//判断用户输入的键盘值是否是正确的
   		if(board[3][2]==1 ){
   			//正确-判断当前是第一次输入
   			if(score==0){
   				//第一次输入-游戏开始
   				//1.计时器开始计时
   				timeRun();
   				//2.向下移动
   				moveDown();
   				//清空提示信息k
   				$("#block-3-0").text("");
   				$("#block-3-1").text("");
   				$("#block-3-2").text("");
   			}else{
   				//不是第一次输入
   				//判断当前输入是否为50次
   				if(score==30){
   					//gameover
   					gameover();
   				}else{
   					//向下移动
   				moveDown();
   				}
   				
   			}
   		}else{
   			//错误-gameover
   			gameover();
   		}//L
   		break;
   	}
  
   });
   
  //该函数 用于计时器开始计时
  function timeRun(){
  	//1.计时器累加
  	timerun+=0.001;//累计有问题
  	//2.写入HTML页面对应的元素中
  	$("#time_box>span").text(timerun.toString().substr(0,5));
  
  	//3.设置计时器
  	 t = setTimeout("timeRun()",1);
  }
  
//该函数用于向下移动
function moveDown(){
	//1.第一行、第二行及第三行黑色的方块整体向下移动一行
	for(var i = 3; i>=0; i--){//遍历四行
		for(var j = 2;j>=0;j--){//遍历三列
		 if(i==3){//表示第四行
		 	//整个第四行的棋子的背景颜色修改为白色
		 	$("#block-"+i+"-"+j).css("background-color","#fff");
		 	//board对应元素=0
		 	board[i][j] = 0;	
		 }else{//表示第三行
		 	//判断哪个方块是黑色的
		 	if(board[i][j]==1){
		 		//将当前黑色方块的下一行同一列的背景颜色设置为黑色
		 		$("#block-"+(i+1)+"-"+j).css("background-color","#000");
		 		//board对应元素=1
		 		board[i+1][j]=1;
		 		//将当前黑色方块的背景颜色修改为白色
		 		$("#block-"+(i)+"-"+j).css("background-color","#fff");
		 		//board对应元素=0
		 		board[i][j]=0;
		 	}
		 }   
		}
	}
	
	//2.第一行重新随机生成一个黑色的方块
	var randy = Math.floor(Math.random()*3);
	$("#block-0-"+randy).css("background-color","#000");
	board[0][randy] = 1;
	
	//游戏分数累加
	score++;
	
}

//该函数用于结束游戏
function gameover(){
	//1.计时器停止
	clearTimeout(t);
	//2.完成gameover的页面提示
	 $("#box_container").append($("<div id='gameover' class='gameover'><p>本次用时</p><span>"+timerun.toString().substr(0,5)+"秒</span><a href='javascript:restartgame();'id= 'restartgamebutton'>Restart</a></div>"));
	 
	 var gameover=$("#gameover");
	 gameover.css({
	 	"width":300+"px",
	 	"height":400+"px",
	 	"background":"rgba(0,0,0,0.5)"
 });
}
// 该函数用于游戏重新开始
function restartgame(){
	//1.将gameover显示内容清除 
	$("#gameover").remove();
	//2.计时器重置为0.000
	$("#time_box").html("<span>0.000</span>秒");
	//3.游戏分数清0
	score=0;
	//4.将黑色方块清除
	$(".block").remove();
	//5.init()方法
	init();
	
	
}
