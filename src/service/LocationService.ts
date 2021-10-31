import { getJson } from '@/utils'

export function getAllLocation() {
  return getJson('https://xiaoheapi.xiangyujiankang.com/community/mall/district')
  // return Promise.reject()
}