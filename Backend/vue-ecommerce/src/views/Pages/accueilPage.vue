<template>

 <!-- Carousel -->
  <div class="row justify-content-center mt-1">
    <div id="demo" class="carousel slide" style="width : 90% ;" data-bs-ride="carousel">

  <!-- Indicators/dots -->
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
  </div>
  
  <!-- The slideshow/carousel -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img  src="https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424" alt="Los Angeles" class="d-block" style="width:100%; max-height : 20%">
      <div class="carousel-caption">
        <h3 class="text-dark">A partir du 06/04</h3>
        <p class="text-dark">testez les super-pouvoir des bons de réduction !</p>
        <button class="btn btn-success ">Voir la sélection</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="data:image/jpeg;base64,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" alt="Chicago" class="d-block" style="width:100%">
      <div class="carousel-caption">
        <h3 class="text-primary fw-bolder">Jusqu'à 50%</h3>
        <p class="text-primary fw-bolder">de remise immédiate!</p>
        <button class="btn btn-success ">Voir la sélection</button>
      </div>
    </div>
  <div class="carousel-item">
      <img src="https://cwsmgmt.corsair.com/hybris/tlc/systems/gaming-pcs-banner_ICUE-CERTIFIED.jpg" alt="New York" class="d-block" style="width:100%">
    </div>
    <div class="carousel-item">
      <img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg" alt="New York" class="d-block" style="width:100%">
       <div class="carousel-caption">
        <h3>Nouvel Arrivage</h3>
        <p>Jusqu'à -50% sur des milliers d'articles</p>
        <button class="btn btn-success ">Voir la sélection</button>
      </div>
    </div>
  </div>
  
  
  <!-- Left and right controls/icons -->
  <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
  </div>

</template>

<script>
// import { VueAgile } from 'vue-agile'
export default {
// component: {
   
//     agile: VueAgile
   
//   },
}
</script>

<style>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
    .agile__nav-button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  height: 100%;
  position: absolute;
  top: 0;
  transition-duration: 0.3s;
  width: 80px;
}
.agile__nav-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
.agile__nav-button--prev {
  left: 0;
}
.agile__nav-button--next {
  right: 0;
}
.agile__dots {
  bottom: 10px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile_dot--current button, .agile_dot:hover button {
  background-color: #fff;
}

.slide {
  display: block;
  height: 500px;
  -o-object-fit: fill;
     object-fit: fill;
  width: 50%;
}
</style>