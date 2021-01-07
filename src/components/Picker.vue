<!--
 * @Author: your name
 * @Date: 2020-12-17 16:44:29
 * @LastEditTime: 2020-12-25 15:12:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\Cell.vue
-->
<template>
  <div class="form-cell">
    <van-cell :title="infoData[code].label"
              :value="infoData[code].val"
              :required="infoData[code].required"
              size="large"
              is-link
              clickable
              @click="cellClick"/>
    <van-popup v-model:show="popupVisibile"
                @close="popupClose"
                round
                safe-area-inset-bottom
                position="bottom">
      <div class="popup-title">请选择</div>
      <van-radio-group v-model="infoData[code].val">
        <van-cell-group v-for="(enumItem, index) in infoData[code].dictionary" :key="index">
          <van-cell :title="enumItem.key" clickable @click="radioClick(enumItem.value)">
            <template #right-icon>
              <van-radio :name="enumItem.value" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Toast } from 'vant'
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'Picker',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const infoData: any = inject('infoData')
    const popupVisibile = ref(false)
    const validate: any = inject('validate')
    const cellClick = () => {
      if (!(infoData[props.code].dictionary?.length)) {
        return Toast('暂无数据源')
      }
      popupVisibile.value = true
    }
    const radioClick = (value: string | number) => {
      if (infoData[props.code].val === value) {
        infoData[props.code].val = ''
      } else {
        infoData[props.code].val = value
      }
      popupVisibile.value = false
    }
    const popupClose = (): void => {
      validate(props.code)
    }
    return {
      infoData,
      popupVisibile,
      cellClick,
      radioClick,
      popupClose
    }
  }
})
</script>

<style scoped lang="scss">
  .popup-title {
    text-align: center;
    padding-top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
</style>
