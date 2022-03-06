import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"
import Responsable from "../views/backOffice/responsable/responsable.vue"
import AddResponsable from "../views/backOffice/responsable/ajouter.vue"
import Client from "../views/backOffice/responsable/client.vue"
import AddClient from "../views/backOffice/responsable/ajouterClient.vue"

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
                path: "client",
                name: "client-page",
                component : Client,
            },
            {
                path : "ajouter/client",
                name : "ajouter-client",
                component : AddClient,
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