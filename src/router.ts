import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue";
import RegisterForm from "./components/RegisterForm.vue";
import LogInForm from "./components/LogInForm.vue";
import NotFound from "./components/NotFound.vue";

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
    {
        path: "/logIn",
        name: "LogInForm",
        component: LogInForm,
    },
    {
        path: "/profile",
        name: "Profile",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;