<script setup lang="ts">
import router from "./router.ts";
import {getUserManager} from "./services/UserManager.ts";
import HelloWorld from "./components/HelloWorld.vue";
import ObtainRoute from "./components/ObtainRoute.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

function handleUserButton() {
  if (getUserManager().isLoggedIn()) {
    router.push({path: '/profile'})
  } else {
    router.push({path: '/logIn'})
  }
}

</script>

<template>
  <div id="nav">
    <router-link class="nav-link" to="/">Home</router-link>
    <span id="profile-btn" @click="handleUserButton">🙋‍♂️</span>
  </div>
  <router-view id="router-view"/>
  <Header></Header>
    <ObtainRoute></ObtainRoute>
  <Footer></Footer>
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

#router-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
}
</style>
