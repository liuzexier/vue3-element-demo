import { showToast } from "@tarojs/taro"

export function validate(obj: any) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!obj[key]) {
        showToast({ title: '请补全信息', icon: 'none' })
        return false
      }
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        showToast({ title: '请补全信息', icon: 'none' })
        return false
      }
    }
  }
  return true
}