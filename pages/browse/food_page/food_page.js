// food_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { tjRequest } = require('../../../utils/util');
Page({
  data: {
    if_login:false,
    foodId:null,
    userID:null,
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
    avatar_url:"http://1.92.154.154:80/media/avatar/",
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
  if_mycomment:function(e){
      //获取用户ID
      const option_3 = {
        url: '/user/getId',
        method: 'get', // 请求方法，默认为 'get'
      };
      // 调用 tjRequest 函数发起请求
      tjRequest(option_3).then(
      res => {
        console.log('Success:', res.data);
        this.setData({
          userID:res.data.id,
          if_login:true,
        })
      }).catch(error => {
        // 请求失败的处理逻辑
        console.error('请求用户个人信息失败：', error);
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
        url: '/eval/'+ this.data.foodId + '/create/',
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
  delete_content:function(e){
    var evalID = e.mark.evalid;
    var _delete_ = false;
    var storeID = this.data.storeId;
    var foodID = this.data.foodId;
    wx.showModal({
      title: '提示',
      content: '删除该评论',
      success: function (res) {
          if (res.confirm) {
              console.log('确定');
              _delete_ = true;
              console.log(_delete_);
              const option = {
                url: '/eval/'+ evalID +'/delete/',
                method: 'delete' // 请求方法，默认为 'get'
              };
              // 调用 tjRequest 函数发起请求
              tjRequest(option).then(
                res => {
                  console.log(res.data);
                }).catch(error => {
                  // 请求失败的处理逻辑
                  console.error('请求用户个人信息失败：', error);
              })
              wx.redirectTo({
                url: '/pages/browse/food_page/food_page?storeid=' + storeID +'&foodid=' + foodID
              })
          }else{
             console.log('取消')
          }
      }
    })
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