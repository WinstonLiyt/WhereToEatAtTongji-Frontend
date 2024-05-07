// pages/post/post.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabbar: {
            type: Object,
            value: {
            "backgroundColor": "#fff2d9",
            "color": "#979795",
            "selectedColor": "#e5bb69",
            "list": [
                {
                "pagePath": "/pages/index/index",
                "iconPath": "icon/icon_home.png",
                "selectedIconPath": "icon/icon_home_HL.png",
                "text": "首页"
                },
                {
                "pagePath": "/pages/middle/middle",
                "iconPath": "icon/icon_release.png",
                "isSpecial": true,
                "text": "发布"
                },
                {
                "pagePath": "/pages/mine/mine",
                "iconPath": "icon/icon_mine.png",
                "selectedIconPath": "icon/icon_mine_HL.png",
                "text": "我的"
                }
            ]
            }
        }
    },
  /**
   * 页面的初始数据
   */
  data: {
    "message": "strings",
    "post": {},
    "comments": []
  },

  /**
 * 组件的方法列表
 */
    methods: {
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
            // const postId = options.id;
            const postData = {
                id: 1,
                title: "希食东的番茄牛肉拉面很不错",
                user_name: "傘木 希美",
                user_avatar: "../../statics/imgs/community/avatar.jpg",
                images: ["../../statics/imgs/community/post/food.jpg", 
                "../../statics/imgs/community/post/food.jpg"],
                label: ["美食探店", "拉面爱好者", "番茄牛肉拉面"],
                num_upvotes: 114,
                num_comments: 10,
                num_stars: 60,
                time: "2024-4-19",
                content: "希食东的番茄牛肉拉面真的是让人难以忘怀的美味！🍜 大块的牛肉，鲜嫩多汁，完美吸收了浓郁的番茄汤底，每一口都是满满的幸福感。拉面则是恰到好处的软硬,与汤汁完美结合，让人每一口都想再来一碗。在忙碌的一天后，来一碗这样的拉面，疲惫似乎都消失了。不知道你们有没有试过这样一碗让人心动的美味？如果还没有，一定要去尝一尝！🌟",
                comments: [
                    5, 6, 7
                ],
                location: "您的梦里"
            };
            
            const commentData = this.getCommentData(postData);
            
            // TODO: 评论过长且无\n会出现问题，主内容却不会，猜测是容器嵌套问题

            this.setData({
                post: postData,
                comments: commentData
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
        * 初始化评论数据
        */
       getCommentData(postData) {
            var comments = []
            for (var i = 0; i < postData.comments.length; i++) {
                var parent= this.transformRenderJson(postData.comments[i]);
                var children = [];
                for (var j = 0; j < parent.children_ids.length; j++) {
                    var child = this.transformRenderJson(parent.children_ids[i]);
                    children.push(child)
                }
                comments.push({
                    parent: parent,
                    children: children
                });
            }

            return comments;
       },

        /*
        * 工具函数-获取子评论
        */
       getComment(id) {
           /* get pseudo data */
            var comData = {
                "message": "string",
                "comments": {
                  "id": 0,
                  "user_name": "Default",
                  "user_avatar": "../../statics/imgs/community/avatar.jpg",
                  "children_ids": [
                      0
                  ],
                  "content": "THIS IS REPLY",
                  "time": "1970-1-1 00:00",
                  "num_upvotes": 0
                }
              }
            if (id == 5) {
                comData.comments.id = 5;
                comData.comments.user_name = "AAAA";
                comData.comments.user_avatar = "../../statics/imgs/community/avatar.jpg";
                comData.comments.children_ids = [51, 52];
                comData.comments.content = "AAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAA";
                comData.comments.time = "2024-4-19 12:22";
                comData.comments.num_upvotes = 100;
            }
            else if (id == 6) {
                comData.comments.id = 6;
                comData.comments.user_name = "BBBB";
                comData.comments.user_avatar = "../../statics/imgs/community/avatar1.png";
                comData.comments.children_ids = [61];
                comData.comments.content = "BBBBBBBBBBBBBB";
                comData.comments.time = "2024-4-20 15:12";
                comData.comments.num_upvotes = 15;
            }
            else if (id == 7) { 
                comData.comments.id = 7;
                comData.comments.user_name = "CCCC";
                comData.comments.user_avatar = "../../statics/imgs/community/avatar1.png";
                comData.comments.children_ids = [61];
                comData.comments.content = "CCCCCCCCCCCCCCCCCCCCCCCCC";
                comData.comments.time = "2024-4-21 12:03";
                comData.comments.num_upvotes = 459;
            }
            return comData;
       },

       /*
       * 工具函数-转换为渲染的json格式
       */
      transformRenderJson(ID) {
        var rawComment = this.getComment(ID).comments;
        var std = {
            user_avatar: rawComment.user_avatar,
            user_name: rawComment.user_name,
            num_upvotes: rawComment.num_upvotes,
            content: rawComment.content,
            time: rawComment.time,
            children_ids: rawComment.children_ids
        };
        return std;
      }
    }
})

