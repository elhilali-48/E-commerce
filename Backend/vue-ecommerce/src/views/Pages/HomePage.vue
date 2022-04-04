<template>
  <div class="home">
    <nav-bar></nav-bar>
      
    <router-view :key="$route.fullPath"></router-view>
    <!-- <agile :initial-slide="3">
      <img class="slide" src="https://images.pexels.com/photos/5861324/pexels-photo-5861324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      <img class="slide" src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      <img class="slide" src="https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      <img class="slide" src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
      <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
    </agile> -->
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import NavBar from "../../components/NavBar.vue";
import Vue from "vue";
import { VueAgile } from 'vue-agile'


// import axios from 'axios'
export default {
  components: { NavBar },
  data() {
    return {
      user: {},
     
    };
  },

  name: "HomeView",
  component: {
    NavBar,
    agile: VueAgile
   
  },
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
  created() {
    this.getUserDetails();
    //récuperer le panier du client

  },
};
</script>
<style>
  .agile__nav-button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  height: 100%;
  position: absolute;
  top: 0;
  transition-duration: 0.3s;
  width: 80px;
}
.agile__nav-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
.agile__nav-button--prev {
  left: 0;
}
.agile__nav-button--next {
  right: 0;
}
.agile__dots {
  bottom: 10px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button, .agile__dot:hover button {
  background-color: #fff;
}

.slide {
  display: block;
  height: 500px;
  -o-object-fit: fill;
     object-fit: fill;
  width: 50%;
}
</style>
