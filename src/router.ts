import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import RegisterForm from "./views/RegisterForm.vue";
import LogInForm from "./views/LogInForm.vue";
import NotFound from "./views/NotFound.vue";
import ObtainRoute from "./views/ObtainRoute.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ObtainRoute,
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
        path: "/notFound",
        name: "Not Found",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;