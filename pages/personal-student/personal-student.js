const util = require('../../utils/util')
Page({
  data: {
    username: "匿名用户",
    avatar: "/statics/imgs/community/avatar.jpg",
    signature: "暂未填写个性签名",
    post: "5",
    follow: "1",
    fan: 1,
  },

  onLoad(options) {
    let util = require('../../utils/util')

    util.tjRequest({
      url:'/user/getInfo',
      method:'get',
    }).then(res=>{
      console.log(res)
      this.setData({
        username: res.data.name,
        avatar: util.base_url + '/media/avatar/' + res.data.avatar_url,
        signature: res.data.signature || '暂未填写个性签名'
      })
    }).catch(err=>{
        console.log(err)
      })
    },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
      this.getTabBar().setList();
    }
  }
  
});
