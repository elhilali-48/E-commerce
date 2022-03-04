<template>
  <div class="home">
    <NavBar class="mb-5"/>
   <h1> Welcome {{user.id.nom}} </h1>
 
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";

export default {
  data () {
    return {
      user :{}
    }
  },
 
  name: 'HomeView',
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
