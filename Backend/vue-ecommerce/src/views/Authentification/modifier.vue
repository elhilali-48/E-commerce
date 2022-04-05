<template>
  <div>
    <form @submit.prevent="modifier">
      <div>
        <label for="password">nouveau mot de passe</label>
        <input type="password" id="password" placeholder="password" v-model="password" />
      </div>

      <div>
        <label for="password-confim">confirmer mot de passe</label>
          <input type="password" id="password-confirm0" placeholder="password" v-model="confirm" />
      </div>
      <button type="submit">{{password}}</button>
    </form>

  </div>
</template>

<script>
import axios from "axios"


export default {

    name : "ModifierPassword",
    data () {
        return {
            
            password: "",
            confirm: ""
        }
    },
       methods: {

           modifier(){
            axios.post(`http://localhost:3500/responsable/gestion/modifiermdp/${this.$route.params.id}`, {
                password : this.password
            }).then((res)=>{
                console.log(res)
       }).catch((err)=>{
      console.log(err)
    })
        }
       }
};
</script>

<style></style>
