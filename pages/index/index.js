import { HomeModel } from "../../models/home.js"

const homeModel = new HomeModel()

//获取应用实例
Page({
  data: {
    imgUrls: [],
    books:[],
    showcar: false,
    scaleCart:false,
    num: 1,
    totalNum: 0
  },
  onLoad: function (options) {
    homeModel.getBanner()
      .then(res => {
        this.setData({
          imgUrls: res
        })
        console.log(res)
    })
    
    homeModel.getBooks()
      .then(res => {
        this.setData({
          books: res
        })
        // console.log(res)
      })
  },
  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      show: true
    })
    setTimeout(function () {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
  }
})
