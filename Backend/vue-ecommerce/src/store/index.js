import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token  : "",
    client :{}
  },
  getters: {
    getToken(state){
      return state.token
    }
  },
  mutations: {
    setToken (state,val){
      state.token = val
    },
    setClient(state, val){
      state.client = val
      
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
        dispatch('fetchClient', res.data.client)
        dispatch('fetchToken', res.data.token)
      })
      
  
    },
    async fetchClient({commit},client){
      commit('setClient',client)
      commit('setToken',)
      router.push('/')
    },
    async fetchToken({commit},token){
      await commit('setToken',token)
    }

  },
  modules: {
  }
})



