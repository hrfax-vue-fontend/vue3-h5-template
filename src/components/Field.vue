<!--
 * @Author: your name
 * @Date: 2020-12-17 15:23:44
 * @LastEditTime: 2020-12-22 14:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\Field.vue
-->

<template>
  <div class="field">
    <van-field v-model="infoData[code].val"
              :label="infoData[code].label"
              :required="infoData[code].required"
              size="large"
              input-align="right"
              :maxlength="infoData[code].maxlength"
              @blur="inputBlur"
              clearable
              :placeholder="infoData[code].placeholder || ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'Field',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const infoData = inject('infoData')
    const validate: any = inject('validate')
    const inputBlur = () => {
      validate(props.code)
    }
    return {
      infoData,
      inputBlur
    }
  }
})
</script>

<style scoped lang="scss">
</style>
