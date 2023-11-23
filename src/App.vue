<script setup lang="ts">
</script>

<template>
  <div id="nav">
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/register">Register</router-link>
    <router-link class="nav-link" to="/logIn">LogIn</router-link>
  </div>
  <router-view />

</template>

<style scoped>
* {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

#nav {
  width: 100vw;
}

.nav-link {
  padding: 5pt;
  text-decoration: none;
  font-weight: bold;
}
</style>
