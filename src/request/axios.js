// axios的二次封装
import axios from 'axios'

const instance = axios.create({
  // baseURL设置以什么开头，在请求中可以省略这一段
  baseURL: 'http://localhost:8080',
  // 设置请求响应超时时间
  timeout: 10000,
  // 设置post请求以哪种方式解码
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 设置请求拦截器
// instance.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// 设置响应拦截器
// instance.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

export default instance
