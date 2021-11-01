
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";
declare module "*.vue";
declare interface PageConfig {
  navigationBarBackgroundColor?: string // 导航栏背景颜色，如 #000000	
  navigationBarTextStyle?: 'black' | 'white' // 导航栏标题颜色，仅支持 black / white	
  navigationBarTitleText?: string // 导航栏标题文字内容
  navigationStyle?: 'default' | 'custom' // 导航栏样式，仅支持以下值：default 默认样式 custom 自定义导航栏，只保留右上角胶囊按钮。
  backgroundColor?: string // 窗口的背景色	
  backgroundTextStyle?: 'dark' | 'light' // 下拉 loading 的样式，仅支持 dark / light	
  backgroundColorTop?: string // 顶部窗口的背景色，仅 iOS 支持	
  backgroundColorBottom?: string // 底部窗口的背景色，仅 iOS 支持	
  enablePullDownRefresh?: boolean // 是否开启当前页面下拉刷新。
  onReachBottomDistance?: number // 页面上拉触底事件触发时距页面底部距离，单位为px。
  pageOrientation?: string // 屏幕旋转设置，支持 auto / portrait / landscape
  disableScroll?: boolean // 设置为 true 则页面整体不能上下滚动。
  usingComponents?: any // 	页面自定义组件配置
  initialRenderingCache?: string // 	页面初始渲染缓存配置
  style?: string // 启用新版的组件样式	
  singlePage?: any // 单页模式相关配置	
}

declare interface PageUtil {
  page: number,
  limit: number
}
declare interface PageQuery {
  pageUtil: PageUtil,
  data?: any
}


declare namespace __wxConfig { }