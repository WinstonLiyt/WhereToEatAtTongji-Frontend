Page({
  data: {
    name: '肯德基（同济大学嘉定校区店）',
    address: '曹安公路4800号5幢1区A100室',
    telephone: '13651962636',
    business_time: '06:00-22:00',
    wxlogin: true,
    post: "25",
    follow: "1",
    fan: 520,
    tagOptions: [
      {value: "1", label: "汉堡"},  
      {value: "2", label: "快餐"},  
      {value: "3", label: "中餐"},
      {value: "4", label: "火锅"},
      {value: "5", label: "披萨"},
      {value: "6", label: "饮品"},
      {value: "7", label: "水果"}
    ],
    slicedTagOptions: [], // 用于存储从第三个元素开始的切片数组  
    selectedTags: [], // 用户选择的标签
    showDropdown: false // 控制下拉展开状态
  },

  submitData: function() {
    const { name, address, telephone, business_time, selectedTags } = this.data;

    wx.request({
        url: 'http://1.92.154.154:80/restaurant/1/create/', // Update with your actual backend URL
        method: 'POST',
        data: {
            name: name,
            location: address,
            phone_number: telephone,
            description: business_time,
            tags: selectedTags.map(index => this.data.tagOptions.find(option => option.value === index).label),
            images: [] // Add images if you handle image upload
        },
        header: {
            'content-type': 'application/json' // Assuming your server expects JSON
        },
        success: function(res) {
            if (res.statusCode === 200) {
                console.log('Success:', res.data);
                wx.showToast({
                    title: 'Restaurant created!',
                    icon: 'success'
                });
            } else {
                wx.showToast({
                    title: 'Failed to create restaurant',
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


  onLoad: function() {  
    // 在页面加载时，从第三个元素开始切片数组  
    this.setData({  
      slicedTagOptions: this.data.tagOptions.slice(2) // 索引从0开始，所以2表示第三个元素  
    });  
  },  
  
  handleTagChange: function (e) {
    const tagIndex = e.detail.value;
    const selectedTags = tagIndex.map(index => this.data.tagOptions[index]);
    this.setData({
      // tagIndex: tagIndex,
      // selectedTags: selectedTags
      selectedTags: e.detail.value  
    });
  },

  toggleDropdown: function () {
    this.setData({
      showDropdown: !this.data.showDropdown
    });
  },  

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
