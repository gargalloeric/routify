<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <div class="content">
      <Form @route-requested="handleRouteRequested" />
      <Map :route="route" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Form,
    Map,
    Footer,
  },
  data() {
    return {
      route: null, // Aquí se almacena la ruta solicitada por el usuario
    };
  },
  methods: {
    handleRouteRequested(data) {
      // Aquí se recibe el evento personalizado con los datos del formulario
      // y se asigna a la propiedad route
      this.route = data;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.content {
  display: flex;
  flex-grow: 1;
  width: 200vh;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
