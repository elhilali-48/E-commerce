<template>
  <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 mt-5">
          <h3 class="text-center fw-bolder text-success">
            Votre paiement a été effectuer avec success
            
          </h3>
        </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      idClient : ""
    }
  },
  methods : {
    getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      if(token != null){
         try {
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);
          // console.log(decoded);
          this.idClient = decoded.id._id
          // this.user = decoded;    
          } catch (error) {
            // return error in production env
            console.log(error, 'error from decoding token')
          }
      }
      
     
    },
  },
  // created() {
  //   this.getUserDetails()
  // },
  beforeCreate (){
    this.getUserDetails()
    this.$store.dispatch('clearPanier')
    //  axios.get(`http://localhost:3500/achat/commande/dernier`,{idcli : this.idClient}).then((res)=>{
    //       console.log(res)
    // })
}}
</script>

<style>

</style>