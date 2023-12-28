<template>
    <div class="w-4/6 mx-auto my-10">
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Tus Lugares</h5>
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
</script>