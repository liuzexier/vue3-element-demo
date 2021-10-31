<template>
  <view class="add-liuyan-c">
    <view class="info-card">
      <view class="title">留言内容</view>
      <textarea placeholder="请输入留言内容(80字)" class="text-area" maxlength="80"></textarea>
    </view>
    <nut-button size="large" type="primary" @tap="handleCommit">确定</nut-button>
  </view>
</template>
<script lang='ts'>
import { navigateBack, showToast } from '@tarojs/taro'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    function handleCommit() {
      // TODO: 提交留言
      showToast({ title: '发布成功' }).then(() => {
        setTimeout(() => {
          navigateBack()
        }, 1000);
      })
    }
    return {
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