// index.js
const app = getApp()
const util = require('../../../utils/util.js')
const defaultAvatarUrl = util.base_url + '/media/avatar/default.jpg'
Page({
  data: {
    username: '',
    signature: '',
    avatarUrl: defaultAvatarUrl,
    showUrl: ''
  },
  onLoad() {
  },
  onShow(){
    util.tjRequest({
      url:'/user/getInfo',
      method:'get',
    }).then(res=>{
      this.setData({
        username: res.data.name,
        showUrl: util.base_url + '/media/avatar/' + res.data.avatar_url,
        avatarUrl: res.data.avatar_url,
        signature: res.data.signature,
      })
    }).catch(err=>{
        console.log(err)
      })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 

    util.tjFileUpLoad({
      url:"/user/uploadAvatar",
      filePath: avatarUrl,
    }).then(res=>{
      this.setData({
        avatarUrl: JSON.parse(res.data).newname,
        showUrl: util.base_url + '/media/avatar/' + JSON.parse(res.data).newname
      })
    }).catch(err=>{
    })
  },
  submit(){
    util.tjRequest({
      url:'/user/setInfo',
      method:'post',
      data:{
        nickname: this.data.username,
        signature: this.data.signature,
        avatar_url: this.data.avatarUrl
      }
    }).then(res=>{
      wx.navigateBack({
        fail:err=>{console.log(err)}
      })
      })
    .catch(err=>{
      wx.showToast({
        title: err.data.error,
        icon: 'error',
        duration: 2000
      })
    })
  }
})
