import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
// 定义一个HTTP的类
class HTTP {
  request({ url, data = {}, method = 'GET'}) {
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method:method,
      data:data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      
      success: (res) => {
        // console.log(config.api_base_url + url);
        // console.log(config.api_base_url);
        // console.log(url);
        // console.log(res.statusCode.toString());
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        }
        // 服务器异常
        else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      // 调用失败
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })

  }
}

export {
  HTTP
}