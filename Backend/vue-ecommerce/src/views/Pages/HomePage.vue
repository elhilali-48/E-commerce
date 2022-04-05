<template>
  <div class="home">
  
  <nav-bar></nav-bar>
    <carousel autocomplete ease="0.2" perPage="1" class="mt-1">
    <slide>
       <img src="https://media.ldlc.com/encart/p/17086_b.jpg" alt="">
    </slide>
    <slide>
      Slide 2 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
    <slide>
      <img src="https://media.ldlc.com/encart/p/17086_b.jpg" alt="">
    </slide>
     <slide>
      Slide 2 Content
    </slide>
  </carousel>
  <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import NavBar from "../../components/NavBar.vue"
import Vue from 'vue'
import { Carousel, Slide } from 'vue-carousel';

// import axios from 'axios'
export default {
  components: { NavBar },
  data () {
    return {
      user :{}
    }
  },
 
  name: 'HomeView',
  component : {
    NavBar,
    Carousel,
    Slide
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
    //  getPanier(){
    //    const id = this.user.id._id
    //    this.$store.dispatch('IniPanier',id)
    //     //  axios.post('http://localhost:3500/achat/panier/voirarticle',{idCli : id}).then((res)=>{
    //     //     this.$store.dispatch('IniPanier',res.data)
    //     // }).catch((err)=>{
    //     //   console.log(err.message)
    //     // })
    //   }
  },
  created(){
   
    this.getUserDetails();
       //récuperer le panier du client 
   
       
  },
  
}
</script>
<style>

</style>
