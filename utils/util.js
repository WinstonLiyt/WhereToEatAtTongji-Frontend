const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const base_url = "http://1.92.154.154:80"
const base_image_url = 'http://1.92.154.154:80/media/'
const tjRequest = (options) =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: options.header || {
        'token': wx.getStorage('token') 
      },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  formatTime,
  tjRequest
}
