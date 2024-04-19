Page({
  data: {
    stores: ['渔小仙', '面霸', '御秦轩', '肯德基', '豪大大鸡排', '萨莉亚', '麦当劳', '吉祥馄饨'],
    dishes: ['黄骨鱼粉', '酸菜鱼粉', '鱼肉粉', '霸气鱼头粉', '辣椒炒肉干拌粉', '永州麻鸭干拌粉', '一碗冰粉', '一碗冰豆花'], // 滚动的文字
    animationData: null // 绑定的动画效果
  },
  // 开始滚动
  startScroll () {
    // 创建一个动画实例
    let animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'ease'
    })
    // 获取元素总高度
    let height =  (this.data.dishes.length - 1) * 250
    var random = Math.floor(Math.random()*this.data.dishes.length) * 250;
    // 向上移动
    animation.translateY(-random + 'rpx').step()
    // 将动画效果赋值
    this.setData({
      animationData: animation.export()
    })
  },
  // 重置
  reset () {
    let animation = wx.createAnimation({
      duration: 0
    })
    this.setData({
      animationData: animation.translateY(0).step().export()
    })
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