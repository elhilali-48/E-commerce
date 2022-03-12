<template>
  <div class="container-fluid">
    <div class="row d-flex mt-5">
      <div class="col-md-7">
        <div class="image">
          <img src="https://www.cdiscount.com/pdt2/7/n/f/1/550x550/hp15en1037nf/rw/pc-portable-gamer-hp-omen-15-en1037nf-15-6-fh.jpg"/>
        </div>
      </div>
      <div class="col-md-4">
        <div class="title">
          <h1>{{article.nom}}</h1>
          <p class="text-muted fs-6">Numéro de produit :{{article._id}}</p>
        </div>
        <div class="avis">
             <div class="d-flex align-items-center " >
                  <div v-for="etoile in article.avis" :key="etoile">
                    <span class="fas fa-star product d-felx justify-content-center" ></span> 
                  </div>
                  <div class="text-primary mx-3">
                    23 avis
                  </div>
            </div>
        </div>
        <div class="mt-4 commande">
                    <h4 class="text-success">
                      En stock ! Déjà 28 commandes en cours !
                    </h4>
        </div>
        <div class="mt-4 prix"> 
          <h2>{{article.prix}} €</h2>
        </div>
        <div class="livraison mt-5">
            <h4>Livraison :</h4>
            <ul>
              <li>Livré chez vous dès aujourd'hui </li>
              <li>Livré en point retrait dès demain  </li>
            </ul>
        </div>
        <div class="quantite">
         <h6 class="text-primary">  Quantité :</h6> 
         
          <input v-if="article.quantite>0"  class="form-input w-25 rounded-1 text-center" type="number" min="1" :max="article.quantite"> {{article.quantite>0 ? `Stock : ${article.quantite}`: "Rupture"}}
        </div>
        <div class="panier">
          <button @click.prevent="addCart(article._id)" class="btn btn-lg btn-success px-5 py-2" >{{article.quantite>0 ? 'Ajouter au panier': "Rupture du stock"}}</button>
        </div>
      </div>
      <div class="col-md-10 mx-auto mt-5 mb-5">
            <ul class="nav nav-tabs nav-justified bg-light opacity-100">
              <li class="nav-item">
                <a class="nav-link" @click.prevent="setActive('home')" :class="{ active: isActive('home') }" >Descirption</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="setActive('profile')" :class="{ active: isActive('profile') }" >Technique</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="setActive('contact')" :class="{ active: isActive('contact') }" >Reviews ({{comments.length}})</a>
              </li>
          </ul>
          <div class="tab-content py-3" id="myTabContent">
              <div class="tab-pane fade " :class="{ 'active show': isActive('home') }" id="home">
                  <h4 class="text-secondary">{{article.description}}</h4>
              </div>
              <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">Description technique </div>
              <div class="tab-pane fade bg-light p-5" :class="{ 'active show': isActive('contact') }" id="contact">
                <div v-if="comments">
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
                          25 March 2029
                          <button class="btn btn-primary" v-if="idClient && (idClient == comment.idclient)">Edit</button>
                        </div>
                        
                      </div>
                      <hr class="mt-5" size="4"/>
                    </div>
                  </div>
                </div>
                <div class="fw-bold text-warning" v-else>
                  Aucun Commentaire pour ce Article
                </div>
                <div class="comment">
                  <form action="" @submit.prevent="addCommentaire">
                    <label for="commentaire" class="float-start fw-bolder my-3" >Ajouter un commentaire : </label>
                    <textarea class="form-control" id="commentaire" rows="3" v-model="commentaire"></textarea>
                    <button type="submit" class="btn btn-outline-success mt-2 float-end text-white">Ajouter</button>
                  </form>
              
                </div>
              </div>
          </div>
         
        </div>
    </div>
  </div>
</template>


<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios'
import Vue from "vue"
export default {
  name: 'article-front',
    data () {
    return {
        article : {
            
        },
        comments : [],
        activeItem : 'description',
        idClient : "",
        commentaire : ''
    }
  },
  created () {
        axios.get(`http://localhost:3500/responsable/article/voirArticle/${this.$route.params.id}`).then((res)=>{
          console.log(res.data.personnecomment);
                this.comments = res.data.personnecomment
                this.article = res.data
                
          
        })
        this.getUserDetails();
      //  let client =  localStorage.getItem('client')
            

  },
    methods:{
       isActive (menuItem) {
      return this.activeItem === menuItem
      },
      setActive (menuItem) {
        this.activeItem = menuItem
      },
       getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      
      try {
      //decode token here and attach to the user object
      let decoded = VueJwtDecode.decode(token);
      this.idClient = decoded.id._id
      // this.user = decoded;    
      } catch (error) {
        // return error in production env
        console.log(error, 'error from decoding token')
      }
    }, 
      addCart(idd){
        
        axios.post('http://localhost:3500/achat/panier/ajouter/'+idd,{
          id : idd ,
          idcli : this.idClient
        }).then((res)=>{
        console.log(res);
      })
      },
      addCommentaire(){
        axios.post(`http://localhost:3500/client/commentaire/ajouter/${this.$route.params.id}`,{
          idcli : this.idClient,
          commentaire : this.commentaire
        }).then(()=>{
          this.$router.go()
        })
      }
    },
    
}
</script>

<style scoped>

  .img{
    width: 50%;
  }
  .title{
    margin-top: 20px;
    font-size: 500px;
    text-align: left;
    
  }
   .product.fa-star {
    font-size: 1.5rem;
    color: #FFBE01;
    margin-right: 5px;
  }
  .commande{
    text-align: left;
  }
  .prix{
    text-align: left;
    color: red;
    font-size: 500px;
  }
  .livraison{
    text-align: left;
    color: black;
  }
  .btn .btn-success{
    text-align: left;
    background-color: #44C260;
    border-radius: 10px;
    padding: 10px 30px;
  }
  .quantite{
    text-align: left;
    margin-top :20px;
    margin-bottom :20px;
  }
</style>