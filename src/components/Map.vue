<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
import { Route } from "../model/Route";

const props = defineProps<{
  initLatLang: L.LatLngExpression,
  zoom: number
}>();

const map = ref();
const layerGroup = ref();

onMounted(() => {
   map.value = L.map("map", {
    center: props.initLatLang,
    zoom: props.zoom,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map.value);

  layerGroup.value = L.layerGroup().addTo(map.value);
});

function drawRoute(route: Route) {
  const geoJSON = route.geoJSON;

  const puntos = geoJSON.features[0].geometry.coordinates

  let geoJSONLayer = L.geoJSON(geoJSON).addTo(layerGroup.value);

  L.marker(puntos[0].reverse())
    .addTo(geoJSONLayer);

  L.marker(puntos[puntos.length - 1].reverse())
    .addTo(geoJSONLayer);

  map.value.fitBounds(geoJSONLayer.getBounds());
}

function clear() {
  layerGroup.value.clearLayers();
}

defineExpose({
  drawRoute,
  clear
});

</script>

<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<style scoped>
.map {
  flex-grow: 1;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

