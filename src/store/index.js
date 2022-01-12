import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      token: null
    }
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    }
  }
})

export default store