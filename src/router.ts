import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue";
import RegisterForm from "./components/RegisterForm.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/helloWorld",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/register",
        name: "RegisterForm",
        component: RegisterForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;