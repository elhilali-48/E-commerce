import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from  'sweetalert2'
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
    panier :[],
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
        total += (item.article.prix * (1-item.article.promotion/100) )* item.quanttite
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
    IniPanier(state,data){
      state.panier = data
      // console.log(articles)
      
    },
    addToCart(state,{article,quantiteselectionne}){
      
      let articleInPanier = state.panier.find(item =>{
        return item.article._id === article._id
      })

      if(articleInPanier){
        return  articleInPanier.quanttite += quantiteselectionne
      }

      state.panier.push({
        article : article,
        quanttite:quantiteselectionne
      })
    },

    deleteArticle(state,ar){
      
      state.panier = state.panier.filter(item=>{
        return item.article._id != ar._id
      })
     
      // state.panier.filter(item =>{
       
      // })
    },
    clearPanier(state){
      state.panier = []
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
        dispatch('IniPanier',res.data.client._id)
        router.push('/')
        // dispatch('fetchToken')
      }).catch((err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error,
          footer: '<a href="">Mot de passe oublié</a>'
        })
        // alert(err.response.data.error)
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
        
      }).catch((err)=>{
        this.state.errorAdmin = "Il y a un erreur soit dans l'email ou le mot de passe "
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error,
          footer: '<a href="">Mot de passe oublié</a>'
        })
        this.commit('setTokenAdmin',null)
      })
    },
    async fetchTokenn({commit}){
      await commit('setTokenAdmin', sessionStorage.getItem('tokenAdmin'))
    },

    async addToCart({commit},{id,idcli,quantiteselectionne,article}){
      
     await axios.post('http://localhost:3500/achat/panier/ajouter/',{
        produitselectionner : id ,
        idcli : idcli,
        quantiteselectionne : quantiteselectionne})
        .then(()=>{
          commit('addToCart',{article,quantiteselectionne})
        })
     
    },

    async deleteArticle({commit},{id,idCli,article}){
      
      // console.log(id)
      // console.log(idCli)
      //  console.log(article)
      axios.delete(`http://localhost:3500/achat/panier/supprimer/${id}`,{data:{idcli : idCli}}).then(()=>{
        commit('deleteArticle',article)
      })
    },

    async IniPanier({commit},id){
      await axios.post('http://localhost:3500/achat/panier/voirarticle',{idCli : id}).then((res)=>{
           commit('IniPanier',res.data)
        }).catch((err)=>{
          console.log(err.message)
        })
      
    },
    async clearPanier({commit}){
      commit("clearPanier")
    }


  },
  modules: {
    auth : authModule
  }
})



