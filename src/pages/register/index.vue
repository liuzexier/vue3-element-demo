<template>
  <view class="register-c">
    <view class="input-c">
      <nut-input v-model="data.username" :require-show="true" label="用户名"></nut-input>
      <nut-input v-model="data.password" :require-show="true" label="密码" type="password"></nut-input>
      <nut-input v-model="data.requirePassword" :require-show="true" label="确认密码" type="password"></nut-input>
      <nut-button
        class="submit"
        :loading="loading"
        size="large"
        type="primary"
        @tap="handleSubmit"
      >确定</nut-button>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { validate } from '@/utils'
import { showToast } from '@tarojs/taro'
export default defineComponent({
  name: 'Register',
  setup() {
    const data = reactive({
      username: '',
      password: '',
      requirePassword: ''
    })
    const loading = ref(false)

    function handleSubmit() {
      if (validate(data)) {
        if (data.requirePassword !== data.password) {
          return showToast({ title: '两次密码输入不一致', icon: 'none' })
        } else {
          loading.value = true
          // TODO: 注册接口
          loading.value = false
        }

      }
    }
    return {
      data,
      loading,
      handleSubmit
    }
  }
})
</script>
<style lang="less">
.register-c {
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
