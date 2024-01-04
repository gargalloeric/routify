<template>
    <div class="w-4/6 mx-auto my-10">
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Tus Lugares de interés</h5>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li v-for="place in listOfPlaces" class="py-3 sm:py-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0"></div>
                            <div class="flex-1 min-w-0 ms-4">
                              <p class="text-lg font-bold mb-0.5 text-gray-900 truncate dark:text-white">
                                  {{ place['name'] }}
                              </p>
                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                📌Coordenadas (lat,lon):
                              </p>
                              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                ({{ place['coords']['lat'] }}, {{ place['coords']['lon'] }})
                              </p>
                            </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button type="button" v-if="!place['isFav']"
                                    @click="markAsFavourite(place['name'])" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/></svg>
                            </button>
                            <button type="button" v-if="place['isFav']"
                                    @click="unmarkAsFavourite(place['name'])" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>
                            </button>
                            <div class="inline-flex rounded-md shadow-sm" role="group">
                              <button type="button"
                                      @click="handleDelete(place['name'])"
                                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
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
                <button type="button"
                        @click="router.push({path: '/registerPlace'})" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Nuevo
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserManager } from '../services/UserManager';
import router from "../router";
import {Place} from "../model/Place.ts";

const listOfPlaces = ref({});
const userManager = getUserManager();

onMounted(() => {
  generateListOfPlaces();
})

function generateListOfPlaces() {
  listOfPlaces.value = Object.values(userManager.getListOfPlaces()).map(obj => obj);
  listOfPlaces.value.sort((a: Place, b: Place) => {
    const isFavA = a.isFav || false;
    const isFavB = b.isFav || false;
    return isFavB - isFavA;
  });
}

async function handleDelete(name: string) {
  await userManager.deletePlace(name);
  generateListOfPlaces()
}

async function markAsFavourite(name: string) {
  await userManager.markPlaceAsFavourite(name);
  generateListOfPlaces()
}

async function unmarkAsFavourite(name: string) {
  await userManager.unmarkPlaceAsFavourite(name);
  generateListOfPlaces()
}
</script>