<script setup lang="ts">
import L from 'leaflet';
import { ref } from "vue";
import Leaflet from './components/Leaflet.vue';

const initLatLng: L.LatLngExpression = [39.994085693674144, -0.0692056309560943] // UJI Coordinates

let data = ref();
let cleanData = ref();
let leafletChild = ref(null);
async function makeRequestGeocode() {
  const resp = await fetch(`https://api.openrouteservice.org/geocode/reverse?api_key=${import.meta.env.VITE_API_KEY}&point.lon=-0.068830&point.lat=39.993881`);
  const tmp = await resp.json();
  data.value = tmp;
  cleanData.value = tmp.features[0].properties.name;
  leafletChild.value.drawMarkers([initLatLng]);
}

async function makeRequestRoute() {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
  const coordinates = [[0.017974, 39.979009], [-0.034376, 39.985806]];

  const data = {
    coordinates: coordinates,
  };

  const headers = {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    'Authorization': `${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json; charset=utf-8',
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers,
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    leafletChild.value.drawRoute(responseData);
  } else {
    console.error('Error:', response.statusText);
  }
}

</script>

<template>
  <h1>Routify Spike</h1>
  <div>
    <Leaflet ref="leafletChild" :init-lat-lng="initLatLng" :zoom="12"></Leaflet>
  </div>
  <div>
    <button @click="makeRequestGeocode">Make Request</button>
    <button @click="makeRequestRoute">Make Route Request</button>
    <p>Responses:</p>
    <p>Geocode Clean Data:<br>{{ cleanData }}</p>
    <p>Geocode Raw Data:<br>{{ data }}</p>
  </div>
</template>
