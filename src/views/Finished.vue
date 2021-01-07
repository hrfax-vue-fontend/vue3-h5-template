<!--
 * @Author: your name
 * @Date: 2020-12-23 13:45:51
 * @LastEditTime: 2020-12-23 15:39:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \guangfeng-before-sign\src\views\Finished.vue
-->
<template>
  <div class="finished">
    <div class="result-img"></div>

    <div class="result-text">申请已受理</div>

    <div class="result-desc">1个工作日后将有客户经理与您联系，最终审核结果以您实际提交材料为准</div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Finished'
})
</script>
<style lang="scss" scoped>
@import '../assets/css/variables.scss';
.finished {
  height: calc(100vh - 46px);
  background-color: #fff;
  .result-img {
    margin: 60px auto 20px;
    width: 100px;
    height: 117px;
    border-radius: 50px;
    background: url("../assets/images/finished.png") center center no-repeat;
  }
  .result-text {
    font-size: 24px;
    font-weight: 700;
    color: #1BA176;
    text-align: center;
  }
  .result-desc {
    color: #999;
    font-size: 16px;
    width: 266px;
    margin: 20px auto 60px;
  }
}
</style>
