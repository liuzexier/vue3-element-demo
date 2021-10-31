<template>
  <view class="publish-c">
    <scroll-view class="public-s" :scroll-y="true" @scrolltolower="handleLoadMore">
      <view class="scroll-c">
        <view class="card-c card" v-for="(item) in list" :key="item.id" @tap="handleViewDetail(item)">
          <!-- <view class="title no-overflow">21313131</view> -->
          <view class="content webline-2">{{ item.content }}</view>
          <view class="time-c">{{ item.ctime }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
  <custom-tab-bar></custom-tab-bar>
</template>
<script lang="ts">
import { navigateTo } from '@tarojs/taro'
import { defineComponent, reactive, ref } from 'vue'
import * as PublishService from '@/service/PublishService'
export default defineComponent({
  setup() {
    const query = reactive({
      pageUtil: {
        page: 1,
        limit: 10
      }
    })
    const list: any[] = reactive([])
    const total = ref(0)
    function handleViewDetail(item) {
      navigateTo({
        url: `/pages/publish-detail/index?id=${item?.id || ''}`
      })
    }

    function handleLoadMore() {
      if (total.value < list.length) {
        query.pageUtil.page++
        getList()
      }
    }
    function getList() {
      PublishService.getPublishList(query).then(res => {
        total.value = res.data.count
        list.push(...(res.data.data || []))
      })
    }
    getList()
    return {
      list,
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
}
</style>