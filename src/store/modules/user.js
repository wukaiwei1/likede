import { getCaptcha, login } from '@/api'
export default {
  namespaced: true,
  state: {
    clientPic: '',
    token: '',
    // 错误信息
    // message: '',
    // 请求验证码的token
    clientToken: Math.ceil(Math.random() * 10) * 1024,
  },
  mutations: {
    // 保存请求验证码的token
    setclientToken(state, payload) {
      state.clientPic = payload
    },
    // 保存用户token
    setUserToken(state, payload) {
      // token
      state.token = payload.token
      // // 错误信息
      // state.message = payload.msg
    },
  },
  actions: {
    // 获取验证码
    async getclientToken(context) {
      const data = await getCaptcha(context.state.clientToken)
      //将文件流转换为img标签可以识别的URL
      const pic = window.URL.createObjectURL(data)
      context.commit('setclientToken', pic)
    },
    // 登录
    async userLogin(context, payload) {
      const data = await login({
        ...payload,
        clientToken: context.state.clientToken,
      })
      context.commit('setUserToken', data)
    },
  },
}
