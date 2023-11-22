<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <p>This is the homepage, it has a component view in it and links to render them</p>

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/helloWorld">Showcase Component</router-link>
  </div>

  <span>Component is placed here: </span><br>
  <router-view />

</template>

<style scoped>
</style>
