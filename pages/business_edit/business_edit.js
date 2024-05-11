Page({
  data: {
    image: '../../statics/imgs/business/store_kfc.png',
    name: '肯德基',
    address: '曹安公路4800号5幢1区A100室',
    telephone: '13651962636',
    business_time: '06:00-22:00',
    remark: '疯狂星期四，vivo50！', 
    wxlogin: true,
    tagOptions: [
      { value: 'noodles', label: '面食' },
      { value: 'desserts', label: '甜点' },
      { value: 'drinks', label: '饮品' },
      { value: 'breakfast', label: '早点' },
      { value: 'fruits', label: '水果' },
      { value: 'bbq', label: '烧烤' },
      { value: 'western', label: '西餐' },
      { value: 'stir-fry', label: '炒菜' }
    ],
    slicedTagOptions: [], // 用于存储从第三个元素开始的切片数组  
    selectedTags: [], // 用户选择的标签
    showDropdown: false, // 控制下拉展开状态
    tagRows: []
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
    const { name, address, telephone, business_time, remark, selectedTags, uploadedImageName } = this.data;
  
    wx.request({
        url: 'http://1.92.154.154:80/restaurant/14/update/', // Update with your actual backend URL
        method: 'PUT',
        data: {
            name: name,
            location: address,
            phone_number: telephone,
            description: remark,
            // business_hours: business_time,
            time: business_time,
            tags: selectedTags.map(index => this.data.tagOptions.find(option => option.value === index).label),
            images: [uploadedImageName]
        },
        header: {
            'content-type': 'application/json' // Assuming your server expects JSON
        },
        success: function(res) {
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
        },
        fail: function(error) {
            console.error('Request failed:', error);
            wx.showToast({
                title: 'Network error',
                icon: 'none'
            });
        }
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
    this.setData({  
      slicedTagOptions: this.data.tagOptions.slice(2) // 索引从0开始，所以2表示第三个元素  
    });  
    this.processTagRows();
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



  toggleDropdown: function () {
    this.setData({
      showDropdown: !this.data.showDropdown
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
        that.setData({
          image: newImage  // 更新页面数据，从而更新图片
        });

        // 将新图像上传到后端
        wx.uploadFile({
          url: 'http://1.92.154.154:80/image/', // Update with your actual backend image upload endpoint
          filePath: newImage,
          name: 'file', // Name of the file parameter expected by the backend
          header: {
              'content-type': 'multipart/form-data' // Ensure the correct content type for file upload
          },
          formData: {}, // Any additional form data required by the backend
          success: function(uploadRes) {
            let data = JSON.parse(uploadRes.data); // Assuming the response is in JSON format
            that.setData({
                uploadedImageName: data.new_name // Assuming 'new_name' is the key in the response containing the new image name
            });
            console.log('Image uploaded successfully:', data.new_name);
          },
          fail: function(error) {
              // Handle failed upload
              console.error('Image upload failed:', error);
              wx.showToast({
                  title: 'Failed to upload image',
                  icon: 'error'
              });
          }
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
