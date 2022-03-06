<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-categorie' }" class="btn btn-outline-success">Ajouter une Categorie</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Nombre des produits</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(categorie) in  categories" :key="categorie._id">
                <th scope="row">{{categorie._id}}</th>
                <td>{{categorie.nom}}</td>
                <td>{{categorie.produit.length}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteCategorie(categorie._id)" >Supprimer</button>
                  <router-link :to="{name : 'modifier-categorie', params:{id: categorie._id}}" class="btn btn-sm btn-outline-primary">Modifier</router-link>
                  <router-link :to="{name : 'afficher-categorie' , params:{id : categorie._id}}"  class="btn btn-sm btn-outline-success">Afficher</router-link>
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
            categories :[]
        }
    },
    name : "categorie-page",
    methods: {
        getCategories(){
            axios.get('http://localhost:3500/responsable/categorie/voir').then((res)=>{
                this.categories = res.data
            })
        },
        deleteCategorie(id){
            axios.delete(`http://localhost:3500/responsable/categorie/supprimer/${id}`).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Categorie supprimé!',
                    'success'
                )
                this.$router.go()
            })
        }
    },
    created(){
        this.getCategories();
    }
}
</script>

<style>

</style>