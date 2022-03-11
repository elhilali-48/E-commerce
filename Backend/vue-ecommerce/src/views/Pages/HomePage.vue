<template>
  <div class="home">
    
   
  <nav-bar></nav-bar>
  <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import NavBar from "../../components/NavBar.vue"
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
      let token = localStorage.getItem("user");
      
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
  created(){
   
    this.getUserDetails();
  },
  
}
</script>
<style>

</style>
