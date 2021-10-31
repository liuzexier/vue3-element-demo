<template>
  <view class="register-c">
    <view class="input-c">
      <nut-input v-model="data.username" :require-show="true" label="用户名"></nut-input>
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
      <nut-input
        v-model="data.requirePassword"
        :require-show="true"
        label="确认密码"
        type="password"
        max-length="10"
      ></nut-input>
      <view class="select nut-input nut-input-require">
        <view class="title nut-input-label">选择角色</view>
        <nut-radiogroup v-model="data.type">
          <nut-radio label="1">学生</nut-radio>
          <nut-radio label="2">老师</nut-radio>
        </nut-radiogroup>
      </view>

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
import { navigateBack, showToast } from '@tarojs/taro'
import * as RegisiterService from '@/service/RegisiterService'
export default defineComponent({
  name: 'Register',
  setup() {
    const data = reactive({
      phone: '',
      username: '',
      password: '',
      requirePassword: '',
      type: ''
    })
    const loading = ref(false)

    function handleSubmit() {
      if (loading.value) return false
      if (validate(data)) {
        if (data.requirePassword !== data.password) {
          return showToast({ title: '两次密码输入不一致', icon: 'none' })
        } else {
          loading.value = true
          RegisiterService.regisiter({
            username: data.username,
            password: data.password,
            phone: data.phone,
            type: data.type
          }).then(res => {
            loading.value = false
            if (res.code == 200) {
              showToast({ title: '注册成功' })
              setTimeout(() => {
                navigateBack()
              }, 1000)
            } else {
              showToast({ title: res.msg, icon: 'none' })
            }
          })
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
    .select {
      display: flex;
      .nut-radio {
        display: inline-flex;
        margin-right: 30px;
      }
    }
  }
}
</style>
