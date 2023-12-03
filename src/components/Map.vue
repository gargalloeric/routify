<script setup lang="ts">
import L, {latLng, LeafletMouseEvent} from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
import { Route } from "../model/Route";
import {formRoute} from "../main.ts";

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

  map.value.on('click', onMapClick);
});

let markers : L.Marker[] = [L.marker(latLng([0, 0, 0])), L.marker([0, 0, 0])];

function drawRoute(route: Route) {
  const geoJSON = route.geoJSON;

  const puntos = geoJSON.features[0].geometry.coordinates

  let geoJSONLayer = L.geoJSON(geoJSON).addTo(layerGroup.value);

  markers[0].setLatLng(puntos[0].reverse())
    .addTo(geoJSONLayer);

  markers[1].setLatLng(puntos[puntos.length - 1].reverse())
      .addTo(geoJSONLayer);

  map.value.fitBounds(geoJSONLayer.getBounds());
}

function clear() {
  layerGroup.value.clearLayers();
}

let click = 1;
let counter = 0;
function onMapClick(e: LeafletMouseEvent) { // first 2 clicks will set the markers on each position, the rest will substitute the initial markers
  let index;
  if (counter < 2){
    index = counter;
  }
  else {
    click = (click + 1) % 2
    index = click;
  }
  markers[index].setLatLng(e.latlng).addTo(map.value);
  if (index == 0) formRoute.origin = [e.latlng.lng, e.latlng.lat];
  else formRoute.destination = [e.latlng.lng, e.latlng.lat];
  counter++;
}



defineExpose({
  drawRoute,
  clear
});

</script>

<template>
  <div id="map" style="height: 80vh; width: 100%;"></div>
</template>
