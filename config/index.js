const { resolve, join } = require('path')
function getHostUrl() {
  let env = process.env.BUILD_ENV;

  switch (env) {
    case 'dev':
      return ''
    case 'development':
      return ''
    case 'test':
      return ''
    case 'preview':
      return ''
    default:
      return ''
  }
}

const svgFilePath = [
  join(__dirname, '..', 'src/assets/icons'),
]

const config = {
  projectName: 'parking-weapp',
  date: '2021-9-1',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  plugins: ['@tarojs/plugin-html'],
  sass: {
    resource: [
      resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')
    ]
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  defineConstants: {
  },
  alias: {
    '@': resolve(__dirname, '..', 'src'),
    '@icons': resolve(__dirname, '..', 'src/assets/icons'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  mini: {
    enableSourceMap: true,
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]_[local]_[hash:base64:3]'
        }
      }
    },
    imageUrlLoaderOption: {

    },
    webpackChain(chain, webpack) {
      // chain.module.rule('image').test(/\.(png|jpe?g|gif|bpm|webp)(\?.*)?$/)
      const oneOfsMap = chain.module.rule('less').oneOfs.store
      oneOfsMap.forEach(item => {
        item.use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources: resolve(__dirname, '..', 'src/assets/less/mixin.less')
          })
          .end()
      })
      // 清除默认image规则包含的svg目录的path
      chain.module
        .rule('image')
        .exclude.add(svgFilePath)
        .end()
      chain.merge({
        module: {
          rule: {
            // image: {
            //   test: /\.(png|jpe?g|gif|bpm|webp)(\?.*)?$/i
            // },
            svgIcon: {
              test: /\.svg$/,
              include: svgFilePath,
              use: [{
                loader: "@yzfe/svgicon-loader",
                options: {
                  svgFilePath,
                  // component: 'taro',
                }
              }, {
                // 使用svgo压缩svg
                loader: 'svgo-loader',
              }]
            },
            // svgLoader: {
            //   test: /\.svg$/i,
            //   use: [
            //     {
            //       loader: 'url-loader',
            //       options: {
            //         // 小于该数值的图片会被转为base64
            //         limit: 1024, // 1Kb
            //         esModule: false,
            //         name: 'assets/icon/[name].[hash:8].[ext]',
            //       }
            //     },
            //     {
            //       // 使用svgo压缩svg
            //       loader: 'svgo-loader',
            //     },
            //   ]
            // },
            linkReplace: {
              test: /\.(vue|js|ts)$/,
              use: [{
                loader: 'webpack-replace',
                options: {
                  replace: [{
                    from: "__HOSTNAME__",
                    to: getHostUrl()
                  }]
                }
              }]
            }
          }
        }
      })
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  console.log(process.env.BUILD_ENV)
  let env = process.env.BUILD_ENV;
  if (env === "development") {
    return merge({}, config, require("./dev"));
  } else if (env === "dev") {
    return merge({}, config, require("./dev"));
  } else if (env === "test") {
    return merge({}, config, require("./test"));
  } else if (env === "preview") {
    return merge({}, config, require("./pre"));
  }
  return merge({}, config, require("./prod"));
}
