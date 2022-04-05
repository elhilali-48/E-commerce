<template>
  <div class="conatiner" id="commande">
      <div class="row d-flex justify-content-around mt-5 mx-3">
          <div class="col-md-6">
              <div class="card bg-light rounded-3 py-3 px-4">
                  <h4 class="text-start">Information : </h4>
                    <div class="form">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group my-3">
                                    <label for="nom" class="fw-bold text-end">Nom : </label>
                                    <input type="text" class="form-control" id="nom" disabled :value="user.nom">
                                </div>
                                <div class="form-group my-3">
                                    <label for="email" class="fw-bold">Adresse Email : </label>
                                    <input type="email" class="form-control" id="email" disabled :value="user.email">
                                </div>
                                <div class="form-group my-3">
                                    <label for="adresse" class="fw-bold text-end">Adresse de livraison : </label>
                                    <input type="text" class="form-control" id="adresse" disabled :value="user.adresse">
                                </div>
                                <div class="form-group my-3">
                                    <label for="pays" class="fw-bold text-end">Pays : </label>
                                    <input type="text" class="form-control" id="pays" disabled :value="user.pays">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group my-3">
                                    <label for="prenom" class="fw-bold text-end">Prénom : </label>
                                    <input type="text" class="form-control" id="prenom" disabled value="EL HILALI">
                                </div>
                                <div class="form-group my-3">
                                    <label for="phone" class="fw-bold text-end">Téléphone : </label>
                                    <input type="text" class="form-control" id="phone" disabled :value="user.telephone">
                                </div>
                                <div class="form-group my-3">
                                    <label for="ville" class="fw-bold text-end">Ville : </label>
                                    <input type="text" class="form-control" id="ville" disabled :value="user.ville">
                                </div>
                                 <div class="form-group my-3">
                                    <label for="postale" class="fw-bold text-end">Code Postal : </label>
                                    <input type="number" class="form-control" id="postale" disabled :value="user.codePostale">
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
              <div class="card  rounded-3 py-3 px-4 mt-4">
                <h4 class="text-start">Mode de livraison: </h4>
                <div class="row d-flex justify-content-center bg-light rounded-3 p-3 mb-3" v-for="livraison in livraisons" :key="livraison._id">
                    <div class="col-md-4" >
                        <div class="form-check">
                            <input v-model="livraisonPrix" class="form-check-input" type="radio" name="flexRadioDefault" :value="livraison.prix"  id="defaultCheck1">
                            <input hidden v-model="livraisonDuree" class="" type="text" name="flexRadioDefault" :placeholder="livraison.duree" >
                            <!-- <input v-model="livraisonduree" type="text" :value="livraison.duree" hidden > -->
                            <label class="form-check-label fw-bolder" for="defaultCheck1">
                                {{ livraison.company }}
                            </label>
                        </div>
                    </div>
                    <div class="col-md-4">
                       <p class="text-center fw-bold">{{ livraison.type }}  </p>
                    </div>
                     <div class="col-md-2">
                        <span class="text-success">+{{ livraison.prix }} €</span>
                    </div>
                    <div class="col-md-2">
                        <span class="text-primary">{{ livraison.duree }} jours</span>
                    </div>
                </div>
              </div>
          </div>
          <div class="col-md-5">
              <div class="card bg-light p-4">
                  <h2 class="text-start fw-bolder">Votre Panier : </h2>
                  <div class="row justify-content-between mt-3" v-for="(article,i) in panier" :key="i">
                      <div class="col-md-3">
                          <img width="150px" src="https://formation-informatique-avec-cedric.fr/wp-content/uploads/2018/08/ouverture-transfer-photo-690.jpg" />
                      </div>
                      <div class="col-md-5 text-start ">
                          <h5> {{ article.article.nom }} </h5>
                        <div class="d-flex align-items-center " >
                            <div v-for="etoile in article.article.avis" :key="etoile">
                                <span class="fas fa-star product d-felx justify-content-center" ></span> 
                            </div>
                        </div>
                          <h6 class="text-success fw-bolder mt-2">{{ article.article.prix }} €</h6>
                      </div>
                      <div class="col-md-3">
                          <label class="form-label">Quantité</label>
                          <input type="text" class="form-control text-center" disabled :value="article.quanttite">
                      </div>
                      <hr class="mt-2"/>
                  </div>
                  <div class="row justify-content-between p-3">
                      <div class="col-md-4">
                          <p class="text-start fw-bold">Total : </p>
                          <p class="text-start fw-bold">Livraison : </p>
                          <p class="mt-5 text-start fw-bolder">Montant Total</p>
                          <p class="text-start fw-light text-success">Livraison estimé : {{ getDate }}</p>
                      </div>
                      <div class="col-md-3">
                          <p class="text-success fw-bold text-end">{{ getTotalPanier }} €</p>
                          <p class="text-end fw-bold ">{{ livraisonPrix }} €</p>
                          <h3 class="mt-5 text-end text-success fw-bolder">{{ getTotal }} €</h3>
                      </div>
                      <button class="btn btn-outline-success rounded-3 btn-lg" @click="addCommande">Payer</button>
                  </div>
              </div>
          </div>

      </div>
        
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Vue from "vue"
import axios from 'axios';
// @ is an alias to /src
export default {
  data () {
    return {
      user :{},
      idClient: "",
      livraisons : [],
      livraisonPrix : null,
      livraisonDuree : null
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
          this.user = decoded.id
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
    },
    getLivraison(){
         axios.get('http://localhost:3500/gestion/livraison/afficherAll').then((res)=>{
                console.log(res.data)
                this.livraisons = res.data
        })
    },
    addCommande(){
        if(this.livraisonPrix){
            
                axios.post('http://localhost:3500/achat/commande/ajouter',{
                    idcli : this.idClient,
                    totale : this.getTotal
                }).then(()=>{
                    axios.post('http://localhost:3500/achat/commande/ajouterd',{
                        idcli : this.idClient,
                    }).then(()=>{
                            this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Votre Commande a été bien créer, Il vous reste le paiement',
                            showConfirmButton: false,
                            timer: 2500
                            })
                            this.$router.push({name :'pay-front',params : {id: this.getTotal}})
                    })
                }).catch((err)=>{
                    console.log(err)
                })
        }
        else{
            this.$swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Vous devez choisir un mode de livraison',
                showConfirmButton: false,
                timer: 1500
            })
        }
    
    }
  
  },
  computed :{
      panier(){
           return this.$store.state.panier
        },
      getTotalPanier(){
            return this.$store.getters.getTotal
      },
      lengthPanier(){
            return this.$store.getters.getPanierLength
      },
      getTotal(){
          return this.livraisonPrix + this.getTotalPanier
      },
        getDate(){
         var dt = new Date();
        return dt.getMonth()+1+"/"+dt.getDate()+"/"+dt.getFullYear()
    }
       
  },
    created() {
        this.getUserDetails();
        this.getPnaier();
        this.getLivraison();
    }
  
}
</script>
<style  scoped>
     .product.fa-star {
    font-size: 1rem;
    color: #FFBE01;
    margin-right: 5px;
  }
</style>
