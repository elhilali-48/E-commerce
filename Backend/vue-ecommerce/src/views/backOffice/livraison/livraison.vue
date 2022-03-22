<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-livraison' }" class="btn btn-outline-success">Ajouter un mode de livraison</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">Type</th>
                <th scope="col">Durée</th>
                <th scope="col">Prix</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(livraison) in  livraisons" :key="livraison._id">
                <th scope="row">{{livraison._id}}</th>
                <td>{{livraison.company}}</td>
                <td>{{livraison.type}}</td>
                <td>{{livraison.duree}}</td>
                <td>{{livraison.prix}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteLivraion(livraison._id)" >Supprimer</button>
                  <router-link :to="{name : 'modifier-livraison', params:{id: livraison._id}}" class="btn btn-sm btn-outline-primary">Modifier</router-link>
                  <router-link :to="{name : 'afficher-livraison' , params:{id : livraison._id}}"  class="btn btn-sm btn-outline-success">Afficher</router-link>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            livraisons :[]
        }
    },
    name : "livraison-page",
    methods: {
        getModes(){
            axios.get('http://localhost:3500/gestion/livraison/afficherall').then((res)=>{
                this.livraisons = res.data
            })
        },
        deleteLivraion(id){
            axios.delete(`http://localhost:3500/gestion/livraison/supprimer/${id}`).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Livraison supprimé!',
                    'success'
                )
                this.$router.go()
            })
        }
    },
    created(){
        this.getModes();
    }
}
</script>

<style>

</style>