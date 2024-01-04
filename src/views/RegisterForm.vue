<script setup lang="ts">
import { ref } from "vue";
import { getUserManager } from "../services/UserManager.ts";
import router from "../router.ts";
import { redirectedFromLogInOrRegister } from "../main.ts";

const name = ref("")
const mail = ref("")
const passwd = ref("")
const passwdRep = ref("")
const errorMessage = ref("")
const isRegistering = ref(false);

async function submitRegistration() {
  isRegistering.value = true;
  const mailRet: string | void = await getUserManager().register(name.value, mail.value, passwd.value, passwdRep.value)
    .catch((error) => {
      console.log(`Message: ${error.message}`)
      isRegistering.value = false;
      errorMessage.value = error.message;
    });
  if (mailRet) {
    redirectedFromLogInOrRegister.redirected = true;
    isRegistering.value = false;
    await router.push({ path: '/' })
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto mt-10">
    <h1 class="font-bold text-2xl mb-4">Regístrate:</h1>
    <form @submit.prevent="submitRegistration">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nombre</label>
        <input type="text" v-model="name" id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Apple" required>
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tu correo electrónico</label>
        <input type="email" v-model="mail" id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="johnapple@gmail.com" required>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tu contraseña</label>
        <input type="password" v-model="passwd" id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Repite la contraseña</label>
        <input type="password" v-model="passwdRep" id="repassword"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required>
      </div>
      <p class="mb-4 ms-2 text-sm font-medium text-red-600 dark:text-gray-300">
        {{ errorMessage }}</p>
      <p class="mb-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        ¿Ya tienes cuenta? <span class="link cursor-pointer" @click="router.push({ path: '/logIn' })">Inicia sesión</span></p>
        <button type="submit" :disabled="isRegistering"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
          <svg v-if="isRegistering" aria-hidden="true" role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor" />
          </svg>
          <span v-if="isRegistering">Registrando...</span>
          <span v-else>Registrarme</span>
        </button>
    </form>
  </div>
</template>

<style scoped>
.link {
  text-decoration: underline;
  color: blue;
}

.error-message {
  color: red;
  font-weight: bold;
}

.central-container {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  text-align: center;
  margin-top: 40pt;
  background-color: #cfcfcf;
  padding: 20pt;
  border-radius: 10pt;
}

.text-right {
  text-align: right;
}</style>