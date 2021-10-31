import { createApp } from 'vue'
import { Avatar, Button, FixedNav, Icon, Input, OverLay, Toast } from '@nutui/nutui-taro';

import '@nutui/nutui-taro/dist/styles/themes/default.scss';


const App = createApp({
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Input).use(Toast).use(Icon).use(Avatar).use(FixedNav).use(OverLay)

export default App
