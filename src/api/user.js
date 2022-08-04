import request from '@/utils/request'

/**
 *获取验证码图片
 * @param {Number} clientToken 请求验证码的token
 * @returns Promise
 */
export function getCaptcha(clientToken) {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob',
  })
}
/**
 *
 * @param {Object} data 登录需要的数据
 * @returns Promise
 */
export const login = (data) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data,
  })
}

/**
 *
 * @param {*} id  用户id
 * @returns Promise
 */
export const getUserInfo = (id) => {
  return request({
    url: `/api/user-service/user/${id}`,
  })
}
