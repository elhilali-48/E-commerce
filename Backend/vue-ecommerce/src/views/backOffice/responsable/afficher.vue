<template>

     <div class="container mt-5 ">
        <div class="panel-body inf-content py-3 bg-light bg-opacity-50">
        <div class="row">
            <!-- <div class="col-md-4">
                <img alt="" style="width:600px;" title="" class="img-circle img-thumbnail isTooltip" src="https://bootdey.com/img/Content/avatar/avatar7.png" data-original-title="Usuario"> 
                <ul title="Ratings" class="list-inline ratings text-center">
                    <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                </ul>
            </div> -->
            <div class="col-md-12">
                <strong class="h3">Information :</strong><br>
                <div class="table-responsive mt-2">
                <table class="table table-user-information ">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                    Identificacion                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable._id}}     
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-user  text-primary"></span>    
                                    Nom                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.nom}}     
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-cloud text-primary"></span>  
                                    Prènom                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.prenom}}  
                            </td>
                        </tr>

                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-bookmark text-primary"></span> 
                                    Email                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.email}} 
                            </td>
                        </tr>


                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                    Role                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.role ? "Admin" : "Responsable"}}
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-envelope text-primary"></span> 
                                    Téléphone                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.telephone}}
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Adresse                                                 
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.adresse}}
                            </td>
                        </tr>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Ville                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.ville}}
                            </td>
                        </tr>      
                         <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Pays                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.pays}}
                            </td>
                        </tr>     
                         <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Code Postal                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{responsable.codePostale}}
                            </td>
                        </tr>                                   
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
 
</div>
</template>

<script>
import axios from "axios"
export default {
    name : "afficher-responsable",
    data(){
        return{
            responsable : {}
        }
    },
    created(){
        axios.get( `http://localhost:3500/responsable/gestion/information/${this.$route.params.id}`).then((res)=>{
          const responsable = res.data.responsable
          this.responsable = responsable
      }).catch((err)=>{
           this.$swal.fire(
                    'Error!',
                    'Responsable introuvable ! !'+err.message,
                    'error'
                )
            this.$router.push({name :'responsable-page'})
      })
    }

}
</script>

<style>
.inf-content{
    border:1px solid #DDDDDD;
    -webkit-border-radius:10px;
    -moz-border-radius:10px;
    border-radius:10px;
    box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
}			 
</style>