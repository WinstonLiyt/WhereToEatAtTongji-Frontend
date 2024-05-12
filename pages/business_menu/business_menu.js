// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { tjRequest, tjFileUpLoad, base_url } = require('../../utils/util');

Page({
  data: {
    storeId: 0,
    store: null,
    user_image: null,
    foods: [],
    modalVisible: false,
    image: null,
    isEditing: false,
  },

  onLoad: function(options) {
    this.loadStoreAndFoods();
  },

  onShow: function(options) {
    this.loadStoreAndFoods();
  },

  loadStoreAndFoods: function() {
    tjRequest({ url: '/restaurant/id/' }).then(res => {
      this.setData({
        storeId: res.data.id
      });
      this.fetchStoreInfo();
      this.fetchFoods();
    }).catch(err => {
      console.error('Failed to retrieve store ID:', err);
    });
  },

  fetchStoreInfo: function() {

    tjRequest({
      url:'/user/getInfo'
    }).then(res => {
      this.setData({
        user_image: base_url + '/media/avatar/' + res.data.avatar_url,
      })
    })

    tjRequest({
      url: `/restaurant/${this.data.storeId}`,
      method: 'GET'
    }).then(res => {
      console.log(res.data);
      this.setData({
        store: res.data
      })
      // console.log(this.data.store);
      
    }).catch(err => {
      console.error('Failed to retrieve store information:', err);
    });
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

  fetchFoods: function() {
    tjRequest({
      url: `/restaurant/${this.data.storeId}/all_dish`,
      method: 'GET'
    }).then(res => {
      console.log('here');
      console.log(res.data);
      this.setData({
        foods: res.data
      });
    }).catch(err => {
      console.error('Failed to retrieve foods:', err);
    });
  },

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

  editFood: function(e) {
    const id = e.currentTarget.dataset.id;
    const food = this.data.foods.find(food => food.id === id);
    if (!food) {
      wx.showToast({ title: '食品未找到', icon: 'error', duration: 2000 });
      return;
    }
    this.setData({
      modalVisible: true,
      isEditing: true,
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image,
      editingId: id
    });
  },

  submitFood: function() {
    const { name, price, description, image, editingId, isEditing } = this.data;
    const url = isEditing ? `/dish/${editingId}/update/` : `/dish/create/`;
    tjRequest({
      url: url,
      method: isEditing ? 'PUT' : 'POST',
      data: { name, price, description, image }
    }).then(res => {
      if (res.statusCode === 200) {
        this.setData({modalVisible: false})
        wx.showToast({ title: isEditing ? '菜品更新成功' : '菜品添加成功', icon: 'success' });
        this.fetchFoods();
      } else {
        wx.showToast({ title: '操作失败', icon: 'error' });
      }
    }).catch(err => {
      wx.showToast({ title: '网络错误', icon: 'none' });
      console.error('Request failed:', err);
    });
  },

  closeModal: function() {
    this.setData({ modalVisible: false });
  },

  deleteFood: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '你确定要删除这个菜品吗？',
      success: (res) => {
        if (res.confirm) {
          tjRequest({
            url: `/dish/${id}/delete/`,
            method: 'DELETE'
          }).then(res => {
            if (res.statusCode === 200) {
              const newFoods = this.data.foods.filter(food => food.id !== id);
              this.setData({ foods: newFoods, modalVisible: false});
              wx.showToast({ title: '删除成功', icon: 'success' });
            } else {
              wx.showToast({ title: '删除失败，请稍后重试', icon: 'error' });
            }
          }).catch(err => {
            wx.showToast({ title: '删除请求失败', icon: 'none' });
            console.error('Delete request failed:', err);
          });
        }
      }
    });
  },

  uploadImage: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        const imagePath = res.tempFilePaths[0];
        tjFileUpLoad({
          url: '/image/',
          filePath: imagePath
        }).then(uploadRes => {
          const data = JSON.parse(uploadRes.data);
          if (uploadRes.statusCode === 200 && data.new_name) {
            that.setData({ image: data.new_name });
            // console.log(data.new_name);
            wx.showToast({ title: '图片上传成功', icon: 'success' });
          } else {
            wx.showToast({ title: '图片上传失败', icon: 'error' });
          }
        }).catch(err => {
          wx.showToast({ title: '上传错误', icon: 'none' });
          console.error('Upload failed:', err);
        });
      }
    });
  },
});
