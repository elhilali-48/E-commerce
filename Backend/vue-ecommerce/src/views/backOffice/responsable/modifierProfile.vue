<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-8 my-5">
          <div class="card bg-light mx-auto px-3 py-4">
                <div class="text-center text-bold h1 mb-5">
              Modifier mon profile
          </div>
           <form @submit.prevent="submitForm">
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="nom" >Nom</label>
                    <input type="text" id="nom" class="form-control" v-model="user.nom" />
                    <span class="text-danger"  v-if="!$v.user.nom.required && $v.user.nom.$dirty" > Nom est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="prenom">Prénom</label>
                    <input type="text" id="prenom" class="form-control" v-model="user.prenom" />
                    <span class="text-danger"  v-if="!$v.user.prenom.required && $v.user.prenom.$dirty" >Prénom est obligatoire</span>

                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="tele">Téléphone</label>
                    <input type="number" id="tele" class="form-control"  v-model="user.telephone"/>
                    <span class="text-danger"  v-if="!$v.user.telephone.required && $v.user.telephone.$dirty" >Téléphone est obligatoire</span>
                    <span class="text-danger"  v-if="(!$v.user.telephone.minLength) && $v.user.telephone.$dirty" >Téléphone se compose de 10 chiffres</span>
                    <span class="text-danger"  v-if="(!$v.user.telephone.maxLength) && $v.user.telephone.$dirty" >Téléphone se compose de 10 chiffres</span>


                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="date">Date de naissance</label>
                    <input type="date" id="date" class="form-control" v-model="user.dateDeNaissance" />
                    <span class="text-danger"  v-if="!$v.user.dateDeNaissance.required && $v.user.dateDeNaissance.$dirty" >Date de naissance est obligatoire</span>

                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="tele">Adresse </label>
                    <input type="text" id="adresse" class="form-control"  v-model="user.adresse"/>
                    <span class="text-danger"  v-if="!$v.user.adresse.required && $v.user.adresse.$dirty" >adresse est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="date">Pays</label>
                    <input type="text" id="pays" class="form-control" v-model="user.pays" />
                    <span class="text-danger"  v-if="!$v.user.pays.required && $v.user.pays.$dirty" >pays est obligatoire</span>

                </div>
                </div>
            </div>
             <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="ville">Ville </label>
                    <input type="text" id="ville" class="form-control"  v-model="user.ville"/>
                    <span class="text-danger"  v-if="!$v.user.ville.required && $v.user.ville.$dirty" >ville est obligatoire</span>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="post">Code Postal</label>
                    <input type="number" id="post" class="form-control" v-model="user.codePostale" />
                    <span class="text-danger"  v-if="!$v.user.codePostale.required && $v.user.codePostale.$dirty" >Code Postale est obligatoire</span>
                    <span class="text-danger"  v-if="(!$v.user.codePostale.maxLength) && $v.user.codePostale.$dirty" >Code postal se compose de 4 chiffres</span>
                </div>
                </div>
            </div>

                         <div class="row mb-4">
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="sexe">Sexe</label>
                    <select class="form-select" aria-label="Default select example" v-model="user.sexe">
                        <option selected>Selectionner sexe</option>
                        <option value="true">Homme</option>
                        <option value="false">Femme</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.user.sexe.required && $v.user.sexe.$dirty" >Sexe est obligatoire</span>

                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="role">Role</label>
                    <select class="form-select" aria-label="Default select example" v-model="user.role">
                        <option selected>Selectionner Role</option>
                        <option value="true">Admin</option>
                        <option value="false">Responsable</option>
                    </select>
                    <span class="text-danger"  v-if="!$v.user.role.required && $v.user.role.$dirty" >Role est obligatoire</span>

                </div>
                </div>
            </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example3">Email address</label>
                <input type="email" id="form3Example3" class="form-control" v-model="email" />
                <span v-if="!$v.user.email.required && $v.user.email.$dirty" class="text-danger" >
                        Vous devez indiquer une adresse email valide.
                </span>
                <span v-if="!$v.user.email.email && $v.user.email.$dirty" class="text-danger" >
                        C'est pas un email.
                </span>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4">Password</label>
                <input type="password" id="form3Example4" class="form-control" v-model="password" />
                <span v-if="!$v.user.password.required  && $v.user.password.$dirty" class="text-danger">
                        Vous devez indiquer un mot de passe.
                </span>
                <span v-if="!$v.user.password.minLength  && $v.user.password.$dirty" class="text-danger">
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
import VueJwtDecode from "vue-jwt-decode";
import {required , email, minLength,maxLength} from "vuelidate/lib/validators"

export default {
    data(){
        return{
            user : null,
        }
    },
       validations :{
        user :{
            nom : {
            required
        },
        prenom : {
            required
        },
        email : {
            required,
            email
        },
        // password : {
        //     required,
        //     minLength : minLength(8)
        // },
        sexe : {
            required
        },
        role : {
            required
        },
        dateDeNaissance : {
            required
        },
        telephone : {
            required,
            minLength: minLength(10),
            maxLength : maxLength(10),
        },
        ville : {
            required
        },
        pays : {
            required
        },
         adresse : {
            required
        },
        codePostale : {
            required,
            maxLength : maxLength(5)
        },
        }
    },
      methods:{
            submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.updateUser()
            }
        },
      getDetails(){
        let tokenAdmin  = sessionStorage.getItem('tokenAdmin')
        // décoder le token 

        try {
          let decoded = VueJwtDecode.decode(tokenAdmin)
          this.user = decoded
        } catch (error) {
          console.log(error)
        }
      },
    }, 
    created() {
      this.getDetails()
    },
   
}
</script>

<style>

</style>