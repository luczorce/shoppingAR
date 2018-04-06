<template>
  <div class="page-home">
    <h1>Welcome to the 114 Demo</h1>
    <p>Please take a walk around the office, and see what you can find...</p>
    <p><em>This is intended to be a mobile experience, so please use Android Chrome or iOS Safari browsers.</em></p>

    <p><router-link to="/detecting" class="button-link">go explore</router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style>
  .page-home {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .button-link {
    line-height: 3;
    padding: 15px 25px;
    background: tomato;
    color: white;
    text-decoration: none;
  } 
</style>
