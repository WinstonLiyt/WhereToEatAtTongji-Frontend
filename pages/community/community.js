// pages/community/community.js
var utils = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    "message": "string",
    "posts": [],
    "search_value": "",
    btnHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    // 发
    /*
    username
    avatar
    */

    utils.tjRequest({
        url: "/posts/search/",
        method: "post",
        data: {
            content: "",
            user_id: 1
        }
    }).then(response => {
        
        for (var i = 0;i < response.data.posts.length; i++) {
            response.data.posts[i].user_avatar = utils.base_image_url + "avatar/" + response.data.posts[i].user_avatar
            response.data.posts[i].time = this.datetimeConverter(response.data.posts[i].time)
            for (var j = 0; j < response.data.posts[i].images.length; j++) {
                response.data.posts[i].images[j] = utils.base_url + response.data.posts[i].images[j]
             }
             response.data.posts[i]["imageDisplay"] = response.data.posts[i].images.slice(0, Math.min(2, response.data.posts[i].images.length))
             response.data.posts[i]["hasLabel"] = (response.data.posts[i].label === "")? false : true;
             console.log(response.data.posts[i]["hasLabel"])
        }
        console.log(response.data.posts)
        this.setData({
            posts: response.data.posts
        })
        console.log(response.data.posts)
        console.log("Search content success");
    }).catch(error => {
        // 请求失败时执行的操作
        console.error("Search content fail");
    });

    console.log(this.data.posts)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
      this.getTabBar().setList();
    }

    utils.tjRequest({
        url: "/posts/search/",
        method: "post",
        data: {
            content: ""
        }
    }).then(response => {
        for (var i = 0;i < response.data.posts.length; i++) {
            response.data.posts[i].user_avatar = utils.base_image_url + "avatar/" + response.data.posts[i].user_avatar
            response.data.posts[i].time = this.datetimeConverter(response.data.posts[i].time)
            for (var j = 0; j < response.data.posts[i].images.length; j++) {
                response.data.posts[i].images[j] = utils.base_url + response.data.posts[i].images[j]
             }
             response.data.posts[i]["imageDisplay"] = response.data.posts[i].images.slice(0, Math.min(2, response.data.posts[i].images.length))
             response.data.posts[i]["hasLabel"] = (response.data.posts[i].label === "")? false : true;
        }
        console.log(response.data.posts)
        this.setData({
            posts: response.data.posts
        })
      console.log("Search content success");
    }).catch(error => {
      // 请求失败时执行的操作
      console.error("Search content fail");
    });
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
    this.setData({
        btnHidden: true // 滚动到底部时隐藏按钮
    });
  },

  onPageScroll(e) {
    const currentScrollTop = e.scrollTop; // 当前滚动位置
    const lastScrollTop = this.data.lastScrollTop; // 上一个滚动位置

    if (currentScrollTop < lastScrollTop) {
      this.setData({
            btnHidden: false
        });
    }

    // 更新上一个滚动位置为当前滚动位置
    this.setData({
      lastScrollTop: currentScrollTop
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log("rerewrewrrwerwrwerwerwerwe")
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
    console.log("这是点击详细信息之后")
    console.log(event.currentTarget.dataset.postid)

    wx.navigateTo({
        url: '/pages/post/post?post_id=' + JSON.stringify({
            post_id: event.currentTarget.dataset.postid, 
            is_user: event.currentTarget.dataset.isuser,
            upvoted: event.currentTarget.dataset.upvoted,
            stared: event.currentTarget.dataset.stared,
            num_upvotes: event.currentTarget.dataset.numupvotes,
            num_stars: event.currentTarget.dataset.numstars
        }),
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
      utils.tjRequest({
          url: "/posts/search/",
          method: "post",
          data:  {
              user_id: 1,
              content: event.detail.value
          }
      }).then(response => {
        for (var i = 0;i < response.data.posts.length; i++) {
            response.data.posts[i].user_avatar = utils.base_image_url + "avatar/" + response.data.posts[i].user_avatar
            response.data.posts[i].time = this.datetimeConverter(response.data.posts[i].time)
            for (var j = 0; j < response.data.posts[i].images.length; j++) {
                response.data.posts[i].images[j] = utils.base_url + response.data.posts[i].images[j]
             }
             response.data.posts[i]["imageDisplay"] = response.data.posts[i].images.slice(0, Math.min(2, response.data.posts[i].images.length))
             response.data.posts[i]["hasLabel"] = (response.data.posts[i].label === "")? false : true;
        }
        console.log(response.data.posts)
          this.setData({
              posts: response.data.posts
          })
        console.log("Search content success");
      }).catch(error => {
        // 请求失败时执行的操作
        console.error("Search content fail");
      });
  },

  onTapSearchBtn(event) {
      console.log(this.data.search_value)
    utils.tjRequest({
        url: "/posts/search/",
        method: "post",
        data:  {
            content: this.data.search_value
        }
    }).then(response => {
        console.log(response)
      for (var i = 0;i < response.data.posts.length; i++) {
          response.data.posts[i].user_avatar = utils.base_image_url + "avatar/" + response.data.posts[i].user_avatar
          response.data.posts[i].time = this.datetimeConverter(response.data.posts[i].time)
          for (var j = 0; j < response.data.posts[i].images.length; j++) {
            response.data.posts[i].images[j] = utils.base_url + response.data.posts[i].images[j]
         }
         response.data.posts[i]["imageDisplay"] = response.data.posts[i].images.slice(0, Math.min(2, response.data.posts[i].images.length))
         response.data.posts[i]["hasLabel"] = (response.data.posts[i].label === "")? false : true;
      }
        this.setData({
            posts: response.data.posts
        })
      console.log("Search content success");
    }).catch(error => {
      // 请求失败时执行的操作
      console.error("Search content fail");
    });
  },

  // 监听页面滚动到底部事件
  scrollToLower() {
    this.setData({
      btnHidden: true // 滚动到底部时隐藏按钮
    });
  },
  // 监听页面滚动到非底部事件
  scrollToUpper() {
    this.setData({
      btnHidden: false // 滚动到非底部时显示按钮
    });
  },

  addPost() {
    wx.navigateTo({
        url: '/pages/add_post/add_post',
        fail: function(error) {
            console.error('rfailed', error);
        }
    })
  },
  onTapReaction(e) {
    var item = this.data.posts[e.currentTarget.dataset.itemid];
    var reaction_name = e.currentTarget.id;
    console.log(e)
    if (reaction_name == "num_comments") {
        wx.navigateTo({
            url: '/pages/post/post?post_id=' + JSON.stringify({
                post_id: e.currentTarget.dataset.postid, 
                is_user: e.currentTarget.dataset.isuser,
                upvoted: e.currentTarget.dataset.upvoted,
                stared: e.currentTarget.dataset.stared,
                num_upvotes: e.currentTarget.dataset.numupvotes,
                num_stars: e.currentTarget.dataset.numstars
            }),
            fail: function(error) {
                console.error('rfailed', error);
            }
        })
    }
    else {
        var change = false;
        if (reaction_name == "num_upvotes") {
            item.upvoted = (item.upvoted)? false: true;
            item.num_upvotes += (item.upvoted)? 1 : -1;
            change = item.upvoted;
        }
        else {
            item.stared = (item.stared)? false: true;
            item.num_stars += (item.stared)? 1 : -1;
            change = item.stared;
        }


    // 后端检查是否更改成功
    var that  = this
        utils.tjRequest({
            url: "/posts/change_post_reaction/",
            method: "put",
            data: {
                field: reaction_name,
                change: change,
                user_id: 1,
                post_id: e.currentTarget.dataset.postid
            }
        }).then(response => {
            let posts = that.data.posts.slice();
            posts[e.currentTarget.dataset.itemid] = item;
            that.setData({
                posts: posts
            });
            console.log("改变忒子点赞数量 success");
          }).catch(error => {
            // 请求失败时执行的操作
            console.error("改变忒子点赞数量 fail");
          });
    }
  },

  DelPost(e) {
    console.log(e)
    console.log(this.data.posts[e.currentTarget.dataset.index].id)

    wx.showModal({
      title: '确认删除',
      content: '确认删除该帖子？',
      complete: (res) => {
        if (res.cancel) {
          
        }

    
        if (res.confirm) {
            utils.tjRequest({
                url: "/posts/delete/",
                method: "delete",
                data: {
                    post_id: this.data.posts[e.currentTarget.dataset.index].id
                }
            }).then(response => {
                var temp_posts = this.data.posts;
                temp_posts.splice(e.currentTarget.dataset.index, 1);
                console.log(temp_posts)
                this.setData({
                    posts: temp_posts
                })
                console.log("Delete post success");
              }).catch(error => {
                // 请求失败时执行的操作
                console.error("Delete post fail");
              });
        }
      }
    })
    // 测试删除帖子
    


    //   var temp_posts = this.data.posts;
    //     temp_posts.splice(e.currentTarget.dataset.index, 1);
    //     this.setData({
    //         posts: temp_posts
    //     })
  },
  ViewImage(e) {
      // 仅支持网络图片
      console.log(e.currentTarget.dataset.current)
    wx.previewImage({
      urls: [e.currentTarget.dataset.current]
    });
  },
  datetimeConverter(mySqlTime) {
        const datetime = new Date(mySqlTime);

        const year = datetime.getFullYear();
        const month = String(datetime.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并确保两位数
        const day = String(datetime.getDate()).padStart(2, '0'); // 确保两位数的日期 // 月份从0开始，需要加1，并确保两位数

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
})