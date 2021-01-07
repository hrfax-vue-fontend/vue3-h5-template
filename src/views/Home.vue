<!--
 * @Author: your name
 * @Date: 2020-12-17 11:40:12
 * @LastEditTime: 2020-12-21 21:03:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\views\Home.vue
-->
<template>
  <div class="home">
    <van-button type="primary" size="large" @click="goAuthVerify">AuthVerify</van-button>
    <van-button type="primary" size="large" @click="goInfoInput">InfoInput</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup () {
    const router = useRouter()
    const goAuthVerify = () => {
      router.push({ name: 'AuthVerify' })
    }
    const goInfoInput = () => {
      router.push({ name: 'InfoInput' })
    }
    return {
      goAuthVerify,
      goInfoInput
    }
  }
})
</script>
