import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token  : "I am token"
  },
  getters: {
  },
  mutations: {
    setToken (token){
      this.state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})



