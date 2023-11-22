<script setup lang="ts">
</script>

<template>
  <p>This is the homepage, it has a component view in it and links to render them</p>

  <div id="nav">
    <router-link to="/">Home</router-link><span> | </span>
    <router-link to="/helloWorld">Showcase Component</router-link><span> | </span>
    <router-link to="/register">Register</router-link>
  </div>

  <span>Component is placed here: </span><br>
  <router-view />

</template>

<style scoped>
</style>
