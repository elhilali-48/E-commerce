import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"

import Responsable from "../views/backOffice/responsable/responsable.vue"
import AddResponsable from "../views/backOffice/responsable/ajouter.vue"
import UpdateResponsable from "../views/backOffice/responsable/modifier.vue"
import showResponsable from "../views/backOffice/responsable/afficher.vue"

import Categorie from "../views/backOffice/categorie/categorie.vue"
import AddCategorie from "../views/backOffice/categorie/ajouter.vue"
import UpdateCategorie from "../views/backOffice/categorie/modifier.vue"
import showCategorie from "../views/backOffice/categorie/afficher.vue"

import Produit from "../views/backOffice/produit/produit.vue"
import AddProduit from "../views/backOffice/produit/ajouter.vue"
import UpdateProduit from "../views/backOffice/produit/modifier.vue"
import showProduit from "../views/backOffice/produit/afficher.vue"

const routes = [
    {
        path:'/admin/',
        name : "HomePage",
        component : Home,
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
                path : "modifier/responsable/:id",
                name :"modifier-responsable",
                component : UpdateResponsable
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
        ]
    
    },
    {
        path : "/admin/login",
        name : "LoginPage",
        component : Login,
    },

]

export default routes