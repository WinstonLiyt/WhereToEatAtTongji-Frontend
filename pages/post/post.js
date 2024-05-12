// pages/post/post.js
var utils = require('../../utils/util');
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
    "comments": [],
    "post_id": 0,
    "is_user": false,
    "upvoted": false,
    "stared": false,
    "inputBoxShow": false,
    "commentShow": false,
    "tempCommentContent": "",
    "tempCommentType": -1,
    "tempOthers": {},
    maskColor: "#fff2d9",
    noImage: "50%",
    hasLocation: true,
    hasLabel: true
  },

  /**
 * 组件的方法列表
 */
    methods: {
        /**
         * 生命周期函数--监听页面加载
         */
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
            console.log("loadinggggg")
            // const postId = options.id;
            this.data.post_id= JSON.parse(options.post_id).post_id;//解析得到对象 
            this.data.is_user = JSON.parse(options.post_id).is_user;
            var upvoted = JSON.parse(options.post_id).upvoted;
            var stared = JSON.parse(options.post_id).stared;

            this.setData({
                upvoted: upvoted,
                stared: stared
            });

            var postData = {}
            utils.tjRequest({
                url: "/posts/details/",
                method: "post",
                data: {
                    id: this.data.post_id
                }
            }).then(response => {
                postData = response.data.post
                postData.user_avatar = utils.base_image_url + "avatar/" + postData.user_avatar
                postData.time = this.datetimeConverter(postData.time)

                for (var j = 0; j < postData.images.length; j++) {
                    postData.images[j] = utils.base_url + postData.images[j]
                 }

                 if (postData.images.length == 0) {
                     this.setData({
                        noImage: "5%"
                     })
                 }

                 if (postData.label == "") {
                    this.setData({
                        hasLabel: false
                     })
                 }

                 if (postData.ip == "") {
                    this.setData({
                        hasLocation: false
                     })
                 }

                const commentData = this.getCommentData(postData);
                commentData.then(res => {
                  this.setData({
                      comments: res,
                      post: postData
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
                  
                  console.log("浏览帖子详细信息 success");
                })
                
              }).catch(error => {
                // 请求失败时执行的操作
                console.log(error)
                console.error("浏览帖子详细信息  fail");
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
            //获取已经打开的页面的数组
            var pages = getCurrentPages();
            //获取上一个页面的所有的方法和data中的数据
            var lastpage = pages[pages.length - 2]
            //改变上一个页面中的data中的数据
            for (var i  = 0; i < lastpage.data.posts.length; i++) {
                if (lastpage.data.posts[i].id == this.data.post_id) {
                    var temp = lastpage.data.posts
                    temp[i].upvoted = this.data.upvoted
                    temp[i].stared = this.data.stared
                    temp[i].num_upvotes = this.data.post.num_upvotes
                    temp[i].num_stars = this.data.post.num_stars
                    lastpage.setData({  
                        posts: temp
                    })
                }
            }
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
       async getCommentData(postData) {
            var comments = []
            for (var i = 0; i < postData.comments.length; i++) {
                var parent= await this.transformRenderJson(postData.comments[i]);
                var children = [];
                for (var j = 0; j < parent.children_ids.length; j++) {
                    var child = await this.transformRenderJson(parent.children_ids[j]);
                    child['parentid'] = parent.id;
                    children.push(child);
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
           var comData = {}
              return utils.tjRequest({
                    url: "/posts/getcomments/",
                    method: "post",
                    data: {
                        id: id,
                    }
                })
       },

       /*
       * 工具函数-转换为渲染的json格式
       */
      async transformRenderJson(ID) {
        var rawComment = await this.getComment(ID);
        rawComment = rawComment.data.comments
        const st_avatar = utils.base_image_url + "avatar/" + rawComment.user_avatar

        var std = {
            id: rawComment.id,
            is_upvoted: rawComment.upvoted,
            user_avatar: st_avatar,
            user_name: rawComment.user_name,
            num_upvotes: rawComment.num_upvotes,
            content: rawComment.content,
            time: this.datetimeConverter(rawComment.time),
            children_ids: rawComment.children_ids,
            is_user: rawComment.is_user
        };
        return std;
      },
        /* 对评论进行评论 */
        onTapReply(parentcommentid, replayusername, content, replyToParent) {
            var that = this;

            console.log(((replyToParent == 2)? '@' + replayusername + " ": "") + content)
            utils.tjRequest({
                url: "/posts/reply_comment/",
                method: "post",
                data: {
                    parent_comment_id: parentcommentid,
                    content: ((replyToParent == 2)? '@' + replayusername + " ": "") + content
                    // content: '@' + replayusername + " " + content
                }
            }).then(response => {
                var tempComments = this.data.comments
                console.log(tempComments)
                for (var i = 0; i < tempComments.length; i++) {
                    if (tempComments[i].parent.id == parentcommentid) {
                        tempComments[i].parent.children_ids.push(response.data.comments.id)
                        var st_avatar = utils.base_image_url + "avatar/" + response.data.comments.user_avatar
                        tempComments[i].children.push({
                            id: response.data.comments.id,
                            is_upvoted: false,
                            user_avatar: st_avatar,
                            user_name: response.data.comments.user_name,
                            num_upvotes: 0,
                            content: response.data.comments.content,
                            time: this.datetimeConverter(response.data.comments.time),
                            children_ids: [],
                            is_user: true,
                            parentid: parentcommentid
                        })
                    }
                }

                console.log(555)

                that.setData({
                    comments: tempComments
                })

                console.log("回复评论 success");
            }).catch(error => {
                // 请求失败时执行的操作
                console.error("回复评论 null fail");
            });
    
        },
      /* 对post发表评论 */
      onConfirmMakeComments(e) {
        console.log(this.data.tempCommentContent)
        console.log(this.data.tempCommentType)
        console.log(this.data.tempOthers)

        if (this.data.tempCommentContent === "") {
            wx.showToast({
                title: '评论不能为空',
                icon: 'error',
                duration: 1500
              })
              this.setData({
                inputBoxShow: false
            })
            return;
        }

          var content = this.data.tempCommentContent
          if (this.data.tempCommentType > 0) {
            // 对评论的评论
            this.onTapReply(
                this.data.tempOthers.parentcommentid,
                this.data.tempOthers.replayusername,
                content,
                this.data.tempCommentType
            )
          }
          else if (this.data.tempCommentType == 0) {
             // 对post的评论
             utils.tjRequest({
                 url: "/posts/comment/",
                 method: "post",
                 data: {
                     post_id: this.data.post_id,
                     user_id: 1,
                     content: content
                 }
             }).then(response => {
                var tempComments = this.data.comments
                console.log( response.data)
                var st_avatar = utils.base_image_url + "avatar/" + response.data.comment.user_avatar

                tempComments.push({
                    parent: {
                        id: response.data.comment.id,
                        is_upvoted: false,
                        user_avatar: st_avatar,
                        user_name: response.data.comment.user_name,
                        num_upvotes: 0,
                        content: content,
                        time: this.datetimeConverter(response.data.comment.time),
                        children_ids: [],
                        is_user: true
                    },
                    children: []
                })

                this.setData({
                    comments: tempComments
                })
                
                console.log("评论帖子 success");
              }).catch(error => {
                // 请求失败时执行的操作
                console.log(error)
                console.error("评论帖子 fail");
              });
          }

          this.setData({
              inputBoxShow: false
          })
      },
      onTapCommentUpvote(e) {
        console.log(e)

        var parent_comment_id = e.currentTarget.dataset.pindex
        var child_array_index = e.currentTarget.dataset.cindex

        console.log(child_array_index)

        // console.log(this.data.comments)

        for (var i = 0; i < this.data.comments.length; i++) {
            var comment_block = this.data.comments[i]
            console.log(comment_block)
            if (child_array_index === "") {
                // 夫评论
                if (comment_block.parent.id == parent_comment_id) {
                    comment_block.parent.is_upvoted = (comment_block.parent.is_upvoted)? false: true;
                    comment_block.parent.num_upvotes += (comment_block.parent.is_upvoted)? 1 : -1;
                    var change = comment_block.parent.is_upvoted;
                    console.log(comment_block)
                    // console.log(comment_block.children[child_array_index].id)
                    
                    var temp = this.data.comments;
                    temp[i] = comment_block

                    // 后端
                    utils.tjRequest({
                        url: "/posts/change_comment_reaction/",
                        method: "put",
                        data: {
                            change: change,
                            comment_id: parent_comment_id
                        }
                    }).then(response => {
                        this.setData({
                            comments: temp
                        });
                        console.log("改变评论点赞数量 success");
                      }).catch(error => {
                        // 请求失败时执行的操作
                        console.log(error)
                        console.error("改变评论点赞数量 fail");
                      });
                    break;
                }
                
            }
            else {
                // 子评论
                if (comment_block.parent.id == parent_comment_id) {
                    var target_child_comment = comment_block.children[child_array_index];
                    
                    target_child_comment.is_upvoted = (target_child_comment.is_upvoted)? false: true;
                    target_child_comment.num_upvotes += (target_child_comment.is_upvoted)? 1 : -1;
                    var change = target_child_comment.is_upvoted;

                    var temp = this.data.comments;
                    comment_block[child_array_index] = target_child_comment
                    temp[i] = comment_block

                    this.setData({
                        comments: temp
                    });

                    // 后端
                    var that = this
                    utils.tjRequest({
                        url: "/posts/change_comment_reaction/",
                        method: "put",
                        data: {
                            change: change,
                            comment_id: comment_block.children[child_array_index].id
                        }
                    }).then(response => {
                        that.setData({
                            comments: temp
                        });
                        console.log("改变评论点赞数量 success");
                      }).catch(error => {
                        // 请求失败时执行的操作
                        console.error("改变评论点赞数量 fail");
                      });

                    break;

                }
            }
        }
        
        },
        onTapDelete(e) {
            console.log(e);
            var that = this

            var parent_comment_id = e.currentTarget.dataset.parentcommentid
            console.log(parent_comment_id)
            var parent_comment_index = -1
            var child_array_index = e.currentTarget.dataset.childindex
            var child_comment_id = -1

            for (var i = 0; i < this.data.comments.length; i++) {
                if (this.data.comments[i].parent.id == parent_comment_id) {
                    parent_comment_index = i
                    if (child_array_index !== "") {
                        child_comment_id = this.data.comments[i].children[child_array_index].id
                    }
                }
            }
            console.log(parent_comment_index)
            
            
            utils.tjRequest({
                url: "/posts/delete_comment/",
                method: "delete",
                data: {
                    id: (child_comment_id < 0)? parent_comment_id : child_comment_id
                }
            }).then(response => {
                var tempComments = this.data.comments
                if (child_comment_id < 0) {
                    tempComments.splice(parent_comment_index, 1)
                } else {
                    tempComments[parent_comment_index].children.splice(child_array_index, 1)
                }

                this.setData({
                    comments: tempComments
                })
              console.log("回复评论 success");
            }).catch(error => {
              // 请求失败时执行的操作
              console.error("回复评论 null fail");
            });

            var tempComments = this.data.comments
            if (child_comment_id < 0) {
                tempComments.splice(parent_comment_index, 1)
            } else {
                tempComments[parent_comment_index].children.splice(child_array_index, 1)
            }

            this.setData({
                comments: tempComments
            })

        },
        onTapPostReaction(e) {

            var reaction_name = e.currentTarget.id;
            console.log(e)

            var change = false;
            if (reaction_name == "num_upvotes") {
                this.data.upvoted = (this.data.upvoted)? false: true;
                this.data.post.num_upvotes += (this.data.upvoted)? 1 : -1;
                change = this.data.upvoted;
            }
            else {
                this.data.stared = (this.data.stared)? false: true;
                this.data.post.num_stars += (this.data.stared)? 1 : -1;
                change = this.data.stared;
            }


        // 后端检查是否更改成功
            utils.tjRequest({
                url: "/posts/change_post_reaction/",
                method: "put",
                data: {
                    field: reaction_name,
                    change: change,
                    user_id: 1,
                    post_id: this.data.post_id
                }
            }).then(response => {
                let post = this.data.post;
                this.setData({
                    post: post,
                    upvoted: this.data.upvoted,
                    stared: this.data.stared
                });
                console.log("详细信息改变忒子点赞数量 success");
            }).catch(error => {
                // 请求失败时执行的操作
                console.error("详细信息改变忒子点赞数量 fail");
            });
        },
        makeComments(e) {
            console.log(e.currentTarget.dataset.id)
            var others = {}

            if (e.currentTarget.dataset.id > 0) {
                others["parentcommentid"] = e.currentTarget.dataset.parentcommentid
                others["replayusername"] = e.currentTarget.dataset.replayusername
            }
            this.setData({
                inputBoxShow: true,
                tempCommentType: e.currentTarget.dataset.id,
                tempOthers: others
            })
        },
        invisible(e) {
            this.setData({
                inputBoxShow: false,
            })
        },
        updateCommentContent(e) {
            this.setData({
                tempCommentContent: e.detail.value,
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
    }
    
})

