import { getCaptcha, getUserInfo, login } from '@/api'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    clientPic: '',
    userInfo: {},
    // 请求验证码的token
    clientToken: Math.ceil(Math.random() * 10) * 1024,
  },
  mutations: {
    // 保存请求验证码的token
    setclientToken(state, payload) {
      state.clientPic = payload
    },
    // 保存用户信息
    setUserToken(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 获取验证码
    async getclientToken(context) {
      const data = await getCaptcha(context.state.clientToken)
      //将文件流转换为img标签可以识别的URL
      const pic = window.URL.createObjectURL(data.data)
      context.commit('setclientToken', pic)
    },
    // 登录
    async userLogin(context, payload) {
      const data = await login({
        ...payload,
        clientToken: context.state.clientToken,
      })
      context.commit('setUserToken', data.data)
      // 登陆成功时保存时间戳
      setTokenTime()
    },
    // 获取用户基本信息
    async getUserInfo(context) {
      const data = await getUserInfo(context.state.userInfo.userId)
      context.commit('setUserToken', {
        ...context.state.userInfo,
        ...data.data,
      })
    },
  },
}
