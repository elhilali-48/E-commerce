<template>
  <div class="conatiner">
      <div class="row  mt-5 mx-5">
          <div class="col-md-8">
              <div class="card bg-light w-75 h-100 rounded-3">
                  <div class="card-header">
                      <h3 class="p-2" style="text-align : left">Liste des articles :</h3>
                  </div>
                  <div class="card-body">
                      <div class="article">
                        <hr class="bg-dark border-1 border-top border-dark">
                        <div class="row justify-content-start">
                            <div class="col-md-3">
                                <img class="img-thumbnail" src="https://images.prismic.io/digitalocean/0b619d51-a723-4748-997f-39ed5697a540_intro-to-cloud.jpg?auto=compress,format" width="60%"/>
                            </div>
                             <div class="col-md-3">
                                <p class="text-center fw-bolder">Article IPHONE 9:</p>
                            </div>
                            <div class="col-md-2">
                                <h4 class="text-center fw-bolder">132.4 €</h4>
                            </div>
                             <div class="col-md-2">
                                <p class="text-center fw-bold">Quantité : 3</p>
                            </div>
                            <div class="col-md-2">
                                <button class="badge bg-danger">Supprimer</button>
                                <button class="badge bg-primary">Modifier</button>
                                
                            </div>
                        </div>
                        <hr class="bg-dark border-1 border-top border-dark">
                      </div>
                  </div>
                  
              </div>
          </div>
          <div class="col-md-4">
              <div class="card bg-light rounded-3 ">
                <div class="card-body">
                    <p class="fw-bold text-start">Nombre des articles : 2</p>
                    <hr class="bg-dark border-3 border-top border-dark">
                    <h4 class="fw-bolder text-start">Total commande : <span class="text-end">130 €</span></h4>
                    <button class="btn btn-primary btn-lg mt-3" style="border-radius : 20px">Valider Commande</button> <br>
                    <button class="btn btn-outline-danger btn-lg mt-3" style="border-radius : 20px">Supprimer Commande</button>
                </div>
                
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";
import Vue from 'vue'
import axios from 'axios'
export default {
  data () {
    return {
      user :{}
    }
  },
 
  name: 'panier-front',
  
  methods:{
     getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      if(token != null){
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
     getPanier(){
       const id = this.user.id._id
         axios.post('http://localhost:3500/achat/panier/voirarticle',{idCli : id}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
          console.log(err.message)
        })
      }
  },
  created(){
   
    this.getUserDetails();
       //récuperer le panier du client 
    this.getPanier()
       
  },
  
}
</script>
<style scoped>
    .container{
        background-color: red;
    }
</style>
