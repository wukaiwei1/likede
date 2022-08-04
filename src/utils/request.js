// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
import { Message } from 'element-ui'
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})
// 封装判断token时效是否过期
function timeOut() {
  // 当前发送请求的时间戳
  const currentTime = Date.now()
  // 获取登录时的时间戳
  const tokenTime = getTokenTime()
  // token时效
  const tokenOut = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > tokenOut
}

// 请求拦截器
service.interceptors.request.use((comfig) => {
  // 注入token
  if (store.state.user.userInfo.token) {
    if (timeOut()) {
      // 超时，执行退出功能
      store.commit('user/setUserToken', {})
      // 跳转页面
      router.push('/login')
      // 抛出错误
      return Promise.reject(new Error('登录过期'))
    } else {
      comfig.headers.Authorization = store.state.user.userInfo.token
    }
  }
  return comfig
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      // 执行退出功能
      store.commit('user/setUserToken', {})
      // 页面跳转
      router.push('/login')
    } else {
      // 错误提示
      Message.error(error.message)
    }

    return Promise.reject(error)
  },
)
/*   (res) => {
    //判断是否是响应数据是否存在success,没有则返回data
    if (!res.data['success']) {
      // console.log(res)
      return res
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
    console.log(data.msg)
    if (data.msg === '验证码错误') {
      store.dispatch('user/getclientToken')
      console.log(1235)
    }
    return Promise.reject(new Error(data.msg))
    console.log(123)
  },
  (error) => {
    // 错误提示
    Message.error('系统异常')
    return Promise.reject(error)
  }, */

// 导出axios实例
export default service
