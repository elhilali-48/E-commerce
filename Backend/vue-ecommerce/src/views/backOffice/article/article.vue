<template>
  <div class="row d-flex justify-content-center">
      <div class="col-md-10 my-5">
        <div class="d-flex justify-content-end"> 
          <router-link :to="{ name : 'ajouter-article' }" class="btn btn-outline-success">Ajouter un article</router-link>
        </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Produit</th>
                <th scope="col">Quantité</th>
                <th scope="col">Notation</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(article) in  articles" :key="article._id">
                <th scope="row">{{article._id}}</th>
                <td>{{article.nom}}</td>
                <td>{{article.produit.nom}}</td>
                <td>{{article.quantite}}</td>
                <td>{{article.avis}}</td>
                <td>{{article.prix}}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteArticle(article._id)" >Supprimer</button>
                  <router-link :to="{name : 'modifier-article', params:{id: article._id}}" class="btn btn-sm btn-outline-primary">Modifier</router-link>
                  <router-link :to="{name : 'afficher-article' , params:{id : article._id}}"  class="btn btn-sm btn-outline-success">Afficher</router-link>
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
            articles :[]
        }
    },
    name : "article-page",
    methods: {
        getProducts(){
            axios.get('http://localhost:3500/responsable/article/voir').then((res)=>{
                this.articles = res.data
            })
        },
        deleteArticle(id){
            axios.delete(`http://localhost:3500/responsable/article/supprimer/${id}`).then(()=>{
                this.$swal.fire(
                    'Success!',
                    'Article supprimé!',
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