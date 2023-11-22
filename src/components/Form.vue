<script setup lang="ts">
import {Transport} from "../model/Transport.ts";
import {ref} from "vue";

const destination = ref();
const origin = ref();
const mode = ref();

const emit = defineEmits(['route-requested'])
function getRoute() {
  // Emisión del evento route-requested
  emit("route-requested", {
    origin: origin.value,
    destination: destination.value,
    mode: mode.value
  });

  alert(
      `La ruta solicitada es desde ${origin.value} hasta ${destination.value} en ${mode.value}`
  );
}
//<input v-model="mode" list="transport" name="transport" id="transport">
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
          placeholder="Escribe el nombre o la dirección del lugar de destino"
      />

      <select id="transport" v-model="mode">
        <option value="driving-car" selected>Coche</option>
          <option value="foot-walking">A pie</option>
            <option value="cycling-regular">Bicicleta</option>
      </select>

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


