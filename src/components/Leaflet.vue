<script setup lang="ts">
import L from 'leaflet';
import { onMounted, ref } from 'vue';
import Marker from './Marker.vue';


const props = defineProps<{
    initLatLng: L.LatLngExpression,
    zoom: number,
}>();

const map = ref();
const mapEelement = ref();
const markers = ref();

onMounted(() => {
    map.value = L.map(mapEelement.value).setView(props.initLatLng, props.zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
});

function drawRoute(route: any) {
    L.geoJSON(route).addTo(map.value);
}

function drawMarkers(newMarkers: Array<L.LatLngExpression>) {
    markers.value = newMarkers;
}

defineExpose({
    drawRoute,
    drawMarkers
});
</script>

<template>
    <div ref="mapEelement" style="height: 30rem; width: 30rem;">
        <Marker v-for="marker in markers" :lat-lng="marker" :map="map"></Marker>
    </div>
</template>