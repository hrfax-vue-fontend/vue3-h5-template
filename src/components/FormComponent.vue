<!--
 * @Author: your name
 * @Date: 2020-12-17 15:22:52
 * @LastEditTime: 2020-12-25 13:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\FormComponent.vue
-->

<template>
  <div class="form">
    <van-form>
      <form-item v-for="field in infoData" :key="field.code" :field="field"></form-item>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from 'vue'
import { tool } from '@/utils/tool'
import { regMap } from '@/utils/regMap.ts'

import FormItem from '@/components/FormItem.vue'
import { Dialog } from 'vant'

export default defineComponent({
  name: 'FormComponent',
  components: {
    FormItem
  },
  props: {
  },
  setup () {
    const infoData: any = inject('infoData')
    /**
     * 单个字段校验
     * @param  {Object}               原字段对象
     */
    const validate = (code: string): void => {
      let regCheck = true // 正则验证是否通过
      let emptyCheck = true // 空值验证是否通过
      let maxCheck = true // 最大值校验
      let minCheck = true // 最小值校验
      if (infoData[code].reg && tool.checkHaveData(infoData[code].val)) { // 有正则，有值
        regCheck = regMap[infoData[code].reg] && regMap[infoData[code].reg].test(infoData[code].val)
        if (!regCheck) {
          const errorMsg1 = { id: 'regCheck', msg: infoData[code].regTip || '校验失败，请检查' }
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'regCheck' })
          infoData[code].errorMsg.push(errorMsg1)
        } else {
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'regCheck' })
        }
      } else {
        infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'regCheck' })
      }
      if (!tool.checkHaveData(infoData[code].val) || (Array.isArray(infoData[code].val) && infoData[code].val.length === 0)) { // 没有值
        if (infoData[code].required === true) { // 但是必填
          emptyCheck = false
          const errorMsg2 = { id: 'emptyCheck', msg: `请完善${infoData[code].label || ''}` }
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'emptyCheck' })
          infoData[code].errorMsg.push(errorMsg2)
        } else {
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'emptyCheck' })
        }
      } else {
        infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'emptyCheck' })
      }
      if (tool.checkHaveData(infoData[code].val) && tool.checkHaveData(infoData[code].max)) { // 有设置最大值
        if (Number(infoData[code].val) > infoData[code].max) {
          maxCheck = false
          const errorMsg3 = { id: 'maxCheck', msg: `${infoData[code].maxDesc || '超出最大值'}` }
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'maxCheck' })
          infoData[code].errorMsg.push(errorMsg3)
        } else {
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'maxCheck' })
        }
      } else {
        infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'maxCheck' })
      }
      if (tool.checkHaveData(infoData[code].val) && tool.checkHaveData(infoData[code].min)) { // 有设置最小值
        if (Number(infoData[code].val) < infoData[code].min) {
          minCheck = false
          const errorMsg4 = { id: 'minCheck', msg: `${infoData[code].minDesc || '少于最小值'}` }
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'minCheck' })
          infoData[code].errorMsg.push(errorMsg4)
        } else {
          infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'minCheck' })
        }
      } else {
        infoData[code].errorMsg = infoData[code].errorMsg.filter((item: any) => { return item.id !== 'minCheck' })
      }
      infoData[code].validated = regCheck && emptyCheck && maxCheck && minCheck
    }
    /**
     * @description: 所有字段提交时校验
     * @param {*}
     * @return { Object } submitData 表单提交值
     */
    const validateAll = (): any => {
      const submitData: any = {}
      for (const key in infoData) {
        validate(key)
        if (!infoData[key].validated) {
          Dialog.alert({
            title: '提示',
            message: `${infoData[key].errorMsg[0].msg}`
          })
          return null
        } else {
          submitData[key] = infoData[key].val
        }
      }
      return submitData
    }
    provide('validate', validate)
    return {
      infoData,
      validateAll
    }
  }
})
</script>

<style scoped lang="scss">
</style>
