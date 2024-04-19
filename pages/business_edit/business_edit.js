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
