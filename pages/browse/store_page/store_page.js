// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { tjRequest } = require('../../../utils/util');
Page({
  data: {
    storeid:0,
    store:null,
    foodlist:null,
    base_url:"http://1.92.154.154:80",
  },
  next_calculator:function(options){
    wx.navigateTo({
      url: '/pages/browse/food_page/food_page?storeid=' + this.data.storeid +'&foodid=' + options.mark.foodid
    })
  },
  onLoad:function(options){
    var secondId = options.id;

    //获取菜品信息
    const option = {
      url: '/restaurant/'+ secondId + '/all_dish',
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
          foodlist:res.data
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })

    //获取店铺信息
    const option_2 = {
      url: '/restaurant/'+ secondId,
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option_2).then(
      res => {
        console.log(res.data);
        this.setData({
          store:res.data
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })
  }
}
)