// food_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { tjRequest } = require('../../../utils/util');
Page({
  data: {
    foodId:null,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/statics/pic_tool/star0.png',//未选中状态
    selectedSrc: '/statics/pic_tool/star.png',//选中状态
    key: 0,//评分
    user_input:"",
    date:"",
    storeId:null,
    food:null,
    comment:null,
    base_url:"http://1.92.154.154:80",
  },

  selectServer: function (e) {//服务态度评分
    var key = e.currentTarget.dataset.key
    if (this.data.key == 1 && e.currentTarget.dataset.key == 1) {//当有一颗星的时候再次点击取消选中
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
        key: key
    })
  },
  user_content:function(e){
    //这个地方还可以改成表单提交进行优化
    this.setData({
      user_input: e.detail.value
    })
  },
  confirm_content:function(e){
    if(this.data.user_input == ""){
      wx.showToast({
        title: '评价不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if(this.data.key == 0){
      wx.showToast({
        title: '评分不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      //提交菜品评价信息
      const option_2 = {
        url: '/eval/1/'+ this.data.foodId + '/create/',
        method: 'post', // 请求方法，默认为 'get'
        data: {
          score: this.data.key,
          comment: this.data.user_input,
        },
      };
      // 调用 tjRequest 函数发起请求
      tjRequest(option_2).then(
        res => {
          console.log('Success:', res.data);
        }).catch(error => {
          // 请求失败的处理逻辑
          console.error('请求用户个人信息失败：', error);
      })
      wx.redirectTo({
        url: '/pages/browse/food_page/food_page?storeid=' + this.data.storeId +'&foodid=' + this.data.foodId
      })
    }
  },
  onLoad:function(options){
    var storeId = options.storeid;
    var foodId = options.foodid;

    //获取菜品信息
    const option = {
      url: '/dish/'+ foodId,
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
          food:res.data,
        })
      }).catch(error => {
        // 请求失败的处理逻辑
        console.error('请求用户个人信息失败：', error);
    })
    
    //获取菜品评价信息
    const option_2 = {
      url: '/dish/'+ foodId + '/eval',
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option_2).then(
      res => {
        console.log(res.data);
        this.setData({
          comment:res.data,
        })
      }).catch(error => {
        // 请求失败的处理逻辑
        console.error('请求用户个人信息失败：', error);
    })
    this.setData({
      foodId:foodId,
      storeId:storeId,
    });
  }
},
)