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
  :root {
    --dark: #060626;
    --light: #eee;
    --pop: #96ff96;
    --fizz: #42b983;
    --text: #2c3e50;
    --text-inv: #809DB9;

    --os-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --mono-font: 'IBM Plex Mono', monospace;
  }

  html,
  body {
    margin: 0;
    line-height: 1.4;
    background: var(--dark);
    color: var(--text-inv);
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  #app {
    font-family: var(--mono-font);
    height: calc(100vh - 20px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .main-container {
    flex: 1 0 auto;
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

  hr {
    color: var(--text-inv);
    border: 1px solid;
  }

  button {
    padding: 2px 7px;
    background: none;
    color: var(--fizz);
    text-decoration: none;
    font-family: inherit;
    font-size: 1em;
    border: 1px var(--fizz) solid;
    border-radius: 3px;
  }

  a {
    color: var(--fizz);
  }

  .button-link {
    line-height: 3;
    padding: 15px 25px;
    background: var(--pop);
    color: var(--dark);
    text-decoration: none;
  }

  ::selection {
    background: var(--pop);
    color: var(--text);
  }

  ::-moz-selection {
    background: var(--pop);
    color: var(--text);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
  }
</style>
