import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"
import Responsable from "../views/backOffice/responsable/responsable.vue"
import AddResponsable from "../views/backOffice/responsable/ajouter.vue"

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