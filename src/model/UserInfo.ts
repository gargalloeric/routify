import {Vehicle} from "./Vehicle.ts";
import {Route, RouteType} from "./Route.ts";
import {Place} from "./Place.ts";

export class UserInfo {
    name: string
    mail: string | null
    userId: string
    defaultTypeOfRoute: RouteType
    vehicles: { [id:string] : Vehicle }
    routes: { [id:string] : Route }
    places: { [id:string] : Place }
    defaultVehicle: string
    constructor(userId: string, email: string | null, name : string, defaultVehicle? : string, defaultTypeOfRoute?: RouteType) {
        this.name = name
        this.mail = email
        this.userId = userId
        this.vehicles = {}
        this.routes = {}
        this.places = {}
        this.defaultTypeOfRoute = defaultTypeOfRoute ?? RouteType.Recommended
        this.defaultVehicle = defaultVehicle ?? "driving-car"
    }

    getDataForDb(): Object {
        const vehiclesData: { [id: string]: any } = {};
        for (const [key, vehicle] of Object.entries(this.vehicles)) vehiclesData[key] = vehicle.toJSON();
        const routesData: { [id: string]: any } = {};
        for (const [key, route] of Object.entries(this.routes)){
            routesData[key] = route.toJSON();
        }
        const placesData: { [id: string]: any } = {};
        for (const [key, place] of Object.entries(this.places)) placesData[key] = place.toJSON();
        return {
            name: this.name,
            vehicles: vehiclesData,
            routes: routesData,
            places: placesData,
            defaultTypeOfRoute: this.defaultTypeOfRoute,
            defaultVehicle: this.defaultVehicle
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
        if (matricula == this.defaultVehicle) this.defaultVehicle = "driving-car";
        delete this.vehicles[matricula]
        return true
    }

    getVehicle(matricula: string): Vehicle {
        if (this.hasVehicle(matricula))
            return this.vehicles[matricula];
        else
            throw new Error('Vehicle not found');
    }

    updateVehicle(vehicle: Vehicle){
        if (this.hasVehicle(vehicle.matricula))
            this.vehicles[vehicle.matricula] = vehicle;
        else
            throw new Error('Invalid Vehicle');
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

    addPlace(place: Place) {
        if (this.hasPlace(place.name)) throw new Error("Place already saved");
        this.places[place.name] = place;
    }

    removePlace(name: string){
        if (!this.hasPlace(name)) return false;
        delete this.places[name];
        return true;
    }

    setDefaultVehicle(matricula : string){
        if (this.defaultVehicle == matricula) throw new Error('Vehicle is already default');
        else
        this.defaultVehicle = matricula;
        }

    private hasPlace(name: string) {
        return !!this.places[name];
    }

    getPlace(name: string): Place {
        return this.places[name];
    }

    getRoute(name: string): Route {
        return this.routes[name];
    }
}