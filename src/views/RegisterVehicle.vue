<script setup lang="ts">
import { ref } from "vue";
import { getUserManager } from "../services/UserManager.ts";
import Alert from "../components/Alert.vue";
import router from "../router";

let matricula = "";
let nombre = "";
let tipo_motor = "combustión";
let consumo = 5;

let isRegisteringVehicle = ref(false);
let returnedError = ref(false);

async function register() {
  isRegisteringVehicle.value = true;
  try {
    await getUserManager().registerVehicle(matricula, nombre, tipo_motor, consumo);
  }
  catch (error) {
    console.log(error);
    returnedError.value = true;
  }
  isRegisteringVehicle.value = false;
  await router.push({ path: '/user/vehicle/list' });
}
</script>

<template>
  <div class="max-w-sm mx-auto">
    <h1 class="font-bold text-2xl mb-4">Registra el vehículo:</h1>
    <Alert v-if="returnedError" @handle-close="returnedError = !returnedError"
      msg="No se ha podido registrar el vehiculo"></Alert>
    <form @submit.prevent="register">
      <div class="mb-5">
        <label for="matricula" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matrícula</label>
        <input v-model="matricula" type="text" id="matricula"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1111AAA"
          required>
      </div>
      <div class="mb-5">
        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input v-model="nombre" type="text" id="nombre"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Mi Vehículo"
          required>
      </div>
      <div class="mb-5">
        <label for="tipo_motor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de motor</label>
        <select v-model="tipo_motor" id="tipo_motor"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="combustión">Combustión</option>
          <option value="eléctrico">Eléctrico</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="consumo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Consumo cada
          100km</label>
        <input v-model="consumo" type="number" id="consumo"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=5>
      </div>
      <div>
        <button type="submit" :disabled="isRegisteringVehicle"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
          <svg v-if="isRegisteringVehicle" aria-hidden="true" role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor" />
          </svg>
          <span v-if="isRegisteringVehicle">Registrando...</span>
          <span v-else>Registrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>