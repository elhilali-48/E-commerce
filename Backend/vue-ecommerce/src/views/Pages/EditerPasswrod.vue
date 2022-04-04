<template>
  <div class="container rounded bg-light rounded-3 mt-5 mb-5">
    <div class="row">
        <div class="col-md-5 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-center">Modifier mon mot de passe : </h4>
                </div>
                {{ user._id }}
                <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Mot de passe ancien</label>
                        <input type="password" class="form-control"  v-model="ancien" >
                        <span class="text-danger"  v-if="!$v.ancien.required && $v.ancien.$dirty" >Mot de passe ancien est obligatoire</span>
                    </div>
                </div>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Nouveau mot de passe</label>
                        <input type="password" class="form-control"  v-model="nouveau">
                        <span class="text-danger"  v-if="!$v.nouveau.required && $v.nouveau.$dirty" >Mot de passe est obligatoire</span><br>
                        <span class="text-danger"  v-if="!$v.nouveau.minLength && $v.nouveau.$dirty" >Mot de passe se compose au moins de 8 caractères</span>
                    </div>
                </div>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Confirmer mot de passe</label>
                        <input type="password" class="form-control"  v-model="confirm">
                        <span class="text-danger"  v-if="!$v.confirm.required && $v.confirm.$dirty" >Confirmer votre mot de passe</span>
                        <span class="text-danger"  v-if="!$v.confirm.sameAs && $v.confirm.$dirty" >Les deux mots de passe ne sont pas identiques</span>

                    </div>
                </div>
               
                <div class="mt-5 text-center">
                    <button @click="submitForm" class="btn btn-primary profile-button" type="button">Modifier mot de passe</button>
                    
                </div>
            </div>
        </div>
    
    </div>
</div>

</template>

<script>
import Vue from "vue"
import VueJwtDecode from "vue-jwt-decode"
import {required,minLength,sameAs  } from 'vuelidate/lib/validators'
import axios from "axios"
export default {
  methods: {
       submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.editPassword()
            }
        },
      getDetailsClient(){
           // get token from localstorage
        // this.token =  this.$store.state.accessToken
        let token = Vue.$cookies.get('token');
      
        if(token != null){
         try {
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);
          // console.log(decoded);
          this.user = decoded.id
          // this.user = decoded;    
          } catch (error) {
            // return error in production env
            console.log(error, 'error from decoding token')
          }
        }
      },
     async editPassword(){
           await axios.put(`http://localhost:3500/client/gestion/modifiermdp/${this.user._id}`,{
               ancien : this.ancien,
               password : this.nouveau
           }).then(()=>{
                 this.$swal.fire(
                    'Good job!',
                    'Mot de passe modifié',
                    'success'
                )
                this.$router.push({name :'HomePage'})
            }).catch((err)=>{
                // console.log(err.response.data.err)
                this.$swal.fire(
                    'Oups Error!',
                    err.response.data.err,
                    'error'
                )
            })
      }
  },
  data () {
    return {
        user : null,
        ancien : "",
        nouveau : "",
        confirm : ''
    }
  },
  validations :{
      ancien : {
          required
      },
      nouveau :{
          required,
          minLength : minLength(8)
      },
      confirm :{
          required,
          sameAs : sameAs('nouveau')
      }
  },
  created () {
      this.getDetailsClient()
  },
    name :"editer-password",

    

}
</script>

<style scoped>
    body {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
</style>