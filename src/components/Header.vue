<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a @click="handleUserButton('/')" class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
        <img src="/logo_letters.svg" class="h-12 w-auto">
      </a>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false"
        @click="toggleMenu">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div ref="menu" class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a @click="handleUserButton('/', $refs.homeLi)" ref="homeLi"
              class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page">Home</a>
          </li>
          <li>
            <a @click="handleUserButton('/user/vehicle/list', $refs.vehicleLi)" ref="vehicleLi"
               class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Mis Vehículos</a>
          </li>
          <li>
            <a @click="handleUserButton('/user/route/list', $refs.routesLi)" ref="routesLi"
             class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Mis Rutas</a>
          </li>
          <li>
            <a @click="handleUserButton('/user/place/list', $refs.placesLi)" ref="placesLi"
               class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Mis Lugares</a>
          </li>
          <li>
            <a @click="handleUserButton('/profile', $refs.profileLi)" ref="profileLi"
               class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import router from "../router.ts";
import {getUserManager} from "../services/UserManager.ts";
import {redirectedFromLogInOrRegister} from "../main.ts";

  const menu = ref();
  const homeLi = ref();
  let prev = null;

  function toggleMenu() {
    menu.value.classList.toggle('hidden');
  }

  function handleUserButton(path: string, el) {
    if (getUserManager().isLoggedIn()) {
      router.push({path: path})
      handleListColor(el);
    } else {
      router.push({path: '/logIn'})
    }
  }

  watch(redirectedFromLogInOrRegister, () => {
    if (redirectedFromLogInOrRegister.redirected) {
      handleListColor(homeLi.value);
      redirectedFromLogInOrRegister.redirected = false;
    }
  })

  function handleListColor(el) {
    if (!!prev) {
      prev.classList.toggle('text-gray-900');
      prev.classList.toggle('text-blue-700');
    }
    prev = el
    el.classList.toggle('text-gray-900');
    el.classList.toggle('text-blue-700');
  }
</script>



