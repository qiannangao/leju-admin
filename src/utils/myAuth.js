import { LEJU_ADMIN_TOKEN, LEJU_ADMIN_USERINFO } from '@/constants/index'

/**
 * 获取token
 * @returns 返回token值
 */
export function getToken() {
  return window.localStorage.getItem(LEJU_ADMIN_TOKEN)
}
/**
 * 设置token
 * @param {*} token
 * @returns
 */
export function setToken(token) {
  window.localStorage.setItem(LEJU_ADMIN_TOKEN, token)
}
/**
 * 移除token
 * @returns
 */
export function removeToken() {
  window.localStorage.removeItem(LEJU_ADMIN_TOKEN)
}

/**
 * 设置用户token
 */
export function setUserinfo(userinfo) {
  try {
    window.localStorage.setItem(LEJU_ADMIN_USERINFO, JSON.stringify(userinfo))
  } catch (error) {
    console.log(error)
  }
}
/**
     * 获取用户token
     */
export function getUserinfo() {
  try {
    return JSON.parse(window.localStorage.getItem(LEJU_ADMIN_USERINFO))
  } catch (error) {
    console.log(error)
  }
}
/**
     * 移除用户token
     */
export function removeUserinfo() {
  window.localStorage.removeItem(LEJU_ADMIN_USERINFO)
}
