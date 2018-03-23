<template>
  <div>
    <div>
      <p v-if="checkedCamera && !cameraExists">
        Sorry, you'll need a camera and a <span title="Android Chrome or Apple Safari :(">specific</span> device in order to experience this.
      </p>
        
      <p v-if="checkedCamera && cameraExists" class="centered">
        <button type="button" v-on:click="emitToggleCamera">toggle camera feed</button>
      </p>
    </div>

    <div class="visual-container">
      <Camera v-bind:bus="bus" />
      <LocationImages v-bind:bus="bus" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Camera from '@/components/Camera.vue';
  import LocationImages from '@/components/LocationImages.vue'

  export default {
    name: 'home',
    components: {
      Camera,
      LocationImages
    },
    data() {
      return {
        bus: new Vue(),
        checkedCamera: null,
        cameraExists: null
      };
    },
    methods: {
      emitToggleCamera() {
        this.bus.$emit('toggleCamera');
      }
    },
    created() {
      this.bus.$on('checkedCameraResults', (noCamera) => {
        this.checkedCamera = true;
        this.cameraExists = !noCamera;
      });
    }
  }

</script>

<style>
  .visual-container {
    position: relative;
  } 
</style>
