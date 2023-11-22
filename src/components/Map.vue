<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {getRouteFromPlacesNames} from "../services/ORSAdapter.ts";
import {onMounted, ref} from 'vue';

const props = defineProps<{
  route: Object;
}>();

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

  L.marker([39.95033330877234, -0.10324382781982422])
      .addTo(map.value)
      .bindPopup("<b>Museo de Cerámica de l'Alcora</b>")
      .openPopup();
});

if (props.route) {
  //let ruta = await getRouteFromPlacesNames(props.route.origin, props.route.value.destination, props.route.value.mode);
  //console.log(route);
  //ruta.getPuntos().addTo(map);
}
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

