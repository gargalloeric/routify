<script setup lang="ts">
import L, {GeoJSON} from "leaflet";
import "leaflet/dist/leaflet.css";
import {getRouteFromPlacesNames} from "../services/ORSAdapter.ts";
import {onMounted, ref} from 'vue';
import {Transport} from "../model/Transport.ts";

const map = ref();
onMounted(() => {
   map.value = L.map("map", {
    center: [39.95033330877234, -0.10324382781982422],
    zoom: 17,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map.value);

  //L.marker([39.95033330877234, -0.10324382781982422])
      //.addTo(map.value)
      //.bindPopup("<b>Museo de Cerámica de l'Alcora</b>")
      //.openPopup();
});

async function drawRoute(origin: string, destination: string, mode: Transport){

  let ruta = await getRouteFromPlacesNames(origin, destination, mode);
  const geoJSON: GeoJSON = ruta.getPuntos();

  const puntos = geoJSON.features[0].geometry.coordinates
  let feature = L.geoJSON(geoJSON).addTo(map.value);

  L.marker(puntos[0].reverse())
  .addTo(map.value)
  .bindPopup(origin)
  .openPopup();

  map.value.fitBounds(feature.getBounds());

  const size = puntos.length;
  L.marker(puntos[size -1].reverse())
      .addTo(map.value)
      .bindPopup(destination)
      .openPopup();

}

defineExpose({
  drawRoute
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

