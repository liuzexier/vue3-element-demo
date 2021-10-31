<template>
  <view class="add-liuyan-c">
    <view class="info-card">
      <nut-input :disabled="disabled" label="姓名" placeholder="请输入姓名"></nut-input>
      <nut-input :disabled="disabled" label="班级" placeholder="请输入班级"></nut-input>
      <CommonPicker :disabled="disabled" label="开始时间" placeholder="请选择开始时间" mode="date"></CommonPicker>
      <CommonPicker :disabled="disabled" label="结束时间" placeholder="请选择结束时间" mode="date"></CommonPicker>
    </view>
    <view class="info-card">
      <view class="title">原因</view>
      <textarea :disabled="disabled" placeholder="请输入原因(80字)" class="text-area" maxlength="80"></textarea>
    </view>
    <nut-button
      :disabled="disabled"
      v-if="role === 'student'"
      size="large"
      type="primary"
      @tap="handleCommit"
    >确定</nut-button>
    <template v-else-if="role === 'teacher'">
      <nut-button size="large" type="success">通过</nut-button>
      <nut-button size="large" type="danger">驳回</nut-button>
    </template>
  </view>
</template>
<script lang='ts'>
import { Current, navigateBack, setNavigationBarTitle, showToast } from '@tarojs/taro'
import { defineComponent, ref } from 'vue'
import CommonPicker from '@/components/common-picker/index.vue'
import { useRole } from '@/common/useRole'
export default defineComponent({
  components: {
    CommonPicker
  },
  setup() {
    const id: any = Current.page?.options?.id
    const readonly: any = Current.page?.options?.readonly
    const disabled = ref(false)
    const { role } = useRole()
    function handleCommit() {
      // TODO: 提交申请出行
      showToast({ title: '提交成功' }).then(() => {
        setTimeout(() => {
          navigateBack()
        }, 1000);
      })
    }
    function getData() {
      if (id) {
        // TODO: 获取申请详情

      }
      if (readonly === 'true') {
        disabled.value = true
        setNavigationBarTitle({ title: '出行审批' })
      }
    }
    getData()
    return {
      disabled,
      role,
      handleCommit
    }
  }
})
</script>
<style lang='less'>
.add-liuyan-c {
  padding: 14px;
  .nut-button {
    margin-bottom: 10px;
  }
}
</style>