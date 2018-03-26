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
    images.push(new Image('cafe-image', 11, 400, 328));
  }

  function gotMarkerData(markers) {
    visibilityUpdates(markers);
    transformUpdates(markers);
  }

  function transformUpdates(markers) {
    let markerIds = markers.map(m => m.id);
    let showThese = images.filter(img => markerIds.includes(img.id));

    showThese.forEach(img => {
      let corners = markers.find(m => m.id === img.id).corners;
      img.updateWarp(corners);
    });
  }

  function visibilityUpdates(markers) {
    let markerIds = markers.map(m => m.id);
    let showThese = images.filter(img => markerIds.includes(img.id));
    let hideThese = images.filter(img => !markerIds.includes(img.id));

    hideThese.forEach(img => img.hide());
    showThese.forEach(img => img.show());
  }

</script>

<style>
  .location-data {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }

  .location-data img {
    display: none;
  }
</style>