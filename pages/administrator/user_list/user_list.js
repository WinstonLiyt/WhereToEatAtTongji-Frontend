// pages/administrator/user_list/user_list.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const { tjRequest } = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:null,
    avatar_url:"https://tjeatwhat.cn/media/avatar/",
    user:null,
    userID:null,
    if_edit:false,
    edit_credits:false,
    credit:"",
  },
  input_credit(e) {
    this.setData({
      credit:e.detail.value
    });
  },
  edit_credits(){
    this.setData({
      edit_credits: true
    });
  },
  confirm_credit(){
    console.log(this.data.credit)
    if(this.data.credit == ""){
      wx.showToast({
        title: '经验值不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if(parseInt(this.data.credit)> 1000){
      wx.showToast({
        title: '经验值不能超过1000',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      var that = this;
      const option_ = {
        url: '/user/setInfoByManager/',
        method: 'post', // 请求方法，默认为 'get'
        data: {
          userid: this.data.userID,
          credits:this.data.credit
        },
      };
      // 调用 tjRequest 函数发起请求
      tjRequest(option_).then(
        res => {
          console.log('Success:', res.data);
          that.reload_credit();
          this.setData({
            edit_credits: false
          });
        }).catch(error => {
          // 请求失败的处理逻辑
          console.error('修改用户值失败：', error);
      })
    }

  },
  reload_credit(){
    const option = {
      url: '/user/getUserInfoByManager/', // 用户个人信息接口的路径
      method: 'get', // 请求方法，默认为 'get'
      data: {
        userid: this.data.userID,
      },
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
            user:res.data,
            if_edit:true
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })
  },
  close_credit(){
    this.setData({
      edit_credits: false
    });
  },
  set_status(ID){
    var userId = ID.mark.userid;
    var status = ID.mark.status;
    var that = this;
    if(status == 1){
      wx.showModal({
        title: '提示',
        content: '禁用该用户',
        success: function (res) {
            if (res.confirm) {
                console.log('确定');
                const option_ = {
                  url: '/user/setStatus/',
                  method: 'post', // 请求方法，默认为 'get'
                  data: {
                    userid: userId,
                    status: 0,
                  },
                };
                // 调用 tjRequest 函数发起请求
                tjRequest(option_).then(
                  res => {
                    console.log('Success:', res.data);
                    that.reload_status();
                  }).catch(error => {
                    // 请求失败的处理逻辑
                    console.error('禁用用户失败：', error);
                })
            }else{
               console.log('取消')
            }
        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '激活该用户',
        success: function (res) {
            if (res.confirm) {
                console.log('确定');
                const option_ = {
                  url: '/user/setStatus/',
                  method: 'post', // 请求方法，默认为 'get'
                  data: {
                    userid: userId,
                    status: 1,
                  },
                };
                // 调用 tjRequest 函数发起请求
                tjRequest(option_).then(
                  res => {
                    console.log('Success:', res.data);
                    that.reload_status();
                  }).catch(error => {
                    // 请求失败的处理逻辑
                    console.error('激活用户失败：', error);
                })
            }else{
               console.log('取消')
            }
        }
      })      
    }
  },
  If_edit(ID){
    var userId = ID.mark.userid;
    console.log(userId)
    const option = {
      url: '/user/getUserInfoByManager/', // 用户个人信息接口的路径
      method: 'get', // 请求方法，默认为 'get'
      data: {
        userid: userId,
      },
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
            userID:userId,
            user:res.data,
            if_edit:true
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })
  },
  close_edit(){
    this.setData({
      if_edit:false
    })
  },
  reload_status: function () {//服务态度评分
    const option = {
      url: '/user/getAllUsers/', // 用户个人信息接口的路径
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data.data);
        this.setData({
            userlist:res.data.data
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const option = {
      url: '/user/getAllUsers/', // 用户个人信息接口的路径
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data.data);
        this.setData({
            userlist:res.data.data
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
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