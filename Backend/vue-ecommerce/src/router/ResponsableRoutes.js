import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"
import Responsable from "../views/backOffice/responsable/responsable.vue"
import AddResponsable from "../views/backOffice/responsable/ajouter.vue"
import UpdateResponsable from "../views/backOffice/responsable/modifier.vue"
import showResponsable from "../views/backOffice/responsable/afficher.vue"

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
            }
        ]
    
    },
    {
        path : "/admin/login",
        name : "LoginPage",
        component : Login,
    },

]

export default routes