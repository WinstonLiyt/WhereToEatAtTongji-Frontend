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
    image: null,
    isEditing: false,
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
      modalVisible: true,
      isEditing: false,
      name: '',
      price: '',
      description: '',
      image: null
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
    const { name, price, description, image, editingId, isEditing } = this.data;
    if (editingId) {
        // 更新现有的食品信息
        this.data.foods = this.data.foods.map(food => {
            if (food.id === editingId) {
                return { ...food, name, price, description, image };
            }
            return food;
        });
    } else {
        // 添加新的食品
        this.data.foods.push({ id: this.data.foods.length + 1, name, price, description, image });
    }

    // 更新视图并重置表单
    this.setData({
        foods: this.data.foods,
        modalVisible: false,
        name: '',
        price: '',
        description: '',
        image: null,
        editingId: null, // 重置编辑状态
        isEditing: false  // 重置编辑状态
    });

    wx.showToast({
        title: isEditing ? '菜品更新成功' : '菜品添加成功',
        icon: 'success',
        duration: 2000
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
  
    // 设置数据到模态框
    this.setData({
      modalVisible: true,
      isEditing: true,
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image,
      editingId: id // 新增属性，用于追踪正在编辑的食品
    });
  },

  submitFood: function() {
    // First, retrieve `isEditing` from `this.data` to ensure it is in scope
    const { name, price, description, image, editingId, isEditing } = this.data;

    if (editingId) {
        // Update existing food information
        const updatedFoods = this.data.foods.map(food => {
            if (food.id === editingId) {
                return { ...food, name, price, description, image };
            }
            return food;
        });
        this.setData({
            foods: updatedFoods
        });
    } else {
        // Add new food item
        this.data.foods.push({ id: this.data.foods.length + 1, name, price, description, image });
        this.setData({
            foods: this.data.foods
        });
    }

    // Reset the form and update the view
    this.setData({
        modalVisible: false,
        name: '',
        price: '',
        description: '',
        image: null,
        editingId: null,  // Reset editing status
        isEditing: false  // Make sure to reset isEditing to false
    });

    // Show toast message
    wx.showToast({
        title: isEditing ? '菜品更新成功' : '菜品添加成功',
        icon: 'success',
        duration: 2000
    });
  }

  
});