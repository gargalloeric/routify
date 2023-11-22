<!-- App.vue -->
<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
import Form from "./components/Form.vue";

const route = {
  origin: null,
  destination: null,
  mode: null
}

function handleRouteRequested(data) {
  // Aquí se recibe el evento personalizado con los datos del formulario
  // y se asigna a la propiedad route
  console.log(data);
  route.origin = data.origin;
  route.destination = data.destination;
  route.mode = data.mode;
}

</script>

<template>
  <div id="app">
    <Header />
    <div class="content">
      <Form @route-requested="handleRouteRequested" />
      <Map :route="route" />
    </div>
    <Footer />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.content {
  display: flex;
  flex-grow: 1;
  width: 200vh;
}
</style>

