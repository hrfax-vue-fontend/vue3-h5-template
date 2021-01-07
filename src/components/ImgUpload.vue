<!--
 * @Author: your name
 * @Date: 2020-12-21 10:10:48
 * @LastEditTime: 2020-12-28 21:18:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\components\ImgUpload.vue
-->
<template>
  <div style="background-color: #fff;padding: 20px 20px 0;">
    <div class="img-upload" :class="code === 'idCardBackUrl'? 'img-upload-idCardBackUrl' : ''" :style="{background: infoData[code].val? '#000': ''}">
      <div v-if="infoData[code].val">
        <img
          class="img-content"
          :src="infoData[code].val"
          @click="showImg(infoData[code].val)" />
      </div>
      <div v-else >
        <van-uploader :after-read="afterRead">
          <div style="width: 80vw;">
            <van-icon class="photograph" name="photograph" />
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="img-title"><i style="color: red;vertical-align: middle;" v-if="infoData[code].required">* </i>{{infoData[code].label}}</div>
    <!-- 图片预览 -->
    <van-image-preview
      closeable
      v-model:show="state.show"
      :images="state.images">
      <template v-slot:index>
        {{state.title}}
      </template>
      <template v-slot:cover style="position: relative;">
        <van-icon name="delete"
            @click="deleteImg"
            class="delete-btn"/>
      </template>
    </van-image-preview>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { Dialog, Toast } from 'vant'
import { httpValidOcr } from '@/api'

export default defineComponent({
  name: 'ImgUpload',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const infoData: any = inject('infoData')
    const validate: any = inject('validate')
    const urlParams: any = inject('urlParams')
    const obj: {show: boolean; images: string[]; title: string} = {
      show: false,
      images: [''],
      title: ''
    }
    const state = reactive(obj)
    const showImg = (fullUrl: string) => {
      state.show = true
      state.images = [fullUrl]
      state.title = infoData[props.code].label
    }
    const deleteImg = () => {
      Dialog.confirm({
        title: '提示',
        message: '确定删除?'
      }).then(() => {
        infoData[props.code].val = ''
        state.show = false
        validate(props.code)
      }).catch(() => {
        console.log('取消删除')
      })
    }
    const afterRead = (file: any) => {
      infoData[props.code].val = file.content
      const params = {
        orderNo: urlParams.orderNo || '',
        extractCode: urlParams.extractCode || '',
        typeId: props.code === 'idCardFrontUrl' ? 2 : 3,
        idCardBase64: infoData[props.code].val.replace(/^data:image\/\w+;base64,/, '')
      }
      Toast.loading({
        message: 'ocr识别中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      httpValidOcr(params).then((res) => {
        for (const key in res.data) {
          if (key in infoData) {
            infoData[key].val = res.data[key]
          }
        }
      }).catch(() => {
        Toast('请重新拍摄')
        infoData[props.code].val = ''
      }).finally(() => {
        validate(props.code)
      })
    }
    return {
      infoData,
      showImg,
      state,
      deleteImg,
      afterRead
    }
  }
})
</script>

<style scoped lang="scss">
.img-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  height: 200px;
  background: url("../assets/images/idCard_front_bg.png") center center no-repeat;
  background-size: 100% 100%;
}
.img-upload-idCardBackUrl {
  background: url("../assets/images/idCard_back_bg.png") center center no-repeat;
  background-size: 100% 100%;
}
.img-content {
  max-width: 100%;
  max-height: 200px;
  vertical-align: top;
}
.img-title {
  text-align: center;
  font-size: 16px;
  padding: 5px 10px 10px;
}
.img-item-upload {
  background-color: #000;
  height: 200px;
  width: 80vw;
  margin: 0 auto;
}
.photograph {
  text-align: center;
  font-size: 45px;
  line-height: 200px;
  color: #555;
}
.delete-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #dedede;
  width: 22px;
  height: 22px;
  font-size: 16px;
  color: #000;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
