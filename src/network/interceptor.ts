// 配置拦截器
// 请求拦截
export const requestIntercaptor = (options: UniApp.RequestOptions) => {
  // 加入请求头
  const token = uni.getStorageSync('token')
  if (token) options.header.token = token

  return options
}

// 响应拦截
export const responseIntercaptor = ({ data }: { data: any }) => {
  const code = parseInt(data.code as string)
  switch (code) {
    case 200:
      break
    case 100:
      uni.showToast({
        title: '错误',
        icon: 'error'
      })
      break
    case 401:
      uni.showToast({
        title: '用户未登录',
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
        title: ''
      })
      break
  }
}

// 错误拦截
// 请求超时
const errorIntercaptor = () => {
  uni.showToast({
    title: '请求超时，请稍后再试'
  })
}

// 添加拦截器
uni.addInterceptor('request', {
  fail() {
    errorIntercaptor()
  },
  success(res) {
    responseIntercaptor(res)
  }
})
