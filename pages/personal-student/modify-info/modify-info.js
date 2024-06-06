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
    /* 检查用户名和签名合法性 */
    var input_name = this.data.username;
    var signature = this.data.signature;

    if (!signature || signature === "") 
      signature = "暂未填写个性签名";

    if (!this.checkUsernameValidity(input_name) || !this.checkSignatureValidity(signature)) {
        return;
    }

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
  },
  checkUsernameValidity(username) {
    // 敏感词列表
    // const sensitiveWords = ["badword1", "badword2", "badword3"];
    // 检查长度
    if (username.length < 1 || username.length > 16) {
        this.popover('错误', '用户名必须为小于16个字符', false);
        return false;
    }
    // 检查是否包含非法字符（这里只允许中文、字母、数字和下划线）
    if (/[^a-zA-Z0-9\u4e00-\u9fa5,.!?，。！？]/.test(username)) {
        this.popover('错误', '用户名包含非法字符', false);
        return false;
    }

    // 检查是否包含敏感词汇
    for (let i = 0; i < util.sensitiveWords.length; i++) {
        if (username.includes(util.sensitiveWords[i])) {
            this.popover('错误', `用户名包含敏感词汇`, false);
            return false;
        }
    }
    return true;
  },
  checkSignatureValidity(username) {
    // 敏感词列表
    // const sensitiveWords = ["badword1", "badword2", "badword3"];

    // 检查是否包含敏感词汇
    for (let i = 0; i < util.sensitiveWords.length; i++) {
        if (username.includes(util.sensitiveWords[i])) {
            this.popover('错误', `签名包含敏感词汇`, false);
            return false;
        }
    }
    return true;
  },
  popover(title, content, showLabel) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: showLabel
    });
  }
})
