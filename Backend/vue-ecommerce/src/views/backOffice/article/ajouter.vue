<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter un article
          </div>
           <form @submit.prevent="submitForm">
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >Nom</label>
                    <input type="text" id="nom" class="form-control" v-model="article.nom" />
                    <span class="text-danger"  v-if="!$v.article.nom.required && $v.article.nom.$dirty" > Nom est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="quantite" >Quatité</label>
                    <input type="number" min="1" id="quantite" class="form-control" v-model="article.quantite" />
                    <span class="text-danger"  v-if="!$v.article.quantite.required && $v.article.quantite.$dirty" > Quantite est obligatoire</span>
                </div>
                </div>
            </div>
             <div class="row mb-4">
               <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="prix"  >Prix </label>
                    <input type="number" min="1"  id="prix" class="form-control" v-model="article.prix" />
                    <span class="text-danger"  v-if="!$v.article.prix.required && $v.article.prix.$dirty" >Prix est obligatoire </span>
                </div>
                </div>
                 <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="avis"  >Avis </label>
                    <input type="number" min="0" max="5" id="avis" class="form-control" v-model="article.avis" />
                    <span class="text-danger"  v-if="!$v.article.avis.required && $v.article.avis.$dirty" >Avis est obligatoire </span>
                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom"  >{Produit </label>

                    <select class="form-select" v-model="article.produit">
                        <option disabled value="">Selectionner un produit</option>
                        <option v-for="produit in produits" :key="produit._id" :value="produit._id">{{produit.nom}}</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.article.produit.required && $v.article.produit.$dirty" >Vous devez choisir un produit, sinon <router-link :to="{name :'ajouter-produit'}"> Ajouter un produit </router-link> </span>
                </div>
                </div>
                 <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom"  >Image </label>
                    <input type="file" class="form-control" @change="onImageSelected"/>
                    <span class="text-danger"  v-if="!$v.article.produit.required && $v.article.produit.$dirty" >Vous devez choisir un produit, sinon <router-link :to="{name :'ajouter-produit'}"> Ajouter un produit </router-link> </span>
                </div>
                </div>
            </div>
             <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom"  >Desciption </label>
                    <textarea class="form-control" rows="6" v-model="article.description"></textarea>
                   
                    <span class="text-danger"  v-if="!$v.article.description.required && $v.article.description.$dirty" >description est obligatoire</span>
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
            article :{
                nom : "",
                prix :"",
                description: "",
                avis :"",
                produit : "",
                quantite : "",
                image :""
            },
            produits : [],
            
        }
    },
    validations :{
        article : {
             nom : {
                 required
            },
            produit : {
                required
            },
            prix : {
                required
            },
            description : {
                required
            },
            avis : {
                required
            },
            quantite : {
                required
            }
        }
       
    },

    methods :{
        submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.ajouterArticle()
            }
        },
        onImageSelected(e){
            // console.log(e.target.files[0])
            this.article.image = e.target.files[0].name
        },
        ajouterArticle(){
            axios.post('http://localhost:3500/responsable/article/ajouter',{
                nom : this.article.nom,
                prix : this.article.prix,
                description: this.article.description,
                avis :this.article.avis,
                produit : this.article.produit,
                quantite : this.article.quantite
               }).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Article Ajouté!',
                    'success'
                )
                this.$router.push({name:"article-page"})
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
            axios.get('http://localhost:3500/responsable/produit/voir').then((res)=>{
                this.produits = res.data
            })
    }

}
</script>

<style>

</style>