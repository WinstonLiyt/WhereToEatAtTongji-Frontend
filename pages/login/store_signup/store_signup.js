// index.js
const app = getApp()
const util = require('../../../utils/util.js')
const defaultAvatarUrl = util.base_url + '/media/avatar/default.jpg'
Page({
  data: {
    avatarUrl: defaultAvatarUrl
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
        avatarUrl: res.new_name
      })
    }).catch(err=>{
    })
  },
  formSubmit(e){
    let util = require('../../../utils/util.js')

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
          wx.switchTab({
            url: '/pages/browse/store_list/store_list',
          })
        }).catch(err=>{
          console.log(err)
        })
      },
    })
  }
})
