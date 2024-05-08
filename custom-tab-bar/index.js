Component({
  data: {
    color: "#f6cc7a",
    selectedColor: "#e5bb69",
    selected: 0,
    role: '',
    allList: [
      [{
        "pagePath": "/pages/browse/store_list/store_list",
        "text": "美食浏览",
        "iconPath":"/statics/imgs/tabBar/browse.png",
        "selectedIconPath": "/statics/imgs/tabBar/browse_selected.png"
      }, 
      {
          "pagePath": "/pages/community/community",
          "text": "社区交流",
          "iconPath": "/statics/imgs/tabBar/community.png",
          "selectedIconPath": "/statics/imgs/tabBar/community_selected.png"
      },
      {
          "pagePath": "/pages/recommend/recommend",
          "text": "菜品推荐",
          "iconPath": "/statics/imgs/tabBar/recommend.png",
          "selectedIconPath": "/statics/imgs/tabBar/recommend_selected.png"
      },
      {
        "pagePath": "/pages/personal-student/personal-student",
          "text": "个人信息",
          "iconPath": "/statics/imgs/tabBar/personal.png",
          "selectedIconPath": "/statics/imgs/tabBar/personal_selected.png"
      }
      ],

      [{
        "pagePath": "/pages/business_edit/business_edit",
        "text": "菜品管理",
        "iconPath":"/statics/imgs/tabBar/browse.png",
        "selectedIconPath": "/statics/imgs/tabBar/browse_selected.png"
      }, 
      {
          "pagePath": "/pages/community/community",
          "text": "社区交流",
          "iconPath": "/statics/imgs/tabBar/community.png",
          "selectedIconPath": "/statics/imgs/tabBar/community_selected.png"
      },
      {
        "pagePath": "/pages/personal/personal",
          "text": "商户信息",
          "iconPath": "/statics/imgs/tabBar/personal.png",
          "selectedIconPath": "/statics/imgs/tabBar/personal_selected.png"
      }]
    ],
    list: []
  },
  attached() {
    this.setList();
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      // this.setData({
      //   selected: data.index
      // })
    },
    setList(){
      const role = wx.getStorageSync('role')
      if (role != "store") {
        this.setData({
          list: this.data.allList[0]
        })
      }
      else{
        this.setData({
          list: this.data.allList[1]
        })
      }
    }
  },

})


