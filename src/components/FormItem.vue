<!--
 * @Author: your name
 * @Date: 2020-12-17 15:23:03
 * @LastEditTime: 2020-12-24 17:49:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\FormItem.vue
-->

<template>
  <div class="form-item">
    <Field v-if="field.type === 0" :code="field.code"></Field>
    <Picker v-if="field.type === 1" :code="field.code"></Picker>
    <Spell v-if="field.type === 2" :code="field.code"></Spell>
    <Datetime v-if="field.type === 3" :code="field.code"></Datetime>
    <img-upload v-if="field.type === 4" :code="field.code"></img-upload>
    <div class="tip" v-if="field.tip">{{field.tip}}</div>
    <div class="error-tip" v-if="field.errorMsg?.length">{{field.errorMsg[field.errorMsg.length-1].msg}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Field from '@/components/Field.vue'
import Picker from '@/components/Picker.vue'
import Spell from '@/components/Spell.vue'
import Datetime from './Datetime.vue'
import ImgUpload from './ImgUpload.vue'

export default defineComponent({
  name: 'FormItem',
  components: {
    Field,
    Picker,
    Spell,
    Datetime,
    ImgUpload
  },
  props: {
    field: {
      type: Object
    }
  }
})
</script>

<style scoped lang="scss">
  @import '../assets/css/variables.scss';
.form-item {
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid $gray-e;
}
.tip {
  position: absolute;
  background-color: #fff;
  color: $gray-a;
  padding: 0 10px;
}
.error-tip {
  background-color: #fff;
  color: $themeColor;
  text-align: right;
  padding: 0 10px 3px;
}
</style>
