<template>
<<<<<<< HEAD
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
               
                
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Nouveau mot de passe</label>
                        <input type="password" class="form-control"  v-model="password">
                        <!-- <span class="text-danger"  v-if="!$v.nouveau.required && $v.nouveau.$dirty" >Mot de passe est obligatoire</span><br>
                        <span class="text-danger"  v-if="!$v.nouveau.minLength && $v.nouveau.$dirty" >Mot de passe se compose au moins de 8 caractères</span>
                    </div> -->
                </div>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <label class="labels">Confirmer mot de passe</label>
                        <input type="password" class="form-control"  v-model="confirm">
                        <!-- <span class="text-danger"  v-if="!$v.confirm.required && $v.confirm.$dirty" >Confirmer votre mot de passe</span>
                        <span class="text-danger"  v-if="!$v.confirm.sameAs && $v.confirm.$dirty" >Les deux mots de passe ne sont pas identiques</span> -->

                    </div>
                </div>
               
                <div class="mt-5 text-center">
                    <button @click="modifier" class="btn btn-primary profile-button" type="button">Modifier mot de passe</button>
                    
                </div>
            </div>
        </div>
    
    </div>
    </div>
</div>
=======
  <div>
    <form @submit.prevent="modifier">
      <div>
        <label for="password">nouveau mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          v-model="password"
        />
      </div>

      <div>
        <label for="password-confim">confirmer mot de passe</label>
        <input
          type="password"
          id="password-confirm0"
          placeholder="password"
          v-model="confirm"
        />
      </div>
      <button type="submit">{{ password }}</button>
    </form>
  </div>
>>>>>>> 71236b30ae31538cca91c55326d23c457cf9e17a
</template>

<script>
import axios from "axios";

export default {
  name: "Modifier-Password-Client",
  data() {
    return {
      password: "",
      confirm: "",
    };
  },
  methods: {
    modifier() {
      axios
        .put(
          `http://localhost:3500/client/modifiermdp/${this.$route.params.id}`,
          {
            password: this.password,
          }
        )
<<<<<<< HEAD
        .then(() => {
           this.$swal.fire(
                    'Good job!',
                    'Mot de passe modifié',
                    'success'
                )
                this.$router.push('/signIn')
=======
        .then((res) => {
          console.log(res);
>>>>>>> 71236b30ae31538cca91c55326d23c457cf9e17a
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<<<<<<< HEAD
<style></style>
=======
<style></style>
>>>>>>> 71236b30ae31538cca91c55326d23c457cf9e17a
