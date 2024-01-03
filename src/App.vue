<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import router from "./router.ts";
import {getUserManager} from "./services/UserManager.ts";

if (getUserManager().isLoggedIn()) router.push({path: '/'});
else router.push({path: '/logIn'});
</script>
<template>
    <Header class="drop-shadow-md"></Header>
    <router-view id="router-view"/>
    <Footer></Footer>
</template>
