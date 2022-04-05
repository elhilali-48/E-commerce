<template>
  <div>
      <h1>Validation du compte </h1>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"
export default {
    name : "ValidationCompte",
    
    mounted() {
        
        axios.put(`http://localhost:3500/client/gestion/modifier/${this.$route.params.id}`, {confirmation : true}).then(()=>{
           Swal.fire({
                title: 'Valider mon compte',
                text: "Votre compte est validé",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Se connecter'
                }).then((result) => {
                if (result.isConfirmed) {
                   this.$router.push("/signin")
                }
                })
            
        })
    },

}
</script>

<style>

</style>