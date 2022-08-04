import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 存储登录请求时产生的时间戳;用于判断用户的token时效
export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}

// 获取登录时的时间戳
export function getTokenTime() {
  return Cookies.get('tokenTime')
}
