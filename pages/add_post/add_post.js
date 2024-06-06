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
      label: "", 
      imgid: 0,
      realList: [],
      tempImageUrl: [],
      tempContentJson: {},
      tempImageUrlChanged:[],
      labelLegal: true,
      fileTooLarge: false
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

            if (trimmedStr[0] !== "#") {
                wx.showToast({
                  title: '请以 # 开头',
                  icon: "error"
                })
                this.data.labelLegal = false;
            }
            else {
                this.data.labelLegal = true;
            }

            let splitStr = trimmedStr.split("#").filter(Boolean).map(s => s.trim());
            console.log(splitStr)
            this.setData({
                [id]: splitStr[0]
            });
        } else {
            // 更新标题或想法
            this.setData({
                [id]: value
            });
        }
      },
      async onTapShare() {
        await this.updateImageNames(this.data.images)
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
        if (!this.data.labelLegal) {
            wx.showToast({
                title: '标签以 # 开头',
                icon: "error"
              })
              return;
        }
        var contentJson = {
            images:this.data.tempImageUrlChanged,
            ip: this.data.location,
            title: this.data.title,
            content: this.data.thoughts,
            label: this.data.label
          };

          // 测试创造帖子！！！！！！！！
          utils.tjRequest({
              url: "/posts/create/",
              method: "post",
              data: contentJson,
          }).then(response => {
            console.log("Create post success");
            wx.navigateBack({})
          }).catch(error => {
            // 请求失败时执行的操作
              wx.showToast({
                  title: '标题或内容含非法字符',
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
            const response = await utils.tjFileUpLoad({
              url: "/image/",
              filePath: src,
            });
            const newName = JSON.parse(response.data).new_name;
            tempImageUrlChanged.push(newName);
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
      }
    }
  })

