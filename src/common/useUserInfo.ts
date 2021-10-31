import store from '@/store'
import { reLaunch } from '@tarojs/taro'
import { toRef, Ref } from 'vue'

export function useUserInfo(): {
  userInfo: Ref,
  setUserInfo: (any) => void
} {
  const userInfo: Ref = toRef(store.getters, 'getUserInfo')
  const setUserInfo = (userInfo) => {
    store.dispatch('setUserInfo', userInfo)
    setTimeout(() => {
      reLaunch({
        url: '/pages/tabbar/publish/index'
      })
    }, 500);
  }
  return {
    userInfo,
    setUserInfo,
  }
}