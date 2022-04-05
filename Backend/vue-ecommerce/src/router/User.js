import Vue from "vue"
import HomePage from "../views/Pages/HomePage.vue"
import ProduitPage from "../views/Pages/produit.vue"
import ArticlePage from "../views/Pages/ArticlePage.vue"
import PanierPage from "../views/Pages/PanierPage.vue"
import PayPage from '../views/Pages/PayPage.vue'
import SuccessPage from "../views/Pages/SuccessPage.vue"
import CommandePage from "../views/Pages/CommandePage.vue"
// import ValidationCompte from "../views/ValidationCompte.vue"
import EditerProfile from "../views/Pages/EditerProfile.vue"
import EditerPassword from "../views/Pages/EditerPasswrod.vue"
import EditerEmail from "../views/Pages/EditerEmail.vue"
import AccueilPage from "../views/Pages/accueilPage.vue"

import RecupererCompte from "../views/Authentification/Recuperer.vue"
import RecupererMdp from "../views/Authentification/modifiermdp.vue"

  const routes =  [
    {
        path : "/",
        name : "HomePage",
        component : HomePage,
        // meta:{
        //   requiresAuth : true
        // },
        children :[
          {
            path : "/accueil",
            name : 'accueil-page',
            component : AccueilPage,
          
          },
          {
            path : "produit/:id",
            name : 'produit-front',
            component : ProduitPage,
          
          },
          {
            path : "article/:id",
            name : 'article-front',
            component : ArticlePage,
          
          },
          {
            path : "panier",
            name : 'panier-front',
            component : PanierPage,
          
          },
          {
            path : "pay/:id",
            name : 'pay-front',
            component : PayPage,
          
          },
          {
            path : "success",
            name : 'success-front',
            component : SuccessPage,
          
          },
          {
            path : "commande",
            name : 'commande-front',
            component : CommandePage,
          
          },
          {
            path : "profile",
            name : "editer-profile",
            component : EditerProfile,
            beforeEnter: (to, from, next) => {
              const isloggin = Vue.$cookies.get('token')
              if(isloggin != null){
                next()
              }
              else{
                next("/signin")
              }
           },
          },
          {
            path : "password",
            name : "editer-password",
            component : EditerPassword,
            beforeEnter: (to, from, next) => {
              const isloggin = Vue.$cookies.get('token')
              if(isloggin != null){
                next()
              }
              else{
                next("/signin")
              }
           },
          },
          {
            path : "email",
            name : "editer-email",
            component : EditerEmail,
            beforeEnter: (to, from, next) => {
              const isloggin = Vue.$cookies.get('token')
              if(isloggin != null){
                next()
              }
              else{
                next("/signin")
              }
           },
           
          },
          {
            path : "/recuperer",
            name : 'recuperer-compte',
            component : RecupererCompte
           },
           {
            path : "/modifier/:id",
            name : 'Modifier-Password-Client',
            component : RecupererMdp
           }

        ]
   },

   
      
    ]

export default routes