<template>
<div>
    <NavBar class="mb-5"/>
    <div class="row d-flex justify-content-center">
        <h1 class="text-center my-3">Création du compte </h1>
        <div class="col-8">
            <div class="card mb-5">
                <div class="card-body">
                     <form @submit.prevent="submitForm">
                    <div class="row d-flex justify-content-around">
                        
                        <div class="col-5">
                             <div class="form-group">
                                <label for="nom">Nom</label>
                                <input type="text" class="form-control" id="nom" aria-describedby="emailHelp" placeholder="Nom" v-model="client.nom">
                                <span v-if="!$v.client.nom.required && $v.client.nom.$dirty" class="text-danger" >
                                    Le nom est obligatoire ! 
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="prenom">prenom</label>
                                <input type="text" class="form-control" id="prenom" aria-describedby="emailHelp" placeholder="Prenom" v-model="client.prenom">
                                <span v-if="!$v.client.prenom.required && $v.client.prenom.$dirty" class="text-danger" >
                                    Le prènom est obligatoire ! 
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="prenom">Date de naissance</label>
                                <input type="date" class="form-control" id="date" aria-describedby="emailHelp" v-model="client.dateDeNaissance">
                                <span v-if="!$v.client.dateDeNaissance.required && $v.client.dateDeNaissance.$dirty" class="text-danger" >
                                    La date de naissance est obligatoire ! 
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="Adresse">Adresse</label>
                                <input type="text" class="form-control" id="Adresse" aria-describedby="emailHelp" placeholder="Adresse" v-model="client.adresse">
                                <span v-if="!$v.client.adresse.required && $v.client.adresse.$dirty" class="text-danger" >
                                    L'adresse est obligatoire ! 
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="ville">Ville</label>
                                <input type="text" class="form-control" id="ville" aria-describedby="emailHelp" placeholder="ville" v-model="client.ville">
                                <span v-if="!$v.client.ville.required && $v.client.ville.$dirty" class="text-danger" >
                                    La ville est obligatoire ! 
                                </span>
                            </div>
                            <div class="form-group ">
                                <label for="code">Code postal</label>
                                <input type="number" class="form-control" id="code" aria-describedby="emailHelp" placeholder="code" v-model="client.codePostale">
                                <span v-if="!$v.client.codePostale.required && $v.client.codePostale.$dirty" class="text-danger" >
                                    Le code postal  est obligatoire ! 
                                </span>
                            </div>
                        </div>
                        <div class="col-5">
                                   
                                    <div class="form-group">
                                        <label for="pays">Pays</label>
                                        <country-select v-model="client.pays" placeholder="Choisir un pays" autocomplete className="form-control" :country="country" topCountry="FR" />
                                        <!-- <input type="text" class="form-control" id="pays" aria-describedby="emailHelp" placeholder="pays" v-model="client.pays"> -->
                                        <span v-if="!$v.client.pays.required && $v.client.pays.$dirty" class="text-danger" >
                                            Le pays est obligatiore 
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">E-mail</label>
                                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email" v-model="client.email">
                                        <span v-if="!$v.client.email.required && $v.client.email.$dirty" class="text-danger" >
                                            Vous devez indiquer une adresse email valide.
                                        </span>
                                        <span v-if="!$v.client.email.email && $v.client.email.$dirty" class="text-danger" >
                                            C'est pas un email.
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="telephone">Telephone</label>
                                        <input type="number" class="form-control" id="telephone" aria-describedby="emailHelp" placeholder="telephone" v-model="client.telephone">
                                         <span v-if="!$v.client.telephone.required && $v.client.telephone.$dirty" class="text-danger" >
                                            Le code postal  est obligatoire ! 
                                        </span>
                                        <span v-if="!$v.client.telephone.minLength && $v.client.telephone.$dirty" class="text-danger" >
                                            Le numéro de téléphone se compose de 10 chiffres
                                        </span>
                                         <span v-if="!$v.client.telephone.maxLength && $v.client.telephone.$dirty" class="text-danger" >
                                            Le numéro de téléphone se compose de 10 chiffres
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="Sexe">Sexe</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="true" checked v-model="client.sexe">
                                            <label class="form-check-label" for="exampleRadios1">
                                                Femme
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="false" v-model="client.sexe">
                                            <label class="form-check-label" for="exampleRadios2">
                                                Homme
                                            </label>
                                        </div>     
                                        <span v-if="!$v.client.sexe.required && $v.client.sexe.$dirty" class="text-danger" >
                                            Le code postal  est obligatoire ! 
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="client.password">
                                        <span v-if="!$v.client.password.required && $v.client.password.$dirty" class="text-danger" >
                                            Le mot de passe est obligatoire ! 
                                        </span>
                                        <span v-if="!$v.client.password.minLength && $v.client.password.$dirty" class="text-danger" >
                                            Le mot de passe ne doit pas dépasser 20 caractères
                                        </span>
                                         <span v-if="!$v.client.password.maxLength && $v.client.password.$dirty" class="text-danger" >
                                            Le mot de passe ne doit pas dépasser 20 caractères
                                        </span>
                                    </div>
                        </div>
                        <button type="submit" class="btn btn-success my-4">Créer mon compte</button>
                        
                    </div>
                     </form>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
import NavBar from '../../components/NavBar.vue'
import {required,email,minLength,maxLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
        client : {
            nom :"",
            prenom :"",
            email : "",
            password : "",
            dateDeNaissance : '',
            telephone : "",
            sexe : "",
            adresse :"",
            ville :"",
            codePostale :"",
            pays: "",

        },
         country: '',
         region: ''
    }
  },
  validations :{
      client : {
          nom :{
              required
          },
          prenom :{
              required
          },
          email :{
              required,email
          },
          password : {
              required,
              minLength : minLength(8),
              maxLength :maxLength(20),
          },
          dateDeNaissance :{
              required
          },
          telephone : {
              required,
              minLength: minLength(10),
              maxLength : maxLength(10)
          },
          sexe :{
              required
          },
          adresse : {
              required
          },
          ville: {
              required
          },
          codePostale :{
              maxLength : maxLength(5),
              minLength : minLength(5),
              required
          },
          pays :{
              required
          }
      }
  },
  methods: {
      submitForm(){
          this.$v.$touch()
          if(!this.$v.$invalid){
              this.creerCompte()
          }
      },
       onSelect({name, iso2, dialCode}) {
       alert(name, iso2, dialCode);
     },
      creerCompte(){
          axios.post('http://localhost:3500/client/register',{
              nom : this.client.nom,
              prenom : this.client.prenom,
              email : this.client.email,
              password : this.client.password,
              sexe : this.client.sexe,
              telephone : this.client.telephone,
              adresse : this.client.adresse,
              codePostale : this.client.codePostale,
              ville : this.client.ville,
              pays : this.client.pays,
              dateDeNaissance : this.client.dateDeNaissance,
          }).then(()=>{
            //   console.log(res.response.data)
                this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Votre compte a été bien créer, un email a été envoyer pour valider votre compte',
                showConfirmButton: false,
                timer: 2500
                })
                
                this.$router.push('/signIn')
          }).catch((err)=>{
<<<<<<< HEAD
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error,
                footer: '<a href="">Why do I have this issue?</a>'
=======
               this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error,
                footer: '<a href="">Mot de passe oublié</a>'
>>>>>>> def93bb2acc4b3e70ecae5abf6becd624610b05a
                })
          })
      }
  },
  components :{
      NavBar,
  }

}
</script>

<style>

</style>