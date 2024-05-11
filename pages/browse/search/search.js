// pages/browse/food_page/search.js
const { tjRequest } = require('../../../utils/util');

Page({
  data: {
    fail:null,
    store_fail:null,
    food_fail:null,
    store:true,
    name:"",
    storelist:null,
    foodlist:null,
    base_url:"http://1.92.154.154:80",
  },
  storebtn:function(options){
    this.setData({
      store: true,
    });
  },
  dishesbtn:function(options){
    this.setData({
      store: false,
    });
  },
  next_store:function(options){
    wx.navigateTo({
      url: '/pages/browse/store_page/store_page?id=' + options.mark.storeid
    })
  },
  next_dishes:function(options){
    wx.navigateTo({
      url: '/pages/browse/food_page/food_page?storeid=' + options.mark.storeid +'&foodid=' + options.mark.foodid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var name = options.name;
    //获取筛选信息
    const option = {
      url: '/search/' + name,
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data['dishes'].length);
        console.log(res.data['rests'].length);
        this.setData({
          name:name,
          storelist:res.data['rests'],
          foodlist:res.data['dishes'],
          store_fail:res.data['rests'].length == 0,
          food_fail:res.data['dishes'].length == 0,
          fail:res.data['rests'].length == 0&&res.data['dishes'].length == 0
        })
        console.log(this.data.store_fail);
        console.log(this.data.food_fail);
      }).catch(error => {
        // 请求失败的处理逻辑
        console.error('请求用户个人信息失败：', error);
    });

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
