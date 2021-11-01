<template>
  <view class="learn-c">
    <scroll-view class="liuyan-s" :scroll-y="true" @scrolltolower="handleLoadMore">
      <view class="scroll-c">
        <view class="card-c card" v-for="(item) in 14" :key="item" @tap="handleLearn(item)">
          <view class="title no-overflow">萨菲隆</view>
          <view
            class="content webline-2"
          >是法撒旦法师法的数量sad接口发了;沙发垫了;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开</view>
          <view class="time-c">2012-11-11</view>
        </view>
      </view>
    </scroll-view>
  </view>
  <custom-tab-bar></custom-tab-bar>
</template>
<script lang="ts">
import { navigateTo } from '@tarojs/taro'
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    const query = reactive({
      page: 1,
      size: 10
    })
    const list = reactive([])
    const total = ref(0)
    function handleLoadMore() {
      if (total.value < list.length) {
        query.page++
        getList()
      }
    }
    function getList() {
      // TODO: 获取留言接口
      console.log('获取留言接口')

    }
    function handleLearn(item) {
      navigateTo({
        url: `/pages/learn/learn-detail/index?id=${item.id}`
      })
    }
    getList()
    return {
      query,
      handleLoadMore,
      handleLearn
    }
  }
})
</script>
<style lang="less">
.learn-c {
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
  .liuyan-s {
    height: 100%;
    .scroll-c {
      padding: 14px;
      .card {
        margin-bottom: 10px;
        .title {
          font-size: 15px;
          font-weight: 500;
        }
        .content {
          font-size: 12px;
          font-weight: 400;
          color: #333;
        }
        .time-c {
          margin-top: 5px;
          text-align: right;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .add-liuyan {
    position: fixed;
    right: 10px;
    // bottom: 30px;
    bottom: calc(30px + 48px + env(safe-area-inset-bottom));
    background-image: linear-gradient(135deg, #fa2c19 0%, #fa6419 100%);
    border-radius: 50%;
    padding: 10px;
    .nut-icon {
      display: block;
    }
  }
}
</style>