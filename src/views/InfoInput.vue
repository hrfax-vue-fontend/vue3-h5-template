<!--
 * @Author: your name
 * @Date: 2020-12-17 12:56:31
 * @LastEditTime: 2020-12-28 12:40:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\views\InfoInput.vue
-->
<template>
  <div style="padding: 20px 0" class="info-input">
    <form-component class="content" ref="formRef"></form-component>
    <!-- 按钮 -->
    <div class="button-bar">
      <van-button type="primary"
                  class="button"
                  size="large"
                  @click="nextStep"
                  round >下一步</van-button>
    </div>
  </div>
</template>

<script>
import { reactive, provide, ref, onBeforeMount } from 'vue'
import { httpValidValidIdentity, httpValidOcrPageData } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import FormComponent from '@/components/FormComponent.vue'
import { goSign } from '@/utils/redirect'
import { tool } from '@/utils/tool'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fieldMap = require('@/assets/fieldMap')

export default {
  name: 'InfoInput',
  components: {
    FormComponent
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const urlParams = route.query
    const formRef = ref(null)
    const data = {
      // name: '张三',
      // enname: 'ZHANG,SAN',
      // sex: '男',
      // people: '汉族',
      // // eslint-disable-next-line @typescript-eslint/camelcase
      // id_number: 420683199607082218,
      // birthday: '20201219',
      // // eslint-disable-next-line @typescript-eslint/camelcase
      // term_to: '20221010',
      // // eslint-disable-next-line @typescript-eslint/camelcase
      // issue_date: '20091203',
      // idCardFrontUrl: 'https://img.yzcdn.cn/vant/leaf.jpg'
    }
    if (!urlParams?.extractCode) {
      return router.back()
    }

    // 初始化数据
    const initData = {}
    for (const key in fieldMap) {
      initData[key] = {
        ...fieldMap[key],
        val: data[key] || ''
      }
    }
    const infoData = reactive(initData)

    onBeforeMount(() => {
      httpValidOcrPageData({ extractCode: urlParams.extractCode }).then((res) => {
        const result = res.data || {}
        for (const key in infoData) {
          if (tool.checkHaveData(result[key])) {
            infoData[key].val = result[key]
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    })

    provide('infoData', infoData)
    provide('urlParams', urlParams)
    const nextStep = () => {
      // 验证所有需要提交的数据
      const submitData = formRef.value.validateAll()
      if (!submitData) return
      const params = {
        orderNo: urlParams.orderNo || '',
        // assurerNo: '',
        extractCode: urlParams.extractCode,
        ...submitData
      }
      params.idCardFrontUrl = '' // 身份证正面ocr时后台已保存，此处就不上传了
      params.idCardBackUrl = '' // 身份证反面ocr时后台已保存，此处就不上传了
      httpValidValidIdentity(params).then((res) => {
        goSign({
          orderBusType: 1,
          extractCode: urlParams.extractCode,
          idCard: infoData.id_number.val
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    // 姓名变更就清空姓名拼音的值(ocr识别赋值，姓名也会变更触发，故注释)
    // watch(
    //   () => infoData.name.val,
    //   (newVal, oldVal) => {
    //     if ((newVal !== oldVal)) {
    //       infoData.enname.val = ''
    //     }
    //   })
    return {
      nextStep,
      formRef
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variables.scss';
.info-input {
    .button-bar {
    padding: 20px;
    .button {
      background-color: $themeColor;
      border-color: $themeColor;
    }
  }
}
.content {
  width: 96%;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}
</style>
