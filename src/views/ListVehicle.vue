<template>
  <div class="w-4/6 mx-auto my-10">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Tus Vehiculos</h5>
      </div>
      <div class="flow-root">
        <div class="mb-5">
          <label for="transport" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehiculo por defecto</label>
          <select v-model="defaultVehicle" id="transport"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="vehicle in listOfVehicles" :value="vehicle.matricula">
              🚗{{ vehicle['nombre'] }}-{{vehicle['matricula']}}
            </option>
            <option v-if="!listOfVehicles || listOfVehicles.length == 0" :value="Transport.Car">🚗 Coche</option>
            <option :value="Transport.Foot">🚶 A Pie</option>
            <option :value="Transport.Bycicle">🚴 Bicicleta</option>
          </select>
        </div>
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="vehicle in listOfVehicles" class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {{ vehicle['nombre'] }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{ vehicle['matricula'] }}
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button type="button" v-if="!vehicle['isFav']"
                        @click="markAsFavourite(vehicle['matricula'])" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/></svg>
                </button>
                <button type="button" v-if="vehicle['isFav']"
                        @click="unmarkAsFavourite(vehicle['matricula'])" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>
                </button>
                <div class="inline-flex rounded-md shadow-sm" role="group">
                  <button type="button"
                          @click="router.push({name: 'Update Vehicle', params: {matricula: vehicle['matricula']}})"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Editar
                  </button>
                  <button type="button" @click="handleDelete(vehicle['matricula'])"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center">
        <button type="button" @click="router.push({path: '/registerVehicle'})"
                class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import { getUserManager } from '../services/UserManager';
import router from "../router.ts";
import { Vehicle } from '../model/Vehicle';
import {Transport} from "../model/Transport.ts";

const listOfVehicles = ref();
const userManager = getUserManager();
let defaultVehicle = ref<string>(userManager.getDefaultVehicle());


onMounted(() => {
  generateListOfVehicles();
  if (listOfVehicles.value.length > 0 && defaultVehicle.value == "driving-car")
    defaultVehicle.value = listOfVehicles.value[0]['matricula'];
})

function generateListOfVehicles() {
  listOfVehicles.value = Object.values(userManager.getListOfVehicles()).map(obj => obj);
  listOfVehicles.value.sort((a: Vehicle, b: Vehicle) => {
    const isFavA = a.isFav || false;
    const isFavB = b.isFav || false;
    return isFavB - isFavA;
  });
}

watch(defaultVehicle, async () => {
  await userManager.setDefaultVehicle(defaultVehicle.value);
})
async function handleDelete(matricula: string) {
    await userManager.deleteVehicle(matricula);
    generateListOfVehicles()
}

async function markAsFavourite(matricula: string) {
  await userManager.markVehicleAsFavourite(matricula);
  generateListOfVehicles()
}

async function unmarkAsFavourite(matricula: string) {
  await userManager.unmarkVehicleAsFavourite(matricula);
  generateListOfVehicles()
}
</script>