//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl:[
    "/images/wx.png",
    "/images/businessCar.png",
    "/images/text.png",
    "/images/website.png",
    "/images/picture.png"
    ],
    document:`手游秩序都终归于混沌，
    所有火焰都将熄灭，
    所有变异都趋于平淡，
    所有结构都终将自行消亡`,
    texts:[
      {name:"文本",src:"/images/text.png"},
      {name:"网址",src:"/images/website.png"},
      {name:"图片",src:"/images/picture.png"},
      {name:"名片",src:"/images/businessCar.png"},
    ],
    Rurl:[
    "/pages/text/text",
    "/pages/website/website",
    "/pages/picture/picture",
    "/pages/businessCar/businessCar",
    ]         
  },
  //事件处理函数
  RnavigateTo: function(ev){
    // console.log(this.data.Rurl[ev.currentTarget.dataset.index])
    wx.navigateTo({
      url: this.data.Rurl[ev.currentTarget.dataset.index]
    })
  }

})
