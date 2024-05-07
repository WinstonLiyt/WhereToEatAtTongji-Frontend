// store_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
  testdata:[
    {
      store:{
        imgSrc:"/statics/pic_food/food4.jpg",
        name:"五味小面",
        location:"满天星广场1f",
        description:"中式面馆",
        telephone:"88888888"
      },
      foodlist:[
        {
          "id":0,
          "imgSrc":"/statics/pic_food/food4.jpg",
          "name":"小笼包",
          "price":"12",
          "description":"好吃的一个小笼包"
        },
        {
          "id":1,
          "imgSrc":"/statics/pic_food/food2.jpg",
          "name":"面面面",
          "price":"22",
          "description":"好吃的一碗面"
        },
        {
          "id":2,
          "imgSrc":"/statics/pic_food/food3.jpg",
          "name":"炸薯条套餐",
          "price":"25",
          "description":"好吃的一个炸薯条套餐"
        }
      ]
    },
    {
      store:{
        imgSrc:"/statics/pic_food/food2.jpg",
        name:"希食东",
        location:"满天星广场2f",
        description:"日式快餐店",
        telephone:"88888888"
      },
      foodlist:[
        {
          "id":0,
          "imgSrc":"/statics/pic_food/food1.jpg",
          "name":"青提冰沙",
          "price":"32",
          "description":"好吃的一个青提冰沙"
        },
        {
          "id":1,
          "imgSrc":"/statics/pic_food/food2.jpg",
          "name":"面面面",
          "price":"22",
          "description":"好吃的一碗面"
        },
        {
          "id":2,
          "imgSrc":"/statics/pic_food/food3.jpg",
          "name":"炸薯条套餐",
          "price":"25",
          "description":"好吃的一个炸薯条套餐"
        }
      ]
    }
  ],
    store:null,
  },
  next_calculator:function(options){
    wx.navigateTo({
      url: '/pages/browse/food_page/food_page?id=' + options.mark.foodid
    })
  },
  onLoad:function(options){
    var secondId = options.id;
    // console.log(secondId);
    this.setData({
      store: this.data.testdata[secondId],
    });
  }
}
)