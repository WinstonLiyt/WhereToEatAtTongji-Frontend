// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest } = require('../../utils/util');

Page({
  data: {
    storeid:14,
    store:null,
    foods: [    ],
    base_url:"http://1.92.154.154:80",
    modalVisible: false,
    image: null,
    isEditing: false,
    },   

    // next_calculator(){
    //   wx.navigateTo({
    //     url: '/pages/browse/food_page/food_page'
    //   })
    // },

    // 删除菜品
    // deleteFood: function(e) {
    //   const id = e.currentTarget.dataset.id; // 获取菜品的 ID
    
    //   // 弹出确认对话框
    //   wx.showModal({
    //     title: '确认删除',
    //     content: '你确定要删除这个菜品吗？',
    //     success: (res) => {
    //       if (res.confirm) {
    //         console.log('用户点击确定');
    //         // 用户点击确定后执行删除操作
    //         // 假设有一个数组 `foods` 存储了所有菜品
    //         const newFoods = this.data.foods.filter(food => food.id !== id);
    //         this.setData({
    //           foods: newFoods
    //         });
    //         wx.showToast({
    //           title: '删除成功',
    //           icon: 'success',
    //           duration: 2000
    //         });
    //       } else if (res.cancel) {
    //         console.log('用户点击取消');
    //       }
    //     }
    //   });
    // },

    deleteFood: function(e) {
      const id = e.currentTarget.dataset.id; // 获取菜品的 ID
    
      // 弹出确认对话框
      wx.showModal({
        title: '确认删除',
        content: '你确定要删除这个菜品吗？',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
    
            // 发起网络请求，请求后端删除菜品
            wx.request({
              url: `http://1.92.154.154:80/dish/${id}/delete/`, // 后端删除接口
              method: 'DELETE',
              data: { id: id }, // 发送菜品ID到后端
              success: (resp) => {
                if (resp.statusCode === 200) {
                  // 根据后端响应结果来处理，这里假设200为删除成功
                  console.log('后端删除成功');
                  // 更新前端列表
                  const newFoods = this.data.foods.filter(food => food.id !== id);
                  this.setData({
                    foods: newFoods
                  });
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  });
                } else {
                  // 后端删除失败处理
                  wx.showToast({
                    title: '删除失败，请稍后重试',
                    icon: 'error'
                  });
                }
              },
              fail: (error) => {
                // 网络或其他错误处理
                wx.showToast({
                  title: '删除请求失败',
                  icon: 'none'
                });
                console.error('删除请求失败:', error);
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    
    
    // 打开新增菜品弹窗
    addFood: function() {
      this.setData({
        modalVisible: true,
        isEditing: false,
        name: '',
        price: '',
        description: '',
        image: null
      });
    },

    onLoad:function(options){
      // var secondId = options.id;
      var secondId = 14;
      this.fetchFoods(); // 加载菜品信息

      //获取菜品信息
      const option = {
        url: '/restaurant/'+ secondId + '/all_dish',
        method: 'get' // 请求方法，默认为 'get'
      };
      // 调用 tjRequest 函数发起请求
      tjRequest(option).then(
        res => {
          console.log(res.data);
          this.setData({
            foods:res.data
          })
      }).catch(error => {
        console.error('请求用户个人信息失败：', error);
      })

      //获取店铺信息
      const option_2 = {
        url: '/restaurant/'+ secondId,
        method: 'get' // 请求方法，默认为 'get'
      };
      // 调用 tjRequest 函数发起请求
      tjRequest(option_2).then(
        res => {
          console.log(res.data);
          this.setData({
            store:res.data
          })
      }).catch(error => {
        console.error('请求用户个人信息失败：', error);
      })
    },

    // 输入处理
    inputName: function(e) {
      this.setData({
        name: e.detail.value
      });
    },

    inputPrice: function(e) {
      this.setData({
        price: e.detail.value
      });
    },

    inputDescription: function(e) {
      this.setData({
        description: e.detail.value
      });
    },

    // 图片上传
    uploadImage: function() {
      var that = this;
      wx.chooseImage({
        success: function(res) {
          const imagePath = res.tempFilePaths[0];
          // 上传图片到服务器
          wx.uploadFile({
            url: 'http://1.92.154.154:80/image/', // 后端接收图片的API地址
            filePath: imagePath,
            name: 'file', // 与后端约定的字段名
            header: {
              'content-type': 'multipart/form-data'
            },
            success: function(uploadRes) {
              const data = JSON.parse(uploadRes.data);
              console.log(data);
              if (uploadRes.statusCode === 200 && data.new_name) {
                // 更新图片URL
                that.setData({
                  image: data.new_name
                });
                console.log(data.new_name);
                wx.showToast({
                  title: '图片上传成功',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'error'
                });
              }
            },
            fail: function(error) {
              wx.showToast({
                title: '上传错误',
                icon: 'none'
              });
              console.error('Upload failed:', error);
            }
          });
        }
      });
    },
  
    // 提交新增菜品
    submitFood: function() {
      const { name, price, description, image, editingId, isEditing } = this.data;
      console.log(this.data);
      const url = isEditing ? 
      `http://1.92.154.154:80/dish/${editingId}/update/` : // URL for updating an existing dish
      'http://1.92.154.154:80/dish/14/create/'; // URL for creating a new dish
      const method = isEditing ?  'PUT' : 'POST';
      wx.request({
        url: url,
        method: method,
        data: {
          name: name,
          price: price,
          description: description,
          image: image
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.statusCode === 200) {
            wx.showToast({
              title: isEditing ? '菜品更新成功' : '菜品添加成功',
              icon: 'success'
            });
            this.fetchFoods(); // 成功后重新加载菜品列表
            if (!isEditing) {
              const newDish = { id: res.data.id, name, price, description, image };
              console.log(newDish);
              // this.data.foods.push(newDish);
              this.setData({
                foods: [...this.data.foods, newDish] // 添加新菜品到原菜品列表中
              });
            } 
            else {
              this.setData({
                foods: this.data.foods.map(food => {
                  if (food.id === editingId) {
                    return { ...food, name, price, description, image };
                  }
                  return food;
                })
              });
            }
          } 
          else {
            wx.showToast({
              title: '操作失败',
              icon: 'error'
            });
          }
        }.bind(this),
        fail: function(error) {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          });
          console.error('Request failed:', error);
        }
      });
  },

  // 关闭弹窗
  closeModal: function() {
    this.setData({
      modalVisible: false
    });
  },

  editFood: function(e) {
    const id = e.currentTarget.dataset.id;
    const food = this.data.foods.find(food => food.id === id);
  
    if (!food) {
      wx.showToast({
        title: '食品未找到',
        icon: 'error',
        duration: 2000
      });
      return;
    }

    let editedImage = food.image;
    if (editedImage && editedImage.startsWith('/media')) {
      editedImage = editedImage.replace('/media', '');
    }
    console.log(editedImage);
    // 显示加载提示
    wx.showLoading({
      title: '加载中...',
    });
  
    // 模拟加载延迟以展示加载动画，实际使用时应根据实际情况调整
    setTimeout(() => {
      // 设置数据到模态框
      this.setData({
        modalVisible: true,
        isEditing: true,
        name: food.name,
        price: food.price,
        description: food.description,
        image: editedImage,
        editingId: id // 新增属性，用于追踪正在编辑的食品
      });
      console.log(this.data);
      // 关闭加载提示
      wx.hideLoading();
    }, 100); // 延迟500毫秒来展示加载动画，可根据实际需要调整
  },

  
  fetchFoods: function() {
    const option = {
      url: '/restaurant/' + this.data.storeid + '/all_dish',
      method: 'get'
    };
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
          foods: res.data
        });
      }).catch(error => {
        console.error('请求菜品信息失败：', error);
      });
  },
  
});