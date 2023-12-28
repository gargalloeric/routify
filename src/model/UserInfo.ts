import {Vehicle} from "./Vehicle.ts";
import {Route} from "./Route.ts";

export class UserInfo {
    name: string
    mail: string | null
    userId: string
    vehicles: { [id:string] : Vehicle }
    routes: { [id:string] : Route }
    constructor(userId: string, email: string | null, name : string) {
        this.name = name
        this.mail = email
        this.userId = userId
        this.vehicles = {}
        this.routes = {}
    }

    getDataForDb():Object {
        const vehiclesData: { [id: string]: any } = {};
        for (const [key, vehicle] of Object.entries(this.vehicles)) vehiclesData[key] = vehicle.toJSON();
        const routesData: { [id: string]: any } = {};
        for (const [key, route] of Object.entries(this.routes)) routesData[key] = route.toJSON();
        return {
            name: this.name,
            vehicles: vehiclesData,
            routes: routesData
        }
    }



    hasVehicle(matricula: string) {
        return !!this.vehicles[matricula];
    }

    addVehicle(v: Vehicle): void {
        if (this.hasVehicle(v.matricula)) throw new Error("Vehicle already stored")
        this.vehicles[v.matricula] = v
    }

    removeVehicle(matricula: string) {
        if (!this.hasVehicle(matricula)) return false
        delete this.vehicles[matricula]
        return true
    }

    getVehicle(matricula: string): Vehicle {
        return this.vehicles[matricula]
    }

    hasRoute(nombre: string){
        return !!this.routes[nombre];
    }
    addRoute(route: Route){
        if (this.hasRoute(route.name)) throw new Error("Route already saved");
        this.routes[route.name] = route;
    }

    removeRoute(name: string){
        if (!this.hasRoute(name)) throw new Error("Route not found");
        delete this.routes[name];
        return true;
    }

}