<script setup lang="ts">
import { ref } from 'vue';
import { formRoute, isPriceRequested } from "../main.ts";
import { getUserManager } from "../services/UserManager"
import { Vehicle } from "../model/Vehicle.ts";
import { RouteType } from '../model/Route';

formRoute.origin = "";
formRoute.destination = "";
const userManager = getUserManager();

let routeType: RouteType = RouteType.Recommended;
let mode: string | Vehicle = "driving-car";
let vehicles = ref({});
let size = 0;
if (userManager.isLoggedIn()){
  vehicles.value = userManager.getListOfVehicles();
  for (let v in vehicles.value){
    if (size == 0)
      mode = userManager.getUserVehicle(v);
    size++;
  }
}
let vehicle: Vehicle;
let name = "";
const props = defineProps<{
  isRequestingRoute: boolean
  isRouteRequested: boolean
}>();

const emit = defineEmits(['route-requested', 'route-saved'])

function getRoute() {
  // Defining a vehicle if a custom one is selected
  if (mode.toString() != "driving-car" && mode.toString() != "foot-walking" && mode.toString() != "cycling-regular"){
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
function saveRoute(){
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
          <option v-if="userManager.isLoggedIn() && size > 0" v-for="vehicle in vehicles" :value="vehicle">🚗
            {{ vehicle.nombre }}</option>
          <option v-else value="driving-car">🚗 Coche</option>
          <option value="foot-walking">🚶 A Pie</option>
          <option value="cycling-regular">🚴 Bicicleta</option>
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
    <form @submit.prevent="saveRoute">
      <div>
        <span v-if="isPriceRequested.value">El precio de la ruta es: {{isPriceRequested.price}}€</span>
      </div>
      <div v-if="getUserManager().isLoggedIn() && props.isRouteRequested">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input v-model="name" type="text" id="name"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Mi ruta" required>

        <button type="submit"
                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
          <span>Guardar ruta</span>
        </button>
      </div>
    </form>
  </div>
</template>


