<template>
  <div class="page-locations">
    <h2 class="sr-only">Locations</h2>
    <p>Track your progress, find all locations!</p>
    
    <h3>Locations to Discover</h3>
    <ul class="location-list">
      <li v-for="loc in locationsLeft" v-bind:key="loc.id">
        {{loc.name}}
      </li>
    </ul>

    <h3><em>Secretssss...</em></h3>
    <p>
      <span class="location-star bigger-text" v-for="loc in secretsFound" v-bind:key="loc.id" aria-hidden="true">
        <span>&#x2605;</span>
      </span>

      <span class="location-star bigger-text" v-for="loc in secretsLeft" v-bind:key="loc.id" aria-hidden="true">
        <span>&#x2606;</span>
      </span>

      {{secretsFound.length}} found, {{secretsLeft.length}} to go
    </p>

    <h3>Locations Found</h3>
    <ul class="location-list">
      <li v-for="loc in locationsFound" v-bind:key="loc.id">
        {{loc.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import LocationData from '@/components/LocationData';

  export default {
    name: 'locations',
    data() {
      return {
        locationsFound: [],
        locationsLeft: [],
        secretsFound: null,
        secretsLeft: null
      };
    },
    created() {
      LocationData.init();
      
      const locations = LocationData.locations.filter(loc => !loc.secret);
      this.locationsFound = locations.filter(loc => loc.checkedin);
      this.locationsLeft = locations.filter(loc => !loc.checkedin);
      
      const secretLocations = LocationData.locations.filter(loc => loc.secret);
      this.secretsFound = secretLocations.filter(loc => loc.checkedin);
      this.secretsLeft = secretLocations.filter(loc => !loc.checkedin);
    }
  }

</script>

<style>
  .bigger-text {
    font-size: 1.4em;
  }

  .location-list li {
    list-style: none;
  }

  .location-list li:before {
    content: "*";
  }

  .location-star {
    margin-right: 3px;
    color: var(--pop);
  }
</style>
