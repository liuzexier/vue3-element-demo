<template>
  <view class="travel-c">
    <view class="switch-tab-bar">
      <nut-tabs v-model="status" v-if="role === 'student'">
        <nut-tabpane title="申请中"></nut-tabpane>
        <nut-tabpane title="已通过"></nut-tabpane>
      </nut-tabs>
      <nut-tabs v-model="status" v-else-if="role === 'teacher'">
        <nut-tabpane title="待审批"></nut-tabpane>
        <nut-tabpane title="已审批"></nut-tabpane>
      </nut-tabs>
    </view>
    <scroll-view class="liuyan-s" :scroll-y="true" @scrolltolower="handleLoadMore">
      <view class="scroll-c">
        <view class="card-c card" v-for="(item) in list" :key="item.id" @tap="handleDetail(item)">
          <view class="title no-overflow">萨菲隆</view>
          <view
            class="content webline-2"
          >是法撒旦法师法的数量sad接口发了;沙发垫了;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开;开发萨达拉什福德啊李帅大富科技爱上的看法就爱上了放得开</view>
          <view class="time-c">2012-11-11</view>
        </view>
      </view>
    </scroll-view>
    <view class="add-travel" v-if="role == 'student'" @tap="handleAddTravel">
      <nut-icon name="uploader" size="26" color="#fff"></nut-icon>
    </view>
  </view>
  <custom-tab-bar></custom-tab-bar>
</template>
<script lang="ts">
import { useRole } from '@/common/useRole'
import { navigateTo } from '@tarojs/taro'
import { defineComponent, ref, reactive } from 'vue'
import * as TravelService from '@/service/TravelService'
import { useUserInfo } from '@/common/useUserInfo'
export default defineComponent({
  setup() {
    const status = ref('0')
    const total = ref(0)
    const query = reactive({
      pageUtil: {
        page: 1,
        limit: 10
      }
    })
    const list: any[] = reactive([])
    const { role } = useRole()
    const { userInfo } = useUserInfo()
    function handleLoadMore() {
      if (total.value < list.length) {
        query.pageUtil.page++
        getList()
      }
    }
    function getList() {
      TravelService.getTravelList({
        ...query, data: {
          userId: userInfo.value.id
        }
      }).then(res => {
        // console.log('获取出行列表')
        total.value = res.data.count
        list.push(...(res.data?.data || []))
      })
    }
    function handleAddTravel() {
      navigateTo({
        url: `/pages/add-travel/index`
      })
    }
    function handleDetail(item) {
      navigateTo({
        url: `/pages/add-travel/index?id=${item.id}&readonly=true`
      })
    }
    getList()
    return {
      handleLoadMore,
      status,
      handleAddTravel,
      role,
      handleDetail,
      list
    }
  }
})
</script>
<style lang="less">
.travel-c {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px - env(safe-area-inset-bottom));

  .switch-tab-bar {
    .nut-tabs__content {
      display: none;
    }
  }
  .liuyan-s {
    height: 0;
    flex: 1;
    .scroll-c {
      padding: 0 14px;
      .card {
        margin-bottom: 10px;
      }
    }
  }
  .add-travel {
    position: fixed;
    right: 10px;
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