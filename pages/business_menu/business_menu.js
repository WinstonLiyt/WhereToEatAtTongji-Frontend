// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    foods: [
      { id: 1, name: '食物名称1', price: 32, description: '描述1', image: '/statics/pic_food/food1.jpg' },
      { id: 2, name: '食物名称2', price: 52, description: '描述2', image: '/statics/pic_food/food2.jpg' },
      { id: 2, name: '食物名称3', price: 20, description: '描述3', image: '/statics/pic_food/food3.jpg' },
      // 更多菜品
    ],
    modalVisible: false,
    name: '',
    price: '',
    description: '',
    image: null
    },   

    next_calculator(){
      wx.navigateTo({
        url: '/pages/browse/food_page/food_page'
      })
    },

    deleteFood: function(e) {
      const id = e.currentTarget.dataset.id; // 获取菜品的 ID
    
      // 弹出确认对话框
      wx.showModal({
        title: '确认删除',
        content: '你确定要删除这个菜品吗？',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
            // 用户点击确定后执行删除操作
            // 假设有一个数组 `foods` 存储了所有菜品
            const newFoods = this.data.foods.filter(food => food.id !== id);
            this.setData({
              foods: newFoods
            });
            // 可以添加一些用户反馈，如提示删除成功
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
            // 用户点击取消，不执行操作
          }
        }
      });
    },
    
    // // 阻止事件冒泡
    // stopPropagation: function(e) {
    //   e.stopPropagation();
    // }
    // 新增菜品方法
  // 打开新增菜品弹窗
  addFood: function() {
    this.setData({
      modalVisible: true
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

  // 图片上传
  uploadImage: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        const imagePath = res.tempFilePaths[0];
        that.setData({
          image: imagePath  // 更新图片路径
        });
      }
    });
  },

  // 提交新增菜品
  submitFood: function() {
    const { name, price, description, image } = this.data;
    this.data.foods.push({ name, price, description, image });
    this.setData({
      foods: this.data.foods,
      modalVisible: false,
      name: '',
      price: '',
      description: '',
      image: null
    });
    wx.showToast({
      title: '菜品添加成功',
      icon: 'success',
      duration: 2000
    });
  },

  // 关闭弹窗
  closeModal: function() {
    this.setData({
      modalVisible: false
    });
  }
});