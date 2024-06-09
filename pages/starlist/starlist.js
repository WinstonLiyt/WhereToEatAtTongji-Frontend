// pages/notification/notification.js
// pages/community/community.js
var utils = require('../../utils/util');
Component({

  /**
   * 页面的初始数据
   */
  data: {
    "notifications": [
    ],
    "message": "string",
    "inputBoxShow": false,
    maskColor: "#fff2d9",
    "isEmpty": "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */

   methods: {
        onLoad(options) {
            wx.showLoading({
                title: '加载中',
                mask: true,
                success: () => {
                    this.setData({
                        inputBoxShow: true,
                        commentShow: false,
                        maskColor: "#fff2d9"
                    })
                }
            })

            utils.tjRequest({
                url: "/posts/load_starlist/",
                method: "get"
            }).then(response => {
                console.log(response.data);
                // http://1.92.154.154:80/media/avatar/
                this.setData({
                    notifications: response.data.notifications,
                    isEmpty: response.data.notifications.length > 0? "none": "block"
                })

                wx.hideLoading({
                    success: () => {
                        this.setData({
                            inputBoxShow: false,
                            commentShow: true,
                            maskColor: "rgba(0, 0, 0, 0.5)"
                        })
                    }
                })
            }).catch(err => {
              wx.navigateBack({delta:1})
            })
        },
    
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady() {},
    
        /**
         * 生命周期函数--监听页面显示
         */
        onShow() {},
    
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide() {},
    
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload() {
            // console.log("ooo")
            // utils.tjRequest({
            //     url: "/posts/delete_msg/",
            //     method: "delete"
            // }).then(response => {
            //     console.log(response)
            // }).catch(error => {
            //     // 请求失败时执行的操作
            //     console.error("Search content fail");
            // });
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
        toPost(e) {
            console.log("toPost")
            var targetPostId = e.currentTarget.dataset.postid;
            var upvoted = e.currentTarget.dataset.upvoted;
            var stared = e.currentTarget.dataset.stared;
            wx.navigateTo({
                url: '/pages/post/post?post_id=' + JSON.stringify({
                    post_id: targetPostId, 
                    is_user: false,
                    upvoted: upvoted,
                    stared: true,
                }),
                fail: function(error) {
                    console.error('rfailed', error);
                }
            })
        }
   }
})