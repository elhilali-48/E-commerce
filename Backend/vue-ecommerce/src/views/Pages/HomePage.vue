<template>
  <div class="home">
  
  <nav-bar></nav-bar>
    
  <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import NavBar from "../../components/NavBar.vue";
import Vue from "vue";
// import { VueAgile } from 'vue-agile'


// import axios from 'axios'
export default {
  components: { NavBar },
  data() {
    return {
      user: {},
     
    };
  },

  name: "HomeView",
  
  methods: {
    getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get("token");

      if (token != null) {
        try {
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);

          this.user = decoded;
        } catch (error) {
          // return error in production env
          console.log(error, "error from decoding token");
        }
      }
    },
  },
  created() {
    // created est une fonction qui s'execute une fois le html de la page est affiché 
    this.getUserDetails();
    //récuperer le panier du client

  },
};
</script>
<style>
  
</style>
