import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import * as authModule from "@/store/modules/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken  : localStorage.getItem('user') || '',
    client :{},
    isLogged : '',
    tokenAdmin : null,
    panier : []
  },
  getters: {
    idAuthenticated :state => !!state.accessToken,
    authStatus : state => state.isLogged,
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
      state.isLogged = "success"
    },

    setTokenAdmin(state,tokenAdmin){
      state.tokenAdmin = tokenAdmin
    },
    setClientData(state,data){
      state.client = data
    },
    setError(state){
      state.accessToken = "",
      state.isLogged = "Error"
    }
    
  },
  actions: {
    async login({commit},form){
      await axios.post('http://localhost:3500/client/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
        localStorage.setItem('user',res.data.token) // enregistrer Token dans LocalStorage
        Vue.$cookies.set('token',res.data.token,60 * 60 * 12)
        axios.defaults.headers.common['Authorization'] = res.data.token
        // localStorage.setItem('client',JSON.stringify(res.data.client))
        commit('setToken',res.data.token)
        // commit('setClientData',res.data.client)
        router.push('/')
        // dispatch('fetchToken')
      }).catch(()=>{
        commit('setError',null)
        localStorage.removeItem('user')
        Vue.$cookies.remove('token')
      })
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
        sessionStorage.setItem('tokenAdmin', res.data.token)
         document.cookie = res.data.token
        this.commit('setTokenAdmin',res.data.token)
        router.push('/admin')
        dispatch('fetchTokenAdmin')
      }).catch((err)=>{
        alert(err)

        this.commit('setTokenAdmin',null)
      })
    },
    async fetchTokenn({commit}){
      await commit('setTokenAdmin', sessionStorage.getItem('tokenAdmin'))
    },

    async addCart(article){
      axios.post(`http://localhost:3500/achat/panier/ajouter/${article}`).then((res)=>{
        console.log(res)

      })
    }


  },
  modules: {
    auth : authModule
  }
})



