// Fichier main.js comporte tous les packages qu'on an installé pour les utilisés 
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookies from 'vue-cookies';
// import VueCountryCode from "vue-country-code";
import vueCountryRegionSelect from 'vue-country-region-select'
import VueCarousel from 'vue-carousel';
import VueAgile from 'vue-agile'

Vue.use(vueCountryRegionSelect)
// Vue.use(VueCountryCode);


library.add(faHatWizard)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueCarousel);
Vue.use(vueCountryRegionSelect)
Vue.use(VueAgile)
Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(VueCookies)
Vue.config.productionTip = false

const token = Vue.$cookies.get('token')

if(token){
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  Vuex,
  // store : index,
  router,
  store,
  axios,
  render: h => h(App) // L'application est attaché à un seul element DOM avec un identifiant app qui se trouve dans le fichier APP.vue 
}).$mount('#app')


