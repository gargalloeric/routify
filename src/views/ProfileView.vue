<script setup lang="ts">
import { getUserManager } from '../services/UserManager';
import UserIcon from "../components/UserIcon.vue";
import TrashIcon from '../components/TrashIcon.vue';

const userManager = getUserManager();
const username = userManager.userInfo?.name;

async function handleDeleteClick() {
    await userManager.deleteAccount();
    userManager.logOut();
}
</script>

<template>
    <div class="m-5 p-5 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="flex gap-3 items-center mb-5">
            <UserIcon class="h-9 w-9"></UserIcon>
            <h1 class="text-4xl font-extrabold dark:text-white">{{ username }}</h1>
        </div>
        <div>
            <hr class="border-red-500" />
            <h2 class="text-2xl font-bold text-red-500">Zona de peligro</h2>
            <div class="flex flex-row justify-center">
                <button type="button"
                    @click="handleDeleteClick"
                    class="text-red-500 hover:text-white border border-red-500 inline-flex items-center gap-2 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <TrashIcon class="w-5 h-5"></TrashIcon>
                    Borrar Cuenta
                </button>
            </div>
        </div>
    </div>
</template>