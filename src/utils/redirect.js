/*
 * @Author: your name
 * @Date: 2020-12-22 15:28:40
 * @LastEditTime: 2020-12-25 18:05:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\utils\redirect.js
 */
import qs from 'qs'
export const goSign = function (params) {
  params.successUrl = process.env.VUE_APP_SELF_HOST + '/finished'
  const signHost = process.env.VUE_APP_SIGN_HOST
  window.location.href = `${signHost}?${qs.stringify(params)}`
}
