let env = process.env.BUILD_ENV;

module.exports = {
  env: {
    NODE_ENV: env === 'dev' ? '"dev"' : '"development"'
  },
  plugins: [
    '@tarojs/plugin-html',
    ['@tarojs/plugin-vue-devtools', {
      enabled: false
    }]
  ],
  outputRoot: env === 'dev' ? `public/${env}/${process.env.TARO_ENV}` : `dist/${process.env.TARO_ENV}`,
  defineConstants: {
  },
  mini: {
  },
  h5: {}
}
