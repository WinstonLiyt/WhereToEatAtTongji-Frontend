const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest } = require('../../utils/util');

Page({
  data: {
    wxlogin: true,
    name: "默认名称",  // 肯德基（同济大学嘉定校区店）
    user_image: "../../statics/imgs/business/food.png",
    location: "默认地址", // 曹安公路4800号5幢1区A100室
    tele: "默认电话",
    time: "默认营业时间",
    description: "默认简介",
    tags: [],
    backgroundImages: ['images/default_background.jpg'], // 存储背景图的数组
    showPopup: false
  },

  onLoad: function () {
    this.getData('http://1.92.154.154:80/restaurant/1/');
  },

  getData(url) {
    wx.request({
      url: url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      method: 'GET',
      success: (res) => {
        if (res.data) {
          const restaurantData = res.data;
          // 提取标签名称到一个tagNames
          const tagNames = restaurantData.tags.map(tag => tag.name);
          this.setData({
            name: restaurantData.name,
            location: restaurantData.location,
            tele: restaurantData.phone_number,
            time: restaurantData.time,
            description: restaurantData.description,
            tags: tagNames
          });
        } else {
          console.error("Failed to retrieve name from backend.");
        }
      },
      fail: function() {
        console.log("Failed to fetch data from backend.");
      },
    })
  },

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

  uploadBackground() {
    let that = this;
    wx.showModal({
      title: '上传背景图',
      content: '是否上传新的背景图？',
      success (res) {
        if (res.confirm) {
          wx.chooseImage({
            count: 9,  // 允许选择多张图片
            success: function(res) {
              const images = res.tempFilePaths;
              // 处理每张图片
              images.forEach((imagePath) => {
                // 上传图片到服务器
                wx.uploadFile({
                  url: 'http://1.92.154.154:80/image/', // 您的后端图片上传API
                  filePath: imagePath,
                  name: 'file',
                  success: function(uploadRes) {
                    let data = JSON.parse(uploadRes.data);
                    console.log(data);
                    let newImages = that.data.backgroundImages;
                    console.log(newImages);
                    if (newImages.length === 1 && newImages[0] === '../../statics/pic_food/food5.jpg') {
                      newImages = [];  // 如果当前只有默认图片，则清空数组
                    }
                    // 构造完整的图片URL
                    // let fullImageUrl = 'http://1.92.154.154:80/media/' + data.new_name;
                    newImages.push(data.new_name);  // 添加后端返回的新图片URL
                    that.setData({ backgroundImages: newImages });
                    console.log(that.data.backgroundImages);
                  },
                  fail: function(error) {
                    wx.showToast({
                      title: '上传失败',
                      icon: 'none'
                    });
                    console.error('Upload failed', error);
                  }
                });
              });
            }
          });
        } else if (res.cancel) {
          console.log('用户取消上传');
        }
      }
    });
  },

  updateBackgroundImages: function() {
    let that = this;
    let currentImages = this.data.backgroundImages;
    // currentImages.push(newImageUrl); // Add the new image URL to your existing array
    wx.showModal({
      title: '确认更新',
      content: '您确定要更新背景图吗？',
      success: function(res) {
        if (res.confirm) {
          // 用户点击了确认
          wx.request({
            url: 'http://1.92.154.154:80/restaurant/14/update/', 
            method: 'PUT',
            data: {
              images: currentImages // 发送更新的图片数组
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              if (res.statusCode === 200) {
                // 更新本地数据
                that.setData({
                  backgroundImages: currentImages
                });
                console.log(currentImages);
                wx.showToast({
                  title: '背景图更新成功',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '更新失败',
                  icon: 'none'
                });
                console.error('Failed to update:', res);
              }
            },
            fail: function(err) {
              wx.showToast({
                title: '网络请求失败',
                icon: 'none'
              });
              console.error('Request failed:', err);
            }
          });
        } else if (res.cancel) {
          // 用户点击取消
          wx.showToast({
            title: '更新已取消',
            icon: 'none'
          });
        }
      }
    });
  },

  deleteBackground(e) {
    let index = e.target.dataset.index; // 使用 e.target.dataset.index 获取索引
    let newImages = this.data.backgroundImages.slice(); // 使用 slice() 创建新的数组副本，以避免直接修改原数组
    if (newImages.length > 1) {
      newImages.splice(index, 1);
      this.setData({ backgroundImages: newImages }); // 更新页面显示的图片数组
    } else {
      wx.showToast({
        title: '只有1张背景图了，不能删除！',
        icon: 'none'
      });
    }
  },
  });