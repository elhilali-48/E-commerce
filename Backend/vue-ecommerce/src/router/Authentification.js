import SignIn from '../views/Authentification/SignIn.vue'
import RegisterIn from '../views/Authentification/RegisterIn.vue'
import Vue from "vue"


const routes = [
  {
    path : '/signIn',
    name : 'signin',
    component : SignIn,
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