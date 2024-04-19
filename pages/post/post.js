// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

Component({
    /**
     * 组件的属性列表
     */
    properties: {
      tabbar: {
        type: Object,
        value: {
          "backgroundColor": "#fff2d9",
          "color": "#979795",
          "selectedColor": "#e5bb69",
          "list": [
            {
              "pagePath": "/pages/index/index",
              "iconPath": "icon/icon_home.png",
              "selectedIconPath": "icon/icon_home_HL.png",
              "text": "首页"
            },
            {
              "pagePath": "/pages/middle/middle",
              "iconPath": "icon/icon_release.png",
              "isSpecial": true,
              "text": "发布"
            },
            {
              "pagePath": "/pages/mine/mine",
              "iconPath": "icon/icon_mine.png",
              "selectedIconPath": "icon/icon_mine_HL.png",
              "text": "我的"
            }
          ]
        }
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      isIphoneX: true
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
  
    }
  })