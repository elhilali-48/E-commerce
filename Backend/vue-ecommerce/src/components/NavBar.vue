<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light py-4">
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
                   <router-link v-if="!check"  to="/signIn" class="mx-2">Se Connecter</router-link>
                   <router-link v-if='!check' to="/register">S'inscrire</router-link>
                   <button v-if="check" class="btn btn-outline-success "  @click="logout">Logout</button>
                </div>

        </div>
    </nav> -->
<div>
  <header class="section-header">
    <nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
        <div class="container-fluid">
            <ul class="navbar-nav d-none d-md-flex mr-auto">
                <li class="nav-item"><a class="nav-link" href="#" data-abc="true">Contact@miage.fr</a></li>
            </ul>
            <ul class="navbar-nav d-flex align-items-center">
           
                 <router-link v-if="!check"  to="/signIn" class="mx-2 text-primary nav-link">Se Connecter</router-link> 
                 <router-link v-if="!check" to="/register" class="mx-2 text-primary nav-link">Créer mon compte</router-link> 
                 <button v-if="check" class="btn btn-outline-success "  @click="logout">Logout</button>
            </ul> <!-- list-inline // -->
        </div> <!-- navbar-collapse .// -->
        <!-- container // -->
    </nav> <!-- header-top-light.// -->
    <section class="header-main border-bottom bg-white">
        <div class="container-fluid">
            <div class="row p-2 pt-3 pb-3 d-flex align-items-center">
                <div class="col-md-2"> <img class="d-none d-md-flex" src="https://i.imgur.com/R8QhGhk.png" width="100"> </div>
                <div class="col-md-8">
                    <div class="d-flex form-inputs"> <input class="form-control" type="text" placeholder="Search any product..."> <i class="bx bx-search"></i> </div>
                </div>
                <div class="col-md-2">
                    <div class="d-flex d-none d-md-flex flex-row align-items-center"> <span class="shop-bag"><i class='bx bxs-shopping-bag'></i></span>
                        <div class="d-flex flex-column ms-2"> <span class="qty">1 Product</span> <span class="fw-bold">$27.90</span> </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid"> <a class="navbar-brand d-md-none d-md-flex" href="#">Categories</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="(categorie,i) in categories" :key="i"> <a class="nav-link active" aria-current="page" href="#">{{categorie.nom}}</a> </li>
                    <!-- <li class="nav-item"> <a class="nav-link" href="#">Fashion</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">Furnitures</a> </li>
                    <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Mobiles </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Smart Phones</a></li>
                            <li><a class="dropdown-item" href="#">Feature Phones</a></li>
                            <li><a class="dropdown-item" href="#">Mobile Covers</a></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</header>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () { // data les element de html pour recuperer les valuer des champs
    return {
        token :'',
        check : false,
        categories : []
    }
  },
    name: "NavBar",
    methods: {
        getUserDetails() {
      // get token from localstorage
        this.token =  this.$store.state.accessToken
     } ,
        logout(){
            localStorage.removeItem("user");
            this.token = ""
            this.check = false
            this.$router.push("/signin");
        },
    },
    created(){
      const login =  localStorage.getItem('user')
        
        if(login){
          this.check = true
        }
        else{
          this.check = false
        }
        axios.get('http://localhost:3500/responsable/categorie/voir').then((res)=>{
          this.categories = res.data
        }).catch((er)=>console.log(er))
    },
    mounted(){
        const login =  localStorage.getItem('user')
        
        if(login){
          this.check = true
        }
        else{
          this.check = false
        }
    }

}
</script>

<style>
  body {
    background-color: purple
}

.form-inputs {
    position: relative
}

.form-inputs .form-control {
    height: 45px
}

.form-inputs .form-control:focus {
    box-shadow: none;
    border: 1px solid #000
}

.form-inputs i {
    position: absolute;
    right: 10px;
    top: 15px
}

.shop-bag {
    background-color: #000;
    color: #fff;
    height: 50px;
    width: 50px;
    font-size: 25px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center
}

.qty {
    font-size: 12px
}
</style>