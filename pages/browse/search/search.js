// pages/browse/food_page/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fail:false,
    store:true,
    name:"",
    testData:{
      "data":[
        {
          "id":0,
          "imgSrc":"/statics/pic_food/food1.jpg",
          "name":"五味小面",
          "type":"面食",
          "location":"满天星广场2f"
        },
        {
          "id":1,
          "imgSrc":"/statics/pic_food/food2.jpg",
          "name":"希食东",
          "type":"西餐",
          "location":"满天星广场2f"
        },
        {
          "id":2,
          "imgSrc":"/statics/pic_food/food3.jpg",
          "name":"吉祥馄饨",
          "type":"面食",
          "location":"满天星广场1f"
        },
        {
          "id":3,
          "imgSrc":"/statics/pic_food/food4.jpg",
          "name":"麦当劳",
          "type":"西餐",
          "location":"嘉实生活广场"
        },
      ]
    },
    foodtest:[
        {
          "id":0,
          "imgSrc":"/statics/pic_food/food4.jpg",
          "name":"小笼包",
          "price":"12",
          "description":"好吃的一个小笼包",
          "restaurant": {
            'id': 25, 
            'name': '饮料店',
          } 
        },
        {
          "id":1,
          "imgSrc":"/statics/pic_food/food2.jpg",
          "name":"面面面",
          "price":"22",
          "description":"好吃的一碗面",
          "restaurant": {
            'id': 25, 
            'name': '饮料店',
          } 
        },
      ],
    storelist:null,
    foodlist:null,
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
    // console.log(name);
    this.setData({
      name:name,
      storelist: this.data.testData.data,
      foodlist:this.data.foodtest,
    });
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