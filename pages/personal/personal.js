const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest, tjFileUpLoad, base_url } = require('../../utils/util');

let cachedImages = [];


Page({
  data: {
    wxlogin: true,
    name: "默认名称",  // 肯德基（同济大学嘉定校区店）
    store_image: "默认店铺名称",
    user_image: " ",
    location: "默认地址", // 曹安公路4800号5幢1区A100室
    tele: "默认电话",
    time: "默认营业时间",
    description: "默认简介",
    tags: [],
    backgroundImages: [], // 存储背景图的数组
    showPopup: false
  },

  onLoad: function () {
    cachedImages = this.data.backgroundImages;
  },

  getData(url) {
    tjRequest({
      url:'/user/getInfo'
    }).then(res => {
      this.setData({
        user_image: base_url + '/media/avatar/' + res.data.avatar_url,
        name: res.data.name  // 用户名
      })
    })
    tjRequest({
      url:'/restaurant/',
    }).then(res=>{
      if (res.data) {
        const restaurantData = res.data;
        const tagNames = restaurantData.tags.map(tag => tag.name);
        this.setData({
          store_name: restaurantData.name,
          location: restaurantData.location,
          tele: restaurantData.phone_number,
          time: restaurantData.time,
          description: restaurantData.description,
          tags: tagNames,
          backgroundImages: restaurantData.images.slice(0, 1)
        })
        console.log('Background images set:', this.data.backgroundImages);
      }
    }).catch(err=>{
      console.error("Failed to retrieve name from backend.");
    })
    cachedImages = this.data.backgroundImages;
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
      this.getTabBar().setList();
    }

    this.getData();
    console.log(this.data.store_image);
  },

  // 打开弹窗
  openPopup() {
    this.setData({
      showPopup: true
    });
    this.getData();
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
            count: 1,  // 允许选择多张图片
            success: function(res) {
              const imagePath = res.tempFilePaths[0];
              const validExtensions = ['.jpg', '.jpeg', '.png'];
              const imageExtension = imagePath.substring(imagePath.lastIndexOf('.')).toLowerCase();

              if (!validExtensions.includes(imageExtension)) {
                wx.showToast({
                  title: '图片格式不正确，请上传.jpg或.png格式的图片',
                  icon: 'none'
                });
                return;
              }
                // 上传图片到服务器
                tjFileUpLoad({
                  url:'/image/',
                  filePath: imagePath,
                }).then(uploadRes => {
                  let data = JSON.parse(uploadRes.data);  // 得到new_name
                  let oldImages = cachedImages;  // 本来的背景图数组
                  console.log(oldImages);
                  if (oldImages.length === 1  && oldImages[0].image.includes('default_image.jpg')) {
                    oldImages = [];  // 如果当前只有默认图片，则清空数组
                  }
                  oldImages.push({ id: data.id || Date.now(), image: data.new_name });
                  that.setData({ backgroundImages: [{ id: data.id || Date.now(), image: data.new_name }] });
                cachedImages = cachedImages;
              }).catch(err => {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none'
                });
                console.error('Upload failed', err);
              })
           
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
    let currentImages = this.data.backgroundImages.map(image => image.image);
    console.log(currentImages);
    wx.showModal({
      title: '确认更新',
      content: '您确定要更新背景图吗？',
      success: function(res) {
        // 用户点击了确认
        if (res.confirm) {
          console.log(currentImages);
          tjRequest({
            url: '/restaurant/update/',
            data: {
              images: currentImages, // 发送更新的图片数组
              showPopup: false
            },
            method: 'PUT',
          }).then(res => {
            if (res.statusCode === 200) {
              // 更新本地数据
              that.setData({
                backgroundImages: currentImages,
                cachedImages: currentImages,
                showPopup: false
              });
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
          }).catch(err => {
            wx.showToast({
              title: '网络请求失败',
              icon: 'none'
            });
            console.error('Request failed:', err);
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
    if (cachedImages.length > 1) {
      cachedImages.splice(index, 1);
      this.setData({ backgroundImages: cachedImages });
      console.log('here');
      console.log(cachedImages);
    } else {
      wx.showToast({
        title: '只有1张背景图了，不能删除！',
        icon: 'none'
      });
    }
  },
//   testNotification(e) {
//     wx.navigateTo({
//       url: '/pages/notification/notification',
//       success: function (res) {
//         // 通过eventChannel向被打开页面传送数据
//         // res.eventChannel.emit('postDetail', { data: postData })
//       }
//     })
//   },
});