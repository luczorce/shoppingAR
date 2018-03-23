<template>
  <div class="location-data">
    <img src="img/coffee.gif" id="cafe-image" />
  </div>
</template>

<script>
  import Image from './Image';
  let images = [];

  export default {
    name: 'LocationImages',
    mounted() {
      findAllImages();
    }
  }

  //////

  function findAllImages() {
    // locationContainer.style.width = size.width + 'px';
    images.push(new Image('cafe-image'));
  }

  //////



</script>

<style>
  .location-data {
    position: absolute;
    top: 0;
    left: 0;
    /* TODO check that this makes it the right size*/
    right: 0;
    background: rgba(20, 40, 100, 0.5);
  }

  .location-data img {
    display: none;
  }
</style>