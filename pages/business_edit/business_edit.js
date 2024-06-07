const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest, tjFileUpLoad, base_url } = require('../../utils/util');

Page({
  data: {
    initialData: {},
    image: '',
    name: '',
    store_name: ' ',
    address: '',
    telephone: '',
    business_time: '',
    remark: '', 
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
    selectedTagIndex: 0,
    selectedTagLabel: '',
    showDropdown: false
  },

  validateIllegalCharacters: function(text) {
    // 只允许中文、字母、数字和特定的标点符号
    const illegalCharRegex = /[^a-zA-Z0-9\u4e00-\u9fa5,.!?，。！？]/;

    return !illegalCharRegex.test(text);
  },

  validateIllegalCharacters_t: function(text) {
    // 只允许中文、字母、数字和特定的标点符号
    const illegalCharRegex = /[^a-zA-Z0-9\u4e00-\u9fa5,.!?，。！？:-]/;;
    return !illegalCharRegex.test(text);
  },

  getData() {
    const that = this;
    tjRequest({
      url:'/restaurant/',
    }).then(res=>{
      if (res.data) {
        const restaurantData = res.data;
        const tagNames = restaurantData.tags.map(tag => tag.name);
        // const selectedTag = tagNames[0];
        const selectedTag = tagNames[0] || this.data.tagOptions[0].label;
        const selectedTagIndex = this.data.tagOptions.findIndex(option => option.label === selectedTag);

        this.setData({
          store_name: restaurantData.name || '',
        address: restaurantData.location || '',
        telephone: restaurantData.phone_number || '',
        business_time: restaurantData.time || '',
        remark: restaurantData.description || '',
        selectedTagIndex: selectedTagIndex !== -1 ? selectedTagIndex : 0,
        selectedTagLabel: selectedTag,
        initialData: { // 正确保存初始数据
          store_name: restaurantData.name || '',
          address: restaurantData.location || '',
          telephone: restaurantData.phone_number || '',
          business_time: restaurantData.time || '',
          remark: restaurantData.description || '',
          selectedTagIndex: selectedTagIndex !== -1 ? selectedTagIndex : 0,
          image: this.data.image,
          name: this.data.name,
          backgroundImage: restaurantData.images && restaurantData.images[0] ? restaurantData.images[0] : ''

        }
        });
      }
    }).catch(err=>{
      console.error("Failed to retrieve name from backend.");
    })

    tjRequest({
      url:'/user/getInfo'
    }).then(res => {
      this.setData({
        image: base_url + '/media/avatar/' + res.data.avatar_url,
        name: res.data.name,
        'initialData.image': base_url + '/media/avatar/' + res.data.avatar_url,
        'initialData.name': res.data.name
      })
    })
  },

  validateForm: function() {
    const { store_name, address, telephone, business_time, remark } = this.data;
    const mobilePhoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
    const landlinePhoneRegex = /^(?:\d{3,4}-\d{7,8}|\d{8})$/;
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d-(次日)?([01]\d|2[0-3]):[0-5]\d$/;

    if (!store_name) {
      return '店铺名称不能为空';
    }

    if (!this.validateIllegalCharacters(store_name)) {
      return '店铺名称包含非法字符';
    }

    if (store_name.length > 10) {
      return '店铺名称不能超过10个字';
    }

    if (!address) {
      return '店铺地址不能为空';
    }

    if (!this.validateIllegalCharacters(address)) {
      return '店铺地址包含非法字符';
    }

    if (address.length > 20) {
      return '店铺地址不能超过20个字';
    }

    if (!telephone) {
      return '联系方式不能为空';
    }

    if (!this.validateIllegalCharacters(telephone)) {
      return '联系方式包含非法字符';
    }
    
    if ((!mobilePhoneRegex.test(telephone) && !landlinePhoneRegex.test(telephone))) {
      return '联系方式不合法';
    }

    if (!business_time) {
      return '营业时间不能为空';
    }

    if (!this.validateIllegalCharacters_t(business_time)) {
      return '营业时间包含非法字符';
    }

    if (!timeRegex.test(business_time)) {
      return '营业时间必须是hh:mm-hh:mm或hh:mm-次日hh:mm的格式';
    }

    if (!timeRegex.test(business_time)) {
      return '营业时间必须是hh:mm-hh:mm或hh:mm-次日hh:mm的格式';
    }
  
    const timeParts = business_time.split(/-|次日/);
    if (timeParts.length < 2) {
      return '营业时间格式不正确';
    }
  
    const [start, end] = timeParts;
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
  
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
  
    if (business_time.includes('次日')) {
      if (startTime <= endTime) {
        return '营业时间第一个hh:mm必须大于次日hh:mm';
      }
    } else {
      if (startTime >= endTime) {
        return '营业时间第一个hh:mm必须小于第二个hh:mm';
      }
    }
  
    if (!remark) {
      return '店铺简介不能为空';
    }

    if (!this.validateIllegalCharacters(remark)) {
      return '店铺简介包含非法字符';
    }

    if (remark.length > 20) {
      return '店铺简介不能超过20个字';
    }

    return '';
  },

  submitData: function() {
    const { store_name, address, telephone, business_time, remark, selectedTagIndex, tagOptions, name, backgroundImage } = this.data;
    const selectedTag = tagOptions[selectedTagIndex].label;
    const initialData = this.data.initialData;
    const changes = [];

    const validationError = this.validateForm();
    if (validationError) {
      wx.showToast({
        title: validationError,
        icon: 'none'
      });
      return;
    }

    // 如果标签为空，设置默认标签
    if (!selectedTag) {
    this.setData({
      selectedTagIndex: 0,
      selectedTagLabel: this.data.tagOptions[0].label
    });
  }
    // if (image !== initialData.image) changes.push('图像');
    if (name !== initialData.name) changes.push('名称');
    if (store_name !== initialData.store_name) changes.push('店铺名称');
    if (address !== initialData.address) changes.push('店铺地址');
    if (telephone !== initialData.telephone) changes.push('联系方式');
    if (business_time !== initialData.business_time) changes.push('营业时间');
    if (remark !== initialData.remark) changes.push('店铺简介');
    if (selectedTagIndex !== initialData.selectedTagIndex) changes.push('店铺标签');

    if (changes.length > 0) {
      const changesList = changes.join('，');
      wx.showModal({
        title: '确认修改',
        content: `您修改了${changesList}，是否确认提交？`,
        success: (res) => {
          if (res.confirm) {
            this.submitDataToServer();
          }
        }
      });
    } else {
      wx.showToast({
        title: '没有任何修改',
        icon: 'none'
      });
    }
  },

  submitDataToServer: function() {
    const { store_name, address, telephone, business_time, remark, selectedTagIndex, tagOptions, backgroundImage } = this.data;
    const selectedTag = tagOptions[selectedTagIndex].label;
  
    tjRequest({
      url: '/restaurant/update/',
      method: 'PUT',
      data: {
        name: store_name,
        location: address,
        phone_number: telephone,
        description: remark,
        time: business_time,
        tags: [selectedTag],
        images: [backgroundImage]
      },
    }).then(res => {
      if (res.statusCode === 200) {
        console.log('Success:', res.data);
        wx.showToast({
          title: 'Restaurant updated!',
          icon: 'success'
        });
        this.navigateToHome(); // 成功提交后返回主页
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
    var field = e.currentTarget.dataset.field;
    var value = e.detail.value;
    var change = {};
    change[field] = value;
    this.setData(change);
  },

  onLoad: function() {  
    this.getData();
  },

  onShow: function () {
    this.getData();
  },
  
  handleTagChange: function(e) {
    const selectedTagIndex = e.detail.value;
    const selectedTagLabel = this.data.tagOptions[selectedTagIndex].label;

    this.setData({
      selectedTagIndex,
      selectedTagLabel
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
