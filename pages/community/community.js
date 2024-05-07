// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "message": "string",
    "posts": [],
    "search_value": ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 模拟从服务器获取数据
    const postData = [
      {
        id: 1,
        title: "希食东的番茄牛肉拉面很不错",
        user_name: "傘木 希美",
        user_avatar: "../../statics/imgs/community/avatar.jpg",
        images: ["../../statics/imgs/community/post/food.jpg", "../../statics/imgs/community/post/food.jpg"],
        label: ["ユーフォ"],
        num_upvotes: 114,
        num_comments: 514,
        num_stars: 55,
        time: "2024-4-19"
      },
      {
        id: 2,
        title: "其实食堂的份饭也挺好吃的",
        user_name: "吉川 優子",
        user_avatar: "../../statics/imgs/community/avatar1.png",
        images: ["../../statics/imgs/community/post/food.jpg"],
        label: ["ユーフォ", "フルート"],
        num_upvotes: 52,
        num_comments: 10,
        num_stars: 680,
        time: "2024-4-04"
      },
      {
        id: 3,
        title: "今天是疯狂星期四三十九时零分零秒。V我50",
        user_name: "中川 夏纪",
        user_avatar: "../../statics/imgs/community/avatar2.jpg",
        images: [],
        label: ["ユーフォ", "yummy"],
        num_upvotes: 100,
        num_comments: 18,
        num_stars: 682,
        time: "2024-04-19"
      }
    ];
    // 更新数据
    this.setData({
      posts: postData
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

  },

  /*
  * Milestone1 演示 js
  */

  onTapPostDetail(event) {
    // const postId = event.currentTarget.dataset.postId;
    // const postData = this.data.posts.find(post => post.id === postId);
    // wx.navigateTo({
    //   url: '/pages/post/post?id=' + postId,
    //   success: function (res) {
    //     // 通过eventChannel向被打开页面传送数据
    //     res.eventChannel.emit('postDetail', { data: postData })
    //   }
    // })
    wx.navigateTo({
        url: '/pages/post/post',
        fail: function(error) {
            console.error('rfailed', error);
        }
    })
  },

  onInputSearch(event) {
    console.log(event.detail.value)
    this.setData({
      search_value: event.detail.value
    })
  },

  onConfirmSearch(event) {
      console.log(event.detail.value);
  },

  onTapSearchBtn(event) {
      console.log(this.data.search_value);
  }

})