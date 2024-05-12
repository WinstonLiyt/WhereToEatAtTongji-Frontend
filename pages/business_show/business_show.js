// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { tjRequest, tjFileUpLoad, base_url } = require('../../utils/util');

Page({
  data: {
    storeid:0,
    store:null,
    foods:null,
    user_image: null,
    base_url:"http://1.92.154.154:80",
  },
  next_calculator:function(options){
    console.log(options);
    console.log('here');
    //var foodId = event.currentTarget.dataset.foodid; // 通过 dataset 获取 foodid
    wx.navigateTo({
      url: '../business_comment/businesss_comment?storeid=' + this.data.storeid + '&foodid=' + options.mark.foodid
    })
  },

  onLoad: function() {
    tjRequest({
      url:'/user/getInfo'
    }).then(res => {
      this.setData({
        user_image: base_url + '/media/avatar/' + res.data.avatar_url,
      })
    })

    tjRequest({ url: '/restaurant/id/' }).then(res => {
      this.setData({
        storeid: res.data.id
      }, () => {
        console.log("New store ID set:", this.data.storeid); // Ensure storeid is set
  
        // Now fetch foods, ensuring this happens after storeid is set
        const foodOption = {
          url: '/restaurant/' + this.data.storeid + '/all_dish/',
          method: 'get'
        };
  
        tjRequest(foodOption).then(res => {
          console.log("Foods data:", res.data);
          this.setData({
            foods: res.data
          });
        }).catch(error => {
          console.error('Failed to fetch foods:', error);
        });
  
        // Fetch store information
        const storeOption = {
          url: '/restaurant/',
          method: 'get'
        };
  
        tjRequest(storeOption).then(res => {
          console.log("Store data:", res.data);
          this.setData({
            store: res.data
          });
        }).catch(error => {
          console.error('Failed to fetch store information:', error);
        });
  
      });
    }).catch(err => {
      console.error('Failed to retrieve store ID:', err);
    });
  }
  
}
)