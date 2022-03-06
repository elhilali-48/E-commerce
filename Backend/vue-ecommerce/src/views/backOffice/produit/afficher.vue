<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-center my-5"> 
          <h3>Produit : {{produit.nom}}</h3>
        </div>
          <h5 class="d-flex justify-content-start">Listes des articles : {{produit.article.length}} </h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Nombre des articles</th>
                <th scope="col">Outils</th>
              </tr>
            </thead>
            <tbody v-for="(article) in  produit.article" :key="article._id">
              <tr v-if='article' >
                <th scope="row">{{article._id}}</th>
                <td>{{article.nom}}</td>
                <td>{{article.prix}}</td>
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
            produit :{}
        }
    },
    name : "afficher-produit",
    methods: {
        getProduit(){
            axios.get(`http://localhost:3500/responsable/produit/voirProduit/${this.$route.params.id}`).then((res)=>{
              const produit = res.data[0]
              this.produit = produit
        })
        },
       
    },
    created(){
        this.getProduit();
    }
}
</script>

<style>

</style>