/**
 * 
 * @authors Payeng
 * @date    2017-04-15 14:13:25
 * @version V1.0.0
 */

/*
 * 使用说明:
 * window.wxc.Pop(popHtml, [type], [options])
 * popHtml:html字符串
 * type:window.wxc.xcConfirm.typeEnum集合中的元素
 * options:扩展对象
 * 用法:
 * 1. window.wxc.xcConfirm("我是弹窗<span>lalala</span>");
 * 2. window.wxc.xcConfirm("成功","success");
 * 3. window.wxc.xcConfirm("请输入","input",{onOk:function(){}})
 * 4. window.wxc.xcConfirm("自定义",{title:"自定义"})
 * 5.  // info/confirm/warning/error/success
 *   window.wxc.xcConfirm("我是弹窗<span>lalala</span>",window.wxc.xcConfirm.typeEnum.success,{onOk: function(){
*							console.log(1231232)
*						}})
 */
(function($){
	window.wxc = window.wxc || {};
	window.wxc.xcConfirm = function(popHtml, type, options) {
	    var btnType = window.wxc.xcConfirm.btnEnum;
		var eventType = window.wxc.xcConfirm.eventEnum;
		var popType = {
			info: {
				title: "信息",
				icon: "0 0",//蓝色i
				btn: btnType.ok
			},
			success: {
				title: "成功",
				icon: "0 -48px",//绿色对勾
				btn: btnType.ok
			},
			error: {
				title: "提醒",
				icon: "-48px -48px",//红色叉
				btn: btnType.ok
			},
			confirm: {
				title: "提示",
				icon: "-48px 0",//黄色问号
				btn: btnType.okcancel
			},
			warning: {
				title: "警告",
				icon: "0 -96px",//黄色叹号
				btn: btnType.okcancel
			},
			input: {
				title: "输入",
				icon: "",
				btn: btnType.ok
			},
			custom: {
				title: "",
				icon: "",
				btn: btnType.ok
			}
		};
		var itype = type ? type instanceof Object ? type : popType[type] || {} : {};//格式化输入的参数:弹窗类型
		var config = $.extend(true, {
			//属性
			title: "", //自定义的标题
			icon: "", //图标
			btn: btnType.ok, //按钮,默认单按钮
			//事件
			onOk: $.noop,//点击确定的按钮回调
			onCancel: $.noop,//点击取消的按钮回调
			onClose: $.noop//弹窗关闭的回调,返回触发事件
		}, itype, options);
		
		var $txt = $("<p>").html(popHtml);//弹窗文本dom
		var $tt = $("<span>").addClass("tt").text(config.title);//标题
		var icon = config.icon;
		var $icon = icon ? $("<div>").addClass("bigIcon").css("backgroundPosition",icon) : "";
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("xcConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("xc_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗顶部区域
		var $txtBox = $("<div>").addClass("txtBox");//弹窗内容主体区
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("确定");//确定按钮
		var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
		var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<a>").addClass("clsBtn");//关闭按钮
		
		//建立按钮映射关系
		var btns = {
			ok: $ok,
			cancel: $cancel
		};
		
		init();
		
		function init(){
			//处理特殊类型input
			if(popType["input"] === itype){
				$txt.append($input);
			}
			
			creatDom();
			bind();
		}
		
		function creatDom(){
			$popBox.append(
				$ttBox.append(
					$clsBtn
				).append(
					$tt
				)
			).append(
				$txtBox.append($icon).append($txt)
			).append(
				$btnArea.append(creatBtnGroup(btn))
			);
			$box.attr("id", popId).append($layer).append($popBox);
			$("body").append($box);
		}
		
		function bind(){
			//点击确认按钮
			$ok.click(doOk);
			
			//回车键触发确认按钮事件
			$(window).bind("keydown", function(e){
				if(e.keyCode == 13) {
					if($("#" + popId).length == 1){
						doOk();
					}
				}
			});
			
			//点击取消按钮
			$cancel.click(doCancel);
			
			//点击关闭按钮
			$clsBtn.click(doClose);
		}

		//确认按钮事件
		function doOk(){
			var $o = $(this);
			var v = $.trim($input.val());
			if ($input.is(":visible"))
		        config.onOk(v);
		    else
		        config.onOk();
			$("#" + popId).remove(); 
			config.onClose(eventType.ok);
		}
		
		//取消按钮事件
		function doCancel(){
			var $o = $(this);
			config.onCancel();
			$("#" + popId).remove(); 
			config.onClose(eventType.cancel);
		}
		
		//关闭按钮事件
		function doClose(){
			$("#" + popId).remove();
			config.onClose(eventType.close);
			$(window).unbind("keydown");
		}
		
		//生成按钮组
		function creatBtnGroup(tp){
			var $bgp = $("<div>").addClass("btnGroup");
			$.each(btns, function(i, n){
				if( btnType[i] == (tp & btnType[i]) ){
					$bgp.append(n);
				}
			});
			return $bgp;
		}

		//重生popId,防止id重复
		function creatPopId(){
			var i = "pop_" + (new Date()).getTime()+parseInt(Math.random()*100000);//弹窗索引
			if($("#" + i).length > 0){
				return creatPopId();
			}else{
				return i;
			}
		}
	};
	
	//按钮类型
	window.wxc.xcConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&取消
	};
	
	//触发事件类型
	window.wxc.xcConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.wxc.xcConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};

})(jQuery);

// end

//菜单栏加载页面

function PLoad(id,html){
	// $.ajaxSetup ({
	// 	cache: false //关闭AJAX相应的缓存
	// });
	$(id).load( html);
};

PLoad("#mune1","mune1.html");
PLoad("#footer1","footer1.html");
PLoad("#p-user","user.html");

//菜单栏加载页面 end----


$('.p-nav>ul li>a').click(function (){
	$(this).css({background:'none'})
	
});

//验证码刷新
$(".p-validate-img").attr("src","/DZBang_entrance/code.do?t=genTimestamp()?flag="+Math.random()); 
$('.p-validate').click(function(event) {

	$(".p-validate-img").attr("src","/DZBang_entrance/code.do?t=genTimestamp()?flag="+Math.random());

});



//上传图片
 function pocture (file,picture){
	$(file).change(function () {
		if (typeof (FileReader) != "undefined") {
			var dvPreview = $(picture);
			dvPreview.html("");
			var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
			$($(this)[0].files).each(function () {
			    var file = $(this);
			    if (regex.test(file[0].name.toLowerCase())) {
			        var reader = new FileReader();
			        reader.onload = function (e) {
			            var img = $("<img />");
			            img.attr("src", e.target.result);
			            dvPreview.append(img);
			        }
			        reader.readAsDataURL(file[0]);
			    } else {
			    	window.wxc.xcConfirm(file[0].name + " 不是图片类型.",window.wxc.xcConfirm.typeEnum.confirm)
			        // alert(file[0].name + " 不是图片类型.");
			        dvPreview.html("");
			        return false;
			    }
		   });
		} else {
		  alert("格式不支持！");
		}
	});
 };
pocture (".p-file1",".task-img");
pocture (".p2-file1",".task2-img");
pocture (".p2-file2",".task2-img2");
pocture (".p2-file3",".task2-img3");

 function picture (file,picture){
	$(file).change(function () {
		if (typeof (FileReader) != "undefined") {
			var dvPreview = $(picture);
			dvPreview.html("");
			var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
			$($(this)[0].files).each(function () {
			    var file = $(this);
			    if (regex.test(file[0].name.toLowerCase())) {
			        var reader = new FileReader();
			        reader.onload = function (e) {
			            dvPreview.attr("src", e.target.result);
			        }
			        reader.readAsDataURL(file[0]);
			    } else {
			    	window.wxc.xcConfirm(file[0].name + " 不是图片类型.",window.wxc.xcConfirm.typeEnum.confirm)
			        return false;
			    }
		   });
		} else {
		  alert("格式不支持！");
		}
	});
 }; 
 function Ppicture (file,picture){
	$(file).change(function () {
		if (typeof (FileReader) != "undefined") {
			var dvPreview = $(picture);
			dvPreview.html("");
			var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
			$($(this)[0].files).each(function () {
			    var file = $(this);
			    if (regex.test(file[0].name.toLowerCase())) {
			        var reader = new FileReader();
			        reader.onload = function (e) {
			            dvPreview.attr("src", e.target.result);
			        }
			        reader.readAsDataURL(file[0]);
			    } else {
			    	window.wxc.xcConfirm(file[0].name + " 不是图片类型.",window.wxc.xcConfirm.typeEnum.confirm)
			        return false;
			    }
		   });
		} else {
		  alert("格式不支持！");
		}
	});
 };
picture (".p-file4",".task-img2");
picture (".p-file5",".task-img3");
picture (".p-file6",".task-img6");
picture (".p-file7",".task-img7");
picture (".p-file8",".task-img8");
picture (".p-file9",".task-img9");
picture (".p-file10",".task-img10");
picture (".p-file11",".task-img11");
picture (".p-file12",".task-img12");

//验证码刷新
;(function(){
		var timer=null;
		var second=60;
		$('.p-send').click(function(){
				clearInterval(timer)
				timer=setInterval(function(){
				second=second-1;
				if(second==0){
					$('.p-send').css({'color':'#fff','background':'#337ab7'});
					$('.p-send').html('获取验证码');
					clearInterval(timer)
					second=60;
				}else{
					$('.p-send').css({'color':'#d3d3d3','background':'#eee','border':'none'});
					$('.p-send').html(second+'秒后重发');
				}
			},1000)	
		})	
})();
;(function(){
		var timer=null;
		var second=60;
		$('.p-send2').click(function(){
				clearInterval(timer)
				timer=setInterval(function(){
				second=second-1;
				if(second==0){
					$('.p-send2').css({'color':'#fff','background':'#337ab7'});
					$('.p-send2').html('获取验证码');
					clearInterval(timer)
					second=60;
				}else{
					$('.p-send2').css({'color':'#d3d3d3','background':'#eee','border':'none'});
					$('.p-send2').html(second+'秒后重发');
				}
			},1000)	
		})	
})();
;(function(){
		var timer=null;
		var second=60;
		$('.p-send3').click(function(){
				clearInterval(timer)
				timer=setInterval(function(){
				second=second-1;
				if(second==0){
					$('.p-send3').css({'color':'#fff','background':'#337ab7'});
					$('.p-send3').html('获取验证码');
					clearInterval(timer)
					second=60;
				}else{
					$('.p-send3').css({'color':'#fff','background':'#cacaca','border':'none','text-decoration':'none'});
					$('.p-send3').html(second+'秒后重发');
				}
			},1000)	
		})	
})();

//需求页鼠标移入显示
function PShow(){
	$('.p-hover').hover(function() {
		$(this).children('span').stop().slideDown();
	}, function() {
		$(this).children('span').stop().slideUp();
	});	
};
PShow();


//发布成功页面匹配供应方背景图片遍历
function bg(id){
	var aBg = ['1.png','2.png','3.png','4.png','5.png','6.png'];
	$(id).each(function(index, el) {
		$(this).css({
			background: 'url(img/'+ aBg[index] +')no-repeat',
		});
	});

};
bg(".p-ovh");


//判断是否选择其他邮箱
function ChoiceEmail(){
	var num = 0;
	$(".p-radio").click(function(event) {
		if ( num == 0 ) {
			$(this).attr({checked: 'checked'});
			$(".p-radioEmail").css({display: 'block'});
			num = 1;
		}else if( num == 1 ){
			$(this).removeAttr('checked');
			$(".p-radioEmail").css({display: 'none'});
			num = 0;
		};	
	
	});;
	
};
ChoiceEmail();

// 判断邮箱格式是否真确
function Email(){

	$(".email").blur(function(event) {
		
		if($(".email").val()=="")
		  {
		   $('.p-sub').css({display: 'block'}).html('邮箱不能为空');
		   $(".email").focus(function(event) {
		   });;
		   return false;
		  }
		  var email=$(".email").val();
		  if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/))
		  {
		   $('.p-sub').css({display: 'block'}).html('邮箱格式不对');
		   $(".email").focus();
		  }else{
		  	$('.p-sub').css({display: 'none'});
		  }; 
	});
};
Email();
function Email2(){

	$(".email2").blur(function(event) {
		
		if($(".email2").val()=="")
		  {
		   window.wxc.xcConfirm("请输入邮箱地址",window.wxc.xcConfirm.typeEnum.confirm)
		   return false;
		  }
		  var email=$(".email2").val();
		  if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/))
		  {
		   window.wxc.xcConfirm("请输入正确的邮箱地址",window.wxc.xcConfirm.typeEnum.confirm)
		  }
	});
};
Email2();

//user 侧边栏点击加载class
$(function (){
		function side() {
			$(".p-dl2 dd").click(function() {
				$(this).addClass('p-notice').siblings().removeClass();
			});
		};
		side();	
});

//上传pdf文件
function Pfile(fileId,div){
	//$('fileId').val() filed的全路径
	 var file = $(fileId),aim = $(div);
     file.on('change', function( e ){
         //e.currentTarget.files 是一个数组，如果支持多个文件，则需要遍历
         var name = e.currentTarget.files[0].name;
         aim.after(name);
         // aim.replaceWith( '<input type="file" name="pdfFile" id="pdfFile" accept="application/pdf">'+name+' ');
     });
};
Pfile('#pdfFile','#pdfFile');


//判断密码的长度以及是否相同
// function passWord(){
	 
// 	 $('.p-passWord2').blur(function(event) {
// 		if ($('.p-passWord1').val() !== $('.p-passWord2').val()  ) {
// 			   window.wxc.xcConfirm("密码不一致！",window.wxc.xcConfirm.typeEnum.error,{onOk: function(){
// 					$('.p-passWord2').focus();
// 			}})	;			
// 		}else if ( $('.p-passWord1').val() =="" ) {
// 			$('.p-sub').css({display: 'block'}).html('邮箱不能为空');
// 		};
// 	 });
// };
// passWord();

//首页banner图
;( function(){
function Pchange(Pclass){
	$(Pclass).hover(function() {
		$(this).css({opacity: '1'});
	}, function() {
		$(this).css({opacity: '0.5'});
	});
};
 Pchange(".p-glyphiconLeft");
 Pchange(".p-glyphiconRight");
})();

//注册页判断提示
$(function(){
	$(".p-btnNumber").blur(function(event) {	
		var Pphone = $(".p-btnNumber").val();
		if (Pphone == '') {
			$(".p-sub3").eq(0).css({display: 'block'}).html('手机号码不能为空');
		}else if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(Pphone)) {
			$(".p-sub3").eq(0).css({display: 'block'}).html('手机号码格式不对');
		}else if ( $(".p-btnNumber").val().length !==11 ) {
			$(".p-sub3").eq(0).css({display: 'block'}).html('手机号码格式不对');
		}else {
			$(".p-sub3").eq(0).css({display: 'none'});
		};	
	});
	$(".p-btnNumber2").blur(function(event) {	
		var Pcode = $(".p-btnNumber2").val();
		if (Pcode == '') {
			$(".p-sub3").eq(1).css({display: 'block'}).html('验证码不能为空');
		}else if ( $(".p-btnNumber2").val().length !==6 ) {
			$(".p-sub3").eq(1).css({display: 'block'}).html('验证码格式不对');
		}else {
			$(".p-sub3").eq(1).css({display: 'none'});
		};	
	});
	$(".p-passWord1").blur(function(event) {	
		var PpassWord = $(".p-passWord1").val();
		if (PpassWord == '') {
			$(".p-sub3").eq(2).css({display: 'block'}).html('密码不能为空');
		}else if ( $(".p-passWord1").val().length <6 ) {
			$(".p-sub3").eq(2).css({display: 'block'}).html('密码长度应多于6位且最长为18位');
		}else if ( $(".p-passWord1").val().length >=6 ) {
			$(".p-sub3").eq(2).css({display: 'none'});
		}else {
			$(".p-sub3").eq(2).css({display: 'none'});

		};	
	});
	$(".p-passWord2").blur(function(event) {	
		var Pcode = $(".p-passWord1").val();
		var PpassWord = $(".p-passWord2").val();
		if (PpassWord !== Pcode) {
			$(".p-sub3").eq(3).css({display: 'block'}).html('两次输入密码不一致');
		}else {
			$(".p-sub3").eq(3).css({display: 'none'});
		};	
	});
	$(".p-picYzm").blur(function(event) {	
		var Pcode = $(".p-picYzm").val();
		if (Pcode.length == '') {
			$(".p-sub3").eq(4).css({display: 'block'}).html('图形码不能为空');
		}else{
			$(".p-sub3").eq(4).css({display: 'none'});
		};	
	});
});

//关于我们页面点击事件
$(function (){
	function Pabout(){

		$(".p-padding16>p").click(function (e) {
			$(this).addClass('p-bold').siblings().removeClass();
		});	
		$(".p-padding16>p").eq(0).click(function (e) {
			$(".p-about").css({display:"block"});
			$(".p-contact").css({display:"none"});
		});
		$(".p-padding16>p").eq(1).click(function (e) {
			$(".p-about").css({display:"none"});
			$(".p-contact").css({display:"block"});
		});
	};
	Pabout();
});

//操作指南
$(function (){
	$('.p-ul5>li>a').click(function(event) {
		$(this).parents('li').addClass('p-active2').siblings().removeClass();
	});

	$('.p-lineHeight5').hover(function() {
		$(this).css({color: '#000'});
	}, function() {
		$(this).css({color: '#bebebe'});
	});


});

/*------------- 1.2 -------------*/
//seller-list
$(".p2-pagination li").click(function(event) {
	$(this).addClass('active').siblings().removeClass()
});

//user-information
function p2change(id,name){
	var pnum = 0;
	$(id).click(function(event) {
		if (pnum == 0) {
				$(name).stop().slideDown();
				$(this).val('取消');
				$(this).siblings('img').css({visibility: 'hidden'});
				pnum = 1;	
			
		}else if(pnum == 1){
				$(name).stop().slideUp();
				$(this).val('更换');
				$(this).siblings('img').css({visibility: 'visible'});
				pnum = 0;				
		}
	});

};
p2change(".p2-change",".p2-changePhone");
p2change(".p2-change2",".p2-changeEmail");

function p2change2(){
	$(".p2-change3").click(function(event) {	
				$(".p2-changeEmail").stop().slideUp();
				$('.p2-change2').val('更换');
				$('.p2-change2').siblings('img').css({visibility: 'visible'});	
	});	
	$(".p2-change4").click(function(event) {	
				$(".p2-changePhone").stop().slideUp();
				$('.p2-change').val('更换');
				$('.p2-change').siblings('img').css({visibility: 'visible'});	
	});
};
p2change2();

//导航条事件
function dropdown(){
	$(".c-dropdown").hover(function() {
		$(this).css({background: '#0085d0',color:'#fff'});
	}, function() {
		$(this).css({background: '#e7e7e7'});
		
	});

	$(".c-navicon").parent().mouseover(function(event) {
		$(".c-navicon").attr({src: "img/nav-iconactive.png"});
	}).mouseout(function(event) {
		$(".c-navicon").attr({src: "img/nav-icon.png"});
	});;

	
};
dropdown();

//nav导航条固定
function navFix(){
var top = $('.navbar').offset().top;
$(window).scroll(function(e) {
	  var winT = $(window).scrollTop();
	    
	  if(winT>top){ 
	    $('.navbar').addClass('navbar-fixed-top');
	  }else{  
	    $('.navbar').removeClass('navbar-fixed-top');
	  }
  });

};
navFix();






