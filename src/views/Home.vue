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

    <div class="messages">
      <button v-if="showLocationButton" @click="showModal = true">Show Modal</button>
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="showModal = false">
        <!-- you can use custom content here to overwrite default content -->
        <h3 slot="header">custom header</h3>
      </modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Camera from '@/components/Camera.vue';
  import LocationImages from '@/components/LocationImages.vue';
  import Modal from '@/components/Modal.vue';

  export default {
    name: 'home',
    components: {
      Camera,
      LocationImages,
      Modal
    },
    data() {
      return {
        bus: new Vue(),
        checkedCamera: null,
        cameraExists: null,
        showModal: false,
        showLocationButton: false
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

      this.bus.$on('detectedMarkerData', (markers) => {
        // TODO I wonder how changing values really works here?
        // Like if I 'reassign' a value from true to true, is it really changing
        // being really senstitive to immutable forms of data storage right now
        this.showLocationButton = markers.length;
      });
    }
  }

</script>

<style>
  .visual-container {
    position: relative;
  } 
</style>
