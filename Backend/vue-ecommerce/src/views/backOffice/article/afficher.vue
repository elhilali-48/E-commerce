<template>
  <div class="row mt-5">
     <div class="col-md-5 mx-5">
       <div class="card bg-light rounded-5">
                   <table class="table table-striped table-hover table-borderless p-3">
                    <tbody >
                        <tr>        
                            <td class="h-100">
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                   Nom                                               
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.nom}}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-user  text-primary"></span>    
                                    Produit                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{getProduitNom}}
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-cloud text-primary"></span>  
                                    Prix                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.prix}} €
                            </td>
                        </tr>

                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-bookmark text-primary"></span> 
                                    Quantité                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.quantite == 0 ? 'Rupture' : article.quantite}}
                            </td>
                        </tr>


                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                    Notation                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.avis}}
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-envelope text-primary"></span> 
                                    Nombres des commandes                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                -
                            </td>
                        </tr>
                                                     
                    </tbody>
                </table>
       </div>
     </div>
     <div class="col-md-5">
        <img v-if="article.image" class="w-50 rounded float-right" :src="require(`../../../../../images/${article.image}`)" :alt="article.image" />
        <img v-else alt="Image non disponible">
     </div>

     <div class="col-md-10 mx-auto mt-5">
       <ul class="nav nav-tabs nav-justified">
      <li class="nav-item">
        <a class="nav-link " @click.prevent="setActive('home')" :class="{ active: isActive('home') }" >Descirption</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="setActive('profile')" :class="{ active: isActive('profile') }" >Technique</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="setActive('contact')" :class="{ active: isActive('contact') }" >Reviews</a>
      </li>
    </ul>
    <div class="tab-content py-3" id="myTabContent">
      <div class="tab-pane fade " :class="{ 'active show': isActive('home') }" id="home">
        <h4 class="text-secondary text-start mt-3">{{article.description}}</h4>
      </div>
      <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">
          RMA : 
          {{ article.ram }}
          <!-- {{ article.description_technique.pouces }} -->
          <!-- {{ article.description_technique.stockage }} -->
          <!-- {{ article.description_technique.processeur }} -->
      </div>
        <div class="tab-pane fade bg-light p-5" :class="{ 'active show': isActive('contact') }" id="contact">
                <div v-if="comments.length > 0">
                  <div class="" v-for="comment in comments" :key="comment._id">
                    <div class="row d-flex justify-content-between">
                      <div class="col-md-3">
                        <img class="w-25" src="https://thumbs.dreamstime.com/b/ic-ne-masculine-d-avatar-dans-le-style-plat-ic-ne-masculine-d-utilisateur-avatar-d-homme-de-bande-dessin%C3%A9e-91462914.jpg" alt="">
                        <small class="text-primary fw-bold">Client</small>
                      </div>
                      <div class="col-md-6">
                        <div class=" border-5 border-danger">
                          <p class="mt-4" style="text-align : left">
                            {{comment.commentaire}}
                          </p>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mt-4">
                          {{moment(comment.createdAt).startOf('minut').fromNow()}}
                          <button class="btn btn-primary" v-if="idClient && (idClient == comment.idclient)" @click="editComment(comment)">Edit</button>
                        </div>
                        
                      </div>
                      <hr class="mt-5" size="4"/>
                    </div>
                  </div>
                </div>
                <div class="fw-bold text-warning" v-else >
                  Aucun Commentaire pour ce Article
                </div>
            </div>
    </div>
     </div>
  </div>
</template>

<script>
var moment = require('moment')
moment.locale('fr');
import axios from 'axios'
export default {
    data () {
        return {
                  moment:moment,
            article :{},
            comments : [],
            activeItem : 'description'
        }
    },
    name : "afficher-article",
    methods: {
       
        getArticle(){
            axios.get(`http://localhost:3500/responsable/article/voirarticle/${this.$route.params.id}`).then((res)=>{
            // console.log(res.data.personnecomment)
            this.article = res.data
            this.comments = res.data.personnecomment

        })
       
      },
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },

    },
    computed :{
        getProduitNom(){
            const produit = this.article.produit
           return produit.nom
        }
    },   
    created(){
        this.getArticle();
    }
}
</script>

<style>

</style>