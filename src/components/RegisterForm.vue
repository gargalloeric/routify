<script setup lang="ts">
import {ref} from "vue";
import {getUserManager, UserManager} from "../services/UserManager.ts";

const name = ref("")
const mail = ref("")
const passwd = ref("")
const passwdRep = ref("")

function submitRegistration() {
  getUserManager().register(name.value, mail.value, passwd.value, passwdRep.value)
      .catch((error) => {
        console.log(`Message: ${error.message}, notify dom¿?`)
      });
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