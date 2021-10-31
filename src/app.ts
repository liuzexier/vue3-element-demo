import { createApp } from 'vue'
import './app.less'
import store from '@/store'
import { Button, Tabs, Icon, Input, TabPane, CellGroup, Cell } from '@nutui/nutui-taro';
import { VueSvgIconPlugin } from '@/components/svg-icon/index'
import CustomTabBar from '@/components/custom-tab-bar/index.vue'

import '@nutui/nutui-taro/dist/styles/themes/default.scss';


const App = createApp({
  // onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App
  .component('CustomTabBar', CustomTabBar)
  .use(Button)
  .use(Input)
  .use(Icon)
  .use(Tabs)
  .use(TabPane)
  .use(Cell)
  .use(CellGroup)
  .use(VueSvgIconPlugin, { tagName: 'svg-icon' })
  .use(store)
export default App
