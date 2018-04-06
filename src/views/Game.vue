<template>
  <div class="page-game">
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

    <!-- <p><button type="button" @click="testAnimation">test animation</button></p> -->

    <div class="messages">
      <button v-if="showLocationButton" @click="showModal = true">Check into {{ currentLocation.name }}</button>
      
      <modal v-if="showModal" @close="showModal = false" v-bind:bus="bus" :locationId="currentLocation.id">
        <h3 slot="header">{{ currentLocation.name }}</h3>
        <div slot="body">
          <p>{{ currentLocation.description }}</p>

          <p v-for="(opt, optIndex) in currentLocation.optional" v-bind:key="currentLocation.id + '-' + optIndex" v-if="checkOptional(opt)">{{opt.description}}</p>
        </div>
        <span slot="footertext" v-if="!currentLocation.checkedin">Check In</span>
        <span slot="footertext" v-if="currentLocation.checkedin">Close</span>
      </modal>

      <modal-plain v-if="showCongratulationModal" @close="showCongratulationModal = false">
        <h3 slot="header">Congratulations!</h3>
        <p slot="body">You've found all the locations in the game, even the hidden ones! <strong>Nice job!</strong></p>
      </modal-plain>
    </div>

    <div class="celebrate" aria-hidden="true">
      <transition name="flyin">
        <span class="single-checkin" v-if="this.showCelebrateCheckin">
          yeah<template>{{Array(15 - this.remainingCheckins).join('!')}}</template>
        </span>
      </transition>

      <transition name="bam">
        <p class="all-finished" v-if="this.showFinishedCelebrate">WOW</p>
      </transition>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  import Camera from '@/components/Camera.vue';
  import LocationImages from '@/components/LocationImages.vue';
  import LocationData from '@/components/LocationData';
  import Modal from '@/components/Modal.vue';
  import ModalPlain from '@/components/ModalPlain';

  export default {
    name: 'game',
    components: {
      Camera,
      LocationImages,
      Modal,
      ModalPlain
    },
    data() {
      return {
        bus: new Vue(),
        cameraExists: null,
        checkedCamera: null,
        currentLocation: null,
        remainingCheckins: null,
        showCelebrateCheckin: false,
        showCongratulationModal: false,
        showFinishedCelebrate: false,
        showLocationButton: false,
        showModal: false,
      }
    },
    methods: {
      emitToggleCamera() {
        this.bus.$emit('toggleCamera');
      },
      checkedCameraResults(noCamera) {
        this.checkedCamera = true;
        this.cameraExists = !noCamera;
      },
      checkin(locationId) {
        let result = LocationData.checkin(locationId);
        
        LocationData.update();
        this.updateRemainingCheckins();

        if (result) {
          if (this.remainingCheckins === LocationData.locations.length) {
            this.showFinishedCelebrate = true;
            window.setTimeout(() => {
              this.showFinishedCelebrate = false;
              this.showCongratulationModal = true;
            }, 2000);
          } else {
            // celebrate a single checkin
            this.showCelebrateCheckin = true;
            window.setTimeout(() => {this.showCelebrateCheckin = false}, 1000);
          }
        }
      },
      checkOptional(optionalData) {
        return LocationData.crossCheck(optionalData);
      },
      detectedLocationData(markers) {
        // TODO I wonder how changing values really works here?
        // Like if I 'reassign' a value from true to true, is it really changing
        // being really senstitive to immutable forms of data storage right now
        this.showLocationButton = Boolean(markers.length);

        if (this.showLocationButton) {
          const applicableMarkers = markers.filter(m => LocationData.locations.find(l => l.id === m.id));
          let firstMarkerId;

          try {  
            firstMarkerId = applicableMarkers.pop().id;
          } catch(error) {
            // do nothing with the error, we're moving too fast with requestAnimationFrame
          }

          if (firstMarkerId) {
            this.currentLocation = LocationData.find(firstMarkerId);
          }
        }
      },
      updateRemainingCheckins() {
        const checkedin = LocationData.locations.filter(loc => loc.checkedin);
        this.remainingCheckins = LocationData.locations.length - checkedin.length;
      },
      testAnimation() {
        this.showFinishedCelebrate = true;
        window.setTimeout(() => {
          this.showFinishedCelebrate = false;
          this.showCongratulationModal = true;
        }, 2000);
      }
    },
    created() {
      LocationData.init();

      this.updateRemainingCheckins();

      this.bus.$on('checkedCameraResults', this.checkedCameraResults);
      this.bus.$on('detectedLocationData', this.detectedLocationData);
      this.bus.$on('checkin', this.checkin);
    }
  }

</script>

<style>
  .visual-container {
    position: relative;
  }

  .single-checkin {
    position: absolute;
    top: 40%;
    background: var(--pop);
    color: var(--dark);
    font-size: 3em;
    padding: 10px 30px;
    font-weight: bold;
    transform: rotate(20deg);
    transition: opacity 0.15s ease-in, transform 0.15s steps(6, end);
  }

  .flyin-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .flyin-leave-active {
    opacity: 0;
    transform: translateX(100%) rotate(40deg);
  }

  .all-finished {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    padding: 10px 30px;
    background: var(--light);
    color: var(--dark);
    text-align: center;
    font-size: 5em;
    font-weight: bold;
    transition: all .1s ease;
  }

  .bam-enter {
    opacity: 0;
    transform: translateY(-100%);
  }

  .bam-leave-active {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
