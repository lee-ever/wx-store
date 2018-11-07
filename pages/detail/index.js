import {
  HomeModel
} from "../../models/home.js"
const homeModel = new HomeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    curIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(this.data.currentTab)
    const bid = options.bid
    const detail = homeModel.getDetail(bid)

    Promise.all([detail])
      .then(res => {
        this.setData({
          book: res[0],
          imgUrls: res
        })
        // console.log(res)
      })
  },
  clickTab(e){
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
})