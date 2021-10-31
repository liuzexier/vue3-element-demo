interface IConfig {
  [x: string]: any
  header?: string
  url?: string
}
interface IExtraConfig {
  [x: string]: any
  jumpLogin?: boolean
  showLoading?: boolean
  loadingText?: string
  loadingMask?: boolean
}
type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface Result {
  result?: string
  code: 200 | 601 | number
  message: string
  data: any
}

interface SuccessCallbackResult extends request.SuccessCallbackResult<any> {
  defaultState: string
}

import { getStorageSync, navigateTo, showToast, request, showLoading } from "@tarojs/taro";
import { logColor } from "@/utils";

export const getJson = (url, params = "", config = {}, extraConfig?: IExtraConfig) => {
  return sendRequest(url, "GET", params, config, extraConfig);
};

export const postJson = (url, params = {}, config = {}, extraConfig?: IExtraConfig) => {
  return sendRequest(url, "POST", params, config, extraConfig);
};

export const putJson = (url, params = {}, config = {}, extraConfig?: IExtraConfig) => {
  return sendRequest(url, "PUT", params, config, extraConfig);
};

export const deleteJson = (url, params = {}, config = {}, extraConfig?: IExtraConfig) => {
  return sendRequest(url, "DELETE", params, config, extraConfig);
};

export let DOMAINNAME = "__HOSTNAME__";


function getAxData(url: string, type: MethodType, params: string | any = "", config: IConfig) {
  if (url.indexOf("http") !== 0 && url.indexOf("//") !== 0) {
    url = DOMAINNAME + url;
  }
  let header = config.header || {};
  delete config.header;
  config = Object.assign(
    {
      url,
      data: params ? params : null,
      method: type,
      header: Object.assign(
        {
          Origin: DOMAINNAME,
          Cookie: getStorageSync("bearer"),
        },
        header
      ),
      credentials: "include",
      mode: "cors"
    },
    config
  )
  return config
}

function sendRequest(url: string, type: MethodType, params: string | any = "", config: IConfig = {}, extraConfig: IExtraConfig = {}) {
  if (extraConfig.showLoading) {
    showLoading({
      title: extraConfig.loadingText || '加载中...',
      mask: extraConfig.loadingMask ?? true
    })
  }
  const requestOptions = getAxData(url, type, params, config)

  const p: Promise<SuccessCallbackResult> = new Promise((resolve, reject) => {
    request(requestOptions as request.Option<any>).then(
      (res: SuccessCallbackResult) => {
        logColor({ title: 'request', content: url })
        params && console.log('params: ', params)
        if (res.statusCode.toString().startsWith('2')) {
          console.log(`%c statusCode: ${res.statusCode}`, 'color:#42c02e;',)
        } else {
          console.log(`%c statusCode: ${res.statusCode}`, 'color:red;')
        }
        res.data && console.log(' res: ', res.data)
        if ([200, 201].includes(res.statusCode)) {
          // if (res.data.code == 200 || res.data.code == 0 || res.data.code == 1 || res.data.code == 2 || res.data.code == 3) {
          if ([200, 0, 1, 2, 3].includes(res.statusCode)) {
            resolve(res.data)
          } else if (res.data.code == 601) {
            showToast({
              title: res.data?.message || '网络繁忙，请刷新重新进入小程序试试',
              icon: 'none'
            })
            reject(res)
          } else {
            if (!extraConfig.hideToast) {
              showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
            reject(res)
          }
        } else if (res.statusCode == 401) {
          if (extraConfig.jumpLogin) {
            navigateTo({
              url: "/pages/login-page/index"
            });
          }
          res.defaultState = "no-login";
          reject(res);
        } else {
          if ([703, 609].includes(res.statusCode)) {
            res.defaultState = "have-delete";
          } else {
            res.defaultState = "server-error";
          }
          reject(res);
        }
      }
    ).catch(error => {
      logColor({ title: 'request', content: url, backgroundColor: '#f00' })
      console.log(params)
      showToast({
        title: '网络异常，请检查网络再试',
        icon: 'none'
      })
      error.defaultState = "no-network";
      reject(error);
    })
  })

  return p
}
