import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token  : "",
    client :{},
    isLogged : false
  },
  getters: {
    getToken(state){
      return state.token
    },
    getStatus(state){
      return state.isLogged
    }
  },
  mutations: {
    setToken (state,val){
      state.token = val
    },
    setClient(state){
      state.isLogged = true
    }
    
  },
  actions: {
    async login({dispatch},form){
      await axios.post('http://localhost:3500/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
        console.log(res.data.token)
        localStorage.setItem('user',res.data.token)
        dispatch('loginSuccess')
        dispatch('fetchToken', res.data.token)
      })
    },
    async loginSuccess({commit}){
      commit('setClient') 
      router.push('/')
    },
    async fetchToken({commit},token){
      await commit('setToken',token)
    },

    async loginAdmin({dispatch}, form){
     
      await axios.post('http://localhost:3500/admin/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
        console.log(res)
        dispatch('fetchUser')
      })
    }

  },
  modules: {
  }
})



