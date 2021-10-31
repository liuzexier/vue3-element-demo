import store from '@/store'
import { toRef, Ref } from 'vue'

export function useRole(): {
  role: Ref,
  setRole: (any) => void
} {
  const role: Ref = toRef(store.getters, 'getRole')
  const setRole = (basicUserInfo) => {
    store.dispatch('setRole', basicUserInfo)
  }
  return {
    role,
    setRole,
  }
}