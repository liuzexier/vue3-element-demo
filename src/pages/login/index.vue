<template>
  <view class="login-c">
    <view class="input-c">
      <!-- <nut-input v-model="data.username" :require-show="true" label="用户名"></nut-input> -->
      <nut-input
        v-model="data.phone"
        :require-show="true"
        label="手机号码"
        max-length="11"
        type="number"
      ></nut-input>
      <nut-input
        v-model="data.password"
        :require-show="true"
        label="密码"
        type="password"
        max-length="10"
      ></nut-input>
      <nut-button
        :loading="loading"
        class="submit"
        size="large"
        type="primary"
        @tap="handleSubmit"
      >确定</nut-button>
      <nut-button class="submit" size="large" @tap="handleRegister">注册</nut-button>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { validate } from '@/utils'
import { navigateTo, setStorageSync, showToast } from '@tarojs/taro'
import * as RegisiterService from '@/service/RegisiterService'
import { useUserInfo } from '@/common/useUserInfo'
export default defineComponent({
  name: 'Login',
  setup() {
    const data = reactive({
      phone: '',
      password: ''
    })
    const loading = ref(false)
    const { setUserInfo } = useUserInfo()
    function handleSubmit() {
      if (loading.value) return false
      if (validate(data)) {
        console.log(data)
        loading.value = true
        RegisiterService.login(data).then(res => {
          if (res.code == 200) {
            showToast({
              title: '登录成功'
            })
            setStorageSync('bearer', res.data)
            RegisiterService.getUserInfo().then(res => {
              setUserInfo(res.data)
              // setTimeout(() => {
              //   switchTab({
              //     url: '/pages/tabbar/publish/index'
              //   })
              // }, 1000)
            })

          }
        }).finally(() => {
          loading.value = false
        })
      }
    }
    function handleRegister() {
      navigateTo({
        url: `/pages/register/index`
      })
    }
    return {
      data,
      loading,
      handleSubmit,
      handleRegister
    }
  }
})
</script>
<style lang="less">
.login-c {
  padding: 14px;
  .input-c {
    background-color: #fff;
    padding: 14px;
    border-radius: 9px;
    margin-top: 100px;
    .submit {
      margin-top: 10px;
    }
  }
}
</style>
