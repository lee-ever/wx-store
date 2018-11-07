import {
  HTTP
}
  from '../utils/https.js'

class HomeModel extends HTTP{
  getBanner(){
    return this.request({
      url:'/classic/favor'
    })
  }
  getBooks() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
  search(start, q) {
    return this.request({
      url: 'book/search?sunmmary=1',
      data: {
        q: q,
        start: start
      }
    })
  }
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }
}
export { HomeModel }