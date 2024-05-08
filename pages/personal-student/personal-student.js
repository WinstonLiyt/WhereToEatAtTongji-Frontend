Page({
  data: {
    username: "梅毛冰",
    avatar: "/statics/imgs/community/avatar.jpg",
    signature: "For the hope of it all.",
    post: "25",
    follow: "1",
    fan: 520,
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
      this.getTabBar().setList();
    }
  }
  
});
