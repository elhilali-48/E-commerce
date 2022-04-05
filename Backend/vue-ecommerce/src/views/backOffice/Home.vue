<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Best Tech</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li v-if="admin.id.role" >
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline"><router-link to="/admin/client">Client</router-link></span> </a>
                    </li>
                    <li v-if="admin.id.role" >
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 text-left">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">
                                <router-link to="/admin/responsable">Responsable</router-link>
                              </span> </a>
                        <!-- <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                            </li>
                        </ul> -->
                    </li>
               
                    <li v-if="!admin.id.role">
                        <router-link :to="{name :'produit-page'}" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Produit</span></router-link>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
                            </li>   
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
                            </li>
                        </ul>
                    </li>
                    <li v-if="!admin.id.role">
                        <router-link :to="{name : 'categorie-page'}" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Categorie</span> </router-link>
                           
                    </li>
                    <li v-if="!admin.id.role">
                        <router-link :to="{name :'article-page'}" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Article</span> </router-link>
                    </li >
                    <li v-if="!admin.id.role">
                        <router-link :to="{name :'livraison-page'}" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Livraison</span> </router-link>
                    </li>
                </ul>
                <hr >
                <div class="dropdown mb-5">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle-split" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">{{admin.id.nom}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        
                        <!-- <router-link :to="{name : 'gerer-profile'}"><a class="dropdown-item" href="#">Profile</a></router-link> -->
                        
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a @click="logout" class="dropdown-item" href="#">Se déconnecter</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col py-3 h-100">
            Welecome
            <router-view></router-view>
        </div>
        
    </div>
</div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
  export default {
    name: 'HomeBack',
   
    data() {
      return {
        admin: {}
      }
    },
   
    methods:{
      getDetails(){
        let tokenAdmin  = sessionStorage.getItem('tokenAdmin')
        // décoder le token 

        try {
          let decoded = VueJwtDecode.decode(tokenAdmin)
          this.admin = decoded
        } catch (error) {
          console.log(error)
        }
      },
      logout(){
          sessionStorage.removeItem('tokenAdmin')
          this.$router.push({name: "LoginPage"})
      }
    }, 
    created() {
      this.getDetails()
      
    },
    
  }
</script>

<style>
  /* Google Font Link */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  @import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
  *{
  
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

</style>