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

export const login = (data) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data,
  })
}
