<template>
    <div>
        <NavBar class="mb-5"/>
        <div class="row">
        
        <div class="col-4 mx-auto border border-primary rounded border-bold py-4 px-4">
            <h1 class="text-center">Se connecter</h1>
            <span v-if="error" class="alert alert-danger"> {{error}}</span>
            <form @submit.prevent="submitForm" >
                <div class="form-group">
                     <label for="validationCustomUsername" class="form-label ">Email</label>
                    <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input v-model="email" type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" ><br>
                    <span v-if="!$v.email.required && $v.email.$dirty" class="text-danger" >
                        Vous devez indiquer une adresse email valide.
                    </span>
                    <span v-if="!$v.email.email && $v.email.$dirty" class="text-danger" >
                        C'est pas un email.
                    </span>
                    </div>
                </div>  
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    <span v-if="!$v.password.required  && $v.password.$dirty" class="text-danger">
                        Vous devez indiquer un mot de passe.
                    </span>
                </div>
                
                <button  type="submit" class="btn btn-primary mt-2">Se connecter</button>
            </form>
            <router-link :to="{name:'recuperer-compte'}" class="mt-3 nav-link">mot de passe oublié</router-link>
        </div> 
        
    </div>
    </div>
    
</template>

<script>
import {required,email} from 'vuelidate/lib/validators'
import NavBar from '../../components/NavBar.vue'
export default {
  methods: {
      
      connecter(){
          // cette fonction fait appel a une methode dans le fichier index dans le dossier store (Vuex) et il passe dans le body des informatoins (email et password)
          this.$store.dispatch('auth/login',{
              email : this.email,
              password : this.password
          })
      },

      submitForm(){
          this.$v.$touch()
            // avant d'appeler la fonction connecter on verifier si les tous champs sont remplit 
          if(!this.$v.$invalid){
            this.connecter()
          }
           

      }
  },
  components :{
      // ici on implémente des components ou des composants 
      NavBar
  },
  computed:{
      // computed permet de modifer sur les informations dans le template
      token(){
           
            return  this.$store.state.token // récupere le token stocker dans le state Vuex
      }
  },
 name : "SignIn",
  data () {
    return { 
        email : "",
        password : "",
        error : ""
    }
  },
  validations:{
      // validation des inputs
      email : {
          //Input email : obligatoire et email 
          required, 
          email
      },
      password :{
          
          required // input required
      }
  },


        

}
</script>

<style>

</style>