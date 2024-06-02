// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const { tjRequest } = require('../../../utils/util');
// import { tjRequest } from 'util.js'

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
    base_url:"https://tjeatwhat.cn",
    Data:null,
    storelist:null
  },
  onLoad: function(){
    const options = {
      url: '/restaurant/all/', // 用户个人信息接口的路径
      method: 'get' // 请求方法，默认为 'get'
    };
    // 调用 tjRequest 函数发起请求
    tjRequest(options).then(
      res => {
        console.log(res.data);
        this.setData({
              Data:res.data,
              storelist:res.data,
        })
    }).catch(error => {
      // 请求失败的处理逻辑
      console.error('请求用户个人信息失败：', error);
    })
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
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/browse/search/search?name=' + this.data.search_input
      })     
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
          storelist: this.data.Data,
          noodle_filter:false,
        });
      }
      else {
        var storeList = [];
        Object.keys(this.data.Data).forEach((item)=>{
          Object.keys(this.data.Data[item].tags).forEach((i)=>{
            if(this.data.Data[item].tags[i].name=="面食"){
              storeList.push(this.data.Data[item]);
            }
          });
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
        storelist: this.data.Data,
        cake_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="甜点"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        drink_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="饮品"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        breakfast_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="早点"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        fruit_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="水果"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        bbq_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="烧烤"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        western_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="西餐"){
            storeList.push(this.data.Data[item]);
          }
        });
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
        storelist: this.data.Data,
        rice_filter:false,
      });
    }
    else {
      var storeList = [];
      Object.keys(this.data.Data).forEach((item)=>{
        Object.keys(this.data.Data[item].tags).forEach((i)=>{
          if(this.data.Data[item].tags[i].name=="炒菜"){
            storeList.push(this.data.Data[item]);
          }
        });
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
