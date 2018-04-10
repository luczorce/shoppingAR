<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/detecting">Detector</router-link>
      <router-link to="/locations">Locations</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="main-container"/>
  </div>
</template>

<style>
  #app {
    font-family: var(--mono-font);
    height: calc(100vh - 20px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  #nav {
    padding: 10px 0;
    margin: 0 auto;
  }

  #nav a {
    margin-right: 20px;
    font-weight: bold;
    color: var(--text-inv);
  }

  #nav a.router-link-exact-active {
    color: var(--pop);
  }
</style>
