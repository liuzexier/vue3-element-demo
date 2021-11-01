<template>
  <view class="add-liuyan-c">
    <view class="info-card">
      <!-- <nut-input :disabled="disabled" label="姓名" placeholder="请输入姓名"></nut-input> -->
      <!-- <nut-input :disabled="disabled" label="班级" placeholder="请输入班级"></nut-input> -->
      <nut-input
        type="digit"
        :disabled="disabled"
        v-model="data.temperature"
        label="体温"
        placeholder="请输入体温"
      ></nut-input>
      <nut-input
        type="digit"
        :disabled="disabled"
        v-model="data.place"
        label="地点"
        placeholder="请输入地点"
      ></nut-input>
      <CommonPicker
        :disabled="disabled"
        label="时间"
        placeholder="请选择时间"
        mode="date"
        v-model="data.applyDate"
      ></CommonPicker>
      <!-- <CommonPicker :disabled="disabled" label="结束时间" placeholder="请选择结束时间" mode="date"></CommonPicker> -->
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
      <nut-button @tap="handleChangeStatus('2')" size="large" type="success">通过</nut-button>
      <nut-button @tap="handleChangeStatus('3')" size="large" type="danger">驳回</nut-button>
    </template>
  </view>
</template>
<script lang='ts'>
import { Current, navigateBack, setNavigationBarTitle, showToast } from '@tarojs/taro'
import { defineComponent, ref, reactive } from 'vue'
import CommonPicker from '@/components/common-picker/index.vue'
import { useRole } from '@/common/useRole'
import * as TravelService from '@/service/TravelService'
export default defineComponent({
  components: {
    CommonPicker
  },
  setup() {
    const id: any = Current.page?.options?.id
    const readonly: any = Current.page?.options?.readonly
    const disabled = ref(false)
    const { role } = useRole()

    const data = reactive({
      place: '',
      temperature: '',
      applyDate: ''
    })
    function handleCommit() {
      TravelService.addTravel({
        ...data,
        status: 1
      }).then(res => {
        if (res.code == 200) {
          showToast({ title: '提交成功' }).then(() => {
            setTimeout(() => {
              navigateBack()
            }, 1000);
          })
        }
      })

    }
    function getData() {
      if (id) {
        TravelService.getTravel({ id }).then(res => {
          if (res.code == 200) {
            Object.assign(data, res.data)
          }
        })
      }
      if (readonly === 'true') {
        disabled.value = true
        setNavigationBarTitle({ title: '出行审批' })
      }
    }
    function handleChangeStatus(data) {
      TravelService.travelApply({
        id,
        status: data
      }).then(res => {
        if (res.code == 200) {
          showToast({ title: '审批完成' })
        }
      })
    }
    getData()
    return {
      disabled,
      role,
      handleCommit,
      data,
      handleChangeStatus
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