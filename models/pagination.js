import { HTTP } from '../utils/https.js'
import { HomeModel } from "/home.js"

const homeModel = new HomeModel()
let paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult:false,
    loading:false
  },

  methods: {
    setMoreData(dataArray) {
      let tempArray =this.data.dataArray.concat(dataArray)
      // this.data.start += this.data.count
      this.setData({
        dataArray: tempArray
      })
      // return true
      // console.log(tempArray)
      // console.log(this.data.dataArray.length, this.data.total)
    },

    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    },

    getCurrentStart:function(){
      return this.data.dataArray.length
    },
    setTotal(total){
      // console.log(total)
      this.data.total = total
      if( total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    initialize(){
      this.setData({
        dataArray:[],
        noneResult:false,
        loading:false
      })
      // this.data.dataArray = []
      this.data.total = null
    },
    isLoked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
  

})


export {paginationBev}