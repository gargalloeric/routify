import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { reactive } from 'vue'

export let redirectedFromLogInOrRegister = reactive({
    redirected: false
});

createApp(App).use(router).mount('#app')

export let formRoute = reactive({
    origin: Object(),
    destination: Object()
});

export  let isPriceRequested = reactive({
    value: false,
    price: 0
});
