let env = process.env.BUILD_ENV;

module.exports = {
  env: {
    NODE_ENV: '"test"'
  },
  outputRoot: `public/${env}/${process.env.TARO_ENV}`,
  defineConstants: {
  },
  mini: {
  },
  h5: {}
}
