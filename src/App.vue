<!-- App.vue -->
<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
import Form from "./components/Form.vue";
import {ref} from "vue";
import { Transport } from "./model/Transport";
import { getRouteFromPlacesNames } from "./services/ORSAdapter";

// TODO: Make initialLatLang the user location or a default coordinates fallback.
const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 17;
const map = ref();

async function handleRouteRequest(data: {origin: string, destination: string, mode: Transport}) {
  const route = await getRouteFromPlacesNames(data.origin, data.destination, data.mode)
  map.value.drawRoute(route);
}
</script>

<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <Form @route-requested="handleRouteRequest"></Form>
      <Map :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
    </div>
    <Footer></Footer>
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

