import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from  'sweetalert2'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [createPersistedState()],
  state: {
   
    client :{},
    tokenAdmin : null,
    panier :[],
    errorAdmin : ""
  },
  getters: {
    
    getToken(state){
      return state.token
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

    async deleteAllArticle({commit}){
      commit('deleteAll')
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
    auth : auth
  }
})



