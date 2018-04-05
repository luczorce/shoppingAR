<template>
  <div class="about">
    <h1>The AR Office Experiment</h1>

    <p>This is a demo application for an office in Chicago, IL. While this has a lighthearted approach to the concept, treating this demo more like a game than anything else, it's intent is to display these AR and camera capabilities to the larger team.</p>

    <p class="imagine">Imagine if this was in a mall? Building a customised journey for a user based on where they've been and where they could go?</p>
    <p class="imagine">Imagine being reminded to recycle your coffee cup at the next recycle bin you pass after a trip to Starbucks?</p>
    <p class="imagine">Imagine being offered a 10% coupon at a shoe store after you bought a dress down the lane?</p>
    <p class="imagine">Imagine finding fun in store secrets that drive stronger customer engagement, like a secret dance at the ice cream parlor that grants you a free cone for the day?</p>

    <p>If you like what you see and/or want to learn more, please <a href="mailto:ana.luczynski@salesforce.com">reach out</a>!</p>
    
    <hr>
    
    <p>Want to reset your progress? <button type="button" v-on:click="clearStorage">clear your checkedin locations</button></p>
  </div>
</template>

<script>
import LocationData from '@/components/LocationData';

export default {
  name: 'about',
  methods: {
    clearStorage() { LocationData.clear(); }
  },
  created() {
    LocationData.init();
  }
}

</script>
