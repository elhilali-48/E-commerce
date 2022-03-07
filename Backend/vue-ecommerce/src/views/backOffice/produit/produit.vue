<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-produit' }" class="btn btn-outline-success">Ajouter un produit</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Nombre des articles</th>
                <th scope="col">Categorie</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produit) in  produits" :key="produit._id">
                <th scope="row">{{produit._id}}</th>
                <td>{{produit.nom}}</td>
                <td>{{produit.article.length}}</td>
                <td>{{produit.categorie.nom}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteProduit(produit._id)" >Supprimer</button>
                  <router-link :to="{name : 'modifier-produit', params:{id: produit._id}}" class="btn btn-sm btn-outline-primary">Modifier</router-link>
                  <router-link :to="{name : 'afficher-produit' , params:{id : produit._id}}"  class="btn btn-sm btn-outline-success">Afficher</router-link>
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
            produits :[]
        }
    },
    name : "categorie-page",
    methods: {
        getProducts(){
            axios.get('http://localhost:3500/responsable/produit/voir').then((res)=>{
                console.log(res.data)
                this.produits = res.data
            })
        },
        deleteProduit(id){
            axios.delete(`http://localhost:3500/responsable/produit/supprimer/${id}`).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Produit supprimé!',
                    'success'
                )
                this.$router.go()
            })
        }
    },
    created(){
        this.getProducts();
    }
}
</script>

<style>

</style>