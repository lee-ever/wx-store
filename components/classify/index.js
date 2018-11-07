import { HomeModel } from "../../models/home.js"
import { paginationBev } from "../../models/pagination.js"

const homeModel = new HomeModel()

// components/classify/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords:[],
    q: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    homeModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
    homeModel.getBooks()
      .then(res => {
        this.setData({
          dataArray: res
        })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      this.setData({
        loadingCenter: true
      })
      this.initialize()
      // 向服务器请求数据
      const q = event.detail.value || event.detail.text
      // console.log(event.detail.text)
      homeModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q: q
        })
        this.setData({
          loadingCenter: false
        })
      })
    },

    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLoked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        homeModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
      }
    },
    onDelete(event) {
      this.setData({
        q: ''
      })
      // this.initialize()
    },
  }
})
