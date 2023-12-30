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
                            <div class="inline-flex rounded-md shadow-sm" role="group">
                              <button type="button"
                                      @click="handleDelete(place['name'])"
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

const listOfPlaces = ref({});
const userManager = getUserManager();

onMounted(() => {
    listOfPlaces.value = userManager.getListOfPlaces();
    console.log(listOfPlaces.value)
})

async function handleDelete(name: string){
  delete listOfPlaces.value[name];
  await userManager.deletePlace(name);
}
</script>