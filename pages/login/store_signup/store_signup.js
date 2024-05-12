// index.js
const app = getApp()
const util = require('../../../utils/util.js')
const defaultAvatarUrl = util.base_url + '/media/avatar/default.jpg'
Page({
  data: {
    showUrl: defaultAvatarUrl,
    avatarUrl: null
  },
  onLoad() {
  },
  onShow(){
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })

    util.tjFileUpLoad({
      url:"/user/uploadAvatar",
      filePath: avatarUrl,
    }).then(res=>{
      this.setData({
        avatarUrl: JSON.parse(res.data).newname,
        showUrl: util.base_url + '/media/avatar/' + JSON.parse(res.data).newname,
      })
    }).catch(err=>{
    })
  },
  formSubmit(e){
    let util = require('../../../utils/util.js')

    let that = this
    wx.login({
      success: (res) => {
        util.tjRequest({
          url:'/user/storeRegister',
          method:'post',
          data:{
            code: res.code,
            name: e.detail.value.nickname,
            avatar_url: this.data.avatarUrl,
            location: e.detail.value.location,
            phone: e.detail.value.telephone,
          }
        }).then(res=>{
          console.log(res)
          wx.setStorage({key:'role', data:'store'})
          wx.setStorage({key:'token', data:res.data.token})
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        }).catch(err=>{
          console.log(err)
        })
      },
    })
  }
})
