// pages/post/post.js
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
      labels: [], 
      imgid: 0,
      realList: [],
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
        this.data.images.splice(e.currentTarget.dataset.index, 1);
        this.setData({
          images: this.data.images
        })
      },
      getInputValue(e) {
        const { id } = e.currentTarget; // 获取当前输入框的 id
        const value = e.detail.value; // 获取输入框的内容

        if (id === 'labels') {
            // 使用正则表达式匹配所有以#开头的标签
            let trimmedStr = value.trim();
            let splitStr = trimmedStr.split("#").filter(Boolean).map(s => s.trim());
            this.setData({
                [id]: splitStr
            });
        } else {
            // 更新标题或想法
            this.setData({
                [id]: value
            });
        }
      },
      onTapShare() {
        const contentJson = {
            images:this.data.images,
            location: this.data.location,
            title: this.data.title,
            thoughts: this.data.thoughts,
            labels: this.data.labels,
          };
      
          // 后续处理
          console.log('分享的内容:', contentJson);

          wx.navigateBack({})
      }

    }
  })

