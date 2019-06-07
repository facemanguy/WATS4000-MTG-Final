<template>
  <div id="app">
    <img id="logo" alt="Magic The Gathering logo" src="./assets/Magic-the-Gathering-Logo.png">
    <router-view/>
  </div>
</template>

<script>
import CardFinder from './views/CardFinder.vue'

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  margin: 0 auto;
}
</style>
