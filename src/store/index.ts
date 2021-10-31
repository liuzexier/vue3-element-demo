import { reLaunch } from '@tarojs/taro'
import { createStore } from 'vuex'
const SET_ROLE = 'SET_ROLE'

const state = {
  role: 'teacher'
}

const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
}

const actions = {
  setRole({ commit }, payload) {
    commit(SET_ROLE, payload)
    setTimeout(() => {
      reLaunch({
        url: '/pages/tabbar/publish/index'
      })
    }, 500);
  }
}

const getters = {
  getRole(state) {
    return state.role
  },
}

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})

export default store
