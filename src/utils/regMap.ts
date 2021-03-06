/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-useless-escape */
/*
 * @Author: your name
 * @Date: 2020-12-20 20:06:54
 * @LastEditTime: 2020-12-20 21:18:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\utils\regMap.js
 */
interface RegMapInterface {
  [propName: string]: any;
}
export const regMap: RegMapInterface = {
  companyPhonepreno: /^[0-9]{3,4}$/, // 单位电话区号 3-4
  companyPhoneno: /^[0-9]{7,8}$/, // 单位电话 7-8
  chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/, // 中文汉字
  userName: /^[\u4E00-\u9FA5\·]+$/, // 姓名(需要支持少数名族中国带.的名字)
  userName2: /^([\u4E00-\u9FA5]+)([\u4E00-\u9FA5\·]*)([\u4E00-\u9FA5]+)$/, // 姓名(需要支持少数名族中国带.的名字) 至少2位
  idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
  accountBankName: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
  bankName: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
  accountNumber: /^\d{6,30}$/,
  account: /^\d{6,30}$/,
  phone: /^1(3|4|5|6|7|8|9)\d{9}$/,
  mobile: /^1(3|4|5|6|7|8|9)\d{9}$/,
  money: /^\d{1,9}$|^\d{1,9}(\.\d{1,2})?$/, // 金额通用类型【整数部分9位，小数部分2位】
  money14: /^\d{1,14}$|^\d{1,14}(\.\d{1,2})?$/, // 金额【整数部分14位，小数部分2位】
  money20: /^\d{1,17}(\.\d{1,2})?$|^\d{1,20}$/, // 金额【整数部分14位，小数部分2位】
  price: /^\d{1,9}$|^\d{1,9}(\.\d{1,2})?$/, // 金额【勿删除，非同一人开发，未统一使用regMap.money】
  carPrice: /^\d{1,9}$|^\d{1,9}(\.\d{1,2})?$/, // 金额【勿删除，非同一人开发，未统一使用regMap.money】
  financeCharge: /^\d{1,9}$|^\d{1,9}(\.\d{1,2})?$/, // 金额【勿删除，非同一人开发，未统一使用regMap.money】
  zipCode: /^[0-9]{6}$/, // 邮政编码通用类型
  all: /(.*)/, // 任意字符
  bankCardNo: /^[0-9]{16,19}$/, // 16~19位银行卡号【用于银行卡号校验】
  contactWay: /^[a-zA-Z0-9_-]+$/,
  creditReportId: /^[0-9a-zA-Z]{1,30}$/,
  remark: /<\/?[^>]*>/g,
  yymmddhhmm: /^\d{4,}\-(?:0?\d|1[12])\-(?:[012]?\d|3[01]) (?:[01]?\d|2[0-4]):(?:[0-5]?\d|60)$/,
  yymmdd: /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/,
  number: /^[1-9]\d*|0$/,
  numberString: /^[0-9]{1,}$/, // 数字【字符串也可】
  numberAZaz: /^[0-9a-zA-Z]+$/, // 只输入数字与字母
  number2_2: /^[0-9]{1,2}(\.\d{1,2})?$/, // 数字整数2位小数两位
  number0: /^[0-9]{1,}$/, // 0开头或不是0开头的数字
  accountName: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, // 字母大小写，数字，汉字
  address: /^[a-zA-Z0-9-\u4e00-\u9fa5]+$/, // 字母大小写，数字，汉字，特殊字符-
  integerZero: /^([1-9]\d*|[0]{1,1})$/, // 0和正整数
  rangeInteger: /^[1-9]\d{0,2}$/, // 1-999数字
  letterAndCN: /^[a-zA-Z\u4e00-\u9fa5]+$/, // 汉字和字母
  percentage: /^(\d?\d(\.\d{0,2})?|100)$/, // 0到100的浮点数
  nonNegaDecimal: /^\d+(\.\d+)?$/,
  phoneLandline: /^\d{0,4}-?\d{0,8}-?\d{0,4}$/, // 手机和座机
  creditVal: /<\/?[^>]*>/g,
  numberX: /^[0-9X]+$/, // 数字+大写字母X
  slashChar: /^[a-zA-Z0-9\/\u4e00-\u9fa5]+$/, // 数字、字母、正斜杠
  decimal: /^[0-9a-zA-Z]+$/, // 只输入数字与字母
  money8: /^\d{1,8}$|^\d{1,6}(\.\d{1,2})|^\d{1,7}(\.\d{1,1})?$/, // 限定位数8位（其中含2位小数和1为特殊符号“.”）
  money10: /^\d{1,10}$|^\d{1,8}(\.\d{1,2})|^\d{1,9}(\.\d{1,1})?$/, // 限定位数10位（其中含2位小数和1为特殊符号“.”）
  cardNumber: /^\d{12,20}$/, // 信息表还款卡
  email: /\w@\w*\.\w/,

  money8_2: /^\d{1,8}$|^\d{1,8}(\.\d{1,2})?$/, // 金额类型：8位整数，可保留2位小数
  money8_4: /^\d{1,8}$|^\d{1,8}(\.\d{1,4})?$/, // 金额类型：8位整数，可保留4位小数
  money5_2: /^\d{1,5}$|^\d{1,5}(\.\d{1,2})?$/, // 金额类型：5位整数，可保留2位小数
  money4_2: /^\d{1,4}$|^\d{1,4}(\.\d{1,2})?$/, // 金额类型(面积)：4位整数，可保留2位小数
  rateToFixed1: /^\d{1,2}$|^\d{1,2}(\.\d{1,1})?$/, // 利率，保留1位小数
  rateToFixed2: /^\d{1,2}$|^\d{1,2}(\.\d{1,2})?$/, // 利率，保留2位位小数
  rateToFixed3: /^\d{1,2}$|^\d{1,2}(\.\d{1,3})?$/, // 利率，保留3位小数
  rateToFixed4: /^\d{1,2}$|^\d{1,2}(\.\d{1,4})?$/, // 利率，保留4位小数
  rateToFixed8: /^\d{1,2}$|^\d{1,2}(\.\d{1,8})?$/, // 利率，保留8位小数
  area: /^\d{1,12}$|^\d{1,12}(\.\d{1,2})?$/ // 面积：单位㎡
}
