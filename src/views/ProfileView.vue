<script setup lang="ts">
import { getUserManager } from '../services/UserManager';
import UserIcon from "../components/UserIcon.vue";
import TrashIcon from '../components/TrashIcon.vue';
import { RouteType } from "../model/Route";
import { ref } from 'vue';
import SuccessMessage from "../components/SuccessMessage.vue";

const userManager = getUserManager();
const username = userManager.userInfo?.name;
const confUpdated = ref(false);
let preferredRouteType = userManager.userInfo?.defaultTypeOfRoute

async function handleDeleteClick() {
    await userManager.deleteAccount();
    userManager.logOut();
}

async function handlePreferenceSave() {
    confUpdated.value = await userManager.setDefaultTypeOfRoute(preferredRouteType);
}
</script>

<template>
    <div class="m-5 p-5 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <SuccessMessage v-if="confUpdated" @handle-close="confUpdated = !confUpdated" msg="Se ha actualizado la configuración"></SuccessMessage>
        <div class="flex gap-3 items-center mb-5">
            <UserIcon class="h-9 w-9"></UserIcon>
            <h1 class="text-4xl font-extrabold dark:text-white">{{ username }}</h1>
        </div>
        <div class="mb-5">
            <form class="max-w-sm mx-auto" @submit.prevent="handlePreferenceSave">
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ruta
                        preferida</label>
                    <select id="route-type"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="preferredRouteType">
                        <option :value="RouteType.Recommended">Recomendada</option>
                        <option :value="RouteType.Shortest">Más corta</option>
                        <option :value="RouteType.Fastest">Más rápida</option>
                    </select>
                </div>
                <button type="submit"
                    class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Guardar
                </button>
            </form>

        </div>
        <div>
            <hr class="border-red-500" />
            <h2 class="text-2xl font-bold text-red-500">Zona de peligro</h2>
            <div class="flex flex-row justify-center">
                <button type="button" @click="handleDeleteClick"
                    class="text-red-500 hover:text-white border border-red-500 inline-flex items-center gap-2 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <TrashIcon class="w-5 h-5"></TrashIcon>
                    Borrar Cuenta
                </button>
            </div>
        </div>
    </div>
</template>