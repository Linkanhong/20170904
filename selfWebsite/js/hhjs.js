// JavaScript Document
$(function(){	
	var num=0;
	var num02=0;
	var num03=0;
	var timer=null;
	var timer02=null;
	var timer03=null;
	var timer04=null;
	
	$('.s1').removeClass('no');

	//点击
	$('.gps li').click(function(e) {
		var index=$(this).index();
        $(this).stop().addClass('current').siblings().removeClass();		
		$('.doc').animate({top:-100*index+'%'})
		$('.doc>div').stop().eq(index).removeClass('no').siblings().addClass('no')
		num	=index;
		
/*		if(index==1){ 
		
			$('.tiao li').css('background','red');
			$('.gps li').css('border-color','red');
			$('.gps li.current').css('color','red');
			
		}else{	
			$('.tiao li').css('background','#fff');
			$('.gps li').css({'border-color':'#ccc'})
			$('.gps li.current').css('color','#ccc');
		}
*/    });
	
	//滑动
	$(document).mousewheel(function(e,d){
		clearTimeout(timer);
		timer=setTimeout(function(){	
			num-=d;
			if(num>6){num=6}
			if(num<0){num=0}
			$('.gps li').eq(num).addClass('current').siblings().removeClass();	
			$('.doc').animate({top:-100*num+'%'})	
			$('.doc>div').eq(num).removeClass('no').siblings().addClass('no')
		},300)
	})
	
	var wow = new WOW(
	  {
	    boxClass:     'wow',      
	    animateClass: 'animated', 
	    offset:       50,          
	    mobile:       true,       
	    live:         true,       
	  }
	);
	wow.init();
	
	//鼠标跟随
	$(document).mousemove(function(e) {
		var x = e.pageX+10;
		var y = e.pageY+10;
		$('.gs').css({left:x,top:y})
    });
		
		
	//首屏
	
	
	//banner
(function(){
		var shijian = 500;
		var jiangeshijian = 3000;  
		var nowimg = 2;
		var lock = false;
		var mytimer = 0;
	
		var s0 = {"width":248, "height":131, "top":100, "left": -62,"opacity":0}
		var s1 = {"width":493, "height":224, "top":44,  "left": 53,"opacity":1}
		var s2 = {"width":639, "height":270, "top":21,  "left": 186,"opacity":1}
		var s3 = {"width":493, "height":224, "top":44,  "left": 459,"opacity":1}
		var s4 = {"width":248, "height":131, "top":100, "left": 793,"opacity":0}
	
		 zidong();
		 function zidong(){
			 window.clearInterval(mytimer);
			 mytimer = window.setInterval(
				 function(){
					 $(".rightbut").trigger("click");
				 }
			 ,jiangeshijian);
		 }
	
		 $(".youku").mouseenter(
			 function(){
				 window.clearInterval(mytimer);
			 }
		 );
	
		 $(".youku").mouseleave(zidong);
	
		 $(".rightbut").click(
			 function(){
				 if(!$(".images ul li").is(":animated") || lock){
					 if(nowimg < $(".images ul li").length - 1){
						 nowimg = nowimg + 1;
					 }else{
						 nowimg = 0;
					 }
					 $(".xiaoyuandian ul li").eq(nowimg).addClass("cur01").siblings().removeClass("cur01");
	
					 $(".no1").animate(s0,shijian);
					 $(".no2").animate(s1,shijian);
					 $(".no3").animate(s2,shijian);
					 $(".no4").animate(s3,shijian);
					 $(".no0").css(s4);
	
					 $(".no3 .zhezhao").animate(
						 {
							 "opacity":0
						 },shijian
					 );
					 $(".no2 .zhezhao").animate(
						 {
							 "opacity":0.6
						 },shijian
					 );
	
					 $(".no0").attr("class","denghou");
					 $(".no1").attr("class","no0");
					 $(".no2").attr("class","no1");
					 $(".no3").attr("class","no2");
					 $(".no4").attr("class","no3");
	
					 if($(".no3").next().length != 0){
						 $(".no3").next().attr("class","no4");
					 }else{
						 $(".images ul li:first").attr("class","no4");
					 }
					 $(".no4").css(s4);                  
				 }
			 }
		 );
	
		 $(".leftbut").click(
			 function(){
				 if(!$(".images ul li").is(":animated") || lock){
					 
					 if(nowimg > 0){
						 nowimg = nowimg - 1;
					 }else{
						 nowimg = $(".images ul li").length - 1;
					 }
					 $(".xiaoyuandian ul li").eq(nowimg).addClass("cur01").siblings().removeClass("cur");
	
					 $(".no0").animate(s1,shijian);
					 $(".no1").animate(s2,shijian);
					 $(".no2").animate(s3,shijian);
					 $(".no3").animate(s4,shijian);
					 $(".no4").css(s0);
	
					 $(".no1 .zhezhao").animate(
						 {
							 "opacity":0
						 },shijian
					 );
					
					 $(".no2 .zhezhao").animate(
						 {
							 "opacity":0.6
						 },shijian
					 );
	
					 $(".no4").attr("class","denghou");
					 $(".no3").attr("class","no4");
					 $(".no2").attr("class","no3");
					 $(".no1").attr("class","no2");
					 $(".no0").attr("class","no1");
					 if($(".no1").prev().length != 0){
						 $(".no1").prev().attr("class","no0");
					 }else{
						 $(".images li:last").attr("class","no0");
					 }
					 $(".no0").css(s0);
				 }
			 }
		 );
	
		 $(".xiaoyuandian ul li").click(
			 function(){
				 lock = true;
				 shijian = 100;
	
				 if($(this).index() > nowimg){
					 var cishu = $(this).index() - nowimg;
					 for(var i = 1 ; i <= cishu ; i = i + 1){
						 $(".rightbut").trigger("click");
					 }
				 }else{
					 var cishu = nowimg - $(this).index();
					 for(var i = 1 ; i <= cishu ; i = i + 1){
						 $(".leftbut").trigger("click");
					 }
				 }
	
				 lock = false;
				 shijian = 500;
				 nowimg = $(this).index();
				 $(".xiaoyuandian ul li").eq(nowimg).addClass("cur01").siblings().removeClass("cur01");
			 }
		 );
	})();
	
	
	//icon
	function icon(){
		clearInterval(timer02);
		timer02=setInterval(function(){	
			num02-=3
			if(num02<-2750){num02=0}
			$('.ul04').css({marginLeft:num02})
		
		},30)
	}
	icon();
	$('.ul04 li').hover(function(){	
		clearInterval(timer02);
		$(this).siblings().stop().fadeTo(300,0.5);
		$(this).css({transform:'scale(1.5,1.5)'}).siblings().css({transform:'scale(1,1)'});
	},function(){	
		icon();
		$(this).siblings().stop().fadeTo(300,1);
		$('.ul04 li').css({transform:'scale(1,1)'})
	})
	
	//app
	$('.ul05 li').each(function(index, element) {
		var ds=index*45
		$(element).css({ transform:'rotateY('+ds+'deg) translateZ(300px)' })
	})
	
	$('.ul05 li div').each(function(index, element) {
		var lis=index+35
		$(element).css('background','url(images/'+lis+'.png) no-repeat')
	})	
	$('.ul05 li span').each(function(index, element) {
		var span=index+44
		$(element).css('background','url(images/'+span+'.png) no-repeat')
	})	
	
	//web
	function web(){	
		clearInterval(timer03)
		timer03=setInterval(function(){	
			num03++;
			if(num03>1){ num03=0}
			$('.web ul').css({left:-1068*num03},3000)
		},3000)
	}
	web();
	$('.web area').hover(function(){	
		clearInterval(timer03);
	},function(){	
		web();
	})
	
	//myself
	
	
	
	
})