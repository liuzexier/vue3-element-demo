import * as Taro from '@tarojs/taro'

export function uploadFile(filePath: string) {
  return Taro.uploadFile({
    // TODO: 上传接口
    url: 'https://example.weixin.qq.com/upload',
    filePath,
    name: 'file',
  })
}