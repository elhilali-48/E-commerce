<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-4">
        <a class="navbar-brand mx-5" href="#">Best Tech</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <form class="form-inline my-2 my-lg-0 mx-auto">
                <input class="form-control mr-5 " type="search" placeholder="Chercher un produit" aria-label="Search">
                </form>
                <div>
                   <router-link to="/signIn">Se Connecter</router-link>
                </div>

        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
}
</script>

<style>

</style>