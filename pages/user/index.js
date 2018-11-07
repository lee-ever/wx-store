// pages/user/index.js
const Charts = require('../../utils/wxcharts-min.js');
const app = getApp()

Page({

  data: {
    authorize: false,
    userInfo: null
  },
  //事件处理函数
  onLoad: function () {
    this.userAuthorized()
  },
  onShow(){
    new Charts({
      canvasId: 'canvas1',
      type: 'pie',
      series: [{ name: '今日', data: 50 }, { name: '总订单', data: 30 }, { name: '月订单', data: 20 }, { name: '年订单', data: 20 }],
      width: 375,
      height: 300,
      dataLabel: true,
    });
  },
  // 获取用户是否已经授权
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorize: true,
                userInfo: data.userInfo
              })
              // console.log(data)
            }
          })
        } else {
          console.log("获取头像失败")
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorize: true
      })
      // console.log(event)
    }
  }
})