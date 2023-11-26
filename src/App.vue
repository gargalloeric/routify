<!-- App.vue -->
<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
import Form from "./components/Form.vue";
import { ref } from "vue";
import { Transport } from "./model/Transport";
import { getRouteFromPlacesNames } from "./services/ORSAdapter";

// TODO: Make initialLatLang the user location or a default coordinates fallback.
const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 17;
const map = ref();

async function handleRouteRequest(data: { origin: string, destination: string, mode: Transport }) {
  try {
    const route = await getRouteFromPlacesNames(data.origin, data.destination, data.mode);
    map.value.clear();
    map.value.drawRoute(route);
  } catch (error) {
    // TODO: Make appear a popup with the error saying a route couldn't be found.
    console.log(error)
  }
}
</script>

<template>
  <Header></Header>
  <div class="m-5">
    <div class="flex flex-row h-fit">
      <Form class="mr-5" @route-requested="handleRouteRequest"></Form>
      <Map :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
    </div>
  </div>
  <Footer></Footer>
</template>

