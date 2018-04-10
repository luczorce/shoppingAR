<template>
  <div class="page-home">
    <h1>Welcome <span v-if="hasBeenHere">back</span> to the 114 Demo</h1>
    <p><em>This is intended to be a mobile experience, and uses some beta web APIs. To ensure that your experience starts off right, please use <strong>Safari on iOS</strong> or <strong>Chrome on Android</strong> devices. Thanks!</em></p>

    <p><router-link to="/walkthrough" class="button-link button-link--small">read the guide</router-link> or <router-link to="/detecting" class="button-link button-link--small">go explore</router-link></p>
  </div>
</template>

<script>
  import LocationData from '@/components/LocationData';

  export default {
    name: 'home',
    data() {
      return {
        hasBeenHere: null
      }
    },
    created() {
      this.hasBeenHere = LocationData.init();
    }
  }
</script>

<style>
  .page-home {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--text-inv);
  }
</style>
