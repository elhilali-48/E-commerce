<template>
  <div class="container rounded bg-light rounded-3 mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">{{ user.nom }}</span><span class="text-black-50">{{ user.email }}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <form action="" @submit.prevent="submitForm">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-center">Modifier mes informations : </h4>
                </div>
                <div class="row mt-2">
                    
                    <div class="col-md-6">
                        <label class="labels">Nom</label>
                        <input type="text" class="form-control" v-model="user.nom" placeholder="Nom" >
                        <span class="text-danger"  v-if="!$v.user.nom.required && $v.user.nom.$dirty" > Nom est obligatoire</span>
                    </div>
                    <div class="col-md-6">
                        <label class="labels">Prénom</label>
                        <input type="text" class="form-control" v-model="user.prenom"  placeholder="Prénom">
                        <span class="text-danger"  v-if="!$v.user.prenom.required && $v.user.prenom.$dirty" >Prénom est obligatoire</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="labels">Téléphone</label>
                        <input type="text" class="form-control" placeholder="Entrer Votre numéro de téléphone" v-model="user.telephone" >
                        <span class="text-danger"  v-if="!$v.user.telephone.required && $v.user.telephone.$dirty" >Téléphone est obligatoire</span>
                        <!-- <span class="text-danger"  v-if="(!$v.user.telephone.minLength) && $v.user.telephone.$dirty" >Téléphone se compose de 10 chiffres</span>
                        <span class="text-danger"  v-if="(!$v.user.telephone.maxLength) && $v.user.telephone.$dirty" >Téléphone se compose de 10 chiffres</span> -->
                        
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Adresse : </label>
                        <input type="text" class="form-control" placeholder="Rue la hotoie 10" v-model="user.adresse" >
                        <span class="text-danger"  v-if="!$v.user.adresse.required && $v.user.adresse.$dirty" >adresse est obligatoire</span>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Pays</label>
                        <input type="text" class="form-control" placeholder="France" v-model="user.pays" >
                                    <span v-if="!$v.user.pays.required && $v.user.pays.$dirty" class="text-danger" >
                                            Le pays est obligatiore 
                                        </span>                
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Ville</label>
                        <input type="text" class="form-control" placeholder="Amiens" v-model="user.ville" >
                        <span class="text-danger"  v-if="!$v.user.ville.required && $v.user.ville.$dirty" >ville est obligatoire</span>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Code Postal</label>
                        <input type="text" class="form-control" placeholder="80000" v-model="user.codePostale" >
                         <span class="text-danger"  v-if="!$v.user.codePostale.required && $v.user.codePostale.$dirty" >Code Postale est obligatoire</span>
                        <span class="text-danger"  v-if="(!$v.user.codePostale.maxLength) && $v.user.codePostale.$dirty" >Code postal se compose de 5 chiffres</span>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Date de naissance</label>
                        
                        <input type="date" class="form-control"  v-model="user.dateDeNaissance" >
                         <span class="text-danger"  v-if="!$v.user.dateDeNaissance.required && $v.user.dateDeNaissance.$dirty" >Date de naissance est obligatoire</span>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Email</label>
                        <input type="email" class="form-control" placeholder="exemple@gmail.com"  v-model="user.email">
                         <span v-if="!$v.user.email.required && $v.user.email.$dirty" class="text-danger" >
                            Vous devez indiquer une adresse email valide.
                        </span>
                        <span v-if="!$v.user.email.email && $v.user.email.$dirty" class="text-danger" >
                                C'est pas un email.
                        </span>
                    </div>
                </div>
                <!-- <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"></div>
                </div> -->
                <div class="mt-5 text-center">
                    <button type="submit" class="btn btn-primary profile-button">Modifier Profile</button>
                </div>
            </div>
            </form>
            
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
              <router-link :to="{name :'editer-password'}" class="btn btn-sm btn-success mx-2 my-2 " type="button">Changer mot de passe</router-link>
              <router-link :to="{name :'editer-email'}" class="btn btn-sm btn-primary mx-2 " type="button">Changer mon email</router-link>
            </div>
        </div>
        
        
    </div>
</div>

</template>

<script>
import Vue from "vue"
import VueJwtDecode from "vue-jwt-decode"
import {required,email,minLength,maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

var moment = require('moment')
export default {
  methods: {
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
      submitForm(){
            this.editProfile()
        },

        editProfile(){
            
             axios.put(`http://localhost:3500/client/gestion/modifier/${this.user._id}`,{user : this.user}).then(()=>{
                 this.$swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
                this.$router.push({name :'HomePage'})
            }).catch((err)=>{
                console.log(err)
            })
        }
  },
    data () {
        return {
            user : {
                nom :"",
                prenom :"",
                email : "",
                password : "",
                dateDeNaissance : '',
                telephone : "",
                adresse :"",
                ville :"",
                codePostale :"",
                pays: "",
            },
            moment: moment,
        }
    },
     validations :{
        user : {
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
            email : {
                required,
                email
            },
            telephone : {
                required,
                minLength: minLength(10), 
                maxLength : maxLength(10),
            },
        }
       

    },
    created () {
        this.getDetailsClient()
    },
    computed : {
        getDate(){
           return moment(this.user.dateDeNaissance).format('YYYY-MM-DD')
        }
    },
   

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