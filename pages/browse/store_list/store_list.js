// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    search_input:"",
    noodle_filter:false,
    cake_filter:false,
    drink_filter:false,
    breakfast_filter:false,
    fruit_filter:false,
    bbq_filter:false,
    western_filter:false,
    rice_filter:false,
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
    storelist:null
  },
  onLoad: function(options){
    this.setData({
      storelist: this.data.testData.data,
    });
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
      this.getTabBar().setList();
    }
  },
  user_content:function(e){
    //这个地方还可以改成表单提交进行优化
    this.setData({
      search_input: e.detail.value
    })
  },
  confirm_content:function(e){
    if(this.data.search_input == ""){
      this.setData({
        storelist: this.data.testData.data
      });      
    }
    else{
      var list = [];
      var list0 = this.data.storelist;
      for(var i=0;i<list0.length;i++){
        var string = list0[i].name;
        //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
        if(string.indexOf(this.data.search_input) >= 0){
          list.push(list0[i]);
        }
      }
      this.setData({
        storelist: list
      });      
    }
  },
  next_calculator:function(options){
      wx.navigateTo({
        url: '/pages/browse/store_page/store_page?id=' + options.mark.storeid
      })
  },
  noodlesfilter:function(options){
      if(this.data.noodle_filter){
        this.setData({
          storelist: this.data.testData.data,
          noodle_filter:false,
        });
      }
      else {
        var storeList = [];
        Object.keys(this.data.testData.data).forEach((item)=>{
          if(this.data.testData.data[item].type=="面食"){
            storeList.push(this.data.testData.data[item]);
          }
        });
        this.setData({
          storelist: storeList,
          noodle_filter: true,//true表示为筛选的状态
          cake_filter:false,
          drink_filter:false,
          breakfast_filter:false,
          fruit_filter:false,
          bbq_filter:false,
          western_filter:false,
          rice_filter:false,
        });
      }
  },
  cakefilter:function(options){
    if(this.data.cake_filter){
      this.setData({
        storelist: this.data.testData.data,
        cake_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="甜品"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        cake_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        drink_filter:false,
        breakfast_filter:false,
        fruit_filter:false,
        bbq_filter:false,
        western_filter:false,
        rice_filter:false,
      });
    }
  },
  drinkfilter:function(options){
    if(this.data.drink_filter){
      this.setData({
        storelist: this.data.testData.data,
        drink_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="饮品"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        drink_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        breakfast_filter:false,
        fruit_filter:false,
        bbq_filter:false,
        western_filter:false,
        rice_filter:false,
      });
    }
  },
  breakfastfilter:function(options){
    if(this.data.breakfast_filter){
      this.setData({
        storelist: this.data.testData.data,
        breakfast_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="早餐"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        breakfast_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        drink_filter:false,
        fruit_filter:false,
        bbq_filter:false,
        western_filter:false,
        rice_filter:false,
      });
    }
  },
  fruitfilter:function(options){
    if(this.data.fruit_filter){
      this.setData({
        storelist: this.data.testData.data,
        fruit_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="水果"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        fruit_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        drink_filter:false,
        breakfast_filter:false,
        bbq_filter:false,
        western_filter:false,
        rice_filter:false,
      });
    }
  },
  bbqfilter:function(options){
    if(this.data.bbq_filter){
      this.setData({
        storelist: this.data.testData.data,
        bbq_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="烧烤"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        bbq_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        drink_filter:false,
        breakfast_filter:false,
        fruit_filter:false,
        western_filter:false,
        rice_filter:false,
      });
    }
  },
  westernfilter:function(options){
    if(this.data.western_filter){
      this.setData({
        storelist: this.data.testData.data,
        western_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="西餐"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        western_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        drink_filter:false,
        breakfast_filter:false,
        fruit_filter:false,
        bbq_filter:false,
        rice_filter:false,
      });
    }
  },
  ricefilter:function(options){
    if(this.data.rice_filter){
      this.setData({
        storelist: this.data.testData.data,
        rice_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.testData.data).forEach((item)=>{
        if(this.data.testData.data[item].type=="炒菜"){
          storeList.push(this.data.testData.data[item]);
        }
      });
      this.setData({
        storelist: storeList,
        rice_filter: true,//true表示为筛选的状态
        noodle_filter:false,
        cake_filter:false,
        drink_filter:false,
        breakfast_filter:false,
        fruit_filter:false,
        bbq_filter:false,
        western_filter:false,
      });
    }
  },
},
)
