<!--
 * @Author: your name
 * @Date: 2020-12-21 13:36:53
 * @LastEditTime: 2020-12-24 19:50:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\PageHeader.vue
-->
<template>
  <div>
    <van-nav-bar
      class="page-header"
      v-if="!$route.meta.hideHeader"
      :title="$route.meta.title || ''"
      :left-arrow="!$route.meta.hideBack"
      @click-left="onClickLeft">
    </van-nav-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageHeader',
  data () {
    return {}
  },
  setup () {
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }
    return {
      onClickLeft
    }
  }
})
</script>
<style lang="scss">
  @import '../assets/css/variables.scss';
  .page-header {
    .van-nav-bar {
      background-color: $themeColor;
    }
    .van-nav-bar .van-icon {
      color: #fff !important;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
</style>
