<!--
 * @Author: your name
 * @Date: 2020-12-17 19:46:05
 * @LastEditTime: 2020-12-24 18:12:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\Spell.vue
-->
<template>
  <div class="form-spell">
    <van-cell :title="infoData[code].label"
              :value="infoData[code].val"
              :required="infoData[code].required"
              clickable
              @click="cellClick"/>
    <van-popup v-model:show="popupVisibile"
                @close="popupClose"
                round
                safe-area-inset-bottom
                position="bottom">
      <div class="popup-title">请输入</div>
      <van-cell-group v-for="(item, index) in spellData" :key="index">
        <van-field v-if="item.zh !== '·' && item.zh !== '•' " v-model="item.en" label-width="10em" input-align="right" :label="`请输入【${item.zh}】的拼音`" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { Dialog } from 'vant'
interface SpellInterface {
  en: string;
  zh: string;
}

export default defineComponent({
  name: 'Spell',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const infoData: any = inject('infoData')
    const validate: any = inject('validate')
    const popupVisibile = ref<boolean>(false)
    const arr: SpellInterface[] = []
    const cellClick = () => {
      if (props.code === 'enname' && !infoData.name.val) {
        return Dialog.alert({
          title: '提示',
          message: '请先输入【姓名】'
        })
      }
      arr.length = 0
      props.code && infoData.name.val.split('').forEach((item: string, index: number) => {
        arr.push({
          zh: item,
          en: infoData[props.code].val.split(',')[index]
        })
      })
      popupVisibile.value = true
    }
    const spellData = ref(arr)
    const popupClose = () => {
      const enname: string[] = []
      spellData.value.forEach((item: SpellInterface) => {
        enname.push(item.en)
      })
      infoData[props.code].val = enname.filter(item => item !== '').join(',').toUpperCase()
      validate(props.code)
    }
    return {
      popupVisibile,
      cellClick,
      spellData,
      popupClose,
      infoData
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
