// pages/post/post.js

var utils = require('../../utils/util');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      location: '',
      images: [],
      title: '', 
      thoughts: '',
      label: '', 
      imgid: 0,
      realList: [],
      tempImageUrl: [],
      tempContentJson: {},
      tempImageUrlChanged:[],
      labelLegal: true,
      fileTooLarge: false,
      isPosted: false
    },
    /**
     * 组件生命周期
     */
    lifetimes:{
      attached(){
        let postdata = wx.getStorageSync('postdata') || null
        if(postdata!=null){
          this.setData(postdata)
        }
      }
    },
    /**
     * 组件的方法列表
     */
    methods: {
      onLoad() {
        utils.tjRequest({
            url: "/posts/get_draft/",
            method: "get",
        }).then(response => {
          console.log(response)
          for (var i = 0;i < response.data.images.length; i++) {
              if (response.data.images[i].startsWith("https://tjeatwhat.cn/media/images/")) {
                  continue
              }
            response.data.images[i] = utils.base_url + response.data.images[i];
          }
          this.setData({
            thoughts: response.data.content,
            label: response.data.label,
            title: response.data.title,
            location: response.data.ip,
            images: response.data.images
        })
          
        }).catch(error => {
          // 请求失败时执行的操作
            wx.showToast({
                title: '加载草稿失败',
                icon: 'none',
                duration: 2000
              })
          console.error("Load draft fail");
        });
      },
      async onUnload() {
        if (!this.checkVdility(this.data.location)) {
            wx.showToast({
                title: '位置信息含非法字符，存储位置信息失败',
                icon: 'none',
                duration: 2000
              })
            // return;
        }

        if (!this.checkVdility(this.data.title)) {
            wx.showToast({
                title: '标题含非法字符，存储标题失败',
                icon: 'none',
                duration: 2000
              })
            // return;
        }

        if (!this.checkVdility(this.data.thoughts)) {
            wx.showToast({
                title: '内容含非法字符，存储内容失败',
                icon: 'none',
                duration: 2000
              })
            // return;
        }

        console.log(this.data.label)
        if (!this.checkVdility(this.data.label)) {
            console.log("yyyyyyyyyyyyyyyyyyyy")
            wx.showToast({
                title: '标签含非法字符，存储标签失败',
                icon: 'none',
                duration: 2000
              })
            // return;
        }
        
          if (!this.data.isPosted) {
            await this.updateImageNames(this.data.images)
            var draftJson = {
                images:this.data.tempImageUrlChanged,
                ip: this.checkVdility(this.data.location)? this.data.location: "",
                title: this.checkVdility(this.data.title)? this.data.title: "",
                content: this.checkVdility(this.data.thoughts)? this.data.thoughts: "",
                label: this.checkVdility(this.data.label)? this.data.label: ""
              };
              console.log(draftJson)
            
            utils.tjRequest({
                url: "/posts/save_draft/",
                method: "post",
                data: draftJson
            }).then(response => {
              console.log("存储草稿成功")
            }).catch(error => {
              // 请求失败时执行的操作
                wx.showToast({
                    title: '存储草稿失败',
                    icon: 'none',
                    duration: 2000
                  })
              console.error("Save draft fail");
            });
          }
        //   console.log("hhh")
        
      },
      post(){
        var that = this;
        /**
         * @信息传递到首页
         */
        this.triggerEvent('postlistener',{
          images:this.data.images,
          location:this.data.location,
          content:this.data.content
        })
      },
      chooseImage() {
        wx.chooseImage({
          count: 9, //默认9
          sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.data.images.length != 0) {
              this.setData({
                images: this.data.images.concat(res.tempFilePaths)
              })
            } else {
              this.setData({
                images: res.tempFilePaths
              })
            }
          }
        });
      },
      ViewImage(e) {
        wx.previewImage({
          urls: this.data.images,
          current: e.currentTarget.dataset.url
        });
        console.log(e.currentTarget.dataset.url);
      },
      DelImg(e) {
        console.log(this.data.images.splice(e.currentTarget.dataset.index, 1));
        console.log(e);
        this.setData({
          images: this.data.images
        })
      },
      getInputValue(e) {
        const { id } = e.currentTarget; // 获取当前输入框的 id
        const value = e.detail.value; // 获取输入框的内容

        if (id === 'label') {
            // 使用正则表达式匹配所有以#开头的标签
            let trimmedStr = value.trim();

            // if (trimmedStr[0] !== "#") {
            //     wx.showToast({
            //       title: '请以 # 开头',
            //       icon: "error"
            //     })
            //     this.data.labelLegal = false;
            // }
            // else {
            //     this.data.labelLegal = true;
            // }

            // let splitStr = trimmedStr.split("#").filter(Boolean).map(s => s.trim());
            // console.log(splitStr)
            this.setData({
                label: trimmedStr
            });
        } else {
            // 更新标题或想法
            this.setData({
                [id]: value
            });
        }
      },
      async onTapShare() {
          console.log(this.data.images)
        await this.updateImageNames(this.data.images)
        // console.log(this.data.tempImageUrlChanged)
        console.log(this.data.tempImageUrlChanged)

        if (this.data.fileTooLarge) {
          this.setData({
            fileTooLarge: false
          })
          return;
        }

        if (this.data.title == "") {
            wx.showToast({
                title: '标题不能为空',
                icon: "error"
              })
              return;
        }

        if (!this.checkVdility(this.data.location)) {
            wx.showToast({
                title: '位置信息含非法字符，发布位置信息失败',
                icon: 'none',
                duration: 2000
              })
            return;
        }

        if (!this.checkVdility(this.data.title)) {
            wx.showToast({
                title: '标题含非法字符，发布标题失败',
                icon: 'none',
                duration: 2000
              })
            return;
        }

        if (!this.checkVdility(this.data.thoughts)) {
            wx.showToast({
                title: '内容含非法字符，发布内容失败',
                icon: 'none',
                duration: 2000
              })
            return;
        }

        console.log(this.data.label)
        if (!this.checkVdility(this.data.label)) {
            console.log("yyyyyyyyyyyyyyyyyyyy")
            wx.showToast({
                title: '标签含非法字符，发布标签失败',
                icon: 'none',
                duration: 2000
              })
            return;
        }
        // if (!this.data.labelLegal) {
        //     wx.showToast({
        //         title: '标签以 # 开头',
        //         icon: "error"
        //       })
        //       return;
        // }
        var contentJson = {
            images:this.data.tempImageUrlChanged,
            ip: this.data.location,
            title: this.data.title,
            content: this.data.thoughts,
            label: this.data.label
          };
          console.log(contentJson)

          // 测试创造帖子！！！！！！！！
          utils.tjRequest({
              url: "/posts/create/",
              method: "post",
              data: contentJson,
          }).then(response => {
            console.log("Create post success");
            this.setData({
                isPosted: true
            })
            wx.navigateBack({})
          }).catch(error => {
            // 请求失败时执行的操作
              wx.showToast({
                  title: '发布失败',
                  icon: 'none',
                  duration: 2000
                })
          
            console.error("Create post fail");
          });
      },

      async updateImageNames(imagePaths) {
        let tempImageUrlChanged = [];
        for (const src of imagePaths) {
          try {
              console.log(src)
              if (src.startsWith("https://tjeatwhat.cn/media/images/")) {
                tempImageUrlChanged.push(src);
              }
              else {
                const response = await utils.tjFileUpLoad({
                    url: "/image/",
                    filePath: src,
                  });
                  const newName = JSON.parse(response.data).new_name;
                  tempImageUrlChanged.push(newName);
              }
            
          } catch (error) {
            wx.showToast({
                title: '图片过大',
                icon: "error"
              })
              this.setData({
                  fileTooLarge: true
              })
          }
        }
        this.setData({
          tempImageUrlChanged: tempImageUrlChanged,
        });
      },
      checkVdility(str) {
        if (/[^a-zA-Z0-9\u4e00-\u9fa5,.!?，。！？\n]/.test(str)) {
            return false;
        }
        return true;
      }
    }
  })

