import { getCaptcha, login } from '@/api'
export default {
  state: {
    clientPic: '',
    token: '',
    // 错误信息
    message: '',
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
      // 错误信息
      state.message = payload.msg
    },
  },
  actions: {
    // 获取验证码
    async getclientToken(context, payload) {
      const { data } = await getCaptcha(payload)
      console.log(data)
      //将文件流转换为img标签可以识别的URL
      const pic = window.URL.createObjectURL(data)
      context.commit('setclientToken', pic)
    },
    // 登录
    async userLogin(context, payload) {
      try {
        const { data } = await login(payload)
        context.commit('setUserToken', data)
      } catch (error) {}
    },
  },
}
