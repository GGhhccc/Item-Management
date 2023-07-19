const service = (options: UniApp.RequestOptions) => {
  // baseUrl
  const baseUrl = 'http://pfwapb.natappfree.cc/smart/management/api'

  // 配置请求头
  options.header = {
    token: '',
    uuid: ''
  }
  const token = uni.getStorageSync('token')
  if (token) options.header.token = token
  const uuid = uni.getStorageSync('uuid')
  if (uuid) options.header.uuid = uuid

  // 发起请求
  return new Promise((resolve, reject) => {
    uni
      .request({
        url: baseUrl + options.url || '',
        method: options.method || 'GET',
        // data: 可传 Object | String | ArrayBuffer
        data: options.data || {},
        header: options.header || {},
        timeout: options.timeout || 6000
      })
      .then((res: any) => {
        switch (res.data.code) {
          case 200:
            // 从响应头中获取 token
            if (res.header.token) {
              uni.setStorageSync('token', res.header.token)
            }
            resolve(res.data.data)
            break
          case 100:
            uni.showToast({
              title: res.data.msg,
              icon: 'error'
            })
            break
          case 101:
            uni.showToast({
              title: '您还未登录',
              icon: 'error'
            })
            // 重定向到登录页
            setTimeout(() => {
              uni.redirectTo({
                url: '/pages/login/login'
              })
            }, 1500)
            uni.removeStorageSync('token')
            uni.removeStorageSync('uuid')
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

// 加入拦截器
uni.addInterceptor('request', {
  fail: () => {
    uni.showToast({
      title: '请求超时'
    })
  }
})

export default service
