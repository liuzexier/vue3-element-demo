<template>
  <view class="publish-c">
    <scroll-view class="public-s" :scroll-y="true" @scrolltolower="handleLoadMore">
      <view class="scroll-c">
        <view class="card-c card" v-for="(item) in 14" :key="item" @tap="handleViewDetail(item)">
          <view class="title no-overflow">21313131</view>
          <view
            class="content webline-2"
          >是法撒旦法师法的数量sad接口发了;沙发垫了;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开</view>
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
    function handleViewDetail(item) {
      navigateTo({
        url: `/pages/publish-detail/index?id=${item?.id}`
      })
    }

    function handleLoadMore() {
      if (total.value < list.length) {
        query.page++
        getList()
      }
    }
    function getList() {
      // TODO: 获取公告接口
      console.log('获取公告接口')

    }
    getList()
    return {
      query,
      handleViewDetail,
      handleLoadMore
    }
  }
})
</script>
<style lang="less">
.publish-c {
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
  .public-s {
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
          color: #999;
        }
      }
    }
  }
}
</style>