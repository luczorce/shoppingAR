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
    props: {
      bus: {type: Object, required: true}
    },
    mounted() {
      findAllImages();
      this.bus.$on('detectedMarkerData', gotMarkerData);
    }
  }

  //////

  function findAllImages() {
    images.push(new Image('cafe-image', 11));
  }

  function gotMarkerData(markers) {
    // console.log(markers);
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
    height: 100%;
  }

  .location-data img {
    display: none;
  }
</style>