import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { reactive } from 'vue'


createApp(App).use(router).mount('#app')

export let formRoute = reactive({
    origin: "",
    destination: ""
});

export  let isPriceRequested = reactive({
    value: false,
    price: 0
});
