<template>
  <div class="container rounded bg-light rounded-3 mt-5 mb-5">
    <div class="row">
        <div class="col-md-5 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-center">Modifier mon email : </h4>
                </div>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Nouveau email</label>
                        <input type="email" class="form-control"  v-model="nouveau">
                        <span class="text-danger"  v-if="!$v.nouveau.required && $v.nouveau.$dirty" >Eamil est obligatoire</span><br>
                        <span class="text-danger"  v-if="!$v.nouveau.email && $v.nouveau.$dirty" >C'est pas un email valide</span>
                    </div>
                </div>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Confirmer email</label>
                        <input type="email" class="form-control"  v-model="confirm">
                        <span class="text-danger"  v-if="!$v.confirm.required && $v.confirm.$dirty" >Confirmer votre email</span>
                        <span class="text-danger"  v-if="!$v.confirm.sameAs && $v.confirm.$dirty" >Les deux email ne sont pas identiques</span>

                    </div>
                </div>
               
                <div class="mt-5 text-center">
                    <button @click="submitForm" class="btn btn-primary profile-button" type="button">Modifier email</button>
                    
                </div>
            </div>
        </div>
    
    </div>
</div>

</template>

<script>
import Vue from "vue"
import VueJwtDecode from "vue-jwt-decode"
import {required,email,sameAs  } from 'vuelidate/lib/validators'
import axios from "axios"
export default {
  methods: {
       submitForm(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.editEmail()
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
     async editEmail(){
           await axios.put(`http://localhost:3500/client/gestion/modifieremail/${this.user._id}`,{
               email : this.nouveau
           }).then(()=>{
                this.$swal.fire({
                title: 'Adresse email est modifié',
                showDenyButton: true,
                confirmButtonText: 'Se reconnecter',
                
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    localStorage.removeItem('user')
                    this.$cookies.remove('token')
                    this.$router.push("/signin");
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
                })
                
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
      nouveau :{
          required,
          email
      },
      confirm :{
          required,
          sameAs : sameAs('nouveau')
      }
  },
  created () {
      this.getDetailsClient()
  },
    name :"editer-email",

    

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