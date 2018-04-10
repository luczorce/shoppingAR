<template>
  <div id="app">
    <navigation />
    <router-view class="main-container"/>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation';
  
  export default {
    name: 'app',
    components: { Navigation }
  }
</script>

<style>
  #app {
    font-family: var(--mono-font);
    height: calc(100vh - 20px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
