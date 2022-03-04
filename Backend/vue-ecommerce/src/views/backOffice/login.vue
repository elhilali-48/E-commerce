<template>
  <div class="container">
    <div class="card bg-light mx-auto my-5" style="width :50%">
      <div class="text-center text-primary py-3 text-shadow-3">
           <h1 class=''>Admin </h1>
        </div>
      <div class="d-flex justify-content-center">
     
         
      <form class="py-2" @submit.prevent="submitForm" >
  <!-- Email input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="form1Example1">Email address : </label>
    <input type="email" id="form1Example1" class="form-control" v-model="email" />
    <span class="text-danger" v-if="!$v.email.required && $v.email.$dirty">
      Vous devez indiquer une adresse email valide.
    </span>
    <span v-if="!$v.email.email && $v.email.$dirty" class="text-danger" >
                        C'est pas un email.
    </span>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="form1Example2">Password : </label>
    <input type="password" id="form1Example2" class="form-control" v-model="password" />   
     <span v-if="!$v.password.required  && $v.password.$dirty" class="text-danger">
       Vous devez indiquer un mot de passe.
     </span>
  </div>



  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block">Se connecter</button>
</form>
      </div>
    </div>
       
  </div>
</template>

<script>
import {required, email} from "vuelidate/lib/validators"
  export default {
    name : "LogIn",
    data() {
      return {
       
          email: '',
          password: '',
      }
    },
    validations :{
      email : {
        required,
        email,
      },
      password :{
        required
      }
    },
    methods:{
      submitForm(){
        this.$v.$touch()
        if(!this.$v.$invalid){
          this.login()
        }
      },
      
      login(){
        this.$store.dispatch('loginAdmin',{
          email : this.email,
          password : this.password,
        })
      }
    }

  }
</script>