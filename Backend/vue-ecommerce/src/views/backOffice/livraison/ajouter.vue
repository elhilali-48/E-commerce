<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter un mode de livraison
          </div>
           <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >Company</label>
                    <input type="text" id="nom" class="form-control" v-model="livraison.company" />
                    <span class="text-danger"  v-if="!$v.livraison.company.required && $v.livraison.company.$dirty" > Nom de company est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="quantite" >Type de livraison</label>
                    <select class="form-select" v-model="livraison.type" @change="onChange">
                        <option disabled value="">Selectionner un type de livraison</option>
                        <option value="Livraison Gratuite">Livraison Gratuite</option>
                        <option value="Livraison Standard">Livraison Standard</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.livraison.type.required && $v.livraison.type.$dirty" > Type est obligatoire</span>
                </div>
                </div>
            </div>
             <div class="row mb-4">
               <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="prix"  >Prix </label>
                    <input type="number" min="0"  id="prix" class="form-control" :disabled="isDisabel" v-model="livraison.prix" />
                    <span class="text-danger"  v-if="!$v.livraison.prix.required && $v.livraison.prix.$dirty" >Prix est obligatoire </span>
                </div>
                </div>
                 <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="duree"  >Durée </label>
                    <input type="number" min="1" id="duree" class="form-control" v-model="livraison.duree" />
                    <span class="text-danger"  v-if="!$v.livraison.duree.required && $v.livraison.duree.$dirty" >La durée est obligatoire </span>
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
import {required, minValue} from "vuelidate/lib/validators"
export default {
    name: "ajouter-livraison",
    data(){
        return{
            livraison :{
                company : "",
                type :"",
                duree: "",
                prix :"",
            },
        }
    },
    validations :{
        livraison : {
             company : {
                 required
            },
            type : {
                required
            },
            prix : {
                required,
                minValue : minValue(0)
            },
            duree : {
                required,
                minValue : minValue(1)
            },

        }
       
    },

    methods :{
        submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.ajouterLivraison()
            }
        },
       async ajouterLivraison(){
            
          await axios.post('http://localhost:3500/gestion/livraison/ajouter',this.livraison).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Livraison Ajouté!',
                    'success'
                )
                this.$router.push({name:"livraison-page"})
            }).catch((err)=>{
                console.log(err)
            })
        },
        onChange(){
            if(this.livraison.type == "Livraison Gratuite"){
               
                this.livraison.prix = 0
            }
        }
    },

    computed :{
        isDisabel(){
            return (
                this.livraison.type == "Livraison Gratuite"
            )
             
        }
    },

 

}
</script>

<style>

</style>