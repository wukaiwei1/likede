// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})
// 请求拦截器
service.interceptors.request.use((comfig) => {
  // 注入token
  if (store.state.user.token) {
    comfig.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return comfig
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    //判断是否是响应数据是否存在success,没有则返回data
    if (!res.data['success']) {
      return res.data
    }
    // 其他请求
    const { data } = res
    // 请求数据响应成功
    if (data.success) {
      return data
    }
    //失败返回错误提示
    Message.error(data.msg)
    // 获取验证码错误
    if (data.msg === '验证码错误') {
      store.dispatch('user/getclientToken')
    }
    return Promise.reject(new Error(data.msg))
  },
  (error) => {
    // 错误提示
    Message.error('系统异常')
    return Promise.reject(error)
  },
)
// 导出axios实例
export default service
