Page({
  data: {
    wxlogin: true,
    // post: "25",
    // follow: "1",
    // fan: 520,
    name: "默认名称",  // 肯德基（同济大学嘉定校区店）
    user_image: "../../statics/imgs/business/food.png",
    location: "默认地址", // 曹安公路4800号5幢1区A100室
    tele: "默认电话",
    time: "默认营业时间",
    description: "默认简介",
    backgroundImages: ['../../statics/pic_food/food5.jpg'], // 存储背景图的数组
    showPopup: false
  },
  
  getData(url) {
    wx.request({
      url: url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
      },
      fail: function () {
        console.log("Failed.");
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData('http://1.92.154.154:80/media/images/test.jpg');
  },
  // getData(url) {
  //   wx.request({
  //     url: url,
  //     header: {
  //       "content-type": "application/json;charset=UTF-8"
  //     },
  //     method: 'GET',
  //     success: (res) => {  // Changed here
  //       console.log(res);
  //       console.log(res.data);
  //       if (res.data) {
  //         const restaurantData = res.data;
  //         console.log(restaurantData);
  //         this.setData({
  //           name: restaurantData.name,
  //           location: restaurantData.location
  //         });
  //       } else {
  //         console.error("Failed to retrieve name from backend.");
  //       }
  //     },
  //     fail: function() {
  //       console.log("Failed to fetch data from backend.");
  //     },
  //   })
  // },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function () {
  //   this.getData('http://1.92.154.154:666/restaurant/1/');},


  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
      this.getTabBar().setList();
    }
  },

// 打开弹窗
openPopup() {
  this.setData({
    showPopup: true
  });
},

// 关闭弹窗
closePopup() {
  this.setData({
    showPopup: false
  });
},

// 上传背景图
uploadBackground() {
  let that = this;
  wx.chooseImage({
    count: 9,  // 允许选择多张图片
    success: function(res) {
      let newImages = that.data.backgroundImages;
      if (newImages.length === 1 && newImages[0] === '../../statics/pic_food/food5.jpg') {
        newImages = [];  // 如果当前只有默认图片，则清空数组
      }
      newImages = newImages.concat(res.tempFilePaths);  // 添加新上传的图片
      that.setData({ backgroundImages: newImages });
    }
  });
},

deleteBackground(e) {
  let that = this;
  let index = e.currentTarget.dataset.index;
  let newImages = that.data.backgroundImages;
  if (newImages.length > 1 || newImages[0] !== '.../../statics/pic_food/food5.jpg') {
    newImages.splice(index, 1);
    that.setData({ backgroundImages: newImages });
  } else {
    wx.showToast({
      title: '不能删除默认背景图',
      icon: 'none'
    });
  }
},
});