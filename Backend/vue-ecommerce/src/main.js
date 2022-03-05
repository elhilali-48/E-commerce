import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import VueSweetalert2 from "vue-sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';

// import index from './store/index'


Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  // store : index,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
