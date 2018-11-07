var QQMapWX = require('../../models/map/qqmap-wx-jssdk.js');
var qqmapsdk;
// pages/web/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adress:'北京市'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loaction();
  },
  onUploading(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  loaction(){
    qqmapsdk = new QQMapWX({
      key: 'UKZBZ-7LD3F-ZAAJ5-JWJWD-CF6QE-QXFSZ'
    });
    var that = this;
    wx.getLocation({
      type: 'gcj02',  //编码方式，
      success: function (res) {
        var latitude = res.latitude   // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          //腾讯地图api 逆解析方法 首先设计经纬度
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          //逆解析成功回调函数
          success: function (res) {
            getApp().globalData.cityname = res.result.address_component.city;
            //全局变量存放城市res.result.address_component.city 获取解析之后地址中的城市
            //wx.request 发起网络请求，类似于ajax
            wx.request({
              url: 'https://www.xxxxxxxxxx.com/home/index/xcx_index',  //填写对应服务器地址
              data: {
                // cityid: getApp().globalData.cityid,    
                //我这里需要提交的参数，这里我是把获取的城市发给后台，然后后台给我对应城市的数据json文件
                cityna: getApp().globalData.cityna,
                district: res.result.address_component.city,
              },
              header: {
                "Content-Type": "applicatiSon/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
              }
            });
            // 成功后提醒
            // wx.showModal({
            //   title: '定位成功',
            //   content: '当前城市：' + getApp().globalData.cityname,
            // });
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            //完成之后的回调函数，不管是否成功
            // console.log("逆解析状态码：" + res.status);
            //res.status  获取状态码，为0代表解析成功，但是我们要考虑失败的兼容，可能用户并不愿意同意获取地理位置，所以不为0 的时候也要加载内容给个默认地址
            if (res.status != 0) {
              wx.request({
                url: 'https://www.cyzs97.com/home/index/xcx_index',
                data: {
                  // cityid: getApp().globalData.cityid,
                  cityna: getApp().globalData.cityna,
                  district: "",
                },
                header: {
                  "Content-Type": "applicatiSon/x-www-form-urlencoded"
                },
                method: "POST",
                success: function (res) {
                  console.log(res.data.data);
                  // that.setData({
                  //   // 轮播图图片
                  //   imgurls: res.data.data.pics
                  // })
                  // getApp().globalData.cityid = res.data.data.datacompany.cityid;
                  // this.data.pic_array_dq2[e.detail.value].name
                }
              });
              //提示用户失败可开启定位服务
              wx.showModal({
                title: '定位失败',
                content: '定位失败，未授权获取当前位置或服务错误',
              });
            }
            console.log(that.data.adress)
            console.log("定位获取的：" + getApp().globalData.cityname);
            const realAdress = getApp().globalData.cityname
            that.setData({
              adress: realAdress
            })
          }
        });
      }
    });
  },
  relocation(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          console.log("2")
          wx.openSetting({
            success (res){
              if (res.authSetting['scope.userLocation']) {
                console.log("用户选择开启定位");
                this.loaction();
              }else{
                console.log("用户选择放弃开启定位")
              }
            },fail(res){
              console.log(res)
            }  
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})