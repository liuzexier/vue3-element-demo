// 基于 taro-svgicon 和 vue3-svgicon 修改 
// https://github.com/MMF-FE/svgicon/blob/master/packages/taro-svgicon/src/index.tsx
// https://github.com/MMF-FE/svgicon/blob/master/packages/vue3-svgicon/src/index.ts

import { defineComponent, h, App } from 'vue'

import {
  svgIcon,
  Props,
  // Options,
  // setOptions,
  // Icon,
  // IconData,
  getPropKeys,
} from '@yzfe/svgicon'

const VueSvgIcon = defineComponent({
  props: {
    data: {
      type: [Object, String],
    },
    color: {
      type: String,
    },
    stopColors: {
      type: String,
    },
    dir: {
      type: String
    },
    fill: {
      type: String
    },
    height: {
      type: [String, Number],
      default: 16
    },
    width: {
      type: [String, Number],
      default: 16
    },
    title: {
      type: String
    },
    scale: {
      type: Number
    },
    original: {
      type: Boolean,
      default: true
    }
  },
  render() {
    const result = svgIcon(this.$props)
    // 兼容微信小程序的rpx
    if (/[0-9]px/g.test(result.style.width as string)) {
      result.style.width = +(result.style.width as string).replace('px', '') * 2 + 'rpx'
    }
    if (/[0-9]px/g.test(result.style.height as string)) {
      result.style.height = +(result.style.height as string).replace('px', '') * 2 + 'rpx'
    }

    const attrs: Record<string, any> = {}

    if (this.$props) {
      const propsKeys = getPropKeys()
      for (const key in this.$props) {
        if ((propsKeys).indexOf(key as keyof Props) < 0) {
          attrs[key] = this.$props[key]

        }
      }
    }
    attrs.viewBox = result.box
    let attrsMap: string[] = []
    for (const key in attrs) {
      attrsMap.push(`${key}='${attrs[key]}'`)
    }

    // 兼容fontsize
    if (attrs.style && attrs.style.fontSize) {
      attrs.style.width = parseFloat(attrs.style.fontSize)
      attrs.style.height = parseFloat(attrs.style.fontSize)
    }
    // const srcData = `<svg viewBox="${result.box}" ${attrsMap.join(' ')} xmlns="http://www.w3.org/2000/svg">${result.path}</svg>`
    // const data = `data:image/svg+xml;base64,${encode(srcData)}`
    // return h('image', {
    //   style: result.style,
    //   class: result.className,
    //   src: data,
    // })
    let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" ${attrsMap.join(' ')}>${result.path}</svg>`
      .replace(/"/g, "'")
      .replace(/<|>/g, (matched) => encodeURI(matched))
      .replace(/#/g, '%23')
      .replace(/"/g, "'")
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')


    const customStyle = {
      ...((attrs.style as Record<string, string>) || {}),
      ...result.style,
      backgroundImage: `url("data:image/svg+xml,${svgStr}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    }
    return h('view', {
      class: result.className,
      style: customStyle
    })
  },
})

const VueSvgIconPlugin = {
  install: (app: App, options: { tagName: string }): void => {
    app.component(options.tagName, VueSvgIcon)
  },
}

export {
  VueSvgIcon,
  VueSvgIconPlugin,
  // setOptions,
  // Props,
  // Options,
  // Icon,
  // IconData,
}