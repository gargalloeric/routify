<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Map",
  props: {
    route: Object,
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      var map = L.map("map", {
        center: [39.95033330877234, -0.10324382781982422],
        zoom: 17,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.marker([39.95033330877234, -0.10324382781982422])
          .addTo(map)
          .bindPopup("<b>Museo de Cerámica de l'Alcora</b>")
          .openPopup();

      // Puedes agregar código para mostrar la ruta en el mapa aquí
      if (this.route) {
        // ...
      }
    },
  },
};
</script>

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

