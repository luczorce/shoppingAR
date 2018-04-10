<template>
  <div class="page-walkthrough">
    <h1>Explore your Office</h1>

    <p class="walkthrough-progress" aria-hidden="true">
      <span class="step" v-bind:class="{'complete': step >= 0}">1</span>
      <span class="step" v-bind:class="{'complete': step >= 1}">2</span>
      <span class="step" v-bind:class="{'complete': step === 2}">3</span>
    </p>

    <p class="sr-only">step {{step + 1}} of 3</p>

    <div class="walkthrough-container">
      <template v-if="step === 0">
        <h2>Do you want to play a game?</h2>
        <p>There are {{locationCount}} locations in this office that you can find and check-in to. Finding these locations will reveal information about them, for your entertainment. Additionally, there are <strong>{{secretCount}} secret</strong> locations for you to sniff out!</p>
      </template>


      <template v-if="step === 1">
        <h2>Use the cameras, Luke</h2>
        <p>You'll have access to your device's camera. You have the option to switch which camera you're using, but most likely you'll want to use your back-facing camera. Unless you want to take some sweet selfies #officelife.</p>
      </template>

       <template v-if="step === 2">
        <h2>Ch-Ch-Ch-Ch-Check It Out</h2>
        <p>Finding a location will present you something to scan. Using your camera to find what to scan, you'll be presented an option to check in to a location! This rewards you with fun information and helpful hints for your journey.</p>

        <p>Checking into all locations is the goal here. Good luck!</p>
      </template>
    </div>
    
    <div class="walkthrough-nav-container">
      <p v-if="step === 0" class="walkthrough-nav">
        <button type="button" class="button-link button-link--small"  v-on:click="step = 1">How to Explore</button>
      </p>

      <p v-if="step === 1" class="walkthrough-nav">
        <button type="button" class="button-link button-link--small button-link--alt" v-on:click="step = 0">Back to Locations</button>
        <button type="button" class="button-link button-link--small" v-on:click="step = 2">Checking In</button>
      </p>

      <p v-if="step === 2" class="walkthrough-nav">
        <button type="button" class="button-link button-link--small button-link--alt" v-on:click="step = 1">Back to Exploring</button>
        <router-link to="/detecting" class="button-link button-link--small">Ready? Go Explore!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import LocationData from '@/components/LocationData';

  export default {
    name: 'walkthrough',
    data() {
      return {
        step: 0,
        locationCount: null,
        secretCount: null
      };
    },
    created() {
      LocationData.init();
      this.locationCount = LocationData.locations.filter(loc => !loc.secret).length;
      this.secretCount = LocationData.locations.filter(loc => loc.secret).length;
    }
  }
</script>

<style>
  .walkthrough-progress {
    text-align: center;
    display: flex;
  }

  .walkthrough-progress .step {
    flex: 1;
    font-size: 0.8em;
    margin: 0 1px;
    background: var(--fizz);
    color: var(--light);
  }

  .walkthrough-progress .step.complete {
    background: var(--pop);
    color: var(--dark);
  }

  .walkthrough-progress .step:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  .walkthrough-progress .step:last-of-type {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  .walkthrough-nav {
    font-size: 0.9em;
    display: flex;
    justify-content: space-between;
  }

  .walkthrough-nav button:first-child {
    margin-right: 5px;
  }

  /* complicated pseudo classes for avoiding single children */
  .walkthrough-nav button:last-child:not(:first-child) {
    margin-left: 5px;
  }

  .walkthrough-nav button:only-child {
    margin-left: auto;
  }
</style>
