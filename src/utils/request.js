/*
 * @Author: your name
 * @Date: 2020-12-17 14:03:32
 * @LastEditTime: 2021-01-05 10:10:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\utils\request.js
 */
import axios from 'axios'
import store from '@/store'
import { Dialog, Toast } from 'vant'
// 根据环境不同引入不同api地址
// import { baseApi } from '@/config'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    if (response.status && response.status !== 200) {
      // 登录超时,重新登录
      if (response.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(response || 'error')
    } else {
      const res = response.data
      switch (res.code) {
        case 0:
          return Promise.resolve(res)
        default:
          Dialog.alert({
            title: '提示',
            message: res.msg || '系统异常'
          })
          return Promise.reject(response || 'error')
      }
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
