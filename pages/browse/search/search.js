// pages/browse/food_page/search.js
const { tjRequest } = require('../../../utils/util');

Page({
  data: {
    fail:false,
    store:true,
    name:"",
    storelist:null,
    foodlist:null,
    base_url:"http://1.92.154.154:80",
  },
  storebtn:function(options){
    this.setData({
      store: true,
    });
  },
  dishesbtn:function(options){
    this.setData({
      store: false,
    });
  },
  next_store:function(options){
    wx.navigateTo({
      url: '/pages/browse/store_page/store_page?id=' + options.mark.storeid
    })
  },
  next_dishes:function(options){
    wx.navigateTo({
      url: '/pages/browse/food_page/food_page?storeid=' + options.mark.storeid +'&foodid=' + options.mark.foodid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var name = options.name;
    //获取筛选信息
    const option = {
      url: '/search/' + name,
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(option).then(
      res => {
        console.log(res.data);
        this.setData({
          name:name,
          storelist:res.data['rests'],
          foodlist:res.data['dishes'],
        })
      }).catch(error => {
        // 请求失败的处理逻辑
        console.error('请求用户个人信息失败：', error);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})



// {'dishes': 
//         [{'id': 25, 
//           'name': '可乐',
//           'description': '牛', 
//           'tags': [{'id': 52, 'name': '焦糖'}, {'id': 53, 'name': '快乐水'}], 
//           'price': '5.20', 
//           'image': '/media/images/test_iamge.jpg', 
//           'restaurant': {'id': 25, 
//                          'name': '饮料店', 
//                          'location': 'B楼', 
//                          'phone_number': '456789', 
//                          'description': '太酷了', 
//                          'images': [{'id': 51, 'image': '/media/images/test_iamge.jpg'}, {'id': 52, 'image': '/media/images/test_iamge1.jpg'}], 
// 								         'tags': [{'id': 48, 'name': '火锅'}, {'id': 49, 'name': '小吃'}]
// 								         }
// 				  }, 
//           {'id': 26, 
//            'name': '可乐', 
//            'description': '牛', 
//            'tags': [{'id': 52, 'name': '焦糖'}, {'id': 53, 'name': '快乐水'}], 
//            'price': '5.20', 
//            'image': '/media/images/test_iamge.jpg', 
//            'restaurant': {'id': 25, 
//                           'name': '饮料店', 
//                           'location': 'B楼', 
//                           'phone_number': '456789', 
//                           'description': '太酷了', 
//                           'images': [{'id': 51, 'image': '/media/images/test_iamge.jpg'}, {'id': 52, 'image': '/media/images/test_iamge1.jpg'}], 
//                           'tags': [{'id': 48, 'name': '火锅'}, {'id': 49, 'name': '小吃'}]
//                           }
//              }], 
//    'rests': [{'id': 25, 
//               'name': '饮料店', 
//               'location': 'B楼', 
//               'phone_number': '456789', 
//               'description': '太酷了', 
//               'images': [{'id': 51, 'image': '/media/images/test_iamge.jpg'}, 
//                          {'id': 52, 'image': '/media/images/test_iamge1.jpg'}], 
//                'tags': [{'id': 48, 'name': '火锅'}, {'id': 49, 'name': '小吃'}]
//                }
//               ]
//    }