<template>
  <div class="conatiner">
      
      <div class="row  mt-5 mx-5">
          <div class="col-md-8 mb-5">
              <div class="card bg-light w-75 h-100 rounded-3">
                  <div class="card-header">
                      <h3 class="p-2" style="text-align : left">Liste des articles :</h3>
                  </div>
                  <div class="card-body">
                      <div class="article"  v-for="(article,i) in panier" :key="i">
                        <hr class="bg-dark border-1 border-top border-dark">
                        <div class="row justify-content-start">
                            <div class="col-md-3">
                                <img v-if="article.article.image" class="img-thumbnail" :src="require(`../../../../images/${article.article.image}`)" width="60%"/>
                            </div>
                             <div class="col-md-3">
                                <p class="text-center fw-bolder">{{ article.article.nom }}</p>
                            </div>
                            <div class="col-md-2">
                                <h4 class="text-center fw-bolder">{{ article.article.prix }} €</h4>
                            </div>
                             <div class="col-md-2">
                                <p class="form-label">Quantité : </p>
                                <input type="number" class="form-control" :value="article.quanttite">
                            </div>
                            <div class="col-md-2">
                                <button class="badge bg-danger" @click="deleteArticle(article.a._id,article.article)">Supprimer</button>
                                <button class="badge bg-primary">Modifier</button>
                            </div>
                        </div>
                        <hr class="bg-dark border-1 border-top border-dark">
                      </div>
                  </div>

                  <div class="card-footer">
                    <h5 class="text-end text-success fw-bold">Total : {{ getTotal }} € </h5>
                  </div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="card bg-light rounded-3 ">
                <div class="card-body">
                    <p class="fw-bold text-start">Nombre des articles : {{ lengthPanier }}</p>
                    <hr class="bg-dark border-3 border-top border-dark">
                    <h4 class="fw-bolder text-start">Total commande : <span class="text-end">{{ getTotal }} €</span></h4>
                    <router-link  :to="{name : 'commande-front'}" class="btn btn-primary btn-lg mt-3" style="border-radius : 20px">Valider Commande</router-link> <br>
                    <button class="btn btn-outline-danger btn-lg mt-3" style="border-radius : 20px">Supprimer Commande</button>
                </div>
                
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Vue from "vue"
// @ is an alias to /src
export default {
  data () {
    return {
      user :{},
      idClient: ""
    }
  },
 
  name: 'panier-front',
  
  methods:{
    deleteArticle(id,article){
      const idCli = this.idClient
        this.$store.dispatch('deleteArticle',{id,idCli,article})
    },
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
      
    getPnaier(){
      this.$store.dispatch('IniPanier',this.idClient)
    }
  },
  computed :{
      panier(){
           return this.$store.state.panier
        },
      getTotal(){
            return this.$store.getters.getTotal
      },
      lengthPanier(){
            return this.$store.getters.getPanierLength
      },
       
  },
    created() {
        this.getUserDetails();
        this.getPnaier()
    }
  
}
</script>
<style scoped>
    .container{
        background-color: red;
    }
</style>
