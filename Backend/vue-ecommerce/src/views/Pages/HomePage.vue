<template>
  <div class="home">
    
   <!-- <h1>{{user.id._id}}</h1> -->
  <nav-bar></nav-bar>
  
  <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import NavBar from "../../components/NavBar.vue"
import Vue from 'vue'
import axios from 'axios'
export default {
  components: { NavBar },
  data () {
    return {
      user :{}
    }
  },
 
  name: 'HomeView',
  component : {
    NavBar
  },
  methods:{
     getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      if(token != null){
          try {
        //decode token here and attach to the user object
        let decoded = VueJwtDecode.decode(token);
        
        this.user = decoded;    
        } catch (error) {
          // return error in production env
          console.log(error, 'error from decoding token')
        }
      }  
      },  
     getPanier(){
       const id = this.user.id._id
         axios.post('http://localhost:3500/achat/panier/voirarticle',{idCli : id}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
          console.log(err.message)
        })
      }
  },
  created(){
   
    this.getUserDetails();
       //récuperer le panier du client 
    this.getPanier()
       
  },
  
}
</script>
<style>

</style>
