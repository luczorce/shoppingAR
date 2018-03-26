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
      <button v-if="showLocationButton" @click="showModal = true">Check into {{ currentLocation.name }}</button>
      
      <modal v-if="showModal" @close="showModal = false" v-bind:bus="bus" :locationId="currentLocation.id">
        <h3 slot="header">{{ currentLocation.name }}</h3>
        <p slot="body">{{ currentLocation.description }}</p>
        <span slot="footertext" v-if="!currentLocation.checkedin">Check In</span>
        <span slot="footertext" v-if="currentLocation.checkedin">Close</span>
      </modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Camera from '@/components/Camera.vue';
  import LocationImages from '@/components/LocationImages.vue';
  import Modal from '@/components/Modal.vue';
  import LocationData from '@/components/LocationData';

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
        showLocationButton: false,
        currentLocation: null
      };
    },
    methods: {
      emitToggleCamera() {
        this.bus.$emit('toggleCamera');
      }
    },
    created() {
      // TODO use LocalStorage to prime the LocationData with what a user has searched already
      // LocationData.init()

      this.bus.$on('checkedCameraResults', (noCamera) => {
        this.checkedCamera = true;
        this.cameraExists = !noCamera;
      });

      this.bus.$on('detectedLocationData', (markers) => {
        // TODO I wonder how changing values really works here?
        // Like if I 'reassign' a value from true to true, is it really changing
        // being really senstitive to immutable forms of data storage right now
        this.showLocationButton = markers.length;

        if (this.showLocationButton) {
          this.currentLocation = LocationData.find(markers.pop().id);
        }
      });

      this.bus.$on('checkin', (locationId) => {
        let result = LocationData.checkin(locationId);
        if (result) {
          // TODO celebrate
        }
      });
    }
  }

</script>

<style>
  .visual-container {
    position: relative;
  } 
</style>
