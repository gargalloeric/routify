<script setup lang="ts">
import {ref} from "vue";
import {getUserManager} from "../services/UserManager.ts";
import router from "../router.ts";

const name = ref("")
const mail = ref("")
const passwd = ref("")
const passwdRep = ref("")
const errorMessage = ref("")

async function submitRegistration() {
  const mailRet:string | void = await getUserManager().register(name.value, mail.value, passwd.value, passwdRep.value)
      .catch((error) => {
        console.log(`Message: ${error.message}`)
        errorMessage.value = error.message;
      });
  if (mailRet) {
    console.log("call parent - no errors") // TODO... manage changes¿?
    await router.push({path: '/'})
  }
}
</script>

<template>
  <div class="central-container">
    <h1>Register</h1>
    <table>
      <tr>
        <td class="text-right">Name:</td>
        <td><input v-model="name" placeholder="John Apple" /></td>
      </tr>
      <tr>
        <td class="text-right">Mail:</td>
        <td><input v-model="mail" placeholder="john@apple.example" /></td>
      </tr>
      <tr>
        <td class="text-right">Password:</td>
        <td><input type="password" v-model="passwd" placeholder="*****" /></td>
      </tr>
      <tr>
        <td class="text-right">Repeat your password:</td>
        <td><input type="password" v-model="passwdRep" placeholder="*****" /></td>
      </tr>
      <tr>
        <td colspan="2" class="error-message">{{errorMessage}}</td>
      </tr>
      <tr>
        <td colspan="2"><button @click="submitRegistration">Register</button></td>
      </tr>
    </table>
  </div>

</template>

<style scoped>
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