<template>
  <view class="publist-detail-c">
    <!-- <view class="title">标题</view> -->
    <view class="content">{{ info.content }}</view>
  </view>
</template>
<script lang='ts'>
import { getPublishInfo } from '@/service/PublishService'
import { Current } from '@tarojs/taro'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const id: any = Current.page?.options?.id
    const info: any = reactive({})
    function getData() {
      getPublishInfo({
        id
      }).then(res => {
        Object.assign(info, res.data)
      })
    }
    getData()
    return {
      info
    }
  }
})
</script>
<style lang='less'>
.publist-detail-c {
  padding: 0 14px;
  .title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin: 1em 0;
  }
  .content {
    margin: 1em 0;
    margin-top: 20px;
    font-size: 15px;
    text-align: justify;
    color: #333;
    text-indent: 2em;
  }
}
</style>