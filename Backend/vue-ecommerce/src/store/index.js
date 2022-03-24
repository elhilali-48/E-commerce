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
    panier : [],
    errorAdmin : ""
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
    addToCart(state,{article,quantiteselectionne}){
      console.log("article")
      console.log(quantiteselectionne)
      let articleInPanier = state.panier.find(item =>{
        return item.article._id === article._id
      })

      if(articleInPanier){
        articleInPanier.quantiteselectionne += quantiteselectionne
        return
      }

      state.panier.push({
        article,
        quantiteselectionne
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
    async login({dispatch,commit},form){
      await axios.post('http://localhost:3500/client/login',{
        email : form.email,
        password : form.password
      }).then((res)=>{
         console.log(res.data)
        localStorage.setItem('user',res.data.token) // enregistrer Token dans LocalStorage
        Vue.$cookies.set('token',res.data.token,60 * 60 * 12)
        axios.defaults.headers.common['Authorization'] = res.data.token
        // localStorage.setItem('client',JSON.stringify(res.data.client))
        commit('setToken',res.data.token)
        // commit('setClientData',res.data.client)
        dispatch('getClient',res.data.client._id)
        router.push('/')
        // dispatch('fetchToken')
      }).catch((err)=>{
        console.log(err.response.data.error)
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
        
         sessionStorage.setItem('tokenAdmin', res.data.token)
         
        this.commit('setTokenAdmin',res.data.token)
        router.push('/admin')
        dispatch('fetchTokenAdmin')
        
      }).catch(()=>{
        this.state.errorAdmin = "Il y a un erreur soit dans l'email ou le mot de passe "

        this.commit('setTokenAdmin',null)
      })
    },
    async fetchTokenn({commit}){
      await commit('setTokenAdmin', sessionStorage.getItem('tokenAdmin'))
    },

    async addToCart({commit},{id,idcli,quantiteselectionne,article}){
     
      axios.post('http://localhost:3500/achat/panier/ajouter/',{
        produitselectionner : id ,
        idcli : idcli,
        quantiteselectionne : quantiteselectionne})
        .then(()=>{
          console.log(quantiteselectionne);
          commit('addToCart',{article,quantiteselectionne})
        })
     
    },

    async deleteArticle({commit},article){
      commit('deleteArticle',article)
    },

    async getClient({commit},id){
      
      axios.get(`http://localhost:3500/client/gestion/afficher/${id}`).then((res)=>{
        console.log(res)
      })
      commit('getchToken')
    }


  },
  modules: {
    auth : authModule
  }
})



