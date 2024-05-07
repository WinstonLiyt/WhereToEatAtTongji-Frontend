Page({
  data: {
    wxlogin: true,
    post: "25",
    follow: "1",
    fan: 520,
    backgroundImages: ['../../statics/pic_food/food5.jpg'], // 存储背景图的数组
    showPopup: false
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