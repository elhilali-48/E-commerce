<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter une categorie
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
    name: "ajouter-categorie",
    data(){
        return{
            nom : "",
        }
    },
    validations :{
        nom : {
            required
        },
    },

    methods :{
        submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.ajouterCategorie()
            }
        },
        ajouterCategorie(){
            axios.post('http://localhost:3500/responsable/categorie/ajouter',{
                nom: this.nom,
            }).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Categorie Ajouté!',
                    'success'
                )
                this.$router.push({name:"categorie-page"})
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
      
    }

}
</script>

<style>

</style>