
import HomePage from "../views/Pages/HomePage.vue"




  const routes =  [
    {
        path : "/",
        name : "HomePage",
        component : HomePage,
        meta:{
          requiresAuth : true
        }
      },
    ]

export default routes