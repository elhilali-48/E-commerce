<template>
  <div class="container-fluid">
    
    <div class="row d-flex mt-5">
      <div class="col-md-7">
        <div class="image">
          <img v-if="article.image" :src="require('../../../../images/'+article.image)" class="w-50 rounded-3 mt-5"/>
          <img src="" alt="Image Non disponible" v-else>
        </div>
      </div>
      <div class="col-md-4">
        <div class="title">
          <h1>{{article.nom}}</h1>
          <p class="text-muted fs-6">Numéro de produit :{{article._id}}</p>
        </div>
        <div class="avis">
             <div class="d-flex align-items-center " >
                  <div v-for="etoile in Math.floor(avis.result)" :key="etoile">
                    <span class="fas fa-star product d-felx justify-content-center" ></span> 
                  </div>
                  <div class="text-primary mx-3">
                    {{ avis.nbp }} avis
                  </div>
            </div>
        </div>
        <div class="mt-4 commande">
                    <h4 class="text-success">
                      En stock ! Déjà 28 commandes en cours !
                    </h4>
        </div>
        <div class="mt-4 prix"> 
          <h2 v-if="article.promotion>0">{{article.prix * (1- article.promotion/100)}} €</h2>
          
          <h5 v-if="article.promotion>0" class="text-muted"><del>{{article.prix}} €</del></h5> 
          <h2 v-else>{{article.prix}} €</h2>
          
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
         
          <input v-model.number="quatite" class="form-input w-25 rounded-1 text-center" type="number" min="1" :max="quantite"> <span class="text-muted">Stock : {{quantite}}</span>
        </div>
        <div class="panier">
          <button class="btn btn-lg btn-secondary" disabled v-if="quantite == 0">Rupture de stock</button>
          <button v-else @click.prevent="addCart(article)" class="btn btn-lg btn-success px-5 py-2" >Ajouter au panier</button>
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
                  <p class="text-secondary text-start gap-3">{{article.description}}</p>
              </div>
              <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">
                 <table class="table table-striped table-hover table-borderless p-3">
                    <tbody >
                        <tr>        
                            <td class="h-100">
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                   RAM                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.ram}}
                            </td>
                        </tr>    
                        <tr>        
                            <td class="h-100">
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                   Stockage                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.stockage}}
                            </td>
                        </tr>    
                        <tr>        
                            <td class="h-100">
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                   Pouces                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.pouces}}
                            </td>
                        </tr>  
                        <tr>        
                            <td class="h-100">
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                   Processeur                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{article.processeur}}
                            </td>
                        </tr>                       
                    </tbody>
                </table>  
              </div>
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
                          <div class="d-flex align-items-center " >
                                <div v-for="avis in comment.avie" :key="avis">
                                  <span class="fas fa-star product d-felx justify-content-center" style="width : 20px" ></span> 
                                </div>
                               
                          </div>
                          <p class="mt-4" style="text-align : left">
                            {{comment.commentaire}}
                          </p>
                          
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mt-4">
                          {{moment(comment.createdAt).startOf('minut').fromNow()}}
                          <!-- <button class="btn btn-primary" v-if="idClient && (idClient == comment.idclient)" @click="editComment(comment)">Edit</button> -->
                        </div>
                        
                      </div>
                      <hr class="mt-5" size="4"/>
                    </div>
                  </div>
                </div>
                <div class="fw-bold text-warning" v-else >
                  Aucun Commentaire pour ce Article
                </div>
                <div class="comment" v-if="idClient">
                  <form action="" @submit.prevent="addCommentaire">
                    <label for="commentaire" class="float-start fw-bolder my-3" >Ajouter un commentaire :  </label>
                    <textarea class="form-control" id="commentaire" rows="3" v-model="commentaire"></textarea>
                    <button type="submit" class="btn btn-success mt-2 float-end text-white">Ajouter</button>
                  </form>
                </div>
                <div class="text-primary fw-bolder" v-else>
                  <router-link :to='{name : "signin"}'>  Connectez-vous pour ajouter un commentaire </router-link>
                </div>
              </div>
          </div>
         
        </div>
    </div>
  </div>
</template>


<script>
var moment = require('moment')
moment.locale('fr');
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios'
import Vue from "vue"
export default {
  name: 'article-front',
    data () {
    return {
      moment:moment,
        article : null,
        comments : [],
        activeItem : 'description',
        idClient : "",
        commentaire : '',
        quatite : 1,
        quantite : null,
        avis : null
    }
  },
  mounted () {
        axios.get(`http://localhost:3500/responsable/article/voirArticle/${this.$route.params.id}`).then((res)=>{
                
                this.article = res.data
                this.quantite = res.data.quantite
                // console.log(res.data.personnecomment)
                this.comments = res.data.personnecomment
                
        })
        axios.get(`http://localhost:3500/client/commentaire/voiravis/${this.$route.params.id}`).then((res)=>{
                this.avis = res.data     
        })
        this.getUserDetails();
      //  let client =  localStorage.getItem('client')
            

  },
    methods:{
     async swal(){
        
      const { value: text } = await this.$swal.fire({
        input: 'range',
        inputLabel: 'Comment trouvez-vous cet Article ?',
        inputPlaceholder: 'Noter sur 5',
        inputAttributes: {
          min: 1,
          max: 5,
          step: 1
        },
        inputValue : 3,
        showCancelButton: true
      })

      if (text) {
        this.$swal.fire(text)
      }  
      
      },
       isActive (menuItem) {
      return this.activeItem === menuItem
      },
      setActive (menuItem) {
        this.activeItem = menuItem
      },
       getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      if(token != null){
         try {
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);
          // console.log(decoded);
          this.idClient = decoded.id._id
          // this.user = decoded;    
          } catch (error) {
            // return error in production env
            console.log(error, 'error from decoding token')
          }
      }
      
     
    }, 
      addCart(article){
      console.log(article._id)
        if(this.idClient !== ""){
          this.$store.dispatch('addToCart',{
            id : article._id ,
            idcli : this.idClient,
            quantiteselectionne : this.quatite,
            article : this.article
          })
          // axios.post('http://localhost:3500/achat/panier/ajouter/'+article._id,{
          //   id : article._id ,
          //   idcli : this.idClient,
          //   quantiteselectionne : this.quatite
          // }).then((res)=>{
          // console.log(res);
          //  })
        }
        else{

          // this.$store.dispatch('addToCart',{
          //   article : this.article,
          //   quantity : this.quatite
          // })
          this.$swal.fire({
              title: 'Voulez-vous ajouter ce article à votre panier ?',
              text: "Connctez-vous!",
              icon: 'primary',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Se connecter!',
              cancelButtonText : 'Annuler'
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push('/signIn')
              }
            })
          
        }
          
      },
      async addCommentaire(){
         const { value: text } = await this.$swal.fire({
          input: 'range',
          inputLabel: 'Comment trouvez-vous cet Article ?',
          inputPlaceholder: 'Noter sur 5',
          inputAttributes: {
            min: 1,
            max: 5,
            step: 1
          },
          inputValue : 3,
          showCancelButton: true
        })

        if (text) {
          axios.post(`http://localhost:3500/client/commentaire/ajouter/${this.$route.params.id}`,{
          idcli : this.idClient,
          avie : text,
          commentaire : this.commentaire
          }).then(()=>{
            this.$router.go()
          })
        } 
        
      },
      editComment(comment){
        this.commentaire = comment.commentaire
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