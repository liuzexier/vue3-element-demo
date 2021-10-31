<template>
  <view class="index">
    <nut-icon name="dongdong"></nut-icon>
    <nut-icon name="dongdong"></nut-icon>
    <!-- <nuxt-icon name="dongdong"></nuxt-icon> -->
  </view>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'Index',
  components: {
  },
  setup() {
    const addressList: any[] = reactive([])
    return {
      addressList
    }
  }
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
