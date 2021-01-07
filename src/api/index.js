/*
 * @Author: your name
 * @Date: 2020-12-21 17:44:57
 * @LastEditTime: 2020-12-27 11:13:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\api\index.ts
 */
// axios
import request from '@/utils/request'

// 提取码校验接口
export function httpValidCheckExtractCode (data) {
  return request({
    url: '/valid/checkExtractCode',
    method: 'post',
    data
  })
}

// 身份证OCR 接口
export function httpValidOcr (data) {
  return request({
    url: '/valid/ocr',
    method: 'post',
    data,
    hideloading: true
  })
}

// 身份校验接口
export function httpValidValidIdentity (data) {
  return request({
    url: '/valid/validIdentity',
    method: 'post',
    data
  })
}

// 信息录入页面数据反显
export function httpValidOcrPageData (data) {
  return request({
    url: 'valid/ocrPageData',
    method: 'post',
    data
  })
}
