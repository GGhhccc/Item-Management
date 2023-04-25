import { requestIntercaptor } from './interceptor'

const service = (options: UniApp.RequestOptions) => {
  const baseUrl = ''
  options.url = baseUrl + options.url
  options.timeout = 6000
  // 加入请求拦截
  options = requestIntercaptor(options)
  // 发起请求
  return uni.request(options)
}

export default service
