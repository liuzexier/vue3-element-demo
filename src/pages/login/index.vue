<template>
  <view class="login-c">
    <view class="input-c">
      <nut-input v-model="data.username" :require-show="true" label="用户名"></nut-input>
      <nut-input v-model="data.password" :require-show="true" label="密码" type="password"></nut-input>
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
export default defineComponent({
  name: 'Login',
  setup() {
    const data = reactive({
      username: '',
      password: ''
    })
    const loading = ref(false)

    function handleSubmit() {
      if (validate(data)) {
        console.log(data)
        loading.value = true
        // TODO:登录接口
        loading.value = false
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
