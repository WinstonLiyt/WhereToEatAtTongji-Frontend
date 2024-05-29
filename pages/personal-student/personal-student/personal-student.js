const util = require('../../../utils/util')

Page({
  data: {
    tokenCardName: ['', '绿牌', '蓝牌', '黄牌'],
    tokenCardColor: ['', 'rgb(50, 109, 74)', 'rgb(50, 64, 109)', 'rgb(110, 91, 55)'],
    tokenCardClass: ['', 'green', 'blue', 'yellow'],
    tokenCardDesc: ['', '仅能浏览帖子，无法进行评价', '普通用户，享有小程序所有功能', '深度用户，优先推荐您的内容'],
    username: "游客用户",
    avatar: util.base_url + '/media/avatar/default.jpg',
    signature: "注册使用个性签名",
    post: "5",
    follow: "1",
    fan: 1,
    tokenCardType: 0,
  },

  onLoad(options) {

    },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
      this.getTabBar().setList();
    }

    // 下面是装填个人信息的逻辑
    let util = require('../../../utils/util')
    let role = wx.getStorageSync('role')
    console.log(role)
    if(role==='visitor'){
      this.setData({
        tokenCardType: 1, 
        progRatio: 0, 
        progDesc: '注册升级'
      })
    }
    else{
      util.tjRequest({
        url:'/user/getInfo',
        method:'get',
      }).then(res=>{
        let tokencard = res.data.tokencard
        let progDesc, progRatio
        if(tokencard == 2){  // 蓝牌
          progRatio = res.data.credits / 1000 * 100
          progDesc = `${res.data.credits} / 1000`
        }else{
          progRatio = 100
          progDesc = ''
        }
        this.setData({
          username: res.data.name,
          avatar: util.base_url + '/media/avatar/' + res.data.avatar_url,
          signature: res.data.signature || '暂未填写个性签名',
          tokenCardType: tokencard,
          progDesc: progDesc,
          progRatio: progRatio
        })
        console.log(res.data.avatar_url)
      }).catch(err=>{
          console.log(err)
        })
    }
  },
  modify(){
    let role = wx.getStorageSync('role')
    if(role === 'visitor')
      wx.navigateTo({
        url: '/pages/login/user_role_choice/user_role_choice',
      })
    else{
      wx.navigateTo({
        url: '../modify-info/modify-info',
      })
    }
  },
  testNotification(e) {
    wx.navigateTo({
      url: '/pages/notification/notification',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('postDetail', { data: postData })
      }
    })
}
});
