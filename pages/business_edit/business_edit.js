const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest, tjFileUpLoad, base_url } = require('../../utils/util');

Page({
  data: {
    image: '',
    name: '',
    store_name: ' ',
    address: '',
    telephone: '',
    business_time: '',
    remark: '', 
    wxlogin: true,
    tagOptions: [
      { value: 'noodles', label: '面食' , checked: false},
      { value: 'desserts', label: '甜点' , checked: false},
      { value: 'drinks', label: '饮品' , checked: false},
      { value: 'breakfast', label: '早点' , checked: false},
      { value: 'fruits', label: '水果' , checked: false},
      { value: 'bbq', label: '烧烤' , checked: false},
      { value: 'western', label: '西餐' , checked: false},
      { value: 'stir-fry', label: '炒菜' , checked: false}
    ],
    selectedTags: [], // 用户选择的标签
    showDropdown: false, // 控制下拉展开状态
    tagRows: []
  },

  getData(url) {
    tjRequest({
      url:'/restaurant/',
    }).then(res=>{
      if (res.data) {
        const restaurantData = res.data;
        console.log(restaurantData);
        // 提取标签名称到一个tagNames
        const tagNames = restaurantData.tags.map(tag => tag.name);
        const updatedTagOptions = this.data.tagOptions.map(option => ({
          ...option,
          checked: tagNames.includes(option.label)  // Set checked true if included in tagNames
        }));
        
        console.log(updatedTagOptions);
        this.setData({
          store_name: restaurantData.name,
          address: restaurantData.location,
          telephone: restaurantData.phone_number,
          business_time: restaurantData.time,
          remark: restaurantData.description,
          selectedTags: tagNames,
          tagOptions: updatedTagOptions
        })
      }
    }).catch(err=>{
      console.error("Failed to retrieve name from backend.");
    })

    tjRequest({
      url:'/user/getInfo'
    }).then(res => {
      this.setData({
        image: base_url + '/media/avatar/' + res.data.avatar_url,
        name: res.data.name
      })
    })
  },

  /* 计算标签的行与列 */
  processTagRows: function() {
    const rows = [];
    const { tagOptions } = this.data;
    for (let i = 0; i < tagOptions.length; i += 4) {
      rows.push(tagOptions.slice(i, i + 4));
    }
    this.setData({
      tagRows: rows
    });
  },

  /* 保存信息 */
  submitData: function() {
    const { store_name, address, telephone, business_time, remark, selectedTags, uploadedImageName } = this.data;
  
    tjRequest({
      url: '/restaurant/update/',
      method: 'PUT',
      data: {
        name: store_name,
        location: address,
        phone_number: telephone,
        description: remark,
        time: business_time,
        tags: selectedTags.map(index => this.data.tagOptions.find(option => option.value === index).label),
        images: [uploadedImageName]
      },
    }).then(res => {
      if (res.statusCode === 200) {
        console.log('Success:', res.data);
        wx.showToast({
          title: 'Restaurant updated!',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: 'Failed to update restaurant',
          icon: 'error'
        });
        console.error('Backend error:', res);
      }
    }).catch(err => {
      console.error('Request failed:', err);
      wx.showToast({
        title: 'Network error',
        icon: 'none'
      });
    });
  },
  

  inputChange: function(e) {
    var field = e.currentTarget.dataset.field;  // 获取绑定的数据字段名称
    var value = e.detail.value;  // 获取输入的新值
    var change = {};
    change[field] = value;  // 创建一个对象来存储新的字段值
    this.setData(change);  // 更新数据
  },
  

  onLoad: function() {  
    // 在页面加载时，从第三个元素开始切片数组  
    this.processTagRows();
    this.getData();         // 加载数据
  },  

  onShow: function () {
    this.getData();
  },
  
  /* 取标签的值 */
  handleTagChange: function(e) {
    const currentSelectedTags = this.data.selectedTags; // 当前已选中的标签
    const newSelectedTags = e.detail.value; // 获取当前复选框组的选中情况

    // 如果用户尝试选中超过两个标签
    if (newSelectedTags.length > 2) {
        wx.showToast({
            title: '最多只能选择两个标签',
            icon: 'none',
            duration: 2000
        });

        // 强制界面复选框回到最后有效的状态，不更新数据
        this.setData({
            selectedTags: currentSelectedTags // 保持原来的选择不变
        });
        return; // 阻止函数继续执行
    }

    // 用户选择的标签数不超过两个，更新selectedTags数据
    this.setData({
        selectedTags: newSelectedTags
    });
},

  /* 更换照片 */
  changeImage: function() {
    var that = this;  // 获取当前页面的实例
    wx.chooseImage({
      count: 1,  // 允许用户选择的图片数量
      sizeType: ['original', 'compressed'],  // 可选择原图或压缩图
      sourceType: ['album', 'camera'],  // 可选择来源是相册还是相机
      success: function(res) {
        const newImage = res.tempFilePaths[0];  // 获取选中图片的临时文件路径
        console.log(newImage);

        // 将新图像上传到后端
        tjFileUpLoad({
          url: '/user/uploadAvatar',
          filePath: newImage,
        }).then(uploadRes => {
          let data = JSON.parse(uploadRes.data);
          if (data && data.newname) {
            // 只有在成功上传并接收到新URL后更新显示的图片
            that.setData({
              image: base_url + '/media/avatar/' + data.newname // 更新图片地址
            });
            wx.showToast({
              title: 'Image uploaded successfully',
              icon: 'success'
            });
          } else {
            throw new Error("Invalid response data");
          }
        }).catch(err => {
          console.error('Image upload failed:', err);
          wx.showToast({
            title: 'Failed to upload image',
            icon: 'error'
          });
        });
      }
    });
  },

  /* 返回主页 */
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
