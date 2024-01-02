import { createWebHistory, createRouter } from "vue-router";
import RegisterForm from "./views/RegisterForm.vue";
import LogInForm from "./views/LogInForm.vue";
import NotFound from "./views/NotFound.vue";
import ObtainRoute from "./views/ObtainRoute.vue";
import RegisterVehicle from "./views/RegisterVehicle.vue";
import ListVehicleVue from "./views/ListVehicle.vue";
import ListRoutes from "./views/ListRoutes.vue";
import ListPlaces from "./views/ListPlaces.vue";
import RegisterPlace from "./views/RegisterPlace.vue";
import UpdateVehicle from "./views/UpdateVehicle.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ObtainRoute,
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
    {
        path: "/registerVehicle",
        name: "Register Vehicle",
        component: RegisterVehicle,
    },
    {
        path: "/user/vehicle/list",
        name: "List Vehicles",
        component: ListVehicleVue
    },
    {
        path: "/user/route/list",
        name: "List Routes",
        component: ListRoutes
    },
    {
        path: "/user/place/list",
        name: "List Places",
        component: ListPlaces
    },
    {
        path: "/registerPlace",
        name: "Register Place",
        component: RegisterPlace
    },
    {
        path: "/updateVehicle/:matricula",
        name: "Update Vehicle",
        component: UpdateVehicle,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;