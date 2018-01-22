//picture.js
//获取应用实例
const app = getApp()

Page({
  data: {
    Rurl:"/images/addpicture.png"
  },
  //事件处理函数
  addPicture: function(){
  		var that= this;
		wx.chooseImage({
		  count: 1, // 默认9
		  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		  success: function (res) {
		    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
		    var tempFilePaths = res.tempFilePaths[0];
		    that.setData({
		    	Rurl:tempFilePaths
		    })
		    // that.data.Rurl = tempFilePaths;
		    // console.log(that.data.Rurl)

		  }
		})
  }

})
