import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate'
import * as authModule from "@/store/modules/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [createPersistedState()],
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
    },

    getPanierLength(state){
      return state.panier.length
    },

    getTotal(state){
      let total = 0

      state.panier.forEach(item=>{
        total += item.article.prix * item.quantity
      })
      return total
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
    },
    addToCart(state,{article,quantity}){
      let articleInPanier = state.panier.find(item =>{
        return item.article._id === article._id
      })

      if(articleInPanier){
        articleInPanier.quantity += quantity
        return
      }

      state.panier.push({
        article,
        quantity
      })
    },

    deleteArticle(state,ar){
      state.panier = state.panier.filter(item=>{
        return item.article._id != ar._id
      })
     
      // state.panier.filter(item =>{
       
      // })
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

    async addToCart({commit},{article,quantity}){
      commit('addToCart',{article,quantity})
    },

    async deleteArticle({commit},article){
      commit('deleteArticle',article)
    }


  },
  modules: {
    auth : authModule
  }
})



