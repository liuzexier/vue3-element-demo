export default {
  pages: [
    'pages/tabbar/publish/index',
    'pages/tabbar/learn/index',
    'pages/tabbar/travel/index',
    'pages/tabbar/liuyan/index',
    'pages/tabbar/setting/index',
    'pages/login/index',
    'pages/register/index',
    'pages/publish-detail/index',
    'pages/add-liuyan/index',
    'pages/add-travel/index',
    'pages/learn-detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#999',
    selectedColor: '#333',
    // 首页、订单、库存、报表、设置
    list: [
      {
        pagePath: 'pages/tabbar/publish/index',
        text: '公告',
        iconPath: 'assets/image/tabbar/publish.png',
        selectedIconPath: 'assets/image/tabbar/publish-s.png'
      },
      {
        pagePath: 'pages/tabbar/liuyan/index',
        text: '留言',
        iconPath: 'assets/image/tabbar/liuyan.png',
        selectedIconPath: 'assets/image/tabbar/liuyan-s.png'
      },
      {
        pagePath: 'pages/tabbar/travel/index',
        text: '出行',
        iconPath: 'assets/image/tabbar/travel.png',
        selectedIconPath: 'assets/image/tabbar/travel-s.png'
      },
      {
        pagePath: 'pages/tabbar/learn/index',
        text: '学习',
        iconPath: 'assets/image/tabbar/learn.png',
        selectedIconPath: 'assets/image/tabbar/learn-s.png'
      },
      {
        pagePath: 'pages/tabbar/setting/index',
        text: '设置',
        iconPath: 'assets/image/tabbar/setting.png',
        selectedIconPath: 'assets/image/tabbar/setting-s.png'
      }
    ]
  },
}
