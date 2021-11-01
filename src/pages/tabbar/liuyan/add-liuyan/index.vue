<template>
  <view class="add-liuyan-c">
    <view class="info-card">
      <view class="title">留言内容</view>
      <textarea
        placeholder="请输入留言内容(80字)"
        class="text-area"
        maxlength="80"
        v-model="data.body.text"
      ></textarea>
    </view>
    <view class="info-card">
      <view class="title">选择图片</view>
      <Uploader :limit="3" v-model="data.body.imgs"></Uploader>
    </view>
    <nut-button size="large" type="primary" @tap="handleCommit">确定</nut-button>
  </view>
</template>
<script lang='ts'>
import { navigateBack, showToast } from '@tarojs/taro'
import { defineComponent, reactive } from 'vue'
import * as  LiuyanService from '@/service/LiuyanService'
import Uploader from '@/components/uploader/index.vue'
export default defineComponent({
  components: {
    Uploader
  },
  setup() {
    const data = reactive({
      body: {
        text: '',
        imgs: []
      },
      status: 1
    })
    function handleCommit() {
      LiuyanService.addMessage({
        status: data.status,
        body: JSON.stringify(data.body)
      }).then(res => {
        if (res.code == 200) {
          showToast({ title: '发布成功' }).then(() => {
            setTimeout(() => {
              navigateBack()
            }, 1000);
          })
        }
      })
    }
    return {
      data,
      handleCommit
    }
  }
})
</script>
<style lang='less'>
.add-liuyan-c {
  padding: 14px;
}
</style>