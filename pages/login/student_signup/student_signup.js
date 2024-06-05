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
      method:"post"
    }).then(res=>{
      this.setData({
        avatarUrl: JSON.parse(res.data).newname,
        showUrl: util.base_url + '/media/avatar/' + JSON.parse(res.data).newname,
      })
    }).catch(err=>{
    })
  },
  formSubmit(e){
    /* 用户输入昵称检查 */
    var input_name = e.detail.value.nickname;
    if (!this.checkUsernameValidity(input_name)) {
        return;
    }
    /* ************** */
    wx.login({
      success: (res) => {
        
        util.tjRequest({
          url:'/user/studentRegister',
          method:'post',
          data:{
            code: res.code,
            name: input_name,
            avatar_url: this.data.avatarUrl
          }
        }).then(res=>{
          wx.setStorage({key:'role', data:'student'})
          wx.setStorage({key:'token', data:res.data.token})
          wx.switchTab({
            url: '/pages/browse/store_list/store_list',
          })
        }).catch(err=>{
          console.log(err)
        })
      },
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
    // 检查是否包含空格
    if (/\s/.test(username)) {
        this.popover('错误', '用户名不能含有空格', false);
        return false;
    }
    // 检查是否包含非法字符（这里只允许中文、字母、数字和下划线）
    if (/[^a-zA-Z0-9\u4e00-\u9fa5\s,.!?，。！？]/.test(username)) {
        this.popover('错误', '用户名只能包含字母、数字和下划线', false);
        return false;
    }

    // 检查是否包含敏感词汇
    for (let i = 0; i < util.sensitiveWords.length; i++) {
        if (username.includes( util.sensitiveWords[i])) {
            this.popover('错误', `用户名包含敏感词汇`, false);
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
