// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        wx.setStorage({key:'role', data:'student'})
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
