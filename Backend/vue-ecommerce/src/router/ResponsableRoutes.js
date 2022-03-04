import Login from "../views/backOffice/login.vue"
import Home from "../views/backOffice/Home.vue"

const routes = [
    {
        path:'/admin/',
        name : "HomePage",
        component : Home,
    
    },
    {
        path : "/admin/login",
        name : "LoginPage",
        component : Login,
    },

]

export default routes