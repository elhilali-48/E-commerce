import HomePage from "../views/Pages/HomePage.vue"
import ProduitPage from "../views/Pages/produit.vue"
import ArticlePage from "../views/Pages/ArticlePage.vue"
import PanierPage from "../views/Pages/PanierPage.vue"
import PayPage from '../views/Pages/PayPage.vue'
import SuccessPage from "../views/Pages/SuccessPage.vue"
import CommandePage from "../views/Pages/CommandePage.vue"

  const routes =  [
    {
        path : "/",
        name : "HomePage",
        component : HomePage,
        // meta:{
        //   requiresAuth : true
        // },
        children :[
          {
            path : "produit/:id",
            name : 'produit-front',
            component : ProduitPage,
          
          },
          {
            path : "article/:id",
            name : 'article-front',
            component : ArticlePage,
          
          },
          {
            path : "panier",
            name : 'panier-front',
            component : PanierPage,
          
          },
          {
            path : "pay",
            name : 'pay-front',
            component : PayPage,
          
          },
          {
            path : "success",
            name : 'success-front',
            component : SuccessPage,
          
          },
          {
            path : "commande",
            name : 'commande-front',
            component : CommandePage,
          
          },

        ]
   },
  
      
    ]

export default routes