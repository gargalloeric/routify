<template>
  <div class="footer">
    <p>© 2023 Routify | Hecho con <span class="heart">&hearts;</span> y Vue.js</p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 15px;
  font-family: Arial, sans-serif;
  text-align: center;
  width: 200vh;
}

p {
  font-size: 14px;
  margin: 0;
}

.heart {
  color: #ff5050; /* Cambia el color del corazón según tu preferencia */
}
</style>

