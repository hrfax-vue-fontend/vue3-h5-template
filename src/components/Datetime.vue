<!--
 * @Author: your name
 * @Date: 2020-12-18 16:50:46
 * @LastEditTime: 2020-12-24 19:49:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\Datetime.vue
-->
<template>
  <div>
    <van-cell :title="infoData[code].label"
              :value="dateFormatter(infoData[code].val)"
              :required="infoData[code].required"
              size="large"
              is-link
              clickable
              @click="cellClick"/>
    <van-popup v-model:show="popupVisibile"
                @close="popupClose(bindData)"
                round
                safe-area-inset-bottom
                position="bottom">
      <van-datetime-picker
        v-model="bindData"
        type="date"
        title="请选择"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="popupClose(bindData)"
        @cancel="popupClose('')"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from 'vue'
import { tool } from '@/utils/tool'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Datetime',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const infoData: any = inject('infoData')
    const validate: any = inject('validate')
    const dateFormatter = (value: string) => {
      return value ? dayjs(value).format('YYYY-MM-DD') : ''
    }
    const state = reactive({
      popupVisibile: false,
      bindData: new Date(dateFormatter(infoData[props.code].val)),
      minDate: new Date(dayjs(infoData[props.code].minDate || '19700101').format()),
      maxDate: new Date(dayjs(infoData[props.code].maxDate || '20991212').format())
    })
    const cellClick = () => {
      state.popupVisibile = true
    }
    const popupClose = tool.debounce((value: string) => {
      infoData[props.code].val = value ? dayjs(value).format('YYYYMMDD') : ''
      state.popupVisibile = false
      validate(props.code)
    }, 200, true)
    return {
      ...toRefs(state),
      cellClick,
      infoData,
      popupClose,
      dateFormatter
    }
  }
})
</script>

<style scoped lang="scss">
</style>
