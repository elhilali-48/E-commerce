import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoutes from './Authentification'
import Home from "./User"
import AdminRoutes from "./ResponsableRoutes"
Vue.use(VueRouter)


var allRoutes = []

allRoutes = allRoutes.concat(AuthRoutes,Home,AdminRoutes)

const routes = allRoutes

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to,from,next)=>{
  const requiresAuth =  to.matched.some(x=>x.meta.requiresAuth)
  const local  = Vue.$cookies.get('token')
  // const login = store.state.isLogged
  if(requiresAuth && local == null){
    next("/signin")
  }
  else{
    next()
  }
})




export default router
