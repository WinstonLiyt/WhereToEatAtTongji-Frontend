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

    /* 用户昵称检查 */
    var input_name = e.detail.value.nickname;
    var location = e.detail.value.location;
    var phone = e.detail.value.telephone;
    if (!this.checkUsernameValidity(input_name) || 
        !this.checkAddressValidity(location) || 
        !this.checkPhoneNumberValidity(phone)) {
        return;
    }
    /* ************** */

    let that = this
    wx.login({
      success: (res) => {
        util.tjRequest({
          url:'/user/storeRegister',
          method:'post',
          data:{
            code: res.code,
            name: input_name,
            avatar_url: this.data.avatarUrl,
            location: location,
            phone: phone,
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
  },
  checkUsernameValidity(username) {
    // 敏感词列表
    // const sensitiveWords = ["badword1", "badword2", "badword3"];
    // 检查长度
    if (username.length < 1 || username.length > 16) {
        this.popover('错误', '用户名必须为小于16个字符', false);
        return false;
    }

    // 检查是否包含非法字符
    if (/[^a-zA-Z0-9\u4e00-\u9fa5\s,.!?，。！？]/.test(username)) {
        this.popover('错误', '用户名包含非法字符', false);
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
  checkAddressValidity(address) {
    // 检查地址是否为空
    if (address.trim() === "") {
        this.popover('错误', '地址不能为空', false);
        return false;
    }

    // 检查地址长度
    if (address.length < 1 || address.length > 20) {
        this.popover('错误', '地址长度应介于1到20个字符之间', false);
        return false;
    }

    // 检查是否包含非法字符
    if (/[^a-zA-Z0-9\u4e00-\u9fa5,.!?，。！？]/.test(address)) {
        this.popover('错误', '地址包含非法字符', false);
        return false;
    }

    // 检查是否包含敏感词汇
    for (let i = 0; i < util.sensitiveWords.length; i++) {
        if (address.includes( util.sensitiveWords[i])) {
            this.popover('错误', `地址包含敏感词汇`, false);
            return false;
        }
    }

    // 所有检查通过
    return true;
  },
  checkPhoneNumberValidity(phoneNumber) {
        // 检查电话长度
        if (phoneNumber.length !== 11) {
            this.popover('错误', '电话号码长度应为11位', false);
            return false;
        }

        // 检查是否为有效的中国大陆手机号码
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            this.popover('错误', '电话号码无效，请输入有效的中国大陆手机号码', false);
            return false;
        }
        // 所有检查通过
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
