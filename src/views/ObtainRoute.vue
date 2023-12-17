<script setup lang="ts">
import Map from "../components/Map.vue";
import Form from "../components/Form.vue";
import { ref } from "vue";
import { Transport } from "../model/Transport.ts";
import {getRouteFromCoords, getRouteFromPlacesNames} from "../services/ORSAdapter.ts";
import Alert from "../components/Alert.vue";
import {latLng} from "leaflet";
import {calculateRoutePriceWithCar} from "../services/RoutePriceCalculator.ts";
import {isPriceRequested} from "../main.ts";
import {Vehicle} from "../model/Vehicle.ts";
import { RouteType } from "../model/Route";

// TODO: Make initialLatLang the user location or a default coordinates fallback.
const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 17;
const map = ref();
const isRequestingRoute = ref(false);
const isRequestReturnedError = ref(false);

async function handleRouteRequest(data: { origin: any, destination: any, mode: Transport, vehicle: Vehicle, type: RouteType}) {
  isRequestingRoute.value = true;
  let route;
  try {
    if (/^[A-Za-z]/.test(data.origin.toString()))
      route = await getRouteFromPlacesNames(data.origin.toString(), data.destination.toString(), data.mode, data.type);
    else
      route = await getRouteFromCoords(latLng(data.origin), latLng(data.destination), data.mode, data.type);
    map.value.clear();
    map.value.drawRoute(route);
    if (data.vehicle != undefined){
      isPriceRequested.price = await calculateRoutePriceWithCar(route, data.vehicle);
      isPriceRequested.value = true;
    }
  } catch (error) {
    // TODO: Make appear a popup with the error saying a route couldn't be found.
    console.log(error)
    isRequestReturnedError.value = true;
  }
  isRequestingRoute.value = false;
}

</script>

<template>
  <div class="m-5">
    <Alert v-if="isRequestReturnedError" @handle-close="isRequestReturnedError = !isRequestReturnedError" msg="No se ha podido encontrar una ruta."></Alert>
    <div class="flex md:flex-row sm:flex-col">
      <Form class="mr-5" @route-requested="handleRouteRequest" :is-requesting-route="isRequestingRoute"></Form>
      <Map class="rounded-lg" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>
</div>
</template>

