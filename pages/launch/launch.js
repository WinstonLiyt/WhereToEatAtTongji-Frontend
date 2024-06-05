// pages/launch/launch.js
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
    this.setData({
      myTimer: setInterval(() => {
        let role = wx.getStorageSync('role')
        if(role == "student")
          wx.switchTab({url:'/pages/browse/store_list/store_list'})
        else if(role == "store")
          wx.switchTab({url:'/pages/personal/personal'})
        else
          wx.switchTab({url:'/pages/administrator/user_list/user_list'})
      }, 2000)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(this.data.myTimer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.myTimer)
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