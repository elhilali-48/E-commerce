<template>

     <div class="container mt-5 ">
        <div class="panel-body inf-content py-3 bg-light bg-opacity-50">
        <div class="row">

            <div class="col-md-12">
                <strong class="h3">Information :</strong><br>
                <div class="table-responsive mt-2">
                <table class="table table-user-information ">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                    Identification                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{client._id}}     
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
                                {{client.nom}}     
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
                                {{client.prenom}}  
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
                                {{client.email}} 
                            </td>
                        </tr>

                                                <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Date de naissance                                                 
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{client.dateDeNaissance}}
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
                                {{client.telephone}}
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
                                {{client.adresse}}
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
                                {{client.ville}}
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
                                {{client.pays}}
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
                                {{client.codePostale}}
                            </td>
                                                    <tr>        
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                    confirmation                                                
                                </strong>
                            </td>
                            <td class="text-primary">
                                {{client.role ? "confirmer" : "non confirmer"}}
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
    name : "afficher-client",
    data(){
        return{
            client : {}
        }
    },
    created(){
        axios.get( `http://localhost:3500/client/gestion/afficher/${this.$route.params.id}`).then((res)=>{
          const client = res.data.client
          this.client = client
      }).catch((err)=>{
           this.$swal.fire(
                    'Error!',
                    'Client introuvable ! !'+err.message,
                    'error'
                )
            this.$router.push({name :'client-page'})
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