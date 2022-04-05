import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"

import Responsable from "../views/backOffice/responsable/responsable.vue"
import AddResponsable from "../views/backOffice/responsable/ajouter.vue"
import Client from "../views/backOffice/responsable/client.vue"
import AddClient from "../views/backOffice/responsable/ajouterClient.vue"
import showClient from "../views/backOffice/responsable/afficherClient.vue"

import UpdateResponsable from "../views/backOffice/responsable/modifier.vue"
import showResponsable from "../views/backOffice/responsable/afficher.vue"
import ModifierProfile from "../views/backOffice/responsable/modifierProfile.vue"

import Categorie from "../views/backOffice/categorie/categorie.vue"
import AddCategorie from "../views/backOffice/categorie/ajouter.vue"
import UpdateCategorie from "../views/backOffice/categorie/modifier.vue"
import showCategorie from "../views/backOffice/categorie/afficher.vue"

import Produit from "../views/backOffice/produit/produit.vue"
import AddProduit from "../views/backOffice/produit/ajouter.vue"
import UpdateProduit from "../views/backOffice/produit/modifier.vue"
import showProduit from "../views/backOffice/produit/afficher.vue"

import Article from "../views/backOffice/article/article.vue"
import AddArticle from "../views/backOffice/article/ajouter.vue"
import UpdateArticle from "../views/backOffice/article/modifier.vue"
import showArticle from "../views/backOffice/article/afficher.vue"

import Livraison from "../views/backOffice/livraison/livraison.vue"
import AddLivraison from "../views/backOffice/livraison/ajouter.vue"
import UpdateLivraison from "../views/backOffice/livraison/modifier.vue"
import showLivraison from "../views/backOffice/livraison/afficher.vue"

import modifierPassword from"../views/Authentification/modifier.vue"

const routes = [
    {
        path:'/admin/',
        name : "HomePage",
        component : Home,
        beforeEnter: (to, from, next) => {
            const isloggin = sessionStorage.getItem('tokenAdmin')
            if(isloggin != null){
              next()
            }
            else{
              next("/admin/login")
            }
         },
        children: [
            {
                path : "responsable",
                name : "responsable-page",
                component : Responsable,
            },
            {
                path : "ajouter/responsable",
                name : "ajouter-responsable",
                component : AddResponsable
            },
            {
                path: "client",
                name: "client-page",
                component : Client,
            },
            {
                path : "ajouter/client",
                name : "ajouter-client",
                component : AddClient,
            },
            {
                path : "afficher/client/:id",
                name : "afficher-client",
                component : showClient,
            },
            {
            
                path : "modifier/responsable/:id",
                name : "modifier-responsable",
                component : UpdateResponsable,
            },
            {
                path : "afficher/responsable/:id",
                name :"afficher-responsable",
                component : showResponsable
            },
            {
                path : "categorie",
                name : 'categorie-page',
                component : Categorie
            },
            {
                path : "ajouter/categorie",
                name : "ajouter-categorie",
                component : AddCategorie
            },
            {
                path : "modifier/categorie/:id",
                name : "modifier-categorie",
                component : UpdateCategorie
            },
            {
                path : "afficher/categorie/:id",
                name :"afficher-categorie",
                component : showCategorie
            },
            // route pour produit 
            {
                path : "produit",
                name : 'produit-page',
                component : Produit
            },
            {
                path : "ajouter/produit",
                name : "ajouter-produit",
                component : AddProduit
            },
            {
                path : "modifier/produit/:id",
                name : "modifier-produit",
                component : UpdateProduit
            },
            {
                path : "afficher/produit/:id",
                name :"afficher-produit",
                component : showProduit
            },
            // route pour Article
            {
                path : "article",
                name : 'article-page',
                component : Article
            },
            {
                path : "ajouter/article",
                name : "ajouter-article",
                component : AddArticle
            },
            {
                path : "modifier/article/:id",
                name : "modifier-article",
                component : UpdateArticle
            },
            {
                path : "afficher/article/:id",
                name :"afficher-article",
                component : showArticle
            },

            //route pour Livraison
            {
                path : "livraison",
                name : 'livraison-page',
                component : Livraison
            },
            {
                path : "ajouter/livraison",
                name : "ajouter-livraison",
                component : AddLivraison
            },
            {
                path : "modifier/livraison/:id",
                name : "modifier-livraison",
                component : UpdateLivraison
            },
            {
                path : "afficher/livraison/:id",
                name :"afficher-livraison",
                component : showLivraison
            },
            {
                path : "profile",
                name : "gerer-profile",
                component : ModifierProfile,
            }
        ]
    
    },
    {
        path : "/admin/login",
        name : "LoginPage",
        component : Login,
        beforeEnter: (to, from, next) => {
            const isloggin = sessionStorage.getItem('tokenAdmin')
            if(isloggin != null){
              next('/admin')
            }
            else{
              next()
            }
         }
    },
    {
        path : "/Modifier/:id",
        name :"ModifierPassword",
        component : modifierPassword
    }
]

export default routes