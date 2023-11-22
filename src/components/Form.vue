<script setup lang="ts">
import {Transport} from "../model/Transport.ts";

const destination : string = "";
const origin : string = "";
const mode : Transport = Transport.Car;

const emit = defineEmits(['route-requested'])
function getRoute() {
  // Emisión del evento route-requested
  emit("route-requested", {
    origin: origin,
    destination: destination,
    mode: mode
  });

  alert(
      `La ruta solicitada es desde ${origin} hasta ${destination} en ${mode}`
  );
}

</script>

<template>
  <div class="form">
    <div class="form-group">
      <label for="origin">Lugar de origen</label>
      <input
          type="text"
          id="origin"
          v-model="origin"
          placeholder="Escribe el nombre o la dirección del lugar de origen"
      />
      <label for="origin">Lugar de destino</label>
      <input
          type="text"
          id="destination"
          v-model="destination"
          placeholder="Escribe el nombre o la dirección del lugar de origen"
      />
    </div>
    <!-- Resto del formulario ... -->
    <div class="form-group">
      <button @click="getRoute">Obtener ruta</button>
    </div>
  </div>
</template>

<style scoped>
.form {
  max-width: 400px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial;
  color: black;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

button {
  width: 100%;
  height: 40px;
  background-color: #00a0ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style>


