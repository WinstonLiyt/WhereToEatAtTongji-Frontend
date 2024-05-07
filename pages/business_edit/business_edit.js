Page({
  data: {
    name: '肯德基（同济大学嘉定校区店）',
    address: '曹安公路4800号5幢1区A100室',
    telephone: '13651962636',
    business_time: '06:00-22:00',
    wxlogin: true,
    post: "25",
    follow: "1",
    fan: 520,
    tagOptions: ["汉堡", "快餐", "中餐", "火锅", "披萨", "饮品", "水果"],
    tagIndex: [], // 用户选择的标签索引
    selectedTags: [] // 用户选择的标签
  },

  handleTagChange: function (e) {
    this.setData({
      tagIndex: e.detail.value,
      selectedTags: e.detail.value.map(index => this.data.tagOptions[index])
    });
  },

  navigateToHome: function() {
    console.log('Attempting to navigate to personal page');
    wx.switchTab({
      url: '../personal/personal',
      fail: function(error) {
        console.error('Redirect failed', error);
      }
    });
  },
  

});
