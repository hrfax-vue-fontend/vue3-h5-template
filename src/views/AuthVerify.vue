<!--
 * @Author: your name
 * @Date: 2020-12-17 12:55:22
 * @LastEditTime: 2020-12-24 19:51:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\views\AuthVerify.vue
-->
<template>
  <div class="auth-verify">
    <!-- 一张图 -->
    <div class="img" ></div>
    <!-- 两段文字 -->
    <div class="text">
      <div class="text-1">获取授权</div>
      <div class="text-2">验证身份，授权后进入电子签</div>
    </div>
    <!-- 授权码 -->
    <van-field v-model.trim="extractCode"
              class="input-code"
              maxlength="8"
              clearable
              placeholder="请输入电子签授权码" >
              <template v-slot:label>
                <span class="input-label">授权码</span>
              </template>
    </van-field>
    <!-- 按钮 -->
    <div class="button-bar">
      <van-button type="primary"
                  class="button"
                  size="large"
                  @click="checkClick"
                  round >开始校验</van-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { httpValidCheckExtractCode } from '@/api'
import { Dialog } from 'vant'
import { goSign } from '@/utils/redirect'

export default defineComponent({
  name: 'AuthVerify',
  data () {
    return {}
  },
  setup () {
    const router = useRouter()
    const extractCode = ref('')
    const onClickLeft = () => {
      router.back()
    }
    const checkClick = () => {
      if (extractCode.value !== '') {
        httpValidCheckExtractCode({ extractCode: extractCode.value }).then((res) => {
          if (res.data?.whetherTask === 0) {
            router.push({ name: 'InfoInput', query: { extractCode: extractCode.value } })
          } else if (res.data?.whetherTask === 1) {
            // 状态为1就直接跳电子签
            goSign({
              orderBusType: 1,
              extractCode: extractCode.value,
              idCard: res.data?.idCard || ''
            })
            // location.href = `http://hrfax.imwork.net:10087?orderBusType=1&extractCode=${extractCode.value}&idCard=${res.data?.idCard}`
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请输入授权码'
        })
      }
    }
    return {
      extractCode,
      onClickLeft,
      checkClick
    }
  }
})
</script>
<style lang="scss">
@import '../assets/css/variables.scss';
  .auth-verify {
    height: calc(100vh - 46px);
    background-color: #fff;
    .img {
    width: 100%;
    height: 180px;
    background: url("../assets/images/auth.png") center center no-repeat;
    background-size: 100% 100%;
    }
    .text {
      padding: 40px 20px;
      .text-1 {
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        font-weight: 700;
      }
      .text-2 {
        height: 21px;
        line-height: 21px;
        color: #666;
        font-size: 15px;
      }
    }
    .input-code {
      padding: 18px 20px;
    }
    .van-field__label {
      width: 60px;
    }
    .input-label {
      font-size: 15px;
      color: #333;
      font-weight: 700;
    }
    .button-bar {
      padding: 50px 20px 20px;
      .button {
        background-color: $themeColor;
        border-color: $themeColor;
      }
    }
  }
</style>
