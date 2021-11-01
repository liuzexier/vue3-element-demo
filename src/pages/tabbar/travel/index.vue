<template>
  <view class="travel-c">
    <view class="switch-tab-bar">
      <nut-tabs @change="changeTabs" v-model="status" v-if="role === 'student'">
        <nut-tabpane title="申请中" pane-key="1"></nut-tabpane>
        <nut-tabpane title="已通过" pane-key="2"></nut-tabpane>
      </nut-tabs>
      <nut-tabs @change="changeTabs" v-model="status" v-else-if="role === 'teacher'">
        <nut-tabpane title="待审批" pane-key="1"></nut-tabpane>
        <nut-tabpane title="已审批"></nut-tabpane>
      </nut-tabs>
    </view>
    <scroll-view class="liuyan-s" :scroll-y="true" @scrolltolower="handleLoadMore">
      <view class="scroll-c">
        <view class="card-c card" v-for="(item) in list" :key="item.id" @tap="handleDetail(item)">
          <!-- TODO: 姓名 -->
          <view class="title no-overflow">萨菲隆</view>
          <view class="content webline-2">出行地{{ item.place }}</view>
          <view class="time-c">体温:{{ item.temperature }}</view>
          <view class="time-c">出行时间:{{ item.applyDate }}</view>
          <view class="time-c">状态:{{ item.status }}</view>
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
import { defineComponent, ref, reactive, computed } from 'vue'
import * as TravelService from '@/service/TravelService'
import { useUserInfo } from '@/common/useUserInfo'
export default defineComponent({
  setup() {
    const status = ref('1')
    const total = ref(0)
    const query = reactive({
      pageUtil: {
        page: 1,
        limit: 10
      },
    })
    const queryStatus = computed(() => {
      if (role.value === 'student') {
        return status.value
      } else {
        return status.value
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
          userId: role.value === 'student' ? userInfo.value.id : undefined,
          status: queryStatus.value
        }
      }).then(res => {
        total.value = res.data.count
        list.push(...(res.data?.data || []))
      })
    }
    function handleAddTravel() {
      navigateTo({
        url: `/pages/travel/add-travel/index`
      })
    }
    function handleDetail(item) {
      navigateTo({
        url: `/pages/add-travel/index?id=${item.id}&readonly=true`
      })
    }
    function changeTabs() {
      query.pageUtil.page = 1
      list.length = 0
      getList()
    }
    getList()
    return {
      handleLoadMore,
      status,
      handleAddTravel,
      role,
      handleDetail,
      list,
      changeTabs
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