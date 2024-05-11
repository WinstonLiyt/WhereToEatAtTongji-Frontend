.js
901 B
// app.js
App({
  onLaunch() {
    var util = require('./utils/util.js')
    // 登录
    wx.setStorage({key:'role', data:'store'})
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util.tjRequest({
          url:'/user/login',
          method:'post',
          data:{
            code: res.code
          }
        }).then(res=>{
          wx.setStorage({key:'token', data:res.data.token})
          if(res.data.role === 1)
            wx.setStorage({key:'role', data:'student'})
          else if(res.data.role === 2)
            wx.setStorage({key:'role', data:'store'})
        }).catch(err=>{
          if(err.statusCode===404){
            wx.redirectTo({
              url: '/pages/login/user_role_choice/user_role_choice',
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
