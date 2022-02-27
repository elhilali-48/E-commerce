<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-4">
        <a class="navbar-brand mx-5" href="#">Best Tech</a>
        <h1>{{token}}</h1>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
           
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <form class="form-inline my-2 my-lg-0 mx-auto">
                <input class="form-control mr-5 " type="search" placeholder="Chercher un produit" aria-label="Search">
                </form>
                <div>
                   <router-link v-if="token == ''"  to="/signIn" class="mx-2">Se Connecter</router-link>
                   <router-link v-if='token == ""' to="/register">S'inscrire</router-link>
                   <button v-if="token != ''" class="btn btn-outline-success "  @click="logout">Logout</button>
                </div>

        </div>
    </nav>
</template>

<script>

export default {
  data () {
    return {
        token :''
    }
  },
    name: "NavBar",
    methods: {
        getUserDetails() {
      // get token from localstorage
        this.token =  this.$store.state.token
     } ,
        logout(){
            localStorage.removeItem("user");
            this.token = ""
            this.$router.push("/signin");
        },
    },
    mounted(){
        this.getUserDetails()
    }

}
</script>

<style>

</style>