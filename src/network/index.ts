const service = (options: UniApp.RequestOptions) => {
  // baseUrl
  const baseUrl = 'http://jn94rz.natappfree.cc/smart/management/api'

  // 请求拦截
  // const token = uni.getStorageSync('token')
  // if (token) options.header.token = token
  options.header = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE2OTAyODMwMzJ9.vLhbLsgjeGEsxs_xTPT46-I-ycoUnxKx246VwQ5U0Q4',
    uuid: '399'
  }

  // 发起请求
  return new Promise((resolve, reject) => {
    uni
      .request({
        url: baseUrl + options.url || '',
        method: options.method || 'GET',
        data: options.data || {},
        timeout: options.timeout || 6000,
        header: options.header || {}
      })
      .then((res: any) => {
        switch (res.data.code) {
          case 200:
            uni.showToast({
              title: '请求成功',
              icon: 'success'
            })
            resolve(res.data.data)
            break
          case 100:
            uni.showToast({
              title: '错误',
              icon: 'error'
            })
            break
          case 101:
            uni.showToast({
              title: '您还未登录',
              icon: 'error'
            })
            break
          case 400:
            uni.showToast({
              title: '客户端异常',
              icon: 'error'
            })
            break
          case 404:
            uni.showToast({
              title: '界面不存在',
              icon: 'error'
            })
            break
          case 500:
            uni.showToast({
              title: '服务端异常',
              icon: 'error'
            })
            break
          default:
            uni.showToast({
              title: '未知错误'
            })
            break
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default service
