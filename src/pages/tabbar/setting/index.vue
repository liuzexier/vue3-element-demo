<template>
  <view class="setting-c">
    <view class="top-container">
      <view class="left">
        <svg-icon width="50" height="50" :data="require('@icons/icon-mine.svg')"></svg-icon>
      </view>
      <view class="right">
        <view class="title no-overflow">{{ userInfo.username }}</view>
        <view class="desc no-overflow">{{ userInfo.phone }}</view>
      </view>
    </view>
    <view class="menu-c">
      <nut-cell-group>
        <nut-cell v-if="role === ''" title="登录" @tap="handleLogin"></nut-cell>
        <template v-else>
          <nut-cell title="切换账号" is-link @tap="handleLogin"></nut-cell>
          <nut-cell title="退出登录" @tap="handleLogout"></nut-cell>
        </template>
      </nut-cell-group>
    </view>
  </view>
  <custom-tab-bar></custom-tab-bar>
</template>
<script lang="ts">
import { useRole } from '@/common/useRole'
import { useUserInfo } from '@/common/useUserInfo'
import { removeStorageSync } from '@tarojs/taro'
import { navigateTo } from '@tarojs/taro'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const { role } = useRole()
    const { userInfo } = useUserInfo()
    const { setUserInfo } = useUserInfo()
    function handleLogin() {
      navigateTo({
        url: `/pages/login/index`
      })
    }
    function handleLogout() {
      removeStorageSync('bearer')
      setUserInfo({})
    }
    return {
      role,
      userInfo,
      handleLogin,
      handleLogout
    }
  }
})
</script>
<style lang="less">
.setting-c {
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
  .top-container {
    background-color: #fff;
    padding: 30px 20px;
    display: flex;
    .right {
      width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 0 3px 10px;
      .title {
        font-size: 15px;
        font-weight: 500;
        line-height: 25px;
      }
      .desc {
        font-size: 13px;
        font-weight: 400;
        color: #999;
        line-height: 20px;
      }
    }
  }
  .menu-c {
    padding: 9px 14px;
    overflow: hidden;
  }
}
</style>