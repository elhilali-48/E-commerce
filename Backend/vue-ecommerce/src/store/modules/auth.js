import axios from 'axios'
import Vue from 'vue'
import Swal from  'sweetalert2'
import router from '../../router/index'

export default {
    state :{
        accessToken  : localStorage.getItem('user') || '',
        isLogged : '',
    },
    mutations:{
        setToken (state,accessToken){
            state.accessToken = accessToken
            state.isLogged = "success"
          },
    },
    actions:{
        async login({commit},form){
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
              if(!res.data.client.confirmation){
                Swal.fire(
                  'Validation du compte?',
                  "Penez à valider votre compte avant d'acheter nos produits.",
                  'question'
                )
              }
              // commit('setClientData',res.data.client)
            //   dispatch('IniPanier',res.data.client._id)
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
    },
    getters:{
        getStatus(state){
            return state.isLogged
          },
        idAuthenticated :state => !!state.accessToken,
        
        authStatus : state => state.isLogged,
    },
    namespaced: true,
}
