<template>
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
                <div class="col-md-2 " > <img class="d-none d-md-flex " src="https://i.imgur.com/R8QhGhk.png" width="100"> </div>
                <div class="col-md-8">
                    <div class="d-flex form-inputs"> <input class="form-control" type="text" placeholder="Search any product..."> <i class="bx bx-search"></i> </div>
                </div>
                <div class="col-md-2">

                    <div class="d-flex d-none d-md-flex flex-row align-items-center">    
                             <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle shop-bag" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class='bx bxs-shopping-bag' style="width : 20px"></i>
                                </button>
                                <div class="dropdown-menu p-4" aria-labelledby="dropdownMenuButton1" style="min-width : 390px ; right :0px; left : auto">
                                    <div v-if="lengthPanier>0">
                                         <div v-for="item in panier" :key="item._id" >
                                        <div class="px-2 d-flex justify-content-between">
                                            <div>
                                                <img style="width : 50px" class="mx-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN9chxXkn662lNgJFcmva2sLk4OaYY-zQ5EQLi5h87YXvOHEE5hb7v2UN5FdX9nMcMYVg&usqp=CAU" alt="">
                                            </div>
                                            <div class="text-left">
                                                <strong>{{item.article.nom}}</strong>
                                                <br /> {{item.quantity}} x {{item.article.prix}} €
                                            </div>
                                            <div>
                                                <a class=" btn btn-danger" @click.prevent="deleteArticle(item.article)">Supprimer</a>
                                            </div>
                                         </div>
                                   </div>
                                    </div>
                                  
                                 
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <span>Total : {{getTotal}} €</span>
                                        
                                    </div>
                                </div>
                                <!-- <ul class="dropdown-menu" >
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul> -->
                            </div>
                        <div class="d-flex flex-column ms-2"> <span class="qty">{{lengthPanier}} Product</span> <span class="fw-bold">{{getTotal}} €</span> </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <router-link to="/"  class="navbar-brand">Acceuil</router-link>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span> 
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
                <!-- <a href="#" class="nav-item nav-link active">Home</a>
                <a href="#" class="nav-item nav-link">Profile</a> -->
                <div class="nav-item dropdown" v-for="(categorie,i) in categories" :key="i">
                    <a v-if="categorie.produit.length != 0" href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">{{categorie.nom}}</a>
                    <div class="dropdown-menu"  >
                        <div v-for="(produit) in categorie.produit" :key="produit._id" >
                              <router-link replace class="dropdown-item" :to="{name :'produit-front',params : {id : produit._id}}" >{{produit.nom}}</router-link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </nav>
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid"> <a class="navbar-brand d-md-none d-md-flex" href="#">Categories</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="(categorie,i) in categories" :key="i"> <a class="nav-link active" aria-current="page" href="#">{{categorie.nom}}</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">Fashion</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">Furnitures</a> </li>
                    <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Mobiles </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Smart Phones</a></li>
                            <li><a class="dropdown-item" href="#">Feature Phones</a></li>
                            <li><a class="dropdown-item" href="#">Mobile Covers</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav> -->
</header>
</div>
</template>
<style>
.dropdown:hover .dropdown-menu{
        display: block;
    }
    .dropdown-menu{
        margin-top: 0;
    }
</style>
<script>
import axios from 'axios'
export default {
  data () { // data les element de html pour recuperer les valuer des champs
    return {
        token :'',
        check : false,
        categories : [],
        // panier : [],
        // total : '',
        // quantite : 1
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
            this.$cookies.remove('token')
            delete axios.defaults.headers.common['Authorization']
            this.token = ""
            this.check = false
            this.$router.push("/signin");
            
        },

        viewCart(){
            if(this.token == null){
                this.panier = JSON.stringify(localStorage.getItem('panier'))
                this.total = this.panier.reduce((total, article)=>{
                    return total + this.quantite * article.prix
                },0)

            }
        },

        deleteArticle(article){
            
            this.$store.dispatch('deleteArticle',article)
        }
      
    },
    computed : {
        panier(){
           return this.$store.state.panier
        },
        lengthPanier(){
            return this.$store.getters.getPanierLength
        },
        getTotal(){
            return this.$store.getters.getTotal
        }
    },
    created(){
        const login =  localStorage.getItem('user')
        
        if(login){
          this.check = true
        }
        else{
          this.check = false
        }
        // Récupérer les categories
        axios.get('http://localhost:3500/responsable/categorie/voir').then((res)=>{
        
          this.categories = res.data
        }).catch((er)=>console.log(er))

        //récuperer les données du client 

        
    },
    // mounted(){
    //     const login =  localStorage.getItem('user')
        
    //     if(login){
    //       this.check = true
    //     }
    //     else{
    //       this.check = false
    //     }
    // }

}
</script>

<style scoped>
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