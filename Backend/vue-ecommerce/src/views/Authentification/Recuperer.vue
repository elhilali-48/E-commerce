<template>
  <div>
      <form @submit.prevent="envoyer" class="mt-5">
          <label for="email">email</label>
          <input type="email" v-model="email">

          <button class="btn btn-success" type="submit">Envoyer</button>
      </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name : 'recuperer-compte',
    data(){

        return{
            email: ""
        }
    },
    methods :{
        envoyer(){

             axios.post(`http://localhost:3500/client/chercher`, { email : this.email}).then((res)=>{
                console.log(res)
       }).catch((err)=>{
      console.log(err)
    })
            
        }
    }

}
</script>

<style>

</style>