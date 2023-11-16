// no - ponedlo en un paquete modelo o algo asi
import { Route } from "../model/Route.ts";
import {Transport} from "../model/Transport.ts";

export class RouteManager {
    private static routeManager: RouteManager;

    private constructor() {
        // TODO
    }

    static getManager(): RouteManager {
        if (!this.routeManager) this.routeManager = new RouteManager()
        return this.routeManager;
    }

    getRouteFromPlacesNames(origin, destiny, transport: Transport): Route {
        // TODO
        throw new Error("Not Implemented")
    }
}