<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-client' }" class="btn btn-outline-success">Ajouter un client</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Date de naissance</th>
                <th scope="col">Email</th>
                <th scope="col">telephone</th>
                <th scope="col">pays</th>
                <th scope="col">confirmation</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(client) in  clients" :key="client._id">
                <th scope="row">#</th>
                <td>{{client.nom}}</td>
                <td>{{client.prenom}}</td>
                <td>{{client.dateDeNaissance}}</td>
                <td>{{client.email}}</td>
                <td>{{client.telephone}}</td>
                <td>{{client.pays}}</td>
                <td>{{client.confirmation}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteClient(client._id)">Supprimer</button>
                  <router-link :to='{name :"afficher-client", params : {id: client._id}}' class="btn btn-sm btn-outline-success">Afficher</router-link>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name : "client-page ",
  methods: {
      getClients(){
          axios.get('http://localhost:3500/client/gestion/informationall').then((res)=>{
            console.log(res)
            this.clients = res.data.client
            })
      },
      deleteClient(id){
          axios.delete(`http://localhost:3500/client/gestion/supprimer/${id}`).then(()=>{
              this.$swal.fire(
                'Success!',
                'Client supprimé!',
                'warning'
              )
              this.$router.go()
            })
          }
  },
data () {
    return {
        clients : {}
    }
  },
    
    created(){
        this.getClients()
    }
}
</script>

<style>

</style>