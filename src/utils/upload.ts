import { APP_CLIENT_ID, isTestEnv } from '@/config'
import Taro, { getStorageSync } from '@tarojs/taro'
import { DOMAINNAME } from './requestUtil'
import sg from "@/lib/dls-axios/keygen-calc-group/signature";

/**
 * 上传文件 --图片
 */
export function uploadFile(data) {
  const url = DOMAINNAME + '/api/common/future/upload/image'
  return Taro.uploadFile({
    url,
    filePath: data,
    name: 'userfile',
    header: {
      ax: sg({
        url,
        method: 'post',
        data: ''
      }),
      Cookie: `bearer=${isTestEnv ? getStorageSync("testbearer") : getStorageSync("bearer")}`,
      'App-Client-Id': APP_CLIENT_ID
    }
  })
}

/**
 * 上传文件-视频
 */
export function uploadFileVideo(data) {
  const url = DOMAINNAME + '/api/common/future/upload/video'
  return Taro.uploadFile({
    url,
    filePath: data,
    name: 'userfile',
    header: {
      ax: sg({
        url,
        method: 'post',
        data: ''
      }),
      Cookie: `bearer=${isTestEnv ? getStorageSync("testbearer") : getStorageSync("bearer")}`,
      'App-Client-Id': APP_CLIENT_ID
    }
  })
}