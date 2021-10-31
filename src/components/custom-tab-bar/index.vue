<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view
      v-for="(item) in list"
      :key="item.text"
      class="tab-bar-item"
      @tap="switchIndexTab(item)"
    >
      <cover-image :src="route === item.pagePath ? item.selectedIconPath : item.iconPath"></cover-image>
      <cover-view
        :style="{ color: route === item.pagePath ? selectedColor : color }"
      >{{ item.text }}</cover-view>
    </cover-view>
  </cover-view>
</template>
<script lang='ts'>
import { defineComponent, reactive, computed, } from 'vue'
import { Current, switchTab } from '@tarojs/taro'
import { useRole } from '@/common/useRole'
export default defineComponent({
  setup() {
    const { role } = useRole()
    const route = (Current.page as any)?.route

    const studentList: any[] = reactive([
      {
        pagePath: 'pages/tabbar/publish/index',
        text: '公告',
        iconPath: require('@/assets/image/tabbar/publish.svg'),
        selectedIconPath: require('@/assets/image/tabbar/publish-s.svg')
      },
      {
        pagePath: 'pages/tabbar/liuyan/index',
        text: '留言',
        iconPath: require('@/assets/image/tabbar/liuyan.svg'),
        selectedIconPath: require('@/assets/image/tabbar/liuyan-s.svg')
      },
      {
        pagePath: 'pages/tabbar/travel/index',
        text: '出行',
        iconPath: require('@/assets/image/tabbar/travel.svg'),
        selectedIconPath: require('@/assets/image/tabbar/travel-s.svg')
      },
      {
        pagePath: 'pages/tabbar/learn/index',
        text: '学习',
        iconPath: require('@/assets/image/tabbar/learn.svg'),
        selectedIconPath: require('@/assets/image/tabbar/learn-s.svg')
      },
      {
        pagePath: 'pages/tabbar/setting/index',
        text: '设置',
        iconPath: require('@/assets/image/tabbar/setting.svg'),
        selectedIconPath: require('@/assets/image/tabbar/setting-s.svg')
      }
    ])
    const baseList: any[] = [
      {
        pagePath: 'pages/tabbar/publish/index',
        text: '公告',
        iconPath: require('@/assets/image/tabbar/publish.svg'),
        selectedIconPath: require('@/assets/image/tabbar/publish-s.svg')
      },
      {
        pagePath: 'pages/tabbar/liuyan/index',
        text: '留言',
        iconPath: require('@/assets/image/tabbar/liuyan.svg'),
        selectedIconPath: require('@/assets/image/tabbar/liuyan-s.svg')
      },
      {
        pagePath: 'pages/tabbar/setting/index',
        text: '设置',
        iconPath: require('@/assets/image/tabbar/setting.svg'),
        selectedIconPath: require('@/assets/image/tabbar/setting-s.svg')
      }
    ]
    const teacherList: any[] = reactive([
      {
        pagePath: 'pages/tabbar/publish/index',
        text: '公告',
        iconPath: require('@/assets/image/tabbar/publish.svg'),
        selectedIconPath: require('@/assets/image/tabbar/publish-s.svg')
      },
      {
        pagePath: 'pages/tabbar/liuyan/index',
        text: '留言',
        iconPath: require('@/assets/image/tabbar/liuyan.svg'),
        selectedIconPath: require('@/assets/image/tabbar/liuyan-s.svg')
      },
      {
        pagePath: 'pages/tabbar/travel/index',
        text: '出行审核',
        iconPath: require('@/assets/image/tabbar/travel.svg'),
        selectedIconPath: require('@/assets/image/tabbar/travel-s.svg')
      },
      {
        pagePath: 'pages/tabbar/setting/index',
        text: '设置',
        iconPath: require('@/assets/image/tabbar/setting.svg'),
        selectedIconPath: require('@/assets/image/tabbar/setting-s.svg')
      }
    ])
    const list = computed(() => {
      if (role.value === 'teacher') {
        return teacherList
      } else if (role.value === 'student') {
        return studentList
      } else {
        return baseList
      }
    })
    const selectedColor = '#333'
    const color = '#999'
    function switchIndexTab(item) {
      switchTab({
        url: `/${item.pagePath}`
      })
    }
    return {
      list,
      switchIndexTab,
      selectedColor,
      color,
      route
    }
  }
})
</script>
<style lang='less'>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 27px;
  height: 27px;
}

.tab-bar-item cover-view {
  font-size: 10px;
}
</style>