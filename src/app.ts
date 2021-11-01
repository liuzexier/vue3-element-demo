import { createApp } from 'vue'
import './app.less'
import store from '@/store'
import { Button, Tabs, Icon, Input, TabPane, CellGroup, Cell, RadioGroup, Radio } from '@nutui/nutui-taro';
import { VueSvgIconPlugin } from '@/components/svg-icon/index'
import CustomTabBar from '@/components/custom-tab-bar/index.vue'
import * as RegisiterService from '@/service/RegisiterService'

import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import { getStorageSync } from '@tarojs/taro';


const App = createApp({
  onLaunch() {
    const bearer = getStorageSync('bearer')
    if (bearer) {
      RegisiterService.getUserInfo().then(res => {
        if (res.code == 200) {
          store.dispatch('setUserInfo', res.data)
        }
      })
    }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.config.compilerOptions.isCustomElement = tag => tag == 'view'

App
  .component('CustomTabBar', CustomTabBar)
  .use(Button)
  .use(Input)
  .use(Icon)
  .use(Tabs)
  .use(TabPane)
  .use(Cell)
  .use(CellGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(VueSvgIconPlugin, { tagName: 'svg-icon' })
  .use(store)
export default App
