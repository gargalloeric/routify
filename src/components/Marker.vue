<script setup lang="ts">
import L from 'leaflet'
import { onMounted, ref } from 'vue';

const props = defineProps<{
  map: L.Map,
  latLng: L.LatLngExpression
}>();

const marker = ref();
const markerElement = ref();

onMounted(() => {
  marker.value = L.marker(props.latLng).addTo(props.map);
});

</script>

<template>
  <div ref="markerElement"></div>
</template>