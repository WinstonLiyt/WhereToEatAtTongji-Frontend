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
    let avatarUrl = null
    if(this.data.avatarUrl !== defaultAvatarUrl)
      avatarUrl = this.data.avatarUrl

    wx.login({
      success: (res) => {
        util.tjRequest({
          url:'/user/studentRegister',
          method:'post',
          data:{
            code: res.code,
            name: e.detail.value.nickname,
            avatar_url: avatarUrl
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
