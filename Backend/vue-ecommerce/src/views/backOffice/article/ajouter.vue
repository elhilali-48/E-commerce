<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter un article
          </div>
           <form @submit.prevent="submitForm" enctype="multipart/form-data">
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
                    <label class="form-label" for="nom"  >Produit </label>

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
                    <input accept="image/png, image/jpeg, image/jpg" type="file" class="form-control" ref="file" @change="onImageSelected"/>
                   
                     <!-- <span class="text-danger"  v-if="!$v.article.image.required && $v.article.image.$dirty" >Vous devez choisir une image </span> -->
                    <span class="text-danger"  v-if="errMessage" >{{ errMessage }}</span>
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
             <div class="row mb-4">  
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >RAM</label>
                    <input type="number" id="nom" class="form-control" v-model="article.ram" />
                    <span class="text-danger"  v-if="!$v.article.ram.required && $v.article.ram.$dirty" > Ram est obligatoire</span>
                                        <span class="text-danger"  v-if="!$v.article.ram.minValue && $v.article.ram.$dirty" > RAM ne peut pas étre négatif</span>

                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="quantite" >Stockage (GO)</label>
                    <input type="number" id="quantite" class="form-control" v-model="article.stockage" />
                    <span class="text-danger"  v-if="!$v.article.stockage.required && $v.article.stockage.$dirty" > Stockage est obligatoire</span>
                                        <span class="text-danger"  v-if="!$v.article.stockage.minValue && $v.article.stockage.$dirty" > Stockage ne peut pas étre négatif</span>

                </div>
                </div>
            </div>
            <div class="row mb-4">  
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >Pouces</label>
                    <input type="number" id="nom" class="form-control" v-model="article.pouces" />
                    <span class="text-danger"  v-if="!$v.article.pouces.required && $v.article.pouces.$dirty" > Pouce est obligatoire</span>
                    <span class="text-danger"  v-if="!$v.article.pouces.minValue && $v.article.pouces.$dirty" > Pouce ne peut pas étre négatif</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="quantite" >Processeur</label>
                    <input type="text"  id="quantite" class="form-control" v-model="article.processeur" />
                    <span class="text-danger"  v-if="!$v.article.processeur.required && $v.article.processeur.$dirty" > Processeur est obligatoire</span>
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
import {required,minValue} from "vuelidate/lib/validators"
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
                ram :"",
                stockage :"",
                pouces : "",
                processeur :"",
                file :null,
            },
            
            produits : [],
            errMessage :''
            
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
            },
            stockage : {
                required,
                minValue : minValue(1)
            },
             ram : {
                required,
                minValue: minValue(1),
            },
             pouces : {
                required,
                minValue : minValue(1)
            },
            processeur : {
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
             const typePossible = ["image/jpeg", "image/jpg", "image/png"]
            this.article.file = e.target.files[0]
            const file = e.target.files[0]

            if(!typePossible.includes(file.type)){
                this.errMessage = "Selectionner une image"
            }
            if(file.size>900000){
                this.errMessage  = "La taille maximale du fichier est  : 500kb"
            }
        },
       async ajouterArticle(){
           
           const formData = new FormData()
           formData.append('nom',this.article.nom)
           formData.append('prix',this.article.prix)
           formData.append('description',this.article.description)
           formData.append('avis',this.article.avis)
           formData.append('produit',this.article.produit)
           formData.append('quantite',this.article.quantite)
           formData.append('file',this.article.file)
           formData.append('pouces',this.article.pouces)
           formData.append('stockage',this.article.stockage)
           formData.append('ram',this.article.ram)
           formData.append('processeur',this.article.processeur)
          
          await axios.post('http://localhost:3500/responsable/article/ajouter',formData).then(()=>{
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
            // axios.get('http://localhost:3500/gestion/livraison/afficherAll').then((res)=>{
            //     this.livraisons = res.data
            // })
    }

}
</script>

<style>

</style>