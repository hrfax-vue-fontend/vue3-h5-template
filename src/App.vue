<!--
 * @Author: your name
 * @Date: 2020-12-17 11:40:12
 * @LastEditTime: 2020-12-21 19:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\App.vue
-->
<template>
  <div id="app">
    <page-header class="page-header"></page-header>
    <router-view v-slot="{ Component }" style="padding-top: 46px;">
      <transition name="van-hide">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <transition name="van-slide-right">
      <router-view style="padding-top: 46px;"/>
    </transition> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

export default defineComponent({
  components: {
    PageHeader
  }
})
</script>
<style lang="scss">
.page-header {
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>
