//Ce fichier compote tous les routes d'authentification 

import SignIn from '../views/Authentification/SignIn.vue'
import RegisterIn from '../views/Authentification/RegisterIn.vue'
import Vue from "vue"


const routes = [
  {
    path : '/signIn', // ici on spécifie on donne le path du route 
    name : 'signin', // on donne aussi un nom qui va nous permettre d'appeler cette route aprés
    component : SignIn, // chaque route est lié avec un component ou une view 
    
    // la fonction beforEnter permet de vérifier quelque chose avant d'entrer à une route,
    //  pour nous on vérifier si le client est connecté, s'il est connecté on le rederige directement à la page d'accueil.
    beforeEnter: (to, from, next) => { 
       const isloggin = Vue.$cookies.get('token')
       if(isloggin != null){
         next('/')
       }
       else{
         next()
       }
    }
  },
  {
    path : '/register',
    name : 'register',
    component : RegisterIn
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export default routes