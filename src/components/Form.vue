<script setup lang="ts">
import { ref } from 'vue';
import {formRoute} from "../main.ts";


formRoute.origin = "";
formRoute.destination = "";
let mode = "driving-car";

const errorInDestiny = ref(false);
const errorInOrigin = ref(false);

const props = defineProps<{
  isRequestingRoute: boolean
}>();

const emit = defineEmits(['route-requested'])

function getRoute() {
  let someFieldEmpty = false;

  if (formRoute.origin.toString().trim().length === 0) {
    someFieldEmpty = true;
    errorInOrigin.value = true;
  } else {
    errorInOrigin.value = false;
  }
  if (formRoute.destination.toString().trim().length === 0) {
    someFieldEmpty = true;
    errorInDestiny.value = true;
  } else {
    errorInDestiny.value = false;
  }
  // Don't make the request if one of the two fields is empty
  if (someFieldEmpty) return;
  emit("route-requested", {
    origin: formRoute.origin,
    destination: formRoute.destination,
    mode: mode
  });
}
</script>

<template>
  <div>
    <div class="mb-5">
      <label for="origin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Origen</label>
      <input v-if="!errorInOrigin" v-model="formRoute.origin" type="text" id="origin"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Madrid">
      <input v-if="errorInOrigin"  v-model="formRoute.destination" type="text" id="destiny" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"  placeholder="Madrid">
      <p v-if="errorInOrigin" class="mt-2 text-sm text-red-600 dark:text-red-500">Origen vacío.</p>
    </div>
    <div class="mb-5">
      <label for="destiny" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destino</label>
      <input v-if="!errorInDestiny" v-model="formRoute.destination" type="text" id="destiny"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Lisboa">
        <input v-if="errorInDestiny"  v-model="formRoute.destination" type="text" id="destiny" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"  placeholder="Lisboa">
        <p v-if="errorInDestiny" class="mt-2 text-sm text-red-600 dark:text-red-500">Destino vacío.</p>
    </div>
    <div class="mb-5">
      <label for="transport" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transporte</label>
      <select v-model="mode" id="transport"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="driving-car">🚗 Coche</option>
        <option value="foot-walking">🚶 A Pie</option>
        <option value="cycling-regular">🚴 Bicicleta</option>
      </select>
    </div>
    <div>
      <button @click="getRoute" type="button" :disabled="props.isRequestingRoute"
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
  </div>
</template>


