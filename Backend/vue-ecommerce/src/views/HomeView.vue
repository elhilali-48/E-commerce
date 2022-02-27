<template>
  <div class="home">
    
   {{user}}
 
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
  methods: {
  },
  name: 'HomeView',
  created:{
     getUserDetails() {
      // get token from localstorage
      let token = localStorage.getItem("user");
      alert(token)
      try {
      //decode token here and attach to the user object
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;    
      } catch (error) {
        // return error in production env
        console.log(error, 'error from decoding token')
      }
  }
}}
</script>
