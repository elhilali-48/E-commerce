import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/Authentification/SignIn.vue'
import RegisterIn from '../views/Authentification/RegisterIn.vue'
import HomePage from "../views/Pages/HomePage.vue"
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path : "/",
    name : "HomePage",
    component : HomePage,
    beforeEnter: (to, from, next) => {
     console.log(store.state)
      if(store.state.token == ""){
        return next({
          path: '/signin'
        })
      }
      next()
    }
  },

  {
    path : '/signIn',
    name : 'signin',
    component : SignIn
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

const router = new VueRouter({
  mode: "history",
  routes
})



export default router
