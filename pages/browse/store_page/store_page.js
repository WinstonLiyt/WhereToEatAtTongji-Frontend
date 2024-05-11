// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    storeid:0,
  testdata:[
    {
      store:{
        "id":1,
        images:"/statics/pic_food/food4.jpg",
        name:"五味小面",
        location:"满天星广场1f",
        description:"中式面馆",
        telephone:"88888888"
      },
      foodlist:[
        {
          "id":0,
          "image":"/statics/pic_food/food4.jpg",
          "name":"小笼包",
          "price":"12",
          "description":"好吃的一个小笼包"
        },
        {
          "id":1,
          "image":"/statics/pic_food/food2.jpg",
          "name":"面面面",
          "price":"22",
          "description":"好吃的一碗面"
        },
        {
          "id":2,
          "image":"/statics/pic_food/food3.jpg",
          "name":"炸薯条套餐",
          "price":"25",
          "description":"好吃的一个炸薯条套餐"
        }
      ]
    },
    {
      store:{
        "id":1,
        images:"/statics/pic_food/food2.jpg",
        name:"希食东",
        location:"满天星广场2f",
        description:"日式快餐店",
        telephone:"88888888"
      },
      foodlist:[
        {
          "id":0,
          "image":"/statics/pic_food/food1.jpg",
          "name":"青提冰沙",
          "price":"32",
          "description":"好吃的一个青提冰沙"
        },
        {
          "id":1,
          "image":"/statics/pic_food/food2.jpg",
          "name":"面面面",
          "price":"22",
          "description":"好吃的一碗面"
        },
        {
          "id":2,
          "image":"/statics/pic_food/food3.jpg",
          "name":"炸薯条套餐",
          "price":"25",
          "description":"好吃的一个炸薯条套餐"
        }
      ]
    }
  ],
    store:null,
    foodlist:null,
    base_url:"http://1.92.154.154:80",
  },
  next_calculator:function(options){
    wx.navigateTo({
      url: '/pages/browse/food_page/food_page?storeid=' + this.data.storeid +'&foodid=' + options.mark.foodid
    })
  },
  onLoad:function(options){
    var secondId = options.id;
    wx.request({
       url: 'http://1.92.154.154:80/restaurant/'+ secondId + '/all_dish',
       header: {
          "content-type": "application/json;charset=UTF-8"
       },
       method: 'GET',
       success: (res) => {  // Changed here
         if (res.data) {
            const dishesData = res.data;
            console.log(dishesData);
            this.setData({
               foodlist:dishesData
            });
         } else {
            console.error("Failed to retrieve name from backend.");
         }
        },
        fail: function() {
            console.log("Failed to fetch data from backend.");
        },
    });
    wx.request({
       url: 'http://1.92.154.154:80/restaurant/'+ secondId,
       header: {
          "content-type": "application/json;charset=UTF-8"
       },
       method: 'GET',
       success: (res) => {  // Changed here
         if (res.data) {
            const storeData = res.data;
            console.log(storeData);
            this.setData({
               store:storeData
            });
         } else {
            console.error("Failed to retrieve name from backend.");
         }
        },
        fail: function() {
            console.log("Failed to fetch data from backend.");
        },
    });
    // this.setData({
    //   store: this.data.testdata[secondId],
    //   storeid:secondId,
    // });
  }
}
)