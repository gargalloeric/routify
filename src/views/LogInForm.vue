<script setup lang="ts">
import {ref} from "vue";
import {getUserManager} from "../services/UserManager.ts";
import router from "../router.ts";
import {redirectedFromLogInOrRegister} from "../main.ts";

const mail = ref("")
const passwd = ref("")
const errorMessage = ref("")

async function submitRegistration() {
  const mailRet:string | void = await getUserManager().logIn(mail.value, passwd.value)
      .catch((error) => {
        console.log(`Message: ${error.message}`)
        errorMessage.value = error.message;
      });
  if (mailRet) {
    redirectedFromLogInOrRegister.redirected = true;
    await router.push({path: '/'})
  }
}
</script>

<template>
  <div class="mt-20 mb-20 max-w-sm mx-auto">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Tu correo electrónico</label>
      <input type="email" v-model="mail" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johnapple@gmail.com" required>
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Tu contraseña</label>
      <input type="password" v-model="passwd" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>
    <p class="mb-4 ms-2 text-sm font-medium text-red-600 dark:text-gray-300">
      {{errorMessage}}</p>
    <p class="mb-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      ¿No tienes cuenta? <span class="link" @click="router.push({path: '/register'})">Registrate</span></p>
    <button @click="submitRegistration" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Inicia Sesión</button>
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
}
</style>