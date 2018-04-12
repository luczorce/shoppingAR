<template>
  <div class="location-data">
    <img src="@/assets/gifs/bay.gif" id="bay-image" />
    <img src="@/assets/gifs/cancrusher.gif" id="cancrusher-image" />
    <img src="@/assets/gifs/coffee.gif" id="coffee-image" />
    <img src="@/assets/gifs/easteregg.gif" id="easteregg-image" />
    <img src="@/assets/gifs/fountain.gif" id="fountain-image" />
    <img src="@/assets/gifs/store.gif" id="store-image" />
    <img src="@/assets/gifs/heater.gif" id="heater-image" />
    <img src="@/assets/gifs/lounge.gif" id="lounge-image" />
    <img src="@/assets/gifs/mailbox.gif" id="mailbox-image" />
    <img src="@/assets/gifs/pop.gif" id="pop-image" />
    <img src="@/assets/gifs/recycle.gif" id="recycle-image" />
    <img src="@/assets/gifs/sharpie.gif" id="sharpie-image" />
    <img src="@/assets/gifs/toilet.gif" id="toilet-image" />
    <img src="@/assets/gifs/trash.gif" id="trash-image" />
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
    images.push(new Image('bay-image', 895, 374, 374));
    images.push(new Image('cancrusher-image', 63, 219, 219));
    images.push(new Image('coffee-image', 184, 328, 328));
    images.push(new Image('easteregg-image', 11, 360, 270));
    images.push(new Image('fountain-image', 535, 400, 400));
    images.push(new Image('store-image', 967, 300, 300));
    images.push(new Image('heater-image', 546, 362, 362));
    images.push(new Image('lounge-image', 293, 143, 143));
    images.push(new Image('mailbox-image', 273, 486, 486));
    images.push(new Image('pop-image', 441, 240, 240));
    images.push(new Image('recycle-image', 430, 360, 360));
    images.push(new Image('sharpie-image', 680, 480, 362));
    images.push(new Image('toilet-image', 71, 340, 340));
    images.push(new Image('trash-image', 829, 180, 180));
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