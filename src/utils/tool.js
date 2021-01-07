/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/*
 * @Author: your name
 * @Date: 2020-12-20 16:24:25
 * @LastEditTime: 2020-12-21 11:16:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\utils\tool.js
 */

export const tool = {
  /**
   * @param { function } func 函数
   * @param { number } wait 延迟执行毫秒数
   * @param { number } type 1 表时间戳版，2 表定时器版
   */
  throttle (func, wait, type) {
    let previous, timeout
    if (type === 1) {
      previous = 0
    } else if (type === 2) {
      timeout = null
    }
    return function () {
      const context = this
      const args = arguments
      if (type === 1) {
        const now = Date.now()

        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    }
  },
  /**
 * @param { function } func
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
  debounce (func, wait, immediate) {
    let timeout
    return function () {
      const context = this
      const args = arguments

      if (timeout) clearTimeout(timeout)
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait)
      }
    }
  },
  /**
   * 判断是否有值
   * @param { any } value
   * @return {boolean}
   */
  checkHaveData (param) {
    if (param || param === 0) {
      return true
    } else {
      return false
    }
  },
  /**
   * 获取文件（图片）地址
   * @param  {string} url 文件后缀
   * @return {string}     完整文件地址
   */
  getFileUrl: url => {
    return process.env + url
  }
}
