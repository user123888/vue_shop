import axios from 'axios'
// import { Loading } from 'element-ui'
// let loadingInstance = {}
// import ElementUI from 'element-ui'
// import { Toast } from 'vant'
// import store from '@/store'
// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处 不会污染原始的 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

// 自定义配置 请求 响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   duration: 0
  // })
  // loadingInstance = Loading.service({ fullscreen: true })

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 以服务的方式调用的 Loading 需要异步关闭
  // loadingInstance.close()
  // const res = response.data
  // if (res.status !== 200) {
  //   Toast(res.message)
  //   return Promise.reject(res.message)
  // } else {
  //   // 正确情况
  //   // Toast.clear()
  // }
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认会带多一层data，需要在响应拦截器中处理)
  // return res
  // Loading.service({ fullscreen: false })
  // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  //   loadingInstance.close()
  // })
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出实例
export default instance
