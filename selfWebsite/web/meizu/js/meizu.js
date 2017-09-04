$(function(){
	var wow = new WOW(
	  {
	    boxClass:     'wow',      // 动画元素的CSS类 (默认类名 wow)
	    animateClass: 'animated', // 动画CSS类 (默认类名 animated)
	    offset:       200,          //距离可视区域多少开始执行动画(默认值 0)
	    mobile:       true,       //是否在移动设备上执行动画(默认值 true)
	    live:         true,       //异步加载的内容是否有效(默认值 true)
	  }
	);
	wow.init();

})