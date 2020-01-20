import request from '@/utils/request';

/**
 * 登录
 */
export function loginByUserName (username, password, captcha_code) {
  const data = {
      username,
      password,
      captcha_code
  }
  return request({
      url: '/v2/login',
      method: 'post',
      data
  })
}

/**
 * 获取图片验证码
 */
export function getCaptchas (data = {}) {
  return request({
      url: '/v1/captchas',
      method: 'post',
      data
  })
}