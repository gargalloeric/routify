<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import router from "./router.ts";


router.push({path: '/'});
</script>
<router-view id="router-view"/>
<template>
    <Header class="drop-shadow-md"></Header>
    <router-view id="router-view"/>
    <Footer></Footer>
</template>

<style scoped>
</style>
