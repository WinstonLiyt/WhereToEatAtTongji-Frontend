const util = require('../../utils/util')

Page({
  data: {
    page_type: "randomized",
    stores: [],
    dish_chosen: null,
    scroll_stores: [{name: '今天吃哪家？'}],
    scroll_dishes: [{name: '今天吃什么？'}],
    demos:[
      {
        dish:'哈密瓜绵绵冰',
        store:'臻好时',
        img:'/statics/pic_food/food1.jpg'
      },
      {
        dish:'日式豚骨拉面',
        store:'希食东',
        img:'/statics/pic_food/food2.jpg'
      },
      {
        dish:'热狗配炸薯条',
        store:'塔可星',
        img:'/statics/pic_food/food3.jpg'
      }
    ],
    storeAnimationData: null,
    dishAnimationData: null
  },
  shuffleArray(array) {
    const shuffledArray = [...array]; // 复制原数组，避免修改原数组
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 随机选择交换的索引
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // 交换元素
    }
    return shuffledArray;
  },
  // 函数：拼接打乱后的列表到另一个列表之后
  appendShuffledList(first, second) {
    const shuffledList = this.shuffleArray(second); // 打乱原列表顺序
    const combinedList = [...first, ...shuffledList]; // 拼接到目标列表并截取指定数量元素
    return combinedList;
  },
  getRandomRecommend(){
    this.reset('storeAnimationData');
    setTimeout(()=>{
      this.reset('dishAnimationData');
      var shuffle = this.shuffleArray(this.data.stores)
      var first = [{name: '今天吃哪家？'}]
      var stores = this.appendShuffledList(first, shuffle)
      console.log(stores)
      this.setData({
        scroll_stores: stores
      })
      this.startScroll('storeAnimationData');
      setTimeout(()=>{
        let store_id = stores[8].id
        util.tjRequest({
          url:'/recommend/getAllDishesByStoreID/',
          method:'get',
          data: {'store_id': store_id}
        }).then(res=>{
          let orgdishes = res.data.dishes
          while (orgdishes.length < 10) {
            const additional = orgdishes.slice();
            orgdishes.push(...additional);
          }

          var shuffle = this.shuffleArray(orgdishes)
          var first = [{name: '今天吃什么？'}]
          var dishes = this.appendShuffledList(first, shuffle)
          console.log(dishes)
          this.setData({
            scroll_dishes: dishes,
            dish_chosen: dishes[8]
          })
          this.startScroll('dishAnimationData');
        }).catch(err=>{
          console.log(err)
        })
      }, 3000)
    }, 10)
  },
  // 开始滚动
  startScroll (animationDataName) {
    // 创建一个动画实例
    let animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease'
    })
    // 获取元素总高度
    let height =  8 * 250
    // 向上移动
    animation.translateY(-height + 'rpx').step()
    // 将动画效果赋值
    this.setData({
      [animationDataName]: animation.export()
    })
  },
  // 重置动画
  reset (animationDataName) {
    let animation = wx.createAnimation({
      duration: 0
    })
    this.setData({
      [animationDataName]: animation.translateY(0).step().export()
    })
  },

  // toggle个性推荐/随机推荐
  changePageType(event) {
    const type = event.currentTarget.dataset.type;
    this.setData({
      page_type: type,
    });
  },
  revealCard() {
    util.tjRequest({
      url:'/recommend/getPersonalDish',
      method:'get',
    }).then(res=>{
      let demo = res.data
      const util = require('../../utils/util')
      demo['img_url'] = util.base_url + '/media/' + demo['img_url']
      this.setData({
        styleFront: 'transform:rotateY(180deg)',
        styleBack: 'transform:rotateY(0deg)',
        demo: demo
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  concealCard() {
    this.setData({
      styleFront: 'transform:rotateY(0deg)',
      styleBack: 'transform:rotateY(-180deg)'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var date = new Date();
    const monthFullNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var curDate = date.getDate()
    var dateString
    if(curDate % 10 == 1)
      dateString = String(curDate) + 'st'
    else if(curDate % 10 == 2)
      dateString = String(curDate) + 'nd'
    else if(curDate % 10 == 3)
      dateString = String(curDate) + 'rd'
    else
      dateString = String(curDate) + 'th'

    this.setData({
      curMonth: monthFullNames[date.getMonth()],
      curDate: dateString
    })

    util.tjRequest({
      url:'/recommend/getAllStore',
      method:'get',
    }).then(res=>{
      let stores = res.data.stores

      while (stores.length < 10) {
        const additionalStores = stores.slice();
        stores.push(...additionalStores);
      }

      this.setData({stores: stores})
    }).catch(err=>{
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
  onShow: function () {
    this.reset('storeAnimationData');
    this.reset('dishAnimationData');
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
      this.getTabBar().setList();
    }
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