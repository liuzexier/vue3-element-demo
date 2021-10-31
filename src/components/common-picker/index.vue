<template>
  <view
    class="nut-input nut-picker"
    :class="[requireShow?'nut-input-require':'']"
  >
    <view
      v-if="label"
      class="nut-input-label"
    >
      <view class="label-string">
        {{label}}
      </view>
    </view>
    <picker
      v-if="mode==='selector'?range.length:true"
      :mode="mode"
      :disabled="disabled"
      :range="range"
      :value="value"
      range-key="label"
      @change="handleChange"
      @cancel="handleCancel"
      class="input-text h5-input picker-input"
    >
      <view
        class="select"
        v-if="mode==='selector'"
      >
        <view v-if="showLabel">{{showLabel}}</view>
        <view
          v-else
          class="picker-placeholder"
        >{{placeholder}}</view>
        <svg-icon :data="require('@icons/icon-down.svg')"></svg-icon>
      </view>
      <view
        v-else
        class="date"
      >
        <view v-if="modelValue">{{modelValue}}</view>
        <view
          v-else
          class="picker-placeholder"
        >{{placeholder}}</view>
        <svg-icon :data="require('@icons/icon-down.svg')"></svg-icon>
      </view>
    </picker>
  </view>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CommonPicker',
  props: {
    label: {
      type: String
    },
    mode: {
      type: String,
      default: 'selector'
    },
    requireShow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  setup(_props: any, ctx) {
    const value = computed(() => {
      return Math.max(
        _props.range?.findIndex((item: any) => {
          return item.value === _props.modelValue
        }),
        0
      )
    })
    const showLabel = computed(() => {
      return (
        _props.range?.find((item: any) => {
          return item.value === _props.modelValue
        })?.label || ''
      )
    })
    function handleChange({ detail: { value } }) {
      if (_props.mode === 'selector') {
        ctx.emit('update:modelValue', _props.range?.[value]?.value)
        ctx.emit('change', _props.range?.[value]?.value)
      } else if (_props.mode === 'date') {
        ctx.emit('update:modelValue', value)
        ctx.emit('change', value)
      } else {
        ctx.emit('update:modelValue', value)
        ctx.emit('change', value)
      }
    }

    function handleCancel() {
      ctx.emit('update:modelValue', '')
      ctx.emit('change', '')
    }
    return {
      handleCancel,
      handleChange,
      showLabel,
      value
    }
  }
})
</script>
<style lang="less">
.nut-picker {
  .picker-input {
    .select,
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .picker-placeholder {
        color: #777;
      }
    }
  }
}
</style>
