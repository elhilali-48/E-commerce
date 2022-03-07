<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter un produit
          </div>
           <form @submit.prevent="submitForm">
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >Nom</label>
                    <input type="text" id="nom" class="form-control" v-model="nom" />
                    <span class="text-danger"  v-if="!$v.nom.required && $v.nom.$dirty" > Nom est obligatoire</span>
                </div>
                </div>
            </div>
             <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom"  >Categorie </label> 
                    <!-- c'est commentaire a supprimer -->

                    <select class="form-select" v-model="categorie">
                        <option disabled value="">Selectionner une categorie</option>
                        <option v-for="categorie in categories" :key="categorie._id" :value="categorie._id">{{categorie.nom}}</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.nom.required && $v.nom.$dirty" >Vous devez choisir une categorie, sinon <router-link :to="{name :'ajouter-categorie'}"> Ajouter une categorie </router-link> </span>
                </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-lg btn-success">Ajouter</button>
        
            </form>
          </div>
          
      </div>
     
  </div>
</template>

<script>
import axios from "axios"
import {required} from "vuelidate/lib/validators"
export default {
    name: "ajouter-produit",
    data(){
        return{
            nom : "",
            categories : [],
            categorie : ""
        }
    },
    validations :{
        nom : {
            required
        },
        categorie : {
            required
        }
    },

    methods :{
        submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.ajouterproduit()
            }
        },
        ajouterproduit(){
            axios.post('http://localhost:3500/responsable/produit/ajouter',{
                nom: this.nom,
                categorie : this.categorie
               
            }).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Produit Ajouté!',
                    'success'
                )
                this.$router.push({name:"produit-page"})
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
            axios.get('http://localhost:3500/responsable/categorie/voir').then((res)=>{
                this.categories = res.data
            })
    }

}
</script>

<style>

</style>