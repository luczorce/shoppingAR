<template>
  <div>
    <h2>Locations</h2>
    
    <!-- TODO remove secret locations from this list, show separately -->
    <ul>
      <li v-for="loc in locations" v-bind:key="loc.id">
        <strong>{{loc.name}}</strong> checked in: {{loc.checkedin}}
      </li>
    </ul>
  </div>
</template>

<script>
  // TODO is this okay to reinit? we're just reading data here
  import LocationData from '@/components/LocationData';

  export default {
    name: 'locations',
    data() {
      return {
        locations: []
      };
    },
    created() {
      LocationData.init();
      this.locations = LocationData.locations;
    }
  }

</script>

<style>

</style>
