<script setup lang="ts">
import {ref} from "vue";

const name = ref("")
const mail = ref("")
const passwd = ref("")
const passwdRep = ref("")

function submitRegistration() {
  console.log(`${name.value}, ${mail.value}, ${passwd.value}, ${passwdRep.value}`)
}
</script>

<template>
  <p>Name: </p>
  <input v-model="name" placeholder="John Apple" />
  <p>Mail: </p>
  <input v-model="mail" placeholder="john@apple.example" />
  <p>Password: </p>
  <input v-model="passwd" placeholder="*****" />
  <p>Repeat your password: </p>
  <input v-model="passwdRep" placeholder="*****" />
  <button @click="submitRegistration">Register</button>
</template>

<style scoped>

</style>