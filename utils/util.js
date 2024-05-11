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
const tjRequest = (options) =>{
  return new Promise((resolve, reject) => {
    let token
    try{
      token = wx.getStorageSync('token')
    } catch{
      token = null
    }
    
    wx.request({
      url: base_url + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: options.header || {
        'token': token
      },
      success: res=>{
        if(res.statusCode === 200)
          resolve(res)
        else
          reject(res)
      },
      fail: reject
    })
  })
}

const tjFileUpLoad = (options) =>{
  return new Promise((resolve, reject) => {
    let token
    try{
      token = wx.getStorageSync('token')
    } catch{
      token = null
    }
    wx.uploadFile({
      url: base_url + options.url,
      filePath: options.filePath || '',
      name: 'file',
      header: options.header || {
        'token': token
      },
      formData: options.formData || {},
      success: res=>{
        if(res.statusCode === 200)
          resolve(res)
        else
          reject(res)
      },
      fail: reject
    })
  })
}

module.exports = {
  formatTime,
  base_url,
  tjRequest,
  tjFileUpLoad
}
