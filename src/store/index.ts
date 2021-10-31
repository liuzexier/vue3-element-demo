import { createStore } from 'vuex'
const SET_ROLE = 'SET_ROLE'
const SET_USERINFO = 'SET_USERINFO'

const state = {
  role: '',
  userInfo: {}
}

const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
}

const actions = {
  setRole({ commit }, payload) {
    // commit(SET_ROLE, payload)
    // setTimeout(() => {
    //   reLaunch({
    //     url: '/pages/tabbar/publish/index'
    //   })
    // }, 500);
  },
  setUserInfo({ commit }, payload) {
    commit(SET_USERINFO, payload)
  }
}

const getters = {
  getRole(state) {
    if (state.userInfo?.type == 1) {
      return 'student'
    } else if (state.userInfo?.type == 2) {
      return 'teacher'
    } else {
      return ''
    }
  },
  getUserInfo(state) {
    return state.userInfo
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
