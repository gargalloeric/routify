<!-- App.vue -->
<script setup lang="ts">
import Map from "../components/Map.vue";
import Form from "../components/Form.vue";
import { ref } from "vue";
import { Transport } from "../model/Transport.ts";
import {getRouteFromCoords, getRouteFromPlacesNames} from "../services/ORSAdapter.ts";
import Alert from "../components/Alert.vue";
import {latLng} from "leaflet";
import {calculateRoutePrice} from "../services/RoutePriceCalculator.ts";
import {isPriceRequested} from "../main.ts";
import {getUserManager} from "../services/UserManager"
import {Vehicle} from "../model/Vehicle.ts";
import { RouteType } from "../model/Route";
import {Route} from "../model/Route.ts";
import SuccessMessage from "../components/SuccessMessage.vue";
import { BycicleCostStartey, CombustionCostStrategy, ElectricCostStrategy, FootCostStartey, ICostStrategy } from "../services/CostStrategy";

// TODO: Make initialLatLang the user location or a default coordinates fallback.
const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 17;
const map = ref();
const isRequestingRoute = ref(false);
const isRequestReturnedError = ref(false);
const isRouteRequested = ref(false);
const isSaveReturnedError = ref(false);

let route: Route;
let routeSaved = ref(false);
let costStrategy: ICostStrategy;

function handleCostStrategy(mode: Transport, vehicle: Vehicle) {
  switch(mode) {
    case Transport.Foot:
      costStrategy = new FootCostStartey();
      return;
    case Transport.Bycicle:
      costStrategy = new BycicleCostStartey();
      return;
  }

  if (vehicle.tipoMotor === 'combustión') {
    console.log('Combustión')
    costStrategy = new CombustionCostStrategy();
  } else {
    console.log('Electrico')
    costStrategy = new ElectricCostStrategy();
  }
}

async function handleRouteRequest(data: { origin: any, destination: any, mode: Transport, vehicle: Vehicle, type: RouteType}) {
  handleCostStrategy(data.mode, data.vehicle);
  isRequestingRoute.value = true;
  try {
    if (/^[A-Za-z]/.test(data.origin.toString()))
      route = await getRouteFromPlacesNames(data.origin.toString(), data.destination.toString(), data.mode, data.type);
    else
      route = await getRouteFromCoords(latLng(data.origin), latLng(data.destination), data.mode, data.type);
    map.value.clear();
    map.value.drawRoute(route);
    if (data.vehicle != undefined){
      isPriceRequested.price = await calculateRoutePrice(route, data.vehicle.consumo100Km, costStrategy);
      isPriceRequested.value = true;
    }
  } catch (error) {
    // TODO: Make appear a popup with the error saying a route couldn't be found.
    console.log(error)
    isRequestReturnedError.value = true;
  }
  isRequestingRoute.value = false;
  isRouteRequested.value = true;
}

async function handleRouteSaved(data: { name: string}) {
  try {
    await getUserManager().saveRoute(route, data.name);
    isRouteRequested.value = false;
    routeSaved.value = true;
  }
  catch (error){
    isSaveReturnedError.value = true;
  }
}

</script>

<template>
  <div class="m-5">
    <Alert v-if="isRequestReturnedError" @handle-close="isRequestReturnedError = !isRequestReturnedError" msg="No se ha podido encontrar una ruta."></Alert>
    <Alert v-if="isSaveReturnedError" @handle-close="isSaveReturnedError = !isSaveReturnedError" msg="Ya existe una ruta con el mismo nombre"></Alert>
    <SuccessMessage v-if="routeSaved" @handle-close="routeSaved = !routeSaved" msg="Se ha guardado la ruta correctamente"></SuccessMessage>

    <div class="flex md:flex-row sm:flex-col">
      <Form class="mr-5" @route-requested="handleRouteRequest" @route-saved="handleRouteSaved" :is-requesting-route="isRequestingRoute" :is-route-requested="isRouteRequested"></Form>
      <Map class="rounded-lg" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
    </div>
</div>
</template>

