import store from '@/store'
import { toRef, Ref } from 'vue'

export function useRole(): {
  role: Ref,
  setRole: (any) => void
} {
  const role: Ref = toRef(store.getters, 'getRole')
  const setRole = (role) => {
    store.dispatch('setRole', role)
  }
  return {
    role,
    setRole,
  }
}