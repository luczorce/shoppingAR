<template>
  <div class="about">
    <h1>The AR Office Experiment</h1>

    <p>This is a demo application for an office in Chicago, IL. While this has a lighthearted approach to the concept, treating this demo more like a game than anything else, its intent is to display these AR and camera capabilities to the larger team.</p>

    <p class="imagine">Imagine if this was in a mall? We could experience a customised journey based on where we've been and where we could go?</p>
    <p class="imagine">Imagine being reminded to recycle your coffee cup at the next recycle bin you pass after a trip to Starbucks?</p>
    <p class="imagine">Imagine being offered a 10% coupon at a shoe store after you bought a dress down the lane?</p>
    <p class="imagine">Imagine finding fun in store secrets that drive stronger customer engagement, like a secret dance at the ice cream parlor that grants you a free cone for the day?</p>

    <p>If you like what you see and/or want to learn more, please <a href="mailto:ana.luczynski@salesforce.com">reach out</a>!</p>
    
    <hr>
    
    <p>Want to reset your progress? <button type="button" v-on:click="clearStorage">clear your checkedin locations</button></p>

    <modal-plain v-if="showModal" @close="showModal = false">
      <h3 slot="header">Storage Status</h3>
      <p slot="body" v-if="cleared">Your Local Storage has been cleared.</p>
      <p slot="body" v-if="!cleared">Your Local Storage was not cleared successfully. Please reload and try again.</p>
    </modal-plain>
  </div>
</template>

<script>
  import LocationData from '@/components/LocationData';
  import ModalPlain from '@/components/ModalPlain';

  export default {
    name: 'about',
    components: {
      ModalPlain
    },
    data() {
      return {
        showModal: false,
        cleared: null,
      };
    },
    methods: {
      clearStorage() { 
        this.cleared = LocationData.clear(); 
        this.showModal = true;
      }
    },
    created() {
      LocationData.init();
    }
  }
</script>

<style>
  .imagine {
    padding: 0 20px;
    border-left: 1px var(--pop) solid;
  }
</style>
