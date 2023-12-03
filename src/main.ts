import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { reactive } from 'vue'
import {latLng} from "leaflet";


createApp(App).use(router).mount('#app')

export let formRoute = reactive({
    origin: latLng([0, 0, 0]),
    destination: latLng([0, 0, 0])
});
