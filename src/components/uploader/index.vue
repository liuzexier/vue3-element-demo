<template>
  <view class="file-list">
    <view class="file-item upload-btn" v-for="(item,index) in uploadedFiles" :key="item.url">
      <image @tap="handlePreview(item)" mode="aspectFill" :src="item.url" />
      <svg-icon
        class="icon-close"
        :data="require('@icons/icon-close.svg')"
        @tap="handleDelete(index)"
      ></svg-icon>
    </view>
    <view class="upload-btn" v-if="uploadedFiles?.length < limit" @tap="handleSelectImage">
      <svg-icon width="30" height="30" :data="require('@icons/icon-add.svg')"></svg-icon>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as Taro from '@tarojs/taro'
import * as UploadService from '@/service/UploadService'

export default defineComponent({
  name: 'Uploader',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    // files: {
    //   type: Array,
    //   default: () => []
    // },
    limit: {
      type: Number,
      default: 3
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const uploadedFiles = computed(() => {
      return props.modelValue.map((item: any) => {
        return {
          url: item.url
        }
      })
    })
    function handleSelectImage() {
      if (props.disabled) return false
      Taro.chooseImage({
        count: uploadedFiles.value.length - props.limit,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: async (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths

          // tempFilePaths.forEach((item) => {
          //   UploadService.uploadFile(item)
          // })
          for (let i = 0; i < tempFilePaths.length; i++) {
            const element = tempFilePaths[i];
            const res: any = await UploadService.uploadFile(element)
            // TODO: 上传图片返回的结果
            const fileList = props.modelValue
            fileList.push(res.data.data)
            ctx.emit('update:modelValue', fileList)
          }
        }
      })
    }
    function handlePreview(item) {
      Taro.previewImage({
        current: item.url,
        urls: uploadedFiles.value.map((item: any) => {
          return item.url
        })
      })
    }
    function handleDelete(index) {
      if (props.disabled) return false
      const fileList = props.modelValue
      fileList.splice(index, 1)
      ctx.emit('update:modelValue', fileList)
    }
    return {
      handleSelectImage,
      handlePreview,
      handleDelete,
      uploadedFiles
    }
  }
})
</script>
<style lang="less">
.file-list {
  .file-item {
    position: relative;
    image {
      width: 100%;
      height: 100%;
    }
    .icon-close {
      position: absolute;
      top: 0;
      right: 0;
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
      }
    }
  }
  .upload-btn {
    margin-right: 10px;
    margin-bottom: 10px;
    vertical-align: top;
    width: 70px;
    height: 70px;
    background-color: #f9f9f9;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>