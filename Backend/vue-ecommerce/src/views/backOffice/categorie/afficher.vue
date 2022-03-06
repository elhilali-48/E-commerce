<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-center my-5"> 
          <h3>Categorie : {{categorie.nom}}</h3>
        </div>
          <h5 class="d-flex justify-content-start">Listes des produits : {{categorie.produit.length}} </h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Nombre des articles</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody v-for="(produit) in  categorie.produit" :key="produit._id">
              <tr v-if='produit' >
                <th scope="row">{{produit._id}}</th>
                <td>{{produit.nom}}</td>
                <td>{{produit.article.length}}</td>
                <td>
                  <router-link :to="{name : 'modifier-categorie', params:{id: produit._id}}" class="btn btn-sm btn-outline-primary">Modifier</router-link>
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
            categorie :{}
        }
    },
    name : "afficher-categorie",
    methods: {
        getCategories(){
            axios.get(`http://localhost:3500/responsable/categorie/voirCategorie/${this.$route.params.id}`).then((res)=>{
              this.categorie = res.data[0]
            })
        },
       
    },
    created(){
        this.getCategories();
    }
}
</script>

<style>

</style>