// food_page.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const { tjRequest } = require('../../utils/util');
Page({
  data: {
    foodId:null,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/statics/pic_tool/star0.png',//未选中状态
    selectedSrc: '/statics/pic_tool/star.png',//选中状态
    key: 0,//评分
    user_input:"",
    date:"",
    storeId:0,
    food:null,
    comment:null,
    base_url:"http://1.92.154.154:80",
    avatar_url:"http://1.92.154.154:80/media/avatar/",
    // reply_time:"",
  },
  replyInput: function(e) {
    let commentId = e.currentTarget.dataset.id;
    // 更新输入数据到 data
    this.setData({
      [`replyContent.${commentId}`]: e.detail.value
    });
  },

  sendReply: function(e) {
    let commentId = e.currentTarget.dataset.id;
    let replyContent = this.data.replyContent[commentId];
    if (!replyContent) {
      wx.showToast({
        title: '回复内容不能为空',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    if (replyContent.length > 20) {
      wx.showToast({
        title: '回复内容不能超过20个字',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    // 发送回复
    const option = {
      url: `/eval/${commentId}/reply/`,
      method: 'post',
      data: {
        reply: replyContent,
      }
    };
    tjRequest(option).then(res => {
      wx.showToast({
        title: '回复成功',
        icon: 'success',
        duration: 1000
      });
      
      this.setData({
        reply: res.data.reply,
        reply_time: res.data.reply_time
      });
      console.log(res.data.reply_time);
      
      // 成功后重新加载评论数据
      this.loadData(this.data.foodId);
      console.log(this.data.foodId);
    }).catch(error => {
      console.error('回复失败：', error);
    });
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
 
  loadData: function(foodId) {
    const option = {
      url: '/dish/' + foodId,
      method: 'get'
    };
    tjRequest(option).then(res => {
      this.setData({
        food: res.data,
      });
    }).catch(error => {
      console.error('获取菜品信息失败：', error);
    });
  
    const option_2 = {
      url: '/dish/' + foodId + '/eval',
      method: 'get'
    };
    tjRequest(option_2).then(res => {
      this.setData({
        comment: res.data,
      });
    }).catch(error => {
      console.error('获取菜品评价信息失败：', error);
    });
  },

  onLoad: function(options) {
    this.setData({
      foodId: options.foodid,
      storeId: options.storeid,
    });
    // 调用封装的函数加载数据
    this.loadData(this.data.foodId);
  },
},
)