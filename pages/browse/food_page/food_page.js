// food_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    foodId:null,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/statics/pic_tool/star0.png',//未选中状态
    selectedSrc: '/statics/pic_tool/star.png',//选中状态
    key: 0,//评分
    user_input:"",
    date:"",
    testdata:[
      {
        foodmessage:{
          imgSrc:"/statics/pic_food/food4.jpg",
          name:"小笼包",
          description:"好吃的一个小笼包",
          score:"4.5",
          price:"12"
        },
        comment:[
          {
            "id":1,
            "imgSrc":"/statics/pic_tag/cake1.png",
            "name":"小笼包",
            "score":4,
            "time":"2024-04-21",
            "content":"好吃的一个小笼包",
            "reply":"谢谢你，好心人"
          },
          {
            "id":2,
            "imgSrc":"/statics/pic_tag/cake.png",
            "name":"小笼包",
            "score":4,
            "time":"2024-04-21",
            "content":"好吃的一个小笼包"
          },
          {
            "id":3,
            "imgSrc":"/statics/pic_tag/drink.png",
            "name":"小笼包",
            "score":5,
            "time":"2024-04-21",
            "content":"好吃的一个小笼包"
          },
        ]
      },
      {
        foodmessage:{
          imgSrc:"/statics/pic_food/food4.jpg",
          name:"五味小面",
          description:"中式面馆",
          score:"4.5",
          price:"32"
        },
        comment:[
          {
            "id":1,
            "imgSrc":"/statics/pic_tag/cake1.png",
            "name":"小笼包",
            "score":"4",
            "time":"2024-04-21",
            "content":"好吃的一个小笼包"
          },
          {
            "id":2,
            "imgSrc":"/statics/pic_tag/cake.png",
            "name":"小笼包",
            "score":"4",
            "time":"2024-04-21",
            "content":"好吃的一个小笼包"
          },
          {
            "id":3,
            "imgSrc":"/statics/pic_tag/drink.png",
            "name":"小笼包",
            "score":"4",
            "time":"2024-04-21",
            "content":"好吃的一个小笼包"
          },
        ]
      }
    ],
      food:null,
    },

  selectServer: function (e) {//服务态度评分
    var key = e.currentTarget.dataset.key
    if (this.data.key == 1 && e.currentTarget.dataset.key == 1) {//当有一颗星的时候再次点击取消选中
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
        key: key
    })
  },
  user_content:function(e){
    //这个地方还可以改成表单提交进行优化
    this.setData({
      user_input: e.detail.value
    })
  },
  confirm_content:function(e){
    if(this.data.user_input == ""){
      wx.showToast({
        title: '评价不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if(this.data.key == 0){
      wx.showToast({
        title: '评分不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      //上传该用户评论：评分，评价，用户名，用户头像，评分日期  
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份  
      var Y =date.getFullYear();
      //获取月份  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
      this.setData({
        date: Y + '-'  + M+ '-' + D
      })
      var newcomment =  {
        "id":1,
        "imgSrc":"/statics/pic_tag/cake1.png",
        "name":"小笼包",
        "score":this.data.key,
        "time":this.data.date,
        "content":this.data.user_input
      };
      var t4 = "testdata["+0+"].comment";
      var newlist = this.data.testdata[0].comment.concat(newcomment);
      this.setData({
         [t4]: newlist,
         food: this.data.testdata[this.data.foodId]
      })
    }
  },
  onLoad:function(options){
    var secondId = options.id;
    // console.log(secondId);
    this.setData({
      foodId:secondId,
      food: this.data.testdata[secondId],
    });
  }
},
)