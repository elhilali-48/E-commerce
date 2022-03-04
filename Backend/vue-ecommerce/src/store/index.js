import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken  : null,
    client :{},
    isLogged : false,
    tokenAdmin : null
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
    setToken (state,accessToken){
      state.accessToken = accessToken
    },
    setClient(state){
      state.isLogged = true
    },
    setTokenAdmin(state,tokenAdmin){
      state.tokenAdmin = tokenAdmin
    }
    
  },
  actions: {
    async login({dispatch},form){
      await axios.post('http://localhost:3500/client/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
        console.log(res.data.token)
        localStorage.setItem('user',res.data.token)
        this.commit('setToken',res.data.token)
        dispatch('loginSuccess')
        dispatch('fetchToken')
      }).catch(()=>{
        this.commit('setToken',null)
      })
    },
    async loginSuccess({commit}){
      commit('setClient') 
      router.push('/')
    },
    async fetchToken({commit}){
      await commit('setToken', localStorage.getItem('user'))
    },
    async fetchTokenAdmin({commit}){
      await commit('setToken', localStorage.getItem('tokenAdmin'))
    },

    async loginAdmin({dispatch}, form){
     
      await axios.post('http://localhost:3500/admin/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
        console.log(res)
        localStorage.setItem('tokenAdmin', res.data.token)
        this.commit('setTokenAdmin',res.data.token)
        router.push('/admin')
        dispatch('fetchTokenAdmin')
      }).catch((err)=>{
        alert(err)

        this.commit('setTokenAdmin',null)
      })
    },
    async fetchTokenn({commit}){
      await commit('setTokenAdmin', localStorage.getItem('tokenAdmin'))
    },


  },
  modules: {
  }
})



