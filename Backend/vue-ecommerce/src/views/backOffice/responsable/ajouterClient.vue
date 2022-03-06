<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Ajouter un client
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
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="prenom">Prénom</label>
                    <input type="text" id="prenom" class="form-control" v-model="prenom" />
                    <span class="text-danger"  v-if="!$v.prenom.required && $v.prenom.$dirty" >Prénom est obligatoire</span>

                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="tele">Téléphone</label>
                    <input type="number" id="tele" class="form-control"  v-model="telephone"/>
                    <span class="text-danger"  v-if="!$v.telephone.required && $v.telephone.$dirty" >Téléphone est obligatoire</span>
                    <span class="text-danger"  v-if="(!$v.telephone.minLength) && $v.telephone.$dirty" >Téléphone se compose de 10 chiffres</span>
                    <span class="text-danger"  v-if="(!$v.telephone.maxLength) && $v.telephone.$dirty" >Téléphone se compose de 10 chiffres</span>


                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="date">Date de naissance</label>
                    <input type="date" id="date" class="form-control" v-model="dateDeNaissance" />
                    <span class="text-danger"  v-if="!$v.dateDeNaissance.required && $v.dateDeNaissance.$dirty" >Date de naissance est obligatoire</span>

                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="tele">Adresse </label>
                    <input type="text" id="adresse" class="form-control"  v-model="adresse"/>
                    <span class="text-danger"  v-if="!$v.adresse.required && $v.adresse.$dirty" >adresse est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="date">Pays</label>
                    <input type="text" id="pays" class="form-control" v-model="pays" />
                    <span class="text-danger"  v-if="!$v.pays.required && $v.pays.$dirty" >pays est obligatoire</span>

                </div>
                </div>
            </div>
             <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="ville">Ville </label>
                    <input type="text" id="ville" class="form-control"  v-model="ville"/>
                    <span class="text-danger"  v-if="!$v.ville.required && $v.ville.$dirty" >ville est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="post">Code Postal</label>
                    <input type="number" id="post" class="form-control" v-model="codePostale" />
                    <span class="text-danger"  v-if="!$v.codePostale.required && $v.codePostale.$dirty" >Code Postale est obligatoire</span>
                    <span class="text-danger"  v-if="(!$v.codePostale.maxLength) && $v.codePostale.$dirty" >Code postal se compose de 5 chiffres</span>
                </div>
                </div>
            </div>
             <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="sexe">Sexe</label>
                    <select class="form-select" aria-label="Default select example" v-model="sexe">
                        <option selected>Selectionner sexe</option>
                        <option value="true">Homme</option>
                        <option value="false">Femme</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.sexe.required && $v.sexe.$dirty" >Sexe est obligatoire</span>

                </div>
                </div>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example3">Email address</label>
                <input type="email" id="form3Example3" class="form-control" v-model="email" />
                <span v-if="!$v.email.required && $v.email.$dirty" class="text-danger" >
                        Vous devez indiquer une adresse email valide.
                </span>
                <span v-if="!$v.email.email && $v.email.$dirty" class="text-danger" >
                        C'est pas un email.
                </span>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4">Password</label>
                <input type="password" id="form3Example4" class="form-control" v-model="password" />
                <span v-if="!$v.password.required  && $v.password.$dirty" class="text-danger">
                        Vous devez indiquer un mot de passe.
                </span>
                <span v-if="!$v.password.minLength  && $v.password.$dirty" class="text-danger">
                        Le mot de passe se compose minimum de 8 caractère.
                </span>
            </div>

            <button type="submit" class="btn btn-lg btn-success">Ajouter</button>
        
            </form>
          </div>
          
      </div>
     
  </div>
</template>

<script>
import axios from "axios"
import {required , email, minLength,maxLength} from "vuelidate/lib/validators"
export default {
    name: "ajouter-client",
    data(){
        return{
            nom : "",
            prenom :"",
            telephone :"",
            dateDeNaissance :"",
            adresse :"",
            pays : "",
            ville :"",
            codePostale : "",
            sexe : "",
            email :"",
            password : ""    
        }
    },
    validations :{
        nom : {
            required,
            maxlength: 30, 
            minlegth: 2,
        },
        prenom : {
            required,
            maxlength: 30, 
            minlegth: 2,
        },
        telephone : {
            required: true,
            minLength: minLength(10), 
            maxLength : maxLength(10),
        },
        dateDeNaissance : {
            required
        },
        adresse : {
            required
        },
        pays : {
            required
        },
        ville : {
            required
        },
        codePostale : {
            required,
            minLength: minLength(2), 
            maxLength : maxLength(5)
        },
        sexe : {
            required
        },
        email : {
            required,
            email
        },
        password : {
            required,
            minLength : minLength(8)
        },
    },

    methods :{
        submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.ajouterClient()
            }
        },
        ajouterClient(){
            axios.post('http://localhost:3500/client/register',{
                nom: this.nom,
                prenom: this.prenom,
                telephone: this.telephone,
                dateDeNaissance: this.dateDeNaissance,
                adresse: this.adresse,
                pays: this.pays, 
                ville: this.ville,
                codePostale: this.codePostale,
                sexe: this.sexe,
                email : this.email,
                password: this.password,
            }).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Client Ajouté!',
                    'success'
                )
                this.$router.push('/admin/client')
            }).catch((err)=>{
                console.log({err: err.message})
            })
        }
    },
    created(){
      
    }

}
</script>

<style>

</style>