<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-responsable' }" class="btn btn-outline-success">Ajouter un responsable</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Email</th>
                <th scope="col">Date de naissance</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Role</th>
                <th scope="col">Sexe</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(responsable) in  responsables" :key="responsable._id">
                <th scope="row">#</th>
                <td>{{responsable.nom}}</td>
                <td>{{responsable.prenom}}</td>
                <td>{{responsable.email}}</td>
                <td>{{responsable.dateDeNaissance}}</td>
                <td>{{responsable.telephone}}</td>
                <td>{{responsable.role  ? "Admin" : "Responsable"}}</td>
                <td>{{responsable.sexe ? "Homme" : "Femme"}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteResponsable(responsable._id)">Supprimer</button>
                  <button class="btn btn-sm btn-outline-primary">Modifier</button>
                  <button class="btn btn-sm btn-outline-warning">Afficher</button>
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
  name : "responsable-page ",
  methods: {
      getResponsables(){
          axios.get('http://localhost:3500/responsable/gestion/informationall').then((res)=>{
            console.log(res)
            this.responsables = res.data.responsable
          })
      },
      deleteResponsable(id){
          axios.delete(`http://localhost:3500/responsable/gestion/supprimer/${id}`).then(()=>{
            this.$swal.fire(
              'Success!',
              'Responsable supprimé!',
              'warning'
            )
            this.$router.go()
          })
      }
  },
  data () {
    return {
        responsables : {}
    }
  },
    
    created(){
        this.getResponsables()
    }
    
}
</script>

<style>

</style>