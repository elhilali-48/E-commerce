
import HomePage from "../views/Pages/HomePage.vue"
import ProduitPage from "../views/Pages/produit.vue"
import ArticlePage from "../views/Pages/ArticlePage.vue"



  const routes =  [
    {
        path : "/",
        name : "HomePage",
        component : HomePage,
        meta:{
          requiresAuth : true
        },
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
        ]
   },
  
      
    ]

export default routes