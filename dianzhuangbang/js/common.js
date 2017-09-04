$(function(){
	//发送验证码倒计时
	(function(){
		var timer=null;
		var second=60;
		$('.send').click(function(){
				clearInterval(timer)
				timer=setInterval(function(){
				second=second-1;
				if(second==0){
					$('.send').css({'color':'#f6933c','background':'#f9e5c7'});
					$('.send').html('获取验证码');
					clearInterval(timer)
					second=60;
				}else{
					$('.send').css({'color':'#d3d3d3','background':'#eee','border':'none'});
					$('.send').html(second+'秒后重发');
				}
			},1000)	
		})	
	})();



})
