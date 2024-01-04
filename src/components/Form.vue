<script setup lang="ts">
import { ref } from 'vue';
import { formRoute, isPriceRequested } from "../main.ts";
import { getUserManager } from "../services/UserManager"
import { Vehicle } from "../model/Vehicle.ts";
import { RouteType } from '../model/Route';
import { Transport } from '../model/Transport';

//formRoute.origin = "";
//formRoute.destination = "";
const userManager = getUserManager();
formRoute.origin = "";
formRoute.destination = "";

isPriceRequested.value = false;

const defaultVehicle = userManager.getDefaultVehicle();

let mode: string | Vehicle = defaultVehicle;

let vehicles = ref<{[id:string] : Vehicle}>(userManager.getListOfVehicles());
let routeType: RouteType = userManager.userInfo?.defaultTypeOfRoute ?? RouteType.Recommended;

let size = 0;

for (let v in vehicles.value) {
  if (defaultVehicle == "driving-car" && size==0){
    mode = vehicles.value[v];
  }
  if (v == defaultVehicle)
    mode = vehicles.value[v];
  size++;
}

let vehicle: Vehicle;
let name = "";
const props = defineProps<{
  isRequestingRoute: boolean,
  isRouteRequested: boolean,
  duration: number,
  distance: number,
  isRequestingInfo: boolean

}>();

const emit = defineEmits(['route-requested', 'route-saved'])

function getRoute() {
  // Defining a vehicle if a custom one is selected
  if (mode.toString() != "driving-car" && mode.toString() != "foot-walking" && mode.toString() != "cycling-regular") {
    vehicle = mode;
    mode = "driving-car"
  }
  emit("route-requested", {
    origin: formRoute.origin,
    destination: formRoute.destination,
    mode: mode,
    vehicle: vehicle,
    type: routeType
  });
  // Manteinig previous state of list after requesting route
  if (vehicle != undefined)
    mode = vehicle;
  isPriceRequested.value = false;
  vehicle = undefined;
}
function saveRoute() {
  emit("route-saved", {
    name: name
  });
}

</script>

<template>
  <div>
    <form @submit.prevent="getRoute">
      <div class="mb-5">
        <label for="origin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Origen</label>
        <input v-model="formRoute.origin" type="text" id="origin"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Madrid" required>
      </div>
      <div class="mb-5">
        <label for="destiny" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destino</label>
        <input v-model="formRoute.destination" type="text" id="destiny"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Lisboa" required>
      </div>
      <div class="mb-5">
        <label for="transport" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transporte</label>
        <select v-model="mode" id="transport"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="vehicle in vehicles" :value="vehicle">
            🚗{{ vehicle['nombre'] }}
          </option>
          <option v-if="size == 0" :value="Transport.Car">🚗 Coche</option>
          <option :value="Transport.Foot">🚶 A Pie</option>
          <option :value="Transport.Bycicle">🚴 Bicicleta</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="route-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de ruta</label>
        <select id="route-type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="routeType">
          <option :value="RouteType.Recommended">Recomendada</option>
          <option :value="RouteType.Shortest">Más corta</option>
          <option :value="RouteType.Fastest">Más rápida</option>
        </select>
      </div>
      <div>
        <button type="submit" :disabled="props.isRequestingRoute"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
          <svg v-if="props.isRequestingRoute" aria-hidden="true" role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor" />
          </svg>
          <span v-if="props.isRequestingRoute">Loading...</span>
          <span v-else>Obtener Ruta</span>
        </button>
      </div>
    </form>
    <hr v-if="isRequestingInfo" class="mb-5" />
    <div v-if="isRequestingInfo" class="mb-5">
      <p>La duracion de la ruta es: </p>
      <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
        <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
        </svg>
        {{props.duration.toFixed(2)}} horas
      </span>
    </div>
    <div v-if="isRequestingInfo" class="mb-5">
      <p>La distancia de la ruta es: </p>
      <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
        {{props.distance.toFixed(2)}} km
      </span>
    </div>
    <div v-if="isPriceRequested.value" class="mb-5">
      <p>El precio de la ruta es: </p>
      <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {{ isPriceRequested.price }}
        <span v-if="mode === 'foot-walking' || mode === 'cycling-regular'">Cal</span><span v-else>€</span>
      </span>
    </div>
    <hr v-if="isPriceRequested.value" class="mb-5" />
    <form @submit.prevent="saveRoute" v-if="getUserManager().isLoggedIn() && props.isRouteRequested">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input v-model="name" type="text" id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Mi ruta" required>
        </div>
        <div>
          <button type="submit"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
            <span>Guardar ruta</span>
          </button>
        </div>
    </form>
  </div>
</template>


