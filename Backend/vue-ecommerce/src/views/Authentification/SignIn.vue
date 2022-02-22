<template>
    <div class="row">
        <div class="col-4 mx-auto border border-primary rounded border-bold py-4 px-4">
            <h1 class="text-center">Se connecter</h1>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error,i) in errors" :key="i">{{ error }}</li>
                </ul>
            </p>
            <form @submit="checkForm">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="client.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="client.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
               
                <button  type="submit" class="btn btn-primary">Se connecter</button>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
      connecter(){
        axios.post('http://localhost:3500/login',{
            email : this.client.email,
            password : this.client.password
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            this.errors.push(err.message)
        })
      },
      checkForm(e){
           if (this.client.email && this.client.password) {
                this.connecter()

                // this.$router.push({name: 'HomePage'})
             }

            this.errors = [];

            if (!this.email) {
                this.errors.push('email required.');
            }
            if (!this.password) {
                this.errors.push('password required.');
            }

            e.preventDefault();
        }
  },
 name : "SignIn",
  data () {
    return {
        client : {
            email : "",
            password : ""
        },
        errors : []
    }
  },


        

}
</script>

<style>

</style>